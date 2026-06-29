import { createClient } from '@sanity/client'
import { PROJECTS } from '../lib/projects'
import { FOTOGRAFIER, ILLUSTRATIONER } from '../lib/gallery'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token,
  useCdn: false,
})

function key(i: number) { return `k${i}` }

// ── 1. Add coverPath to existing projects ────────────────────────────────────
async function seedProjectCovers() {
  console.log('\n── Projects: adding coverPath ──')
  const tx = client.transaction()
  for (const p of PROJECTS) {
    if (p.cover) {
      tx.patch(`project-${p.slug}`, { set: { coverPath: p.cover } })
    }
  }
  await tx.commit()
  console.log(`✓ Updated ${PROJECTS.filter(p => p.cover).length} projects`)
}

// ── 2. Kontakt singleton ──────────────────────────────────────────────────────
async function seedKontakt() {
  console.log('\n── Kontakt ──')
  await client.createOrReplace({
    _type: 'kontakt',
    _id: 'kontakt',
    heading: 'Lad os tale sammen',
    intro: 'Har du et projekt du vil drøfte, eller vil du bare sige hej? Skriv til mig.',
    channels: [
      { _key: key(0), title: 'E-mail', value: 'annedegndausell@gmail.com', href: 'mailto:annedegndausell@gmail.com' },
      { _key: key(1), title: 'Telefon', value: '51 50 85 70', href: 'tel:+4551508570' },
      { _key: key(2), title: 'LinkedIn', value: 'linkedin.com/in/ruthannedausell', href: 'https://linkedin.com/in/ruthannedausell' },
    ],
    availability: 'Åben for nye projekter og samarbejder. Skriv til mig, så finder vi ud af det.',
    headingEn: "Let's talk",
    introEn: 'Have a project you want to discuss, or just want to say hello? Write to me.',
    channelsEn: [
      { _key: key(0), title: 'Email', value: 'annedegndausell@gmail.com', href: 'mailto:annedegndausell@gmail.com' },
      { _key: key(1), title: 'Phone', value: '51 50 85 70', href: 'tel:+4551508570' },
      { _key: key(2), title: 'LinkedIn', value: 'linkedin.com/in/ruthannedausell', href: 'https://linkedin.com/in/ruthannedausell' },
    ],
    availabilityEn: "Open to new projects and collaborations. Get in touch and we'll figure something out.",
  })
  console.log('✓ Kontakt')
}

