import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  Eye,
  Palette,
  Layers,
  Terminal,
  Waves,
  ArrowRight,
  HardDrive,
  Info,
  Monitor
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { TEMPLATES_REGISTRY } from '../../templates/registry';
import type { TemplateId } from '../../types/portfolio';

interface TemplateManagerProps {
  onBackToSite: () => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onSavePermanent: () => void;
  isSavingPermanent: boolean;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({
  onBackToSite,
  showToast,
  onSavePermanent,
  isSavingPermanent,
}) => {
  const { selectedTemplate, setSelectedTemplate } = usePortfolioData();

  const handleSelectTemplate = (id: TemplateId) => {
    setSelectedTemplate(id);
    const tpl = TEMPLATES_REGISTRY.find((t) => t.id === id);
    showToast(`Template berhasil diubah ke "${tpl?.name || id}"!`, 'success');
  };

  const handleApplyAndPreview = (id: TemplateId) => {
    setSelectedTemplate(id);
    const tpl = TEMPLATES_REGISTRY.find((t) => t.id === id);
    showToast(`Menerapkan template "${tpl?.name || id}"...`, 'success');
    setTimeout(() => {
      onBackToSite();
    }, 400);
  };

  const activeTemplateDef = TEMPLATES_REGISTRY.find((t) => t.id === selectedTemplate) || TEMPLATES_REGISTRY[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900/40 via-indigo-900/30 to-slate-900/80 rounded-2xl border border-sky-500/30 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30 mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Multi-Theme Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Manajemen & Pilihan Template Portofolio
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1 max-w-2xl leading-relaxed">
              Ganti desain dan nuansa portofolio kamu sesuka hati tanpa perlu memisah folder proyek! Seluruh data profil, proyek, keahlian, dan riwayat karir otomatis tersambung ke tema yang aktif.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white text-xs sm:text-sm font-semibold border border-[#334155] transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Lihat Web Portofolio</span>
            </button>
            <button
              onClick={onSavePermanent}
              disabled={isSavingPermanent}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
            >
              <HardDrive className="w-4 h-4" />
              <span>{isSavingPermanent ? 'Menyimpan...' : 'Simpan ke File Code'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Template Status Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#1e293b] border border-[#334155] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
            {activeTemplateDef.id === 'ocean' && <Waves className="w-5 h-5" />}
            {activeTemplateDef.id === 'modern' && <Layers className="w-5 h-5" />}
            {activeTemplateDef.id === 'retro' && <Monitor className="w-5 h-5 text-yellow-300" />}
            {activeTemplateDef.id === 'cyber' && <Terminal className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#94a3b8] font-medium">Tema yang sedang aktif:</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                LIVE AKTIF
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              {activeTemplateDef.name}{' '}
              <span className="text-xs font-normal text-sky-400">({activeTemplateDef.category})</span>
            </h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">{activeTemplateDef.tagline}</p>
          </div>
        </div>

        <button
          onClick={onBackToSite}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>Preview Web Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of All Available Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {TEMPLATES_REGISTRY.map((template) => {
          const isActive = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                isActive
                  ? 'bg-[#182338] border-sky-500 ring-2 ring-sky-500/30'
                  : 'bg-[#1e293b] border-[#334155] hover:border-slate-500 hover:bg-[#222f44]'
              }`}
            >
              {/* Template Miniature Mockup Banner */}
              <div className="p-4 sm:p-5 border-b border-[#334155] relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                {/* Visual miniature mockup tailored to each style */}
                <div className="h-32 sm:h-36 rounded-xl border border-slate-700/60 p-3 overflow-hidden relative shadow-inner flex flex-col justify-between select-none">
                  {template.id === 'ocean' && (
                    <div className="h-full bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] rounded-lg p-2 flex flex-col justify-between text-slate-900 relative overflow-hidden">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="bg-amber-400 px-2 py-0.5 rounded shadow">🏖️ Bikini Beach</span>
                        <span className="bg-white/80 px-1.5 py-0.5 rounded text-[9px]">Ocean Physics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 border border-slate-800 flex items-center justify-center text-xs">
                          🍍
                        </div>
                        <div className="space-y-0.5">
                          <div className="w-16 h-2 bg-slate-900/70 rounded" />
                          <div className="w-24 h-1.5 bg-slate-800/50 rounded" />
                        </div>
                      </div>
                      <div className="flex gap-1.5 text-[9px]">
                        <span className="bg-white/90 px-2 py-0.5 rounded font-bold shadow-sm">🌊 Dynamic Waves</span>
                        <span className="bg-white/90 px-2 py-0.5 rounded font-bold shadow-sm">🦀 Live Crab</span>
                      </div>
                    </div>
                  )}

                  {template.id === 'modern' && (
                    <div className="h-full bg-[#f5f4ee] rounded-none p-2 flex flex-col justify-between border-2 border-[#000000] relative overflow-hidden text-black font-sans">
                      <div className="flex items-center justify-between text-[10px] border-b-2 border-black pb-1 bg-[#f5f4ee]">
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 bg-[#ffff00] border border-black inline-block" />
                          <span className="text-black font-black uppercase text-[8px]">BAUHAUS 1919</span>
                        </div>
                        <span className="text-white text-[8px] bg-[#000000] px-1 py-0.2 font-black uppercase">Host Grotesk</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1 my-1 h-9">
                        <div className="col-span-8 bg-[#f5f4ee] border border-black p-1 flex flex-col justify-between">
                          <span className="text-[9px] font-black uppercase leading-none">AHMAD S.</span>
                          <span className="text-[6px] font-bold text-black/70">FULL-STACK ARCHITECT</span>
                        </div>
                        <div className="col-span-4 bg-[#ff0000] border border-black p-1 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-white border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center text-[6px] font-black">
                            ↓
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-0.5 text-[7px] font-black">
                        <span className="bg-[#ffff00] border border-black text-center py-0.5">03 PROYEK</span>
                        <span className="bg-[#0000ff] text-white border border-black text-center py-0.5">17+ TOOLS</span>
                        <span className="bg-[#000000] text-white border border-black text-center py-0.5">AKTIF</span>
                      </div>
                    </div>
                  )}

                  {template.id === 'retro' && (
                    <div className="h-full bg-[#008080] rounded-lg p-2 flex flex-col justify-between text-black border-2 border-[#808080] relative overflow-hidden select-none">
                      <div className="bg-[#000080] text-white px-1.5 py-0.5 text-[8px] flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 bg-yellow-400 text-black flex items-center justify-center text-[7px] font-black">95</span>
                          <span>RETRO_DESKTOP.EXE</span>
                        </span>
                        <span className="text-[7px]">_ □ ✕</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1 my-1">
                        <div className="col-span-7 bg-[#ffff00] p-1 border border-black text-[7px] font-bold">
                          <span className="block text-[8px] font-black uppercase text-black">RETRO OS</span>
                          <span className="text-black/70 text-[6px]">12-COL OFFSET</span>
                        </div>
                        <div className="col-span-5 bg-[#d4d4d4] p-1 border border-black text-[6px]">
                          <span className="text-[#000080] font-bold block">MONITOR.DAT</span>
                          <span className="text-emerald-700 font-mono">LIVE WIB</span>
                        </div>
                      </div>
                      <div className="bg-[#000080] text-white px-1.5 py-0.5 text-[7px] font-bold flex items-center justify-between">
                        <span>TELEMETRY</span>
                        <span className="text-yellow-300 font-mono">»» ACTIVE</span>
                      </div>
                    </div>
                  )}

                  {template.id === 'cyber' && (
                    <div className="h-full bg-[#050907] rounded-lg p-2 flex flex-col justify-between border border-emerald-900 font-mono text-[9px] text-emerald-400">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">&gt; root@asbrnn:~#</span>
                        <span className="text-[8px] bg-emerald-950 px-1 rounded border border-emerald-800">CRT: ON</span>
                      </div>
                      <div className="space-y-0.5 text-[8px] text-emerald-300/80">
                        <p>&gt; sys_kernel: LOADED</p>
                        <p>&gt; status: AVAILABLE_FOR_HIRE</p>
                      </div>
                      <div className="flex gap-1 text-[8px]">
                        <span className="bg-emerald-950 px-1 rounded border border-emerald-800">[ $ projects ]</span>
                        <span className="bg-emerald-950 px-1 rounded border border-emerald-800">[ $ skills ]</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white tracking-wide">
                      {template.name}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold border border-sky-500/30">
                        Aktif
                      </span>
                    )}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#0f172a] text-[#94a3b8] text-[11px] font-semibold border border-[#334155]">
                    {template.badge}
                  </span>
                </div>

                <p className="text-xs text-sky-400 font-medium mt-0.5">{template.tagline}</p>
              </div>

              {/* Template Body */}
              <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                      Fitur Utama:
                    </span>
                    <ul className="space-y-1 text-xs text-[#cbd5e1]">
                      {template.features.slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Style tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {template.styleTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#0f172a] text-[10px] font-medium text-[#94a3b8] border border-[#334155]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-2 border-t border-[#334155] flex items-center gap-2">
                  {isActive ? (
                    <>
                      <button
                        disabled
                        className="flex-1 py-2 px-3 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-default"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>Sedang Digunakan</span>
                      </button>
                      <button
                        onClick={onBackToSite}
                        className="py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Buka Website"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Web</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSelectTemplate(template.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Gunakan Template</span>
                      </button>
                      <button
                        onClick={() => handleApplyAndPreview(template.id)}
                        className="py-2 px-3 rounded-xl bg-[#0f172a] hover:bg-[#334155] border border-[#334155] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        title="Terapkan dan langsung lihat di website"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Langsung Preview</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tip Card */}
      <div className="p-5 rounded-2xl bg-[#1e293b] border border-[#334155] flex items-start gap-3.5 text-xs text-[#94a3b8]">
        <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white text-sm">Bagaimana cara kerja sistem template ini?</p>
          <p className="leading-relaxed">
            Semua template terhubung ke sumber data portofolio yang sama (<code className="text-sky-300">src/data/portfolioData.ts</code>). Saat kamu mengubah template, kamu tidak perlu menginput ulang profil, proyek, keahlian, atau foto. Cukup pilih tema yang kamu sukai, lalu klik <span className="font-bold text-emerald-400">"Simpan ke File Code"</span> di pojok kanan atas agar tema pilihanmu tersimpan permanen di kode proyek!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;

