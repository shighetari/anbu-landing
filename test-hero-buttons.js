// I'm writing a quick test script to capture the hero section
const { chromium } = require('playwright');

const DEFAULT_PORT = process.env.APP_PORT || process.env.PORT || 3000;
const BASE_URL = process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${DEFAULT_PORT}`;

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  try {
    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for the hero section to be visible
    await page.waitForSelector('#home', { state: 'visible' });

    // Wait for buttons to be visible
    await page.waitForSelector('button:has-text("Request Strategy Session")', { state: 'visible' });
    await page.waitForSelector('button:has-text("Explore Offerings")', { state: 'visible' });

    // Take a screenshot of the hero section
    const heroSection = await page.locator('#home');
    await heroSection.screenshot({
      path: 'hero-section-full.png',
      fullPage: false
    });

    // Take a screenshot focusing on just the buttons area
    const buttonsContainer = await page.locator('.fluid-gap-xl').first();
    await buttonsContainer.screenshot({
      path: 'hero-buttons-close-up.png'
    });

    // Test hover states
    const requestButton = await page.locator('button:has-text("Request Strategy Session")');
    await requestButton.hover();
    await page.waitForTimeout(500);
    await buttonsContainer.screenshot({
      path: 'hero-buttons-hover-request.png'
    });

    const exploreButton = await page.locator('button:has-text("Explore Offerings")');
    await exploreButton.hover();
    await page.waitForTimeout(500);
    await buttonsContainer.screenshot({
      path: 'hero-buttons-hover-explore.png'
    });

    // Test mobile view
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14 Pro
    await page.waitForTimeout(1000);
    await buttonsContainer.screenshot({
      path: 'hero-buttons-mobile.png'
    });

    console.log('Screenshots captured successfully!');
    console.log('Files created:');
    console.log('  - hero-section-full.png');
    console.log('  - hero-buttons-close-up.png');
    console.log('  - hero-buttons-hover-request.png');
    console.log('  - hero-buttons-hover-explore.png');
    console.log('  - hero-buttons-mobile.png');

  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
  }
})();
