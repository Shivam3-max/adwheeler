"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, BRAND } from "@/lib/site";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";

const PRIMARY = ["/fleet", "/solutions", "/cities", "/franchise", "/about"];

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
              "border border-[var(--line)] bg-white/80 backdrop-blur-xl py-2.5 !px-4 shadow-[var(--shadow-md)]"
          )}
          style={scrolled ? { maxWidth: 1120 } : undefined}
        >
          <Link href="/" className="flex items-center shrink-0" aria-label={BRAND.name}>
            <span className="inline-flex items-center justify-center overflow-hidden rounded-[26px] bg-[#061b4a] p-1.5 shadow-[0_4px_14px_rgba(6,27,74,0.18)] transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/adwheeler-logo.webp"
                alt="AdWheeler"
                width={800}
                height={574}
                className="h-12 sm:h-14 md:h-16 w-auto"
              />
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
            <div className="hidden sm:block">
              <Magnetic strength={0.25}>
                <Link href="/campaign-planner" className="btn btn-primary text-sm">
                  Book your ad
                </Link>
              </Magnetic>
            </div>
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
          className="absolute inset-0 bg-white/90 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-0 overflow-y-auto transition-transform duration-700",
            open ? "translate-y-0" : "-translate-y-4"
          )}
        >
          <div className="wrap min-h-full flex flex-col justify-center py-24 sm:py-28">
            <p className="eyebrow mb-5 sm:mb-8">Navigate</p>
            <nav className="grid sm:grid-cols-2 sm:gap-x-16 gap-y-0 sm:gap-y-1 max-w-3xl w-full">
              {[{ label: "Home", href: "/" }, ...NAV, { label: "Contact", href: "/contact" }].map(
                (item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-baseline gap-4 py-2 sm:py-2.5 border-b border-[var(--line)]"
                  >
                    <span className="font-mono text-xs text-[var(--faint)] w-6">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-1 transition-all duration-300">
                      {item.label}
                    </span>
                  </Link>
                )
              )}
            </nav>
            <Link href="/campaign-planner" className="btn btn-primary mt-8 self-start">
              Book your ad
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
              <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-amber transition-colors">
                {BRAND.phone}
              </a>
              <span className="text-[var(--faint)] hidden sm:inline">·</span>
              <a href={`mailto:${BRAND.email}`} className="hover:text-amber transition-colors">
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
