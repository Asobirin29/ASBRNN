import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFlutter,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiLinux,
  SiGit,
  SiVercel,
  SiPython,
  SiHtml5,
  SiCss,
  SiVite,
  SiFigma,
  SiMongodb,
  SiRedis,
  SiGraphql
} from '@icons-pack/react-simple-icons';
import { Code2 } from 'lucide-react';

const iconMap: Record<string, React.FC<{ size?: number; color?: string; className?: string }>> = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  flutter: SiFlutter,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  prisma: SiPrisma,
  docker: SiDocker,
  linux: SiLinux,
  git: SiGit,
  vercel: SiVercel,
  python: SiPython,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  vite: SiVite,
  figma: SiFigma,
  mongodb: SiMongodb,
  redis: SiRedis,
  graphql: SiGraphql,
};

interface TechIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 18, color, className = '' }) => {
  const normalizedKey = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const IconComponent = iconMap[normalizedKey] || iconMap[name.toLowerCase()];

  if (IconComponent) {
    return <IconComponent size={size} color={color} className={className} />;
  }

  return <Code2 className={className} style={{ width: size, height: size, color }} />;
};

export default TechIcon;
