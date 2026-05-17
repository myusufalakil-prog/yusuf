import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAdmin } from '../admin/AdminContext'

function CountUp({ target, suffix, color, inView }) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Easing: ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, target])

  return (
    <span className="tabular-nums" style={{ color }}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const { stats } = useAdmin()

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 rounded-full blur-[100px] opacity-10"
          style={{ background: 'radial-gradient(ellipse, #d4922a, #059669)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="group relative glass-card rounded-sm p-6 text-center border border-white/5 hover:border-champagne-400/30 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -6, boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${stat.color}20` }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
                style={{ background: `radial-gradient(ellipse at center, ${stat.color}08 0%, transparent 70%)` }} />

              {/* Ring animation */}
              <motion.div
                className="absolute inset-0 rounded-sm pointer-events-none"
                style={{ border: `1px solid ${stat.color}00` }}
                animate={inView ? { borderColor: [`${stat.color}00`, `${stat.color}40`, `${stat.color}00`] } : {}}
                transition={{ duration: 2, delay: i * 0.2 + 0.5, repeat: Infinity, repeatDelay: 3 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="text-4xl mb-3"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 + 0.3, type: 'spring', stiffness: 200 }}
                >
                  {stat.icon}
                </motion.div>

                <div className="font-cinzel font-black text-4xl sm:text-5xl mb-2 leading-none">
                  <CountUp target={stat.value} suffix={stat.suffix} color={stat.color} inView={inView} />
                </div>

                <p className="font-inter text-xs text-ivory/40 tracking-widest uppercase">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
