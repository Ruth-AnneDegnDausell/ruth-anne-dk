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
    intro: 'Fleksjob er en støttet ansættelsesordning for personer med varigt nedsat arbejdsevne. Ordningen gør det muligt at fastholde tilknytningen til arbejdsmarkedet, selv når man ikke kan arbejde på fuld tid eller i fuldt tempo.',
    sections: [
      {
        title: 'Hvad betyder det for en arbejdsgiver?',
        body: 'Kort fortalt: Du får fuld faglig værdi, og kommunen supplerer lønnen.\n\nSom fleksjobansat arbejder jeg på almindelige vilkår og løser de samme opgaver som enhver anden designer - bare med et timetal og tempo, der er tilpasset min arbejdsevne. Du betaler løn for den indsats, jeg yder, og kommunen lægger et fleksløntilskud oven i. Administrationen er enkel, og selve fleksjobbevillingen er allerede på plads via kommunen.',
      },
      {
        title: 'Vil du vide mere?',
        body: 'Jeg fortæller gerne mere om, hvordan det fungerer i praksis - både det praktiske og det formelle omkring ordning, tilskud og aftale. Tag endelig fat i mig.',
      },
    ] as Section[],
    links: [
      { label: 'Læs mere om fleksjobordningen →', href: 'https://www.borger.dk/arbejde-dagpenge-ferie/Fleksjob-loentilskud-for-foertidspensionister-revalidering/hvem-kan-faa-fleksjob' },
    ],
    myStoryLink: '← Mit fleksjob',
    ctaHeading: 'Interessant for dig?',
    ctaLink: 'Kontakt mig →',
  },
  en: {
    eyebrow: 'Flex job',
    heading: 'About the scheme',
    intro: 'The flex job scheme is a subsidised employment arrangement for people with permanently reduced work capacity. It makes it possible to stay connected to the labour market even when working full-time or at full pace is not an option.',
    sections: [
      {
        title: 'What does it mean for an employer?',
        body: 'In short: you get full professional value, and the municipality supplements the salary.\n\nAs a flex job employee I work on ordinary terms and handle the same tasks as any other designer - just with hours and a pace adapted to my work capacity. You pay for the effort I deliver, and the municipality adds a flex job supplement on top. The administration is simple, and the flex job grant is already in place through the municipality.',
      },
      {
        title: 'Want to know more?',
        body: 'I am happy to explain how it works in practice - both the practical side and the formal questions about the scheme, the supplement, and the agreement. Feel free to reach out to me.',
      },
    ] as Section[],
    links: [
      { label: 'Read more about the flex job scheme →', href: 'https://www.borger.dk/arbejde-dagpenge-ferie/Fleksjob-loentilskud-for-foertidspensionister-revalidering/hvem-kan-faa-fleksjob' },
    ],
    myStoryLink: '← My flex job',
    ctaHeading: 'Sound interesting?',
    ctaLink: 'Contact me →',
  },
}

function buildT(d: any) {
  return {
    da: {
      ...T.da,
      heading: d.heading ?? T.da.heading,
      intro: d.intro ?? T.da.intro,
      sections: (d.sections?.length ? d.sections : T.da.sections) as Section[],
      links: d.links?.length ? d.links : T.da.links,
    },
    en: {
      ...T.en,
      heading: d.headingEn ?? T.en.heading,
      intro: d.introEn ?? T.en.intro,
      sections: (d.sectionsEn?.length ? d.sectionsEn : T.en.sections) as Section[],
      links: d.linksEn?.length ? d.linksEn : T.en.links,
    },
  }
}

export function OrdningenClient({ sanityData }: { sanityData: any }) {
  const { lang } = useLang()
  const t = sanityData ? buildT(sanityData)[lang] : T[lang]

  return (
    <main className="px-8 pt-14 sm:px-14">

      <motion.div {...fadeUp(0)} className="mb-10">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.eyebrow}
        </p>
        <h1 className="text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
      </motion.div>

      <motion.div {...fadeUp(0.04)} className="mb-14 max-w-xl">
        <p className="text-[12px]/[1.9] text-text-2">{t.intro}</p>
      </motion.div>

      {/* Sections in two-column grid */}
      <div className="grid max-w-3xl grid-cols-1 gap-px border-t border-border sm:grid-cols-2">
        {t.sections.map((s, i) => (
          <motion.div
            key={s.title}
            {...fadeUp(0.06 + i * 0.03)}
            className="border-b border-border py-7 sm:pr-12"
          >
            <p className="mb-3 text-[12px] font-[450] text-text">{s.title}</p>
            <p className="whitespace-pre-line text-[12px]/[1.85] text-text-2">{s.body}</p>

            {s.list && (
              <ul className="mt-4 space-y-2">
                {s.list.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12px]/[1.75] text-text-2">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-wine" />
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

      <motion.div {...fadeUp(0.25)} className="mt-12 max-w-3xl border-t border-border pt-8">
        <p className="mb-3 text-[12px] font-[450] text-text">{t.ctaHeading}</p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-1.5 rounded-full bg-wine px-5 py-2.5 text-[12px] font-medium text-butter transition-opacity duration-150 hover:opacity-85"
        >
          {t.ctaLink}
        </Link>
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="mt-12 flex flex-col gap-3">
        {t.links.map((l: { label: string; href: string }) => (
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
