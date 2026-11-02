import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  Clock,
  Star,
  FolderGit2,
  Settings,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import type { TemplateComponentProps } from '../types';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useLenisSmoothScroll } from '../../hooks/useLenisSmoothScroll';
import { TechIcon } from '../common/TechIcon';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';

export const BentoTemplate: React.FC<TemplateComponentProps> = ({ onOpenProject }) => {
  const { profile, projects, techStack, experience } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useLenisSmoothScroll();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Jakarta',
        }) + ' WIB'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    if (profile.contact.email) {
      navigator.clipboard.writeText(profile.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featuredProject?.id);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] font-sans antialiased selection:bg-indigo-500 selection:text-white relative pb-20">
      {/* Background Gradient Accents */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      {/* Bento Top Bar */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#13192b]/80 backdrop-blur-2xl border border-slate-800/80 rounded-2xl px-5 py-3 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-bold text-white text-sm tracking-wide">
              {profile.name} <span className="text-slate-500 font-normal">/ Studio</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#/admin"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin</span>
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Main Bento Grid */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* ROW 1: Hero & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Main Profile Intro (2 cols) */}
          <div className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#13192b]/90 border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={profile.avatarUrl || '/avatar.svg'}
                  alt={profile.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30 bg-slate-800 shadow-md"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/avatar.svg'; }}
                />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {profile.status || 'Active'}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {profile.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-400">{profile.tagline}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                {profile.bio}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {profile.contact.location || 'Indonesia'}
              </span>
              <span className="text-slate-300 font-medium">
                {profile.education}
              </span>
            </div>
          </div>

          {/* Card 2: Live Clock & Status (1 col) */}
          <div className="p-6 rounded-3xl bg-[#13192b]/90 border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Zona Waktu Lokal</span>
              <p className="text-xl font-bold text-white mt-1 font-mono tracking-tight">
                {currentTime || 'Jakarta (WIB)'}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Asia / Jakarta (UTC+7)
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Respons Cepat & Siap Remote</span>
            </div>
          </div>

          {/* Card 3: Numerical Impact (1 col) */}
          <div className="p-6 rounded-3xl bg-[#13192b]/90 border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Statistik Engineering</span>
            <div className="space-y-3 my-auto py-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Proyek Dikembangkan</span>
                <span className="text-2xl font-black text-indigo-400">{projects.length}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Tech Stack & Tools</span>
                <span className="text-2xl font-black text-purple-400">{techStack.length}+</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Fase Pengalaman</span>
                <span className="text-2xl font-black text-emerald-400">{experience.length}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile.experienceStart || 'Full-Stack Specialist'}</span>
            </div>
          </div>
        </div>

        {/* ROW 2: Flagship Project Bento Banner */}
        {featuredProject && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#13192b] via-[#161d33] to-[#1a1c3b] border border-slate-800/90 shadow-xl hover:border-indigo-500/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Project Image */}
              <div
                className="lg:col-span-7 rounded-2xl overflow-hidden aspect-video bg-slate-800 border border-slate-700/80 relative group cursor-pointer"
                onClick={() => onOpenProject(featuredProject)}
              >
                {featuredProject.imageUrl ? (
                  <img
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <FolderGit2 className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-indigo-600/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  Flagship Showcase
                </div>
              </div>

              {/* Project Info */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {featuredProject.category} Project
                  </span>
                  <h2
                    onClick={() => onOpenProject(featuredProject)}
                    className="text-2xl font-extrabold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {featuredProject.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-400">{featuredProject.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                  {featuredProject.summary || featuredProject.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {featuredProject.stack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-300 text-[11px] font-medium border border-slate-700/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    onClick={() => onOpenProject(featuredProject)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer text-center"
                  >
                    Detail Studi Kasus
                  </button>
                  {featuredProject.demoUrl && (
                    <a
                      href={featuredProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {featuredProject.githubUrl && !featuredProject.isPrivateRepo && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center justify-center"
                      title="GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROW 3: Tech Stack Bento & Social Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tech Matrix Bento (2 cols) */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#13192b]/90 border border-slate-800/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Arsenal & Kemampuan</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Core Tech Stack</h3>
              </div>
              <span className="text-xs text-slate-400">{techStack.length} tools</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/40 hover:bg-slate-800 transition-all flex items-center gap-3"
                >
                  <TechIcon name={tech.iconKey || tech.name} size={18} color={tech.color} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{tech.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase">{tech.layer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connect & Direct Social Bento (1 col) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#13192b]/90 border border-slate-800/90 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Saluran Komunikasi</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Connect With Me</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Tertarik mendiskusikan peluang kerja, proyek freelance, atau sekadar bertukar ide engineering?
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="truncate">{profile.contact.email}</span>
                </div>
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {profile.contact.github && (
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon size={16} />
                    <span>GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {profile.contact.linkedin && (
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon size={16} />
                    <span>LinkedIn Network</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
            </div>

            <a
              href={`mailto:${profile.contact.email}`}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 text-center transition-all"
            >
              Kirim Pesan Sekarang
            </a>
          </div>
        </div>

        {/* ROW 4: Other Projects in Grid */}
        {otherProjects.length > 0 && (
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Katalog Proyek Lainnya</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Eksplorasi Aplikasi & Web</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-3xl bg-[#13192b]/90 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 cursor-pointer" onClick={() => onOpenProject(project)}>
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <FolderGit2 className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-slate-300 uppercase">
                        {project.category}
                      </div>
                    </div>

                    <div>
                      <h4
                        onClick={() => onOpenProject(project)}
                        className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h4>
                      <p className="text-xs text-indigo-300/80 mt-0.5">{project.subtitle}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {project.summary || project.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex gap-1">
                      {project.stack?.slice(0, 3).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onOpenProject(project)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROW 5: Experience Bento Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#13192b]/90 border border-slate-800/90 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Jejak Karir</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Pengalaman & Milestone</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experience.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-indigo-500/30 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {item.period}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] text-slate-400 uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white">{item.role}</h4>
                <p className="text-xs text-indigo-300 font-medium">{item.organization}</p>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-12 pb-6 px-4 text-center text-xs text-slate-500 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} {profile.name} — Creative Bento Studio.</p>
        <a href="#/admin" className="hover:text-slate-300 transition-colors flex items-center gap-1">
          <Settings className="w-3.5 h-3.5" />
          <span>Admin Shortcut (Ctrl+Shift+A)</span>
        </a>
      </footer>
    </div>
  );
};

export default BentoTemplate;
