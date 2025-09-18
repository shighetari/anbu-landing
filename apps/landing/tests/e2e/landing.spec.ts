import { test, expect } from '@playwright/test'

const heroTagline = 'Start Your Project With Confidence'

test.describe('ANBU landing experience', () => {
  test('renders critical hero content and navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#home')
    await expect(page.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs-hub')
    await expect(page.getByRole('heading', { level: 1, name: /ANBU/i })).toBeVisible()
    await expect(page.getByText('Innovative Digital Solutions for the Modern Era')).toBeVisible()

    await page.getByRole('link', { name: 'Services' }).click()
    await expect(page.locator('#services')).toBeInViewport()
  })

  test('allows visitors to discover key sections', async ({ page }) => {
    await page.goto('/')
    await page.locator('button', { hasText: 'Explore All Solutions' }).click()
    await expect(page.locator('#services')).toBeInViewport()

    await page.evaluate(() => {
      const el = document.getElementById('about')
      el?.scrollIntoView({ behavior: 'instant' })
    })
    await expect(page.locator('#about').getByText('Clean Code')).toBeVisible()
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { level: 2, name: heroTagline })).toBeVisible()
  })

  test('captures a visual snapshot of the hero', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1440, height: 900 })
    const hero = page.locator('section#home')
    await expect(hero).toBeVisible()
    await hero.screenshot({ path: 'apps/landing/tests/e2e/__screenshots__/hero-desktop.png', fullPage: false })
  })
})
