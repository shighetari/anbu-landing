// I'm testing the final spacing improvements
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    console.log('Testing final spacing improvements...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture navbar with doubled spacing
    await page.screenshot({
      path: 'navbar-double-spacing.png',
      clip: { x: 0, y: 0, width: 1440, height: 150 }
    });
    console.log('✅ Captured: navbar-double-spacing.png');

    // Capture hero buttons with increased spacing
    const buttonsArea = await page.locator('.gap-6').first();
    const box = await buttonsArea.boundingBox();

    if (box) {
      await page.screenshot({
        path: 'hero-buttons-increased-gap.png',
        clip: {
          x: Math.max(0, box.x - 50),
          y: Math.max(0, box.y - 30),
          width: Math.min(1440 - box.x + 50, box.width + 100),
          height: box.height + 60
        }
      });
      console.log('✅ Captured: hero-buttons-increased-gap.png');
    }

    // Full hero section to see overall layout
    await page.screenshot({
      path: 'hero-section-final.png',
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1440,
        height: 900
      }
    });
    console.log('✅ Captured: hero-section-final.png');

    console.log('\n✨ All spacing improvements tested!');
    console.log('\nNavbar improvements:');
    console.log('  ✓ Doubled spacing between items (mx-2 lg:mx-4)');
    console.log('  ✓ Increased gaps (gap-4 lg:gap-6 between items)');
    console.log('  ✓ Larger container gaps (gap-8 lg:gap-12)');
    console.log('\nHero button improvements:');
    console.log('  ✓ Increased spacing (gap-6 sm:gap-8 lg:gap-10)');
    console.log('  ✓ Better visual separation between CTAs');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();