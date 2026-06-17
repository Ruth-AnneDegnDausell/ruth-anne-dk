'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-bg"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="mb-4 text-[10px] font-[650] tracking-[0.3em] uppercase text-text"
          >
            Ruth-Anne
          </motion.p>

          {/* Indeterminate animated bar */}
          <div className="h-[1.5px] w-20 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full w-1/2 rounded-full bg-text"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
