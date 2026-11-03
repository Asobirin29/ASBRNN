import React, { useRef, useState } from 'react';
import {
  ExternalLink,
  Mail,
  ArrowRight,
  ArrowDown,
  Copy,
  Check,
  Plus,
  Minus,
  User
} from 'lucide-react';
import type { TemplateComponentProps } from '../types';
import type { ProjectCategory, TechLayer } from '../../types/portfolio';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useLenisSmoothScroll } from '../../hooks/useLenisSmoothScroll';
import { TechIcon } from '../common/TechIcon';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { shouldPlayIntro, useRevealOnScroll } from '../common/motion';
import { BauhausCount, BauhausIntro, BauhausMarquee, BauhausProgress, BauhausTextRing } from './BauhausMotion';
import { BauhausDecorations } from './BauhausDecorations';
import { BAUHAUS_INTRO_KEY, useBauhausParallax } from './bauhausShared';

const PLANE_COLORS = ['#ff0000', '#0000ff', '#ffff00'];
const stagger = (i: number, step = 90) => ({ '--bh-d': `${i * step}ms` }) as React.CSSProperties;

export const ModernTemplate: React.FC<TemplateComponentProps> = ({ onOpenProject }) => {
  const { profile, projects, techStack, experience } = usePortfolioData();
  const [filterCategory, setFilterCategory] = useState<ProjectCategory>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [activeDisclosure, setActiveDisclosure] = useState<number | null>(0);
  const [activeLedgerProject, setActiveLedgerProject] = useState<string | null>(
    projects[0]?.id || null
  );
  const [showIntro, setShowIntro] = useState(() => shouldPlayIntro(BAUHAUS_INTRO_KEY));
  const rootRef = useRef<HTMLDivElement | null>(null);
  const redPlaneRef = useBauhausParallax<HTMLDivElement>();

  useLenisSmoothScroll();
  useRevealOnScroll(rootRef, '[data-bh]', 'bh-in', 'bh-ready', [filterCategory]);

  const handleCopyEmail = () => {
    if (profile.contact.email) {
      navigator.clipboard.writeText(profile.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  // Group tech stack by layer for Bauhaus capability matrices
  const techLayers: { layer: TechLayer; title: string; color: string; textColor: string }[] = [
    { layer: 'client', title: 'CLIENT LAYER (FRONTEND & MOBILE)', color: '#0000ff', textColor: '#ffffff' },
    { layer: 'backend', title: 'SERVER & API ARCHITECTURE', color: '#ff0000', textColor: '#ffffff' },
    { layer: 'database', title: 'DATABASE & DATA INTEGRITY', color: '#ffff00', textColor: '#000000' },
    { layer: 'devops', title: 'DEVOPS & SYSTEM INFRASTRUCTURE', color: '#000000', textColor: '#ffffff' },
  ];

  const getTechByLayer = (layer: TechLayer) => {
    return techStack.filter((t) => t.layer === layer);
  };

  const architecturalDisclosures = [
    {
      q: 'Bagaimana pendekatan arsitektur sistem yang Anda terapkan?',
      a: 'Mengedepankan prinsip "Form Follows Function": pemisahan tanggung jawab (Separation of Concerns), kontrak tipe statis yang ketat (TypeScript / Dart), API terstandarisasi, dan optimasi query database untuk menghasilkan latensi minimal dan skalabilitas jangka panjang.'
    },
    {
      q: 'Bagaimana metode integrasi dan pengujian pada proyek mobile & full-stack?',
      a: 'Setiap endpoint diuji dengan skenario batas, state management terisolasi (Redux Toolkit / BLoC / Zustand), containerization Docker untuk paritas lingkungan produksi, dan pipeline linting otomatis sebelum kompilasi.'
    },
    {
      q: 'Apakah kode sumber proyek dapat diinspeksi secara langsung?',
      a: 'Sebagian besar proyek menyediakan repositori publik GitHub dengan README terperinci, diagram arsitektur, dan instruksi deployment. Untuk proyek korporat yang bersifat confidential, demo live dan studi kasus teknis disediakan pada tombol [BEDAH ARSITEKTUR].'
    },
    {
      q: 'Ketersediaan untuk kontrak kerja, rekayasa produk, atau konsultasi?',
      a: 'Terbuka penuh untuk peran Full-Stack Engineer, Mobile Architect, maupun technical consultation. Kirimkan pesan melalui tombol kontak untuk memulai dialog teknis.'
    }
  ];

  return (
    <div
      ref={rootRef}
      className="bh-root min-h-screen bg-[#f5f4ee] text-[#000000] selection:bg-[#ff0000] selection:text-[#ffffff] antialiased relative"
      style={{
        fontFamily: '"Bauhaus Host", "Host Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ['--bh-start' as string]: showIntro ? '1900ms' : '0ms',
      }}
    >
      {showIntro && <BauhausIntro name={profile.name} onDone={() => setShowIntro(false)} />}
      <BauhausProgress />
      <BauhausDecorations />

      {/* Outer Seams Wrapper */}
      <div className="max-w-[1360px] mx-auto border-x-4 border-b-4 border-[#000000] bg-[#f5f4ee] shadow-[12px_12px_0px_#000000]">
        
        {/* ============================================================ */}
        {/* 1. TOP MASTHEAD & NAVIGATION */}
        {/* ============================================================ */}
        <header className="border-b-4 border-[#000000] bg-[#f5f4ee] sticky top-0 z-50">
          <div className="flex flex-col sm:flex-row sm:items-stretch justify-between">
            {/* Identity Plane */}
            <div className="flex items-center">
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3.5 bg-[#000000] text-[#ffffff] font-extrabold uppercase tracking-tight hover:bg-[#ff0000] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                <span className="w-8 h-8 rounded-full bg-[#ffff00] text-[#000000] flex items-center justify-center font-black text-sm border-2 border-[#000000]">
                  {profile.name ? profile.name.charAt(0) : 'A'}
                </span>
                <span className="text-base sm:text-lg font-black tracking-tight">
                  {profile.name || 'Ahmad Sobirin'}
                </span>
              </a>
              <div className="hidden lg:flex items-center px-4 py-2 border-l-3 border-[#000000] text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#e8e8e8]">
                BAUHAUS 1919 / 2026 ARCHITECTURE
              </div>
            </div>

            {/* Nav Links Plane */}
            <nav className="hidden md:flex items-stretch border-l-4 border-[#000000] text-xs lg:text-sm font-extrabold uppercase">
              <a
                href="#manifesto"
                className="px-4 py-3.5 flex items-center border-r-3 border-[#000000] hover:bg-[#ffff00] hover:text-[#000000] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                Manifesto
              </a>
              <a
                href="#proyek"
                className="px-4 py-3.5 flex items-center border-r-3 border-[#000000] hover:bg-[#ffff00] hover:text-[#000000] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                Proyek
              </a>
              <a
                href="#kapabilitas"
                className="px-4 py-3.5 flex items-center border-r-3 border-[#000000] hover:bg-[#ffff00] hover:text-[#000000] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                Kapabilitas
              </a>
              <a
                href="#jejak"
                className="px-4 py-3.5 flex items-center border-r-3 border-[#000000] hover:bg-[#ffff00] hover:text-[#000000] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                Jejak
              </a>
              <a
                href="#ledger"
                className="px-4 py-3.5 flex items-center border-r-3 border-[#000000] hover:bg-[#ffff00] hover:text-[#000000] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                Ledger
              </a>
              <a
                href="#kontak"
                className="px-4 py-3.5 flex items-center hover:bg-[#ffff00] hover:text-[#000000] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                Kontak
              </a>
            </nav>

            {/* Quick Actions Plane */}
            <div className="flex items-stretch border-t-4 sm:border-t-0 sm:border-l-4 border-[#000000]">
              <a
                href={`mailto:${profile.contact.email}`}
                className="flex-1 sm:flex-initial px-5 py-3 bg-[#ff0000] text-[#ffffff] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#000000] hover:text-[#ffffff] transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                <span>Hubungi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/* 2. OPENING PLANES: BROAD OFF-WHITE + NARROW RED (UNEQUAL SPLIT) */}
        {/* ============================================================ */}
        <section id="manifesto" className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-[#000000]">
          
          {/* Broad Off-White Text Plane (8 Cols) */}
          <div className="lg:col-span-8 p-6 sm:p-10 md:p-14 lg:border-r-4 border-[#000000] flex flex-col justify-between bg-[#f5f4ee]">
            <div>
              {/* Badge & Technical Identity */}
              <div data-bh="wipe" className="flex flex-wrap items-center gap-2 mb-6">
                <span className="bg-[#ffff00] text-[#000000] border-2 border-[#000000] font-black text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000]">
                  {profile.status || 'AVAILABLE FOR ENGINEERING ROLES'}
                </span>
                <span className="bg-[#000000] text-[#ffffff] font-extrabold text-xs uppercase px-3 py-1">
                  {profile.experienceStart || 'ACTIVE DEVELOPER'}
                </span>
                <span className="bg-[#e8e8e8] text-[#000000] border-2 border-[#000000] font-extrabold text-xs uppercase px-2 py-1">
                  {profile.education || 'SISTEM INFORMASI'}
                </span>
              </div>

              {/* Oversized Heavy Display Typography (800 Weight) */}
              <div className="mb-6">
                <span className="text-xs sm:text-sm font-black tracking-widest text-[#000000] uppercase block mb-2">
                  ARSITEKTUR & REKAYASA PERANGKAT LUNAK
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.92] text-[#000000]">
                  <span data-bh="left" className="block" style={stagger(1)}>
                    {profile.name?.split(' ')[0] || 'AHMAD'}
                  </span>
                  <span data-bh="right" className="block" style={stagger(2)}>
                    <span className="underline decoration-[#ff0000] decoration-8 underline-offset-4">
                      {profile.name?.split(' ').slice(1).join(' ') || 'SOBIRIN'}
                    </span>
                  </span>
                </h1>
              </div>

              {/* Tagline / Subheading */}
              <div data-bh="wipe" style={stagger(3)} className="bg-[#000000] text-[#ffffff] px-4 py-2 mb-6 inline-block">
                <p className="text-base sm:text-xl font-black tracking-tight uppercase">
                  {profile.tagline || 'FULL-STACK & MOBILE DEVELOPER'}
                </p>
              </div>

              {/* Reading Copy (17px, Weight 450, Leading 1.5) */}
              <p data-bh="up" style={stagger(4)} className="text-[17px] sm:text-[18px] text-[#000000] font-normal leading-[1.55] max-w-2xl mb-8">
                {profile.bio ||
                  'Developer yang berfokus pada pembangunan platform web modern, aplikasi mobile, dan arsitektur sistem yang skalabel, efisien, dan andal.'}
              </p>
            </div>

            {/* Bottom Graphic Seam: Interests & Focus Areas */}
            <div data-bh="up" style={stagger(5)} className="pt-6 border-t-3 border-[#000000] mt-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#000000] block mb-2">
                FOKUS ARSITEKTURAL & PRINSIP DISIPLIN:
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.interests && profile.interests.length > 0 ? (
                  profile.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="bh-lift bg-[#ffffff] text-[#000000] border-2 border-[#000000] font-bold text-xs uppercase px-2.5 py-1 shadow-[2px_2px_0px_#000000]"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="bg-[#ffffff] text-[#000000] border-2 border-[#000000] font-bold text-xs uppercase px-2.5 py-1">
                      Web Architecture
                    </span>
                    <span className="bg-[#ffffff] text-[#000000] border-2 border-[#000000] font-bold text-xs uppercase px-2.5 py-1">
                      Mobile Systems
                    </span>
                    <span className="bg-[#ffffff] text-[#000000] border-2 border-[#000000] font-bold text-xs uppercase px-2.5 py-1">
                      Software Reliability
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Narrower Red Action Plane (4 Cols) */}
          <div
            ref={redPlaneRef}
            className="bh-kinetic lg:col-span-4 bg-[#ff0000] p-6 sm:p-10 flex flex-col justify-between items-center text-center relative overflow-hidden border-t-4 lg:border-t-0 border-[#000000]"
          >
            {/* Kinetic background geometry (parallax on desktop pointer) */}
            <div className="bh-parallax top-[18%] -left-10" style={{ '--depth': '-18px' } as React.CSSProperties} aria-hidden="true">
              <div className="bh-float w-28 h-14 rounded-t-full bg-[#0000ff] border-4 border-[#000000]" />
            </div>
            <div className="bh-parallax bottom-[22%] -right-6" style={{ '--depth': '22px' } as React.CSSProperties} aria-hidden="true">
              <div
                className="bh-spin-slow w-20 h-20 bg-[#ffff00]"
                style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
              />
            </div>
            <div className="bh-parallax top-6 right-8" style={{ '--depth': '12px' } as React.CSSProperties} aria-hidden="true">
              <div className="bh-spin-rev w-8 h-8 bg-[#000000]" />
            </div>

            {/* Top Plane Header */}
            <div className="w-full text-left border-b-3 border-[#000000] pb-3 mb-4 bg-[#ff0000] relative z-10">
              <span className="bg-[#000000] text-[#ffffff] px-2 py-0.5 text-xs font-black uppercase tracking-wider inline-block">
                01 / IDENTITAS VISUAL
              </span>
              <h2 className="text-lg font-black uppercase text-[#ffffff] tracking-tight mt-1">
                POTRET PENGEMBANG
              </h2>
            </div>

            {/* DELIBERATE LARGE CIRCULAR PHOTO PLACEHOLDER WITH HARD BLACK OFFSET SHADOW */}
            <div data-bh="spin" style={stagger(2)} className="my-6 sm:my-8 flex flex-col items-center relative z-10">
              <div className="relative">
              <span className="bh-orbit" aria-hidden="true" />
              <div
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#ffffff] text-[#000000] border-4 border-[#000000] shadow-[8px_8px_0px_#000000] overflow-hidden relative flex items-center justify-center group"
                title="Foto Profil Pengembang"
              >
                {profile.avatarUrl && !avatarError ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    onError={() => setAvatarError(true)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-none"
                  />
                ) : (
                  <div className="w-full h-full bg-[#f5f4ee] flex flex-col items-center justify-center p-4 text-center text-[#000000]">
                    <div className="w-14 h-14 rounded-full bg-[#ffff00] border-3 border-[#000000] flex items-center justify-center mb-1.5 shadow-[2px_2px_0px_#000000]">
                      <User className="w-7 h-7 text-[#000000] stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-tight block">
                      FOTO PROFIL
                    </span>
                    <span className="text-[10px] font-extrabold text-[#000000]/60 uppercase block">
                      PLACEHOLDER
                    </span>
                  </div>
                )}
              </div>
              </div>

              {/* Photo Identifier Tag */}
              <div className="mt-7">
                <span className="bg-[#ffff00] text-[#000000] border-2 border-[#000000] font-black text-[11px] uppercase px-2.5 py-0.5 shadow-[2px_2px_0px_#000000] inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0000ff] inline-block" />
                  <span>FOTO PROFIL / POTRET</span>
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS (RECTANGULAR SHAPES) */}
            <div data-bh="up" style={stagger(4)} className="w-full space-y-2.5 mt-3 relative z-10">
              {/* Primary Action Button: Lihat Hasil Karya */}
              <a
                href="#proyek"
                className="w-full bg-[#ffff00] text-[#000000] border-4 border-[#000000] shadow-[6px_6px_0px_#000000] hover:bg-[#000000] hover:text-[#ffff00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] py-3 px-4 font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                <span>LIHAT HASIL KARYA</span>
                <ArrowDown className="w-4 h-4 stroke-[3]" />
              </a>

              {/* Blue Action Button: Salin Alamat Email */}
              <button
                onClick={handleCopyEmail}
                className="w-full bg-[#0000ff] text-[#ffffff] border-4 border-[#000000] shadow-[6px_6px_0px_#000000] hover:bg-[#000000] hover:text-[#ffffff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] py-3 px-4 font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-[#ffff00] stroke-[3]" />
                    <span>EMAIL DISALIN KE CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 stroke-[3]" />
                    <span>SALIN ALAMAT EMAIL</span>
                  </>
                )}
              </button>

              {/* Social Channels in Square Cells */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {profile.contact.github && (
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#ffffff] text-[#000000] border-3 border-[#000000] shadow-[4px_4px_0px_#000000] hover:bg-[#ffff00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] py-2.5 px-3 font-extrabold uppercase text-xs flex items-center justify-center gap-2 transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
                  >
                    <GithubIcon size={16} />
                    <span>GITHUB</span>
                  </a>
                )}
                {profile.contact.linkedin && (
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#ffffff] text-[#000000] border-3 border-[#000000] shadow-[4px_4px_0px_#000000] hover:bg-[#ffff00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] py-2.5 px-3 font-extrabold uppercase text-xs flex items-center justify-center gap-2 transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
                  >
                    <LinkedinIcon size={16} />
                    <span>LINKEDIN</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. FACTS MATRIX: CONTINUOUS BLACK SEAMS */}
        {/* ============================================================ */}
        <section className="border-b-4 border-[#000000] bg-[#f5f4ee]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-[#000000]">
            
            {/* Fact 01 - Off-white */}
            <div data-bh="wipe" style={stagger(0, 120)} className="p-6 sm:p-8 bg-[#f5f4ee] flex flex-col justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#000000]/70">
                01 / METRIK PROYEK
              </span>
              <div className="my-3">
                <BauhausCount
                  value={projects.length}
                  className="text-5xl sm:text-6xl font-black text-[#000000] tracking-tighter block leading-none"
                />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-[#000000] mt-1 block">
                  Proyek Unggulan Teruji
                </span>
              </div>
              <p className="text-xs text-[#000000]/80 font-medium">
                Sistem web e-commerce, AI mobile tracker, dan portal integrasi publik.
              </p>
            </div>

            {/* Fact 02 - Yellow Plane */}
            <div data-bh="wipe" style={stagger(1, 120)} className="p-6 sm:p-8 bg-[#ffff00] text-[#000000] flex flex-col justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#000000]">
                02 / TECH ARSENAL
              </span>
              <div className="my-3">
                <BauhausCount
                  value={techStack.length}
                  suffix="+"
                  className="text-5xl sm:text-6xl font-black text-[#000000] tracking-tighter block leading-none"
                />
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-[#000000] mt-1 block">
                  Teknologi & Alat Produksi
                </span>
              </div>
              <p className="text-xs text-[#000000] font-bold">
                Frontend, mobile, backend REST API, database SQL/NoSQL, dan container.
              </p>
            </div>

            {/* Fact 03 - Quiet Plane */}
            <div data-bh="wipe" style={stagger(2, 120)} className="p-6 sm:p-8 bg-[#e8e8e8] text-[#000000] flex flex-col justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#000000]/70">
                03 / JEJAK KARIR
              </span>
              <div className="my-3">
                <BauhausCount
                  value={experience.length}
                  className="text-5xl sm:text-6xl font-black text-[#000000] tracking-tighter block leading-none"
                />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-[#000000] mt-1 block">
                  Fase Pengalaman Rekayasa
                </span>
              </div>
              <p className="text-xs text-[#000000]/80 font-medium">
                Magang industri, program beasiswa DBS Foundation, dan kepemimpinan tim.
              </p>
            </div>

            {/* Fact 04 - Solid Black Ground */}
            <div data-bh="wipe" style={stagger(3, 120)} className="p-6 sm:p-8 bg-[#000000] text-[#ffffff] flex flex-col justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#ffff00]">
                04 / STATUS OPERASIONAL
              </span>
              <div className="my-3">
                <span className="text-4xl sm:text-5xl font-black text-[#ffffff] tracking-tight leading-none uppercase flex items-center gap-3">
                  READY
                  <span className="w-4 h-4 rounded-full bg-[#ffff00] border-2 border-[#ffffff] animate-pulse" aria-hidden="true" />
                </span>
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-[#ffff00] mt-1 block">
                  Tersedia untuk Rekrutmen
                </span>
              </div>
              <p className="text-xs text-[#ffffff]/80 font-medium">
                Siap berkontribusi pada codebase skala besar atau tim engineering tangkas.
              </p>
            </div>

          </div>
        </section>

        <BauhausMarquee
          className="bg-[#000000] text-[#ffffff]"
          words={['Form Follows Function', 'Less Is More', 'Arsitektur Murni', 'Kode Yang Jujur', 'Geometri Tegas']}
        />

        {/* ============================================================ */}
        {/* 4. PROJECTS SECTION: YELLOW HEADING BLOCK + BALANCING BLUE TRIANGLE + RULED GRID */}
        {/* ============================================================ */}
        <section id="proyek" className="border-b-4 border-[#000000]">
          
          {/* Header Row: Yellow Heading Block beside Ruled Feature Filter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-[#000000]">
            
            {/* Yellow Heading Block with Balancing Blue Triangle */}
            <div className="lg:col-span-6 bg-[#ffff00] p-6 sm:p-10 lg:border-r-4 border-[#000000] flex flex-col justify-between relative overflow-hidden">
              <div data-bh="left" className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#000000] text-[#ffffff] px-2 py-0.5 text-xs font-black uppercase tracking-wider">
                    SEKSI 02
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-[#000000]">
                    ARSITEKTUR & KARYA TERPILIH
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none text-[#000000]">
                  PROYEK UNGGULAN
                </h2>
                <p className="text-sm sm:text-base text-[#000000] font-medium mt-3 max-w-lg leading-snug">
                  Implementasi arsitektur nyata: platform e-commerce terdistribusi, aplikasi mobile cerdas berlandaskan AI, dan platform pelayanan publik terpadu.
                </p>
              </div>

              {/* DELIBERATE BLUE TRIANGLE BALANCING THE YELLOW HEADING BLOCK */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t-3 border-[#000000]">
                <span className="text-xs font-black uppercase tracking-wider text-[#000000]">
                  GEOMETRI SEIMBANG: SEGITIGA BIRU
                </span>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  data-bh="spin"
                  style={stagger(3)}
                  className="fill-[#0000ff] stroke-[#000000] stroke-[3]"
                  aria-hidden="true"
                >
                  <polygon points="22,4 40,40 4,40" />
                </svg>
              </div>
            </div>

            {/* Category Filter Plane */}
            <div data-bh="right" style={stagger(1)} className="lg:col-span-6 p-6 sm:p-10 bg-[#f5f4ee] flex flex-col justify-center border-t-4 lg:border-t-0 border-[#000000]">
              <span className="text-xs font-black uppercase tracking-wider text-[#000000] mb-3 block">
                FILTER KATEGORI SISTEM:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['all', 'fullstack', 'mobile'] as ProjectCategory[]).map((cat) => {
                  const isActive = filterCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`py-3 px-2 text-center text-xs sm:text-sm font-black uppercase tracking-wider border-3 border-[#000000] transition-none cursor-pointer focus-visible:outline-4 focus-visible:outline-[#000000] ${
                        isActive
                          ? 'bg-[#ff0000] text-[#ffffff] shadow-[4px_4px_0px_#000000]'
                          : 'bg-[#ffffff] text-[#000000] hover:bg-[#e8e8e8] shadow-[2px_2px_0px_#000000]'
                      }`}
                    >
                      {cat === 'all' ? 'SEMUA PROYEK' : cat === 'fullstack' ? 'FULLSTACK' : 'MOBILE APP'}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[#000000]/70 font-bold mt-4">
                Menampilkan {filteredProjects.length} dari total {projects.length} proyek rekayasa.
              </p>
            </div>

          </div>

          {/* Ruled Feature Grid: Plainly Bounded Rectangles with Continuous Black Seams */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-[#000000] bg-[#f5f4ee]">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                data-bh="up"
                style={stagger(idx, 140)}
                className="flex flex-col justify-between bg-[#f5f4ee] hover:bg-[#ffffff] transition-none group"
              >
                <div>
                  {/* Image Plane: Plainly Bounded Rectangle, Natural Photograph with Square Corners */}
                  <div className="relative border-b-4 border-[#000000] bg-[#e8e8e8] overflow-hidden aspect-[16/10]">
                    <span
                      className="bh-wipe"
                      style={{ backgroundColor: PLANE_COLORS[idx % PLANE_COLORS.length] }}
                      aria-hidden="true"
                    />
                    <img
                      src={project.imageUrl || (project.images && project.images[0]) || '/placeholder.png'}
                      alt={`Dokumentasi arsitektur ${project.title}`}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-none filter contrast-105"
                      loading="lazy"
                    />
                    {/* Corner Tag */}
                    <div className="absolute top-0 left-0 bg-[#000000] text-[#ffffff] px-3 py-1 font-black text-xs uppercase tracking-wider border-r-3 border-b-3 border-[#000000]">
                      #{idx + 1} / {project.category.toUpperCase()}
                    </div>
                    {project.featured && (
                      <div className="absolute top-0 right-0 bg-[#ffff00] text-[#000000] px-3 py-1 font-black text-xs uppercase tracking-wider border-l-3 border-b-3 border-[#000000]">
                        UTAMA
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-7">
                    <span className="text-xs font-black uppercase tracking-wider text-[#000000]/60 block mb-1">
                      {project.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] leading-none mb-3">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-[#000000] font-normal leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    {/* Metrics Banner */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 p-3 bg-[#e8e8e8] border-2 border-[#000000] mb-4">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx}>
                            <span className="text-xs text-[#000000]/70 font-extrabold uppercase block">
                              {m.label}
                            </span>
                            <span className="text-base font-black text-[#000000] block">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stack Chips in Plain Square Cells */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.stack.map((stk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-[#ffffff] text-[#000000] border-2 border-[#000000] text-xs font-extrabold uppercase"
                        >
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions: Primary Rectangular / Modal Action */}
                <div className="p-6 sm:p-7 pt-0 space-y-2">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="w-full bg-[#0000ff] text-[#ffffff] border-3 border-[#000000] shadow-[4px_4px_0px_#000000] hover:bg-[#000000] hover:text-[#ffffff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] py-3 px-4 font-black uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
                  >
                    <span>BEDAH ARSITEKTUR</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#ffff00] text-[#000000] border-2 border-[#000000] hover:bg-[#000000] hover:text-[#ffff00] py-2 px-2 text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#ffffff] text-[#000000] border-2 border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] py-2 px-2 text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
                      >
                        <GithubIcon size={14} />
                        <span>KODE REPO</span>
                      </a>
                    ) : (
                      <span className="bg-[#e8e8e8] text-[#000000]/60 border-2 border-[#000000] py-2 px-2 text-center text-[11px] font-black uppercase tracking-wider flex items-center justify-center">
                        INTERNAL REPO
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. CAPABILITY MATRICES: TECH STACK IN DIVIDED CELLS */}
        {/* ============================================================ */}
        <section id="kapabilitas" className="border-b-4 border-[#000000]">
          {/* Header */}
          <div className="p-6 sm:p-10 bg-[#000000] text-[#ffffff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-[#ff0000] text-[#ffffff] px-2 py-0.5 text-xs font-black uppercase tracking-wider inline-block mb-1">
                SEKSI 03
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#ffffff]">
                MATRIKS KAPABILITAS TEKNIS
              </h2>
              <p className="text-xs sm:text-sm text-[#e8e8e8] mt-1 max-w-xl">
                Struktur stack berlapis dengan garis jahitan tegas: dari arsitektur antarmuka klien, endpoint backend terisolasi, hingga orkestrasi infrastruktur.
              </p>
            </div>
            <div className="bg-[#ffff00] text-[#000000] px-4 py-2 border-2 border-[#ffffff] font-black text-xs uppercase tracking-wider">
              {techStack.length} KOMPONEN TERUJI
            </div>
          </div>

          {/* Divided Layers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-[#000000]">
            {techLayers.map((layerDef, layerIdx) => {
              const items = getTechByLayer(layerDef.layer);
              return (
                <div key={layerDef.layer} className="bg-[#f5f4ee]">
                  {/* Layer Color Header Plane */}
                  <div
                    data-bh="wipe"
                    style={{ ...stagger(layerIdx, 110), backgroundColor: layerDef.color, color: layerDef.textColor }}
                    className="p-4 border-b-4 border-[#000000] flex items-center justify-between"
                  >
                    <span className="font-black text-xs sm:text-sm uppercase tracking-wider">
                      {layerDef.title}
                    </span>
                    <span className="text-xs font-extrabold px-2 py-0.5 border-2 border-current uppercase">
                      {items.length} TOOLS
                    </span>
                  </div>

                  {/* Divided Items Cells */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-3 sm:divide-y-0 sm:divide-x-3 divide-[#000000]">
                    {items.map((tech, tIdx) => (
                      <div
                        key={tIdx}
                        className="group p-4 sm:p-5 bg-[#f5f4ee] hover:bg-[#ffffff] border-b-3 border-[#000000] flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bh-rot w-9 h-9 rounded-none bg-[#ffffff] border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-center shrink-0">
                            <TechIcon name={tech.name} className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-base uppercase tracking-tight text-[#000000]">
                              {tech.name}
                            </h4>
                            {tech.roleTag && (
                              <span className="inline-block bg-[#ffff00] text-[#000000] border border-[#000000] text-[11px] font-black uppercase px-1.5 py-0.5 mt-0.5">
                                {tech.roleTag}
                              </span>
                            )}
                          </div>
                        </div>

                        {tech.usageContext && (
                          <p className="text-xs text-[#000000]/80 mt-3 font-medium leading-snug">
                            {tech.usageContext}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. STEPS AS ADJACENT BLOCKS (EXPERIENCE) & SHARED YELLOW FIELD */}
        {/* ============================================================ */}
        <section id="jejak" className="border-b-4 border-[#000000]">
          
          {/* Section Header */}
          <div className="p-6 sm:p-10 bg-[#f5f4ee] border-b-4 border-[#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-[#000000] text-[#ffffff] px-2 py-0.5 text-xs font-black uppercase tracking-wider inline-block mb-1">
                SEKSI 04
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#000000]">
                JEJAK REKAYASA & PENGALAMAN
              </h2>
              <p className="text-xs sm:text-sm text-[#000000]/80 mt-1 max-w-xl">
                Langkah-langkah berurutan disusun sebagai blok-blok bersebelahan dengan penomoran besar dan blok bacaan ringkas.
              </p>
            </div>
            <div className="bg-[#ff0000] text-[#ffffff] px-4 py-2 border-2 border-[#000000] font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000000]">
              URUTAN KRONOLOGIS
            </div>
          </div>

          {/* Steps as Adjacent Blocks (4-Across / Stacks Vertically at 720px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-[#000000] bg-[#f5f4ee]">
            {experience.map((exp, idx) => (
              <div
                key={exp.id || idx}
                data-bh="drop"
                style={stagger(idx, 130)}
                className="p-6 sm:p-8 bg-[#f5f4ee] hover:bg-[#ffffff] flex flex-col justify-between transition-none"
              >
                <div>
                  {/* Oversized Step Number (800 Weight) */}
                  <div className="flex items-center justify-between mb-4 border-b-3 border-[#000000] pb-3">
                    <span className="text-5xl sm:text-6xl font-black text-[#000000] tracking-tighter leading-none">
                      0{idx + 1}
                    </span>
                    <span className="bg-[#0000ff] text-[#ffffff] text-xs font-black px-2 py-1 uppercase">
                      FASE #{idx + 1}
                    </span>
                  </div>

                  {/* Period Badge */}
                  <span className="bg-[#e8e8e8] text-[#000000] border-2 border-[#000000] text-xs font-black px-2 py-0.5 uppercase inline-block mb-2">
                    {exp.period}
                  </span>

                  {/* Role & Org */}
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#000000] leading-snug">
                    {exp.role}
                  </h3>
                  <h4 className="text-sm font-extrabold uppercase text-[#000000]/70 mt-0.5 mb-3">
                    {exp.organization}
                  </h4>

                  {/* Short Reading Block */}
                  <p className="text-sm text-[#000000] leading-relaxed font-normal">
                    {exp.description}
                  </p>
                </div>

                {/* Highlights tags if any */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="pt-4 border-t-2 border-[#000000] mt-6">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#000000]/70 block mb-1">
                      KAPABILITAS KUNCI:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {exp.highlights.slice(0, 2).map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="bg-[#ffffff] text-[#000000] border border-[#000000] text-[10px] font-bold uppercase px-1.5 py-0.5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SHARED YELLOW FIELD: PHILOSOPHY, PRINCIPLES & QUOTATION */}
          <div className="p-8 sm:p-12 bg-[#ffff00] text-[#000000] border-t-4 border-[#000000]">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-3">
                <span className="bg-[#000000] text-[#ffff00] px-3 py-1 font-black text-xs uppercase tracking-wider inline-block">
                  MANIFIESTO DISIPLIN & FILOSOFI REKAYASA
                </span>
                <blockquote data-bh="wipe" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] leading-tight">
                  "Bentuk mengikuti fungsi. Kesederhanaan arsitektural menghasilkan keandalan perangkat lunak yang tak tergoyahkan."
                </blockquote>
                <p className="text-sm font-bold text-[#000000] max-w-2xl leading-relaxed">
                  Prinsip Bauhaus mengajarkan bahwa estetika terindah dari sebuah sistem adalah efisiensi operasionalnya, kejelasan alur datanya, dan nihilnya kompleksitas yang tidak esensial.
                </p>
              </div>

              {/* Bauhaus Stamp Box */}
              <div className="bh-lift bg-[#ffffff] text-[#000000] border-4 border-[#000000] p-4 shadow-[6px_6px_0px_#000000] shrink-0 text-center">
                <span className="text-3xl font-black block leading-none">1919</span>
                <span className="text-xs font-black uppercase tracking-widest block mt-1">BAUHAUS</span>
                <div className="w-12 h-1 bg-[#ff0000] mx-auto my-1.5" />
                <span className="text-[10px] font-extrabold uppercase">WEIMAR / DESSAU</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. BROAD HORIZONTAL LEDGER (COMPARISON ROWS) */}
        {/* ============================================================ */}
        <section id="ledger" className="border-b-4 border-[#000000] bg-[#f5f4ee]">
          
          {/* Ledger Title */}
          <div className="p-6 sm:p-10 bg-[#000000] text-[#ffffff] border-b-4 border-[#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-[#ffff00] text-[#000000] px-2 py-0.5 text-xs font-black uppercase tracking-wider inline-block mb-1">
                SEKSI 05
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#ffffff]">
                LEDGER PERBANDINGAN ARSITEKTUR
              </h2>
              <p className="text-xs sm:text-sm text-[#e8e8e8] mt-1 max-w-2xl">
                Buku besar horizontal yang membedakan identitas sistem, detail implementasi data, metrik latensi, dan tindakan inspeksi langsung.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-[#ffff00] uppercase tracking-wider block">
                FORMAT BUKU BESAR
              </span>
              <span className="text-sm font-bold text-white uppercase">
                3 PILAR SISTEM UTAMA
              </span>
            </div>
          </div>

          {/* Ledger Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b-4 border-[#000000] bg-[#e8e8e8] text-xs font-black uppercase tracking-wider text-[#000000]">
                  <th className="p-4 sm:p-5 border-r-3 border-[#000000] w-[24%]">
                    1. IDENTITAS SISTEM
                  </th>
                  <th className="p-4 sm:p-5 border-r-3 border-[#000000] w-[38%]">
                    2. DETAIL TEKNIS & ARSITEKTUR DATA
                  </th>
                  <th className="p-4 sm:p-5 border-r-3 border-[#000000] w-[20%]">
                    3. METRIK & PRODUKSI
                  </th>
                  <th className="p-4 sm:p-5 w-[18%] text-center">
                    4. AKSI INSPEKSI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-3 divide-[#000000]">
                {projects.map((proj, pIdx) => {
                  const isFeatured = proj.featured;
                  const isSelected = activeLedgerProject === proj.id;
                  return (
                    <tr
                      key={proj.id}
                      onClick={() => setActiveLedgerProject(proj.id)}
                      className={`transition-none cursor-pointer ${
                        isSelected
                          ? 'bg-[#ffff00]/30'
                          : pIdx % 2 === 0
                          ? 'bg-[#f5f4ee]'
                          : 'bg-[#ffffff]'
                      }`}
                    >
                      {/* 1. Identity Cell */}
                      <td className="p-4 sm:p-5 border-r-3 border-[#000000] align-top">
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`w-6 h-6 border-2 border-[#000000] text-xs font-black flex items-center justify-center shrink-0 ${
                              isFeatured ? 'bg-[#ff0000] text-white' : 'bg-[#000000] text-white'
                            }`}
                          >
                            0{pIdx + 1}
                          </span>
                          <div>
                            <span className="font-black text-lg uppercase tracking-tight text-[#000000] block leading-none">
                              {proj.title}
                            </span>
                            <span className="text-xs font-bold text-[#000000]/70 uppercase block mt-1">
                              {proj.subtitle}
                            </span>
                            {isFeatured && (
                              <span className="inline-block bg-[#ff0000] text-white text-[10px] font-black uppercase px-1.5 py-0.5 mt-1 border border-black">
                                FEATURED SYSTEM
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 2. Architectural Detail Cell */}
                      <td className="p-4 sm:p-5 border-r-3 border-[#000000] align-top">
                        <p className="text-xs sm:text-sm text-[#000000] font-normal leading-relaxed mb-2">
                          {proj.summary}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {proj.stack.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-1.5 py-0.5 bg-[#ffffff] border border-[#000000] text-[10px] font-black uppercase"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* 3. Metrics Cell */}
                      <td className="p-4 sm:p-5 border-r-3 border-[#000000] align-top">
                        {proj.metrics && proj.metrics.length > 0 ? (
                          <div className="space-y-1">
                            {proj.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="text-xs">
                                <span className="font-black text-[#000000]">{m.value}</span>
                                <span className="text-[#000000]/70 ml-1 font-bold">({m.label})</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-[#000000]/60 uppercase">
                            STABLE PRODUCTION
                          </span>
                        )}
                      </td>

                      {/* 4. Action Cell */}
                      <td className="p-4 sm:p-5 align-middle text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProject(proj);
                          }}
                          className="bg-[#0000ff] text-[#ffffff] border-2 border-[#000000] shadow-[3px_3px_0px_#000000] hover:bg-[#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] px-3 py-2 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer transition-none focus-visible:outline-4 focus-visible:outline-[#000000]"
                        >
                          <span>INSPEKSI</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. RULED ROWS DISCLOSURES (SPECIFICATIONS / FAQ) */}
        {/* ============================================================ */}
        <section className="border-b-4 border-[#000000] bg-[#f5f4ee]">
          <div className="p-6 sm:p-10 border-b-4 border-[#000000] bg-[#f5f4ee]">
            <span className="bg-[#000000] text-[#ffffff] px-2 py-0.5 text-xs font-black uppercase tracking-wider inline-block mb-1">
              SEKSI 06
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#000000]">
              SPESIFIKASI & DISCLOSURE REKAYASA
            </h2>
            <p className="text-xs sm:text-sm text-[#000000]/80 mt-1 max-w-xl">
              Baris aturan dengan marker plus/minus terlihat untuk menjawab detail metodologi dan implementasi.
            </p>
          </div>

          {/* Ruled Rows with Visible Plus / Minus Marker */}
          <div className="divide-y-3 divide-[#000000]">
            {architecturalDisclosures.map((item, idx) => {
              const isOpen = activeDisclosure === idx;
              return (
                <div key={idx} className="bg-[#f5f4ee]">
                  <button
                    onClick={() => setActiveDisclosure(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#ffff00]/30 transition-none cursor-pointer focus-visible:outline-4 focus-visible:outline-[#000000]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-black uppercase tracking-tight text-[#000000]">
                      0{idx + 1}. {item.q}
                    </span>
                    <div className="w-8 h-8 rounded-none bg-[#ffffff] text-[#000000] border-2 border-[#000000] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000]">
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[3]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="bh-unfold px-5 pb-6 sm:px-6 sm:pb-8 pt-1 text-[17px] text-[#000000] font-normal leading-relaxed border-t border-[#000000]/20 bg-[#ffffff]">
                      <p className="max-w-3xl">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <BauhausMarquee
          reverse
          className="bg-[#ffff00] text-[#000000]"
          words={['Siap Berkolaborasi', 'Full-Stack', 'Mobile Systems', 'Weimar 1919', 'Dessau 2026']}
        />

        {/* ============================================================ */}
        {/* 9. RED CLOSE: WHITE DISPLAY TEXT + PALE ACTION NOTE + CIRCULAR CONTROL */}
        {/* ============================================================ */}
        <section id="kontak" className="bg-[#ff0000] p-8 sm:p-14 lg:p-20 text-[#ffffff] border-b-4 border-[#000000] relative overflow-hidden">
          
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* White Display Text + Pale Action Note */}
            <div className="space-y-6 text-left w-full lg:max-w-xl">
              <div>
                <span className="bg-[#000000] text-[#ffff00] px-3 py-1 font-black text-xs uppercase tracking-wider inline-block mb-3">
                  SEKSI 07 / PENUTUP MERAH
                </span>
                <h2 data-bh="left" className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-[#ffffff]">
                  SIAP MEMULAI
                  <br />
                  PROYEK BERIKUTNYA?
                </h2>
              </div>

              {/* Pale Action Note */}
              <div className="bh-lift bg-[#f5f4ee] text-[#000000] border-4 border-[#000000] p-6 sm:p-8 shadow-[8px_8px_0px_#000000]">
                <span className="text-xs font-black uppercase tracking-wider text-[#ff0000] block mb-2">
                  CATATAN AKSI PALE / KOMUNIKASI LANGSUNG:
                </span>
                <p className="text-base sm:text-lg font-bold leading-relaxed mb-4">
                  Terbuka untuk posisi Full-Stack Engineer, Mobile Architect, serta proyek rekayasa sistem skalabel. Respon langsung dalam 1x24 jam.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase">
                  <span className="bg-[#ffff00] px-2 py-1 border border-[#000000]">
                    EMAIL: {profile.contact.email}
                  </span>
                  <span className="bg-[#e8e8e8] px-2 py-1 border border-[#000000]">
                    LOKASI: {profile.contact.location || 'INDONESIA'}
                  </span>
                </div>
              </div>
            </div>

            {/* DELIBERATE SECOND LARGE CIRCULAR CONTROL */}
            <div data-bh="spin" className="bh-ring-host shrink-0 flex flex-col items-center relative m-10">
              <BauhausTextRing text="KIRIM EMAIL ● HUBUNGI SEKARANG ● BAUHAUS 1919 ● " />
              <a
                href={`mailto:${profile.contact.email}`}
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#ffffff] text-[#000000] border-4 border-[#000000] shadow-[8px_8px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0px_#000000] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-none focus-visible:outline-4 focus-visible:outline-[#000000] group"
                aria-label="Kirim email langsung ke Ahmad Sobirin"
              >
                <div className="w-12 h-12 rounded-full bg-[#0000ff] text-[#ffffff] border-3 border-[#000000] flex items-center justify-center mb-2 group-hover:bg-[#ffff00] group-hover:text-[#000000] transition-none">
                  <Mail className="w-6 h-6 stroke-[3]" />
                </div>
                <span className="text-lg sm:text-xl font-black uppercase tracking-tight leading-none">
                  KIRIM EMAIL
                </span>
                <span className="text-[11px] font-black uppercase text-[#000000]/70 mt-1">
                  HUBUNGI SEKARANG →
                </span>
              </a>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* 10. FOOTER: CONTINUOUS BLACK SEAMS & TWO-COLUMN GROUPS */}
        {/* ============================================================ */}
        <footer className="bg-[#f5f4ee] text-[#000000]">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y-4 md:divide-y-0 md:divide-x-4 divide-[#000000]">
            
            {/* Column 1: Identity & Architecture Tribute */}
            <div className="p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-none bg-[#000000] text-[#ffffff] font-black text-sm flex items-center justify-center border-2 border-[#000000]">
                    AS
                  </div>
                  <span className="font-black text-lg uppercase tracking-tight text-[#000000]">
                    {profile.name} — PORTOFOLIO
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#000000]/80 font-medium leading-relaxed max-w-md">
                  Dirancang dengan sistem desain Bauhaus: bidang warna primer datar, jahitan garis tebal hitam, tipografi Host Grotesk tajam, dan struktur fungsional murni tanpa ornamen berlebih.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-[#000000] text-xs font-black uppercase tracking-wider text-[#000000]/70 flex flex-wrap justify-between items-center gap-2">
                <span>© {new Date().getFullYear()} {profile.name}</span>
                <span>BAUHAUS DESIGN SYSTEM 1919-2026</span>
              </div>
            </div>

            {/* Column 2: Quick Directory */}
            <div className="p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#000000] block mb-3">
                  DIREKTORI & NAVIGASI CEPAT:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-black uppercase">
                  <a href="#manifesto" className="p-2 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#ffff00] transition-none">
                    Manifesto
                  </a>
                  <a href="#proyek" className="p-2 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#ffff00] transition-none">
                    Proyek
                  </a>
                  <a href="#kapabilitas" className="p-2 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#ffff00] transition-none">
                    Kapabilitas
                  </a>
                  <a href="#jejak" className="p-2 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#ffff00] transition-none">
                    Jejak Karir
                  </a>
                  <a href="#ledger" className="p-2 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#ffff00] transition-none">
                    Ledger
                  </a>
                  <a href="#kontak" className="p-2 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#ffff00] transition-none">
                    Kontak
                  </a>
                </div>
              </div>

            </div>

          </div>
        </footer>

      </div>
    </div>
  );
};
