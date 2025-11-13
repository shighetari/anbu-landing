import { test, expect } from '@playwright/test'

test.describe('Core Capabilities Section - Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Mobile View (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 })
    })

    test('displays proper spacing and typography on mobile', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      await expect(servicesSection).toHaveCSS('padding-top', /^(80|96|128)px/)
      await expect(servicesSection).toHaveCSS('padding-bottom', /^(80|96|128)px/)

      const heading = servicesSection.getByRole('heading', { level: 2 })
      await expect(heading).toBeVisible()
      await expect(heading).toHaveCSS('font-size', /^(24|28|32)px/)

      const description = servicesSection.getByText(/I craft premium digital experiences/)
      await expect(description).toBeVisible()
      await expect(description).toHaveCSS('font-size', /^(16|18)px/)
      await expect(description).toHaveCSS('line-height', /^(28|32)px/)
    })

    test('stacks cards vertically with proper gaps', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      const cards = servicesSection.locator('[class*="rounded"]').filter({ hasText: /Portal|Experience|Intelligence|Automation/ })
      await expect(cards).toHaveCount(4)

      for (let i = 0; i < 4; i++) {
        const card = cards.nth(i)
        await expect(card).toBeVisible()

        const cardBox = await card.boundingBox()
        expect(cardBox?.width).toBeLessThan(375)
        expect(cardBox?.height).toBeGreaterThan(280)
      }
    })

    test('has touch-friendly tap targets', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      const links = servicesSection.getByRole('link')
      const linkCount = await links.count()

      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i)
        const box = await link.boundingBox()

        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44)
        }
      }
    })
  })

  test.describe('Tablet View (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
    })

    test('displays 2-column grid layout on tablet', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      const cards = servicesSection.locator('[class*="rounded"]').filter({ hasText: /Portal|Experience|Intelligence|Automation/ })

      const firstCard = await cards.nth(0).boundingBox()
      const secondCard = await cards.nth(1).boundingBox()
      const thirdCard = await cards.nth(2).boundingBox()

      expect(firstCard?.width).toBeGreaterThan(600)

      if (secondCard && thirdCard) {
        expect(Math.abs(secondCard.y - thirdCard.y)).toBeLessThan(10)
      }
    })

    test('shows increased spacing on tablet', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      await expect(servicesSection).toHaveCSS('padding-top', /^(128|160)px/)
      await expect(servicesSection).toHaveCSS('padding-bottom', /^(128|160)px/)

      const heading = servicesSection.getByRole('heading', { level: 2 })
      await expect(heading).toHaveCSS('font-size', /^(36|48)px/)
    })
  })

  test.describe('Desktop View (1440px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
    })

    test('displays 3-column grid with proper hierarchy', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      const cards = servicesSection.locator('[class*="rounded"]').filter({ hasText: /Portal|Experience|Intelligence|Automation/ })
      await expect(cards).toHaveCount(4)

      const portalCard = await cards.filter({ hasText: 'ANBU Solutions Portal' }).boundingBox()
      const experienceCard = await cards.filter({ hasText: 'Experience Engineering' }).boundingBox()
      const dataCard = await cards.filter({ hasText: 'Intelligence & Data Ops' }).boundingBox()
      const automationCard = await cards.filter({ hasText: 'Automation Architecture' }).boundingBox()

      if (portalCard && experienceCard) {
        expect(portalCard.width).toBeGreaterThan(experienceCard.width * 1.5)
      }

      if (experienceCard && dataCard) {
        expect(Math.abs(experienceCard.y - dataCard.y)).toBeLessThan(10)
      }

      if (automationCard && experienceCard) {
        expect(automationCard.width).toBeGreaterThan(experienceCard.width * 1.5)
      }
    })

    test('displays generous desktop spacing', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      await expect(servicesSection).toHaveCSS('padding-top', /^(160|200|256)px/)
      await expect(servicesSection).toHaveCSS('padding-bottom', /^(160|200|256)px/)

      const container = servicesSection.locator('[class*="max-w"]').first()
      const containerBox = await container.boundingBox()

      if (containerBox) {
        expect(containerBox.width).toBeLessThanOrEqual(1280)
        expect(containerBox.width).toBeGreaterThan(1000)
      }
    })

    test('shows hover effects on desktop', async ({ page }) => {
      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      const firstCard = servicesSection.locator('[class*="rounded"]').filter({ hasText: 'ANBU Solutions Portal' }).first()

      const initialTransform = await firstCard.evaluate((el) => {
        return window.getComputedStyle(el).transform
      })

      await firstCard.hover()
      await page.waitForTimeout(300)

      const hoverTransform = await firstCard.evaluate((el) => {
        return window.getComputedStyle(el).transform
      })

      expect(initialTransform).not.toEqual(hoverTransform)

      const ctaLink = firstCard.getByText('Launch portal')
      await expect(ctaLink).toBeVisible()
    })
  })

  test('maintains color consistency across breakpoints', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)

      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      const coreCapabilitiesText = servicesSection.getByText('Core capabilities')
      await expect(coreCapabilitiesText).toHaveCSS('color', /rgb\(255, 215, 0\)|rgba\(255, 215, 0/)
    }
  })

  test('ensures text remains readable at all sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812, minFontSize: 14 },
      { width: 768, height: 1024, minFontSize: 16 },
      { width: 1440, height: 900, minFontSize: 16 }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })

      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()

      const descriptions = servicesSection.locator('p').filter({ hasText: /Unified workspace|Premium interface|Real-time analytics|AI-powered/ })
      const count = await descriptions.count()

      for (let i = 0; i < count; i++) {
        const fontSize = await descriptions.nth(i).evaluate((el) => {
          return parseInt(window.getComputedStyle(el).fontSize)
        })
        expect(fontSize).toBeGreaterThanOrEqual(viewport.minFontSize)
      }
    }
  })
})

test.describe('Visual Regression - Core Capabilities', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'wide', width: 1920, height: 1080 }
  ]

  for (const viewport of viewports) {
    test(`captures services section on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/')

      const servicesSection = page.locator('#services')
      await servicesSection.scrollIntoViewIfNeeded()
      await page.waitForTimeout(1000)

      await servicesSection.screenshot({
        path: `apps/landing/tests/e2e/__screenshots__/services-${viewport.name}.png`
      })
    })
  }
})