'use client'

import { useEffect } from 'react'

// En lille hilsen i browserens konsol - det umiskendelige tegn på
// at et site er håndkodet og ikke bygget på en skabelon.
export function DevSignature() {
  useEffect(() => {
    console.log(
      '%cRA',
      'background:#F6D98A;color:#4A1220;font-size:22px;font-weight:700;padding:6px 12px;border-radius:8px;letter-spacing:-1px',
    )
    console.log(
      '%cHåndkodet af Ruth-Anne Dausell · Next.js + Sanity + Supabase · ingen skabeloner\n%cNysgerrig? ruth-anne.dk/humans.txt',
      'color:#4A1220;font-size:12px',
      'color:#999;font-size:11px',
    )
  }, [])
  return null
}
