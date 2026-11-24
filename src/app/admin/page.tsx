"use client";

import { useState } from "react";

type Appointment = {
  id: string;
  location_id: string;
  service_id: string;
  stylist_id: string;
  appointment_date: string;
  appointment_time: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
};

export default function AppointmentAdminPage() {
  const [token, setToken] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadAppointments() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/appointments", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load requests.");
      setAppointments(data.appointments);
    } catch (error) {
      setAppointments([]);
      setMessage(error instanceof Error ? error.message : "Could not load requests.");
    } finally {
      setBusy(false);
    }
  }

  async function updateStatus(id: string, status: Appointment["status"]) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update request.");
      await loadAppointments();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update request.");
      setBusy(false);
    }
  }

  return (
    <main className="inner-page admin-page">
      <section className="inner-hero">
        <p className="eyebrow">Salon operations</p>
        <h1>Appointment<br /><em>requests.</em></h1>
      </section>
      <section className="inner-content admin-content">
        <form className="admin-login" onSubmit={(event) => { event.preventDefault(); void loadAppointments(); }}>
          <label htmlFor="admin-token">Admin API token</label>
          <input
            id="admin-token"
            type="password"
            autoComplete="current-password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            required
          />
          <button className="primary-button" disabled={busy}>{busy ? "Loading..." : "Load requests"}</button>
        </form>
        {message && <p role="alert" className="admin-message">{message}</p>}
        <div className="admin-appointments">
          {appointments.map((appointment) => (
            <article key={appointment.id} className="admin-appointment">
              <div>
                <p className="eyebrow">{appointment.status} · {appointment.appointment_date} · {appointment.appointment_time}</p>
                <h2>{appointment.customer_name}</h2>
                <p>{appointment.service_id} · {appointment.location_id} · {appointment.stylist_id}</p>
                <a href={`mailto:${appointment.customer_email}`}>{appointment.customer_email}</a>
                <a href={`tel:${appointment.customer_phone}`}>{appointment.customer_phone}</a>
                {appointment.notes && <p>{appointment.notes}</p>}
              </div>
              <div className="admin-actions">
                {appointment.status === "pending" && (
                  <button disabled={busy} onClick={() => void updateStatus(appointment.id, "confirmed")}>Confirm</button>
                )}
                {appointment.status !== "cancelled" && (
                  <button disabled={busy} onClick={() => void updateStatus(appointment.id, "cancelled")}>Cancel</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
