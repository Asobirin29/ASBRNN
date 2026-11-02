import { useEffect, useCallback } from 'react';

/**
 * Global click-to-sparkle effect.
 * When user clicks anywhere, spawns 5-8 star sparkle particles
 * that float upward and fade out. Midnight Rose gold/rose palette.
 */
export function useSparkleOnClick() {
  const handleClick = useCallback((e: MouseEvent) => {
    const container = document.getElementById('dreamy-sparkle-container');
    if (!container) return;

    const sparkleCount = 5 + Math.floor(Math.random() * 4);
    const emojis = ['✦', '✧', '⋆', '✶', '✴', '❋', '✸'];
    const colors = ['#d4a574', '#ffd1dc', '#c9b1ff', '#ffe5b4', '#e8b4b8', '#ffecd2'];

    for (let i = 0; i < sparkleCount; i++) {
      const el = document.createElement('span');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position: absolute;
        pointer-events: none;
        user-select: none;
        font-size: ${10 + Math.random() * 14}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 1;
        z-index: 99990;
        text-shadow: 0 0 6px currentColor;
        transform: translate(-50%, -50%) scale(0.5);
        transition: none;
      `;

      container.appendChild(el);

      const dx = (Math.random() - 0.5) * 80;
      const dy = -30 - Math.random() * 60;
      const rot = (Math.random() - 0.5) * 90;

      requestAnimationFrame(() => {
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot}deg) scale(1.2)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 900);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);
}

/** Container element for sparkle particles. Mount once at the template root. */
export function SparkleContainer() {
  return (
    <div
      id="dreamy-sparkle-container"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 99990 }}
    />
  );
}

