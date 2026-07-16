"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, BRAND } from "@/lib/site";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";

const PRIMARY = ["/fleet", "/solutions", "/cities", "/technology", "/franchise"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const primaryLinks = NAV.filter((n) => PRIMARY.includes(n.href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[900] transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "wrap flex items-center justify-between rounded-full transition-all duration-500",
            scrolled &&
              "border border-[var(--line)] bg-[rgba(9,10,14,0.72)] backdrop-blur-xl py-2.5 !px-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
          )}
          style={scrolled ? { maxWidth: 1120 } : undefined}
        >
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={BRAND.name}>
            <Logo />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">
              {BRAND.name}
              <span className="text-amber"> 2.0</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 text-sm rounded-full transition-colors duration-300",
                  pathname === item.href
                    ? "text-[var(--ink)]"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Magnetic strength={0.25} className="hidden sm:inline-flex">
              <Link href="/campaign-planner" className="btn btn-primary text-sm">
                Book Campaign
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid place-items-center w-10 h-10 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] hover:border-[var(--cyan)] transition-colors"
            >
              <span className="relative block w-4 h-3">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full bg-[var(--ink)] transition-all duration-300",
                    open && "top-[5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-[1.5px] w-full bg-[var(--ink)] transition-all duration-300",
                    open && "bottom-[6px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-[899] transition-all duration-500",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-[rgba(5,5,8,0.86)] backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-center wrap transition-transform duration-700",
            open ? "translate-y-0" : "-translate-y-4"
          )}
        >
          <p className="eyebrow mb-8">Navigate</p>
          <nav className="grid sm:grid-cols-2 gap-x-16 gap-y-1 max-w-3xl">
            {[{ label: "Home", href: "/" }, ...NAV, { label: "Contact", href: "/contact" }].map(
              (item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-baseline gap-4 py-2.5 border-b border-[var(--line)]"
                >
                  <span className="font-mono text-xs text-[var(--faint)] w-6">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl md:text-3xl font-medium text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-1 transition-all duration-300">
                    {item.label}
                  </span>
                </Link>
              )
            )}
          </nav>
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-[var(--muted)]">
            <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-amber transition-colors">
              {BRAND.phone}
            </a>
            <span className="text-[var(--faint)]">·</span>
            <a href={`mailto:${BRAND.email}`} className="hover:text-amber transition-colors">
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--amber-hi)] to-[var(--amber-deep)] shadow-[0_0_20px_-4px_var(--amber-glow)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="18" r="2.4" stroke="#1a1206" strokeWidth="1.8" />
        <circle cx="17.5" cy="18" r="2.4" stroke="#1a1206" strokeWidth="1.8" />
        <path d="M3 18V8.5A1.5 1.5 0 0 1 4.5 7H14l3.5 4.5H21v6.5" stroke="#1a1206" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 11h5v3H6z" fill="#1a1206" opacity="0.55" />
      </svg>
    </span>
  );
}
