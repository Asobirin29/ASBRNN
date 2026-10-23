import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateTsCode(profile: any, projects: any, techStack: any, experience: any): string {
  return `import type { ProfileData, Project, TechItem, ExperienceItem } from '../types/portfolio';

export const profileData: ProfileData = ${JSON.stringify(profile, null, 2)};

export const techStackData: TechItem[] = ${JSON.stringify(techStack, null, 2)};

export const projectsData: Project[] = ${JSON.stringify(projects, null, 2)};

export const experienceData: ExperienceItem[] = ${JSON.stringify(experience, null, 2)};
`;
}

function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/save-portfolio-data' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { profile, projects, techStack, experience } = JSON.parse(body);
              const targetPath = path.resolve(__dirname, 'src/data/portfolioData.ts');
              const tsCode = generateTsCode(profile, projects, techStack, experience);
              fs.writeFileSync(targetPath, tsCode, 'utf-8');

              // Also update index.html title if profile.name is provided
              try {
                const indexHtmlPath = path.resolve(__dirname, 'index.html');
                if (fs.existsSync(indexHtmlPath) && profile?.name) {
                  let html = fs.readFileSync(indexHtmlPath, 'utf-8');
                  html = html.replace(/<title>.*?<\/title>/, `<title>${profile.name} — ${profile.tagline || 'Portfolio'}</title>`);
                  fs.writeFileSync(indexHtmlPath, html, 'utf-8');
                }
              } catch {
                // ignore
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Data berhasil disimpan langsung ke src/data/portfolioData.ts!' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/upload-image' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { filename, base64Data } = JSON.parse(body);
              const uploadsDir = path.resolve(__dirname, 'public/uploads');
              if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
              }
              const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
              const filePath = path.join(uploadsDir, safeName);
              const buffer = Buffer.from(base64Data.split(',')[1] || base64Data, 'base64');
              fs.writeFileSync(filePath, buffer);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url: `/uploads/${safeName}` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    adminApiPlugin(),
  ],
});

