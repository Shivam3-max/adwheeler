"use client";

import { useState } from "react";

const TOPICS = ["Book a campaign", "Franchise enquiry", "Partnership", "Support", "Other"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card p-10 text-center h-full grid place-items-center">
        <div>
          <div className="mx-auto w-14 h-14 rounded-full grid place-items-center bg-[rgba(56,229,223,0.12)] border border-[var(--cyan)]/40 mb-4">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h3 className="text-2xl mb-2">Message sent.</h3>
          <p className="text-[var(--muted)] text-sm">We&apos;ll get back to you within one business day.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="card p-7 md:p-8 grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input required placeholder="Name" className="field" />
        <input required type="tel" placeholder="Phone" className="field" />
      </div>
      <input required type="email" placeholder="Email" className="field" />
      <select defaultValue={TOPICS[0]} className="field">
        {TOPICS.map((t) => <option key={t}>{t}</option>)}
      </select>
      <textarea required placeholder="How can we help?" className="field" />
      <button className="btn btn-primary justify-center">Send message</button>
      <p className="text-xs text-[var(--faint)]">Demo form — submissions are not stored.</p>
    </form>
  );
}
