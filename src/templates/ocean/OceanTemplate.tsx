import React, { useState } from 'react';
import { useLenisSmoothScroll } from '../../hooks/useLenisSmoothScroll';
import { useTheme } from '../../context/ThemeContext';
import { NavigationBar } from '../../components/navigation/NavigationBar';
import { HeroSection } from '../../components/hero/HeroSection';
import { WelcomeAnimation } from '../../components/hero/WelcomeAnimation';
import { EditorialProfile } from '../../components/profile/EditorialProfile';
import { ProjectShowcase } from '../../components/projects/ProjectShowcase';
import { TechGrid } from '../../components/tech/TechGrid';
import { GithubActivitySection } from '../../components/activity/GithubActivitySection';
import { JourneyTimeline } from '../../components/journey/JourneyTimeline';
import { ContactSection } from '../../components/contact/ContactSection';
import type { TemplateComponentProps } from '../types';

export const OceanTemplate: React.FC<TemplateComponentProps> = ({ onOpenProject }) => {
  const { isSunset } = useTheme();
  const [showWelcome, setShowWelcome] = useState(true);

  useLenisSmoothScroll();

  return (
    <div
      className={`ocean-root min-h-screen transition-colors duration-500 ${
        isSunset
          ? 'bg-[#190f26] text-[#f8fafc] selection:bg-[#ea580c]'
          : 'bg-[#fff9d4] text-[#0f172a] selection:bg-[#0284c7]'
      } selection:text-white`}
    >
      {showWelcome && (
        <WelcomeAnimation onComplete={() => setShowWelcome(false)} />
      )}

      <NavigationBar />

      <main className="relative">
        <HeroSection />
        <EditorialProfile />
        <ProjectShowcase onOpenProject={onOpenProject} />
        <TechGrid onOpenProject={onOpenProject} />
        <GithubActivitySection />
        <JourneyTimeline />
        <ContactSection />
      </main>
    </div>
  );
};

export default OceanTemplate;

