type ResendEmail = {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

type BrandedEmailContent = {
  preheader: string;
  label: string;
  title: string;
  intro: string;
  details?: Array<[string, string]>;
  message?: string;
  buttonLabel?: string;
  buttonUrl?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function createBrandedEmail({
  preheader,
  label,
  title,
  intro,
  details = [],
  message,
  buttonLabel,
  buttonUrl,
}: BrandedEmailContent) {
  const detailRows = details.map(([key, value], index) => `
    <tr>
      <td style="padding:13px 16px;border-bottom:${index === details.length - 1 ? "0" : "1px solid #e9edf2"};color:#667085;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;vertical-align:top;width:34%;">${escapeHtml(key)}</td>
      <td style="padding:13px 16px;border-bottom:${index === details.length - 1 ? "0" : "1px solid #e9edf2"};color:#182230;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;font-weight:600;vertical-align:top;word-break:break-word;">${escapeHtml(value)}</td>
    </tr>`).join("");

  const detailsBlock = details.length ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e9edf2;border-radius:12px;border-spacing:0;overflow:hidden;margin:24px 0;background:#ffffff;">
      ${detailRows}
    </table>` : "";
  const messageBlock = message ? `
    <div style="margin:22px 0 0;padding:17px 18px;border-left:3px solid #ff941f;background:#fff8ef;border-radius:0 10px 10px 0;">
      <p style="margin:0 0 8px;color:#8a4b08;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Message</p>
      <p style="margin:0;color:#344054;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;white-space:pre-wrap;word-break:break-word;">${escapeHtml(message)}</p>
    </div>` : "";
  const buttonBlock = buttonLabel && buttonUrl ? `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0 4px;">
      <tr><td style="border-radius:24px;background:#ff941f;">
        <a href="${escapeHtml(buttonUrl)}" style="display:inline-block;padding:13px 23px;border:1px solid #ff941f;border-radius:24px;color:#182230;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;">${escapeHtml(buttonLabel)}</a>
      </td></tr>
    </table>` : "";

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
<body style="margin:0;padding:0;background:#f2f5f8;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f5f8;border-spacing:0;">
    <tr><td align="center" style="padding:30px 14px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;border-spacing:0;background:#ffffff;border:1px solid #e5eaf0;border-radius:18px;overflow:hidden;">
        <tr><td align="center" style="padding:15px 24px 13px;background:#101a32;border-bottom:4px solid #ff941f;">
          <a href="https://adwheeler.in" style="display:inline-block;text-decoration:none;" aria-label="AdWheeler home">
            <img src="https://adwheeler.in/adwheeler-logo.webp" width="156" alt="AdWheeler — Digital Ads On Wheels" style="display:block;width:156px;max-width:65vw;height:auto;border:0;outline:none;text-decoration:none;">
          </a>
        </td></tr>
        <tr><td style="padding:32px 34px 34px;">
          <p style="margin:0 0 12px;color:#d66e0c;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase;">${escapeHtml(label)}</p>
          <h1 style="margin:0 0 14px;color:#141923;font-family:Arial,Helvetica,sans-serif;font-size:25px;line-height:32px;letter-spacing:-.5px;">${escapeHtml(title)}</h1>
          <p style="margin:0;color:#475467;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;">${escapeHtml(intro)}</p>
          ${detailsBlock}
          ${messageBlock}
          ${buttonBlock}
        </td></tr>
        <tr><td style="padding:20px 28px;background:#f8fafc;border-top:1px solid #e9edf2;text-align:center;">
          <p style="margin:0 0 6px;color:#475467;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;">A product of Yellow Pop Media</p>
          <p style="margin:0;color:#98a2b3;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;">AdWheeler · Chandigarh, India · <a href="https://adwheeler.in" style="color:#667085;text-decoration:underline;">adwheeler.in</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export type EmailSendResult = "sent" | "not-configured" | "failed";

export async function sendResendEmail({ to, replyTo, subject, text, html }: ResendEmail): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "not-configured";

  const from = process.env.RESEND_FROM_EMAIL || "AdWheeler Team <website@adwheeler.in>";

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
        html,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null) as { name?: unknown; code?: unknown } | null;
      const reason = typeof error?.name === "string" ? error.name : typeof error?.code === "string" ? error.code : "unknown_error";
      console.error(`Resend rejected an email (${response.status}, ${reason}).`);
      return "failed";
    }

    const result = await response.json().catch(() => null) as { id?: unknown } | null;
    if (typeof result?.id === "string") {
      console.info(`Resend accepted email ${result.id}.`);
    }
    return "sent";
  } catch {
    console.error("Could not reach Resend to send an email.");
    return "failed";
  }
}
