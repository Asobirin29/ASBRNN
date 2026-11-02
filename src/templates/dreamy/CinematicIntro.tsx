import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  name: string;
  tagline: string;
  onComplete?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  name,
  tagline,
  onComplete,
}) => {
  const [stage, setStage] = useState<'showing' | 'fading' | 'gone'>('showing');

  useEffect(() => {
    // Stage 1: Display for 2.2 seconds
    const timer1 = setTimeout(() => {
      setStage('fading');
    }, 2200);

    // Stage 2: Fade complete after 800ms
    const timer2 = setTimeout(() => {
      setStage('gone');
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('fading');
    setTimeout(() => {
      setStage('gone');
      if (onComplete) onComplete();
    }, 400);
  };

  if (stage === 'gone') return null;

  return (
    <div
      className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#0a0e1a] text-white px-6 transition-all duration-700 pointer-events-auto ${
        stage === 'fading'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-500/5 to-transparent pointer-events-none" />

      {/* Decorative celestial orbit rings */}
      <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-amber-400/20 animate-spin [animation-duration:35s] pointer-events-none" />
      <div className="absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] rounded-full border border-rose-400/20 animate-spin [animation-duration:20s] [animation-direction:reverse] pointer-events-none" />

      {/* Center Cinematic Content */}
      <div className="relative z-10 max-w-lg text-center space-y-5 animate-in fade-in zoom-in-95 duration-1000">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-400/30 text-amber-200 text-xs font-medium tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Dreamy Celestial Realm</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-[#ffe5b4] via-[#f4a7bb] to-[#c9b1ff] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(244,167,187,0.35)]">
            {name}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light tracking-wide max-w-md mx-auto">
          {tagline}
        </p>

        {/* Golden separator line with diamond */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
          <span className="text-amber-300 text-xs">✦</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
      >
        <span>Lewati Intro</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

