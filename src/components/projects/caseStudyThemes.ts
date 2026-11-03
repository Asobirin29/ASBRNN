import type { TemplateId } from '../../types/portfolio';

/**
 * Per-template skin tokens for the Project Case Study modal.
 * Each template (Ocean / Bauhaus / Retro / Terminal) reskins the SAME modal
 * structure so the detail view matches the active portfolio theme.
 */
export interface CaseStudyTheme {
  /** Base font-family applied inline to the whole modal shell (empty = inherit). */
  fontFamily: string;
  /** Backdrop overlay behind the modal. */
  overlay: string;
  /** Modal container shell. */
  container: string;
  /** Header bottom divider. */
  headerDivider: string;
  /** Category badge (FULL-STACK / MOBILE). */
  badge: string;
  /** "// role" supporting text. */
  roleText: string;
  /** Main project title. */
  title: string;
  /** Subtitle under the title. */
  subtitle: string;
  /** Close (X) button. */
  closeBtn: string;
  /** Section heading (h4) text color + weight. */
  heading: string;
  /** Accent icon color class used inside headings. */
  accentIcon: string;
  /** Three metric tile backgrounds. */
  metricBg: [string, string, string];
  /** Three metric label colors. */
  metricLabel: [string, string, string];
  /** Metric value text. */
  metricValue: string;
  /** Generic reading panel (project mandate). */
  panel: string;
  /** Architecture list item. */
  archItem: string;
  /** Architecture check icon color. */
  archIcon: string;
  /** Challenge wrapper. */
  challengeWrap: string;
  /** Challenge inner title. */
  challengeTitle: string;
  /** Challenge body text. */
  challengeBody: string;
  /** Tech stack chip. */
  stackChip: string;
  /** Active thumbnail. */
  thumbActive: string;
  /** Inactive thumbnail. */
  thumbInactive: string;
  /** "Perbesar Layar Penuh" / enlarge pill. */
  enlargeBtn: string;
  /** Gallery grid card. */
  galleryCard: string;
  /** Primary action button (Live Demo). */
  primaryBtn: string;
  /** Secondary action button (GitHub). */
  secondaryBtn: string;
  /** Muted / disabled info chip (mobile native). */
  mutedInfo: string;
  /** Muted / disabled danger chip (private repo). */
  mutedDanger: string;
  /** "Tutup Dialog" footer button. */
  closeDialogBtn: string;
}

