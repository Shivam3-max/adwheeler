import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_50%,rgba(255,158,27,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div className="wrap relative text-center">
        <Reveal>
          <p className="eyebrow justify-center mb-8">The streets are waiting</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display text-[clamp(2.8rem,11vw,10rem)] leading-[0.92]">
            Ready to own
            <br />
            <span className="text-gradient">the streets?</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Magnetic strength={0.3}>
              <Link href="/campaign-planner" className="btn btn-primary text-base">
                Book campaign
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link href="/franchise" className="btn btn-ghost text-base">
                Become franchise
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
