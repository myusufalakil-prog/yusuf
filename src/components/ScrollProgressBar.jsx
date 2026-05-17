import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  const spring = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(pct)
      spring.set(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [spring])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-black/30">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: spring.get() / 100,
          background: 'linear-gradient(to right, #059669, #d4922a, #ecc66d)',
          boxShadow: '0 0 10px #d4922a80, 0 0 20px #d4922a40',
        }}
        animate={{ scaleX: progress / 100 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
      {/* Glowing head dot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          left: `${progress}%`,
          background: '#ecc66d',
          boxShadow: '0 0 8px #ecc66d, 0 0 16px #d4922a',
          transform: 'translateX(-50%) translateY(-50%)',
          opacity: progress > 1 && progress < 99 ? 1 : 0,
        }}
      />
    </div>
  )
}
