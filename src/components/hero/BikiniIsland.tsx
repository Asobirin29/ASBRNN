import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface BikiniIslandProps {
  onIslandClick?: (x: number, y: number) => void;
}

export const BikiniIsland: React.FC<BikiniIslandProps> = ({ onIslandClick }) => {
  const { isSunset } = useTheme();
  const [quip, setQuip] = useState<string | null>(null);
  const [bounceCount, setBounceCount] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    setBounceCount((prev) => prev + 1);
    const quips = [
      'Bikini Atoll ~ 🏝️',
      'Di bawah pulau ini ada Bikini Bottom!',
      'Kelapanya manis dan segar!',
      'Tempat favorit SpongeBob memandang laut ~'
    ];
    setQuip(quips[Math.floor(Math.random() * quips.length)]);
    setTimeout(() => setQuip(null), 3000);

    if (onIslandClick) {
      onIslandClick(e.clientX, e.clientY);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-5">
      {/* SpongeBob Sky Flowers */}
      <div className="absolute inset-x-0 top-0 h-48 overflow-hidden pointer-events-none">
        {/* Flower 1 - Pink */}
        <motion.div
          animate={{ x: ['-10vw', '110vw'] }}
          transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
          className="absolute top-6 left-0 opacity-40 sm:opacity-55"
        >
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
            <g fill={isSunset ? '#f472b6' : '#f9a8d4'} opacity="0.85">
              <circle cx="50" cy="20" r="16" />
              <circle cx="78" cy="40" r="16" />
              <circle cx="68" cy="74" r="16" />
              <circle cx="32" cy="74" r="16" />
              <circle cx="22" cy="40" r="16" />
              <circle cx="50" cy="48" r="14" fill={isSunset ? '#fda4af' : '#fbcfe8'} />
            </g>
          </svg>
        </motion.div>

        {/* Flower 2 - Cyan / Sky Blue */}
        <motion.div
          animate={{ x: ['110vw', '-10vw'] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear', delay: 10 }}
          className="absolute top-14 right-0 opacity-35 sm:opacity-50"
        >
          <svg width="76" height="76" viewBox="0 0 100 100" fill="none">
            <g fill={isSunset ? '#38bdf8' : '#7dd3fc'} opacity="0.8">
              <circle cx="50" cy="22" r="17" />
              <circle cx="76" cy="42" r="17" />
              <circle cx="66" cy="72" r="17" />
              <circle cx="34" cy="72" r="17" />
              <circle cx="24" cy="42" r="17" />
              <circle cx="50" cy="50" r="15" fill={isSunset ? '#7dd3fc' : '#bae6fd'} />
            </g>
          </svg>
        </motion.div>

        {/* Flower 3 - Warm Amber / Yellow */}
        <motion.div
          animate={{ x: ['-10vw', '110vw'] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear', delay: 25 }}
          className="absolute top-4 left-1/3 opacity-30 sm:opacity-45"
        >
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
            <g fill={isSunset ? '#fbbf24' : '#fef08a'} opacity="0.85">
              <circle cx="50" cy="20" r="15" />
              <circle cx="75" cy="40" r="15" />
              <circle cx="65" cy="70" r="15" />
              <circle cx="35" cy="70" r="15" />
              <circle cx="25" cy="40" r="15" />
              <circle cx="50" cy="48" r="13" fill="#ffffff" />
            </g>
          </svg>
        </motion.div>

        {/* Flower 4 - Purple / Lavender */}
        <motion.div
          animate={{ x: ['110vw', '-10vw'] }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear', delay: 40 }}
          className="absolute top-18 right-1/4 opacity-30 sm:opacity-45"
        >
          <svg width="58" height="58" viewBox="0 0 100 100" fill="none">
            <g fill={isSunset ? '#c084fc' : '#e9d5ff'} opacity="0.8">
              <circle cx="50" cy="22" r="16" />
              <circle cx="76" cy="42" r="16" />
              <circle cx="66" cy="72" r="16" />
              <circle cx="34" cy="72" r="16" />
              <circle cx="24" cy="42" r="16" />
              <circle cx="50" cy="50" r="14" fill="#ffffff" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Bikini Atoll Island - positioned along the horizon in the upper-mid ocean */}
      <motion.div
        key={bounceCount}
        initial={bounceCount > 0 ? { scale: 0.96, y: 3 } : false}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 15 }}
        onClick={handleClick}
        className="absolute right-2 sm:right-6 md:right-14 top-[20%] sm:top-[22%] md:top-[24%] pointer-events-auto cursor-pointer group origin-bottom scale-[0.68] sm:scale-[0.85] md:scale-100 transition-transform hover:scale-[1.04]"
        title="Pulau Bikini Atoll - Klik aku!"
      >
        {/* Island Speech Bubble */}
        {quip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-sky-950 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg border border-sky-300 pointer-events-none z-30"
          >
            {quip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white" />
          </motion.div>
        )}

        {/* Floating gentle bobbing */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <svg
            width="220"
            height="140"
            viewBox="0 0 220 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            {/* Water foam and reflection around island base */}
            <ellipse
              cx="110"
              cy="125"
              rx="90"
              ry="10"
              fill={isSunset ? 'rgba(251, 146, 60, 0.35)' : 'rgba(255, 255, 255, 0.45)'}
              className="animate-pulse"
            />
            <ellipse
              cx="110"
              cy="124"
              rx="80"
              ry="7"
              fill={isSunset ? 'rgba(234, 88, 12, 0.4)' : 'rgba(56, 189, 248, 0.3)'}
            />

            {/* Sandy Mound / Island Base */}
            <path
              d="M15 125 C35 105, 75 92, 110 92 C145 92, 185 105, 205 125 C175 130, 45 130, 15 125 Z"
              fill={isSunset ? '#d97706' : '#eab308'}
              stroke={isSunset ? '#b45309' : '#ca8a04'}
              strokeWidth="2"
            />
            {/* Sand highlight texture */}
            <path
              d="M35 122 C55 106, 85 96, 110 96 C135 96, 165 106, 185 122"
              stroke={isSunset ? '#fde68a' : '#fef08a'}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Signpost "Bikini Atoll" */}
            <g transform="translate(148, 92) scale(0.75)">
              <rect x="7" y="10" width="3" height="24" fill="#78350f" rx="1" />
              <rect
                x="0"
                y="6"
                width="28"
                height="12"
                rx="2"
                fill="#b45309"
                stroke="#78350f"
                strokeWidth="1"
              />
              <text x="14" y="14" fontSize="4.5" fontWeight="bold" fill="#fef3c7" textAnchor="middle">
                BIKINI
              </text>
              <text x="14" y="17" fontSize="3.5" fontWeight="bold" fill="#fef3c7" textAnchor="middle">
                ATOLL
              </text>
            </g>

            {/* Palm Tree 1 (Left - Curved inward) */}
            <g>
              {/* Trunk */}
              <path
                d="M85 102 C82 75, 75 55, 62 38"
                stroke={isSunset ? '#78350f' : '#854d0e'}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M85 102 C82 75, 75 55, 62 38"
                stroke={isSunset ? '#9a3412' : '#a16207'}
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Trunk ridges */}
              <path d="M83 88 L86 89" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <path d="M80 74 L83 75" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <path d="M74 58 L77 59" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              {/* Coconuts */}
              <circle cx="61" cy="40" r="3" fill="#451a03" />
              <circle cx="65" cy="41" r="3" fill="#3b1702" />
              <circle cx="63" cy="44" r="3" fill="#451a03" />
              {/* Palm Leaves */}
              <motion.g
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '62px', originY: '38px' }}
              >
                <path
                  d="M62 38 Q35 25 15 36 Q38 38 62 38 Z"
                  fill={isSunset ? '#15803d' : '#16a34a'}
                  stroke="#14532d"
                  strokeWidth="1"
                />
                <path
                  d="M62 38 Q45 15 30 14 Q48 26 62 38 Z"
                  fill={isSunset ? '#16a34a' : '#22c55e'}
                  stroke="#14532d"
                  strokeWidth="1"
                />
                <path
                  d="M62 38 Q65 10 50 4 Q60 22 62 38 Z"
                  fill={isSunset ? '#15803d' : '#16a34a'}
                  stroke="#14532d"
                  strokeWidth="1"
                />
                <path
                  d="M62 38 Q80 20 88 28 Q75 35 62 38 Z"
                  fill={isSunset ? '#166534' : '#15803d'}
                  stroke="#14532d"
                  strokeWidth="1"
                />
              </motion.g>
            </g>

            {/* Palm Tree 2 (Center - Tallest iconic Bikini Atoll palm) */}
            <g>
              {/* Trunk */}
              <path
                d="M108 100 C110 70, 105 45, 114 22"
                stroke={isSunset ? '#78350f' : '#854d0e'}
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M108 100 C110 70, 105 45, 114 22"
                stroke={isSunset ? '#9a3412' : '#a16207'}
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Trunk ridges */}
              <path d="M107 82 L111 83" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M106 65 L110 66" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M108 46 L112 47" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M111 32 L114 33" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              {/* Coconuts */}
              <circle cx="112" cy="24" r="3.5" fill="#451a03" />
              <circle cx="117" cy="25" r="3.5" fill="#3b1702" />
              <circle cx="114" cy="29" r="3.5" fill="#451a03" />
              {/* Palm Leaves */}
              <motion.g
                animate={{ rotate: [-2.5, 2.5, -2.5] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                style={{ originX: '114px', originY: '22px' }}
              >
                <path
                  d="M114 22 Q75 10 55 22 Q85 24 114 22 Z"
                  fill={isSunset ? '#15803d' : '#16a34a'}
                  stroke="#14532d"
                  strokeWidth="1.2"
                />
                <path
                  d="M114 22 Q95 -4 80 0 Q98 12 114 22 Z"
                  fill={isSunset ? '#16a34a' : '#22c55e'}
                  stroke="#14532d"
                  strokeWidth="1.2"
                />
                <path
                  d="M114 22 Q125 -10 135 -4 Q128 12 114 22 Z"
                  fill={isSunset ? '#22c55e' : '#4ade80'}
                  stroke="#14532d"
                  strokeWidth="1.2"
                />
                <path
                  d="M114 22 Q145 5 160 16 Q138 22 114 22 Z"
                  fill={isSunset ? '#166534' : '#15803d'}
                  stroke="#14532d"
                  strokeWidth="1.2"
                />
                <path
                  d="M114 22 Q138 28 152 38 Q130 36 114 22 Z"
                  fill={isSunset ? '#14532d' : '#166534'}
                  stroke="#052e16"
                  strokeWidth="1.2"
                />
              </motion.g>
            </g>

            {/* Palm Tree 3 (Right - Leaning right toward ocean) */}
            <g>
              {/* Trunk */}
              <path
                d="M130 104 C138 80, 148 60, 162 42"
                stroke={isSunset ? '#78350f' : '#854d0e'}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M130 104 C138 80, 148 60, 162 42"
                stroke={isSunset ? '#9a3412' : '#a16207'}
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Trunk ridges */}
              <path d="M134 88 L137 87" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <path d="M141 72 L144 71" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              <path d="M151 56 L154 55" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              {/* Coconuts */}
              <circle cx="160" cy="44" r="3" fill="#451a03" />
              <circle cx="165" cy="45" r="3" fill="#3b1702" />
              <circle cx="163" cy="48" r="3" fill="#451a03" />
              {/* Palm Leaves */}
              <motion.g
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                style={{ originX: '162px', originY: '42px' }}
              >
                <path
                  d="M162 42 Q140 25 132 32 Q145 38 162 42 Z"
                  fill={isSunset ? '#15803d' : '#16a34a'}
                  stroke="#14532d"
                  strokeWidth="1"
                />
                <path
                  d="M162 42 Q168 18 180 20 Q172 32 162 42 Z"
                  fill={isSunset ? '#16a34a' : '#22c55e'}
                  stroke="#14532d"
                  strokeWidth="1"
                />
                <path
                  d="M162 42 Q190 28 208 38 Q185 45 162 42 Z"
                  fill={isSunset ? '#166534' : '#15803d'}
                  stroke="#14532d"
                  strokeWidth="1"
                />
                <path
                  d="M162 42 Q182 52 195 62 Q176 56 162 42 Z"
                  fill={isSunset ? '#14532d' : '#166534'}
                  stroke="#052e16"
                  strokeWidth="1"
                />
              </motion.g>
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
