import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { config, socials } from '../data/socials'
import { FiGithub, FiInstagram, FiCode } from 'react-icons/fi'
import { useAdmin } from '../admin/AdminContext'

// Floating particle component
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{
        y: [0, -(Math.random() * 60 + 20)],
        x: [0, (Math.random() - 0.5) * 30],
        opacity: [0, style.opacity, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 4,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })
  const { home } = useAdmin()
  const heroPhoto = home?.photo || '/profile.jpg'
  const heroName  = home?.name  || config.name

  const [particles] = useState(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      style: {
        width: Math.random() * 4 + 1,
        height: Math.random() * 4 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        background: i % 3 === 0 ? '#d4922a' : i % 3 === 1 ? '#059669' : '#f9f6ef',
        opacity: Math.random() * 0.5 + 0.2,
      },
    }))
  )

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      mouseX.set((e.clientX - centerX) / centerX * 20)
      mouseY.set((e.clientY - centerY) / centerY * 15)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background landscape image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: springX, y: springY, scale: 1.08 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=90)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35) saturate(0.9)',
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(to bottom, rgba(10,15,13,0.4) 0%, rgba(10,15,13,0.2) 40%, rgba(10,15,13,0.7) 80%, rgba(10,15,13,1) 100%)'
      }} />
      <div className="absolute inset-0 z-[1] hero-fog" />

      {/* Animated fog layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-x-0 z-[2] blur-3xl"
          style={{
            height: '200px',
            bottom: `${i * 8}%`,
            background: `rgba(6, 95, 70, ${0.06 - i * 0.015})`,
          }}
          animate={{ x: ['-3%', '3%', '-3%'], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}

      {/* Floating particles */}
      <div className="absolute inset-0 z-[3]">
        {particles.map(p => <Particle key={p.id} style={p.style} />)}
      </div>

      {/* Birds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-[4] text-white/40 text-sm"
          initial={{ x: '-10vw', y: `${20 + i * 8}%` }}
          animate={{ x: '110vw', y: [`${20 + i * 8}%`, `${15 + i * 8}%`, `${22 + i * 8}%`, `${18 + i * 8}%`] }}
          transition={{
            x: { duration: 18 + i * 6, repeat: Infinity, delay: i * 7, ease: 'linear' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 7 },
          }}
        >
          🐦
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-[5] max-w-6xl mx-auto px-6 text-center pb-28 sm:pb-24">
        {/* Profile image */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <div className="absolute inset-0 rounded-full border-2 border-champagne-400/50 animate-[pulseGold_3s_ease-in-out_infinite]" />
            <div className="absolute -inset-2 rounded-full border border-emerald-600/20" />
            <img
              src={heroPhoto}
              alt="M. Yusuf Al Akil"
              className="w-full h-full rounded-full object-cover border-2 border-champagne-400/40"
              style={{ filter: 'brightness(0.9) contrast(1.05)' }}
            />
            {/* Green status dot */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-midnight" />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Welcome to my digital estate
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-cinzel font-black text-5xl sm:text-7xl md:text-8xl text-ivory leading-tight mb-6"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {heroName.split(' ').map((word, i) => (
            <span key={i}>
              {i === 0 ? (
                <span className="text-ivory">{word} </span>
              ) : (
                <span className="shimmer-gold">{word}</span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          className="font-playfair text-xl sm:text-2xl md:text-3xl text-emerald-400 italic mb-10 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <TypeAnimation
            sequence={[
              'Web Developer', 2000,
              'Siswa PPLG SMKN 1 Ciomas', 2000,
              'Problem Solver', 2000,
              'Coding Camp Scholarship', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-400/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-400/50" />
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.a
            href="#projects"
            className="btn-gold px-8 py-3.5 text-sm rounded-sm inline-flex items-center gap-2"
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(212,146,42,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Explore Projects</span>
            <span className="text-base">→</span>
          </motion.a>

          <motion.a
            href="#contact"
            className="font-cinzel text-xs tracking-widest uppercase text-ivory/50 hover:text-ivory px-6 py-3.5 transition-colors"
            whileHover={{ scale: 1.03 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {[
            { icon: FiGithub, href: socials.github, label: 'GitHub' },
            { icon: FiInstagram, href: socials.instagram, label: 'Instagram' },
            { icon: FiCode, href: socials.dicoding, label: 'Dicoding' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/40 hover:text-champagne-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -2 }}
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="font-cinzel text-xs tracking-[0.4em] text-ivory/30 uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-champagne-400/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}