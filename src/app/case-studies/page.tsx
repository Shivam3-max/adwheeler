import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { CASE_STUDIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real campaigns, real routes, real results from the AdWheeler network.",
};

const GRADS = ["from-[#1358d8] to-[#0ba7a0]", "from-[#f7861a] to-[#c81e5a]", "from-[#0a8f83] to-[#134e8f]"];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title={<>Campaigns that <span className="text-gradient">moved the needle.</span></>}
        sub="Challenge, strategy, execution, results — the full story behind the numbers."
      />

      <section className="section pt-4">
        <div className="wrap space-y-6">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.slug}>
              <article className="card overflow-hidden grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className={`relative min-h-[240px] bg-gradient-to-br ${GRADS[i % GRADS.length]} p-8 flex flex-col justify-between`}>
                  <div className="absolute inset-0 opacity-25 mix-blend-overlay bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.4)_3px)]" />
                  {c.slug === "super-dan-pizza" && <PizzaIllustration />}
                  <div className="relative flex items-center justify-between">
                    <span className="chip !bg-black/25 !border-white/25 !text-white">{c.cat}</span>
                    <span className="font-mono text-xs text-white/70">0{i + 1}</span>
                  </div>
                  <div className="relative">
                    <p className="font-mono text-xs text-white/70 mb-1">{c.brand}</p>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">{c.title}</h3>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <div className="space-y-5 mb-7">
                    <Block k="Challenge" v={c.challenge} />
                    <Block k="Strategy" v={c.strategy} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {c.results.map((r) => (
                      <div key={r.k} className="rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 text-center">
                        <p className="font-display text-xl text-amber">{r.v}</p>
                        <p className="text-[0.68rem] text-[var(--muted)] mt-1">{r.k}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand title="Your brand could be next." />
    </>
  );
}

function PizzaIllustration() {
  return (
    <svg
      aria-label="Illustration of a pizza slice"
      role="img"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute right-5 top-10 h-28 w-28 rotate-12 drop-shadow-[0_12px_12px_rgba(0,0,0,0.25)] md:right-8 md:top-8 md:h-36 md:w-36"
    >
      <path d="M28 49 Q100 7 172 49 L112 174 Q101 196 89 174 Z" fill="#b84b22" />
      <path d="M36 49 Q100 15 164 49 L153 68 Q100 39 47 68 Z" fill="#ffd68a" />
      <path d="M47 67 Q100 39 153 67 L109 165 Q101 180 93 165 Z" fill="#ffc94d" />
      <path d="M53 64 Q100 42 147 64" fill="none" stroke="#fff0c2" strokeWidth="5" strokeLinecap="round" />
      <g fill="#d84636" stroke="#a72c27" strokeWidth="2">
        <circle cx="82" cy="79" r="9" />
        <circle cx="124" cy="82" r="9" />
        <circle cx="103" cy="116" r="9" />
        <circle cx="83" cy="146" r="7" />
        <circle cx="120" cy="139" r="7" />
      </g>
      <g fill="#43824c">
        <path d="M102 65q12-12 15 0-7 9-15 0Z" />
        <path d="M67 111q12-12 15 0-7 9-15 0Z" />
        <path d="M128 111q12-12 15 0-7 9-15 0Z" />
      </g>
    </svg>
  );
}

function Block({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-mono text-[0.62rem] uppercase tracking-wider text-amber mb-1">{k}</p>
      <p className="text-[var(--ink-dim)]">{v}</p>
    </div>
  );
}
