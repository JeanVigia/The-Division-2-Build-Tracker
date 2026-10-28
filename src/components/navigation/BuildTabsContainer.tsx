import React, { useState } from 'react';
import { Plus, Copy, Trash2, Edit2, Check } from 'lucide-react';
import { BuildRecord, TACTICAL_PALETTES } from '../../types/division';

interface BuildTabsContainerProps {
  builds: BuildRecord[];
  activeBuildId: string;
  onSelectBuild: (id: string) => void;
  onNewBuild: () => void;
  onDuplicateBuild: (build: BuildRecord) => void;
  onRequestDeleteBuild: (build: BuildRecord) => void;
  onRenameBuild: (id: string, newTitle: string) => void;
  onChangeColor: (id: string, colorHex: string) => void;
}

export const BuildTabsContainer: React.FC<BuildTabsContainerProps> = ({
  builds,
  activeBuildId,
  onSelectBuild,
  onNewBuild,
  onDuplicateBuild,
  onRequestDeleteBuild,
  onRenameBuild,
  onChangeColor,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');

  const activeBuild = builds.find((b) => b.id === activeBuildId) || builds[0];

  const handleStartRename = (build: BuildRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(build.id);
    setTempTitle(build.title);
  };

  const handleSaveRename = (id: string) => {
    if (tempTitle.trim()) {
      onRenameBuild(id, tempTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="bg-[#12161f] border-b border-white/10 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Tabs List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          {builds.map((b) => {
            const isActive = b.id === activeBuildId;
            const isEditing = editingId === b.id;

            return (
              <div
                key={b.id}
                onClick={() => onSelectBuild(b.id)}
                className={`group relative flex items-center gap-2.5 px-3.5 py-2 cursor-pointer select-none text-xs sm:text-sm font-rajdhani uppercase tracking-wider transition-all border rounded-xs ${
                  isActive
                    ? 'bg-[#1b2330] text-white border-b-2 shadow-inner font-bold'
                    : 'bg-[#10141b] text-zinc-400 border-white/10 hover:text-zinc-200 hover:bg-[#161c26]'
                }`}
                style={{
                  borderColor: isActive ? b.customColorHex : 'rgba(255,255,255,0.08)',
                  borderBottomColor: isActive ? b.customColorHex : undefined,
                }}
              >
                {/* Active indicator dot */}
                <span
                  className="w-3 h-3 rounded-xs flex-shrink-0"
                  style={{ backgroundColor: b.customColorHex }}
                />

                {/* Title or Input */}
                {isEditing ? (
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveRename(b.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                      className="bg-black/80 border border-white/40 text-white text-xs px-2 py-0.5 rounded-xs outline-none w-36 font-rajdhani"
                    />
                    <button
                      onClick={() => handleSaveRename(b.id)}
                      className="p-1 hover:text-emerald-400 text-zinc-200"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="truncate max-w-[140px] sm:max-w-[220px] font-semibold text-white">
                    {b.title}
                  </span>
                )}

                {/* Quick actions for active tab */}
                {isActive && !isEditing && (
                  <div className="flex items-center gap-1.5 ml-1 pl-1.5 border-l border-white/20">
                    <button
                      onClick={(e) => handleStartRename(b, e)}
                      title="Renomear Diretriz"
                      className="p-1 hover:text-amber-400 text-zinc-400 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateBuild(b);
                      }}
                      title="Duplicar Diretriz"
                      className="p-1 hover:text-cyan-400 text-zinc-400 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestDeleteBuild(b);
                      }}
                      title="Excluir Diretriz"
                      className="p-1 hover:text-red-400 text-zinc-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400/80 hover:text-red-400" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* New Build Button */}
          <button
            onClick={onNewBuild}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-rajdhani font-bold tracking-wider uppercase border border-dashed border-orange-500/60 text-orange-400 hover:text-orange-300 hover:bg-orange-500/15 hover:border-orange-400 transition-all ml-1.5 whitespace-nowrap rounded-xs shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Diretriz</span>
          </button>
        </div>

        {/* Tactical Color Customization for Active Build */}
        {activeBuild && (
          <div className="flex items-center gap-2.5 relative self-end md:self-auto">
            <span className="text-xs font-mono-tech text-zinc-300 uppercase font-semibold hidden sm:inline">
              Frequência de Cor:
            </span>
            <div className="flex items-center gap-1.5 bg-black/60 p-1.5 border border-white/20 rounded-xs">
              {TACTICAL_PALETTES.map((palette) => {
                const isSelected = activeBuild.customColorHex.toLowerCase() === palette.hex.toLowerCase();
                return (
                  <button
                    key={palette.hex}
                    onClick={() => onChangeColor(activeBuild.id, palette.hex)}
                    title={`${palette.name} (${palette.themeLabel})`}
                    className={`w-6 h-6 rounded-xs transition-transform relative ${
                      isSelected ? 'scale-110 ring-2 ring-white shadow-md' : 'opacity-75 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: palette.hex }}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-black font-extrabold">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
