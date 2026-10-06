import { QrGenerator } from '@/components/QrGenerator'
import { TicketList } from '@/components/TicketList'

export default function App() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-mono-50 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-mono-900">
          Ticket QR Code Generator Worker
        </h1>
        <p className="mt-2 text-sm text-mono-600">
          Generate and manage QR codes for support tickets.
        </p>
      </header>

      <div className="space-y-8">
        <QrGenerator />
        <section>
          <h2 className="mb-4 text-lg font-medium text-mono-800">
            Recent Tickets
          </h2>
          <TicketList tickets={[]} />
        </section>
      </div>
    </main>
  )
}