const OCEAN: CaseStudyTheme = {
  fontFamily: '',
  overlay: 'bg-[#0f172a]/60 backdrop-blur-sm',
  container:
    'bg-[#fffdf5] rounded-2xl sm:rounded-[32px] border-2 sm:border-4 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] sm:shadow-[12px_12px_0px_#0f172a]',
  headerDivider: 'border-[#0f172a]/20',
  badge:
    'text-[#0f172a] bg-[#fde047] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border-2 border-[#0f172a] font-mono font-black',
  roleText: 'text-[#64748b] font-mono font-bold',
  title: 'text-[#0f172a] font-black tracking-tight',
  subtitle: 'text-[#0284c7] font-mono font-bold',
  closeBtn:
    'rounded-xl sm:rounded-2xl bg-[#fff9d4] hover:bg-[#fee2e2] border-2 border-[#0f172a] text-[#0f172a] hover:text-[#dc2626] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
  heading: 'text-[#0f172a] font-mono font-black uppercase',
  accentIcon: 'text-[#0284c7]',
  metricBg: ['bg-[#e0f2fe]', 'bg-[#fef9c3]', 'bg-[#dcfce7]'],
  metricLabel: ['text-[#0369a1]', 'text-[#854d0e]', 'text-[#15803d]'],
  metricValue: 'text-[#0f172a] font-black',
  panel:
    'text-[#334155] bg-[#fff9d4] rounded-xl sm:rounded-2xl border-2 border-[#0f172a]/30 font-medium',
  archItem:
    'bg-[#fff9d4] rounded-xl border border-[#0f172a]/30 text-[#0f172a] font-medium',
  archIcon: 'text-[#16a34a]',
  challengeWrap: 'bg-[#fef9c3] rounded-2xl border-2 border-[#0f172a]/30 text-[#0f172a]',
  challengeTitle: 'text-[#854d0e] font-black',
  challengeBody: 'text-[#334155] font-medium',
  stackChip:
    'font-mono font-bold rounded-xl bg-[#fff9d4] text-[#0f172a] border border-[#0f172a]/50',
  thumbActive:
    'border-[#0284c7] ring-2 ring-[#0284c7]/40 shadow-[2px_2px_0px_#0f172a] scale-105 rounded-xl',
  thumbInactive:
    'border-[#0f172a]/30 hover:border-[#0f172a] opacity-65 hover:opacity-100 rounded-xl',
  enlargeBtn:
    'rounded-xl bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0369a1] font-mono font-bold border-2 border-[#0284c7]/50 shadow-[2px_2px_0px_#0f172a]',
  galleryCard:
    'rounded-xl sm:rounded-2xl border-2 border-[#0f172a] bg-[#0f172a] shadow-[3px_3px_0px_#0f172a]',
  primaryBtn:
    'rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
  secondaryBtn:
    'rounded-xl bg-[#fff9d4] hover:bg-[#faeed1] text-[#0f172a] font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
  mutedInfo: 'rounded-xl font-mono font-bold border-2 opacity-90 cursor-not-allowed bg-[#e0f2fe] text-[#0369a1] border-[#0284c7]/50',
  mutedDanger: 'rounded-xl font-mono font-bold border-2 opacity-90 cursor-not-allowed bg-[#fee2e2] text-[#991b1b] border-[#991b1b]/40',
  closeDialogBtn:
    'rounded-xl bg-[#fffdf5] hover:bg-[#fff9d4] text-[#0f172a] font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
};

// ── Bauhaus 1919: primary planes, heavy black seams, hard offset shadows, no radius ──
const MODERN: CaseStudyTheme = {
  fontFamily: 'var(--bauhaus-typography-face)',
  overlay: 'bg-[#000000]/70',
  container:
    'bg-[#f4f1ea] rounded-none border-4 border-[#000000] shadow-[8px_8px_0px_#000000] sm:shadow-[14px_14px_0px_#000000]',
  headerDivider: 'border-[#000000]',
  badge:
    'text-[#000000] bg-[#ffff00] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none border-2 border-[#000000] font-black uppercase tracking-wider',
  roleText: 'text-[#000000]/60 font-black uppercase tracking-wider',
  title: 'text-[#000000] font-black uppercase tracking-tight',
  subtitle: 'text-[#ff0000] font-black uppercase tracking-wide',
  closeBtn:
    'rounded-none bg-[#ff0000] hover:bg-[#000000] border-2 border-[#000000] text-[#ffffff] shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
  heading: 'text-[#000000] font-black uppercase tracking-wider',
  accentIcon: 'text-[#ff0000]',
  metricBg: ['bg-[#0000ff]', 'bg-[#ffff00]', 'bg-[#ff0000]'],
  metricLabel: ['text-[#ffffff]', 'text-[#000000]', 'text-[#ffffff]'],
  metricValue: 'text-[#000000] font-black',
  panel:
    'text-[#000000] bg-[#ffffff] rounded-none border-2 border-[#000000] font-medium',
  archItem:
    'bg-[#ffffff] rounded-none border-2 border-[#000000] text-[#000000] font-bold',
  archIcon: 'text-[#0000ff]',
  challengeWrap: 'bg-[#ffff00] rounded-none border-2 border-[#000000] text-[#000000]',
  challengeTitle: 'text-[#000000] font-black uppercase',
  challengeBody: 'text-[#000000] font-bold',
  stackChip:
    'font-black uppercase tracking-wide rounded-none bg-[#000000] text-[#ffffff] border-2 border-[#000000]',
  thumbActive:
    'border-[#ff0000] ring-2 ring-[#ff0000]/50 shadow-[2px_2px_0px_#000000] scale-105 rounded-none',
  thumbInactive:
    'border-[#000000] opacity-60 hover:opacity-100 rounded-none',
  enlargeBtn:
    'rounded-none bg-[#0000ff] hover:bg-[#000000] text-[#ffffff] font-black uppercase tracking-wide border-2 border-[#000000] shadow-[2px_2px_0px_#000000]',
  galleryCard:
    'rounded-none border-2 border-[#000000] bg-[#000000] shadow-[3px_3px_0px_#000000]',
  primaryBtn:
    'rounded-none bg-[#ff0000] hover:bg-[#000000] text-[#ffffff] font-black uppercase tracking-wide border-2 border-[#000000] shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
  secondaryBtn:
    'rounded-none bg-[#ffff00] hover:bg-[#000000] text-[#000000] hover:text-[#ffff00] font-black uppercase tracking-wide border-2 border-[#000000] shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
  mutedInfo: 'rounded-none font-black uppercase tracking-wide border-2 opacity-90 cursor-not-allowed bg-[#0000ff] text-[#ffffff] border-[#000000]',
  mutedDanger: 'rounded-none font-black uppercase tracking-wide border-2 opacity-90 cursor-not-allowed bg-[#ff0000] text-[#ffffff] border-[#000000]',
  closeDialogBtn:
    'rounded-none bg-[#f4f1ea] hover:bg-[#000000] text-[#000000] hover:text-[#ffffff] font-black uppercase tracking-wide border-2 border-[#000000] shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none',
};

