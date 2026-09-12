import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingSystems from "@/components/BookingSystems";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Two simple ways to book AD Wheeler — full-day exclusive at ₹9,000, or shared slots at ₹5,000.",
};

const FAQ = [
  { q: "What are the running hours?", a: "Every vehicle runs the prime evening window — 4 PM to 10 PM — when streets and markets are busiest." },
  { q: "What's the difference between the two systems?", a: "Full-Day Booking is exclusive: one brand owns the whole 4–10 PM window. The Slot System is shared: up to three brands rotate, with each ad changing every 2 minutes." },
  { q: "Is the full-day price negotiable?", a: "No — ₹9,000 per day is a flat, non-negotiable rate for complete exclusivity." },
  { q: "How much screen time does one slot get?", a: "With ads rotating every 2 minutes across three brands, each slot accumulates roughly 2 hours of total screen time over the evening." },
  { q: "Can I change my creative?", a: "Yes. Send us your ad and we load it — swaps are quick and there's no extra charge." },
  { q: "Where do the vehicles run?", a: "Across Panchkula and the Tricity today, with more cities rolling out. Tell us your target area and we'll route for it." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple pricing. <span className="text-gradient">No packages.</span></>}
        sub="Two ways to book, one flat rate each. Pick the whole evening, or share a slot."
      />

      <BookingSystems heading={false} />

      <section className="section pt-0">
        <div className="wrap max-w-3xl">
          <Reveal className="mb-8">
            <p className="eyebrow mb-3">Questions</p>
            <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">Everything you need to know.</h2>
          </Reveal>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <Reveal key={f.q}>
                <details className="card p-6 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-lg pr-4">{f.q}</span>
                    <span className="text-amber text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-sm text-[var(--muted)] mt-3">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Ready to hit the road?" primary={{ label: "Book your ad", href: "/campaign-planner" }} secondary={{ label: "Talk to us", href: "/contact" }} />
    </>
  );
}
