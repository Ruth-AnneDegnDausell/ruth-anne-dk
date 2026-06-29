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

// Image paths per project slug — matches lib/projects.ts
const IMAGE_PATHS: Record<string, string[]> = {
  'flaneur': [
    '/projekter/Flaneur/A7402379.webp',
    '/projekter/Flaneur/A7402407.webp',
    '/projekter/Flaneur/A7402427.webp',
    '/projekter/Flaneur/Body (1).webp',
    '/projekter/Flaneur/Body-kopi.webp',
    '/projekter/Flaneur/Untitled_Artwork 2.webp',
    '/projekter/Flaneur/Untitled_Artwork 4.webp',
    '/projekter/Flaneur/Skitsering af is-skilt.webp',
    '/projekter/Flaneur/White Orange  Pink Abstract Modern Illustrated Typographic Art Party Poster.webp',
    '/projekter/Flaneur/2.webp',
    '/projekter/Flaneur/3.webp',
    '/projekter/Flaneur/4.webp',
    '/projekter/Flaneur/6.webp',
  ],
  'ba-afgangs-eksamen': [
    '/projekter/BA afgangs-eksamen/Bogen-foto.webp',
    '/projekter/BA afgangs-eksamen/Bogen depositum omslaget.webp',
    '/projekter/BA afgangs-eksamen/Bogen depositum omslag.webp',
    '/projekter/BA afgangs-eksamen/Bogen depositum bagside.webp',
    '/projekter/BA afgangs-eksamen/portfolio-1.webp',
    '/projekter/BA afgangs-eksamen/353676027_656944882560552_4102170183199640948_n.webp',
  ],
  'piba': [
    '/projekter/piba/2.webp',
    '/projekter/piba/3.webp',
    '/projekter/piba/4.webp',
    '/projekter/piba/5.webp',
    '/projekter/piba/6.webp',
    '/projekter/piba/7.webp',
    '/projekter/piba/8.webp',
    '/projekter/piba/9.webp',
    '/projekter/piba/10.webp',
    '/projekter/piba/11.webp',
    '/projekter/piba/A_highly_detailed_macro-style_photograph_202606271321.webp',
    '/projekter/piba/A_highly_refined,_editorial-style_product_202606271335.webp',
    '/projekter/piba/lav_disken_om_til_en_202606271347.webp',
  ],
  'lp-cover': [
    '/projekter/LP-Cover/lp2.webp',
    '/projekter/LP-Cover/Plade8.webp',
    '/projekter/LP-Cover/portfolio-1.webp',
  ],
  'komunale-losninger': [
    '/projekter/To fluer med et smæk/Kopi af Skærmbillede 2022-12-06 kl. 15.31.05.webp',
  ],
  'sportx': [
    '/projekter/SportX/portfolio-1.webp',
  ],
  'aarhus-bornehojskole': [
    '/projekter/Aarhus Bornehojskole/DSCF9282.webp',
    '/projekter/Aarhus Bornehojskole/DSCF9283.webp',
    '/projekter/Aarhus Bornehojskole/DSCF9297.webp',
    '/projekter/Aarhus Bornehojskole/Katalog-1.webp',
    '/projekter/Aarhus Bornehojskole/Katalog-3.webp',
    '/projekter/Aarhus Bornehojskole/Katalog-5.webp',
    '/projekter/Aarhus Bornehojskole/Katalog-6.webp',
    '/projekter/Aarhus Bornehojskole/Katalog-7.webp',
    '/projekter/Aarhus Bornehojskole/Katalog-8.webp',
    '/projekter/Aarhus Bornehojskole/portfolio-1.webp',
  ],
  'digitale-illustrationer': [
    '/projekter/Digitale Illustrationer/portfolio-1.webp',
    '/projekter/Digitale Illustrationer/portfolio-2.webp',
    '/projekter/Digitale Illustrationer/portfolio-3.webp',
    '/projekter/Digitale Illustrationer/portfolio-4.webp',
  ],
  'vid-sans': [
    '/projekter/Vid&Sans/DSCF9338.webp',
    '/projekter/Vid&Sans/DSCF9350.webp',
    '/projekter/Vid&Sans/DSCF9370.webp',
    '/projekter/Vid&Sans/filosof.webp',
    '/projekter/Vid&Sans/Pirre.webp',
    '/projekter/Vid&Sans/portfolio-1.webp',
  ],
  'kfum-kfuk': [
    '/projekter/KFUM-KFUK/DSCF9305.webp',
    '/projekter/KFUM-KFUK/DSCF9321.webp',
    '/projekter/KFUM-KFUK/DSCF9353.webp',
    '/projekter/KFUM-KFUK/portfolio-1.webp',
  ],
  'ramtt': [
    '/projekter/RAMTT/Ramtt design (4).webp',
    '/projekter/RAMTT/Ramtt design (5).webp',
    '/projekter/RAMTT/Ramtt design (6).webp',
    '/projekter/RAMTT/Ramtt design (7).webp',
    '/projekter/RAMTT/ramtt .webp',
    '/projekter/RAMTT/Ramtt Multi-design (3).webp',
    '/projekter/RAMTT/A_high-end,_minimalist_close-up_of_202606280043.webp',
    '/projekter/RAMTT/A_high-end,_minimalist_product_render_202606280052.webp',
    '/projekter/RAMTT/A_premium,_minimalist_product_render_202606280125 (1).webp',
    '/projekter/RAMTT/lav_logoet_samme_blå_2K_202606280141.webp',
  ],
  'suhn-io': [
    '/projekter/SUHN io/Visuel Præsentation SUHN io.webp',
    '/projekter/SUHN io/Visuel Præsentation SUHN io (1).webp',
    '/projekter/SUHN io/visuel præsentation - SUHN io (3).webp',
    '/projekter/SUHN io/13.webp',
    '/projekter/SUHN io/18.webp',
    '/projekter/SUHN io/15.webp',
    '/projekter/SUHN io/færdig Brandguide SUHN IO.webp',
    '/projekter/SUHN io/færdig Brandguide SUHN IO (1).webp',
    '/projekter/SUHN io/færdig Brandguide SUHN IO (2).webp',
    '/projekter/SUHN io/A_clean_editorialstyle_portrait_a_female_cyclist_i_e2989d6099.webp',
    '/projekter/SUHN io/Refill_plastic_container_with_pump_202605200308.webp',
  ],
  'grafisk-bog': [
    '/projekter/Grafisk opsætning og design af bog/Skærmbillede 2023-10-04 kl. 16.00.26.webp',
    '/projekter/Grafisk opsætning og design af bog/Skærmbillede 2023-10-04 kl. 16.01.04.webp',
    '/projekter/Grafisk opsætning og design af bog/Skærmbillede 2023-10-04 kl. 16.01.20.webp',
    '/projekter/Grafisk opsætning og design af bog/Skærmbillede 2023-10-04 kl. 16.01.30.webp',
  ],
  'velo-magazine': [
    '/projekter/VeloMore Magazine/Cort.webp',
    '/projekter/VeloMore Magazine/Lund.webp',
  ],
  'jesus-would-bike': [
    '/projekter/Jesus Would Bike/portfolio-1.webp',
    '/projekter/Jesus Would Bike/296866110_1242781503143108_8321429921132289341_n.webp',
  ],
  'videnskab-podcast': [
    '/projekter/Videnskab.dk Podcast/Cover_size3.webp',
    '/projekter/Videnskab.dk Podcast/Cover_size4.webp',
    '/projekter/Videnskab.dk Podcast/RGB_HudlægensBord_Logo_1400px1400p.webp',
  ],
  'substrate': [
    '/projekter/Substrate/Substrate Delt Presentation (1).webp',
    '/projekter/Substrate/Substrate Delt Presentation (2).webp',
    '/projekter/Substrate/Substrate Delt Presentation (3).webp',
    '/projekter/Substrate/Substrate Delt Presentation (4).webp',
    '/projekter/Substrate/Substrate Delt Presentation (5).webp',
    '/projekter/Substrate/Substrate Delt Presentation (6).webp',
    '/projekter/Substrate/sub.webp',
    '/projekter/Substrate/Substraete New Logo (1).webp',
  ],
  'gobik': [
    '/projekter/GOBIK cykeltrøje/Person seated Jun 26 17.19.webp',
    '/projekter/GOBIK cykeltrøje/Solsikker.webp',
    '/projekter/GOBIK cykeltrøje/IMG_0234.webp',
    '/projekter/GOBIK cykeltrøje/IMG_0240.webp',
    '/projekter/GOBIK cykeltrøje/A_highly_cinematic_luxury_sportswear_202606261827.webp',
    '/projekter/GOBIK cykeltrøje/Tightly Framed Front Torso Jun 26 2026.webp',
    '/projekter/GOBIK cykeltrøje/Shot_from_behind_with_a_202606261753.webp',
    '/projekter/GOBIK cykeltrøje/35mm Lens Capture Jun 26 17-19.webp',
    '/projekter/GOBIK cykeltrøje/lav_bukserne_sorte_202606261746.webp',
  ],
  'booklab': [
    '/projekter/BookLab/portfolio-1.webp',
  ],
}

async function run() {
  const docs = await client.fetch<Array<{ _id: string; slug: { current: string } }>>(
    `*[_type == "project"]{ _id, slug }`
  )
  console.log(`Found ${docs.length} projects in Sanity`)

  const tx = client.transaction()
  let count = 0

  for (const doc of docs) {
    const slug = doc.slug?.current
    const paths = IMAGE_PATHS[slug]
    if (!paths) {
      console.log(`  ⚠ No image paths for slug: ${slug}`)
      continue
    }
    tx.patch(doc._id, { set: { imagePaths: paths } })
    console.log(`  ✓ ${slug} — ${paths.length} images`)
    count++
  }

  await tx.commit()
  console.log(`\n✓ Patched ${count} projects with imagePaths`)
}

run().catch(console.error)
