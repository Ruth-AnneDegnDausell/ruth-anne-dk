import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './sanity/schemas'
import { PreviewPane } from './sanity/components/preview-pane'

const singleton = (S: any, id: string, title: string, schemaType: string) =>
  S.listItem()
    .title(title)
    .child(S.editor().id(id).schemaType(schemaType).documentId(id))

export default defineConfig({
  name: 'ruth-anne-dk',
  title: 'Ruth-Anne Dausell',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Indhold')
          .items([
            S.listItem()
              .title('Projekter')
              .child(S.documentTypeList('project').title('Projekter')),
            S.divider(),
            singleton(S, 'fotografierGallery', 'Fotografier · Galleri', 'fotografierGallery'),
            singleton(S, 'illustrationerGallery', 'Illustrationer · Galleri', 'illustrationerGallery'),
            S.divider(),
            singleton(S, 'about-arbejde', 'Om mig · Arbejde', 'aboutArbejde'),
            singleton(S, 'about-privat', 'Om mig · Privat', 'aboutPrivat'),
            S.divider(),
            singleton(S, 'kontakt', 'Kontakt', 'kontakt'),
            singleton(S, 'fleksjob', 'Fleksjob', 'fleksjob'),
            singleton(S, 'cv', 'CV', 'cv'),
            singleton(S, 'udtalelser', 'Udtalelser', 'udtalelser'),
          ]),
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === 'project') {
          return S.document().views([
            S.view.form().title('Rediger'),
            S.view.component(PreviewPane).title('Preview'),
          ])
        }
        return S.document()
      },
    }),
  ],
  schema: { types: schemas },
})
