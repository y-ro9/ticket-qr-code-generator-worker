import { useState, type FormEvent } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import type { TicketFormValues, TicketPriority, QrCode } from '@/types'
import { createTicketAndQr } from '@/lib/mockApi'
import { trackEvent } from '@/lib/telemetry'
import { sanitizeText } from '@/lib/sanitize'
import { LoadingSpinner } from './LoadingSpinner'

type FieldErrors = Partial<Record<keyof TicketFormValues, string>>

const INITIAL_VALUES: TicketFormValues = {
  title: '',
  description: '',
  priority: 'P1',
}

export function QrGenerator() {
  const [values, setValues] = useState<TicketFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [qr, setQr] = useState<QrCode | null>(null)

  function validate(v: TicketFormValues): FieldErrors {
    const e: FieldErrors = {}
    if (!v.title.trim()) e.title = 'Title is required'
    if (v.title.trim().length > 120) e.title = 'Title too long (max 120)'
    if (!v.description.trim()) e.description = 'Description is required'
    if (v.description.trim().length > 500) e.description = 'Description too long (max 500)'
    if (!['P0', 'P1', 'P2', 'P3'].includes(v.priority)) e.priority = 'Invalid priority'
    return e
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)
    setQr(null)
    try {
      const sanitized: TicketFormValues = {
        title: sanitizeText(values.title),
        description: sanitizeText(values.description),
        priority: values.priority,
      }
      const result = await createTicketAndQr(sanitized)
      setQr(result.qr)

      trackEvent(
        'User interacted with Ticket QR Code Generator Worker',
        'generate_qr',
      )
    } finally {
      setLoading(false)
    }
  }

  function updateField<K extends keyof TicketFormValues>(
    key: K,
    value: TicketFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const inputBase =
    'w-full rounded-md border bg-mono-0 px-4 py-2 text-mono-900 outline-none transition focus:border-mono-800'

  return (
    <section className="rounded-md border border-mono-200 bg-mono-0 p-8">
      <h2 className="text-xl font-semibold text-mono-900">Generate Ticket QR</h2>
      <p className="mt-2 text-sm text-mono-600">
        Fill in the ticket details to generate a scannable QR code.
      </p>

      <form
        role="form"
        aria-label="Ticket QR generator"
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 space-y-4"
      >
        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-mono-800"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={values.title}
            onChange={(e) => updateField('title', e.target.value)}
            aria-invalid={errors.title ? 'true' : 'false'}
            aria-describedby={errors.title ? 'title-error' : undefined}
            className={`${inputBase} ${
              errors.title ? 'border-red-500' : 'border-mono-200'
            }`}
            placeholder="e.g. Printer jam on floor 2"
          />
          {errors.title && (
            <p id="title-error" role="alert" className="text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-mono-800"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={values.description}
            onChange={(e) => updateField('description', e.target.value)}
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'description-error' : undefined}
            className={`${inputBase} ${
              errors.description ? 'border-red-500' : 'border-mono-200'
            }`}
            placeholder="Describe the issue"
          />
          {errors.description && (
            <p
              id="description-error"
              role="alert"
              className="text-sm text-red-600"
            >
              {errors.description}
            </p>
          )}
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-mono-800"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={values.priority}
            onChange={(e) =>
              updateField('priority', e.target.value as TicketPriority)
            }
            aria-invalid={errors.priority ? 'true' : 'false'}
            className={`${inputBase} ${
              errors.priority ? 'border-red-500' : 'border-mono-200'
            }`}
          >
            <option value="P0">P0 — Critical</option>
            <option value="P1">P1 — High</option>
            <option value="P2">P2 — Medium</option>
            <option value="P3">P3 — Low</option>
          </select>
          {errors.priority && (
            <p id="priority-error" role="alert" className="text-sm text-red-600">
              {errors.priority}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="w-full rounded-md bg-mono-900 px-4 py-2 text-sm font-medium text-mono-0 transition hover:bg-mono-800 disabled:opacity-60"
        >
          {loading ? 'Generating…' : 'Generate QR'}
        </button>
      </form>

      {loading && <LoadingSpinner />}

      {qr && !loading && (
        <div
          data-testid="qr-code"
          className="mt-6 flex flex-col items-center gap-4 rounded-md border border-mono-200 bg-mono-50 p-8"
        >
          <QRCodeSVG
            value={qr.payload}
            size={192}
            bgColor="#FFFFFF"
            fgColor="#18181B"
            aria-label="Ticket QR code"
          />
          <p className="font-mono text-sm text-mono-600">{qr.payload}</p>
        </div>
      )}
    </section>
  )
}
