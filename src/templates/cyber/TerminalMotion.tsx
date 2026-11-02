import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { markIntroPlayed, prefersReducedMotion } from '../common/motion';
import { TERMINAL_BOOT_KEY, TerminalLiveContext } from './terminalShared';
import './terminal.css';

/** Keeps a callback in a ref without writing the ref during render. */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}

/* ================================================================== */
/* Boot log: kernel lines stream, guest logs in, CRT collapses open    */
/* ================================================================== */
const BOOT_LINES: [number, string][] = [
  [0.0, 'Linux version 6.11.0-asbrnn (gcc 14.2) #1 SMP PREEMPT_DYNAMIC'],
  [0.004, 'Command line: BOOT_IMAGE=/vmlinuz root=/dev/portfolio ro quiet'],
  [0.112, 'x86/fpu: Supporting XSAVE feature 0x001: x87 floating point registers'],
  [0.231, 'Memory: 16384K/16384K available (portfolio cache reserved)'],
  [0.402, 'ACPI: Core revision 20260211'],
  [0.588, 'PCI: Using configuration type 1 for base access'],
  [0.731, 'usbcore: registered new interface driver keyboard'],
  [0.912, 'EXT4-fs (sda1): mounted filesystem /var/www/projects'],
];
const BOOT_SERVICES = [
  'Mounted /home/ahmad/projects',
  'Started Tech Stack Registry Daemon',
  'Reached target Career History',
  'Started Communication Socket (SMTP/HTTPS)',
  'Started Interactive Shell Service',
  'Reached target Portfolio Ready',
];

