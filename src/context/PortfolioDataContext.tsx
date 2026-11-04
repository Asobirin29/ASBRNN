import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ProfileData, Project, TechItem, ExperienceItem, TemplateId } from '../types/portfolio';
import {
  selectedTemplate as defaultTemplate,
  templateRevision as deployedTemplateRevision,
  profileData as defaultProfile,
  projectsData as defaultProjects,
  techStackData as defaultTech,
  experienceData as defaultExperience
} from '../data/portfolioData';

const STORAGE_KEYS = {
  profile: 'portfolio_profile',
  projects: 'portfolio_projects',
  techStack: 'portfolio_tech',
  experience: 'portfolio_experience',
  template: 'portfolio_template',
  templateRev: 'portfolio_template_rev',
} as const;

const VALID_TEMPLATES: TemplateId[] = ['ocean', 'modern', 'retro', 'cyber'];

/**
 * Sinkronisasi deployment terbaru ke localStorage perangkat.
 *
 * "Deployment wins": kalau kode yang baru di-deploy punya `templateRevision`
 * lebih baru daripada yang terakhir dilihat perangkat ini, kita pakai data
 * dari kode deployment (bukan localStorage lama). Ini memastikan ganti template
 * atau hapus/edit project di komputer lokal (lalu git push ke Vercel) langsung
 * ter-update otomatis saat dibuka di HP atau perangkat orang lain tanpa tertahan cache lama.
 */
function initSyncStorage(): boolean {
  const fallback = (VALID_TEMPLATES.includes(defaultTemplate as TemplateId)
    ? defaultTemplate
    : 'ocean') as TemplateId;
  try {
    const storedRev = Number(localStorage.getItem(STORAGE_KEYS.templateRev) || '0');
    if (!Number.isFinite(storedRev) || deployedTemplateRevision > storedRev) {
      localStorage.setItem(STORAGE_KEYS.templateRev, String(deployedTemplateRevision));
      localStorage.setItem(STORAGE_KEYS.template, JSON.stringify(fallback));
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(defaultProfile));
      localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(defaultProjects));
      localStorage.setItem(STORAGE_KEYS.techStack, JSON.stringify(defaultTech));
      localStorage.setItem(STORAGE_KEYS.experience, JSON.stringify(defaultExperience));
      return true;
    }
  } catch {
    // ignore storage errors
  }
  return false;
}

// Jalankan sinkronisasi awal satu kali sebelum React state diinisialisasi
initSyncStorage();

function resolveInitialTemplate(): TemplateId {
  const fallback = (VALID_TEMPLATES.includes(defaultTemplate as TemplateId)
    ? defaultTemplate
    : 'ocean') as TemplateId;
  try {
    const rawTemplate = localStorage.getItem(STORAGE_KEYS.template);
    if (rawTemplate) {
      const parsed = JSON.parse(rawTemplate);
      if (VALID_TEMPLATES.includes(parsed)) return parsed as TemplateId;
    }
  } catch {
    // ignore storage errors
  }
  return fallback;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (key === STORAGE_KEYS.profile && parsed?.name === 'Reyhand Astra') {
        return fallback;
      }
      if (key === STORAGE_KEYS.projects && Array.isArray(parsed) && parsed.some((p: any) => p.id === 'project-1792807297895')) {
        return fallback;
      }
      return parsed as T;
    }
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export interface SaveDataOverrides {
  profile?: ProfileData;
  projects?: Project[];
  techStack?: TechItem[];
  experience?: ExperienceItem[];
  selectedTemplate?: TemplateId;
}

interface PortfolioDataContextValue {
  selectedTemplate: TemplateId;
  setSelectedTemplate: (data: TemplateId) => void;
  profile: ProfileData;
  projects: Project[];
  techStack: TechItem[];
  experience: ExperienceItem[];
  setProfile: (data: ProfileData) => void;
  setProjects: (data: Project[]) => void;
  setTechStack: (data: TechItem[]) => void;
  setExperience: (data: ExperienceItem[]) => void;
  resetAll: () => void;
  importAllData: (data: { selectedTemplate?: TemplateId; profile?: ProfileData; projects?: Project[]; techStack?: TechItem[]; experience?: ExperienceItem[] }) => void;
  exportAllDataJson: () => string;
  generateTypeScriptCode: () => string;
  savePermanentToCode: (overrides?: SaveDataOverrides) => Promise<{ success: boolean; message?: string; error?: string }>;
  uploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  uploadMultipleImages: (files: FileList | File[]) => Promise<{ success: boolean; urls: string[]; errors: string[] }>;
}

