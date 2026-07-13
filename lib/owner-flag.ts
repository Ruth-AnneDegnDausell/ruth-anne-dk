// Ejer-flag: markerer Ruth-Annes egne browsere, så hendes besøg ikke tælles med
// i statistikken (hverken Vercel Analytics eller Supabase page_views).
//
// Sæt flaget ved at besøge  ruth-anne.dk/?mig=1  én gang pr. browser/enhed.
// Fjern det igen med       ruth-anne.dk/?mig=0
const FLAG = 'ra-ejer'

export function isOwnerVisit(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const mig = new URLSearchParams(window.location.search).get('mig')
    if (mig === '1') localStorage.setItem(FLAG, '1')
    else if (mig === '0') localStorage.removeItem(FLAG)
    return localStorage.getItem(FLAG) === '1'
  } catch {
    return false
  }
}
