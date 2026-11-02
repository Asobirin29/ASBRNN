import React, { useState, useEffect, useRef } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  HardDrive,
  Monitor,
  Cpu,
  Settings,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Zap,
  Send,
  Globe
} from 'lucide-react';
import type { TemplateComponentProps } from '../types';
import type { ProjectCategory, TechLayer } from '../../types/portfolio';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useLenisSmoothScroll } from '../../hooks/useLenisSmoothScroll';
import { TechIcon } from '../common/TechIcon';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { prefersReducedMotion, shouldPlayIntro } from '../common/motion';
import {
  RetroBootScreen,
  RetroScreensaver,
  RetroShutdown,
  RetroTaskButtons,
  RetroWindow,
  RetroWindowProvider,
} from './RetroDesktop';
import { RETRO_BOOT_KEY, useRetroArrange } from './retroShared';

export const RetroTemplate: React.FC<TemplateComponentProps> = (props) => (
  <RetroWindowProvider>
    <RetroDesktopView {...props} />
  </RetroWindowProvider>
);

const RetroDesktopView: React.FC<TemplateComponentProps> = ({ onOpenProject }) => {
  const { profile, projects, techStack, experience } = usePortfolioData();
  const [boot, setBoot] = useState<'full' | 'quick' | null>(() =>
    shouldPlayIntro(RETRO_BOOT_KEY) ? 'full' : null
  );
  const [showShutdown, setShowShutdown] = useState(false);
  const arrangeWindows = useRetroArrange();
  const startMenuRef = useRef<HTMLDivElement | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>('all');
  const [techLayerFilter, setTechLayerFilter] = useState<TechLayer | 'all'>('all');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Smooth scroll
  useLenisSmoothScroll();

  // Clock
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

  // Start menu closes when clicking anywhere else on the desktop
  useEffect(() => {
    if (!isStartMenuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!startMenuRef.current?.contains(e.target as Node)) setIsStartMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsStartMenuOpen(false);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [isStartMenuOpen]);

  const handleCopyEmail = () => {
    if (profile.contact.email) {
      navigator.clipboard.writeText(profile.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (projectFilter === 'all') return true;
    return p.category === projectFilter;
  });

  const safeActiveIndex = filteredProjects.length > 0
    ? ((activeProjectIndex % filteredProjects.length) + filteredProjects.length) % filteredProjects.length
    : 0;

  // Sound effect for retro click
  const playRetroClick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext not supported or disabled
    }
  };

  const handlePrevProject = () => {
    if (filteredProjects.length <= 1) return;
    playRetroClick();
    setActiveProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNextProject = () => {
    if (filteredProjects.length <= 1) return;
    playRetroClick();
    setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handleSelectProject = (index: number) => {
    playRetroClick();
    setActiveProjectIndex(index);
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'carousel' || filteredProjects.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        handlePrevProject();
      } else if (e.key === 'ArrowRight') {
        handleNextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, filteredProjects.length]);

  // 3D tilt effect on active card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotY = (x / (rect.width / 2)) * 7;
    const rotX = -(y / (rect.height / 2)) * 7;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`,
    });
  };

  const handleCardMouseLeave = () => {
    setTiltStyle({});
  };

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        handleNextProject();
      } else {
        handlePrevProject();
      }
    }
    setTouchStartX(null);
  };

  const filteredTech = techStack.filter((t) => {
    if (techLayerFilter === 'all') return true;
    return t.layer === techLayerFilter;
  });

  return (
    <div
      className={`min-h-screen bg-[#008080] text-black font-retro-interface selection:bg-[#6600ff] selection:text-white relative pb-28 overflow-x-hidden ${
        prefersReducedMotion() ? '' : 'rw-ready'
      }`}
    >
      {boot && <RetroBootScreen name={profile.name} quick={boot === 'quick'} onDone={() => setBoot(null)} />}
      {showShutdown && (
        <RetroShutdown
          onCancel={() => setShowShutdown(false)}
          onReboot={() => {
            setShowShutdown(false);
            arrangeWindows();
            window.scrollTo(0, 0);
            setBoot('quick');
          }}
        />
      )}
      <RetroScreensaver disabled={!!boot || showShutdown} />

      {/* ================= DESKTOP PATTERN BACKGROUND ================= */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `radial-gradient(#005a5a 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* ================= TOP MENUBAR / TASK RUNNER ================= */}
      <header className="sticky top-0 z-50 bg-[#d4d4d4] border-b-2 border-b-[#808080] border-t-2 border-t-white shadow-[0_2px_4px_rgba(0,0,0,0.4)] px-3 py-1.5 flex items-center justify-between text-xs font-retro-interface">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* OS Branding */}
          <div className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className="w-5 h-5 bg-[#000080] text-white flex items-center justify-center font-retro-mono text-[11px] font-bold shadow-inner">
              95
            </span>
            <span className="font-retro-display font-black text-sm uppercase tracking-wider hidden sm:inline">
              Retro OS
            </span>
            <span className="text-[#808080] hidden sm:inline">|</span>
            <span className="font-semibold text-black truncate max-w-[120px] sm:max-w-none">
              {profile.name}
            </span>
          </div>

          {/* Top Quick Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#launchpad"
              className="px-2 py-0.5 hover:bg-[#000080] hover:text-white transition-none focus-visible:outline-2 focus-visible:outline-black"
            >
              <u>F</u>ile
            </a>
            <a
              href="#projects"
              className="px-2 py-0.5 hover:bg-[#000080] hover:text-white transition-none focus-visible:outline-2 focus-visible:outline-black"
            >
              <u>P</u>royek
            </a>
            <a
              href="#capabilities"
              className="px-2 py-0.5 hover:bg-[#000080] hover:text-white transition-none focus-visible:outline-2 focus-visible:outline-black"
            >
              <u>A</u>rsenal
            </a>
            <a
              href="#career"
              className="px-2 py-0.5 hover:bg-[#000080] hover:text-white transition-none focus-visible:outline-2 focus-visible:outline-black"
            >
              <u>K</u>arir
            </a>
            <a
              href="#contact"
              className="px-2 py-0.5 hover:bg-[#000080] hover:text-white transition-none focus-visible:outline-2 focus-visible:outline-black"
            >
              <u>K</u>ontak
            </a>
          </nav>
        </div>

        {/* Right System Indicators */}
        <div className="flex items-center gap-2">
          <a
            href="#/admin"
            className="retro-key-button text-[11px] px-2 py-1 flex items-center gap-1 font-bold"
            title="Akses Panel Admin (Ctrl+Shift+A)"
          >
            <Settings className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">Admin</span>
          </a>

          {/* Clock Inset Well */}
          <div className="retro-bevel-inset bg-white px-2.5 py-0.5 text-[11px] font-retro-mono font-bold flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#000080]" />
            <span>{currentTime || 'JAKARTA WIB'}</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN DESKTOP WORKSPACE ================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pt-6 space-y-10">

        {/* ================= 1. OPENING SECTION: TWELVE-COLUMN GRID ================= */}
        {/* Broad Yellow Launch Window (cols 1-7/8) + Compact Monitor Facts Panel (cols 8/9-12) */}
        <section id="launchpad" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* WINDOW A: BROAD YELLOW LAUNCH WINDOW (Columns 1-7 on lg) */}
          <RetroWindow
            id="launchpad"
            title="LAUNCH_PAD.EXE - Identity Studio"
            icon={<span className="w-3.5 h-3.5 bg-yellow-400 text-black flex items-center justify-center text-[10px] font-black">★</span>}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Window Menu Strip */}
            <div className="bg-[#d4d4d4] px-2 py-0.5 border-b border-b-[#808080] text-[11px] flex gap-3 text-black">
              <span><u>F</u>ile</span>
              <span><u>E</u>dit</span>
              <span><u>V</u>iew</span>
              <span><u>H</u>elp</span>
            </div>

            {/* Window Content: Bright Yellow Field */}
            <div className="bg-[#ffff00] p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-6 border-b border-b-[#808080]">
              <div className="space-y-4">
                {/* Header Profile Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Square Picture Inset Well */}
                  <div className="retro-bevel-inset bg-white p-1 shrink-0 w-24 h-24 sm:w-28 sm:h-28">
                    <img
                      src={profile.avatarUrl || '/avatar.svg'}
                      alt={profile.name}
                      className="w-full h-full object-cover bg-[#d4d4d4]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/avatar.svg';
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="inline-block bg-black text-[#ffff00] px-2 py-0.5 text-[11px] font-retro-mono font-bold uppercase">
                      SYSTEM IDENTIFIER #2904
                    </div>
                    <div className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-600 inline-block" />
                      <span>{profile.status}</span>
                    </div>
                    <div className="text-xs text-black/80 font-retro-mono">
                      Lokasi: {profile.contact.location || 'Indonesia'}
                    </div>
                  </div>
                </div>

                {/* Massive Contemporary Sans Display Heading (62px - 94px responsive) */}
                <div className="space-y-2 pt-2">
                  <h1 className="font-retro-display font-black text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] text-black uppercase tracking-tighter leading-none">
                    {profile.name}
                  </h1>
                  <p className="font-retro-interface text-base sm:text-xl font-bold text-black/90 uppercase tracking-tight">
                    {profile.tagline}
                  </p>
                </div>
              </div>

              {/* Action Buttons as Raised Keys */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href="#projects"
                  className="retro-key-button px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 bg-[#d4d4d4]"
                >
                  <FolderOpen className="w-4 h-4 text-[#000080]" />
                  <span>Jelajahi Karya</span>
                </a>

                <a
                  href="#contact"
                  className="retro-key-button px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 bg-[#d4d4d4]"
                >
                  <Mail className="w-4 h-4 text-emerald-800" />
                  <span>Kirim Pesan</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="retro-key-button px-3 py-2 text-xs font-bold flex items-center gap-1.5 bg-[#d4d4d4]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Email Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-black" />
                      <span>Salin Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Window Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black gap-2">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 flex-1 truncate">
                STATUS: READY • DISK C: ACTIVE • 100% OK
              </div>
              <div className="retro-bevel-inset bg-white px-2 py-0.5 shrink-0">
                HOST_GROTESK_84PX
              </div>
            </div>
          </RetroWindow>

          {/* WINDOW B: COMPACT MONITOR-LIKE FACTS PANEL (Columns 8-12 on lg) */}
          <RetroWindow
            id="monitor"
            title="SYS_MONITOR.DAT - Live Diagnostics"
            icon={<Monitor className="w-3.5 h-3.5 text-yellow-300" />}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            {/* Monitor Inset Screen / Reading Area */}
            <div className="p-4 sm:p-5 bg-[#d4d4d4] flex-1 flex flex-col justify-between space-y-4">
              {/* Monitor Screen Well */}
              <div className="retro-bevel-inset bg-white p-4 font-retro-mono text-xs sm:text-sm text-black space-y-3">
                <div className="flex items-center justify-between pb-2 border-b-2 border-black/10">
                  <span className="font-bold uppercase text-[11px] text-[#000080]">DIAGNOSTIC CHANNEL</span>
                  <span className="text-[10px] bg-black text-emerald-400 px-1.5 py-0.2 font-mono">ONLINE</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-black/60 text-[11px] block uppercase font-bold">Operator:</span>
                    <span className="font-black text-black text-sm">{profile.name}</span>
                  </div>

                  <div>
                    <span className="text-black/60 text-[11px] block uppercase font-bold">Role & Domain:</span>
                    <span className="font-semibold text-black">{profile.tagline}</span>
                  </div>

                  <div>
                    <span className="text-black/60 text-[11px] block uppercase font-bold">Pendidikan:</span>
                    <span className="font-semibold text-black">{profile.education}</span>
                  </div>

                  <div>
                    <span className="text-black/60 text-[11px] block uppercase font-bold">Ketersediaan Kerja:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1 border border-emerald-300 inline-block">
                      {profile.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-black/60 text-[11px] block uppercase font-bold">Jam Sistem Terkini:</span>
                    <span className="font-black text-sm text-[#000080]">{currentTime || 'WIB'}</span>
                  </div>
                </div>
              </div>

              {/* Monitor Control Plate */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="retro-bevel-inset bg-white p-2 text-center">
                  <span className="text-[10px] font-bold uppercase text-black/60 block">Proyek Pilihan</span>
                  <span className="font-retro-display font-black text-xl text-black">{projects.length} Unit</span>
                </div>
                <div className="retro-bevel-inset bg-white p-2 text-center">
                  <span className="text-[10px] font-bold uppercase text-black/60 block">Keahlian Stack</span>
                  <span className="font-retro-display font-black text-xl text-black">{techStack.length}+ Tools</span>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 w-full truncate">
                PORT: 5173 • PROTOCOL: TCP/IP • BAUD: 57600
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* ================= 2. SYSTEM TELEMETRY STRIP WITH LIVE STATS & TICKER ================= */}
        <section className="retro-bevel-raised bg-[#d4d4d4] p-3 sm:p-4 text-black">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
            {/* Ticker / Live CRT Telemetry Screen Well */}
            <div className="retro-bevel-inset bg-[#0a0a0a] text-white px-3 py-2 flex items-center justify-between gap-3 flex-1 overflow-hidden shadow-inner">
              <div className="flex items-center gap-2 shrink-0">
                <span className="bg-[#ffff00] text-black px-2 py-0.5 text-xs font-retro-mono font-black uppercase tracking-wider border border-black shadow-sm">
                  TRANSMISSION
                </span>
                <div className="flex items-center gap-1 font-retro-mono text-xs font-bold text-[#00ff66]">
                  <span className="retro-ticker-arrow text-[#ffff00] font-black text-sm">»</span>
                  <span className="retro-ticker-arrow text-[#ffff00] font-black text-sm">»</span>
                  <span className="text-white tracking-wide">SYS_TELEMETRY.LOG</span>
                </div>
              </div>

              {/* Live Status Marquee / Indicator */}
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-retro-mono text-[#00ff66] truncate pl-3 border-l border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse shrink-0" />
                <span className="truncate">ALL CHANNELS ACTIVE • DISK C: READY • JAKARTA TIME SYNCED</span>
              </div>
            </div>

            {/* Metric Facts Counters as Sunken Windows 95 Inset Wells */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 shrink-0">
              <div className="retro-bevel-inset bg-white p-2 sm:p-2.5 text-center min-w-[105px]">
                <span className="block text-[10px] font-retro-mono uppercase text-[#000080] font-bold tracking-tight">Karya Selesai</span>
                <span className="font-retro-display font-black text-xl sm:text-2xl text-black leading-tight my-0.5 block">{projects.length}</span>
                <span className="block text-[9px] font-retro-mono text-black/70 font-semibold truncate">Proyek Unggulan</span>
              </div>

              <div className="retro-bevel-inset bg-white p-2 sm:p-2.5 text-center min-w-[105px]">
                <span className="block text-[10px] font-retro-mono uppercase text-[#000080] font-bold tracking-tight">Tech Arsenal</span>
                <span className="font-retro-display font-black text-xl sm:text-2xl text-black leading-tight my-0.5 block">{techStack.length}+</span>
                <span className="block text-[9px] font-retro-mono text-black/70 font-semibold truncate">Framework & Libs</span>
              </div>

              <div className="retro-bevel-inset bg-white p-2 sm:p-2.5 text-center min-w-[105px]">
                <span className="block text-[10px] font-retro-mono uppercase text-[#000080] font-bold tracking-tight">Jejak Karir</span>
                <span className="font-retro-display font-black text-xl sm:text-2xl text-black leading-tight my-0.5 block">{experience.length}</span>
                <span className="block text-[9px] font-retro-mono text-black/70 font-semibold truncate">Milestone Nyata</span>
              </div>

              <div className="retro-bevel-inset bg-white p-2 sm:p-2.5 text-center min-w-[105px]">
                <span className="block text-[10px] font-retro-mono uppercase text-[#000080] font-bold tracking-tight">Jam Jakarta</span>
                <span className="font-retro-mono font-bold text-xs sm:text-sm text-black truncate leading-tight my-1.5 block">
                  {currentTime ? currentTime.split(' ')[0] : '21:40'}
                </span>
                <span className="block text-[9px] font-retro-mono text-black/70 font-semibold truncate">WIB / GMT+7</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. OVERLAPPING README-LIKE TEXT (BIO & MEMOAR) ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Notepad Window Offset: cols 1 to 10 */}
          <RetroWindow
            id="readme"
            title="README.TXT - Notepad (Memoar Pengembang)"
            icon={<FileText className="w-3.5 h-3.5 text-yellow-300" />}
            className="lg:col-span-10 lg:col-start-2"
          >
            {/* Menu Bar */}
            <div className="bg-[#d4d4d4] px-2 py-0.5 border-b border-b-[#808080] text-[11px] flex gap-3 text-black">
              <span><u>F</u>ile</span>
              <span><u>E</u>dit</span>
              <span><u>S</u>earch</span>
              <span><u>H</u>elp</span>
            </div>

            {/* Inset White Reading Well */}
            <div className="p-4 sm:p-6 bg-[#d4d4d4]">
              <div className="retro-bevel-inset bg-white p-5 sm:p-7 text-black space-y-4">
                <div className="font-retro-mono text-xs text-black/60 pb-2 border-b border-black/10 flex flex-wrap items-center justify-between gap-2">
                  <span>FILE: C:\PORTFOLIO\README.TXT</span>
                  <span>ENCODING: ANSI / UTF-8</span>
                  <span>LINES: 42</span>
                </div>

                <div className="space-y-3 font-retro-interface text-base sm:text-lg leading-relaxed text-black">
                  <p className="font-bold text-black text-xl sm:text-2xl font-retro-display">
                    &quot;{profile.bio}&quot;
                  </p>
                  <p className="text-sm sm:text-base text-black/80 font-normal">
                    Pengalaman aktif dalam membangun arsitektur perangkat lunak end-to-end, mulai dari reactive user interface pada web modern, aplikasi mobile native/cross-platform, hingga database dan arsitektur server yang andal.
                  </p>
                </div>

                {/* Core Focus / Interests Tags */}
                <div className="pt-3 border-t border-black/10">
                  <span className="text-xs font-bold uppercase text-black/70 block mb-2 font-retro-mono">
                    AREA FOKUS & KETERTARIKAN TEKNIS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="retro-bevel-raised bg-[#d4d4d4] text-black text-xs font-semibold px-2.5 py-1"
                      >
                        [#] {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-xs font-retro-mono text-black/60 flex items-center justify-between">
                  <span>{profile.experienceStart || 'Active Developer'}</span>
                  <span>STATUS: VERIFIED & AVAILABLE</span>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 w-full">
                Ln 1, Col 1 • 100% READ-ONLY • MEMORY: OK
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* ================= 4. CAPABILITY WINDOW WITH ITS OWN SIDE PANEL (TECH ARSENAL) ================= */}
        <section id="capabilities" className="scroll-mt-14">
          <RetroWindow
            id="capabilities"
            title="CAPABILITY_EXPLORER.EXE - Tech Stack & Engineering Arsenal"
            icon={<Cpu className="w-3.5 h-3.5 text-yellow-300" />}
          >
            {/* Menu Bar */}
            <div className="bg-[#d4d4d4] px-2 py-0.5 border-b border-b-[#808080] text-[11px] flex gap-3 text-black">
              <span><u>F</u>ile</span>
              <span><u>E</u>dit</span>
              <span><u>V</u>iew</span>
              <span><u>T</u>ools</span>
              <span><u>H</u>elp</span>
            </div>

            {/* Capability Window: Split with Side Panel and Main Well */}
            <div className="p-3 sm:p-5 bg-[#d4d4d4]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left Side Panel: Layer / Category Folders (col 1 to 4 on lg) */}
                <div className="lg:col-span-4 retro-bevel-inset bg-[#ffffff] p-3 space-y-2">
                  <div className="text-xs font-bold text-black uppercase pb-1 border-b border-black/10 font-retro-mono flex items-center gap-1.5">
                    <Folder className="w-4 h-4 text-[#000080]" />
                    <span>FOLDERS / LAYERS:</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {[
                      { key: 'all', label: 'All Layers', count: techStack.length },
                      { key: 'client', label: 'Client / Frontend', count: techStack.filter(t => t.layer === 'client').length },
                      { key: 'backend', label: 'Backend & Server', count: techStack.filter(t => t.layer === 'backend').length },
                      { key: 'database', label: 'Database & Storage', count: techStack.filter(t => t.layer === 'database').length },
                      { key: 'devops', label: 'DevOps & Tooling', count: techStack.filter(t => t.layer === 'devops').length },
                    ].map((layer) => {
                      const isSelected = techLayerFilter === layer.key;
                      return (
                        <button
                          key={layer.key}
                          onClick={() => setTechLayerFilter(layer.key as TechLayer | 'all')}
                          className={`w-full text-left px-2.5 py-1.5 text-xs font-bold flex items-center justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-black ${
                            isSelected
                              ? 'bg-[#000080] text-white shadow-inner'
                              : 'retro-key-button bg-[#d4d4d4] text-black hover:bg-[#e8e8e8]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected ? (
                              <FolderOpen className="w-3.5 h-3.5 text-yellow-300" />
                            ) : (
                              <Folder className="w-3.5 h-3.5 text-black" />
                            )}
                            <span>{layer.label}</span>
                          </div>
                          <span className={`text-[10px] font-retro-mono px-1.5 py-0.2 rounded-none ${
                            isSelected ? 'bg-yellow-400 text-black' : 'bg-black text-white'
                          }`}>
                            {layer.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Helper Note in Side Panel */}
                  <div className="pt-3 border-t border-black/10 text-[11px] font-retro-mono text-black/70 space-y-1">
                    <p className="font-bold uppercase text-black">INFORMASI DIREKTORI:</p>
                    <p>Pilih kategori di atas untuk memfilter daftar tools dan teknologi yang dikuasai.</p>
                  </div>
                </div>

                {/* Right Main Panel: White Inset Reading Well of Tech Items (col 5 to 12 on lg) */}
                <div className="lg:col-span-8 retro-bevel-inset bg-[#ffffff] p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/10">
                    <span className="font-bold text-xs uppercase font-retro-mono text-[#000080]">
                      CONTENTS OF: {techLayerFilter.toUpperCase()} ({filteredTech.length} ITEMS FOUND)
                    </span>
                    <span className="text-[10px] font-retro-mono text-black/60">
                      VIEW: LARGE ICONS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {filteredTech.map((tech, index) => (
                      <div
                        key={index}
                        className="retro-bevel-raised bg-[#d4d4d4] p-2.5 flex flex-col justify-between hover:bg-[#ffff00] transition-none group cursor-default"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1.5 bg-white retro-bevel-inset">
                            <TechIcon name={tech.iconKey || tech.name} size={22} color={tech.color} />
                          </div>
                          <span className="text-[9px] font-retro-mono uppercase bg-black text-white px-1 py-0.2 font-bold">
                            {tech.layer}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-black font-retro-interface truncate group-hover:text-black">
                            {tech.name}
                          </p>
                          <p className="text-[10px] text-black/70 capitalize truncate font-retro-mono">
                            {tech.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Window Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 w-full">
                {filteredTech.length} object(s) displayed • Memory heap allocated: 128KB
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* ================= 5. GALLERY VIEWER CAROUSEL (PROJECTS SHOWCASE) ================= */}
        <section id="projects" className="scroll-mt-14 space-y-5">
          {/* Section Master Window Frame (Faendita GALLERY_VIEWER style) */}
          <RetroWindow
            id="gallery"
            title={`GALLERY_VIEWER.EXE — ${filteredProjects.length} Captured Works & Portofolio`}
            icon={<HardDrive className="w-3.5 h-3.5 text-yellow-300" />}
          >
            {/* Menu Bar */}
            <div className="bg-[#d4d4d4] px-2 py-0.5 border-b border-b-[#808080] text-[11px] flex gap-3 text-black">
              <span><u>F</u>ile</span>
              <span><u>V</u>iew</span>
              <span><u>S</u>lideshow</span>
              <span><u>O</u>ptions</span>
              <span><u>H</u>elp</span>
            </div>

            {/* Gallery Toolbar (Faendita style) */}
            <div className="bg-[#d4d4d4] p-2 sm:p-2.5 border-b border-b-[#808080] flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {/* View Switchers */}
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`retro-key-button font-bold text-xs px-2.5 py-1 flex items-center gap-1.5 ${
                    viewMode === 'carousel'
                      ? 'bg-[#000080] text-white is-pressed shadow-inner'
                      : 'bg-[#d4d4d4] text-black hover:bg-white'
                  }`}
                  aria-pressed={viewMode === 'carousel'}
                >
                  <span>🎴</span>
                  <span>Carousel View</span>
                </button>

                <button
                  onClick={() => setViewMode('grid')}
                  className={`retro-key-button font-bold text-xs px-2.5 py-1 flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-[#000080] text-white is-pressed shadow-inner'
                      : 'bg-[#d4d4d4] text-black hover:bg-white'
                  }`}
                  aria-pressed={viewMode === 'grid'}
                >
                  <span>🗂</span>
                  <span>All Projects (Grid)</span>
                </button>

                <div className="h-5 w-[2px] bg-[#808080] border-r border-white hidden sm:block mx-0.5" />

                {/* Prev / Next Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevProject}
                    disabled={filteredProjects.length <= 1}
                    className="retro-key-button font-bold text-xs px-2.5 py-1 flex items-center gap-1 bg-[#d4d4d4] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Karya Sebelumnya (Keyboard: ←)"
                  >
                    <span>◄</span>
                    <span>Prev</span>
                  </button>

                  <button
                    onClick={handleNextProject}
                    disabled={filteredProjects.length <= 1}
                    className="retro-key-button font-bold text-xs px-2.5 py-1 flex items-center gap-1 bg-[#d4d4d4] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Karya Berikutnya (Keyboard: →)"
                  >
                    <span>Next</span>
                    <span>►</span>
                  </button>
                </div>

                <div className="h-5 w-[2px] bg-[#808080] border-r border-white hidden md:block mx-0.5" />

                {/* Category Filters */}
                <div className="hidden md:flex items-center gap-1">
                  <button
                    onClick={() => {
                      setProjectFilter('all');
                      setActiveProjectIndex(0);
                    }}
                    className={`retro-key-button font-bold text-xs px-2 py-0.5 ${
                      projectFilter === 'all'
                        ? 'retro-key-button-purple is-pressed'
                        : 'bg-[#d4d4d4] text-black hover:bg-white'
                    }`}
                  >
                    Semua ({projects.length})
                  </button>

                  <button
                    onClick={() => {
                      setProjectFilter('fullstack');
                      setActiveProjectIndex(0);
                    }}
                    className={`retro-key-button font-bold text-xs px-2 py-0.5 ${
                      projectFilter === 'fullstack'
                        ? 'retro-key-button-purple is-pressed'
                        : 'bg-[#d4d4d4] text-black hover:bg-white'
                    }`}
                  >
                    Full-Stack ({projects.filter((p) => p.category === 'fullstack').length})
                  </button>

                  <button
                    onClick={() => {
                      setProjectFilter('mobile');
                      setActiveProjectIndex(0);
                    }}
                    className={`retro-key-button font-bold text-xs px-2 py-0.5 ${
                      projectFilter === 'mobile'
                        ? 'retro-key-button-purple is-pressed'
                        : 'bg-[#d4d4d4] text-black hover:bg-white'
                    }`}
                  >
                    Mobile ({projects.filter((p) => p.category === 'mobile').length})
                  </button>
                </div>
              </div>

              {/* Total Plates Counter on Right */}
              <div className="font-retro-mono text-xs font-bold text-black flex items-center gap-1.5 ml-auto sm:ml-0">
                <span className="w-2 h-2 bg-emerald-600 inline-block" />
                <span>Total: {filteredProjects.length} Plates</span>
              </div>
            </div>

            {/* Window Content: White Sunken Gallery Well */}
            <div className="p-4 sm:p-6 bg-[#d4d4d4]">
              <div className="retro-bevel-inset bg-white p-4 sm:p-7 min-h-[550px] flex flex-col justify-between">
                
                {filteredProjects.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-black/70 font-retro-mono space-y-2">
                    <span className="text-3xl">📁</span>
                    <p className="font-bold uppercase text-black">NO PLATES FOUND IN FILTER</p>
                    <p className="text-xs">Silakan pilih kategori filter lain pada toolbar di atas.</p>
                  </div>
                ) : viewMode === 'carousel' ? (
                  /* ================= MODE A: POLAROID 3D CAROUSEL (FAENDITA STYLE) ================= */
                  <div className="polaroid-carousel-wrapper flex-1 flex flex-col justify-between py-2">
                    <div
                      className="polaroid-carousel select-none relative"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      {filteredProjects.map((project, idx) => {
                        const isActive = idx === safeActiveIndex;
                        const isPrev =
                          filteredProjects.length > 2 &&
                          idx === (safeActiveIndex - 1 + filteredProjects.length) % filteredProjects.length;
                        const isNext =
                          filteredProjects.length > 1 &&
                          idx === (safeActiveIndex + 1) % filteredProjects.length;

                        // Only render active, prev, and next for optimal DOM performance and smooth 3D layer
                        if (!isActive && !isPrev && !isNext) return null;

                        return (
                          <div
                            key={project.id}
                            onClick={() => {
                              if (isPrev) handlePrevProject();
                              else if (isNext) handleNextProject();
                            }}
                            onMouseMove={isActive ? handleCardMouseMove : undefined}
                            onMouseLeave={isActive ? handleCardMouseLeave : undefined}
                            style={isActive ? tiltStyle : undefined}
                            className={`polaroid-card ${
                              isActive
                                ? 'active cursor-default'
                                : isPrev
                                ? 'prev cursor-pointer'
                                : 'next cursor-pointer'
                            }`}
                            tabIndex={0}
                            role="button"
                            aria-label={`Lihat karya ${project.title}`}
                          >
                            {/* Polaroid Picture Frame */}
                            <div
                              onClick={() => {
                                if (isActive) onOpenProject(project);
                              }}
                              className={`retro-bevel-inset bg-black overflow-hidden relative aspect-[16/10] sm:aspect-[4/3] w-full ${
                                isActive ? 'cursor-pointer' : ''
                              }`}
                            >
                              <img
                                src={project.imageUrl || (project.images && project.images[0]) || '/avatar.svg'}
                                alt={project.title}
                                className={`w-full h-full ${
                                  project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                                }`}
                                loading="lazy"
                              />
                              {project.featured && (
                                <div className="absolute top-2 left-2 bg-[#ffff00] text-black font-retro-mono text-[9px] font-black px-1.5 py-0.5 border border-black shadow">
                                  ★ COVER MOMENT
                                </div>
                              )}
                              <div className="absolute bottom-1.5 right-1.5 bg-black/85 text-white font-retro-mono text-[9px] px-1.5 py-0.5 font-bold">
                                {project.category.toUpperCase()}
                              </div>
                            </div>

                            {/* Polaroid Caption Area */}
                            <div className="pt-3 pb-1 px-1 flex flex-col justify-between gap-2 text-black">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[10px] sm:text-[11px] font-retro-mono uppercase text-[#000080] font-black truncate">
                                    {project.subtitle || `PLATE #${idx + 1}`}
                                  </span>
                                  <span className="text-[9px] font-retro-mono text-black/60 bg-[#d4d4d4] px-1.5 py-0.2 border border-black/20 shrink-0">
                                    {project.role}
                                  </span>
                                </div>

                                <h4 className="font-retro-display font-black text-lg sm:text-xl text-black uppercase leading-tight line-clamp-1">
                                  {project.title}
                                </h4>

                                <p className="font-retro-interface text-xs text-black/80 leading-normal line-clamp-2">
                                  {project.summary}
                                </p>
                              </div>

                              {/* Tech Stack Chips */}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {project.stack.slice(0, 4).map((tech, ti) => (
                                  <span
                                    key={ti}
                                    className="text-[9px] font-retro-mono px-1.5 py-0.5 bg-white text-black border border-[#808080]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              {/* Action Buttons for Active Card */}
                              {isActive && (
                                <div className="flex items-center gap-1.5 pt-2 mt-1 border-t border-black/15">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOpenProject(project);
                                    }}
                                    className="retro-key-button flex-1 py-1.5 px-2 text-xs font-bold bg-[#d4d4d4] hover:bg-white flex items-center justify-center gap-1.5"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-[#000080]" />
                                    <span>Buka Case Study</span>
                                  </button>

                                  {project.demoUrl && (
                                    <a
                                      href={project.demoUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="retro-key-button py-1.5 px-2 text-xs font-bold bg-[#d4d4d4] hover:bg-white flex items-center gap-1"
                                      title="Live Demo"
                                    >
                                      <ExternalLink className="w-3 h-3 text-emerald-700" />
                                      <span className="text-[11px] hidden sm:inline">Demo</span>
                                    </a>
                                  )}

                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="retro-key-button py-1.5 px-2 text-xs font-bold bg-[#d4d4d4] hover:bg-white flex items-center gap-1"
                                      title="Source Code"
                                    >
                                      <GithubIcon size={12} />
                                      <span className="text-[11px] hidden sm:inline">Repo</span>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Carousel Navigation Footer (Dots & Tips) */}
                    <div className="pt-4 flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center gap-2">
                        {filteredProjects.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => handleSelectProject(dotIdx)}
                            className={`carousel-dot ${dotIdx === safeActiveIndex ? 'active' : ''}`}
                            title={`Lompat ke Plate #${dotIdx + 1}`}
                            aria-label={`Slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>

                      <p className="text-[10px] font-retro-mono text-black/50 text-center">
                        TIP: Gunakan tombol Prev / Next, keyboard ← / →, atau klik kartu samping untuk rotasi carousel
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ================= MODE B: ALL PROJECTS GRID ================= */
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-black/10 font-retro-mono text-xs">
                      <span className="font-bold text-[#000080] uppercase">
                        CATALOG OF {projectFilter.toUpperCase()} PROJECTS ({filteredProjects.length} ITEMS)
                      </span>
                      <span className="text-black/60">VIEW: DESKTOP PLATES</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                      {filteredProjects.map((project, idx) => (
                        <div
                          key={project.id}
                          className="retro-bevel-raised bg-[#d4d4d4] p-3 flex flex-col justify-between hover:bg-[#e8e8e8] transition-none group"
                        >
                          {/* Picture Box */}
                          <div
                            onClick={() => onOpenProject(project)}
                            className="retro-bevel-inset bg-black aspect-[16/10] overflow-hidden relative mb-2 cursor-pointer"
                          >
                            <img
                              src={project.imageUrl || (project.images && project.images[0]) || '/avatar.svg'}
                              alt={project.title}
                              className={`w-full h-full ${
                                project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                              } group-hover:scale-105 transition-transform duration-200`}
                              loading="lazy"
                            />
                            {project.featured && (
                              <div className="absolute top-1.5 left-1.5 bg-[#ffff00] text-black font-retro-mono text-[9px] font-black px-1.5 py-0.2 border border-black shadow">
                                ★ COVER MOMENT
                              </div>
                            )}
                            <div className="absolute bottom-1 right-1 bg-black/85 text-white font-retro-mono text-[8px] px-1 py-0.2 font-bold">
                              {project.category.toUpperCase()}
                            </div>
                          </div>

                          <div className="space-y-1.5 flex-1 flex flex-col justify-between text-black">
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-[10px] font-retro-mono uppercase text-[#000080] font-black truncate">
                                  {project.subtitle || `PLATE #${idx + 1}`}
                                </span>
                                <span className="text-[9px] font-retro-mono text-black/60 bg-white px-1 py-0.2 border border-black/20 shrink-0">
                                  {project.role}
                                </span>
                              </div>

                              <h4 className="font-retro-display font-black text-base text-black uppercase leading-tight line-clamp-1">
                                {project.title}
                              </h4>

                              <p className="font-retro-interface text-xs text-black/75 line-clamp-2 mt-1">
                                {project.summary}
                              </p>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-black/10">
                              <div className="flex flex-wrap gap-1">
                                {project.stack.slice(0, 3).map((tech, ti) => (
                                  <span
                                    key={ti}
                                    className="text-[9px] font-retro-mono px-1.5 py-0.2 bg-white text-black border border-[#808080]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center gap-1.5 pt-1">
                                <button
                                  onClick={() => onOpenProject(project)}
                                  className="retro-key-button flex-1 py-1 text-xs font-bold bg-[#d4d4d4] hover:bg-white flex items-center justify-center gap-1"
                                >
                                  <FileText className="w-3.5 h-3.5 text-[#000080]" />
                                  <span>Buka Detail</span>
                                </button>
                                {project.demoUrl && (
                                  <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="retro-key-button p-1 text-xs font-bold bg-[#d4d4d4] hover:bg-white"
                                    title="Live Demo"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                                  </a>
                                )}
                                {project.githubUrl && (
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="retro-key-button p-1 text-xs font-bold bg-[#d4d4d4] hover:bg-white"
                                    title="Source Code"
                                  >
                                    <GithubIcon size={14} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Window Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black gap-2">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 flex-1 truncate">
                MODE: {viewMode.toUpperCase()} • KLIK KARYA UNTUK CASE STUDY & ARSITEKTUR LENGKAP
              </div>
              <div className="retro-bevel-inset bg-white px-2 py-0.5 shrink-0">
                PLATE {safeActiveIndex + 1} OF {filteredProjects.length} • TOTAL: {projects.length} UNITS
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* ================= 6. SETUP SEQUENCE (TIMELINE & EXPERIENCE) ================= */}
        <section id="career" className="scroll-mt-14">
          <RetroWindow
            id="career"
            title="CAREER_SETUP_WIZARD.EXE - Riwayat Karir & Milestone Rekayasa"
            icon={<HardDrive className="w-3.5 h-3.5 text-yellow-300" />}
          >
            {/* Menu Bar */}
            <div className="bg-[#d4d4d4] px-2 py-0.5 border-b border-b-[#808080] text-[11px] flex gap-3 text-black">
              <span><u>S</u>tep</span>
              <span><u>V</u>iew</span>
              <span><u>H</u>elp</span>
            </div>

            {/* Wizard Setup Content */}
            <div className="p-4 sm:p-6 bg-[#d4d4d4] space-y-5">
              {/* Segmented Progress Motif */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-retro-mono font-bold">
                  <span>INSTALLATION PROGRESS: MILESTONE SEQUENCE</span>
                  <span>STEP {activeStepIndex + 1} OF {experience.length} (100% VERIFIED)</span>
                </div>
                {/* Segmented bar */}
                <div className="retro-bevel-inset bg-white p-1">
                  <div className="flex gap-1 h-5">
                    {experience.map((_, si) => (
                      <div
                        key={si}
                        onClick={() => setActiveStepIndex(si)}
                        className={`flex-1 cursor-pointer transition-none flex items-center justify-center text-[10px] font-retro-mono font-black ${
                          si <= activeStepIndex
                            ? 'bg-[#000080] text-white'
                            : 'bg-[#d4d4d4] text-black hover:bg-yellow-200'
                        }`}
                        title={`Lompat ke Step ${si + 1}`}
                      >
                        {si + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Numbered Steps Sequence */}
              <div className="space-y-4">
                {experience.map((item, index) => {
                  const isActive = index === activeStepIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveStepIndex(index)}
                      className={`retro-bevel-raised transition-none cursor-pointer ${
                        isActive ? 'bg-[#ffff00]' : 'bg-[#d4d4d4]'
                      }`}
                    >
                      {/* Step Header */}
                      <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 flex items-center justify-center font-retro-mono font-black text-xs ${
                            isActive ? 'bg-black text-[#ffff00]' : 'bg-[#000080] text-white'
                          }`}>
                            0{index + 1}
                          </span>
                          <div>
                            <h3 className="font-retro-display font-black text-base sm:text-lg text-black uppercase">
                              {item.role}
                            </h3>
                            <p className="font-retro-interface text-xs font-bold text-black/80">
                              {item.organization}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="retro-bevel-inset bg-white px-2 py-0.5 text-xs font-retro-mono font-bold text-black">
                            {item.period}
                          </span>
                          {item.badge && (
                            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-retro-mono uppercase">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Step Details in White Inset Reading Well */}
                      <div className="p-3 sm:p-4 bg-[#ffffff]">
                        <p className="text-xs sm:text-sm font-retro-interface text-black/90 leading-relaxed">
                          {item.description}
                        </p>

                        {item.tech && item.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-black/10">
                            {item.tech.map((t, ti) => (
                              <span
                                key={ti}
                                className="text-[10px] font-retro-mono px-2 py-0.5 bg-[#d4d4d4] text-black border border-[#808080]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 w-full">
                Setup status: Complete • All milestone dependencies satisfied
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* ================= 7. GUESTBOOK WINDOW (DEDIKASI & INTEGRITAS) ================= */}
        <section className="scroll-mt-14">
          <RetroWindow
            id="guestbook"
            title="GUESTBOOK.EXE - Dedikasi & Integritas Rekayasa"
            icon={<span className="w-3.5 h-3.5 bg-yellow-400 text-black flex items-center justify-center text-[10px] font-black">✍</span>}
          >
            {/* Menu Bar */}
            <div className="bg-[#d4d4d4] px-2 py-0.5 border-b border-b-[#808080] text-[11px] flex gap-3 text-black">
              <span><u>F</u>ile</span>
              <span><u>E</u>dit</span>
              <span><u>V</u>iew</span>
              <span><u>H</u>elp</span>
            </div>

            {/* Window Content */}
            <div className="p-4 sm:p-6 bg-[#d4d4d4] space-y-4">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold uppercase font-retro-mono text-[#000080]">
                  GUESTBOOK LOG ENTRY #001
                </span>
                <span className="text-xs font-retro-mono bg-black text-[#ffff00] px-2 py-0.5 uppercase font-bold">
                  VERIFIED RECORD
                </span>
              </div>

              {/* Guestbook Entry in White Inset Reading Well */}
              <div className="retro-bevel-inset bg-white p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/10 text-xs font-retro-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#000080] text-white flex items-center justify-center font-bold text-xs">
                      AS
                    </div>
                    <span className="font-bold text-black">{profile.name}</span>
                    <span className="text-black/60">&lt;{profile.contact.email}&gt;</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-300 font-bold inline-block text-xs">
                    ENTRY VERIFIED • {profile.experienceStart || 'Active'}
                  </span>
                </div>

                <blockquote className="font-retro-display text-base sm:text-xl font-bold text-black leading-snug">
                  &quot;Dedikasi tinggi terhadap keandalan kode, skalabilitas sistem, serta pengalaman interaksi pengguna yang presisi dan bermakna.&quot;
                </blockquote>

                <p className="font-retro-interface text-xs sm:text-sm text-black/80 leading-relaxed">
                  Setiap proyek yang dirancang mengutamakan maintainability, performa tinggi, dan struktur kode yang mudah dikembangkan lebih lanjut oleh tim engineering.
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-retro-mono text-[#000080] font-bold">
                  <span>LOCATION: {profile.contact.location || 'Indonesia'}</span>
                  <span>SIGNATURE: {profile.name ? profile.name.toUpperCase() : 'AHMAD SOBIRIN'}</span>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 w-full">
                1 of 1 signature verified • Integrity check passed: SHA-256 OK
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* ================= 8. CLOSE WITH SMALLER DIALOG WINDOW (CONTACT) ================= */}
        <section id="contact" className="scroll-mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <RetroWindow
            id="contact"
            title="CONTACT_DIALOG.EXE - Saluran Transmisi & Diskusi"
            icon={<Mail className="w-3.5 h-3.5 text-yellow-300" />}
            className="lg:col-span-8 lg:col-start-3"
            controls="close"
          >
            {/* Dialog Content */}
            <div className="p-5 sm:p-7 bg-[#d4d4d4] space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-400 border-2 border-black flex items-center justify-center text-2xl shrink-0 font-bold">
                  ✉
                </div>
                <div className="space-y-1">
                  <h3 className="font-retro-display font-black text-xl sm:text-2xl uppercase text-black">
                    Mari Berkolaborasi & Mewujudkan Ide Anda
                  </h3>
                  <p className="font-retro-interface text-xs sm:text-sm text-black/80">
                    Punya proyek baru, tawaran rekayasa perangkat lunak, atau ingin mendiskusikan arsitektur sistem? Silakan kirim transmisi pesan.
                  </p>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="retro-bevel-inset bg-white p-4 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold font-retro-mono text-xs uppercase text-[#000080]">EMAIL:</span>
                    <span className="font-retro-mono text-xs sm:text-sm font-semibold truncate text-black">
                      {profile.contact.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyEmail}
                      className="retro-key-button px-3 py-1.5 text-xs font-bold bg-[#d4d4d4] flex items-center gap-1.5"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-black" />
                          <span>Salin Alamat</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="retro-key-button px-4 py-1.5 text-xs font-bold bg-[#ffff00] text-black flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Email</span>
                    </a>
                  </div>
                </div>

                {/* External Social Links */}
                <div className="pt-3 border-t border-black/10 flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-bold font-retro-mono text-black/70">EXTERNAL PROFILES:</span>
                  {profile.contact.github && (
                    <a
                      href={profile.contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="retro-key-button px-3 py-1 text-xs font-bold bg-[#d4d4d4] flex items-center gap-1.5"
                    >
                      <GithubIcon size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {profile.contact.linkedin && (
                    <a
                      href={profile.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="retro-key-button px-3 py-1 text-xs font-bold bg-[#d4d4d4] flex items-center gap-1.5"
                    >
                      <LinkedinIcon size={14} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Dialog Buttons */}
              <div className="flex justify-end gap-2 pt-1">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="retro-key-button px-5 py-2 text-xs font-bold bg-[#d4d4d4] hover:bg-white"
                >
                  [ OK ]
                </a>
                <a
                  href="#launchpad"
                  className="retro-key-button px-5 py-2 text-xs font-bold bg-[#d4d4d4] hover:bg-white"
                >
                  [ Kembali ke Atas ]
                </a>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#d4d4d4] p-1.5 flex items-center justify-between text-[11px] font-retro-mono text-black">
              <div className="retro-bevel-inset bg-white px-2 py-0.5 w-full">
                TRANSMISSION CHANNEL: OPEN & READY
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* ================= 9. BROAD FOOTER WITH FOLDER-LIKE LINK HEADINGS ================= */}
        <footer className="retro-bevel-raised bg-[#d4d4d4] p-5 sm:p-7 space-y-6 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Folder Group 1: Navigation */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#000080] font-retro-mono pb-1 border-b border-black/20">
                <Folder className="w-4 h-4 text-[#000080]" />
                <span>FOLDER: C:\NAVIGATION</span>
              </div>
              <ul className="text-xs space-y-1 font-retro-interface">
                <li>
                  <a href="#launchpad" className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1">
                    <span>📄</span>
                    <span>Launch Pad (Home)</span>
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1">
                    <span>📁</span>
                    <span>Galeri Proyek</span>
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1">
                    <span>📁</span>
                    <span>Tech Arsenal</span>
                  </a>
                </li>
                <li>
                  <a href="#career" className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1">
                    <span>📁</span>
                    <span>Jejak Karir</span>
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1">
                    <span>📄</span>
                    <span>Kontak & Transmisi</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Folder Group 2: Profiles */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#000080] font-retro-mono pb-1 border-b border-black/20">
                <Folder className="w-4 h-4 text-[#000080]" />
                <span>FOLDER: C:\EXTERNAL_LINKS</span>
              </div>
              <ul className="text-xs space-y-1 font-retro-interface">
                {profile.contact.github && (
                  <li>
                    <a
                      href={profile.contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1"
                    >
                      <span>🐙</span>
                      <span>GitHub: {profile.contact.github.replace('https://github.com/', '')}</span>
                    </a>
                  </li>
                )}
                {profile.contact.linkedin && (
                  <li>
                    <a
                      href={profile.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1"
                    >
                      <span>💼</span>
                      <span>LinkedIn Profile</span>
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="text-black hover:text-[#0000ff] hover:underline flex items-center gap-1"
                  >
                    <span>✉</span>
                    <span>Direct Mail Transmission</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Folder Group 3: System Utilities */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#000080] font-retro-mono pb-1 border-b border-black/20">
                <HardDrive className="w-4 h-4 text-[#000080]" />
                <span>SYSTEM: C:\CONTROL_PANEL</span>
              </div>
              <div className="space-y-2 text-xs">
                <a
                  href="#/admin"
                  className="retro-key-button w-full px-3 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 bg-[#d4d4d4]"
                >
                  <Settings className="w-3.5 h-3.5 text-black" />
                  <span>Buka Admin Manager (Ctrl+Shift+A)</span>
                </a>

                <div className="retro-bevel-inset bg-white p-2 text-[10px] font-retro-mono text-black/70">
                  BUILD: RETRO DESKTOP v1.0 • OS ARCH: 12-COL GRID • HARD BEVEL ENGINE
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-retro-mono text-black/70">
            <p>© {new Date().getFullYear()} {profile.name} • All rights reserved.</p>
            <p>Designed in Retro Desktop Style • High Density & Offset Windows</p>
          </div>
        </footer>
      </main>

      {/* ================= 10. CLASSIC WINDOWS BOTTOM TASKBAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#d4d4d4] border-t-2 border-t-white border-b-2 border-b-black shadow-[0_-2px_6px_rgba(0,0,0,0.5)] px-2 py-1 flex items-center justify-between text-xs select-none">
        
        {/* Left: Start Button & Active Tasks */}
        <div className="flex items-center gap-2">
          {/* Start Button */}
          <div className="relative" ref={startMenuRef}>
            <button
              data-start-button
              onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
              aria-expanded={isStartMenuOpen}
              className={`retro-key-button px-2.5 py-1 text-xs font-bold flex items-center gap-1.5 bg-[#d4d4d4] active:bg-[#c0c0c0] ${
                isStartMenuOpen ? 'is-pressed' : ''
              }`}
            >
              <span className="w-3.5 h-3.5 bg-[#000080] text-white flex items-center justify-center text-[10px] font-black shadow-inner">
                ⊞
              </span>
              <span>Start</span>
            </button>

            {/* Popup Start Menu */}
            {isStartMenuOpen && (
              <div className="rw-start-menu absolute bottom-9 left-0 w-56 retro-bevel-raised bg-[#d4d4d4] shadow-2xl p-1 z-50 flex flex-col font-retro-interface text-xs">
                {/* Vertical Blue Banner */}
                <div className="bg-[#000080] text-white p-2 font-retro-display font-black text-sm tracking-wider uppercase mb-1">
                  Retro 95 OS
                </div>

                <a
                  href="#launchpad"
                  onClick={() => setIsStartMenuOpen(false)}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Launch Pad</span>
                </a>
                <a
                  href="#projects"
                  onClick={() => setIsStartMenuOpen(false)}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>Koleksi Proyek</span>
                </a>
                <a
                  href="#capabilities"
                  onClick={() => setIsStartMenuOpen(false)}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Tech Arsenal</span>
                </a>
                <a
                  href="#career"
                  onClick={() => setIsStartMenuOpen(false)}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Jejak Karir</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsStartMenuOpen(false)}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </a>
                <div className="border-t border-black/20 my-1" />
                <a
                  href="#/admin"
                  onClick={() => setIsStartMenuOpen(false)}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 font-bold"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Panel Admin</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsStartMenuOpen(false);
                    arrangeWindows();
                  }}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 text-left"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Rapikan Jendela</span>
                </button>
                <div className="border-t border-black/20 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    setIsStartMenuOpen(false);
                    setShowShutdown(true);
                  }}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 text-left"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>
                    Sh<u>u</u>t Down...
                  </span>
                </button>
              </div>
            )}
          </div>

          <RetroTaskButtons />

          {/* Active Running Window Tabs */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="retro-bevel-inset bg-[#f0f0f0] px-2.5 py-1 text-[11px] font-bold text-black flex items-center gap-1.5 shadow-inner">
              <span className="w-2 h-2 bg-emerald-600 rounded-none inline-block" />
              <span className="truncate max-w-[140px] md:max-w-[200px]">
                {profile.name} - Retro Desktop
              </span>
            </div>

            <div className="retro-bevel-raised bg-[#d4d4d4] px-2.5 py-1 text-[11px] font-semibold text-black/70 hidden md:flex items-center gap-1">
              <Folder className="w-3 h-3 text-black" />
              <span>Projects: {projects.length}</span>
            </div>
          </div>
        </div>

        {/* Right: System Tray */}
        <div className="retro-bevel-inset bg-white px-2.5 py-0.5 flex items-center gap-2 text-[11px] font-retro-mono font-bold text-black">
          <Globe className="w-3.5 h-3.5 text-[#000080]" />
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-black/30">|</span>
          <span>{currentTime || 'JAKARTA WIB'}</span>
        </div>
      </div>
    </div>
  );
};

export default RetroTemplate;
