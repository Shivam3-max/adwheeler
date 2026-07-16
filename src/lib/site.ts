// ============================================================================
// AD WHEELER 2.0 — central content source (placeholder data, swap later)
// ============================================================================

export const BRAND = {
  name: "AD Wheeler",
  version: "2.0",
  tagline: "India's First Smart Mobile Digital Advertising Network",
  phone: "+91 98889 87161",
  phoneRaw: "919888987161",
  email: "hello@adwheeler.in",
  address: "Eco City, New Chandigarh, Punjab 140901",
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
  { value: 18, suffix: "+", label: "Cities Covered" },
  { value: 240, suffix: "+", label: "Smart Vehicles" },
  { value: 1600, suffix: "+", label: "Campaigns Run" },
  { value: 42, suffix: "L", label: "Daily Eyeballs" },
  { value: 380, suffix: "+", label: "Brands Served" },
];

export type City = {
  name: string;
  state: string;
  population: string;
  dailyReach: string;
  fleet: number;
  x: number; // % coords on India map viewBox
  y: number;
  tier: 1 | 2;
};

export const CITIES: City[] = [
  { name: "Chandigarh", state: "Punjab", population: "12.6 L", dailyReach: "4.2 L", fleet: 42, x: 44, y: 24, tier: 1 },
  { name: "Delhi NCR", state: "Delhi", population: "3.2 Cr", dailyReach: "9.8 L", fleet: 58, x: 46, y: 30, tier: 1 },
  { name: "Ludhiana", state: "Punjab", population: "18.7 L", dailyReach: "3.1 L", fleet: 22, x: 42, y: 26, tier: 2 },
  { name: "Jaipur", state: "Rajasthan", population: "39.5 L", dailyReach: "4.6 L", fleet: 26, x: 40, y: 37, tier: 1 },
  { name: "Mumbai", state: "Maharashtra", population: "2.0 Cr", dailyReach: "8.4 L", fleet: 40, x: 34, y: 58, tier: 1 },
  { name: "Pune", state: "Maharashtra", population: "71.2 L", dailyReach: "5.2 L", fleet: 24, x: 37, y: 60, tier: 1 },
  { name: "Ahmedabad", state: "Gujarat", population: "82.5 L", dailyReach: "5.0 L", fleet: 20, x: 31, y: 47, tier: 2 },
  { name: "Bengaluru", state: "Karnataka", population: "1.3 Cr", dailyReach: "7.1 L", fleet: 34, x: 43, y: 74, tier: 1 },
  { name: "Hyderabad", state: "Telangana", population: "1.0 Cr", dailyReach: "6.3 L", fleet: 28, x: 47, y: 66, tier: 1 },
  { name: "Chennai", state: "Tamil Nadu", population: "1.1 Cr", dailyReach: "6.0 L", fleet: 26, x: 50, y: 78, tier: 1 },
  { name: "Lucknow", state: "Uttar Pradesh", population: "35.0 L", dailyReach: "3.8 L", fleet: 18, x: 54, y: 37, tier: 2 },
  { name: "Kolkata", state: "West Bengal", population: "1.4 Cr", dailyReach: "6.8 L", fleet: 30, x: 68, y: 47, tier: 1 },
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
  { step: "01", title: "Upload Creative", desc: "Drop your video or image. Any format, any ratio." },
  { step: "02", title: "AI Validation", desc: "Auto-checks brightness, safe-zones, and content policy." },
  { step: "03", title: "Vehicle Assignment", desc: "Smart engine matches fleet to your target zones." },
  { step: "04", title: "GPS Route Locked", desc: "Optimised routes maximise dwell in high-density areas." },
  { step: "05", title: "Campaign Goes Live", desc: "Screens light up. Your brand starts moving." },
  { step: "06", title: "Live Tracking", desc: "Watch every vehicle on a real-time map, 10Hz." },
  { step: "07", title: "Performance Report", desc: "Impressions, heatmaps, and geo-tagged proof photos." },
];

export const CAMPAIGNS = [
  { brand: "Elite Outfits", cat: "Retail", metric: "+38% walk-ins", quote: "Every rickshaw was a moving storefront.", area: "Eco City, Chandigarh" },
  { brand: "Super Dan Pizza", cat: "QSR", metric: "2.1× orders", quote: "Dinner-hour routing was pure genius.", area: "Sector 17 belt" },
  { brand: "Skyline Residences", cat: "Real Estate", metric: "410 site visits", quote: "We parked the ad outside the plot itself.", area: "New Chandigarh" },
  { brand: "Aveda Clinics", cat: "Healthcare", metric: "6.4 L reach", quote: "Launch week saturation, fully geo-verified.", area: "Tri-city" },
  { brand: "VoteForward", cat: "Political", metric: "92% ward cover", quote: "Proof-of-coverage sealed the deal.", area: "Mohali constituency" },
];

export const PRICING = [
  {
    name: "Starter",
    price: "₹24,999",
    unit: "/ week",
    desc: "Test the streets. One vehicle, one zone.",
    features: ["1 smart vehicle", "8 hrs / day runtime", "Single target zone", "Weekly report", "GPS tracking"],
    cta: "Start small",
    featured: false,
  },
  {
    name: "Growth",
    price: "₹89,999",
    unit: "/ week",
    desc: "The sweet spot for local launches.",
    features: ["4 vehicles", "10 hrs / day runtime", "3 target zones", "Dayparting", "Live dashboard", "Proof photos"],
    cta: "Scale up",
    featured: true,
  },
  {
    name: "Professional",
    price: "₹2,49,999",
    unit: "/ week",
    desc: "City-wide domination for serious brands.",
    features: ["12 vehicles", "12 hrs / day runtime", "City-wide routing", "AI optimisation", "Heatmap analytics", "Dedicated manager"],
    cta: "Go big",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    desc: "Multi-city, always-on brand presence.",
    features: ["50+ vehicles", "Multi-city network", "API + data export", "White-glove ops", "Custom SLAs", "Quarterly strategy"],
    cta: "Talk to sales",
    featured: false,
  },
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
