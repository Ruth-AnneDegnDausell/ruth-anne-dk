'use client'

import type { ReactNode } from 'react'

// 'aspect-[4/3]' → højde/bredde-forhold; bruges til at balancere kolonnerne
export function aspectRatioOf(aspect?: string): number {
  if (aspect === 'aspect-square') return 1
  const m = aspect?.match(/\[(\d+)\/(\d+)\]/)
  return m ? Number(m[2]) / Number(m[1]) : 0.75
}

// Balanceret masonry i læseretning: billederne placeres i rækkefølge
// (venstre mod højre), og hvert billede lander i den korteste kolonne —
// så kolonnerne holder samme højde og der ikke opstår huller.
export function distributeMasonry<T>(
  items: T[],
  cols: number,
  ratio: (item: T) => number,
): Array<Array<readonly [T, number]>> {
  const columns: Array<Array<readonly [T, number]>> = Array.from({ length: cols }, () => [])
  const heights = new Array(cols).fill(0)
  items.forEach((item, i) => {
    const c = heights.indexOf(Math.min(...heights))
    columns[c].push([item, i] as const)
    heights[c] += ratio(item) + 0.06
  })
  return columns
}

function Columns<T>({ items, cols, ratio, render }: {
  items: T[]
  cols: number
  ratio: (item: T) => number
  render: (item: T, i: number) => ReactNode
}) {
  const columns = distributeMasonry(items, cols, ratio)
  return (
    <div className="flex items-start gap-3">
      {columns.map((col, c) => (
        <div key={c} className="flex min-w-0 flex-1 flex-col gap-3">
          {col.map(([item, i]) => render(item, i))}
        </div>
      ))}
    </div>
  )
}

export function Masonry<T>({ items, ratio, render }: {
  items: T[]
  ratio: (item: T) => number
  render: (item: T, i: number) => ReactNode
}) {
  return (
    <>
      <div className="sm:hidden">
        <Columns items={items} cols={2} ratio={ratio} render={render} />
      </div>
      <div className="hidden sm:block">
        <Columns items={items} cols={3} ratio={ratio} render={render} />
      </div>
    </>
  )
}
