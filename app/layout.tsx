import type { Metadata } from 'next'
import * as React from 'react'
import './globals.css'

// ViewTransition findes i Nexts React-canary, men mangler endnu i typerne
const ViewTransition = (React as any).ViewTransition as React.ComponentType<{ children: React.ReactNode }>
import { LangProvider } from '@/lib/lang-context'
import { CustomCursor } from '@/components/custom-cursor'
import { Loader } from '@/components/loader'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/next'
import { VisitTracker } from '@/components/visit-tracker'
import { BackToTop } from '@/components/back-to-top'
import { DevSignature } from '@/components/dev-signature'

// Delings-billedet (og:image) er Flaneur-projektets coverbillede fra Sanity.
// Ændres coveret på Flaneur i Studio, følger delings-billedet automatisk med.
async function getShareImage(): Promise<string> {
  try {
    const { sanityClient, urlFor } = await import('@/lib/sanity')
    const cover = await sanityClient.fetch(
      `*[_type == "project" && slug.current == "flaneur"][0]{cover}.cover`,
      {},
      { next: { revalidate: 300 } },
    )
    if (cover?.asset) return urlFor(cover).width(1200).height(630).fit('crop').url()
  } catch {}
  return '/mig/Forside.webp'
}

export async function generateMetadata(): Promise<Metadata> {
  const shareImage = await getShareImage()
  return {
    metadataBase: new URL('https://ruth-anne.dk'),
    title: { default: 'Ruth-Anne Dausell · Designer & Illustrator', template: '%s · Ruth-Anne Dausell' },
    description: 'Portfolio: visuel identitet, illustration, UX · UI og art direction. Uddannet fra Designskolen Kolding.',
    openGraph: {
      type: 'website',
      siteName: 'Ruth-Anne Dausell',
      locale: 'da_DK',
      title: 'Ruth-Anne Dausell · Designer & Illustrator',
      description: 'Portfolio: visuel identitet, illustration, UX · UI og art direction.',
      images: [{ url: shareImage, width: 1200, height: 630, alt: 'Ruth-Anne Dausell' }],
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <LangProvider>
          <Loader />
          <CustomCursor />
          <Sidebar />
          <div className="flex min-h-screen flex-col sm:pl-12">
            {/* pb-24 = fast, ens afstand mellem indhold og footer på alle sider */}
            <ViewTransition>
              <div className="flex-1 pb-24">{children}</div>
            </ViewTransition>
            <Footer />
          </div>
          <Analytics />
          <VisitTracker />
          <BackToTop />
          <DevSignature />
        </LangProvider>
      </body>
    </html>
  )
}
