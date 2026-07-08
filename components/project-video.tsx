'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Volume2, VolumeX } from 'lucide-react'

let videoIdCounter = 0

// Fælles videoafspiller:
// Computer: afspiller ved hover, pauser når musen fjernes; klik låser afspilningen fast.
// Mobil: viser startbillede + subtil playknap; tryk = afspil/pause; pauser når en
// anden video startes eller videoen scrolles næsten ud af skærmen.
// Begge: altid lydløs som udgangspunkt (lydikon slår til/fra) og en subtil
// tidslinje i bunden med en prik man kan trække i.
export function ProjectVideo({
  src,
  className = '',
  videoClassName = 'h-full w-full object-cover',
  sizeByOrientation = false,
}: {
  src: string
  className?: string
  videoClassName?: string
  /** Vertikale videoer får samme højde som høje billeder, horisontale holdes lavere */
  sizeByOrientation?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(`pv-${++videoIdCounter}`)
  const [pinned, setPinned] = useState(false)
  const [muted, setMuted] = useState(true)
  const [portrait, setPortrait] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [touchMode, setTouchMode] = useState(false)

  useEffect(() => {
    setTouchMode(window.matchMedia('(hover: none)').matches)
  }, [])

  const play = useCallback(() => {
    ref.current?.play().catch(() => {})
    // Fortæl de andre videoer at de skal pause
    window.dispatchEvent(new CustomEvent('ra-video-play', { detail: idRef.current }))
  }, [])

  const pause = useCallback(() => {
    ref.current?.pause()
  }, [])

  // Pause når en anden video starter
  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent).detail !== idRef.current) {
        ref.current?.pause()
        setPinned(false)
      }
    }
    window.addEventListener('ra-video-play', onOtherPlay)
    return () => window.removeEventListener('ra-video-play', onOtherPlay)
  }, [])

  // Pause når videoen scrolles næsten ud af skærmen
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && ref.current && !ref.current.paused) {
          ref.current.pause()
          setPinned(false)
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onEnter = useCallback(() => {
    if (!touchMode && !pinned) play()
  }, [touchMode, pinned, play])

  const onLeave = useCallback(() => {
    if (!touchMode && !pinned) pause()
  }, [touchMode, pinned, pause])

  const onClick = useCallback(() => {
    const video = ref.current
    if (!video) return
    if (touchMode) {
      // Mobil: tryk = afspil/pause
      if (video.paused) play()
      else pause()
    } else if (pinned) {
      setPinned(false)
      pause()
    } else {
      setPinned(true)
      play()
    }
  }, [touchMode, pinned, play, pause])

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted((m) => !m)
  }, [])

  // Tidslinje: klik/træk prikken for at spole
  const seekFromPointer = useCallback((clientX: number) => {
    const track = trackRef.current
    const video = ref.current
    if (!track || !video || !video.duration) return
    const rect = track.getBoundingClientRect()
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    video.currentTime = frac * video.duration
    setProgress(frac)
  }, [])

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation()
      e.preventDefault()
      seekFromPointer(e.clientX)
      const move = (ev: PointerEvent) => seekFromPointer(ev.clientX)
      const up = () => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    },
    [seekFromPointer],
  )

  const showMuteButton = touchMode ? playing : true
  const showPlayOverlay = touchMode && !playing

  return (
    <div
      ref={wrapRef}
      className={`relative cursor-pointer overflow-hidden rounded-xl bg-[oklch(91%_0_0)] ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <video
        ref={ref}
        src={encodeURI(src) + '#t=0.01'}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget
          if (v.duration) setProgress(v.currentTime / v.duration)
        }}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget
          setPortrait(v.videoHeight > v.videoWidth)
        }}
        className={videoClassName}
        style={sizeByOrientation ? { maxHeight: portrait ? 'min(78vh, 760px)' : 420 } : undefined}
      />

      {/* Subtil playknap (mobil, når videoen er pauset) */}
      {showPlayOverlay && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
          <Play size={14} strokeWidth={1.5} className="ml-0.5" fill="currentColor" />
        </span>
      )}

      {/* Lydikon: altid på computer, kun under afspilning på mobil */}
      {showMuteButton && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Slå lyd til' : 'Slå lyd fra'}
          className="absolute bottom-4 right-2.5 flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/50"
        >
          {muted ? <VolumeX size={12} strokeWidth={1.5} /> : <Volume2 size={12} strokeWidth={1.5} />}
        </button>
      )}

      {/* Tidslinje med træk-prik */}
      <div
        ref={trackRef}
        onPointerDown={onTrackPointerDown}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 h-4 cursor-ew-resize touch-none"
      >
        <div className="absolute bottom-[5px] left-2 right-2 h-[2px] rounded-full bg-white/30">
          <div className="h-full rounded-full bg-white/80" style={{ width: `${progress * 100}%` }} />
          <span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
            style={{ left: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
