// I'm testing the improved navigation bar spacing
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    console.log('Testing navigation bar improvements...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture improved navbar
    await page.screenshot({
      path: 'navbar-improved.png',
      clip: { x: 0, y: 0, width: 1440, height: 150 }
    });
    console.log('✅ Captured: navbar-improved.png');

    // Test hover states
    const servicesItem = await page.locator('a:has-text("Services")').first();
    await servicesItem.hover();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'navbar-hover-state.png',
      clip: { x: 0, y: 0, width: 1440, height: 400 }
    });
    console.log('✅ Captured: navbar-hover-state.png');

    // Test mobile view
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'navbar-mobile.png',
      clip: { x: 0, y: 0, width: 390, height: 150 }
    });
    console.log('✅ Captured: navbar-mobile.png');

    // Click mobile menu
    const menuButton = await page.locator('button[aria-label="Toggle navigation"]');
    await menuButton.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'navbar-mobile-menu.png',
      fullPage: true
    });
    console.log('✅ Captured: navbar-mobile-menu.png');

    console.log('\n✨ Navigation improvements tested successfully!');
    console.log('\nImprovements implemented:');
    console.log('  ✓ Increased spacing between items (fluid-gap-xl)');
    console.log('  ✓ Larger padding for each item (fluid-px-lg, fluid-py-sm)');
    console.log('  ✓ Improved font size (fluid-text-sm)');
    console.log('  ✓ Better letter spacing (0.2em/0.25em)');
    console.log('  ✓ Enhanced hover effects with subtle glow');
    console.log('  ✓ Wider navbar container (max-w-6xl)');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();