import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface PlanktonSecretProps {
  className?: string;
}

const PLANKTON_QUIPS = [
  'Rencana jahatku berhasil! Tunggu... kodenya dilindungi enkripsi JWT dan clean architecture?!',
  'Aku akan mencuri resep rahasia Krabby Patty... dan seluruh tech stack Mas Sobirin! 🧪',
  'Karen! Siapkan algoritma baru untuk merekayasa balik sistem web ini!',
  'Hahahaha! 1% kejahatan, 99% gas panas... tapi kode di sini 100% solid!'
];

export const PlanktonSecret: React.FC<PlanktonSecretProps> = ({ className = '' }) => {
  const { isSunset } = useTheme();
  const [quip, setQuip] = useState<string | null>(null);
  const [isScheming, setIsScheming] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScheming(true);
    const randomQuip = PLANKTON_QUIPS[Math.floor(Math.random() * PLANKTON_QUIPS.length)];
    setQuip(randomQuip);

    setTimeout(() => {
      setIsScheming(false);
    }, 800);

    setTimeout(() => {
      setQuip(null);
    }, 3800);
  };

  return (
    <div className={`relative pointer-events-auto select-none ${className}`}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {quip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-64 max-w-[80vw] p-2.5 rounded-xl border-2 font-mono text-xs font-bold shadow-lg z-50 pointer-events-none ${
              isSunset
                ? 'bg-[#251238] text-emerald-200 border-emerald-500/50 shadow-[3px_3px_0px_#ea580c]'
                : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
            }`}
          >
            <div className="text-[10px] uppercase font-black tracking-wider text-emerald-500 mb-0.5">
              Sheldon J. Plankton 🧪
            </div>
            <p className="leading-tight text-[11px]">{quip}</p>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 ${
                isSunset ? 'border-t-[#251238]' : 'border-t-[#fffdf5]'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plankton Body */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        animate={isScheming ? { rotate: [-10, 10, -8, 8, 0], y: [-3, 0, -3, 0] } : { y: [0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="cursor-pointer group flex flex-col items-center"
        title="Plankton! Klik untuk melihat rencana jahatnya mencuri formula 🧪"
      >
        <svg
          width="48"
          height="62"
          viewBox="0 0 48 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Shadow */}
          <ellipse cx="24" cy="58" rx="14" ry="3" fill="rgba(0,0,0,0.25)" />

          {/* Antennas */}
          {/* Left Antenna */}
          <path d="M21 22 Q14 10 12 4" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="8" x2="15" y2="7" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="12" x2="17" y2="11" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Antenna */}
          <path d="M27 22 Q34 10 36 4" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <line x1="33" y1="7" x2="38" y2="8" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="31" y1="11" x2="36" y2="12" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />

          {/* Tiny Arms & Legs */}
          {/* Legs */}
          <line x1="20" y1="52" x2="18" y2="58" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="52" x2="30" y2="58" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          {/* Arms holding secret test tube / bottle */}
          <line x1="14" y1="36" x2="8" y2="42" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="36" x2="38" y2="40" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />

          {/* Secret Formula Bottle in hand */}
          <rect x="5" y="38" width="5" height="9" rx="1" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          <rect x="6.5" y="36" width="2" height="2" fill="#78350f" />

          {/* Main Oval Body */}
          <ellipse
            cx="24"
            cy="36"
            rx="11"
            ry="18"
            fill="#16a34a"
            stroke="#14532d"
            strokeWidth="2"
          />

          {/* Single Big Red Eye */}
          <ellipse cx="24" cy="30" rx="6.5" ry="7.5" fill="#fef08a" stroke="#14532d" strokeWidth="1.2" />
          <circle cx="24" cy="30" r="2.8" fill="#dc2626" />
          <circle cx="25" cy="28.5" r="0.8" fill="#ffffff" />
          {/* Evil unibrow */}
          <path d="M17 22 Q24 25 31 22" stroke="#14532d" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Wicked Grin */}
          <path d="M19 43 Q24 47 29 43" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>

        <span
          className={`text-[8px] font-mono font-black px-1.5 py-0.2 rounded-full border shadow-xs ${
            isSunset
              ? 'bg-[#251238] text-emerald-300 border-emerald-500/40'
              : 'bg-[#fffdf5] text-emerald-700 border-emerald-500'
          }`}
        >
          Plankton 🧪
        </span>
      </motion.div>
    </div>
  );
};
