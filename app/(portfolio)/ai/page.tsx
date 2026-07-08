'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

const IMAGES = [
  '/projekter/AI fotografier/90s Film Grain Shot on Portra (18).webp',
  '/projekter/AI fotografier/90s Film Grain Shot on Portra (19).webp',
  '/projekter/AI fotografier/90s Film Grain Shot on Portra 40 (51).webp',
  '/projekter/AI fotografier/90s Film Grain Shot on Portra 40 (68).webp',
  '/projekter/AI fotografier/A man in light blue cycling suit (1).webp',
  '/projekter/AI fotografier/A person running sense of speed.webp',
  '/projekter/AI fotografier/Aerial View of Cyclists.webp',
  '/projekter/AI fotografier/An_extreme,_ultra-realistic_macro_close-up_202605211602.webp',
  '/projekter/AI fotografier/Athlete Running Photo.webp',
  '/projekter/AI fotografier/Athlete_wearing_oxygen_mask_202605202317.webp',
  '/projekter/AI fotografier/Balenciaga Style Model (1).webp',
  '/projekter/AI fotografier/C Array Photograph from Midjourney.webp',
  '/projekter/AI fotografier/Candid Sports Photograph from Midjourney.webp',
  '/projekter/AI fotografier/Close-up Portrait May 21 2023.webp',
  '/projekter/AI fotografier/Close-up Portrait of Formula 1 Driver.webp',
  '/projekter/AI fotografier/Copenhagen Rekkehus Sunset.webp',
  '/projekter/AI fotografier/Copenhagen rækkehus ved solnedgang (3).webp',
  '/projekter/AI fotografier/Cyclist Mid-Sprint from Organize (2).webp',
  '/projekter/AI fotografier/Dining Table Close-Up (1).webp',
  '/projekter/AI fotografier/Dramatic Black and White Portrait.webp',
  '/projekter/AI fotografier/Energy Gel Sachet Feb 26 (3).webp',
  '/projekter/AI fotografier/Fashion Portrait of Young Woman.webp',
  '/projekter/AI fotografier/Film Grain Shot on Portra (8).webp',
  '/projekter/AI fotografier/Fireworks Trail Against Black Sky (1).webp',
  '/projekter/AI fotografier/Fjern flaget 2K maj 20.webp',
  '/projekter/AI fotografier/Flow 20. maj billede i farver.webp',
  '/projekter/AI fotografier/Flow Close-up Action Photo May 20.webp',
  '/projekter/AI fotografier/Flow lavvinkelbillede 20 maj 03.27 (1).webp',
  '/projekter/AI fotografier/Gourmet Goat Cheese and Honey.webp',
  '/projekter/AI fotografier/han_skal_have_en_cykelhjelm_202605210432.webp',
  '/projekter/AI fotografier/Hyper-realistic Photograph Set (1).webp',
  '/projekter/AI fotografier/Høj-end Restaurant Borddækning.webp',
  '/projekter/AI fotografier/Incense Stick Close-up.webp',
  '/projekter/AI fotografier/Kasket tekst slet 20 maj 2025.webp',
  '/projekter/AI fotografier/Lufthavn Jul Vinter Organize (1).webp',
  '/projekter/AI fotografier/Mands Sneakers Close Up.webp',
  '/projekter/AI fotografier/Mands trainers close-up.webp',
  '/projekter/AI fotografier/Nike High White Socks.webp',
  '/projekter/AI fotografier/Nordic Beach Enjoyment (1).webp',
  '/projekter/AI fotografier/Nordic Sauna Dance (6).webp',
  '/projekter/AI fotografier/Organize Warehouse Pallet.webp',
  '/projekter/AI fotografier/Pashmina weaving close-up.webp',
  '/projekter/AI fotografier/Person crouched on rock.webp',
  '/projekter/AI fotografier/Person stretching on city street May 20 2026.webp',
  '/projekter/AI fotografier/Polaroid photograph with frame.webp',
  '/projekter/AI fotografier/Professionel overhead shot fra Midjourney.webp',
  '/projekter/AI fotografier/Ragdoll cat napping on sofa.webp',
  '/projekter/AI fotografier/Realistisk brunt bygning billede fra Midjourney.webp',
  '/projekter/AI fotografier/Refill Plastic Container May 19 18.28.webp',
  '/projekter/AI fotografier/Smuk dyb pool med turkist vand.webp',
  '/projekter/AI fotografier/Soft Ivory Towel on Wall Hook (1).webp',
  '/projekter/AI fotografier/Sommerbordopdækning fra Midjourney (1).webp',
  '/projekter/AI fotografier/Starutruth Bakery Display Window.webp',
  '/projekter/AI fotografier/starutruth_a_black_and_white_photography_of_an_old_dark_touri_05f9d42b-fe4c-404b-b594-77038a3bc234_0.webp',
  '/projekter/AI fotografier/starutruth_a_black_t-shirt__worn_by_women_in_her_mid-20s_stan_6357c290-3ec8-4a6f-966b-099ce2bf2e99_2.webp',
  '/projekter/AI fotografier/starutruth_a_blue_cashmere_sweater_lying_flat_on_a_drying_rac_424d53a4-a55b-4b05-8694-15d920fa3976_3.webp',
  '/projekter/AI fotografier/starutruth_A_cinematic_low-angle_street_photo_of_a_man_runnin_c1a8e70d-eb74-402b-8706-0e5db33ca151_3.webp',
  '/projekter/AI fotografier/starutruth_a_cinematic_photo_of_a_single_professional_runner__d24736f7-79ac-4ef5-87fb-fbc9b27551d4_2.webp',
  '/projekter/AI fotografier/starutruth_A_dramatic_black_and_white_close-up_portrait_of_a__9ba67a1e-2808-45ed-8e34-c57edef2d7f1_2.webp',
  '/projekter/AI fotografier/starutruth_A_high-end_Danish_stainless_steel_kitchen_sink_set_7b2d95ba-0b6b-4b86-9847-fdbef44e4849_3.webp',
  '/projekter/AI fotografier/starutruth_A_minimalist_Scandinavian_Copenhagen_balcony_seen__fd427f34-59a1-437c-9fb1-e77048a9bcbe_2.webp',
  '/projekter/AI fotografier/starutruth_A_person_from_behind_opens_his_arms_happily._The_b_4730f827-7d48-422a-bb0f-b504dd0b1357_1.webp',
  '/projekter/AI fotografier/starutruth_A_quiet_intimate_domestic_snapshot_of_a_person_lyi_733bf108-d14d-4e3b-b3e6-8b0c97db5363_0.webp',
  '/projekter/AI fotografier/starutruth_A_quiet_intimate_domestic_snapshot_of_a_person_lyi_98ea933c-84fb-4199-b4d0-69b4f63ae075_0.webp',
  '/projekter/AI fotografier/starutruth_an_airport_during_Christmas_and_winter_time_photog_7870522b-5d54-4231-9cb1-d59a48fffd12_0.webp',
  '/projekter/AI fotografier/starutruth_Create_a_90s_inspired_film_grain_shot_on_Portra_40_1dea4786-7f30-415f-8a05-aa136ad32c5e_1.webp',
  '/projekter/AI fotografier/starutruth_Create_a_90s_inspired_film_grain_shot_on_Portra_40_5095173f-6271-473d-900b-98fb19d7b24e_0.webp',
  '/projekter/AI fotografier/starutruth_Extreme_close_up._Macro_or_sharp_85mm_prime_lens.__c5d6ba51-7710-40d2-bc56-cf1becad4e41_1.webp',
  '/projekter/AI fotografier/starutruth_filter_coffee._commercial_photo_high_resolution._h_d3318181-46fb-47a5-862c-239fe3397594_3.webp',
  '/projekter/AI fotografier/starutruth_imagine_food_editorial_photography_Mediterranean_t_dc068e93-911f-41ca-8189-496e2c13288d_2.webp',
  '/projekter/AI fotografier/starutruth_joyful_running_photography_with_90s_European_urban_823cdff4-cb32-4d6f-b886-fde1659ce49d_0.webp',
  '/projekter/AI fotografier/starutruth_low-angle_night_sky_camera_positioned_close_to_the_1beb24d6-117d-496e-875c-9377f6470bb3_0.webp',
  '/projekter/AI fotografier/Street Style Analog Photograph.webp',
  '/projekter/AI fotografier/Sun Drenched Unmade Bed (1).webp',
  '/projekter/AI fotografier/Sweaty male runner close-up.webp',
  '/projekter/AI fotografier/This_intimate_and_intensely_raw_202605210353.webp',
  '/projekter/AI fotografier/This_square,_powerful_photograph_captures_202605210124.webp',
  '/projekter/AI fotografier/Trail Runner Grainy Photo (1).webp',
  '/projekter/AI fotografier/Ung kvinde i badekar (1).webp',
  '/projekter/AI fotografier/Ung mand band close up fra Midjourney (2).webp',
  '/projekter/AI fotografier/Veggie Pizza Top Shot.webp',
]

