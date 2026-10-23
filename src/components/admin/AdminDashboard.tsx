import React, { useState, useCallback, useRef } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import type { ProfileData, Project, TechItem, ExperienceItem } from '../../types/portfolio';
import {
  ArrowLeft, Save, RotateCcw, User, FolderOpen, Cpu, Briefcase,
  Plus, Trash2, ChevronDown, ChevronUp, X, Eye, LogOut,
  Upload, Download, Copy, Database, Search,
  Layers, HardDrive, CheckCircle2, AlertCircle, Sparkles, Image as ImageIcon
} from 'lucide-react';

/* ───────── Toast Notification ───────── */
function useToast() {
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const show = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);
  return { toast, show };
}

const Toast: React.FC<{ toast: { msg: string; type: 'success' | 'error' | 'info' } | null }> = ({ toast }) => {
  if (!toast) return null;
  const colors = {
    success: 'bg-emerald-500 text-white shadow-emerald-500/25',
    error: 'bg-rose-500 text-white shadow-rose-500/25',
    info: 'bg-sky-500 text-white shadow-sky-500/25',
  };
  return (
    <div className={`fixed top-6 right-6 z-[9999] px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl transition-all duration-300 animate-[slideIn_0.3s_ease] flex items-center gap-2.5 ${colors[toast.type]}`}>
      {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
      {toast.type === 'info' && <Sparkles className="w-4 h-4 shrink-0" />}
      <span>{toast.msg}</span>
    </div>
  );
};

/* ───────── Common Styling ───────── */
const inputClass = 'w-full rounded-xl border border-[#334155] bg-[#0f172a] px-3.5 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all';
const labelClass = 'block text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-1.5';
const cardClass = 'bg-[#1e293b] rounded-2xl border border-[#334155] p-5 sm:p-6 shadow-sm';
const btnPrimary = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-sky-600/20 active:translate-y-0 cursor-pointer disabled:opacity-50';
const btnSuccess = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-600/20 active:translate-y-0 cursor-pointer';
const btnDanger = 'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium transition-all border border-red-500/30 cursor-pointer';
const btnGhost = 'inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl hover:bg-[#334155] text-[#94a3b8] hover:text-white text-sm font-medium transition-all cursor-pointer';

type AdminTab = 'profile' | 'projects' | 'techStack' | 'experience' | 'backup';

const tabs: { id: AdminTab; label: string; icon: React.ReactNode; badgeKey?: 'projects' | 'tech' | 'exp' }[] = [
  { id: 'profile', label: 'Profil & Kontak', icon: <User className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" />, badgeKey: 'projects' },
  { id: 'techStack', label: 'Tech Stack', icon: <Cpu className="w-4 h-4" />, badgeKey: 'tech' },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" />, badgeKey: 'exp' },
  { id: 'backup', label: 'Simpan & Backup', icon: <HardDrive className="w-4 h-4" /> },
];

/* ══════════════════════════════════════════════
   TAG LIST EDITOR
   ══════════════════════════════════════════════ */
const TagListEditor: React.FC<{
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}> = ({ tags = [], onChange, placeholder = 'Tambah...' }) => {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setNewTag('');
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2.5">
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-600/15 text-sky-300 text-xs font-medium border border-sky-500/30">
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((_, j) => j !== i))}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className={inputClass + ' flex-1'}
          placeholder={placeholder}
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
        />
        <button className={btnPrimary} onClick={addTag} type="button">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   IMAGE UPLOAD & PREVIEW COMPONENT
   ══════════════════════════════════════════════ */
const ImageUploadField: React.FC<{
  label: string;
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  placeholder?: string;
  aspect?: 'square' | 'video';
}> = ({ label, value, onChange, onUpload, showToast, placeholder = '/avatar.svg', aspect = 'square' }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await onUpload(file);
      if (res.success && res.url) {
        onChange(res.url);
        showToast('Gambar berhasil diunggah!');
      } else {
        showToast(res.error || 'Gagal mengunggah gambar', 'error');
      }
    } catch {
      showToast('Gagal memproses gambar', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Preview */}
        <div className={`relative shrink-0 rounded-xl overflow-hidden border border-[#334155] bg-[#0f172a] flex items-center justify-center ${
          aspect === 'square' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-28 h-16 sm:w-36 sm:h-20'
        }`}>
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).src = '/avatar.svg'; }}
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-[#64748b]" />
          )}
        </div>

        {/* Input & Upload */}
        <div className="flex-1 w-full space-y-2">
          <input
            className={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#334155] hover:bg-[#475569] text-xs font-semibold text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? 'Mengunggah...' : 'Unggah File dari Komputer'}
            </button>
            <span className="text-[11px] text-[#64748b]">Format: JPG, PNG, WEBP, SVG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   COLLAPSIBLE CARD
   ══════════════════════════════════════════════ */
const CollapsibleCard: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
  imageThumbnail?: string;
  onDelete?: () => void;
  onDuplicate?: () => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, subtitle, badge, imageThumbnail, onDelete, onDuplicate, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`${cardClass} overflow-hidden transition-all duration-200 border-l-4 ${open ? 'border-l-sky-500' : 'border-l-transparent'}`}>
      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3.5 min-w-0">
          {imageThumbnail && (
            <img
              src={imageThumbnail}
              alt={title}
              className="w-10 h-10 rounded-lg object-cover bg-[#0f172a] shrink-0 border border-[#334155]"
              onError={e => { (e.target as HTMLImageElement).src = '/avatar.svg'; }}
            />
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white truncate">{title || 'Tanpa Judul'}</h4>
              {badge && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-600/20 text-sky-400 border border-sky-500/30 uppercase tracking-wider">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-[#94a3b8] mt-0.5 truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-1.5 ml-3 shrink-0">
          {onDuplicate && (
            <button
              type="button"
              title="Duplikasi"
              className="p-2 rounded-lg hover:bg-[#334155] text-[#94a3b8] hover:text-white transition-all cursor-pointer"
              onClick={e => { e.stopPropagation(); onDuplicate(); }}
            >
              <Copy className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              title="Hapus"
              className="p-2 rounded-lg hover:bg-red-600/20 text-[#64748b] hover:text-red-400 transition-all cursor-pointer"
              onClick={e => { e.stopPropagation(); onDelete(); }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="p-1.5 text-[#64748b]">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {open && <div className="mt-5 pt-5 border-t border-[#334155] animate-[fadeIn_0.2s_ease]">{children}</div>}
    </div>
  );
};

/* ══════════════════════════════════════════════
   1. PROFILE EDITOR
   ══════════════════════════════════════════════ */
const ProfileEditor: React.FC<{
  data: ProfileData;
  onChange: (d: ProfileData) => void;
  onSave: () => void;
  onUploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}> = ({ data, onChange, onSave, onUploadImage, showToast }) => {
  const update = (key: keyof ProfileData, val: any) =>
    onChange({ ...data, [key]: val });
  const updateContact = (key: keyof ProfileData['contact'], val: string) =>
    onChange({ ...data, contact: { ...data.contact, [key]: val } });

  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-sky-400" /> Foto & Identitas Utama
        </h3>
        
        <div className="mb-6">
          <ImageUploadField
            label="Foto Avatar / Profil"
            value={data.avatarUrl}
            onChange={url => update('avatarUrl', url)}
            onUpload={onUploadImage}
            showToast={showToast}
            placeholder="/avatar.svg atau https://..."
            aspect="square"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nama Lengkap</label>
            <input className={inputClass} value={data.name} onChange={e => update('name', e.target.value)} placeholder="Contoh: Ahmad Fauzi" />
          </div>
          <div>
            <label className={labelClass}>Tagline / Keahlian Utama</label>
            <input className={inputClass} value={data.tagline} onChange={e => update('tagline', e.target.value)} placeholder="Contoh: Full-Stack & Mobile Developer" />
          </div>
          <div>
            <label className={labelClass}>Pendidikan / Afiliasi</label>
            <input className={inputClass} value={data.education} onChange={e => update('education', e.target.value)} placeholder="Contoh: Teknik Informatika (S1) • Universitas..." />
          </div>
          <div>
            <label className={labelClass}>Status Ketersediaan</label>
            <input className={inputClass} value={data.status} onChange={e => update('status', e.target.value)} placeholder="Contoh: Available for Engineering Roles & Projects" />
          </div>
          <div>
            <label className={labelClass}>Label Pengalaman / Mulai Aktif</label>
            <input className={inputClass} value={data.experienceStart} onChange={e => update('experienceStart', e.target.value)} placeholder="Contoh: Active Developer / 2024" />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Bio / Ringkasan Diri</label>
            <textarea className={inputClass + ' min-h-[90px] resize-y'} value={data.bio} onChange={e => update('bio', e.target.value)} placeholder="Tuliskan bio atau rangkuman profil kamu..." />
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" /> Kontak & Tautan Media Sosial
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" value={data.contact.email} onChange={e => updateContact('email', e.target.value)} placeholder="email@kamu.com" />
          </div>
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input className={inputClass} value={data.contact.github} onChange={e => updateContact('github', e.target.value)} placeholder="https://github.com/username" />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input className={inputClass} value={data.contact.linkedin} onChange={e => updateContact('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
          </div>
          <div>
            <label className={labelClass}>Lokasi (Kota, Negara)</label>
            <input className={inputClass} value={data.contact.location} onChange={e => updateContact('location', e.target.value)} placeholder="Contoh: Bandung, Indonesia" />
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" /> Bidang Minat / Interests
        </h3>
        <TagListEditor
          tags={data.interests || []}
          onChange={t => update('interests', t)}
          placeholder="Ketik topik minat lalu tekan Enter (contoh: Web Architecture, AI Engineering)..."
        />
      </div>

      <div className="flex justify-end pt-2">
        <button className={btnPrimary} onClick={onSave}>
          <Save className="w-4 h-4" /> Simpan Profil
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   2. PROJECTS EDITOR
   ══════════════════════════════════════════════ */
const ProjectsEditor: React.FC<{
  data: Project[];
  onChange: (d: Project[]) => void;
  onSave: () => void;
  onUploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}> = ({ data, onChange, onSave, onUploadImage, showToast }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'fullstack' | 'mobile'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const updateProject = (index: number, partial: Partial<Project>) => {
    const updated = [...data];
    updated[index] = { ...updated[index], ...partial };
    onChange(updated);
  };

  const addProject = () => {
    const id = `project-${Date.now()}`;
    const newProject: Project = {
      id,
      title: 'Proyek Baru',
      subtitle: 'Deskripsi singkat mengenai proyek ini',
      category: 'fullstack',
      summary: 'Ringkasan singkat yang menarik tentang fitur utama proyek.',
      description: 'Penjelasan komprehensif mengenai latar belakang, arsitektur, dan solusi yang diimplementasikan.',
      architecture: ['Frontend React + Tailwind', 'REST API Backend'],
      stack: ['React', 'TypeScript', 'Tailwind CSS'],
      highlights: ['Arsitektur modular dan rapi', 'Performa cepat dan responsif'],
      challenges: 'Tantangan teknis yang dihadapi dan cara menyelesaikannya.',
      role: 'Full-Stack Developer',
      demoUrl: '',
      githubUrl: '',
      imageUrl: '/avatar.svg',
      imageFit: 'cover',
      featured: true,
      metrics: [
        { label: 'Role', value: 'Lead Engineer' },
        { label: 'Platform', value: 'Web / Cloud' }
      ],
    };
    onChange([newProject, ...data]);
    showToast('Proyek baru ditambahkan!');
  };

  const duplicateProject = (index: number) => {
    const original = data[index];
    const copy: Project = {
      ...original,
      id: `${original.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${original.title} (Salinan)`,
      featured: false,
    };
    const updated = [...data];
    updated.splice(index + 1, 0, copy);
    onChange(updated);
    showToast('Proyek berhasil diduplikasi');
  };

  const deleteProject = (index: number) => {
    const title = data[index]?.title || 'proyek ini';
    if (confirm(`Yakin ingin menghapus ${title}?`)) {
      onChange(data.filter((_, i) => i !== index));
      showToast('Proyek dihapus');
    }
  };

  // Filtered view
  const filteredProjects = data.map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => {
      const matchCat = filterCategory === 'all' || item.category === filterCategory;
      const matchSearch = !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

  return (
    <div className="space-y-4">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#1e293b] p-4 rounded-2xl border border-[#334155]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            className={inputClass + ' pl-10'}
            placeholder="Cari proyek berdasarkan judul atau tech..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'fullstack', 'mobile'] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-sky-600 text-white'
                  : 'bg-[#0f172a] text-[#94a3b8] hover:text-white border border-[#334155]'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
          <button className={btnPrimary} onClick={addProject}>
            <Plus className="w-4 h-4" /> Tambah Proyek
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-[#1e293b] rounded-2xl border border-[#334155]">
            <p className="text-sm text-[#94a3b8]">Tidak ada proyek yang sesuai dengan pencarian / filter.</p>
          </div>
        ) : (
          filteredProjects.map(({ item: project, originalIndex: i }) => (
            <CollapsibleCard
              key={project.id || i}
              title={project.title}
              subtitle={`${project.category.toUpperCase()} · ${project.role || 'Developer'}`}
              badge={project.featured ? 'Featured' : undefined}
              imageThumbnail={project.imageUrl}
              onDuplicate={() => duplicateProject(i)}
              onDelete={() => deleteProject(i)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>ID Slug (Unik)</label>
                  <input className={inputClass} value={project.id} onChange={e => updateProject(i, { id: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Judul Proyek</label>
                  <input className={inputClass} value={project.title} onChange={e => updateProject(i, { title: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Subjudul / Tagline Singkat</label>
                  <input className={inputClass} value={project.subtitle} onChange={e => updateProject(i, { subtitle: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Kategori</label>
                  <select className={inputClass} value={project.category} onChange={e => updateProject(i, { category: e.target.value as 'fullstack' | 'mobile' })}>
                    <option value="fullstack">Fullstack</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Peran Kamu (Role)</label>
                  <input className={inputClass} value={project.role} onChange={e => updateProject(i, { role: e.target.value })} placeholder="e.g. Lead Full-Stack Engineer" />
                </div>

                {/* Image upload */}
                <div className="md:col-span-2">
                  <ImageUploadField
                    label="Gambar / Screenshot Proyek"
                    value={project.imageUrl}
                    onChange={url => updateProject(i, { imageUrl: url })}
                    onUpload={onUploadImage}
                    showToast={showToast}
                    placeholder="/projects/sample.png atau URL"
                    aspect="video"
                  />
                </div>

                <div>
                  <label className={labelClass}>Image Fit Mode</label>
                  <select className={inputClass} value={project.imageFit || 'cover'} onChange={e => updateProject(i, { imageFit: e.target.value as 'cover' | 'contain' })}>
                    <option value="cover">Cover (Memenuhi area)</option>
                    <option value="contain">Contain (Proporsional utuh)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Demo URL (Live Preview)</label>
                  <input className={inputClass} value={project.demoUrl || ''} onChange={e => updateProject(i, { demoUrl: e.target.value || undefined })} placeholder="https://..." />
                </div>
                <div>
                  <label className={labelClass}>GitHub URL</label>
                  <input className={inputClass} value={project.githubUrl || ''} onChange={e => updateProject(i, { githubUrl: e.target.value || undefined })} placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className={labelClass}>Label Status Demo</label>
                  <input className={inputClass} value={project.demoStatusLabel || ''} onChange={e => updateProject(i, { demoStatusLabel: e.target.value || undefined })} placeholder="e.g. Live Production, Prototype" />
                </div>

                {/* Checkboxes */}
                <div className="md:col-span-2 flex flex-wrap items-center gap-6 p-4 rounded-xl bg-[#0f172a] border border-[#334155]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={e => updateProject(i, { featured: e.target.checked })}
                      className="w-4 h-4 rounded border-[#334155] bg-[#1e293b] text-sky-500 focus:ring-sky-500/50 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-white">Featured Project (Tampil Utama)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={project.isPrivateRepo || false}
                      onChange={e => updateProject(i, { isPrivateRepo: e.target.checked })}
                      className="w-4 h-4 rounded border-[#334155] bg-[#1e293b] text-sky-500 focus:ring-sky-500/50 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-white">Private Repository</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={project.isMobileApp || false}
                      onChange={e => updateProject(i, { isMobileApp: e.target.checked })}
                      className="w-4 h-4 rounded border-[#334155] bg-[#1e293b] text-sky-500 focus:ring-sky-500/50 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-white">Mobile Application</span>
                  </label>
                </div>

                {project.isPrivateRepo && (
                  <div className="md:col-span-2">
                    <label className={labelClass}>Alasan Repository Privat</label>
                    <input
                      className={inputClass}
                      value={project.privateRepoReason || ''}
                      onChange={e => updateProject(i, { privateRepoReason: e.target.value })}
                      placeholder="e.g. Repository privat karena hak cipta institusi / perusahaan"
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className={labelClass}>Summary (Tampil di Kartu Proyek)</label>
                  <textarea className={inputClass + ' min-h-[70px] resize-y'} value={project.summary} onChange={e => updateProject(i, { summary: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description Lengkap (Tampil di Modal Case Study)</label>
                  <textarea className={inputClass + ' min-h-[90px] resize-y'} value={project.description} onChange={e => updateProject(i, { description: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Tantangan & Solusi (Challenges)</label>
                  <textarea className={inputClass + ' min-h-[70px] resize-y'} value={project.challenges} onChange={e => updateProject(i, { challenges: e.target.value })} />
                </div>
              </div>

              {/* Tag sections */}
              <div className="mt-4">
                <label className={labelClass}>Tech Stack</label>
                <TagListEditor tags={project.stack} onChange={t => updateProject(i, { stack: t })} placeholder="Ketik teknologi (e.g. React, Laravel, Flutter)..." />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Architecture Points</label>
                <TagListEditor tags={project.architecture} onChange={t => updateProject(i, { architecture: t })} placeholder="Ketik poin arsitektur..." />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Key Highlights</label>
                <TagListEditor tags={project.highlights} onChange={t => updateProject(i, { highlights: t })} placeholder="Ketik poin pencapaian..." />
              </div>

              {/* Metrics */}
              <div className="mt-4">
                <label className={labelClass}>Metrics & Stats (Label - Value)</label>
                <div className="space-y-2">
                  {project.metrics.map((m, mi) => (
                    <div key={mi} className="flex gap-2 items-center">
                      <input
                        className={inputClass + ' flex-1'}
                        placeholder="Label (e.g. Performance / Role)"
                        value={m.label}
                        onChange={e => {
                          const metrics = [...project.metrics];
                          metrics[mi] = { ...metrics[mi], label: e.target.value };
                          updateProject(i, { metrics });
                        }}
                      />
                      <input
                        className={inputClass + ' flex-1'}
                        placeholder="Value (e.g. 99 / Lead Dev)"
                        value={m.value}
                        onChange={e => {
                          const metrics = [...project.metrics];
                          metrics[mi] = { ...metrics[mi], value: e.target.value };
                          updateProject(i, { metrics });
                        }}
                      />
                      <button
                        type="button"
                        className="p-2 rounded-lg hover:bg-red-600/20 text-[#64748b] hover:text-red-400 transition-all cursor-pointer"
                        onClick={() => updateProject(i, { metrics: project.metrics.filter((_, j) => j !== mi) })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => updateProject(i, { metrics: [...project.metrics, { label: '', value: '' }] })}
                  >
                    <Plus className="w-4 h-4" /> Tambah Baris Metric
                  </button>
                </div>
              </div>
            </CollapsibleCard>
          ))
        )}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button className={btnGhost + ' border border-dashed border-[#334155]'} onClick={addProject}>
          <Plus className="w-4 h-4" /> Tambah Proyek Baru
        </button>
        <button className={btnPrimary} onClick={onSave}>
          <Save className="w-4 h-4" /> Simpan Semua Proyek
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   3. TECH STACK EDITOR
   ══════════════════════════════════════════════ */
const TechStackEditor: React.FC<{
  data: TechItem[];
  onChange: (d: TechItem[]) => void;
  onSave: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}> = ({ data, onChange, onSave, showToast }) => {
  const [filterLayer, setFilterLayer] = useState<'all' | TechItem['layer']>('all');

  const updateItem = (index: number, partial: Partial<TechItem>) => {
    const updated = [...data];
    updated[index] = { ...updated[index], ...partial };
    onChange(updated);
  };

  const addItem = () => {
    const newItem: TechItem = {
      name: 'Teknologi Baru',
      category: 'frontend',
      layer: 'client',
      iconKey: 'react',
      color: '#0284c7',
      roleTag: 'Framework / Tool',
      experienceYears: '2+ Tahun',
      usageContext: 'Penggunaan dalam arsitektur aplikasi dan alur pengembangan.',
      projectLinks: [],
    };
    onChange([newItem, ...data]);
    showToast('Item Tech baru ditambahkan!');
  };

  const deleteItem = (index: number) => {
    const name = data[index]?.name || 'item ini';
    if (confirm(`Hapus teknologi ${name}?`)) {
      onChange(data.filter((_, i) => i !== index));
      showToast('Teknologi dihapus');
    }
  };

  const filteredItems = data.map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => filterLayer === 'all' || item.layer === filterLayer);

  return (
    <div className="space-y-4">
      {/* Layer Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1e293b] p-4 rounded-2xl border border-[#334155]">
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'client', 'backend', 'database', 'devops'] as const).map(layer => (
            <button
              key={layer}
              type="button"
              onClick={() => setFilterLayer(layer)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterLayer === layer
                  ? 'bg-sky-600 text-white'
                  : 'bg-[#0f172a] text-[#94a3b8] hover:text-white border border-[#334155]'
              }`}
            >
              {layer === 'all' ? 'Semua Layer' : layer}
            </button>
          ))}
        </div>
        <button className={btnPrimary} onClick={addItem}>
          <Plus className="w-4 h-4" /> Tambah Tech Baru
        </button>
      </div>

      <div className="space-y-4">
        {filteredItems.map(({ item, originalIndex: i }) => (
          <CollapsibleCard
            key={`${item.name}-${i}`}
            title={item.name}
            subtitle={`${item.layer.toUpperCase()} · ${item.category} · ${item.roleTag || ''}`}
            onDelete={() => deleteItem(i)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nama Teknologi</label>
                <input className={inputClass} value={item.name} onChange={e => updateItem(i, { name: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Icon Key (SimpleIcons / Brand Slug)</label>
                <input className={inputClass} value={item.iconKey} onChange={e => updateItem(i, { iconKey: e.target.value })} placeholder="e.g. react, laravel, typescript, flutter" />
              </div>
              <div>
                <label className={labelClass}>Kategori</label>
                <select className={inputClass} value={item.category} onChange={e => updateItem(i, { category: e.target.value as TechItem['category'] })}>
                  <option value="frontend">Frontend</option>
                  <option value="mobile">Mobile</option>
                  <option value="backend">Backend</option>
                  <option value="tools">Tools</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Layer Arsitektur</label>
                <select className={inputClass} value={item.layer} onChange={e => updateItem(i, { layer: e.target.value as TechItem['layer'] })}>
                  <option value="client">Client (Frontend / Mobile)</option>
                  <option value="backend">Backend (API / Engine)</option>
                  <option value="database">Database (Storage / Cache)</option>
                  <option value="devops">DevOps (Cloud / Docker / CI)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Warna Brand (Hex Color)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={item.color}
                    onChange={e => updateItem(i, { color: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-[#334155] cursor-pointer bg-transparent"
                  />
                  <input className={inputClass + ' flex-1 font-mono'} value={item.color} onChange={e => updateItem(i, { color: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Role Tag</label>
                <input className={inputClass} value={item.roleTag || ''} onChange={e => updateItem(i, { roleTag: e.target.value })} placeholder="e.g. Component UI, REST Engine" />
              </div>
              <div>
                <label className={labelClass}>Lama Pengalaman</label>
                <input className={inputClass} value={item.experienceYears || ''} onChange={e => updateItem(i, { experienceYears: e.target.value })} placeholder="e.g. 2+ Tahun" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Konteks Penggunaan</label>
                <textarea className={inputClass + ' min-h-[70px] resize-y'} value={item.usageContext} onChange={e => updateItem(i, { usageContext: e.target.value })} placeholder="Bagaimana kamu mengimplementasikan teknologi ini..." />
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Tautan ID Proyek Terkait</label>
              <TagListEditor tags={item.projectLinks || []} onChange={t => updateItem(i, { projectLinks: t })} placeholder="Ketik ID proyek (e.g. cimart)..." />
            </div>
          </CollapsibleCard>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button className={btnGhost + ' border border-dashed border-[#334155]'} onClick={addItem}>
          <Plus className="w-4 h-4" /> Tambah Tech Baru
        </button>
        <button className={btnPrimary} onClick={onSave}>
          <Save className="w-4 h-4" /> Simpan Tech Stack
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   4. EXPERIENCE EDITOR
   ══════════════════════════════════════════════ */
const ExperienceEditor: React.FC<{
  data: ExperienceItem[];
  onChange: (d: ExperienceItem[]) => void;
  onSave: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}> = ({ data, onChange, onSave, showToast }) => {
  const updateItem = (index: number, partial: Partial<ExperienceItem>) => {
    const updated = [...data];
    updated[index] = { ...updated[index], ...partial };
    onChange(updated);
  };

  const addItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      period: '2024 - Sekarang',
      role: 'Peran / Jabatan',
      organization: 'Nama Organisasi / Perusahaan',
      badge: 'Badge / Label',
      category: 'project',
      description: 'Deskripsi tanggung jawab, kontribusi, dan pencapaian selama periode ini.',
      highlights: ['Pencapaian utama', 'Inisiatif yang berhasil dijalankan'],
      tech: ['React', 'TypeScript', 'Node.js'],
    };
    onChange([newItem, ...data]);
    showToast('Experience baru ditambahkan!');
  };

  const deleteItem = (index: number) => {
    const role = data[index]?.role || 'item ini';
    if (confirm(`Hapus pengalaman ${role}?`)) {
      onChange(data.filter((_, i) => i !== index));
      showToast('Pengalaman dihapus');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-[#1e293b] p-4 rounded-2xl border border-[#334155]">
        <div>
          <h4 className="text-sm font-bold text-white">Daftar Linimasa Pengalaman</h4>
          <p className="text-xs text-[#94a3b8]">Riwayat karir, bootcamp, pendidikan, dan proyek</p>
        </div>
        <button className={btnPrimary} onClick={addItem}>
          <Plus className="w-4 h-4" /> Tambah Experience
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item, i) => (
          <CollapsibleCard
            key={item.id || i}
            title={item.role}
            subtitle={`${item.organization} · ${item.period}`}
            badge={item.badge}
            onDelete={() => deleteItem(i)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>ID Slug</label>
                <input className={inputClass} value={item.id} onChange={e => updateItem(i, { id: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Periode Waktu</label>
                <input className={inputClass} value={item.period} onChange={e => updateItem(i, { period: e.target.value })} placeholder="e.g. 2024 - Sekarang" />
              </div>
              <div>
                <label className={labelClass}>Posisi / Peran</label>
                <input className={inputClass} value={item.role} onChange={e => updateItem(i, { role: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Nama Institusi / Organisasi</label>
                <input className={inputClass} value={item.organization} onChange={e => updateItem(i, { organization: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Badge / Keterangan Singkat</label>
                <input className={inputClass} value={item.badge || ''} onChange={e => updateItem(i, { badge: e.target.value })} placeholder="e.g. Intensive Bootcamp / S1" />
              </div>
              <div>
                <label className={labelClass}>Kategori</label>
                <select className={inputClass} value={item.category || 'project'} onChange={e => updateItem(i, { category: e.target.value as ExperienceItem['category'] })}>
                  <option value="education">Education (Pendidikan Formal)</option>
                  <option value="bootcamp">Bootcamp (Pelatihan Intensif)</option>
                  <option value="project">Project (Proyek Nyata / MBKM)</option>
                  <option value="security">Security (Keamanan Siber)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Deskripsi Pengalaman</label>
                <textarea className={inputClass + ' min-h-[90px] resize-y'} value={item.description} onChange={e => updateItem(i, { description: e.target.value })} />
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Highlights / Poin Pencapaian</label>
              <TagListEditor tags={item.highlights || []} onChange={t => updateItem(i, { highlights: t })} placeholder="Ketik poin pencapaian..." />
            </div>

            <div className="mt-4">
              <label className={labelClass}>Tech Stack / Keterampilan yang Digunakan</label>
              <TagListEditor tags={item.tech || []} onChange={t => updateItem(i, { tech: t })} placeholder="Ketik tech/skill..." />
            </div>
          </CollapsibleCard>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button className={btnGhost + ' border border-dashed border-[#334155]'} onClick={addItem}>
          <Plus className="w-4 h-4" /> Tambah Experience Baru
        </button>
        <button className={btnPrimary} onClick={onSave}>
          <Save className="w-4 h-4" /> Simpan Experience
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   5. BACKUP & CODE SYNC TAB
   ══════════════════════════════════════════════ */
const BackupAndSyncTab: React.FC<{
  onSavePermanent: () => void;
  isSavingPermanent: boolean;
  onExportJson: () => void;
  onImportJson: (jsonString: string) => void;
  onCopyTsCode: () => void;
  onReset: () => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}> = ({ onSavePermanent, isSavingPermanent, onExportJson, onImportJson, onCopyTsCode, onReset, showToast }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pasteJson, setPasteJson] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        onImportJson(text);
        showToast('Data berhasil diimpor dari file JSON!');
      } catch {
        showToast('Format file JSON tidak valid', 'error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePasteImport = () => {
    if (!pasteJson.trim()) return;
    try {
      onImportJson(pasteJson);
      setPasteJson('');
      showToast('Data berhasil diimpor!');
    } catch {
      showToast('Format JSON tidak valid. Periksa kembali teks JSON kamu.', 'error');
    }
  };

  const isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  return (
    <div className="space-y-6">
      {/* Permanent Save to Source Code or Cloud Notice */}
      {isLocal ? (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#1e293b] to-[#1e293b] border-2 border-emerald-500/40 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> REKOMENDASI UTAMA (LOCAL DEV)
              </div>
              <h3 className="text-lg font-bold text-white">Simpan Permanen ke File Code (`portfolioData.ts`)</h3>
              <p className="text-sm text-[#94a3b8] mt-1 max-w-2xl">
                Menulis langsung seluruh data kamu ke file <code className="text-sky-300 font-mono text-xs bg-[#0f172a] px-1.5 py-0.5 rounded">src/data/portfolioData.ts</code> di komputer kamu.
                Data akan menjadi data bawaan proyek, tidak akan hilang meskipun cache browser dibersihkan atau saat proyek di-push ke GitHub dan di-deploy!
              </p>
            </div>
            <button
              onClick={onSavePermanent}
              disabled={isSavingPermanent}
              className={`${btnSuccess} text-base px-6 py-3 shrink-0 shadow-emerald-500/25`}
            >
              <HardDrive className="w-5 h-5" />
              {isSavingPermanent ? 'Sedang Menyimpan...' : 'Simpan Permanen ke File Code'}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950/40 via-[#1e293b] to-[#1e293b] border-2 border-sky-500/40 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> CLOUD DEPLOYMENT (VERCEL)
              </div>
              <h3 className="text-lg font-bold text-white">Penyimpanan Aktif di Browser (LocalStorage)</h3>
              <p className="text-sm text-[#94a3b8] mt-1 max-w-2xl">
                Website kamu sedang berjalan di hosting Vercel. Perubahan yang kamu simpan akan langsung aktif di browser ini. Untuk memperbarui website publik secara permanen bagi semua orang: klik <strong className="text-white">"Salin Kode ke Clipboard"</strong> di bawah, tempel di file <code className="text-sky-300 font-mono text-xs bg-[#0f172a] px-1.5 py-0.5 rounded">src/data/portfolioData.ts</code> di komputermu, lalu lakukan <code className="text-emerald-400 font-mono text-xs">git push</code>.
              </p>
            </div>
            <button
              onClick={onSavePermanent}
              disabled={isSavingPermanent}
              className={`${btnSuccess} text-base px-6 py-3 shrink-0 shadow-emerald-500/25`}
            >
              <CheckCircle2 className="w-5 h-5" />
              {isSavingPermanent ? 'Sedang Menyimpan...' : 'Simpan ke Browser'}
            </button>
          </div>
        </div>
      )}

      {/* JSON Backup & Restore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Download className="w-4 h-4 text-sky-400" /> Ekspor Cadangan (Download JSON)
          </h4>
          <p className="text-xs text-[#94a3b8] mb-4">
            Unduh seluruh data portofolio kamu ke dalam satu file JSON untuk disimpan sebagai cadangan pribadi.
          </p>
          <button onClick={onExportJson} className={btnPrimary}>
            <Download className="w-4 h-4" /> Unduh portfolio_data.json
          </button>
        </div>

        <div className={cardClass}>
          <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-sky-400" /> Impor dari File JSON
          </h4>
          <p className="text-xs text-[#94a3b8] mb-4">
            Pulihkan data kamu dari file JSON cadangan yang sudah pernah diekspor sebelumnya.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json,application/json"
            className="hidden"
          />
          <button onClick={() => fileInputRef.current?.click()} className={btnGhost + ' border border-[#334155]'}>
            <Upload className="w-4 h-4" /> Pilih File JSON Cadangan
          </button>
        </div>
      </div>

      {/* Copy TypeScript code */}
      <div className={cardClass}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Copy className="w-4 h-4 text-sky-400" /> Salin Kode TypeScript (`portfolioData.ts`)
            </h4>
            <p className="text-xs text-[#94a3b8] mt-1">
              Salin seluruh kode TypeScript data yang sudah kamu edit ke clipboard untuk ditempel langsung di editor teks (VS Code, dll).
            </p>
          </div>
          <button onClick={onCopyTsCode} className={btnGhost + ' border border-[#334155]'}>
            <Copy className="w-4 h-4" /> Salin Kode ke Clipboard
          </button>
        </div>
      </div>

      {/* Manual JSON Paste */}
      <div className={cardClass}>
        <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" /> Impor Manual via Paste JSON
        </h4>
        <p className="text-xs text-[#94a3b8] mb-3">
          Atau tempel teks JSON secara langsung di bawah ini untuk mengimpor data:
        </p>
        <textarea
          className={inputClass + ' font-mono text-xs min-h-[110px] resize-y mb-3'}
          placeholder='{"profile": {...}, "projects": [...]}'
          value={pasteJson}
          onChange={e => setPasteJson(e.target.value)}
        />
        <button
          onClick={handlePasteImport}
          disabled={!pasteJson.trim()}
          className={btnPrimary}
        >
          <Upload className="w-4 h-4" /> Terapkan JSON
        </button>
      </div>

      {/* Reset to Default */}
      <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Kembalikan ke Template Default
          </h4>
          <p className="text-xs text-[#94a3b8] mt-1">
            Menghapus semua perubahan di browser dan mengembalikan seluruh data ke template awal bawaan repositori.
          </p>
        </div>
        <button onClick={onReset} className={btnDanger}>
          <RotateCcw className="w-4 h-4" /> Reset Semua Data
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN ADMIN DASHBOARD
   ══════════════════════════════════════════════ */
export const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    profile, projects, techStack, experience,
    setProfile, setProjects, setTechStack, setExperience,
    resetAll, importAllData, exportAllDataJson, generateTypeScriptCode,
    savePermanentToCode, uploadImage
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState<AdminTab>('profile');
  const { toast, show } = useToast();
  const [isSavingPermanent, setIsSavingPermanent] = useState(false);

  // Local draft states
  const [draftProfile, setDraftProfile] = useState<ProfileData>(profile);
  const [draftProjects, setDraftProjects] = useState<Project[]>(projects);
  const [draftTech, setDraftTech] = useState<TechItem[]>(techStack);
  const [draftExperience, setDraftExperience] = useState<ExperienceItem[]>(experience);



  // Handle Permanent Save
  const handleSavePermanent = async () => {
    setIsSavingPermanent(true);
    // First save all drafts into local storage/context
    setProfile(draftProfile);
    setProjects(draftProjects);
    setTechStack(draftTech);
    setExperience(draftExperience);

    try {
      const res = await savePermanentToCode();
      if (res.success) {
        show(res.message || 'Data berhasil disimpan permanen ke src/data/portfolioData.ts!', 'success');
      } else {
        show(res.error || 'Gagal menyimpan ke file source code', 'error');
      }
    } catch {
      show('Gagal menghubungi server lokal', 'error');
    } finally {
      setIsSavingPermanent(false);
    }
  };

  // Handle JSON Export
  const handleExportJson = () => {
    const jsonStr = exportAllDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    show('File JSON cadangan berhasil diunduh!');
  };

  // Handle JSON Import
  const handleImportJson = (jsonString: string) => {
    const parsed = JSON.parse(jsonString);
    importAllData(parsed);
    if (parsed.profile) setDraftProfile(parsed.profile);
    if (parsed.projects) setDraftProjects(parsed.projects);
    if (parsed.techStack) setDraftTech(parsed.techStack);
    if (parsed.experience) setDraftExperience(parsed.experience);
  };

  // Handle Copy TS Code
  const handleCopyTsCode = () => {
    const code = generateTypeScriptCode();
    navigator.clipboard.writeText(code);
    show('Kode TypeScript disalin ke clipboard!');
  };

  // Handle Reset
  const handleReset = () => {
    if (confirm('Kembalikan semua data ke template bawaan? Semua perubahan kamu akan dihapus.')) {
      resetAll();
      show('Data berhasil di-reset!');
      setTimeout(() => window.location.reload(), 400);
    }
  };

  const isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  return (
    <div className="min-h-screen bg-[#0b1120] text-[#e2e8f0]">
      <Toast toast={toast} />

      {/* Custom Styles */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-2xl border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-[#1e293b] text-[#94a3b8] hover:text-white transition-all cursor-pointer"
              title="Kembali ke Portofolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Admin Portfolio Dashboard
                </h1>
                <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isLocal
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {isLocal ? 'LIVE LOCAL' : 'VERCEL LIVE'}
                </span>
              </div>
              <p className="text-xs text-[#64748b]">Edit dan sesuaikan seluruh data portofolio pribadimu</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSavePermanent}
              disabled={isSavingPermanent}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
              title={isLocal ? "Simpan data ke src/data/portfolioData.ts" : "Simpan perubahan ke browser (localStorage)"}
            >
              {isLocal ? <HardDrive className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isSavingPermanent ? 'Menyimpan...' : (isLocal ? 'Simpan ke File Code' : 'Simpan Data')}
              </span>
            </button>

            <button
              onClick={onBack}
              className={btnGhost}
              title="Lihat Website"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Web</span>
            </button>

            <button
              onClick={onBack}
              className={btnGhost}
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <nav className="lg:w-60 shrink-0">
          <div className="lg:sticky lg:top-20 space-y-1">
            {tabs.map(tab => {
              const count = tab.badgeKey === 'projects' ? draftProjects.length :
                            tab.badgeKey === 'tech' ? draftTech.length :
                            tab.badgeKey === 'exp' ? draftExperience.length : null;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm'
                      : 'text-[#94a3b8] hover:bg-[#1e293b] hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {count !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-sky-500/30 text-sky-300' : 'bg-[#334155] text-[#94a3b8]'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Profile Summary Card */}
            <div className="mt-6 p-4 rounded-2xl bg-[#1e293b] border border-[#334155] space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={draftProfile.avatarUrl || '/avatar.svg'}
                  alt={draftProfile.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#334155] bg-[#0f172a]"
                  onError={e => { (e.target as HTMLImageElement).src = '/avatar.svg'; }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{draftProfile.name || 'Nama Kamu'}</p>
                  <p className="text-[11px] text-[#94a3b8] truncate">{draftProfile.tagline || 'Tagline'}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#334155] text-[11px] text-[#64748b] space-y-1">
                <div className="flex justify-between">
                  <span>Proyek:</span>
                  <span className="text-white font-semibold">{draftProjects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tech Stack:</span>
                  <span className="text-white font-semibold">{draftTech.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="text-white font-semibold">{draftExperience.length}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Panel */}
        <main className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <ProfileEditor
              data={draftProfile}
              onChange={setDraftProfile}
              onSave={() => {
                setProfile(draftProfile);
                show('Profil berhasil disimpan!');
              }}
              onUploadImage={uploadImage}
              showToast={show}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsEditor
              data={draftProjects}
              onChange={setDraftProjects}
              onSave={() => {
                setProjects(draftProjects);
                show('Daftar Proyek berhasil disimpan!');
              }}
              onUploadImage={uploadImage}
              showToast={show}
            />
          )}

          {activeTab === 'techStack' && (
            <TechStackEditor
              data={draftTech}
              onChange={setDraftTech}
              onSave={() => {
                setTechStack(draftTech);
                show('Tech Stack berhasil disimpan!');
              }}
              showToast={show}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceEditor
              data={draftExperience}
              onChange={setDraftExperience}
              onSave={() => {
                setExperience(draftExperience);
                show('Experience berhasil disimpan!');
              }}
              showToast={show}
            />
          )}

          {activeTab === 'backup' && (
            <BackupAndSyncTab
              onSavePermanent={handleSavePermanent}
              isSavingPermanent={isSavingPermanent}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
              onCopyTsCode={handleCopyTsCode}
              onReset={handleReset}
              showToast={show}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
