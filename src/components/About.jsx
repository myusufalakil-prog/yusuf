import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { config } from '../data/socials'
import { useAdmin } from '../admin/AdminContext'

const DEFAULT_PHOTO = 'public/WhatsApp Image 2026-04-27 at 17.23.58.jpeg'
const DEFAULT_BIO = [
  'Halo! Saya M. Yusuf Al Akil, siswa SMKN 1 Ciomas jurusan PPLG (Pengembangan Perangkat Lunak dan Gim). Saya passionate dalam dunia web development dan terus belajar untuk menjadi developer yang handal.',
  'Saya berkesempatan mengikuti program beasiswa Coding Camp yang memperkaya pengalaman saya dalam dunia teknologi. Program ini membuka wawasan saya tentang industri teknologi yang sesungguhnya.',
  'Saya percaya bahwa belajar coding bukan hanya soal kode, tapi tentang memecahkan masalah nyata dan menciptakan solusi yang bermanfaat bagi banyak orang.',
]
const DEFAULT_TAGS = ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'PPLG']


export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const { aboutPhoto, aboutBio, aboutTags } = useAdmin()

  const photo = aboutPhoto || DEFAULT_PHOTO
  const bio   = aboutBio   || DEFAULT_BIO
  const tags  = aboutTags  || DEFAULT_TAGS

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10"
        style={{ background: 'radial-gradient(circle, #d4922a, transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cinzel text-xs tracking-[0.5em] text-champagne-400 uppercase mb-4">
            Who I Am
          </p>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl text-ivory mb-4">
            About <span className="shimmer-gold">Me</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-champagne-400/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            <div className="h-px w-16 bg-champagne-400/30" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-stretch">
          {/* Left: Image */}
          <motion.div
            className="relative flex"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-full">
              {/* Corner decorations */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-champagne-400/40 rounded-tl-lg z-10" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-emerald-600/40 rounded-br-lg z-10" />

              <div className="relative overflow-hidden rounded-sm shadow-luxury h-full min-h-[420px]">
                <img
                  src={photo}
                  alt="About Yusuf"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.85) saturate(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/10 to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-6 left-6 glass-card-dark px-4 py-3 rounded-sm border-gold">
                  <p className="font-cinzel text-xs tracking-widest text-champagne-400 uppercase">SMKN 1 Ciomas</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-inter text-sm text-ivory/70">Jurusan PPLG</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="glass-card rounded-sm p-8 xl:p-10 border-gold w-full flex flex-col justify-center">
              <p className="font-cinzel text-xs tracking-[0.4em] text-emerald-400 uppercase mb-5">
                My Story
              </p>

              <h3 className="font-playfair text-2xl xl:text-3xl text-ivory mb-6 leading-snug">
                Siswa SMKN 1 Ciomas dengan{' '}
                <span className="italic text-champagne-400">Semangat Coding</span>
              </h3>

              <div className="space-y-4 font-inter text-ivory/65 text-sm xl:text-base leading-relaxed">
                {bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="h-px w-full bg-champagne-400/10 my-6" />

              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="font-cinzel text-xs tracking-widest uppercase px-3 py-1.5 border border-champagne-400/20 text-champagne-400/80 rounded-sm hover:border-champagne-400/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}