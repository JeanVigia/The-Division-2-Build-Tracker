import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { BuildRecord, GearSlotType } from '../../types/division';

interface BuildHeaderContainerProps {
  build: BuildRecord;
  accentColor: string;
  onNavigateToTracker: () => void;
}

export const BuildHeaderContainer: React.FC<BuildHeaderContainerProps> = ({
  build,
  accentColor,
  onNavigateToTracker,
}) => {
  // Count exotic weapons & exotic gear pieces
  const exoticWeaponsCount = ['primary_weapon', 'secondary_weapon', 'sidearm'].filter(
    (st) => build.slots[st as GearSlotType]?.isExotic
  ).length;

  const exoticGearCount = ['mask', 'chest', 'holster', 'backpack', 'gloves', 'kneepads'].filter(
    (st) => build.slots[st as GearSlotType]?.isExotic
  ).length;

  // Count core attribute distribution (Red / Blue / Yellow)
  let redCores = 0;
  let blueCores = 0;
  let yellowCores = 0;

  (['mask', 'chest', 'holster', 'backpack', 'gloves', 'kneepads'] as GearSlotType[]).forEach((st) => {
    const slot = build.slots[st];
    if (slot && slot.itemName) {
      if (slot.coreType === 'red') redCores++;
      else if (slot.coreType === 'blue') blueCores++;
      else if (slot.coreType === 'yellow') yellowCores++;
    }
  });

  return (
    <div className="space-y-4">
      {/* Build Directive Banner & Tactical Summary */}
      <div
        className="p-4 bg-[#121722] border tactical-corner flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg"
        style={{ borderColor: `${accentColor}50` }}
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono-tech px-2.5 py-1 border uppercase font-bold tracking-wider"
              style={{
                borderColor: accentColor,
                color: accentColor,
                backgroundColor: `${accentColor}20`,
              }}
            >
              DIRETRIZ TÁTICA ATIVA
            </span>
            <span className="text-xs font-mono-tech text-zinc-400">
              ID: {build.id.slice(0, 14)}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-rajdhani font-bold text-white tracking-wide">
            {build.title}
          </h1>

          <p className="text-sm font-mono-tech text-zinc-300 max-w-2xl leading-relaxed">
            {build.description ||
              'Configure os 12 slots de armamento e equipamento. Dados de atributos, talentos e locais de obtenção vêm estritamente da planilha oficial da comunidade.'}
          </p>
        </div>

        {/* Tactical Stat Badges & Tracker Shortcut */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Core Balance */}
          <div className="flex items-center gap-2 bg-black/60 px-3.5 py-2 border border-white/15 rounded-xs">
            <span className="text-xs font-mono-tech text-zinc-300 uppercase mr-1 font-semibold">
              Núcleos:
            </span>
            <span className="px-2 py-0.5 text-xs font-mono-tech font-bold bg-red-950 text-red-300 border border-red-500/60 rounded-xs">
              {redCores} Vermelho (DPS)
            </span>
            <span className="px-2 py-0.5 text-xs font-mono-tech font-bold bg-blue-950 text-blue-300 border border-blue-500/60 rounded-xs">
              {blueCores} Azul (Armadura)
            </span>
            <span className="px-2 py-0.5 text-xs font-mono-tech font-bold bg-amber-950 text-amber-300 border border-amber-500/60 rounded-xs">
              {yellowCores} Amarelo (Skill)
            </span>
          </div>

          {/* Button to go to Tracker */}
          <button
            onClick={onNavigateToTracker}
            className="flex items-center gap-2 px-5 py-2.5 font-rajdhani font-bold text-sm uppercase tracking-wider text-black transition-all hover:brightness-110 shadow-lg rounded-xs"
            style={{ backgroundColor: accentColor }}
          >
            <span>Acompanhar no Tracker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exotic Warning if user equips > 1 exotic weapon or > 1 exotic armor */}
      {(exoticWeaponsCount > 1 || exoticGearCount > 1) && (
        <div className="p-4 bg-amber-950/60 border border-amber-500 rounded flex items-center gap-3 text-amber-100 text-sm font-mono-tech shadow-md">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div className="space-y-0.5">
            <strong className="text-amber-300 font-bold block text-sm">
              Aviso de Regra do The Division 2:
            </strong>
            {exoticWeaponsCount > 1 && (
              <span className="block">
                • Você selecionou {exoticWeaponsCount} armas exóticas (o jogo permite equipar apenas 1 simultaneamente).
              </span>
            )}
            {exoticGearCount > 1 && (
              <span className="block">
                • Você selecionou {exoticGearCount} peças de equipamento exóticas (o jogo permite equipar apenas 1 simultaneamente).
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
