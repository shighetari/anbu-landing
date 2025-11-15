# Contact API Overview

This landing app now ships a lightweight contact endpoint so we can accept briefs without exposing API keys in the browser.

## How it works

- Route: `apps/landing/src/app/api/contact/route.ts`
- Validation: shared Zod schema in `src/lib/validation/contact.ts`
- Delivery: Resend (`resend` npm package) sends a plain HTML + text email
- Rate limiting: in-memory guard (5 requests per IP / 5 minutes) to blunt obvious spam
- Spam filter: rejects submissions with >2 links or common spam keywords

The handler stays server-side only, so Vercel can deploy it without any extra backend services.

## Required environment variables

Add these values to `apps/landing/.env.local` (or copy `.env.example` and fill them in):

| Key | Description |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key (never expose publicly) |
| `RESEND_FROM_EMAIL` | Verified sender address in Resend (e.g., `builds@anbu.ai`) |
| `CONTACT_NOTIFICATIONS_EMAIL` | Inbox that should receive the submissions (defaults to `NEXT_PUBLIC_CONTACT_EMAIL`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email surfaced in the UI |
| `NEXT_PUBLIC_CAL_LINK` | Booking link for the CTA buttons |
| `NEXT_PUBLIC_SLACK_INVITE` (optional) | Invite URL for the Slack community shown in the contact panel |
| `NEXT_PUBLIC_WHATSAPP_LINK` (optional) | WhatsApp link (`https://wa.me/...`) for the real-time contact card |

After updating the file run `pnpm --filter landing dev` so Next.js picks up the new env vars.

## Client flow

1. `ContactSection` performs quick client-side validation (email + project focus).
2. On submit it `fetch`es `/api/contact` with the full form payload.
3. Success → state resets, confetti fires, and users get inline confirmation without leaving the site.
4. Errors → inline field errors (from Zod) or a general fallback message when the network fails.

## Error handling & troubleshooting

- **429 Too Many Requests** – someone submitted >5 times within 5 minutes. Wait and resubmit or tweak `RATE_LIMIT_MAX`/`RATE_LIMIT_WINDOW_MS` in the route file.
- **500 Contact API is not configured** – `RESEND_API_KEY` or `RESEND_FROM_EMAIL` is missing/invalid.
- **Spam rejection** – reduce the number of links in `projectFocus` and avoid spam keywords listed near the top of the route file.
- All failures are surfaced inline plus to the server logs (`console.error('[contact:send]', …)`). Check Vercel logs if submissions stop arriving.

## Extending later

- Swap the in-memory limiter for Redis/Upstash once we stand up shared infrastructure.
- Pipe successful submissions to a CRM or database by adding another async call right after the Resend send.
- Update the Zod schema if we change the form fields—both the route and the client import it from one place.
