'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { downloadCv, saveFile } from '@/lib/cv-download'
import { PdfView } from './_pdf-view'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const DOC_HEIGHT = 68
const DOC_MIN = 400

type Doc = {
  source: string
  author: string
  role: string
  year: string
  fileUrl: string
  isPdf: boolean
}

const T = {
  da: {
    eyebrow: 'CV', heading: 'Udtalelser', backToCV: 'Gå til CV', of: 'af',
    downloadAll: 'Download alle udtalelser', downloadAllBtn: 'Download alle ↓', downloadLabel: 'Download',
    promptTitle: 'Vil du også downloade CV\'et?',
    promptYes: 'Ja', promptNo: 'Nej', promptCancel: 'Annuller',
    zipping: 'Pakker filer…',
  },
  en: {
    eyebrow: 'CV', heading: 'References', backToCV: 'Go to CV', of: 'of',
    downloadAll: 'Download all references', downloadAllBtn: 'Download all ↓', downloadLabel: 'Download',
    promptTitle: 'Would you also like to download the CV?',
    promptYes: 'Yes', promptNo: 'No', promptCancel: 'Cancel',
    zipping: 'Preparing files…',
  },
}

type Pending = { type: 'single'; doc: Doc } | { type: 'all' }

export function UdtalelserClient({ docs, cvPdfUrl }: { docs: Doc[]; cvPdfUrl?: string | null }) {
  const { lang } = useLang()
  const t = T[lang]
  const [index, setIndex] = useState(0)
  const [pending, setPending] = useState<Pending | null>(null)
  const [zipping, setZipping] = useState(false)

  const fileName = (d: Doc) => {
    const ext = d.fileUrl.split('.').pop()?.split('?')[0] ?? 'pdf'
    return `Udtalelse - ${d.source}.${ext}`
  }

  const downloadAllAsZip = async () => {
    setZipping(true)
    try {
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      await Promise.all(
        docs.map(async (d) => {
          const res = await fetch(d.fileUrl)
          zip.file(fileName(d), await res.blob())
        }),
      )
      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      saveFile(url, 'Ruth-Anne-Dausell-udtalelser.zip')
      URL.revokeObjectURL(url)
    } catch {
      // Fallback: enkeltvise downloads
      docs.forEach((d) => saveFile(d.fileUrl, fileName(d)))
    } finally {
      setZipping(false)
    }
  }

  const runPending = async (withCv: boolean) => {
    const action = pending
    setPending(null)
    if (!action) return
    if (action.type === 'single') saveFile(action.doc.fileUrl, fileName(action.doc))
    else await downloadAllAsZip()
    if (withCv) downloadCv(cvPdfUrl)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const i = Number(params.get('i') ?? '0')
    if (!isNaN(i) && i >= 0 && i < docs.length) setIndex(i)
  }, [docs.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1))
      else if (e.key === 'ArrowRight') setIndex(i => Math.min(docs.length - 1, i + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [docs.length])

  // Auto-skift hvert 5. sekund (samme interval som AI-foto-karrusellen), i ring
  useEffect(() => {
    if (docs.length <= 1) return
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % docs.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [docs.length, index])

  const doc = docs[index]
  if (!doc) return null

  return (
    <main className="px-4 pt-14 sm:px-8">

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

      <div className="mx-auto max-w-xl">
        <div className="flex gap-3">

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

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease }}
              >
                <div className="overflow-hidden rounded-2xl bg-white">
                  {doc.isPdf ? (
                    <PdfView key={doc.fileUrl} fileUrl={doc.fileUrl} title={doc.source} />
                  ) : (
                    <Image
                      src={doc.fileUrl}
                      alt={doc.source}
                      width={900}
                      height={1200}
                      className="h-auto w-full"
                      unoptimized
                    />
                  )}
                </div>

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

          <div
            className="flex shrink-0 flex-col justify-center"
            style={{ height: `${DOC_HEIGHT}vh`, minHeight: DOC_MIN }}
          >
            <button
              onClick={() => setIndex((i) => Math.min(docs.length - 1, i + 1))}
              disabled={index === docs.length - 1}
              aria-label="Næste"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text disabled:cursor-default disabled:opacity-20"
            >
              <ArrowRight size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            {docs.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={docs[i].source}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? 'w-4 bg-text-2' : 'w-1.5 bg-border-2 hover:bg-text-3'
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] text-text-3">
            {index + 1} {t.of} {docs.length}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
            {t.downloadAll}
          </p>
          <button
            onClick={() => setPending({ type: 'all' })}
            disabled={zipping}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[11px] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text disabled:opacity-40"
          >
            <Download size={11} strokeWidth={1.5} />
            {zipping ? t.zipping : t.downloadAllBtn}
          </button>
        </div>
        <ul className="divide-y divide-border border-t border-border">
          {docs.map((d, i) => (
            <li key={i} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-[11px] font-[450] text-text">{d.source}</p>
                <p className="text-[10px] text-text-3">{d.author} · {d.year}</p>
              </div>
              <button
                onClick={() => setPending({ type: 'single', doc: d })}
                className="flex items-center gap-1.5 text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50"
              >
                <Download size={11} strokeWidth={1.5} />
                {t.downloadLabel}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup: vil du også downloade CV'et? */}
      {pending && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/25 px-6 backdrop-blur-[2px]"
          onClick={() => setPending(null)}
        >
          <div
            className="w-full max-w-xs rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[12px] font-[450] text-text">{t.promptTitle}</p>
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => runPending(true)}
                className="rounded-full bg-accent px-4 py-2 text-[11px] font-medium text-surface transition-opacity duration-150 hover:opacity-80"
              >
                {t.promptYes}
              </button>
              <button
                onClick={() => runPending(false)}
                className="rounded-full border border-border px-4 py-2 text-[11px] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text"
              >
                {t.promptNo}
              </button>
              <button
                onClick={() => setPending(null)}
                className="ml-auto px-2 py-2 text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
              >
                {t.promptCancel}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
