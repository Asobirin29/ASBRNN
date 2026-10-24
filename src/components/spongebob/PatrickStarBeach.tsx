import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface PatrickStarBeachProps {
  className?: string;
}

const PATRICK_DAY_QUIPS = [
  'Hidup itu pilihan, kawan! Mau santai atau mau koding sambil santai ~ ⭐',
  'Pengetahuan tidak bisa menggantikan persahabatan... tapi portofolionya Mas Sobirin keren banget!',
  'Apakah ini tombol yang bisa diklik? Ternyata benar! Hehehe ~',
  'SpongeBob! Liat nih, Mas Sobirin jago bikin web full-stack dan mobile Flutter!',
  'Kadang pikiran di dalam kepalaku seperti susu yang tumpah... tapi kodingan di sini rapi pol!'
];

const PATRICK_SUNSET_QUIPS = [
  'Wahhh... langit senja warnanya kayak sirup stroberi campur jeruk! 🌅',
  'Senja gini enaknya makan Krabby Patty 5 porsi sambil rebahan di pasir ~',
  'SpongeBob, lihat matahari terbenamnya... estetik banget kayak desain UI Mas Sobirin!',
  'Bintang laut juga butuh istirahat setelah seharian jadi inspirasi developer hebat ~'
];

export const PatrickStarBeach: React.FC<PatrickStarBeachProps> = ({ className = '' }) => {
  const { isSunset } = useTheme();
  const [quip, setQuip] = useState<string | null>(null);
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 800);

    const quipList = isSunset ? PATRICK_SUNSET_QUIPS : PATRICK_DAY_QUIPS;
    const randomQuip = quipList[Math.floor(Math.random() * quipList.length)];
    setQuip(randomQuip);

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
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 max-w-[80vw] p-3 rounded-2xl border-2 font-mono text-xs font-bold shadow-xl z-50 pointer-events-none ${
              isSunset
                ? 'bg-[#2a133d] text-amber-200 border-amber-400/60 shadow-[3px_3px_0px_#ea580c]'
                : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] shadow-[4px_4px_0px_#0f172a]'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider text-pink-500 mb-0.5">
              <span>Patrick Star ⭐</span>
            </div>
            <p className="leading-snug">{quip}</p>
            {/* Arrow */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 ${
                isSunset ? 'border-t-[#2a133d]' : 'border-t-[#fffdf5]'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Patrick Body */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isWiggling
            ? { rotate: [-8, 8, -6, 6, 0], y: [-4, 0, -3, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 0.5 }
        }}
        className="cursor-pointer group relative flex flex-col items-center"
        title="Patrick Star! Klik untuk mendengar celotehnya ⭐"
      >
        <svg
          width="110"
          height="125"
          viewBox="0 0 110 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Beach towel shadow / sand depression */}
          <ellipse
            cx="55"
            cy="114"
            rx="46"
            ry="9"
            fill={isSunset ? 'rgba(30, 10, 45, 0.6)' : 'rgba(196, 173, 130, 0.6)'}
          />

          {/* Patrick Body (Iconic Cone Starfish) */}
          <g id="patrick-body">
            {/* Main Coral-Pink Star Body */}
            <path
              d="M55 12 C52 12, 48 24, 46 36 C42 42, 30 46, 18 52 C12 55, 14 65, 22 66 C32 67, 40 68, 42 74 C41 84, 38 98, 38 106 C38 112, 48 112, 52 107 C54 105, 55 98, 55 98 C55 98, 56 105, 58 107 C62 112, 72 112, 72 106 C72 98, 69 84, 68 74 C70 68, 78 67, 88 66 C96 65, 98 55, 92 52 C80 46, 68 42, 64 36 C62 24, 58 12, 55 12 Z"
              fill={isSunset ? '#fb7185' : '#fda4af'}
              stroke="#e11d48"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Belly highlight / subtle roundness */}
            <ellipse
              cx="55"
              cy="68"
              rx="18"
              ry="16"
              fill={isSunset ? '#f43f5e' : '#fecdd3'}
              opacity="0.35"
            />

            {/* Navel (Cute Belly Button) */}
            <path
              d="M53 74 Q55 77 57 74"
              stroke="#be123c"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Eyes */}
            <g id="patrick-eyes">
              {/* Left Eye */}
              <ellipse cx="50" cy="30" rx="4.5" ry="6.5" fill="#ffffff" stroke="#9f1239" strokeWidth="1.5" />
              <circle cx="51" cy="30" r="2" fill="#0f172a" />
              <circle cx="51.8" cy="28.8" r="0.7" fill="#ffffff" />

              {/* Right Eye */}
              <ellipse cx="60" cy="30" rx="4.5" ry="6.5" fill="#ffffff" stroke="#9f1239" strokeWidth="1.5" />
              <circle cx="59" cy="30" r="2" fill="#0f172a" />
              <circle cx="59.8" cy="28.8" r="0.7" fill="#ffffff" />

              {/* Cute Eyebrows (Z-shaped lines) */}
              <path d="M47 21 L51 22 L49 23" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M63 21 L59 22 L61 23" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Patrick Smile with single tongue */}
            <g id="patrick-mouth">
              <path
                d="M47 39 Q55 48 63 39"
                fill="#881337"
                stroke="#881337"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M51 43 Q55 46 59 43 Q55 41 51 43 Z"
                fill="#fb7185"
              />
            </g>

            {/* Patrick Green Hawaiian Swim Shorts */}
            <g id="patrick-shorts">
              {/* Green Pants Base */}
              <path
                d="M39 82 C44 80, 66 80, 71 82 C74 91, 72 101, 71 104 C66 105, 59 104, 55 96 C51 104, 44 105, 39 104 C38 101, 36 91, 39 82 Z"
                fill="#84cc16"
                stroke="#4d7c0f"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              {/* Purple Hawaiian Flower Patterns on Shorts */}
              {/* Flower 1 */}
              <path
                d="M44 88 C43 85, 47 85, 48 88 C49 85, 53 85, 52 88 C55 89, 53 93, 50 92 C51 95, 47 95, 46 92 C43 93, 42 89, 44 88 Z"
                fill="#a855f7"
              />
              {/* Flower 2 */}
              <path
                d="M60 89 C59 86, 63 86, 64 89 C65 86, 69 86, 68 89 C71 90, 69 94, 66 93 C67 96, 63 96, 62 93 C59 94, 58 90, 60 89 Z"
                fill="#a855f7"
              />
              {/* Partial Flower 3 */}
              <circle cx="43" cy="99" r="2.5" fill="#a855f7" />
              <circle cx="67" cy="99" r="2.5" fill="#a855f7" />
            </g>

            {/* Sunglasses sitting on head or eyes */}
            <g id="sunglasses" opacity="0.95">
              <path
                d="M43 27 Q50 25 57 27"
                stroke="#0f172a"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Left Lens */}
              <path
                d="M44 26 L52 26 L51 34 Q47 36 44 33 Z"
                fill="#0284c7"
                stroke="#0f172a"
                strokeWidth="1.8"
              />
              {/* Right Lens */}
              <path
                d="M58 26 L66 26 L65 33 Q62 36 58 34 Z"
                fill="#0284c7"
                stroke="#0f172a"
                strokeWidth="1.8"
              />
              {/* Glare line */}
              <line x1="46" y1="28" x2="49" y2="33" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
              <line x1="60" y1="28" x2="63" y2="33" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
            </g>

            {/* Coconut drink with striped straw next to Patrick */}
            <g id="coconut-drink">
              {/* Coconut shell */}
              <ellipse cx="88" cy="100" rx="9" ry="8" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
              <ellipse cx="88" cy="96" rx="7" ry="3" fill="#ffffff" />
              {/* Pink cocktail umbrella */}
              <path d="M82 92 C82 86, 94 86, 94 92 Z" fill="#ec4899" stroke="#9d174d" strokeWidth="1" />
              {/* Striped straw */}
              <line x1="88" y1="96" x2="94" y2="82" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="90" y1="92" x2="92" y2="88" stroke="#ffffff" strokeWidth="1" />
            </g>
          </g>
        </svg>

        {/* Interactive Click Badge */}
        <div
          className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-black border tracking-wider transition-all shadow-sm ${
            isSunset
              ? 'bg-[#2a133d] text-pink-300 border-pink-500/40 group-hover:border-pink-300'
              : 'bg-[#fffdf5] text-pink-600 border-pink-400 group-hover:bg-pink-100'
          }`}
        >
          <span>Patrick ⭐ Klik Aku!</span>
        </div>
      </motion.div>
    </div>
  );
};
