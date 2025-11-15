import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { siteConfig } from '@/lib/site-config';
import { contactFormSchema, normalizeContactPayload } from '@/lib/validation/contact';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_LINKS_ALLOWED = 2;
const SUSPICIOUS_KEYWORDS = ['loan', 'forex', 'crypto', 'viagra'];

type RateLimitStore = Map<string, number[]>;

declare global {
  // eslint-disable-next-line no-var
  var __contactRateLimitStore: RateLimitStore | undefined;
}

const getRateLimitStore = (): RateLimitStore => {
  if (!globalThis.__contactRateLimitStore) {
    globalThis.__contactRateLimitStore = new Map<string, number[]>();
  }

  return globalThis.__contactRateLimitStore;
};

const trackRequest = (identifier: string) => {
  const store = getRateLimitStore();
  const now = Date.now();
  const requests = store.get(identifier)?.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS) ?? [];

  if (requests.length >= RATE_LIMIT_MAX) {
    store.set(identifier, requests);
    return false;
  }

  requests.push(now);
  store.set(identifier, requests);
  return true;
};

const hasSuspiciousContent = (message: string) => {
  const lowered = message.toLowerCase();
  const linkCount = (message.match(/https?:\/\//gi) ?? []).length;
  if (linkCount > MAX_LINKS_ALLOWED) {
    return true;
  }

  return SUSPICIOUS_KEYWORDS.some((keyword) => lowered.includes(keyword));
};

const escapeHtml = (input: string) =>
  input.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });

const formatEmailBody = (data: ReturnType<typeof normalizeContactPayload>, request: NextRequest) => {
  const lines = [
    `Name: ${data.name ?? 'N/A'}`,
    `Email: ${data.email}`,
    `Company: ${data.company ?? 'N/A'}`,
    `Team Size: ${data.teamSize ?? 'N/A'}`,
    `Budget: ${data.budget ?? 'N/A'}`,
    `Timeline: ${data.timeline ?? 'N/A'}`,
    `Project Type: ${data.projectType ?? 'N/A'}`,
    '',
    'Project Focus:',
    data.projectFocus,
    '',
    `Submitted From: ${request.headers.get('referer') ?? siteConfig.website}`,
    `User Agent: ${request.headers.get('user-agent') ?? 'Unknown'}`,
  ];

  const text = lines.join('\n');
  const html = lines
    .map((line) => `<p style="margin:0 0 8px; font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace; font-size: 14px;">${escapeHtml(line)}</p>`)
    .join('');

  return { text, html };
};

export async function POST(request: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  const contactRecipient =
    process.env.CONTACT_NOTIFICATIONS_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@anbu.ai';

  if (!resendApiKey || !resendFromEmail) {
    return NextResponse.json(
      { error: 'Contact API is not configured. Please set RESEND_API_KEY and RESEND_FROM_EMAIL.' },
      { status: 500 }
    );
  }

  const identifier = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  if (!trackRequest(identifier)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please check the highlighted fields.',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const normalized = normalizeContactPayload(parsed.data);

  if (hasSuspiciousContent(normalized.projectFocus)) {
    return NextResponse.json({ error: 'Message flagged as spam. Please simplify and try again.' }, { status: 400 });
  }

  const resend = new Resend(resendApiKey);
  const { text, html } = formatEmailBody(normalized, request);

  try {
    await resend.emails.send({
      from: resendFromEmail,
      to: [contactRecipient],
      reply_to: [normalized.email],
      subject: `ANBU Inquiry – ${normalized.company ?? normalized.name ?? 'New Lead'}`,
      text,
      html,
    });
  } catch (error) {
    console.error('[contact:send]', error);
    return NextResponse.json({ error: 'Something went wrong while sending your message.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
