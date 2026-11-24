import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

type AppointmentRequest = {
  location?: string;
  service?: string;
  stylist?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
};

function validateRequest(value: AppointmentRequest) {
  const required = ["location", "service", "stylist", "date", "time", "name", "phone", "email"] as const;
  for (const field of required) {
    if (!value[field]?.trim()) return `Missing ${field}.`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email || "")) return "Enter a valid email.";
  if ((value.phone || "").replace(/\D/g, "").length < 7) return "Enter a valid phone number.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value.date || "")) return "Choose a valid date.";
  if (value.date! < new Date().toISOString().slice(0, 10)) return "Choose a future date.";
  for (const field of ["name", "phone", "email", "notes"] as const) {
    if (value[field] && value[field]!.length > 2000) return `The ${field} field is too long.`;
  }
  return null;
}

export async function POST(request: Request) {
  let body: AppointmentRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validationError = validateRequest(body);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const id = randomUUID();
  const record = {
    id,
    ...body,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  const directory = path.join(process.cwd(), ".data");
  const file = path.join(directory, "appointments.json");
  await mkdir(directory, { recursive: true });

  let appointments: unknown[] = [];
  try {
    appointments = JSON.parse(await readFile(file, "utf8"));
  } catch {
    appointments = [];
  }
  appointments.push(record);
  try {
    await writeFile(file, JSON.stringify(appointments, null, 2), "utf8");
  } catch {
    return NextResponse.json({ error: "The enquiry system is temporarily unavailable." }, { status: 503 });
  }

  return NextResponse.json({
    id,
    status: "pending",
    message: "Your appointment request was received.",
  });
}
