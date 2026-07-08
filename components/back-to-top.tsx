'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Lille "til top"-knap på mobil, vises når der er scrollet ned
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Til top"
      className="fixed bottom-5 right-5 z-[150] flex items-center gap-1.5 rounded-full border border-border bg-surface/95 px-3.5 py-2 text-[10px] font-medium text-text-2 shadow-[0_2px_10px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:hidden"
    >
      <ArrowUp size={11} strokeWidth={1.5} />
      Til top
    </button>
  )
}
