const { chromium } = require('@playwright/test');

const DEFAULT_PORT = process.env.APP_PORT || process.env.PORT || 3000;
const BASE_URL =
  process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${DEFAULT_PORT}`;
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE_URL}/social-hub`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'social-hub-center-check.png', fullPage: false });
  const vw = 1440;
  const checkCenter = async (locatorText, label) => {
    const el = await page.locator(locatorText).first();
    const box = await el.boundingBox();
    if (!box) {
      console.log(label + ': not found');
      return;
    }
    const center = box.x + box.width / 2;
    const delta = Math.abs(center - vw / 2);
    console.log(`${label} center delta (px):`, Math.round(delta));
  };
  await checkCenter('text=BROADCAST-READY STORYTELLING', 'Hero title');
  await checkCenter('text=Featured Production', 'Featured section heading');
  await checkCenter('text=Transform Your Social Presence', 'Services heading');
  await page.close();
  await browser.close();
})();
