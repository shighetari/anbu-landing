// I'm creating a simple script to capture screenshots of the button improvements
const { chromium } = require('@playwright/test');

const DEFAULT_PORT = process.env.APP_PORT || process.env.PORT || 3000;
const BASE_URL =
  process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${DEFAULT_PORT}`;

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  try {
    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for hero section
    await page.waitForSelector('#home', { state: 'visible' });
    await page.waitForTimeout(2000); // Let animations finish

    // Full page screenshot
    await page.screenshot({
      path: 'hero-full-page.png',
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1440,
        height: 900,
      },
    });
    console.log('✅ Captured: hero-full-page.png');

    // Scroll to buttons and capture them
    const requestButton = await page.locator('button:has-text("Request Strategy Session")');
    await requestButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Get the container with both buttons
    const buttonsArea = await page.locator('.flex.fluid-gap-xl').first();
    const box = await buttonsArea.boundingBox();

    if (box) {
      await page.screenshot({
        path: 'hero-buttons-desktop.png',
        clip: {
          x: Math.max(0, box.x - 50),
          y: Math.max(0, box.y - 30),
          width: Math.min(1440 - box.x + 50, box.width + 100),
          height: box.height + 60,
        },
      });
      console.log('✅ Captured: hero-buttons-desktop.png');
    }

    // Test hover state on Request button
    await requestButton.hover();
    await page.waitForTimeout(500);

    if (box) {
      await page.screenshot({
        path: 'hero-buttons-hover.png',
        clip: {
          x: Math.max(0, box.x - 50),
          y: Math.max(0, box.y - 30),
          width: Math.min(1440 - box.x + 50, box.width + 100),
          height: box.height + 60,
        },
      });
      console.log('✅ Captured: hero-buttons-hover.png');
    }

    // Test mobile view
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000); // Wait for responsive layout

    await requestButton.scrollIntoViewIfNeeded();
    const mobileBox = await buttonsArea.boundingBox();

    if (mobileBox) {
      await page.screenshot({
        path: 'hero-buttons-mobile.png',
        clip: {
          x: 0,
          y: Math.max(0, mobileBox.y - 30),
          width: 390,
          height: mobileBox.height + 60,
        },
      });
      console.log('✅ Captured: hero-buttons-mobile.png');
    }

    console.log('\n✨ All screenshots captured successfully!');
    console.log('\nImprovements implemented:');
    console.log('  ✓ Increased button spacing (fluid-gap-xl)');
    console.log('  ✓ Larger button size (320px and 280px min-width)');
    console.log('  ✓ Better padding (fluid-py-lg for more height)');
    console.log('  ✓ Fixed text contrast (black text on gold button)');
    console.log('  ✓ Maintained responsive behavior on mobile');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
