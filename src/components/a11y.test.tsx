import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QrGenerator } from './QrGenerator'
import { TicketList } from './TicketList'

describe('Accessibility (AC-08)', () => {
  it('all form inputs have accessible labels', () => {
    render(<QrGenerator />)
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
  })

  it('submit button is keyboard reachable via Tab', async () => {
    const user = userEvent.setup()
    render(<QrGenerator />)

    // Tab through: title → description → priority → submit button
    await user.tab() // title
    await user.tab() // description
    await user.tab() // priority
    await user.tab() // submit

    const button = screen.getByRole('button', { name: /generate qr/i })
    expect(button).toHaveFocus()
  })

  it('form has proper landmark role', () => {
    render(<QrGenerator />)
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('empty state has status role for screen readers', () => {
    render(<TicketList tickets={[]} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
