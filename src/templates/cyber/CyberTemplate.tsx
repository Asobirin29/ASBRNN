import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Settings,
  Terminal as TerminalIcon,
  FolderGit2
} from 'lucide-react';
import type { TemplateComponentProps } from '../types';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useLenisSmoothScroll } from '../../hooks/useLenisSmoothScroll';
import { shouldPlayIntro } from '../common/motion';
import { MatrixRain, ScrambleText, TerminalBoot, TerminalShell, TypedCommand } from './TerminalMotion';
import { TERMINAL_BOOT_KEY, TerminalLiveContext, useCommandSteps } from './terminalShared';
import type { ShellLine } from './TerminalMotion';
import { buildTerminalCommands, COMMAND_DESCRIPTIONS } from './terminalCommands';
import type { Phosphor } from './terminalCommands';

const PHOSPHOR_KEY = 'asbrnn:terminal-phosphor';
const QUICK_COMMANDS = ['help', 'whoami', 'projects', 'skills', 'career', 'contact', 'theme amber', 'matrix'];

const readPhosphor = (): Phosphor => {
  try {
    const v = localStorage.getItem(PHOSPHOR_KEY);
    return v === 'amber' || v === 'white' ? v : 'green';
  } catch {
    return 'green';
  }
};

export const CyberTemplate: React.FC<TemplateComponentProps> = ({ onOpenProject }) => {
  const { profile, projects, techStack, experience } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeCliTab, setActiveCliTab] = useState<'all' | 'fullstack' | 'mobile'>('all');
  const [booting, setBooting] = useState(() => shouldPlayIntro(TERMINAL_BOOT_KEY));
  const [warmup, setWarmup] = useState(false);
  const [shellOpen, setShellOpen] = useState(false);
  const [phosphor, setPhosphorState] = useState<Phosphor>(readPhosphor);
  const [crt, setCrt] = useState(true);
  const [matrix, setMatrix] = useState(false);
  const { done, finish } = useCommandSteps();

  useLenisSmoothScroll();

  const setPhosphor = useCallback((p: Phosphor) => {
    setPhosphorState(p);
    try {
      localStorage.setItem(PHOSPHOR_KEY, p);
    } catch {
      // Storage blocked: the choice lasts for this visit only.
    }
  }, []);

  const phosphorClass = phosphor === 'green' ? '' : `tm-phosphor-${phosphor}`;

  const commands = useMemo(
    () =>
      buildTerminalCommands({
        profile,
        projects,
        techStack,
        experience,
        onOpenProject: (p) => {
          setShellOpen(false);
          onOpenProject(p);
        },
        setPhosphor,
        setCrt,
        startMatrix: () => setMatrix(true),
      }),
    [profile, projects, techStack, experience, onOpenProject, setPhosphor]
  );

  const greeting = useMemo<ShellLine[]>(
    () => [
      { kind: 'ok', text: `ASBRNN OS 6.11 LTS — interactive session for ${profile.name}` },
      { kind: 'out', text: "Ketik 'help' untuk daftar perintah, atau tekan tombol di bawah." },
    ],
    [profile.name]
  );

  // Backtick or "/" opens the shell from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === '`' || e.key === '/') {
        e.preventDefault();
        setShellOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleCopyEmail = () => {
    if (profile.contact.email) {
      navigator.clipboard.writeText(profile.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (activeCliTab === 'all') return true;
    return p.category === activeCliTab;
  });

  // Group tech stack by layer for character-based tabular capability listing
  const groupedTech = techStack.reduce<Record<string, typeof techStack>>((acc, item) => {
    const layer = (item.layer || 'Other').toUpperCase();
    if (!acc[layer]) acc[layer] = [];
    acc[layer].push(item);
    return acc;
  }, {});

  const faqItems = [
    {
      q: "What are Ahmad's primary engineering competencies?",
      a: "Specializing in full-stack web platforms (React, Next.js, Node.js, Laravel), high-performance cross-platform mobile apps (Flutter, React Native), and distributed system architecture with cloud infrastructure (Docker, CI/CD, AWS)."
    },
    {
      q: "How can reviewers verify project implementations?",
      a: "Select [ INSPECT SPECIFICATION ] on any project to view detailed case studies, architectural breakdown, and production metrics. Live deployment links and GitHub source repositories are linked where publicly available."
    },
    {
      q: "What is the preferred protocol for job inquiries and contracting?",
      a: "Direct email transmission via ahmedsobirin95@gmail.com is preferred. Fast response is guaranteed for engineering roles, technical consultations, and contracting proposals."
    }
  ];

  return (
    <TerminalLiveContext.Provider value={!booting}>
    <div
      className="min-h-screen bg-[#000000] text-[#66ff66] font-mono selection:bg-[#66ff66] selection:text-[#000000] antialiased relative overflow-x-hidden pb-16"
      style={{
        fontFamily: 'var(--dp-typography-face, "TerminalPlex", "IBM Plex Mono", monospace)'
      }}
    >
      {booting && (
        <TerminalBoot
          name={profile.name}
          onDone={() => {
            setBooting(false);
            setWarmup(true);
          }}
        />
      )}
      {crt && <div className="tm-crt" aria-hidden="true" />}
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}

      <TerminalShell
        open={shellOpen}
        onClose={() => setShellOpen(false)}
        commands={commands}
        descriptions={COMMAND_DESCRIPTIONS}
        quickCommands={QUICK_COMMANDS}
        greeting={greeting}
        phosphorClass={phosphorClass}
      />
      {!shellOpen && !booting && (
        <button
          type="button"
          onClick={() => setShellOpen(true)}
          className={`tm-shell-toggle px-[1.5ch] py-[0.75ch] bg-[#000000] border border-[#66ff66] text-[#66ff66] hover:bg-[#66ff66] hover:text-[#000000] text-[13px] font-medium cursor-pointer rounded-none ${phosphorClass}`}
          title="Buka interactive shell (tombol ` atau /)"
        >
          &gt;_ shell
        </button>
      )}

      {/* Top Session Bar */}
      <header className={`sticky top-0 z-40 bg-[#000000] border-b border-[#255325] transition-colors ${phosphorClass}`}>
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 h-12 flex items-center justify-between text-[12px] sm:text-[14px]">
          <div className="flex items-center gap-[2ch] truncate">
            <span className="text-[#66ff66] font-medium flex items-center gap-[1ch]">
              <TerminalIcon className="w-4 h-4 shrink-0 text-[#66ff66]" />
              <span className="hidden sm:inline">MANUAL:</span>
              <span className="text-[#ffffff]">ASBRNN(1)</span>
            </span>
            <span className="text-[#255325] hidden md:inline">|</span>
            <span className="text-[#58ca58] hidden md:inline truncate">
              REV: 2026.11 // UTC+07:00
            </span>
            <span className="text-[#255325] hidden lg:inline">|</span>
            <span className="text-[#58ca58] hidden lg:inline">
              STATUS: <span className="text-[#ffffff] font-medium">READY</span>
            </span>
          </div>

          <div className="flex items-center gap-[1.5ch] sm:gap-[2ch] shrink-0">
            <nav className="hidden lg:flex items-center gap-[1.5ch] text-[12px] text-[#58ca58]" aria-label="Manual navigation">
              <a href="#intro" className="hover:text-[#66ff66] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66]">
                [01:MAN]
              </a>
              <a href="#projects" className="hover:text-[#66ff66] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66]">
                [02:PROJECTS]
              </a>
              <a href="#capabilities" className="hover:text-[#66ff66] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66]">
                [03:CAPABILITIES]
              </a>
              <a href="#career" className="hover:text-[#66ff66] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66]">
                [04:HISTORY]
              </a>
              <a href="#socket" className="hover:text-[#66ff66] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66]">
                [05:SOCKET]
              </a>
            </nav>

            <a
              href="#/admin"
              className="px-[1.5ch] py-[0.5ch] border border-[#255325] text-[#66ff66] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] text-[12px] font-medium transition-colors rounded-none flex items-center gap-[0.5ch]"
              title="Open System Admin (Shortcut: Ctrl+Shift+A)"
            >
              <Settings className="w-3.5 h-3.5 text-current" />
              <span>[ADMIN]</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main
        className={`max-w-[1240px] mx-auto px-4 sm:px-8 ${phosphorClass} ${warmup ? 'tm-warmup' : ''}`}
        onAnimationEnd={(e) => e.target === e.currentTarget && setWarmup(false)}
      >
        
        {/* ========================================================================= */}
        {/* 01. INTRO / SYSTEM MANUAL HERO */}
        {/* ========================================================================= */}
        <section id="intro" className="border-b border-[#255325] py-[36px] sm:py-[54px]">
          <div className="grid grid-cols-[3.5ch_1fr] sm:grid-cols-[5ch_1fr] lg:grid-cols-[6ch_1fr] gap-x-[1.5ch] sm:gap-x-[2ch] lg:gap-x-[3ch]">
            {/* Command Gutter */}
            <div className="select-none text-right font-medium text-[#58ca58] border-r border-[#255325] pr-[1.5ch] sm:pr-[2ch] pt-[2px]">
              01
            </div>

            {/* Output Column */}
            <div className={`tm-output min-w-0 space-y-[27px] ${done.intro ? 'is-ready' : ''}`}>
              {/* Command Line */}
              <div className="tm-cmd flex items-center gap-[1ch] text-[#66ff66] text-[16px] sm:text-[18px] font-medium">
                <span className="text-[#58ca58]">$</span>
                <TypedCommand text="man ahmad-sobirin(1)" idleCaret onDone={() => finish('intro')} speedMs={45} />
              </div>

              {/* Character Wordmark Header (Decorative for screen readers) */}
              <div className="hidden sm:block overflow-x-auto text-[11px] leading-tight text-[#58ca58] select-none py-1 border-b border-[#255325]" aria-hidden="true">
                <pre className="font-mono">
{`   _   _   _ __  __    _    ____    ____   ___  ____ ___ ____  ___ _   _ 
  / \\ | | | |  \\/  |  / \\  |  _ \\  / ___| / _ \\| __ )_ _|  _ \\|_ _| \\ | |
 / _ \\| |_| | |\\/| | / _ \\ | | | | \\___ \\| | | |  _ \\| || |_) || ||  \\| |
/ ___ \\  _  | |  | |/ ___ \\| |_| |  ___) | |_| | |_) | ||  _ < | || |\\  |
/_/   \\_\\_| |_|_|  |_/_/   \\_\\____/  |____/ \\___/|____/___|_| \\_\\___|_| \\_|`}
                </pre>
              </div>

              {/* Title & Opening Pairing with Supporting Facts */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 pt-2 items-start">
                {/* Main Prose & Actions */}
                <div className="space-y-[18px]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Character rendition / square photograph */}
                    <div className="relative shrink-0">
                      <div className="w-[100px] h-[100px] border border-[#255325] bg-[#000000] p-1 rounded-none flex items-center justify-center">
                        <img
                          src={profile.avatarUrl || '/avatar.svg'}
                          alt={`Photograph of ${profile.name}`}
                          className="w-full h-full object-cover rounded-none filter contrast-125 grayscale"
                          style={{
                            filter: 'grayscale(100%) brightness(0.95) sepia(100%) hue-rotate(80deg) saturate(320%)'
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/avatar.svg';
                          }}
                        />
                      </div>
                      <div className="text-[10px] text-[#58ca58] text-center mt-1 select-none" aria-hidden="true">
                        [UID: 1000]
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[14px] text-[#58ca58] uppercase tracking-wider">
                        // SYSTEM MANUAL RECORD
                      </p>
                      <h1 className="text-[32px] sm:text-[40px] font-medium text-[#ffffff] tracking-tight leading-[1.2]">
                        <ScrambleText text={profile.name} />
                      </h1>
                      <p className="text-[18px] text-[#66ff66] font-medium leading-[1.5]">
                        &gt;&gt; {profile.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-[18px] text-[#58ca58] leading-[1.5] max-w-2xl pt-2">
                    {profile.bio}
                  </p>

                  {/* Actions: Rectangular controls & Bracketed links */}
                  <div className="pt-4 flex flex-wrap items-center gap-[1.5ch]">
                    <button
                      type="button"
                      onClick={() => setShellOpen(true)}
                      className="inline-block px-[2ch] py-[1ch] border border-[#66ff66] text-[#66ff66] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] font-medium text-[16px] transition-colors rounded-none cursor-pointer"
                      title="Buka interactive shell (tombol ` atau /)"
                    >
                      [ &gt;_ ./interactive-shell ]
                    </button>
                    <a
                      href="#projects"
                      className="inline-block px-[2ch] py-[1ch] bg-[#66ff66] text-[#000000] font-medium text-[16px] hover:bg-[#ffffff] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] transition-colors rounded-none"
                    >
                      [ cat ./projects.catalog ]
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-block px-[2ch] py-[1ch] border border-[#255325] text-[#66ff66] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] font-medium text-[16px] transition-colors rounded-none cursor-pointer"
                      title="Copy email endpoint to clipboard"
                    >
                      {copiedEmail ? '[ COPIED TO CLIPBOARD ]' : `[ $ ping ${profile.contact.email} ]`}
                    </button>

                    {profile.contact.github && (
                      <a
                        href={profile.contact.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-[2ch] py-[1ch] border border-[#255325] text-[#58ca58] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] text-[16px] transition-colors rounded-none"
                      >
                        [ git/repo ]
                      </a>
                    )}

                    {profile.contact.linkedin && (
                      <a
                        href={profile.contact.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-[2ch] py-[1ch] border border-[#255325] text-[#58ca58] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] text-[16px] transition-colors rounded-none"
                      >
                        [ net/social ]
                      </a>
                    )}
                  </div>
                </div>

                {/* Supporting Facts Column */}
                <aside aria-label="System Specifications" className="border border-[#255325] p-[2ch] space-y-[12px] bg-[#000000] self-start w-full rounded-none">
                  <div className="text-[#ffffff] font-medium border-b border-[#255325] pb-[1ch] text-[12px] tracking-wider uppercase">
                    [ SYSTEM SPECIFICATION ]
                  </div>

                  <div className="space-y-[8px] text-[14px]">
                    <div className="flex justify-between gap-[2ch] border-b border-[#255325]/50 pb-[4px]">
                      <span className="text-[#58ca58]">IDENTITY</span>
                      <span className="text-[#ffffff] text-right font-medium truncate">{profile.name}</span>
                    </div>

                    <div className="flex justify-between gap-[2ch] border-b border-[#255325]/50 pb-[4px]">
                      <span className="text-[#58ca58]">ROLE</span>
                      <span className="text-[#66ff66] text-right font-medium">Full-Stack & Mobile</span>
                    </div>

                    <div className="flex justify-between gap-[2ch] border-b border-[#255325]/50 pb-[4px]">
                      <span className="text-[#58ca58]">LOCATION</span>
                      <span className="text-[#ffffff] text-right">{profile.contact?.location || 'Indonesia (UTC+7)'}</span>
                    </div>

                    <div className="flex justify-between gap-[2ch] border-b border-[#255325]/50 pb-[4px]">
                      <span className="text-[#58ca58]">STATUS</span>
                      <span className="text-[#66ff66] text-right font-medium">{profile.status || 'AVAILABLE'}</span>
                    </div>

                    <div className="flex justify-between gap-[2ch] border-b border-[#255325]/50 pb-[4px]">
                      <span className="text-[#58ca58]">RUNTIME</span>
                      <span className="text-[#ffffff] text-right">Linux / x86_64</span>
                    </div>

                    <div className="flex justify-between gap-[2ch]">
                      <span className="text-[#58ca58]">REPOS</span>
                      <span className="text-[#58ca58] text-right truncate">github/ahmedsobirin</span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 02. PROJECTS DIRECTORY / COMPARISON ROWS */}
        {/* ========================================================================= */}
        <section id="projects" className="border-b border-[#255325] py-[36px] sm:py-[54px]">
          <div className="grid grid-cols-[3.5ch_1fr] sm:grid-cols-[5ch_1fr] lg:grid-cols-[6ch_1fr] gap-x-[1.5ch] sm:gap-x-[2ch] lg:gap-x-[3ch]">
            {/* Command Gutter */}
            <div className="select-none text-right font-medium text-[#58ca58] border-r border-[#255325] pr-[1.5ch] sm:pr-[2ch] pt-[2px]">
              02
            </div>

            {/* Output Column */}
            <div className={`tm-output min-w-0 space-y-[27px] ${done.projects ? 'is-ready' : ''}`}>
              {/* Command Header & Filter Controls */}
              <div className="tm-cmd flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#255325]">
                <div className="flex items-center gap-[1ch] text-[#66ff66] text-[16px] sm:text-[18px] font-medium">
                  <span className="text-[#58ca58]">$</span>
                  <TypedCommand text={`ls -la ./projects --filter=${activeCliTab}`} onDone={() => finish('projects')} />
                </div>

                {/* Filter controls: rectangular buttons with square corners */}
                <div className="flex items-center gap-[1ch]" role="group" aria-label="Filter project categories">
                  {(['all', 'fullstack', 'mobile'] as const).map((cat) => {
                    const isSelected = activeCliTab === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCliTab(cat)}
                        aria-pressed={isSelected}
                        className={`px-[1.5ch] py-[0.5ch] text-[14px] uppercase font-medium transition-colors rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] cursor-pointer ${
                          isSelected
                            ? 'bg-[#66ff66] text-[#000000]'
                            : 'border border-[#255325] text-[#58ca58] hover:bg-[#66ff66] hover:text-[#000000]'
                        }`}
                      >
                        [ {cat} ]
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Projects Comparison Rows */}
              <div className="tm-rows divide-y divide-[#255325]">
                {filteredProjects.map((p, idx) => (
                  <article
                    key={p.id}
                    style={{ '--row': idx } as React.CSSProperties}
                    className="py-[27px] first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start"
                  >
                    {/* Identity Column (Left) */}
                    <div className="space-y-[9px]">
                      <div className="flex items-center justify-between text-[12px] text-[#58ca58]">
                        <span>-rwxr-xr-x</span>
                        <span className="text-[#255325]">#{(idx + 1).toString().padStart(2, '0')}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[12px] text-[#58ca58] font-medium block truncate">
                          mod_{p.id}
                        </span>
                        <h2
                          onClick={() => onOpenProject(p)}
                          className="text-[20px] sm:text-[24px] font-medium text-[#ffffff] hover:text-[#66ff66] transition-colors cursor-pointer leading-[1.2]"
                        >
                          <ScrambleText text={p.title} />
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-[1ch] pt-1">
                        <span className="text-[12px] border border-[#255325] text-[#58ca58] px-[1ch] py-[0.25ch]">
                          [{p.category.toUpperCase()}]
                        </span>
                        {p.featured && (
                          <span className="text-[12px] border border-[#66ff66] text-[#66ff66] px-[1ch] py-[0.25ch] font-medium">
                            [* FEATURED]
                          </span>
                        )}
                      </div>

                      {/* Project Image Preview */}
                      <div
                        onClick={() => onOpenProject(p)}
                        className="mt-3 aspect-video border border-[#255325] bg-[#000000] overflow-hidden relative cursor-pointer group"
                        title="Click to inspect specification"
                      >
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt={`Preview of project ${p.title}`}
                            className="w-full h-full object-cover rounded-none filter grayscale contrast-125 group-hover:filter-none transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#255325]">
                            <FolderGit2 className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Output & Features Column (Right) */}
                    <div className="space-y-[18px] lg:pl-[2ch]">
                      <div>
                        <p className="text-[16px] text-[#66ff66] font-medium">
                          &gt; {p.subtitle}
                        </p>
                        <p className="text-[16px] text-[#58ca58] leading-[1.5] mt-2">
                          {p.summary || p.description}
                        </p>
                      </div>

                      {/* Tech stack row */}
                      {p.stack && p.stack.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[12px] text-[#58ca58] uppercase tracking-wider block">
                            [ STACK SPECIFICATION ]
                          </span>
                          <div className="flex flex-wrap gap-[1ch]">
                            {p.stack.map((t, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[13px] border border-[#255325] px-[1ch] py-[0.25ch] text-[#58ca58]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions beneath row */}
                      <div className="flex flex-wrap items-center gap-[1.5ch] pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenProject(p)}
                          className="px-[2ch] py-[0.75ch] bg-[#66ff66] text-[#000000] hover:bg-[#ffffff] font-medium text-[14px] cursor-pointer rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] transition-colors"
                        >
                          [ INSPECT SPECIFICATION ]
                        </button>

                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-[2ch] py-[0.75ch] border border-[#255325] text-[#66ff66] hover:bg-[#66ff66] hover:text-[#000000] font-medium text-[14px] rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] transition-colors"
                          >
                            [ RUN LIVE DEMO -&gt; ]
                          </a>
                        )}

                        {p.githubUrl && !p.isPrivateRepo && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-[2ch] py-[0.75ch] border border-[#255325] text-[#58ca58] hover:bg-[#66ff66] hover:text-[#000000] font-medium text-[14px] rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] transition-colors"
                          >
                            [ VIEW SOURCE ]
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 03. COMPACT CAPABILITY LISTING / TECH STACK */}
        {/* ========================================================================= */}
        <section id="capabilities" className="border-b border-[#255325] py-[36px] sm:py-[54px]">
          <div className="grid grid-cols-[3.5ch_1fr] sm:grid-cols-[5ch_1fr] lg:grid-cols-[6ch_1fr] gap-x-[1.5ch] sm:gap-x-[2ch] lg:gap-x-[3ch]">
            {/* Command Gutter */}
            <div className="select-none text-right font-medium text-[#58ca58] border-r border-[#255325] pr-[1.5ch] sm:pr-[2ch] pt-[2px]">
              03
            </div>

            {/* Output Column */}
            <div className={`tm-output min-w-0 space-y-[27px] ${done.capabilities ? 'is-ready' : ''}`}>
              {/* Command Line */}
              <div className="tm-cmd flex items-center gap-[1ch] text-[#66ff66] text-[16px] sm:text-[18px] font-medium pb-3 border-b border-[#255325]">
                <span className="text-[#58ca58]">$</span>
                <TypedCommand text="sysinfo --capabilities --grouped" onDone={() => finish('capabilities')} />
              </div>

              <p className="text-[16px] text-[#58ca58] leading-[1.5]">
                Structured inventory of verified engineering toolchains, languages, and architecture modules:
              </p>

              {/* Grouped Capability Rows with Fine Separators */}
              <div className="tm-rows space-y-[27px]">
                {Object.entries(groupedTech).map(([layer, items], groupIdx) => (
                  <div key={layer} className="space-y-[9px]" style={{ '--row': groupIdx * 2 } as React.CSSProperties}>
                    <div className="text-[13px] text-[#66ff66] font-medium flex items-center gap-[1ch] pb-1 border-b border-[#255325]">
                      <span>LAYER: {layer}</span>
                      <span className="text-[#255325]">({items.length} items)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {items.map((tech, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-[1ch] border border-[#255325] bg-[#000000] flex items-center justify-between gap-[1ch] text-[14px]"
                        >
                          <div className="min-w-0">
                            <span className="text-[#ffffff] font-medium block truncate">
                              {tech.name}
                            </span>
                            <span className="text-[12px] text-[#58ca58] block truncate">
                              {tech.roleTag || tech.category}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#66ff66] shrink-0 font-mono">
                            [OK]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 04. NUMBERED STEPS / CAREER HISTORY LOG */}
        {/* ========================================================================= */}
        <section id="career" className="border-b border-[#255325] py-[36px] sm:py-[54px]">
          <div className="grid grid-cols-[3.5ch_1fr] sm:grid-cols-[5ch_1fr] lg:grid-cols-[6ch_1fr] gap-x-[1.5ch] sm:gap-x-[2ch] lg:gap-x-[3ch]">
            {/* Command Gutter */}
            <div className="select-none text-right font-medium text-[#58ca58] border-r border-[#255325] pr-[1.5ch] sm:pr-[2ch] pt-[2px]">
              04
            </div>

            {/* Output Column */}
            <div className={`tm-output min-w-0 space-y-[27px] ${done.career ? 'is-ready' : ''}`}>
              {/* Command Line */}
              <div className="tm-cmd flex items-center gap-[1ch] text-[#66ff66] text-[16px] sm:text-[18px] font-medium pb-3 border-b border-[#255325]">
                <span className="text-[#58ca58]">$</span>
                <TypedCommand text="log --career-history --order=desc" onDone={() => finish('career')} />
              </div>

              {/* Numbered Steps */}
              <div className="tm-rows divide-y divide-[#255325]">
                {experience.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{ '--row': idx } as React.CSSProperties}
                    className="py-[27px] first:pt-0 last:pb-0 space-y-[12px]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-baseline gap-[1.5ch]">
                        <span className="text-[12px] text-[#66ff66] font-medium border border-[#255325] px-[1ch] py-[0.25ch]">
                          STEP #{(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <h3 className="text-[18px] sm:text-[20px] font-medium text-[#ffffff]">
                          {item.role} @ <span className="text-[#66ff66]">{item.organization}</span>
                        </h3>
                      </div>
                      <span className="text-[14px] text-[#58ca58] shrink-0 font-medium">
                        [{item.period}]
                      </span>
                    </div>

                    <p className="text-[16px] text-[#58ca58] leading-[1.5]">
                      {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-[6px] pt-1 pl-[2ch] border-l border-[#255325]">
                        {item.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="text-[14px] text-[#58ca58] flex items-start gap-[1ch]">
                            <span className="text-[#66ff66] select-none">&gt;</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 05. COMMUNICATION SOCKET / CONTACT TRANSMISSION */}
        {/* ========================================================================= */}
        <section id="socket" className="border-b border-[#255325] py-[36px] sm:py-[54px]">
          <div className="grid grid-cols-[3.5ch_1fr] sm:grid-cols-[5ch_1fr] lg:grid-cols-[6ch_1fr] gap-x-[1.5ch] sm:gap-x-[2ch] lg:gap-x-[3ch]">
            {/* Command Gutter */}
            <div className="select-none text-right font-medium text-[#58ca58] border-r border-[#255325] pr-[1.5ch] sm:pr-[2ch] pt-[2px]">
              05
            </div>

            {/* Output Column */}
            <div className={`tm-output min-w-0 space-y-[27px] ${done.socket ? 'is-ready' : ''}`}>
              {/* Command Line */}
              <div className="tm-cmd flex items-center gap-[1ch] text-[#66ff66] text-[16px] sm:text-[18px] font-medium pb-3 border-b border-[#255325]">
                <span className="text-[#58ca58]">$</span>
                <TypedCommand text="socket --connect --interactive" onDone={() => finish('socket')} />
              </div>

              <div className="space-y-[18px] max-w-3xl">
                <h2 className="text-[24px] sm:text-[32px] font-medium text-[#ffffff] tracking-tight leading-[1.2]">
                  <ScrambleText text="ESTABLISH COMMUNICATION SOCKET" />
                </h2>

                <p className="text-[18px] text-[#58ca58] leading-[1.5]">
                  Open for software engineering roles, mobile architecture, high-load backend development, and specialized contracting contracts.
                </p>

                <div className="border border-[#255325] p-[2ch] space-y-[12px] bg-[#000000]">
                  <div className="flex justify-between gap-[2ch] text-[14px] border-b border-[#255325]/50 pb-2">
                    <span className="text-[#58ca58]">PROTOCOL</span>
                    <span className="text-[#ffffff]">SMTP / HTTPS / WSS</span>
                  </div>
                  <div className="flex justify-between gap-[2ch] text-[14px] border-b border-[#255325]/50 pb-2">
                    <span className="text-[#58ca58]">PRIMARY ENDPOINT</span>
                    <span className="text-[#66ff66] font-medium truncate">{profile.contact.email}</span>
                  </div>
                  <div className="flex justify-between gap-[2ch] text-[14px]">
                    <span className="text-[#58ca58]">GEOGRAPHIC LOC</span>
                    <span className="text-[#ffffff]">{profile.contact?.location || 'Indonesia (UTC+7)'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-[1.5ch] pt-2">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="inline-block px-[2ch] py-[1ch] bg-[#66ff66] text-[#000000] font-medium text-[16px] hover:bg-[#ffffff] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] transition-colors rounded-none"
                  >
                    [ TRANSMIT EMAIL (mailto) ]
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-block px-[2ch] py-[1ch] border border-[#255325] text-[#66ff66] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] font-medium text-[16px] transition-colors rounded-none cursor-pointer"
                  >
                    {copiedEmail ? '[ COPIED TO CLIPBOARD ]' : `[ COPY ENDPOINT: ${profile.contact.email} ]`}
                  </button>

                  {profile.contact.github && (
                    <a
                      href={profile.contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-[2ch] py-[1ch] border border-[#255325] text-[#58ca58] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] text-[16px] transition-colors rounded-none"
                    >
                      [ GITHUB ]
                    </a>
                  )}

                  {profile.contact.linkedin && (
                    <a
                      href={profile.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-[2ch] py-[1ch] border border-[#255325] text-[#58ca58] hover:bg-[#66ff66] hover:text-[#000000] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66] text-[16px] transition-colors rounded-none"
                    >
                      [ LINKEDIN ]
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 06. NATIVE DISCLOSURES / SESSION FAQ */}
        {/* ========================================================================= */}
        <section id="faq" className="border-b border-[#255325] py-[36px] sm:py-[54px]">
          <div className="grid grid-cols-[3.5ch_1fr] sm:grid-cols-[5ch_1fr] lg:grid-cols-[6ch_1fr] gap-x-[1.5ch] sm:gap-x-[2ch] lg:gap-x-[3ch]">
            {/* Command Gutter */}
            <div className="select-none text-right font-medium text-[#58ca58] border-r border-[#255325] pr-[1.5ch] sm:pr-[2ch] pt-[2px]">
              06
            </div>

            {/* Output Column */}
            <div className={`tm-output min-w-0 space-y-[27px] ${done.faq ? 'is-ready' : ''}`}>
              {/* Command Line */}
              <div className="tm-cmd flex items-center gap-[1ch] text-[#66ff66] text-[16px] sm:text-[18px] font-medium pb-3 border-b border-[#255325]">
                <span className="text-[#58ca58]">$</span>
                <TypedCommand text="cat ./session_notes.faq" onDone={() => finish('faq')} />
              </div>

              {/* Native Disclosures with +/- at right */}
              <div className="divide-y divide-[#255325]">
                {faqItems.map((item, qIdx) => (
                  <details
                    key={qIdx}
                    className="group py-[14px] first:pt-0 last:pb-0"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none text-[#66ff66] font-medium text-[16px] sm:text-[18px] hover:text-[#ffffff] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#66ff66]">
                      <span>{item.q}</span>
                      <span className="text-[#58ca58] text-[16px] font-mono group-open:hidden select-none">
                        [+]
                      </span>
                      <span className="text-[#66ff66] text-[16px] font-mono hidden group-open:inline select-none">
                        [-]
                      </span>
                    </summary>

                    <div className="mt-[12px] pl-[2ch] border-l border-[#255325] text-[#58ca58] text-[16px] leading-[1.5]">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* DIRECTORY-STYLE FOOTER */}
      {/* ========================================================================= */}
      <footer className={`max-w-[1240px] mx-auto px-4 sm:px-8 pt-12 text-[14px] text-[#58ca58] ${phosphorClass}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-[#255325]">
          {/* Column 1: Directory Index */}
          <div className="space-y-3">
            <div className="text-[#ffffff] font-medium uppercase tracking-wider text-[12px]">
              [ MANUAL DIRECTORY ]
            </div>
            <ul className="space-y-1.5 text-[14px]">
              <li>
                <a href="#intro" className="hover:text-[#66ff66] hover:underline">
                  01. Overview & Specification (man ahmad-sobirin)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#66ff66] hover:underline">
                  02. Projects Directory (/var/www/projects)
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#66ff66] hover:underline">
                  03. Capability Matrix & Compilers
                </a>
              </li>
              <li>
                <a href="#career" className="hover:text-[#66ff66] hover:underline">
                  04. Career Chronology Log
                </a>
              </li>
              <li>
                <a href="#socket" className="hover:text-[#66ff66] hover:underline">
                  05. Communication Socket (Email & Social)
                </a>
              </li>
              <li>
                <a href="#/admin" className="text-[#66ff66] hover:underline">
                  06. System Administration Console
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: System Session Parameters */}
          <div className="space-y-3">
            <div className="text-[#ffffff] font-medium uppercase tracking-wider text-[12px]">
              [ SESSION PARAMETERS ]
            </div>
            <div className="space-y-1.5 text-[13px] font-mono">
              <div className="flex justify-between">
                <span className="text-[#58ca58]">HOST:</span>
                <span className="text-[#ffffff]">asbrnn-kernel.local</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#58ca58]">USER:</span>
                <span className="text-[#ffffff]">guest (uid=1000)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#58ca58]">ENCODING:</span>
                <span className="text-[#ffffff]">UTF-8 / IBM Plex Mono</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#58ca58]">SURFACE:</span>
                <span className="text-[#ffffff]">Continuous Black #000000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#58ca58]">PALETTE:</span>
                <span className="text-[#66ff66]">ground / ink / rule / emphasis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#58ca58]">
          <p>
            (C) {new Date().getFullYear()} {profile.name}. Terminal Session Manual.
          </p>
          <p className="font-mono text-[#255325]">
            SESSION ACTIVE -- ALL SIGNALS NOMINAL
          </p>
        </div>
      </footer>
    </div>
    </TerminalLiveContext.Provider>
  );
};

export default CyberTemplate;