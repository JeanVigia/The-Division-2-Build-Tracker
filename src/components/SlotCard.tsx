import React, { useState } from 'react';
import {
  GearSlotType,
  BuildSlotConfig,
  ItemRecord,
  SLOT_METADATA,
  CoreColorType,
  WEAPON_ALLOWED_SECONDARIES,
  GEAR_ALLOWED_SECONDARIES,
} from '../types/division';
import { DIVISION_ITEMS } from '../data/divisionData';
import { ItemSelectorModal } from './builder/ItemSelectorModal';
import {
  Sparkles,
  MapPin,
  Info,
  RotateCcw,
  Lock,
  Sliders,
  Target,
  Layers,
} from 'lucide-react';

interface SlotCardProps {
  slotType: GearSlotType;
  slotConfig: BuildSlotConfig;
  accentColor: string;
  onUpdateSlot: (updated: Partial<BuildSlotConfig>) => void;
  hasExoticConflict?: boolean;
}

export const SlotCard: React.FC<SlotCardProps> = ({
  slotType,
  slotConfig,
  accentColor,
  onUpdateSlot,
  hasExoticConflict,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const metadata = SLOT_METADATA[slotType];

  // Determine allowed secondary attributes based on item slot class
  const isWeapon = metadata.section === 'weapons';
  const isGear = metadata.section === 'gear';
  const allowedSecondariesPool = isWeapon
    ? WEAPON_ALLOWED_SECONDARIES
    : isGear
    ? GEAR_ALLOWED_SECONDARIES
    : [];

  const matchedItem = DIVISION_ITEMS.find((it) => it.id === slotConfig.itemId || it.name === slotConfig.itemName);
  const fixedSecondaries = slotConfig.fixedSecondaries || matchedItem?.fixedSecondaries || [];
  const maxRollable = slotConfig.maxRollableSecondaries !== undefined
    ? slotConfig.maxRollableSecondaries
    : (matchedItem?.maxRollableSecondaries !== undefined ? matchedItem.maxRollableSecondaries : (isGear ? 2 : isWeapon ? 1 : 0));

  const handleSelectItem = (item: ItemRecord) => {
    // Pick rollable defaults if any
    let defaultRollable: string[] = [];
    if (item.maxRollableSecondaries && item.maxRollableSecondaries > 0) {
      if (item.allowedSecondaries && item.allowedSecondaries.length > 0) {
        defaultRollable = item.allowedSecondaries
          .filter((attr) => !item.fixedSecondaries?.includes(attr))
          .slice(0, item.maxRollableSecondaries);
      }
    }

    onUpdateSlot({
      itemId: item.id,
      itemName: item.name,
      subType: item.subType || '',
      categoryDescription: item.categoryDescription || '',
      brandOrSet: item.brandOrSet || item.subType || '',
      isExotic: item.isExotic,
      isNamed: item.isNamed,
      selectedCore: item.defaultCore,
      coreType: item.coreType,
      fixedSecondaries: item.fixedSecondaries || [],
      selectedSecondaries: defaultRollable,
      maxRollableSecondaries: item.maxRollableSecondaries !== undefined ? item.maxRollableSecondaries : 2,
      selectedTalent: item.defaultTalent || '',
      dropSource: item.dropSource,
      dropNotes: item.dropNotes || '',
    });
    setIsModalOpen(false);
  };

  const handleClearSlot = () => {
    onUpdateSlot({
      itemId: null,
      itemName: '',
      subType: '',
      categoryDescription: '',
      brandOrSet: '',
      isExotic: false,
      isNamed: false,
      selectedCore: '',
      coreType: 'red',
      fixedSecondaries: [],
      selectedSecondaries: [],
      maxRollableSecondaries: metadata.section === 'support' ? 0 : 2,
      selectedTalent: '',
      dropSource: '',
      dropNotes: '',
      isAcquired: false,
    });
  };

  const handleSecondaryChange = (index: number, val: string) => {
    const next = [...(slotConfig.selectedSecondaries || [])];
    next[index] = val;
    onUpdateSlot({ selectedSecondaries: next });
  };

  const handleCoreTypeChange = (type: CoreColorType, label: string) => {
    onUpdateSlot({
      coreType: type,
      selectedCore: label,
    });
  };

  const getCoreBadgeStyle = (coreType: CoreColorType) => {
    switch (coreType) {
      case 'red':
        return 'bg-red-950/90 text-red-300 border-red-500/60';
      case 'blue':
        return 'bg-blue-950/90 text-blue-300 border-blue-500/60';
      case 'yellow':
        return 'bg-amber-950/90 text-amber-300 border-amber-500/60';
    }
  };

  return (
    <div
      className={`relative bg-[#111620] border transition-all tactical-corner flex flex-col justify-between shadow-md ${
        slotConfig.isExotic
          ? 'border-orange-500/90 shadow-[0_0_18px_rgba(249,115,22,0.18)]'
          : slotConfig.itemName
          ? 'border-white/20'
          : 'border-white/10 opacity-85 hover:opacity-100'
      }`}
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: slotConfig.isExotic
          ? '#f97316'
          : slotConfig.itemName
          ? accentColor
          : 'rgba(255,255,255,0.25)',
      }}
    >
      {/* Slot Header */}
      <div className="px-3.5 py-2.5 border-b border-white/15 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase font-mono-tech tracking-wider text-zinc-300 font-bold">
            {metadata.label}
          </span>
          {slotConfig.isExotic && (
            <span className="text-xs font-mono-tech px-2 py-0.5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xs flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> EXÓTICO
            </span>
          )}
          {slotConfig.isNamed && (
            <span className="text-xs font-mono-tech px-2 py-0.5 bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold rounded-xs">
              NOMEADO
            </span>
          )}
        </div>

        {slotConfig.itemName && (
          <button
            onClick={handleClearSlot}
            title="Limpar slot"
            className="text-zinc-400 hover:text-red-400 transition-colors p-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Selector & Item Body */}
      <div className="p-3.5 space-y-3.5 flex-1">
        {/* Item Selector Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full text-left px-3 py-2.5 bg-black/70 border border-white/20 hover:border-orange-500/80 text-sm font-rajdhani tracking-wider flex items-center justify-between gap-2 transition-all rounded-xs hover:bg-[#151c28] group cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-2 truncate">
              <Layers className="w-4 h-4 text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className={`truncate font-bold ${slotConfig.itemName ? 'text-white text-base' : 'text-zinc-400'}`}>
                {slotConfig.itemName || `[ SELECIONAR ${metadata.label.toUpperCase()} ]`}
              </span>
            </div>
            <span className="text-[11px] font-mono-tech px-2 py-0.5 bg-white/10 text-zinc-300 rounded-xs border border-white/15 flex-shrink-0 group-hover:border-orange-500/60 group-hover:text-orange-300 transition-colors">
              Catálogo ▾
            </span>
          </button>
        </div>

        {/* Weapon Category & Description from Spreadsheet (Arsenal Ofensivo) */}
        {isWeapon && slotConfig.itemName && (slotConfig.subType || matchedItem?.subType) && (
          <div className="p-2.5 bg-[#0f1520] border border-orange-500/40 rounded-xs space-y-1 shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-mono-tech text-orange-400 font-bold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span>Categoria: {slotConfig.subType || matchedItem?.subType}</span>
            </div>
            {(slotConfig.categoryDescription || matchedItem?.categoryDescription) && (
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                {slotConfig.categoryDescription || matchedItem?.categoryDescription}
              </p>
            )}
          </div>
        )}

        {/* Brand / Set badge */}
        {!isWeapon && slotConfig.brandOrSet && (
          <div className="text-xs font-mono-tech text-zinc-300 flex items-center gap-2 bg-black/30 px-2.5 py-1 rounded-xs border border-white/5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }}></span>
            <span className="font-semibold text-white">{slotConfig.brandOrSet}</span>
          </div>
        )}

        {/* Core Attribute Selector */}
        {slotConfig.itemName && (
          <div className="space-y-1.5">
            <div className="text-xs font-mono-tech text-zinc-300 uppercase flex items-center justify-between font-semibold">
              <span>Atributo Central (Core):</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Definir Core Vermelho (Dano de Arma)"
                  onClick={() => handleCoreTypeChange('red', '15.0% Dano de Arma')}
                  className={`w-5 h-5 rounded-xs border text-xs font-bold flex items-center justify-center transition-all ${
                    slotConfig.coreType === 'red' ? 'bg-red-600 text-white border-red-400 scale-105 shadow-sm' : 'bg-red-950/40 text-red-400 border-red-900/60 hover:text-white'
                  }`}
                >
                  V
                </button>
                <button
                  type="button"
                  title="Definir Core Azul (Proteção Máxima)"
                  onClick={() => handleCoreTypeChange('blue', '170.000 Proteção')}
                  className={`w-5 h-5 rounded-xs border text-xs font-bold flex items-center justify-center transition-all ${
                    slotConfig.coreType === 'blue' ? 'bg-blue-600 text-white border-blue-400 scale-105 shadow-sm' : 'bg-blue-950/40 text-blue-400 border-blue-900/60 hover:text-white'
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  title="Definir Core Amarelo (Categoria de Habilidade)"
                  onClick={() => handleCoreTypeChange('yellow', '+1 Categoria de Habilidade')}
                  className={`w-5 h-5 rounded-xs border text-xs font-bold flex items-center justify-center transition-all ${
                    slotConfig.coreType === 'yellow' ? 'bg-amber-600 text-white border-amber-300 scale-105 shadow-sm' : 'bg-amber-950/40 text-amber-400 border-amber-900/60 hover:text-white'
                  }`}
                >
                  S
                </button>
              </div>
            </div>

            <div
              className={`px-2.5 py-1.5 text-xs font-mono-tech border rounded-xs flex items-center justify-between font-bold ${getCoreBadgeStyle(
                slotConfig.coreType
              )}`}
            >
              <span className="text-white text-xs">{slotConfig.selectedCore || 'Atributo Central Padrão'}</span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded-xs bg-black/40">
                {slotConfig.coreType === 'red'
                  ? 'Vermelho (Ataque)'
                  : slotConfig.coreType === 'blue'
                  ? 'Azul (Defesa)'
                  : 'Amarelo (Suporte)'}
              </span>
            </div>
          </div>
        )}

        {/* ATRIBUTOS SECUNDÁRIOS: FIXOS (BLOQUEADOS) E SELECIONÁVEIS */}
        {slotConfig.itemName && metadata.section !== 'support' && (
          <div className="space-y-2 pt-1 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-300 font-semibold uppercase">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                Atributos Secundários:
              </span>
              <span className="text-[11px] text-zinc-400 lowercase font-normal">
                {fixedSecondaries.length > 0 && `${fixedSecondaries.length} fixo(s)`}
                {fixedSecondaries.length > 0 && maxRollable > 0 && ' • '}
                {maxRollable > 0 && `${maxRollable} configurável`}
              </span>
            </div>

            {/* 1. Atributos Fixos da Planilha (Bloqueados com ícone de cadeado) */}
            {fixedSecondaries.length > 0 && (
              <div className="space-y-1.5">
                {fixedSecondaries.map((fixedAttr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-2.5 py-1.5 bg-[#161d28] border border-amber-500/40 text-amber-200 text-xs font-mono-tech rounded-xs shadow-inner"
                  >
                    <span className="font-semibold text-white truncate max-w-[85%]">{fixedAttr}</span>
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 border border-amber-500/50 rounded-xs flex-shrink-0">
                      <Lock className="w-3 h-3 text-amber-400" /> FIXO
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Atributos Configuráveis / Selecionáveis livres (filtrados pela classe do item) */}
            {maxRollable > 0 ? (
              <div className="space-y-1.5">
                {Array.from({ length: maxRollable }).map((_, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-[11px] font-mono-tech text-zinc-400 block">
                      Atributo Recalibrável #{idx + 1} ({isWeapon ? 'Arma' : 'Equipamento'}):
                    </label>
                    <select
                      value={slotConfig.selectedSecondaries?.[idx] || ''}
                      onChange={(e) => handleSecondaryChange(idx, e.target.value)}
                      className="w-full bg-black/60 border border-white/20 hover:border-white/40 text-xs text-white font-mono-tech px-2.5 py-2 outline-none rounded-xs focus:border-orange-500"
                    >
                      <option value="">{`-- Selecionar Atributo da Planilha --`}</option>
                      {allowedSecondariesPool.map((attr) => (
                        <option key={attr} value={attr} className="bg-zinc-900 text-white">
                          {attr}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ) : fixedSecondaries.length === 0 ? (
              <div className="p-2 bg-black/30 border border-white/10 text-zinc-400 text-xs font-mono-tech text-center rounded-xs">
                Sem atributos secundários para esta classe.
              </div>
            ) : null}
          </div>
        )}

        {/* Talent display if applicable */}
        {slotConfig.selectedTalent && (
          <div className="p-2.5 bg-black/50 border border-white/10 rounded-xs text-xs font-mono-tech">
            <span className="text-orange-400 font-bold block mb-1 uppercase tracking-wider text-xs">
              Talento Ativo:
            </span>
            <p className="text-zinc-200 text-xs leading-relaxed">
              {slotConfig.selectedTalent}
            </p>
          </div>
        )}
      </div>

      {/* Footer: Drop Source from Spreadsheet */}
      {slotConfig.dropSource ? (
        <div className="p-3 bg-black/70 border-t border-white/15 text-xs font-mono-tech text-zinc-300 space-y-1">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-wider block text-xs">
                Local de Obtenção (Planilha):
              </span>
              <span className="text-white font-medium text-xs leading-snug block">
                {slotConfig.dropSource}
              </span>
            </div>
          </div>
          {slotConfig.dropNotes && (
            <p className="text-zinc-400 text-xs pl-6 italic">{slotConfig.dropNotes}</p>
          )}
        </div>
      ) : (
        <div className="p-2.5 bg-black/40 border-t border-white/10 text-xs font-mono-tech text-zinc-400 text-center">
          Selecione o item para carregar o local de obtenção da planilha
        </div>
      )}

      {/* Exotic Conflict Warning Banner */}
      {hasExoticConflict && (
        <div className="px-3 py-1.5 bg-red-950/95 border-t border-red-500 text-red-100 text-xs font-mono-tech flex items-center gap-1.5 font-semibold">
          <Info className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <span>Aviso: O jogo permite apenas 1 arma exótica e 1 equipamento exótico equipado.</span>
        </div>
      )}

      {/* Spacious Unclipped Tactical Item Selector Modal */}
      <ItemSelectorModal
        isOpen={isModalOpen}
        slotType={slotType}
        currentSelectedId={slotConfig.itemId}
        currentSelectedName={slotConfig.itemName}
        accentColor={accentColor}
        onSelect={handleSelectItem}
        onClose={() => setIsModalOpen(false)}
        onClear={handleClearSlot}
      />
    </div>
  );
};
