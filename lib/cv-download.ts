'use client'

import { track } from '@/lib/track'

// Downloader CV'et: den uploadede PDF fra Sanity hvis den findes,
// ellers åbnes CV-siden i printvisning hvor browseren gemmer som PDF.
export function downloadCv(pdfUrl?: string | null) {
  track('cv-download', pdfUrl ? 'pdf' : 'print')
  if (pdfUrl) {
    const a = document.createElement('a')
    a.href = pdfUrl.includes('cdn.sanity.io') ? `${pdfUrl}?dl=Ruth-Anne-Dausell-CV.pdf` : pdfUrl
    a.download = 'Ruth-Anne-Dausell-CV.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } else {
    window.open('/cv?print=1', '_blank')
  }
}

export function saveFile(url: string, name: string) {
  track('fil-download', name)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
}