// ── 3. Fleksjob singleton ─────────────────────────────────────────────────────
async function seedFleksjob() {
  console.log('\n── Fleksjob ──')
  await client.createOrReplace({
    _type: 'fleksjob',
    _id: 'fleksjob',
    heading: 'Hvorfor fleksjob?',
    p1: 'Jeg er i fleksjob som følge af to psykiatriske diagnoser: bipolar type 2 og ADHD.',
    p2: 'Bipolar type 2 giver perioder med depression og hypomani, som påvirker energi og arbejdskapacitet varierende fra dag til dag og uge til uge. ADHD påvirker koncentration, struktur og eksekutiv funktion, men hænger hos mange også sammen med kreativitet, nysgerrighed og evnen til hyperfokus på opgaver der vækker interesse.',
    p3: 'Kombinationen betyder, at min arbejdskapacitet ikke er konstant. Fleksjobordningen giver mig mulighed for at arbejde i et tempo og en struktur der er tilpasset netop det. Jeg arbejder færre timer end fuld tid, men med fuld professionel dedikation til de opgaver jeg varetager.',
    p4: 'Som designer trækker jeg faktisk på begge diagnoser som ressourcer: ADHD bidrager til en stærk kreativ og associativ tankegang, og de energirige faser forbundet med bipolar type 2 kan give ekstraordinært fokus og produktivitet. Fleksjob sikrer, at jeg aldrig presses ud over min kapacitet og dermed kan levere stabilt arbejde over tid.',
    facts: [
      { _key: key(0), label: 'Ordning', value: 'Fleksjob (dansk beskæftigelsesordning)' },
      { _key: key(1), label: 'Diagnose', value: 'Bipolar type 2 og ADHD' },
      { _key: key(2), label: 'Timetal', value: 'Deltid, aftalt individuelt med arbejdsgiver' },
      { _key: key(3), label: 'Dedikation', value: 'Fuld professionel kvalitet indenfor kapaciteten' },
    ],
    headingEn: 'Why a flex job?',
    p1En: 'I am employed in a flex job due to two psychiatric diagnoses: bipolar type 2 and ADHD.',
    p2En: 'Bipolar type 2 involves periods of depression and hypomania that affect energy and work capacity, varying from day to day and week to week. ADHD affects concentration, structure, and executive function, but for many it is also associated with creativity, curiosity, and the ability to hyperfocus on tasks that spark genuine interest.',
    p3En: 'The combination means my work capacity is not constant. The flex job arrangement gives me the opportunity to work at a pace and in a structure adapted to exactly that. I work fewer hours than full-time, but with full professional dedication to the tasks I carry out.',
    p4En: 'As a designer, I actually draw on both diagnoses as resources: ADHD contributes to a strong creative and associative way of thinking, and the high-energy phases associated with bipolar type 2 can bring extraordinary focus and productivity. Flex employment ensures I am never pushed beyond my capacity and can therefore deliver consistent work over time.',
    factsEn: [
      { _key: key(0), label: 'Scheme', value: 'Flex job (Danish employment scheme)' },
      { _key: key(1), label: 'Diagnoses', value: 'Bipolar type 2 and ADHD' },
      { _key: key(2), label: 'Hours', value: 'Part-time, agreed individually with employer' },
      { _key: key(3), label: 'Commitment', value: 'Full professional quality within capacity' },
    ],
    sections: [
      { _key: key(0), title: 'Hvad er fleksjob?', body: 'En fleksjobansat arbejder i en almindelig virksomhed på normale overenskomstmæssige vilkår, men med et reduceret timetal eller nedsat arbejdstempo tilpasset personens faktiske kapacitet. Arbejdsgiver betaler løn svarende til den indsats der ydes, mens kommunen udbetaler et fleksløntilskud oven i, så den samlede indkomst udgør en rimelig månedsløn.' },
      { _key: key(1), title: 'Hvem kan få fleksjob?', body: 'Kommunen foretager en individuel vurdering af arbejdsevnen. Fleksjob kan tildeles, når alle rimelige muligheder for fastholdelse, omplacering og opkvalificering har vist sig utilstrækkelige, og det er vurderet, at personen på grund af varig sygdom eller funktionsnedsættelse ikke kan opnå eller fastholde beskæftigelse på ordinære vilkår.' },
      { _key: key(2), title: 'Timeomfang og løn', body: 'Timetal og arbejdsbetingelser aftales individuelt og kan ligge alt fra ganske få timer om ugen til tæt på fuld tid, afhængigt af den konkrete arbejdsevne. Der er ingen fast grænse nedad. Lønnen fra arbejdsgiver afspejler den faktiske arbejdsindsats, og fleksløntilskuddet fra kommunen supplerer op til en rimelig indkomst.' },
      { _key: key(3), title: 'Ingen fast tidsbegrænsning', body: 'Siden reformen i 2013 er fleksjob som udgangspunkt ikke tidsbegrænset. Ordningen løber, så længe behovet er til stede, og kommunen revurderer løbende, om betingelserne fortsat er opfyldt.' },
      { _key: key(4), title: 'Fleksjob og faglighed', body: 'Fleksjob indebærer ingen begrænsning på det faglige niveau. En fleksjobansat kan varetage de samme typer opgaver og funktioner som ordinært ansatte og har de samme rettigheder på arbejdspladsen. Det er omfanget og tempoet der tilpasses, ikke kompetenceniveauet.' },
      { _key: key(5), title: 'Den statslige fleksjobordning', body: 'Statsinstitutioner, ministerier og øvrige statslige arbejdspladser kan ansætte medarbejdere i fleksjob på samme grundvilkår som private og kommunale arbejdsgivere. Ordningen reguleres af et særskilt finansministerielt cirkulære og administreres af Moderniseringsstyrelsen.', list: ['Medarbejderen skal have fået tilkendt fleksjob af kommunen, inden ansættelsen finder sted.', 'Stillingen skal indeholde reelle arbejdsopgaver tilpasset den faktiske arbejdskapacitet.', 'Løn og ansættelsesvilkår skal følge de gældende statslige overenskomster for stillingens funktion.', 'Timeantal og arbejdstempo fastsættes individuelt i ansættelseskontrakten ud fra kommunens vurdering.', 'Fleksløntilskuddet udbetales af kommunen direkte til medarbejderen og lægges oven i lønnen fra arbejdsgiver.'], note: 'Det er kommunen der tilkender fleksjobbet til medarbejderen. Arbejdsgiveren beslutter at oprette stillingen og ansætte personen i fleksjob, men selve fleksjobtildelingen sker via kommunens beskæftigelsesindsats.' },
    ],
    sectionsEn: [
      { _key: key(0), title: 'What is a flex job?', body: 'A flex job employee works at a regular company on standard collective agreement terms, but with reduced hours or a reduced work pace adapted to their actual capacity. The employer pays a wage corresponding to the effort provided, while the municipality pays a flex job supplement on top, so the total income constitutes a reasonable monthly salary.' },
      { _key: key(1), title: 'Who can get a flex job?', body: 'The municipality carries out an individual assessment of work capacity. A flex job can be granted when all reasonable options for retention, redeployment, and upskilling have proved insufficient, and it has been assessed that the person cannot obtain or maintain employment on ordinary terms due to permanent illness or disability.' },
      { _key: key(2), title: 'Hours and pay', body: 'Hours and working conditions are agreed individually and can range from a very few hours per week to close to full-time, depending on actual work capacity. There is no lower limit. The wage from the employer reflects the actual work effort, and the flex job supplement from the municipality tops it up to a reasonable income.' },
      { _key: key(3), title: 'No fixed time limit', body: 'Since the 2013 reform, flex jobs are in principle not time-limited. The arrangement continues as long as the need exists, and the municipality regularly reassesses whether the conditions are still met.' },
      { _key: key(4), title: 'Flex jobs and professional level', body: 'A flex job places no restriction on professional level. A flex job employee can carry out the same types of tasks and functions as ordinarily employed staff and has the same rights in the workplace. It is the scope and pace that are adapted, not the level of competence.' },
    ],
  })
  console.log('✓ Fleksjob')
}

