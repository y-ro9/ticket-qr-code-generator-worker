interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message = 'No data found' }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-2 rounded-md border border-mono-200 bg-mono-0 p-8 text-center"
    >
      <p className="text-base font-medium text-mono-800">{message}</p>
      <p className="text-sm text-mono-600">
        Try adjusting your filters or adding a new ticket.
      </p>
    </div>
  )
}
