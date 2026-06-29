'use client'

import React from 'react'

export function CoverPathInput({ value }: { value?: string }) {
  if (!value) {
    return (
      <div style={{ padding: '8px 10px', background: 'var(--card-bg, #f3f3f3)', borderRadius: 4, fontSize: 12, color: '#999' }}>
        Ikke sat
      </div>
    )
  }
  return (
    <div>
      <img
        src={`https://ruth-anne.dk${value}`}
        alt=""
        style={{ width: '100%', maxHeight: 240, objectFit: 'cover', borderRadius: 6, display: 'block', marginBottom: 8 }}
      />
      <div style={{ fontSize: 11, color: '#888', fontFamily: 'monospace', padding: '5px 8px', background: 'var(--card-bg, #f3f3f3)', borderRadius: 4 }}>
        {value}
      </div>
    </div>
  )
}
