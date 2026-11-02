import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, type MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { FlagshipSlideCard } from './FlagshipProjectParallax';
import { FilteredProjectDock } from './FilteredProjectDock';
import { ProjectGridCatalog } from './ProjectGridCatalog';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { useTheme } from '../../context/ThemeContext';
import { scrollToLenis } from '../../hooks/useLenisSmoothScroll';

interface ProjectShowcaseProps {
  onOpenProject?: (project: Project) => void;
}

interface SlideTabButtonProps {
  index: number;
  totalSlides: number;
  isCurrent: boolean;
  label: string;
  title: string;
  isSunset: boolean;
  smoothProgress: MotionValue<number>;
  onClick: () => void;
}

const SlideTabButton: React.FC<SlideTabButtonProps> = ({
  index,
  totalSlides,
  isCurrent,
  label,
  title,
  isSunset,
  smoothProgress,
  onClick
}) => {
  const step = 1 / totalSlides;
  const start = index * step;
  const end = (index + 1) * step;
  const scaleX = useTransform(smoothProgress, [start, end], [0, 1], { clamp: true });

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group/btn relative px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-mono font-black transition-all cursor-pointer flex items-center gap-1 overflow-hidden ${
        isCurrent
          ? isSunset
            ? 'bg-[#ea580c] text-white border-orange-400 shadow-[1.5px_1.5px_0px_#f97316] -translate-y-0.5'
            : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a] -translate-y-0.5'
          : isSunset
          ? 'bg-[#190f26] hover:bg-[#2e1544] text-amber-200 border-orange-500/30'
          : 'bg-[#fff9d4] hover:bg-[#faeed1] text-[#0f172a] border-[#0f172a]/40'
      }`}
      title={`Lompat ke: ${title}`}
    >
      {/* Smooth fill overlay on active slide tab */}
      <motion.div
        className={`absolute inset-0 pointer-events-none opacity-20 ${
          isSunset ? 'bg-white' : 'bg-[#0284c7]'
        }`}
        style={{ scaleX, originX: 0 }}
        transition={{ ease: 'easeOut' }}
      />

      <span className="relative z-10">{label}</span>
      {isCurrent && (
        <span className="relative z-10 hidden md:inline max-w-[70px] lg:max-w-[100px] truncate text-[9px] font-bold">
          {title}
        </span>
      )}
    </button>
  );
};

interface DynamicFlagshipSlideProps {
  project: Project;
  index: number;
  totalSlides: number;
  smoothProgress: MotionValue<number>;
  onSelectProject: (project: Project) => void;
}

const DynamicFlagshipSlide: React.FC<DynamicFlagshipSlideProps> = ({
  project,
  index,
  totalSlides,
  smoothProgress,
  onSelectProject
}) => {
  const segment = 1 / totalSlides;
  const wipeDuration = segment * 0.5;
  const wipeCenter = index * segment;
  const wipeStart = Math.max(0, wipeCenter - wipeDuration / 2);
  const wipeEnd = Math.min(1, wipeCenter + wipeDuration / 2);

  const y = useTransform(
    smoothProgress,
    index === 0 ? [0, 1] : [wipeStart, wipeEnd],
    index === 0 ? ['0%', '0%'] : ['100%', '0%'],
    { clamp: true }
  );

  return (
    <FlagshipSlideCard
      project={project}
      index={index}
      yMotion={y}
      depthLevel={(((index) % 3) + 1) as 1 | 2 | 3}
      onSelectProject={onSelectProject}
    />
  );
};

interface DynamicDockSlideProps {
  index: number;
  totalSlides: number;
  smoothProgress: MotionValue<number>;
  projects: Project[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onSelectProject: (project: Project) => void;
  isSunset: boolean;
}

const DynamicDockSlide: React.FC<DynamicDockSlideProps> = ({
  index,
  totalSlides,
  smoothProgress,
  projects,
  selectedCategory,
  onSelectCategory,
  onSelectProject,
  isSunset
}) => {
  const segment = 1 / totalSlides;
  const wipeDuration = segment * 0.5;
  const wipeCenter = index * segment;
  const wipeStart = Math.max(0, wipeCenter - wipeDuration / 2);
  const wipeEnd = Math.min(1, wipeCenter + wipeDuration / 2);

  const y = useTransform(
    smoothProgress,
    [wipeStart, wipeEnd],
    ['100%', '0%'],
    { clamp: true }
  );

  return (
    <motion.div
      style={{ y, zIndex: (index + 1) * 10 }}
      className={`absolute inset-0 w-full h-full shadow-[0_-8px_24px_rgba(15,23,42,0.35)] ${
        isSunset ? 'bg-[#1a0824]' : 'bg-[#02587a]'
      }`}
    >
      <FilteredProjectDock
        projects={projects}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onSelectProject={onSelectProject}
        slideNumber={index + 1}
      />
    </motion.div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenProject }) => {
  const { isSunset } = useTheme();
  const { projects: projectsData } = usePortfolioData();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [localActiveProject, setLocalActiveProject] = useState<Project | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const handleSelect = onOpenProject || setLocalActiveProject;
  const activeProject = onOpenProject ? null : localActiveProject;

  // Featured flagship projects; fallback to all projects if none marked featured
  const featured = projectsData.filter((p) => p.featured);
  const flagshipProjects = featured.length > 0 ? featured : projectsData.slice(0, 3);
  const totalSlides = Math.max(1, flagshipProjects.length + 1);

  // Pinning scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth inertial spring for tactile deceleration
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    mass: 0.3,
    restDelta: 0.0005
  });

  // Track active slide index accurately from scroll progress
  useEffect(() => {
    if (viewMode !== 'showcase' || totalSlides <= 1) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      let idx = 0;
      for (let i = 1; i < totalSlides; i++) {
        const center = i / totalSlides;
        if (latest >= center) {
          idx = i;
        }
      }
      setActiveSlideIndex(idx);
    });

    return () => unsubscribe();
  }, [scrollYProgress, viewMode, totalSlides]);

  // Programmatic jump to target slide without manual scrolling
  const jumpToSlide = (targetIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const startY = window.scrollY + container.getBoundingClientRect().top;
    const totalScroll = container.scrollHeight - window.innerHeight;

    let targetProgress = 0.02;
    if (targetIndex <= 0) {
      targetProgress = 0.02;
    } else if (targetIndex >= totalSlides - 1) {
      targetProgress = 0.98;
    } else {
      const segment = 1 / totalSlides;
      const wipeDuration = segment * 0.5;
      const wipeEnd = targetIndex * segment + wipeDuration / 2;
      const nextWipeStart = (targetIndex + 1) * segment - wipeDuration / 2;
      targetProgress = (wipeEnd + nextWipeStart) / 2;
    }

    const targetY = startY + totalScroll * targetProgress;
    scrollToLenis(targetY, { duration: 0.9 });
  };

  const handlePrevSlide = () => {
    const nextIdx = Math.max(0, activeSlideIndex - 1);
    jumpToSlide(nextIdx);
  };

  const handleNextSlide = () => {
    const nextIdx = Math.min(totalSlides - 1, activeSlideIndex + 1);
    jumpToSlide(nextIdx);
  };

  // Toggle view mode and ensure smooth viewport positioning
  const handleToggleMode = (newMode: 'showcase' | 'grid') => {
    setViewMode(newMode);
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        scrollToLenis(el, { offset: -70, duration: 0.7 });
      }
    }, 60);
  };

  // Build slide tabs: one for each flagship project + 1 for Indeks Proyek
  const slideTabs = [
    ...flagshipProjects.map((p, idx) => ({
      label: (idx + 1).toString().padStart(2, '0'),
      title: p.title
    })),
    {
      label: '📁',
      title: 'Indeks'
    }
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      style={
        viewMode === 'showcase'
          ? { height: `${Math.max(2, totalSlides + 0.6) * 125}vh` }
          : undefined
      }
      className={`relative scroll-mt-20 ${
        viewMode === 'showcase' ? '' : 'min-h-screen py-6 sm:py-10'
      } select-none transition-colors duration-500 ${
        isSunset ? 'bg-[#190f26]' : 'bg-[#fff9d4]'
      }`}
    >
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid-mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <ProjectGridCatalog
              projects={projectsData}
              onOpenProject={handleSelect}
              viewMode={viewMode}
              onToggleViewMode={handleToggleMode}
            />
          </motion.div>
        ) : (
          <motion.div
            key="showcase-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="sticky top-0 h-screen w-full overflow-hidden"
          >
            {/* Top Interactive Controller Bar: Mode Switcher & Quick Slide Jump */}
            <div className="absolute top-[72px] sm:top-24 inset-x-0 z-50 pointer-events-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-2">
                {/* View Mode Switcher (Left) */}
                <div
                  className={`pointer-events-auto flex items-center p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border-2 transition-all shadow-md ${
                    isSunset
                      ? 'bg-[#241335]/95 border-orange-500/40 shadow-[2.5px_2.5px_0px_#ea580c]'
                      : 'bg-[#fffdf5]/95 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('showcase')}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono font-black transition-all cursor-pointer border ${
                      isSunset
                        ? 'bg-[#ea580c] text-white border-orange-400 shadow-[1.5px_1.5px_0px_#f97316]'
                        : 'bg-[#0284c7] text-white border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a]'
                    }`}
                    title="Tampilan Pameran Parallax Bawah Laut"
                  >
                    <span>🌊</span>
                    <span className="hidden sm:inline">Pameran</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleMode('grid')}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono font-black transition-all cursor-pointer border ${
                      isSunset
                        ? 'border-transparent text-amber-200 hover:text-white'
                        : 'border-transparent text-[#0f172a] hover:text-[#0284c7]'
                    }`}
                    title="Beralih ke Mode Grid Katalog Cepat"
                  >
                    <span>🗂️</span>
                    <span className="hidden sm:inline">Katalog Grid</span>
                  </button>
                </div>

                {/* Quick Jump Slide Navigator (Right) */}
                <div
                  className={`pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border-2 transition-all ${
                    isSunset
                      ? 'bg-[#241335]/95 border-orange-500/40 shadow-[2.5px_2.5px_0px_#ea580c] sm:shadow-[3.5px_3.5px_0px_#ea580c]'
                      : 'bg-[#fffdf5]/95 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[3.5px_3.5px_0px_#0f172a]'
                  }`}
                >
                  {/* Prev Slide Button */}
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    disabled={activeSlideIndex === 0}
                    aria-label="Proyek Sebelumnya"
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      activeSlideIndex === 0
                        ? 'opacity-30 cursor-not-allowed border-transparent'
                        : isSunset
                        ? 'bg-[#351648] hover:bg-[#481c64] text-amber-300 border-orange-500/40 active:translate-y-0.5'
                        : 'bg-[#fff9d4] hover:bg-[#faeed1] text-[#0f172a] border-[#0f172a]/60 active:translate-y-0.5'
                    }`}
                    title="Proyek Sebelumnya (Prev)"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  {/* Slide Tabs */}
                  {slideTabs.map((tab, idx) => (
                    <SlideTabButton
                      key={idx}
                      index={idx}
                      totalSlides={totalSlides}
                      isCurrent={activeSlideIndex === idx}
                      label={tab.label}
                      title={tab.title}
                      isSunset={isSunset}
                      smoothProgress={smoothProgress}
                      onClick={() => jumpToSlide(idx)}
                    />
                  ))}

                  {/* Next Slide Button */}
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    disabled={activeSlideIndex >= totalSlides - 1}
                    aria-label="Proyek Berikutnya"
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      activeSlideIndex >= totalSlides - 1
                        ? 'opacity-30 cursor-not-allowed border-transparent'
                        : isSunset
                        ? 'bg-[#351648] hover:bg-[#481c64] text-amber-300 border-orange-500/40 active:translate-y-0.5'
                        : 'bg-[#fff9d4] hover:bg-[#faeed1] text-[#0f172a] border-[#0f172a]/60 active:translate-y-0.5'
                    }`}
                    title="Proyek Berikutnya (Next)"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Flagship Slide Presentation */}
            {flagshipProjects.map((p, idx) => (
              <DynamicFlagshipSlide
                key={p.id || idx}
                project={p}
                index={idx}
                totalSlides={totalSlides}
                smoothProgress={smoothProgress}
                onSelectProject={handleSelect}
              />
            ))}

            {/* Project Index Overview (Final Slide) */}
            <DynamicDockSlide
              index={flagshipProjects.length}
              totalSlides={totalSlides}
              smoothProgress={smoothProgress}
              projects={projectsData}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectProject={handleSelect}
              isSunset={isSunset}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local fallback case study modal */}
      {!onOpenProject && activeProject && (
        <ProjectCaseStudyModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={() => setLocalActiveProject(null)}
        />
      )}
    </section>
  );
};
