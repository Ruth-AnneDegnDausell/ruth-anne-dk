'use client'

import { useCallback, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

// Fælles videoafspiller for projektsider og video-oversigten:
// - afspiller ved hover, pauser når musen fjernes
// - klik låser afspilningen fast (fortsætter uden hover); klik igen pauser
// - altid lydløs som udgangspunkt; lille lydikon slår lyden til/fra
export function ProjectVideo({
  src,
  className = '',
  videoClassName = 'h-full w-full object-cover',
}: {
  src: string
  className?: string
  videoClassName?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [pinned, setPinned] = useState(false)
  const [muted, setMuted] = useState(true)

  const onEnter = useCallback(() => {
    if (!pinned) ref.current?.play().catch(() => {})
  }, [pinned])

  const onLeave = useCallback(() => {
    if (!pinned) ref.current?.pause()
  }, [pinned])

  const onClick = useCallback(() => {
    const video = ref.current
    if (!video) return
    if (pinned) {
      setPinned(false)
      video.pause()
    } else {
      setPinned(true)
      video.play().catch(() => {})
    }
  }, [pinned])

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted(m => !m)
  }, [])

  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-xl bg-[oklch(91%_0_0)] ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <video
        ref={ref}
        src={encodeURI(src)}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className={videoClassName}
      />
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Slå lyd til' : 'Slå lyd fra'}
        className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/50"
      >
        {muted ? <VolumeX size={12} strokeWidth={1.5} /> : <Volume2 size={12} strokeWidth={1.5} />}
      </button>
    </div>
  )
}
