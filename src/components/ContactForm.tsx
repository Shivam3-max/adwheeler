"use client";

import { useState, type FormEvent } from "react";

const TOPICS = ["Book a campaign", "Franchise enquiry", "Partnership", "Support", "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: fields.get("name"),
      phone: fields.get("phone"),
      email: fields.get("email"),
      topic: fields.get("topic"),
      message: fields.get("message"),
      website: fields.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "We couldn’t send your message. Please try again.");
      }

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
      <div className="card p-10 text-center h-full grid place-items-center" role="status">
        <div>
          <div className="mx-auto w-14 h-14 rounded-full grid place-items-center bg-[rgba(56,229,223,0.12)] border border-[var(--cyan)]/40 mb-4">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="var(--cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h3 className="text-2xl mb-2">Message sent.</h3>
          <p className="text-[var(--muted)] text-sm">We&apos;ll get back to you within three business days.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 md:p-8 grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input required name="name" maxLength={120} autoComplete="name" placeholder="Name" className="field" />
        <input required name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Phone" className="field" />
      </div>
      <input required name="email" type="email" maxLength={254} autoComplete="email" placeholder="Email" className="field" />
      <select name="topic" defaultValue={TOPICS[0]} className="field">
        {TOPICS.map((topic) => <option key={topic}>{topic}</option>)}
      </select>
      <textarea required name="message" maxLength={5000} placeholder="How can we help?" className="field" />

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary justify-center disabled:cursor-wait disabled:opacity-70">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" ? (
        <p className="text-sm text-red-600 text-center" role="alert">{errorMessage}</p>
      ) : (
        <p className="text-xs text-[var(--faint)] text-center" aria-live="polite">
          Your enquiry will be sent securely to our team.
        </p>
      )}
    </form>
  );
}
