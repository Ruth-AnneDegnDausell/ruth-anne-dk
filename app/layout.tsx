import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/lang-context'
import { CustomCursor } from '@/components/custom-cursor'
import { Loader } from '@/components/loader'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/next'
import { VisitTracker } from '@/components/visit-tracker'

export const metadata: Metadata = {
  metadataBase: new URL('https://ruth-anne.dk'),
  title: { default: 'Ruth-Anne Dausell · Designer & Illustratør', template: '%s · Ruth-Anne Dausell' },
  description: 'Portfolio: visuel identitet, illustration, UX · UI og art direction. Uddannet fra Designskolen Kolding.',
  openGraph: {
    type: 'website',
    siteName: 'Ruth-Anne Dausell',
    locale: 'da_DK',
    title: 'Ruth-Anne Dausell · Designer & Illustratør',
    description: 'Portfolio: visuel identitet, illustration, UX · UI og art direction.',
    images: [{ url: '/mig/Forside.webp', width: 1200, height: 1500, alt: 'Ruth-Anne Dausell' }],
  },
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
            <div className="flex-1 pb-24">{children}</div>
            <Footer />
          </div>
          <Analytics />
          <VisitTracker />
        </LangProvider>
      </body>
    </html>
  )
}
