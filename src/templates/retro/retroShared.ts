import { createContext, useContext } from 'react';
import type React from 'react';

export const RETRO_BOOT_KEY = 'asbrnn:retro-boot';

/* ------------------------------------------------------------------ */
/* Sound: tiny square-wave chimes, never louder than a click           */
/* ------------------------------------------------------------------ */
let sharedAudio: AudioContext | null = null;
function playTones(notes: [number, number][], volume = 0.05) {
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    sharedAudio = sharedAudio || new AudioCtx();
    const ctx = sharedAudio;
    if (ctx.state === 'suspended') void ctx.resume();
    let t = ctx.currentTime;
    notes.forEach(([freq, dur]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(volume, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur);
      t += dur * 0.85;
    });
  } catch {
    // Audio unavailable: stay silent.
  }
}
export const playStartupChime = () =>
  playTones([[523, 0.14], [659, 0.14], [784, 0.14], [1046, 0.32]], 0.035);
export const playShutdownChime = () =>
  playTones([[784, 0.14], [659, 0.14], [523, 0.14], [392, 0.34]], 0.035);
export const playClick = () => playTones([[1200, 0.03]], 0.03);

/* ------------------------------------------------------------------ */
/* Window manager contract                                             */
/* ------------------------------------------------------------------ */
export type WinState = 'open' | 'minimized' | 'maximized';

export interface WinMeta {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export interface WindowManager {
  states: Record<string, WinState>;
  metas: Record<string, WinMeta>;
  focusedId: string | null;
  arrangeKey: number;
  register: (meta: WinMeta) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  restore: (id: string) => void;
  toggleMax: (id: string) => void;
  arrange: () => void;
}

export const WindowManagerContext = createContext<WindowManager | null>(null);

export const useWindowManager = () => {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('RetroWindow must be used inside RetroWindowProvider');
  return ctx;
};

export const useRetroArrange = () => useWindowManager().arrange;
