import { useState, useEffect } from 'react';
import type { Project } from './types/portfolio';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
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
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useLenisSmoothScroll();

  return (
    <div className="min-h-screen bg-[#fff9d4] text-[#0f172a] selection:bg-[#0284c7] selection:text-white">
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
    return window.location.hash === '#/admin' ? 'admin' : 'site';
  });

  useEffect(() => {
    const handler = () => {
      setPage(window.location.hash === '#/admin' ? 'admin' : 'site');
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const goToAdmin = () => {
    window.location.hash = '#/admin';
    setPage('admin');
  };

  const goToSite = () => {
    window.location.hash = '';
    setPage('site');
  };

  return (
    <PortfolioDataProvider>
      {page === 'admin' ? (
        <AdminDashboard onBack={goToSite} />
      ) : (
        <>
          <PortfolioSite />
          {/* Floating admin button */}
          <button
            onClick={goToAdmin}
            className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white shadow-2xl border border-[#334155] flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 group"
            title="Admin Dashboard"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </>
      )}
    </PortfolioDataProvider>
  );
}

export default App;
