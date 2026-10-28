import React from 'react';
import { Filter, CheckCheck, RotateCcw, Crosshair } from 'lucide-react';
import { BuildRecord } from '../../types/division';

interface TrackerFilterContainerProps {
  build: BuildRecord;
  allBuilds: BuildRecord[];
  filterMode: 'all' | 'missing' | 'acquired';
  totalSlotsCount: number;
  acquiredCount: number;
  accentColor: string;
  onSetFilterMode: (mode: 'all' | 'missing' | 'acquired') => void;
  onSelectBuild: (id: string) => void;
  onSetAllAcquired: (acquired: boolean) => void;
  onNavigateToBuilder: () => void;
}

export const TrackerFilterContainer: React.FC<TrackerFilterContainerProps> = ({
  build,
  allBuilds,
  filterMode,
  totalSlotsCount,
  acquiredCount,
  accentColor,
  onSetFilterMode,
  onSelectBuild,
  onSetAllAcquired,
  onNavigateToBuilder,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Controls & Build Switcher */}
      <div
        className="p-4 bg-[#121722] border tactical-corner flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ borderColor: `${accentColor}50` }}
      >
        <div className="space-y-1 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono-tech px-2.5 py-1 border uppercase font-bold tracking-wider"
              style={{
                borderColor: accentColor,
                color: accentColor,
                backgroundColor: `${accentColor}20`,
              }}
            >
              TRACKER OPERACIONAL DE ITENS
            </span>
            <span className="text-xs font-mono-tech text-zinc-400">
              12 SLOTS TÁTICOS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-rajdhani font-bold text-white tracking-wide">
              {build.title}
            </h1>
            {/* Direct build selector dropdown if multiple builds exist */}
            {allBuilds.length > 1 && (
              <select
                value={build.id}
                onChange={(e) => onSelectBuild(e.target.value)}
                className="bg-black/70 border border-white/25 text-sm font-rajdhani text-white px-3 py-1 outline-none rounded-xs font-semibold"
              >
                {allBuilds.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Quick Batch Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => onSetAllAcquired(true)}
            className="px-3 py-2 text-xs font-mono-tech font-bold border border-white/20 hover:border-emerald-500 bg-black/50 text-zinc-200 hover:text-emerald-300 flex items-center gap-1.5 transition-colors rounded-xs"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Marcar Todos</span>
          </button>
          <button
            onClick={() => onSetAllAcquired(false)}
            className="px-3 py-2 text-xs font-mono-tech font-bold border border-white/20 hover:border-zinc-400 bg-black/50 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors rounded-xs"
          >
            <RotateCcw className="w-4 h-4 text-zinc-400" />
            <span>Resetar Checklist</span>
          </button>
          <button
            onClick={onNavigateToBuilder}
            className="px-4 py-2 text-xs font-rajdhani font-bold uppercase tracking-wider text-black flex items-center gap-2 transition-all hover:brightness-110 shadow-md rounded-xs"
            style={{ backgroundColor: accentColor }}
          >
            <Crosshair className="w-4 h-4" />
            <span>Editar na Tela 1</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-2.5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono-tech text-zinc-300 uppercase font-semibold">
            Filtrar:
          </span>
          <button
            onClick={() => onSetFilterMode('all')}
            className={`px-3 py-1 text-xs font-mono-tech rounded-xs border transition-colors ${
              filterMode === 'all'
                ? 'bg-white/20 text-white border-white/40 font-bold shadow-sm'
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            Todos ({totalSlotsCount})
          </button>
          <button
            onClick={() => onSetFilterMode('missing')}
            className={`px-3 py-1 text-xs font-mono-tech rounded-xs border transition-colors ${
              filterMode === 'missing'
                ? 'bg-amber-950/80 text-amber-300 border-amber-500 font-bold shadow-sm'
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            Faltantes ({totalSlotsCount - acquiredCount})
          </button>
          <button
            onClick={() => onSetFilterMode('acquired')}
            className={`px-3 py-1 text-xs font-mono-tech rounded-xs border transition-colors ${
              filterMode === 'acquired'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 font-bold shadow-sm'
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            Adquiridos ({acquiredCount})
          </button>
        </div>

        <span className="text-xs font-mono-tech text-zinc-400 hidden sm:inline">
          Dica: Clique no cartão ou no botão para alternar o status do item.
        </span>
      </div>
    </div>
  );
};
