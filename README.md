# 🌿 M. Yusuf Al Akil — Portfolio

Portfolio pribadi M. Yusuf Al Akil, siswa SMKN 1 Ciomas jurusan PPLG dan peserta program Beasiswa Coding Camp.

**Live:** https://yusufalakil.vercel.app

---

## 🚀 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Animasi | Framer Motion |
| Icons | React Icons |
| Email | EmailJS |
| Typing | react-type-animation |
| Intersection | react-intersection-observer |
| Notifications | react-hot-toast |

---

## 📁 Struktur Proyek

```
portfolio/
├── public/
│   └── favicon.svg          # Favicon SVG custom
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigasi + ThemeToggle
│   │   ├── Hero.jsx          # Landing section
│   │   ├── About.jsx         # Tentang saya
│   │   ├── Stats.jsx         # Animated counter stats
│   │   ├── Skills.jsx        # Skill bars
│   │   ├── Projects.jsx      # Galeri proyek
│   │   ├── Certificates.jsx  # Sertifikat
│   │   ├── Timeline.jsx      # Perjalanan coding
│   │   ├── Gallery.jsx       # Galeri foto
│   │   ├── Contact.jsx       # Form kontak EmailJS
│   │   ├── Footer.jsx        # Footer
│   │   ├── Loader.jsx        # Splash screen
│   │   ├── CustomCursor.jsx  # Cursor custom
│   │   ├── WhatsAppButton.jsx# Tombol WA floating
│   │   ├── ScrollProgressBar.jsx # Progress bar scroll
│   │   ├── BackToTop.jsx     # Tombol back to top
│   │   ├── LeafFall.jsx      # Animasi daun jatuh
│   │   ├── ThemeToggle.jsx   # Dark/Light mode
│   │   ├── ErrorBoundary.jsx # Error handling
│   │   └── SkeletonImage.jsx # Image skeleton loader
│   ├── data/
│   │   ├── socials.js        # ⚙️ Konfigurasi utama (nama, sosmed, EmailJS)
│   │   ├── skills.js         # Data skill
│   │   ├── projects.js       # Data proyek
│   │   └── certificates.js  # Data sertifikat
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html               # SEO meta tags lengkap
└── tailwind.config.js
```

---

## ⚙️ Setup & Konfigurasi

### 1. Clone & Install

```bash
git clone https://github.com/yusufalakil/portfolio.git
cd portfolio
npm install
npm run dev
```

### 2. Konfigurasi Identitas (`src/data/socials.js`)

```js
export const socials = {
  github:    "https://github.com/USERNAME_KAMU",
  instagram: "https://instagram.com/USERNAME_KAMU",
  linkedin:  "https://linkedin.com/in/USERNAME_KAMU",
  whatsapp:  "https://wa.me/628XXXXXXXXXX",  // format internasional
  email:     "emailkamu@gmail.com",
}

export const config = {
  name:      "M. Yusuf Al Akil",
  nameShort: "Y.A.",
  title:     "Web Developer",
  emailjs: {
    serviceId:  "YOUR_SERVICE_ID",   // ← isi dari EmailJS
    templateId: "YOUR_TEMPLATE_ID",  // ← isi dari EmailJS
    publicKey:  "YOUR_PUBLIC_KEY",   // ← isi dari EmailJS
  },
}
```

---

## 📧 Konfigurasi EmailJS (Step-by-Step)

EmailJS digunakan agar form kontak bisa mengirim email **tanpa backend**.

### Langkah 1 — Daftar Akun
1. Buka https://www.emailjs.com
2. Klik **Sign Up** → daftar gratis (free tier: 200 email/bulan)

### Langkah 2 — Buat Email Service
1. Di dashboard, klik **Email Services** → **Add New Service**
2. Pilih provider: **Gmail** (direkomendasikan)
3. Klik **Connect Account** → login dengan Gmail kamu
4. Beri nama service (contoh: `portfolio_service`)
5. Salin **Service ID** (contoh: `service_abc123`) → simpan untuk nanti

### Langkah 3 — Buat Email Template
1. Klik **Email Templates** → **Create New Template**
2. Isi template seperti ini:

   **To Email:** `emailkamu@gmail.com`
   
   **Subject:** `Pesan Baru dari Portfolio — {{from_name}}`
   
   **Body:**
   ```
   Halo Yusuf,

   Kamu mendapat pesan baru dari portfolio-mu:

   Nama    : {{from_name}}
   Email   : {{reply_to}}
   Pesan   : {{message}}

   ---
   Dikirim via portfolio yusufalakil.vercel.app
   ```

3. Salin **Template ID** (contoh: `template_xyz789`) → simpan

### Langkah 4 — Dapatkan Public Key
1. Klik ikon profil kanan atas → **Account**
2. Di tab **General** → salin **Public Key** (contoh: `abc-XYZ123`)

### Langkah 5 — Isi ke `socials.js`
```js
emailjs: {
  serviceId:  "service_abc123",   // dari Langkah 2
  templateId: "template_xyz789",  // dari Langkah 3
  publicKey:  "abc-XYZ123",       // dari Langkah 4
},
```

### Langkah 6 — Test
Jalankan `npm run dev`, buka halaman Contact, isi form, dan kirim. Cek inbox Gmail-mu.

---

## 🔧 Kustomisasi Konten

### Tambah / Edit Proyek (`src/data/projects.js`)
```js
{
  id: 11,
  title: "Nama Proyekmu",
  description: "Deskripsi singkat proyek.",
  image: "https://link-gambar.com/img.jpg",
  tags: ["React", "Tailwind"],
  github: "https://github.com/kamu/repo",
  demo: "https://demo.com",
  category: "Web App",
  color: "#059669",
}
```

### Tambah / Edit Skill (`src/data/skills.js`)
```js
{ name: "NamaSkill", level: 80, color: "#warna" }
```

### Update Timeline (`src/components/Timeline.jsx`)
Edit array `timeline` di bagian atas file.

---

## 🌐 Deploy ke Vercel

```bash
npm run build   # Build production

# Lalu upload folder dist/ ke Vercel, atau:
npx vercel      # Deploy via CLI
```

**Environment Variables** tidak diperlukan — semua config ada di `socials.js`.

> ⚠️ Sebelum deploy, pastikan update URL canonical di `index.html` dan `og:image` dengan URL domain kamu yang sebenarnya.

---

## 🎨 Fitur

| Fitur | Status |
|-------|--------|
| Dark / Light Mode | ✅ |
| Scroll Progress Bar | ✅ |
| Back to Top Button | ✅ |
| Animasi Daun Jatuh | ✅ |
| Animated Stats Counter | ✅ |
| SEO + Open Graph + JSON-LD | ✅ |
| Error Boundary | ✅ |
| Image Skeleton Loader | ✅ |
| Custom Cursor | ✅ |
| WhatsApp Float Button | ✅ |
| EmailJS Contact Form | ✅ |
| Responsive Mobile | ✅ |

---

## 📄 Lisensi

MIT — bebas digunakan dan dimodifikasi.

---

*Dibuat dengan ❤️ oleh M. Yusuf Al Akil — SMKN 1 Ciomas, Jurusan PPLG*