export const TerminalBoot: React.FC<{ name: string; onDone: () => void }> = ({ name, onDone }) => {
  const [step, setStep] = useState(0);
  const [login, setLogin] = useState('');
  const [isOff, setIsOff] = useState(false);
  const doneRef = useLatest(onDone);

  const totalLines = BOOT_LINES.length + BOOT_SERVICES.length;
  const loginText = 'guest';

  useEffect(() => {
    markIntroPlayed(TERMINAL_BOOT_KEY);
    const skip = () => setIsOff(true);
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, []);

  // Stream kernel + service lines, then type the login.
  useEffect(() => {
    if (isOff) return;
    if (step < totalLines) {
      const t = window.setTimeout(() => setStep((s) => s + 1), step < BOOT_LINES.length ? 55 : 95);
      return () => window.clearTimeout(t);
    }
    if (login.length < loginText.length) {
      const t = window.setTimeout(() => setLogin(loginText.slice(0, login.length + 1)), login ? 70 : 260);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setIsOff(true), 650);
    return () => window.clearTimeout(t);
  }, [step, login, isOff, totalLines]);

  useEffect(() => {
    if (!isOff) return;
    const t = window.setTimeout(() => doneRef.current(), 500);
    return () => window.clearTimeout(t);
  }, [isOff, doneRef]);

  const kernel = BOOT_LINES.slice(0, Math.min(step, BOOT_LINES.length));
  const services = BOOT_SERVICES.slice(0, Math.max(0, step - BOOT_LINES.length));
  const showLogin = step >= totalLines;

  return (
    <div className={`tm-boot ${isOff ? 'is-off' : ''}`} onClick={() => setIsOff(true)} role="presentation" aria-hidden="true">
      <span className="tm-boot__skip">[ klik / tekan tombol untuk lewati ]</span>
      {kernel.map(([time, text], i) => (
        <div key={`k${i}`}>
          <span className="tm-boot__time">[{time.toFixed(6).padStart(12, ' ')}]</span> {text}
        </div>
      ))}
      {services.map((text, i) => (
        <div key={`s${i}`}>
          [ <span className="tm-boot__ok">OK</span> ] {text}
        </div>
      ))}
      {showLogin && (
        <>
          <div>&nbsp;</div>
          <div className="text-[#ffffff]">ASBRNN OS 6.11 LTS — {name}</div>
          <div>
            asbrnn login: <span className="text-[#ffffff]">{login}</span>
            {login.length < loginText.length && <span className="tm-caret" />}
          </div>
          {login.length === loginText.length && (
            <div>
              Last login: {new Date().toDateString()} from 127.0.0.1 <span className="tm-caret is-idle" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* ================================================================== */
/* A command that types itself once it scrolls into view               */
/* ================================================================== */
export const TypedCommand: React.FC<{
  text: string;
  onDone?: () => void;
  idleCaret?: boolean;
  speedMs?: number;
}> = ({ text, onDone, idleCaret = false, speedMs = 26 }) => {
  const live = useContext(TerminalLiveContext);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));
  const [started, setStarted] = useState(prefersReducedMotion);
  const doneRef = useLatest(onDone);

  useEffect(() => {
    const el = ref.current;
    if (!el || !live || started) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [live, started]);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) {
      doneRef.current?.();
      return;
    }
    const jitter = text[count] === ' ' ? speedMs * 2 : speedMs + Math.random() * speedMs;
    const t = window.setTimeout(() => setCount((c) => c + 1), jitter);
    return () => window.clearTimeout(t);
  }, [started, count, text, speedMs, doneRef]);

  // If the command text changes (e.g. a filter flag), retype only the new tail.
  const prevText = useRef(text);
  useEffect(() => {
    if (prevText.current === text) return;
    let common = 0;
    while (common < text.length && text[common] === prevText.current[common]) common++;
    prevText.current = text;
    setCount((c) => Math.min(c, common));
  }, [text]);

  const typing = started && count < text.length;
  return (
    <span ref={ref} className="tm-glow">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {(typing || (idleCaret && started)) && <span className={`tm-caret ${typing ? '' : 'is-idle'}`} />}
      </span>
    </span>
  );
};

/* ================================================================== */
/* Decrypt / scramble text                                             */
/* ================================================================== */
const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEF$%';

export const ScrambleText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  // null = settled; otherwise the in-flight scrambled frame
  const [scrambled, setScrambled] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const ref = useRef<HTMLSpanElement | null>(null);

  const run = useCallback(() => {
    if (prefersReducedMotion() || timer.current) return;
    let frame = 0;
    const frames = Math.min(18, 6 + text.length);
    timer.current = window.setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / frames) * text.length);
      setScrambled(
        text
          .split('')
          .map((ch, i) => (i < revealed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join('')
      );
      if (frame >= frames) {
        window.clearInterval(timer.current!);
        timer.current = null;
        setScrambled(null);
      }
    }, 32);
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.8 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [text, run]);

  return (
    <span ref={ref} className={className} onMouseEnter={run} aria-label={text}>
      <span aria-hidden="true">{scrambled ?? text}</span>
    </span>
  );
};

/* ================================================================== */
/* Matrix rain easter egg (runs for a few seconds, then stops)          */
/* ================================================================== */
export const MatrixRain: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const doneRef = useLatest(onDone);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const size = 16;
    const cols = Math.ceil(canvas.width / size);
    const drops = Array.from({ length: cols }, () => Math.random() * -40);
    const chars = 'アイウエオカキクケコサシスセソ0123456789ASBRNN';
    let raf = 0;
    let last = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 45) return;
      last = now;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#66ff66';
      ctx.font = `${size}px monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.97 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);
    const stop = window.setTimeout(() => doneRef.current(), 6000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(stop);
    };
  }, [doneRef]);

  return <canvas ref={canvasRef} className="tm-matrix" aria-hidden="true" />;
};

/* ================================================================== */
/* Interactive shell                                                   */
/* ================================================================== */
export interface ShellLine {
  kind: 'in' | 'out' | 'err' | 'ok';
  text: React.ReactNode;
}

export interface ShellCommandApi {
  print: (...lines: (ShellLine | string)[]) => void;
  clear: () => void;
  close: () => void;
}

export type ShellHandler = (args: string[], api: ShellCommandApi) => void;

export const TerminalShell: React.FC<{
  open: boolean;
  onClose: () => void;
  commands: Record<string, ShellHandler>;
  descriptions: Record<string, string>;
  quickCommands: string[];
  greeting: ShellLine[];
  phosphorClass?: string;
}> = ({ open, onClose, commands, descriptions, quickCommands, greeting, phosphorClass = '' }) => {
  const [lines, setLines] = useState<ShellLine[]>(greeting);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  const api = useMemo<ShellCommandApi>(
    () => ({
      print: (...out) =>
        setLines((l) => [...l, ...out.map((o) => (typeof o === 'string' ? { kind: 'out' as const, text: o } : o))]),
      clear: () => setLines([]),
      close: onClose,
    }),
    [onClose]
  );

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines, open]);

  const run = (raw: string) => {
    const cmdLine = raw.trim();
    setLines((l) => [...l, { kind: 'in', text: cmdLine }]);
    if (!cmdLine) return;
    setHistory((h) => [cmdLine, ...h.filter((x) => x !== cmdLine)].slice(0, 30));
    setHistIdx(-1);
    const [name, ...args] = cmdLine.split(/\s+/);
    const handler = commands[name.toLowerCase()];
    if (handler) handler(args, api);
    else api.print({ kind: 'err', text: `bash: ${name}: command not found — ketik 'help'` });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(history.length - 1, histIdx + 1);
      if (history[next] !== undefined) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(Math.max(-1, next));
      setInput(next >= 0 ? history[next] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(descriptions).filter((c) => c.startsWith(input.trim()));
      if (matches.length === 1) setInput(matches[0] + ' ');
      else if (matches.length > 1) api.print({ kind: 'out', text: matches.join('    ') });
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault();
      api.clear();
    }
  };

  if (!open) return null;

  return (
    <div
      className={`tm-shell ${phosphorClass}`}
      role="dialog"
      aria-label="Interactive shell"
      data-lenis-prevent
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="flex items-center justify-between px-[clamp(12px,3vw,32px)] py-2 border-b border-[#255325] text-[12px] text-[#58ca58] select-none">
        <span>
          <span className="text-[#ffffff]">guest@asbrnn</span>:~ — interactive shell
        </span>
        <div className="flex items-center gap-[1.5ch]">
          <span className="hidden sm:inline text-[#255325]">↑↓ history · tab complete · esc close</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-[1ch] border border-[#255325] text-[#66ff66] hover:bg-[#66ff66] hover:text-[#000000] cursor-pointer"
            aria-label="Tutup shell"
          >
            [x]
          </button>
        </div>
      </div>

      <div ref={logRef} className="tm-shell__log">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.kind === 'in'
                ? 'text-[#ffffff]'
                : line.kind === 'err'
                ? 'text-[#ff6666]'
                : line.kind === 'ok'
                ? 'text-[#66ff66]'
                : 'text-[#58ca58] whitespace-pre-wrap'
            }
          >
            {line.kind === 'in' ? (
              <>
                <span className="text-[#66ff66]">guest@asbrnn:~$</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
        <div className="flex items-center gap-[1ch] mt-1">
          <span className="text-[#66ff66] shrink-0">guest@asbrnn:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="tm-shell__input"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            aria-label="Ketik perintah"
          />
        </div>
      </div>

      <div className="flex gap-[1ch] overflow-x-auto px-[clamp(12px,3vw,32px)] py-2 border-t border-[#255325] text-[12px]">
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              run(cmd);
            }}
            className="shrink-0 px-[1ch] border border-[#255325] text-[#58ca58] hover:bg-[#66ff66] hover:text-[#000000] cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
