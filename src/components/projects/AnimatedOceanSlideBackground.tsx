import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  renderWaterBody,
  renderSandLayers,
  renderWaterWaves,
  renderBubbles
} from './oceanEnvironmentRenderers';
import { renderCreaturesByDepth } from './oceanCreatureRenderers';

interface AnimatedOceanSlideBackgroundProps {
  depthLevel: 1 | 2 | 3 | 4;
}

export const AnimatedOceanSlideBackground: React.FC<AnimatedOceanSlideBackgroundProps> = ({
  depthLevel
}) => {
  const { isSunset } = useTheme();
  const isSunsetRef = useRef(isSunset);
  isSunsetRef.current = isSunset;

  useEffect(() => {
    isSunsetRef.current = isSunset;
  }, [isSunset]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let isRunning = true;
    let isVisible = false;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!isRunning || !ctx || !canvas || !isVisible) return;
      const width = canvas.width;
      const height = canvas.height;
      const sunset = isSunsetRef.current;

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // water background with sunset support
      renderWaterBody(ctx, width, height, depthLevel, sunset);

      // sand layers with sunset support
      const { waterMinY, waterMaxY } = renderSandLayers(ctx, width, height, depthLevel, time, sunset);

      // surface waves with sunset support
      renderWaterWaves(ctx, width, waterMinY, waterMaxY, time, sunset);

      // marine creatures by depth
      renderCreaturesByDepth(ctx, depthLevel, width, height, time, waterMinY, waterMaxY);

      // bubbles with sunset support
      renderBubbles(ctx, width, waterMinY, waterMaxY, time, sunset);

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !isVisible) {
          isVisible = true;
          if (!animId) {
            animId = requestAnimationFrame(render);
          }
        } else if (!visible && isVisible) {
          isVisible = false;
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [depthLevel]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
