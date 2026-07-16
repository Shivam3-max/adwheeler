const BRANDS = [
  "Elite Outfits",
  "Super Dan Pizza",
  "Skyline Residences",
  "Aveda Clinics",
  "Burger King",
  "KFC",
  "VoteForward",
  "Metro Cash & Carry",
  "Fitness First",
];

export default function Marquee() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <div className="relative overflow-hidden py-8 border-y border-[var(--line)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      <div className="marquee">
        {items.map((b, i) => (
          <span
            key={i}
            className="font-display text-xl md:text-2xl font-medium text-[var(--faint)] whitespace-nowrap flex items-center gap-3"
          >
            {b}
            <span className="dot opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}
