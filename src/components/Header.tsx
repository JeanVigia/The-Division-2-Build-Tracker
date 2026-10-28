import React from 'react';
import { Shield, Crosshair, Sparkles, Database, CheckCircle2, Flame } from 'lucide-react';
import { BuildRecord } from '../types/division';

interface HeaderProps {
  activeTab: 'builder' | 'tracker' | 'suggested';
  setActiveTab: (tab: 'builder' | 'tracker' | 'suggested') => void;
  activeBuild: BuildRecord | null;
  onOpenSpreadsheetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeBuild,
  onOpenSpreadsheetModal,
}) => {
  const accentColor = activeBuild?.customColorHex || '#FF6B00';

  return (
    <header className="relative border-b border-white/10 bg-[#0d1117]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Decorative top pulse line */}
      <div
        className="h-[2px] w-full transition-colors duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & ISAC Status */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 border border-white/20 bg-black/40 flex items-center justify-center tactical-corner-sm relative group cursor-pointer"
            style={{ borderColor: accentColor }}
            onClick={() => setActiveTab('builder')}
          >
            <Shield className="w-5 h-5 text-white transition-transform group-hover:scale-110" style={{ color: accentColor }} />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: accentColor }}></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-rajdhani font-bold text-lg md:text-xl tracking-wider text-white">
                DIVISION 2 <span style={{ color: accentColor }}>// PROTOCOLO SHD</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono-tech px-1.5 py-0.5 border border-white/10 bg-white/5 text-zinc-400">
                TU28+ GEAR SPREADSHEET
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech text-zinc-400">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ISAC ONLINE
              </span>
              <span>•</span>
              <span className="truncate max-w-[200px] text-zinc-300">
                DIRETRIZ ATIVA: <strong style={{ color: accentColor }}>{activeBuild?.title || 'Nenhuma'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (3 Telas) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-rajdhani font-semibold tracking-wide uppercase transition-all border flex items-center gap-1.5 ${
              activeTab === 'builder'
                ? 'bg-white/10 text-white border-b-2 shadow-sm'
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
            style={{
              borderColor: activeTab === 'builder' ? accentColor : 'transparent',
              color: activeTab === 'builder' ? '#fff' : undefined,
            }}
          >
            <Crosshair className="w-3.5 h-3.5" style={{ color: activeTab === 'builder' ? accentColor : undefined }} />
            <span>1. Criador de Builds</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-rajdhani font-semibold tracking-wide uppercase transition-all border flex items-center gap-1.5 ${
              activeTab === 'tracker'
                ? 'bg-white/10 text-white border-b-2 shadow-sm'
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
            style={{
              borderColor: activeTab === 'tracker' ? accentColor : 'transparent',
              color: activeTab === 'tracker' ? '#fff' : undefined,
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: activeTab === 'tracker' ? accentColor : undefined }} />
            <span>2. Tracker de Itens</span>
          </button>

          <button
            onClick={() => setActiveTab('suggested')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-rajdhani font-semibold tracking-wide uppercase transition-all border flex items-center gap-1.5 ${
              activeTab === 'suggested'
                ? 'bg-white/10 text-white border-b-2 shadow-sm'
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
            style={{
              borderColor: activeTab === 'suggested' ? accentColor : 'transparent',
              color: activeTab === 'suggested' ? '#fff' : undefined,
            }}
          >
            <Flame className="w-3.5 h-3.5" style={{ color: activeTab === 'suggested' ? accentColor : undefined }} />
            <span>3. Builds Sugeridas</span>
          </button>
        </nav>

        {/* Database & Sheet Reference Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSpreadsheetModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-tech border border-white/20 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            title="Ver detalhes da fonte de dados e créditos oficiais da planilha"
          >
            <Database className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden md:inline">Planilha Oficial</span>
          </button>
        </div>
      </div>
    </header>
  );
};
