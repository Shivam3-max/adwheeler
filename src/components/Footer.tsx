import Link from "next/link";
import { NAV, BRAND } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-[var(--line)] overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-[40rem] rounded-full blur-[120px] bg-[rgba(255,158,27,0.10)]" />

      <div className="wrap py-20 md:py-28 relative">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Let&apos;s talk</p>
            <h2 className="display text-[clamp(2.4rem,6vw,5rem)]">
              Put your brand
              <br />
              <span className="text-gradient">in motion.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/campaign-planner" className="btn btn-primary">
                Book a campaign
                <Arrow />
              </Link>
              <Link href="/franchise" className="btn btn-ghost">
                Become a partner
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--faint)] mb-4">
                Explore
              </p>
              <ul className="space-y-2.5">
                {NAV.slice(0, 6).map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--faint)] mb-4">
                More
              </p>
              <ul className="space-y-2.5">
                {NAV.slice(6).concat({ label: "Contact", href: "/contact" }).map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline my-14" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-semibold">
              {BRAND.name}<span className="text-amber"> 2.0</span>
            </p>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-sm">{BRAND.tagline}</p>
          </div>
          <div className="text-sm text-[var(--muted)] space-y-1 md:text-right">
            <a href={`tel:${BRAND.phoneRaw}`} className="block hover:text-amber transition-colors">{BRAND.phone}</a>
            <a href={`mailto:${BRAND.email}`} className="block hover:text-amber transition-colors">{BRAND.email}</a>
            <p className="text-[var(--faint)]">{BRAND.address}</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-[var(--faint)]">
          © {new Date().getFullYear()} {BRAND.name}. Placeholder site — data for demonstration.
        </p>
      </div>
    </footer>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
