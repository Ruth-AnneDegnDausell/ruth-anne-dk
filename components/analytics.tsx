'use client'

import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { isOwnerVisit } from '@/lib/owner-flag'

// Vercel Analytics, men egne besøg (ejer-flag sat) sendes ikke med.
export function Analytics() {
  return <VercelAnalytics beforeSend={(event) => (isOwnerVisit() ? null : event)} />
}
