'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const T = {
  da: {
    label: 'Kontakt',
    heading: 'Lad os tale sammen',
    intro: 'Har du et projekt du vil drøfte, eller vil du bare sige hej? Skriv til mig.',
    channelsLabel: 'Find mig her',
    channels: [
      { title: 'E-mail', value: 'hej@ruth-anne.dk', href: 'mailto:hej@ruth-anne.dk' },
      { title: 'LinkedIn', value: 'linkedin.com/in/ruth-anne-dausell', href: 'https://linkedin.com/in/ruth-anne-dausell' },
      { title: 'Instagram', value: '@ruthannedesign', href: 'https://instagram.com/ruthannedesign' },
    ],
    availabilityLabel: 'Tilgængelighed',
    availability: 'Tager i øjeblikket nye projekter fra august 2025.',
  },
  en: {
    label: 'Contact',
    heading: "Let's talk",
    intro: 'Have a project you want to discuss, or just want to say hello? Write to me.',
    channelsLabel: 'Find me here',
    channels: [
      { title: 'Email', value: 'hej@ruth-anne.dk', href: 'mailto:hej@ruth-anne.dk' },
      { title: 'LinkedIn', value: 'linkedin.com/in/ruth-anne-dausell', href: 'https://linkedin.com/in/ruth-anne-dausell' },
      { title: 'Instagram', value: '@ruthannedesign', href: 'https://instagram.com/ruthannedesign' },
    ],
    availabilityLabel: 'Availability',
    availability: 'Currently accepting new projects from August 2025.',
  },
}

export default function Kontakt() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <main className="min-h-screen px-8 pb-28 pt-14 sm:px-14">
      <div className="mb-12">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.label}
        </p>
        <h1 className="text-[13px] font-[450] tracking-tight text-text">
          {t.heading}
        </h1>
      </div>

      <div className="max-w-md">
        <motion.p {...fadeUp(0)} className="mb-12 text-[12px]/[1.85] text-text-2">
          {t.intro}
        </motion.p>

        {/* Channels */}
        <motion.div {...fadeUp(0.06)}>
          <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
            {t.channelsLabel}
          </p>
          <ul className="divide-y divide-border border-t border-border">
            {t.channels.map((ch) => (
              <li key={ch.title} className="flex items-baseline gap-4 py-3.5">
                <span className="w-[100px] shrink-0 text-[11px] text-text-3">{ch.title}</span>
                <a
                  href={ch.href}
                  target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[12px] font-[450] text-text transition-opacity duration-150 hover:opacity-50"
                >
                  {ch.value}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Availability */}
        <motion.div {...fadeUp(0.1)} className="mt-10">
          <p className="mb-2 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
            {t.availabilityLabel}
          </p>
          <p className="text-[11px]/[1.75] text-text-2">{t.availability}</p>
        </motion.div>
      </div>
    </main>
  )
}
