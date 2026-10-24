import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  Camera,
  ArrowUpRight,
  FolderGit2
} from 'lucide-react';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

interface ProjectGridCatalogProps {
  projects: Project[];
  onOpenProject?: (project: Project) => void;
  viewMode: 'showcase' | 'grid';
  onToggleViewMode: (mode: 'showcase' | 'grid') => void;
}

export const ProjectGridCatalog: React.FC<ProjectGridCatalogProps> = ({
  projects,
  onOpenProject,
  viewMode,
  onToggleViewMode
}) => {
  const { isSunset } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: projects.length,
      fullstack: projects.filter((p) => p.category === 'fullstack').length,
      mobile: projects.filter((p) => p.category === 'mobile').length
    };
  }, [projects]);

  // Filtered projects by category and search term
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === 'all' ? true : project.category === selectedCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const inTitle = project.title.toLowerCase().includes(query);
      const inSubtitle = project.subtitle?.toLowerCase().includes(query) ?? false;
      const inSummary = project.summary?.toLowerCase().includes(query) ?? false;
      const inRole = project.role?.toLowerCase().includes(query) ?? false;
      const inStack = project.stack.some((tech) => tech.toLowerCase().includes(query));

      return inTitle || inSubtitle || inSummary || inRole || inStack;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Top Header & View Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-dashed transition-colors duration-500 border-[#0f172a]/20 dark:border-orange-500/20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[11px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-lg border-2 inline-flex items-center gap-1.5 ${
                  isSunset
                    ? 'bg-[#ea580c] text-white border-orange-400 shadow-[2px_2px_0px_#f97316]'
                    : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>01 // KATALOG &amp; INDEKS PORTOFOLIO</span>
              </span>
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  isSunset
                    ? 'bg-[#221033] text-amber-300 border-orange-500/30'
                    : 'bg-[#fffdf5] text-[#0284c7] border-[#0284c7]/40'
                }`}
              >
                {filteredProjects.length} Proyek Aktif
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-black tracking-tight ${
                isSunset ? 'text-white' : 'text-[#0f172a]'
              }`}
            >
              Eksplorasi Lengkap Seluruh Proyek
            </h2>
            <p
              className={`text-xs sm:text-sm font-medium mt-1 max-w-2xl ${
                isSunset ? 'text-slate-300' : 'text-[#475569]'
              }`}
            >
              Telusuri semua aplikasi web &amp; mobile yang telah direkayasa. Gunakan filter atau pencarian untuk menemukan studi kasus spesifik.
            </p>
          </div>

          {/* View Mode Switcher: Showcase vs Grid */}
          <div
            className={`flex items-center p-1.5 rounded-2xl border-2 self-start md:self-auto shrink-0 transition-all ${
              isSunset
                ? 'bg-[#251238] border-orange-500/40 shadow-[3px_3px_0px_#ea580c]'
                : 'bg-[#fffdf5] border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
            }`}
          >
            <button
              type="button"
              onClick={() => onToggleViewMode('showcase')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-black transition-all cursor-pointer border-2 ${
                viewMode === 'showcase'
                  ? isSunset
                    ? 'bg-[#ea580c] text-white border-orange-400 shadow-[2px_2px_0px_#f97316]'
                    : 'bg-[#0284c7] text-white border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                  : isSunset
                  ? 'bg-transparent text-amber-200 border-transparent hover:bg-white/5'
                  : 'bg-transparent text-[#0f172a] border-transparent hover:bg-black/5'
              }`}
              title="Beralih ke Mode Pameran Parallax Bawah Laut"
            >
              <span className="text-sm">🌊</span>
              <span>Mode Pameran</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-black transition-all cursor-pointer border-2 ${
                viewMode === 'grid'
                  ? isSunset
                    ? 'bg-[#ea580c] text-white border-orange-400 shadow-[2px_2px_0px_#f97316]'
                    : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                  : isSunset
                  ? 'bg-transparent text-amber-200 border-transparent hover:bg-white/5'
                  : 'bg-transparent text-[#0f172a] border-transparent hover:bg-black/5'
              }`}
              title="Beralih ke Mode Grid Katalog Cepat"
            >
              <span className="text-sm">🗂️</span>
              <span>Mode Grid</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all' as ProjectCategory, label: 'Semua Proyek', icon: '🌟', count: categoryCounts.all },
              { id: 'fullstack' as ProjectCategory, label: 'Full-Stack Web', icon: '🌐', count: categoryCounts.fullstack },
              { id: 'mobile' as ProjectCategory, label: 'Mobile Flutter', icon: '📱', count: categoryCounts.mobile }
            ].map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-black transition-all cursor-pointer border-2 ${
                    isSelected
                      ? isSunset
                        ? 'bg-[#ea580c] text-white border-orange-400 shadow-[2.5px_2.5px_0px_#f97316] -translate-y-0.5'
                        : 'bg-[#0284c7] text-white border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] -translate-y-0.5'
                      : isSunset
                      ? 'bg-[#221033] hover:bg-[#2e1544] text-amber-200 border-orange-500/40 shadow-[1.5px_1.5px_0px_#ea580c]'
                      : 'bg-[#fffdf5] hover:bg-[#fff9d4] text-[#0f172a] border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/30 text-white'
                        : isSunset
                        ? 'bg-[#180824] text-amber-300 border border-orange-500/30'
                        : 'bg-[#fff9d4] text-[#0f172a] border border-[#0f172a]/30'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-80">
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                isSunset ? 'text-amber-400' : 'text-[#8c6239]'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek, teknologi (Laravel, Flutter)..."
              className={`w-full pl-10 pr-9 py-2 rounded-xl text-xs font-mono font-bold border-2 outline-none transition-all ${
                isSunset
                  ? 'bg-[#221033] text-white border-orange-500/40 placeholder-slate-400 focus:border-orange-400 shadow-[2px_2px_0px_#ea580c]'
                  : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] placeholder-[#64748b] focus:border-[#0284c7] shadow-[2px_2px_0px_#0f172a]'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-black/10 transition-colors"
                title="Hapus pencarian"
              >
                <X className={`w-3.5 h-3.5 ${isSunset ? 'text-amber-300' : 'text-[#0f172a]'}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        {filteredProjects.length === 0 ? (
          <div
            className={`p-10 sm:p-14 rounded-3xl border-2 text-center max-w-xl mx-auto my-8 ${
              isSunset
                ? 'bg-[#221033] border-orange-500/40 shadow-[4px_4px_0px_#ea580c]'
                : 'bg-[#fffdf5] border-[#0f172a] shadow-[4px_4px_0px_#0f172a]'
            }`}
          >
            <div className="text-4xl mb-3">🔍</div>
            <h3
              className={`text-lg font-black ${
                isSunset ? 'text-white' : 'text-[#0f172a]'
              }`}
            >
              Tidak ada proyek yang sesuai
            </h3>
            <p
              className={`text-xs mt-1 mb-5 ${
                isSunset ? 'text-slate-300' : 'text-[#475569]'
              }`}
            >
              Kata kunci &ldquo;{searchQuery}&rdquo; tidak cocok dengan judul atau tech stack manapun.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-black border-2 cursor-pointer transition-all ${
                isSunset
                  ? 'bg-[#ea580c] text-white border-orange-400 shadow-[2px_2px_0px_#f97316]'
                  : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
              }`}
            >
              Reset Filter &amp; Tampilkan Semua
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const images = Array.isArray(project.images) && project.images.length > 0
                  ? project.images
                  : (project.imageUrl ? [project.imageUrl] : []);
                const primaryImage = images[0] || project.imageUrl;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, delay: idx * 0.04 }}
                    className={`rounded-2xl sm:rounded-[24px] border-2 flex flex-col justify-between overflow-hidden transition-all duration-200 group hover:-translate-y-1.5 ${
                      isSunset
                        ? 'bg-[#221033] border-orange-500/40 shadow-[4px_4px_0px_#ea580c] hover:shadow-[6px_6px_0px_#f97316]'
                        : 'bg-[#fffdf5] border-[#0f172a] shadow-[4px_4px_0px_#0f172a] hover:shadow-[6px_6px_0px_#0284c7]'
                    }`}
                  >
                    {/* Project Image Banner Header */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b-2 border-[#0f172a]">
                      {primaryImage ? (
                        <img
                          src={primaryImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-900 to-indigo-950 text-white p-4 text-center">
                          <Layers className="w-8 h-8 mb-2 opacity-60" />
                          <span className="text-xs font-mono font-bold opacity-80">{project.title}</span>
                        </div>
                      )}

                      {/* Top Badges Overlay */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1 pointer-events-none">
                        <span
                          className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-lg border shadow-sm pointer-events-auto ${
                            project.category === 'fullstack'
                              ? 'bg-[#0284c7] text-white border-white/50'
                              : 'bg-[#0d9488] text-white border-white/50'
                          }`}
                        >
                          {project.category === 'fullstack' ? 'Web Fullstack' : 'Mobile Flutter'}
                        </span>

                        <div className="flex items-center gap-1.5 pointer-events-auto">
                          {project.featured && (
                            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-lg bg-[#fde047] text-[#0f172a] border border-[#0f172a] shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#ea580c]" />
                              <span>Flagship</span>
                            </span>
                          )}

                          {images.length > 1 && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-lg bg-black/75 backdrop-blur-sm text-white border border-white/30 flex items-center gap-1">
                              <Camera className="w-3 h-3 text-sky-300" />
                              <span>{images.length}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Repo Status Bottom Right Pill */}
                      <div className="absolute bottom-2 right-2 pointer-events-none">
                        {project.isPrivateRepo ? (
                          <span className="text-[9px] font-mono font-black text-rose-300 bg-rose-950/85 backdrop-blur-sm px-2 py-0.5 rounded-md border border-rose-500/40 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Private Repo</span>
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-black text-emerald-300 bg-emerald-950/85 backdrop-blur-sm px-2 py-0.5 rounded-md border border-emerald-500/40 flex items-center gap-1">
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span>Open Source</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title and Role */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3
                            className={`text-base sm:text-lg font-black leading-tight group-hover:text-[#0284c7] transition-colors ${
                              isSunset ? 'text-white group-hover:text-amber-300' : 'text-[#0f172a]'
                            }`}
                          >
                            {project.title}
                          </h3>
                        </div>

                        <p
                          className={`text-[11px] font-mono font-bold mb-2 ${
                            isSunset ? 'text-amber-300' : 'text-[#8c6239]'
                          }`}
                        >
                          {project.subtitle}
                        </p>

                        <p
                          className={`text-xs leading-relaxed line-clamp-3 mb-4 font-medium ${
                            isSunset ? 'text-slate-300' : 'text-[#334155]'
                          }`}
                        >
                          {project.summary}
                        </p>
                      </div>

                      <div>
                        {/* Metrics Pills */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-1.5 mb-3.5">
                            {project.metrics.slice(0, 2).map((m, mIdx) => (
                              <div
                                key={mIdx}
                                className={`px-2 py-1 rounded-lg border text-center ${
                                  isSunset
                                    ? 'bg-[#311440] border-orange-500/30 text-amber-200'
                                    : 'bg-[#fff9d4] border-[#0f172a]/40 text-[#0f172a]'
                                }`}
                              >
                                <span className="block text-[8px] font-mono uppercase font-bold opacity-75">
                                  {m.label}
                                </span>
                                <span className="block text-[10px] font-mono font-black truncate">
                                  {m.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                                isSunset
                                  ? 'bg-[#180824] text-amber-200 border-orange-500/30'
                                  : 'bg-[#fff9d4] text-[#0f172a] border-[#0f172a]/40'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 4 && (
                            <span
                              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                                isSunset
                                  ? 'bg-[#180824] text-slate-400 border-orange-500/20'
                                  : 'bg-[#faeed1] text-[#64748b] border-[#0f172a]/20'
                              }`}
                            >
                              +{project.stack.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-3 border-t border-dashed border-[#0f172a]/20 dark:border-orange-500/20">
                          <button
                            type="button"
                            onClick={() => onOpenProject?.(project)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-mono font-black border-2 transition-all cursor-pointer ${
                              isSunset
                                ? 'bg-[#ea580c] hover:bg-[#f97316] text-white border-orange-400 shadow-[2px_2px_0px_#f97316] active:translate-y-0.5'
                                : 'bg-[#0284c7] hover:bg-[#0369a1] text-white border-[#0f172a] shadow-[2px_2px_0px_#0f172a] active:translate-y-0.5'
                            }`}
                          >
                            <span>Studi Kasus</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-2 rounded-xl border-2 transition-all shrink-0 ${
                                isSunset
                                  ? 'bg-[#251238] hover:bg-[#34164c] text-amber-300 border-orange-500/40 shadow-[2px_2px_0px_#ea580c]'
                                  : 'bg-[#fffdf5] hover:bg-[#fff9d4] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                              }`}
                              title="Buka Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
