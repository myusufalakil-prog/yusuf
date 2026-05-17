import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from './AdminContext'

// ─── Utils ────────────────────────────────────────────────────────
function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result)
    r.onerror = () => rej(new Error('Gagal membaca file'))
    r.readAsDataURL(file)
  })
}

// ─── Shared Components ────────────────────────────────────────────
function ImageInput({ value, onChange, label = 'Gambar' }) {
  const fileRef = useRef()
  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try { onChange(await readFileAsDataURL(file)) } catch { alert('Gagal upload.') }
  }
  return (
    <div className="space-y-2">
      <label className="field-label">{label}</label>
      <div className="flex gap-2">
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          placeholder="URL atau upload..." className="flex-1 admin-input text-sm" />
        <button type="button" onClick={() => fileRef.current?.click()}
          className="px-3 py-2 rounded bg-amber-600/20 border border-amber-500/30 text-amber-300 text-xs hover:bg-amber-600/40 transition whitespace-nowrap">
          📁 Upload
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {value && <div className="mt-2 rounded overflow-hidden h-28 w-full bg-black/30"><img src={value} alt="" className="w-full h-full object-cover opacity-80" /></div>}
    </div>
  )
}

function SaveBtn({ onSave, saved, saving, label = 'Simpan Perubahan' }) {
  return (
    <button type="button" onClick={onSave} disabled={saving}
      className={`w-full py-2.5 rounded font-bold text-sm transition ${saved ? 'bg-emerald-600 text-white' : saving ? 'bg-amber-700 text-white/60 cursor-wait' : 'bg-amber-600 hover:bg-amber-500 text-black'}`}>
      {saved ? '✅ Tersimpan!' : saving ? '⏳ Menyimpan...' : `💾 ${label}`}
    </button>
  )
}

function ConfirmDelete({ onConfirm, onCancel, message = 'Hapus item ini?' }) {
  return (
    <motion.div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="bg-[#1a1f1c] border border-red-500/30 rounded-xl p-6 max-w-xs w-full mx-4 text-center space-y-4"
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
        <div className="text-3xl">⚠️</div>
        <p className="text-white font-semibold">{message}</p>
        <div className="flex gap-2">
          <button onClick={onConfirm} className="flex-1 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition">Hapus</button>
          <button onClick={onCancel} className="flex-1 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm transition">Batal</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Login ────────────────────────────────────────────────────────
function LoginScreen() {
  const { login } = useAdmin()
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const submit = (e) => { e.preventDefault(); if (!login(pw)) { setErr(true); setPw('') } }
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
      <div className="text-center"><div className="text-4xl mb-3">🔐</div>
        <h2 className="text-xl font-bold text-amber-300 mb-1">Admin Panel</h2>
        <p className="text-white/50 text-xs">Masukkan password untuk masuk</p>
      </div>
      <form onSubmit={submit} className="w-full max-w-xs space-y-3">
        <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false) }}
          placeholder="Password..." className={`admin-input w-full text-center ${err ? 'border-red-500' : ''}`} autoFocus />
        {err && <p className="text-red-400 text-xs text-center">Password salah!</p>}
        <button type="submit" className="w-full py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-sm transition">Masuk</button>
      </form>
      <p className="text-white/20 text-xs">Default: admin123</p>
    </div>
  )
}

// ─── HOME TAB ─────────────────────────────────────────────────────
function HomeTab() {
  const { home, saveHome } = useAdmin()
  const [photo, setPhoto] = useState(home?.photo || '/profile.jpg')
  const [name,  setName]  = useState(home?.name  || 'M. Yusuf Al Akil')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try { await saveHome({ photo, name }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    catch (e) { alert('Gagal simpan: ' + e.message) }
    finally { setSaving(false) }
  }

  return (
    <div className="space-y-5">
      <h3 className="section-title">🏠 Manage Home</h3>
      <ImageInput value={photo} onChange={setPhoto} label="Foto Profile" />
      <div>
        <label className="field-label">Nama Lengkap</label>
        <input value={name} onChange={e => setName(e.target.value)} className="admin-input w-full" placeholder="Nama kamu..." />
      </div>
      <SaveBtn onSave={save} saved={saved} saving={saving} />
    </div>
  )
}

// ─── ABOUT TAB ────────────────────────────────────────────────────
const DEFAULT_BIO = [
  'Halo! Saya M. Yusuf Al Akil, siswa SMKN 1 Ciomas jurusan PPLG (Pengembangan Perangkat Lunak dan Gim). Saya passionate dalam dunia web development dan terus belajar untuk menjadi developer yang handal.',
  'Saya berkesempatan mengikuti program beasiswa Coding Camp yang memperkaya pengalaman saya dalam dunia teknologi. Program ini membuka wawasan saya tentang industri teknologi yang sesungguhnya.',
  'Saya percaya bahwa belajar coding bukan hanya soal kode, tapi tentang memecahkan masalah nyata dan menciptakan solusi yang bermanfaat bagi banyak orang.',
]
const DEFAULT_TAGS = ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'PPLG']

