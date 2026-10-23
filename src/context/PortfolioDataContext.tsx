import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ProfileData, Project, TechItem, ExperienceItem } from '../types/portfolio';
import {
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
} as const;

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (key === STORAGE_KEYS.profile && parsed?.name === 'Reyhand Astra') {
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

interface PortfolioDataContextValue {
  profile: ProfileData;
  projects: Project[];
  techStack: TechItem[];
  experience: ExperienceItem[];
  setProfile: (data: ProfileData) => void;
  setProjects: (data: Project[]) => void;
  setTechStack: (data: TechItem[]) => void;
  setExperience: (data: ExperienceItem[]) => void;
  resetAll: () => void;
  importAllData: (data: { profile?: ProfileData; projects?: Project[]; techStack?: TechItem[]; experience?: ExperienceItem[] }) => void;
  exportAllDataJson: () => string;
  generateTypeScriptCode: () => string;
  savePermanentToCode: () => Promise<{ success: boolean; message?: string; error?: string }>;
  uploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
}

const PortfolioDataContext = createContext<PortfolioDataContextValue | null>(null);

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, _setProfile] = useState<ProfileData>(() =>
    loadFromStorage(STORAGE_KEYS.profile, defaultProfile)
  );
  const [projects, _setProjects] = useState<Project[]>(() =>
    loadFromStorage(STORAGE_KEYS.projects, defaultProjects)
  );
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
    _setProfile(defaultProfile);
    _setProjects(defaultProjects);
    _setTechStack(defaultTech);
    _setExperience(defaultExperience);
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  }, []);

  const importAllData = useCallback((data: {
    profile?: ProfileData;
    projects?: Project[];
    techStack?: TechItem[];
    experience?: ExperienceItem[];
  }) => {
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
      profile,
      projects,
      techStack,
      experience,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }, [profile, projects, techStack, experience]);

  const generateTypeScriptCode = useCallback(() => {
    return `import type { ProfileData, Project, TechItem, ExperienceItem } from '../types/portfolio';

export const profileData: ProfileData = ${JSON.stringify(profile, null, 2)};

export const techStackData: TechItem[] = ${JSON.stringify(techStack, null, 2)};

export const projectsData: Project[] = ${JSON.stringify(projects, null, 2)};

export const experienceData: ExperienceItem[] = ${JSON.stringify(experience, null, 2)};
`;
  }, [profile, projects, techStack, experience]);

  const savePermanentToCode = useCallback(async (): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const res = await fetch('/api/save-portfolio-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, projects, techStack, experience }),
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal menyimpan ke file source code' };
    }
  }, [profile, projects, techStack, experience]);

  const uploadImage = useCallback(async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: file.name, base64Data }),
          });
          if (res.ok) {
            const data = await res.json();
            resolve({ success: true, url: data.url });
          } else {
            // Fallback to base64 Data URL if upload endpoint fails (e.g. static host)
            resolve({ success: true, url: base64Data });
          }
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

  // Listen for changes from other tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.profile && e.newValue) {
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
        uploadImage
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

