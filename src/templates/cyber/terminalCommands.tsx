import type { ExperienceItem, ProfileData, Project, TechItem } from '../../types/portfolio';
import { scrollToLenis } from '../../hooks/useLenisSmoothScroll';
import type { ShellHandler } from './TerminalMotion';

export type Phosphor = 'green' | 'amber' | 'white';

interface CommandContext {
  profile: ProfileData;
  projects: Project[];
  techStack: TechItem[];
  experience: ExperienceItem[];
  onOpenProject: (project: Project) => void;
  setPhosphor: (p: Phosphor) => void;
  setCrt: (on: boolean) => void;
  startMatrix: () => void;
}

const SECTIONS: Record<string, string> = {
  intro: '#intro',
  home: '#intro',
  projects: '#projects',
  capabilities: '#capabilities',
  skills: '#capabilities',
  career: '#career',
  history: '#career',
  socket: '#socket',
  contact: '#socket',
  faq: '#faq',
};

export const COMMAND_DESCRIPTIONS: Record<string, string> = {
  help: 'tampilkan daftar perintah',
  whoami: 'identitas singkat pemilik sistem',
  about: 'bio lengkap',
  projects: 'daftar proyek (alias: ls)',
  open: 'open <n> — buka studi kasus proyek ke-n',
  skills: 'skills [client|backend|database|devops]',
  career: 'riwayat karir & pengalaman',
  contact: 'saluran komunikasi',
  email: 'salin alamat email ke clipboard',
  github: 'buka profil GitHub',
  linkedin: 'buka profil LinkedIn',
  cd: 'cd <section> — lompat ke bagian halaman',
  theme: 'theme <green|amber|white> — ganti warna fosfor',
  crt: 'crt <on|off> — efek scanline CRT',
  date: 'waktu sistem (WIB)',
  echo: 'echo <teks>',
  clear: 'bersihkan layar (ctrl+L)',
  matrix: '???',
  exit: 'tutup shell',
};

const pad = (s: string, n: number) => (s.length >= n ? s : s + ' '.repeat(n - s.length));

export function buildTerminalCommands(ctx: CommandContext): Record<string, ShellHandler> {
  const { profile, projects, techStack, experience } = ctx;

  const listProjects: ShellHandler = (_args, api) => {
    api.print(
      `total ${projects.length}`,
      ...projects.map(
        (p, i) => `-rwxr-xr-x  ${String(i + 1).padStart(2, '0')}  ${pad(`[${p.category}]`, 12)} ${p.title}${p.featured ? '  *' : ''}`
      ),
      { kind: 'ok', text: "→ ketik 'open 1' untuk membuka studi kasus" }
    );
  };

  const goTo = (section: string | undefined, api: Parameters<ShellHandler>[1]) => {
    const target = section ? SECTIONS[section.toLowerCase()] : undefined;
    if (!target) {
      api.print({ kind: 'err', text: `cd: ${section ?? ''}: no such section (${Object.keys(SECTIONS).join(', ')})` });
      return;
    }
    api.close();
    scrollToLenis(target, { offset: -56 });
  };

  return {
    help: (_args, api) =>
      api.print(
        'Perintah yang tersedia:',
        ...Object.entries(COMMAND_DESCRIPTIONS).map(([cmd, desc]) => `  ${pad(cmd, 10)} ${desc}`)
      ),

    whoami: (_args, api) =>
      api.print(
        { kind: 'ok', text: profile.name },
        profile.tagline,
        `status   : ${profile.status}`,
        `lokasi   : ${profile.contact.location}`,
        `edukasi  : ${profile.education}`
      ),

    about: (_args, api) => api.print(profile.bio),

    projects: listProjects,
    ls: listProjects,

    open: (args, api) => {
      const n = Number(args[0]);
      const project = Number.isInteger(n) ? projects[n - 1] : projects.find((p) => p.id === args[0]);
      if (!project) {
        api.print({ kind: 'err', text: `open: proyek '${args[0] ?? ''}' tidak ditemukan (1-${projects.length})` });
        return;
      }
      api.print({ kind: 'ok', text: `membuka ${project.title} ...` });
      ctx.onOpenProject(project);
    },

    skills: (args, api) => {
      const layer = args[0]?.toLowerCase();
      const items = layer ? techStack.filter((t) => t.layer === layer) : techStack;
      if (items.length === 0) {
        api.print({ kind: 'err', text: `skills: layer '${layer}' tidak dikenal` });
        return;
      }
      const groups = items.reduce<Record<string, string[]>>((acc, t) => {
        (acc[t.layer] ||= []).push(t.name);
        return acc;
      }, {});
      api.print(
        ...Object.entries(groups).map(([l, names]) => `${pad(l.toUpperCase(), 10)} ${names.join(', ')}`),
        { kind: 'ok', text: `[OK] ${items.length} modul terverifikasi` }
      );
    },

    career: (_args, api) =>
      api.print(
        ...experience.map(
          (e, i) => `#${String(i + 1).padStart(2, '0')}  ${pad(`[${e.period}]`, 22)} ${e.role} @ ${e.organization}`
        )
      ),

    contact: (_args, api) =>
      api.print(
        `email    : ${profile.contact.email}`,
        `github   : ${profile.contact.github}`,
        `linkedin : ${profile.contact.linkedin}`,
        { kind: 'ok', text: "→ 'email' untuk menyalin alamat" }
      ),

    email: (_args, api) => {
      navigator.clipboard
        ?.writeText(profile.contact.email)
        .then(() => api.print({ kind: 'ok', text: `[OK] ${profile.contact.email} disalin ke clipboard` }))
        .catch(() => api.print(profile.contact.email));
    },

    github: (_args, api) => {
      api.print({ kind: 'ok', text: `opening ${profile.contact.github} ...` });
      window.open(profile.contact.github, '_blank', 'noopener');
    },

    linkedin: (_args, api) => {
      api.print({ kind: 'ok', text: `opening ${profile.contact.linkedin} ...` });
      window.open(profile.contact.linkedin, '_blank', 'noopener');
    },

    cd: (args, api) => goTo(args[0], api),
    goto: (args, api) => goTo(args[0], api),

    theme: (args, api) => {
      const p = args[0]?.toLowerCase();
      if (p !== 'green' && p !== 'amber' && p !== 'white') {
        api.print({ kind: 'err', text: 'usage: theme <green|amber|white>' });
        return;
      }
      ctx.setPhosphor(p);
      api.print({ kind: 'ok', text: `phosphor set to ${p}` });
    },

    crt: (args, api) => {
      const on = args[0]?.toLowerCase() !== 'off';
      ctx.setCrt(on);
      api.print({ kind: 'ok', text: `crt scanlines ${on ? 'enabled' : 'disabled'}` });
    },

    date: (_args, api) =>
      api.print(new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', dateStyle: 'full', timeStyle: 'long' })),

    echo: (args, api) => api.print(args.join(' ')),

    clear: (_args, api) => api.clear(),

    sudo: (args, api) => {
      if (args.join(' ').toLowerCase().includes('hire')) {
        api.print(
          { kind: 'ok', text: '[sudo] permission granted. Excellent decision.' },
          `→ kirim penawaran ke ${profile.contact.email}`
        );
        return;
      }
      api.print({ kind: 'err', text: 'guest is not in the sudoers file. This incident will be reported. (coba: sudo hire)' });
    },

    matrix: (_args, api) => {
      api.print({ kind: 'ok', text: 'Wake up, Neo...' });
      ctx.startMatrix();
    },

    exit: (_args, api) => api.close(),
  };
}
