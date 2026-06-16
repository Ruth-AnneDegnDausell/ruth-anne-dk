import { Suspense } from 'react'
import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <p className="mb-2 text-[11px] font-medium tracking-[0.18em] uppercase text-text-3">
          Ruth-Anne Dausell
        </p>
        <h1 className="mb-10 text-3xl/[1.1] font-[300] tracking-tight text-text">
          Adgang krævet
        </h1>
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-10 text-xs/5 text-text-3">© Ruth-Anne Dausell</p>
      </div>
    </div>
  )
}
