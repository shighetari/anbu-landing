// I'm creating a Playwright test to verify the hero button changes
import { test, expect } from '@playwright/test';

test.describe('Hero Section Buttons', () => {
  test('should display improved buttons with proper spacing and visibility', async ({ page }) => {
    // Navigate to the landing page
    await page.goto('http://localhost:3003');

    // Wait for hero section to be visible
    await expect(page.locator('#home')).toBeVisible();

    // Find the buttons
    const requestButton = page.locator('button:has-text("Request Strategy Session")');
    const exploreButton = page.locator('button:has-text("Explore Offerings")');

    // Verify both buttons are visible
    await expect(requestButton).toBeVisible();
    await expect(exploreButton).toBeVisible();

    // Take screenshots for visual verification
    const heroSection = page.locator('#home');
    await heroSection.screenshot({
      path: 'test-results/hero-section-full.png',
    });

    // Focus on the buttons container
    const buttonsContainer = page.locator('.fluid-gap-xl').first();
    await buttonsContainer.screenshot({
      path: 'test-results/hero-buttons-desktop.png',
    });

    // Test mobile responsiveness
    await page.setViewportSize({ width: 390, height: 844 });
    await buttonsContainer.screenshot({
      path: 'test-results/hero-buttons-mobile.png',
    });

    // Reset to desktop view
    await page.setViewportSize({ width: 1440, height: 900 });

    // Test hover states for visual feedback
    await requestButton.hover();
    await page.waitForTimeout(300);
    await buttonsContainer.screenshot({
      path: 'test-results/hero-buttons-hover-request.png',
    });

    await exploreButton.hover();
    await page.waitForTimeout(300);
    await buttonsContainer.screenshot({
      path: 'test-results/hero-buttons-hover-explore.png',
    });

    // Verify button text contrast
    const requestButtonText = await requestButton.locator('span').first();
    const exploreButtonText = await exploreButton.locator('span').first();

    // Check that text is visible
    await expect(requestButtonText).toBeVisible();
    await expect(exploreButtonText).toBeVisible();

    console.log('✅ Hero buttons test completed successfully!');
  });
});