// ── Retro Windows desktop: gray window chrome, navy titlebar, hard bevels, square ──
const RETRO: CaseStudyTheme = {
  fontFamily: 'var(--dp-typography-interface)',
  overlay: 'bg-[#008080]/70',
  container:
    'bg-[#d4d4d4] rounded-none retro-bevel-raised !shadow-[4px_4px_0px_0px_#000000] border-2',
  headerDivider: 'border-black/30',
  badge:
    'text-white bg-[#000080] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none border border-black font-retro-mono font-bold uppercase',
  roleText: 'text-black/60 font-retro-mono font-bold',
  title: 'text-[#000080] font-retro-display font-black tracking-tight',
  subtitle: 'text-black font-retro-mono font-bold',
  closeBtn: 'rounded-none retro-key-button !px-2.5 text-black',
  heading: 'text-[#000080] font-retro-mono font-bold uppercase',
  accentIcon: 'text-[#000080]',
  metricBg: ['bg-white', 'bg-[#ffffcc]', 'bg-white'],
  metricLabel: ['text-[#000080]', 'text-[#806600]', 'text-[#008080]'],
  metricValue: 'text-black font-black',
  panel: 'text-black bg-white rounded-none retro-bevel-inset font-medium',
  archItem: 'bg-white rounded-none retro-bevel-inset text-black font-medium',
  archIcon: 'text-[#008000]',
  challengeWrap: 'bg-[#ffffcc] rounded-none retro-bevel-inset text-black',
  challengeTitle: 'text-[#806600] font-black uppercase',
  challengeBody: 'text-black font-medium',
  stackChip:
    'font-retro-mono font-bold rounded-none retro-key-button !cursor-default text-black',
  thumbActive: 'border-[#000080] ring-2 ring-[#000080]/40 scale-105 rounded-none',
  thumbInactive: 'border-black/40 opacity-70 hover:opacity-100 rounded-none',
  enlargeBtn: 'rounded-none retro-key-button text-black font-retro-mono font-bold',
  galleryCard: 'rounded-none retro-bevel-raised bg-black',
  primaryBtn: 'rounded-none retro-key-button text-black font-retro-mono font-bold !bg-[#c0c0c0]',
  secondaryBtn: 'rounded-none retro-key-button text-black font-retro-mono font-bold',
  mutedInfo: 'rounded-none retro-bevel-inset bg-white text-[#000080] font-retro-mono font-bold cursor-not-allowed',
  mutedDanger: 'rounded-none retro-bevel-inset bg-white text-[#800000] font-retro-mono font-bold cursor-not-allowed',
  closeDialogBtn: 'rounded-none retro-key-button text-black font-retro-mono font-bold',
};

