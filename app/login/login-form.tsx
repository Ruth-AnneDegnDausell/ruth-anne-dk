'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/'

  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push(from)
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Adgangskode"
        autoFocus
        className="w-full rounded-[--radius-md] border border-border bg-surface px-4 py-3 text-sm/5 text-text outline-none transition-colors duration-[--duration-fast] placeholder:text-text-3 focus:border-border-2"
      />

      {error && (
        <p className="text-xs/5 text-[color:var(--color-accent)]">
          Forkert adgangskode — prøv igen.
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full rounded-[--radius-md] bg-text px-4 py-3 text-sm/5 font-medium text-bg transition-opacity duration-[--duration-fast] hover:opacity-80 disabled:opacity-40"
      >
        {loading ? 'Åbner…' : 'Fortsæt'}
      </button>
    </form>
  )
}
