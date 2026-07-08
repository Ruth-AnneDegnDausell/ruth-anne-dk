'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const DEFAULT = {
  da: {
    eyebrow: 'Fleksjob',
    heading: 'Hvorfor fleksjob?',
    p1: 'Jeg er i fleksjob som følge af to psykiatriske diagnoser: bipolar type 2 og ADHD.',
    p2: 'Bipolar type 2 giver perioder med depression og hypomani, som påvirker energi og arbejdskapacitet varierende fra dag til dag og uge til uge. ADHD påvirker koncentration, struktur og eksekutiv funktion, men hænger hos mange også sammen med kreativitet, nysgerrighed og evnen til hyperfokus på opgaver der vækker interesse.',
    p3: 'Kombinationen betyder, at min arbejdskapacitet ikke er konstant. Fleksjobordningen giver mig mulighed for at arbejde i et tempo og en struktur der er tilpasset netop det. Jeg arbejder færre timer end fuld tid, men med fuld professionel dedikation til de opgaver jeg varetager.',
    p4: 'Som designer trækker jeg faktisk på begge diagnoser som ressourcer: ADHD bidrager til en stærk kreativ og associativ tankegang, og de energirige faser forbundet med bipolar type 2 kan give ekstraordinært fokus og produktivitet. Fleksjob sikrer, at jeg aldrig presses ud over min kapacitet og dermed kan levere stabilt arbejde over tid.',
    linkLabel: 'Om fleksjob-ordningen generelt →',
    worksBestLabel: 'Jeg arbejder bedst med',
    worksBest: [
      'Klare briefinger og tydelige prioriteringer',
      'Afgrænsede opgaver med realistiske deadlines',
      'Skriftlig kommunikation og faste check-ins',
      'Mulighed for hjemmearbejde og ro til fordybelse',
      'Opgaver hvor kvalitet, æstetik og struktur vægtes højt',
    ],
    ctaHeading: 'Interessant for dig?',
    ctaLink: 'Kontakt mig →',
    factLabel: 'Om ordningen',
    facts: [
      { label: 'Ordning', value: 'Fleksjob (dansk beskæftigelsesordning)' },
      { label: 'Diagnose', value: 'Bipolar type 2 og ADHD' },
      { label: 'Timetal', value: 'Deltid, aftalt individuelt med arbejdsgiver' },
      { label: 'Dedikation', value: 'Fuld professionel kvalitet indenfor kapaciteten' },
    ],
  },
  en: {
    eyebrow: 'Flex job',
    heading: 'Why a flex job?',
    p1: 'I am employed in a flex job due to two psychiatric diagnoses: bipolar type 2 and ADHD.',
    p2: "Bipolar type 2 involves periods of depression and hypomania that affect energy and work capacity, varying from day to day and week to week. ADHD affects concentration, structure, and executive function, but for many it is also associated with creativity, curiosity, and the ability to hyperfocus on tasks that spark genuine interest.",
    p3: 'The combination means my work capacity is not constant. The flex job arrangement gives me the opportunity to work at a pace and in a structure adapted to exactly that. I work fewer hours than full-time, but with full professional dedication to the tasks I carry out.',
    p4: 'As a designer, I actually draw on both diagnoses as resources: ADHD contributes to a strong creative and associative way of thinking, and the high-energy phases associated with bipolar type 2 can bring extraordinary focus and productivity. Flex employment ensures I am never pushed beyond my capacity and can therefore deliver consistent work over time.',
    linkLabel: 'About the flex job scheme in general →',
    worksBestLabel: 'I work best with',
    worksBest: [
      'Clear briefs and distinct priorities',
      'Well-defined tasks with realistic deadlines',
      'Written communication and regular check-ins',
      'The option to work from home and space for deep focus',
      'Tasks where quality, aesthetics, and structure matter',
    ],
    ctaHeading: 'Sound interesting?',
    ctaLink: 'Contact me →',
    factLabel: 'About the scheme',
    facts: [
      { label: 'Scheme', value: 'Flex job (Danish employment scheme)' },
      { label: 'Diagnoses', value: 'Bipolar type 2 and ADHD' },
      { label: 'Hours', value: 'Part-time, agreed individually with employer' },
      { label: 'Commitment', value: 'Full professional quality within capacity' },
    ],
  },
}

function buildT(d: any) {
  return {
    da: {
      ...DEFAULT.da,
      heading: d.heading ?? DEFAULT.da.heading,
      p1: d.p1 ?? DEFAULT.da.p1,
      p2: d.p2 ?? DEFAULT.da.p2,
      p3: d.p3 ?? DEFAULT.da.p3,
      p4: d.p4 ?? DEFAULT.da.p4,
      facts: d.facts ?? DEFAULT.da.facts,
      worksBest: d.worksBest?.length ? d.worksBest : DEFAULT.da.worksBest,
    },
    en: {
      ...DEFAULT.en,
      heading: d.headingEn ?? DEFAULT.en.heading,
      p1: d.p1En ?? DEFAULT.en.p1,
      p2: d.p2En ?? DEFAULT.en.p2,
      p3: d.p3En ?? DEFAULT.en.p3,
      p4: d.p4En ?? DEFAULT.en.p4,
      facts: d.factsEn ?? DEFAULT.en.facts,
      worksBest: d.worksBestEn?.length ? d.worksBestEn : DEFAULT.en.worksBest,
    },
  }
}

export function FleksjobClient({ sanityData }: { sanityData: any }) {
  const { lang } = useLang()
  const t = sanityData ? buildT(sanityData)[lang] : DEFAULT[lang]

  return (
    <main className="px-8 pt-14 sm:px-14">
      <motion.div {...fadeUp(0)} className="mb-12">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">{t.eyebrow}</p>
        <h1 className="text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

        {/* ─── Left: text ─────────────────────────────────── */}
        <motion.div {...fadeUp(0.04)} className="max-w-md space-y-4">
          <p className="text-[12px]/[1.9] text-text-2">{t.p1}</p>
          <p className="text-[12px]/[1.9] text-text-2">{t.p2}</p>
          <p className="text-[12px]/[1.9] text-text-2">{t.p3}</p>
          <p className="text-[12px]/[1.9] text-text-2">{t.p4}</p>
        </motion.div>

        {/* ─── Right: om ordningen ────────────────────────── */}
        <motion.div {...fadeUp(0.08)}>
          <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.factLabel}</p>
          <ul className="divide-y divide-border border-t border-border">
            {t.facts.map((f: any) => (
              <li key={f.label} className="grid grid-cols-[130px_1fr] gap-4 py-3.5 sm:grid-cols-[160px_1fr]">
                <span className="text-[11px] font-[450] text-text">{f.label}</span>
                <span className="text-[11px]/[1.6] text-text-2">{f.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/fleksjob/ordningen"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[11px] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text"
            >
              {t.linkLabel}
            </Link>
          </div>

          <div className="mt-12">
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.worksBestLabel}</p>
            <ul className="space-y-2.5">
              {t.worksBest.map((item: string) => (
                <li key={item} className="flex items-center gap-2.5 text-[12px]/[1.7] text-text-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-wine" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <p className="mb-3 text-[12px] font-[450] text-text">{t.ctaHeading}</p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-1.5 rounded-full bg-wine px-5 py-2.5 text-[12px] font-medium text-butter transition-opacity duration-150 hover:opacity-85"
            >
              {t.ctaLink}
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
