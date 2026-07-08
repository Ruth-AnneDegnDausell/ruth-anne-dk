'use client'

import { useEffect, useRef, useState } from 'react'

// Renders a PDF as clean canvases on a white card — no iframe, no browser
// PDF viewer chrome, no dark frame around the document.
export function PdfView({ fileUrl, title }: { fileUrl: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const container = containerRef.current
    if (!container) return

    async function render() {
      try {
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url,
        ).toString()

        const pdf = await pdfjs.getDocument({ url: fileUrl }).promise
        if (cancelled || !container) return

        container.innerHTML = ''
        const width = container.clientWidth || 600
        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        for (let n = 1; n <= pdf.numPages; n++) {
          const page = await pdf.getPage(n)
          if (cancelled) return

          const base = page.getViewport({ scale: 1 })
          const scale = (width / base.width) * dpr
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = '100%'
          canvas.style.height = 'auto'
          canvas.style.display = 'block'
          canvas.setAttribute('role', 'img')
          canvas.setAttribute('aria-label', `${title} · side ${n}`)
          container.appendChild(canvas)

          await page.render({ canvas, viewport }).promise
        }
      } catch (err) {
        console.error('PDF render error', err)
        if (!cancelled) setError(true)
      }
    }

    render()
    return () => { cancelled = true }
  }, [fileUrl, title])

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-text-3 underline-offset-2 hover:underline">
          Åbn dokumentet →
        </a>
      </div>
    )
  }

  return <div ref={containerRef} className="min-h-[300px] w-full" />
}