// ── Terminal: flat black, green mono, thin green rules, no radius, no shadow ──
const CYBER: CaseStudyTheme = {
  fontFamily: 'var(--dp-typography-face)',
  overlay: 'bg-black/85',
  container:
    'bg-[#000000] rounded-none border border-[#255325] shadow-[0_0_0_1px_#255325,0_0_40px_rgba(102,255,102,0.12)]',
  headerDivider: 'border-[#255325]',
  badge:
    'text-[#66ff66] bg-transparent px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none border border-[#255325] font-terminal-mono font-medium uppercase',
  roleText: 'text-[#3a7a3a] font-terminal-mono',
  title: 'text-[#66ff66] font-terminal-mono font-bold tracking-tight',
  subtitle: 'text-[#4ac24a] font-terminal-mono',
  closeBtn:
    'rounded-none bg-transparent hover:bg-[#66ff66] border border-[#255325] text-[#66ff66] hover:text-black',
  heading: 'text-[#66ff66] font-terminal-mono font-medium uppercase',
  accentIcon: 'text-[#66ff66]',
  metricBg: ['bg-[#041f17]', 'bg-[#041f17]', 'bg-[#041f17]'],
  metricLabel: ['text-[#4ac24a]', 'text-[#4ac24a]', 'text-[#4ac24a]'],
  metricValue: 'text-[#66ff66] font-bold',
  panel: 'text-[#9fe59f] bg-[#041f17] rounded-none border border-[#255325] font-normal',
  archItem: 'bg-[#041f17] rounded-none border border-[#255325] text-[#9fe59f] font-normal',
  archIcon: 'text-[#66ff66]',
  challengeWrap: 'bg-[#041f17] rounded-none border border-[#255325] text-[#9fe59f]',
  challengeTitle: 'text-[#66ff66] font-bold uppercase',
  challengeBody: 'text-[#9fe59f] font-normal',
  stackChip:
    'font-terminal-mono font-medium rounded-none bg-transparent text-[#66ff66] border border-[#255325]',
  thumbActive: 'border-[#66ff66] ring-1 ring-[#66ff66]/50 scale-105 rounded-none',
  thumbInactive: 'border-[#255325] opacity-60 hover:opacity-100 rounded-none',
  enlargeBtn:
    'rounded-none bg-transparent hover:bg-[#66ff66] hover:text-black text-[#66ff66] font-terminal-mono font-medium border border-[#255325]',
  galleryCard: 'rounded-none border border-[#255325] bg-black',
  primaryBtn:
    'rounded-none bg-transparent hover:bg-[#66ff66] hover:text-black text-[#66ff66] font-terminal-mono font-medium border border-[#66ff66]',
  secondaryBtn:
    'rounded-none bg-transparent hover:bg-[#66ff66] hover:text-black text-[#66ff66] font-terminal-mono font-medium border border-[#255325]',
  mutedInfo: 'rounded-none font-terminal-mono font-medium border border-[#255325] text-[#4ac24a] opacity-80 cursor-not-allowed',
  mutedDanger: 'rounded-none font-terminal-mono font-medium border border-[#255325] text-[#4ac24a] opacity-80 cursor-not-allowed',
  closeDialogBtn:
    'rounded-none bg-transparent hover:bg-[#66ff66] hover:text-black text-[#66ff66] font-terminal-mono font-medium border border-[#255325]',
};

const THEME_MAP: Record<TemplateId, CaseStudyTheme> = {
  ocean: OCEAN,
  modern: MODERN,
  retro: RETRO,
  cyber: CYBER,
};

export function getCaseStudyTheme(template: TemplateId): CaseStudyTheme {
  return THEME_MAP[template] ?? OCEAN;
}
