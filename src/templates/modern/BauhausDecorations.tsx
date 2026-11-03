import React from 'react';
import { prefersReducedMotion } from '../common/motion';

/**
 * Bauhaus / Kandinsky-style floating primitives: pure geometric forms in the
 * primary palette (red / blue / yellow / black) drifting and rotating slowly.
 * Decorative only — fixed, behind content, pointer-events none.
 */
export const BauhausDecorations: React.FC = () => {
  if (prefersReducedMotion()) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Blue circle */}
      <div className="bauhaus-drift-a absolute top-[14%] left-[6%] hidden md:block">
        <div className="w-16 h-16 rounded-full bg-[#0000ff] border-4 border-[#000000] opacity-15" />
      </div>

      {/* Red triangle */}
      <div className="bauhaus-spin-slow absolute top-[70%] left-[9%] hidden md:block">
        <div
          className="w-0 h-0 opacity-15"
          style={{
            borderLeft: '28px solid transparent',
            borderRight: '28px solid transparent',
            borderBottom: '48px solid #ff0000',
          }}
        />
      </div>

      {/* Yellow square */}
      <div className="bauhaus-drift-b absolute top-[24%] right-[7%] hidden md:block">
        <div className="w-20 h-20 bg-[#ffff00] border-4 border-[#000000] opacity-15 rotate-12" />
      </div>

      {/* Black half-circle */}
      <div className="bauhaus-spin-slower absolute top-[58%] right-[12%] hidden lg:block">
        <div
          className="w-16 h-8 opacity-10"
          style={{ background: '#000000', borderRadius: '80px 80px 0 0' }}
        />
      </div>

      {/* Red quarter arc bars (seams) */}
      <div className="bauhaus-drift-a absolute top-[42%] left-[48%] hidden lg:block">
        <div className="flex gap-1.5 opacity-10">
          <span className="block w-2 h-14 bg-[#000000]" />
          <span className="block w-2 h-10 bg-[#ff0000]" />
          <span className="block w-2 h-16 bg-[#0000ff]" />
        </div>
      </div>
    </div>
  );
};

export default BauhausDecorations;
