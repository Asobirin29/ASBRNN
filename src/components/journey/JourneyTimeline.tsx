import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  GraduationCap,
  Layers,
  Rocket,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Compass,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Waves
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useTheme } from '../../context/ThemeContext';
import type { ExperienceItem } from '../../types/portfolio';
import { JourneyOceanCanvas } from './JourneyOceanCanvas';
import { JellyfishFieldsGroup } from '../spongebob/JellyfishFields';

const categoryConfig: Record<
  string,
  {
    icon: React.FC<{ className?: string }>;
    label: string;
    nodeBg: string;
    nodeText: string;
    tagBg: string;
    tagText: string;
    tagBorder: string;
  }
> = {
  education: {
    icon: GraduationCap,
    label: 'Pendidikan Formal',
    nodeBg: 'bg-[#fde047]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#fde047]',
    tagText: 'text-[#0f172a]',
    tagBorder: 'border-[#0f172a]'
  },
  bootcamp: {
    icon: Layers,
    label: 'Intensive Bootcamp',
    nodeBg: 'bg-[#38bdf8]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#e0f2fe]',
    tagText: 'text-[#0284c7]',
    tagBorder: 'border-[#0f172a]'
  },
  project: {
    icon: Rocket,
    label: 'MBKM & Capstone',
    nodeBg: 'bg-[#4ade80]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#dcfce7]',
    tagText: 'text-[#15803d]',
    tagBorder: 'border-[#0f172a]'
  },
  security: {
    icon: ShieldCheck,
    label: 'Cyber Security',
    nodeBg: 'bg-[#fb7185]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#fee2e2]',
    tagText: 'text-[#dc2626]',
    tagBorder: 'border-[#0f172a]'
  }
};

/** Gimmick 1: Cute Neobrutalism Sailing Vessel that glides between waypoints */
const SailingVessel: React.FC<{ isCruising: boolean }> = ({ isCruising }) => {
  return (
    <div className="relative flex flex-col items-center pointer-events-none select-none">
      <motion.div
        animate={{
          y: isCruising ? [-2, -7, -2] : [0, -5, 0],
          rotate: isCruising ? [-4, 5, -4] : [-2, 2, -2],
        }}
        transition={{
          repeat: Infinity,
          duration: isCruising ? 1.6 : 3.2,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Main Hull */}
          <path
            d="M6 34 L48 34 L42 45 L12 45 Z"
            fill="#fde047"
            stroke="#0f172a"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Hull Stripe */}
          <path
            d="M8 39 L46 39"
            stroke="#0284c7"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Mast */}
          <line
            x1="26"
            y1="8"
            x2="26"
            y2="34"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Big Main Sail (Sky Blue) */}
          <path
            d="M26 10 L44 29 L26 29 Z"
            fill="#38bdf8"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Front Jib Sail (Cream Paper) */}
          <path
            d="M24 13 L11 29 L24 29 Z"
            fill="#fffdf5"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Top Red Pennant Flag with Flutter */}
          <path
            d="M26 8 L36 12 L26 15 Z"
            fill="#ef4444"
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Life ring on hull */}
          <circle cx="27" cy="41" r="2.5" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
        </svg>

        {/* Water foam & ripple beneath boat */}
        <motion.div
          animate={{ scaleX: [0.8, 1.3, 0.8], opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-11 h-1.5 bg-white/90 rounded-full blur-[0.6px] border border-white"
        />
      </motion.div>
    </div>
  );
};

