'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let x = 0, y = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'

    const handleMouseOver = (e: MouseEvent) => {
      setHovering(!!(e.target as Element).closest(interactiveSelector))
    }

    const animate = () => {
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
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
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference transition-[width,height] duration-150"
      style={{
        width: hovering ? 32 : 14,
        height: hovering ? 32 : 14,
      }}
    />
  )
}
