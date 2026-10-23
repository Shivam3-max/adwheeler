"use client";

import { BRAND } from "@/lib/site";

const TOPICS = ["Book a campaign", "Franchise enquiry", "Partnership", "Support", "Other"];

export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fields = new FormData(e.currentTarget);
        const subject = `Website enquiry — ${fields.get("topic")}`;
        const body = [
          `Name: ${fields.get("name")}`,
          `Phone: ${fields.get("phone")}`,
          `Email: ${fields.get("email")}`,
          `Enquiry type: ${fields.get("topic")}`,
          "",
          "Message:",
          `${fields.get("message")}`,
        ].join("\n");

        window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
      className="card p-7 md:p-8 grid gap-3"
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <input required name="name" placeholder="Name" className="field" />
        <input required name="phone" type="tel" placeholder="Phone" className="field" />
      </div>
      <input required name="email" type="email" placeholder="Email" className="field" />
      <select name="topic" defaultValue={TOPICS[0]} className="field">
        {TOPICS.map((t) => <option key={t}>{t}</option>)}
      </select>
      <textarea required name="message" placeholder="How can we help?" className="field" />
      <button type="submit" className="btn btn-primary justify-center">Continue in email app</button>
      <p className="text-xs text-[var(--faint)] text-center">
        Your email app will open with your message filled in. Send it there to complete your enquiry.
      </p>
    </form>
  );
}
