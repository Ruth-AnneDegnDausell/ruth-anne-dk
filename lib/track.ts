'use client'

import { isOwnerVisit } from '@/lib/owner-flag'

// Fælles hændelses-tracking til Supabase (page_views-tabellen).
// Bruges af VisitTracker (view/leave) og af track() til funktions-hændelser
// som cv-download, lightbox, kontakt-klik osv. Egne besøg (ejer-flag) sendes aldrig.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function sessionId(): string {
  let id = sessionStorage.getItem('ra-sid')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('ra-sid', id)
  }
  return id
}

export function sendRow(row: Record<string, unknown>, keepalive = false) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return
  if (isOwnerVisit()) return
  fetch(`${SUPABASE_URL}/rest/v1/page_views`, {
    method: 'POST',
    keepalive,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  }).catch(() => {})
}

/**
 * Logger en funktions-hændelse, fx track('cv-download') eller
 * track('lightbox', 'Jonas Vingegaard'). Siden (path) sættes automatisk.
 */
export function track(event: string, detail?: string) {
  if (typeof window === 'undefined') return
  sendRow({
    session_id: sessionId(),
    path: window.location.pathname,
    event,
    detail: detail?.slice(0, 200) ?? null,
  })
}
