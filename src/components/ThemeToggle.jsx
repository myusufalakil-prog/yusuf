import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Dark / Light mode toggle.
 * Adds/removes class "light-mode" on <html> element.
 * Persists choice in localStorage.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true // default dark
  })

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('light-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.add('light-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <motion.button
      onClick={() => setIsDark(d => !d)}
      className="relative w-14 h-7 rounded-full border border-white/10 overflow-hidden flex items-center px-1 cursor-none"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0f0d, #1a2a20)'
          : 'linear-gradient(135deg, #e8e0d0, #d4c9b0)',
        boxShadow: isDark
          ? '0 0 15px rgba(5,150,105,0.2)'
          : '0 0 15px rgba(212,146,42,0.3)',
      }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-[10px]">🌙</span>
      <span className="absolute right-1.5 text-[10px]">☀️</span>

      {/* Thumb */}
      <motion.div
        className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center"
        animate={{ x: isDark ? 0 : 26 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          background: isDark
            ? 'radial-gradient(circle, #059669, #047857)'
            : 'radial-gradient(circle, #d4922a, #c07920)',
          boxShadow: isDark
            ? '0 0 8px #059669'
            : '0 0 8px #d4922a',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            className="text-[9px]"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? '🌙' : '☀️'}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
