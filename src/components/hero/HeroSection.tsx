import React, { useRef } from 'react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { OceanHeroCanvas } from './OceanHeroCanvas';
import type { OceanHeroHandle } from './OceanHeroCanvas';
import { HeroPhysicsStage } from './HeroPhysicsStage';
import type { HeroPhysicsStageHandle } from './HeroPhysicsStage';
import { BikiniIsland } from './BikiniIsland';
import { SwimmingShark } from './SwimmingShark';
import { SpongeBobHero } from './SpongeBobHero';
import { BeachCrab } from './BeachCrab';
import type { BeachCrabHandle } from './BeachCrab';
import { BeachDecorations } from './BeachDecorations';
import { TactileButton } from '../ui/TactileButton';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useTheme } from '../../context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { profile: profileData } = usePortfolioData();
  const { isSunset } = useTheme();
  const oceanRef = useRef<OceanHeroHandle | null>(null);
  const stageRef = useRef<HeroPhysicsStageHandle | null>(null);
  const crabRef = useRef<BeachCrabHandle | null>(null);

  const collisionCooldownRef = useRef<boolean>(false);

  const handleSplash = (clientX: number, clientY: number, intensity: number) => {
    if (oceanRef.current) {
      oceanRef.current.triggerSplash(clientX, clientY, intensity);
    }
  };

  const handleRipple = (clientX: number, clientY: number, size?: number) => {
    if (oceanRef.current) {
      oceanRef.current.triggerRipple(clientX, clientY, size);
    }
  };

  const checkCollisionWithCrab = (entityRect: DOMRect) => {
    if (collisionCooldownRef.current || !crabRef.current) return;
    const crabRect = crabRef.current.getCrabRect();
    if (!crabRect) return;

    const entityCenterX = entityRect.left + entityRect.width / 2;
    const entityCenterY = entityRect.top + entityRect.height / 2;
    const crabCenterX = crabRect.left + crabRect.width / 2;
    const crabCenterY = crabRect.top + crabRect.height / 2;

    const dx = Math.abs(entityCenterX - crabCenterX);
    const dy = Math.abs(entityCenterY - crabCenterY);

    if (dx < 70 && dy < 55) {
      collisionCooldownRef.current = true;
      crabRef.current.triggerStun(entityCenterX < crabCenterX ? 'right' : 'left');

      setTimeout(() => {
        collisionCooldownRef.current = false;
      }, 3000);
    }
  };

  const handleSharkDrop = (clientX: number, clientY: number, velocity: number, sharkRect?: DOMRect) => {
    if (sharkRect) {
      checkCollisionWithCrab(sharkRect);
    }

    if (stageRef.current) {
      stageRef.current.handleDuckDrop(clientX, clientY, velocity);
    } else {
      handleSplash(clientX, clientY, velocity);
    }
  };

  const handleSharkSwim = (sharkX: number, sharkY: number) => {
    if (stageRef.current) {
      stageRef.current.handleDuckSwim(sharkX, sharkY);
    } else {
      handleRipple(sharkX, sharkY, 45);
    }
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between pt-16 pb-10 overflow-hidden select-none">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <OceanHeroCanvas key={isSunset ? 'sunset' : 'day'} isSunset={isSunset} ref={oceanRef} />
      </div>

      {/* Bikini Atoll Island in Horizon & Sky Flowers */}
      <BikiniIsland onIslandClick={(x, y) => handleRipple(x, y, 50)} />

      {/* Swimming Shark Patrol */}
      <SwimmingShark
        onSharkDrop={handleSharkDrop}
        onSharkSwim={handleSharkSwim}
        onSharkSplash={(x, y) => handleSplash(x, y, 1.4)}
        onSharkWaddle={checkCollisionWithCrab}
      />

      {/* SpongeBob SquarePants on the Beach / Water */}
      <SpongeBobHero
        onSplash={handleSplash}
        onRipple={handleRipple}
        onCrabCollision={checkCollisionWithCrab}
      />

      {/* Volleyball Playing Crab */}
      <BeachCrab ref={crabRef} />

      <BeachDecorations />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center -translate-y-16 sm:-translate-y-24">
        <div className="w-full flex flex-col items-center text-center">
          <HeroPhysicsStage
            ref={stageRef}
            onSplash={handleSplash}
            onRipple={handleRipple}
          />

          <p className="mt-3 sm:mt-4 max-w-xl text-center text-xs sm:text-base text-[#f8fafc] font-medium leading-relaxed drop-shadow-md px-2">
            {profileData.tagline || 'Full-Stack & Mobile Developer'}. Membangun platform web skalabel, aplikasi mobile, dan infrastruktur modern.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 px-2">
            <TactileButton
              variant="primary"
              onClick={handleScrollToProjects}
              icon={<ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            >
              Lihat Proyek
            </TactileButton>

            <a
              href="/cv.pdf"
              download="cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5 ${
                isSunset
                  ? 'bg-[#2a133d] hover:bg-[#3d1858] text-[#f8fafc] border border-[#f97316]/50 hover:border-amber-300 shadow-[0_4px_16px_rgba(234,88,12,0.25)]'
                  : 'bg-[#0d2844] hover:bg-[#123559] text-[#f8fafc] border border-[#224c75] hover:border-[#dfcca8]/60 shadow-md'
              }`}
            >
              <Download className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSunset ? 'text-amber-400' : 'text-[#38bdf8]'}`} />
              <span>Download CV</span>
            </a>

            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5 ${
                isSunset
                  ? 'bg-[#2a133d] hover:bg-[#3d1858] text-[#f8fafc] border border-[#f97316]/50 hover:border-amber-300 shadow-[0_4px_16px_rgba(234,88,12,0.25)]'
                  : 'bg-[#0d2844] hover:bg-[#123559] text-[#f8fafc] border border-[#224c75] hover:border-[#dfcca8]/60 shadow-md'
              }`}
            >
              <span>GitHub</span>
              <ExternalLink className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSunset ? 'text-orange-300' : 'text-[#dfcca8]'}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
