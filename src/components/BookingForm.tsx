"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Check } from "lucide-react";
import { useMemo } from "react";

const bookingSchema = z.object({
  location: z.string().min(1, "Choose a location"),
  service: z.string().min(1, "Choose a service"),
  stylist: z.string().min(1, "Choose a stylist"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  name: z.string().trim().min(2, "Enter your name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z.email("Enter a valid email"),
  notes: z.string().optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const minimumDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
  });

  async function onSubmit(values: BookingValues) {
    setSubmitError("");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to prepare your appointment request.");
      setConfirmed(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to prepare your appointment request.");
    }
  }

  if (confirmed) {
    return (
      <div className="booking-confirmation" role="status">
        <div className="confirmation-mark"><Check size={24} /></div>
        <p className="eyebrow">Request prepared</p>
        <h3>Your Lauxirio moment is ready.</h3>
        <p>
          Your request was received by the salon enquiry system. It is not a confirmed
          appointment until the studio responds with availability.
        </p>
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
          <select {...register("location")} defaultValue="">
            <option value="" disabled>Select a location</option>
            <option>Design District Studio</option>
          </select>
          {errors.location && <small>{errors.location.message}</small>}
        </label>
        <label>
          <span>Service</span>
          <select {...register("service")} defaultValue="">
            <option value="" disabled>Select a treatment</option>
            <option>Signature Cut</option>
            <option>Dimensional Color</option>
            <option>Bridal Makeup</option>
            <option>Hair Spa Ritual</option>
            <option>Skin Ritual</option>
            <option>Grooming & Beard Design</option>
          </select>
          {errors.service && <small>{errors.service.message}</small>}
        </label>
        <label>
          <span>Preferred stylist</span>
          <select {...register("stylist")} defaultValue="">
            <option value="" disabled>Select a stylist</option>
            <option>Amelia Noir</option>
            <option>Leon Vale</option>
            <option>Maya Laurent</option>
            <option>First available</option>
          </select>
          {errors.stylist && <small>{errors.stylist.message}</small>}
        </label>
        <label>
          <span>Date</span>
          <input type="date" min={minimumDate} {...register("date")} />
          {errors.date && <small>{errors.date.message}</small>}
        </label>
        <label>
          <span>Time</span>
          <select {...register("time")} defaultValue="">
            <option value="" disabled>Select a time</option>
            <option>09:30</option>
            <option>11:00</option>
            <option>13:30</option>
            <option>15:00</option>
            <option>17:30</option>
          </select>
          {errors.time && <small>{errors.time.message}</small>}
        </label>
      </div>
      <div className="field-grid">
        <label>
          <span>Your name</span>
          <input type="text" placeholder="Full name" {...register("name")} />
          {errors.name && <small>{errors.name.message}</small>}
        </label>
        <label>
          <span>Phone</span>
          <input type="tel" placeholder="+1 555 000 000" {...register("phone")} />
          {errors.phone && <small>{errors.phone.message}</small>}
        </label>
      </div>
      <label>
        <span>Email</span>
        <input type="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <small>{errors.email.message}</small>}
      </label>
      <label>
        <span>Notes <em>optional</em></span>
        <textarea rows={3} placeholder="Tell us about your desired look..." {...register("notes")} />
      </label>
      <button className="primary-button booking-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Preparing request..." : "Request Appointment"}
      </button>
      {submitError && <small role="alert">{submitError}</small>}
    </form>
  );
}
