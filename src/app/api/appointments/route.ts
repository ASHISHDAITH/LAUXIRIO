import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getLocations,
  getCurrentTimeInTimeZone,
  getServiceDurations,
  getSalonTimeZone,
  getStylists,
  getTodayInTimeZone,
  getWeeklySlots,
  getIsoWeekday,
  isValidFutureAppointment,
  isValidFutureDate,
  services,
} from "@/lib/booking-config";
import { getPool } from "@/lib/database";

const requestSchema = z.object({
  locationId: z.string().min(1).max(80),
  serviceId: z.string().min(1).max(80),
  stylistId: z.string().min(1).max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.email().max(254),
  notes: z.string().max(2000).optional().default(""),
}).strict();

function isPostgresUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error &&
    (error as { code?: string }).code === "23505";
}

function logSafeError(error: unknown) {
  const candidate = typeof error === "object" && error !== null ? error : {};
  const details = {
    name: "name" in candidate && typeof candidate.name === "string" ? candidate.name : "UnknownError",
    code: "code" in candidate && typeof candidate.code === "string" ? candidate.code : undefined,
  };
  console.error("Appointment request processing failed:", details);
}

function configError() {
  return NextResponse.json(
    { error: "Appointment requests are not configured. Please contact the studio." },
    { status: 503 },
  );
}

export async function GET(request: Request) {
  try {
    const locations = getLocations();
    const stylists = getStylists();
    const timeZone = getSalonTimeZone();
    const serviceDurations = getServiceDurations();
    const url = new URL(request.url);
    const date = url.searchParams.get("date");
    if (!date) return NextResponse.json({ locations, stylists, services, timeZone, today: getTodayInTimeZone(timeZone) });

    const locationId = url.searchParams.get("locationId");
    const stylistId = url.searchParams.get("stylistId");
    const serviceId = url.searchParams.get("serviceId");
    if (!isValidFutureDate(date, timeZone) || !locationId || !stylistId || !serviceId) {
      return NextResponse.json({ error: "Choose a valid date, location, stylist and service." }, { status: 400 });
    }
    if (!locations.some((item) => item.id === locationId) || !stylists.some((item) => item.id === stylistId)) {
      return NextResponse.json({ error: "Choose a configured location and stylist." }, { status: 400 });
    }
    if (!services.some((item) => item.id === serviceId)) {
      return NextResponse.json({ error: "Choose a valid service." }, { status: 400 });
    }

    const weeklySlots = getWeeklySlots();
    const configuredSlots = weeklySlots[String(getIsoWeekday(date))] ?? [];
    const dateSlots = date === getTodayInTimeZone(timeZone)
      ? configuredSlots.filter((time) => time > getCurrentTimeInTimeZone(timeZone))
      : configuredSlots;
    if (dateSlots.length === 0) return NextResponse.json({ times: [] });

    const pool = getPool();
    const reserved = await pool.query<{ time: string }>(
      `SELECT DISTINCT to_char(slot.time, 'HH24:MI') AS time
       FROM unnest($4::time[]) AS slot(time)
       WHERE EXISTS (
         SELECT 1 FROM appointments booked
         WHERE booked.stylist_id = $1
           AND booked.appointment_date BETWEEN $2::date - 1 AND $2::date + 1
           AND booked.status = 'confirmed'
           AND booked.appointment_date + booked.appointment_time < $2::date + slot.time + ($4::integer * interval '1 minute')
           AND booked.appointment_date + booked.appointment_time + (booked.duration_minutes * interval '1 minute') > $2::date + slot.time
       )`,
      [stylistId, date, dateSlots, serviceDurations[serviceId]],
    );
    const reservedTimes = new Set(reserved.rows.map((row) => row.time));
    return NextResponse.json({ times: dateSlots.filter((time) => !reservedTimes.has(time)), timeZone });
  } catch (error) {
    logSafeError(error);
    return configError();
  }
}