function AboutTab() {
  const { aboutPhoto, aboutBio, aboutTags, saveAbout, stats, saveStats } = useAdmin()
  const [photo, setPhoto]     = useState(aboutPhoto || '')
  const [bio,   setBio]       = useState(aboutBio   || DEFAULT_BIO)
  const [tags,  setTagsState] = useState(aboutTags  || DEFAULT_TAGS)
  const [newTag, setNewTag]   = useState('')
  const [statsLocal, setStatsLocal] = useState(stats)
  const [saved, setSaved]     = useState(false)
  const [saving, setSaving]   = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      await Promise.all([saveAbout(photo || null, bio, tags), saveStats(statsLocal)])
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    } catch (e) { alert('Gagal simpan: ' + e.message) }
    finally { setSaving(false) }
  }

  const addTag = () => { const t = newTag.trim(); if (t && !tags.includes(t)) { setTagsState([...tags, t]); setNewTag('') } }
  const removeTag = (t) => setTagsState(tags.filter(x => x !== t))

  const updateStat = (id, field, val) =>
    setStatsLocal(prev => prev.map(s => s.id === id ? { ...s, [field]: field === 'value' ? Number(val) : val } : s))

  return (
    <div className="space-y-6">
      <h3 className="section-title">👤 Manage About</h3>

      {/* Stats */}
      <div className="space-y-3">
        <label className="field-label">📊 Edit Stats</label>
        {statsLocal.map(s => (
          <div key={s.id} className="bg-white/5 rounded-lg p-3 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{s.icon}</span>
              <span className="text-white/70 text-xs">{s.label}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="field-label">Angka</label>
                <input type="number" value={s.value} onChange={e => updateStat(s.id, 'value', e.target.value)}
                  className="admin-input w-full text-sm" />
              </div>
              <div>
                <label className="field-label">Label</label>
                <input value={s.label} onChange={e => updateStat(s.id, 'label', e.target.value)}
                  className="admin-input w-full text-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Foto */}
      <ImageInput value={photo} onChange={setPhoto} label="Foto About" />

      {/* Bio */}
      <div className="space-y-3">
        <label className="field-label">Bio (3 Paragraf)</label>
        {bio.map((p, i) => (
          <div key={i}>
            <p className="text-white/40 text-xs mb-1">Paragraf {i + 1}</p>
            <textarea rows={3} value={p} onChange={e => { const nb = [...bio]; nb[i] = e.target.value; setBio(nb) }}
              className="admin-input w-full text-sm resize-none" />
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="field-label">Tags Skill</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(t => (
            <span key={t} className="flex items-center gap-1 px-2 py-1 rounded bg-amber-600/20 border border-amber-500/30 text-amber-300 text-xs">
              {t}<button onClick={() => removeTag(t)} className="text-red-400 hover:text-red-300 ml-1">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()}
            placeholder="Tambah tag..." className="admin-input flex-1 text-sm" />
          <button onClick={addTag} className="px-3 py-2 rounded bg-emerald-700/40 border border-emerald-500/30 text-emerald-300 text-xs hover:bg-emerald-700/60 transition">+ Tambah</button>
        </div>
      </div>

      <SaveBtn onSave={save} saved={saved} saving={saving} />
    </div>
  )
}

// ─── SKILLS TAB ───────────────────────────────────────────────────
const SKILL_COLORS = ['#e34f26','#1572b6','#f7df1e','#61dafb','#06b6d4','#339933','#ffffff','#00758f','#47a248','#a259ff','#007acc','#d4922a','#059669','#ec4899','#8b5cf6']

function SkillsTab() {
  const { skills, saveSkills } = useAdmin()
  const [data, setData]   = useState(JSON.parse(JSON.stringify(skills)))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try { await saveSkills(data); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    catch (e) { alert('Gagal simpan: ' + e.message) }
    finally { setSaving(false) }
  }

  const updateSkill = (catIdx, skillIdx, field, val) => {
    const next = JSON.parse(JSON.stringify(data))
    next[catIdx].skills[skillIdx][field] = field === 'level' ? Math.min(100, Math.max(0, Number(val))) : val
    setData(next)
  }

  const addSkill = (catIdx) => {
    const next = JSON.parse(JSON.stringify(data))
    next[catIdx].skills.push({ name: 'Skill Baru', level: 70, color: '#d4922a' })
    setData(next)
  }

  const removeSkill = (catIdx, skillIdx) => {
    const next = JSON.parse(JSON.stringify(data))
    next[catIdx].skills.splice(skillIdx, 1)
    setData(next)
  }

  return (
    <div className="space-y-5">
      <h3 className="section-title">⚡ Manage Technical Skills</h3>
      {data.map((cat, ci) => (
        <div key={ci} className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{cat.icon}</span>
            <span className="text-amber-300 text-sm font-bold">{cat.name}</span>
          </div>
          {cat.skills.map((sk, si) => (
            <div key={si} className="bg-white/5 rounded p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="field-label">Nama Skill</label>
                  <input value={sk.name} onChange={e => updateSkill(ci, si, 'name', e.target.value)}
                    className="admin-input w-full text-sm" />
                </div>
                <div>
                  <label className="field-label">Level % (0-100)</label>
                  <input type="number" min="0" max="100" value={sk.level}
                    onChange={e => updateSkill(ci, si, 'level', e.target.value)}
                    className="admin-input w-full text-sm" />
                </div>
              </div>
              <div>
                <label className="field-label">Warna</label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {SKILL_COLORS.map(c => (
                    <button key={c} type="button" onClick={() => updateSkill(ci, si, 'color', c)}
                      className={`w-5 h-5 rounded-full transition ${sk.color === c ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
              {/* Preview bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${sk.level}%`, background: sk.color }} />
              </div>
              <button onClick={() => removeSkill(ci, si)}
                className="text-xs text-red-400 hover:text-red-300 transition">🗑️ Hapus skill ini</button>
            </div>
          ))}
          <button onClick={() => addSkill(ci)}
            className="w-full py-1.5 rounded border border-dashed border-white/20 text-white/40 hover:text-white/70 hover:border-white/40 text-xs transition">
            + Tambah skill ke {cat.name}
          </button>
        </div>
      ))}
      <SaveBtn onSave={save} saved={saved} saving={saving} />
    </div>
  )
}

// ─── TIMELINE TAB ─────────────────────────────────────────────────
const TIMELINE_ICONS = ['🏫','🌱','⚡','⚛️','🎓','🚀','💡','🏆','🌐','⭐','🎯','💻','📚','🛠️','🔥']
const TIMELINE_COLORS = ['#059669','#d4922a','#f7df1e','#61dafb','#8b5cf6','#ec4899','#14b8a6','#ef4444','#10b981','#3b82f6']

const emptyTimeline = () => ({ year: new Date().getFullYear().toString(), title: '', description: '', icon: '🚀', color: '#d4922a' })

function TimelineForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyTimeline())
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title) return alert('Judul wajib diisi.')
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="space-y-3 bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="field-label">Tahun *</label>
          <input value={form.year} onChange={e => set('year', e.target.value)} className="admin-input w-full" placeholder="2024" />
        </div>
        <div>
          <label className="field-label">Icon</label>
          <div className="flex flex-wrap gap-1 mt-1">
            {TIMELINE_ICONS.map(ic => (
              <button key={ic} type="button" onClick={() => set('icon', ic)}
                className={`w-7 h-7 rounded text-sm flex items-center justify-center transition ${form.icon === ic ? 'bg-amber-600/50 ring-1 ring-amber-400' : 'bg-white/5 hover:bg-white/10'}`}>
                {ic}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="field-label">Judul *</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} className="admin-input w-full" placeholder="Pencapaian / Event..." />
      </div>
      <div>
        <label className="field-label">Deskripsi</label>
        <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
          className="admin-input w-full resize-none text-sm" placeholder="Ceritakan lebih lanjut..." />
      </div>
      <div>
        <label className="field-label">Warna Aksen</label>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {TIMELINE_COLORS.map(c => (
            <button key={c} type="button" onClick={() => set('color', c)}
              className={`w-6 h-6 rounded-full transition ${form.color === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
              style={{ background: c }} />
          ))}
        </div>
        <input type="color" value={form.color} onChange={e => set('color', e.target.value)}
          className="mt-2 h-8 w-full rounded cursor-pointer bg-transparent border border-white/20" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-2 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-sm transition">💾 Simpan</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm transition">Batal</button>
      </div>
    </form>
  )
}

function TimelineTab() {
  const { timeline, addTimeline, editTimeline, deleteTimeline } = useAdmin()
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="section-title">📅 Manage Timeline</h3>
        <button onClick={() => setEditing('new')}
          className="px-3 py-1.5 rounded bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs hover:bg-amber-600/50 transition">
          + Tambah
        </button>
      </div>

      {editing === 'new' && (
        <TimelineForm onSave={(d) => { addTimeline(d); setEditing(null) }} onCancel={() => setEditing(null)} />
      )}

      <div className="space-y-2">
        {timeline.map((t) => (
          <div key={t.id}>
            {editing === t.id ? (
              <TimelineForm initial={t}
                onSave={(d) => { editTimeline(t.id, d); setEditing(null) }}
                onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: t.color + '20', border: `1px solid ${t.color}60` }}>
                  {t.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{t.title}</p>
                  <p style={{ color: t.color }} className="text-xs font-cinzel">{t.year}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(t.id)} className="px-2 py-1 rounded bg-blue-600/20 text-blue-300 text-xs hover:bg-blue-600/40 transition">✏️</button>
                  <button onClick={() => setConfirm(t.id)} className="px-2 py-1 rounded bg-red-600/20 text-red-300 text-xs hover:bg-red-600/40 transition">🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {timeline.length === 0 && <p className="text-white/30 text-sm text-center py-6">Belum ada timeline.</p>}
      </div>

      <AnimatePresence>
        {confirm && <ConfirmDelete message="Hapus timeline ini?" onConfirm={() => { deleteTimeline(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── CERTIFICATES TAB ─────────────────────────────────────────────
const CERT_COLORS = ['#d4922a','#059669','#f7df1e','#61dafb','#a259ff','#ec4899','#14b8a6','#ef4444']
const CERT_BADGES = ['🏆','🌐','⚡','⚛️','🎨','⭐','📜','🥇','🎖️','💡']
const emptyCert = () => ({ title: '', issuer: '', date: '', image: '', badge: '🏆', color: '#d4922a' })

function CertForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyCert())
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const submit = (e) => { e.preventDefault(); if (!form.title || !form.issuer) return alert('Judul dan Penerbit wajib.'); onSave(form) }
  return (
    <form onSubmit={submit} className="space-y-4 bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="field-label">Judul *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} className="admin-input w-full" placeholder="Nama sertifikat..." />
        </div>
        <div>
          <label className="field-label">Penerbit *</label>
          <input value={form.issuer} onChange={e => set('issuer', e.target.value)} className="admin-input w-full" placeholder="Dicoding..." />
        </div>
        <div>
          <label className="field-label">Tanggal</label>
          <input value={form.date} onChange={e => set('date', e.target.value)} className="admin-input w-full" placeholder="January 2024" />
        </div>
      </div>
      <ImageInput value={form.image} onChange={v => set('image', v)} label="Foto Sertifikat" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="field-label">Badge</label>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {CERT_BADGES.map(b => (
              <button key={b} type="button" onClick={() => set('badge', b)}
                className={`w-8 h-8 rounded text-lg flex items-center justify-center transition ${form.badge === b ? 'bg-amber-600/50 ring-1 ring-amber-400' : 'bg-white/5 hover:bg-white/10'}`}>{b}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="field-label">Warna</label>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {CERT_COLORS.map(c => (
              <button key={c} type="button" onClick={() => set('color', c)}
                className={`w-7 h-7 rounded-full transition ${form.color === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                style={{ background: c }} />
            ))}
          </div>
          <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="mt-2 h-8 w-full rounded cursor-pointer bg-transparent border border-white/20" />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-2 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-sm transition">💾 Simpan</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm transition">Batal</button>
      </div>
    </form>
  )
}

function CertsTab() {
  const { certs, addCert, editCert, deleteCert } = useAdmin()
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="section-title">🏆 Kelola Sertifikat</h3>
        <button onClick={() => setEditing('new')} className="px-3 py-1.5 rounded bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs hover:bg-amber-600/50 transition">+ Tambah</button>
      </div>
      {editing === 'new' && <CertForm onSave={(d) => { addCert(d); setEditing(null) }} onCancel={() => setEditing(null)} />}
      <div className="space-y-2">
        {certs.map((c) => (
          <div key={c.id}>
            {editing === c.id ? (
              <CertForm initial={c} onSave={(d) => { editCert(c.id, d); setEditing(null) }} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition">
                {c.image ? <img src={c.image} alt="" className="w-12 h-10 object-cover rounded opacity-80 flex-shrink-0" />
                  : <div className="w-12 h-10 rounded bg-white/10 flex items-center justify-center text-xl flex-shrink-0">{c.badge}</div>}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{c.title}</p>
                  <p className="text-white/40 text-xs truncate">{c.issuer} · {c.date}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(c.id)} className="px-2 py-1 rounded bg-blue-600/20 text-blue-300 text-xs hover:bg-blue-600/40 transition">✏️</button>
                  <button onClick={() => setConfirm(c.id)} className="px-2 py-1 rounded bg-red-600/20 text-red-300 text-xs hover:bg-red-600/40 transition">🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {certs.length === 0 && <p className="text-white/30 text-sm text-center py-6">Belum ada sertifikat.</p>}
      </div>
      <AnimatePresence>
        {confirm && <ConfirmDelete message="Hapus sertifikat ini?" onConfirm={() => { deleteCert(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── PROJECTS TAB ─────────────────────────────────────────────────
const PROJ_COLORS = ['#059669','#d4922a','#3b82f6','#8b5cf6','#ec4899','#f59e0b','#14b8a6','#f97316']
const CATEGORIES  = ['Web App','Portfolio','System','E-Commerce','Landing Page','Blog','Mobile','Other']
const emptyProj   = () => ({ title: '', description: '', image: '', tags: '', github: '', demo: '', category: 'Web App', color: '#059669' })

function ProjForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? { ...initial, tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : initial.tags } : emptyProj())
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const submit = (e) => { e.preventDefault(); if (!form.title) return alert('Judul wajib.'); onSave({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }) }
  return (
    <form onSubmit={submit} className="space-y-3 bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="col-span-2">
        <label className="field-label">Judul *</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} className="admin-input w-full" placeholder="Nama proyek..." />
      </div>
      <div>
        <label className="field-label">Deskripsi</label>
        <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} className="admin-input w-full resize-none text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="field-label">Kategori</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className="admin-input w-full">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label">Tags (koma)</label>
          <input value={form.tags} onChange={e => set('tags', e.target.value)} className="admin-input w-full" placeholder="React, Tailwind..." />
        </div>
        <div>
          <label className="field-label">GitHub</label>
          <input value={form.github} onChange={e => set('github', e.target.value)} className="admin-input w-full" placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="field-label">Demo</label>
          <input value={form.demo} onChange={e => set('demo', e.target.value)} className="admin-input w-full" placeholder="https://..." />
        </div>
      </div>
      <ImageInput value={form.image} onChange={v => set('image', v)} label="Thumbnail" />
      <div>
        <label className="field-label">Warna</label>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {PROJ_COLORS.map(c => (
            <button key={c} type="button" onClick={() => set('color', c)}
              className={`w-7 h-7 rounded-full transition ${form.color === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
              style={{ background: c }} />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-2 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-sm transition">💾 Simpan</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm transition">Batal</button>
      </div>
    </form>
  )
}

function ProjectsTab() {
  const { projects, addProject, editProject, deleteProject } = useAdmin()
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="section-title">🚀 Kelola Proyek</h3>
        <button onClick={() => setEditing('new')} className="px-3 py-1.5 rounded bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs hover:bg-amber-600/50 transition">+ Tambah</button>
      </div>
      {editing === 'new' && <ProjForm onSave={(d) => { addProject(d); setEditing(null) }} onCancel={() => setEditing(null)} />}
      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id}>
            {editing === p.id ? (
              <ProjForm initial={p} onSave={(d) => { editProject(p.id, d); setEditing(null) }} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition">
                {p.image ? <img src={p.image} alt="" className="w-12 h-10 object-cover rounded opacity-80 flex-shrink-0" />
                  : <div className="w-12 h-10 rounded bg-white/10 flex items-center justify-center text-xl flex-shrink-0">📁</div>}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{p.title}</p>
                  <p className="text-white/40 text-xs truncate">{p.category}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(p.id)} className="px-2 py-1 rounded bg-blue-600/20 text-blue-300 text-xs hover:bg-blue-600/40 transition">✏️</button>
                  <button onClick={() => setConfirm(p.id)} className="px-2 py-1 rounded bg-red-600/20 text-red-300 text-xs hover:bg-red-600/40 transition">🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {projects.length === 0 && <p className="text-white/30 text-sm text-center py-6">Belum ada proyek.</p>}
      </div>
      <AnimatePresence>
        {confirm && <ConfirmDelete message="Hapus proyek ini?" onConfirm={() => { deleteProject(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── GALLERY TAB ──────────────────────────────────────────────────
function GalleryForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { src: '', title: '', subtitle: '', height: 'short' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const submit = (e) => { e.preventDefault(); if (!form.src) return alert('Gambar wajib.'); onSave(form) }
  return (
    <form onSubmit={submit} className="space-y-3 bg-white/5 rounded-lg p-4 border border-white/10">
      <ImageInput value={form.src} onChange={v => set('src', v)} label="Gambar *" />
      <div>
        <label className="field-label">Judul</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} className="admin-input w-full" placeholder="Nama foto..." />
      </div>
      <div>
        <label className="field-label">Caption / Deskripsi</label>
        <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className="admin-input w-full" placeholder="Deskripsi singkat..." />
      </div>
      <div>
        <label className="field-label">Ukuran</label>
        <div className="flex gap-2 mt-1">
          {['short','tall'].map(h => (
            <button key={h} type="button" onClick={() => set('height', h)}
              className={`flex-1 py-2 rounded text-xs font-semibold transition ${form.height === h ? 'bg-amber-600 text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
              {h === 'short' ? '📷 Normal' : '📸 Tinggi'}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-2 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-sm transition">💾 Simpan</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm transition">Batal</button>
      </div>
    </form>
  )
}

function GalleryTab() {
  const { gallery, addGalleryItem, editGalleryItem, deleteGalleryItem } = useAdmin()
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="section-title">🖼️ Manage Nature Gallery</h3>
        <button onClick={() => setEditing('new')} className="px-3 py-1.5 rounded bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs hover:bg-amber-600/50 transition">+ Tambah</button>
      </div>
      {editing === 'new' && <GalleryForm onSave={(d) => { addGalleryItem(d); setEditing(null) }} onCancel={() => setEditing(null)} />}
      <div className="space-y-2">
        {gallery.map((g) => (
          <div key={g.id}>
            {editing === g.id ? (
              <GalleryForm initial={g} onSave={(d) => { editGalleryItem(g.id, d); setEditing(null) }} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition">
                {g.src ? <img src={g.src} alt="" className="w-14 h-10 object-cover rounded opacity-80 flex-shrink-0" />
                  : <div className="w-14 h-10 rounded bg-white/10 flex items-center justify-center flex-shrink-0 text-lg">🖼️</div>}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{g.title || '(tanpa judul)'}</p>
                  <p className="text-white/40 text-xs truncate">{g.subtitle} · {g.height === 'tall' ? 'Tinggi' : 'Normal'}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(g.id)} className="px-2 py-1 rounded bg-blue-600/20 text-blue-300 text-xs hover:bg-blue-600/40 transition">✏️</button>
                  <button onClick={() => setConfirm(g.id)} className="px-2 py-1 rounded bg-red-600/20 text-red-300 text-xs hover:bg-red-600/40 transition">🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {gallery.length === 0 && <p className="text-white/30 text-sm text-center py-6">Belum ada foto.</p>}
      </div>
      <AnimatePresence>
        {confirm && <ConfirmDelete message="Hapus foto ini?" onConfirm={() => { deleteGalleryItem(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────
function SettingsTab() {
  const { logout, resetAll } = useAdmin()
  const [newPw, setNewPw]   = useState('')
  const [saved, setSaved]   = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const savePw = () => {
    if (newPw.length < 4) return alert('Password minimal 4 karakter.')
    import('./storage').then(s => s.setPassword(newPw))
    setNewPw(''); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h3 className="section-title">⚙️ Pengaturan</h3>
      <div className="space-y-2">
        <label className="field-label">Ubah Password Admin</label>
        <div className="flex gap-2">
          <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
            placeholder="Password baru..." className="admin-input flex-1" />
          <button onClick={savePw} className="px-3 py-2 rounded bg-emerald-700/40 border border-emerald-500/30 text-emerald-300 text-sm hover:bg-emerald-700/60 transition">
            {saved ? '✅' : 'Simpan'}
          </button>
        </div>
      </div>
      <div className="border border-white/10 rounded-lg p-4 space-y-2">
        <p className="text-white/60 text-xs"><span className="text-amber-400 font-bold">Shortcut:</span> <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">Ctrl + Shift + A</kbd> untuk buka/tutup panel.</p>
        <p className="text-white/60 text-xs"><span className="text-amber-400 font-bold">Storage:</span> Data disimpan di Supabase cloud — perubahan langsung terlihat semua orang.</p>
      </div>
      <div className="border border-red-500/20 rounded-lg p-4 space-y-3">
        <p className="text-red-400 text-sm font-semibold">⚠️ Zona Berbahaya</p>
        <button onClick={() => setConfirmReset(c => !c)}
          className={`w-full py-2 rounded font-bold text-sm transition ${confirmReset ? 'bg-red-600 text-white animate-pulse' : 'bg-red-900/30 border border-red-500/30 text-red-400 hover:bg-red-900/50'}`}>
          {confirmReset ? '⚠️ Klik lagi untuk konfirmasi reset!' : '🔄 Reset Semua Data'}
        </button>
        {confirmReset && (
          <button onClick={() => { resetAll(); setConfirmReset(false) }}
            className="w-full py-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold text-sm transition">
            ✅ Ya, Reset Sekarang
          </button>
        )}
      </div>
      <button onClick={logout} className="w-full py-2.5 rounded bg-white/10 hover:bg-white/20 text-white text-sm transition border border-white/10">
        🚪 Keluar dari Admin
      </button>
    </div>
  )
}

// ─── Main Panel ───────────────────────────────────────────────────
const TABS = [
  { id: 'home',     icon: '🏠', label: 'Home'       },
  { id: 'about',    icon: '👤', label: 'About'      },
  { id: 'skills',   icon: '⚡', label: 'Skills'     },
  { id: 'timeline', icon: '📅', label: 'Timeline'   },
  { id: 'certs',    icon: '🏆', label: 'Sertifikat' },
  { id: 'projects', icon: '🚀', label: 'Proyek'     },
  { id: 'gallery',  icon: '🖼️', label: 'Gallery'   },
  { id: 'settings', icon: '⚙️', label: 'Setting'   },
]

export default function AdminPanel() {
  const { panelOpen, setPanelOpen, authed } = useAdmin()
  const [tab, setTab] = useState('home')

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          <motion.div className="fixed inset-0 z-[250] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPanelOpen(false)} />

          <motion.div
            className="fixed top-0 right-0 z-[260] h-full w-full max-w-md flex flex-col"
            style={{ background: 'linear-gradient(135deg,#0f1410 0%,#1a1f1c 100%)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛠️</span>
                <span className="text-white font-bold text-sm">Admin Panel</span>
                {authed && <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">● Aktif</span>}
              </div>
              <button onClick={() => setPanelOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center text-sm transition">×</button>
            </div>

            {!authed ? <LoginScreen /> : (
              <>
                {/* Tabs — scrollable horizontal */}
                <div className="flex border-b border-white/10 flex-shrink-0 overflow-x-auto admin-scroll-x">
                  {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                      className={`flex-shrink-0 px-3 py-3 text-xs font-semibold transition flex flex-col items-center gap-0.5 min-w-[56px] ${
                        tab === t.id ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-400/5' : 'text-white/40 hover:text-white/70'}`}>
                      <span className="text-base">{t.icon}</span>
                      <span className="text-[10px]">{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 admin-scroll">
                  <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                      {tab === 'home'     && <HomeTab />}
                      {tab === 'about'    && <AboutTab />}
                      {tab === 'skills'   && <SkillsTab />}
                      {tab === 'timeline' && <TimelineTab />}
                      {tab === 'certs'    && <CertsTab />}
                      {tab === 'projects' && <ProjectsTab />}
                      {tab === 'gallery'  && <GalleryTab />}
                      {tab === 'settings' && <SettingsTab />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
