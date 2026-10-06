import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QrGenerator } from './QrGenerator'

describe('QrGenerator — Happy Path (AC-01)', () => {
  it('renders form fields and submit button', () => {
    render(<QrGenerator />)
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /generate qr/i })).toBeInTheDocument()
  })

  it('renders QR code after valid submit', async () => {
    const user = userEvent.setup()
    render(<QrGenerator />)

    await user.type(screen.getByLabelText(/title/i), 'Printer jam')
    await user.type(screen.getByLabelText(/description/i), 'HP LaserJet not responding')
    await user.selectOptions(screen.getByLabelText(/priority/i), 'P1')
    await user.click(screen.getByRole('button', { name: /generate qr/i }))

    await waitFor(
      () => expect(screen.getByTestId('qr-code')).toBeInTheDocument(),
      { timeout: 3000 },
    )
  })
})

describe('QrGenerator — Unhappy Path', () => {
  it('shows loading spinner during async operation (AC-04)', async () => {
    const user = userEvent.setup()
    render(<QrGenerator />)

    await user.type(screen.getByLabelText(/title/i), 'Printer jam')
    await user.type(screen.getByLabelText(/description/i), 'HP not responding')
    await user.selectOptions(screen.getByLabelText(/priority/i), 'P1')
    await user.click(screen.getByRole('button', { name: /generate qr/i }))

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('blocks submit and highlights fields on invalid input (AC-05)', async () => {
    const user = userEvent.setup()
    render(<QrGenerator />)

    await user.click(screen.getByRole('button', { name: /generate qr/i }))

    expect(screen.queryByTestId('qr-code')).not.toBeInTheDocument()
    const titleInput = screen.getByLabelText(/title/i)
    expect(titleInput).toHaveAttribute('aria-invalid', 'true')
  })
})
