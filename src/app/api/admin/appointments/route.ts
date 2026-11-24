import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getPool } from "@/lib/database";

function isAuthorized(request: Request) {
  const expected = process.env.ADMIN_API_TOKEN;
  const authorization = request.headers.get("authorization");
  if (!expected || expected.length < 32 || !authorization?.startsWith("Bearer ")) return false;
  const provided = Buffer.from(authorization.slice(7));
  const secret = Buffer.from(expected);
  return provided.length === secret.length && timingSafeEqual(provided, secret);
}

function unauthorized() {
  return NextResponse.json({ error: "Admin access is not configured or the token is invalid." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  try {
    const url = new URL(request.url);
    const requestedLimit = Number(url.searchParams.get("limit") || 50);
    const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(Math.floor(requestedLimit), 1), 200) : 50;
    const result = await getPool().query(
      `SELECT id, location_id, service_id, stylist_id, appointment_date,
              to_char(appointment_time, 'HH24:MI') AS appointment_time,
              customer_name, customer_phone, customer_email, notes, status,
              created_at, updated_at
       FROM appointments
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit],
    );
    return NextResponse.json({ appointments: result.rows });
  } catch (error) {
    console.error("Admin appointment list failed:", error instanceof Error ? error.name : "Unknown error.");
    return NextResponse.json({ error: "Unable to load appointment requests." }, { status: 503 });
  }
}

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
}).strict();

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: "Provide a valid appointment ID and status." }, { status: 400 });

  try {
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");
      const current = await client.query<{
        id: string;
        location_id: string;
        stylist_id: string;
        appointment_date: string;
        appointment_time: string;
        duration_minutes: number;
      }>(
        `SELECT id, location_id, stylist_id, appointment_date,
                appointment_time, duration_minutes
         FROM appointments
         WHERE id = $1
         FOR UPDATE`,
        [parsed.data.id],
      );
      if (current.rowCount === 0) {
        await client.query("ROLLBACK");
        return NextResponse.json({ error: "Appointment request not found." }, { status: 404 });
      }

      const target = current.rows[0];
      if (parsed.data.status === "confirmed") {
        await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
          target.stylist_id,
        ]);
        const conflict = await client.query(
          `SELECT 1 FROM appointments booked
           WHERE booked.id <> $1 AND booked.stylist_id = $2
             AND booked.status = 'confirmed'
             AND booked.appointment_date BETWEEN $3::date - 1 AND $3::date + 1
             AND booked.appointment_date + booked.appointment_time
                 < $3::date + $4::time + ($5::integer * interval '1 minute')
             AND booked.appointment_date + booked.appointment_time
                   + (booked.duration_minutes * interval '1 minute') > $3::date + $4::time
           LIMIT 1`,
          [
            target.id,
            target.stylist_id,
            target.appointment_date,
            target.appointment_time,
            target.duration_minutes,
          ],
        );
        if (conflict.rowCount) {
          await client.query("ROLLBACK");
          return NextResponse.json(
            { error: "That stylist is already confirmed for an overlapping appointment." },
            { status: 409 },
          );
        }
      }

      const result = await client.query(
        `UPDATE appointments
         SET status = $2, updated_at = now()
         WHERE id = $1
         RETURNING id, status, updated_at`,
        [target.id, parsed.data.status],
      );
      await client.query("COMMIT");
      return NextResponse.json({ appointment: result.rows[0] });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
      return NextResponse.json({ error: "That stylist and time slot has already been confirmed." }, { status: 409 });
    }
    console.error("Admin appointment update failed:", error instanceof Error ? error.name : "Unknown error.");
    return NextResponse.json({ error: "Unable to update appointment request." }, { status: 503 });
  }
}
