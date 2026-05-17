import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiX, FiZoomIn } from 'react-icons/fi'
import { useAdmin } from '../admin/AdminContext'

function CertModal({ cert, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="modal-backdrop absolute inset-0" />

      <motion.div
        className="relative z-10 max-w-2xl w-full glass-card-dark rounded-sm overflow-hidden"
        style={{ border: `1px solid ${cert.color}40` }}
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-ivory/60 hover:text-ivory transition-colors p-2"
          style={{ cursor: 'none' }}
        >
          <FiX size={20} />
        </button>

        {/* Image */}
        <div className="relative h-56 sm:h-72">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) saturate(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
          <div className="absolute bottom-6 left-6 text-4xl">{cert.badge}</div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-2" style={{ color: cert.color }}>
            Certificate of Achievement
          </p>
          <h3 className="font-playfair text-2xl text-ivory mb-2">{cert.title}</h3>
          <p className="font-inter text-ivory/50 text-sm mb-1">Issued by <span className="text-ivory/80">{cert.issuer}</span></p>
          <p className="font-inter text-ivory/40 text-xs">{cert.date}</p>

          <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${cert.color}40, transparent)` }} />
          <p className="font-cinzel text-xs tracking-widest uppercase text-ivory/30 mt-4">
            Verified Achievement
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certificates() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selected, setSelected] = useState(null)
  const { certs: certificates } = useAdmin()

  return (
    <section id="certificates" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-[120px] opacity-10"
        style={{ background: 'radial-gradient(circle, #d4922a, transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase mb-4">
            Achievements
          </p>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl text-ivory mb-4">
            Certificates &amp; <span className="shimmer-gold">Awards</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-champagne-400/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <div className="h-px w-16 bg-champagne-400/30" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="relative group cursor-pointer overflow-hidden rounded-sm"
              style={{ border: `1px solid ${cert.color}25` }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 20px ${cert.color}20` }}
              onClick={() => setSelected(cert)}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: 'brightness(0.6) saturate(1.1)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, ${cert.color}20, rgba(10,15,13,0.9))` }}
                />

                {/* Badge */}
                <div className="absolute top-4 right-4 text-3xl">{cert.badge}</div>

                {/* Zoom icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full glass-card-dark flex items-center justify-center">
                    <FiZoomIn className="text-ivory" size={20} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 glass-card-dark">
                <p
                  className="font-cinzel text-xs tracking-[0.3em] uppercase mb-1"
                  style={{ color: cert.color }}
                >
                  {cert.issuer}
                </p>
                <h3 className="font-playfair text-base font-semibold text-ivory mb-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="font-inter text-xs text-ivory/35">{cert.date}</p>

                {/* Gold border bottom */}
                <div
                  className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(to right, ${cert.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
