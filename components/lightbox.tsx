'use client'

import { useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '@/lib/gallery'

// Lightbox i samme stil som AI-karrusellen: lys, sløret baggrund så galleriet
// anes bagved, billedet som card med runde hjørner, små nabo-cards i siderne.
// Skift med piletaster eller pilene; klik udenfor billedet lukker.
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
  backLabel = 'Tilbage',
}: {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onIndexChange: (i: number) => void
  /** Tekst på mobil-tilbageknappen, fx 'Tilbage til projektet' */
  backLabel?: string
}) {
  const open = index !== null && items[index] != null
  const touchStartX = useRef<number | null>(null)

  const prev = useCallback(() => {
    if (index === null) return
    onIndexChange((index - 1 + items.length) % items.length)
  }, [index, items.length, onIndexChange])

  const next = useCallback(() => {
    if (index === null) return
    onIndexChange((index + 1) % items.length)
  }, [index, items.length, onIndexChange])

  // Piletaster + Esc
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, prev, next, onClose])

  // Lås baggrundens scroll mens lightboxen er åben
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null
  const item = items[index!]
  const src = item.full ?? item.src
  const prevItem = items[(index! - 1 + items.length) % items.length]
  const nextItem = items[(index! + 1) % items.length]

  // Sideelement: nabo-card (stort, tættest på hovedbilledet) med pilen ved
  // siden af, yderst - fast forankret og spejlet, så siderne står lige overfor
  const sideColumn = (target: GalleryItem, go: () => void, label: string, ArrowIcon: typeof ArrowLeft, sideClass: string, arrowFirst: boolean) => {
    const arrow = (
      <button
        key="arrow"
        onClick={(e) => { e.stopPropagation(); go() }}
        aria-label={label}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface/90 text-text-2 shadow-sm transition-colors duration-150 hover:border-border-2 hover:text-text"
      >
        <ArrowIcon size={13} strokeWidth={1.5} />
      </button>
    )
    const thumb = target.src ? (
      <button
        key="thumb"
        onClick={(e) => { e.stopPropagation(); go() }}
        aria-label={label}
        className="relative shrink-0 overflow-hidden rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
        style={{ width: 240, height: 180 }}
      >
        <Image
          src={target.src}
          fill
          alt=""
          className="object-cover opacity-55 transition-opacity duration-150 hover:opacity-90"
          sizes="240px"
        />
      </button>
    ) : (
      <div key="thumb" className="shrink-0" style={{ width: 240 }} />
    )
    return (
      <div className={`absolute top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex ${sideClass}`}>
        {arrowFirst ? [arrow, thumb] : [thumb, arrow]}
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[300] flex items-center justify-center backdrop-blur-md"
        style={{ background: 'rgba(246, 245, 243, 0.78)' }}
        onClick={onClose}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const dx = e.changedTouches[0].clientX - touchStartX.current
          touchStartX.current = null
          if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
        }}
      >
        {/* Selve billedet - kun billedet stopper luk-klikket */}
        <div className="flex h-full w-full items-center justify-center px-4 lg:px-[340px]">
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22 }}
            className="max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {src && (
              <Image
                src={src}
                alt={item.alt ?? ''}
                width={0}
                height={0}
                className="h-auto w-auto rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.18)]"
                style={{ maxHeight: 'calc(100vh - 7rem)', maxWidth: '100%' }}
                sizes="90vw"
                priority
              />
            )}
          </motion.div>
        </div>

        {/* Nabo-cards + pile, spejlet i hver side: pil yderst, card tættest på billedet */}
        {sideColumn(prevItem, prev, 'Forrige billede', ArrowLeft, 'left-5 xl:left-8', true)}
        {sideColumn(nextItem, next, 'Næste billede', ArrowRight, 'right-5 xl:right-8', false)}

        {/* Usynlig forudindlæsning af naboernes fulde versioner */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
          {[prevItem, nextItem].map((n, i) =>
            (n.full ?? n.src) ? (
              <Image key={i} src={(n.full ?? n.src)!} alt="" fill className="object-contain" sizes="90vw" />
            ) : null
          )}
        </div>

        {/* Luk */}
        <button
          onClick={onClose}
          aria-label="Luk"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/90 text-text-2 shadow-sm transition-colors duration-150 hover:border-border-2 hover:text-text"
        >
          <X size={14} strokeWidth={1.5} />
        </button>

        {/* Tilbage-knap øverst på mobil */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 flex items-center gap-1.5 text-[12px] font-medium text-text-2 lg:hidden"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          {backLabel}
        </button>

        {/* Rene chevron-pile på mobil (uden baggrund) */}
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Forrige"
          className="absolute left-1 top-1/2 -translate-y-1/2 p-2 text-text lg:hidden"
        >
          <ChevronLeft size={30} strokeWidth={1.5} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Næste"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-text lg:hidden"
        >
          <ChevronRight size={30} strokeWidth={1.5} />
        </button>

        {/* Tæller */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tabular-nums text-text-3">
          {index! + 1} / {items.length}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
