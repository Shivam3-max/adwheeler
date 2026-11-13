import { BRAND } from "@/lib/site";
import { createBrandedEmail, sendResendEmail } from "@/lib/email";

const TOPICS = new Set(["Book a campaign", "Franchise enquiry", "Partnership", "Support", "Other"]);
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const requestsByIp = new Map<string, { count: number; expiresAt: number }>();

function json(body: Record<string, string>, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
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
    return json({ error: "Your message is too long." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: "Please check the form and try again." }, 400);
  }
  const fields = body as Record<string, unknown>;

  // Silently accept bot submissions without sending mail.
  if (typeof fields.website === "string" && fields.website.trim()) {
    return json({ message: "Message received." }, 200);
  }

  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const phone = typeof fields.phone === "string" ? fields.phone.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const topic = typeof fields.topic === "string" ? fields.topic : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";

  if (
    !isText(name, 120) ||
    !isText(phone, 40) ||
    !isText(email, 254) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !TOPICS.has(topic) ||
    !isText(message, 5000)
  ) {
    return json({ error: "Please check your details and try again." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact email service is missing RESEND_API_KEY.");
    return json({ error: "Our email service is not set up yet. Please call or WhatsApp us instead." }, 503);
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = request.headers.get("x-real-ip")?.trim() || forwardedFor?.split(",").at(-1)?.trim();
  if (ip && isRateLimited(ip)) {
    return json({ error: "Too many messages. Please try again in a few minutes." }, 429);
  }

  const subject = `Website enquiry — ${topic}`;
  const text = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Enquiry type: ${topic}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const leadResult = await sendResendEmail({
    to: BRAND.email,
    replyTo: email,
    subject,
    text,
    html: createBrandedEmail({
      preheader: `New ${topic.toLowerCase()} enquiry from ${name}.`,
      label: "Website enquiry",
      title: `New enquiry · ${topic}`,
      intro: "A visitor has sent a message through the AdWheeler website.",
      details: [
        ["Name", name],
        ["Phone", phone],
        ["Email", email],
        ["Enquiry type", topic],
      ],
      message,
    }),
  });

  if (leadResult !== "sent") {
    return json({ error: "We couldn’t send your message. Please try again later." }, leadResult === "not-configured" ? 503 : 502);
  }

  const confirmationResult = await sendResendEmail({
    to: email,
    replyTo: BRAND.email,
    subject: "We received your message — AdWheeler",
    text: [
      `Hi ${name},`,
      "",
      "Thanks for contacting AdWheeler. We’ve received your message and our team will get back to you within three business days.",
      "",
      `Enquiry type: ${topic}`,
      "",
      "Regards,",
      "AdWheeler Team",
      BRAND.email,
    ].join("\n"),
    html: createBrandedEmail({
      preheader: "We received your message and will get back to you within three business days.",
      label: "Thanks for reaching out",
      title: `Thanks, ${name}. We’ve got your message.`,
      intro: "Your enquiry is safely with our team. We’ll get back to you within three business days.",
      details: [["Enquiry type", topic]],
      buttonLabel: "Visit AdWheeler",
      buttonUrl: "https://adwheeler.in",
    }),
  });

  if (confirmationResult !== "sent") {
    console.error("Contact enquiry was delivered, but its confirmation email was not sent.");
    return json({ message: "Message received. We couldn’t send a receipt email, but our team will get back to you within three business days." }, 200);
  }

  return json({ message: "Message received. A confirmation email is on its way." }, 200);
}
