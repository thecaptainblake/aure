export const fetchErrorMessage = (error: unknown, fallback: string) => {
  if (!error || typeof error !== 'object') return fallback
  const record = error as { data?: { statusMessage?: string, message?: string }, statusMessage?: string }
  return record.data?.statusMessage || record.data?.message || record.statusMessage || fallback
}
