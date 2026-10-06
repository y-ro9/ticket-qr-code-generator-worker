export function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex items-center justify-center gap-2 py-8"
    >
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-mono-200 border-t-mono-800" />
      <span className="text-sm text-mono-600">Loading…</span>
    </div>
  )
}
