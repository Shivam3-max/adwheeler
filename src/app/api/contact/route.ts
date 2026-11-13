import { BRAND } from "@/lib/site";

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
  const from = process.env.RESEND_FROM_EMAIL || "AdWheeler Website <website@adwheeler.in>";
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

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [BRAND.email],
        reply_to: email,
        subject,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Resend rejected a contact email with status ${response.status}.`);
      return json({ error: "We couldn’t send your message. Please try again later." }, 502);
    }

    return json({ message: "Message sent." }, 200);
  } catch {
    console.error("Could not reach the email service for a contact submission.");
    return json({ error: "We couldn’t reach our email service. Please try again later." }, 502);
  }
}
