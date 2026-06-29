'use client'

import React, { useState } from 'react'
import { useClient, useFormValue } from 'sanity'
import type { ArrayOfObjectsInputProps } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({ projectId: 'eg5pmonq', dataset: 'production' })

type GalleryItem = {
  _key: string
  path?: string
  image?: { asset?: { _ref: string }; hotspot?: unknown; crop?: unknown }
}

export function GalleryInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: '2025-06-28' })
  const documentId = useFormValue(['_id']) as string | undefined
  const items = (props.value ?? []) as GalleryItem[]
  const [loading, setLoading] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  const makeThumbnail = async (item: GalleryItem) => {
    if (!documentId) return
    setLoading(item._key)
    try {
      if (item.path) {
        await client.patch(documentId).set({ coverPath: item.path }).commit()
      } else if (item.image?.asset) {
        await client.patch(documentId).set({ cover: item.image }).commit()
      }
      setDone(item._key)
      setTimeout(() => setDone(null), 2500)
    } catch (err) {
      console.error('Thumbnail error', err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      {items.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 6,
            marginBottom: 20,
          }}
        >
          {items.map((item) => {
            const src = item.path
              ? `https://ruth-anne.dk${item.path}`
              : item.image?.asset
              ? builder.image(item.image).width(400).url()
              : null
            const isLoading = loading === item._key
            const isDone = done === item._key

            return (
              <div
                key={item._key}
                style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#e8e8e8' }}
              >
                {src ? (
                  <img
                    src={src}
                    alt=""
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: '#999',
                    }}
                  >
                    Billede
                  </div>
                )}
                <button
                  onClick={() => makeThumbnail(item)}
                  disabled={isLoading || isDone}
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 5,
                    right: 5,
                    padding: '4px 6px',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    background: isDone ? '#16a34a' : 'rgba(255,255,255,0.93)',
                    border: 'none',
                    borderRadius: 5,
                    cursor: isLoading ? 'wait' : 'pointer',
                    color: isDone ? '#fff' : '#111',
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {isDone ? '✓ Sat som thumbnail' : isLoading ? '...' : 'Gør til thumbnail'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {props.renderDefault(props)}
    </div>
  )
}
