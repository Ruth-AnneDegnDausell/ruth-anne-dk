import { projectSchema } from './project'
import { projektKategoriSchema } from './projekt-kategori'
import { projekterIndexSchema } from './projekter-index'
import { forsideSchema } from './forside'
import { aboutArbejdeSchema } from './about-arbejde'
import { aboutPrivatSchema } from './about-privat'
import { kontaktSchema } from './kontakt'
import { fleksjobSchema } from './fleksjob'
import { ordningenSchema } from './ordningen'
import { cvSchema } from './cv'
import { udtalelserSchema } from './udtalelser'
import { fotografiItemSchema } from './fotografi-item'
import { illustrationItemSchema } from './illustration-item'
import { fotografierGallerySchema } from './fotografier-gallery'
import { illustrationerGallerySchema } from './illustrationer-gallery'
import { fotoKategoriSchema, illKategoriSchema } from './galleri-kategorier'

export const schemas = [
  forsideSchema,
  projectSchema,
  projektKategoriSchema,
  projekterIndexSchema,
  aboutArbejdeSchema,
  aboutPrivatSchema,
  kontaktSchema,
  fleksjobSchema,
  ordningenSchema,
  cvSchema,
  udtalelserSchema,
  fotografiItemSchema,
  illustrationItemSchema,
  fotografierGallerySchema,
  illustrationerGallerySchema,
  fotoKategoriSchema,
  illKategoriSchema,
]
