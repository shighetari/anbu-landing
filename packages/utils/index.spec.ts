import { describe, it, expect } from 'vitest'
import { cn } from './cn'
import { formatCurrency, formatPercentage } from './format'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('concatenates multiple classes', () => {
    // cn currently just concatenates classes without merge logic
    expect(cn('px-2', 'px-4')).toBe('px-2 px-4')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })
})

describe('format utilities', () => {
  describe('formatCurrency', () => {
    it('formats USD currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000')
      expect(formatCurrency(999)).toBe('$999')
    })

    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0')
    })

    it('supports different currencies', () => {
      const eurFormat = formatCurrency(1000, 'EUR', 'de-DE')
      expect(eurFormat).toContain('1')
      expect(eurFormat).toContain('000')
    })
  })

  describe('formatPercentage', () => {
    it('formats percentages correctly', () => {
      expect(formatPercentage(85)).toBe('85%')
      expect(formatPercentage(99.5, 1)).toBe('99.5%')
    })

    it('handles zero', () => {
      expect(formatPercentage(0)).toBe('0%')
    })

    it('respects fraction digits', () => {
      expect(formatPercentage(33.333, 2)).toBe('33.33%')
    })
  })
})
