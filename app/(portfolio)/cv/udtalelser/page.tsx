'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const DOC_HEIGHT = 68
const DOC_MIN = 400

const DOCS = [
  { source: 'Vid&Sans', author: 'Søren Schultz Jørgensen', role: 'Chefredaktør', year: '2022', pdf: '/Til%20CV/UdtalelseFraVid%26Sans.pdf', type: 'pdf' as const },
  { source: 'BOOK LAB Forlag', author: 'Søren Hørdum', role: 'Forlagschef', year: '2022', pdf: '/Til%20CV/Anbefaling%20-%20Ruth-Anne.pdf', type: 'pdf' as const },
  { source: 'Aarhus Børnehøjskole', author: 'Thomas Krøyer', role: 'Forstander', year: '2023', pdf: '/Til%20CV/Anbefaling-Ruth-Anne-Degn-Dausell.pdf', type: 'pdf' as const },
  { source: 'Dahl Limited · Njordec', author: 'Kenneth Dahl', role: '', year: '2020', pdf: '/Til%20CV/Udtalelse_dahllimeted.pdf', type: 'pdf' as const },
  { source: 'Elev Ungdomsklub', author: 'Jacob Mohr Jensen', role: 'Klubleder', year: '2021', pdf: '/Til%20CV/euk-udtalelse.pdf', type: 'pdf' as const },
  { source: 'Dansk Wilton', author: 'Lone Ditmer', role: 'Marketing Manager', year: '2020', pdf: '/Til%20CV/Anbefaling_DanskWilton.pdf', type: 'pdf' as const },
  { source: 'HK/Privats Ophavsretsfond', author: 'Legatudtalelse', role: 'Afgangsprojekt 2023', year: '2023', pdf: '/Til%20CV/Legat%20udtalelse.png', type: 'image' as const },
]

const T = {
  da: { eyebrow: 'CV', heading: 'Udtalelser', backToCV: 'Gå til CV', of: 'af', downloadAll: 'Download alle udtalelser', downloadLabel: 'Download' },
  en: { eyebrow: 'CV', heading: 'References', backToCV: 'Go to CV', of: 'of', downloadAll: 'Download all references', downloadLabel: 'Download' },
}

export default function UdtalelserPage() {
  const { lang } = useLang()
  const t = T[lang]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const i = Number(params.get('i') ?? '0')
    if (!isNaN(i) && i >= 0 && i < DOCS.length) setIndex(i)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1))
      else if (e.key === 'ArrowRight') setIndex(i => Math.min(DOCS.length - 1, i + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const doc = DOCS[index]

  return (
    <main className="min-h-screen px-4 pb-28 pt-14 sm:px-8">

      {/* Back link — left side, more visible */}
      <div className="mb-8 px-2 sm:px-4">
        <Link
          href="/cv"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-2 transition-colors duration-150 hover:text-text"
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          {t.backToCV}
        </Link>
      </div>

      <div className="mb-10 px-2 sm:px-4">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.eyebrow}
        </p>
        <h1 className="text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-xl">
        <div className="flex gap-3">

          {/* Prev — vertically centered at document height */}
          <div
            className="flex shrink-0 flex-col justify-center"
            style={{ height: `${DOC_HEIGHT}vh`, minHeight: DOC_MIN }}
          >
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              aria-label="Forrige"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text disabled:cursor-default disabled:opacity-20"
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
            </button>
          </div>

          {/* Card */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease }}
              >
                {/* Document — bg-white prevents any dark bleed around the PDF */}
                <div className="overflow-hidden rounded-2xl bg-white">
                  {doc.type === 'pdf' ? (
                    <iframe
                      key={doc.pdf}
                      src={`${doc.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={doc.source}
                      className="block w-full"
                      style={{ height: `${DOC_HEIGHT}vh`, minHeight: DOC_MIN, border: 'none', outline: 'none', display: 'block' }}
                    />
                  ) : (
                    <Image
                      src={doc.pdf}
                      alt={doc.source}
                      width={900}
                      height={1200}
                      className="h-auto w-full"
                    />
                  )}
                </div>

                {/* Source info */}
                <div className="mt-4 px-1">
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-text-3">
                    {doc.source} · {doc.year}
                  </p>
                  <p className="mt-1 text-[12px] font-[450] text-text">{doc.author}</p>
                  {doc.role && (
                    <p className="mt-0.5 text-[11px] text-text-3">{doc.role}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next — vertically centered at document height */}
          <div
            className="flex shrink-0 flex-col justify-center"
            style={{ height: `${DOC_HEIGHT}vh`, minHeight: DOC_MIN }}
          >
            <button
              onClick={() => setIndex((i) => Math.min(DOCS.length - 1, i + 1))}
              disabled={index === DOCS.length - 1}
              aria-label="Næste"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text disabled:cursor-default disabled:opacity-20"
            >
              <ArrowRight size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Dots + counter */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            {DOCS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={DOCS[i].source}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? 'w-4 bg-text-2' : 'w-1.5 bg-border-2 hover:bg-text-3'
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] text-text-3">
            {index + 1} {t.of} {DOCS.length}
          </p>
        </div>
      </div>

      {/* Download all section */}
      <div className="mx-auto mt-16 max-w-xl">
        <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
          {t.downloadAll}
        </p>
        <ul className="divide-y divide-border border-t border-border">
          {DOCS.filter((d) => d.type === 'pdf').map((d, i) => (
            <li key={i} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-[11px] font-[450] text-text">{d.source}</p>
                <p className="text-[10px] text-text-3">{d.author} · {d.year}</p>
              </div>
              <a
                href={d.pdf}
                download
                className="flex items-center gap-1.5 text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50"
              >
                <Download size={11} strokeWidth={1.5} />
                {t.downloadLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </main>
  )
}
