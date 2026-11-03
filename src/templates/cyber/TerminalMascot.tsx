import React from 'react';
import { prefersReducedMotion } from '../common/motion';

/**
 * Terminal culture prop: a small ASCII cat "daemon" idling in the corner.
 * Two stacked frames cross-fade (open eyes <-> blink + tail flick) via a
 * CSS steps animation, so there is no JS timer. Fixed, pointer-events none.
 */
const FRAME_OPEN = ` /\\_/\\
( o.o )
 > ^ <`;

const FRAME_BLINK = ` /\\_/\\
( -.- )
 >~^ <`;

export const TerminalMascot: React.FC = () => {
  const reduced = prefersReducedMotion();

  return (
    <div
      className="fixed bottom-20 right-3 z-20 pointer-events-none select-none hidden sm:block"
      aria-hidden="true"
    >
      <div className="text-[#66ff66] font-terminal-mono leading-tight text-[11px] text-right">
        <div className="relative inline-grid">
          <pre className={`m-0 col-start-1 row-start-1 ${reduced ? '' : 'terminal-cat-open'}`}>{FRAME_OPEN}</pre>
          {!reduced && (
            <pre className="m-0 col-start-1 row-start-1 terminal-cat-blink">{FRAME_BLINK}</pre>
          )}
        </div>
        <div className="mt-1 text-[10px] text-[#3a7a3a]">
          catd<span className={reduced ? '' : 'terminal-cat-cursor'}>_</span> running · pid 1
        </div>
      </div>
    </div>
  );
};

export default TerminalMascot;
