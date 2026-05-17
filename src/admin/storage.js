const K = {
  aboutPhoto : 'pf_about_photo',
  aboutBio   : 'pf_about_bio',
  aboutTags  : 'pf_about_tags',
  certs      : 'pf_certificates',
  projects   : 'pf_projects',
  password   : 'pf_admin_pw',
  gallery    : 'pf_gallery',
  home       : 'pf_home',
  stats      : 'pf_stats',
  skills     : 'pf_skills',
  timeline   : 'pf_timeline',
}

const DEFAULT_PW = 'admin123'

export const getPassword   = ()    => localStorage.getItem(K.password) || DEFAULT_PW
export const setPassword   = (pw)  => localStorage.setItem(K.password, pw)
export const checkPassword = (pw)  => pw === getPassword()

export const getAboutPhoto = ()    => localStorage.getItem(K.aboutPhoto) || null
export const setAboutPhoto = (url) => localStorage.setItem(K.aboutPhoto, url)

export const getAboutBio   = ()    => { const s = localStorage.getItem(K.aboutBio); return s ? JSON.parse(s) : null }
export const setAboutBio   = (arr) => localStorage.setItem(K.aboutBio, JSON.stringify(arr))

export const getAboutTags  = ()    => { const s = localStorage.getItem(K.aboutTags); return s ? JSON.parse(s) : null }
export const setAboutTags  = (arr) => localStorage.setItem(K.aboutTags, JSON.stringify(arr))

export const getCertificates = (d) => { const s = localStorage.getItem(K.certs); return s ? JSON.parse(s) : d }
export const setCertificates = (arr) => localStorage.setItem(K.certs, JSON.stringify(arr))

export const getProjects = (d) => { const s = localStorage.getItem(K.projects); return s ? JSON.parse(s) : d }
export const setProjects = (arr) => localStorage.setItem(K.projects, JSON.stringify(arr))

export const getGallery = (d) => { const s = localStorage.getItem(K.gallery); return s ? JSON.parse(s) : d }
export const setGallery = (arr) => localStorage.setItem(K.gallery, JSON.stringify(arr))

export const getHome = (d) => { const s = localStorage.getItem(K.home); return s ? JSON.parse(s) : d }
export const setHome = (obj) => localStorage.setItem(K.home, JSON.stringify(obj))

export const getStats = (d) => { const s = localStorage.getItem(K.stats); return s ? JSON.parse(s) : d }
export const setStats = (arr) => localStorage.setItem(K.stats, JSON.stringify(arr))

export const getSkills = (d) => { const s = localStorage.getItem(K.skills); return s ? JSON.parse(s) : d }
export const setSkills = (arr) => localStorage.setItem(K.skills, JSON.stringify(arr))

export const getTimeline = (d) => { const s = localStorage.getItem(K.timeline); return s ? JSON.parse(s) : d }
export const setTimeline = (arr) => localStorage.setItem(K.timeline, JSON.stringify(arr))

export const resetAll = () => Object.values(K).forEach(k => localStorage.removeItem(k))