export const JourneyTimeline: React.FC = () => {
  const { isSunset } = useTheme();
  const { experience: rawExperienceData } = usePortfolioData();
  const experienceData = rawExperienceData && rawExperienceData.length > 0 ? rawExperienceData : [];
  const containerRef = useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isCruiseMode, setIsCruiseMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  // Trigger water splash particles gimmick on slide change
  const triggerSplash = useCallback(() => {
    const newSplashes = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 25 + Math.random() * 50,
      y: 60 + Math.random() * 30,
      size: 10 + Math.random() * 14,
    }));
    setSplashes(newSplashes);
    setTimeout(() => {
      setSplashes([]);
    }, 850);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      if (experienceData.length === 0) return;
      setDirection(newDirection);
      setActiveIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return experienceData.length - 1;
        if (next >= experienceData.length) return 0;
        return next;
      });
      triggerSplash();
    },
    [experienceData.length, triggerSplash]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex || experienceData.length === 0) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      triggerSplash();
    },
    [activeIndex, experienceData.length, triggerSplash]
  );

  // Auto-cruise timer
  useEffect(() => {
    if (!isCruiseMode || isHovered || experienceData.length <= 1) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [isCruiseMode, isHovered, paginate, experienceData.length]);

  // Keyboard navigation when user is around this section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  if (experienceData.length === 0) {
    return null;
  }

  const currentItem: ExperienceItem = experienceData[activeIndex] || experienceData[0];
  const currentConfig = categoryConfig[currentItem.category || 'education'] || categoryConfig.education;
  const CurrentIcon = currentConfig.icon;

  const prevItem = experienceData[(activeIndex - 1 + experienceData.length) % experienceData.length];
  const nextItem = experienceData[(activeIndex + 1) % experienceData.length];

  // Carousel slide animation variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 160 : -160,
      opacity: 0,
      scale: 0.94,
      rotateY: dir > 0 ? 5 : -5,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -160 : 160,
      opacity: 0,
      scale: 0.94,
      rotateY: dir > 0 ? -5 : 5,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative scroll-mt-24 z-20 -mt-1 w-full select-none py-28 sm:py-36 overflow-hidden"
    >
      {/* Animated ocean waves, bubbles, and fish */}
      <JourneyOceanCanvas />

      {/* Floating Jellyfish from SpongeBob Jellyfish Fields */}
      <JellyfishFieldsGroup />

      {/* Floating Lifebuoy Gimmick */}
      <motion.div
        animate={{ rotate: [-8, 8, -8], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
        className="absolute top-20 right-6 sm:right-24 z-10 pointer-events-none opacity-90 hidden sm:block"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          <circle cx="27" cy="27" r="22" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="27" cy="27" r="11" fill={isSunset ? '#ea580c' : '#0284c7'} stroke="#0f172a" strokeWidth="2.5" />
          <path d="M27 5 L27 16" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <path d="M27 38 L27 49" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <path d="M5 27 L16 27" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <path d="M38 27 L49 27" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-10">
        {/* Header Dock with Neobrutalism Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border-2 sm:border-3 flex flex-col md:flex-row md:items-center md:justify-between gap-5 transition-colors ${
            isSunset
              ? 'bg-[#221033] border-orange-500/40 shadow-[4px_4px_0px_#ea580c] sm:shadow-[6px_6px_0px_#ea580c]'
              : 'bg-[#fffdf5] border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a]'
          }`}
        >
          <div className="space-y-2">
            <div
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-xs font-mono font-black border-2 w-fit ${
                isSunset
                  ? 'bg-[#ea580c] text-white border-orange-400 shadow-[2px_2px_0px_#f97316] sm:shadow-[3px_3px_0px_#f97316]'
                  : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 animate-[spin_12s_linear_infinite]" />
              <span>MILESTONE VOYAGE</span>
            </div>

            <div className="space-y-1">
              <h2
                className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] ${
                  isSunset ? 'text-white' : 'text-[#0f172a]'
                }`}
              >
                Milestone Perjalanan
              </h2>
              <p
                className={`text-xs sm:text-base font-medium max-w-2xl leading-relaxed ${
                  isSunset ? 'text-slate-300' : 'text-[#475569]'
                }`}
              >
                Jelajahi rekam jejak akademik, bootcamp intensif, inovasi terapan, dan keahlian keamanan siber secara interaktif.
              </p>
            </div>
          </div>

          {/* Quick Cockpit Controls */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Auto-cruise Toggle */}
            <button
              onClick={() => setIsCruiseMode((prev) => !prev)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 font-mono font-bold text-xs hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer ${
                isCruiseMode
                  ? 'bg-[#4ade80] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                  : isSunset
                  ? 'bg-[#311545] hover:bg-[#3d1a55] text-amber-200 border-orange-500/40 shadow-[2px_2px_0px_#ea580c]'
                  : 'bg-[#fff9d4] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
              }`}
              title="Aktifkan perputaran otomatis milestone"
            >
              {isCruiseMode ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Cruising...</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto Cruise</span>
                </>
              )}
            </button>

            {/* Waypoint Counter Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 font-mono font-black text-xs ${
                isSunset
                  ? 'bg-[#311545] border-orange-500/40 text-amber-300 shadow-[2px_2px_0px_#ea580c]'
                  : 'bg-[#fff9d4] border-[#0f172a] text-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
              }`}
            >
              <Waves className={`w-3.5 h-3.5 ${isSunset ? 'text-amber-400' : 'text-[#0284c7]'}`} />
              <span>
                {String(activeIndex + 1).padStart(2, '0')} / {String(experienceData.length).padStart(2, '0')}
              </span>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => paginate(-1)}
                aria-label="Milestone Sebelumnya"
                className={`w-9 h-9 rounded-xl border-2 hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer ${
                  isSunset
                    ? 'bg-[#29123c] hover:bg-[#3d1a55] border-orange-500/40 text-amber-200 shadow-[2px_2px_0px_#ea580c]'
                    : 'bg-[#fffdf5] hover:bg-[#fde047] border-[#0f172a] text-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Milestone Selanjutnya"
                className={`w-9 h-9 rounded-xl border-2 hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer ${
                  isSunset
                    ? 'bg-[#29123c] hover:bg-[#3d1a55] border-orange-500/40 text-amber-200 shadow-[2px_2px_0px_#ea580c]'
                    : 'bg-[#fffdf5] hover:bg-[#fde047] border-[#0f172a] text-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Gimmick 1: Horizontal Nautical Waypoint Track with Gliding Sailing Vessel */}
        <div className="relative pt-12 pb-2 px-2 sm:px-6">
          {/* Nautical Route Line */}
          <div className="absolute top-[72px] sm:top-[76px] left-8 right-8 sm:left-14 sm:right-14 h-3 bg-black/25 rounded-full overflow-hidden border-2 border-white/50 shadow-inner z-0">
            {/* Active Route Progress */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#fde047] via-[#38bdf8] via-[#4ade80] to-[#fb7185] rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              initial={false}
              animate={{
                width: `${(activeIndex / (experienceData.length - 1)) * 100}%`,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            />
          </div>

          {/* Waypoint Stations */}
          <div className="relative z-10 flex items-center justify-between">
            {experienceData.map((item, idx) => {
              const config = categoryConfig[item.category || 'education'] || categoryConfig.education;
              const Icon = config.icon;
              const isActive = idx === activeIndex;

              return (
                <div key={item.id} className="relative flex flex-col items-center">
                  {/* Sailing Boat docked above active waypoint */}
                  {isActive && (
                    <motion.div
                      layoutId="sailingVessel"
                      className="absolute -top-13 sm:-top-14 z-20"
                      transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 24,
                        mass: 0.8,
                      }}
                    >
                      <SailingVessel isCruising={isCruiseMode} />
                    </motion.div>
                  )}

                  {/* Waypoint Station Node Button */}
                  <button
                    onClick={() => goToSlide(idx)}
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border-2 sm:border-3 border-[#0f172a] flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isActive
                        ? `${config.nodeBg} ${config.nodeText} shadow-[3px_3px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a] scale-110 sm:scale-120 ring-4 ring-white/70`
                        : 'bg-[#fffdf5] text-[#475569] hover:bg-[#fff9d4] hover:text-[#0f172a] shadow-[2px_2px_0px_#0f172a] hover:scale-105'
                    }`}
                    title={`${item.role} (${item.period})`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />

                    {/* Step Number Badge */}
                    <span
                      className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#0f172a] text-[9px] sm:text-[10px] font-mono font-black flex items-center justify-center shadow-sm ${
                        isActive ? 'bg-[#0f172a] text-white' : 'bg-[#fde047] text-[#0f172a]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </button>

                  {/* Period label below waypoint */}
                  <span
                    onClick={() => goToSlide(idx)}
                    className={`hidden sm:block mt-3 text-[11px] font-mono font-bold tracking-tight text-center max-w-[90px] truncate cursor-pointer transition-colors ${
                      isActive
                        ? 'text-white drop-shadow-[0_2px_3px_rgba(15,23,42,0.9)] scale-105'
                        : 'text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(15,23,42,0.8)]'
                    }`}
                  >
                    {item.period.split('-')[0].trim()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gimmick 3: Splash Particles emerging on slide change */}
        <div className="relative">
          {splashes.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -50, scale: 1.4 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
              }}
              className="absolute rounded-full bg-white/80 border border-[#38bdf8] shadow-[0_0_8px_rgba(255,255,255,0.9)] pointer-events-none z-30"
            />
          ))}

          {/* Main Carousel Stage with Desktop Side Controls & Drag Gesture */}
          <div className="relative flex items-center justify-center gap-3 sm:gap-6">
            {/* Desktop Left Chevron Button */}
            <button
              onClick={() => paginate(-1)}
              aria-label="Milestone Sebelumnya"
              className={`hidden lg:flex w-14 h-14 rounded-2xl border-3 ${
                isSunset
                  ? 'bg-[#221033] hover:bg-[#ff7b00] text-amber-200 hover:text-[#150720] border-orange-500/50 shadow-[4px_4px_0px_#ea580c] hover:shadow-[2px_2px_0px_#ea580c]'
                  : 'bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[4px_4px_0px_#0f172a] hover:shadow-[2px_2px_0px_#0f172a]'
              } hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none items-center justify-center transition-all cursor-pointer shrink-0 z-20 group`}
              title="Tekan Panah Kiri [←] untuk sebelumnya"
            >
              <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Active Milestone Card (with Buoyant Floating Motion Gimmick & Drag Gesture) */}
            <div
              className="w-full relative overflow-visible cursor-grab active:cursor-grabbing"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Buoyant Wave Bobbing Container */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [-0.3, 0.3, -0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.8,
                  ease: 'easeInOut',
                }}
                className="w-full"
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentItem.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) {
                        paginate(1);
                      } else if (info.offset.x > 60) {
                        paginate(-1);
                      }
                    }}
                    className={`p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[32px] border-2 sm:border-3 space-y-5 sm:space-y-6 transition-colors duration-500 ${
                      isSunset
                        ? 'bg-[#200d33] border-orange-500/40 shadow-[5px_5px_0px_#ea580c] sm:shadow-[8px_8px_0px_#ea580c]'
                        : 'bg-[#fffdf5] border-[#0f172a] shadow-[5px_5px_0px_#0f172a] sm:shadow-[8px_8px_0px_#0f172a]'
                    }`}
                  >
                    {/* Card Header Row */}
                    <div className={`flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b-2 ${
                      isSunset ? 'border-orange-500/20' : 'border-[#0f172a]/10'
                    }`}>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Waypoint ID Tag */}
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-black border-2 ${
                          isSunset
                            ? 'bg-[#3b1259] text-amber-300 border-orange-500/40 shadow-[2px_2px_0px_#ea580c]'
                            : 'bg-[#0f172a] text-[#fffdf5] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                        }`}>
                          <Sparkles className="w-3 h-3 text-[#fde047]" />
                          <span>WAYPOINT #{String(activeIndex + 1).padStart(2, '0')}</span>
                        </span>

                        {/* Category Badge */}
                        <span
                          className={`text-xs font-mono font-black uppercase px-3 py-1 rounded-xl border-2 ${currentConfig.tagBg} ${currentConfig.tagBorder} ${currentConfig.tagText} shadow-[2px_2px_0px_#0f172a]`}
                        >
                          {currentItem.badge || currentConfig.label}
                        </span>
                      </div>

                      {/* Period Badge */}
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 text-xs font-mono font-black shadow-[2px_2px_0px_#0f172a] ${
                        isSunset
                          ? 'bg-[#2e1247] border-orange-500/40 text-amber-200'
                          : 'bg-[#fff9d4] border-[#0f172a] text-[#0f172a]'
                      }`}>
                        <Calendar className={`w-3.5 h-3.5 ${isSunset ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                        <span>{currentItem.period}</span>
                      </div>
                    </div>

                    {/* Card Body: 2 Columns on Desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left Column: Title, Org, Description */}
                      <div className="lg:col-span-7 space-y-3.5">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border-2 border-[#0f172a] ${currentConfig.nodeBg} ${currentConfig.nodeText} flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0f172a] mt-0.5`}
                          >
                            <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>

                          <div className="space-y-0.5">
                            <h3 className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-snug ${
                              isSunset ? 'text-white' : 'text-[#0f172a]'
                            }`}>
                              {currentItem.role}
                            </h3>
                            <div className={`text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 ${
                              isSunset ? 'text-orange-400' : 'text-[#0284c7]'
                            }`}>
                              <span>{currentItem.organization}</span>
                            </div>
                          </div>
                        </div>

                        <p className={`text-xs sm:text-sm md:text-base font-medium leading-relaxed pt-1 ${
                          isSunset ? 'text-purple-200/90' : 'text-[#334155]'
                        }`}>
                          {currentItem.description}
                        </p>
                      </div>

                      {/* Right Column: Highlights & Tech Stack */}
                      <div className="lg:col-span-5 space-y-4">
                        {/* Key Highlights */}
                        {currentItem.highlights && currentItem.highlights.length > 0 && (
                          <div className={`p-3.5 sm:p-4 rounded-2xl border-2 space-y-2 ${
                            isSunset
                              ? 'bg-[#2a103d]/90 border-orange-500/30'
                              : 'bg-[#fff9d4]/85 border-[#0f172a]/15'
                          }`}>
                            <div className={`text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider flex items-center justify-between ${
                              isSunset ? 'text-amber-300' : 'text-[#475569]'
                            }`}>
                              <span>Poin Kunci &amp; Spesialisasi</span>
                              <span className={isSunset ? 'text-orange-400' : 'text-[#0284c7]'}>★</span>
                            </div>
                            <div className="space-y-1.5">
                              {currentItem.highlights.map((hl, hIdx) => (
                                <div
                                  key={hIdx}
                                  className={`flex items-start gap-2 text-xs font-bold leading-tight ${
                                    isSunset ? 'text-purple-100' : 'text-[#1e293b]'
                                  }`}
                                >
                                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                    isSunset ? 'text-emerald-400' : 'text-[#16a34a]'
                                  }`} />
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack Tags */}
                        {currentItem.tech && currentItem.tech.length > 0 && (
                          <div className="space-y-1.5">
                            <div className={`text-[10px] font-mono font-black uppercase tracking-wider ${
                              isSunset ? 'text-purple-300' : 'text-[#64748b]'
                            }`}>
                              Teknologi &amp; Kompetensi
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {currentItem.tech.map((t) => (
                                <span
                                  key={t}
                                  className={`text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-xl border transition-all ${
                                    isSunset
                                      ? 'bg-[#3b1554] hover:bg-[#ff7b00] text-amber-200 hover:text-[#150720] border-orange-500/40 shadow-[1px_1px_0px_#ea580c]'
                                      : 'bg-[#fff9d4] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[1px_1px_0px_#0f172a]'
                                  }`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Bottom Meta Bar */}
                    <div className={`pt-3 border-t-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
                      isSunset ? 'border-orange-500/20 text-purple-300' : 'border-[#0f172a]/10 text-[#64748b]'
                    }`}>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="hidden sm:inline">Navigasi:</span>
                        <span className={`px-1.5 py-0.5 rounded border font-bold ${
                          isSunset ? 'bg-purple-950/60 border-purple-400/20 text-amber-200' : 'bg-black/5 border-black/10'
                        }`}>← / →</span>
                        <span className="hidden sm:inline">atau geser kartu (swipe/drag)</span>
                      </div>

                      {/* Auto cruise pause indicator */}
                      {isCruiseMode && isHovered && (
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          <span>Cruise Dijeda (Membaca)</span>
                        </div>
                      )}

                      {/* Waypoint pagination indicator pills */}
                      <div className="flex items-center gap-1.5">
                        {experienceData.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => goToSlide(dotIdx)}
                            aria-label={`Buka milestone ${dotIdx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                              dotIdx === activeIndex
                                ? isSunset
                                  ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-400 border border-amber-300'
                                  : 'w-8 bg-[#0284c7] border border-[#0f172a]'
                                : isSunset
                                  ? 'w-2.5 bg-purple-800/60 hover:bg-purple-600'
                                  : 'w-2.5 bg-[#cbd5e1] hover:bg-[#94a3b8]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Desktop Right Chevron Button */}
            <button
              onClick={() => paginate(1)}
              aria-label="Milestone Selanjutnya"
              className={`hidden lg:flex w-14 h-14 rounded-2xl border-3 ${
                isSunset
                  ? 'bg-[#221033] hover:bg-[#ff7b00] text-amber-200 hover:text-[#150720] border-orange-500/50 shadow-[4px_4px_0px_#ea580c] hover:shadow-[2px_2px_0px_#ea580c]'
                  : 'bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[4px_4px_0px_#0f172a] hover:shadow-[2px_2px_0px_#0f172a]'
              } hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none items-center justify-center transition-all cursor-pointer shrink-0 z-20 group`}
              title="Tekan Panah Kanan [→] untuk selanjutnya"
            >
              <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Previews & Mobile Navigation Cockpit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          {/* Previous item preview pill */}
          <button
            onClick={() => paginate(-1)}
            className={`w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-xs font-mono font-bold transition-all cursor-pointer text-left ${
              isSunset
                ? 'bg-[#221033]/90 hover:bg-[#ff7b00] border-orange-500/40 shadow-[2.5px_2.5px_0px_#ea580c] text-amber-100 hover:text-[#150720]'
                : 'bg-[#fffdf5]/90 hover:bg-[#fde047] border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] text-[#0f172a]'
            }`}
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <div className="truncate">
              <span className={`text-[10px] block ${isSunset ? 'text-amber-300/80' : 'text-[#64748b]'}`}>Sebelumnya:</span>
              <span className="truncate max-w-[200px] block">{prevItem.role}</span>
            </div>
          </button>

          {/* Center: Mobile Swipe & Nav Hints */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => paginate(-1)}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center cursor-pointer ${
                isSunset
                  ? 'bg-[#221033] border-orange-500/50 shadow-[2px_2px_0px_#ea580c] text-amber-200'
                  : 'bg-[#fffdf5] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] text-[#0f172a]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono font-black text-white px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20">
              {activeIndex + 1} / {experienceData.length}
            </div>
            <button
              onClick={() => paginate(1)}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center cursor-pointer ${
                isSunset
                  ? 'bg-[#221033] border-orange-500/50 shadow-[2px_2px_0px_#ea580c] text-amber-200'
                  : 'bg-[#fffdf5] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] text-[#0f172a]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Next item preview pill */}
          <button
            onClick={() => paginate(1)}
            className={`w-full sm:w-auto flex items-center justify-end gap-2 px-4 py-2.5 rounded-xl border-2 text-xs font-mono font-bold transition-all cursor-pointer text-right ${
              isSunset
                ? 'bg-[#221033]/90 hover:bg-[#ff7b00] border-orange-500/40 shadow-[2.5px_2.5px_0px_#ea580c] text-amber-100 hover:text-[#150720]'
                : 'bg-[#fffdf5]/90 hover:bg-[#fde047] border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] text-[#0f172a]'
            }`}
          >
            <div className="truncate">
              <span className={`text-[10px] block ${isSunset ? 'text-amber-300/80' : 'text-[#64748b]'}`}>Berikutnya:</span>
              <span className="truncate max-w-[200px] block">{nextItem.role}</span>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
