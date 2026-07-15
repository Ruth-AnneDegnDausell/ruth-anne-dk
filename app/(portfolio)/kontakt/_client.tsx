'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { downloadCv } from '@/lib/cv-download'
import { track } from '@/lib/track'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const DEFAULT = {
  da: {
    label: 'Kontakt',
    heading: 'Lad os tale sammen',
    intro: 'Har du et projekt du vil drøfte, eller vil du bare sige hej? Skriv til mig.',
    channelsLabel: 'Find mig her',
    channels: [
      { title: 'E-mail', value: 'annedegndausell@gmail.com', href: 'mailto:annedegndausell@gmail.com' },
      { title: 'Telefon', value: '51 50 85 70', href: 'tel:+4551508570' },
      { title: 'LinkedIn', value: 'linkedin.com/in/ruthannedausell', href: 'https://linkedin.com/in/ruthannedausell' },
    ],
    availabilityLabel: 'Tilgængelighed',
    availability: 'Åben for nye projekter og samarbejder. Skriv til mig, så finder vi ud af det.',
  },
  en: {
    label: 'Contact',
    heading: "Let's talk",
    intro: 'Have a project you want to discuss, or just want to say hello? Write to me.',
    channelsLabel: 'Find me here',
    channels: [
      { title: 'Email', value: 'annedegndausell@gmail.com', href: 'mailto:annedegndausell@gmail.com' },
      { title: 'Phone', value: '51 50 85 70', href: 'tel:+4551508570' },
      { title: 'LinkedIn', value: 'linkedin.com/in/ruthannedausell', href: 'https://linkedin.com/in/ruthannedausell' },
    ],
    availabilityLabel: 'Availability',
    availability: "Open to new projects and collaborations. Get in touch and we'll figure something out.",
  },
}

function buildT(d: any) {
  return {
    da: {
      ...DEFAULT.da,
      heading: d.heading ?? DEFAULT.da.heading,
      intro: d.intro ?? DEFAULT.da.intro,
      channels: d.channels ?? DEFAULT.da.channels,
      availability: d.availability ?? DEFAULT.da.availability,
    },
    en: {
      ...DEFAULT.en,
      heading: d.headingEn ?? DEFAULT.en.heading,
      intro: d.introEn ?? DEFAULT.en.intro,
      channels: d.channelsEn ?? DEFAULT.en.channels,
      availability: d.availabilityEn ?? DEFAULT.en.availability,
    },
  }
}

export function KontaktClient({ sanityData, cvPdfUrl }: { sanityData: any; cvPdfUrl?: string | null }) {
  const { lang } = useLang()
  const t = sanityData ? buildT(sanityData)[lang] : DEFAULT[lang]

  // Logger når nogen kopierer kontaktoplysninger (mail/telefon) fra siden
  useEffect(() => {
    const onCopy = () => {
      const text = window.getSelection()?.toString() ?? ''
      if (text.includes('@')) track('kontakt-kopier', 'mail')
      else if (/\d{2}\s?\d{2}/.test(text)) track('kontakt-kopier', 'telefon')
    }
    document.addEventListener('copy', onCopy)
    return () => document.removeEventListener('copy', onCopy)
  }, [])

  return (
    <main className="px-8 pt-14 sm:px-14">
      <div className="mb-12">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">{t.label}</p>
        <h1 className="text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
      </div>

      <div className="max-w-md">
        <motion.p {...fadeUp(0)} className="mb-12 text-[12px]/[1.85] text-text-2">{t.intro}</motion.p>

        <motion.div {...fadeUp(0.06)}>
          <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.channelsLabel}</p>
          <ul className="divide-y divide-border border-t border-border">
            {t.channels.map((ch: any) => (
              <li key={ch.title} className="flex items-baseline gap-4 py-3.5">
                <span className="w-[100px] shrink-0 text-[11px] text-text-3">{ch.title}</span>
                <a
                  href={ch.href}
                  onClick={() => track('kontakt-klik', ch.title)}
                  target={ch.href?.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[12px] font-[450] text-text transition-opacity duration-150 hover:opacity-50"
                >
                  {ch.value}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-10">
          <p className="mb-2 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.availabilityLabel}</p>
          <p className="text-[11px]/[1.75] text-text-2">{t.availability}</p>
        </motion.div>

        <motion.div {...fadeUp(0.14)} className="mt-10">
          <button
            onClick={() => downloadCv(cvPdfUrl)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[11px] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text"
          >
            {lang === 'en' ? 'Download CV (PDF) ↓' : 'Download CV (PDF) ↓'}
          </button>
        </motion.div>
      </div>
    </main>
  )
}
