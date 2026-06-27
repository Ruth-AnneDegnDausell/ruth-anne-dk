export interface GalleryItem {
  src?: string
  aspect: string
  alt?: string
  category?: string | string[]
}

export const ILLUSTRATIONER: GalleryItem[] = [
  // Cykel
  { src: '/illustrationer/Cykel/jonas_vuelta.webp', aspect: 'aspect-[7/5]', alt: 'Jonas Vingegaard', category: 'cykel' },
  { src: '/illustrationer/Cykel/Mads P plakat.webp', aspect: 'aspect-[2/3]', alt: 'Mads Pedersen', category: ['cykel', 'portræt'] },
  { src: '/illustrationer/Cykel/Cort.webp', aspect: 'aspect-[2/3]', alt: 'Cort', category: ['cykel', 'portræt'] },
  { src: '/illustrationer/Cykel/1.webp', aspect: 'aspect-[7/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/3.webp', aspect: 'aspect-[7/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/4.webp', aspect: 'aspect-[7/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/5.webp', aspect: 'aspect-[7/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/11.webp', aspect: 'aspect-[4/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/12.webp', aspect: 'aspect-[7/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/14.webp', aspect: 'aspect-[7/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/15.webp', aspect: 'aspect-[7/5]', category: 'cykel' },
  { src: '/illustrationer/Cykel/Skitse11.webp', aspect: 'aspect-[7/5]', alt: 'Skitse', category: 'cykel' },
  { src: '/illustrationer/Cykel/Skitse13.webp', aspect: 'aspect-[7/5]', alt: 'Skitse', category: 'cykel' },
  { src: '/illustrationer/Cykel/Untitled_Artwork.webp', aspect: 'aspect-[2/3]', category: 'cykel' },

  // Potrætter (unique to this folder)
  { src: '/illustrationer/Potrætter/ronja.webp', aspect: 'aspect-[2/3]', alt: 'Ronja', category: 'portræt' },
  { src: '/illustrationer/Potrætter/Hartmut Rosa.webp', aspect: 'aspect-[5/7]', alt: 'Hartmut Rosa', category: 'portræt' },
  { src: '/illustrationer/Potrætter/Cykel tilprint.webp', aspect: 'aspect-[5/7]', alt: 'Cykel', category: ['portræt', 'cykel'] },
  { src: '/illustrationer/Potrætter/Fodbold fra Google Drev.webp', aspect: 'aspect-[5/7]', alt: 'Fodbold', category: 'portræt' },

  // Vid og Sans
  { src: '/illustrationer/Vid og Sans/filosof.webp', aspect: 'aspect-[2/3]', alt: 'Filosof', category: ['vidsans', 'portræt'] },
  { src: '/illustrationer/Vid og Sans/Pirre.webp', aspect: 'aspect-[5/7]', alt: 'Pirre', category: ['vidsans', 'portræt'] },
  { src: '/illustrationer/Vid og Sans/Knud rasmussen.webp', aspect: 'aspect-[2/3]', alt: 'Knud Rasmussen', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/lev.webp', aspect: 'aspect-[2/3]', alt: 'Lev', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/platon.webp', aspect: 'aspect-[2/3]', alt: 'Platon', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Atomfrygt_rigtigformat.webp', aspect: 'aspect-[2/3]', alt: 'Atomfrygt', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Koedaedere_rigtigformat.webp', aspect: 'aspect-[2/3]', alt: 'Kødædere', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/PanikNu_RigtigFormat.webp', aspect: 'aspect-[2/3]', alt: 'Panik Nu', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Rejse_rigtigformat.webp', aspect: 'aspect-[2/3]', alt: 'Rejse', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Fiksering.webp', aspect: 'aspect-[4/5]', alt: 'Fiksering', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Ost tilprint.webp', aspect: 'aspect-[7/5]', alt: 'Ost', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Dessert_SoMe.webp', aspect: 'aspect-square', alt: 'Dessert', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Nouvelle-cuisine_SoMe.webp', aspect: 'aspect-square', alt: 'Nouvelle cuisine', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Solkongens-bord_SoMe.webp', aspect: 'aspect-square', alt: 'Solkongens bord', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Vegane_SoMe.webp', aspect: 'aspect-square', alt: 'Vegane', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Zen_SoMe.webp', aspect: 'aspect-square', alt: 'Zen', category: 'vidsans' },
  { src: '/illustrationer/Vid og Sans/Untitled_Artwork 25.webp', aspect: 'aspect-[2/3]', category: 'vidsans' },

  // KFUM
  { src: '/illustrationer/KFUM/KFUM KFUK Vision 35.webp', aspect: 'aspect-[5/7]', alt: 'KFUM KFUK', category: 'kfum' },

  // Øvrige
  { src: '/illustrationer/Øvrige/Citroner tilprint.webp', aspect: 'aspect-[5/7]', alt: 'Citroner', category: 'øvrige' },
  { src: '/illustrationer/Øvrige/Floorball.webp', aspect: 'aspect-[2/3]', alt: 'Floorball', category: 'øvrige' },
  { src: '/illustrationer/Øvrige/Kage illustration.webp', aspect: 'aspect-[5/7]', alt: 'Kage', category: 'øvrige' },
  { src: '/illustrationer/Øvrige/Kage1.webp', aspect: 'aspect-[5/7]', alt: 'Kage', category: 'øvrige' },
  { src: '/illustrationer/Øvrige/Tilprint billede.webp', aspect: 'aspect-[5/7]', category: 'øvrige' },
  { src: '/illustrationer/Øvrige/Tilprint bord.webp', aspect: 'aspect-[5/7]', alt: 'Bord', category: 'øvrige' },
  { src: '/illustrationer/Øvrige/Untitled design.webp', aspect: 'aspect-[5/7]', category: 'øvrige' },
]

export const FOTOGRAFIER: GalleryItem[] = [
  // VeloMore
  { src: '/fotografier/VeloMore/VeloMore Redigeret.webp', aspect: 'aspect-[3/2]', alt: 'VeloMore', category: 'velomore' },
  { src: '/fotografier/VeloMore/VeloMore Redigeret (1).webp', aspect: 'aspect-[3/2]', alt: 'VeloMore', category: 'velomore' },
  { src: '/fotografier/VeloMore/VeloMore Redigeret (2).webp', aspect: 'aspect-[3/2]', alt: 'VeloMore', category: 'velomore' },
  { src: '/fotografier/VeloMore/HARO.webp', aspect: 'aspect-[3/2]', alt: 'Haro', category: 'velomore' },
  { src: '/fotografier/VeloMore/Haro 1 prioritet.webp', aspect: 'aspect-[3/2]', alt: 'Haro', category: 'velomore' },
  { src: '/fotografier/VeloMore/Haro 1 prioritet (1).webp', aspect: 'aspect-[2/3]', alt: 'Haro', category: 'velomore' },
  { src: '/fotografier/VeloMore/Haro 1. prioritet.webp', aspect: 'aspect-[3/2]', alt: 'Haro', category: 'velomore' },
  { src: '/fotografier/VeloMore/Haro 1. prioritet (1).webp', aspect: 'aspect-[3/2]', alt: 'Haro', category: 'velomore' },
  { src: '/fotografier/VeloMore/S-Work 1 prioritet.webp', aspect: 'aspect-[3/2]', alt: 'S-Work', category: 'velomore' },
  { src: '/fotografier/VeloMore/S-Work 1. prioritet.webp', aspect: 'aspect-[3/2]', alt: 'S-Work', category: 'velomore' },
  { src: '/fotografier/VeloMore/S-Work 1. prioritet (1).webp', aspect: 'aspect-[3/2]', alt: 'S-Work', category: 'velomore' },
  { src: '/fotografier/VeloMore/S-Work 1. prioritet (2).webp', aspect: 'aspect-[2/3]', alt: 'S-Work', category: 'velomore' },
  { src: '/fotografier/VeloMore/S-Work 1. prioritet (3).webp', aspect: 'aspect-[3/2]', alt: 'S-Work', category: 'velomore' },
  { src: '/fotografier/VeloMore/S-Work 1. prioritet (4).webp', aspect: 'aspect-[2/3]', alt: 'S-Work', category: 'velomore' },
  { src: '/fotografier/VeloMore/S-Work 1. prioritet (5).webp', aspect: 'aspect-[3/2]', alt: 'S-Work', category: 'velomore' },

  // BookLab
  { src: '/fotografier/BookLab/bøger.webp', aspect: 'aspect-[3/2]', alt: 'Bøger', category: 'booklab' },
  { src: '/fotografier/BookLab/Mig.webp', aspect: 'aspect-[2/3]', category: 'booklab' },
  { src: '/fotografier/BookLab/Praktikrapport.webp', aspect: 'aspect-[3/4]', category: 'booklab' },
  { src: '/fotografier/BookLab/OleC SoMe praktikrapport.webp', aspect: 'aspect-[3/2]', category: 'booklab' },
  { src: '/fotografier/BookLab/Praktik rapport Jens Juul.webp', aspect: 'aspect-[3/2]', category: 'booklab' },
  { src: '/fotografier/BookLab/Praktikrapport Redigeret.webp', aspect: 'aspect-[2/3]', category: 'booklab' },
  { src: '/fotografier/BookLab/Sengekanten praktik rapport.webp', aspect: 'aspect-square', category: 'booklab' },
  { src: '/fotografier/BookLab/Huset redigeret praktikrapport.webp', aspect: 'aspect-[3/2]', category: 'booklab' },
  { src: '/fotografier/BookLab/Praktikrapport Finnstorgaard.webp', aspect: 'aspect-[3/2]', category: 'booklab' },
  { src: '/fotografier/BookLab/Praktik rapport redigering.webp', aspect: 'aspect-[2/3]', category: 'booklab' },
  { src: '/fotografier/BookLab/Skærmbillede 2022-10-13 kl. 19.56.19.webp', aspect: 'aspect-[3/2]', category: 'booklab' },
  { src: '/fotografier/BookLab/24db7e42-9039-4734-972d-e31c7d3b32db.webp', aspect: 'aspect-[3/2]', category: 'booklab' },

  // Flâneur
  { src: '/fotografier/Flâneur/A7402106-2.webp', aspect: 'aspect-[3/2]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402486-2.webp', aspect: 'aspect-[3/2]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402624.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402657.webp', aspect: 'aspect-[3/2]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402708.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402794.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402799.webp', aspect: 'aspect-[3/2]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402804.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402907-2.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402925-2.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402930-2.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7402972-2.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/A7403031-2.webp', aspect: 'aspect-[3/2]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/Canva 12 Jun 2025 (1).webp', aspect: 'aspect-[3/4]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/Canva 12 Jun 2025.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/Dør foto (1).webp', aspect: 'aspect-[3/4]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_1522.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_1645.webp', aspect: 'aspect-[3/2]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_1824.webp', aspect: 'aspect-[3/2]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2118.webp', aspect: 'aspect-[4/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2122.webp', aspect: 'aspect-[4/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2128.webp', aspect: 'aspect-[3/4]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2131.webp', aspect: 'aspect-[3/4]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2178.webp', aspect: 'aspect-[4/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2181.webp', aspect: 'aspect-[4/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2244.webp', aspect: 'aspect-[4/3]', category: 'flaneur' },
  { src: '/fotografier/Flâneur/IMG_2734.webp', aspect: 'aspect-[2/3]', category: 'flaneur' },

  // Konfirmationer
  { src: '/fotografier/Kanfimationer/T35-kopi.webp', aspect: 'aspect-[2/3]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/T46-kopi.webp', aspect: 'aspect-[2/3]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/T53-kopi.webp', aspect: 'aspect-[2/3]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0199.webp', aspect: 'aspect-[2/3]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0208.webp', aspect: 'aspect-[3/4]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0213.webp', aspect: 'aspect-[2/3]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0312.webp', aspect: 'aspect-[3/4]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0428.webp', aspect: 'aspect-[3/4]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0480.webp', aspect: 'aspect-[2/3]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0550.webp', aspect: 'aspect-[3/4]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_0622.webp', aspect: 'aspect-[2/3]', category: 'konfirmation' },
  { src: '/fotografier/Kanfimationer/IMG_2285-kopi 2.webp', aspect: 'aspect-[3/4]', category: 'konfirmation' },

  // Personlige projekter
  { src: '/fotografier/Personlige projekter/drivhus1-kopi.webp', aspect: 'aspect-[2/3]', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/maltemus-kopi.webp', aspect: 'aspect-[2/3]', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/2.webp', aspect: 'aspect-square', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/6.webp', aspect: 'aspect-[3/4]', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/6 (1).webp', aspect: 'aspect-[3/4]', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/7.webp', aspect: 'aspect-[3/4]', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/8.webp', aspect: 'aspect-[3/4]', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/10.webp', aspect: 'aspect-[3/4]', category: 'personlig' },
  { src: '/fotografier/Personlige projekter/13.webp', aspect: 'aspect-[3/4]', category: 'personlig' },
]
