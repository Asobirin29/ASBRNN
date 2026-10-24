import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface SandyCheeksProps {
  className?: string;
}

export const SandyCheeks: React.FC<SandyCheeksProps> = ({ className = '' }) => {
  const { isSunset } = useTheme();
  const [showBubble, setShowBubble] = useState(false);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const daylightQuotes = [
    'Howdy partner! Punya ide proyek atau sistem yang mau kita bangun bareng?',
    'Texas-grade engineering! Siap bikin web & mobile app yang tangguh dan scalable!',
    'Jangan ragu buat kirim email! Aku selalu siap buat diskusi sains & teknologi!',
  ];

  const sunsetQuotes = [
    'Senja di Bikini Bottom tenang banget ya. Waktu yang pas buat brainstorm ide baru!',
    'Matahari terbenam, tapi semangat ngoding ga pernah padam! Yuk kolaborasi!',
    'Santai sejenak sambil ngobrolin tech stack impianmu bareng aku & tim!',
  ];

  const currentQuotes = isSunset ? sunsetQuotes : daylightQuotes;

  const handleClick = () => {
    setActiveQuoteIndex((prev) => (prev + 1) % currentQuotes.length);
    setShowBubble(true);
  };

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Interactive Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 sm:w-64 p-3 rounded-2xl border-2 sm:border-3 text-xs font-mono font-bold z-40 shadow-[4px_4px_0px_#0f172a] text-center ${
              isSunset
                ? 'bg-[#2a103d] text-amber-100 border-orange-500/50 shadow-[4px_4px_0px_#ea580c]'
                : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a]'
            }`}
          >
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-black/10">
              <span className={`text-[10px] uppercase font-black ${isSunset ? 'text-orange-400' : 'text-amber-600'}`}>
                Sandy Cheeks 🐿️
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                className="text-[10px] opacity-60 hover:opacity-100 px-1 font-sans"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] leading-relaxed">
              &quot;{currentQuotes[activeQuoteIndex]}&quot;
            </p>
            {/* Bubble arrow pointer */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 ${
                isSunset ? 'border-t-[#2a103d]' : 'border-t-[#fffdf5]'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sandy Cheeks Character with Karate/Cheering Bobbing */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{
          y: [0, -5, 0],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.8,
          ease: 'easeInOut',
        }}
        className="cursor-pointer group flex flex-col items-center"
        title="Klik Sandy Cheeks untuk bertegur sapa!"
      >
        <svg
          width="74"
          height="88"
          viewBox="0 0 74 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg filter transition-transform"
        >
          {/* Squirrel Bushy Tail in background */}
          <path
            d="M52 50 C66 42 72 26 64 16 C57 7 46 14 50 25 C53 32 46 44 42 48 Z"
            fill="#a16207"
            stroke="#0f172a"
            strokeWidth="2"
          />
          <path
            d="M56 44 C65 38 68 26 62 19 C58 14 51 18 53 26"
            stroke="#78350f"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Sandy White Diving Suit Body */}
          <ellipse cx="36" cy="62" rx="17" ry="19" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.5" />
          {/* Yellow diving suit patch / zipper */}
          <path d="M36 46 L36 68" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="56" r="3" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" />

          {/* Acorn Badge on chest */}
          <circle cx="43" cy="58" r="3.5" fill="#ca8a04" stroke="#0f172a" strokeWidth="1.5" />
          <rect x="41.5" y="53.5" width="3" height="2" rx="0.5" fill="#713f12" stroke="#0f172a" strokeWidth="1" />

          {/* Left Glove / Arm (Waving) */}
          <path
            d="M19 55 C12 50 10 40 14 34 C16 31 20 34 20 38"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#f8fafc"
          />
          <circle cx="14" cy="34" r="4.5" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />

          {/* Right Arm */}
          <path
            d="M53 55 C59 58 64 64 61 70"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="61" cy="70" r="4" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />

          {/* Diving Boots */}
          <ellipse cx="28" cy="81" rx="6.5" ry="4" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
          <ellipse cx="44" cy="81" rx="6.5" ry="4" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
          {/* Red stripe on boots */}
          <line x1="24" y1="79" x2="32" y2="79" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="79" x2="48" y2="79" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

          {/* Glass Diving Helmet (Translucent with light reflection) */}
          <circle
            cx="36"
            cy="30"
            r="23"
            fill="rgba(186, 230, 253, 0.45)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Glass helmet shine highlight */}
          <path
            d="M20 22 C22 15 28 11 36 10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Sandy Cheeks Head inside Helmet */}
          <circle cx="36" cy="31" r="14" fill="#d97706" stroke="#0f172a" strokeWidth="2" />
          {/* White cheeks */}
          <ellipse cx="30" cy="34" rx="4.5" ry="4" fill="#fef3c7" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="42" cy="34" rx="4.5" ry="4" fill="#fef3c7" stroke="#0f172a" strokeWidth="1.5" />

          {/* Sandy Big Front Buck Tooth */}
          <rect x="34" y="36" width="4" height="4" rx="0.5" fill="white" stroke="#0f172a" strokeWidth="1.2" />

          {/* Sandy Eyes */}
          <ellipse cx="32" cy="28" rx="3.5" ry="4.5" fill="white" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="40" cy="28" rx="3.5" ry="4.5" fill="white" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="33" cy="28" r="1.8" fill="#0f172a" />
          <circle cx="39" cy="28" r="1.8" fill="#0f172a" />
          {/* Eye shine */}
          <circle cx="32.5" cy="27" r="0.7" fill="white" />
          <circle cx="38.5" cy="27" r="0.7" fill="white" />
          {/* Eyelashes */}
          <path d="M30 23 L29 20" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 23 L32 19" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 23 L40 19" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M42 23 L43 20" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cute Nose & Smile */}
          <ellipse cx="36" cy="33" rx="1.8" ry="1.2" fill="#78350f" />
          <path d="M33 35 Q36 37 39 35" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Pink Flower on Top of Helmet */}
          <g transform="translate(18, 9)">
            {/* Flower petals */}
            <circle cx="4" cy="0" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx="0" cy="4" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx="-4" cy="0" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx="0" cy="-4" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
            {/* Flower center */}
            <circle cx="0" cy="0" r="2.5" fill="#fde047" stroke="#0f172a" strokeWidth="1" />
          </g>
        </svg>

        {/* Name tag pill */}
        <span
          className={`mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-black border transition-colors shadow-sm ${
            isSunset
              ? 'bg-[#3b1554] text-amber-300 border-orange-500/40'
              : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a]'
          }`}
        >
          Sandy Cheeks
        </span>
      </motion.div>
    </div>
  );
};
