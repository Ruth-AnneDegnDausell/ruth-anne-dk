'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const T = {
  da: {
    bio1: 'Uddannet fra Designskolen Kolding med speciale i visuel kommunikation. Har siden arbejdet som freelance designer med kunder inden for sport, kultur og mode. Bor og arbejder i København.',
    bio2: 'Tror på at godt design er det, der ikke bemærkes - det bare virker. Arbejder tæt med kunder fra første brief til færdigt produkt.',
    servicesLabel: 'Hvad jeg laver',
    services: [
      { title: 'Visuel identitet', desc: 'Logo, farvepalette, typografi og brand guidelines.' },
      { title: 'Illustration', desc: 'Håndtegnede og digitale illustrationer til print og web.' },
      { title: 'UX · UI design', desc: 'Interface design og prototyper klar til produktion.' },
      { title: 'Art direction', desc: 'Kreativ ledelse af visuelle projekter fra start til slut.' },
    ],
    clientsLabel: 'Typiske kunder',
    clients: 'Arbejder primært med små og mellemstore virksomheder, startups og kulturinstitutioner der søger et sammenhængende visuelt udtryk.',
    ctaLabel: 'Kontakt',
    ctaText: 'Tag fat i mig →',
    portraitAlt: 'Portræt af Ruth-Anne Dausell',
    portraitHint: 'Portræt · min. 1200 × 1600 px',
  },
  en: {
    bio1: 'Graduated from Designskolen Kolding with a specialisation in visual communication. Since then working as a freelance designer for clients in sports, culture, and fashion. Based in Copenhagen.',
    bio2: 'Believes that good design is what goes unnoticed — it just works. Works closely with clients from the first brief through to finished product.',
    servicesLabel: 'What I do',
    services: [
      { title: 'Visual identity', desc: 'Logo, colour palette, typography, and brand guidelines.' },
      { title: 'Illustration', desc: 'Hand-drawn and digital illustrations for print and web.' },
      { title: 'UX · UI design', desc: 'Interface design and prototypes ready for production.' },
      { title: 'Art direction', desc: 'Creative direction of visual projects from start to finish.' },
    ],
    clientsLabel: 'Typical clients',
    clients: 'Primarily works with small and medium-sized companies, startups, and cultural institutions looking for a cohesive visual identity.',
    ctaLabel: 'Contact',
    ctaText: 'Get in touch →',
    portraitAlt: 'Portrait of Ruth-Anne Dausell',
    portraitHint: 'Portrait · min. 1200 × 1600 px',
  },
}

export default function Arbejde() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">

      {/* ─── Left: text content ───────────────────────────── */}
      <div>
        <motion.div {...fadeUp(0)} className="mb-10 max-w-md">
          <p className="text-[12px]/[1.85] text-text-2">{t.bio1}</p>
          <p className="mt-4 text-[12px]/[1.85] text-text-2">{t.bio2}</p>
        </motion.div>

        {/* Services */}
        <motion.div {...fadeUp(0.06)}>
          <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
            {t.servicesLabel}
          </p>
          <ul className="divide-y divide-border border-t border-border">
            {t.services.map((s) => (
              <li key={s.title} className="flex items-baseline gap-4 py-3.5">
                <span className="w-[140px] shrink-0 text-[12px] font-[450] text-text">{s.title}</span>
                <span className="text-[11px]/[1.6] text-text-2">{s.desc}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Clients note */}
        <motion.div {...fadeUp(0.1)} className="mt-10 max-w-sm">
          <p className="mb-2 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
            {t.clientsLabel}
          </p>
          <p className="text-[11px]/[1.75] text-text-2">{t.clients}</p>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp(0.14)} className="mt-10">
          <p className="mb-2 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
            {t.ctaLabel}
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text transition-opacity duration-150 hover:opacity-50"
          >
            {t.ctaText}
          </Link>
        </motion.div>
      </div>

      {/* ─── Right: portrait ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.08, ease }}
        className="order-first lg:order-last"
      >
        <div className="flex aspect-[3/4] w-full max-w-[320px] flex-col items-center justify-center gap-3 rounded-2xl bg-[oklch(91%_0_0)] text-center">
          <ImageIcon strokeWidth={1} size={22} className="text-text-3" />
          <div>
            <p className="text-[11px] font-[450] text-text-2">{t.portraitAlt}</p>
            <p className="mt-0.5 text-[10px] text-text-3">{t.portraitHint}</p>
          </div>
        </div>
      </motion.div>

    </div>
  )
}
