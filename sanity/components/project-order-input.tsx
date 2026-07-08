'use client'

import React, { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import type { ArrayOfObjectsInputProps } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({ projectId: 'eg5pmonq', dataset: 'production' })

type Ref = { _key: string; _ref: string }
type ProjectInfo = { title?: string; cover?: any; coverPath?: string }

// Grid of project covers with position numbers: type a number to move a
// project directly to that spot in the big project gallery.
export function ProjectOrderInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: '2025-06-28' })
  const refs = (props.value ?? []) as Ref[]
  const [projects, setProjects] = useState<Record<string, ProjectInfo>>({})
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  useEffect(() => {
    client
      .fetch(`*[_type == "project"]{ _id, title, cover, coverPath }`)
      .then((docs: any[]) => {
        const map: Record<string, ProjectInfo> = {}
        for (const d of docs) map[d._id.replace(/^drafts\./, '')] = d
        setProjects(map)
      })
      .catch(() => {})
  }, [client])

  const move = (fromIndex: number, raw: string) => {
    const n = parseInt(raw, 10)
    setDrafts((d) => ({ ...d, [refs[fromIndex]._key]: '' }))
    if (isNaN(n)) return
    const toIndex = Math.max(0, Math.min(refs.length - 1, n - 1))
    if (toIndex === fromIndex) return
    props.onItemMove({ fromIndex, toIndex })
  }

  return (
    <div>
      {refs.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 8,
            marginBottom: 20,
          }}
        >
          {refs.map((ref, i) => {
            const p = projects[ref._ref]
            const src = p?.cover?.asset
              ? builder.image(p.cover).width(320).height(240).fit('crop').url()
              : p?.coverPath
              ? `https://ruth-anne.dk${p.coverPath}`
              : null
            return (
              <div
                key={ref._key}
                style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#e8e8e8' }}
              >
                {src ? (
                  <img src={src} alt={p?.title ?? ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '4/3' }} />
                )}
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
                <div
                  style={{
                    position: 'absolute', bottom: 26, left: 5, right: 5,
                    fontSize: 9, fontWeight: 600, color: '#fff',
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}
                >
                  {p?.title ?? ''}
                </div>
                <input
                  type="number"
                  min={1}
                  max={refs.length}
                  placeholder="Flyt til nr…"
                  value={drafts[ref._key] ?? ''}
                  onChange={(e) => setDrafts((d) => ({ ...d, [ref._key]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      move(i, (e.target as HTMLInputElement).value)
                    }
                  }}
                  onBlur={(e) => move(i, e.target.value)}
                  style={{
                    position: 'absolute', bottom: 5, left: 5, right: 5,
                    padding: '2px 6px', fontSize: 10,
                    border: 'none', borderRadius: 5,
                    background: 'rgba(255,255,255,0.92)', color: '#111',
                  }}
                />
              </div>
            )
          })}
        </div>
      )}

      {props.renderDefault(props)}
    </div>
  )
}
