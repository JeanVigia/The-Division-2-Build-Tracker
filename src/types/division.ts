export type GearSlotType =
  | 'primary_weapon'
  | 'secondary_weapon'
  | 'sidearm'
  | 'mask'
  | 'chest'
  | 'holster'
  | 'backpack'
  | 'gloves'
  | 'kneepads'
  | 'skill_1'
  | 'skill_2'
  | 'specialization';

export type CoreColorType = 'red' | 'blue' | 'yellow';

export interface ItemRecord {
  id: string;
  name: string;
  slotType: GearSlotType;
  subType?: string;
  brandOrSet?: string;
  isExotic: boolean;
  isNamed: boolean;
  defaultCore: string;
  coreType: CoreColorType;
  allowedCores?: { label: string; type: CoreColorType }[];
  fixedSecondaries?: string[];          // Atributos fixos da planilha (bloqueados para alteração)
  allowedSecondaries?: string[];        // Atributos elegíveis para a classe do item
  maxRollableSecondaries?: number;      // Quantidade de slots configuráveis pelo usuário (0, 1 ou 2)
  defaultTalent?: string;
  dropSource: string;
  dropNotes?: string;
}

export interface BuildSlotConfig {
  slotType: GearSlotType;
  itemId: string | null;
  itemName: string;
  brandOrSet?: string;
  isExotic: boolean;
  isNamed: boolean;
  selectedCore: string;
  coreType: CoreColorType;
  fixedSecondaries?: string[];
  selectedSecondaries: string[];
  maxRollableSecondaries?: number;
  selectedTalent?: string;
  dropSource: string;
  dropNotes?: string;
  isAcquired: boolean;
  notes?: string;
}

export interface BuildRecord {
  id: string;
  title: string;
  customColorHex: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  slots: Record<GearSlotType, BuildSlotConfig>;
}

export interface SuggestedBuild {
  id: string;
  title: string;
  archetype: string;
  difficulty: 'Iniciante' | 'Heroico / Incursão' | 'Raid / Lendário' | 'Universal / Solo';
  tag: string;
  summary: string;
  playstyle: string;
  customColorHex: string;
  slots: Record<GearSlotType, {
    itemId?: string;
    itemName: string;
    brandOrSet?: string;
    isExotic: boolean;
    isNamed: boolean;
    core: string;
    coreType: CoreColorType;
    fixedSecondaries?: string[];
    secondaries: string[];
    talent?: string;
    dropSource: string;
  }>;
}

export interface TacticalPaletteColor {
  name: string;
  hex: string;
  accentRgb: string;
  themeLabel: string;
}

export const TACTICAL_PALETTES: TacticalPaletteColor[] = [
  { name: 'Laranja SHD Agente', hex: '#FF6B00', accentRgb: '255, 107, 0', themeLabel: 'Protocolo Padrão da Divisão' },
  { name: 'Vermelho Renegado (Rogue)', hex: '#EF4444', accentRgb: '239, 68, 68', themeLabel: 'Alerta ISAC Corrompido' },
  { name: 'Azul Federal JTF', hex: '#0284C7', accentRgb: '2, 132, 199', themeLabel: 'Força de Operações Conjuntas' },
  { name: 'Verde Tático Sobrevivente', hex: '#10B981', accentRgb: '16, 185, 129', themeLabel: 'Suporte Médico de Campo' },
  { name: 'Âmbar Alerta Crítico', hex: '#F59E0B', accentRgb: '245, 158, 11', themeLabel: 'Ameaça de Alta Prioridade' },
  { name: 'Ciano Diagnóstico ISAC', hex: '#06B6D4', accentRgb: '6, 182, 212', themeLabel: 'Varredura e Satélite SHD' },
  { name: 'Roxo Alta Frequência', hex: '#A855F7', accentRgb: '168, 85, 247', themeLabel: 'Calibração Especializada' },
];

export const SLOT_METADATA: Record<GearSlotType, { label: string; iconKey: string; section: 'weapons' | 'gear' | 'support' }> = {
  primary_weapon: { label: 'Arma Principal', iconKey: 'crosshair', section: 'weapons' },
  secondary_weapon: { label: 'Arma Secundária', iconKey: 'crosshair', section: 'weapons' },
  sidearm: { label: 'Pistola (Arma Curta)', iconKey: 'shield', section: 'weapons' },
  mask: { label: 'Máscara', iconKey: 'mask', section: 'gear' },
  chest: { label: 'Peitoral (Colete)', iconKey: 'shield', section: 'gear' },
  holster: { label: 'Coldre', iconKey: 'box', section: 'gear' },
  backpack: { label: 'Mochila', iconKey: 'package', section: 'gear' },
  gloves: { label: 'Luvas', iconKey: 'hand', section: 'gear' },
  kneepads: { label: 'Joelheira', iconKey: 'layers', section: 'gear' },
  skill_1: { label: 'Habilidade 1', iconKey: 'cpu', section: 'support' },
  skill_2: { label: 'Habilidade 2', iconKey: 'cpu', section: 'support' },
  specialization: { label: 'Especialização', iconKey: 'award', section: 'support' },
};

// ===================== ATRIBUTOS SECUNDÁRIOS OFICIAIS DA PLANILHA =====================

export const WEAPON_ALLOWED_SECONDARIES = [
  '10.0% Dano a Alvos Fora de Cobertura (DtTOOC)',
  '10.0% Dano de Acerto Crítico (CHD)',
  '6.0% Dano à Proteção (DtA)',
  '9.5% Chance de Acerto Crítico (CHC)',
  '10.0% Dano de Tiro na Cabeça (HSD)',
  '5.0% Cadência de Tiro (RoF)',
  '10.0% Tamanho do Carregador',
  '10.0% Velocidade de Recarga',
  '14.0% Manuseio de Arma',
  '10.0% Dano à Vida / Saúde',
];

export const GEAR_ALLOWED_SECONDARIES = [
  '6.0% Chance de Acerto Crítico (CHC)',
  '12.0% Dano de Acerto Crítico (CHD)',
  '10.0% Dano de Tiro na Cabeça (HSD)',
  '8.0% Manuseio de Arma',
  '4.925 Regeneração de Proteção/s',
  '10.0% Proteção contra Perigos (Hazard Protection)',
  '10.0% Resistência a Explosivos',
  '10.0% Dano de Habilidade (Skill Damage)',
  '12.0% Aceleração de Habilidade (Skill Haste)',
  '10.0% Efeitos de Status (Status Effects)',
  '20.0% Reparo de Habilidade (Repair Skills)',
];
