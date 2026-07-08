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

    // ── Færdigheder i højre side (DA) ─────────────────────
    defineField({
      name: 'skills',
      title: 'Færdigheder · højre side (DA)',
      description: 'De 4 foldbare punkter ud for Om mig. Numrene (01, 02…) sættes automatisk efter rækkefølgen.',
      type: 'array',
      group: 'da',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Titel', type: 'string' },
          { name: 'desc', title: 'Beskrivelse (vises når punktet foldes ud)', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'title', subtitle: 'desc' } },
      }],
    }),

    // ── Hero-tekst (EN) ───────────────────────────────────
    defineField({ name: 'taglineEn', title: 'Tagline (EN)', type: 'string', group: 'en' }),
    defineField({ name: 'introEn', title: 'Intro text (EN)', type: 'text', rows: 3, group: 'en' }),

    // ── Om mig-sektion (EN) ───────────────────────────────
    defineField({ name: 'aboutHeadingEn', title: 'About · Heading (EN)', type: 'text', rows: 2, group: 'en' }),
    defineField({ name: 'aboutBody1En', title: 'About · Paragraph 1 (EN)', type: 'text', rows: 4, group: 'en' }),
    defineField({ name: 'aboutBody2En', title: 'About · Paragraph 2 (EN)', type: 'text', rows: 4, group: 'en' }),
    defineField({
      name: 'contrib',
      title: 'Hvad kan jeg bidrage med · punkter (DA)',
      type: 'array',
      group: 'da',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contribEn',
      title: 'What I can contribute · items (EN)',
      type: 'array',
      group: 'en',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'skillsEn',
      title: 'Skills · right side (EN)',
      type: 'array',
      group: 'en',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'title', subtitle: 'desc' } },
      }],
    }),
  ],
  preview: { select: { media: 'heroImage' }, prepare: ({ media }) => ({ title: 'Forside', media }) },
})
