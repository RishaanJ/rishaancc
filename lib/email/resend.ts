import { readFileSync } from "node:fs"
import { join } from "node:path"
import { Resend } from "resend"

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

let cachedLogo: string | null = null
function getLogoDataUri(): string {
  if (cachedLogo) return cachedLogo
  try {
    const buf = readFileSync(join(process.cwd(), "public/email/rlogo.png"))
    cachedLogo = `data:image/png;base64,${buf.toString("base64")}`
    return cachedLogo
  } catch {
    return ""
  }
}

export async function sendMagicLink({
  to,
  link,
}: {
  to: string
  link: string
}): Promise<{ ok: boolean; error?: string }> {
  const client = getClient()
  if (!client) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[magic-link] would email ${to}: ${link}`)
      return { ok: true }
    }
    return { ok: false, error: "RESEND_API_KEY not set" }
  }
  const from = process.env.RESEND_FROM ?? "rishaan.cc admin <rishaan@rishaan.cc>"
  const { html, text } = renderMagicLinkEmail(link)
  const { error } = await client.emails.send({
    from,
    to,
    subject: "your magic link",
    text,
    html,
  })
  if (error) {
    console.error("[magic-link] resend error:", error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

function renderMagicLinkEmail(link: string): { html: string; text: string } {
  const text = [
    "your magic link",
    "",
    `beam me up → ${link}`,
    "",
    "one-time link · ten-minute window.",
    "if you didn't request it, you can ignore this email.",
    "",
    "— rishaan.cc",
  ].join("\n")

  const logo = getLogoDataUri()
  const garamond = "'Apple Garamond Light', 'Apple Garamond', Garamond, 'EB Garamond', Georgia, 'Times New Roman', serif"

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>your magic link</title>
    <!--[if mso]>
    <style>* { font-family: Helvetica, Arial, sans-serif !important; }</style>
    <![endif]-->
    <style>
      @media (prefers-color-scheme: dark) {
        .bg-page    { background:#0a0a0a !important; }
        .card       { background:#101010 !important; border-color:#1f1f1f !important; }
        .ink        { color:#fafafa !important; }
        .ink-soft   { color:#a3a3a3 !important; }
        .ink-fade   { color:#737373 !important; }
        .invert     { filter: invert(1) !important; }
        .rule       { border-color:#1f1f1f !important; }
        .pill       { background:#161616 !important; border-color:#262626 !important; }
        .pill a     { color:#d4d4d4 !important; }
        .btn        { background:#fafafa !important; }
        .btn a      { color:#0a0a0a !important; }
        .glow       { box-shadow: 0 18px 60px -18px rgba(255,107,26,0.55), 0 0 0 1px rgba(255,255,255,0.08) !important; }
        .accent-rule{ background: linear-gradient(90deg, rgba(255,107,26,0.6), rgba(255,107,26,0)) !important; }
      }
      @media (max-width: 520px) {
        .h1 { font-size: 38px !important; line-height: 1.02 !important; }
        .hero { height: 200px !important; }
        .pad-x { padding-left: 28px !important; padding-right: 28px !important; }
      }
    </style>
  </head>
  <body class="bg-page" style="margin:0;padding:0;background:#FAF8F5;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">a one-time link, expires in ten minutes. ✦</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-page" style="background:#FAF8F5;">
      <tr>
        <td align="center" style="padding:48px 16px 56px 16px;">

          <!-- Pre-card flourish -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;margin-bottom:18px;">
            <tr>
              <td align="left" class="pad-x" style="padding:0 4px;">
                <p class="ink-fade" style="margin:0;font-family:${garamond};font-style:italic;font-size:15px;line-height:1;color:#a8a29e;">
                  — welcome back.
                </p>
              </td>
            </tr>
          </table>

          <!-- Main card -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card" style="max-width:560px;background:#ffffff;border:1px solid #efe9df;border-radius:24px;overflow:hidden;box-shadow:0 1px 0 0 rgba(0,0,0,0.02), 0 24px 60px -32px rgba(20,10,0,0.18);">

            <!-- Hero -->
            <tr>
              <td style="padding:0;">
                <div class="hero" style="position:relative;height:240px;background:
                  radial-gradient(120% 80% at 100% 0%, rgba(255,80,30,0.85) 0%, rgba(255,80,30,0) 55%),
                  radial-gradient(80% 60% at 96% 20%, rgba(255,170,80,0.85) 0%, rgba(255,170,80,0) 60%),
                  radial-gradient(60% 50% at 78% 38%, rgba(255,220,160,0.55) 0%, rgba(255,220,160,0) 70%),
                  linear-gradient(180deg, #ffffff 0%, #fffdf9 100%);">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="pad-x" style="padding:40px 44px 0 44px;">
                        ${logo ? `<img class="invert" src="${logo}" alt="" width="64" height="64" style="display:block;width:64px;height:64px;border:0;outline:none;" />` : ""}
                      </td>
                    </tr>
                    <tr>
                      <td class="pad-x" style="padding:18px 44px 0 44px;">
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>

            <!-- Headline -->
            <tr>
              <td class="pad-x" style="padding:24px 44px 0 44px;">
                <h1 class="h1 ink" style="margin:0;font-size:44px;font-weight:800;letter-spacing:-0.04em;line-height:1.0;color:#0a0a0a;">
                  Your <span style="font-family:${garamond};font-style:italic;font-weight:700;color:#FF6B1A;letter-spacing:-0.02em;">Magic</span><br />
                  link is here.
                </h1>
                <div class="accent-rule" style="margin-top:18px;height:2px;width:48px;background:linear-gradient(90deg, #FF6B1A, rgba(255,107,26,0));border-radius:2px;"></div>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td class="pad-x" style="padding:28px 44px 0 44px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td class="btn glow" align="center" style="border-radius:16px;background:#0a0a0a;box-shadow:0 18px 50px -18px rgba(255,107,26,0.55), 0 0 0 1px rgba(0,0,0,0.04);">
                      <a href="${link}" target="_blank" rel="noopener" style="display:inline-block;padding:18px 30px;font-size:17px;font-weight:700;letter-spacing:-0.01em;color:#ffffff;text-decoration:none;border-radius:16px;">
                        Beam me up&nbsp;&nbsp;→
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Manual link -->
            <tr>
              <td class="pad-x" style="padding:34px 44px 0 44px;">
                <p class="ink-soft" style="margin:0 0 10px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#a8a29e;">
                  or paste this
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td class="pill" style="background:#FAF8F5;border:1px solid #efe9df;border-radius:10px;padding:12px 14px;">
                      <a href="${link}" target="_blank" rel="noopener" style="font-family:'SF Mono','Menlo','Consolas',ui-monospace,monospace;font-size:12px;line-height:1.55;color:#525252;word-break:break-all;text-decoration:none;">${link}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer inside card -->
            <tr>
              <td class="pad-x rule" style="padding:32px 44px 36px 44px;margin-top:24px;border-top:1px solid #f4ede0;">
                <p class="ink-fade" style="margin:0;font-size:11px;line-height:1.7;color:#a8a29e;">
                  if you didn't request this, just ignore it — the link is harmless without your inbox.
                </p>
              </td>
            </tr>
          </table>


        </td>
      </tr>
    </table>
  </body>
</html>`

  return { html, text }
}

export async function sendAlert({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}): Promise<void> {
  const client = getClient()
  if (!client) {
    console.warn(`[alert] would email ${to}: ${subject}\n${body}`)
    return
  }
  const from = process.env.RESEND_FROM ?? "rishaan.cc admin <rishaan@rishaan.cc>"
  await client.emails.send({ from, to, subject, text: body })
}
