import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })

async function run() {
  await client.patch('forside').set({
    taglineEn: 'Designer · Illustrator',
    introEn: 'I am looking for a flex job where I can contribute my skills, experience, and abilities within the field of design. I work with illustration, visual identity, and concepts - from idea and development to finished expression.',
    aboutHeadingEn: 'Designer with an eye for detail and a passion for conceptual visual expression.',
    aboutBody1En: 'Educated at Designskolen Kolding with a specialisation in communication design. I have experience working with visual identity, illustration, and photography for companies in sports, culture, and lifestyle - particularly within the publishing and media industry.',
    aboutBody2En: 'With two design degrees behind me, my professional approach is strong, precise, and concept-driven.',
    skillsEn: [
      { _key: 's0', _type: 'object', title: 'Visual identity', desc: 'From logo and colour palette to typography and brand guidelines. Coherent identities that hold up over time and stand out in their market.' },
      { _key: 's1', _type: 'object', title: 'Illustration', desc: 'Hand-drawn and digital illustrations for print, web, and social media. With a love for sports illustration, portraits, and editorial graphics.' },
      { _key: 's2', _type: 'object', title: 'UX · UI design', desc: 'Interface design focused on user experience and accessibility. From wireframes and prototypes to finished UI systems.' },
      { _key: 's3', _type: 'object', title: 'Concept design', desc: 'Conceptual ideas and directions for visual projects, from concept development to production.' },
    ],
  }).commit()
  console.log('✓ forside EN')

  await client.patch('about-arbejde').set({
    bio1En: 'Designer with a background in two design degrees: a BA in Communication Design from Designskolen Kolding and a Design Technologist degree in furniture design from TEKO. The combination gives me an understanding of both the analogue and the digital, from hand-drawn sketch to finished visual system.',
    bio2En: 'I have worked with visual identity, illustration, art direction, and video production for clients in sports nutrition, culture, media, and lifestyle - including at Flaneur and a Danish sports nutrition brand, and previously as Junior Art Director at Vid&Sans, where I helped build the graphic expression from scratch. My approach is precise and concept-driven, and I thrive best when the distance from brief to product is short.',
    servicesEn: [
      { _key: 's1', title: 'Visual identity', desc: 'Logo, colour palette, typography, and brand guidelines.' },
      { _key: 's2', title: 'Illustration', desc: 'Hand-drawn and digital illustrations for print and web.' },
      { _key: 's3', title: 'Art direction', desc: 'Creative direction of visual projects from start to finish.' },
      { _key: 's4', title: 'Video & motion', desc: 'Short video productions and advertising content.' },
      { _key: 's5', title: 'UX · UI design', desc: 'Interface design and prototypes ready for production.' },
    ],
  }).commit()
  console.log('✓ about-arbejde EN')

  await client.patch('about-privat').set({
    introEn: 'I am 28 and live in Nye, north of Aarhus, with my boyfriend Malte. It is calm here, with wild nature and a lovely community - and that suits us really well.',
    body1En: 'I draw, write poems, and photograph, both analogue and digital. It is something I have always done, and it weaves into the way I work every day - creativity follows me in most of what I do.',
    body2En: "A large part of my spare time goes to cycling. I ride an average of ten hours a week and am part of an international team on Zwift. Every Thursday evening we ride TTT (team time trial), and it is one of the things I look forward to most all week. Malte and I almost always watch the Tour de France and the Giro d'Italia together.",
    inspirationsEn: [
      'Cycling: TTT with my team on Zwift, solo rides on the road, or the Tour de France on TV',
      'Poems, drawings, and photography (analogue + digital)',
      'Nature, calm, and good experiences',
      'Museum visits, forest walks, and time with Malte and my family',
    ],
  }).commit()
  console.log('✓ about-privat EN')

  await client.patch('kontakt').set({
    headingEn: "Let's talk",
    introEn: 'Have a project you want to discuss, or just want to say hello? Write to me.',
    availabilityEn: 'Open to dialogue, new projects, and flex jobs - so if my work sounds like something that could be interesting for you and your company, do not hesitate to write.',
    channelsEn: [
      { _key: 'k0', title: 'Email', value: 'annedegndausell@gmail.com', href: 'mailto:annedegndausell@gmail.com' },
      { _key: 'k1', title: 'Phone', value: '51 50 85 70', href: 'tel:+4551508570' },
      { _key: 'k2', title: 'LinkedIn', value: 'linkedin.com/in/ruthannedausell', href: 'https://linkedin.com/in/ruthannedausell' },
    ],
  }).commit()
  console.log('✓ kontakt EN')

  await client.patch('fleksjob').set({
    headingEn: 'What does a flex job mean?',
    p1En: 'I am in a flex job due to mental illness (ADHD and bipolar type 2). To me, a flex job is not about lower ambitions - it is about working within a framework where I can deliver focused, stable work of high professional quality.',
    p2En: 'The flex job scheme allows me to work at a pace and in a structure where I perform best. I work fewer hours, but with full passion and dedication to the tasks I take on.',
    p3En: 'In practice, this means I thrive with clear structure, well-defined tasks, and a calm working environment. In return, you get a designer who approaches every task thoroughly and with commitment - with an eye for quality, visual direction, and detail.',
    p4En: 'I find that my way of working is also a strength. It leaves room for strong creative thinking, deep focus, and sustained attention on the tasks I care about. My experience is that I create the most value in tasks with clear direction, room for immersion, and flexibility in planning. I work well from home with written briefs and well-defined tasks. That allows me to deliver quality, overview, and creative solutions within a realistic framework.',
    factsEn: [
      { _key: 'k0', label: 'Scheme', value: 'Flex job (Danish employment scheme)' },
      { _key: 'k1', label: 'Diagnoses', value: 'Bipolar type 2 and ADHD' },
      { _key: 'k2', label: 'Hours', value: 'The number of hours depends on the type of employment. Initially the hours will be low, and the hope is to increase them over time if the framework and tasks allow it.' },
      { _key: 'k3', label: 'Commitment', value: 'Fully trained designer with high motivation to contribute professionally. I deliver quality results within the agreed framework and work with dedication on the tasks I take on.' },
    ],
  }).commit()
  console.log('✓ fleksjob EN')
}
run().catch(e => { console.error(e); process.exit(1) })
