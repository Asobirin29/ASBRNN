import React from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useTheme } from '../../context/ThemeContext';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withText = false
}) => {
  const { profile } = usePortfolioData();
  const { isSunset } = useTheme();
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-xs' },
    md: { img: 'w-10 h-10', text: 'text-sm' },
    lg: { img: 'w-14 h-14', text: 'text-base' },
    xl: { img: 'w-24 h-24', text: 'text-lg' }
  };

  const currentSize = sizeMap[size];
  const avatarSrc = profile?.avatarUrl || '/ryhndastra.png';
  const name = profile?.name || 'Reyhand Astra';
  const tagline = profile?.tagline || 'Full-Stack & Mobile Developer';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 select-none">
        <img
          src={avatarSrc}
          alt={`${name} Logo`}
          className={`${currentSize.img} rounded-full object-contain drop-shadow-md`}
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/avatar.svg';
          }}
        />
      </div>

      {withText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold text-white tracking-wide leading-tight drop-shadow-sm ${currentSize.text}`}>
            {name}
          </span>
          <span
            className={`text-[11px] font-mono font-medium flex items-center gap-1 drop-shadow-xs truncate max-w-[200px] ${
              isSunset ? 'text-amber-200' : 'text-[#fff9d4]'
            }`}
          >
            &gt;_ {tagline}
          </span>
        </div>
      )}
    </div>
  );
};

