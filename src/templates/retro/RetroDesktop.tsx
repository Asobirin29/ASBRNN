import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { isFinePointer, markIntroPlayed, prefersReducedMotion } from '../common/motion';
import { scrollToLenis } from '../../hooks/useLenisSmoothScroll';
import {
  RETRO_BOOT_KEY,
  WindowManagerContext,
  playClick,
  playShutdownChime,
  playStartupChime,
  useWindowManager,
} from './retroShared';
import type { WinMeta, WinState, WindowManager } from './retroShared';
import './retro-desktop.css';

/* ================================================================== */
/* Window manager                                                      */
/* ================================================================== */
const visibleRect = (el: Element | null): DOMRect | null => {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 ? r : null;
};

/** Win95 "zoom rectangle": an outline that jumps from one rect to another in a few redraws. */
function animateZoomRect(from: DOMRect, to: DOMRect) {
  if (prefersReducedMotion()) return;
  const clampTo = (r: DOMRect) => {
    const vh = window.innerHeight;
    if (r.bottom > 0 && r.top < vh) return r;
    const h = Math.min(r.height, vh * 0.7);
    return new DOMRect(r.left, (vh - h) / 2, r.width, h);
  };
  const a = clampTo(from);
  const b = clampTo(to);
  const el = document.createElement('div');
  el.className = 'rw-zoom-rect';
  document.body.appendChild(el);
  const frame = (r: DOMRect) => ({
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
  });
  const anim = el.animate([frame(a), frame(b)], { duration: 260, easing: 'steps(7, end)', fill: 'forwards' });
  anim.onfinish = () => el.remove();
  anim.oncancel = () => el.remove();
}

