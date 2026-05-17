import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { useAdmin } from '../admin/AdminContext'

function ProjectCard({ project, index, inView }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 12, y: x * -12 })
    setShine({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="glass-card rounded-sm overflow-hidden border-gold hover:border-champagne-400/50 transition-all duration-300 shadow-card hover:shadow-luxury">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ filter: 'brightness(0.7) saturate(1.1)' }}
          />
          {/* Shine effect */}
          {hovered && (
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, white 0%, transparent 60%)`,
              }}
            />
          )}

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="font-cinzel text-xs tracking-widest uppercase px-3 py-1 rounded-sm"
              style={{ background: `${project.color}30`, border: `1px solid ${project.color}60`, color: project.color }}
            >
              {project.category}
            </span>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-midnight/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-cinzel tracking-widest uppercase"
              style={{ background: project.color, color: '#0a0f0d' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <FiExternalLink size={14} />
              Demo
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-cinzel tracking-widest uppercase bg-white/10 text-ivory border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <FiGithub size={14} />
              Code
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-playfair text-lg font-semibold text-ivory group-hover:text-champagne-400 transition-colors">
              {project.title}
            </h3>
            <span className="font-cinzel text-xs text-ivory/30">0{project.id}</span>
          </div>
          <p className="font-inter text-xs text-ivory/50 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="font-inter text-xs px-2 py-0.5 rounded-sm text-ivory/50"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="mt-4 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
            style={{ background: `linear-gradient(to right, ${project.color}, transparent)` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [filter, setFilter] = useState('All')
  const { projects } = useAdmin()

  const categories = ['All', ...new Set(projects.map(p => p.category))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase mb-4">
            My Work
          </p>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl text-ivory mb-4">
            Featured <span className="shimmer-gold">Projects</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-champagne-400/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <div className="h-px w-16 bg-champagne-400/30" />
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-cinzel text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300 ${
                  filter === cat
                    ? 'bg-champagne-600 text-midnight'
                    : 'border border-champagne-400/20 text-ivory/50 hover:border-champagne-400/50 hover:text-ivory'
                }`}
                style={{ cursor: 'none' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex items-center gap-3 px-8 py-3.5 text-sm rounded-sm"
          >
            <FiGithub size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
