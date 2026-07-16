import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { CASE_STUDIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real campaigns, real routes, real results from the AD Wheeler network.",
};

const GRADS = ["from-[#1358d8] to-[#38e5df]", "from-[#e2b100] to-[#c81e5a]", "from-[#0a8f83] to-[#134e8f]"];

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

function Block({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-mono text-[0.62rem] uppercase tracking-wider text-amber mb-1">{k}</p>
      <p className="text-[var(--ink-dim)]">{v}</p>
    </div>
  );
}
