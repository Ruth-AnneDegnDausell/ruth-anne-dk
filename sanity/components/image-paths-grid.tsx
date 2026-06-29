'use client'

import React from 'react'

export function ImagePathsGrid({ value }: { value?: unknown[] }) {
  const paths = (value ?? [])
    .map((item) => (typeof item === 'string' ? item : ''))
    .filter(Boolean)

  if (!paths.length) {
    return (
      <div style={{ padding: '10px 0', fontSize: 12, color: '#999' }}>
        Ingen galleribilleder endnu — kør seed-scriptet for at hente dem fra koden.
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 6,
        marginTop: 4,
      }}
    >
      {paths.map((p, i) => (
        <div key={i} style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', background: '#f0f0f0' }}>
          <img
            src={`https://ruth-anne.dk${p}`}
            alt=""
            style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ))}
    </div>
  )
}
