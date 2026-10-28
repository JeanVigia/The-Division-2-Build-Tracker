import React from 'react';
import { BuildRecord, BuildSlotConfig, GearSlotType } from '../types/division';
import { BuildHeaderContainer } from './builder/BuildHeaderContainer';
import { WeaponsSection } from './builder/WeaponsSection';
import { GearSection } from './builder/GearSection';
import { SupportSection } from './builder/SupportSection';

interface BuilderViewProps {
  build: BuildRecord;
  onUpdateBuild: (updated: Partial<BuildRecord>) => void;
  onNavigateToTracker: () => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  build,
  onUpdateBuild,
  onNavigateToTracker,
}) => {
  const accentColor = build.customColorHex || '#FF6B00';

  const handleUpdateSlot = (slotType: GearSlotType, updated: Partial<BuildSlotConfig>) => {
    const nextSlots = {
      ...build.slots,
      [slotType]: {
        ...build.slots[slotType],
        ...updated,
      },
    };
    onUpdateBuild({ slots: nextSlots });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Tactical Summary Container */}
      <BuildHeaderContainer
        build={build}
        accentColor={accentColor}
        onNavigateToTracker={onNavigateToTracker}
      />

      {/* 2. Arsenal Ofensivo (3 Slots) Container */}
      <WeaponsSection
        build={build}
        accentColor={accentColor}
        onUpdateSlot={handleUpdateSlot}
      />

      {/* 3. Blindagem e Proteção (6 Slots) Container */}
      <GearSection
        build={build}
        accentColor={accentColor}
        onUpdateSlot={handleUpdateSlot}
      />

      {/* 4. Módulos Táticos, Habilidades e Especialização (3 Slots) Container */}
      <SupportSection
        build={build}
        accentColor={accentColor}
        onUpdateSlot={handleUpdateSlot}
      />
    </div>
  );
};
