import { BuildRecord, BuildSlotConfig, GearSlotType, SuggestedBuild, TACTICAL_PALETTES } from '../types/division';
import { DIVISION_ITEMS, SUGGESTED_BUILDS } from '../data/divisionData';

const BUILDS_STORAGE_KEY = 'shd_protocol_builds_v1';
const ACTIVE_BUILD_STORAGE_KEY = 'shd_protocol_active_build_v1';

export function createEmptySlot(slotType: GearSlotType): BuildSlotConfig {
  return {
    slotType,
    itemId: null,
    itemName: '',
    brandOrSet: '',
    isExotic: false,
    isNamed: false,
    selectedCore: '',
    coreType: 'red',
    fixedSecondaries: [],
    selectedSecondaries: [],
    maxRollableSecondaries: slotType.startsWith('skill') || slotType === 'specialization' ? 0 : 2,
    selectedTalent: '',
    dropSource: '',
    dropNotes: '',
    isAcquired: false,
    notes: '',
  };
}

export function createEmptyBuild(title = 'Nova Diretriz SHD', colorHex = '#FF6B00'): BuildRecord {
  const timestamp = Date.now();
  const id = 'shd_' + timestamp + '_' + Math.random().toString(36).substring(2, 7);

  const slots: Record<GearSlotType, BuildSlotConfig> = {
    primary_weapon: createEmptySlot('primary_weapon'),
    secondary_weapon: createEmptySlot('secondary_weapon'),
    sidearm: createEmptySlot('sidearm'),
    mask: createEmptySlot('mask'),
    chest: createEmptySlot('chest'),
    holster: createEmptySlot('holster'),
    backpack: createEmptySlot('backpack'),
    gloves: createEmptySlot('gloves'),
    kneepads: createEmptySlot('kneepads'),
    skill_1: createEmptySlot('skill_1'),
    skill_2: createEmptySlot('skill_2'),
    specialization: createEmptySlot('specialization'),
  };

  return {
    id,
    title,
    customColorHex: colorHex,
    description: 'Protocolo tático personalizado criado pelo agente.',
    createdAt: timestamp,
    updatedAt: timestamp,
    slots,
  };
}

export function convertSuggestedToBuild(suggested: SuggestedBuild): BuildRecord {
  const timestamp = Date.now();
  const id = 'shd_' + timestamp + '_' + Math.random().toString(36).substring(2, 7);

  const empty = createEmptyBuild(suggested.title, suggested.customColorHex);
  empty.description = suggested.summary;

  (Object.keys(suggested.slots) as GearSlotType[]).forEach((slotKey) => {
    const preset = suggested.slots[slotKey];
    if (preset) {
      // Find matching item in division items catalog
      const matchedItem = DIVISION_ITEMS.find(
        (it) => it.name.toLowerCase() === preset.itemName.toLowerCase() || (it.slotType === slotKey && it.name.includes(preset.itemName))
      );

      empty.slots[slotKey] = {
        slotType: slotKey,
        itemId: matchedItem ? matchedItem.id : (preset.itemId || null),
        itemName: preset.itemName,
        brandOrSet: preset.brandOrSet || matchedItem?.brandOrSet || '',
        isExotic: preset.isExotic,
        isNamed: preset.isNamed,
        selectedCore: preset.core,
        coreType: preset.coreType,
        fixedSecondaries: preset.fixedSecondaries || matchedItem?.fixedSecondaries || [],
        selectedSecondaries: [...preset.secondaries],
        maxRollableSecondaries: matchedItem?.maxRollableSecondaries !== undefined ? matchedItem.maxRollableSecondaries : (preset.secondaries.length > 0 ? preset.secondaries.length : 0),
        selectedTalent: preset.talent || matchedItem?.defaultTalent || '',
        dropSource: preset.dropSource || matchedItem?.dropSource || 'Mundo Aberto / Alvo Específico',
        dropNotes: matchedItem?.dropNotes || '',
        isAcquired: false,
        notes: '',
      };
    }
  });

  return empty;
}


export function loadBuilds(): BuildRecord[] {
  try {
    const raw = localStorage.getItem(BUILDS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Falha ao ler IndexedDB/LocalStorage:', err);
  }

  // Se não existir nenhuma build gravada, inicializa com a #1 Meta Build da planilha
  const initialDefault = convertSuggestedToBuild(SUGGESTED_BUILDS[0]);
  saveBuilds([initialDefault]);
  setActiveBuildId(initialDefault.id);
  return [initialDefault];
}

export function saveBuilds(builds: BuildRecord[]): void {
  try {
    localStorage.setItem(BUILDS_STORAGE_KEY, JSON.stringify(builds));
  } catch (err) {
    console.error('Falha ao persistir builds localmente:', err);
  }
}

export function getActiveBuildId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_BUILD_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setActiveBuildId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_BUILD_STORAGE_KEY, id);
  } catch (err) {
    console.error('Falha ao gravar activeBuildId:', err);
  }
}

export function duplicateBuild(source: BuildRecord): BuildRecord {
  const timestamp = Date.now();
  const id = 'shd_' + timestamp + '_' + Math.random().toString(36).substring(2, 7);
  return {
    ...JSON.parse(JSON.stringify(source)),
    id,
    title: `${source.title} (Cópia)`,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
