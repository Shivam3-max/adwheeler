import Link from "next/link";
import Reveal from "./Reveal";

export default function CTABand({
  title = "Ready to move your brand?",
  sub = "Launch a campaign in under an hour, or bring the network to your city.",
  primary = { label: "Book campaign", href: "/campaign-planner" },
  secondary = { label: "Become a partner", href: "/franchise" },
}: {
  title?: string;
  sub?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[var(--line)] p-10 md:p-16 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(255,158,27,0.14),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />
            <div className="relative">
              <h2 className="display text-[clamp(2rem,5.5vw,4rem)] max-w-2xl mx-auto">{title}</h2>
              <p className="mt-5 text-[var(--ink-dim)] max-w-lg mx-auto">{sub}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href={primary.href} className="btn btn-primary">{primary.label}</Link>
                <Link href={secondary.href} className="btn btn-ghost">{secondary.label}</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
