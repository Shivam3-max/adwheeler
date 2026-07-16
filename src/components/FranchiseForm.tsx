"use client";

import { useState } from "react";
import { CITIES } from "@/lib/site";

export default function FranchiseForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full grid place-items-center bg-[rgba(255,158,27,0.12)] border border-[var(--amber)]/40 mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--amber)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="text-2xl mb-2">Application received.</h3>
        <p className="text-[var(--muted)] text-sm">Our franchise team will reach out within two business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid sm:grid-cols-2 gap-3">
      <input required placeholder="Full name" className="field" />
      <input required type="tel" placeholder="Phone" className="field" />
      <input required type="email" placeholder="Email" className="field sm:col-span-2" />
      <select required defaultValue="" className="field">
        <option value="" disabled>Preferred city</option>
        {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        <option value="other">Other</option>
      </select>
      <select required defaultValue="" className="field">
        <option value="" disabled>Investment capacity</option>
        <option>₹18 L – ₹40 L</option>
        <option>₹40 L – ₹1 Cr</option>
        <option>₹1 Cr+</option>
      </select>
      <textarea placeholder="Tell us about yourself and your market (optional)" className="field sm:col-span-2" />
      <button className="btn btn-primary sm:col-span-2 justify-center">Submit application</button>
      <p className="text-xs text-[var(--faint)] sm:col-span-2">Demo form — submissions are not stored.</p>
    </form>
  );
}
