import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
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

  // featured flagship projects
  const flagshipProjects = projectsData.filter((p) => p.featured);

  // pinning scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // smooth inertial spring for tactile deceleration
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    mass: 0.3,
    restDelta: 0.0005
  });

  // gradual curtain wipe ranges
  const ySlide2 = useTransform(smoothProgress, [0.22, 0.36], ['100%', '0%'], { clamp: true });
  const ySlide3 = useTransform(smoothProgress, [0.47, 0.61], ['100%', '0%'], { clamp: true });
  const ySlide4 = useTransform(smoothProgress, [0.72, 0.86], ['100%', '0%'], { clamp: true });

  // graceful dimming of covered slides to prevent visual clashes
  const opacitySlide1 = useTransform(smoothProgress, [0.22, 0.36], [1, 0.2]);
  const opacitySlide2 = useTransform(smoothProgress, [0.47, 0.61], [1, 0.2]);
  const opacitySlide3 = useTransform(smoothProgress, [0.72, 0.86], [1, 0.2]);

  // progress bar scales for indicator tabs
  const scaleX0 = useTransform(smoothProgress, [0, 0.25], [0, 1], { clamp: true });
  const scaleX1 = useTransform(smoothProgress, [0.25, 0.5], [0, 1], { clamp: true });
  const scaleX2 = useTransform(smoothProgress, [0.5, 0.75], [0, 1], { clamp: true });
  const scaleX3 = useTransform(smoothProgress, [0.75, 1.0], [0, 1], { clamp: true });
  const progressScales = [scaleX0, scaleX1, scaleX2, scaleX3];

  // Track active slide index accurately from scroll progress
  useEffect(() => {
    if (viewMode !== 'showcase') return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.22) {
        setActiveSlideIndex(0);
      } else if (latest < 0.47) {
        setActiveSlideIndex(1);
      } else if (latest < 0.72) {
        setActiveSlideIndex(2);
      } else {
        setActiveSlideIndex(3);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, viewMode]);

  // Programmatic jump to target slide without manual scrolling
  const jumpToSlide = (targetIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const startY = window.scrollY + container.getBoundingClientRect().top;
    const totalScroll = container.scrollHeight - window.innerHeight;

    // Progress target points for each slide
    const progressTargets = [0.02, 0.36, 0.61, 0.95];
    const targetProgress = progressTargets[targetIndex] ?? 0;
    const targetY = startY + totalScroll * targetProgress;

    scrollToLenis(targetY, { duration: 0.9 });
  };

  const handlePrevSlide = () => {
    const nextIdx = Math.max(0, activeSlideIndex - 1);
    jumpToSlide(nextIdx);
  };

  const handleNextSlide = () => {
    const nextIdx = Math.min(3, activeSlideIndex + 1);
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

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`relative scroll-mt-20 ${
        viewMode === 'showcase' ? 'h-[560vh]' : 'min-h-screen py-6 sm:py-10'
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

                  {/* Slide Tabs: 01, 02, 03, 📁 */}
                  {[0, 1, 2, 3].map((idx) => {
                    const isCurrent = activeSlideIndex === idx;
                    const slideTitles = [
                      flagshipProjects[0]?.title || '01',
                      flagshipProjects[1]?.title || '02',
                      flagshipProjects[2]?.title || '03',
                      'Indeks Proyek'
                    ];
                    const shortLabels = ['01', '02', '03', '📁'];

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => jumpToSlide(idx)}
                        className={`group/btn relative px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-mono font-black transition-all cursor-pointer flex items-center gap-1 overflow-hidden ${
                          isCurrent
                            ? isSunset
                              ? 'bg-[#ea580c] text-white border-orange-400 shadow-[1.5px_1.5px_0px_#f97316] -translate-y-0.5'
                              : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a] -translate-y-0.5'
                            : isSunset
                            ? 'bg-[#190f26] hover:bg-[#2e1544] text-amber-200 border-orange-500/30'
                            : 'bg-[#fff9d4] hover:bg-[#faeed1] text-[#0f172a] border-[#0f172a]/40'
                        }`}
                        title={`Lompat ke: ${slideTitles[idx]}`}
                      >
                        {/* Smooth fill overlay on active slide tab */}
                        <motion.div
                          className={`absolute inset-0 pointer-events-none opacity-20 ${
                            isSunset ? 'bg-white' : 'bg-[#0284c7]'
                          }`}
                          style={{ scaleX: progressScales[idx], originX: 0 }}
                          transition={{ ease: 'easeOut' }}
                        />

                        <span className="relative z-10">{shortLabels[idx]}</span>
                        {isCurrent && (
                          <span className="relative z-10 hidden md:inline max-w-[70px] lg:max-w-[100px] truncate text-[9px] font-bold">
                            {idx === 3 ? 'Indeks' : slideTitles[idx]}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Next Slide Button */}
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    disabled={activeSlideIndex === 3}
                    aria-label="Proyek Berikutnya"
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      activeSlideIndex === 3
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

            {/* flagship slide presentation */}
            {flagshipProjects[0] && (
              <FlagshipSlideCard
                project={flagshipProjects[0]}
                index={0}
                yMotion="0%"
                opacityMotion={opacitySlide1}
                depthLevel={1}
                onSelectProject={handleSelect}
              />
            )}

            {flagshipProjects[1] && (
              <FlagshipSlideCard
                project={flagshipProjects[1]}
                index={1}
                yMotion={ySlide2}
                opacityMotion={opacitySlide2}
                depthLevel={2}
                onSelectProject={handleSelect}
              />
            )}

            {flagshipProjects[2] && (
              <FlagshipSlideCard
                project={flagshipProjects[2]}
                index={2}
                yMotion={ySlide3}
                opacityMotion={opacitySlide3}
                depthLevel={3}
                onSelectProject={handleSelect}
              />
            )}

            {/* project index overview */}
            <motion.div
              style={{ y: ySlide4, zIndex: 40 }}
              className={`absolute inset-0 w-full h-full shadow-[0_-8px_24px_rgba(15,23,42,0.35)] ${
                isSunset ? 'bg-[#1a0824]' : 'bg-[#02587a]'
              }`}
            >
              <FilteredProjectDock
                projects={projectsData}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectProject={handleSelect}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* local fallback case study modal */}
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
