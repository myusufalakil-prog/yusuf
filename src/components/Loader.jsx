import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { config } from '../data/socials'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 600)
          return 100
        }
        return prev + 1.2
      })
    }, 30)

    const phaseTimer = setTimeout(() => setPhase(1), 800)
    const phaseTimer2 = setTimeout(() => setPhase(2), 1600)

    return () => {
      clearInterval(timer)
      clearTimeout(phaseTimer)
      clearTimeout(phaseTimer2)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #0d1a12 0%, #0a0f0d 60%, #070b09 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Sunrise glow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-0"
          style={{ background: 'radial-gradient(ellipse, #d4922a40, #05966920, transparent)' }}
          animate={{ opacity: [0, 0.6, 0.4] }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />

        {/* Fog layers */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-x-0 blur-2xl"
            style={{
              height: '120px',
              top: `${30 + i * 20}%`,
              background: `rgba(6, 95, 70, ${0.04 - i * 0.01})`,
            }}
            animate={{ x: ['-5%', '5%', '-5%'], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#d4922a' : '#059669',
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -(Math.random() * 60 + 20)],
              x: [0, (Math.random() - 0.5) * 40],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          {/* Decorative top line */}
          <motion.div
            className="h-px w-24 bg-gradient-to-r from-transparent via-champagne-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Entering text */}
          <motion.p
            className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ duration: 0.8 }}
          >
            Entering My Digital Estate
          </motion.p>

          {/* Main name */}
          <motion.h1
            className="font-cinzel font-bold text-4xl sm:text-6xl md:text-7xl text-ivory tracking-wider"
            initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <span className="shimmer-gold">{config.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-playfair italic text-emerald-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.8 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {config.title}
          </motion.p>

          {/* Progress container */}
          <motion.div
            className="w-64 sm:w-80 space-y-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Progress bar track */}
            <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #059669, #d4922a, #ecc66d)',
                  boxShadow: '0 0 10px rgba(212,146,42,0.5)',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>

            {/* Progress number */}
            <div className="flex justify-between items-center">
              <span className="font-inter text-xs text-white/20 tracking-widest uppercase">
                Loading
              </span>
              <span className="font-cinzel text-xs text-champagne-400">
                {Math.floor(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Decorative bottom line */}
          <motion.div
            className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-600 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
