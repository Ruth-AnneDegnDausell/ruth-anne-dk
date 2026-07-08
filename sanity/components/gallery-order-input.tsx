'use client'

import React, { useState } from 'react'
import type { ArrayOfObjectsInputProps } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'
import { distributeMasonry } from '../../components/masonry'

const builder = imageUrlBuilder({ projectId: 'eg5pmonq', dataset: 'production' })

type Item = {
  _key: string
  alt?: string
  aspect?: string
  rotation?: number
  image?: { asset?: { _ref: string }; hotspot?: unknown; crop?: unknown }
}

// 'aspect-[4/3]' → [4, 3]; 'aspect-square' → [1, 1]
const parseAspect = (aspect?: string): [number, number] => {
  if (aspect === 'aspect-square') return [1, 1]
  const m = aspect?.match(/\[(\d+)\/(\d+)\]/)
  return m ? [Number(m[1]), Number(m[2])] : [4, 3]
}

// Preview that mirrors the site's gallery: 3-column masonry, each image in
// its chosen aspect, cropped via hotspot, with rotation applied. Type a
// number on an image to move it directly to that position.
export function GalleryOrderInput(props: ArrayOfObjectsInputProps) {
  const items = (props.value ?? []) as Item[]
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const move = (fromIndex: number, raw: string) => {
    const n = parseInt(raw, 10)
    setDrafts((d) => ({ ...d, [items[fromIndex]._key]: '' }))
    if (isNaN(n)) return
    const toIndex = Math.max(0, Math.min(items.length - 1, n - 1))
    if (toIndex === fromIndex) return
    props.onItemMove({ fromIndex, toIndex })
  }

  return (
    <div>
      {items.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20 }}>
          {distributeMasonry(items, 3, (item) => {
            const [aw, ah] = parseAspect(item.aspect)
            return ah / aw
          }).map((col, c) => (
            <div key={c} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {renderTiles(col)}
            </div>
          ))}
        </div>
      )}

      {props.renderDefault(props)}
    </div>
  )

  // Række-først: billede i % 3 → kolonne, så nummereringen læses venstre mod
  // højre, række for række — samme rækkefølge som på hjemmesiden.
  function renderTiles(tiles: ReadonlyArray<readonly [Item, number]>) {
    return tiles.map(([item, i]) => {
            const [aw, ah] = parseAspect(item.aspect)
            let src: string | null = null
            if (item.image?.asset) {
              let b = builder.image(item.image).width(400).height(Math.round((400 * ah) / aw)).fit('crop')
              if ([90, 180, 270].includes(item.rotation ?? 0)) b = b.orientation(item.rotation as any)
              src = b.url()
            }
            return (
              <div
                key={item._key}
                onClick={() => props.onItemOpen([...props.path, { _key: item._key }])}
                title="Klik for at ændre format, rotation, kategorier og hotspot"
                style={{
                  position: 'relative',
                  breakInside: 'avoid',
                  marginBottom: 10,
                  borderRadius: 10,
                  overflow: 'hidden',
                  background: '#e8e8e8',
                  aspectRatio: `${aw} / ${ah}`,
                  cursor: 'pointer',
                }}
              >
                {src && (
                  <img
                    src={src}
                    alt={item.alt ?? ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
                <span
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '2px 8px', borderRadius: 6,
                    background: 'rgba(0,0,0,0.55)', color: '#fff',
                    fontSize: 9, fontWeight: 600, whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  Klik = rediger
                </span>
                <span
                  style={{
                    position: 'absolute', top: 5, left: 5,
                    padding: '1px 7px', borderRadius: 6,
                    background: 'rgba(0,0,0,0.65)', color: '#fff',
                    fontSize: 11, fontWeight: 600,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    position: 'absolute', top: 5, right: 5,
                    padding: '1px 5px', borderRadius: 6,
                    background: 'rgba(255,255,255,0.85)', color: '#333',
                    fontSize: 9, fontWeight: 600,
                  }}
                >
                  {aw}:{ah}
                </span>
                <input
                  type="number"
                  min={1}
                  max={items.length}
                  placeholder="Flyt til nr…"
                  onClick={(e) => e.stopPropagation()}
                  value={drafts[item._key] ?? ''}
                  onChange={(e) => setDrafts((d) => ({ ...d, [item._key]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      move(i, (e.target as HTMLInputElement).value)
                    }
                  }}
                  onBlur={(e) => move(i, e.target.value)}
                  style={{
                    position: 'absolute', bottom: 5, left: 5, right: 5,
                    padding: '3px 7px', fontSize: 10,
                    border: 'none', borderRadius: 6,
                    background: 'rgba(255,255,255,0.92)', color: '#111',
                  }}
                />
              </div>
            )
    })
  }
}
