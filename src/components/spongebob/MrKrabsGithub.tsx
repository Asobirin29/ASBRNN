import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface MrKrabsGithubProps {
  className?: string;
  totalCommits?: number;
}

const KRABS_DAY_QUIPS = [
  'Argh-argh-argh! 100+ commit di GitHub?! Itu tanda kerja keras yang menghasilkan cuan!',
  'Setiap baris kode yang efisien menghemat waktu dan uang, anak muda! 🦀💰',
  'Jangan biarkan Plankton mendekati repositori privat berharga ini!',
  'Uang, uang, uang! Eh maksudku... commit, commit, konsistensi! Kerja bagus, Sobirin!',
  'Waktu adalah uang! Dan commit konsisten di GitHub adalah investasi masa depan!'
];

const KRABS_SUNSET_QUIPS = [
  'Toko Krusty Krab tutup saat senja! Saatnya menghitung total keuntungan commit hari ini! Argh-argh-argh! 🌅',
  'Senja begini paling nikmat mencium aroma lembaran uang baru dan rekor pull request!',
  'Matahari boleh tenggelam, tapi pundi-pundi ilmu dan commit jangan sampai padam!',
  'Lautan senja ini indah... tapi lebih indah lagi kalau melihat neraca saldo proyek surplus!'
];

