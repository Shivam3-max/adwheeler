type ResendEmail = {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
};

export type EmailSendResult = "sent" | "not-configured" | "failed";

export async function sendResendEmail({ to, replyTo, subject, text }: ResendEmail): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "not-configured";

  const from = process.env.RESEND_FROM_EMAIL || "AdWheeler Website <website@adwheeler.in>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Resend rejected an email with status ${response.status}.`);
      return "failed";
    }

    return "sent";
  } catch {
    console.error("Could not reach Resend to send an email.");
    return "failed";
  }
}
