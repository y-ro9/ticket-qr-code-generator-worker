import { describe, it, expect } from 'vitest'
import { sanitizeText } from './sanitize'

describe('sanitizeText — XSS protection (AC-06)', () => {
  it('strips <script> tags from input', () => {
    const dirty = '<script>alert("xss")</script>Hello'
    const clean = sanitizeText(dirty)
    expect(clean).not.toContain('<script>')
    expect(clean).toContain('Hello')
  })

  it('strips inline event handlers (onerror)', () => {
    const dirty = '<img src=x onerror=alert(1)>'
    const clean = sanitizeText(dirty)
    expect(clean).not.toMatch(/onerror/i)
  })

  it('strips onclick attributes', () => {
    const dirty = '<a href="#" onclick="steal()">click</a>'
    const clean = sanitizeText(dirty)
    expect(clean).not.toMatch(/onclick/i)
  })

  it('preserves safe text unchanged', () => {
    expect(sanitizeText('Printer jam on floor 2')).toBe('Printer jam on floor 2')
  })

  it('handles empty string', () => {
    expect(sanitizeText('')).toBe('')
  })

  it('handles null/undefined gracefully', () => {
    expect(sanitizeText(undefined as unknown as string)).toBe('')
    expect(sanitizeText(null as unknown as string)).toBe('')
  })
})
