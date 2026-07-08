import { defineField, defineType } from 'sanity'
import { GalleryOrderInput } from '../components/gallery-order-input'

const ROTATION_OPTIONS = [
  { title: '0°', value: 0 },
  { title: '90°', value: 90 },
  { title: '180°', value: 180 },
  { title: '270°', value: 270 },
]

const ASPECT_OPTIONS = [
  { title: 'Vertikalt · 2:3 (standard)', value: 'aspect-[2/3]' },
  { title: 'Vertikalt · 5:7', value: 'aspect-[5/7]' },
  { title: 'Vertikalt · 4:5 (næsten kvadratisk)', value: 'aspect-[4/5]' },
  { title: 'Kvadratisk · 1:1', value: 'aspect-square' },
  { title: 'Horisontalt · 7:5', value: 'aspect-[7/5]' },
  { title: 'Horisontalt · 4:3', value: 'aspect-[4/3]' },
]

export const illustrationerGallerySchema = defineType({
  name: 'illustrationerGallery',
  title: 'Illustrationer · Galleri',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryOrder',
      title: 'Kategori-rækkefølge (filterknapper)',
      description: 'Træk for at ændre rækkefølgen af filterknapperne på siden. Opret nye kategorier direkte herfra.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'illKategori' }] }],
    }),
    defineField({
      name: 'items',
      title: 'Billeder (hele galleriet)',
      description: 'Ét samlet gitter: skriv et nummer på et billede (eller træk) for at flytte det. Klik på et billede i listen nedenfor for at ændre format, kategorier og rotation.',
      type: 'array',
      components: { input: GalleryOrderInput },
      of: [{
        type: 'object',
        name: 'illGalleriItem',
        preview: {
          select: { image: 'image', alt: 'alt' },
          prepare({ image, alt }: any) {
            return { title: alt ?? 'Illustration', media: image }
          },
        },
        fields: [
          defineField({ name: 'image', title: 'Billede', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
          defineField({
            name: 'aspect',
            title: 'Billedformat (vertikalt/horisontalt)',
            description: 'Beskæringen følger billedets hotspot.',
            type: 'string',
            initialValue: 'aspect-[2/3]',
            options: { list: ASPECT_OPTIONS, layout: 'radio' },
          }),
          defineField({
            name: 'rotation',
            title: 'Rotation',
            type: 'number',
            initialValue: 0,
            options: { list: ROTATION_OPTIONS, layout: 'radio', direction: 'horizontal' },
          }),
          defineField({
            name: 'categories',
            title: 'Kategorier',
            description: 'Vælg én eller flere kategorier billedet skal vises under.',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'illKategori' }] }],
          }),
          defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
        ],
      }],
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Illustrationer · Galleri' }),
  },
})
