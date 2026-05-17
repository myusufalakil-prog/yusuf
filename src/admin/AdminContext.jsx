import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { certificates as defaultCerts } from '../data/certificates'
import { projects as defaultProjects } from '../data/projects'
import { skillCategories as defaultSkills } from '../data/skills'
import { fetchData, saveData } from './supabase'
import * as cache from './storage'

const AdminContext = createContext(null)

// ── Defaults ────────────────────────────────────────────────────────
const DEFAULT_HOME = { photo: '/profile.jpg', name: 'M. Yusuf Al Akil' }

const DEFAULT_STATS = [
  { id: 1, value: 10, suffix: '+', label: 'Projects Built',    icon: '🏗️', color: '#d4922a' },
  { id: 2, value: 2,  suffix: '+', label: 'Certificates',      icon: '🏆', color: '#059669' },
  { id: 3, value: 10, suffix: '+', label: 'Skills Learned',    icon: '⚡', color: '#61dafb' },
  { id: 4, value: 2,  suffix: '+', label: 'Tahun Coding',      icon: '🌱', color: '#8b5cf6' },
]

const DEFAULT_TIMELINE = [
  { id: 1, year: '2022', title: 'Masuk SMKN 1 Ciomas',        description: 'Memulai pendidikan di SMKN 1 Ciomas, Bogor, jurusan PPLG. Di sinilah perjalanan coding saya dimulai.', icon: '🏫', color: '#059669' },
  { id: 2, year: '2022', title: 'Belajar HTML & CSS',          description: 'Mulai mengenal dunia web development. Membuat halaman web pertama dan langsung jatuh cinta.', icon: '🌱', color: '#d4922a' },
  { id: 3, year: '2023', title: 'Menguasai JavaScript',        description: 'Menyelami JavaScript, mempelajari DOM manipulation, dan mulai membangun proyek interaktif.', icon: '⚡', color: '#f7df1e' },
  { id: 4, year: '2023', title: 'Belajar React.js',            description: 'Mulai mempelajari React.js dan jatuh cinta dengan component-based architecture.', icon: '⚛️', color: '#61dafb' },
  { id: 5, year: '2024', title: 'Coding Camp Beasiswa',        description: 'Diterima di program beasiswa Coding Camp — pengalaman intensif yang mempercepat kemampuan coding.', icon: '🎓', color: '#8b5cf6' },
  { id: 6, year: '2025', title: 'Membangun Portfolio',         description: 'Mengembangkan berbagai proyek web, membangun portfolio profesional, dan terus tumbuh sebagai developer.', icon: '🚀', color: '#d4922a' },
]

