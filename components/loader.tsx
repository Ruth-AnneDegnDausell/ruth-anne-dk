'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LETTERS = 'Ruth-Anne'.split('')

export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-bg"
        >
          <div className="flex" style={{ letterSpacing: '0.3em' }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.1, 1, 0.1] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.09,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-[10px] font-[650] uppercase text-text"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
