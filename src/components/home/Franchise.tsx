import Link from "next/link";
import { GlobeCanvas } from "@/components/three/Lazy";
import RoiCalculator from "@/components/RoiCalculator";
import Reveal from "@/components/Reveal";

export default function Franchise() {
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px] bg-[rgba(56,229,223,0.08)]" />
      <div className="wrap relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Franchise</p>
              <h2 className="display text-[clamp(2rem,5vw,3.8rem)]">
                Own a slice of the <span className="text-gradient">moving grid.</span>
              </h2>
              <p className="mt-5 text-[var(--ink-dim)] max-w-md">
                Territories are lighting up across India — and beyond. Bring the
                network to your city with a turnkey fleet, technology and playbook.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/franchise" className="btn btn-primary">Become a partner</Link>
                <Link href="/franchise" className="btn btn-ghost">See territories</Link>
              </div>
            </Reveal>

            <Reveal delay={120} className="relative mt-10 h-64 md:h-80">
              <GlobeCanvas />
            </Reveal>
          </div>

          <Reveal delay={100}>
            <RoiCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
