import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend, FiMail, FiMessageSquare, FiUser } from 'react-icons/fi'
import { socials, config } from '../data/socials'
import toast from 'react-hot-toast'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Isi semua field dulu ya! 😊', {
        style: { background: '#1a1a1a', color: '#f9f6ef', border: '1px solid rgba(212,146,42,0.3)' }
      })
      return
    }

    // Build WhatsApp message
    const text = `Halo Yusuf! 👋\n\nNama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`
    const encoded = encodeURIComponent(text)
    const waNumber = socials.whatsapp.replace('https://wa.me/', '')
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank')

    toast.success('Membuka WhatsApp... ✨', {
      style: { background: '#0a1a12', color: '#f9f6ef', border: '1px solid rgba(5,150,105,0.4)' }
    })
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Night countryside bg */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1444090542259-0af8fa96557e?w=1920&q=70)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          filter: 'brightness(0.15) saturate(0.8)',
        }}
      />
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(10,15,13,0.95) 0%, rgba(10,15,13,0.7) 50%, rgba(10,15,13,0.95) 100%)' }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 z-[1]"
        style={{ background: 'radial-gradient(ellipse, #d4922a, #059669, transparent)' }} />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full z-[2]"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#d4922a' : '#059669',
          }}
          animate={{ y: [0, -(Math.random() * 40 + 20)], opacity: [0, 0.6, 0] }}
          transition={{ duration: Math.random() * 5 + 3, delay: Math.random() * 4, repeat: Infinity }}
        />
      ))}

      <div className="relative z-[3] max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase mb-4">
            Let's Connect
          </p>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl text-ivory mb-4">
            Get In <span className="shimmer-gold">Touch</span>
          </h2>
          <p className="font-playfair italic text-ivory/40 text-lg">
            Have a project in mind? Let's create something remarkable together.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-champagne-400/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <div className="h-px w-16 bg-champagne-400/30" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card-dark rounded-sm p-6 border-gold">
              <p className="font-cinzel text-xs tracking-[0.4em] text-emerald-400 uppercase mb-4">Contact Info</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm glass-card border-gold flex items-center justify-center">
                    <FiMail size={14} className="text-champagne-400" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-ivory/30 uppercase tracking-wide">Email</p>
                    <p className="font-inter text-sm text-ivory/80">{socials.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card-dark rounded-sm p-6 border-gold">
              <p className="font-cinzel text-xs tracking-[0.4em] text-emerald-400 uppercase mb-4">Social Links</p>
              <div className="space-y-3">
                {[
                  { label: 'GitHub', href: socials.github, emoji: '💻' },
                  { label: 'Instagram', href: socials.instagram, emoji: '📸' },
                  { label: 'Dicoding', href: socials.dicoding, emoji: '🎓' },
                  { label: 'WhatsApp', href: socials.whatsapp, emoji: '💬' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors group"
                  >
                    <span>{s.emoji}</span>
                    <span className="font-inter text-sm group-hover:translate-x-1 transition-transform">{s.label}</span>
                    <span className="ml-auto text-champagne-400/0 group-hover:text-champagne-400/80 transition-colors">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="glass-card-dark rounded-sm p-6 border-gold">
              <p className="font-playfair italic text-ivory/50 text-sm leading-relaxed">
                "The best websites are built with passion, precision, and an eye for timeless beauty."
              </p>
              <p className="font-cinzel text-xs text-champagne-400/60 mt-3">— {config.name}</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card-dark rounded-sm p-8 border-gold space-y-6"
            >
              <div className="flex items-center gap-3">
                <p className="font-cinzel text-xs tracking-[0.4em] text-emerald-400 uppercase">
                  Send a Message
                </p>
                {/* WhatsApp badge */}
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-inter"
                  style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)', color: '#25d366' }}>
                  <span className="text-sm">💬</span> via WhatsApp
                </span>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="font-cinzel text-xs tracking-widest text-ivory/40 uppercase flex items-center gap-2">
                  <FiUser size={12} /> Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama kamu"
                  className="input-premium w-full px-4 py-3 rounded-sm text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-cinzel text-xs tracking-widest text-ivory/40 uppercase flex items-center gap-2">
                  <FiMail size={12} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="input-premium w-full px-4 py-3 rounded-sm text-sm"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="font-cinzel text-xs tracking-widest text-ivory/40 uppercase flex items-center gap-2">
                  <FiMessageSquare size={12} /> Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Ceritain project atau pertanyaan kamu..."
                  rows={5}
                  className="input-premium w-full px-4 py-3 rounded-sm text-sm resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full py-4 rounded-sm flex items-center justify-center gap-3 font-cinzel text-sm tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                }}
                whileHover={{ scale: 1.01, boxShadow: '0 6px 30px rgba(37,211,102,0.45)' }}
                whileTap={{ scale: 0.98 }}
              >
                <FiSend size={16} />
                Send via WhatsApp
              </motion.button>

              <p className="text-center font-inter text-xs text-ivory/25">
                Klik tombol di atas → WhatsApp terbuka otomatis dengan pesanmu
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}