const INTERVAL_MS = 5000
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: {
    eyebrow: 'AI Fotografier',
    heading: 'AI-genererede billeder',
    body: 'En samling fotografier genereret med Midjourney, Nano Banana, Google Flow og øvrige AI-modeller. Billederne udforsker muligheder, teknikker og æstetik på tværs af motiver og kompositioner, og viser mulighederne inden for AI-assisteret billedproduktion som del af den kreative proces. Samlingen giver eksempler på, hvad AI-indhold kan bidrage med i mange forskellige kontekster, for brands og på tværs af platforme. Jeg er personligt enormt optaget og fascineret af AI og bruger meget af min fritid på at holde mig opdateret, øve mig og lære nye værktøjer. Jeg tror grundlæggende på, at AI skaber endnu flere muligheder for at folde den kreative proces og de visuelle idéer endnu mere ud.',
    counter: (i: number, n: number) => `${i + 1} / ${n}`,
  },
  en: {
    eyebrow: 'AI Photography',
    heading: 'AI-generated images',
    body: 'A collection of photographs generated with Midjourney, Nano Banana, Google Flow, and other AI models. The images explore possibilities, techniques, and aesthetics across subjects and compositions, showing the potential of AI-assisted image production as part of the creative process. The collection offers examples of what AI content can bring to many different contexts, brands, and platforms. I am personally deeply fascinated by AI and spend much of my spare time keeping up to date, practising, and learning new tools. I fundamentally believe that AI opens up even more ways to unfold the creative process and visual ideas.',
    counter: (i: number, n: number) => `${i + 1} / ${n}`,
  },
}

