import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface JellyfishProps {
  initialX?: string | number;
  initialY?: string | number;
  size?: number;
  color?: 'pink' | 'blue' | 'amber';
  delay?: number;
  duration?: number;
  className?: string;
}

export const Jellyfish: React.FC<JellyfishProps> = ({
  initialX = '10%',
  initialY = '20%',
  size = 46,
  color = 'pink',
  delay = 0,
  duration = 4.2,
  className = ''
}) => {
  const { isSunset } = useTheme();
  const [isSparking, setIsSparking] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSparking(true);
    setTimeout(() => setIsSparking(false), 900);
  };

  const getColors = () => {
    if (color === 'pink') {
      return {
        bell: isSunset ? '#f43f5e' : '#f472b6',
        rim: isSunset ? '#fb7185' : '#fbcfe8',
        tentacle: isSunset ? '#fda4af' : '#db2777',
        spots: isSunset ? '#be123c' : '#db2777',
        glow: isSunset ? 'rgba(244,63,94,0.45)' : 'rgba(244,114,182,0.35)'
      };
    } else if (color === 'amber') {
      return {
        bell: isSunset ? '#f59e0b' : '#fbbf24',
        rim: isSunset ? '#fde68a' : '#fef08a',
        tentacle: isSunset ? '#d97706' : '#b45309',
        spots: isSunset ? '#b45309' : '#d97706',
        glow: isSunset ? 'rgba(245,158,11,0.45)' : 'rgba(251,191,36,0.35)'
      };
    } else {
      return {
        bell: isSunset ? '#38bdf8' : '#67e8f9',
        rim: isSunset ? '#bae6fd' : '#cffafe',
        tentacle: isSunset ? '#0284c7' : '#0891b2',
        spots: isSunset ? '#0369a1' : '#0e7490',
        glow: isSunset ? 'rgba(56,189,248,0.45)' : 'rgba(103,232,249,0.35)'
      };
    }
  };

  const c = getColors();

  return (
    <motion.div
      onClick={handleClick}
      animate={{
        y: [0, -18, 0],
        x: [0, 6, -4, 0],
        scale: [1, 1.08, 0.96, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
      style={{ left: initialX, top: initialY }}
      className={`absolute pointer-events-auto cursor-pointer select-none group ${className}`}
      title="Ubur-ubur Jellyfish Fields! Klik untuk sengatan listrik manja 🪼✨"
    >
      {/* Electric Spark / Pulse Ripple */}
      <AnimatePresence>
        {isSparking && (
          <motion.div
            initial={{ scale: 0.6, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 rounded-full border-2 border-yellow-300 pointer-events-none"
            style={{ boxShadow: `0 0 16px ${c.bell}` }}
          />
        )}
      </AnimatePresence>

      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 50 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md transition-transform group-hover:scale-115"
      >
        {/* Glow Halo */}
        <ellipse cx="25" cy="22" rx="20" ry="16" fill={c.glow} />

        {/* Jellyfish Bell (Dome) */}
        <path
          d="M7 26 C7 10, 43 10, 43 26 C43 30, 39 31, 35 29 C31 27, 29 31, 25 29 C21 27, 19 31, 15 29 C11 31, 7 30, 7 26 Z"
          fill={c.bell}
          fillOpacity="0.85"
          stroke={c.tentacle}
          strokeWidth="1.8"
        />

        {/* Bell Rim Highlight */}
        <path
          d="M9 25 C13 27, 17 27, 21 26 C25 25, 29 27, 33 26 C37 25, 41 27, 41 25"
          stroke={c.rim}
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Spots on top dome */}
        <circle cx="17" cy="18" r="2.2" fill={c.spots} opacity="0.75" />
        <circle cx="25" cy="14" r="2.8" fill={c.spots} opacity="0.75" />
        <circle cx="33" cy="18" r="2.2" fill={c.spots} opacity="0.75" />

        {/* Swaying Tentacles */}
        <g id="tentacles">
          <motion.path
            d="M13 30 Q11 44 14 58"
            stroke={c.tentacle}
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{ d: ['M13 30 Q11 44 14 58', 'M13 30 Q16 44 11 58', 'M13 30 Q11 44 14 58'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M20 30 Q23 46 19 60"
            stroke={c.tentacle}
            strokeWidth="2.2"
            strokeLinecap="round"
            animate={{ d: ['M20 30 Q23 46 19 60', 'M20 30 Q17 46 22 60', 'M20 30 Q23 46 19 60'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          <motion.path
            d="M26 30 Q28 46 25 61"
            stroke={c.tentacle}
            strokeWidth="2.2"
            strokeLinecap="round"
            animate={{ d: ['M26 30 Q28 46 25 61', 'M26 30 Q23 46 28 61', 'M26 30 Q28 46 25 61'] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.path
            d="M33 30 Q36 44 32 58"
            stroke={c.tentacle}
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{ d: ['M33 30 Q36 44 32 58', 'M33 30 Q30 44 35 58', 'M33 30 Q36 44 32 58'] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          />
        </g>
      </svg>
    </motion.div>
  );
};

export const JellyfishFieldsGroup: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      <Jellyfish initialX="8%" initialY="24%" size={42} color="pink" delay={0.2} duration={4.2} />
      <Jellyfish initialX="86%" initialY="18%" size={48} color="amber" delay={0.8} duration={4.8} />
      <Jellyfish initialX="4%" initialY="68%" size={38} color="blue" delay={1.4} duration={3.8} />
      <Jellyfish initialX="92%" initialY="72%" size={44} color="pink" delay={0.5} duration={4.4} />
    </div>
  );
};
