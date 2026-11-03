import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Code2,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Eye
} from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { stopLenisScroll, startLenisScroll } from '../../hooks/useLenisSmoothScroll';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { getCaseStudyTheme } from './caseStudyThemes';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const { selectedTemplate } = usePortfolioData();
  const t = getCaseStudyTheme(selectedTemplate);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const galleryImages = project
    ? (Array.isArray(project.images) && project.images.length > 0
        ? project.images
        : (project.imageUrl ? [project.imageUrl] : []))
    : [];

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIdx(0);
    setLightboxOpen(false);
  }, [project?.id]);

  const handleLightboxPrev = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setLightboxIdx((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  }, [galleryImages.length]);

  const handleLightboxNext = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setLightboxIdx((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  // Keyboard navigation & scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          handleLightboxPrev();
        } else if (e.key === 'ArrowRight') {
          handleLightboxNext();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      stopLenisScroll();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      startLenisScroll();
    };
  }, [isOpen, onClose, lightboxOpen, handleLightboxPrev, handleLightboxNext]);

  if (!isOpen || !project) return null;

  return (
    <>
      <AnimatePresence>
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          style={t.fontFamily ? { fontFamily: t.fontFamily } : undefined}
        >
          {/* backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 ${t.overlay}`}
          />

          {/* modal container */}
          <motion.div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-4xl p-4 sm:p-8 space-y-4 sm:space-y-6 z-10 my-4 sm:my-8 max-h-[92vh] overflow-y-auto ${t.container}`}
          >
            {/* modal header and close button */}
            <div className={`flex items-start justify-between gap-3 sm:gap-4 border-b-2 pb-3 sm:pb-4 ${t.headerDivider}`}>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <span className={`text-[10px] sm:text-xs tracking-wider ${t.badge}`}>
                    {project.category === 'fullstack' ? 'FULL-STACK WEB ARCHITECTURE' : 'MOBILE FLUTTER SYSTEM'}
                  </span>
                  <span className={`text-[10px] sm:text-xs ${t.roleText}`}>
                    // {project.role}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-3xl ${t.title}`}>
                  {project.title}
                </h3>
                <p className={`text-xs sm:text-sm mt-0.5 ${t.subtitle}`}>
                  {project.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`p-2 sm:p-2.5 transition-all cursor-pointer shrink-0 ${t.closeBtn}`}
                aria-label="Tutup studi kasus"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* preview frame with multi-image navigation */}
            <div className="space-y-2">
              <ProjectPreviewPlaceholder
                project={project}
                isMobileFrame={project.category === 'mobile'}
                className="aspect-[16/10] w-full max-h-[360px]"
                activeImageIndex={activeImageIdx}
                onImageIndexChange={setActiveImageIdx}
                onOpenLightbox={(idx) => {
                  setLightboxIdx(idx);
                  setLightboxOpen(true);
                }}
              />

              {/* Thumbnail Strip (if more than 1 image) */}
              {galleryImages.length > 1 && (
                <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImageIdx(i)}
                        className={`relative shrink-0 w-16 h-11 sm:w-20 sm:h-14 overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImageIdx === i ? t.thumbActive : t.thumbInactive
                        }`}
                        title={`Lihat Screenshot #${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-[#0f172a]/80 text-[8px] font-mono font-bold text-white">
                          #{i + 1}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setLightboxIdx(activeImageIdx);
                      setLightboxOpen(true);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] transition-all cursor-pointer ml-auto shrink-0 ${t.enlargeBtn}`}
                    title="Lihat screenshot resolusi penuh"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar Layar Penuh</span>
                  </button>
                </div>
              )}
            </div>

            {/* performance metrics */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
              {project.metrics.map((m, idx) => {
                const metricIdx = Math.min(idx, 2) as 0 | 1 | 2;
                return (
                  <div
                    key={idx}
                    className={`p-2 sm:p-3.5 border-2 text-center flex flex-col justify-center ${t.metricBg[metricIdx]} ${
                      selectedTemplate === 'ocean'
                        ? 'rounded-xl sm:rounded-2xl border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a]'
                        : selectedTemplate === 'modern'
                        ? 'rounded-none border-[#000000] shadow-[2px_2px_0px_#000000] sm:shadow-[3px_3px_0px_#000000]'
                        : selectedTemplate === 'retro'
                        ? 'rounded-none retro-bevel-inset'
                        : 'rounded-none border-[#255325]'
                    }`}
                  >
                    <div className={`text-[9px] sm:text-[10px] font-bold uppercase leading-tight ${t.metricLabel[metricIdx]}`}>
                      {m.label}
                    </div>
                    <div className={`text-[11px] sm:text-base mt-0.5 leading-tight break-words ${t.metricValue}`}>
                      {m.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* project mandate and overview */}
            <div className="space-y-2">
              <h4 className={`text-[11px] sm:text-xs flex items-center gap-2 ${t.heading}`}>
                <Layers className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${t.accentIcon}`} />
                <span>Latar Belakang &amp; Mandat Proyek</span>
              </h4>
              <p className={`text-xs sm:text-base leading-relaxed p-3.5 sm:p-5 ${t.panel}`}>
                {project.description}
              </p>
            </div>

            {/* Dedicated Multi-Photo Gallery Grid (if multiple photos) */}
            {galleryImages.length > 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs flex items-center gap-2 ${t.heading}`}>
                    <Camera className={`w-4 h-4 ${t.accentIcon}`} />
                    <span>Galeri &amp; Screenshot Antarmuka Sistem ({galleryImages.length} Foto)</span>
                  </h4>
                  <span className={`text-[11px] font-semibold hidden sm:inline-block ${t.roleText}`}>
                    Klik foto untuk memperbesar
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setLightboxIdx(idx);
                        setLightboxOpen(true);
                      }}
                      className={`group/item relative overflow-hidden aspect-video cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all ${t.galleryCard}`}
                    >
                      <img
                        src={img}
                        alt={`${project.title} Screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/avatar.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                        <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                          Foto #{idx + 1} {idx === 0 ? '(Cover)' : ''}
                        </span>
                        <span className="p-1.5 rounded-lg bg-sky-500 text-white shadow">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* architecture and technical execution */}
            <div className="space-y-3">
              <h4 className={`text-xs flex items-center gap-2 ${t.heading}`}>
                <Code2 className={`w-4 h-4 ${t.accentIcon}`} />
                <span>Arsitektur Sistem &amp; Eksekusi Teknis</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 text-xs sm:text-sm ${t.archItem}`}
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${t.archIcon}`} />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* challenges and resolution */}
            <div className="space-y-2.5">
              <h4 className={`text-xs flex items-center gap-2 ${t.heading}`}>
                <AlertTriangle className={`w-4 h-4 ${t.accentIcon}`} />
                <span>Tantangan Utama &amp; Resolusi</span>
              </h4>
              <div className={`p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${t.challengeWrap}`}>
                <p className={`mb-1 ${t.challengeTitle}`}>Tantangan yang Dihadapi:</p>
                <p className={t.challengeBody}>{project.challenges}</p>
              </div>
            </div>

            {/* technology stack */}
            <div className="space-y-2.5">
              <h4 className={`text-xs ${t.heading}`}>
                Daftar Stack Teknologi &amp; Protokol
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs px-3 py-1.5 ${t.stackChip}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* dialog action buttons */}
            <div className={`pt-6 border-t-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 ${t.headerDivider}`}>
              <div className="flex flex-wrap items-center gap-3">
                {/* demo status */}
                {project.isMobileApp ? (
                  <div
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs ${t.mutedInfo}`}
                    title={project.demoStatusLabel || 'Aplikasi Mobile Native'}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Aplikasi Mobile Native (Demo/APK on request)</span>
                  </div>
                ) : project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-2.5 text-xs transition-all ${t.primaryBtn}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Kunjungi Live Demo</span>
                  </a>
                ) : null}

                {/* repository button */}
                {project.isPrivateRepo ? (
                  <div
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs ${t.mutedDanger}`}
                    title="Repository privat"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Repository privat karena hak cipta institusi &amp; kerahasiaan data</span>
                  </div>
                ) : project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-all ${t.secondaryBtn}`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Buka Repository GitHub</span>
                  </a>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`px-5 py-2.5 text-xs transition-all cursor-pointer text-center ${t.closeDialogBtn}`}
              >
                Tutup Dialog
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && galleryImages[lightboxIdx] && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-[100] flex flex-col justify-between p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white z-10 px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-mono font-black bg-sky-500/20 text-sky-400 px-3 py-1 rounded-lg border border-sky-500/30">
                  {lightboxIdx + 1} / {galleryImages.length}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-300 truncate max-w-[200px] sm:max-w-md">
                  {project.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Main Center Image Viewport */}
            <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 min-h-0">
              <img
                key={galleryImages[lightboxIdx]}
                src={galleryImages[lightboxIdx]}
                alt={`${project.title} Screenshot ${lightboxIdx + 1}`}
                className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10 select-none"
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handleLightboxPrev}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    title="Sebelumnya (Panah Kiri)"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>

                  <button
                    type="button"
                    onClick={handleLightboxNext}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    title="Selanjutnya (Panah Kanan)"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Selector in Lightbox */}
            {galleryImages.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 max-w-full px-4">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxIdx(i)}
                    className={`relative shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      lightboxIdx === i
                        ? 'border-sky-400 ring-2 ring-sky-400/50 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