export const MrKrabsGithub: React.FC<MrKrabsGithubProps> = ({ className = '', totalCommits: _totalCommits = 112 }) => {
  const { isSunset } = useTheme();
  const [quip, setQuip] = useState<string | null>(null);
  const [isClawing, setIsClawing] = useState(false);
  const [coins, setCoins] = useState<{ id: number; x: number; symbol: string }[]>([]);

  const handleClick = () => {
    setIsClawing(true);
    const quipList = isSunset ? KRABS_SUNSET_QUIPS : KRABS_DAY_QUIPS;
    const randomQuip = quipList[Math.floor(Math.random() * quipList.length)];
    setQuip(randomQuip);

    // spawn gold coins
    const symbols = ['💰', '🪙', '💵', '💲'];
    const newCoins = [0, 1, 2, 3].map((i) => ({
      id: Date.now() + i,
      x: (i - 1.5) * 22,
      symbol: symbols[i % symbols.length]
    }));
    setCoins(newCoins);

    setTimeout(() => {
      setIsClawing(false);
    }, 900);

    setTimeout(() => {
      setQuip(null);
      setCoins([]);
    }, 4200);
  };

  return (
    <div className={`relative pointer-events-auto select-none ${className}`}>
      {/* Floating Gold Coins when clicked */}
      <AnimatePresence>
        {coins.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 0, scale: 0.6, x: c.x }}
            animate={{ opacity: 1, y: -50, scale: 1.3, x: c.x * 1.4 }}
            exit={{ opacity: 0, y: -75, scale: 0.8 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-2 left-8 text-xl font-black pointer-events-none drop-shadow-md z-50"
          >
            {c.symbol}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Speech Bubble */}
      <AnimatePresence>
        {quip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`absolute bottom-full right-0 sm:left-1/2 sm:-translate-x-1/2 mb-2 w-72 max-w-[85vw] p-3 rounded-2xl border-2 font-mono text-xs font-bold shadow-xl z-50 pointer-events-none ${
              isSunset
                ? 'bg-[#291136] text-amber-200 border-amber-500/50 shadow-[4px_4px_0px_#ea580c]'
                : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] shadow-[4px_4px_0px_#0f172a]'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-wider text-amber-500 mb-0.5">
              <span>Tuan Krab (Mr. Krabs) 🦀</span>
              <span className="text-[9px] text-emerald-500 font-bold">100% Cuan</span>
            </div>
            <p className="leading-snug">{quip}</p>
            {/* Arrow */}
            <div
              className={`absolute top-full right-8 sm:left-1/2 sm:-translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 ${
                isSunset ? 'border-t-[#291136]' : 'border-t-[#fffdf5]'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mr. Krabs Body */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isClawing
            ? { rotate: [-6, 6, -5, 5, 0], y: [-3, 0, -3, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 0.4 }
        }}
        className="cursor-pointer group relative flex flex-col items-center"
        title="Tuan Krab! Klik untuk mendengar resep cuan & semangat commit! 🦀💰"
      >
        <svg
          width="110"
          height="135"
          viewBox="0 0 110 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Shadow */}
          <ellipse
            cx="55"
            cy="126"
            rx="40"
            ry="7"
            fill={isSunset ? 'rgba(25, 10, 38, 0.6)' : 'rgba(15, 23, 42, 0.22)'}
          />

          {/* Mr. Krabs Legs (tiny pointy crab legs) */}
          <g id="krabs-legs">
            <line x1="44" y1="112" x2="40" y2="124" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            <line x1="66" y1="112" x2="70" y2="124" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            <polygon points="36,124 42,124 39,127" fill="#0f172a" />
            <polygon points="68,124 74,124 71,127" fill="#0f172a" />
          </g>

          {/* Blue Collared Shirt & Purple Trousers */}
          <g id="krabs-clothes">
            {/* Purple Pants */}
            <path
              d="M36 94 L38 114 L72 114 L74 94 Z"
              fill="#7e22ce"
              stroke="#581c87"
              strokeWidth="2"
            />
            {/* Black Belt & Gold Buckle */}
            <rect x="36" y="93" width="38" height="5" fill="#0f172a" />
            <rect x="51" y="92" width="8" height="7" rx="1" fill="#facc15" stroke="#a16207" strokeWidth="1" />

            {/* Light Blue Shirt */}
            <path
              d="M32 64 C32 58, 78 58, 78 64 L76 94 L34 94 Z"
              fill="#38bdf8"
              stroke="#0284c7"
              strokeWidth="2"
            />
            {/* White Collar */}
            <polygon points="48,64 55,72 42,68" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
            <polygon points="62,64 55,72 68,68" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
          </g>

          {/* Mr. Krabs Eyestalks & Red Body */}
          <g id="krabs-body">
            {/* Eyestalks (tall cylindrical stalks) */}
            {/* Left Stalk */}
            <path d="M47 52 L47 24" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="47" cy="22" rx="6" ry="8" fill="#ffffff" stroke="#991b1b" strokeWidth="1.8" />
            <circle cx="48" cy="22" r="2.2" fill="#0f172a" />
            <circle cx="49" cy="21" r="0.8" fill="#ffffff" />
            {/* Left Eyelashes (3 pointy spikes) */}
            <line x1="43" y1="16" x2="41" y2="12" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="47" y1="14" x2="47" y2="10" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="51" y1="16" x2="53" y2="12" stroke="#0f172a" strokeWidth="1.2" />

            {/* Right Stalk */}
            <path d="M63 52 L63 24" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="63" cy="22" rx="6" ry="8" fill="#ffffff" stroke="#991b1b" strokeWidth="1.8" />
            <circle cx="62" cy="22" r="2.2" fill="#0f172a" />
            <circle cx="63" cy="21" r="0.8" fill="#ffffff" />
            {/* Right Eyelashes */}
            <line x1="59" y1="16" x2="57" y2="12" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="63" y1="14" x2="63" y2="10" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="67" y1="16" x2="69" y2="12" stroke="#0f172a" strokeWidth="1.2" />

            {/* Pointy Nose (Crab horn) */}
            <polygon points="53,46 57,46 55,38" fill="#dc2626" stroke="#991b1b" strokeWidth="1.2" />

            {/* Laughing Crab Mouth (Tooth grin) */}
            <path
              d="M40 54 Q55 64 70 54"
              stroke="#991b1b"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="#7f1d1d"
            />
            {/* Teeth */}
            <path d="M46 56 L46 60 L50 60 L50 56" fill="#ffffff" stroke="#991b1b" strokeWidth="0.8" />
            <path d="M52 57 L52 61 L56 61 L56 57" fill="#ffffff" stroke="#991b1b" strokeWidth="0.8" />
            <path d="M58 56 L58 60 L62 60 L62 56" fill="#ffffff" stroke="#991b1b" strokeWidth="0.8" />
          </g>

          {/* Large Claws */}
          <g id="krabs-claws">
            {/* Left Big Claw (Snapping) */}
            <motion.g
              animate={isClawing ? { rotate: [-10, 10, -8, 8, 0] } : { rotate: [0, 4, 0] }}
              transition={{ duration: 0.3 }}
              style={{ originX: '28px', originY: '74px' }}
            >
              <path d="M34 76 Q20 74 18 64" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Upper Claw */}
              <path
                d="M16 64 C12 50, 4 56, 12 70 C16 76, 22 72, 16 64 Z"
                fill="#ef4444"
                stroke="#991b1b"
                strokeWidth="2"
              />
              {/* Lower Claw */}
              <path
                d="M16 68 C10 76, 18 84, 24 76 Z"
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="1.5"
              />
            </motion.g>

            {/* Right Claw holding Money Bag with $ */}
            <g id="right-arm">
              <path d="M74 76 Q88 74 92 68" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Money Bag */}
              <path
                d="M84 76 C80 66, 100 66, 96 76 C102 84, 104 98, 90 98 C76 98, 78 84, 84 76 Z"
                fill="#15803d"
                stroke="#14532d"
                strokeWidth="2"
              />
              <circle cx="90" cy="86" r="6" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
              <text x="87.5" y="90" fill="#0f172a" fontSize="10" fontWeight="900" fontFamily="monospace">$</text>
              {/* Tie rope */}
              <line x1="84" y1="75" x2="96" y2="75" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </svg>

        {/* Interactive Badge */}
        <div
          className={`mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border tracking-wider transition-all shadow-sm ${
            isSunset
              ? 'bg-[#291136] text-amber-300 border-amber-500/50 group-hover:border-amber-300'
              : 'bg-[#fffdf5] text-amber-600 border-amber-400 group-hover:bg-amber-100'
          }`}
        >
          <span>Tuan Krab 🦀 Cek Cuan Commit!</span>
        </div>
      </motion.div>
    </div>
  );
};
