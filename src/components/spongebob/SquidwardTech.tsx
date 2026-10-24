import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface SquidwardTechProps {
  className?: string;
}

const SQUIDWARD_DAY_QUIPS = [
  'Baguslah, setidaknya kode TypeScript Mas Sobirin lebih rapi daripada permainan klarinetku.',
  'Tolong jangan bikin aku lembur deploy server di hari Minggu...',
  'Kenapa semua orang membicarakan React dan Flutter? Aku cuma mau istirahat dengan tenang!',
  'Arsitektur bersih, clean code... ya ya ya, tapi bisakah kalian koding tanpa bikin suara bising?',
  'Jika aku harus memilih antara mendengar SpongeBob tertawa atau membaca kode bug, aku pilih tidur.',
  'Satu-satunya seni sejati di sini selain klarinetku adalah struktur database yang ternormalisasi.'
];

const SQUIDWARD_SUNSET_QUIPS = [
  'Akhirnya... matahari terbenam. Jam kerja kasir Krusty Krab selesai! Jangan cari aku.',
  'Senja begini enaknya main klarinet solo di teras rumah tanpa gangguan SpongeBob.',
  'Warna senja yang dramatis... cocok untuk suasana hati seniman sejati sepertiku.',
  'Server sudah stabil sebelum malam tiba? Luar biasa, setidaknya aku tidak dihubungi on-call.'
];

