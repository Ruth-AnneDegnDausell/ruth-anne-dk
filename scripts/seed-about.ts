import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token,
  useCdn: false,
})

async function seed() {
  await client.createOrReplace({
    _type: 'aboutArbejde',
    _id: 'about-arbejde',
    bio1: 'Designer med baggrund i to designuddannelser: en bachelor i kommunikationsdesign fra Designskolen Kolding og en designteknologuddannelse i møbeldesign fra TEKO. Kombinationen giver mig en forståelse for både det analoge og det digitale, fra håndtegnet skitse til færdigt visuelt system.',
    bio2: 'Jeg har arbejdet med visuel identitet, illustration, art direction og videoproduktion for kunder inden for sportsernæring, kultur, medier og livsstil. Bl.a. hos Flaneur og et dansk sportsernæringsmærke, og tidligere som Junior Art Director hos Vid&Sans, hvor jeg var med til at bygge det grafiske udtryk fra bunden. Min tilgang er præcis og konceptdrevet, og jeg trives bedst, når der er kortere fra brief til produkt.',
    services: [
      { _key: 's1', title: 'Visuel identitet', desc: 'Logo, farvepalette, typografi og brand guidelines.' },
      { _key: 's2', title: 'Illustration', desc: 'Håndtegnede og digitale illustrationer til print og web.' },
      { _key: 's3', title: 'Art direction', desc: 'Kreativ ledelse af visuelle projekter fra start til slut.' },
      { _key: 's4', title: 'Video & motion', desc: 'Kortere videoproduktioner og reklamecontent.' },
      { _key: 's5', title: 'UX · UI design', desc: 'Interface design og prototyper klar til produktion.' },
    ],
    clients: 'Flaneur, Vid&Sans (Aarhus Universitetsforlag), Videnskab.dk, BOOKLAB Forlag, KFUM&KFUK og dansk sportsernæringsbrand.',
    bio1En: 'Designer with two design degrees: a BA in Communication Design from Designskolen Kolding and a Design Technologist degree in furniture design from TEKO. The combination gives me an understanding of both the analogue and the digital, from hand-drawn sketch to finished visual system.',
    bio2En: 'I have worked with visual identity, illustration, art direction, and video production for clients in sports nutrition, culture, media, and lifestyle, including at Flaneur and a Danish sports nutrition brand, and previously as Junior Art Director at Vid&Sans, where I helped build the visual identity from scratch. My approach is precise and concept-driven, and I work best when the distance from brief to finished product is short.',
    servicesEn: [
      { _key: 's1', title: 'Visual identity', desc: 'Logo, colour palette, typography, and brand guidelines.' },
      { _key: 's2', title: 'Illustration', desc: 'Hand-drawn and digital illustrations for print and web.' },
      { _key: 's3', title: 'Art direction', desc: 'Creative direction of visual projects from start to finish.' },
      { _key: 's4', title: 'Video & motion', desc: 'Short video productions and advertising content.' },
      { _key: 's5', title: 'UX · UI design', desc: 'Interface design and prototypes ready for production.' },
    ],
    clientsEn: 'Flaneur, Vid&Sans (Aarhus University Press), Videnskab.dk, BOOKLAB Publishing, KFUM&KFUK, and a Danish sports nutrition brand.',
  })
  console.log('✓ Om mig · Arbejde')

  await client.createOrReplace({
    _type: 'aboutPrivat',
    _id: 'about-privat',
    intro: 'Jeg er 28 år og bor i Nye nord for Aarhus med min kæreste Malte. Her er roligt, der er vild natur og et dejligt fællesskab, og det passer os rigtig godt.',
    body1: 'En stor del af min fritid går med cykling. Jeg cykler gennemsnitligt ti timer om ugen og er en del af et internationalt hold, vi cykler på Zwift. Hver torsdag aften kører vi TTT (holdtidskørsel), og det er en af de ting, jeg ser allermest frem til i løbet af ugen. Tour de France og Giro d\'Italia ser Malte og jeg næsten altid sammen.',
    body2: 'Udover cyklingen tegner jeg, skriver digte og fotograferer, både analogt og digitalt. Jeg har altid lavet ting med hænderne, og det følger mig i det meste af det jeg gør. Til hverdag prioriterer jeg tid med familien, gåture i skoven og museumsbesøg.',
    inspirations: [
      'Cykling: TTT med holdet på Zwift og Tour de France på tv',
      'Digte, tegninger og fotografering (analog + digital)',
      'Natur, ro og gode omgivelser i Nye',
      'Museumsdage, skovture og tid med Malte og familien',
    ],
    introEn: 'I\'m 28 and live in Nye, north of Aarhus, with my partner Malte. It\'s quiet here, the nature is wild, and the community is lovely, and it suits us well.',
    body1En: 'A big part of my free time goes into cycling. I ride an average of ten hours a week and am part of an international team on Zwift. Every Thursday evening we race TTT (team time trial), and it\'s one of the things I look forward to most during the week. Malte and I watch Tour de France and Giro d\'Italia together almost without fail.',
    body2En: 'Alongside cycling I draw, write poetry, and take photos, both analogue and digital. I\'ve always made things by hand, and that carries into most of what I do. Day to day I prioritise time with family, walks in the forest, and museum visits.',
    inspirationsEn: [
      'Cycling: TTT with the team on Zwift and Tour de France on tv',
      'Poetry, drawing, and photography (analogue + digital)',
      'Nature, quiet, and good surroundings in Nye',
      'Museum days, forest walks, and time with Malte and family',
    ],
  })
  console.log('✓ Om mig · Privat')
  console.log('\n✅ Done.')
}

seed().catch(console.error)
