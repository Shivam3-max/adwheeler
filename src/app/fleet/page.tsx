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
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}

function VehicleLarge() {
  return (
    <svg viewBox="0 0 240 152" className="w-[82%] max-w-[560px] drop-shadow-[0_26px_46px_rgba(16,22,34,0.20)]">
      <defs>
        <linearGradient id="fl-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffbe50" /><stop offset="1" stopColor="#ef8c12" /></linearGradient>
        <linearGradient id="fl-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffcd6e" /><stop offset="1" stopColor="#f19a1e" /></linearGradient>
        <linearGradient id="fl-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d6ecff" /><stop offset="1" stopColor="#8ec0e8" /></linearGradient>
        <linearGradient id="fl-ad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1358d8" /><stop offset="1" stopColor="#0ba7a0" /></linearGradient>
        <radialGradient id="fl-head" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#fff6d8" /><stop offset="1" stopColor="#ffd34d" /></radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="120" cy="143" rx="101" ry="6.5" fill="rgba(16,22,34,0.12)" />
      {/* base skirt */}
      <rect x="22" y="108" width="190" height="12" rx="4" fill="url(#fl-body)" />

      {/* LED billboard housing (rear / left) + screen */}
      <rect x="16" y="20" width="110" height="95" rx="11" fill="#17181d" />
      <rect x="22" y="13" width="98" height="9" rx="4" fill="#0e0f12" />
      <rect x="25" y="30" width="92" height="74" rx="6" fill="url(#fl-ad)" />
      <text x="71" y="62" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="13" fill="#fff">YOUR AD</text>
      <text x="71" y="80" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="12" fill="#fff" opacity="0.9">HERE</text>

      {/* cab (front / right) */}
      <path d="M123 110 L123 66 Q123 57 132 55 L151 51 L187 51 Q199 51 203 66 L209 110 Z" fill="url(#fl-cab)" stroke="#cf6f08" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M136 56 L185 53 Q195 53 198 63 L136 63 Z" fill="rgba(255,255,255,0.22)" />
      <path d="M153 60 L184 60 Q191 60 194 69 L198 87 L153 87 Z" fill="url(#fl-glass)" />
      <path d="M153 60 L160 60 L156 87 L153 87 Z" fill="rgba(255,255,255,0.28)" />
      <line x1="153" y1="61" x2="153" y2="108" stroke="#cf6f08" strokeWidth="1.5" />
      <rect x="162" y="95" width="12" height="3" rx="1.5" fill="#cf6f08" />
      <rect x="203" y="102" width="9" height="10" rx="3" fill="#2a2d34" />
      <ellipse cx="206" cy="94" rx="4.5" ry="6.5" fill="url(#fl-head)" />

      {/* wheels */}
      {[66, 172].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={122} r="16" fill="#15171c" />
          <circle cx={cx} cy={122} r="9" fill="#3b404a" />
          <g stroke="#5a606b" strokeWidth="2">
            <line x1={cx} y1={109} x2={cx} y2={135} />
            <line x1={cx - 13} y1={122} x2={cx + 13} y2={122} />
            <line x1={cx - 9} y1={113} x2={cx + 9} y2={131} />
            <line x1={cx + 9} y1={113} x2={cx - 9} y2={131} />
          </g>
          <circle cx={cx} cy={122} r="3" fill="#1c1f25" />
        </g>
      ))}
    </svg>
  );
}
