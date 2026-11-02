import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export const isFinePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches === true;

/**
 * Adds `inClass` to every element matching `selector` inside `rootRef` once it scrolls into view.
 * The root gets `readyClass` so content stays visible when JS is unavailable.
 */
export function useRevealOnScroll(
  rootRef: RefObject<HTMLElement | null>,
  selector: string,
  inClass: string,
  readyClass: string,
  deps: unknown[] = []
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add(inClass));
      return;
    }

    root.classList.add(readyClass);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(inClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => {
      if (!el.classList.contains(inClass)) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Counts from 0 to `target` once the returned ref enters the viewport. */
export function useCountUp<T extends HTMLElement>(target: number, durationMs = 900) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / durationMs);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);

  return { ref, value };
}

/** Intros play once per browser session; read with `shouldPlayIntro`, record with `markIntroPlayed`. */
export function shouldPlayIntro(key: string): boolean {
  if (prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(key);
  } catch {
    return true;
  }
}

export function markIntroPlayed(key: string): void {
  try {
    sessionStorage.setItem(key, '1');
  } catch {
    // Storage blocked: the intro simply plays again next time.
  }
}
