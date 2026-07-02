import { defineField, defineType } from 'sanity'

const ROTATION_OPTIONS = [
  { title: '0°', value: 0 },
  { title: '90°', value: 90 },
  { title: '180°', value: 180 },
  { title: '270°', value: 270 },
]

const ASPECT_OPTIONS = [
  { title: '4:3 (bredformat)', value: 'aspect-[4/3]' },
  { title: '3:2 (bredformat)', value: 'aspect-[3/2]' },
  { title: '16:9 (widescreen)', value: 'aspect-[16/9]' },
  { title: '1:1 (kvadrat)', value: 'aspect-square' },
  { title: '2:3 (portræt)', value: 'aspect-[2/3]' },
  { title: '5:7 (portræt)', value: 'aspect-[5/7]' },
]

export const fotografierGallerySchema = defineType({
  name: 'fotografierGallery',
  title: 'Fotografier · Galleri',
  type: 'document',
  fields: [
    defineField({
      name: 'categories',
      title: 'Kategorier',
      description: 'Træk for at ændre kategoriernes rækkefølge i filteret.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'fotGalleriKategori',
        preview: {
          select: { label: 'label', items: 'items' },
          prepare({ label, items }: any) {
            return { title: label ?? '(uden navn)', subtitle: `${items?.length ?? 0} billede(r)` }
          },
        },
        fields: [
          defineField({ name: 'slug', title: 'Slug (bruges i URL, fx "velomore")', type: 'string', validation: r => r.required() }),
          defineField({ name: 'label', title: 'Navn (dansk)', type: 'string', validation: r => r.required() }),
          defineField({ name: 'labelEn', title: 'Name (english)', type: 'string' }),
          defineField({
            name: 'items',
            title: 'Billeder',
            description: 'Træk for at ændre rækkefølgen inden for kategorien.',
            type: 'array',
            of: [{
              type: 'object',
              name: 'fotGalleriItem',
              preview: {
                select: { image: 'image', alt: 'alt' },
                prepare({ image, alt }: any) {
                  return { title: alt ?? 'Fotografi', media: image }
                },
              },
              fields: [
                defineField({ name: 'image', title: 'Billede', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
                defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
                defineField({
                  name: 'aspect',
                  title: 'Billedformat',
                  type: 'string',
                  initialValue: 'aspect-[4/3]',
                  options: { list: ASPECT_OPTIONS, layout: 'radio' },
                }),
                defineField({
                  name: 'rotation',
                  title: 'Rotation',
                  type: 'number',
                  initialValue: 0,
                  options: { list: ROTATION_OPTIONS, layout: 'radio', direction: 'horizontal' },
                }),
              ],
            }],
          }),
        ],
      }],
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Fotografier · Galleri' }),
  },
})
