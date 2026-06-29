import { defineField, defineType } from 'sanity'
import React from 'react'

const ROTATION_OPTIONS = [
  { title: '0°', value: 0 },
  { title: '90° (med uret)', value: 90 },
  { title: '180°', value: 180 },
  { title: '270° (mod uret)', value: 270 },
]

export const fotografiItemSchema = defineType({
  name: 'fotografiItem',
  title: 'Fotografi',
  type: 'document',
  fields: [
    defineField({
      name: 'imageAsset',
      title: 'Billede',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'rotation',
      title: 'Rotation',
      type: 'number',
      initialValue: 0,
      options: { list: ROTATION_OPTIONS, layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'src',
      title: 'Billedsti (gammelt system — ignorér)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'VeloMore', value: 'velomore' },
            { title: 'BookLab', value: 'booklab' },
            { title: 'Flâneur', value: 'flaneur' },
            { title: 'Konfirmation', value: 'konfirmation' },
            { title: 'Personlige projekter', value: 'personlig' },
          ],
        },
      }],
    }),
    defineField({
      name: 'aspect',
      title: 'Billedformat (CSS-klasse)',
      description: 'Fx aspect-[4/3], aspect-[2/3], aspect-square — sættes automatisk ved upload',
      type: 'string',
      initialValue: 'aspect-[4/3]',
    }),
    defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
    defineField({ name: 'sortOrder', title: 'Rækkefølge', type: 'number' }),
  ],
  preview: {
    select: { media: 'imageAsset', src: 'src', subtitle: 'aspect' },
    prepare({ media, src, subtitle }) {
      const fallbackMedia = src
        ? React.createElement('img', { src: `https://ruth-anne.dk${src}`, style: { objectFit: 'cover', width: '100%', height: '100%' } })
        : undefined
      return { title: 'Fotografi', subtitle, media: media ?? fallbackMedia }
    },
  },
  orderings: [{ title: 'Rækkefølge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
})
