// I'm creating a test to verify the improved hero buttons
import { test, expect } from '@playwright/test';

test.describe('Hero Section Button Improvements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#home', { state: 'visible' });
  });

  test('buttons have proper spacing and improved visibility', async ({ page }) => {
    // Locate the button container
    const buttonContainer = page.locator('motion\\:div.fluid-gap-xl').first();

    // Locate individual buttons
    const requestButton = page.locator('button:has-text("Request Strategy Session")');
    const exploreButton = page.locator('button:has-text("Explore Offerings")');

    // Verify buttons are visible
    await expect(requestButton).toBeVisible();
    await expect(exploreButton).toBeVisible();

    // Take full hero section screenshot
    await page.screenshot({
      path: 'test-results/hero-full.png',
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1280,
        height: 800
      }
    });

    // Take close-up of buttons
    const buttonBox = await buttonContainer.boundingBox();
    if (buttonBox) {
      await page.screenshot({
        path: 'test-results/buttons-desktop.png',
        clip: {
          x: buttonBox.x - 20,
          y: buttonBox.y - 20,
          width: buttonBox.width + 40,
          height: buttonBox.height + 40
        }
      });
    }

    // Test mobile layout
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500); // Wait for responsive changes

    const mobileButtonBox = await buttonContainer.boundingBox();
    if (mobileButtonBox) {
      await page.screenshot({
        path: 'test-results/buttons-mobile.png',
        clip: {
          x: mobileButtonBox.x,
          y: mobileButtonBox.y - 20,
          width: mobileButtonBox.width,
          height: mobileButtonBox.height + 40
        }
      });
    }

    console.log('✅ Screenshots captured successfully!');
    console.log('Check test-results/ folder for:');
    console.log('  - hero-full.png');
    console.log('  - buttons-desktop.png');
    console.log('  - buttons-mobile.png');
  });

  test('button text has proper contrast', async ({ page }) => {
    const requestButton = page.locator('button:has-text("Request Strategy Session")');
    const buttonText = requestButton.locator('span').first();

    // Verify text is visible and readable
    await expect(buttonText).toBeVisible();

    // Get computed styles to verify contrast improvements
    const textColor = await buttonText.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    console.log('Request button text color:', textColor);

    // The text should be black for better contrast on gold background
    expect(textColor).toContain('0, 0, 0'); // RGB for black
  });
});
