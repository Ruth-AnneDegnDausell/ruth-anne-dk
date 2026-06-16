import type { Metadata } from 'next'
import './globals.css'
import { CustomCursor } from '@/components/custom-cursor'
import { Loader } from '@/components/loader'
import { Sidebar } from '@/components/sidebar'

export const metadata: Metadata = {
  title: { default: 'Ruth-Anne Dausell', template: '%s — Ruth-Anne Dausell' },
  description: 'Designer, illustratør og kreativ profil',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <Loader />
        <CustomCursor />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
