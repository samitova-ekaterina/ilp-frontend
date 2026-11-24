export function logError(what: string, error: unknown, details?: Record<string, unknown>): void {
  console.error(`[ILP] ${what}`, error, details ?? {});
}