// ── 4. CV singleton ────────────────────────────────────────────────────────────
async function seedCV() {
  console.log('\n── CV ──')
  await client.createOrReplace({
    _type: 'cv',
    _id: 'cv',
    intro: 'Designer med speciale i visuel kommunikation, uddannet fra Designskolen Kolding 2023. Erfaring fra forlagsverden, mediehuse og freelanceprojekter inden for grafisk design, illustration og art direction.',
    introEn: 'Visual communication designer, graduated from Designskolen Kolding in 2023. Experience from publishing, media, and freelance work spanning graphic design, illustration, and art direction.',
    exp: [
      { _key: key(0), role: 'Grafisk Designer & Illustrator', roleEn: 'Graphic Designer & Illustrator', type: 'Freelance', typeEn: 'Freelance', place: 'Flaneur', period: '2024', periodEn: '2024', projectHref: '/projekter/flaneur' },
      { _key: key(1), role: 'Visuel Designer', roleEn: 'Visual Designer', type: 'Freelance', typeEn: 'Freelance', place: 'Videnskab.dk', period: '2024', periodEn: '2024' },
      { _key: key(2), role: 'Illustrator', roleEn: 'Illustrator', type: 'Freelance', typeEn: 'Freelance', place: 'KFUM&KFUK', period: '2023', periodEn: '2023' },
      { _key: key(3), role: 'Grafisk Designer', roleEn: 'Graphic Designer', type: 'Freelance', typeEn: 'Freelance', place: 'BOOKLAB Forlag', period: '2022-2023', periodEn: '2022-2023', testimonialHref: '/cv/udtalelser?i=1' },
      { _key: key(4), role: 'Freelance Illustrator', roleEn: 'Freelance Illustrator', type: 'Fast tilknyttet', typeEn: 'Permanent', place: 'Aarhus Universitetsforlag', period: '2022-2023', periodEn: '2022-2023' },
      { _key: key(5), role: 'Junior Art Director & Grafisk Redaktør', roleEn: 'Junior Art Director & Graphic Editor', type: '', typeEn: '', place: 'Vid&Sans', period: '2021-2022', periodEn: '2021-2022', testimonialHref: '/cv/udtalelser?i=0', externalHref: 'https://vidogsans.dk/' },
      { _key: key(6), role: 'Grafisk Designer', roleEn: 'Graphic Designer', type: 'Praktik', typeEn: 'Internship', place: 'BOOKLAB Forlag', period: '2022', periodEn: '2022', testimonialHref: '/cv/udtalelser?i=1' },
      { _key: key(7), role: 'Pædagogmedhjælper', roleEn: 'Teaching Assistant', type: '', typeEn: '', place: 'Elev Ungdomsklub', period: 'dec. 2019 – jun. 2022', periodEn: 'Dec. 2019 – Jun. 2022', testimonialHref: '/cv/udtalelser?i=4' },
      { _key: key(8), role: 'Barnepige', roleEn: 'Nanny', type: '', typeEn: '', place: 'Privat', period: 'sep. 2019 – jan. 2021', periodEn: 'Sep. 2019 – Jan. 2021' },
      { _key: key(9), role: 'Møbel Designer', roleEn: 'Furniture Designer', type: 'Praktik', typeEn: 'Internship', place: 'Dahl Limited / Njord', period: '2019', periodEn: '2019', testimonialHref: '/cv/udtalelser?i=3' },
      { _key: key(10), role: 'Pædagogmedhjælper', roleEn: 'Teaching Assistant', type: '', typeEn: '', place: 'Bording Børnehave', period: 'apr. 2018 – sep. 2018', periodEn: 'Apr. 2018 – Sep. 2018' },
      { _key: key(11), role: 'Gartnermedarbejder', roleEn: 'Garden Centre Worker', type: '', typeEn: '', place: 'Hageland, Stiklestad, Norge', period: 'jun. 2015 – aug. 2015', periodEn: 'Jun. 2015 – Aug. 2015' },
    ],
    edu: [
      { _key: key(0), title: 'Designskolen Kolding', place: 'BA i Kommunikationsdesign', placeEn: 'BA in Communication Design', period: '2020-2023', projectHref: '/projekter/ba-afgangs-eksamen' },
      { _key: key(1), title: 'DR Lab', place: 'DR', placeEn: 'DR', period: '2021' },
      { _key: key(2), title: 'Grafik-kursus', place: 'Aarhus Kunstakademi', placeEn: 'Aarhus Art Academy', period: '2020' },
      { _key: key(3), title: 'Designteknolog, Møbeldesign', place: 'TEKO', placeEn: 'Design Technologist, Furniture Design — TEKO', period: '2018-2020' },
      { _key: key(4), title: 'Højskole', place: 'Testrup Højskole', placeEn: 'Testrup Højskole', period: '2017' },
      { _key: key(5), title: 'HF-Design', place: 'Herning HF', placeEn: 'Herning HF', period: '2015-2017' },
    ],
    vol: [
      { _key: key(0), role: 'Fotografi og illustration', roleEn: 'Photography and illustration', place: 'VeloMore', period: '2024-2025', periodEn: '2024-2025' },
      { _key: key(1), role: 'Bestyrelsesmedlem, marketing', roleEn: 'Board member, marketing', place: 'SportX', period: 'Fra 2023', periodEn: 'From 2023' },
      { _key: key(2), role: 'Bestyrelsesformand', roleEn: 'Board chair', place: 'Floorballklubben Ciconia', period: 'Fra 2022', periodEn: 'From 2022' },
      { _key: key(3), role: 'Bestyrelsesmedlem, kommunikation', roleEn: 'Board member, communications', place: 'Aarhus Børnehøjskole', period: 'Fra 2022', periodEn: 'From 2022', testimonialHref: '/cv/udtalelser?i=2' },
      { _key: key(4), role: 'Underviser, kreative fag', roleEn: 'Teacher, creative subjects', place: 'Aarhus Børnehøjskole', period: '2018-2020', periodEn: '2018-2020' },
    ],
    skillGroups: [
      { _key: key(0), name: 'Software', nameEn: 'Software', items: ['InDesign', 'Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 'ProCreate', 'Blender', 'Rhino'] },
      { _key: key(1), name: 'Discipliner', nameEn: 'Disciplines', items: ['Visuel identitet / Visual identity', 'Illustration', 'UX · UI', 'Art direction', 'Konceptudvikling / Concept development', 'Fotografering / Photography', '3D-tegning / 3D drawing'] },
      { _key: key(2), name: 'Metoder', nameEn: 'Methods', items: ['Design thinking', 'Co-creation', 'Håndtegning / Hand drawing'] },
    ],
    awards: [
      { _key: key(0), title: 'Legatmodtager', titleEn: 'Grant recipient', desc: "HK/Privats Ophavsretsfond for afgangsprojekt", descEn: "HK/Privats Ophavsretsfond, graduation project", year: '2023', testimonialHref: '/cv/udtalelser?i=6' },
    ],
  })
  console.log('✓ CV')
}

// ── 5. Fotografier gallery ────────────────────────────────────────────────────
async function seedFotografier() {
  console.log('\n── Fotografier (118 items) ──')
  const tx = client.transaction()
  for (const [i, item] of FOTOGRAFIER.entries()) {
    const cats = Array.isArray(item.category) ? item.category : item.category ? [item.category] : []
    tx.createOrReplace({
      _type: 'fotografiItem',
      _id: `fotografi-${i}`,
      src: item.src,
      categories: cats,
      aspect: item.aspect,
      alt: item.alt ?? '',
      sortOrder: i + 1,
    })
  }
  await tx.commit()
  console.log(`✓ ${FOTOGRAFIER.length} fotografier`)
}

// ── 6. Illustrationer gallery ─────────────────────────────────────────────────
async function seedIllustrationer() {
  console.log('\n── Illustrationer ──')
  const tx = client.transaction()
  for (const [i, item] of ILLUSTRATIONER.entries()) {
    const cats = Array.isArray(item.category) ? item.category : item.category ? [item.category] : []
    tx.createOrReplace({
      _type: 'illustrationItem',
      _id: `illustration-${i}`,
      src: item.src,
      categories: cats,
      aspect: item.aspect,
      alt: item.alt ?? '',
      sortOrder: i + 1,
    })
  }
  await tx.commit()
  console.log(`✓ ${ILLUSTRATIONER.length} illustrationer`)
}

// ── Run all ───────────────────────────────────────────────────────────────────
async function main() {
  await seedProjectCovers()
  await seedKontakt()
  await seedFleksjob()
  await seedCV()
  await seedFotografier()
  await seedIllustrationer()
  console.log('\n✅ All done.')
}

main().catch(console.error)
