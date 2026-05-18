import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAdmin } from '../admin/AdminContext'

function TimelineItem({ item, index, inView }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`relative flex items-center gap-0 flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      {/* Desktop content (left or right depending on index) */}
      <div className={`w-5/12 hidden md:block ${isLeft ? 'text-right pr-10' : 'text-left pl-10'}`}>
        <motion.div
          className="glass-card rounded-sm p-5 border-gold hover:border-champagne-400/40 transition-all duration-300 inline-block text-left"
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{item.icon}</span>
            <span className="font-cinzel text-xs tracking-widest" style={{ color: item.color }}>
              {item.year}
            </span>
          </div>
          <h3 className="font-playfair text-lg font-semibold text-ivory mb-2">{item.title}</h3>
          <p className="font-inter text-xs text-ivory/50 leading-relaxed">{item.description}</p>
          <div className="mt-3 h-px w-0 hover:w-full transition-all duration-500"
            style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />
        </motion.div>
      </div>

      {/* Center dot — fixed 48px wide on mobile so it centers on the left-6 line */}
      <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 md:w-2/12">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl"
          style={{
            background: `radial-gradient(circle, ${item.color}30, ${item.color}10)`,
            border: `2px solid ${item.color}60`,
            boxShadow: `0 0 20px ${item.color}30`,
          }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          whileHover={{ scale: 1.2 }}
        >
          {item.icon}
        </motion.div>
      </div>

      {/* Desktop right empty space */}
      <div className="w-5/12 hidden md:block" />

      {/* Mobile card — always to the right of the dot */}
      <div className="md:hidden flex-1 pl-3">
        <motion.div
          className="glass-card rounded-sm p-4 border-gold"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-cinzel text-xs tracking-widest" style={{ color: item.color }}>{item.year}</span>
          </div>
          <h3 className="font-playfair text-sm font-semibold text-ivory mb-1">{item.title}</h3>
          <p className="font-inter text-xs text-ivory/50 leading-relaxed">{item.description}</p>
          <div className="mt-2 h-px"
            style={{ background: `linear-gradient(to right, ${item.color}60, transparent)` }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const { timeline } = useAdmin()

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full blur-[120px] opacity-10"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase mb-4">
            The Journey
          </p>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl text-ivory mb-4">
            My <span className="shimmer-gold">Timeline</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-champagne-400/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <div className="h-px w-16 bg-champagne-400/30" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, #059669, #d4922a, #059669, transparent)' }} />

          {/* Mobile line */}
          <div className="absolute left-6 top-0 bottom-0 w-px md:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent, #059669, #d4922a, transparent)' }} />

          <div className="space-y-8 md:space-y-12">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}