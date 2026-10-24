import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface OceanHeroHandle {
  triggerSplash: (x: number, y: number, intensity?: number) => void;
  triggerRipple: (x: number, y: number, size?: number) => void;
}

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export interface OceanHeroCanvasProps {
  className?: string;
  isSunset?: boolean;
}

export const OceanHeroCanvas = forwardRef<OceanHeroHandle, OceanHeroCanvasProps>(
  ({ className = '', isSunset: propSunset }, ref) => {
    const { isSunset: contextSunset } = useTheme();
    const isSunset = propSunset !== undefined ? propSunset : contextSunset;
    const isSunsetRef = useRef(isSunset);
    isSunsetRef.current = isSunset;

    useEffect(() => {
      isSunsetRef.current = isSunset;
    }, [isSunset]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dropletsRef = useRef<SplashDroplet[]>([]);
    const ripplesRef = useRef<WaterRipple[]>([]);
    const animRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);

    const triggerSplash = (clientX: number, clientY: number, intensity: number = 1) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (y > rect.height * 0.70) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.min(260, rect.width * 0.45) * Math.max(0.7, intensity),
        alpha: 0.95,
        speed: 3.6 * Math.max(0.6, intensity)
      });

      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.min(180, rect.width * 0.3) * Math.max(0.7, intensity),
        alpha: 0.7,
        speed: 2.2 * Math.max(0.6, intensity)
      });

      const count = Math.floor(32 * Math.min(2.5, intensity));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = (3.2 + Math.random() * 6.5) * Math.min(2, intensity);
        dropletsRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed * 0.85,
          vy: -Math.abs(Math.sin(angle) * speed * 1.5) - 3.5 * intensity,
          radius: 1.8 + Math.random() * 3.0,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.02,
          gravity: 0.28
        });
      }
    };

    const triggerRipple = (clientX: number, clientY: number, size: number = 75) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (y > rect.height * 0.70) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: size,
        alpha: 0.55,
        speed: 1.9
      });
    };

    useImperativeHandle(ref, () => ({
      triggerSplash,
      triggerRipple
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let isRunning = true;

      let isVisible = true;

      const handleResize = () => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          if (visible && !isVisible) {
            isVisible = true;
            if (!animRef.current) {
              animRef.current = requestAnimationFrame(render);
            }
          } else if (!visible && isVisible) {
            isVisible = false;
            if (animRef.current) {
              cancelAnimationFrame(animRef.current);
              animRef.current = null;
            }
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);

      const render = () => {
        if (!isRunning || !canvas || !isVisible) return;
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.014;
        const t = timeRef.current;

        const shoreBaseY = height * 0.68;
        const tidalCycle = (Math.sin(t * 0.22) + 1) * 0.5;
        const tideAmplitude = 18;

        const getTideY = (x: number) => {
          return shoreBaseY + tidalCycle * tideAmplitude + Math.sin(x * 0.0045 + t * 0.5) * 8 + Math.cos(x * 0.009 - t * 0.3) * 4;
        };

        const sunset = isSunsetRef.current;

        if (sunset) {
          // Rich Twilight Sky & Sunset Ocean Gradient
          const oceanGrad = ctx.createLinearGradient(0, 0, 0, shoreBaseY);
          oceanGrad.addColorStop(0, '#1c1033');    // deep violet dusk sky
          oceanGrad.addColorStop(0.25, '#4a154b'); // rich magenta twilight
          oceanGrad.addColorStop(0.55, '#881337'); // crimson red sunset glow
          oceanGrad.addColorStop(0.78, '#ea580c'); // vibrant sunset orange
          oceanGrad.addColorStop(1, '#f59e0b');    // warm golden water near shore
          ctx.fillStyle = oceanGrad;
          ctx.fillRect(0, 0, width, height);

          // Glowing Sunset Sun Orb
          const sunX = width * 0.5;
          const sunY = shoreBaseY * 0.38;
          const sunRadius = Math.min(width, height) * 0.088;

          // Sunset Sun outer atmospheric glow
          const sunGlow = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 4.2);
          sunGlow.addColorStop(0, 'rgba(254, 215, 170, 0.55)');
          sunGlow.addColorStop(0.3, 'rgba(251, 146, 60, 0.32)');
          sunGlow.addColorStop(0.65, 'rgba(234, 88, 12, 0.12)');
          sunGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
          ctx.fillStyle = sunGlow;
          ctx.fillRect(0, 0, width, height);

          // Sun core
          const sunCore = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
          sunCore.addColorStop(0, '#ffffff');
          sunCore.addColorStop(0.35, '#fef08a');
          sunCore.addColorStop(0.75, '#f97316');
          sunCore.addColorStop(1, 'rgba(234, 88, 12, 0.95)');
          ctx.beginPath();
          ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
          ctx.fillStyle = sunCore;
          ctx.fill();

          // Golden Sunbeam Shimmer / Specular reflection path across water surface
          ctx.save();
          for (let y = sunY + sunRadius * 0.65; y < shoreBaseY; y += 8) {
            const progress = (y - (sunY + sunRadius * 0.65)) / (shoreBaseY - (sunY + sunRadius * 0.65));
            const beamWidth = sunRadius * (1.1 + progress * 4.0);
            const waveShift = Math.sin(y * 0.045 + t * 2.2) * (12 * progress);
            const barWidth = beamWidth * (0.6 + Math.sin(y * 0.12 + t * 3.2) * 0.4);
            ctx.beginPath();
            ctx.ellipse(sunX + waveShift, y, barWidth, 1.8, 0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(254, 240, 138, ${0.46 * (1 - progress * 0.35)})`;
            ctx.fill();
          }
          ctx.restore();

          // Sunset warm embers floating gently in evening breeze
          ctx.save();
          for (let i = 0; i < 12; i++) {
            const emberX = (width * 0.08 * i + Math.sin(t * 0.3 + i * 2) * 40 + width) % width;
            const emberY = (height * 0.55 + Math.cos(t * 0.2 + i * 1.5) * 60 + height) % height;
            ctx.beginPath();
            ctx.arc(emberX, emberY, 1.2 + Math.sin(t * 2 + i) * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(254, 215, 170, ${0.4 + Math.sin(t * 3 + i) * 0.3})`;
            ctx.fill();
          }
          ctx.restore();
        } else {
          // Daylight Bright Ocean
          const oceanGrad = ctx.createLinearGradient(0, 0, 0, shoreBaseY);
          oceanGrad.addColorStop(0, '#02587a');
          oceanGrad.addColorStop(0.35, '#0284c7');
          oceanGrad.addColorStop(0.70, '#0ea5e9');
          oceanGrad.addColorStop(1, '#38bdf8');
          ctx.fillStyle = oceanGrad;
          ctx.fillRect(0, 0, width, height);

          ctx.save();
          ctx.globalAlpha = 0.07;
          ctx.fillStyle = '#fff9d4';
          for (let i = 0; i < 4; i++) {
            const patchX = (width * 0.25 * i + Math.sin(t * 0.15 + i) * 20) % width;
            const patchY = height * 0.32 + (i % 2) * (height * 0.12);
            ctx.beginPath();
            ctx.ellipse(patchX, patchY, 120, 45, Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        const wave1Y = height * 0.26;
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const cy = wave1Y + Math.sin(x * 0.005 + t * 0.45) * 12 + Math.cos(x * 0.009 - t * 0.3) * 5;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = sunset ? 'rgba(254, 215, 170, 0.6)' : 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();

        const wave2Y = height * 0.45;
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const cy = wave2Y + Math.sin(x * 0.006 + t * 0.55 + 1.5) * 14 + Math.sin(x * 0.012 - t * 0.25) * 6;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = sunset ? 'rgba(253, 186, 116, 0.8)' : 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, getTideY(0));
        for (let x = 0; x <= width; x += 6) {
          ctx.lineTo(x, getTideY(x));
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = sunset ? '#190f26' : '#fff9d4';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const cy = getTideY(x);
          if (x === 0) ctx.moveTo(x, cy + 2);
          else ctx.lineTo(x, cy + 2);
        }
        ctx.strokeStyle = sunset ? '#4a154b' : '#e5dbae';
        ctx.lineWidth = 4.0;
        ctx.stroke();

        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const cy = getTideY(x);
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = sunset ? 'rgba(254, 240, 138, 0.96)' : 'rgba(255, 255, 255, 0.98)';
        ctx.lineWidth = 3.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        for (let x = 6; x < width; x += 20) {
          const cy = getTideY(x);
          const bubbleSpread = (Math.sin(x * 0.06 + t * 0.8) + 1) * 3 + 1;
          ctx.beginPath();
          ctx.arc(x + Math.sin(t * 0.8 + x) * 2, cy + bubbleSpread, 1.6 + Math.sin(x * 0.3) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = sunset ? 'rgba(254, 240, 138, 0.92)' : 'rgba(255, 255, 255, 0.92)';
          ctx.fill();
        }
        ctx.restore();

        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += r.speed;
          r.alpha -= 0.012;

          if (r.alpha <= 0 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.42, 0, 0, Math.PI * 2);
          ctx.strokeStyle = sunset
            ? `rgba(251, 146, 60, ${r.alpha * 0.95})`
            : `rgba(255, 255, 255, ${r.alpha * 0.95})`;
          ctx.lineWidth = 2.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius * 0.68, r.radius * 0.28, 0, 0, Math.PI * 2);
          ctx.strokeStyle = sunset
            ? `rgba(253, 230, 138, ${r.alpha * 0.8})`
            : `rgba(103, 232, 249, ${r.alpha * 0.75})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
          ctx.restore();
        }

        for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
          const d = dropletsRef.current[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += d.gravity;
          d.alpha -= d.decay;

          if (d.alpha <= 0) {
            dropletsRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
          ctx.fill();
          ctx.restore();
        }

        animRef.current = requestAnimationFrame(render);
      };

      animRef.current = requestAnimationFrame(render);

      return () => {
        isRunning = false;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
      };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (Math.random() < 0.16) {
        triggerRipple(e.clientX, e.clientY, 65);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      triggerSplash(e.clientX, e.clientY, 1.4);
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`w-full h-full block cursor-pointer select-none ${className}`}
      />
    );
  }
);

OceanHeroCanvas.displayName = 'OceanHeroCanvas';
