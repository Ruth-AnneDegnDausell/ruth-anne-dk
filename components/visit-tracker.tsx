'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function sessionId(): string {
  let id = sessionStorage.getItem('ra-sid')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('ra-sid', id)
  }
  return id
}

function send(row: Record<string, unknown>, keepalive = false) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return
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

// Anonym besøgsstatistik: logger sidevisninger og tid pr. side til Supabase.
// Ingen cookies, ingen personhenførbare data - kun session-id, sti, kilde og enhed.
export function VisitTracker() {
  const pathname = usePathname()
  const startRef = useRef<number>(0)
  const pathRef = useRef<string | null>(null)

  useEffect(() => {
    if (pathname.startsWith('/studio')) return

    // Log varigheden på den side man kom fra
    if (pathRef.current && pathRef.current !== pathname) {
      send({
        session_id: sessionId(),
        path: pathRef.current,
        event: 'leave',
        duration_seconds: Math.max(0, Math.round((Date.now() - startRef.current) / 1000)),
      })
    }

    pathRef.current = pathname
    startRef.current = Date.now()
    send({
      session_id: sessionId(),
      path: pathname,
      event: 'view',
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      screen_w: window.innerWidth,
    })
  }, [pathname])

  useEffect(() => {
    const onHide = () => {
      if (!pathRef.current || pathRef.current.startsWith('/studio')) return
      send(
        {
          session_id: sessionId(),
          path: pathRef.current,
          event: 'leave',
          duration_seconds: Math.max(0, Math.round((Date.now() - startRef.current) / 1000)),
        },
        true,
      )
    }
    window.addEventListener('pagehide', onHide)
    return () => window.removeEventListener('pagehide', onHide)
  }, [])

  return null
}
