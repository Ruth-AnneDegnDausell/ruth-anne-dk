'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const T = {
  da: {
    bio1: 'Designer med baggrund i to designuddannelser: en bachelor i kommunikationsdesign fra Designskolen Kolding og en designteknologuddannelse i møbeldesign fra TEKO. Kombinationen giver mig en forståelse for både det analoge og det digitale, fra håndtegnet skitse til færdigt visuelt system.',
    bio2: 'Jeg har arbejdet med visuel identitet, illustration, art direction og videoproduktion for kunder inden for sportsernæring, kultur, medier og livsstil. Bl.a. hos Flaneur og et dansk sportsernæringsmærke, og tidligere som Junior Art Director hos Vid&Sans, hvor jeg var med til at bygge det grafiske udtryk fra bunden. Min tilgang er præcis og konceptdrevet, og jeg trives bedst, når der er kortere fra brief til produkt.',
    servicesLabel: 'Hvad jeg laver',
    services: [
      { title: 'Visuel identitet', desc: 'Logo, farvepalette, typografi og brand guidelines.' },
      { title: 'Illustration', desc: 'Håndtegnede og digitale illustrationer til print og web.' },
      { title: 'Art direction', desc: 'Kreativ ledelse af visuelle projekter fra start til slut.' },
      { title: 'Video & motion', desc: 'Kortere videoproduktioner og reklamecontent.' },
      { title: 'UX · UI design', desc: 'Interface design og prototyper klar til produktion.' },
    ],
    clientsLabel: 'Erfaring fra',
    clients: 'Flaneur, Vid&Sans (Aarhus Universitetsforlag), Videnskab.dk, BOOKLAB Forlag, KFUM&KFUK og dansk sportsernæringsbrand.',
    ctaLabel: 'Kontakt',
    ctaText: 'Tag fat i mig →',
    portraitAlt: 'Portræt af Ruth-Anne Dausell',
    portraitHint: 'Portræt · min. 1200 × 1600 px',
  },
  en: {
    bio1: 'Designer with two design degrees: a BA in Communication Design from Designskolen Kolding and a Design Technologist degree in furniture design from TEKO. The combination gives me an understanding of both the analogue and the digital, from hand-drawn sketch to finished visual system.',
    bio2: 'I have worked with visual identity, illustration, art direction, and video production for clients in sports nutrition, culture, media, and lifestyle, including at Flaneur and a Danish sports nutrition brand, and previously as Junior Art Director at Vid&Sans, where I helped build the visual identity from scratch. My approach is precise and concept-driven, and I work best when the distance from brief to finished product is short.',
    servicesLabel: 'What I do',
    services: [
      { title: 'Visual identity', desc: 'Logo, colour palette, typography, and brand guidelines.' },
      { title: 'Illustration', desc: 'Hand-drawn and digital illustrations for print and web.' },
      { title: 'Art direction', desc: 'Creative direction of visual projects from start to finish.' },
      { title: 'Video & motion', desc: 'Short video productions and advertising content.' },
      { title: 'UX · UI design', desc: 'Interface design and prototypes ready for production.' },
    ],
    clientsLabel: 'Experience from',
    clients: 'Flaneur, Vid&Sans (Aarhus University Press), Videnskab.dk, BOOKLAB Publishing, KFUM&KFUK, and a Danish sports nutrition brand.',
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
        <div className="relative aspect-[3/2] w-full max-w-[380px] overflow-hidden rounded-2xl bg-[oklch(91%_0_0)]">
          <Image
            src="/mig/Arbejde.JPG"
            alt="Ruth-Anne Dausell"
            fill
            className="object-cover"
            sizes="380px"
          />
        </div>
      </motion.div>

    </div>
  )
}
