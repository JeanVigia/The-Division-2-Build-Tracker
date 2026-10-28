import React from 'react';
import { CheckCircle2, Circle, MapPin, Sparkles, Lock, Target } from 'lucide-react';
import { BuildSlotConfig, GearSlotType, SLOT_METADATA } from '../../types/division';
import { DIVISION_ITEMS } from '../../data/divisionData';

interface TrackerCardProps {
  slotKey: GearSlotType;
  slot: BuildSlotConfig;
  accentColor: string;
  onToggleAcquired: (slotType: GearSlotType) => void;
}

export const TrackerCard: React.FC<TrackerCardProps> = ({
  slotKey,
  slot,
  accentColor,
  onToggleAcquired,
}) => {
  const meta = SLOT_METADATA[slotKey];
  const hasItem = Boolean(slot?.itemName);
  const isAcquired = Boolean(slot?.isAcquired);

  return (
    <div
      onClick={() => onToggleAcquired(slotKey)}
      className={`p-4 border tactical-corner cursor-pointer select-none transition-all relative flex flex-col justify-between shadow-md ${
        isAcquired
          ? 'bg-[#0f151e]/80 border-emerald-500/50 opacity-80 hover:opacity-100'
          : hasItem
          ? 'bg-[#131924] border-white/20 hover:border-white/40'
          : 'bg-[#0e1218] border-dashed border-white/10 opacity-70'
      }`}
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: isAcquired
          ? '#10b981'
          : hasItem
          ? accentColor
          : 'rgba(255,255,255,0.15)',
      }}
    >
      {/* Card Header & Checkbox */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-mono-tech uppercase text-zinc-300 font-bold">
            {meta.label}
          </span>

          {/* Tactical Checkbox Button */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-xs font-mono-tech font-bold transition-all border ${
              isAcquired
                ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-black/60 text-zinc-300 border-white/20 hover:border-white/40 hover:text-white'
            }`}
          >
            {isAcquired ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NO INVENTÁRIO</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-zinc-400" />
                <span>PENDENTE</span>
              </>
            )}
          </div>
        </div>

        {/* Item Name & Badges */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`font-rajdhani font-bold text-lg leading-tight ${
                isAcquired ? 'text-zinc-300 line-through' : 'text-white'
              }`}
            >
              {slot?.itemName || `[ ${meta.label} Não Configurado ]`}
            </h3>
            {slot?.isExotic && (
              <span className="text-xs font-mono-tech px-2 py-0.5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xs flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> EXÓTICO
              </span>
            )}
            {slot?.isNamed && (
              <span className="text-xs font-mono-tech px-2 py-0.5 bg-amber-500/30 text-amber-300 border border-amber-500/60 rounded-xs font-bold">
                NOMEADO
              </span>
            )}
          </div>

          {/* Weapon Category & Description from Spreadsheet */}
          {meta.section === 'weapons' && hasItem && (slot?.subType || DIVISION_ITEMS.find((it) => it.id === slot?.itemId || it.name === slot?.itemName)?.subType) && (
            <div className="p-2 bg-black/40 border border-orange-500/30 rounded-xs space-y-0.5">
              <div className="text-xs font-mono-tech text-orange-400 font-bold flex items-center gap-1.5 uppercase">
                <Target className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>Categoria: {slot.subType || DIVISION_ITEMS.find((it) => it.id === slot?.itemId || it.name === slot?.itemName)?.subType}</span>
              </div>
              {(slot.categoryDescription || DIVISION_ITEMS.find((it) => it.id === slot?.itemId || it.name === slot?.itemName)?.categoryDescription) && (
                <p className="text-[11px] font-mono-tech text-zinc-300 leading-snug">
                  {slot.categoryDescription || DIVISION_ITEMS.find((it) => it.id === slot?.itemId || it.name === slot?.itemName)?.categoryDescription}
                </p>
              )}
            </div>
          )}

          {meta.section !== 'weapons' && slot?.brandOrSet && (
            <div className="text-xs font-mono-tech text-zinc-300 font-medium">
              {slot.brandOrSet}
            </div>
          )}

          {/* Selected Attributes summary */}
          {slot?.selectedCore && (
            <div className="text-xs font-mono-tech text-zinc-300 flex items-center gap-1.5 pt-1">
              <span className="text-zinc-400 font-semibold">Núcleo:</span>
              <span className="text-white font-bold">{slot.selectedCore}</span>
            </div>
          )}

          {/* Fixed attributes from spreadsheet */}
          {slot?.fixedSecondaries && slot.fixedSecondaries.length > 0 && (
            <div className="space-y-0.5 pt-0.5">
              {slot.fixedSecondaries.map((fixed, fIdx) => (
                <div key={fIdx} className="text-xs font-mono-tech text-amber-300 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span>{fixed}</span>
                </div>
              ))}
            </div>
          )}

          {/* Rollable Secondaries */}
          {slot?.selectedSecondaries && slot.selectedSecondaries.length > 0 && (
            <div className="text-xs font-mono-tech text-zinc-300 pt-0.5">
              <span className="text-zinc-400 font-semibold">Secundários:</span>{' '}
              <span className="text-zinc-100">{slot.selectedSecondaries.join(' • ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: WHERE TO FARM (DROP SOURCE) */}
      <div className="pt-2.5 border-t border-white/15 mt-auto">
        {slot?.dropSource ? (
          <div className="p-2.5 bg-black/60 border border-white/10 rounded-xs space-y-1">
            <div className="flex items-start gap-2 text-xs font-mono-tech">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-wider block text-xs">
                  Onde Farmar (Planilha):
                </span>
                <span className="text-white font-semibold leading-snug block text-xs">
                  {slot.dropSource}
                </span>
              </div>
            </div>
            {slot.dropNotes && (
              <p className="text-xs font-mono-tech text-zinc-400 pl-6 italic">
                {slot.dropNotes}
              </p>
            )}
          </div>
        ) : (
          <div className="text-xs font-mono-tech text-zinc-500 italic text-center py-1">
            Sem localização informada
          </div>
        )}
      </div>
    </div>
  );
};
