import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Lock,
  Layers,
  Smartphone
} from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { AnimatedOceanSlideBackground } from './AnimatedOceanSlideBackground';
import { useTheme } from '../../context/ThemeContext';
import { PlanktonSecret } from '../spongebob/PlanktonSecret';

interface FlagshipSlideCardProps {
  project: Project;
  index: number;
  yMotion?: any;
  opacityMotion?: any;
  depthLevel?: 1 | 2 | 3;
  onSelectProject: (project: Project) => void;
}

export const FlagshipSlideCard: React.FC<FlagshipSlideCardProps> = ({
  project,
  index,
  yMotion = '0%',
  opacityMotion = 1,
  depthLevel = (index + 1) as 1 | 2 | 3,
  onSelectProject
}) => {
  const { isSunset } = useTheme();
  const zIndex = index === 0 ? 10 : index === 1 ? 20 : 30;

  return (
    <motion.div
      style={{ y: yMotion, opacity: opacityMotion, zIndex }}
      className={`absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
        isSunset
          ? 'bg-[#2a1035] shadow-[0_-8px_24px_rgba(234,88,12,0.25)]'
          : 'bg-[#0284c7] shadow-[0_-8px_24px_rgba(15,23,42,0.35)]'
      }`}
    >
      {/* background ocean */}
      <AnimatedOceanSlideBackground depthLevel={depthLevel} />

      {/* project presentation content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-12 my-auto pt-24 sm:pt-28 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
          {/* project details card */}
          <div
            className={`lg:col-span-6 p-4 sm:p-7 sm:p-9 rounded-2xl sm:rounded-[32px] border-2 space-y-3 sm:space-y-5 transition-colors ${
              isSunset
                ? 'bg-[#221033] border-orange-500/40 shadow-[5px_5px_0px_#ea580c] sm:shadow-[8px_8px_0px_#ea580c]'
                : 'bg-[#fffdf5] border-[#0f172a] shadow-[5px_5px_0px_#0f172a] sm:shadow-[8px_8px_0px_#0f172a]'
            }`}
          >
            {/* category and role metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] sm:text-xs font-mono font-black border-2 ${
                  isSunset
                    ? 'bg-[#ea580c] text-white border-orange-400 shadow-[2px_2px_0px_#f97316]'
                    : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                }`}
              >
                0{index + 1} // {project.category === 'fullstack' ? 'FULL-STACK WEB' : 'MOBILE FLUTTER'}
              </span>

              <span
                className={`text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  isSunset
                    ? 'text-amber-200 bg-[#351648] border-orange-500/30'
                    : 'text-[#0284c7] bg-[#e0f2fe] border-[#0284c7]/40'
                }`}
              >
                {project.role}
              </span>
            </div>

            {/* title and subtitle */}
            <div className="space-y-1">
              <h3
                className={`text-xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-[1.08] ${
                  isSunset ? 'text-white' : 'text-[#0f172a]'
                }`}
              >
                {project.title}
              </h3>

              <p
                className={`text-[11px] sm:text-sm font-mono font-bold leading-relaxed ${
                  isSunset ? 'text-amber-300' : 'text-[#0284c7]'
                }`}
              >
                {project.subtitle}
              </p>
            </div>

            {/* summary */}
            <p
              className={`text-[11px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none font-medium ${
                isSunset ? 'text-slate-300' : 'text-[#334155]'
              }`}
            >
              {project.summary}
            </p>

            {/* key performance metrics */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {project.metrics.map((m, idx) => {
                const stickerBg = isSunset
                  ? idx === 0
                    ? 'bg-[#3b1745] border-orange-500/40'
                    : idx === 1
                    ? 'bg-[#431407] border-amber-500/40'
                    : 'bg-[#143525] border-emerald-500/40'
                  : idx === 0
                  ? 'bg-[#e0f2fe] border-[#0284c7]'
                  : idx === 1
                  ? 'bg-[#fef9c3] border-[#ca8a04]'
                  : 'bg-[#dcfce7] border-[#16a34a]';

                const labelColor = isSunset
                  ? idx === 0
                    ? 'text-amber-300'
                    : idx === 1
                    ? 'text-orange-300'
                    : 'text-emerald-300'
                  : idx === 0
                  ? 'text-[#0369a1]'
                  : idx === 1
                  ? 'text-[#854d0e]'
                  : 'text-[#15803d]';

                return (
                  <div
                    key={idx}
                    className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl ${stickerBg} border-2 text-center flex flex-col justify-center min-h-[44px] sm:min-h-[58px] ${
                      isSunset
                        ? 'border-orange-500/30 shadow-[2px_2px_0px_#ea580c] sm:shadow-[3px_3px_0px_#ea580c]'
                        : 'border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a]'
                    }`}
                  >
                    <div className={`text-[9px] sm:text-[11px] font-mono font-bold uppercase ${labelColor} leading-tight`}>
                      {m.label}
                    </div>
                    <div
                      className={`text-[11px] sm:text-sm font-black mt-0.5 leading-tight ${
                        isSunset ? 'text-white' : 'text-[#0f172a]'
                      }`}
                    >
                      {m.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* tech stack tags */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
              {project.stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-mono font-bold border ${
                    isSunset
                      ? 'bg-[#311440] text-amber-200 border-orange-500/30'
                      : 'bg-[#fff9d4] text-[#0f172a] border-[#0f172a]/50'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* action buttons */}
            <div
              className={`pt-2 flex flex-wrap items-center gap-2 sm:gap-3 border-t ${
                isSunset ? 'border-orange-500/25' : 'border-[#e2d3b3]'
              }`}
            >
              {/* case study modal trigger */}
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-white text-[11px] sm:text-xs font-mono font-black border-2 hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
                  isSunset
                    ? 'bg-[#ea580c] hover:bg-[#c2410c] border-orange-400 shadow-[2px_2px_0px_#f97316] sm:shadow-[3px_3px_0px_#f97316]'
                    : 'bg-[#0284c7] hover:bg-[#0369a1] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a]'
                }`}
              >
                <span>Studi Kasus</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* demo or app status */}
              {project.isMobileApp ? (
                <div
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold border-2 cursor-not-allowed opacity-90 ${
                    isSunset
                      ? 'bg-[#3d1858] text-amber-200 border-orange-500/40'
                      : 'bg-[#e0f2fe] text-[#0369a1] border-[#0284c7]/50'
                  }`}
                  title={project.demoStatusLabel || 'Aplikasi Mobile Native'}
                >
                  <Smartphone className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSunset ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                  <span>Mobile Native</span>
                </div>
              ) : project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-black border-2 hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all ${
                    isSunset
                      ? 'bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] border-amber-300 shadow-[2px_2px_0px_#ea580c] sm:shadow-[3px_3px_0px_#ea580c]'
                      : 'bg-[#fde047] hover:bg-[#facc15] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a]'
                  }`}
                >
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Live Demo</span>
                </a>
              ) : null}

              {/* repository status */}
              {project.isPrivateRepo ? (
                <div
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold border-2 cursor-not-allowed opacity-90 sm:ml-auto ${
                    isSunset
                      ? 'bg-[#451025] text-rose-300 border-rose-500/40'
                      : 'bg-[#fee2e2] text-[#991b1b] border-[#991b1b]/40'
                  }`}
                  title={project.privateRepoReason || 'Repository privat karena hak cipta institusi & kerahasiaan data'}
                >
                  <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                  <span>Repo Private</span>
                </div>
              ) : project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold border-2 hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all sm:ml-auto ${
                    isSunset
                      ? 'bg-[#2f133d] hover:bg-[#3d1850] text-amber-200 border-orange-500/40 shadow-[2px_2px_0px_#ea580c]'
                      : 'bg-[#fff9d4] hover:bg-[#faeed1] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                  }`}
                >
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              ) : null}
            </div>
          </div>

          {/* project visual frame */}
          <div
            onClick={() => onSelectProject(project)}
            className="lg:col-span-6 cursor-pointer group relative"
          >
            {/* Plankton peeking on Slide 1 */}
            {index === 0 && (
              <div className="absolute -top-12 right-6 z-30 hidden md:block">
                <PlanktonSecret />
              </div>
            )}
            <ProjectPreviewPlaceholder
              project={project}
              isMobileFrame={project.category === 'mobile'}
              className={`aspect-[16/10] w-full transition-all duration-300 group-hover:scale-[1.01] ${
                isSunset
                  ? 'shadow-[8px_8px_0px_#ea580c] group-hover:shadow-[10px_10px_0px_#ea580c]'
                  : 'shadow-[8px_8px_0px_#0f172a] group-hover:shadow-[10px_10px_0px_#0f172a]'
              }`}
            />

            <div
              className={`absolute bottom-5 right-5 px-3.5 py-1.5 rounded-xl border-2 text-xs font-mono font-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none ${
                isSunset
                  ? 'bg-[#ea580c] border-orange-400 text-white shadow-[3px_3px_0px_#f97316]'
                  : 'bg-[#fde047] border-[#0f172a] text-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Buka Arsitektur Sistem</span>
            </div>
          </div>
        </div>
      </div>

      {/* spacing */}
      <div className="relative z-10 h-6 w-full" />
    </motion.div>
  );
};

export const FlagshipProjectParallax = FlagshipSlideCard;
