import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export type SharkExpression = 'normal' | 'grabbed' | 'breach' | 'happy';

interface SwimmingSharkProps {
  expression?: SharkExpression;
  onSharkDrop: (clientX: number, clientY: number, velocity: number, sharkRect?: DOMRect) => void;
  onSharkSwim: (clientX: number, clientY: number) => void;
  onSharkSplash?: (clientX: number, clientY: number) => void;
  onSharkWaddle?: (sharkRect: DOMRect) => void;
}

const SHARK_DIALOGUES = [
  '🦈 Wushh! Hiu penjaga lautan portofolio sedang patroli!',
  'Siripku tajam membelah ombak, tapi kodingan Mas Sobirin jauh lebih tajam!',
  'Tenang, aku hiu vegetarian! Makanan favoritku Krabby Patty buatan SpongeBob ~',
  'SpongeBob! Awas jaring ubur-uburmu nyangkut di siripku!',
  'Kepiting! Smash bola volinya jangan sampai nyasar ke taringku ya!',
  'Air laut di portofolio ini jernih dan segar banget!',
  'Kalau nemu bug kodingan, panggil aku biar kukunyah tuntas! 🦈⚡',
  'Meluncur cepat di atas ombak, wuuussshh!',
  'Lihat pulau di sana, itu pulau Bikini Atoll kan?'
];

const SHARK_SUNSET_DIALOGUES = [
  '🌅 Wushh! Siripku berkilau keemasan kena pantulan sunset!',
  'Berenang sore hari di lautan senja rasanya syahdu pol ~',
  'SpongeBob! Liat langitnya, awan bunganya berubah jadi jingga!',
  'Kepiting, udahan main volinya, yuk nonton sunset bareng hiu!',
  'Air laut senja hangat banget, enak buat meluncur santai ~'
];

