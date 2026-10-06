import type { Ticket, TicketFormValues, QrCode } from '@/types'
import { sanitizeText } from './sanitize'

const NETWORK_DELAY_MS = 800

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let ticketCounter = 0

/**
 * Simulates POST /api/tickets + POST /api/tickets/:id/qr
 * Returns a mocked QR payload. Sanitizes inputs before storing.
 */
export async function createTicketAndQr(values: TicketFormValues): Promise<{
  ticket: Ticket
  qr: QrCode
}> {
  await delay(NETWORK_DELAY_MS)

  ticketCounter += 1
  const ticketId = crypto.randomUUID()
  const ticketCode = `TKT-2026-${String(ticketCounter).padStart(4, '0')}`

  const ticket: Ticket = {
    id: ticketId,
    ticket_code: ticketCode,
    title: sanitizeText(values.title),
    description: sanitizeText(values.description),
    priority: values.priority,
    status: 'open',
    created_at: new Date().toISOString(),
  }

  const qr: QrCode = {
    id: crypto.randomUUID(),
    ticket_id: ticketId,
    payload: `${ticketCode}|v1|mock-signature`,
    version: 1,
    is_active: true,
  }

  return { ticket, qr }
}

/**
 * Simulates GET /api/tickets
 */
export async function listTickets(): Promise<Ticket[]> {
  await delay(NETWORK_DELAY_MS)
  return []
}
