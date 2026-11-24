CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY,
  idempotency_key uuid NOT NULL UNIQUE,
  location_id text NOT NULL,
  service_id text NOT NULL,
  stylist_id text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  duration_minutes integer NOT NULL
    CONSTRAINT appointments_duration_minutes_check CHECK (duration_minutes BETWEEN 1 AND 1440),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text NOT NULL,
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE appointments ADD COLUMN IF NOT EXISTS duration_minutes integer;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM appointments WHERE duration_minutes IS NULL) THEN
    RAISE EXCEPTION 'Set a verified duration_minutes for existing appointments before rerunning this migration.';
  END IF;
END $$;

ALTER TABLE appointments ALTER COLUMN duration_minutes SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'appointments_duration_minutes_check'
      AND conrelid = 'appointments'::regclass
  ) THEN
    ALTER TABLE appointments
      ADD CONSTRAINT appointments_duration_minutes_check CHECK (duration_minutes BETWEEN 1 AND 1440);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS appointments_confirmed_slot_unique
  ON appointments (location_id, stylist_id, appointment_date, appointment_time)
  WHERE status = 'confirmed';

CREATE UNIQUE INDEX IF NOT EXISTS appointments_active_customer_slot_unique
  ON appointments (
    lower(customer_email),
    location_id,
    stylist_id,
    appointment_date,
    appointment_time,
    service_id
  )
  WHERE status IN ('pending', 'confirmed');

CREATE INDEX IF NOT EXISTS appointments_date_status_idx
  ON appointments (appointment_date, status);