export default function AiFotografierPage() {
  const { lang } = useLang()
  const t = T[lang]
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((newIdx: number, direction: number) => {
    setDir(direction)
    setIdx(newIdx)
  }, [])

  const prev = useCallback(() => {
    goTo((idx - 1 + IMAGES.length) % IMAGES.length, -1)
  }, [idx, goTo])

  const next = useCallback(() => {
    goTo((idx + 1) % IMAGES.length, 1)
  }, [idx, goTo])

  // Auto-advance
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDir(1)
      setIdx(i => (i + 1) % IMAGES.length)
    }, INTERVAL_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [idx])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  const prevIdx = (idx - 1 + IMAGES.length) % IMAGES.length
  const nextIdx = (idx + 1) % IMAGES.length
  const nextIdx2 = (idx + 2) % IMAGES.length

  return (
    <main className="flex min-h-screen flex-col pt-14">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mb-8 px-8 sm:px-14"
      >
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.eyebrow}
        </p>
        <h1 className="text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.06, ease }}
        className="px-8 sm:px-14"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">

          {/* Prev thumbnail */}
          <button
            onClick={prev}
            aria-label="Forrige"
            className="relative hidden shrink-0 overflow-hidden rounded-lg sm:block"
            style={{ width: 72, height: 54 }}
          >
            <Image
              src={IMAGES[prevIdx]}
              fill
              alt="Forrige billede"
              className="object-cover opacity-50 transition-opacity duration-150 hover:opacity-80"
              sizes="72px"
            />
          </button>

          {/* Main card — fast områdehøjde (siden hopper aldrig), men billedet ER kortet:
              naturligt format, afrundede hjørner direkte på billedet, ingen kasse bagved */}
          <div className="relative min-w-0 flex-1" style={{ height: 'min(66vh, 620px)' }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.32, ease }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={IMAGES[idx]}
                  width={0}
                  height={0}
                  alt={`AI billede ${idx + 1}`}
                  className="h-auto w-auto rounded-xl"
                  style={{ maxHeight: 'min(66vh, 620px)', maxWidth: '100%' }}
                  sizes="(max-width: 640px) calc(100vw - 4rem), min(calc(100vw - 7rem - 168px), 48rem)"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Usynlig forudindlæsning af nabo-billeder i præcis samme optimerede størrelse */}
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
              {[nextIdx, prevIdx, nextIdx2].map((i) => (
                <Image
                  key={IMAGES[i]}
                  src={IMAGES[i]}
                  fill
                  alt=""
                  className="object-contain"
                  sizes="(max-width: 640px) calc(100vw - 4rem), min(calc(100vw - 7rem - 168px), 48rem)"
                />
              ))}
            </div>

            {/* Arrow buttons — always visible, overlaid */}
            <button
              onClick={prev}
              aria-label="Forrige"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/25 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/40"
            >
              <ArrowLeft size={12} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Næste"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/25 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/40"
            >
              <ArrowRight size={12} strokeWidth={1.5} />
            </button>

          </div>

          {/* Next thumbnail */}
          <button
            onClick={next}
            aria-label="Næste"
            className="relative hidden shrink-0 overflow-hidden rounded-lg sm:block"
            style={{ width: 72, height: 54 }}
          >
            <Image
              src={IMAGES[nextIdx]}
              fill
              alt="Næste billede"
              className="object-cover opacity-50 transition-opacity duration-150 hover:opacity-80"
              sizes="72px"
            />
          </button>

        </div>
      </motion.div>

      {/* Tidslinje + tæller — fast bredde, kan aldrig flyde ud over billedet */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="h-[2px] w-24 overflow-hidden rounded-full bg-border">
          <motion.div
            key={`bar-${idx}`}
            className="h-full bg-text-3"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
          />
        </div>
        <p className="text-[10px] tabular-nums text-text-3">
          {t.counter(idx, IMAGES.length)}
        </p>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14, ease }}
        className="mt-14 max-w-xl px-8 sm:px-14"
      >
        <p className="text-[12px]/[1.85] text-text-2">{t.body}</p>
      </motion.div>

    </main>
  )
}
