import React from 'react';
import { Crosshair } from 'lucide-react';
import { BuildRecord, BuildSlotConfig, GearSlotType } from '../../types/division';
import { SlotCard } from '../SlotCard';

interface WeaponsSectionProps {
  build: BuildRecord;
  accentColor: string;
  onUpdateSlot: (slotType: GearSlotType, updated: Partial<BuildSlotConfig>) => void;
}

export const WeaponsSection: React.FC<WeaponsSectionProps> = ({
  build,
  accentColor,
  onUpdateSlot,
}) => {
  const exoticWeaponsCount = ['primary_weapon', 'secondary_weapon', 'sidearm'].filter(
    (st) => build.slots[st as GearSlotType]?.isExotic
  ).length;

  return (
    <section className="space-y-3.5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-white/15">
        <Crosshair className="w-5 h-5" style={{ color: accentColor }} />
        <h2 className="text-base sm:text-lg font-rajdhani font-bold tracking-wider uppercase text-white">
          Arsenal Ofensivo (3 Slots)
        </h2>
        <span className="text-xs font-mono-tech text-zinc-400 ml-auto hidden sm:inline">
          Armas Principais e Secundárias com Atributos Nativos e Secundários de Arma
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SlotCard
          slotType="primary_weapon"
          slotConfig={build.slots.primary_weapon}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('primary_weapon', up)}
          hasExoticConflict={build.slots.primary_weapon?.isExotic && exoticWeaponsCount > 1}
        />
        <SlotCard
          slotType="secondary_weapon"
          slotConfig={build.slots.secondary_weapon}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('secondary_weapon', up)}
          hasExoticConflict={build.slots.secondary_weapon?.isExotic && exoticWeaponsCount > 1}
        />
        <SlotCard
          slotType="sidearm"
          slotConfig={build.slots.sidearm}
          accentColor={accentColor}
          onUpdateSlot={(up) => onUpdateSlot('sidearm', up)}
          hasExoticConflict={build.slots.sidearm?.isExotic && exoticWeaponsCount > 1}
        />
      </div>
    </section>
  );
};
