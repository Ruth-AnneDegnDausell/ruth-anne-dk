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

type Section = {
  title: string
  body: string
  list?: string[]
  note?: string
}

const T = {
  da: {
    eyebrow: 'Fleksjob',
    heading: 'Om ordningen',
    intro: 'Fleksjob er en støttet ansættelsesordning for personer med varigt nedsat arbejdsevne som følge af sygdom eller funktionsnedsættelse. Ordningen giver mulighed for at fastholde tilknytningen til arbejdsmarkedet, selv når man ikke kan arbejde på ordinære vilkår.',
    sections: [
      {
        title: 'Hvad er fleksjob?',
        body: 'En fleksjobansat arbejder i en almindelig virksomhed på normale overenskomstmæssige vilkår, men med et reduceret timetal eller nedsat arbejdstempo tilpasset personens faktiske kapacitet. Arbejdsgiver betaler løn svarende til den indsats der ydes, mens kommunen udbetaler et fleksløntilskud oven i, så den samlede indkomst udgør en rimelig månedsløn.',
      },
      {
        title: 'Hvem kan få fleksjob?',
        body: 'Kommunen foretager en individuel vurdering af arbejdsevnen. Fleksjob kan tildeles, når alle rimelige muligheder for fastholdelse, omplacering og opkvalificering har vist sig utilstrækkelige, og det er vurderet, at personen på grund af varig sygdom eller funktionsnedsættelse ikke kan opnå eller fastholde beskæftigelse på ordinære vilkår.',
      },
      {
        title: 'Timeomfang og løn',
        body: 'Timetal og arbejdsbetingelser aftales individuelt og kan ligge alt fra ganske få timer om ugen til tæt på fuld tid, afhængigt af den konkrete arbejdsevne. Der er ingen fast grænse nedad. Lønnen fra arbejdsgiver afspejler den faktiske arbejdsindsats, og fleksløntilskuddet fra kommunen supplerer op til en rimelig indkomst.',
      },
      {
        title: 'Ingen fast tidsbegrænsning',
        body: 'Siden reformen i 2013 er fleksjob som udgangspunkt ikke tidsbegrænset. Ordningen løber, så længe behovet er til stede, og kommunen revurderer løbende, om betingelserne fortsat er opfyldt.',
      },
      {
        title: 'Fleksjob og faglighed',
        body: 'Fleksjob indebærer ingen begrænsning på det faglige niveau. En fleksjobansat kan varetage de samme typer opgaver og funktioner som ordinært ansatte og har de samme rettigheder på arbejdspladsen. Det er omfanget og tempoet der tilpasses, ikke kompetenceniveauet.',
      },
      {
        title: 'Den statslige fleksjobordning',
        body: 'Statsinstitutioner, ministerier og øvrige statslige arbejdspladser kan ansætte medarbejdere i fleksjob på samme grundvilkår som private og kommunale arbejdsgivere. Ordningen reguleres af et særskilt finansministerielt cirkulære og administreres af Moderniseringsstyrelsen.',
        list: [
          'Medarbejderen skal have fået tilkendt fleksjob af kommunen, inden ansættelsen finder sted.',
          'Stillingen skal indeholde reelle arbejdsopgaver tilpasset den faktiske arbejdskapacitet.',
          'Løn og ansættelsesvilkår skal følge de gældende statslige overenskomster for stillingens funktion.',
          'Timeantal og arbejdstempo fastsættes individuelt i ansættelseskontrakten ud fra kommunens vurdering.',
          'Fleksløntilskuddet udbetales af kommunen direkte til medarbejderen og lægges oven i lønnen fra arbejdsgiver.',
        ],
        note: 'Det er kommunen der tilkender fleksjobbet til medarbejderen. Arbejdsgiveren beslutter at oprette stillingen og ansætte personen i fleksjob, men selve fleksjobtildelingen sker via kommunens beskæftigelsesindsats.',
      },
    ] as Section[],
    links: [
      { label: 'Fleksjob på borger.dk →', href: 'https://www.borger.dk/arbejde-dagpenge-ferie/Beskaeftigelse-og-integration/Fleksjob' },
      { label: 'Fleksjob for arbejdsgivere på virk.dk →', href: 'https://virk.dk/myndigheder/stat/STAR/fleksjob' },
      { label: 'Moderniseringsstyrelsen (statslig HR) →', href: 'https://www.moderniseringsstyrelsen.dk' },
    ],
    myStoryLink: '← Mit fleksjob',
  },
  en: {
    eyebrow: 'Flex job',
    heading: 'About the scheme',
    intro: 'The flex job scheme is a subsidised employment arrangement for people with a permanently reduced work capacity due to illness or disability. It enables people to maintain a connection to the labour market even when they cannot work on ordinary terms.',
    sections: [
      {
        title: 'What is a flex job?',
        body: 'A flex job employee works at a regular company on standard collective agreement terms, but with reduced hours or a reduced work pace adapted to their actual capacity. The employer pays a wage corresponding to the effort provided, while the municipality pays a flex job supplement on top, so the total income constitutes a reasonable monthly salary.',
      },
      {
        title: 'Who can get a flex job?',
        body: 'The municipality carries out an individual assessment of work capacity. A flex job can be granted when all reasonable options for retention, redeployment, and upskilling have proved insufficient, and it has been assessed that the person cannot obtain or maintain employment on ordinary terms due to permanent illness or disability.',
      },
      {
        title: 'Hours and pay',
        body: 'Hours and working conditions are agreed individually and can range from just a few hours per week to close to full-time, depending on actual work capacity. There is no fixed lower limit. The wage from the employer reflects the actual work effort, and the municipal flex job supplement tops up to a reasonable income.',
      },
      {
        title: 'No fixed time limit',
        body: 'Since the 2013 reform, flex jobs are in principle not time-limited. The arrangement continues as long as the need exists, and the municipality regularly reassesses whether the conditions are still met.',
      },
      {
        title: 'Flex jobs and professional level',
        body: 'A flex job does not imply any limitation on professional level. A flex job employee can carry out the same types of tasks and functions as ordinarily employed staff and has the same workplace rights. It is the scope and pace that are adjusted, not the level of competence.',
      },
      {
        title: 'The state flex job scheme',
        body: 'State institutions, ministries, and other government workplaces can employ people in flex jobs on the same basic terms as private and municipal employers. The scheme is governed by a specific Finance Ministry circular and is administered by the Agency for Modernisation (Moderniseringsstyrelsen).',
        list: [
          'The employee must have been granted flex job status by the municipality before employment begins.',
          'The position must contain real work tasks adapted to the actual work capacity.',
          'Pay and employment conditions must follow the applicable state collective agreements for the function.',
          'Hours and work pace are agreed individually in the employment contract based on the municipality\'s assessment.',
          'The flex job supplement is paid by the municipality directly to the employee on top of the wage from the employer.',
        ],
        note: 'It is the municipality that grants the flex job to the employee. The employer decides to create the position and hire the person, but the flex job award itself is processed through the municipal employment system.',
      },
    ] as Section[],
    links: [
      { label: 'Flex jobs on borger.dk →', href: 'https://www.borger.dk/arbejde-dagpenge-ferie/Beskaeftigelse-og-integration/Fleksjob' },
      { label: 'Flex jobs for employers on virk.dk →', href: 'https://virk.dk/myndigheder/stat/STAR/fleksjob' },
      { label: 'Agency for Modernisation (state HR) →', href: 'https://www.moderniseringsstyrelsen.dk' },
    ],
    myStoryLink: '← My flex job',
  },
}

