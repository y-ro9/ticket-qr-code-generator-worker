import type { Ticket } from '@/types'
import { EmptyState } from './EmptyState'

interface TicketListProps {
  tickets: Ticket[]
}

export function TicketList({ tickets }: TicketListProps) {
  if (tickets.length === 0) {
    return <EmptyState message="No data found" />
  }

  return (
    <section
      aria-label="Ticket list"
      className="rounded-md border border-mono-200 bg-mono-0"
    >
      <ul className="divide-y divide-mono-200">
        {tickets.map((t) => (
          <li key={t.id} className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-mono-600">
                {t.ticket_code}
              </span>
              <span className="text-sm font-medium text-mono-900">
                {t.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-mono-200 px-2 py-1 text-xs text-mono-600">
                {t.priority}
              </span>
              <span className="rounded-md bg-mono-100 px-2 py-1 text-xs text-mono-800">
                {t.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
