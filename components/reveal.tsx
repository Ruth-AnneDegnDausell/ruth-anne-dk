'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Subtil fade-ind når elementet scrolles ind i billedet - hver gang
// (once: false), så siden føles levende både på vej ned og op igen.
// Bygget på IntersectionObserver, så det koster ikke ydeevne.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '0px 0px -50px 0px', amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
