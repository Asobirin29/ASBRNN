import { useState, useEffect } from 'react';
import type { Project } from './types/portfolio';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationBar } from './components/navigation/NavigationBar';
import { HeroSection } from './components/hero/HeroSection';
import { WelcomeAnimation } from './components/hero/WelcomeAnimation';
import { EditorialProfile } from './components/profile/EditorialProfile';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { TechGrid } from './components/tech/TechGrid';
import { GithubActivitySection } from './components/activity/GithubActivitySection';
import { JourneyTimeline } from './components/journey/JourneyTimeline';
import { ContactSection } from './components/contact/ContactSection';
import { ProjectCaseStudyModal } from './components/projects/ProjectCaseStudyModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

function PortfolioSite() {
  const { isSunset } = useTheme();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useLenisSmoothScroll();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
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
        <ProjectShowcase onOpenProject={setActiveModalProject} />
        <TechGrid onOpenProject={setActiveModalProject} />
        <GithubActivitySection />
        <JourneyTimeline />
        <ContactSection />
      </main>

      <ProjectCaseStudyModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}

export function App() {
  const [page, setPage] = useState<'site' | 'admin'>(() => {
    const hash = window.location.hash;
    return hash === '#/admin' || hash === '#admin' ? 'admin' : 'site';
  });

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash;
      setPage(hash === '#/admin' || hash === '#admin' ? 'admin' : 'site');
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  // Shortcut Ctrl+Shift+A (or Cmd+Shift+A) to access admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        const isAdmin = window.location.hash === '#/admin' || window.location.hash === '#admin';
        if (isAdmin) {
          window.location.hash = '';
          setPage('site');
        } else {
          window.location.hash = '#/admin';
          setPage('admin');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goToSite = () => {
    window.location.hash = '';
    setPage('site');
  };

  return (
    <ThemeProvider>
      <PortfolioDataProvider>
        {page === 'admin' ? (
          <AdminDashboard onBack={goToSite} />
        ) : (
          <PortfolioSite />
        )}
      </PortfolioDataProvider>
    </ThemeProvider>
  );
}

export default App;
