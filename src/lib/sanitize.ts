import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes text input against XSS injection.
 * TRD NFR: "Sanitize all text inputs against XSS injection before storing them in state."
 */
export function sanitizeText(input: unknown): string {
  if (input === null || input === undefined) return ''
  const str = String(input).trim()
  if (str === '') return ''

  return DOMPurify.sanitize(str, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}
