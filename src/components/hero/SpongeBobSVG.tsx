import React from 'react';
import { motion } from 'framer-motion';

interface SpongeBobSVGProps {
  pose?: 'idle' | 'wave' | 'ready' | 'swim';
  isBlinking?: boolean;
  hasFloatie?: boolean;
  hasNet?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const SpongeBobSVG: React.FC<SpongeBobSVGProps> = ({
  pose = 'idle',
  isBlinking = false,
  hasFloatie = false,
  hasNet = true,
  width = 120,
  height = 140,
  className = ''
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg ${className}`}
    >
      {/* Jellyfish Net in hand (if enabled and not swimming) */}
      {hasNet && !hasFloatie && (
        <motion.g
          animate={{ rotate: [-4, 6, -4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '18px', originY: '88px' }}
        >
          {/* Net Handle (bamboo stick) */}
          <line x1="8" y1="120" x2="26" y2="48" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />
          <line x1="9" y1="110" x2="11" y2="110" stroke="#713f12" strokeWidth="1" />
          <line x1="14" y1="90" x2="16" y2="90" stroke="#713f12" strokeWidth="1" />
          {/* Net Ring */}
          <ellipse cx="28" cy="44" rx="14" ry="8" fill="none" stroke="#ca8a04" strokeWidth="3" />
          {/* Net Mesh bag */}
          <path
            d="M14 44 C12 28, 42 26, 42 44 C42 60, 20 62, 14 44 Z"
            fill="rgba(244, 114, 182, 0.35)"
            stroke="#f472b6"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          {/* Cute trapped Pink Jellyfish inside/near net */}
          <circle cx="28" cy="40" r="5" fill="#f472b6" />
          <path d="M25 43 Q26 48 25 50" stroke="#db2777" strokeWidth="1" />
          <path d="M28 44 Q28 49 28 51" stroke="#db2777" strokeWidth="1" />
          <path d="M31 43 Q30 48 31 50" stroke="#db2777" strokeWidth="1" />
        </motion.g>
      )}

      {/* SpongeBob Legs & Shoes */}
      {!hasFloatie && (
        <g id="spongebob-legs">
          {/* Left Leg */}
          <path d="M44 116 L44 134" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
          {/* Left Sock with blue/red stripe */}
          <rect x="41.5" y="126" width="5" height="8" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
          <line x1="41.5" y1="128" x2="46.5" y2="128" stroke="#3b82f6" strokeWidth="1.2" />
          <line x1="41.5" y1="130" x2="46.5" y2="130" stroke="#ef4444" strokeWidth="1.2" />
          {/* Left Shoe */}
          <path
            d="M37 137 C37 133, 44 133, 47 134 C50 135, 50 139, 45 139 C40 139, 37 139, 37 137 Z"
            fill="#0f172a"
          />
          <circle cx="41" cy="135" r="1" fill="#ffffff" />

          {/* Right Leg */}
          <path d="M68 116 L68 134" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
          {/* Right Sock with blue/red stripe */}
          <rect x="65.5" y="126" width="5" height="8" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
          <line x1="65.5" y1="128" x2="70.5" y2="128" stroke="#3b82f6" strokeWidth="1.2" />
          <line x1="65.5" y1="130" x2="70.5" y2="130" stroke="#ef4444" strokeWidth="1.2" />
          {/* Right Shoe */}
          <path
            d="M65 134 C68 133, 75 133, 75 137 C75 139, 72 139, 67 139 C62 139, 62 135, 65 134 Z"
            fill="#0f172a"
          />
          <circle cx="71" cy="135" r="1" fill="#ffffff" />
        </g>
      )}

      {/* SpongeBob Yellow Body Base */}
      <g id="spongebob-body">
        {/* Main Yellow Rectangular Sponge with Wavy outline */}
        <path
          d="M28 25 C35 23, 45 26, 56 24 C68 25, 78 23, 84 25 C88 38, 85 55, 87 75 C85 88, 88 98, 84 102 C75 104, 56 101, 40 103 C32 102, 28 98, 25 85 C27 68, 24 50, 26 38 C25 30, 26 26, 28 25 Z"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="2.5"
        />

        {/* Olive Sponge Pores / Holes */}
        <ellipse cx="34" cy="34" rx="4" ry="3.5" fill="#ca8a04" opacity="0.35" />
        <ellipse cx="44" cy="28" rx="2.5" ry="2" fill="#ca8a04" opacity="0.3" />
        <ellipse cx="78" cy="32" rx="3.5" ry="4" fill="#ca8a04" opacity="0.35" />
        <ellipse cx="80" cy="48" rx="2" ry="2.5" fill="#ca8a04" opacity="0.3" />
        <ellipse cx="30" cy="80" rx="3" ry="3" fill="#ca8a04" opacity="0.35" />
        <ellipse cx="78" cy="85" rx="3.5" ry="3" fill="#ca8a04" opacity="0.3" />
        <ellipse cx="35" cy="94" rx="2" ry="2" fill="#ca8a04" opacity="0.35" />

        {/* Eyes & Eyelashes */}
        {/* Left Eye */}
        <g id="left-eye">
          {/* Eyelashes */}
          <line x1="39" y1="36" x2="35" y2="30" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="44" y1="34" x2="44" y2="28" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="49" y1="36" x2="52" y2="30" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
          {/* Eyeball */}
          <circle cx="44" cy="46" r="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          {!isBlinking ? (
            <>
              {/* Cyan Iris */}
              <circle cx="46" cy="46" r="5" fill="#0284c7" />
              {/* Pupil */}
              <circle cx="46.5" cy="46" r="2.8" fill="#0f172a" />
              {/* Shine */}
              <circle cx="45" cy="44.5" r="1.3" fill="#ffffff" />
            </>
          ) : (
            <path d="M35 46 Q44 51 53 46" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </g>

        {/* Right Eye */}
        <g id="right-eye">
          {/* Eyelashes */}
          <line x1="63" y1="36" x2="60" y2="30" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="68" y1="34" x2="68" y2="28" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="73" y1="36" x2="76" y2="30" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
          {/* Eyeball */}
          <circle cx="68" cy="46" r="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          {!isBlinking ? (
            <>
              {/* Cyan Iris */}
              <circle cx="66" cy="46" r="5" fill="#0284c7" />
              {/* Pupil */}
              <circle cx="65.5" cy="46" r="2.8" fill="#0f172a" />
              {/* Shine */}
              <circle cx="64" cy="44.5" r="1.3" fill="#ffffff" />
            </>
          ) : (
            <path d="M59 46 Q68 51 77 46" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </g>

        {/* Cute Long Bulbous Nose */}
        <path
          d="M56 46 C59 45, 62 51, 62 55 C62 59, 54 60, 53 54"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="2"
        />

        {/* Cheeks with Freckles & Dimples */}
        {/* Left Cheek */}
        <path d="M33 55 Q35 60 38 61" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="34" cy="58" r="0.9" fill="#ef4444" />
        <circle cx="36" cy="56" r="0.9" fill="#ef4444" />
        <circle cx="37" cy="59" r="0.9" fill="#ef4444" />

        {/* Right Cheek */}
        <path d="M79 55 Q77 60 74 61" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="78" cy="58" r="0.9" fill="#ef4444" />
        <circle cx="76" cy="56" r="0.9" fill="#ef4444" />
        <circle cx="75" cy="59" r="0.9" fill="#ef4444" />

        {/* Giant Iconic Smile */}
        <path
          d="M34 60 C38 78, 74 78, 78 60"
          stroke="#0f172a"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="#7f1d1d"
        />
        {/* Pink Tongue */}
        <path d="M46 72 C50 68, 62 68, 66 72 C62 76, 50 76, 46 72 Z" fill="#f472b6" />

        {/* Two Front Buck Teeth */}
        <rect x="49" y="60" width="5.5" height="7" rx="0.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
        <rect x="56.5" y="60" width="5.5" height="7" rx="0.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />

        {/* Chin line */}
        <path d="M52 79 Q56 81 60 79" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Shirt & Tie & Pants (or Swim Floatie) */}
      {!hasFloatie ? (
        <g id="spongebob-clothes">
          {/* White Shirt */}
          <rect x="27" y="96" width="58" height="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Shirt Collars */}
          <polygon points="44,96 52,102 54,96" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
          <polygon points="68,96 60,102 58,96" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
          {/* Red Tie */}
          <polygon points="54,97 58,97 59,103 53,103" fill="#dc2626" />
          <polygon points="53,103 59,103 61,113 56,116 51,113" fill="#dc2626" stroke="#b91c1c" strokeWidth="0.8" />

          {/* Brown Squarepants */}
          <rect x="27" y="105" width="58" height="13" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          {/* Black Belt dashes */}
          <rect x="30" y="106" width="8" height="2.5" fill="#0f172a" rx="0.5" />
          <rect x="43" y="106" width="8" height="2.5" fill="#0f172a" rx="0.5" />
          <rect x="61" y="106" width="8" height="2.5" fill="#0f172a" rx="0.5" />
          <rect x="74" y="106" width="8" height="2.5" fill="#0f172a" rx="0.5" />

          {/* Pant leg cuffs */}
          <rect x="40" y="116" width="9" height="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
          <rect x="64" y="116" width="9" height="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        </g>
      ) : (
        /* Lifebuoy / Swim Floatie Ring around SpongeBob */
        <g id="spongebob-floatie">
          <ellipse cx="56" cy="106" rx="38" ry="14" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
          {/* White stripes on floatie */}
          <path d="M24 104 C23 108, 27 111, 31 113 L33 100 C28 100, 25 102, 24 104 Z" fill="#ffffff" />
          <path d="M81 104 C82 108, 78 111, 74 113 L72 100 C77 100, 80 102, 81 104 Z" fill="#ffffff" />
          <path d="M52 119 C54 120, 58 120, 60 119 L60 106 C58 105, 54 105, 52 106 Z" fill="#ffffff" />
        </g>
      )}

      {/* Arms & Hands */}
      {/* Left Arm */}
      {pose === 'wave' || pose === 'ready' ? (
        /* Waving Left Hand high up */
        <motion.g
          animate={{ rotate: [-10, 15, -10] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '26px', originY: '75px' }}
        >
          <path d="M26 78 C15 72, 10 50, 14 38" stroke="#eab308" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Hand waving */}
          <circle cx="14" cy="36" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <line x1="12" y1="32" x2="11" y2="28" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="32" x2="15" y2="27" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="33" x2="19" y2="29" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      ) : (
        /* Relaxed arm / holding net */
        <g>
          <path d="M26 78 C18 82, 16 92, 20 98" stroke="#eab308" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="98" r="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        </g>
      )}

      {/* Right Arm */}
      {pose === 'ready' ? (
        /* Right Arm in "I'm ready" thumbs up / raised gesture */
        <motion.g
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '85px', originY: '75px' }}
        >
          <path d="M85 78 C96 72, 102 50, 98 38" stroke="#eab308" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="98" cy="36" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <line x1="100" y1="32" x2="101" y2="28" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
          <line x1="97" y1="32" x2="97" y2="27" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
          <line x1="94" y1="33" x2="93" y2="29" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      ) : (
        /* Relaxed right arm */
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '85px', originY: '78px' }}
        >
          <path d="M85 78 C94 82, 98 90, 96 98" stroke="#eab308" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="96" cy="98" r="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        </motion.g>
      )}
    </svg>
  );
};
