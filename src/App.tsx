import { useState, useEffect } from 'react';
import type { Project } from './types/portfolio';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectCaseStudyModal } from './components/projects/ProjectCaseStudyModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {
  OceanTemplate,
  ModernTemplate,
  RetroTemplate,
  CyberTemplate,
  DreamyTemplate,
  BentoTemplate,
} from './templates';

function PortfolioSite() {
  const { selectedTemplate } = usePortfolioData();
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const renderActiveTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate onOpenProject={setActiveModalProject} />;
      case 'retro':
        return <RetroTemplate onOpenProject={setActiveModalProject} />;
      case 'dreamy':
        return <DreamyTemplate onOpenProject={setActiveModalProject} />;
      case 'bento':
        return <BentoTemplate onOpenProject={setActiveModalProject} />;
      case 'cyber':
        return <CyberTemplate onOpenProject={setActiveModalProject} />;
      case 'ocean':
      default:
        return <OceanTemplate onOpenProject={setActiveModalProject} />;
    }
  };

  return (
    <>
      {renderActiveTemplate()}

      <ProjectCaseStudyModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </>
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
