// ============================================================================
// AD WHEELER 2.0 — central content source (placeholder data, swap later)
// ============================================================================

export const BRAND = {
  name: "AD Wheeler",
  version: "2.0",
  tagline: "Panchkula & Tricity's smart mobile LED advertising — now going pan-India",
  phone: "+91 98889 87161",
  phoneRaw: "919888987161",
  email: "hello@adwheeler.in",
  base: "Panchkula · Tricity",
  address: "Panchkula, Haryana — serving Tricity (Chandigarh · Mohali · Panchkula)",
};

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Cities", href: "/cities" },
  { label: "Planner", href: "/campaign-planner" },
  { label: "Technology", href: "/technology" },
  { label: "Franchise", href: "/franchise" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export const STATS = [
  { value: 24, suffix: "+", label: "LED vehicles" },
  { value: 6, suffix: " hrs", label: "Live every evening" },
  { value: 2, suffix: " min", label: "Slot rotation" },
  { value: 120, suffix: "+", label: "Brands served" },
  { value: 12, suffix: "+", label: "Cities on roadmap" },
];

// Booking window that the whole business runs on.
export const WINDOW = { start: "4 PM", end: "10 PM", hours: 6 };

// The only two ways to book. Full-day = one exclusive brand. Slot = shared, rotating.
export const BOOKING = [
  {
    id: "full-day",
    name: "Full-Day Booking",
    badge: "Exclusive",
    price: "₹9,000",
    unit: "per day",
    note: "Flat rate · non-negotiable",
    tagline: "One brand owns the entire evening.",
    points: [
      "Runs 4 PM – 10 PM, non-stop",
      "100% of screen time — your brand only",
      "No rotation, no sharing with anyone",
      "GPS-tracked route across the city",
    ],
  },
  {
    id: "slot",
    name: "Slot System",
    badge: "Shared",
    price: "₹5,000",
    unit: "per slot",
    note: "3 slots available each day",
    tagline: "Share the evening, split the cost.",
    points: [
      "3 slots across the 4 PM – 10 PM window",
      "Ads rotate every 2 minutes",
      "≈ 2 hours of total screen time per slot",
      "Up to 3 brands share the same day",
    ],
  },
];

export type City = {
  name: string;
  state: string;
  status: "live" | "soon";
  note: string;
  x: number; // coords on India SVG viewBox (0 0 612 696)
  y: number;
  hq?: boolean;
};

// Positioned on the real India map (viewBox 0 0 612 696).
export const CITIES: City[] = [
  { name: "Panchkula · Tricity", state: "Haryana / Punjab", status: "live", note: "Head office & first fleet", x: 186, y: 158, hq: true },
  { name: "Chandigarh", state: "Chandigarh UT", status: "live", note: "Core Tricity coverage", x: 176, y: 164 },
  { name: "Mohali", state: "Punjab", status: "live", note: "Core Tricity coverage", x: 168, y: 170 },
  { name: "Ludhiana", state: "Punjab", status: "live", note: "Now on the road", x: 156, y: 150 },
  { name: "Delhi NCR", state: "Delhi", status: "soon", note: "Launching next", x: 190, y: 212 },
  { name: "Jaipur", state: "Rajasthan", status: "soon", note: "On the roadmap", x: 168, y: 240 },
  { name: "Lucknow", state: "Uttar Pradesh", status: "soon", note: "On the roadmap", x: 268, y: 250 },
  { name: "Ahmedabad", state: "Gujarat", status: "soon", note: "On the roadmap", x: 112, y: 330 },
  { name: "Mumbai", state: "Maharashtra", status: "soon", note: "On the roadmap", x: 150, y: 440 },
  { name: "Pune", state: "Maharashtra", status: "soon", note: "On the roadmap", x: 168, y: 452 },
  { name: "Hyderabad", state: "Telangana", status: "soon", note: "On the roadmap", x: 226, y: 458 },
  { name: "Kolkata", state: "West Bengal", status: "soon", note: "On the roadmap", x: 410, y: 352 },
  { name: "Bengaluru", state: "Karnataka", status: "soon", note: "On the roadmap", x: 198, y: 560 },
  { name: "Chennai", state: "Tamil Nadu", status: "soon", note: "On the roadmap", x: 246, y: 560 },
];

export const SOLUTIONS = [
  { slug: "retail", title: "Retail & FMCG", blurb: "Drive footfall to stores with hyperlocal, time-of-day targeted screens.", icon: "bag" },
  { slug: "real-estate", title: "Real Estate", blurb: "Park a 4K billboard outside the very plot you're selling.", icon: "building" },
  { slug: "healthcare", title: "Healthcare", blurb: "Awareness drives and hospital launches routed through dense zones.", icon: "cross" },
  { slug: "restaurants", title: "Restaurants & QSR", blurb: "Lunch-hour and dinner-hour dayparting near office and party hubs.", icon: "fork" },
  { slug: "political", title: "Political", blurb: "Constituency-level saturation with GPS proof-of-coverage reports.", icon: "flag" },
  { slug: "education", title: "Education", blurb: "Admission-season reach across coaching and campus corridors.", icon: "cap" },
  { slug: "luxury", title: "Luxury & Auto", blurb: "Premium neighbourhoods, valet zones, and showroom launches.", icon: "gem" },
  { slug: "events", title: "Events & Entertainment", blurb: "Countdown creatives that follow the crowd to the venue.", icon: "ticket" },
  { slug: "government", title: "Government", blurb: "Public-service campaigns with auditable, geo-tagged delivery.", icon: "shield" },
];

export const INDUSTRIES = SOLUTIONS;

export const FLEET = [
  {
    slug: "wheeler-e3",
    name: "Wheeler E3",
    tag: "The city cruiser",
    screen: "3-side P3 LED · 4,096 nits",
    power: "48V LiFePO₄ · 120 km range",
    best: "Dense inner-city routes",
    specs: {
      Brightness: "4,096 nits",
      Resolution: "P3 · 1152×768 / side",
      Sides: "3 (L / R / Rear)",
      Battery: "48V 105Ah LiFePO₄",
      Range: "120 km / charge",
      GPS: "10Hz live tracking",
      Audio: "60W directional",
      Dimensions: "2.9 × 1.4 × 2.2 m",
    },
  },
  {
    slug: "wheeler-x5",
    name: "Wheeler X5",
    tag: "The highway giant",
    screen: "4-side P4 LED · 5,500 nits",
    power: "60V LiFePO₄ · 160 km range",
    best: "Ring roads & expressways",
    specs: {
      Brightness: "5,500 nits",
      Resolution: "P4 · 1280×896 / side",
      Sides: "4 (L / R / Rear / Top)",
      Battery: "60V 140Ah LiFePO₄",
      Range: "160 km / charge",
      GPS: "10Hz live tracking",
      Audio: "120W directional",
      Dimensions: "3.4 × 1.6 × 2.6 m",
    },
  },
  {
    slug: "wheeler-nano",
    name: "Wheeler Nano",
    tag: "The lane specialist",
    screen: "2-side P2.5 LED · 3,500 nits",
    power: "48V LiFePO₄ · 90 km range",
    best: "Markets & narrow lanes",
    specs: {
      Brightness: "3,500 nits",
      Resolution: "P2.5 · 960×640 / side",
      Sides: "2 (L / R)",
      Battery: "48V 80Ah LiFePO₄",
      Range: "90 km / charge",
      GPS: "10Hz live tracking",
      Audio: "40W directional",
      Dimensions: "2.6 × 1.2 × 2.0 m",
    },
  },
];

export const JOURNEY = [
  { step: "01", title: "Send your ad", desc: "Share your image or video — any format works." },
  { step: "02", title: "Pick your booking", desc: "Full-day exclusive, or a shared slot. That's it." },
  { step: "03", title: "We load it on", desc: "Your creative goes live on the LED screen." },
  { step: "04", title: "Hits the road", desc: "Runs the busy 4 PM – 10 PM evening window." },
  { step: "05", title: "GPS-tracked live", desc: "Follow the vehicle's route across the city in real time." },
  { step: "06", title: "Proof & report", desc: "Geo-tagged photos and a simple run report after." },
];

export const CAMPAIGNS = [
  { brand: "Elite Outfits", cat: "Retail", metric: "+38% walk-ins", quote: "Every evening it was a moving storefront.", area: "Panchkula" },
  { brand: "Super Dan Pizza", cat: "QSR", metric: "2.1× orders", quote: "The dinner-hour window was pure genius.", area: "Sector 17, Chandigarh" },
  { brand: "Skyline Residences", cat: "Real Estate", metric: "410 site visits", quote: "We parked the ad right by the project.", area: "Zirakpur" },
  { brand: "Aveda Clinics", cat: "Healthcare", metric: "6.4 L reach", quote: "Launch-week visibility across the Tricity.", area: "Mohali" },
  { brand: "VoteForward", cat: "Political", metric: "92% ward cover", quote: "GPS proof-of-coverage sealed the deal.", area: "Panchkula" },
];

export const CASE_STUDIES = [
  {
    slug: "elite-outfits",
    brand: "Elite Outfits",
    title: "A moving storefront that lifted walk-ins 38%",
    cat: "Retail",
    challenge: "A rock-bottom-price fashion label opening in Eco City needed instant awareness with a tight budget.",
    strategy: "Six Wheeler E3 units looped the 3km catchment around the store during peak shopping hours.",
    results: [
      { k: "Walk-in lift", v: "+38%" },
      { k: "Impressions", v: "3.4 L" },
      { k: "Cost / 1000", v: "₹18" },
      { k: "Duration", v: "3 weeks" },
    ],
  },
  {
    slug: "super-dan-pizza",
    brand: "Super Dan Pizza",
    title: "Dinner-hour routing doubled delivery orders",
    cat: "QSR",
    challenge: "A pizza brand wanted orders, not just eyeballs — timed to hunger.",
    strategy: "Dayparted creatives that only ran 6–10pm, routed through residential + office clusters.",
    results: [
      { k: "Order lift", v: "2.1×" },
      { k: "Impressions", v: "2.8 L" },
      { k: "Repeat rate", v: "+22%" },
      { k: "Duration", v: "4 weeks" },
    ],
  },
  {
    slug: "skyline-residences",
    brand: "Skyline Residences",
    title: "Parking the billboard outside the plot",
    cat: "Real Estate",
    challenge: "Sell premium plots by reaching buyers physically near the development.",
    strategy: "Geo-fenced routes around competitor projects and arterial roads leading to the site.",
    results: [
      { k: "Site visits", v: "410" },
      { k: "Impressions", v: "5.1 L" },
      { k: "Cost / visit", v: "₹610" },
      { k: "Duration", v: "6 weeks" },
    ],
  },
];

export const BLOG = [
  { slug: "dooh-2026", title: "Why DOOH is the fastest-growing ad medium in India", cat: "Industry", read: "6 min", date: "Jul 2026", featured: true },
  { slug: "gps-attribution", title: "GPS attribution: proving outdoor advertising actually works", cat: "Technology", read: "8 min", date: "Jun 2026", featured: false },
  { slug: "dayparting", title: "The art of dayparting a mobile LED campaign", cat: "Playbook", read: "5 min", date: "Jun 2026", featured: false },
  { slug: "franchise-economics", title: "The unit economics of an AD Wheeler franchise", cat: "Franchise", read: "9 min", date: "May 2026", featured: false },
  { slug: "led-brightness", title: "Nits, pixel-pitch and why daylight readability matters", cat: "Technology", read: "7 min", date: "May 2026", featured: false },
  { slug: "creative-that-moves", title: "Designing creative for a screen that literally moves", cat: "Playbook", read: "4 min", date: "Apr 2026", featured: false },
];

export const TECH_FEATURES = [
  { title: "Live GPS Tracking", desc: "Every vehicle streamed to your dashboard at 10Hz — see the fleet breathe across the city.", tag: "Real-time" },
  { title: "Impression Heatmaps", desc: "Dwell-weighted exposure maps overlaid on real traffic-density data.", tag: "Analytics" },
  { title: "Proof of Performance", desc: "Geo-tagged, time-stamped photos auto-captured on route. Zero trust required.", tag: "Verification" },
  { title: "AI Route Optimisation", desc: "The engine learns which streets convert and re-weights routes nightly.", tag: "Intelligence" },
  { title: "Creative Management", desc: "Swap creatives across the fleet instantly. Schedule by hour, zone, or weather.", tag: "Control" },
  { title: "Campaign Reports", desc: "Board-ready PDFs with impressions, reach, frequency and cost efficiency.", tag: "Reporting" },
];
