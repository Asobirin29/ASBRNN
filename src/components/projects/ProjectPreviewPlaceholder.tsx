import React, { useState, useEffect } from 'react';
import { Globe, Smartphone, Image as ImageIcon, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import type { Project } from '../../types/portfolio';

interface ProjectPreviewPlaceholderProps {
  project: Project;
  className?: string;
  isMobileFrame?: boolean;
  activeImageIndex?: number;
  onImageIndexChange?: (index: number) => void;
  showControls?: boolean;
  onOpenLightbox?: (index: number) => void;
}

export const ProjectPreviewPlaceholder: React.FC<ProjectPreviewPlaceholderProps> = ({
  project,
  className = '',
  isMobileFrame = false,
  activeImageIndex,
  onImageIndexChange,
  showControls = true,
  onOpenLightbox
}) => {
  const images = Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : (project.imageUrl ? [project.imageUrl] : []);

  const [internalIdx, setInternalIdx] = useState(0);
  const [imageError, setImageError] = useState(false);

  const isControlled = activeImageIndex !== undefined;
  const currentIdx = Math.min(
    isControlled ? activeImageIndex : internalIdx,
    Math.max(0, images.length - 1)
  );

  const currentImg = images[currentIdx] || project.imageUrl;
  const isMobile = isMobileFrame || project.category === 'mobile';

  // Reset error state when current image changes
  useEffect(() => {
    setImageError(false);
  }, [currentImg]);

  const setIdx = (newIdx: number) => {
    const wrapped = (newIdx + images.length) % images.length;
    if (onImageIndexChange) {
      onImageIndexChange(wrapped);
    }
    if (!isControlled) {
      setInternalIdx(wrapped);
    }
  };

  const handlePrev = () => setIdx(currentIdx - 1);
  const handleNext = () => setIdx(currentIdx + 1);

  return (
    <div
      className={`relative w-full flex flex-col overflow-hidden rounded-[24px] bg-[#fffdf5] border-2 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] group/preview ${className}`}
    >
      {/* browser navigation bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#faeed1] border-b-2 border-[#0f172a] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f87171] border border-[#0f172a]" />
          <span className="w-3 h-3 rounded-full bg-[#fde047] border border-[#0f172a]" />
          <span className="w-3 h-3 rounded-full bg-[#4ade80] border border-[#0f172a]" />
          <div className="ml-2 px-3 py-0.5 rounded-md bg-[#fffdf5] border border-[#0f172a]/50 text-[11px] font-mono font-bold text-[#0f172a] truncate max-w-[140px] sm:max-w-[220px]">
            {isMobile ? `app://${project.id}.flutter` : `https://${project.id}.app`}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {images.length > 1 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0284c7]/10 text-[#0284c7] border border-[#0284c7]/30 text-[10px] font-mono font-black">
              <Camera className="w-3 h-3" />
              <span>{currentIdx + 1}/{images.length} FOTO</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-md bg-[#fde047] text-[#0f172a] border border-[#0f172a]">
            {isMobile ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
            <span>{isMobile ? 'FLUTTER NATIVE' : 'WEB PLATFORM'}</span>
          </div>
        </div>
      </div>

      {/* content viewport */}
      <div className="relative w-full flex-1 min-h-0 bg-[#f8fafc] flex items-center justify-center overflow-hidden select-none">
        {!imageError && currentImg ? (
          <img
            key={currentImg}
            src={currentImg}
            alt={`${project.title} - Screenshot ${currentIdx + 1}`}
            onError={() => setImageError(true)}
            className={`w-full h-full ${
              project.imageFit === 'contain' || isMobile
                ? 'object-contain object-center p-3 sm:p-4'
                : 'object-cover object-top'
            } transition-all duration-300 group-hover/preview:scale-[1.01]`}
          />
        ) : (
          // fallback placeholder
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="p-4 rounded-2xl bg-[#e0f2fe] border-2 border-[#0f172a] text-[#0284c7] shadow-[3px_3px_0px_#0f172a] group-hover/preview:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8" />
            </div>

            <div>
              <div className="text-base font-black text-[#0f172a] tracking-tight">
                {project.title}
              </div>
              <p className="text-xs font-mono font-bold text-[#0284c7] mt-0.5">
                Preview Screenshot Proyek {images.length > 1 ? `#${currentIdx + 1}` : ''}
              </p>
            </div>

            <div className="text-[11px] font-mono text-[#64748b] bg-[#fffdf5] px-3 py-1 rounded-lg border border-[#0f172a]/30">
              {project.stack.slice(0, 3).join(' • ')}
            </div>
          </div>
        )}

        {/* Multi-image navigation controls */}
        {showControls && images.length > 1 && (
          <>
            {/* Prev button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-[#0f172a]/75 hover:bg-[#0f172a] text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover/preview:opacity-100"
              aria-label="Foto sebelumnya"
              title="Foto sebelumnya"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-[#0f172a]/75 hover:bg-[#0f172a] text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover/preview:opacity-100"
              aria-label="Foto selanjutnya"
              title="Foto selanjutnya"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2.5 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0f172a]/80 backdrop-blur-md border border-white/20 pointer-events-auto shadow-md">
                {images.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdx(dotIdx);
                    }}
                    className={`transition-all rounded-full cursor-pointer ${
                      dotIdx === currentIdx
                        ? 'w-5 h-2 bg-sky-400'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/90'
                    }`}
                    aria-label={`Lihat foto ${dotIdx + 1}`}
                    title={`Foto ${dotIdx + 1} dari ${images.length}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Fullscreen Lightbox Trigger Button */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(currentIdx);
            }}
            className="absolute top-2.5 right-2.5 z-20 p-1.5 sm:p-2 rounded-xl bg-[#0f172a]/75 hover:bg-[#0f172a] text-white border border-white/20 backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover/preview:opacity-100"
            title="Perbesar Screenshot (Lihat Resolusi Penuh)"
            aria-label="Perbesar Screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
