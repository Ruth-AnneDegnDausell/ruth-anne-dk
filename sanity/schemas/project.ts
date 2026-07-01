import { defineField, defineType } from 'sanity'
import React from 'react'
import { CoverPathInput } from '../components/cover-path-input'
import { GalleryInput } from '../components/gallery-input'

export const projectSchema = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  groups: [
    { name: 'tekst', title: 'Tekst' },
    { name: 'billeder', title: 'Billeder', default: true },
    { name: 'links', title: 'Links' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (dansk)',
      type: 'string',
      group: 'tekst',
      validation: r => r.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (english)',
      type: 'string',
      group: 'tekst',
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      group: 'tekst',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'tekst',
      options: {
        list: [
          { title: 'Branding', value: 'branding' },
          { title: 'Illustration', value: 'illustration' },
          { title: 'UX · UI', value: 'ux-ui' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'string',
      group: 'tekst',
    }),
    defineField({
      name: 'body',
      title: 'Beskrivelse (dansk) — ét afsnit per blok',
      type: 'array',
      group: 'tekst',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        marks: { decorators: [], annotations: [] },
      }],
    }),
    defineField({
      name: 'bodyEn',
      title: 'Description (english) — one paragraph per block',
      type: 'array',
      group: 'tekst',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        marks: { decorators: [], annotations: [] },
      }],
    }),

    // ── Billeder ──────────────────────────────────────────────────────────
    defineField({
      name: 'cover',
      title: 'Forsidebillede',
      description: 'Upload billede → klik derefter på det uploadede billede → vælg "Edit hotspot & crop" → træk den hvide cirkel til det vigtigste element (f.eks. produktet). Thumbnails beskæres automatisk til 4:3 centreret på dette punkt.',
      type: 'image',
      group: 'billeder',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverPath',
      title: 'Standard forsidebillede (fra kode)',
      description: 'Automatisk fallback fra hjemmesidens filer — bruges kun hvis intet billede er uploadet ovenfor.',
      type: 'string',
      group: 'billeder',
      readOnly: true,
      components: { input: CoverPathInput },
    }),
    defineField({
      name: 'gallery',
      title: 'Galleribilleder',
      description: 'Klik "Gør til thumbnail" på et billede for at bruge det som forsidebillede · Træk for at ændre rækkefølge · Klik skraldespand for at slette · Klik + for at uploade nyt',
      type: 'array',
      group: 'billeder',
      components: { input: GalleryInput },
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Billede',
          preview: {
            select: { path: 'path', image: 'image' },
            prepare({ path, image }: { path?: string; image?: unknown }) {
              if (image) {
                return { title: 'Uploadet billede', media: image as any }
              }
              return {
                title: path?.split('/').pop() ?? '',
                media: path
                  ? React.createElement('img', {
                      src: `https://ruth-anne.dk${path}`,
                      style: { width: '100%', height: '100%', objectFit: 'cover' },
                    })
                  : undefined,
              }
            },
          },
          fields: [
            defineField({
              name: 'path',
              type: 'string',
              title: 'Sti (automatisk)',
              readOnly: true,
              hidden: true,
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Billede',
              options: { hotspot: true },
            }),
            defineField({
              name: 'rotation',
              title: 'Rotation',
              type: 'number',
              initialValue: 0,
              options: {
                list: [
                  { title: '0°', value: 0 },
                  { title: '90°', value: 90 },
                  { title: '180°', value: 180 },
                  { title: '270°', value: 270 },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'externalLink',
      title: 'Link til website',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'desc',
      title: 'Kort beskrivelse (dansk)',
      description: 'Vises under projekttitlen på projektlisten.',
      type: 'string',
      group: 'tekst',
    }),
    defineField({
      name: 'descEn',
      title: 'Short description (english)',
      type: 'string',
      group: 'tekst',
    }),
    defineField({
      name: 'featured',
      title: 'Vis på forsiden',
      description: 'Markér de tre projekter du vil fremhæve på forsiden.',
      type: 'boolean',
      group: 'tekst',
      initialValue: false,
    }),
    defineField({
      name: 'coverPosition',
      title: 'Fokuspunkt (statisk billede)',
      description: 'Kun relevant hvis billedet ovenfor IKKE er uploadet. Skriv "X% Y%" — f.eks. "50% 0%" = top, "50% 50%" = midt, "50% 80%" = næsten bunden. For uploadede billeder sættes fokuspunktet ved at klikke på billedet ovenfor (hotspot).',
      type: 'string',
      group: 'billeder',
      placeholder: '50% 0%',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Rækkefølge (laveste tal vises først)',
      type: 'number',
      group: 'tekst',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', cover: 'cover', path: 'coverPath' },
    prepare({ title, subtitle, cover, path }) {
      const media = cover
        ? cover
        : path
        ? React.createElement('img', {
            src: `https://ruth-anne.dk${path}`,
            style: { width: '100%', height: '100%', objectFit: 'cover' },
          })
        : undefined
      return { title, subtitle, media }
    },
  },
})
