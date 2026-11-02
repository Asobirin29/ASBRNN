import type { TemplateId, Project } from '../types/portfolio';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  category: 'Interactive' | 'Minimalist' | 'Terminal' | 'Retro';
  accentColor: string;
  previewGradient: string;
  styleTags: string[];
  features: string[];
  recommendedFor: string;
}

export interface TemplateComponentProps {
  onOpenProject: (project: Project) => void;
}

