import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useAdmin } from '../admin/AdminContext'

function SkillBar({ name, level, color, delay, inView }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-inter text-sm text-ivory/80 group-hover:text-ivory transition-colors">{name}</span>
        <span className="font-cinzel text-xs text-champagne-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.5, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

function CircularMeter({ level, color, name }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (level / 100) * circumference
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-2 group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          {/* Progress */}
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: inView ? strokeDashoffset : circumference }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-cinzel text-sm font-bold text-champagne-400">{level}%</span>
        </div>
      </div>
      <span className="font-inter text-xs text-ivory/60 text-center">{name}</span>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { skills: skillCategories } = useAdmin()

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[150px] opacity-10 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, #d4922a, transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase mb-4">
            My Arsenal
          </p>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl text-ivory mb-4">
            Technical <span className="shimmer-gold">Skills</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-champagne-400/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <div className="h-px w-16 bg-champagne-400/30" />
          </div>
        </motion.div>

        {/* Circular meters - featured skills */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-20 glass-card rounded-sm p-10 border-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="w-full text-center font-cinzel text-xs tracking-[0.4em] text-emerald-400 uppercase mb-4">
            Core Competencies
          </p>
          {[
            { name: 'React.js', level: 85, color: '#61dafb' },
            { name: 'JavaScript', level: 88, color: '#f7df1e' },
            { name: 'Tailwind CSS', level: 90, color: '#06b6d4' },
            { name: 'HTML/CSS', level: 95, color: '#e34f26' },
            { name: 'Framer Motion', level: 80, color: '#d4922a' },
            { name: 'Figma', level: 78, color: '#a259ff' },
          ].map(skill => (
            <CircularMeter key={skill.name} {...skill} />
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              className="glass-card rounded-sm p-6 border-gold hover:border-champagne-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + catIdx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-cinzel text-sm font-semibold text-ivory tracking-wide">
                    {category.name}
                  </h3>
                  <p className="font-inter text-xs text-ivory/30">
                    {category.skills.length} skills
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    delay={0.5 + catIdx * 0.1 + skillIdx * 0.08}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
