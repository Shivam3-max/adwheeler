import IndiaMap from "@/components/IndiaMap";
import Reveal from "@/components/Reveal";

export default function Coverage() {
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="wrap relative">
        <Reveal className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Coverage</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            We don&apos;t buy locations.
            <br />
            <span className="text-gradient">We move through them.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <IndiaMap />
        </Reveal>
      </div>
    </section>
  );
}
