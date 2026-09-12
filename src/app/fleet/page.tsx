import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "The Vehicles",
  description: "GPS-tracked electric LED vehicles that carry your ad through the city, 4 PM to 10 PM.",
};

const FEATURES = [
  { t: "Bright LED screen", d: "A high-brightness digital screen plays your ad in full colour — clearly visible through the evening." },
  { t: "GPS-tracked", d: "Every vehicle is tracked live, so you always know where your ad has travelled." },
  { t: "Electric & quiet", d: "Clean, silent electric vehicles that move through markets and residential lanes with ease." },
  { t: "Prime-time routes", d: "Runs the busiest window — 4 PM to 10 PM — across high-footfall areas of the city." },
  { t: "Instant creative swaps", d: "Send us your ad and we load it on. Changing the creative takes minutes, not weeks." },
  { t: "Two sides of visibility", d: "The screen faces the street on both sides, catching traffic and footfall from every angle." },
];

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="The vehicles"
        title={<>A billboard that <span className="text-gradient">drives itself to the crowd.</span></>}
        sub="Our fleet is simple by design: bright electric LED vehicles that carry your ad through the busiest streets, every evening."
      />

      {/* vehicle showcase */}
      <section className="section pt-4">
        <div className="wrap">
          <Reveal>
            <div className="relative frame rounded-[26px] overflow-hidden bg-[var(--bg-2)]">
              <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
              <div className="pointer-events-none absolute -top-10 right-[10%] h-56 w-56 rounded-full blur-[90px] bg-[rgba(247,134,26,0.18)]" />
              <div className="relative grid place-items-center py-16 md:py-24">
                <VehicleLarge />
              </div>
              <span className="absolute top-5 left-5 chip"><span className="dot" /> Live 4 PM – 10 PM</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* features */}
      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="max-w-xl mb-12">
            <p className="eyebrow mb-4">What&apos;s on board</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)]">Everything it needs. Nothing it doesn&apos;t.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) * 80} className="card p-7">
                <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg mt-3 mb-1">{f.t}</h3>
                <p className="text-sm text-[var(--muted)]">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Put your brand on one."
        sub="Pick a full evening or a shared slot, and we'll get your ad on the road."
        primary={{ label: "Book your ad", href: "/campaign-planner" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}

function VehicleLarge() {
  return (
    <svg viewBox="0 0 340 210" className="w-[80%] max-w-[520px] drop-shadow-[0_24px_50px_rgba(16,22,34,0.18)]">
      <defs>
        <linearGradient id="fleet-ad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1358d8" />
          <stop offset="100%" stopColor="#0ba7a0" />
        </linearGradient>
      </defs>
      {/* body */}
      <path d="M20 168 L20 104 Q20 96 28 96 L120 96 L146 66 L214 66 Z" fill="#f7a11c" stroke="#c25c00" strokeWidth="2" />
      <path d="M126 96 L150 70 L190 70 L190 96 Z" fill="#0a1a2a" opacity="0.85" />
      {/* LED box */}
      <rect x="150" y="34" width="150" height="104" rx="8" fill="#141414" stroke="#000" strokeWidth="2" />
      <rect x="150" y="24" width="150" height="12" rx="3" fill="#0d0d0d" />
      {/* screen */}
      <rect x="160" y="44" width="130" height="84" rx="4" fill="url(#fleet-ad)" />
      <text x="225" y="82" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="20" fill="#fff">YOUR AD</text>
      <text x="225" y="106" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="16" fill="#ffffff" opacity="0.9">HERE</text>
      {/* wheels */}
      <circle cx="70" cy="172" r="22" fill="#14161b" stroke="#2a2d34" strokeWidth="5" />
      <circle cx="70" cy="172" r="7" fill="#3a3d45" />
      <circle cx="250" cy="172" r="22" fill="#14161b" stroke="#2a2d34" strokeWidth="5" />
      <circle cx="250" cy="172" r="7" fill="#3a3d45" />
      {/* headlight */}
      <circle cx="24" cy="128" r="5" fill="#fff3d6" />
    </svg>
  );
}
