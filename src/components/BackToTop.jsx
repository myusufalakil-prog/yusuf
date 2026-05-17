import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollTop}
          className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-sm flex items-center justify-center group"
          style={{
            background: 'linear-gradient(135deg, #059669, #047857)',
            boxShadow: '0 4px 20px rgba(5,150,105,0.4)',
            border: '1px solid rgba(212,146,42,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 8px 30px rgba(5,150,105,0.6), 0 0 20px rgba(212,146,42,0.3)',
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          {/* Arrow icon */}
          <motion.svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#f9f6ef" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <polyline points="18 15 12 9 6 15" />
          </motion.svg>

          {/* Tooltip */}
          <span className="absolute right-14 whitespace-nowrap font-cinzel text-xs tracking-widest uppercase text-ivory/70 bg-midnight/90 px-3 py-1.5 rounded-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Back to Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
