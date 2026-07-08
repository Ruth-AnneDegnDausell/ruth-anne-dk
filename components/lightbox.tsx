'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { GalleryItem } from '@/lib/gallery'

// Lightbox til gallerierne: klik på et billede åbner det stort,
// piletaster eller de diskrete pile skifter, Esc eller klik udenfor lukker.
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onIndexChange: (i: number) => void
}) {
  const open = index !== null && items[index] != null

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

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[300] flex items-center justify-center"
        style={{ background: 'rgba(24, 23, 22, 0.95)' }}
        onClick={onClose}
      >
        {/* Billedet */}
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-x-4 inset-y-14 sm:inset-x-16"
          onClick={(e) => e.stopPropagation()}
        >
          {src && (
            <Image
              src={src}
              alt={item.alt ?? ''}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          )}
        </motion.div>

        {/* Usynlig forudindlæsning af naboerne */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
          {[prevItem, nextItem].map((n, i) =>
            (n.full ?? n.src) ? (
              <Image key={i} src={(n.full ?? n.src)!} alt="" fill className="object-contain" sizes="100vw" />
            ) : null
          )}
        </div>

        {/* Luk */}
        <button
          onClick={onClose}
          aria-label="Luk"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors duration-150 hover:bg-white/15"
        >
          <X size={14} strokeWidth={1.5} />
        </button>

        {/* Diskrete pile */}
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Forrige"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors duration-150 hover:bg-white/15 sm:left-5"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Næste"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors duration-150 hover:bg-white/15 sm:right-5"
        >
          <ArrowRight size={13} strokeWidth={1.5} />
        </button>

        {/* Tæller */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tabular-nums text-white/50">
          {index! + 1} / {items.length}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
