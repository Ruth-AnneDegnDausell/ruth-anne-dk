'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let x = 0, y = 0
    let ringX = 0, ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }

    const animate = () => {
      dot.style.transform = `translate(${x - 5}px, ${y - 5}px)`

      ringX += (x - ringX) * 0.12
      ringY += (y - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`

      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', handleMouseOver)
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-[10px] rounded-full bg-accent mix-blend-multiply transition-[width,height,background-color] duration-[--duration-fast]"
        style={{
          width: hovering ? 10 : 10,
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-9 rounded-full border border-accent mix-blend-multiply transition-[transform,opacity] duration-[--duration-fast]"
        style={{
          opacity: hovering ? 0.6 : 0.35,
          scale: hovering ? '1.4' : '1',
        }}
      />
    </>
  )
}
