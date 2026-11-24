import { z } from "zod";

const optionSchema = z.object({
  id: z.string().trim().min(1).max(80),
  label: z.string().trim().min(1).max(120),
});

const weeklySlotsSchema = z.record(
  z.string().regex(/^[1-7]$/),
  z.array(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)),
);

function readJson<T>(name: string, schema: z.ZodType<T>): T {
  const raw = process.env[name];
  if (!raw) throw new Error(`${name} is not configured.`);
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error(`${name} must contain valid JSON.`);
  }
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new Error(`${name} does not match the required format.`);
  return parsed.data;
}

function ensureUniqueOptions(items: z.infer<typeof optionSchema>[], name: string) {
  const ids = items.map((item) => item.id);
  if (new Set(ids).size !== ids.length) throw new Error(`${name} contains duplicate IDs.`);
  return items;
}

export function getLocations() {
  return ensureUniqueOptions(
    readJson("SALON_LOCATIONS_JSON", z.array(optionSchema).min(1)),
    "SALON_LOCATIONS_JSON",
  );
}

export function getStylists() {
  return ensureUniqueOptions(
    readJson("SALON_STYLISTS_JSON", z.array(optionSchema).min(1)),
    "SALON_STYLISTS_JSON",
  );
}

export function getWeeklySlots() {
  return readJson("SALON_WEEKLY_AVAILABILITY_JSON", weeklySlotsSchema);
}

export function getServiceDurations() {
  const durations = readJson(
    "SALON_SERVICE_DURATION_MINUTES_JSON",
    z.record(z.string().regex(/^[a-z0-9-]+$/), z.number().int().min(1).max(1440)),
  );
  const missing = services.filter((service) => durations[service.id] === undefined);
  const unknown = Object.keys(durations).filter((id) => !services.some((service) => service.id === id));
  if (missing.length || unknown.length) {
    const problems = [
      missing.length ? `missing ${missing.map((service) => service.id).join(", ")}` : "",
      unknown.length ? `unknown ${unknown.join(", ")}` : "",
    ].filter(Boolean);
    throw new Error(`SALON_SERVICE_DURATION_MINUTES_JSON has ${problems.join("; ")}.`);
  }
  return durations;
}

export function getSalonTimeZone() {
  const timeZone = process.env.SALON_TIME_ZONE;
  if (!timeZone) throw new Error("SALON_TIME_ZONE is not configured.");
  try {
    new Intl.DateTimeFormat("en", { timeZone });
  } catch {
    throw new Error("SALON_TIME_ZONE must be a valid IANA time zone.");
  }
  return timeZone;
}

export const services = [
  { id: "signature-cut", label: "Signature cut" },
  { id: "dimensional-colour", label: "Dimensional colour" },
  { id: "hair-scalp-ritual", label: "Hair & scalp ritual" },
  { id: "grooming-ritual", label: "Grooming ritual" },
  { id: "bridal-beauty", label: "Bridal & occasion beauty" },
  { id: "consultation", label: "Consultation" },
] as const;

export function getIsoWeekday(date: string) {
  return new Date(`${date}T00:00:00.000Z`).getUTCDay() || 7;
}

export function getTodayInTimeZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function getCurrentTimeInTimeZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("hour")}:${part("minute")}`;
}

export function isValidFutureDate(date: string, timeZone: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return false;
  return date >= getTodayInTimeZone(timeZone);
}

export function isValidFutureAppointment(date: string, time: string, timeZone: string) {
  if (!isValidFutureDate(date, timeZone)) return false;
  return date !== getTodayInTimeZone(timeZone) || time > getCurrentTimeInTimeZone(timeZone);
}
