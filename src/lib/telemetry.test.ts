import { describe, it, expect, vi, beforeEach } from 'vitest'
import { trackEvent } from './telemetry'

describe('trackEvent — Analytics simulation (AC-07)', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('logs the analytics message to console', () => {
    trackEvent('User interacted with Ticket QR Code Generator Worker')
    expect(console.log).toHaveBeenCalledWith(
      '[Analytics] User interacted with Ticket QR Code Generator Worker',
    )
  })

  it('includes context object when provided', () => {
    trackEvent('User interacted with Ticket QR Code Generator Worker', 'generate_qr')
    expect(console.log).toHaveBeenCalledWith(
      '[Analytics] User interacted with Ticket QR Code Generator Worker',
      { context: 'generate_qr' },
    )
  })
})
