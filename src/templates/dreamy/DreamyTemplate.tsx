import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  Clock,
  Star,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
  Settings,
  Heart,
  Send,
  Zap
} from 'lucide-react';
import type { TemplateComponentProps } from '../types';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useLenisSmoothScroll } from '../../hooks/useLenisSmoothScroll';
import { TechIcon } from '../common/TechIcon';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { DreamyStarfield } from './DreamyStarfield';
import { SparkleContainer, useSparkleOnClick } from './SparkleOnClick';
import { CinematicIntro } from './CinematicIntro';
import { PolaroidCard } from './PolaroidCard';

export const DreamyTemplate: React.FC<TemplateComponentProps> = ({ onOpenProject }) => {
  const { profile, projects, techStack, experience } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Enable smooth scrolling and tap-to-sparkle
  useLenisSmoothScroll();
  useSparkleOnClick();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Jakarta',
        }) + ' WIB'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    if (profile.contact.email) {
      navigator.clipboard.writeText(profile.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleNextPhoto = () => {
    setCarouselIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrevPhoto = () => {
    setCarouselIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#f1f5f9] font-sans antialiased selection:bg-[#d4a574] selection:text-[#0a0e1a] relative pb-24 overflow-x-hidden">
      {/* 1. Cinematic Intro Animation */}
      <CinematicIntro name={profile.name} tagline={profile.tagline} />

      {/* 2. Interactive 3D Three.js Starfield Background */}
      <DreamyStarfield />

      {/* 3. Global Click Particle Sparkles */}
      <SparkleContainer />

      {/* Ambient Radial Color Washes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[650px] h-[650px] rounded-full bg-rose-500/10 blur-[180px]" />
        <div className="absolute top-[40%] right-[10%] w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[180px]" />
      </div>

      {/* Dreamy Top Floating Navigation Bar */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#121829]/80 backdrop-blur-2xl border border-[#2a3754]/80 rounded-2xl px-5 py-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-amber-400 to-rose-400" />
            </span>
            <span className="font-bold text-white text-sm tracking-wide">
              {profile.name}{' '}
              <span className="text-[#d4a574] font-serif italic text-xs ml-1">✦ Celestial</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#about" className="hover:text-amber-200 transition-colors">Tentang</a>
            <a href="#projects" className="hover:text-amber-200 transition-colors">Galeri Karya</a>
            <a href="#arsenal" className="hover:text-amber-200 transition-colors">Arsenal</a>
            <a href="#journey" className="hover:text-amber-200 transition-colors">Perjalanan</a>
            <a href="#contact" className="hover:text-amber-200 transition-colors">Kontak</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#/admin"
              className="px-3 py-1.5 rounded-xl bg-[#1b233a] hover:bg-[#25304e] border border-[#2e3e63] text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-amber-300" />
              <span>Admin</span>
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#d4a574] to-[#f4a7bb] hover:from-[#e2b585] hover:to-[#f9b8c9] text-[#0a0e1a] text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Sapa Saya</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-16">
        {/* ================= HERO & CELESTIAL IDENTITY ================= */}
        <section id="about" className="relative pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Avatar & Celestial Halo */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Rotating decorative golden orbit ring */}
                <div className="absolute -inset-4 rounded-full border border-dashed border-amber-400/30 animate-spin [animation-duration:40s] pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-dotted border-rose-400/20 animate-spin [animation-duration:25s] [animation-direction:reverse] pointer-events-none" />

                {/* Avatar Glow Ring */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-[#d4a574] via-[#f4a7bb] to-[#c9b1ff] shadow-[0_0_40px_rgba(212,165,116,0.35)]">
                  <img
                    src={profile.avatarUrl || '/avatar.svg'}
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover bg-[#0f172a] border-4 border-[#0a0e1a]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/avatar.svg';
                    }}
                  />
                </div>

                {/* Floating Heart & Sparkle Badges */}
                <div className="absolute -bottom-2 right-4 px-3 py-1 rounded-full bg-[#141b2d] border border-amber-400/40 text-[11px] font-semibold text-amber-200 flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{profile.status || 'Active'}</span>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <span className="text-xs font-mono text-amber-300/80 tracking-widest uppercase">
                  {profile.education}
                </span>
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{profile.contact.location || 'Indonesia'}</span>
                </p>
              </div>
            </div>

            {/* Right: Narrative & Bio Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>Portofolio & Visual Studio</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-[#ffe5b4] via-[#f4a7bb] to-[#c9b1ff] bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                </h1>

                <p className="text-base sm:text-xl font-medium text-slate-200">
                  {profile.tagline}
                </p>
              </div>

              {/* Faendita-Style Letter / Paper Bio Box */}
              <div className="relative p-6 sm:p-7 rounded-3xl bg-[#141b2d]/80 backdrop-blur-xl border border-[#2a3754]/90 shadow-xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/10 to-transparent pointer-events-none" />
                <div className="absolute top-3 right-4 text-xs font-serif italic text-amber-300/70">
                  ✦ Memoar Pengembang
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  "{profile.bio}"
                </p>

                <div className="pt-4 mt-4 border-t border-[#20293f] flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-amber-200 font-serif italic">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/60" />
                    <span>Dedikasi & Ketelitian Tinggi</span>
                  </span>
                  <span>{profile.experienceStart || 'Full-Stack Developer'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d4a574] via-[#e8b4b8] to-[#f4a7bb] hover:from-[#e2b585] hover:to-[#f9b8c9] text-[#0a0e1a] text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Jelajahi Galeri Polaroid</span>
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-2xl bg-[#141b2d] hover:bg-[#1d273f] border border-[#2e3e63] text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>Kirim Pesan</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONSTELLATION STATS STRIP ================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#141b2d]/80 backdrop-blur-xl border border-[#2a3754]/80 text-center space-y-1 shadow-lg hover:border-amber-400/40 transition-all">
            <span className="text-[11px] font-semibold text-amber-300/80 uppercase tracking-wider">Karya Selesai</span>
            <p className="text-2xl sm:text-3xl font-black text-white">{projects.length}</p>
            <p className="text-[11px] text-slate-400">Proyek Unggulan</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141b2d]/80 backdrop-blur-xl border border-[#2a3754]/80 text-center space-y-1 shadow-lg hover:border-rose-400/40 transition-all">
            <span className="text-[11px] font-semibold text-rose-300/80 uppercase tracking-wider">Tech Arsenal</span>
            <p className="text-2xl sm:text-3xl font-black text-white">{techStack.length}+</p>
            <p className="text-[11px] text-slate-400">Framework & Tools</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141b2d]/80 backdrop-blur-xl border border-[#2a3754]/80 text-center space-y-1 shadow-lg hover:border-purple-400/40 transition-all">
            <span className="text-[11px] font-semibold text-purple-300/80 uppercase tracking-wider">Jejak Karir</span>
            <p className="text-2xl sm:text-3xl font-black text-white">{experience.length}</p>
            <p className="text-[11px] text-slate-400">Milestone Berharga</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141b2d]/80 backdrop-blur-xl border border-[#2a3754]/80 text-center space-y-1 shadow-lg hover:border-amber-400/40 transition-all">
            <span className="text-[11px] font-semibold text-amber-300/80 uppercase tracking-wider">Jam Jakarta</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-amber-200 mt-1">{currentTime || 'WIB'}</p>
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>Asia / Jakarta</span>
            </p>
          </div>
        </section>

        {/* ================= 14 MEMORIES POLAROID GALLERY (PROJECTS) ================= */}
        <section id="projects" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs font-semibold mb-2">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                <span>Galeri 3D Polaroid Interaktif</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Koleksi Karya Pilihan
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Arahkan kursor pada kartu polaroid untuk merasakan efek 3D tilt fisik, dan klik untuk detail.
              </p>
            </div>

            {/* Toggle View Mode */}
            <div className="flex items-center gap-1 bg-[#141b2d] p-1 rounded-xl border border-[#2a3754]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#d4a574] to-[#f4a7bb] text-[#0a0e1a] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-gradient-to-r from-[#d4a574] to-[#f4a7bb] text-[#0a0e1a] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Carousel</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: CAROUSEL (FAENDITA VIBE) */}
          {viewMode === 'carousel' && projects.length > 0 && (
            <div className="relative py-8 flex flex-col items-center">
              {/* Main Active Polaroid Card in Carousel */}
              <div className="w-full max-w-md mx-auto">
                <PolaroidCard
                  project={projects[carouselIndex]}
                  onOpenProject={onOpenProject}
                />
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handlePrevPhoto}
                  className="p-3 rounded-full bg-[#141b2d] hover:bg-[#1d273f] border border-[#2a3754] text-slate-200 hover:text-amber-200 transition-all shadow-md cursor-pointer"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === carouselIndex
                          ? 'w-6 bg-gradient-to-r from-amber-400 to-rose-400'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextPhoto}
                  className="p-3 rounded-full bg-[#141b2d] hover:bg-[#1d273f] border border-[#2a3754] text-slate-200 hover:text-amber-200 transition-all shadow-md cursor-pointer"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-2 font-mono">
                {carouselIndex + 1} / {projects.length}
              </p>
            </div>
          )}

          {/* VIEW 2: MULTI-COLUMN POLAROID GRID */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <PolaroidCard
                  key={project.id}
                  project={project}
                  onOpenProject={onOpenProject}
                  isFlagship={project.id === featuredProject?.id && projects.length % 2 === 1}
                />
              ))}
            </div>
          )}
        </section>

        {/* ================= STARRY ARSENAL (TECH STACK) ================= */}
        <section id="arsenal" className="space-y-6 scroll-mt-20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-2">
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Konstelasi Keahlian</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tech Arsenal & Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Teknologi, bahasa, dan ekosistem modern yang dikuasai untuk merancang aplikasi berkualitas.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#141b2d]/80 backdrop-blur-xl border border-[#2a3754]/80 shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0f172a]/70 border border-[#24314e] hover:border-amber-400/50 hover:bg-[#1a233a] transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <TechIcon name={tech.iconKey || tech.name} size={22} color={tech.color} />
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {tech.layer}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                      {tech.name}
                    </p>
                    <p className="text-[10px] text-slate-400 capitalize truncate mt-0.5">
                      {tech.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MILESTONE STARGAZE (EXPERIENCE) ================= */}
        <section id="journey" className="space-y-6 scroll-mt-20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3 h-3 text-purple-300" />
              <span>Jalur Dedikasi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Perjalanan & Pengalaman
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Fase dan milestone karir dalam membangun produk digital dan ekosistem software.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((item, index) => (
              <div
                key={item.id}
                className="relative p-6 sm:p-7 rounded-3xl bg-[#141b2d]/80 backdrop-blur-xl border border-[#2a3754]/80 hover:border-amber-400/40 shadow-xl transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_8px_#d4a574]" />
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-200 border border-amber-400/20">
                      {item.period}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold text-rose-300 uppercase tracking-wider">
                        • {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-serif italic text-slate-400">
                    Milestone #{index + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.role}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-rose-300/90 mt-0.5">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mt-3">
                  {item.description}
                </p>

                {item.tech && item.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 mt-2 border-t border-[#20293f]">
                    {item.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#1d273f]/90 text-[10px] text-slate-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= CELESTIAL LOVE LETTER / CONTACT ================= */}
        <section id="contact" className="space-y-6 scroll-mt-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#141b2d] via-[#182035] to-[#1d1e3d] border border-[#2a3754] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-500/15 via-amber-500/10 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                <span>Saluran Terbuka</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Mari Berkolaborasi & Menciptakan Sesuatu yang Berkesan.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Punya ide proyek, tawaran engineering role, atau ingin berdiskusi mengenai arsitektur web & mobile? Saya siap mendengar dan mewujudkannya bersama Anda.
              </p>

              {/* Direct Channels */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#0f172a] hover:bg-[#1a243d] border border-[#2e3e63] text-xs font-semibold text-slate-200 flex items-center justify-between transition-all cursor-pointer group shadow-inner"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                      <span className="truncate">{profile.contact.email}</span>
                    </div>
                    {copiedEmail ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin!</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 group-hover:text-amber-200 text-[11px]">
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </span>
                    )}
                  </button>

                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#d4a574] via-[#e8b4b8] to-[#f4a7bb] hover:from-[#e2b585] hover:to-[#f9b8c9] text-[#0a0e1a] text-xs font-bold text-center shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Email</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {profile.contact.github && (
                    <a
                      href={profile.contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1a243d] border border-[#2e3e63] text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <GithubIcon size={16} />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}

                  {profile.contact.linkedin && (
                    <a
                      href={profile.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1a243d] border border-[#2e3e63] text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <LinkedinIcon size={16} />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-16 pb-8 px-4 text-center text-xs text-slate-400 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1b233a] mt-20">
        <p className="flex items-center gap-1.5">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>•</span>
          <span className="text-amber-200 font-serif italic">Dreamy Celestial Studio</span>
        </p>

        <a
          href="#/admin"
          className="hover:text-amber-200 transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141b2d] border border-[#2a3754]"
        >
          <Settings className="w-3.5 h-3.5 text-amber-300" />
          <span>Admin Shortcut (Ctrl+Shift+A)</span>
        </a>
      </footer>
    </div>
  );
};

export default DreamyTemplate;

