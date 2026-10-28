import React from 'react';
import { SuggestedBuild } from '../types/division';
import { SUGGESTED_BUILDS } from '../data/divisionData';
import {
  Flame,
  ArrowRight,
  Crosshair,
  Compass,
} from 'lucide-react';

interface SuggestedBuildsViewProps {
  onApplySuggestedBuild: (suggested: SuggestedBuild) => void;
}

export const SuggestedBuildsView: React.FC<SuggestedBuildsViewProps> = ({
  onApplySuggestedBuild,
}) => {
  return (
    <div className="space-y-6">
      {/* Banner de Cabeçalho da Tela 3 */}
      <div className="p-4 bg-[#121722] border border-orange-500/40 tactical-corner flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech px-2.5 py-1 border border-orange-500/60 bg-orange-500/15 text-orange-300 uppercase font-bold flex items-center gap-1.5 tracking-wider">
              <Flame className="w-4 h-4 text-orange-400" /> HUB DE BUILDS META (PLANILHA OFICIAL)
            </span>
            <span className="text-xs font-mono-tech text-zinc-400">
              CURADORIA DO CANAL #BUILD-ADVICE
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-rajdhani font-bold text-white tracking-wide">
            Diretrizes Recomendadas da Comunidade
          </h1>

          <p className="text-sm font-mono-tech text-zinc-300 max-w-3xl leading-relaxed">
            Selecione qualquer uma das builds catalogadas na planilha para transferi-la automaticamente para o seu Criador de Builds (Tela 1). Você poderá personalizá-la ou iniciar o rastreamento no Tracker (Tela 2).
          </p>
        </div>

        <div className="text-xs font-mono-tech text-zinc-300 border border-white/15 bg-black/50 px-3.5 py-2.5 rounded-xs">
          <span className="text-orange-400 font-bold block mb-1">Como Funciona:</span>
          Clique em <strong className="text-white font-rajdhani uppercase text-sm">"Montar na Tela 1"</strong> para gerar uma nova guia com os 12 slots configurados.
        </div>
      </div>

      {/* Grid de Builds Sugeridas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SUGGESTED_BUILDS.map((build) => {
          const accentColor = build.customColorHex || '#FF6B00';
          const primaryWp = build.slots.primary_weapon;
          const mask = build.slots.mask;
          const chest = build.slots.chest;
          const backpack = build.slots.backpack;

          return (
            <div
              key={build.id}
              className="bg-[#121722] border border-white/20 hover:border-white/40 transition-all tactical-corner p-5 flex flex-col justify-between space-y-4 group shadow-md"
              style={{
                borderLeftWidth: '5px',
                borderLeftColor: accentColor,
              }}
            >
              {/* Header do Card */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span
                    className="text-xs font-mono-tech uppercase font-bold px-2.5 py-1 border tracking-wider"
                    style={{
                      borderColor: accentColor,
                      color: accentColor,
                      backgroundColor: `${accentColor}20`,
                    }}
                  >
                    {build.tag}
                  </span>

                  <span className="text-xs font-mono-tech px-2.5 py-1 bg-black/60 border border-white/15 text-zinc-200">
                    Dificuldade: <strong className="text-white font-semibold">{build.difficulty}</strong>
                  </span>
                </div>

                <h2 className="text-2xl font-rajdhani font-bold text-white group-hover:text-orange-300 transition-colors">
                  {build.title}
                </h2>

                <div className="text-sm font-mono-tech text-zinc-200 font-semibold flex items-center gap-2">
                  <Compass className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>{build.archetype}</span>
                </div>

                <p className="text-xs sm:text-sm font-mono-tech text-zinc-300 leading-relaxed pt-1">
                  {build.summary}
                </p>

                {/* Tactical Synergy Playstyle Note */}
                <div className="p-3 bg-black/50 border border-white/15 rounded-xs text-xs font-mono-tech text-zinc-300 space-y-1">
                  <span className="text-amber-400 font-bold block uppercase tracking-wider text-xs">
                    Instrução Tática de Campo:
                  </span>
                  <p className="text-zinc-200 italic text-xs leading-relaxed">
                    "{build.playstyle}"
                  </p>
                </div>
              </div>

              {/* Peças Principais em Destaque (Preview Rápido) */}
              <div className="space-y-2 pt-1">
                <span className="text-xs uppercase font-mono-tech text-zinc-400 font-bold block">
                  Composição Chave (Amostra dos 12 Slots):
                </span>
                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono-tech">
                  <div className="p-2 bg-black/40 border border-white/10 rounded-xs">
                    <span className="text-zinc-400 block text-[11px] uppercase font-semibold">Arma Principal</span>
                    <span className="text-orange-400 font-bold truncate block text-sm">
                      {primaryWp?.itemName}
                    </span>
                  </div>
                  <div className="p-2 bg-black/40 border border-white/10 rounded-xs">
                    <span className="text-zinc-400 block text-[11px] uppercase font-semibold">Máscara</span>
                    <span className="text-white font-bold truncate block text-sm">
                      {mask?.itemName}
                    </span>
                  </div>
                  <div className="p-2 bg-black/40 border border-white/10 rounded-xs">
                    <span className="text-zinc-400 block text-[11px] uppercase font-semibold">Peitoral</span>
                    <span className="text-zinc-200 font-bold truncate block text-sm">
                      {chest?.itemName}
                    </span>
                  </div>
                  <div className="p-2 bg-black/40 border border-white/10 rounded-xs">
                    <span className="text-zinc-400 block text-[11px] uppercase font-semibold">Mochila</span>
                    <span className="text-zinc-200 font-bold truncate block text-sm">
                      {backpack?.itemName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Montar na Tela 1 */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
                <span className="text-xs font-mono-tech text-zinc-400 hidden sm:inline">
                  Transfere os 12 slots automaticamente para o Criador
                </span>

                <button
                  onClick={() => onApplySuggestedBuild(build)}
                  className="w-full sm:w-auto px-6 py-2.5 font-rajdhani font-bold text-sm uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all hover:brightness-110 shadow-lg ml-auto rounded-xs"
                  style={{ backgroundColor: accentColor }}
                >
                  <Crosshair className="w-4 h-4" />
                  <span>Montar na Tela 1</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
