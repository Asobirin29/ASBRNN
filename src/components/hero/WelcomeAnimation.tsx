import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpongeBobSVG } from './SpongeBobSVG';
import { usePortfolioData } from '../../context/PortfolioDataContext';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const { profile } = usePortfolioData();
  const [phase, setPhase] = useState<'sweep' | 'submerged' | 'dive' | 'done'>('sweep');
  const [isBlinking, setIsBlinking] = useState(false);

  const name = profile?.name || 'AHMAD SOBIRIN';

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('submerged');
    }, 400);

    const t2 = setTimeout(() => {
      setPhase('dive');
    }, 3800);

    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4500);

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(blinkInterval);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'dive' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none bg-[#022c4a]"
      >
        {/* Deep Ocean & Wave Layers */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#024368] via-[#0284c7] to-[#0ea5e9]"
        >
          <div className="absolute -top-24 inset-x-0 h-24">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 60 C320 120, 640 0, 960 60 C1200 100, 1360 40, 1440 60 L1440 120 L0 120 Z"
                fill="#0ea5e9"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.05, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#0369a1] via-[#0ea5e9] to-[#38bdf8]"
        >
          <div className="absolute -top-28 inset-x-0 h-28">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40 L1440 120 L0 120 Z"
                fill="#38bdf8"
              />
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Floating Bikini Bottom Sky-Flowers in Intro */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 left-12"
          >
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
              <g fill="#f472b6" opacity="0.8">
                <circle cx="50" cy="22" r="16" />
                <circle cx="76" cy="42" r="16" />
                <circle cx="66" cy="72" r="16" />
                <circle cx="34" cy="72" r="16" />
                <circle cx="24" cy="42" r="16" />
                <circle cx="50" cy="50" r="14" fill="#fbcfe8" />
              </g>
            </svg>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-16 right-16"
          >
            <svg width="85" height="85" viewBox="0 0 100 100" fill="none">
              <g fill="#7dd3fc" opacity="0.8">
                <circle cx="50" cy="22" r="17" />
                <circle cx="76" cy="42" r="17" />
                <circle cx="66" cy="72" r="17" />
                <circle cx="34" cy="72" r="17" />
                <circle cx="24" cy="42" r="17" />
                <circle cx="50" cy="50" r="15" fill="#bae6fd" />
              </g>
            </svg>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-20 left-1/4"
          >
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
              <g fill="#fef08a" opacity="0.85">
                <circle cx="50" cy="20" r="15" />
                <circle cx="75" cy="40" r="15" />
                <circle cx="65" cy="70" r="15" />
                <circle cx="35" cy="70" r="15" />
                <circle cx="25" cy="40" r="15" />
                <circle cx="50" cy="48" r="13" fill="#ffffff" />
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Ambient Rising Sea Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: '105vh',
                x: `${(i * 5.2) % 100}vw`,
                opacity: 0.3,
                scale: 0.6 + (i % 4) * 0.25
              }}
              animate={{
                y: '-20vh',
                opacity: [0.2, 0.85, 0]
              }}
              transition={{
                duration: 1.8 + (i % 4) * 0.4,
                delay: 0.2 + (i * 0.08),
                ease: 'easeOut',
                repeat: Infinity
              }}
              className="absolute w-5 h-5 rounded-full bg-white/40 border border-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)] backdrop-blur-xs"
            />
          ))}
        </div>

        {/* Central Content: SpongeBob & Portfolio Title */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={{
              opacity: phase === 'dive' ? 0 : 1,
              scale: phase === 'dive' ? 1.12 : 1,
              y: phase === 'dive' ? -30 : 0
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center max-w-xl"
          >
            {/* SpongeBob inside a Shimmering Soap Bubble */}
            <div className="relative mb-4">
              {/* Shimmering Bubble halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400/30 via-white/40 to-pink-300/30 blur-md animate-pulse" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-sky-200/20 border-2 border-white/80 shadow-[0_0_24px_rgba(56,189,248,0.5)] flex items-center justify-center backdrop-blur-xs overflow-visible">
                {/* Bubble highlight arc */}
                <div className="absolute top-3 left-4 w-10 h-5 rounded-full bg-white/60 -rotate-45" />

                {/* Animated SpongeBob Character */}
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="scale-90 sm:scale-105 -translate-y-2"
                >
                  <SpongeBobSVG
                    pose="ready"
                    isBlinking={isBlinking}
                    hasFloatie={false}
                    hasNet={true}
                    width={110}
                    height={130}
                  />
                </motion.div>
              </div>

              {/* SpongeBob Speech Quip badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 18 }}
                className="absolute -bottom-2 -right-4 sm:-right-8 bg-amber-400 text-amber-950 font-black text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-lg border-2 border-amber-600 whitespace-nowrap"
              >
                I&apos;M READY! 🧽✨
              </motion.div>
            </div>

            {/* Title / Name */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] text-center px-4">
              {name}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest text-amber-200 uppercase drop-shadow-md">
              Full-Stack Developer • Diving into Bikini Bottom
            </p>

            {/* Progress / Loading Bar */}
            <div className="mt-5 w-48 sm:w-56 h-1.5 rounded-full bg-white/20 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase === 'submerged' || phase === 'dive' ? '100%' : '0%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-white rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Skip button */}
        <button
          type="button"
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/25 border border-white/30 text-xs text-white font-semibold transition-all backdrop-blur-md cursor-pointer shadow-md hover:scale-105 active:scale-95"
        >
          Lewati ⚡
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