export const RetroWindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [states, setStates] = useState<Record<string, WinState>>({});
  const [metas, setMetas] = useState<Record<string, WinMeta>>({});
  const [focusedId, setFocusedId] = useState<string | null>('launchpad');
  const [arrangeKey, setArrangeKey] = useState(0);
  const pendingZoom = useRef<{ id: string; from: DOMRect; to: 'task' | 'window' } | null>(null);

  const register = useCallback((meta: WinMeta) => {
    setMetas((m) => (m[meta.id]?.title === meta.title ? m : { ...m, [meta.id]: meta }));
  }, []);

  const minimize = useCallback((id: string) => {
    const from = visibleRect(document.querySelector(`[data-win="${id}"]`));
    if (from) pendingZoom.current = { id, from, to: 'task' };
    playClick();
    setStates((s) => ({ ...s, [id]: 'minimized' }));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const restore = useCallback((id: string) => {
    const from =
      visibleRect(document.querySelector(`[data-task="${id}"]`)) ||
      visibleRect(document.querySelector(`[data-slot="${id}"]`)) ||
      visibleRect(document.querySelector('[data-start-button]'));
    if (from) pendingZoom.current = { id, from, to: 'window' };
    playClick();
    setStates((s) => ({ ...s, [id]: 'open' }));
    setFocusedId(id);
  }, []);

  const toggleMax = useCallback((id: string) => {
    playClick();
    setStates((s) => ({ ...s, [id]: s[id] === 'maximized' ? 'open' : 'maximized' }));
    setFocusedId(id);
  }, []);

  const arrange = useCallback(() => {
    setStates({});
    setArrangeKey((k) => k + 1);
    setFocusedId('launchpad');
  }, []);

  // Run the zoom rectangle once the new state has been laid out.
  useLayoutEffect(() => {
    const pending = pendingZoom.current;
    if (!pending) return;
    pendingZoom.current = null;
    if (pending.to === 'task') {
      const to =
        visibleRect(document.querySelector(`[data-task="${pending.id}"]`)) ||
        visibleRect(document.querySelector('[data-start-button]'));
      if (to) animateZoomRect(pending.from, to);
    } else {
      const el = document.querySelector<HTMLElement>(`[data-win="${pending.id}"]`);
      const to = visibleRect(el);
      if (to) animateZoomRect(pending.from, to);
      if (el && to && (to.top < 0 || to.top > window.innerHeight * 0.6)) {
        scrollToLenis(el, { offset: -64, duration: 0.8 });
      }
    }
  }, [states]);

  // Maximised windows own the scroll; Escape restores them.
  const maxId = Object.keys(states).find((k) => states[k] === 'maximized');
  useEffect(() => {
    if (!maxId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStates((s) => ({ ...s, [maxId]: 'open' }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [maxId]);

  const value = useMemo<WindowManager>(
    () => ({
      states,
      metas,
      focusedId,
      arrangeKey,
      register,
      focus: setFocusedId,
      minimize,
      restore,
      toggleMax,
      arrange,
    }),
    [states, metas, focusedId, arrangeKey, register, minimize, restore, toggleMax, arrange]
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
};

/* ================================================================== */
/* A window: titlebar with working controls, Win95 outline dragging    */
/* ================================================================== */
interface RetroWindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  className?: string;
  controls?: 'full' | 'close';
  children: React.ReactNode;
}

const TITLE_BTN =
  'w-4 h-4 retro-bevel-raised text-black flex items-center justify-center text-[9px] font-bold cursor-pointer active:translate-x-px active:translate-y-px';

export const RetroWindow: React.FC<RetroWindowProps> = ({
  id,
  title,
  icon,
  className = '',
  controls = 'full',
  children,
}) => {
  const wm = useWindowManager();
  const state = wm.states[id] || 'open';
  const isFocused = wm.focusedId === id;
  const winRef = useRef<HTMLDivElement | null>(null);
  // Offsets are tagged with the arrange generation, so "Rapikan Jendela" resets them.
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0, gen: wm.arrangeKey });
  const offset = dragOffset.gen === wm.arrangeKey ? dragOffset : { x: 0, y: 0 };
  const [canDrag, setCanDrag] = useState(false);
  const drag = useRef<{ startX: number; startY: number; rect: DOMRect; outline: HTMLDivElement } | null>(null);

  useEffect(() => {
    wm.register({ id, title, icon });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, title]);


  // Each window "opens" the first time it scrolls into view. Kept in state (not classList)
  // because React rewrites className whenever focus changes.
  const [openPhase, setOpenPhase] = useState<'hidden' | 'opening' | 'done'>(() =>
    prefersReducedMotion() || typeof IntersectionObserver === 'undefined' ? 'done' : 'hidden'
  );
  const isMinimized = state === 'minimized';
  useEffect(() => {
    const el = winRef.current;
    if (!el || isMinimized || openPhase !== 'hidden') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpenPhase('opening');
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMinimized, openPhase]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setCanDrag(mq.matches && isFinePointer());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const onTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    wm.focus(id);
    if (!canDrag || state === 'maximized' || e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    const rect = winRef.current?.getBoundingClientRect();
    if (!rect) return;
    const outline = document.createElement('div');
    outline.className = 'rw-drag-outline';
    Object.assign(outline.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    document.body.appendChild(outline);
    drag.current = { startX: e.clientX, startY: e.clientY, rect, outline };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onTitlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    d.outline.style.left = `${d.rect.left + e.clientX - d.startX}px`;
    d.outline.style.top = `${d.rect.top + e.clientY - d.startY}px`;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    d.outline.remove();
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) {
      setDragOffset({ x: offset.x + dx, y: offset.y + dy, gen: wm.arrangeKey });
    }
  };

  if (state === 'minimized') {
    return (
      <button
        type="button"
        data-slot={id}
        className={`rw-slot ${className}`}
        onClick={() => wm.restore(id)}
        title={`Pulihkan ${title}`}
      >
        <span className="rw-slot__icon">
          <span className="w-10 h-10 retro-bevel-raised bg-[#000080] flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5">
            {icon}
          </span>
          <span className="rw-slot__label px-1">{title.split(' ')[0]}</span>
        </span>
      </button>
    );
  }

  const isMax = state === 'maximized';

  return (
    <div
      ref={winRef}
      data-win={id}
      data-lenis-prevent={isMax ? '' : undefined}
      onPointerDownCapture={() => !isFocused && wm.focus(id)}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setOpenPhase('done');
      }}
      className={`rw-window retro-bevel-raised ${className} ${
        openPhase === 'done' ? 'rw-in rw-done' : openPhase === 'opening' ? 'rw-in' : ''
      } ${isFocused ? 'is-focused' : ''} ${
        isMax ? 'is-max' : ''
      } ${canDrag ? 'is-draggable' : ''}`}
      style={offset.x || offset.y ? { transform: `translate(${offset.x}px, ${offset.y}px)` } : undefined}
    >
      <div
        className="rw-titlebar bg-[#000080] text-white px-2 py-1 flex items-center justify-between select-none"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(e) => {
          if (controls === 'full' && !(e.target as HTMLElement).closest('button')) wm.toggleMax(id);
        }}
      >
        <div className="flex items-center gap-1.5 font-bold text-xs min-w-0">
          <span className="shrink-0 flex items-center">{icon}</span>
          <span className="tracking-wide truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {controls === 'full' && (
            <>
              <button type="button" aria-label="Minimize" className={TITLE_BTN} onClick={() => wm.minimize(id)}>
                _
              </button>
              <button
                type="button"
                aria-label={isMax ? 'Restore' : 'Maximize'}
                className={TITLE_BTN}
                onClick={() => wm.toggleMax(id)}
              >
                {isMax ? '❐' : '□'}
              </button>
            </>
          )}
          <button
            type="button"
            aria-label="Close"
            className={`${TITLE_BTN} text-[10px] font-black ml-0.5`}
            onClick={() => (isMax ? wm.toggleMax(id) : wm.minimize(id))}
          >
            ✕
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

/* ================================================================== */
/* Taskbar buttons for minimised windows                               */
/* ================================================================== */
export const RetroTaskButtons: React.FC = () => {
  const wm = useWindowManager();
  const ids = Object.keys(wm.states).filter((id) => wm.states[id] === 'minimized');
  if (ids.length === 0) return null;
  return (
    <div className="hidden sm:flex items-center gap-1 min-w-0 overflow-hidden">
      {ids.map((id) => (
        <button
          key={id}
          type="button"
          data-task={id}
          onClick={() => wm.restore(id)}
          className="retro-key-button bg-[#d4d4d4] px-2 py-1 text-[11px] font-bold flex items-center gap-1 max-w-[150px] min-w-0"
          title={`Pulihkan ${wm.metas[id]?.title ?? id}`}
        >
          <span className="shrink-0 w-4 h-4 bg-[#000080] flex items-center justify-center [&_svg]:w-3 [&_svg]:h-3">
            {wm.metas[id]?.icon}
          </span>
          <span className="truncate">{wm.metas[id]?.title.split(' ')[0] ?? id}</span>
        </button>
      ))}
    </div>
  );
};

/* ================================================================== */
/* Boot: BIOS POST lines, memory count, then the Retro 95 splash       */
/* ================================================================== */
const BIOS_STEP_MS = 150;

export const RetroBootScreen: React.FC<{ name: string; onDone: () => void; quick?: boolean }> = ({
  name,
  onDone,
  quick = false,
}) => {
  const lines = useMemo(
    () => [
      'RetroBIOS (C) 1995 ASBRNN Systems, Inc.',
      'ASBRNN-486DX2 CPU at 66 MHz',
      '',
      '@MEM',
      '',
      'Detecting IDE Primary Master ...  PORTFOLIO_HDD',
      'Detecting IDE Primary Slave  ...  PROJECTS_CD',
      'Detecting IDE Secondary      ...  TECH_STACK.SYS',
      '',
      `Loading user profile: ${name.toUpperCase()}`,
      'Starting Retro 95 ...',
    ],
    [name]
  );
  const [shown, setShown] = useState(quick ? lines.length : 0);
  const [memKb, setMemKb] = useState(quick ? 16384 : 0);
  const [phase, setPhase] = useState<'bios' | 'splash'>(quick ? 'splash' : 'bios');
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  const finish = useCallback(() => {
    playStartupChime();
    doneRef.current();
  }, []);

  useEffect(() => {
    markIntroPlayed(RETRO_BOOT_KEY);
    const onKey = () => finish();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  useEffect(() => {
    if (phase !== 'bios') return;
    if (shown >= lines.length) {
      const t = window.setTimeout(() => setPhase('splash'), 380);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setShown((n) => n + 1), BIOS_STEP_MS);
    return () => window.clearTimeout(t);
  }, [phase, shown, lines.length]);

  // Memory test counts up while its line is visible.
  const memIndex = lines.indexOf('@MEM');
  useEffect(() => {
    if (shown <= memIndex || memKb >= 16384) return;
    const t = window.setTimeout(() => setMemKb((k) => Math.min(16384, k + 2048)), 28);
    return () => window.clearTimeout(t);
  }, [shown, memIndex, memKb]);

  useEffect(() => {
    if (phase !== 'splash') return;
    const t = window.setTimeout(finish, quick ? 1300 : 1700);
    return () => window.clearTimeout(t);
  }, [phase, finish, quick]);

  return (
    <div className="rw-boot" onClick={finish} role="presentation" aria-hidden="true">
      {phase === 'bios' ? (
        <>
          <div className="rw-boot__energy">
            ENERGY
            <br />
            STAR
          </div>
          <div className="rw-boot__bios">
            {lines.slice(0, shown).map((line, i) =>
              line === '@MEM' ? (
                <div key={i}>
                  Memory Test : {String(memKb).padStart(5, ' ')}K {memKb >= 16384 ? 'OK' : ''}
                </div>
              ) : (
                <div key={i}>{line || ' '}</div>
              )
            )}
            <span className="rw-boot__cursor" />
          </div>
        </>
      ) : (
        <div className="rw-splash">
          <div className="rw-splash__flag">
            <span className="bg-[#ff3b30]" />
            <span className="bg-[#34c759]" />
            <span className="bg-[#0a84ff]" />
            <span className="bg-[#ffd60a]" />
          </div>
          <div className="rw-splash__title">
            Retro <sup>95</sup>
          </div>
          <div className="rw-splash__sub">{name} Edition</div>
          <div className="rw-splash__bar" />
        </div>
      )}
      <div className="rw-boot__skip">Klik atau tekan tombol apa saja untuk lewati</div>
    </div>
  );
};

/* ================================================================== */
/* Shut Down dialog and "safe to turn off" screen                      */
/* ================================================================== */
export const RetroShutdown: React.FC<{ onCancel: () => void; onReboot: () => void }> = ({
  onCancel,
  onReboot,
}) => {
  const [stage, setStage] = useState<'dialog' | 'off'>('dialog');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stage === 'dialog') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stage, onCancel]);

  if (stage === 'off') {
    return (
      <div className="rw-safe" onClick={onReboot} role="button" tabIndex={0} aria-label="Nyalakan ulang">
        <p className="rw-safe__msg">
          It&apos;s now safe to turn off
          <br />
          your computer.
        </p>
        <span className="text-[11px] font-retro-mono text-[#808080]">[ klik untuk menyalakan ulang ]</span>
      </div>
    );
  }

  return (
    <div className="rw-shutdown-dim" role="dialog" aria-modal="true" aria-label="Shut Down Retro 95">
      <div className="retro-bevel-raised bg-[#d4d4d4] w-full max-w-sm">
        <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
          <span>Shut Down Retro 95</span>
          <button type="button" onClick={onCancel} aria-label="Close" className={TITLE_BTN}>
            ✕
          </button>
        </div>
        <div className="p-4 flex gap-3 text-xs text-black font-retro-interface">
          <span className="text-3xl leading-none" aria-hidden="true">
            🖥
          </span>
          <div className="space-y-3">
            <p className="font-bold">Yakin ingin mematikan komputer?</p>
            <p className="text-black/70">Semua jendela portofolio akan ditutup.</p>
          </div>
        </div>
        <div className="px-4 pb-4 flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            className="retro-key-button bg-[#d4d4d4] px-5 py-1.5 text-xs font-bold"
            onClick={() => {
              playShutdownChime();
              setStage('off');
            }}
          >
            Yes
          </button>
          <button type="button" className="retro-key-button bg-[#d4d4d4] px-5 py-1.5 text-xs font-bold" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================================================== */
/* Starfield screensaver after a stretch of desktop idleness           */
/* ================================================================== */
const IDLE_MS = 45_000;

export const RetroScreensaver: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (disabled || !isFinePointer() || prefersReducedMotion()) return;
    let timer = window.setTimeout(() => setActive(true), IDLE_MS);
    const wake = () => {
      setActive(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setActive(true), IDLE_MS);
    };
    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'scroll', 'touchstart'] as const;
    events.forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, wake));
    };
  }, [disabled]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 180 }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
    }));
    let raf = 0;
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#fff';
      for (const s of stars) {
        s.z -= 0.006;
        if (s.z <= 0.02) {
          s.x = (Math.random() - 0.5) * 2;
          s.y = (Math.random() - 0.5) * 2;
          s.z = 1;
        }
        const px = w / 2 + (s.x / s.z) * (w / 2);
        const py = h / 2 + (s.y / s.z) * (h / 2);
        const size = (1 - s.z) * 3;
        if (px >= 0 && px < w && py >= 0 && py < h) ctx.fillRect(px, py, size, size);
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;
  return (
    <div className="rw-screensaver" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