export const SquidwardTech: React.FC<SquidwardTechProps> = ({ className = '' }) => {
  const { isSunset } = useTheme();
  const [quip, setQuip] = useState<string | null>(null);
  const [isPlayingClarinet, setIsPlayingClarinet] = useState(false);
  const [musicNotes, setMusicNotes] = useState<{ id: number; symbol: string; x: number }[]>([]);

  const handleClick = () => {
    setIsPlayingClarinet(true);
    const quipList = isSunset ? SQUIDWARD_SUNSET_QUIPS : SQUIDWARD_DAY_QUIPS;
    const randomQuip = quipList[Math.floor(Math.random() * quipList.length)];
    setQuip(randomQuip);

    // spawn playful music notes
    const symbols = ['♪', '♫', '♬', '♩'];
    const newNotes = [0, 1, 2].map((i) => ({
      id: Date.now() + i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: (i - 1) * 18
    }));
    setMusicNotes(newNotes);

    setTimeout(() => {
      setIsPlayingClarinet(false);
    }, 1200);

    setTimeout(() => {
      setQuip(null);
      setMusicNotes([]);
    }, 4000);
  };

  return (
    <div className={`relative pointer-events-auto select-none ${className}`}>
      {/* Musical notes popping out when playing clarinet */}
      <AnimatePresence>
        {musicNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 0, scale: 0.5, x: note.x }}
            animate={{ opacity: 1, y: -45, scale: 1.2, x: note.x * 1.5 }}
            exit={{ opacity: 0, y: -70, scale: 0.8 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute top-4 left-6 text-xl font-bold text-teal-400 pointer-events-none drop-shadow-md z-50"
          >
            {note.symbol}
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
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-[85vw] p-3 rounded-2xl border-2 font-mono text-xs font-bold shadow-xl z-50 pointer-events-none ${
              isSunset
                ? 'bg-[#241335] text-teal-200 border-teal-500/50 shadow-[4px_4px_0px_#ea580c]'
                : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] shadow-[4px_4px_0px_#0f172a]'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-wider text-teal-600 mb-0.5">
              <span>Squidward Tentacles 🎷</span>
              <span className="text-[9px] opacity-75">Senior Clarinetist</span>
            </div>
            <p className="leading-snug">{quip}</p>
            {/* Arrow */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 ${
                isSunset ? 'border-t-[#241335]' : 'border-t-[#fffdf5]'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Squidward Body */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isPlayingClarinet
            ? { rotate: [-4, 4, -3, 3, 0], y: [-2, -6, -2] }
            : { y: [0, -3, 0] }
        }
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 0.4 }
        }}
        className="cursor-pointer group relative flex flex-col items-center"
        title="Squidward Tentacles! Klik untuk mendengar komentar & solo klarinetnya 🎷"
      >
        <svg
          width="105"
          height="145"
          viewBox="0 0 105 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Ground shadow */}
          <ellipse
            cx="52"
            cy="138"
            rx="36"
            ry="6"
            fill={isSunset ? 'rgba(25, 10, 38, 0.6)' : 'rgba(15, 23, 42, 0.2)'}
          />

          {/* Squidward Tentacles (Legs) */}
          <g id="squidward-legs">
            {/* Back suction legs */}
            <path d="M38 108 Q34 122 30 134 Q34 136 38 133 Q40 122 43 108" fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
            <path d="M66 108 Q70 122 74 134 Q70 136 66 133 Q64 122 61 108" fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />

            {/* Front legs */}
            <path d="M46 108 Q44 122 42 136 Q47 137 49 134 Q50 122 49 108" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1.8" />
            <path d="M57 108 Q59 122 61 136 Q56 137 54 134 Q53 122 54 108" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1.8" />

            {/* Suction cups */}
            <circle cx="34" cy="132" r="2" fill="#99f6e4" />
            <circle cx="70" cy="132" r="2" fill="#99f6e4" />
            <circle cx="45" cy="134" r="2" fill="#99f6e4" />
            <circle cx="58" cy="134" r="2" fill="#99f6e4" />
          </g>

          {/* Brown Polo Shirt */}
          <g id="squidward-shirt">
            <path
              d="M36 82 L32 108 L72 108 L68 82 Z"
              fill="#b45309"
              stroke="#78350f"
              strokeWidth="2"
            />
            {/* Shirt Collar */}
            <polygon points="46,82 52,90 42,86" fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
            <polygon points="58,82 52,90 62,86" fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
          </g>

          {/* Squidward Head & Face */}
          <g id="squidward-head">
            {/* Large Bulbous Head */}
            <path
              d="M32 46 C28 28, 36 12, 52 12 C68 12, 76 28, 72 46 C70 56, 62 62, 58 68 L58 82 L46 82 L46 68 C42 62, 34 56, 32 46 Z"
              fill="#2dd4bf"
              stroke="#0f766e"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Forehead wrinkles */}
            <path d="M46 20 Q52 18 58 20" stroke="#0f766e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M44 24 Q52 22 60 24" stroke="#0f766e" strokeWidth="1.2" strokeLinecap="round" />

            {/* Eyes (Bored, Half-Closed Yellow Eyes with Red Pupils) */}
            {/* Left Eye */}
            <g id="left-eye">
              <ellipse cx="44" cy="42" rx="7" ry="9" fill="#fef08a" stroke="#0f766e" strokeWidth="1.5" />
              {/* Pupil (horizontal red oval) */}
              <ellipse cx="45" cy="43" rx="2" ry="4" fill="#dc2626" />
              {/* Heavy Eyelid */}
              <path
                d="M37 40 Q44 43 51 40 L51 34 Q44 33 37 34 Z"
                fill="#2dd4bf"
                stroke="#0f766e"
                strokeWidth="1.5"
              />
            </g>

            {/* Right Eye */}
            <g id="right-eye">
              <ellipse cx="60" cy="42" rx="7" ry="9" fill="#fef08a" stroke="#0f766e" strokeWidth="1.5" />
              {/* Pupil */}
              <ellipse cx="59" cy="43" rx="2" ry="4" fill="#dc2626" />
              {/* Heavy Eyelid */}
              <path
                d="M53 40 Q60 43 67 40 L67 34 Q60 33 53 34 Z"
                fill="#2dd4bf"
                stroke="#0f766e"
                strokeWidth="1.5"
              />
            </g>

            {/* Iconic Droopy Nose */}
            <path
              d="M48 44 C48 38, 56 38, 56 44 C56 52, 60 62, 52 64 C44 62, 48 52, 48 44 Z"
              fill="#2dd4bf"
              stroke="#0f766e"
              strokeWidth="2"
            />

            {/* Frown Mouth */}
            <path
              d="M42 70 Q52 66 62 70"
              stroke="#0f766e"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Small corner mouth downturns */}
            <line x1="42" y1="70" x2="40" y2="73" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="62" y1="70" x2="64" y2="73" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Arms holding Clarinet */}
          <g id="squidward-clarinet">
            {/* Clarinet (Black Instrument with Silver Keys and Bell) */}
            <line x1="52" y1="68" x2="78" y2="104" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            {/* Clarinet Bell (flare) */}
            <polygon points="76,101 84,106 81,110 74,105" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            {/* Silver keys */}
            <circle cx="58" cy="77" r="1.5" fill="#e2e8f0" />
            <circle cx="64" cy="85" r="1.5" fill="#e2e8f0" />
            <circle cx="70" cy="93" r="1.5" fill="#e2e8f0" />

            {/* Left Arm holding mouthpiece */}
            <path d="M34 86 Q44 80 50 72" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Right Arm holding body */}
            <path d="M68 86 Q66 94 65 88" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        </svg>

        {/* Interactive Badge */}
        <div
          className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-black border tracking-wider transition-all shadow-sm ${
            isSunset
              ? 'bg-[#241335] text-teal-300 border-teal-500/40 group-hover:border-teal-300'
              : 'bg-[#fffdf5] text-teal-700 border-teal-500 group-hover:bg-teal-50'
          }`}
        >
          <span>Squidward 🎷 Mainkan Klarinet!</span>
        </div>
      </motion.div>
    </div>
  );
};
