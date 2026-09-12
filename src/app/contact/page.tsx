import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a demo, start a campaign, or enquire about a franchise territory.",
};

const OFFICES = [
  { city: "Panchkula", role: "Head office", addr: "Panchkula, Haryana — Tricity" },
  { city: "Chandigarh · Mohali", role: "Tricity fleet", addr: "Full coverage across the Tricity" },
  { city: "Pan-India", role: "Expanding", addr: "New cities rolling out — talk to us" },
];

export default function ContactPage() {
  const wa = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent("Hi AD Wheeler, I'd like to know more.")}`;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s put your brand <span className="text-gradient">in motion.</span></>}
        sub="Book a demo, plan a campaign, or explore a franchise. We usually reply within a day."
      />

      <section className="section pt-4">
        <div className="wrap grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
          {/* left: quick contact + map */}
          <div className="flex flex-col gap-4">
            <Reveal className="grid sm:grid-cols-2 gap-4">
              <a href={`tel:${BRAND.phoneRaw}`} className="card p-6 group">
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--faint)] mb-2">Call</p>
                <p className="text-lg group-hover:text-amber transition-colors">{BRAND.phone}</p>
              </a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="card p-6 group">
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--faint)] mb-2">WhatsApp</p>
                <p className="text-lg group-hover:text-cyan transition-colors">Chat now →</p>
              </a>
              <a href={`mailto:${BRAND.email}`} className="card p-6 group sm:col-span-2">
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--faint)] mb-2">Email</p>
                <p className="text-lg group-hover:text-amber transition-colors">{BRAND.email}</p>
              </a>
            </Reveal>

            {/* stylised map */}
            <Reveal delay={80} className="card p-0 overflow-hidden">
              <div className="relative h-64 bg-[var(--bg-2)]">
                <div className="absolute inset-0 grid-lines opacity-70" />
                <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full">
                  <path d="M0 180 C 90 150 120 200 200 170 S 320 140 400 175" fill="none" stroke="rgba(11,167,160,0.35)" strokeWidth="2" />
                  <path d="M40 60 C 120 90 160 40 240 80 S 360 120 400 90" fill="none" stroke="rgba(247,134,26,0.3)" strokeWidth="2" />
                  <circle cx="150" cy="150" r="6" fill="#f7861a" />
                  <circle cx="150" cy="150" r="6" fill="none" stroke="#f7861a" strokeWidth="1.5">
                    <animate attributeName="r" values="6;20;6" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <span className="absolute bottom-4 left-4 chip">Head office · Panchkula</span>
              </div>
            </Reveal>
          </div>

          {/* right: form */}
          <Reveal delay={60}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* offices */}
      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="mb-10">
            <p className="eyebrow mb-3">Offices</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">Find us across India.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {OFFICES.map((o, i) => (
              <Reveal key={o.city} delay={i * 80} className="card p-7">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl">{o.city}</h3>
                  <span className="chip !text-[0.6rem]">{o.role}</span>
                </div>
                <p className="text-sm text-[var(--muted)]">{o.addr}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
