import { motion } from 'framer-motion'
import { FiGithub, FiInstagram, FiLinkedin, FiHeart } from 'react-icons/fi'
import { config, socials } from '../data/socials'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-champagne-400/10 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, rgba(10,15,13,0) 0%, rgba(10,15,13,0.8) 100%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-cinzel font-bold text-3xl sm:text-4xl">
              <span className="shimmer-gold">{config.name}</span>
            </h3>
            <p className="font-playfair italic text-ivory/40 mt-2">{config.title}</p>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-20 bg-champagne-400/20" />
            <div className="w-1 h-1 rounded-full bg-champagne-400/40" />
            <div className="h-px w-20 bg-champagne-400/20" />
          </div>

          {/* Quote */}
          <motion.p
            className="font-playfair italic text-ivory/35 text-base sm:text-lg max-w-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            "Excellence is not a skill — it is an attitude, a commitment to crafting beauty from code."
          </motion.p>

          {/* Social */}
          <div className="flex items-center gap-6">
            {[
              { icon: FiGithub, href: socials.github, label: 'GitHub' },
              { icon: FiInstagram, href: socials.instagram, label: 'Instagram' },
              { icon: FiLinkedin, href: socials.linkedin, label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-sm glass-card border-gold flex items-center justify-center text-ivory/40 hover:text-champagne-400 hover:border-champagne-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-cinzel text-xs tracking-widest uppercase text-ivory/30 hover:text-champagne-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="h-px w-full bg-champagne-400/10" />
          <div className="flex flex-col sm:flex-row items-center gap-2 text-ivory/25 text-xs font-inter">
            <span>© {year} {config.name}. All rights reserved.</span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-1">
              Built with <FiHeart size={12} className="text-rose-500" /> and passion
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