const PortfolioDataContext = createContext<PortfolioDataContextValue | null>(null);

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTemplate, _setSelectedTemplate] = useState<TemplateId>(resolveInitialTemplate);
  const [profile, _setProfile] = useState<ProfileData>(() =>
    loadFromStorage(STORAGE_KEYS.profile, defaultProfile)
  );
  const [projects, _setProjects] = useState<Project[]>(() => {
    const rawProjects = loadFromStorage(STORAGE_KEYS.projects, defaultProjects);
    return rawProjects.map(p => ({
      ...p,
      images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.imageUrl ? [p.imageUrl] : [])
    }));
  });
  const [techStack, _setTechStack] = useState<TechItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.techStack, defaultTech)
  );
  const [experience, _setExperience] = useState<ExperienceItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.experience, defaultExperience)
  );

  // Sync document title with profile data
  useEffect(() => {
    if (profile?.name) {
      document.title = `${profile.name} — ${profile.tagline || 'Portfolio'}`;
    }
  }, [profile?.name, profile?.tagline]);

  const setSelectedTemplate = useCallback((tpl: TemplateId) => {
    _setSelectedTemplate(tpl);
    saveToStorage(STORAGE_KEYS.template, tpl);
  }, []);

  const setProfile = useCallback((data: ProfileData) => {
    _setProfile(data);
    saveToStorage(STORAGE_KEYS.profile, data);
  }, []);

  const setProjects = useCallback((data: Project[]) => {
    _setProjects(data);
    saveToStorage(STORAGE_KEYS.projects, data);
  }, []);

  const setTechStack = useCallback((data: TechItem[]) => {
    _setTechStack(data);
    saveToStorage(STORAGE_KEYS.techStack, data);
  }, []);

  const setExperience = useCallback((data: ExperienceItem[]) => {
    _setExperience(data);
    saveToStorage(STORAGE_KEYS.experience, data);
  }, []);

  const resetAll = useCallback(() => {
    _setSelectedTemplate(defaultTemplate || 'ocean');
    _setProfile(defaultProfile);
    _setProjects(defaultProjects);
    _setTechStack(defaultTech);
    _setExperience(defaultExperience);
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  }, []);

  const importAllData = useCallback((data: {
    selectedTemplate?: TemplateId;
    profile?: ProfileData;
    projects?: Project[];
    techStack?: TechItem[];
    experience?: ExperienceItem[];
  }) => {
    if (data.selectedTemplate) {
      _setSelectedTemplate(data.selectedTemplate);
      saveToStorage(STORAGE_KEYS.template, data.selectedTemplate);
      // Tandai perangkat ini sudah sinkron dengan revisi terbaru agar pilihan impor tidak tertimpa.
      saveToStorage(STORAGE_KEYS.templateRev, deployedTemplateRevision);
    }
    if (data.profile) {
      _setProfile(data.profile);
      saveToStorage(STORAGE_KEYS.profile, data.profile);
    }
    if (data.projects) {
      _setProjects(data.projects);
      saveToStorage(STORAGE_KEYS.projects, data.projects);
    }
    if (data.techStack) {
      _setTechStack(data.techStack);
      saveToStorage(STORAGE_KEYS.techStack, data.techStack);
    }
    if (data.experience) {
      _setExperience(data.experience);
      saveToStorage(STORAGE_KEYS.experience, data.experience);
    }
  }, []);

  const exportAllDataJson = useCallback(() => {
    return JSON.stringify({
      selectedTemplate,
      profile,
      projects,
      techStack,
      experience,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }, [selectedTemplate, profile, projects, techStack, experience]);

  const generateTypeScriptCode = useCallback(() => {
    return `import type { ProfileData, Project, TechItem, ExperienceItem, TemplateId } from '../types/portfolio';

export const selectedTemplate: TemplateId = ${JSON.stringify(selectedTemplate)};

// Dinaikkan otomatis setiap kali template disimpan permanen ke kode (save-to-code).
// Dipakai agar perangkat lain (mis. HP) ikut update tema saat deployment terbaru dimuat.
export const templateRevision = ${Date.now()};

export const profileData: ProfileData = ${JSON.stringify(profile, null, 2)};

export const techStackData: TechItem[] = ${JSON.stringify(techStack, null, 2)};

export const projectsData: Project[] = ${JSON.stringify(projects, null, 2)};

export const experienceData: ExperienceItem[] = ${JSON.stringify(experience, null, 2)};
`;
  }, [selectedTemplate, profile, projects, techStack, experience]);

  const savePermanentToCode = useCallback(async (overrides?: SaveDataOverrides): Promise<{ success: boolean; message?: string; error?: string }> => {
    const isLocal = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    const targetProfile = overrides?.profile ?? profile;
    const targetProjects = overrides?.projects ?? projects;
    const targetTech = overrides?.techStack ?? techStack;
    const targetExperience = overrides?.experience ?? experience;
    const targetTemplate = overrides?.selectedTemplate ?? selectedTemplate;

    if (!isLocal) {
      // In cloud static hosting (like Vercel), changes are stored in localStorage
      return {
        success: true,
        message: 'Perubahan berhasil disimpan ke browser ini (localStorage)! Karena sedang di Vercel (hosting statis), gunakan local dev (Laragon) lalu tekan "Simpan ke File Code" dan git push ke GitHub agar perubahan aktif untuk semua pengunjung.',
      };
    }

    try {
      const res = await fetch('/api/save-portfolio-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: targetProfile,
          projects: targetProjects,
          techStack: targetTech,
          experience: targetExperience,
          selectedTemplate: targetTemplate
        }),
      });
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (json.success) {
          saveToStorage(STORAGE_KEYS.templateRev, Date.now());
        }
        return json;
      } catch {
        return { success: false, error: 'Server dev lokal tidak mengembalikan format JSON yang valid.' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal menyimpan ke file source code lokal' };
    }
  }, [profile, projects, techStack, experience, selectedTemplate]);

  const uploadImage = useCallback(async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const isLocal = typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        if (!isLocal) {
          // On cloud static host (Vercel), store directly as base64 Data URL in browser
          resolve({ success: true, url: base64Data });
          return;
        }

        try {
          const res = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: file.name, base64Data }),
          });
          if (res.ok) {
            const text = await res.text();
            try {
              const data = JSON.parse(text);
              resolve({ success: true, url: data.url });
              return;
            } catch {
              // fallback
            }
          }
          resolve({ success: true, url: base64Data });
        } catch {
          // Fallback to base64 Data URL
          resolve({ success: true, url: base64Data });
        }
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Gagal membaca file gambar' });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadMultipleImages = useCallback(async (files: FileList | File[]): Promise<{ success: boolean; urls: string[]; errors: string[] }> => {
    const urls: string[] = [];
    const errors: string[] = [];
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const res = await uploadImage(file);
      if (res.success && res.url) {
        urls.push(res.url);
      } else {
        errors.push(res.error || `Gagal mengunggah ${file.name}`);
      }
    }

    return {
      success: urls.length > 0,
      urls,
      errors
    };
  }, [uploadImage]);

  // Listen for changes from other tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.template && e.newValue) {
        _setSelectedTemplate(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.profile && e.newValue) {
        _setProfile(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.projects && e.newValue) {
        _setProjects(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.techStack && e.newValue) {
        _setTechStack(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.experience && e.newValue) {
        _setExperience(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <PortfolioDataContext.Provider
      value={{
        selectedTemplate,
        setSelectedTemplate,
        profile,
        projects,
        techStack,
        experience,
        setProfile,
        setProjects,
        setTechStack,
        setExperience,
        resetAll,
        importAllData,
        exportAllDataJson,
        generateTypeScriptCode,
        savePermanentToCode,
        uploadImage,
        uploadMultipleImages
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export function usePortfolioData(): PortfolioDataContextValue {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error('usePortfolioData must be used within PortfolioDataProvider');
  return ctx;
}