export default function OrdningenPage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <main className="min-h-screen px-8 pt-14 sm:px-14">

      <motion.div {...fadeUp(0)} className="mb-10">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.eyebrow}
        </p>
        <h1 className="text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
      </motion.div>

      <motion.div {...fadeUp(0.04)} className="mb-14">
        <p className="text-[12px]/[1.9] text-text-2">{t.intro}</p>
      </motion.div>

      {/* Sections in two-column grid */}
      <div className="grid grid-cols-1 gap-px border-t border-border sm:grid-cols-2">
        {t.sections.map((s, i) => (
          <motion.div
            key={s.title}
            {...fadeUp(0.06 + i * 0.03)}
            className="border-b border-border py-7 sm:pr-12"
          >
            <p className="mb-3 text-[12px] font-[450] text-text">{s.title}</p>
            <p className="text-[12px]/[1.85] text-text-2">{s.body}</p>

            {s.list && (
              <ul className="mt-4 space-y-2">
                {s.list.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12px]/[1.75] text-text-2">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-text-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {s.note && (
              <p className="mt-4 text-[11px]/[1.75] text-text-3">{s.note}</p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.3)} className="mt-12 flex flex-col gap-3">
        {t.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
          >
            {l.label}
          </a>
        ))}
        <Link
          href="/fleksjob"
          className="mt-1 text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
        >
          {t.myStoryLink}
        </Link>
      </motion.div>

    </main>
  )
}
