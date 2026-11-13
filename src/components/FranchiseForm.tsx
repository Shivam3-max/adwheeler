"use client";

import { useState, type FormEvent } from "react";
import { CITIES } from "@/lib/site";

export default function FranchiseForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const fields = new FormData(form);

    try {
      const response = await fetch("/api/franchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          phone: fields.get("phone"),
          email: fields.get("email"),
          city: fields.get("city"),
          investmentCapacity: fields.get("investmentCapacity"),
          message: fields.get("message"),
          website: fields.get("website"),
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "We couldn’t submit your application. Please try again.");
      }

      setSuccessMessage(result?.message || "Our franchise team will contact you within two business days.");
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 text-center" role="status">
        <div className="mx-auto w-14 h-14 rounded-full grid place-items-center bg-[rgba(255,158,27,0.12)] border border-[var(--amber)]/40 mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="var(--amber)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="text-2xl mb-2">Application received.</h3>
        <p className="text-[var(--muted)] text-sm">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
      <input required name="name" maxLength={120} autoComplete="name" placeholder="Full name" className="field" />
      <input required name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Phone" className="field" />
      <input required name="email" type="email" maxLength={254} autoComplete="email" placeholder="Email" className="field sm:col-span-2" />
      <select required name="city" defaultValue="" className="field">
        <option value="" disabled>Preferred city</option>
        {CITIES.map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}
        <option value="other">Other</option>
      </select>
      <select required name="investmentCapacity" defaultValue="" className="field">
        <option value="" disabled>Investment capacity</option>
        <option>₹10–15 lakhs</option>
        <option>₹15–25 lakhs</option>
        <option>₹25–50 lakhs</option>
      </select>
      <textarea name="message" maxLength={5000} placeholder="Tell us about yourself and your market (optional)" className="field sm:col-span-2" />

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="franchise-website">Leave this field empty</label>
        <input id="franchise-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button disabled={status === "sending"} className="btn btn-primary sm:col-span-2 justify-center disabled:cursor-wait disabled:opacity-70">
        {status === "sending" ? "Submitting…" : "Submit application"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center sm:col-span-2" role="alert">{errorMessage}</p>
      )}
    </form>
  );
}
