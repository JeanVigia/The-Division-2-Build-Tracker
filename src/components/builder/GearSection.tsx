import React from 'react';
import { Shield } from 'lucide-react';
import { BuildRecord, BuildSlotConfig, GearSlotType } from '../../types/division';
import { SlotCard } from '../SlotCard';

interface GearSectionProps {
  build: BuildRecord;
  accentColor: string;
  onUpdateSlot: (slotType: GearSlotType, updated: Partial<BuildSlotConfig>) => void;
}

export const GearSection: React.FC<GearSectionProps> = ({
  build,
  accentColor,
  onUpdateSlot,
}) => {
  const exoticGearCount = ['mask', 'chest', 'holster', 'backpack', 'gloves', 'kneepads'].filter(
    (st) => build.slots[st as GearSlotType]?.isExotic
  ).length;

  return (
    <section className="space-y-3.5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-white/15">
        <Shield className="w-5 h-5" style={{ color: accentColor }} />
        <h2 className="text-base sm:text-lg font-rajdhani font-bold tracking-wider uppercase text-white">
          Sistema de Blindagem e Proteção (6 Slots)
        </h2>
        <span className="text-xs font-mono-tech text-zinc-400 ml-auto hidden sm:inline">
          Máscara, Peitoral, Coldre, Mochila, Luvas, Joelheira (Atributos Fixos e Recalibráveis)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SlotCard
          slotType="mask"
          slotConfig={build.slots.mask}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('mask', up)}
          hasExoticConflict={build.slots.mask?.isExotic && exoticGearCount > 1}
        />
        <SlotCard
          slotType="chest"
          slotConfig={build.slots.chest}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('chest', up)}
          hasExoticConflict={build.slots.chest?.isExotic && exoticGearCount > 1}
        />
        <SlotCard
          slotType="holster"
          slotConfig={build.slots.holster}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('holster', up)}
          hasExoticConflict={build.slots.holster?.isExotic && exoticGearCount > 1}
        />
        <SlotCard
          slotType="backpack"
          slotConfig={build.slots.backpack}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('backpack', up)}
          hasExoticConflict={build.slots.backpack?.isExotic && exoticGearCount > 1}
        />
        <SlotCard
          slotType="gloves"
          slotConfig={build.slots.gloves}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('gloves', up)}
          hasExoticConflict={build.slots.gloves?.isExotic && exoticGearCount > 1}
        />
        <SlotCard
          slotType="kneepads"
          slotConfig={build.slots.kneepads}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('kneepads', up)}
          hasExoticConflict={build.slots.kneepads?.isExotic && exoticGearCount > 1}
        />
      </div>
    </section>
  );
};
