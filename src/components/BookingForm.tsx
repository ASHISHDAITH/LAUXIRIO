"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const bookingSchema = z.object({
  locationId: z.string().min(1, "Choose a location"),
  serviceId: z.string().min(1, "Choose a service"),
  stylistId: z.string().min(1, "Choose an artist"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose an available time"),
  name: z.string().trim().min(2, "Enter your name").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(40),
  email: z.email("Enter a valid email").max(254),
  notes: z.string().max(2000).optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;
type BookingOption = { id: string; label: string };
type BookingService = BookingOption;
type BookingOptions = {
  locations: BookingOption[];
  stylists: BookingOption[];
  services: BookingService[];
  timeZone: string;
  today: string;
};

export default function BookingForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [requestKey, setRequestKey] = useState<string | null>(null);
  const [options, setOptions] = useState<BookingOptions>({
    locations: [],
    stylists: [],
    services: [],
    timeZone: "",
    today: "",
  });
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");
  const [availability, setAvailability] = useState<{ query: string; times: string[]; error: string }>({
    query: "",
    times: [],
    error: "",
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
  });
  const locationId = useWatch({ control, name: "locationId" });
  const stylistId = useWatch({ control, name: "stylistId" });
  const serviceId = useWatch({ control, name: "serviceId" });
  const date = useWatch({ control, name: "date" });
  const availabilityQuery = date && locationId && stylistId && serviceId
    ? new URLSearchParams({ date, locationId, stylistId, serviceId }).toString()
    : "";
  const availabilityMatches = availability.query === availabilityQuery && Boolean(availabilityQuery);
  const availableTimes = availabilityMatches ? availability.times : [];
  const availabilityMessage = !availabilityQuery
    ? "Choose a date, location, service and artist to check available times."
    : !availabilityMatches
      ? "Checking live availability..."
      : availability.error || (availableTimes.length ? "" : "No available times for this selection.");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/appointments", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Booking options are unavailable.");
        setOptions(result);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setOptionsError(error instanceof Error ? error.message : "Booking options are unavailable.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setOptionsLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!availabilityQuery) return;
    const controller = new AbortController();
    fetch(`/api/appointments?${availabilityQuery}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to check availability.");
        setAvailability({ query: availabilityQuery, times: result.times, error: "" });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setAvailability({
            query: availabilityQuery,
            times: [],
            error: error instanceof Error ? error.message : "Unable to check availability.",
          });
        }
      });
    return () => controller.abort();
  }, [availabilityQuery]);

  async function onSubmit(values: BookingValues) {
    setSubmitError("");
    const idempotencyKey = requestKey ?? crypto.randomUUID();
    if (!requestKey) setRequestKey(idempotencyKey);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to prepare your appointment request.");
      setRequestKey(null);
      setConfirmationMessage(
        result.notificationStatus === "failed"
          ? "Your request is pending, but the studio notification could not be delivered. The salon team should check the admin dashboard."
          : result.message,
      );
      setConfirmed(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to prepare your appointment request.");
    }
  }

  if (confirmed) {
    return (
      <div className="booking-confirmation" role="status">
        <div className="confirmation-mark"><Check size={24} /></div>
        <p className="eyebrow">Request received</p>
        <h3>Your appointment is pending.</h3>
        <p>{confirmationMessage}</p>
        <button className="text-button" onClick={() => setConfirmed(false)}>
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-grid">
        <label>
          <span>Location</span>
          <select
            {...register("locationId", { onChange: () => setValue("time", "") })}
            defaultValue=""
            disabled={optionsLoading || options.locations.length === 0}
          >
            <option value="" disabled>{optionsLoading ? "Loading locations..." : "Select a location"}</option>
            {options.locations.map((location) => <option value={location.id} key={location.id}>{location.label}</option>)}
          </select>
          {errors.locationId && <small>{errors.locationId.message}</small>}
        </label>
        <label>
          <span>Service</span>
          <select
            {...register("serviceId", { onChange: () => setValue("time", "") })}
            defaultValue=""
            disabled={optionsLoading || options.services.length === 0}
          >
            <option value="" disabled>Select a service</option>
            {options.services.map((service) => <option value={service.id} key={service.id}>{service.label}</option>)}
          </select>
          {errors.serviceId && <small>{errors.serviceId.message}</small>}
        </label>
        <label>
          <span>Preferred artist</span>
          <select
            {...register("stylistId", { onChange: () => setValue("time", "") })}
            defaultValue=""
            disabled={optionsLoading || options.stylists.length === 0}
          >
            <option value="" disabled>{optionsLoading ? "Loading artists..." : "Select an artist"}</option>
            {options.stylists.map((stylist) => <option value={stylist.id} key={stylist.id}>{stylist.label}</option>)}
          </select>
          {errors.stylistId && <small>{errors.stylistId.message}</small>}
        </label>
        <label>
          <span>Preferred date</span>
          <input type="date" min={options.today || undefined} {...register("date", { onChange: () => setValue("time", "") })} />
          {errors.date && <small>{errors.date.message}</small>}
        </label>
        <label>
          <span>Available time</span>
          <select {...register("time")} defaultValue="" disabled={availableTimes.length === 0}>
            <option value="" disabled>Select an available time</option>
            {availableTimes.map((time) => <option value={time} key={time}>{time}</option>)}
          </select>
          {availabilityMessage && <small role="status">{availabilityMessage}</small>}
          {errors.time && <small>{errors.time.message}</small>}
        </label>
      </div>
      {optionsError && <p role="alert" className="booking-error">{optionsError}</p>}
      {!optionsError && !optionsLoading && options.locations.length === 0 && (
        <p role="status" className="booking-error">Salon locations, services, artists and service durations have not been configured yet.</p>
      )}
      <div className="field-grid">
        <label>
          <span>Your name</span>
          <input type="text" autoComplete="name" placeholder="Full name" {...register("name")} />
          {errors.name && <small>{errors.name.message}</small>}
        </label>
        <label>
          <span>Phone</span>
          <input type="tel" autoComplete="tel" placeholder="Phone number" {...register("phone")} />
          {errors.phone && <small>{errors.phone.message}</small>}
        </label>
      </div>
      <label>
        <span>Email</span>
        <input type="email" autoComplete="email" placeholder="Email address" {...register("email")} />
        {errors.email && <small>{errors.email.message}</small>}
      </label>
      <label>
        <span>Notes <em>optional</em></span>
        <textarea rows={3} placeholder="Tell us about your desired look..." {...register("notes")} />
        {errors.notes && <small>{errors.notes.message}</small>}
      </label>
      <button className="primary-button booking-submit" type="submit" disabled={isSubmitting || optionsLoading || options.locations.length === 0 || availableTimes.length === 0}>
        {isSubmitting ? "Sending request..." : "Request Appointment"}
      </button>
      {submitError && <small role="alert">{submitError}</small>}
    </form>
  );
}