const DEFAULT_GALLERY = [
  { id: 1, src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=85', title: 'Sawah Hijau Nusantara', subtitle: 'Emerald rice fields stretching to the horizon', height: 'tall' },
  { id: 2, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85', title: 'Gunung Berkabut', subtitle: 'Misty mountain peaks at golden hour', height: 'short' },
  { id: 3, src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85', title: 'Villa Modern Elite', subtitle: 'Luxury countryside villa architecture', height: 'short' },
  { id: 4, src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=85', title: 'Danau Jernih', subtitle: 'Crystal-clear mountain lake reflection', height: 'tall' },
  { id: 5, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85', title: 'Jalan Desa Elite', subtitle: 'Verdant countryside road at dusk', height: 'short' },
  { id: 6, src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=85', title: 'Sunset Countryside', subtitle: 'Golden sunset over Swiss meadows', height: 'tall' },
]

export function AdminProvider({ children }) {
  const [panelOpen,  setPanelOpen]  = useState(false)
  const [authed,     setAuthed]     = useState(false)
  const [loading,    setLoading]    = useState(true)

  // state
  const [home,     setHomeState]     = useState(null)
  const [stats,    setStatsState]    = useState(null)
  const [aboutPhoto, setAboutPhotoState] = useState(null)
  const [aboutBio,   setAboutBioState]   = useState(null)
  const [aboutTags,  setAboutTagsState]  = useState(null)
  const [skills,   setSkillsState]   = useState(null)
  const [timeline, setTimelineState] = useState(null)
  const [certs,    setCertsState]    = useState(null)
  const [projects, setProjectsState] = useState(null)
  const [gallery,  setGalleryState]  = useState(null)

  useEffect(() => {
    async function loadAll() {
      try {
        const [homeData, statsData, aboutData, skillsData, timelineData, certsData, projsData, galleryData] = await Promise.all([
          fetchData('home'),
          fetchData('stats'),
          fetchData('about'),
          fetchData('skills'),
          fetchData('timeline'),
          fetchData('certificates'),
          fetchData('projects'),
          fetchData('gallery'),
        ])
        setHomeState(homeData && homeData.name ? homeData : cache.getHome(DEFAULT_HOME))
        setStatsState(Array.isArray(statsData) && statsData.length ? statsData : cache.getStats(DEFAULT_STATS))
        const a = aboutData || {}
        setAboutPhotoState(a.photo || cache.getAboutPhoto())
        setAboutBioState(a.bio || cache.getAboutBio())
        setAboutTagsState(a.tags || cache.getAboutTags())
        setSkillsState(Array.isArray(skillsData) && skillsData.length ? skillsData : cache.getSkills(defaultSkills))
        setTimelineState(Array.isArray(timelineData) && timelineData.length ? timelineData : cache.getTimeline(DEFAULT_TIMELINE))
        setCertsState(Array.isArray(certsData) && certsData.length ? certsData : cache.getCertificates(defaultCerts))
        setProjectsState(Array.isArray(projsData) && projsData.length ? projsData : cache.getProjects(defaultProjects))
        setGalleryState(Array.isArray(galleryData) && galleryData.length ? galleryData : cache.getGallery(DEFAULT_GALLERY))
      } catch (err) {
        console.warn('Supabase gagal, pakai cache:', err)
        setHomeState(cache.getHome(DEFAULT_HOME))
        setStatsState(cache.getStats(DEFAULT_STATS))
        setAboutPhotoState(cache.getAboutPhoto())
        setAboutBioState(cache.getAboutBio())
        setAboutTagsState(cache.getAboutTags())
        setSkillsState(cache.getSkills(defaultSkills))
        setTimelineState(cache.getTimeline(DEFAULT_TIMELINE))
        setCertsState(cache.getCertificates(defaultCerts))
        setProjectsState(cache.getProjects(defaultProjects))
        setGalleryState(cache.getGallery(DEFAULT_GALLERY))
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.ctrlKey && e.shiftKey && e.key === 'A') setPanelOpen(p => !p) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const login  = (pw) => { if (cache.checkPassword(pw)) { setAuthed(true); return true } return false }
  const logout = () => { setAuthed(false); setPanelOpen(false) }

  // ── Home ─────────────────────────────────────────────────────────
  const saveHome = useCallback(async (data) => {
    cache.setHome(data); await saveData('home', data); setHomeState(data)
  }, [])

  // ── Stats ─────────────────────────────────────────────────────────
  const saveStats = useCallback(async (arr) => {
    cache.setStats(arr); await saveData('stats', arr); setStatsState(arr)
  }, [])

  // ── About ─────────────────────────────────────────────────────────
  const saveAbout = useCallback(async (photo, bio, tags) => {
    cache.setAboutPhoto(photo); cache.setAboutBio(bio); cache.setAboutTags(tags)
    await saveData('about', { photo, bio, tags })
    setAboutPhotoState(photo); setAboutBioState(bio); setAboutTagsState(tags)
  }, [])

  // ── Skills ────────────────────────────────────────────────────────
  const saveSkills = useCallback(async (arr) => {
    cache.setSkills(arr); await saveData('skills', arr); setSkillsState(arr)
  }, [])

  // ── Timeline CRUD ─────────────────────────────────────────────────
  const persistTimeline = useCallback(async (arr) => {
    cache.setTimeline(arr); await saveData('timeline', arr); setTimelineState(arr)
  }, [])
  const addTimeline    = useCallback((item) => persistTimeline([...(timeline||[]), { ...item, id: Date.now() }]), [timeline, persistTimeline])
  const editTimeline   = useCallback((id, data) => persistTimeline((timeline||[]).map(t => t.id===id ? {...t,...data} : t)), [timeline, persistTimeline])
  const deleteTimeline = useCallback((id) => persistTimeline((timeline||[]).filter(t => t.id!==id)), [timeline, persistTimeline])

  // ── Certs CRUD ────────────────────────────────────────────────────
  const persistCerts = useCallback(async (arr) => {
    cache.setCertificates(arr); await saveData('certificates', arr); setCertsState(arr)
  }, [])
  const addCert    = useCallback((c)       => persistCerts([...(certs||[]), { ...c, id: Date.now() }]), [certs, persistCerts])
  const editCert   = useCallback((id, d)   => persistCerts((certs||[]).map(c => c.id===id ? {...c,...d} : c)), [certs, persistCerts])
  const deleteCert = useCallback((id)      => persistCerts((certs||[]).filter(c => c.id!==id)), [certs, persistCerts])

  // ── Projects CRUD ─────────────────────────────────────────────────
  const persistProjects = useCallback(async (arr) => {
    cache.setProjects(arr); await saveData('projects', arr); setProjectsState(arr)
  }, [])
  const addProject    = useCallback((p)     => persistProjects([...(projects||[]), { ...p, id: Date.now() }]), [projects, persistProjects])
  const editProject   = useCallback((id, d) => persistProjects((projects||[]).map(p => p.id===id ? {...p,...d} : p)), [projects, persistProjects])
  const deleteProject = useCallback((id)    => persistProjects((projects||[]).filter(p => p.id!==id)), [projects, persistProjects])

  // ── Gallery CRUD ──────────────────────────────────────────────────
  const persistGallery = useCallback(async (arr) => {
    cache.setGallery(arr); await saveData('gallery', arr); setGalleryState(arr)
  }, [])
  const addGalleryItem    = useCallback((g)     => persistGallery([...(gallery||[]), { ...g, id: Date.now() }]), [gallery, persistGallery])
  const editGalleryItem   = useCallback((id, d) => persistGallery((gallery||[]).map(g => g.id===id ? {...g,...d} : g)), [gallery, persistGallery])
  const deleteGalleryItem = useCallback((id)    => persistGallery((gallery||[]).filter(g => g.id!==id)), [gallery, persistGallery])

  // ── Reset ─────────────────────────────────────────────────────────
  const resetAll = useCallback(async () => {
    cache.resetAll()
    await Promise.all([
      saveData('home', DEFAULT_HOME), saveData('stats', DEFAULT_STATS),
      saveData('about', {}), saveData('skills', defaultSkills),
      saveData('timeline', DEFAULT_TIMELINE), saveData('certificates', defaultCerts),
      saveData('projects', defaultProjects), saveData('gallery', DEFAULT_GALLERY),
    ])
    setHomeState(DEFAULT_HOME); setStatsState(DEFAULT_STATS)
    setAboutPhotoState(null); setAboutBioState(null); setAboutTagsState(null)
    setSkillsState(defaultSkills); setTimelineState(DEFAULT_TIMELINE)
    setCertsState(defaultCerts); setProjectsState(defaultProjects); setGalleryState(DEFAULT_GALLERY)
  }, [])

  return (
    <AdminContext.Provider value={{
      panelOpen, setPanelOpen, authed, login, logout, loading,
      home: home || DEFAULT_HOME, saveHome,
      stats: stats || DEFAULT_STATS, saveStats,
      aboutPhoto, aboutBio, aboutTags, saveAbout,
      skills: skills || defaultSkills, saveSkills,
      timeline: timeline || DEFAULT_TIMELINE, addTimeline, editTimeline, deleteTimeline,
      certs: certs || defaultCerts, addCert, editCert, deleteCert,
      projects: projects || defaultProjects, addProject, editProject, deleteProject,
      gallery: gallery || DEFAULT_GALLERY, addGalleryItem, editGalleryItem, deleteGalleryItem,
      resetAll,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
