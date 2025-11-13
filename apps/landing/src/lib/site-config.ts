/**
 * Site configuration with environment-aware defaults
 *
 * For preview deployments, VERCEL_URL is automatically set by Vercel
 * and provides the deployment-specific URL (e.g., myapp-abc123.vercel.app)
 */
const getBaseUrl = () => {
  // Explicit URL override (production/staging)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Vercel preview/production deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback to production domain
  return 'https://anbu.ai';
};

export const siteConfig = {
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@anbu.ai',
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? 'https://cal.com/anbu',
  github: 'https://github.com/shighetari',
  twitter: 'https://x.com/anbu_ai',
  linkedin: 'https://www.linkedin.com/company/anbu-solutions/',
  website: getBaseUrl(),
};
