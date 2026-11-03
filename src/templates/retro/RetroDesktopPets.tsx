import React from 'react';
import { prefersReducedMotion } from '../common/motion';

/**
 * Retro desktop "pets" & culture props: a pixel cat that walks across the
 * desktop above the taskbar, plus a couple of floating Win95-era desktop
 * stickers (floppy disk, CRT monitor). Pure CSS/SVG, pointer-events none.
 */

/* ---- 16x12 pixel side-view cat, crisp-edged SVG ---- */
const PixelCat: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="64"
    height="48"
    viewBox="0 0 16 12"
    shapeRendering="crispEdges"
    className={className}
    aria-hidden="true"
  >
    {/* body */}
    <rect x="2" y="5" width="10" height="4" fill="#000080" />
    {/* head */}
    <rect x="11" y="3" width="4" height="4" fill="#000080" />
    {/* ears */}
    <rect x="11" y="2" width="1" height="1" fill="#000080" />
    <rect x="14" y="2" width="1" height="1" fill="#000080" />
    {/* eye */}
    <rect x="13" y="4" width="1" height="1" fill="#ffff00" />
    {/* tail (wags via CSS) */}
    <rect className="retro-cat-tail" x="1" y="4" width="1" height="3" fill="#000080" />
    {/* legs frame A */}
    <g className="retro-cat-legs-a">
      <rect x="3" y="9" width="1" height="2" fill="#000080" />
      <rect x="6" y="9" width="1" height="2" fill="#000080" />
      <rect x="9" y="9" width="1" height="2" fill="#000080" />
    </g>
    {/* legs frame B */}
    <g className="retro-cat-legs-b">
      <rect x="4" y="9" width="1" height="2" fill="#000080" />
      <rect x="7" y="9" width="1" height="2" fill="#000080" />
      <rect x="10" y="9" width="1" height="2" fill="#000080" />
    </g>
  </svg>
);

export const RetroDesktopPets: React.FC = () => {
  if (prefersReducedMotion()) return null;

  return (
    <>
      {/* Walking pixel cat patrols ON TOP of the windows, below taskbar (z-50) */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="retro-cat-walk absolute bottom-[104px]">
          <PixelCat />
        </div>
      </div>

      {/* Ambient desktop stickers sit in the background behind windows */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Floating floppy-disk sticker */}
      <div className="retro-float-slow absolute top-[22%] left-[4%] hidden md:block opacity-70">
        <svg width="34" height="34" viewBox="0 0 24 24" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" fill="#000080" />
          <rect x="4" y="2" width="16" height="7" fill="#d4d4d4" />
          <rect x="13" y="3" width="4" height="5" fill="#808080" />
          <rect x="6" y="12" width="12" height="8" fill="#c0c0c0" />
          <rect x="8" y="14" width="8" height="1" fill="#000080" />
          <rect x="8" y="16" width="8" height="1" fill="#000080" />
        </svg>
      </div>

      {/* Floating CRT-monitor sticker */}
      <div className="retro-float-slower absolute top-[64%] right-[5%] hidden md:block opacity-70">
        <svg width="36" height="36" viewBox="0 0 24 24" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" fill="#d4d4d4" />
          <rect x="4" y="5" width="16" height="10" fill="#008080" />
          <rect x="5" y="6" width="3" height="1" fill="#66ffcc" />
          <rect x="5" y="8" width="7" height="1" fill="#66ffcc" />
          <rect x="9" y="17" width="6" height="2" fill="#808080" />
          <rect x="6" y="19" width="12" height="2" fill="#000080" />
        </svg>
      </div>
      </div>
    </>
  );
};

export default RetroDesktopPets;
