import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })

async function run() {
  await client.patch('forside').set({
    tagline: 'Designer · Illustratør',
    intro: 'Kreativt arbejde, gennemtænkt design og projekter der efterlader et varigt indtryk.',
    aboutHeading: 'Designer med øje for detaljen og passion for det håndgjorte udtryk.',
    aboutBody1: 'Uddannet fra Designskolen Kolding med speciale i visuel kommunikation. Har arbejdet med visuel identitet, illustration og videoproduktion for kunder inden for sport, kultur og livsstil.',
    aboutBody2: 'Baseret nord for Aarhus, arbejder jeg tæt med kunder fra første brief til færdigt produkt. Med to designuddannelser bag mig er min tilgang præcis og konceptdrevet.',
    taglineEn: 'Designer · Illustrator',
    introEn: 'Creative work, considered design, and projects that leave a lasting impression.',
    aboutHeadingEn: 'Designer with an eye for detail and a passion for handcrafted expression.',
    aboutBody1En: 'Graduated from Designskolen Kolding with a specialisation in visual communication. Has worked on visual identity, illustration, and video production for clients in sports, culture, and lifestyle.',
    aboutBody2En: 'Based north of Aarhus, I work closely with clients from first brief to finished product. With two design degrees behind me, my approach is precise and concept-driven.',
  }).commit()
  console.log('✓ forside-tekster lagt ind og publiceret')
}
run().catch(e => { console.error(e); process.exit(1) })
