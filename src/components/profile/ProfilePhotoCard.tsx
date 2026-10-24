import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useTheme } from '../../context/ThemeContext';
import { useCardTilt } from '../../hooks/useCardTilt';

interface ProfilePhotoCardProps {
  isFlooded: boolean;
}

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({ isFlooded }) => {
  const { profile: profileData } = usePortfolioData();
  const { isSunset } = useTheme();
  const { tiltProps } = useCardTilt(6);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  return (
    <motion.div
      animate={
        isFlooded
          ? {
              rotate: isMobile ? -5 : -24,
              x: isMobile ? 0 : -32,
              y: isMobile ? 20 : 70,
              scale: isMobile ? 0.98 : 0.94,
              transition: { type: 'spring', stiffness: 160, damping: 16 }
            }
          : {
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }
      }
      className="relative w-full flex flex-col items-center lg:items-start gap-6"
    >
      <div
        {...tiltProps}
        className={`relative w-full max-w-sm rounded-[32px] p-3.5 border shadow-2xl group cursor-pointer transition-colors duration-500 ${
          isSunset
            ? 'bg-[#231333] border-orange-500/35 shadow-orange-950/20'
            : 'bg-[#fffdf5] border-[#e8dbc0] shadow-[#8c6239]/8'
        }`}
      >
        <div
          className={`relative aspect-[3/4] w-full rounded-[24px] overflow-hidden border flex items-center justify-center ${
            isSunset
              ? 'bg-[#180a24] border-orange-500/25'
              : 'bg-[#faeed1] border-[#e2d3b3]'
          }`}
        >
          <img
            src={profileData.avatarUrl || '/avatar.svg'}
            alt={profileData.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/avatar.svg';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-transparent to-transparent opacity-65 pointer-events-none" />

          <div
            className={`absolute bottom-4 left-4 right-4 p-3 rounded-xl border backdrop-blur-md shadow-sm ${
              isSunset
                ? 'bg-[#1a0c24]/90 border-orange-500/30'
                : 'bg-[#fffdf5]/90 border-[#e8dbc0]'
            }`}
          >
            <div className={`text-sm font-bold ${isSunset ? 'text-white' : 'text-[#0f172a]'}`}>
              {profileData.name}
            </div>
            <div className={`text-xs font-mono mt-0.5 ${isSunset ? 'text-amber-300' : 'text-[#8c6239]'}`}>
              {profileData.education}
            </div>
          </div>
        </div>

        <div className={`mt-3 px-2 flex items-center justify-between text-[11px] font-mono ${isSunset ? 'text-amber-300' : 'text-[#8c6239]'}`}>
          <span>FOTO PROFIL</span>
          <span>ID // {profileData.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Location & Operating Environment */}
      <motion.div
        animate={isFlooded ? { rotate: 12, x: 24, y: 30 } : { rotate: 0, x: 0, y: 0 }}
        className={`w-full max-w-sm p-4 rounded-2xl border flex items-center justify-between text-xs font-mono shadow-sm transition-colors duration-500 ${
          isSunset
            ? 'bg-[#231333] border-orange-500/35 text-slate-200'
            : 'bg-[#fffdf5] border-[#e8dbc0] text-[#0f172a]'
        }`}
      >
        <div className="flex items-center gap-2">
          <MapPin className={`w-4 h-4 ${isSunset ? 'text-amber-400' : 'text-[#8c6239]'}`} />
          <span>{profileData.contact.location || 'Indonesia'}</span>
        </div>
        <span className={`font-bold ${isSunset ? 'text-amber-400' : 'text-[#0284c7]'}`}>Linux Enthusiasts</span>
      </motion.div>
    </motion.div>
  );
};