async function notifySalon(appointment: z.infer<typeof requestSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SALON_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!apiKey && !to && !from) return "not_configured" as const;
  if (!apiKey || !to || !from) {
    console.error("Appointment email notification is partially configured; set all email environment variables.");
    return "failed" as const;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "New Lauxirio appointment request",
        text: [
          `Name: ${appointment.name}`,
          `Email: ${appointment.email}`,
          `Phone: ${appointment.phone}`,
          `Service: ${appointment.serviceId}`,
          `Location: ${appointment.locationId}`,
          `Stylist: ${appointment.stylistId}`,
          `Preferred date: ${appointment.date} at ${appointment.time}`,
          `Notes: ${appointment.notes || "(none)"}`,
          "Status: Pending — confirm availability with the client.",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      console.error("Appointment notification delivery failed with status:", response.status);
      return "failed" as const;
    }
    return "sent" as const;
  } catch (error) {
    console.error("Appointment notification delivery failed:", error instanceof Error ? error.message : "Unknown error.");
    return "failed" as const;
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
  }
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const keyResult = z.string().uuid().safeParse(request.headers.get("idempotency-key"));
  if (!keyResult.success) {
    return NextResponse.json({ error: "A valid idempotency key is required." }, { status: 400 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the appointment details and try again." }, { status: 400 });
  }
  const appointment = parsed.data;

  try {
    const locations = getLocations();
    const stylists = getStylists();
    const timeZone = getSalonTimeZone();
    const weeklySlots = getWeeklySlots();
    const serviceDurations = getServiceDurations();
    if (!locations.some((item) => item.id === appointment.locationId)) {
      return NextResponse.json({ error: "Choose a configured location." }, { status: 400 });
    }
    if (!stylists.some((item) => item.id === appointment.stylistId)) {
      return NextResponse.json({ error: "Choose a configured stylist." }, { status: 400 });
    }
    if (!services.some((item) => item.id === appointment.serviceId)) {
      return NextResponse.json({ error: "Choose a valid service." }, { status: 400 });
    }
    if (!isValidFutureAppointment(appointment.date, appointment.time, timeZone)) {
      return NextResponse.json({ error: "Choose a future appointment date and time." }, { status: 400 });
    }
    if (!(weeklySlots[String(getIsoWeekday(appointment.date))] ?? []).includes(appointment.time)) {
      return NextResponse.json({ error: "That time is not in the studio's configured schedule." }, { status: 409 });
    }
    const durationMinutes = serviceDurations[appointment.serviceId];

    const pool = getPool();
    const existing = await pool.query<{ id: string; status: string }>(
      "SELECT id, status FROM appointments WHERE idempotency_key = $1",
      [keyResult.data],
    );
    if (existing.rowCount) {
      return NextResponse.json({
        id: existing.rows[0].id,
        status: existing.rows[0].status,
        notificationStatus: "not_repeated",
        message: "This appointment request was already received.",
      }, { status: 202 });
    }

    const occupied = await pool.query(
      `SELECT 1 FROM appointments
       WHERE stylist_id = $1
         AND appointment_date BETWEEN $2::date - 1 AND $2::date + 1
         AND status = 'confirmed'
         AND appointment_date + appointment_time < $2::date + $3::time + ($4::integer * interval '1 minute')
         AND appointment_date + appointment_time + (duration_minutes * interval '1 minute') > $2::date + $3::time
       LIMIT 1`,
      [appointment.stylistId, appointment.date, appointment.time, durationMinutes],
    );
    if (occupied.rowCount) {
      return NextResponse.json({ error: "That time has just been reserved. Please choose another available time." }, { status: 409 });
    }

    const id = randomUUID();
    const result = await pool.query<{ id: string; status: string }>(
      `INSERT INTO appointments (
         id, idempotency_key, location_id, service_id, stylist_id,
         appointment_date, appointment_time, customer_name, customer_phone,
         customer_email, notes, duration_minutes
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (idempotency_key) DO NOTHING
       RETURNING id, status`,
      [
        id,
        keyResult.data,
        appointment.locationId,
        appointment.serviceId,
        appointment.stylistId,
        appointment.date,
        appointment.time,
        appointment.name,
        appointment.phone,
        appointment.email.toLowerCase(),
        appointment.notes,
        durationMinutes,
      ],
    );

    if (result.rowCount === 0) {
      const existing = await pool.query<{ id: string; status: string }>(
        "SELECT id, status FROM appointments WHERE idempotency_key = $1",
        [keyResult.data],
      );
      if (existing.rowCount === 0) {
        return NextResponse.json({ error: "Unable to confirm request status. Please retry." }, { status: 503 });
      }
      return NextResponse.json({
        id: existing.rows[0].id,
        status: existing.rows[0].status,
        notificationStatus: "not_repeated",
        message: "This appointment request was already received.",
      }, { status: 202 });
    }

    const notificationStatus = await notifySalon(appointment);
    return NextResponse.json({
      id: result.rows[0].id,
      status: result.rows[0].status,
      notificationStatus,
      message: "Your appointment request is pending studio confirmation.",
    }, { status: 202 });
  } catch (error) {
    if (isPostgresUniqueViolation(error)) {
      return NextResponse.json({ error: "An active request already exists for that customer and time." }, { status: 409 });
    }
    logSafeError(error);
    return configError();
  }
}
