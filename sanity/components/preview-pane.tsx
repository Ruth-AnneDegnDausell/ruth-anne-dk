'use client'

export function PreviewPane({ document }: { document: any }) {
  const slug = document?.displayed?.slug?.current
  if (!slug) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888', fontSize: 13 }}>
        Gem dokumentet for at se preview
      </div>
    )
  }
  return (
    <iframe
      src={`https://ruth-anne.dk/projekter/${slug}`}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Preview"
    />
  )
}
