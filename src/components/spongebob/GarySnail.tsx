import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface GarySnailProps {
  className?: string;
}

const GARY_QUIPS = [
  'Meow~ 🐌 (Gary bilang: kodingan portofolio ini mantap pol!)',
  'Meow meow... ❤️ (Gary suka melihat website yang responsif dan cepat)',
  'Meow~ 🍪 (Gary minta biskuit siput)',
  'Meowww! ✨ (Gary meninggalkan jejak lendir keberuntungan di portofolio ini)'
];

export const GarySnail: React.FC<GarySnailProps> = ({ className = '' }) => {
  const { isSunset } = useTheme();
  const [quip, setQuip] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  const handleClick = () => {
    const randomQuip = GARY_QUIPS[Math.floor(Math.random() * GARY_QUIPS.length)];
    setQuip(randomQuip);

    const newHeart = { id: Date.now(), x: (Math.random() - 0.5) * 20 };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    setTimeout(() => {
      setQuip(null);
    }, 3200);
  };

  return (
    <div className={`relative pointer-events-auto select-none ${className}`}>
      {/* Floating Heart / Meow */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 0, scale: 0.5, x: h.x }}
            animate={{ opacity: 1, y: -30, scale: 1.2, x: h.x }}
            exit={{ opacity: 0, y: -45 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-6 text-base font-bold text-pink-500 pointer-events-none drop-shadow z-50"
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Speech Bubble */}
      <AnimatePresence>
        {quip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-60 max-w-[80vw] p-2.5 rounded-xl border-2 font-mono text-xs font-bold shadow-lg z-50 pointer-events-none ${
              isSunset
                ? 'bg-[#251238] text-pink-200 border-pink-500/50 shadow-[3px_3px_0px_#ea580c]'
                : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
            }`}
          >
            <div className="text-[10px] uppercase font-black tracking-wider text-pink-500 mb-0.5">
              Gary The Snail 🐌
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

      {/* Gary Body */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="cursor-pointer group flex flex-col items-center"
        title="Gary si Siput peliharaan SpongeBob! Klik untuk mendengar Meow~ 🐌"
      >
        <svg
          width="75"
          height="60"
          viewBox="0 0 75 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Slime Trail behind shell */}
          <ellipse
            cx="32"
            cy="52"
            rx="30"
            ry="4"
            fill={isSunset ? 'rgba(192, 132, 252, 0.45)' : 'rgba(125, 211, 252, 0.55)'}
          />

          {/* Snail Foot (Body) */}
          <path
            d="M8 50 C8 44, 20 45, 36 46 C52 46, 68 47, 72 49 C74 52, 70 54, 60 54 C42 54, 18 54, 8 50 Z"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="1.8"
          />

          {/* Pink Shell with Purple Swirl & Red Spots */}
          <g id="gary-shell">
            {/* Shell Base */}
            <circle
              cx="30"
              cy="32"
              r="22"
              fill="#f472b6"
              stroke="#db2777"
              strokeWidth="2"
            />
            {/* Purple Spiral */}
            <path
              d="M30 32 C30 26, 36 24, 40 28 C45 33, 41 42, 33 44 C22 46, 17 34, 22 24 C28 12, 44 14, 48 24"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Red Spots around shell */}
            <circle cx="16" cy="30" r="3" fill="#ef4444" />
            <circle cx="25" cy="18" r="2.8" fill="#ef4444" />
            <circle cx="38" cy="17" r="3.2" fill="#ef4444" />
            <circle cx="46" cy="34" r="2.5" fill="#ef4444" />
            <circle cx="34" cy="48" r="2.8" fill="#ef4444" />
          </g>

          {/* Green Eyestalks with Red/Yellow Eyes */}
          <g id="gary-eyes">
            {/* Left Eyestalk */}
            <path d="M52 46 Q54 26 56 16" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="56" cy="14" rx="5" ry="6" fill="#fef08a" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="56" cy="14" r="2" fill="#dc2626" />
            <circle cx="56.5" cy="13" r="0.6" fill="#ffffff" />

            {/* Right Eyestalk */}
            <path d="M60 46 Q64 28 66 18" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="66" cy="16" rx="5" ry="6" fill="#fef08a" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="66" cy="16" r="2" fill="#dc2626" />
            <circle cx="66.5" cy="15" r="0.6" fill="#ffffff" />
          </g>
        </svg>

        <span
          className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full border shadow-xs ${
            isSunset
              ? 'bg-[#251238] text-pink-300 border-pink-500/40'
              : 'bg-[#fffdf5] text-pink-600 border-pink-400'
          }`}
        >
          Gary 🐌 Meow!
        </span>
      </motion.div>
    </div>
  );
};
