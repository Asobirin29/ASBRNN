import type { ProfileData, Project, TechItem, ExperienceItem, TemplateId } from '../types/portfolio';

export const selectedTemplate: TemplateId = "modern";

// Dinaikkan otomatis setiap kali template disimpan permanen ke kode (save-to-code).
// Dipakai agar perangkat lain (mis. HP) ikut update tema saat deployment terbaru dimuat.
export const templateRevision = 1793800841060;

export const profileData: ProfileData = {
  "name": "Ahmad Sobirin",
  "tagline": "Full-Stack & Mobile Developer",
  "education": "SISTEM INFORMASI",
  "status": "Available for Engineering Roles & Projects",
  "bio": "Developer yang berfokus pada pembangunan platform web modern, aplikasi mobile, dan arsitektur sistem yang skalabel, efisien, dan andal.",
  "experienceStart": "Active Developer",
  "avatarUrl": "/avatar.svg",
  "interests": [
    "Web Architecture",
    "Mobile Systems",
    "Linux Ecosystem",
    "Software Reliability",
    "Reactive Interfaces"
  ],
  "contact": {
    "email": "ahmedsobirin950@gmail.com",
    "github": "https://github.com/Asobirin29",
    "linkedin": "https://linkedin.com",
    "location": "Indonesia"
  }
};

export const techStackData: TechItem[] = [
  {
    "name": "TypeScript",
    "category": "frontend",
    "layer": "client",
    "iconKey": "typescript",
    "color": "#3178C6",
    "roleTag": "Type Contracts",
    "usageContext": "Type-safe contracts across full-stack applications and component props",
    "projectLinks": [
      "cimart",
      "kalorin-ai",
      "logisslot",
      "omnisync-crm",
      "rentalmobil",
      "faendita",
      "asbrnn-portfolio"
    ]
  },
  {
    "name": "React",
    "category": "frontend",
    "layer": "client",
    "iconKey": "react",
    "color": "#0284c7",
    "roleTag": "Component UI",
    "usageContext": "Component-driven UI, state management, custom hooks, and interactive flows",
    "projectLinks": [
      "cimart",
      "kalorin-ai",
      "logisslot",
      "omnisync-crm",
      "rentalmobil",
      "faendita",
      "asbrnn-portfolio"
    ]
  },
  {
    "name": "Next.js",
    "category": "frontend",
    "layer": "client",
    "iconKey": "nextdotjs",
    "color": "#0f172a",
    "roleTag": "App Framework",
    "usageContext": "Server-side rendering, static generation, and edge routing",
    "projectLinks": [
      "cimart",
      "logisslot",
      "rentalmobil"
    ]
  },
  {
    "name": "Flutter",
    "category": "mobile",
    "layer": "client",
    "iconKey": "flutter",
    "color": "#0284c7",
    "roleTag": "Native Mobile",
    "usageContext": "Cross-platform native mobile apps for iOS and Android with 60fps reactive UI",
    "projectLinks": [
      "villanakey"
    ]
  },
  {
    "name": "Tailwind CSS v4",
    "category": "frontend",
    "layer": "client",
    "iconKey": "tailwindcss",
    "color": "#06b6d4",
    "roleTag": "Design Tokens",
    "usageContext": "Modern utility-first styling, design tokens, and fluid responsive layouts",
    "projectLinks": [
      "cimart",
      "kalorin-ai",
      "logisslot",
      "omnisync-crm",
      "terrasense-agri",
      "rentalmobil",
      "faendita",
      "asbrnn-portfolio"
    ]
  },
  {
    "name": "JavaScript",
    "category": "frontend",
    "layer": "client",
    "iconKey": "javascript",
    "color": "#eab308",
    "roleTag": "Scripting Core",
    "usageContext": "Core web scripting, DOM events, and asynchronous event loops",
    "projectLinks": [
      "cimart",
      "terrasense-agri",
      "sekolah-absensi",
      "silat-bbspjis",
      "siloka-bbspjis",
      "undangan-online",
      "proyek-riezz"
    ]
  },
  {
    "name": "Laravel",
    "category": "backend",
    "layer": "backend",
    "iconKey": "laravel",
    "color": "#ef4444",
    "roleTag": "MVC & REST Engine",
    "usageContext": "Robust REST APIs, Inertia backend routing, authentication, and transaction handling",
    "projectLinks": [
      "cimart",
      "nxtg-medic",
      "sekolah-absensi",
      "sipembantu",
      "lscs-portal",
      "northgym",
      "stockswap",
      "sipena-budget"
    ]
  },
  {
    "name": "Node.js",
    "category": "backend",
    "layer": "backend",
    "iconKey": "nodejs",
    "color": "#22c55e",
    "roleTag": "Server Runtime",
    "usageContext": "High-throughput microservices, real-time WebSockets, and build automation tooling",
    "projectLinks": [
      "kalorin-ai",
      "logisslot",
      "omnisync-crm",
      "asbrnn-portfolio",
      "asobirin29-agent"
    ]
  },
  {
    "name": "PostgreSQL",
    "category": "backend",
    "layer": "database",
    "iconKey": "postgresql",
    "color": "#2563eb",
    "roleTag": "Relational Core",
    "usageContext": "Relational data modeling, complex queries, indexing, and transactional integrity",
    "projectLinks": [
      "kalorin-ai",
      "logisslot",
      "omnisync-crm"
    ]
  },
  {
    "name": "Supabase",
    "category": "backend",
    "layer": "database",
    "iconKey": "supabase",
    "color": "#10b981",
    "roleTag": "Cloud Postgres & Auth",
    "usageContext": "Managed Postgres backend, row-level security policies, real-time subscriptions, and auth",
    "projectLinks": [
      "kalorin-ai"
    ]
  },
  {
    "name": "MySQL",
    "category": "backend",
    "layer": "database",
    "iconKey": "mysql",
    "color": "#0284c7",
    "roleTag": "Transactional DB",
    "usageContext": "E-commerce relational database schemas, ACID transactions, and optimized indexing",
    "projectLinks": [
      "cimart",
      "nxtg-medic",
      "terrasense-agri",
      "rentalmobil",
      "sekolah-absensi",
      "silat-bbspjis",
      "siloka-bbspjis",
      "selport-bbspjis",
      "sipembantu",
      "lscs-portal",
      "northgym",
      "stockswap",
      "perjakin-bbspjis",
      "sipena-budget",
      "proyek-riezz",
      "silosa-bbspjis"
    ]
  },
  {
    "name": "Firebase",
    "category": "backend",
    "layer": "database",
    "iconKey": "firebase",
    "color": "#f59e0b",
    "roleTag": "NoSQL & Real-Time Sync",
    "usageContext": "Cloud Firestore real-time calendar syncing, FCM push notifications, and Auth",
    "projectLinks": [
      "villanakey",
      "cimart",
      "kalorin-ai"
    ]
  },
  {
    "name": "Prisma ORM",
    "category": "backend",
    "layer": "database",
    "iconKey": "prisma",
    "color": "#6366f1",
    "roleTag": "Type-Safe ORM",
    "usageContext": "Type-safe database migrations, declarative schema modeling, and optimized queries",
    "projectLinks": [
      "kalorin-ai",
      "rentalmobil"
    ]
  },
  {
    "name": "Linux",
    "category": "tools",
    "layer": "devops",
    "iconKey": "linux",
    "color": "#eab308",
    "roleTag": "System OS",
    "usageContext": "Primary Unix environment, Bash scripting, system service management, and workflow",
    "projectLinks": [
      "cimart",
      "villanakey",
      "kalorin-ai",
      "logisslot",
      "nxtg-medic",
      "selport-bbspjis"
    ]
  },
  {
    "name": "Docker",
    "category": "tools",
    "layer": "devops",
    "iconKey": "docker",
    "color": "#0284c7",
    "roleTag": "Containerization",
    "usageContext": "Containerized deployment, multi-stage builds, and consistent staging environments",
    "projectLinks": [
      "cimart",
      "logisslot",
      "kalorin-ai"
    ]
  },
  {
    "name": "Git",
    "category": "tools",
    "layer": "devops",
    "iconKey": "git",
    "color": "#f97316",
    "roleTag": "Version Control",
    "usageContext": "Version control, feature branching workflows, code reviews, and CI/CD pipelines",
    "projectLinks": [
      "cimart",
      "villanakey",
      "kalorin-ai",
      "logisslot",
      "omnisync-crm",
      "terrasense-agri",
      "asobirin29-agent"
    ]
  },
  {
    "name": "Vercel",
    "category": "tools",
    "layer": "devops",
    "iconKey": "vercel",
    "color": "#0f172a",
    "roleTag": "Edge Deployment",
    "usageContext": "Edge deployment, continuous integration, and global CDN delivery for web apps",
    "projectLinks": [
      "kalorin-ai",
      "rentalmobil",
      "faendita",
      "asbrnn-portfolio"
    ]
  }
];

