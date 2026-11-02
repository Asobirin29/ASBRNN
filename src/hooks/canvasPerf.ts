/**
 * Shared performance knobs for the Ocean template's canvases.
 * Phones get 1x pixel density and ignore the resize events that fire
 * every time the mobile URL bar slides in or out while scrolling.
 */

let lowPowerCache: boolean | null = null;

export function isLowPowerDevice(): boolean {
  if (lowPowerCache !== null) return lowPowerCache;
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches === true;
  const narrow = window.innerWidth < 768;
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  lowPowerCache = coarse || narrow || fewCores;
  return lowPowerCache;
}

/** Device pixel ratio to render canvases at: 1 on phones, capped at 1.75 elsewhere. */
export function getCanvasDpr(): number {
  if (typeof window === 'undefined') return 1;
  return isLowPowerDevice() ? 1 : Math.min(window.devicePixelRatio || 1, 1.75);
}

/**
 * Returns a predicate that is true only for resizes worth reallocating a canvas for:
 * any width change, or a height change bigger than the mobile URL bar.
 */
export function createResizeFilter(heightTolerance = 160) {
  let lastW = -1;
  let lastH = -1;
  return (width: number, height: number): boolean => {
    if (width === lastW && Math.abs(height - lastH) <= heightTolerance) return false;
    lastW = width;
    lastH = height;
    return true;
  };
}

/** Debounced window resize listener; returns the cleanup function. */
export function onDebouncedResize(handler: () => void, delayMs = 150): () => void {
  let timer: number | undefined;
  const listener = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(handler, delayMs);
  };
  window.addEventListener('resize', listener);
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener('resize', listener);
  };
}
