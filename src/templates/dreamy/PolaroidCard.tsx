import React, { useRef } from 'react';
import confetti from 'canvas-confetti';
import { ExternalLink, Star, FolderGit2 } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { GithubIcon } from '../common/SocialIcons';

interface PolaroidCardProps {
  project: Project;
  onOpenProject: (project: Project) => void;
  isFlagship?: boolean;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  project,
  onOpenProject,
  isFlagship = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const triggerConfettiAndOpen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Trigger sweet Midnight Rose confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#d4a574', '#f4a7bb', '#c9b1ff', '#ffe5b4', '#ffffff', '#e8b4b8'],
      ticks: 200,
      gravity: 0.9,
    });

    onOpenProject(project);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl bg-[#141b2d]/90 backdrop-blur-xl border border-[#2a3754]/80 transition-all duration-300 ease-out shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_-10px_rgba(212,165,116,0.25)] hover:border-[#d4a574]/60 flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${
        isFlagship ? 'lg:col-span-2' : ''
      }`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Golden Star Pin / Celestial Tape at Top */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-[0_0_8px_#d4a574] border border-amber-100" />
      </div>

      <div className="space-y-3.5 pt-2">
        {/* Polaroid Photo Box */}
        <div
          className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#0a0e1a] border border-[#20293f] cursor-pointer group/img"
          onClick={() => triggerConfettiAndOpen()}
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
              <FolderGit2 className="w-10 h-10 text-slate-600" />
              <span className="text-xs font-mono">No Preview</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0a0e1a]/85 backdrop-blur-md border border-amber-400/30 text-[10px] font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {project.category}
          </div>

          {project.featured && (
            <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500/80 to-purple-600/80 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              Featured
            </div>
          )}

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-3">
            <span className="text-[11px] font-medium text-amber-200 bg-[#0a0e1a]/70 px-3 py-1 rounded-full border border-amber-400/40 backdrop-blur-sm">
              ✨ Klik untuk detail
            </span>
          </div>
        </div>

        {/* Caption & Metadata */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#f4a7bb] font-serif italic mb-1">
            <span>Plate #{project.id.slice(0, 4)}</span>
            <span className="text-amber-300/80 not-italic font-mono text-[10px]">
              {project.role || 'Full-Stack'}
            </span>
          </div>

          <h3
            onClick={() => triggerConfettiAndOpen()}
            className="text-lg font-bold text-white hover:text-amber-200 transition-colors cursor-pointer tracking-tight"
          >
            {project.title}
          </h3>

          <p className="text-xs text-slate-400 font-light mt-0.5">{project.subtitle}</p>

          <p className="text-xs text-slate-300/90 line-clamp-2 mt-2 leading-relaxed">
            {project.summary || project.description}
          </p>
        </div>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack?.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-[#1d273f]/90 border border-[#2e3e63]/70 text-[10px] text-slate-300 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.stack && project.stack.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md bg-[#1d273f]/60 text-[10px] text-slate-400 font-mono">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-[#20293f] flex items-center justify-between gap-2">
        <button
          onClick={(e) => triggerConfettiAndOpen(e)}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 hover:from-amber-500/30 hover:via-rose-500/30 hover:to-purple-500/30 border border-amber-400/40 hover:border-amber-300 text-xs font-semibold text-amber-200 hover:text-white transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Detail Proyek</span>
          <span className="text-xs">✦</span>
        </button>

        <div className="flex items-center gap-1">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#1d273f] hover:bg-[#283556] text-slate-300 hover:text-amber-200 transition-colors"
              title="Demo Langsung"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && !project.isPrivateRepo && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#1d273f] hover:bg-[#283556] text-slate-300 hover:text-amber-200 transition-colors flex items-center justify-center"
              title="Source Code GitHub"
            >
              <GithubIcon size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

