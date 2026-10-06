export type TicketPriority = 'P0' | 'P1' | 'P2' | 'P3'
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface Ticket {
  id: string
  ticket_code: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  created_at: string
}

export interface TicketFormValues {
  title: string
  description: string
  priority: TicketPriority
}

export interface QrCode {
  id: string
  ticket_id: string
  payload: string
  version: number
  is_active: boolean
}
