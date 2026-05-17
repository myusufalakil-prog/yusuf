import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgressBar from './components/ScrollProgressBar'
import BackToTop from './components/BackToTop'
import LeafFall from './components/LeafFall'
import ErrorBoundary from './components/ErrorBoundary'

import { AdminProvider } from './admin/AdminContext'
import AdminPanel from './admin/AdminPanel'
import { useAdmin } from './admin/AdminContext'

function PortfolioApp() {
  const [loading, setLoading] = useState(true)
  const { loading: dbLoading } = useAdmin()

  return (
    <>
      <Toaster position="top-center" />
      <ScrollProgressBar />
      <CustomCursor />

      {/* Admin Panel — buka dengan Ctrl+Shift+A */}
      <AdminPanel />

      {/* Loading spinner saat ambil data dari Supabase */}
      {dbLoading && (
        <div className="fixed inset-0 z-[400] bg-[#0a0f0d] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto" />
            <p className="font-cinzel text-xs text-white/40 tracking-widest uppercase">Loading...</p>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <LeafFall />
            <Navbar />
            <main>
              <ErrorBoundary fallbackMessage="Hero section encountered an error."><Hero /></ErrorBoundary>
              <ErrorBoundary><About /></ErrorBoundary>
              <ErrorBoundary><Stats /></ErrorBoundary>
              <ErrorBoundary><Skills /></ErrorBoundary>
              <ErrorBoundary><Projects /></ErrorBoundary>
              <ErrorBoundary><Certificates /></ErrorBoundary>
              <ErrorBoundary><Timeline /></ErrorBoundary>
              <ErrorBoundary><Gallery /></ErrorBoundary>
              <ErrorBoundary><Contact /></ErrorBoundary>
            </main>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <PortfolioApp />
    </AdminProvider>
  )
}
