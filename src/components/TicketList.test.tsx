import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TicketList } from './TicketList'
import type { Ticket } from '@/types'

const sampleTickets: Ticket[] = [
  {
    id: '1',
    ticket_code: 'TKT-2026-0001',
    title: 'Printer jam',
    description: 'HP LaserJet not responding',
    status: 'open',
    priority: 'P1',
    created_at: '2026-10-06T10:00:00Z',
  },
  {
    id: '2',
    ticket_code: 'TKT-2026-0002',
    title: 'Network down',
    description: 'Wi-Fi dead on floor 3',
    status: 'in_progress',
    priority: 'P0',
    created_at: '2026-10-06T11:00:00Z',
  },
]

describe('TicketList — Happy Path (AC-02)', () => {
  it('renders each ticket in the list', () => {
    render(<TicketList tickets={sampleTickets} />)
    expect(screen.getByText('TKT-2026-0001')).toBeInTheDocument()
    expect(screen.getByText('Printer jam')).toBeInTheDocument()
    expect(screen.getByText('TKT-2026-0002')).toBeInTheDocument()
    expect(screen.getByText('Network down')).toBeInTheDocument()
  })
})

describe('TicketList — Empty State (AC-03)', () => {
  it('shows "No data found" when list is empty', () => {
    render(<TicketList tickets={[]} />)
    expect(screen.getByText(/no data found/i)).toBeInTheDocument()
  })

  it('does not render blank screen when empty', () => {
    render(<TicketList tickets={[]} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
