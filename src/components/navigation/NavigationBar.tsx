import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X, Sun, Sunset } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useClipboard } from '../../hooks/useClipboard';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useTheme } from '../../context/ThemeContext';
import { BrandLogo } from '../common/BrandLogo';

export const NavigationBar: React.FC = () => {
  const { theme, isSunset, toggleTheme } = useTheme();
  const { profile: profileData } = usePortfolioData();
  const { isScrolled, scrollToSection } = useScrollPosition();
  const { copied, copy } = useClipboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const navItems = [
    { label: 'Profil', id: 'about' },
    { label: 'Studi Kasus', id: 'projects' },
    { label: 'Tech Stack', id: 'stack' },
    { label: 'Aktivitas', id: 'activity' },
    { label: 'Milestone', id: 'journey' },
    { label: 'Kontak', id: 'contact' },
  ];

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const isManualClickRef = useRef<boolean>(false);
  const manualClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePill = (sectionId: string) => {
    const el = tabRefs.current[sectionId];
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth
      });
    }
  };

  useEffect(() => {
    updatePill(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => updatePill(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualClickRef.current) return;

      const scrollPosition = window.scrollY + 240;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    isManualClickRef.current = true;
    setActiveSection(id);
    updatePill(id);
    scrollToSection(id);
    setMobileMenuOpen(false);

    if (manualClickTimerRef.current) clearTimeout(manualClickTimerRef.current);
    manualClickTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 850);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isSunset
            ? 'bg-[#1c0d28]/92 backdrop-blur-xl border-b border-[#f97316]/35 py-3 shadow-[0_8px_32px_rgba(234,88,12,0.35)]'
            : 'bg-[#02587a]/92 backdrop-blur-xl border-b border-[#38bdf8]/35 py-3 shadow-[0_8px_32px_rgba(2,88,122,0.45)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group cursor-pointer flex-shrink-0"
        >
          <BrandLogo size="md" withText />
        </button>

        <nav
          className={`hidden lg:flex items-center relative border p-1.5 rounded-full backdrop-blur-xl transition-all mx-auto ${
            isSunset
              ? 'bg-black/25 hover:bg-black/35 border-orange-500/35 shadow-[0_4px_24px_rgba(234,88,12,0.2)]'
              : 'bg-white/15 hover:bg-white/20 border-white/30 shadow-[0_4px_24px_rgba(2,132,199,0.2)]'
          }`}
        >
          {pillStyle.width > 0 && (
            <div
              className={`absolute top-1.5 bottom-1.5 rounded-full border shadow-inner pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isSunset
                  ? 'bg-orange-500/30 border-orange-400/50'
                  : 'bg-white/25 border-white/40'
              }`}
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`
              }}
            >
              <span
                className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                  isSunset
                    ? 'bg-[#fef08a] shadow-[0_0_8px_#f59e0b]'
                    : 'bg-[#fff9d4] shadow-[0_0_6px_#fff9d4]'
                }`}
              />
            </div>
          )}

          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="relative z-10 px-3 xl:px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer group select-none"
              >
                <span
                  className={`block wave-text-half ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          {/* Coastal Atmosphere Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold shadow-md transition-all backdrop-blur-xl cursor-pointer active:scale-95 select-none ${
              isSunset
                ? 'bg-gradient-to-r from-orange-500/30 to-amber-500/25 border-orange-400/50 text-amber-200 hover:border-amber-300 hover:shadow-[0_0_16px_rgba(249,115,22,0.45)]'
                : 'bg-white/15 hover:bg-white/25 border-white/30 hover:border-[#fff9d4] text-white hover:shadow-[0_0_16px_rgba(56,189,248,0.35)]'
            }`}
            title={isSunset ? 'Ubah ke Suasana Siang Cerah ☀️' : 'Ubah ke Suasana Sunset Senja 🌅'}
            aria-label="Toggle Atmosphere"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -30, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {isSunset ? (
                <>
                  <Sunset className="w-4 h-4 text-amber-300 drop-shadow-[0_0_6px_#f59e0b]" />
                  <span className="font-mono text-amber-100 font-bold tracking-wide">Sunset</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-yellow-300 drop-shadow-[0_0_6px_#fde047]" />
                  <span className="font-mono text-white font-medium tracking-wide">Siang</span>
                </>
              )}
            </motion.div>
          </button>

          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className={`flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-full border text-xs font-mono shadow-md transition-all backdrop-blur-xl cursor-pointer group active:scale-95 ${
              isSunset
                ? 'bg-black/30 hover:bg-black/45 border-orange-500/30 hover:border-amber-300 text-orange-100'
                : 'bg-white/15 hover:bg-white/25 border-white/30 hover:border-[#fff9d4] text-white'
            }`}
            title="Salin email"
          >
            {copied ? (
              <>
                <Check className={`w-3.5 h-3.5 ${isSunset ? 'text-amber-300' : 'text-[#fff9d4]'}`} />
                <span className={`font-bold ${isSunset ? 'text-amber-300' : 'text-[#fff9d4]'}`}>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className={`w-3.5 h-3.5 group-hover:rotate-6 transition-transform ${isSunset ? 'text-amber-300' : 'text-[#fff9d4]'}`} />
                <span className="font-medium hidden xl:inline">{profileData.contact.email}</span>
                <span className="font-medium xl:hidden">Email</span>
              </>
            )}
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border active:scale-95 transition-transform backdrop-blur-md shadow-sm ${
              isSunset
                ? 'bg-orange-500/30 border-orange-400/50 text-amber-300'
                : 'bg-white/15 border-white/30 text-yellow-300'
            }`}
            aria-label="Toggle Atmosphere"
            title={isSunset ? 'Ubah ke Siang' : 'Ubah ke Sunset'}
          >
            {isSunset ? <Sunset className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className={`p-2.5 rounded-xl border text-white active:scale-95 transition-transform backdrop-blur-md shadow-sm ${
              isSunset
                ? 'bg-black/30 border-orange-500/30 text-orange-200'
                : 'bg-white/15 border-white/30 text-white'
            }`}
            aria-label="Salin email"
          >
            {copied ? <Check className={`w-4 h-4 ${isSunset ? 'text-amber-300' : 'text-[#fff9d4]'}`} /> : <Copy className={`w-4 h-4 ${isSunset ? 'text-amber-300' : 'text-[#fff9d4]'}`} />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border text-white active:scale-95 transition-transform backdrop-blur-md shadow-sm ${
              isSunset
                ? 'bg-black/30 border-orange-500/30'
                : 'bg-white/15 border-white/30'
            }`}
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden backdrop-blur-2xl border-b px-6 py-4 mt-2 shadow-xl ${
              isSunset
                ? 'bg-[#1c0d28]/95 border-[#f97316]/35'
                : 'bg-[#02587a]/95 border-[#38bdf8]/35'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors ${
                    isSunset
                      ? 'text-orange-100 hover:text-amber-300 hover:bg-orange-500/20'
                      : 'text-white hover:text-[#fff9d4] hover:bg-white/15'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
