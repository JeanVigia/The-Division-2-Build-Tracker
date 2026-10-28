import React, { useState } from 'react';
import { BuildRecord, GearSlotType } from '../types/division';
import { TrackerFilterContainer } from './tracker/TrackerFilterContainer';
import { TrackerProgressContainer } from './tracker/TrackerProgressContainer';
import { TrackerCard } from './tracker/TrackerCard';

interface TrackerViewProps {
  build: BuildRecord;
  allBuilds: BuildRecord[];
  onSelectBuild: (id: string) => void;
  onToggleAcquired: (slotType: GearSlotType) => void;
  onSetAllAcquired: (acquired: boolean) => void;
  onNavigateToBuilder: () => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  build,
  allBuilds,
  onSelectBuild,
  onToggleAcquired,
  onSetAllAcquired,
  onNavigateToBuilder,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'missing' | 'acquired'>('all');
  const accentColor = build.customColorHex || '#FF6B00';

  const allSlotKeys = Object.keys(build.slots) as GearSlotType[];
  const acquiredSlots = allSlotKeys.filter((key) => Boolean(build.slots[key]?.isAcquired));

  const totalSlotsCount = 12;
  const acquiredCount = acquiredSlots.length;

  // Filter slots for list view
  const displayedSlotKeys = allSlotKeys.filter((key) => {
    const slot = build.slots[key];
    if (filterMode === 'missing') return !slot?.isAcquired;
    if (filterMode === 'acquired') return Boolean(slot?.isAcquired);
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header, Switcher, Batch Actions & Filters Container */}
      <TrackerFilterContainer
        build={build}
        allBuilds={allBuilds}
        filterMode={filterMode}
        totalSlotsCount={totalSlotsCount}
        acquiredCount={acquiredCount}
        accentColor={accentColor}
        onSetFilterMode={setFilterMode}
        onSelectBuild={onSelectBuild}
        onSetAllAcquired={onSetAllAcquired}
        onNavigateToBuilder={onNavigateToBuilder}
      />

      {/* 2. Tactical 12-Segment Progress Bar Container */}
      <TrackerProgressContainer
        acquiredCount={acquiredCount}
        totalSlotsCount={totalSlotsCount}
        accentColor={accentColor}
      />

      {/* 3. Items Checklist Grid with Isolated Tracker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedSlotKeys.map((slotKey) => (
          <TrackerCard
            key={slotKey}
            slotKey={slotKey}
            slot={build.slots[slotKey]}
            accentColor={accentColor}
            onToggleAcquired={onToggleAcquired}
          />
        ))}
      </div>
    </div>
  );
};
