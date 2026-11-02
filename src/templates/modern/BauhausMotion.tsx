import React, { useEffect, useRef, useState } from 'react';
import { markIntroPlayed, useCountUp } from '../common/motion';
import { BAUHAUS_INTRO_KEY } from './bauhausShared';
import './bauhaus.css';

const INTRO_HOLD_MS = 1650;
const INTRO_EXIT_MS = 640;

/* ------------------------------------------------------------------ */
/* Intro: red square drops, blue circle rolls in, yellow triangle      */
/* rises, black bar slides under, name stamps up, then the ground      */
/* splits open to reveal the page.                                     */
/* ------------------------------------------------------------------ */
export const BauhausIntro: React.FC<{ name: string; onDone: () => void }> = ({ name, onDone }) => {
  const [isOut, setIsOut] = useState(false);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    markIntroPlayed(BAUHAUS_INTRO_KEY);
    const outTimer = window.setTimeout(() => setIsOut(true), INTRO_HOLD_MS);
    const skip = () => setIsOut(true);
    window.addEventListener('keydown', skip);
    return () => {
      window.clearTimeout(outTimer);
      window.removeEventListener('keydown', skip);
    };
  }, []);

  useEffect(() => {
    if (!isOut) return;
    const timer = window.setTimeout(() => doneRef.current(), INTRO_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [isOut]);

  const chars = (name || 'Ahmad Sobirin').toUpperCase().split('');

  return (
    <div
      className={`bh-intro ${isOut ? 'is-out' : ''}`}
      onClick={() => setIsOut(true)}
      role="presentation"
      aria-hidden="true"
    >
      <div className="bh-intro__half bh-intro__half--top" />
      <div className="bh-intro__half bh-intro__half--bottom" />

      <div className="bh-intro__content">
        <div className="bh-intro__stage">
          <span className="bh-shape-square" />
          <span className="bh-shape-circle" />
          <span className="bh-shape-tri" />
          <span className="bh-shape-bar" />
        </div>

        <div className="bh-intro__name">
          {chars.map((c, i) => (
            <span key={i} className="bh-intro__char" style={{ '--i': i } as React.CSSProperties}>
              <span>{c === ' ' ? ' ' : c}</span>
            </span>
          ))}
        </div>

        <div className="bh-intro__meter">
          <span />
          <span />
          <span />
        </div>
        <span className="bh-intro__hint">Bauhaus 1919 / klik untuk lewati</span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Tri-colour scroll progress bar                                     */
/* ------------------------------------------------------------------ */
export const BauhausProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={barRef} className="bh-progress" aria-hidden="true" />;
};

/* ------------------------------------------------------------------ */
/* Kinetic typography band                                            */
/* ------------------------------------------------------------------ */
const SHAPES = [
  <span key="c" className="inline-block w-5 h-5 rounded-full bg-[#ff0000] border-2 border-current" />,
  <span key="s" className="inline-block w-5 h-5 bg-[#ffff00] border-2 border-current" />,
  <span
    key="t"
    className="inline-block w-6 h-5 bg-[#0000ff]"
    style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
  />,
];

export const BauhausMarquee: React.FC<{
  words: string[];
  reverse?: boolean;
  className?: string;
}> = ({ words, reverse, className = '' }) => {
  const sequence = words.flatMap((w, i) => [
    <span key={`w${i}`} className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
      {w}
    </span>,
    React.cloneElement(SHAPES[i % SHAPES.length], { key: `s${i}` }),
  ]);

  return (
    <div
      className={`bh-marquee ${reverse ? 'bh-marquee--reverse' : ''} border-b-4 border-[#000000] py-4 ${className}`}
      aria-hidden="true"
    >
      <div className="bh-marquee__track">
        {sequence}
        {sequence.map((el, i) => React.cloneElement(el, { key: `dup${i}` }))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Counting numerals for the facts matrix                             */
/* ------------------------------------------------------------------ */
export const BauhausCount: React.FC<{ value: number; pad?: number; suffix?: string; className?: string }> = ({
  value,
  pad = 2,
  suffix = '',
  className,
}) => {
  const { ref, value: shown } = useCountUp<HTMLSpanElement>(value, 1000);
  return (
    <span ref={ref} className={className}>
      {String(shown).padStart(pad, '0')}
      {suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Rotating circular caption around the closing control               */
/* ------------------------------------------------------------------ */
export const BauhausTextRing: React.FC<{ text: string }> = ({ text }) => (
  <svg className="bh-ring" viewBox="0 0 300 300" aria-hidden="true">
    <defs>
      <path id="bh-ring-path" d="M150,150 m-132,0 a132,132 0 1,1 264,0 a132,132 0 1,1 -264,0" />
    </defs>
    <text fill="#ffffff" fontSize="17" fontWeight="900" letterSpacing="4.2">
      <textPath href="#bh-ring-path">{text}</textPath>
    </text>
  </svg>
);