const createShuffledDeck = (items: string[], lastItem?: string): string[] => {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  if (lastItem && deck[0] === lastItem && deck.length > 1) {
    [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
  }
  return deck;
};

export const SwimmingShark: React.FC<SwimmingSharkProps> = ({
  expression: _expression = 'normal',
  onSharkDrop,
  onSharkSwim,
  onSharkSplash,
  onSharkWaddle
}) => {
  const { isSunset } = useTheme();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [isBreaching, setIsBreaching] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  const deckRef = useRef<string[]>(createShuffledDeck(isSunset ? SHARK_SUNSET_DIALOGUES : SHARK_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  useEffect(() => {
    deckRef.current = createShuffledDeck(isSunset ? SHARK_SUNSET_DIALOGUES : SHARK_DIALOGUES);
  }, [isSunset]);

  const x = useMotionValue(-140);
  const y = useMotionValue(0);
  const sharkRef = useRef<HTMLDivElement | null>(null);

  const WATER_LEVEL_Y = 24;

  // Eye blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Occasional breach jump (shark leaps out of the water)
  useEffect(() => {
    if (isGrabbed) return;
    const breachInterval = setInterval(() => {
      if (Math.random() > 0.45 && !isGrabbed) {
        setIsBreaching(true);
        if (sharkRef.current && onSharkSplash) {
          const rect = sharkRef.current.getBoundingClientRect();
          onSharkSplash(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        setTimeout(() => {
          setIsBreaching(false);
        }, 1200);
      }
    }, 9000);

    return () => clearInterval(breachInterval);
  }, [isGrabbed, onSharkSplash]);

  // Swimming motion loop across ocean
  useEffect(() => {
    if (isGrabbed) return;

    let animId: number;
    let lastTime = performance.now();
    let rippleTimer = 0;

    const swimLoop = (currentTime: number) => {
      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;
      const swimSpeed = isBreaching ? 130 : 85;
      const currX = x.get();

      if (direction === 'ltr') {
        const nextX = currX + swimSpeed * delta;
        if (nextX > screenWidth + 140) {
          setDirection('rtl');
          x.set(screenWidth + 140);
          y.set((Math.random() * 20) - 10);
        } else {
          x.set(nextX);
        }
      } else {
        const nextX = currX - swimSpeed * delta;
        if (nextX < -160) {
          setDirection('ltr');
          x.set(-160);
          y.set((Math.random() * 20) - 10);
        } else {
          x.set(nextX);
        }
      }

      // Generate water ripples while swimming
      rippleTimer += delta;
      if (rippleTimer > 0.45 && sharkRef.current) {
        rippleTimer = 0;
        const rect = sharkRef.current.getBoundingClientRect();
        const splashX = direction === 'ltr' ? rect.right - 20 : rect.left + 20;
        onSharkSwim(splashX, rect.top + rect.height * 0.7);
      }

      animId = requestAnimationFrame(swimLoop);
    };

    animId = requestAnimationFrame(swimLoop);
    return () => cancelAnimationFrame(animId);
  }, [direction, isGrabbed, isBreaching, onSharkSwim, x, y]);

  const triggerQuip = () => {
    if (deckRef.current.length === 0) {
      deckRef.current = createShuffledDeck(
        isSunset ? SHARK_SUNSET_DIALOGUES : SHARK_DIALOGUES,
        lastQuipRef.current
      );
    }
    const quip = deckRef.current.pop() || 'Wushh! 🦈';
    lastQuipRef.current = quip;
    setCurrentQuip(quip);

    if (sharkRef.current && onSharkSplash) {
      const rect = sharkRef.current.getBoundingClientRect();
      onSharkSplash(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    setTimeout(() => setCurrentQuip(null), 3600);
  };

  // Click handler for dialogues
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerQuip();
  };

  const handleDragStart = () => {
    setIsGrabbed(true);
    setIsBreaching(false);
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsGrabbed(false);
    const rect = sharkRef.current?.getBoundingClientRect();
    const clientX = rect ? rect.left + rect.width / 2 : info.point.x;
    const clientY = rect ? rect.top + rect.height / 2 : info.point.y;
    const velocity = Math.hypot(info.velocity.x, info.velocity.y) / 500;

    // If drag was very small, treat as click/tap
    if (Math.abs(info.offset.x) < 5 && Math.abs(info.offset.y) < 5) {
      triggerQuip();
    }

    // Check collision with crab if near beach
    if (rect && onSharkWaddle) {
      onSharkWaddle(rect);
    }

    onSharkDrop(clientX, clientY, Math.max(1, Math.min(velocity, 2.5)), rect);

    // If dragged deep onto beach, slide back toward water
    if (y.get() > WATER_LEVEL_Y + 10) {
      setTimeout(() => {
        y.set(0);
      }, 1500);
    }
  };

  return (
    <motion.div
      ref={sharkRef}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        touchAction: 'none'
      }}
      onClick={handleClick}
      onTap={triggerQuip}
      animate={{
        scale: isGrabbed ? 1.15 : isBreaching ? 1.12 : 1,
        rotate: isGrabbed ? (direction === 'ltr' ? 8 : -8) : isBreaching ? (direction === 'ltr' ? -15 : 15) : 0
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="absolute top-[36%] sm:top-[38%] md:top-[40%] z-20 pointer-events-auto cursor-grab active:cursor-grabbing select-none"
    >
      {/* Dialogue Bubble */}
      {currentQuip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -18, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-sky-950/90 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl shadow-xl border border-sky-400 backdrop-blur-md z-40 pointer-events-none"
        >
          {currentQuip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-sky-950/90" />
        </motion.div>
      )}

      {/* Shark Graphics container - flipped according to direction */}
      <div
        className={`relative transition-transform duration-300 ${
          direction === 'rtl' ? '-scale-x-100' : 'scale-x-100'
        }`}
      >
        {/* If swimming underwater normally (show Dorsal Fin cutting through water with wake ripples) */}
        {!isGrabbed && !isBreaching ? (
          <div className="relative w-28 h-20 -translate-y-6">
            {/* Water Wake / Foam ripples behind fin */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-2 -left-3 w-32 h-4 pointer-events-none"
            >
              <svg viewBox="0 0 120 20" fill="none" className="w-full h-full">
                <path
                  d="M0 10 Q30 5 60 10 T120 10"
                  stroke={isSunset ? 'rgba(254, 215, 170, 0.6)' : 'rgba(255, 255, 255, 0.85)'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="50"
                  cy="10"
                  rx="30"
                  ry="4"
                  fill={isSunset ? 'rgba(234, 88, 12, 0.25)' : 'rgba(56, 189, 248, 0.3)'}
                />
              </svg>
            </motion.div>

            {/* Shark Dorsal Fin */}
            <motion.div
              animate={{ y: [0, -3, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <svg width="110" height="75" viewBox="0 0 110 75" fill="none" className="drop-shadow-lg">
                {/* Dorsal Fin Shape */}
                <path
                  d="M25 65 C45 60, 52 35, 62 10 C65 24, 76 45, 95 65 Z"
                  fill={isSunset ? '#334155' : '#0284c7'}
                  stroke={isSunset ? '#1e293b' : '#0369a1'}
                  strokeWidth="2.5"
                />
                {/* Fin Highlight */}
                <path
                  d="M32 63 C48 58, 54 36, 62 14"
                  stroke={isSunset ? '#94a3b8' : '#38bdf8'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* Cute Shark Tail peaking behind */}
                <path
                  d="M10 65 C5 52, -2 40, 2 30 C5 42, 12 55, 18 65 Z"
                  fill={isSunset ? '#475569' : '#0369a1'}
                  opacity="0.7"
                />
              </svg>
            </motion.div>
          </div>
        ) : (
          /* Full Shark Body (Shown when grabbed, breaching, or leaping) */
          <motion.div
            animate={
              isBreaching
                ? { y: [-24, 0], rotate: [-10, 12, 0] }
                : { y: [0, -4, 0] }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-36 h-28 -translate-y-12"
          >
            {/* Splash droplets around breaching shark */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-6 bg-white/60 rounded-full blur-xs"
              />
            </div>

            {/* Full Cartoon Shark SVG */}
            <svg width="145" height="110" viewBox="0 0 145 110" fill="none" className="drop-shadow-xl">
              {/* Shark Body (Top / Slate Blue) */}
              <path
                d="M10 50 C25 25, 65 18, 110 32 C132 40, 142 54, 138 60 C128 66, 95 72, 60 70 C30 68, 12 60, 10 50 Z"
                fill={isSunset ? '#334155' : '#0284c7'}
                stroke={isSunset ? '#1e293b' : '#0369a1'}
                strokeWidth="2.5"
              />

              {/* White Belly */}
              <path
                d="M35 56 C60 56, 90 60, 128 60 C120 66, 92 70, 60 69 C40 68, 28 62, 35 56 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Dorsal Fin */}
              <path
                d="M58 24 C68 2, 75 0, 80 5 C82 14, 88 20, 96 28 Z"
                fill={isSunset ? '#1e293b' : '#0369a1'}
                stroke={isSunset ? '#0f172a' : '#075985'}
                strokeWidth="2"
              />

              {/* Side Pectoral Fin */}
              <path
                d="M72 58 C85 74, 98 84, 95 86 C88 88, 76 76, 66 62 Z"
                fill={isSunset ? '#1e293b' : '#0369a1'}
                stroke={isSunset ? '#0f172a' : '#075985'}
                strokeWidth="1.8"
              />

              {/* Tail Fin (Caudal Fin) */}
              <path
                d="M12 50 C4 32, -4 25, 2 26 C8 32, 14 42, 16 48 C14 55, 6 68, 0 74 C-2 75, 4 68, 12 50 Z"
                fill={isSunset ? '#1e293b' : '#0369a1'}
                stroke={isSunset ? '#0f172a' : '#075985'}
                strokeWidth="2"
              />

              {/* Gills */}
              <path d="M92 42 Q90 48 92 54" stroke="#075985" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M96 43 Q94 48 96 53" stroke="#075985" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M100 44 Q98 48 100 52" stroke="#075985" strokeWidth="1.8" strokeLinecap="round" />

              {/* Big Cartoon Eye */}
              <circle cx="120" cy="42" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
              {!isBlinking ? (
                <>
                  <circle cx="122" cy="42" r="3.2" fill="#0f172a" />
                  <circle cx="123" cy="40.5" r="1.2" fill="#ffffff" />
                </>
              ) : (
                <path d="M116 42 Q120 44 124 42" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              )}

              {/* Friendly Shark Smile with sharp white teeth */}
              <path
                d="M112 56 Q122 62 134 54"
                stroke="#0f172a"
                strokeWidth="2"
                strokeLinecap="round"
                fill="#881337"
              />
              {/* Sharp white teeth row */}
              <polygon points="115,57 117,54 119,58" fill="#ffffff" />
              <polygon points="119,58 122,54 125,59" fill="#ffffff" />
              <polygon points="125,59 128,54 131,57" fill="#ffffff" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
