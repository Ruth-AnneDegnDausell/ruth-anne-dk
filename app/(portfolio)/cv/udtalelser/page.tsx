'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const DOCS = [
  {
    source: 'Vid&Sans',
    author: 'Søren Schultz Jørgensen',
    role: 'Chefredaktør',
    src: '/til%20cv/UdtalelseFraVid%26Sans.pdf',
    type: 'pdf' as const,
  },
  {
    source: 'BOOK LAB',
    author: 'Søren Hørdum',
    role: 'Forlagschef',
    src: '/til%20cv/Anbefaling%20-%20Ruth-Anne.pdf',
    type: 'pdf' as const,
  },
  {
    source: 'Aarhus Børnehøjskole',
    author: 'Thomas Krøyer',
    role: 'Forstander',
    src: '/til%20cv/Anbefaling-Ruth-Anne-Degn-Dausell.pdf',
    type: 'pdf' as const,
  },
  {
    source: 'Dahl Limited · Njordec',
    author: 'Kenneth Dahl',
    role: '',
    src: '/til%20cv/Udtalelse_dahllimeted.pdf',
    type: 'pdf' as const,
  },
  {
    source: 'Elev Ungdomsklub',
    author: 'Jacob Mohr Jensen',
    role: 'Klubleder',
    src: '/til%20cv/euk-udtalelse.pdf',
    type: 'pdf' as const,
  },
  {
    source: 'Dansk Wilton',
    author: 'Lone Ditmer',
    role: 'Marketing Manager',
    src: '/til%20cv/Anbefaling_DanskWilton.pdf',
    type: 'pdf' as const,
  },
  {
    source: 'HK/Privats Ophavsretsfond',
    author: 'Legatudtalelse',
    role: '',
    src: '/til%20cv/Legat%20udtalelse.png',
    type: 'image' as const,
  },
]

const T = {
  da: {
    label: 'CV',
    heading: 'Udtalelser',
    back: 'Tilbage til CV',
    open: 'Åbn dokument',
    of: 'af',
  },
  en: {
    label: 'CV',
    heading: 'References',
    back: 'Back to CV',
    open: 'Open document',
    of: 'of',
  },
}

export default function UdtalelserPage() {
  const { lang } = useLang()
  const t = T[lang]
  const [index, setIndex] = useState(0)
  const doc = DOCS[index]

  return (
    <main className="min-h-screen px-8 pb-28 pt-14 sm:px-14">

      <div className="mb-8">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.label}
        </p>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
          <Link
            href="/cv"
            className="shrink-0 text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
          >
            {t.back}
          </Link>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="mb-5 flex items-center justify-between border-b border-t border-border py-4">

        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-2 transition-colors duration-150 hover:text-text disabled:cursor-default disabled:opacity-25"
          aria-label="Forrige"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
        </button>

        <div className="text-center">
          <p className="text-[11px] font-[450] text-text">{doc.source}</p>
          {doc.author && (
            <p className="mt-0.5 text-[10px] text-text-3">
              {doc.role ? `${doc.author} · ${doc.role}` : doc.author}
            </p>
          )}
          <p className="mt-1 text-[9px] tracking-[0.12em] text-text-3">
            {index + 1} {t.of} {DOCS.length}
          </p>
        </div>

        <button
          onClick={() => setIndex((i) => Math.min(DOCS.length - 1, i + 1))}
          disabled={index === DOCS.length - 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-2 transition-colors duration-150 hover:text-text disabled:cursor-default disabled:opacity-25"
          aria-label="Næste"
        >
          <ArrowRight size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Document viewer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25, ease }}
        >
          {doc.type === 'pdf' ? (
            <div className="overflow-hidden rounded-xl border border-border bg-[oklch(97%_0_0)]">
              <iframe
                src={doc.src}
                title={doc.source}
                className="h-[78vh] w-full"
              />
              <div className="border-t border-border px-4 py-3 text-right">
                <a
                  href={doc.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50"
                >
                  {t.open} ↗
                </a>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="relative w-full">
                <Image
                  src={doc.src}
                  alt={doc.source}
                  width={1200}
                  height={1600}
                  className="h-auto w-full"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-1.5">
        {DOCS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'w-4 bg-text-2' : 'w-1.5 bg-border-2 hover:bg-text-3'
            }`}
            aria-label={`Gå til ${DOCS[i].source}`}
          />
        ))}
      </div>

    </main>
  )
}