export const projectsData: Project[] = [
  {
    "id": "kalorin-ai",
    "title": "kalorinAi",
    "subtitle": "Platform Web Nutrisi & Tracking Kalori Berbasis Computer Vision AI",
    "category": "fullstack",
    "summary": "Platform pelacak nutrisi cerdas dengan pengenalan citra piring makanan berbasis AI untuk menghitung kalori, makronutrien, serta rekomendasi harian.",
    "description": "Capstone Project Dicoding CodingCamp 2026 Powered by DBS Foundation yang dikembangkan bersama tim 6 orang (2 Data Analyst, 2 AI Engineer, 2 Fullstack). Fitur mencakup kalkulator BMI, tracking asupan harian, streak, insight AI, dan rekomendasi menu adaptif.",
    "architecture": [
      "Client web modern menggunakan React, Vite, dan Tailwind CSS v4",
      "Database dan layer data menggunakan Supabase dan Prisma ORM",
      "Sistem otentikasi aman menggunakan Firebase Auth",
      "Pipeline computer vision TensorFlow/Keras di backend Python untuk mendeteksi porsi dan nilai gizi (kalori, protein, lemak, karbohidrat)",
      "Mesin rekomendasi harian adaptif berdasarkan target kalori pengguna"
    ],
    "stack": [
      "React",
      "Vite",
      "Tailwind CSS v4",
      "TypeScript",
      "Supabase",
      "Prisma ORM",
      "Firebase Auth",
      "TensorFlow",
      "Python"
    ],
    "highlights": [
      "Capstone Project Dicoding CodingCamp 2026 Powered by DBS Foundation",
      "Deteksi citra makanan otomatis untuk kalkulasi makronutrien instan",
      "Sistem insight harian dan rekomendasi personal berbasis AI"
    ],
    "challenges": "Menggarap seluruh arsitektur web dan integrasi API secara mandiri di tengah jadwal padat antara perkuliahan semester aktif dan bootcamp.",
    "role": "Lead Web Full-Stack Developer",
    "githubUrl": "https://github.com/ryhndastra/kalorin-ai",
    "demoUrl": "https://kalorin-ai.vercel.app",
    "imageUrl": "/projects/kalorinLogo.png",
    "imageFit": "contain",
    "featured": true,
    "metrics": [
      {
        "label": "Capstone Team",
        "value": "6 Engineers"
      },
      {
        "label": "AI Inference",
        "value": "TensorFlow CNN"
      },
      {
        "label": "Web Platform",
        "value": "React & Vite"
      }
    ],
    "images": [
      "/projects/kalorinLogo.png",
      "/projects/CibendaMart.png"
    ]
  },
  {
    "id": "villanakey",
    "title": "villaNaKey",
    "subtitle": "Aplikasi Mobile Booking & Manajemen Reservasi Villa Keluarga",
    "category": "mobile",
    "summary": "Aplikasi mobile booking khusus untuk mendukung operasional bisnis hospitality villa pribadi keluarga dengan sinkronisasi kalender real-time tanpa risiko double-booking.",
    "description": "Dikembangkan sebagai proyek akhir kampus untuk mendigitalisasi pemesanan villa keluarga, mengeliminasi risiko double-booking, dan mempermudah pengecekan jadwal reservasi bagi pengelola dan tamu secara instan.",
    "architecture": [
      "Aplikasi mobile multi-platform dibangun dengan Flutter dan Dart SDK",
      "Firebase Authentication untuk otentikasi aman pengelola dan tamu",
      "Cloud Firestore NoSQL real-time database untuk sinkronisasi instan jadwal reservasi",
      "Komponen custom calendar interaktif dengan highlight tanggal booking aktif"
    ],
    "stack": [
      "Flutter",
      "Dart",
      "Firebase Auth",
      "Cloud Firestore",
      "Mobile Architecture"
    ],
    "highlights": [
      "Digunakan langsung pada operasional villa pribadi keluarga",
      "Sinkronisasi status booking instan tanpa latency",
      "Kalender interaktif visual untuk kemudahan reservasi tanggal"
    ],
    "challenges": "Proyek aplikasi mobile pertama; mempelajari Flutter dan reaktif state management dari nol bersama kelompok di bawah tenggat waktu akademik yang ketat.",
    "role": "Mobile Developer & Technical Lead",
    "githubUrl": "https://github.com/ryhndastra/villanakey",
    "isMobileApp": true,
    "demoStatusLabel": "Aplikasi Mobile Native (Demo/APK on request)",
    "imageUrl": "/projects/villa.png",
    "imageFit": "contain",
    "featured": true,
    "metrics": [
      {
        "label": "Mobile Engine",
        "value": "Flutter & Dart"
      },
      {
        "label": "Database Sync",
        "value": "Real-Time NoSQL"
      },
      {
        "label": "State & Cloud",
        "value": "Firebase Suite"
      }
    ],
    "images": [
      "/projects/villa.png"
    ]
  },
  {
    "id": "cimart",
    "title": "CibendaMart",
    "subtitle": "Platform E-Commerce & Marketplace Komoditas Warga Desa Berbasis Web",
    "category": "fullstack",
    "summary": "Platform e-commerce terintegrasi untuk mendigitalisasi dan memasarkan produk UMKM serta hasil bumi warga Desa Cibenda, lengkap dengan payment gateway Midtrans dan tracking pesanan.",
    "description": "Inisiatif MBKM / KKN Tematik resmi dari kampus yang menjadi Capstone Project untuk digitalisasi komoditas ekonomi warga Desa Cibenda, Pangandaran. Dikerjakan secara mandiri dari perancangan arsitektur sistem, integrasi payment gateway Midtrans Snap, WebSockets untuk status pesanan live, geolokasi pengiriman dengan Leaflet, notifikasi Firebase Cloud Messaging, hingga deployment produksi dengan Docker.",
    "architecture": [
      "Frontend monolitik reaktif menggunakan Laravel Inertia.js dengan React dan Tailwind CSS",
      "Backend modular MVC Laravel dengan MySQL transactional database",
      "Payment gateway integration menggunakan Midtrans Snap SDK dan Webhook verifikasi signature",
      "Real-time order state updates via WebSockets dan Leaflet maps untuk visualisasi radius pengantaran"
    ],
    "stack": [
      "Laravel",
      "Inertia.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "Midtrans",
      "Docker",
      "WebSockets"
    ],
    "highlights": [
      "Mandat resmi pimpinan kampus & perangkat Desa Cibenda untuk digitalisasi UMKM lokal",
      "Arsitektur pembayaran otomatis dengan integrasi Midtrans Snap & webhook ACID",
      "Peta interaktif Leaflet untuk pemetaan rute kurir dan titik antar desa"
    ],
    "challenges": "Mengintegrasikan sistem pembayaran online pada lingkungan masyarakat desa yang heterogen, memastikan webhook callback Midtrans tahan gangguan jaringan (idempoten), dan menyediakan antarmuka checkout yang sangat intuitif bagi pengguna pemula.",
    "role": "Full-Stack Developer & Lead Architect",
    "githubUrl": "https://github.com/Asobirin29/CibendaMart",
    "isPrivateRepo": true,
    "privateRepoReason": "Repositori kepemilikan inisiatif kelembagaan desa & kampus",
    "imageUrl": "/projects/CibendaMart.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Model",
        "value": "B2C Hyperlocal"
      },
      {
        "label": "Payment Flow",
        "value": "Midtrans Snap"
      },
      {
        "label": "Architecture",
        "value": "Inertia + React"
      }
    ],
    "images": [
      "/projects/CibendaMart.png",
      "/projects/kalorinLogo.png"
    ]
  },
  {
    "id": "logisslot",
    "title": "LogisSlot",
    "subtitle": "Integrated Time-Slot Booking & Real-Time Fleet Tracking Platform",
    "category": "fullstack",
    "summary": "Platform manajemen slot antrean logistik gudang dan pelacakan armada truk real-time berbasis WebSocket untuk mengeliminasi kongesti gerbang pabrik.",
    "description": "Platform berskala enterprise untuk menyelesaikan masalah kemacetan dan ketidakteraturan antrean armada truk di gerbang pabrik/gudang industri. LogisSlot menyediakan sistem reservasi time-slot berbasis kuota per loading dock, verifikasi check-in barcode di pos gerbang security, status alokasi dock otomatis, dan FIDS (Flight Information Display System style) dashboard terpusat yang memperbarui pergerakan armada secara live tanpa reload halaman.",
    "architecture": [
      "Frontend client-side dashboard modern menggunakan Next.js App Router, React, dan Tailwind CSS",
      "High-performance backend API menggunakan Node.js dan Express dengan pemisahan modular service",
      "Komunikasi dua arah persisten real-time menggunakan Socket.io untuk broadcast status gerbang & dock",
      "Database PostgreSQL dengan transaksi Serializable untuk mencegah double-booking time-slot",
      "Redis caching & session layer untuk latensi respon rendah (< 200ms SLA)",
      "Nginx reverse proxy dengan SSL termination dan rate limiting"
    ],
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.io",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "Nginx"
    ],
    "highlights": [
      "Eliminasi antrean truk liar dengan penjadwalan kuota time-slot presisi",
      "Dashboard live monitoring bergaya FIDS untuk tim pengawas warehouse dan security",
      "Integrasi barcode scanner cepat di pos gerbang masuk untuk verifikasi kedatangan instan"
    ],
    "challenges": "Mencegah race condition ketika puluhan supplier mencoba membukukan slot waktu dermaga yang sama secara bersamaan. Diatasi dengan menerapkan Serializable transaction isolation level pada PostgreSQL dan atomic lock pada Redis.",
    "role": "Full-Stack System Architect",
    "githubUrl": "https://github.com/Asobirin29/LogisSlot",
    "isPrivateRepo": true,
    "imageUrl": "/projects/logisslot.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "SLA Latency",
        "value": "< 200ms"
      },
      {
        "label": "Real-Time Sync",
        "value": "Socket.io WSS"
      },
      {
        "label": "Integrity",
        "value": "ACID Serializable"
      }
    ],
    "images": [
      "/projects/logisslot.png",
      "/projects/logisslot-dock.png",
      "/projects/logisslot-queue.png",
      "/projects/logisslot-ic.png",
      "/projects/logisslot-detail.png"
    ]
  },
  {
    "id": "omnisync-crm",
    "title": "OmniSync CRM",
    "subtitle": "Omnichannel E-Commerce CRM & Low-Latency Inventory Sync",
    "category": "fullstack",
    "summary": "Sistem Customer Relationship Management terpadu dengan kotak masuk omnichannel dan sinkronisasi stok lintas marketplace (Shopee, Tokopedia, TikTok, WA) berlatensi < 2 detik.",
    "description": "Aplikasi Customer Relationship Management dan sinkronisasi inventori omnichannel berkinerja tinggi untuk brand retail multikanal. Mengintegrasikan pesan pelanggan dari Shopee, Tokopedia, Lazada, Blibli, dan WhatsApp ke dalam antarmuka Unified 3-Column Inbox. Fitur mencakup customer profiling instan (Lifetime Value, tier loyalitas, riwayat transaksi), automated tagging (VIP, Suka Retur), kalkulator ongkir kurir terintegrasi, serta pemotongan stok serentak dengan ACID database transaction berlatensi < 2 detik guna mencegah overselling.",
    "architecture": [
      "Frontend antarmuka SPA responsif 3-kolom menggunakan React 19, TypeScript, dan Tailwind CSS",
      "Backend server Express.js dengan arsitektur event-driven dan Socket.io engine",
      "Database PostgreSQL / PGlite embedded untuk persistensi transaksi pelanggan dan inventaris",
      "Mekanisme webhook idempoten dengan deduplikasi external order ID",
      "Rule-based automated tagging engine untuk klasifikasi status pelanggan (VIP, Frequent Returner)"
    ],
    "stack": [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.io",
      "PostgreSQL",
      "Tailwind CSS",
      "PGlite"
    ],
    "highlights": [
      "Unified 3-Column Inbox menggabungkan 5 kanal komunikasi e-commerce sekaligus",
      "Sinkronisasi inventaris multi-kanal atomik dengan latensi pemotongan stok < 2 detik",
      "Customer intelligence dengan kalkulasi LTV real-time dan quick-order creation dari WhatsApp"
    ],
    "challenges": "Mengelola aliran webhook order masuk dari banyak marketplace sekaligus tanpa menyebabkan dead-lock pada baris stok inventori. Diselesaikan dengan locking row atomik dan mekanisme queue idempotency.",
    "role": "Full-Stack Lead Engineer",
    "githubUrl": "https://github.com/Asobirin29/Omnysync",
    "isPrivateRepo": true,
    "imageUrl": "/projects/omnisync.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Sync Latency",
        "value": "< 2 Detik"
      },
      {
        "label": "Channels",
        "value": "5 E-Commerce"
      },
      {
        "label": "Framework",
        "value": "React 19 + TS"
      }
    ],
    "images": [
      "/projects/omnisync.png",
      "/projects/omnisync-live.png",
      "/projects/omnisync-hero.png"
    ]
  },
  {
    "id": "terrasense-agri",
    "title": "TerraSense Agri",
    "subtitle": "Platform Web & GIS Precision Agriculture untuk Evaluasi Lahan Satelit",
    "category": "fullstack",
    "summary": "Platform agrikultur presisi berbasis pemetaan poligon satelit GIS dan evaluasi kesesuaian komoditas pertanian berbasis standar Balai Penelitian Tanah serta kalkulasi dosis pupuk.",
    "description": "Platform Precision Agriculture berbasis Web dan Sistem Informasi Geografis (GIS) untuk membantu petani lokal memetakan lahan mereka menggunakan citra satelit resolusi tinggi. Sistem otomatis mendeteksi parameter agroklimat real-time (elevasi MDPL, temperatur, curah hujan) via Open-Meteo API, mengevaluasi kesesuaian lahan menggunakan algoritma Hukum Minimum Liebig berdasarkan standar ilmiah Balai Penelitian Tanah (2003), serta memberikan rekomendasi dosis pupuk (Urea, SP-36, KCl, NPK) spesifik dan pencatatan hasil panen.",
    "architecture": [
      "Frontend GIS interaktif dengan Leaflet.js, OpenStreetMap satellite tiles, dan Tailwind CSS",
      "REST API backend modular berbasis PHP 8.1+ dan MySQL 8.0 spatial indexing",
      "Integrasi data cuaca dan elevasi geospatial secara live melalui Open-Meteo API",
      "Engine evaluasi kesesuaian lahan berbasis aturan Balai Penelitian Tanah (S1 Sangat Sesuai, S2 Cukup Sesuai, S3 Sesuai Marjinal, N Tidak Sesuai)",
      "Kalkulator formula pupuk presisi berbasis kebutuhan hara spesifik jenis komoditas"
    ],
    "stack": [
      "PHP 8.1",
      "MySQL",
      "Leaflet GIS",
      "Tailwind CSS",
      "Open-Meteo API",
      "JavaScript",
      "GeoJSON"
    ],
    "highlights": [
      "Pemetaan poligon koordinat lahan satelit langsung melalui browser tanpa software GIS berat",
      "Evaluasi kesesuaian komoditas ilmiah terotomatisasi berdasarkan parameter tanah dan iklim",
      "Rekomendasi takaran pupuk terukur dan kalkulator estimasi biaya operasional panen"
    ],
    "challenges": "Mengonversi algoritma evaluasi kesesuaian lahan agronomis manual yang kompleks menjadi evaluasi komputasi instan berakurasi tinggi dengan data cuaca multi-variabel.",
    "role": "Full-Stack GIS & Software Developer",
    "githubUrl": "https://github.com/Asobirin29/TerraSense-Agri",
    "isPrivateRepo": true,
    "imageUrl": "/projects/terrasense.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "GIS Engine",
        "value": "Leaflet Polygon"
      },
      {
        "label": "Agronomy Base",
        "value": "Balittanah 2003"
      },
      {
        "label": "Weather Data",
        "value": "Open-Meteo Live"
      }
    ],
    "images": [
      "/projects/terrasense.png",
      "/projects/terrasense-map.png",
      "/projects/terrasense-harvest.png",
      "/projects/terrasense-profile.png",
      "/projects/terrasense-daftar.png"
    ]
  },
  {
    "id": "nxtg-medic",
    "title": "NXTG Medic",
    "subtitle": "SaaS Rekam Medis Elektronik (RME) Terakreditasi, Farmasi & POS Klinik",
    "category": "fullstack",
    "summary": "Platform SaaS fasilitas kesehatan untuk manajemen Rekam Medis Elektronik (RME) berstandar Kemenkes, katalog diagnosa ICD-10, validasi interaksi obat, dan sistem kasir apotek.",
    "description": "Sistem Informasi Manajemen Fasilitas Pelayanan Kesehatan (Klinik & Puskesmas) yang dirancang untuk memenuhi regulasi RME Kemenkes. NXTG Medic mengintegrasikan manajemen pendaftaran antrean pasien, pemeriksaan dokter SOAP (Subjektif, Objektif, Asesmen, Plan), kodefikasi diagnosa internasional ICD-10 otomatis, deteksi interaksi obat (drug-drug interaction warning), kontrol stok batch & kedaluwarsa obat, hingga Point of Sale (POS) kasir farmasi dengan billing terpadu.",
    "architecture": [
      "Core web application dibangun menggunakan Laravel 12 modern dengan PHP 8.3",
      "Relational database MySQL 8.4 dengan schema terisolasi antar tenant faskes dan audit trail",
      "Antarmuka klinis responsif dengan Bootstrap 5.3, custom dark/light theme, dan jQuery data tables",
      "Mesin pencarian kamus diagnosa ICD-10 terindeks dan modul verifikasi aturan interaksi obat",
      "Data onboarding batch importer untuk migrasi data master obat, tindakan, dan riwayat pasien"
    ],
    "stack": [
      "Laravel 12",
      "PHP 8.3",
      "MySQL",
      "Bootstrap 5.3",
      "jQuery",
      "ICD-10 Engine",
      "SaaS Multi-Tenant"
    ],
    "highlights": [
      "Pencatatan Rekam Medis Elektronik komprehensif berstandar SOAP Kemenkes",
      "Fitur keamanan peresepan: peringatan otomatis interaksi obat berisiko bagi pasien",
      "Manajemen stok farmasi multi-batch dengan pelacakan tanggal kadaluwarsa (FIFO/FEFO)"
    ],
    "challenges": "Merancang skema database medis yang patuh terhadap privasi rekam medis pasien sekaligus memberikan waktu respon pencarian diagnosa ICD-10 dalam hitungan milidetik.",
    "role": "Full-Stack HealthTech Engineer",
    "githubUrl": "https://github.com/Asobirin29/NXTG_MEDIC",
    "isPrivateRepo": true,
    "imageUrl": "/projects/nxtg-medic.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Framework",
        "value": "Laravel 12"
      },
      {
        "label": "Medical Code",
        "value": "ICD-10 Database"
      },
      {
        "label": "Security",
        "value": "Audit Log Trail"
      }
    ],
    "images": [
      "/projects/nxtg-medic.png",
      "/projects/nxtg-medic-clinical.png",
      "/projects/nxtg-medic-billing.png",
      "/projects/nxtg-medic-pharmacy.png"
    ]
  },
  {
    "id": "rentalmobil",
    "title": "DriveEase",
    "subtitle": "Modern Digital Car Rental Booking & Fleet Operations Platform",
    "category": "fullstack",
    "summary": "Platform pemesanan sewa mobil digital modern dengan manajemen ketersediaan armada real-time, kalkulasi durasi sewa otomatis, dan dashboard admin operasional.",
    "description": "Modernisasi platform reservasi sewa kendaraan dari arsitektur PHP legacy menuju web app modern berbasis Next.js App Router dan Prisma ORM. Platform ini memungkinkan pelanggan memilih unit mobil berdasarkan transmisi, kapasitas, dan harga per hari, menghitung tarif sewa otomatis berdasarkan tanggal pengambilan/pengembalian, serta menyediakan dashboard administrasi bagi staf untuk memantau status mobil (Tersedia, Disewa, Maintenance) dan konfirmasi bukti pembayaran.",
    "architecture": [
      "Frontend client menggunakan Next.js App Router, React Server Components, dan Tailwind CSS",
      "Data access layer type-safe menggunakan Prisma ORM dengan PostgreSQL / MySQL",
      "Modern authentication & authorization untuk proteksi rute admin dan pelanggan",
      "Server Actions untuk mutasi data cepat tanpa boilerplate API REST terpisah",
      "Image storage & processing pipeline untuk katalog galeri foto unit kendaraan"
    ],
    "stack": [
      "Next.js 15",
      "React",
      "TypeScript",
      "Prisma ORM",
      "Tailwind CSS",
      "MySQL",
      "Server Actions"
    ],
    "highlights": [
      "Migrasi arsitektur sukses dari sistem legacy ke stack modern Next.js yang lebih cepat dan aman",
      "Kalkulasi tarif sewa presisi dengan deteksi bentrok jadwal pemesanan kendaraan",
      "Dashboard admin intuitif untuk pengelolaan katalog unit mobil dan verifikasi sewa"
    ],
    "challenges": "Merekayasa ulang alur bisnis dari sistem PHP lama ke paradigma Next.js Server Actions dan Prisma ORM dengan relasi tabel booking dan ketersediaan armada yang konsisten.",
    "role": "Full-Stack Web Developer",
    "githubUrl": "https://github.com/Asobirin29/rentalmobil",
    "isPrivateRepo": true,
    "imageUrl": "/projects/rentalmobil.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Stack",
        "value": "Next.js + Prisma"
      },
      {
        "label": "UI Design",
        "value": "Tailwind Modern"
      },
      {
        "label": "Type Safety",
        "value": "End-to-End TS"
      }
    ],
    "images": [
      "/projects/rentalmobil.png",
      "/projects/rentalmobil-detail.png",
      "/projects/rentalmobil-avanza.jpg",
      "/projects/rentalmobil-cooper.jpg"
    ]
  },
  {
    "id": "sekolah-absensi",
    "title": "PASTI System",
    "subtitle": "Sistem Presensi Siswa & Guru Real-Time Berbasis Geofencing GPS & QR",
    "category": "fullstack",
    "summary": "Sistem informasi absensi sekolah terpadu dengan validasi radius geofencing lokasi GPS, scan kode QR harian, dan rekapitulasi data kehadiran otomatis.",
    "description": "Sistem informasi manajemen kehadiran (presensi) institusi pendidikan (MTs Cahaya Harapan) untuk memodernisasi absensi harian guru, staf, dan siswa. Sistem menggabungkan verifikasi titik koordinat GPS (geofencing radius sekolah) dengan kamera pemindai barcode/QR dinamis untuk mencegah manipulasi kehadiran. Dilengkapi dengan portal guru, panel admin akademik, pencatatan izin/sakit dengan lampiran surat, serta cetak laporan absensi periodik.",
    "architecture": [
      "Aplikasi berbasis web dibangun dengan Laravel MVC Framework dan MySQL",
      "Pemeriksaan geolokasi browser via Geolocation API dan validasi radius server-side",
      "Integrasi scanner QR code berbasis JavaScript untuk scan instan kartu identitas",
      "Glassmorphism UI modern dengan Bootstrap 5 dan CSS mesh gradient",
      "Modul ekspor laporan kehadiran otomatis ke format PDF dan Excel untuk tata usaha"
    ],
    "stack": [
      "Laravel",
      "PHP",
      "MySQL",
      "Bootstrap 5",
      "Leaflet/GPS",
      "HTML5 QR Scanner",
      "CSS Glassmorphism"
    ],
    "highlights": [
      "Anti-titip absen: verifikasi ganda berbasis koordinat GPS sekolah dan QR token dinamis",
      "Desain antarmuka modern bernuansa dark glassmorphism yang disukai pengguna muda",
      "Otomasi rekap absensi bulanan menghemat 80% waktu administrasi tata usaha"
    ],
    "challenges": "Mengatasi akurasi koordinat GPS yang fluktuatif pada perangkat mobile pengguna dengan menerapkan batas toleransi radius (geofence boundary) yang aman dan akurat.",
    "role": "Full-Stack Developer",
    "githubUrl": "https://github.com/Asobirin29/sekolah-absensi-app",
    "isPrivateRepo": true,
    "imageUrl": "/projects/sekolah-absensi.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Verification",
        "value": "GPS Geofencing"
      },
      {
        "label": "Security",
        "value": "Dynamic QR Token"
      },
      {
        "label": "Efficiency",
        "value": "80% Time Saved"
      }
    ],
    "images": [
      "/projects/sekolah-absensi.png",
      "/projects/sekolah-absensi-student.jpg",
      "/projects/sekolah-absensi-cam1.jpg"
    ]
  },
  {
    "id": "silat-bbspjis",
    "title": "SILAT BBSPJIS",
    "subtitle": "Sistem Informasi Layanan IT & Helpdesk Internal Berbasis Chat",
    "category": "fullstack",
    "summary": "Aplikasi helpdesk dan penanganan insiden infrastruktur IT internal balai berbasis tiket dan percakapan chat real-time berbobot ringan.",
    "description": "Dikembangkan untuk Balai Besar Standardisasi dan Pelayanan Jasa Industri Selulosa (BBSPJIS) Kementerian Perindustrian. SILAT memfasilitasi pelaporan kendala jaringan, perangkat lab, instrumen uji, dan sistem informasi internal oleh pegawai balai kepada tim teknisi IT melalui antarmuka tiket dan live chat responsif. Menyediakan status tiket transparan (Pending, Dalam Pengerjaan, Selesai), riwayat log bantuan, serta integrasi otentikasi akun internal SIL2020.",
    "architecture": [
      "Core backend menggunakan Fat-Free Framework (F3) PHP yang ultra-ringan dan cepat",
      "Komunikasi chat interaktif menggunakan AJAX long-polling teroptimasi untuk beban server minimal",
      "Database relasional MySQL dengan relasi tiket, percakapan, dan hak akses staf",
      "Clean UI layout dua panel (daftar tiket dan chat window) menggunakan Bootstrap 5 dan Manrope typography",
      "Sistem notifikasi toast dan sound cue saat respon teknisi masuk"
    ],
    "stack": [
      "PHP",
      "Fat-Free Framework",
      "MySQL",
      "Bootstrap 5",
      "jQuery AJAX",
      "JavaScript"
    ],
    "highlights": [
      "Digunakan resmi di lingkungan balai riset standardisasi pemerintah (BBSPJIS Kemenperin)",
      "Sistem antrean tiket responsif memangkas waktu penanganan komplain perangkat lab",
      "Desain antarmuka chat dua panel yang ringkas dan nyaman digunakan sepanjang hari kerja"
    ],
    "challenges": "Membuat pengalaman obrolan yang mulus dan mendekati real-time tanpa membebani infrastruktur server internal balai yang terbatas. Diselesaikan dengan strategi smart polling interval yang dinamis.",
    "role": "Backend & Frontend Developer",
    "githubUrl": "https://github.com/Asobirin29/SILAT",
    "isPrivateRepo": true,
    "imageUrl": "/projects/silat-login.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Agency",
        "value": "BBSPJIS Kemenperin"
      },
      {
        "label": "Engine",
        "value": "Fat-Free PHP"
      },
      {
        "label": "Channel",
        "value": "Internal Helpdesk"
      }
    ],
    "images": [
      "/projects/silat-login.png",
      "/projects/silat-chat.png",
      "/projects/silat.png"
    ]
  },
  {
    "id": "siloka-bbspjis",
    "title": "SILOKA BBSPJIS",
    "subtitle": "Sistem Informasi Logistik, Inventori & Pengadaan Barang/Jasa Balai",
    "category": "fullstack",
    "summary": "Platform otomasi alur pengadaan reagen/alat laboratorium, monitoring stok gudang pusat dan cabang, serta penerbitan dokumen audit resmi.",
    "description": "Sistem tata kelola logistik dan pengadaan barang/jasa internal di Balai Besar Standardisasi dan Pelayanan Jasa Industri Selulosa. SILOKA mendigitalkan siklus pengadaan barang mulai dari permintaan unit lab, verifikasi ketersediaan stok di gudang pusat/cabang, penerbitan purchase order (PO), approval bertingkat PPK (Pejabat Pembuat Komitmen), hingga pencatatan mutasi barang dan pencetakan dokumen resmi berkop dinas dengan FPDF.",
    "architecture": [
      "Backend arsitektur MVC PHP dengan MySQL database relasional",
      "Role-Based Access Control (RBAC) ketat membedakan Pemohon, Admin Gudang, Verifikator, dan PPK",
      "Pencetakan surat dinas dan dokumen Berita Acara Penerimaan (BAP) otomatis menggunakan FPDF",
      "Dashboard analitik inventori dengan indikator visual stok menipis dan grafik pengeluaran bulanan",
      "Desain responsif Plus Jakarta Sans dengan navigasi sidebar intuitif"
    ],
    "stack": [
      "PHP",
      "MySQL",
      "Bootstrap 5",
      "FPDF",
      "JavaScript",
      "Enterprise RBAC"
    ],
    "highlights": [
      "Digitalisasi penuh formulir kertas pengadaan lab menjadi alur persetujuan digital transparan",
      "Pencegahan kehabisan bahan kimia uji laboratorium selulosa dengan sistem peringatan stok kritis",
      "Pencetakan otomatis dokumen resmi berkop kementerian yang siap diarsipkan"
    ],
    "challenges": "Mengakomodasi alur birokrasi pengadaan instansi pemerintah yang memiliki banyak tahap persetujuan bersyarat serta audit trail yang tidak boleh terhapus.",
    "role": "Full-Stack Enterprise Developer",
    "githubUrl": "https://github.com/Asobirin29/Siloka",
    "isPrivateRepo": true,
    "imageUrl": "/projects/siloka-auth.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Tracked Items",
        "value": "1,400+ Aset Lab"
      },
      {
        "label": "Compliance",
        "value": "Standar Pengadaan"
      },
      {
        "label": "Reporting",
        "value": "FPDF Generated"
      }
    ],
    "images": [
      "/projects/siloka-auth.png",
      "/projects/siloka-inventori.png",
      "/projects/siloka-login.png",
      "/projects/siloka.png",
      "/projects/siloka-item1.png"
    ]
  },
  {
    "id": "faendita",
    "title": "FAENDITA.EXE",
    "subtitle": "Retro Workstation Edition — Interactive 90s Desktop Operating System Experience",
    "category": "fullstack",
    "summary": "Eksplorasi antarmuka interaktif bernuansa sistem operasi Windows 90-an retro lengkap dengan window manager, taskbar klasik, audio synthesizer, dan galeri interaktif.",
    "description": "Karya desain antarmuka kreatif yang mengemas website personal interaktif ke dalam visual Retro Desktop Operating System tahun 90-an. Memadukan estetika window frame abu-abu ber-bevel klasik, taskbar teal dengan jam digital aktif, interactive envelope dengan wax seal, modul kuis keamanan akses dengan konfeti mini, galeri kenangan carousel 3D tilt, serta pemutar media audio berbasis Web Audio API.",
    "architecture": [
      "Client frontend modern dibangun dengan Vite, React, dan Tailwind CSS",
      "Window management layer interaktif yang mendukung dragging, minimize, dan z-index focus stacking",
      "Web Audio API & HTML5 Audio untuk efek suara tombol retro dan musik latar dinamis",
      "Animasi CRT scanline, dither pattern, dan ticker strip halus berbasis CSS custom properties",
      "Komponen modular interaktif (Email dialog, Photo memory inspector, Secret quiz terminal)"
    ],
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Web Audio API",
      "Framer Motion",
      "Retro Design System"
    ],
    "highlights": [
      "Detail visual luar biasa mereplikasi nostalgia sistem operasi klasik era 1998",
      "Window manager interaktif yang responsif baik di desktop maupun layar sentuh mobile",
      "Integrasi audio retro dan mikro-interaksi tombol raised-key yang memikat pengguna"
    ],
    "challenges": "Menciptakan nuansa retro 90-an autentik tanpa mengorbankan performa kecepatan render web modern di perangkat ponsel.",
    "role": "Creative Frontend Architect",
    "githubUrl": "https://github.com/Asobirin29/Faendita",
    "isPrivateRepo": true,
    "imageUrl": "/projects/faendita-live.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Design Theme",
        "value": "Retro 90s OS"
      },
      {
        "label": "Audio Engine",
        "value": "Web Audio API"
      },
      {
        "label": "Interactivity",
        "value": "Window Manager"
      }
    ],
    "images": [
      "/projects/faendita-live.png",
      "/projects/faendita-app.png",
      "/projects/faendita.png",
      "/projects/faendita-photo1.jpg",
      "/projects/faendita-photo2.jpg"
    ]
  },
  {
    "id": "selport-bbspjis",
    "title": "SELPORT BBSPJIS",
    "subtitle": "Sistem Elektronik Layanan Pengujian, Kalibrasi & Sertifikasi Selulosa",
    "category": "fullstack",
    "summary": "Portal permohonan layanan publik dan industri untuk pengujian mutu pulp, kertas, dan kalibrasi instrumen laboratorium bersertifikasi KAN.",
    "description": "Portal layanan terpadu satu pintu untuk Balai Besar Standardisasi dan Pelayanan Jasa Industri Selulosa (BBSPJIS). SELPORT memungkinkan mitra industri mengajukan permohonan kalibrasi alat ukur, memesan pengujian sampel kertas/selulosa, memantau tracking status uji laboratorium secara online, mengunduh e-billing / invoice kesanggupan pembayaran, serta integrasi sertifikasi produk berstandar SNI/KAN.",
    "architecture": [
      "Frontend antarmuka responsif ramah pengguna dengan Bootstrap dan CSS modern",
      "Backend sistem berbasis PHP dan basis data transaksi MySQL",
      "Modul manajemen permohonan alat, antrean kalibrasi, dan pembagian tugas analis lab",
      "Sistem administrasi keuangan terintegrasi dengan penerbitan e-invoice dan validasi pembayaran",
      "Audit trail IP dan pelindung keamanan brute force pada panel pegawai"
    ],
    "stack": [
      "PHP",
      "MySQL",
      "Bootstrap",
      "JavaScript",
      "Apache",
      "RESTful Routing"
    ],
    "highlights": [
      "Layanan publik terakreditasi KAN untuk industri kertas dan biomassa nasional",
      "Pelacakan posisi pengujian sampel transparan dari tahap preparasi hingga laporan uji",
      "Manajemen billing tarif PNBP resmi pemerintah secara digital"
    ],
    "challenges": "Menyederhanakan alur birokrasi pengujian sampel kimia dan fisika selulosa yang rumit menjadi alur permohonan web yang jelas bagi pelanggan industri.",
    "role": "Full-Stack Web Engineer",
    "githubUrl": "https://github.com/Asobirin29/selport",
    "isPrivateRepo": true,
    "imageUrl": "/projects/selport-landing.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Standard",
        "value": "ISO 17025 KAN"
      },
      {
        "label": "Service",
        "value": "Kalibrasi & Uji"
      },
      {
        "label": "Audience",
        "value": "Mitra Industri"
      }
    ],
    "images": [
      "/projects/selport-landing.png",
      "/projects/selport-auth.png",
      "/projects/selport-aktivasi.png",
      "/projects/selport.png"
    ]
  },
  {
    "id": "sipembantu",
    "title": "SIPEMBANTU",
    "subtitle": "Marketplace Penyaluran & Rekrutmen Asisten Rumah Tangga (ART) Terverifikasi",
    "category": "fullstack",
    "summary": "Platform rekrutmen dan verifikasi legalitas tenaga kerja domestik (ART, Babysitter, Caregiver) dengan sistem garansi, voucher, dan tracking kontrak.",
    "description": "Platform marketplace tenaga kerja rumah tangga yang menghubungkan majikan (employer) dengan pekerja domestik (servant) terlatih secara transparan dan aman. SIPEMBANTU menyediakan alur pendaftaran terpisah, verifikasi identitas e-KTP dan SKCK, masa garansi penggantian pekerja jika terjadi ketidakcocokan, sistem rating & ulasan majikan, sistem pelacakan status penempatan, serta portal CMS manajemen agensi.",
    "architecture": [
      "Aplikasi fullstack berbasis Laravel Framework dengan arsitektur multi-guard authentication",
      "Verifikasi identitas dan nomor OTP via WhatsApp & Email gateway",
      "CMS Admin komprehensif untuk validasi berkas calon pekerja dan mediasi keluhan",
      "Database relasional MySQL dengan skema relasi kontrak, garansi, komisi, dan riwayat kerja",
      "Antarmuka responsif modern dengan integrasi SweetAlert2 dan datatables"
    ],
    "stack": [
      "Laravel",
      "PHP",
      "MySQL",
      "Bootstrap",
      "OTP Gateway",
      "JavaScript",
      "SweetAlert2"
    ],
    "highlights": [
      "Sistem verifikasi ganda tenaga kerja untuk rasa aman dan proteksi hukum majikan",
      "Manajemen garansi penggantian ART transparan dengan countdown otomatis",
      "Portal pencarian lowongan dan filter keahlian (Baby Sitter, Lansia, Masak, Supir)"
    ],
    "challenges": "Membangun sistem alur verifikasi dua arah yang ketat antara majikan dan calon asisten guna meminimalisir risiko penipuan tenaga kerja.",
    "role": "Full-Stack Software Engineer",
    "githubUrl": "https://github.com/Asobirin29/SIPEMBANTU",
    "isPrivateRepo": true,
    "imageUrl": "/projects/sipembantu-portal.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Verification",
        "value": "e-KTP & OTP"
      },
      {
        "label": "Roles",
        "value": "Employer & Servant"
      },
      {
        "label": "Protection",
        "value": "Garansi Kontrak"
      }
    ],
    "images": [
      "/projects/sipembantu-portal.png",
      "/projects/sipembantu-auth.png",
      "/projects/sipembantu.png",
      "/projects/sipembantu-about.png"
    ]
  },
  {
    "id": "lscs-portal",
    "title": "LSCS Portal",
    "subtitle": "Sistem Informasi Lembaga Sertifikasi & Akreditasi Industri Selulosa",
    "category": "fullstack",
    "summary": "Platform reaktif manajemen akreditasi, penerbitan Dynamic ID Card berbasis QR, evaluasi fasilitas lembaga, dan pendaftaran siswa/peserta sertifikasi.",
    "description": "Sistem informasi berbasis web modern yang dikembangkan dengan Laravel dan Livewire untuk mendigitalkan seluruh aktivitas kelembagaan dan sertifikasi kompetensi. LSCS mencakup modul manajemen akreditasi, kalender kegiatan akademik/sertifikasi, sistem penerbitan kartu identitas dinamis (Dynamic ID Card) dengan kode QR terenkripsi yang dapat diverifikasi publik, serta portal pembayaran biaya sertifikasi.",
    "architecture": [
      "Full-stack reactive framework menggunakan Laravel dan Livewire SPA tanpa JavaScript boilerplate berlebih",
      "Generator kartu identitas vektor interaktif dengan Dynamic QR Punchout",
      "Penerbitan dokumen sertifikat dan kartu ID format PDF otomatis",
      "Database MySQL dengan relasi kompleks peserta, pengajar, kurikulum, dan akreditasi",
      "Verifikasi status keaslian sertifikat publik melalui pemindaian kamera QR langsung"
    ],
    "stack": [
      "Laravel",
      "Livewire",
      "PHP",
      "MySQL",
      "QR Code Engine",
      "DomPDF",
      "Tailwind CSS"
    ],
    "highlights": [
      "Penerbitan kartu identitas dan kartu peserta sertifikasi dinamis dengan QR unik",
      "Verifikasi sertifikasi real-time bebas pemalsuan via scan QR publik",
      "Arsitektur reaktif Livewire yang cepat dan interaktif tanpa full page reload"
    ],
    "challenges": "Menghasilkan rendering tata letak ID Card yang presisi milimeter untuk cetak fisik kartu PVC langsung dari data dinamis database.",
    "role": "Lead Full-Stack Developer",
    "githubUrl": "https://github.com/Asobirin29/Lscs",
    "isPrivateRepo": true,
    "imageUrl": "/projects/lscs-live-home.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Reactivity",
        "value": "Laravel Livewire"
      },
      {
        "label": "Verification",
        "value": "Encrypted QR"
      },
      {
        "label": "Output",
        "value": "Print-Ready PDF"
      }
    ],
    "images": [
      "/projects/lscs-live-home.png",
      "/projects/lscs-live-about.png",
      "/projects/lscs-live-story.png",
      "/projects/lscs-live-teacher.png",
      "/projects/lscs.png"
    ]
  },
  {
    "id": "northgym",
    "title": "NorthGym",
    "subtitle": "Manajemen Keanggotaan Gym, Workout Progression & Billing Membership",
    "category": "fullstack",
    "summary": "Platform kebugaran terpadu untuk member gym: pelacak latihan harian, log perkembangan fisik (body fat & beban), dan konfirmasi pembayaran langganan.",
    "description": "Sistem informasi manajemen pusat kebugaran dan studio gym modern yang dibangun dengan Laravel dan Filament Admin. Memudahkan member melihat jadwal instruktur, mencatat sesi angkat beban (set, repetisi, dan beban angkatan), memantau kurva penurunan lemak / kenaikan massa otot, serta memperpanjang langganan gym dengan unggah bukti transfer otomatis.",
    "architecture": [
      "Backend modular dengan Laravel Framework dan Filament PHP untuk antarmuka admin yang elegan",
      "Portal member khusus untuk tracking progres latihan dan jadwal kelas kebugaran",
      "Image processing untuk penyimpanan foto bukti transfer dan dokumentasi fisik berkala",
      "Basis data relasional MySQL untuk mencatat riwayat repetisi latihan dan masa aktif membership",
      "Desain antarmuka gelap (Dark Mode) modern yang sporty dan responsif"
    ],
    "stack": [
      "Laravel",
      "Filament PHP",
      "MySQL",
      "Bootstrap 5",
      "Blade",
      "Chart.js"
    ],
    "highlights": [
      "Pencatatan sesi latihan terstruktur memudahkan evaluasi prinsip progressive overload member",
      "Panel admin Filament yang bersih untuk verifikasi bukti pembayaran transfer kilat",
      "Grafik visual tracking berat badan dan body metrics yang memotivasi member"
    ],
    "challenges": "Merancang struktur data latihan yang fleksibel untuk berbagai jenis program latihan (Push-Pull-Legs, Upper-Lower, Full Body).",
    "role": "Full-Stack Web Developer",
    "githubUrl": "https://github.com/Asobirin29/NorthGym",
    "isPrivateRepo": true,
    "imageUrl": "/projects/northgym-home.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Admin Engine",
        "value": "Filament PHP"
      },
      {
        "label": "Core Feature",
        "value": "Workout Tracker"
      },
      {
        "label": "Theme",
        "value": "Sporty Dark Mode"
      }
    ],
    "images": [
      "/projects/northgym-home.png",
      "/projects/northgym-register.png",
      "/projects/northgym-admin.png",
      "/projects/northgym.png"
    ]
  },
  {
    "id": "stockswap",
    "title": "StockSwap",
    "subtitle": "Platform Barter & Pertukaran Inventori Bisnis B2B",
    "category": "fullstack",
    "summary": "Bursa pertukaran dan likuidasi stok inventori komersial: memungkinkan bisnis menukarkan surplus barang dengan komoditas lain tanpa uang tunai langsung.",
    "description": "Aplikasi e-commerce berbasis konsep modern barter dan exchange untuk mengatasi masalah inventori yang menumpuk (dead-stock). StockSwap menghubungkan para pelaku usaha, distributor, dan pengrajin agar dapat saling menawarkan aset barang berlebih mereka, mencocokkan valuasi barang secara adil, dan menyelesaikan proses pertukaran stok secara aman.",
    "architecture": [
      "Arsitektur web dibangun menggunakan Laravel Framework dan Filament Admin",
      "Sistem katalog barang dengan kategori multi-level dan atribut valuasi estimasi",
      "Modul negosiasi penawaran swap (trade proposal) antara dua pihak pemilik barang",
      "Manajemen keranjang barter dan verifikasi kesepakatan pengiriman logistik",
      "Sistem review reputasi trader untuk mencegah barang palsu atau cacat"
    ],
    "stack": [
      "Laravel",
      "Filament PHP",
      "MySQL",
      "Tailwind CSS",
      "Alpine.js"
    ],
    "highlights": [
      "Solusi cerdas bagi UMKM untuk mencairkan dead-stock tanpa menderita kerugian harga diskon ekstrem",
      "Alur pengajuan tawaran barter dua arah dengan kalkulasi selisih nilai barang",
      "Dashboard admin Filament untuk mengawasi keaslian komoditas yang diperjualbelikan"
    ],
    "challenges": "Mengembangkan logika valuasi barang non-kas yang adil dan mengamankan alur pengiriman timbal balik agar kedua belah pihak terlindungi.",
    "role": "Full-Stack Developer",
    "githubUrl": "https://github.com/Asobirin29/StockSwap",
    "isPrivateRepo": true,
    "imageUrl": "/projects/stockswap-home.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Trading Model",
        "value": "B2B Barter & Swap"
      },
      {
        "label": "Inventory Help",
        "value": "Dead-Stock Clearing"
      },
      {
        "label": "Architecture",
        "value": "Laravel + Filament"
      }
    ],
    "images": [
      "/projects/stockswap-home.png",
      "/projects/stockswap-market.png",
      "/projects/stockswap-admin.png",
      "/projects/stockswap.png"
    ]
  },
  {
    "id": "perjakin-bbspjis",
    "title": "PERJAKIN BBSPJIS",
    "subtitle": "Sistem Monitoring Perjanjian Kinerja & Evaluasi Sasaran Strategis Balai",
    "category": "fullstack",
    "summary": "Platform pengukuran akuntabilitas kinerja instansi pemerintah (AKIP) BBSPJIS: evaluasi Indikator Kinerja Utama (IKU) dan realisasi program tahunan.",
    "description": "Sistem tata kelola kinerja aparatur negara yang dikembangkan untuk Balai Besar Standardisasi dan Pelayanan Jasa Industri Selulosa. PERJAKIN memfasilitasi perumusan target perjanjian kinerja pimpinan, pemantauan capaian IKU triwulanan secara objektif, evaluasi efisiensi anggaran program, serta pembuatan laporan akuntabilitas kinerja instansi pemerintah secara otomatis.",
    "architecture": [
      "Backend sistem dibangun menggunakan PHP berorientasi objek dengan model MVC",
      "Basis data relasional MySQL menyimpan hierarki tujuan, sasaran strategis, dan indikator kinerja",
      "Algoritma kalkulasi capaian kinerja berbobot dengan batas toleransi capaian maksimal",
      "Modul ekspor ringkasan capaian kinerja tahunan ke format dokumen resmi dan PDF",
      "Panel kontrol data master tahun perjakin untuk pengarsipan historis dari tahun ke tahun"
    ],
    "stack": [
      "PHP",
      "MySQL",
      "Bootstrap",
      "JavaScript",
      "Chart.js",
      "PDF Reporting"
    ],
    "highlights": [
      "Mendukung transparansi evaluasi reformasi birokrasi dan akuntabilitas kinerja kementerian",
      "Kalkulasi capaian IKU otomatis meminimalisir kesalahan perhitungan manual spreadsheet",
      "Riwayat arsip data kinerja tersusun rapi untuk keperluan audit Inspektorat Jenderal"
    ],
    "challenges": "Menyesuaikan rumus perhitungan target kinerja pemerintah yang memiliki polaritas berbeda (makin tinggi makin baik vs makin rendah makin baik).",
    "role": "Full-Stack Enterprise Developer",
    "githubUrl": "https://github.com/Asobirin29/perjakin",
    "isPrivateRepo": true,
    "imageUrl": "/projects/perjakin-dashboard.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Organization",
        "value": "BBSPJIS Kemenperin"
      },
      {
        "label": "Standard",
        "value": "AKIP / SAKIP"
      },
      {
        "label": "Data Type",
        "value": "IKU & Realisasi"
      }
    ],
    "images": [
      "/projects/perjakin-dashboard.png",
      "/projects/perjakin-capaian.png",
      "/projects/perjakin-dokumen.png",
      "/projects/perjakin-indikator.png",
      "/projects/perjakin.png"
    ]
  },
  {
    "id": "sipena-budget",
    "title": "SIPENA",
    "subtitle": "Personal Budgeting, Multi-Wallet Assets & Cash Flow Tracking Engine",
    "category": "fullstack",
    "summary": "Platform manajemen keuangan dan perencanaan anggaran pribadi dengan pemisahan multi-dompet (payroll, tabungan, e-wallet) dan pelaporan arus kas.",
    "description": "Aplikasi finansial cerdas yang dirancang untuk membantu individu dan keluarga merencanakan masa depan keuangan yang sehat. SIPENA menyediakan pencatatan pemasukan dan pengeluaran harian berkategori, pemantauan saldo lintas rekening bank dan dompet digital, pelacak utang-piutang, manajemen pembayaran langganan rutin (recurring bills), serta analitik visual rasio tabungan.",
    "architecture": [
      "Aplikasi full-stack berbasis Laravel MVC Framework dengan performa kueri transaksi cepat",
      "Sistem pemisahan multi-wallet (Rekening Utama, Tabungan Darurat, Investasi, e-Wallet)",
      "Engine kalkulasi transaksi berulang (recurring schedule) otomatis tiap siklus bulanan",
      "Dashboard analitik dengan indikator visual sisa kuota anggaran per kategori belanja",
      "Antarmuka dark-theme modern berbasis Plus Jakarta Sans dan Bootstrap"
    ],
    "stack": [
      "Laravel",
      "PHP",
      "MySQL",
      "Bootstrap 5",
      "Chart.js",
      "JavaScript"
    ],
    "highlights": [
      "Manajemen multi-dompet mencegah bercampurnya dana operasional harian dan tabungan darurat",
      "Peringatan batas anggaran kategori mencegah pemborosan sebelum akhir bulan",
      "Visualisasi grafik arus kas yang informatif dan mudah dipahami dalam sekali pandang"
    ],
    "challenges": "Memastikan integritas saldo dompet selalu sinkron secara atomik ketika terjadi transaksi transfer antar dompet atau mutasi berulang.",
    "role": "Full-Stack Developer",
    "githubUrl": "https://github.com/Asobirin29/SIPENA",
    "isPrivateRepo": true,
    "imageUrl": "/projects/sipena-login.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Feature",
        "value": "Multi-Wallet Sync"
      },
      {
        "label": "Control",
        "value": "Budget Limit Alert"
      },
      {
        "label": "Analytics",
        "value": "Cash Flow Trends"
      }
    ],
    "images": [
      "/projects/sipena-login.png",
      "/projects/sipena-register.png",
      "/projects/sipena-dashboard.png",
      "/projects/sipena.png"
    ]
  },
  {
    "id": "undangan-online",
    "title": "Undangan Online",
    "subtitle": "Platform Undangan Pernikahan Digital Interaktif & Konfirmasi Kehadiran RSVP",
    "category": "fullstack",
    "summary": "Website undangan pernikahan interaktif berdesain mewah dengan pemutar musik latar, peta petunjuk lokasi Google Maps, countdown, dan buku tamu RSVP.",
    "description": "Solusi pembuatan dan penyebaran undangan pernikahan digital berbasis web interaktif. Didesain dengan estetika tipografi elegan, animasi transisi lembut, amplop digital interaktif, penghitung mundur hari H, integrasi petunjuk arah Google Maps, rekening amplop digital (QRIS & Bank Transfer), serta kolom ucapan doa selamat (RSVP) yang terhubung ke database.",
    "architecture": [
      "Frontend modern dengan HTML5 Semantic, CSS Grid/Flexbox, dan JavaScript murni",
      "Animasi scroll reveal interaktif dan efek buka amplop digital",
      "Backend ringan berbasis PHP untuk menyimpan ucapan doa tamu dan status konfirmasi kehadiran",
      "Format data JSON untuk konfigurasi nama mempelai, jadwal akad/resepsi, dan nomor rekening",
      "Optimalisasi aset gambar dan audio untuk waktu buka kilat di jaringan mobile seluler"
    ],
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "JSON DB",
      "Google Maps API",
      "Web Audio"
    ],
    "highlights": [
      "Desain responsif sempurna dan mewah di semua ukuran layar smartphone tamu",
      "Buku tamu interaktif: ucapan dan doa selamat dari kerabat langsung tampil secara real-time",
      "Kemudahan navigasi lokasi resepsi dengan satu klik menuju aplikasi Google Maps / Waze"
    ],
    "challenges": "Memastikan musik latar undangan dapat berputar otomatis dengan mulus dengan tetap mematuhi kebijakan autoplay policy browser modern.",
    "role": "Frontend Creative Developer",
    "githubUrl": "https://github.com/Asobirin29/Undangan_Online",
    "isPrivateRepo": true,
    "imageUrl": "/projects/undangan-cover.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Type",
        "value": "Digital Invitation"
      },
      {
        "label": "Features",
        "value": "Audio & RSVP Live"
      },
      {
        "label": "Mobile Friendly",
        "value": "100% Responsive"
      }
    ],
    "images": [
      "/projects/undangan-cover.png",
      "/projects/undangan-dashboard.png",
      "/projects/undangan-interactive.png"
    ]
  },
  {
    "id": "proyek-riezz",
    "title": "Riezz Kitchen",
    "subtitle": "Sistem E-Commerce Produksi Makanan & POS Pemesanan Katering",
    "category": "fullstack",
    "summary": "Platform pemesanan kuliner dan manajemen produksi makanan katering: kontrol stok bahan baku, kalkulasi biaya pokok produksi, dan invoice pesanan.",
    "description": "Aplikasi pengelolaan bisnis kuliner dan katering yang mengintegrasikan etalase pemesanan makanan online untuk pelanggan dengan dashboard kontrol produksi di dapur. Membantu pemilik bisnis memantau stok bahan mentah, menghitung kebutuhan bahan untuk pesanan skala besar, memproses transaksi kasir, serta mencatat laporan laba penjualan harian.",
    "architecture": [
      "Frontend etalase berbasis HTML5, CSS kustom, dan antarmuka katalog responsif",
      "Backend pemrosesan pesanan berbasis PHP dan basis data transaksional MySQL",
      "Modul manajemen resep dan pemotongan stok bahan baku otomatis saat pesanan dibuat",
      "Dashboard admin terpisah untuk staf dapur dan pemilik usaha kuliner",
      "Struktur data riezz.sql yang rapi mencakup tabel menu, bahan, transaksi, dan akun"
    ],
    "stack": [
      "PHP",
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "POS Architecture"
    ],
    "highlights": [
      "Mengurangi risiko kehabisan bahan katering saat menangani pesanan partai besar",
      "Pencatatan nota transaksi otomatis mengeliminasi bon manual di meja kasir",
      "Desain katalog makanan yang menggugah selera dengan foto produk resolusi tinggi"
    ],
    "challenges": "Menghubungkan kalkulasi pengurangan gramatur bahan baku dapur secara akurat berdasarkan setiap menu makanan yang terjual.",
    "role": "Full-Stack Web Developer",
    "githubUrl": "https://github.com/Asobirin29/proyek-riezz",
    "isPrivateRepo": true,
    "imageUrl": "/projects/riezz-front.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Domain",
        "value": "Food & Catering"
      },
      {
        "label": "Core Engine",
        "value": "Stock & Recipe Sync"
      },
      {
        "label": "Channel",
        "value": "Web POS & Catalog"
      }
    ],
    "images": [
      "/projects/riezz-front.png",
      "/projects/riezz-login.png",
      "/projects/riezz-bahan.png",
      "/projects/riezz-produk.png"
    ]
  },
  {
    "id": "silosa-bbspjis",
    "title": "SILOSA BBSPJIS",
    "subtitle": "Sistem Informasi Layanan Online Selulosa Terpadu & Portal Helpdesk Internal",
    "category": "fullstack",
    "summary": "Pusat integrasi layanan digital dan penanganan insiden infrastruktur balai riset selulosa dengan antarmuka terpusat antar unit kerja.",
    "description": "Aplikasi portal internal Balai Besar Standardisasi dan Pelayanan Jasa Industri Selulosa (BBSPJIS) yang menjadi gerbang utama integrasi seluruh layanan balai. Menyediakan modul pelaporan kendala jaringan/infrastruktur, permohonan fasilitas gedung dan ruang rapat, pengajuan perangkat IT laboratorium, serta sistem notifikasi penugasan tugas analis balai secara terpadu.",
    "architecture": [
      "Backend berbasis arsitektur modular PHP dengan koneksi database MySQL",
      "Sistem perutean layanan terpusat untuk berbagai unit bagian di balai selulosa",
      "Integrasi session aman dan hak akses pegawai balai",
      "Antarmuka admin dashboard dengan indikator status penanganan layanan secara live",
      "Pemisahan controller dan views untuk kemudahan perawatan sistem jangka panjang"
    ],
    "stack": [
      "PHP",
      "MySQL",
      "Bootstrap 5",
      "jQuery",
      "Enterprise Portal"
    ],
    "highlights": [
      "Menjadi poros integrasi layanan digital internal bagi seluruh pegawai balai selulosa",
      "Penanganan insiden lab dan kantor terpantau dengan jelas status pengerjaannya",
      "Mengurangi birokrasi memo internal konvensional menjadi tiket elektronik cepat"
    ],
    "challenges": "Mengintegrasikan berbagai kebutuhan unit kerja balai yang heterogen ke dalam satu antarmuka portal yang tetap simpel dan mudah digunakan.",
    "role": "Full-Stack Enterprise Developer",
    "githubUrl": "https://github.com/Asobirin29/SILOSA-bbspjis",
    "isPrivateRepo": true,
    "imageUrl": "/projects/silosa-calendar.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Agency",
        "value": "BBSPJIS Kemenperin"
      },
      {
        "label": "Role",
        "value": "Internal Gateway"
      },
      {
        "label": "Infrastructure",
        "value": "Enterprise Lab"
      }
    ],
    "images": [
      "/projects/silosa-calendar.png",
      "/projects/silosa-login.png",
      "/projects/silosa-admin.png",
      "/projects/silosa.png"
    ]
  },
  {
    "id": "alisa-bbspjis",
    "title": "ALISA BBSPJIS",
    "subtitle": "Sistem Informasi Manajemen Arsip & Digitalisasi Dokumen Balai Selulosa",
    "category": "fullstack",
    "summary": "Platform pengelolaan arsip digital, retensi dokumen, dan pelacakan warkat dinas internal Balai Besar Standardisasi Industri Selulosa.",
    "description": "Aplikasi manajemen kearsipan digital (ALISA) yang dibangun untuk mentransformasikan ribuan berkas fisik dan surat dinas BBSPJIS ke dalam format digital terstruktur. Dilengkapi fitur kalender retensi berkas, klasifikasi kategori arsip dinamis, pencarian metadata dokumen instan, serta kontrol hak akses berbasis peran administrator dan pengelola arsip balai.",
    "architecture": [
      "Backend modular PHP MVC dengan integrasi database relasional MySQL",
      "Sistem klasifikasi multi-level untuk kategori warkat, kode arsip dinas, dan nomor surat",
      "Kalender jadwal retensi arsip digital untuk otomasi pengingat masa simpan dokumen",
      "Panel kontrol administrasi berkas dengan audit log akses dokumen sensitif",
      "Antarmuka responsif ramah pengguna untuk pencarian cepat dokumen balai"
    ],
    "stack": [
      "PHP",
      "MySQL",
      "Bootstrap 5",
      "JavaScript",
      "Document Archiving",
      "MVC Architecture"
    ],
    "highlights": [
      "Digitalisasi penuh ribuan berkas warkat dan arsip fisik balai selulosa",
      "Kalender retensi berkas untuk memastikan kepatuhan jadwal pemusnahan & retensi dokumen negara",
      "Pencarian instan dokumen dinas memangkas waktu temu kembali dari jam menjadi detik"
    ],
    "challenges": "Merancang skema metadata berkas fleksibel yang dapat menampung beragam format dokumen dinas dari berbagai dekade.",
    "role": "Full-Stack System Developer",
    "githubUrl": "https://github.com/Asobirin29/ALISA",
    "isPrivateRepo": true,
    "imageUrl": "/projects/alisa-login.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Agency",
        "value": "BBSPJIS Kemenperin"
      },
      {
        "label": "Domain",
        "value": "Digital Archive"
      },
      {
        "label": "Lifecycle",
        "value": "Retention Calendar"
      }
    ],
    "images": [
      "/projects/alisa-login.png",
      "/projects/alisa-calendar.png",
      "/projects/alisa-admin.png"
    ]
  },
  {
    "id": "finvas-finance",
    "title": "Finvas",
    "subtitle": "Platform Manajemen Pembukuan Keuangan, Klien, & Kearsipan Fiskal",
    "category": "fullstack",
    "summary": "Sistem pembukuan keuangan dan arsip transaksi komprehensif dengan analitik arus kas, manajemen invoice klien, dan kepatuhan audit.",
    "description": "Sistem informasi keuangan dan kearsipan fiskal (Finvas) yang menyatukan alur pencatatan buku besar, manajemen klien, penerbitan invoice, dan statistik keuangan live. Memungkinkan tim akuntansi dan manajemen memantau kesehatan kas, jadwal pembayaran termin, serta kepatuhan dokumen transaksi secara real-time.",
    "architecture": [
      "Arsitektur modular PHP MVC yang teroptimasi untuk integritas transaksi keuangan",
      "Database MySQL dengan perancangan tabel relasi buku besar, jurnal, dan akun klien",
      "Modul kalender keuangan untuk jatuh tempo tagihan, rekonsiliasi bank, dan pajak",
      "Dashboard analitik statistik kas masuk dan keluar dengan visualisasi interaktif",
      "Manajemen dokumen pendukung invoice untuk mempermudah audit keuangan"
    ],
    "stack": [
      "PHP",
      "MySQL",
      "Bootstrap 5",
      "Chart.js",
      "Financial Ledger",
      "MVC Architecture"
    ],
    "highlights": [
      "Otomasi pencatatan arus kas dan rekonsiliasi buku besar multi-klien",
      "Visualisasi statistik keuangan real-time untuk pengambilan keputusan strategis",
      "Kalender jatuh tempo invoice untuk meminimalisir piutang macet"
    ],
    "challenges": "Memastikan integritas saldo buku besar dengan validasi ketat transaksi debit dan kredit agar tidak terjadi selisih matematis.",
    "role": "Full-Stack Financial Systems Developer",
    "githubUrl": "https://github.com/Asobirin29/Finvas",
    "isPrivateRepo": true,
    "imageUrl": "/projects/finvas-login.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Category",
        "value": "Financial ERP"
      },
      {
        "label": "Modules",
        "value": "Ledger & Clients"
      },
      {
        "label": "Reporting",
        "value": "Real-time Stats"
      }
    ],
    "images": [
      "/projects/finvas-login.png",
      "/projects/finvas-calendar.png",
      "/projects/finvas-stats.png"
    ]
  },
  {
    "id": "asbrnn-portfolio",
    "title": "ASBRNN Engine",
    "subtitle": "Interactive Multi-Theme Portfolio System & Live Local CMS Engine",
    "category": "fullstack",
    "summary": "Platform portofolio web berkinerja tinggi dengan 4 tema desain interaktif (Modern, Ocean, Retro, Cyber), Admin Dashboard, dan sinkronisasi file kode lokal.",
    "description": "Karya rekayasa sistem portofolio developer yang memadukan keindahan visual dengan arsitektur teknis kelas atas. ASBRNN menyajikan 4 paradigma antarmuka yang dapat diganti secara instan: Modern Bauhaus, Ocean Bikini Bottom dengan simulasi fisika laut, Retro 90s OS Desktop, dan Cyber Terminal berbasis CLI. Dilengkapi dengan Admin Dashboard interaktif (`/admin`) dan Vite server middleware yang memungkinkan pembaruan data langsung tersimpan secara permanen ke file TypeScript lokal.",
    "architecture": [
      "Frontend reaktif performa tinggi dengan React 19, TypeScript, dan Tailwind CSS v4",
      "Custom physics canvas stages dan Lenis smooth scrolling engine",
      "Vite server-side middleware plugin untuk sinkronisasi simpan data otomatis ke source code",
      "State management terisolasi dengan PortfolioDataContext dan persistensi browser cerdas",
      "Modal Case Study mendalam dengan galeri multi-foto lightbox dan pembacaan metrik teknis"
    ],
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Framer Motion",
      "HTML5 Canvas",
      "Local Dev API"
    ],
    "highlights": [
      "4 tema desain interaktif radikal yang dapat dialihkan secara mulus dalam hitungan milidetik",
      "Admin CMS lokal langsung menyimpan perubahan ke kode tanpa butuh database cloud eksternal",
      "Skor performa Lighthouse tinggi dengan zero-runtime overhead dan visual memukau"
    ],
    "challenges": "Mengelola 4 sistem tema desain yang sangat berbeda karakternya agar tetap berbagi satu sumber kebenaran data (single source of truth) yang konsisten.",
    "role": "Lead Architect & UI/UX Engineer",
    "githubUrl": "https://github.com/Asobirin29/ASBRNN",
    "isPrivateRepo": false,
    "imageUrl": "/projects/asbrnn-modern.png",
    "imageFit": "cover",
    "featured": false,
    "metrics": [
      {
        "label": "Themes",
        "value": "4 Switchable Modes"
      },
      {
        "label": "CMS Engine",
        "value": "Live Code Sync API"
      },
      {
        "label": "Speed",
        "value": "60 FPS Fluid"
      }
    ],
    "images": [
      "/projects/asbrnn-modern.png",
      "/projects/asbrnn-admin.png"
    ]
  },
  {
    "id": "asobirin29-agent",
    "title": "Asobirin29 Hub",
    "subtitle": "Developer Profile Console, Terminal Visuals & Automation Workflows",
    "category": "fullstack",
    "summary": "Ekosistem otomatisasi profil developer: generator konsol agen SVG dinamis, animasi terminal interaktif, dan pipeline sinkronisasi GitHub otomatis.",
    "description": "Infrastruktur profil rekayasa perangkat lunak dan otomasi alur kerja GitHub milik Ahmad Sobirin. Mengintegrasikan generator aset visual berbasis Python dan Node.js untuk menghasilkan kartu metrik terminal, konsol agen SVG dinamis adaptif (dark/light theme), pelacak kontribusi kode, serta skrip otomatisasi pipeline CI/CD yang memperbarui statistik repositori secara berkala.",
    "architecture": [
      "Generator visual berbasis skrip Node.js dan Python untuk merender grafik SVG dinamis",
      "GitHub Actions workflow untuk build otomatis dan deployment aset profil",
      "Desain antarmuka terminal bergaya retro cyberpunk dengan tipografi monospaced",
      "Konfigurasi modular profile.config.json sebagai sumber data deklaratif",
      "Integrasi status commit GitHub API dan badges metrik performa kode"
    ],
    "stack": [
      "Node.js",
      "Python",
      "SVG Vector Engine",
      "GitHub Actions",
      "Bash Scripting",
      "Markdown"
    ],
    "highlights": [
      "Aset konsol agen SVG adaptif yang otomatis menyesuaikan tema browser terang/gelap",
      "Otomasi regenerasi visual metrik tanpa perlu pengeditan manual setiap ada rilis baru",
      "Representasi identitas teknis yang kuat di mata komunitas open-source global"
    ],
    "challenges": "Membuat rendering SVG vektor yang kompatibel secara sempurna di berbagai klien web GitHub tanpa bergantung pada script eksternal yang dibatasi CSP.",
    "role": "Automation Engineer & Creator",
    "githubUrl": "https://github.com/Asobirin29/Asobirin29",
    "isPrivateRepo": false,
    "imageUrl": "/projects/asobirin-console.png",
    "imageFit": "contain",
    "featured": false,
    "metrics": [
      {
        "label": "Visuals",
        "value": "Adaptive SVG Vector"
      },
      {
        "label": "CI/CD",
        "value": "GitHub Actions Auto"
      },
      {
        "label": "Ecosystem",
        "value": "Open-Source Profile"
      }
    ],
    "images": [
      "/projects/asobirin-console.png",
      "/projects/asobirin-terminal.png",
      "/projects/asobirin-profile.png"
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    "id": "edu-widyat",
    "period": "2023 - Sekarang",
    "role": "S1 SISTEM INFORMASI",
    "organization": "UNIVERSITAS KOMPUTER INDONESIA",
    "badge": "Pendidikan Formal",
    "category": "education",
    "description": "Menempuh studi sarjana Teknik Informatika dengan pendalaman fundamental ilmu komputer, struktur data, algoritma, rekayasa perangkat lunak, dan mengambil penjurusan spesialisasi Database / Data Analyst.",
    "highlights": [
      "Penjurusan Database & Data Analyst",
      "Pemodelan Data Relasional & Optimasi Query SQL",
      "Fundamental Rekayasa Perangkat Lunak & Algoritma"
    ],
    "tech": [
      "Database Systems",
      "Data Analysis",
      "SQL",
      "Algorithms",
      "Software Engineering",
      "System Design"
    ]
  },
  {
    "id": "exp-dicoding-dbs",
    "period": "Feb 2026 - Jul 2026",
    "role": "Fullstack Developer (Learning Path)",
    "organization": "Dicoding CodingCamp 2026 Powered by DBS Foundation",
    "badge": "Intensive Bootcamp",
    "category": "bootcamp",
    "description": "Program beasiswa pelatihan intensif Fullstack Developer dari Dicoding dan DBS Foundation. Membangun arsitektur frontend web modern (React & Vite), integrasi API backend type-safe, otentikasi data, dan berkolaborasi dalam Capstone Project kalorinAI.",
    "highlights": [
      "Lulusan Jalur Fullstack Developer",
      "Integrasi REST API, State Management & Cloud DB",
      "Kolaborasi Tim Capstone Project kalorinAI"
    ],
    "tech": [
      "React",
      "TypeScript",
      "Node.js",
      "Supabase",
      "Prisma ORM",
      "Tailwind CSS",
      "REST API"
    ]
  },
  {
    "id": "exp-cimart-mbkm",
    "period": "Jul 2026 - Sekarang",
    "role": "Full-Stack Developer",
    "organization": "Inisiatif MBKM / KKN Tematik & Capstone Kampus Desa Cibenda",
    "badge": "MBKM / Capstone Kampus",
    "category": "project",
    "description": "Inisiatif MBKM / KKN Tematik resmi dari kampus yang menjadi Capstone Project untuk digitalisasi komoditas ekonomi warga Desa Cibenda, Pangandaran. Dikerjakan secara mandiri dari perancangan arsitektur sistem, integrasi payment gateway Midtrans, notifikasi FCM, hingga deployment produksi.",
    "highlights": [
      "Mandat Resmi Pimpinan Kampus & Perangkat Desa",
      "Development Arsitektur End-to-End",
      "Integrasi Payment Gateway Midtrans & WebSockets"
    ],
    "tech": [
      "Laravel",
      "Inertia.js",
      "React",
      "MySQL",
      "Docker",
      "WebSockets",
      "Midtrans",
      "Leaflet"
    ]
  },
  {
    "id": "exp-rework-cybersecurity",
    "period": "Agu 2026 - Des 2026",
    "role": "Cyber Security Trainee (Red Team Focus)",
    "organization": "Cyber Security Bootcamp by Rework Academy",
    "badge": "Cyber Security Bootcamp",
    "category": "security",
    "description": "Pelatihan intensif keamanan siber komprehensif mulai dari fundamental cybersecurity, vulnerability assessment, web application penetration testing (OWASP Top 10), network penetration testing, bug bounty hunting, hingga penyusunan security reporting profesional. Fokus mendalam pada Red Team (Offensive Security) dengan pemahaman komplementer Blue Team (Defensive) dan Purple Team.",
    "highlights": [
      "Web Application & Network Penetration Testing",
      "Metodologi Bug Bounty & Eksploitasi OWASP Top 10",
      "Vulnerability Assessment & Security Reporting",
      "Fokus Offensive Red Team dengan Pemahaman Blue/Purple Team"
    ],
    "tech": [
      "Web App Pentesting",
      "Network Security",
      "OWASP Top 10",
      "Bug Bounty",
      "Red Teaming",
      "Linux Security",
      "Security Reporting"
    ]
  }
];
