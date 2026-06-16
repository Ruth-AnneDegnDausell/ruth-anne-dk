'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NAME = 'Ruth-Anne'
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-bg"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="flex gap-[0.04em]"
            >
              {NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease }}
                  className="text-4xl/none font-[300] tracking-[-0.02em] text-text sm:text-6xl/none"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease }}
            className="absolute bottom-10 left-10 right-10 h-px origin-left bg-border"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
