import React, { useState, useEffect } from 'react';
import {
  BuildRecord,
  GearSlotType,
  SuggestedBuild,
  TACTICAL_PALETTES,
} from './types/division';
import {
  loadBuilds,
  saveBuilds,
  getActiveBuildId,
  setActiveBuildId,
  createEmptyBuild,
  duplicateBuild,
  convertSuggestedToBuild,
} from './services/storage';
import { Header } from './components/Header';
import { BuildTabsContainer } from './components/navigation/BuildTabsContainer';
import { BuilderView } from './components/BuilderView';
import { TrackerView } from './components/TrackerView';
import { SuggestedBuildsView } from './components/SuggestedBuildsView';
import { FooterCredits } from './components/FooterCredits';
import { SpreadsheetModal } from './components/SpreadsheetModal';
import { DeleteBuildModal } from './components/modals/DeleteBuildModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [builds, setBuilds] = useState<BuildRecord[]>(() => loadBuilds());
  const [activeBuildId, setActiveId] = useState<string>(() => {
    const saved = getActiveBuildId();
    if (saved && builds.some((b) => b.id === saved)) {
      return saved;
    }
    return builds[0]?.id || '';
  });

  const [activeTab, setActiveTab] = useState<'builder' | 'tracker' | 'suggested'>('builder');
  const [isSpreadsheetModalOpen, setIsSpreadsheetModalOpen] = useState(false);
  const [buildToDelete, setBuildToDelete] = useState<BuildRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync activeBuildId to storage
  useEffect(() => {
    if (activeBuildId) {
      setActiveBuildId(activeBuildId);
    }
  }, [activeBuildId]);

  // Sync builds to storage
  const updateAndSaveBuilds = (nextBuilds: BuildRecord[]) => {
    setBuilds(nextBuilds);
    saveBuilds(nextBuilds);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const activeBuild = builds.find((b) => b.id === activeBuildId) || builds[0];

  const handleSelectBuild = (id: string) => {
    setActiveId(id);
  };

  const handleNewBuild = () => {
    const nextColor = TACTICAL_PALETTES[builds.length % TACTICAL_PALETTES.length].hex;
    const newBuild = createEmptyBuild(`Diretriz SHD-0${builds.length + 1}`, nextColor);
    const updated = [...builds, newBuild];
    updateAndSaveBuilds(updated);
    setActiveId(newBuild.id);
    setActiveTab('builder');
    showToast(`Nova diretriz "${newBuild.title}" criada.`);
  };

  const handleDuplicateBuild = (source: BuildRecord) => {
    const dup = duplicateBuild(source);
    const updated = [...builds, dup];
    updateAndSaveBuilds(updated);
    setActiveId(dup.id);
    showToast(`Diretriz "${dup.title}" duplicada com sucesso.`);
  };

  // Safe In-App Deletion workflow
  const handleRequestDeleteBuild = (build: BuildRecord) => {
    setBuildToDelete(build);
  };

  const handleConfirmDeleteBuild = () => {
    if (!buildToDelete) return;

    if (builds.length <= 1) {
      // Deleting the only existing directive creates a fresh blank directive
      const fresh = createEmptyBuild('Diretriz SHD-01', '#FF6B00');
      updateAndSaveBuilds([fresh]);
      setActiveId(fresh.id);
      showToast('Diretriz excluída e redefinida para um novo modelo limpo.');
    } else {
      const filtered = builds.filter((b) => b.id !== buildToDelete.id);
      updateAndSaveBuilds(filtered);
      if (activeBuildId === buildToDelete.id) {
        setActiveId(filtered[0].id);
      }
      showToast(`Diretriz "${buildToDelete.title}" excluída com sucesso.`);
    }

    setBuildToDelete(null);
  };

  const handleCancelDelete = () => {
    setBuildToDelete(null);
  };

  const handleRenameBuild = (id: string, newTitle: string) => {
    const updated = builds.map((b) =>
      b.id === id ? { ...b, title: newTitle, updatedAt: Date.now() } : b
    );
    updateAndSaveBuilds(updated);
  };

  const handleChangeColor = (id: string, colorHex: string) => {
    const updated = builds.map((b) =>
      b.id === id ? { ...b, customColorHex: colorHex, updatedAt: Date.now() } : b
    );
    updateAndSaveBuilds(updated);
  };

  const handleUpdateActiveBuild = (patch: Partial<BuildRecord>) => {
    const updated = builds.map((b) =>
      b.id === activeBuild.id ? { ...b, ...patch, updatedAt: Date.now() } : b
    );
    updateAndSaveBuilds(updated);
  };

  const handleToggleAcquired = (slotType: GearSlotType) => {
    if (!activeBuild) return;
    const currentSlot = activeBuild.slots[slotType];
    const nextAcquired = !currentSlot?.isAcquired;

    const nextSlots = {
      ...activeBuild.slots,
      [slotType]: {
        ...currentSlot,
        isAcquired: nextAcquired,
      },
    };

    handleUpdateActiveBuild({ slots: nextSlots });
  };

  const handleSetAllAcquired = (acquired: boolean) => {
    if (!activeBuild) return;
    const nextSlots = { ...activeBuild.slots };
    (Object.keys(nextSlots) as GearSlotType[]).forEach((key) => {
      nextSlots[key] = {
        ...nextSlots[key],
        isAcquired: acquired,
      };
    });
    handleUpdateActiveBuild({ slots: nextSlots });
    showToast(
      acquired ? 'Todos os 12 slots marcados como adquiridos!' : 'Checklist resetado.'
    );
  };

  // TELA 3 -> TELA 1 INTEGRATION: Mount suggested build on Tela 1
  const handleApplySuggestedBuild = (suggested: SuggestedBuild) => {
    const newBuild = convertSuggestedToBuild(suggested);
    const updated = [...builds, newBuild];
    updateAndSaveBuilds(updated);
    setActiveId(newBuild.id);
    setActiveTab('builder'); // Redireciona imediatamente para a Tela 1 (Criador de Builds)
    showToast(`Build "${suggested.title}" montada com sucesso na Tela 1!`);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-zinc-100 flex flex-col relative selection:bg-orange-500 selection:text-black">
      {/* HUD scanlines background */}
      <div className="fixed inset-0 shd-scanlines z-30 pointer-events-none" />

      {/* Subtle blueprint grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeBuild={activeBuild}
        onOpenSpreadsheetModal={() => setIsSpreadsheetModalOpen(true)}
      />

      {/* Build Tabs Container (available in both Builder and Tracker) */}
      {activeTab !== 'suggested' && activeBuild && (
        <BuildTabsContainer
          builds={builds}
          activeBuildId={activeBuild.id}
          onSelectBuild={handleSelectBuild}
          onNewBuild={handleNewBuild}
          onDuplicateBuild={handleDuplicateBuild}
          onRequestDeleteBuild={handleRequestDeleteBuild}
          onRenameBuild={handleRenameBuild}
          onChangeColor={handleChangeColor}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161c27] border border-orange-500/80 text-white px-4 py-2.5 shadow-2xl tactical-corner flex items-center gap-2.5 text-xs font-mono-tech animate-bounce">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 z-10">
        {activeTab === 'builder' && activeBuild && (
          <BuilderView
            build={activeBuild}
            onUpdateBuild={handleUpdateActiveBuild}
            onNavigateToTracker={() => setActiveTab('tracker')}
          />
        )}

        {activeTab === 'tracker' && activeBuild && (
          <TrackerView
            build={activeBuild}
            allBuilds={builds}
            onSelectBuild={handleSelectBuild}
            onToggleAcquired={handleToggleAcquired}
            onSetAllAcquired={handleSetAllAcquired}
            onNavigateToBuilder={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'suggested' && (
          <SuggestedBuildsView onApplySuggestedBuild={handleApplySuggestedBuild} />
        )}
      </main>

      {/* Footer with Spreadsheet credits */}
      <FooterCredits onOpenSpreadsheetModal={() => setIsSpreadsheetModalOpen(true)} />

      {/* Modal with Google Sheets source info */}
      <SpreadsheetModal
        isOpen={isSpreadsheetModalOpen}
        onClose={() => setIsSpreadsheetModalOpen(false)}
      />

      {/* Modal for Deletion Confirmation (No window.confirm) */}
      <DeleteBuildModal
        isOpen={Boolean(buildToDelete)}
        buildToDelete={buildToDelete}
        totalBuildsCount={builds.length}
        onConfirm={handleConfirmDeleteBuild}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
