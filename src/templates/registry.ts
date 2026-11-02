import type { TemplateDefinition } from './types';

export const TEMPLATES_REGISTRY: TemplateDefinition[] = [
  {
    id: 'ocean',
    name: 'Ocean Bikini Bottom',
    tagline: 'Playful, Interactive & Physics Simulation',
    description: 'Tema interaktif pantai & dasar laut bertema Bikini Bottom. Dilengkapi kanvas air interaktif, simulasi gravitasi, kepiting pantai, hiu berenang, dan animasi karakter yang hidup.',
    badge: 'Playful & Unik',
    category: 'Interactive',
    accentColor: '#0284c7',
    previewGradient: 'from-amber-200 via-sky-400 to-blue-600',
    styleTags: ['Playful', 'SpongeBob', 'Canvas Waves', 'Physics Stage', 'Day/Sunset'],
    features: [
      'Kanvas simulasi air & ombak interaktif',
      'Fisika gravitasi interaktif & draggable objects',
      'Karakter Bikini Bottom (SpongeBob, Patrick, Mr. Krabs)',
      'Dual tema: Siang cerah & Sunset senja dramatis',
      'Efek tactile card & audio-visual click'
    ],
    recommendedFor: 'Tampilan kreatif, santai, dan berkesan yang langsung menarik perhatian recruiter atau klien.'
  },
  {
    id: 'modern',
    name: 'Bauhaus Architecture',
    tagline: 'Primary Color Planes, Heavy Seams & Pure Geometric Forms',
    description: 'Desain Bauhaus otentik 1919: bidang warna off-white, hitam, merah, biru, dan kuning dengan jahitan garis tebal 4px. Dilengkapi aksi lingkaran besar dengan offset shadow keras, tipografi Host Grotesk 800-weight, kisi fitur teratur, dan ledger perbandingan arsitektural.',
    badge: 'Bauhaus 1919',
    category: 'Minimalist',
    accentColor: '#ff0000',
    previewGradient: 'from-[#ff0000] via-[#ffff00] to-[#0000ff]',
    styleTags: ['Bauhaus', 'Host Grotesk', 'Primary Planes', 'Heavy Seams', 'Hard Shadows', 'Pure Geometry'],
    features: [
      'Bidang teks off-white lebar berdampingan dengan bidang aksi merah tegas',
      'Kontrol aksi lingkaran besar dengan bayangan offset hitam keras',
      'Jahitan garis hitam kontinu 4px dan kisi kapabilitas berlapis',
      'Blok judul kuning dengan segitiga biru penyeimbang komposisi',
      'Langkah jejak karir bersebelahan dengan nomor berukuran besar',
      'Ledger horizontal perbandingan arsitektur sistem dan spesifikasi'
    ],
    recommendedFor: 'Developer, arsitek sistem, dan rekayasawan yang menginginkan identitas desain berani, tegas, fungsional murni, dan meninggalkan kesan mendalam bagi tim engineering.'
  },
  {
    id: 'retro',
    name: 'Retro',
    tagline: 'Windows Desktop, Hard Bevels & Offset Windows',
    description: 'Tema desktop retro autentik dengan susunan 12-kolom offset windows, bevel 3D keras, frame abu-abu Windows 95, reading wells putih, telemetry CRT console, dan palet retro klasik (navy, teal, kuning, abu-abu).',
    badge: 'Retro Desktop',
    category: 'Retro',
    accentColor: '#000080',
    previewGradient: 'from-[#008080] via-[#d4d4d4] to-[#000080]',
    styleTags: ['Retro Desktop', 'Hard Bevels', 'Host Grotesk', 'IBM Plex', '12-Col Grid'],
    features: [
      'Layout 12-kolom offset windows dengan furniture otentik (titlebar navy & bevel 3D)',
      'Launch window kuning cerah & facts panel monitor dengan jam Jakarta live',
      'System telemetry bar dengan live counter & ticker arrow ritmis yang responsif',
      'README.TXT notepad memoar pengembang dengan white inset reading wells',
      'Capability window dengan side panel layer filter & tombol raised key',
      'Teal field showcase proyek dengan tombol pressed selection',
      'Setup sequence berurutan untuk jejak karir & Guestbook window',
      'Dialog window kontak & taskbar desktop retro dengan folder link'
    ],
    recommendedFor: 'Developer yang menyukai estetika desktop retro klasik yang unik, berani, sarat nostalgia komputasi, dan berkesan kuat bagi recruiter.'
  },
  {
    id: 'cyber',
    name: 'Terminal',
    tagline: 'Green IBM Plex Mono, Command Gutter & Flat Black',
    description: 'Halaman continuous black dengan tipografi green IBM Plex Mono. Konten disusun sebagai perintah dan output dengan numbered command gutter, fine green rules, perataan berbasis karakter, dan tanpa kartu bersudut lengkung.',
    badge: 'Terminal Manual',
    category: 'Terminal',
    accentColor: '#66ff66',
    previewGradient: 'from-black via-[#041f17] to-black',
    styleTags: ['Terminal', 'IBM Plex Mono', 'Command Gutter', 'Flat Black', 'System Manual'],
    features: [
      'Continuous black ground (#000000) dengan tipografi green IBM Plex Mono (#66ff66)',
      'Numbered command gutter (01, 02, ...) dan layout perataan karakter monospaced',
      'Hero session manual dengan judul display dan daftar supporting facts',
      'Proyek disusun dalam baris perbandingan dengan kontrol rectangular',
      'Matriks kapabilitas teknis terstruktur dengan aturan garis tipis (#255325)',
      'Native disclosures dengan toggle plus/minus interaktif',
      'Kursor terminal tunggal berkedip diskrit pada interval 1.2 detik'
    ],
    recommendedFor: 'Full-stack engineer, systems developer, dan profesional yang menginginkan portofolio terminal otentik, presisi, dan terbaca seperti session manual komputasi.'
  }
];

