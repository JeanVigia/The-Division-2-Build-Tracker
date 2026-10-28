import React from 'react';
import { Cpu } from 'lucide-react';
import { BuildRecord, BuildSlotConfig, GearSlotType } from '../../types/division';
import { SlotCard } from '../SlotCard';

interface SupportSectionProps {
  build: BuildRecord;
  accentColor: string;
  onUpdateSlot: (slotType: GearSlotType, updated: Partial<BuildSlotConfig>) => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  build,
  accentColor,
  onUpdateSlot,
}) => {
  return (
    <section className="space-y-3.5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-white/15">
        <Cpu className="w-5 h-5" style={{ color: accentColor }} />
        <h2 className="text-base sm:text-lg font-rajdhani font-bold tracking-wider uppercase text-white">
          Módulos Táticos, Habilidades e Especialização (3 Slots)
        </h2>
        <span className="text-xs font-mono-tech text-zinc-400 ml-auto hidden sm:inline">
          Habilidade Primária, Secundária e Classe Operacional
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SlotCard
          slotType="skill_1"
          slotConfig={build.slots.skill_1}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('skill_1', up)}
        />
        <SlotCard
          slotType="skill_2"
          slotConfig={build.slots.skill_2}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('skill_2', up)}
        />
        <SlotCard
          slotType="specialization"
          slotConfig={build.slots.specialization}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('specialization', up)}
        />
      </div>
    </section>
  );
};
