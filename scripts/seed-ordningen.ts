/**
 * Seeds the 'ordningen' singleton (Fleksjob · Om ordningen) with the simple
 * employer-focused content. Safe to re-run - it overwrites the document.
 *
 * Run: npx sanity exec scripts/seed-ordningen.ts --with-user-token
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const section = (key: string, title: string, body: string) => ({
  _key: key,
  _type: 'object',
  title,
  body,
})

async function run() {
  await client.transaction()
    .createOrReplace({
      _id: 'ordningen',
      _type: 'ordningen',
      heading: 'Om ordningen',
      intro: 'Fleksjob er en støttet ansættelsesordning for personer med varigt nedsat arbejdsevne. Ordningen gør det muligt at fastholde tilknytningen til arbejdsmarkedet, selv når man ikke kan arbejde på fuld tid eller i fuldt tempo.',
      sections: [
        section('da-0', 'Hvad betyder det for en arbejdsgiver?', 'Kort fortalt: Du får fuld faglig værdi, og kommunen supplerer lønnen.\n\nSom fleksjobansat arbejder jeg på almindelige vilkår og løser de samme opgaver som enhver anden designer - bare med et timetal og tempo, der er tilpasset min arbejdsevne. Du betaler løn for den indsats, jeg yder, og kommunen lægger et fleksløntilskud oven i. Administrationen er enkel, og selve fleksjobbevillingen er allerede på plads via kommunen.'),
        section('da-1', 'Vil du vide mere?', 'Jeg fortæller gerne mere om, hvordan det fungerer i praksis - og det samme gør min jobkonsulent ved Jobcenter Aarhus, som kan svare på det formelle omkring ordning, tilskud og aftale.'),
      ],
      links: [
        { _key: 'lda-0', _type: 'object', label: 'Læs mere om fleksjobordningen →', href: 'https://www.borger.dk/arbejde-dagpenge-ferie/Beskaeftigelse-og-integration/Fleksjob' },
      ],
      headingEn: 'About the scheme',
      introEn: 'The flex job scheme is a subsidised employment arrangement for people with permanently reduced work capacity. It makes it possible to stay connected to the labour market even when working full-time or at full pace is not an option.',
      sectionsEn: [
        section('en-0', 'What does it mean for an employer?', 'In short: you get full professional value, and the municipality supplements the salary.\n\nAs a flex job employee I work on ordinary terms and handle the same tasks as any other designer - just with hours and a pace adapted to my work capacity. You pay for the effort I deliver, and the municipality adds a flex job supplement on top. The administration is simple, and the flex job grant is already in place through the municipality.'),
        section('en-1', 'Want to know more?', 'I am happy to explain how it works in practice - and so is my job consultant at Jobcenter Aarhus, who can answer the formal questions about the scheme, the supplement, and the agreement.'),
      ],
      linksEn: [
        { _key: 'len-0', _type: 'object', label: 'Read more about the flex job scheme →', href: 'https://www.borger.dk/arbejde-dagpenge-ferie/Beskaeftigelse-og-integration/Fleksjob' },
      ],
    })
    .delete('drafts.ordningen')
    .commit()
  console.log('✓ ordningen opdateret med det enkle indhold og publiceret')
}

run().catch(err => { console.error(err); process.exit(1) })
