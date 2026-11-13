import { CITIES } from "@/lib/site";
import { sendResendEmail } from "@/lib/email";

const INVESTMENT_RANGES = new Set([
  "₹10–15 lakhs",
  "₹15–25 lakhs",
  "₹25–50 lakhs",
]);
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const requestsByIp = new Map<string, { count: number; expiresAt: number }>();

function json(body: Record<string, string>, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requestsByIp.get(ip);

  if (!current || current.expiresAt <= now) {
    requestsByIp.set(ip, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== host.toLowerCase()) {
        return json({ error: "Request not allowed." }, 403);
      }
    } catch {
      return json({ error: "Request not allowed." }, 403);
    }
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_000) {
    return json({ error: "Your application is too long." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Please check the application and try again." }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: "Please check the application and try again." }, 400);
  }
  const fields = body as Record<string, unknown>;

  // Silently accept bot submissions without sending email.
  if (typeof fields.website === "string" && fields.website.trim()) {
    return json({ message: "Application received." }, 200);
  }

  const name = typeof fields.name === "string" ? fields.name.trim().replace(/[\r\n]+/g, " ") : "";
  const phone = typeof fields.phone === "string" ? fields.phone.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const city = typeof fields.city === "string" ? fields.city : "";
  const otherCity = typeof fields.otherCity === "string" ? fields.otherCity.trim().replace(/[\r\n]+/g, " ") : "";
  const preferredCity = city === "other" ? otherCity : city;
  const investmentCapacity = typeof fields.investmentCapacity === "string" ? fields.investmentCapacity : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";
  const validCities = new Set([...CITIES.map((item) => item.name), "other"]);

  if (
    !name || name.length > 120 ||
    !phone || phone.length > 40 ||
    !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !validCities.has(city) ||
    (city === "other" && (!otherCity || otherCity.length > 120)) ||
    !INVESTMENT_RANGES.has(investmentCapacity) ||
    message.length > 5000
  ) {
    return json({ error: "Please check your details and try again." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Franchise email service is missing RESEND_API_KEY.");
    return json({ error: "Our email service is not set up yet. Please call or WhatsApp us instead." }, 503);
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = request.headers.get("x-real-ip")?.trim() || forwardedFor?.split(",").at(-1)?.trim();
  if (ip && isRateLimited(ip)) {
    return json({ error: "Too many applications. Please try again in a few minutes." }, 429);
  }

  const leadText = [
    "New franchise application",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Preferred city: ${preferredCity}`,
    `Investment capacity: ${investmentCapacity}`,
    "",
    "About the applicant / market:",
    message || "Not provided",
  ].join("\n");

  const leadResult = await sendResendEmail({
    to: "franchise@adwheeler.in",
    replyTo: email,
    subject: `Franchise application — ${name} — ${preferredCity}`,
    text: leadText,
  });

  if (leadResult === "not-configured") {
    return json({ error: "Our email service is not set up yet. Please call or WhatsApp us instead." }, 503);
  }
  if (leadResult === "failed") {
    return json({ error: "We couldn’t send your application. Please try again later." }, 502);
  }

  const confirmationResult = await sendResendEmail({
    to: email,
    subject: "Thanks for your AdWheeler franchise enquiry",
    text: [
      `Hi ${name},`,
      "",
      "Thank you for your interest in an AdWheeler franchise. We’ve received your application and our franchise team will review it.",
      "",
      `Preferred city: ${preferredCity}`,
      `Investment capacity: ${investmentCapacity}`,
      "",
      "Our team will contact you within two business days.",
      "",
      "Regards,",
      "AdWheeler Franchise Team",
    ].join("\n"),
  });

  if (confirmationResult !== "sent") {
    console.error("The franchise application was delivered, but its applicant confirmation email was not.");
  }

  return json({
    message: confirmationResult === "sent"
      ? "A confirmation email is on its way. Our franchise team will contact you within two business days."
      : "Our franchise team will contact you within two business days.",
  }, 200);
}
