const ANALYTICS_PREFIX = '[Analytics]'

/**
 * Simulated analytics ping.
 * TRD NFR: "Log a specific message to the console whenever a primary action is completed."
 */
export function trackEvent(event: string, context?: string): void {
  if (context) {
    console.log(`${ANALYTICS_PREFIX} ${event}`, { context })
  } else {
    console.log(`${ANALYTICS_PREFIX} ${event}`)
  }
}
