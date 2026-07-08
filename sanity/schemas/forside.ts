import { defineField, defineType } from 'sanity'

export const forsideSchema = defineType({
  name: 'forside',
  title: 'Forside',
  type: 'document',
  groups: [
    { name: 'da', title: 'Dansk', default: true },
    { name: 'en', title: 'English' },
    { name: 'billede', title: 'Foto' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero-foto',
      description: 'Det store forsidebillede · anbefalet min. 1400 × 1600 px',
      type: 'image',
      group: 'billede',
      options: { hotspot: true },
    }),

    // ── Hero-tekst (DA) ───────────────────────────────────
    defineField({ name: 'tagline', title: 'Tagline (DA)', type: 'string', group: 'da' }),
    defineField({ name: 'intro', title: 'Intro-tekst (DA)', type: 'text', rows: 3, group: 'da' }),

    // ── Om mig-sektion (DA) ───────────────────────────────
    defineField({ name: 'aboutHeading', title: 'Om mig · Overskrift (DA)', type: 'text', rows: 2, group: 'da' }),
    defineField({ name: 'aboutBody1', title: 'Om mig · Afsnit 1 (DA)', type: 'text', rows: 4, group: 'da' }),
    defineField({ name: 'aboutBody2', title: 'Om mig · Afsnit 2 (DA)', type: 'text', rows: 4, group: 'da' }),

    // ── Hero-tekst (EN) ───────────────────────────────────
    defineField({ name: 'taglineEn', title: 'Tagline (EN)', type: 'string', group: 'en' }),
    defineField({ name: 'introEn', title: 'Intro text (EN)', type: 'text', rows: 3, group: 'en' }),

    // ── Om mig-sektion (EN) ───────────────────────────────
    defineField({ name: 'aboutHeadingEn', title: 'About · Heading (EN)', type: 'text', rows: 2, group: 'en' }),
    defineField({ name: 'aboutBody1En', title: 'About · Paragraph 1 (EN)', type: 'text', rows: 4, group: 'en' }),
    defineField({ name: 'aboutBody2En', title: 'About · Paragraph 2 (EN)', type: 'text', rows: 4, group: 'en' }),
  ],
  preview: { select: { media: 'heroImage' }, prepare: ({ media }) => ({ title: 'Forside', media }) },
})
