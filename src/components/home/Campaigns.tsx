import { CAMPAIGNS } from "@/lib/site";
import Reveal from "@/components/Reveal";

const GRADS = [
  "from-[#1358d8] to-[#38e5df]",
  "from-[#e2b100] to-[#c81e5a]",
  "from-[#0a8f83] to-[#134e8f]",
  "from-[#c81e5a] to-[#ff9e1b]",
  "from-[#5b21b6] to-[#38e5df]",
];

export default function Campaigns() {
  return (
    <section className="section relative overflow-hidden">
      <div className="wrap">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow mb-4">Featured campaigns</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            Brands already <span className="text-gradient">moving.</span>
          </h2>
        </Reveal>
      </div>

      <div className="flex gap-5 overflow-x-auto no-scrollbar px-[max(28px,calc((100vw-1280px)/2+28px))] pb-6 snap-x snap-mandatory">
        {CAMPAIGNS.map((c, i) => (
          <div
            key={c.brand}
            className="snap-start shrink-0 w-[300px] md:w-[360px] rounded-[26px] overflow-hidden border border-[var(--line)] group"
          >
            <div className={`relative h-52 bg-gradient-to-br ${GRADS[i % GRADS.length]} overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(0,0,0,0),rgba(0,0,0,0.45))]" />
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.4)_3px)]" />
              <span className="absolute top-4 left-4 chip !bg-black/30 !border-white/20 !text-white">{c.cat}</span>
              <div className="absolute bottom-4 left-4">
                <p className="font-display text-2xl font-semibold text-white drop-shadow">{c.metric}</p>
              </div>
              <svg className="absolute bottom-4 right-4 w-10 h-10 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="p-6 bg-[var(--bg-2)]">
              <h3 className="text-lg mb-1">{c.brand}</h3>
              <p className="text-xs font-mono text-[var(--faint)] mb-3">{c.area}</p>
              <p className="text-sm text-[var(--ink-dim)] italic">&ldquo;{c.quote}&rdquo;</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
