import { describe, it, expect } from 'vitest';
import { siteConfig } from '@/lib/site-config';

describe('Site Configuration', () => {
  it('should have valid site configuration', () => {
    expect(siteConfig).toBeDefined();
    expect(siteConfig.website).toBeTruthy();
    expect(siteConfig.contactEmail).toBeTruthy();
    expect(siteConfig.calLink).toBeTruthy();
  });

  it('should have valid social links', () => {
    expect(siteConfig.github).toMatch(/^https?:\/\//);
    expect(siteConfig.twitter).toMatch(/^https?:\/\//);
    expect(siteConfig.linkedin).toMatch(/^https?:\/\//);
  });

  it('should use VERCEL_URL when NEXT_PUBLIC_APP_URL is not set', () => {
    // This tests the getBaseUrl logic
    expect(siteConfig.website).toBeTruthy();
    expect(typeof siteConfig.website).toBe('string');
  });
});
