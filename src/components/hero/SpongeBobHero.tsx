import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { SpongeBobSVG } from './SpongeBobSVG';
import { useTheme } from '../../context/ThemeContext';

interface SpongeBobHeroProps {
  onSplash?: (clientX: number, clientY: number, intensity: number) => void;
  onRipple?: (clientX: number, clientY: number, size?: number) => void;
  onCrabCollision?: (spongeRect: DOMRect) => void;
}

const SPONGEBOB_DIALOGUES = [
  'Aku siap! Aku siap! Aku siap ngoding! 🧽✨',
  'Ahmad Sobirin kodingannya rapi banget, lebih mantap dari resep Krabby Patty!',
  'Patrick! Liat nih, ada website portofolio Full-Stack yang keren banget!',
  'Mr. Krabs pasti kagum liat proyek-proyek berbobot kayak gini ~ 🦀',
  'Siapa mau ikut berburu ubur-ubur di lautan bareng aku? 🪼',
  'Kepiting, servis bola volinya mantap! Awas kena ubur-ubur!',
  'Hiu di air itu teman baikku lho, dia vegetarian pencinta Krabby Patty!',
  'Yuk scroll ke bawah, banyak proyek keren yang siap bikin kamu takjub!'
];

const SPONGEBOB_SUNSET_DIALOGUES = [
  'Wahh... langit senja di pantai ini indah banget ya! 🌅',
  'Setelah seharian manggang Krabby Patty, nikmat banget santai di sini ~',
  'Kepiting! Udahan main volinya, yuk santai nonton sunset bareng!',
  'Pulau Bikini Atoll di kejauhan sana siluetnya estetik banget pas senja!',
  'Senja begini paling enak sambil baca studi kasus proyek Mas Sobirin!'
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

export const SpongeBobHero: React.FC<SpongeBobHeroProps> = ({
  onSplash,
  onRipple,
  onCrabCollision
}) => {
  const { isSunset } = useTheme();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);
  const [isInWater, setIsInWater] = useState(false);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([]);

  const deckRef = useRef<string[]>(
    createShuffledDeck(isSunset ? SPONGEBOB_SUNSET_DIALOGUES : SPONGEBOB_DIALOGUES)
  );
  const lastQuipRef = useRef<string>('');

  useEffect(() => {
    deckRef.current = createShuffledDeck(
      isSunset ? SPONGEBOB_SUNSET_DIALOGUES : SPONGEBOB_DIALOGUES
    );
  }, [isSunset]);

  // Initial position: on the left-center of the beach
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spongebobRef = useRef<HTMLDivElement | null>(null);

  // Blinking eyes
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Periodic bubbles floating from SpongeBob
  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        const id = Date.now();
        setBubbles((prev) => [...prev.slice(-4), { id, x: (Math.random() * 20) - 10, y: 0 }]);
        setTimeout(() => {
          setBubbles((prev) => prev.filter((b) => b.id !== id));
        }, 2200);
      }
    }, 3200);

    return () => clearInterval(bubbleInterval);
  }, []);

  const triggerQuip = () => {
    if (deckRef.current.length === 0) {
      deckRef.current = createShuffledDeck(
        isSunset ? SPONGEBOB_SUNSET_DIALOGUES : SPONGEBOB_DIALOGUES,
        lastQuipRef.current
      );
    }
    const quip = deckRef.current.pop() || 'Aku Siap! 🧽';
    lastQuipRef.current = quip;
    setCurrentQuip(quip);

    // Trigger ripple
    if (spongebobRef.current && onRipple) {
      const rect = spongebobRef.current.getBoundingClientRect();
      onRipple(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
    }

    setTimeout(() => setCurrentQuip(null), 3800);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerQuip();
  };

  const handleDragStart = () => {
    setIsGrabbed(true);
  };

  const handleDrag = (_e: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
    if (!spongebobRef.current) return;
    const rect = spongebobRef.current.getBoundingClientRect();
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Check if dragged into ocean water (top 50% of screen)
    const inWaterNow = rect.top < screenHeight * 0.58;
    if (inWaterNow !== isInWater) {
      setIsInWater(inWaterNow);
    }
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsGrabbed(false);
    if (!spongebobRef.current) return;

    const rect = spongebobRef.current.getBoundingClientRect();
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const clientX = rect.left + rect.width / 2;
    const clientY = rect.top + rect.height / 2;

    const velocity = Math.hypot(info.velocity.x, info.velocity.y) / 500;

    // If drag was very small, treat as click/tap
    if (Math.abs(info.offset.x) < 5 && Math.abs(info.offset.y) < 5) {
      triggerQuip();
    }

    if (rect.top < screenHeight * 0.60) {
      setIsInWater(true);
      if (onSplash) {
        onSplash(clientX, clientY, Math.max(1, Math.min(velocity, 2.2)));
      }
    } else {
      setIsInWater(false);
      // Check collision with crab on the beach
      if (onCrabCollision) {
        onCrabCollision(rect);
      }
    }
  };

  return (
    <motion.div
      ref={spongebobRef}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        touchAction: 'none'
      }}
      onClick={handleClick}
      onTap={triggerQuip}
      animate={{
        scale: isGrabbed ? 1.15 : 1,
        y: isGrabbed ? -10 : 0
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="absolute bottom-6 sm:bottom-10 left-[18%] sm:left-[22%] md:left-[26%] z-25 pointer-events-auto cursor-grab active:cursor-grabbing select-none"
    >
      {/* Speech Bubble */}
      {currentQuip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -16, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-400 text-amber-950 font-black text-xs px-3.5 py-1.5 rounded-2xl shadow-xl border-2 border-amber-600 backdrop-blur-md z-40 pointer-events-none"
        >
          {currentQuip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-amber-400" />
        </motion.div>
      )}

      {/* Floating Bubbles blown by SpongeBob */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: 0, opacity: 0.8, scale: 0.6 }}
          animate={{ y: -65, x: b.x * 2, opacity: 0, scale: 1.2 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-200/50 border border-white/80 shadow-[0_0_6px_rgba(255,255,255,0.7)] pointer-events-none"
        />
      ))}

      {/* SpongeBob Shadow */}
      <div
        className={`absolute -bottom-1 left-3 right-3 h-4 rounded-full blur-[3px] scale-y-50 ${
          isSunset ? 'bg-[#ea580c]/30' : 'bg-[#c4ad82]/50'
        }`}
      />

      {/* SpongeBob Animated Body Container */}
      <motion.div
        animate={
          isGrabbed
            ? { rotate: [-4, 4, -4] }
            : isInWater
            ? { y: [0, -4, 0], rotate: [-2, 2, -2] }
            : { y: [0, -3, 0], rotate: [0, 0.5, 0] }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <SpongeBobSVG
          pose={isGrabbed ? 'ready' : isInWater ? 'swim' : 'wave'}
          isBlinking={isBlinking}
          hasFloatie={isInWater}
          hasNet={!isInWater}
          width={105}
          height={125}
        />
      </motion.div>
    </motion.div>
  );
};
