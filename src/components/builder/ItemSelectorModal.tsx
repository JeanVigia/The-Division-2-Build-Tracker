import React, { useState, useMemo, useEffect } from 'react';
import {
  GearSlotType,
  ItemRecord,
  SLOT_METADATA,
} from '../../types/division';
import { DIVISION_ITEMS } from '../../data/divisionData';
import {
  Search,
  X,
  Sparkles,
  MapPin,
  Check,
  RotateCcw,
  Sliders,
  Lock,
  Layers,
  Crosshair,
  Shield,
  Zap,
} from 'lucide-react';

interface ItemSelectorModalProps {
  isOpen: boolean;
  slotType: GearSlotType;
  currentSelectedId: string | null;
  currentSelectedName: string;
  accentColor: string;
  onSelect: (item: ItemRecord) => void;
  onClose: () => void;
  onClear: () => void;
}

export const ItemSelectorModal: React.FC<ItemSelectorModalProps> = ({
  isOpen,
  slotType,
  currentSelectedId,
  currentSelectedName,
  accentColor,
  onSelect,
  onClose,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const metadata = SLOT_METADATA[slotType];
  const isWeapon = slotType === 'primary_weapon' || slotType === 'secondary_weapon';
  const isSidearm = slotType === 'sidearm';
  const isGear = metadata.section === 'gear';
  const isSkill = slotType === 'skill_1' || slotType === 'skill_2';
  const isSpecialization = slotType === 'specialization';

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset search and tab when slot changes
  useEffect(() => {
    setSearchTerm('');
    setSelectedCategory('ALL');
  }, [slotType, isOpen]);

  // Retrieve all eligible items for this slot
  const eligibleItems = useMemo(() => {
    return DIVISION_ITEMS.filter((item) => {
      if (isWeapon) {
        return item.slotType === 'primary_weapon' || item.slotType === 'secondary_weapon';
      }
      if (isSkill) {
        return item.slotType === 'skill_1' || item.slotType === 'skill_2';
      }
      return item.slotType === slotType;
    });
  }, [slotType, isWeapon, isSkill]);

  // Categories list based on slot
  const categoryFilters = useMemo(() => {
    if (isWeapon) {
      return [
        { id: 'ALL', label: 'Todas as Armas' },
        { id: 'AR', label: 'Rifles de Assalto (AR)' },
        { id: 'SMG', label: 'Submetralhadoras (SMG)' },
        { id: 'SHOTGUN', label: 'Escopetas (Shotgun)' },
        { id: 'MMR', label: 'Rifles de Precisão (MMR)' },
        { id: 'RIFLE', label: 'Rifles (Semi-Auto)' },
        { id: 'LMG', label: 'Metralhadoras Leves (LMG)' },
        { id: 'EXOTIC', label: '★ Exóticos' },
        { id: 'NAMED', label: '♦ Nomeados' },
      ];
    }
    if (isSidearm) {
      return [
        { id: 'ALL', label: 'Todas as Armas Curtas' },
        { id: 'PISTOL', label: 'Pistolas' },
        { id: 'REVOLVER', label: 'Revólveres' },
        { id: 'SAWED_OFF', label: 'Cano Duplo / Serrado' },
        { id: 'EXOTIC', label: '★ Exóticos' },
        { id: 'NAMED', label: '♦ Nomeados' },
      ];
    }
    if (isGear) {
      return [
        { id: 'ALL', label: 'Todos os Equipamentos' },
        { id: 'EXOTIC', label: '★ Exóticos' },
        { id: 'NAMED', label: '♦ Itens Nomeados' },
        { id: 'BRANDSET', label: 'Conjuntos de Marca (Brand Sets)' },
        { id: 'GEARSET', label: 'Conjuntos de Equipamento (Gear Sets)' },
      ];
    }
    if (isSkill) {
      return [
        { id: 'ALL', label: 'Todas as Variantes' },
        { id: 'SHIELD', label: 'Escudos' },
        { id: 'HIVE', label: 'Colmeias' },
        { id: 'DRONE_TURRET', label: 'Drones & Torres' },
        { id: 'CHEM_PULSE', label: 'Lança-Químicos & Pulsos' },
        { id: 'OTHER_SKILL', label: 'Outras Habilidades' },
      ];
    }
    return [{ id: 'ALL', label: 'Todas as Especializações' }];
  }, [isWeapon, isSidearm, isGear, isSkill]);

  // Helper to categorize an item
  const getItemCategoryGroup = (item: ItemRecord): string => {
    const sub = (item.subType || '').toLowerCase();
    const brand = (item.brandOrSet || '').toLowerCase();
    const name = item.name.toLowerCase();

    if (isWeapon) {
      if (item.itemCategory) return item.itemCategory;
      if (sub.includes('assalto') || sub.includes('ar') || name.includes('elmo') || name.includes('eagle') || name.includes('famas') || name.includes('m4') || name.includes('carbine') || name.includes('p416') || name.includes('ak-m')) return 'Rifles de Assalto (AR)';
      if (sub.includes('submetralhadora') || sub.includes('smg') || name.includes('ouroboros') || name.includes('winter') || name.includes('vector') || name.includes('mpx') || name.includes('mp5') || name.includes('chatterbox') || name.includes('lady death')) return 'Submetralhadoras (SMG)';
      if (sub.includes('escopeta') || sub.includes('shotgun') || name.includes('scorpio') || name.includes('rock') || name.includes('acs') || name.includes('spas') || name.includes('super 90') || name.includes('sweet dreams')) return 'Escopetas (Shotguns)';
      if (sub.includes('precisão') || sub.includes('sniper') || sub.includes('mmr') || name.includes('nemesis') || name.includes('mantis') || name.includes('white death') || name.includes('m44') || name.includes('m700') || name.includes('sr-1')) return 'Rifles de Precisão (MMR)';
      if (sub.includes('metralhadora') || sub.includes('lmg') || name.includes('pestilence') || name.includes('bullet king') || name.includes('iron lung') || name.includes('carnage') || name.includes('gr9') || name.includes('negev') || name.includes('m60')) return 'Metralhadoras Leves (LMG)';
      if (sub.includes('rifle') || name.includes('m1a') || name.includes('baker') || name.includes('harmony') || name.includes('ravenous') || name.includes('merciless')) return 'Rifles (Semi-automáticos)';
      return 'Outras Armas';
    }

    if (isSidearm) {
      if (item.itemCategory) return item.itemCategory;
      if (sub.includes('revólver') || sub.includes('magnum') || name.includes('regulus') || name.includes('orbit') || name.includes('diceros') || name.includes('586')) return 'Revólveres Magnum';
      if (sub.includes('serrado') || name.includes('boomstick')) return 'Escopetas de Bolso';
      return 'Pistolas Semi-Automáticas';
    }

    if (isGear) {
      if (item.isExotic) return 'Peças Exóticas';
      if (item.isNamed) return 'Itens Nomeados';
      if (brand.includes('gearset') || brand.includes('striker') || brand.includes('fury') || brand.includes('heartbreaker') || brand.includes('eclipse') || brand.includes('hotshot') || brand.includes('directive') || brand.includes('initiative') || brand.includes('bulwark') || brand.includes('patriot')) {
        return 'Conjuntos de Equipamento (Gear Sets - 4 Peças)';
      }
      return 'Conjuntos de Marca (Brand Sets - Alta Tecnologia)';
    }

    if (isSkill) {
      if (name.includes('escudo') || sub.includes('escudo')) return 'Escudos Táticos';
      if (name.includes('colmeia') || sub.includes('colmeia')) return 'Colmeias de Suporte & Combate';
      if (name.includes('drone') || name.includes('torre') || sub.includes('drone') || sub.includes('torre')) return 'Drones & Torres Automatizadas';
      if (name.includes('lança-químico') || name.includes('pulso') || sub.includes('pulso') || sub.includes('chem')) return 'Lança-Químicos & Pulsos SHD';
      return 'Outras Habilidades Táticas';
    }

    return 'Especializações da Divisão';
  };

  // Filtered items based on search term and category tabs
  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return eligibleItems.filter((item) => {
      // Search matching
      const matchesSearch =
        term === '' ||
        item.name.toLowerCase().includes(term) ||
        (item.subType && item.subType.toLowerCase().includes(term)) ||
        (item.brandOrSet && item.brandOrSet.toLowerCase().includes(term)) ||
        (item.defaultTalent && item.defaultTalent.toLowerCase().includes(term)) ||
        (item.dropSource && item.dropSource.toLowerCase().includes(term)) ||
        (item.categoryDescription && item.categoryDescription.toLowerCase().includes(term));

      if (!matchesSearch) return false;

      // Category filter tab matching
      if (selectedCategory === 'ALL') return true;

      if (isWeapon) {
        if (selectedCategory === 'EXOTIC') return item.isExotic;
        if (selectedCategory === 'NAMED') return item.isNamed;
        const sub = (item.subType || '').toLowerCase();
        const cat = (item.itemCategory || '').toUpperCase();
        if (selectedCategory === 'AR') return cat === 'AR' || sub.includes('assalto') || sub.includes('ar');
        if (selectedCategory === 'SMG') return cat === 'SMG' || sub.includes('submetralhadora') || sub.includes('smg');
        if (selectedCategory === 'SHOTGUN') return cat === 'SHOTGUN' || sub.includes('escopeta') || sub.includes('shotgun');
        if (selectedCategory === 'MMR') return cat === 'MMR' || sub.includes('precisão') || sub.includes('sniper') || sub.includes('mmr');
        if (selectedCategory === 'RIFLE') return cat === 'RIFLE' || (sub.includes('rifle') && !sub.includes('assalto') && !sub.includes('precisão'));
        if (selectedCategory === 'LMG') return cat === 'LMG' || sub.includes('metralhadora') || sub.includes('lmg');
      }

      if (isSidearm) {
        if (selectedCategory === 'EXOTIC') return item.isExotic;
        if (selectedCategory === 'NAMED') return item.isNamed;
        const sub = (item.subType || '').toLowerCase();
        if (selectedCategory === 'REVOLVER') return sub.includes('revólver') || sub.includes('magnum');
        if (selectedCategory === 'SAWED_OFF') return sub.includes('serrado') || sub.includes('duplo');
        if (selectedCategory === 'PISTOL') return !sub.includes('revólver') && !sub.includes('serrado');
      }

      if (isGear) {
        if (selectedCategory === 'EXOTIC') return item.isExotic;
        if (selectedCategory === 'NAMED') return item.isNamed;
        const brand = (item.brandOrSet || '').toLowerCase();
        const isGearset = brand.includes('gearset') || brand.includes('striker') || brand.includes('fury') || brand.includes('heartbreaker') || brand.includes('eclipse') || brand.includes('hotshot') || brand.includes('directive') || brand.includes('initiative') || brand.includes('bulwark') || brand.includes('patriot') || brand.includes('rigger') || brand.includes('cavalier') || brand.includes('aegis');
        if (selectedCategory === 'GEARSET') return isGearset && !item.isExotic;
        if (selectedCategory === 'BRANDSET') return !isGearset && !item.isExotic && !item.isNamed;
      }

      if (isSkill) {
        const name = item.name.toLowerCase();
        if (selectedCategory === 'SHIELD') return name.includes('escudo');
        if (selectedCategory === 'HIVE') return name.includes('colmeia');
        if (selectedCategory === 'DRONE_TURRET') return name.includes('drone') || name.includes('torre');
        if (selectedCategory === 'CHEM_PULSE') return name.includes('lança-químico') || name.includes('pulso');
        if (selectedCategory === 'OTHER_SKILL') return !name.includes('escudo') && !name.includes('colmeia') && !name.includes('drone') && !name.includes('torre') && !name.includes('lança-químico') && !name.includes('pulso');
      }

      return true;
    });
  }, [eligibleItems, searchTerm, selectedCategory, isWeapon, isSidearm, isGear, isSkill]);

  // Group items by category for clear presentation
  const groupedItems = useMemo(() => {
    const groups: Record<string, ItemRecord[]> = {};

    filteredItems.forEach((item) => {
      const groupName = getItemCategoryGroup(item);
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
    });

    return groups;
  }, [filteredItems, getItemCategoryGroup]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#0f141d] border border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.22)] rounded-sm flex flex-col max-h-[92vh] overflow-hidden"
        style={{ borderTop: `4px solid ${accentColor}` }}
      >
        {/* Top Tactical Banner */}
        <div className="px-4 py-3 bg-[#161c28] border-b border-white/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xs flex items-center justify-center font-bold text-black shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              <Crosshair className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="text-[11px] font-mono-tech uppercase tracking-widest text-zinc-400">
                SISTEMA ISAC // CATÁLOGO DE ARMAS E EQUIPAMENTOS
              </div>
              <h2 className="text-base sm:text-lg font-bold font-rajdhani text-white uppercase tracking-wider flex items-center gap-2">
                <span>{metadata.label}</span>
                <span className="text-xs font-mono-tech px-2 py-0.5 bg-black/60 border border-white/20 text-zinc-300 font-normal rounded-xs">
                  {eligibleItems.length} itens disponíveis
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentSelectedName && (
              <button
                type="button"
                onClick={() => {
                  onClear();
                  onClose();
                }}
                className="px-2.5 py-1 text-xs font-mono-tech bg-red-950/60 hover:bg-red-900 border border-red-500/50 text-red-300 rounded-xs flex items-center gap-1 transition-colors"
                title="Desequipar e deixar este slot vazio"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desequipar</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-black/50 hover:bg-white/10 border border-white/15 rounded-xs transition-colors"
              title="Fechar catálogo (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="p-3 sm:p-4 bg-[#111722] border-b border-white/10 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Pesquisar por nome, categoria, marca, talento ou local de drop da planilha...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full bg-black/70 border border-white/20 focus:border-orange-500 rounded-xs pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-400 font-mono-tech outline-none transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 tactical-scrollbar">
            {categoryFilters.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono-tech font-bold uppercase whitespace-nowrap rounded-xs transition-all border ${
                    isActive
                      ? 'bg-orange-500 text-black border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                      : 'bg-black/50 text-zinc-300 border-white/15 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Results Summary and Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech text-zinc-400">
            <div>
              Mostrando <span className="text-orange-400 font-bold">{filteredItems.length}</span> de{' '}
              <span className="text-zinc-300">{eligibleItems.length}</span> itens registrados
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-orange-400">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Exótico
              </span>
              <span className="flex items-center gap-1 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Nomeado
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Gear Set
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span> Marca High-End
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Catalog Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-6 tactical-scrollbar bg-[#0b0f16]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-white/15 bg-black/30 rounded-xs">
              <Search className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <div className="text-base font-bold text-zinc-300 font-rajdhani">Nenhum item encontrado</div>
              <div className="text-xs text-zinc-400 font-mono-tech mt-1">
                Tente ajustar os filtros de categoria ou pesquisar por outro termo da planilha.
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('ALL');
                }}
                className="mt-3 px-3 py-1.5 bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/50 text-orange-300 text-xs font-mono-tech rounded-xs transition-colors"
              >
                Limpar filtros de busca
              </button>
            </div>
          ) : (
            Object.entries(groupedItems).map(([groupTitle, itemsInGroup]) => (
              <div key={groupTitle} className="space-y-2.5">
                {/* Category Header */}
                <div className="flex items-center gap-2 border-b border-white/15 pb-1.5">
                  <div className="w-2 h-2 bg-orange-500 rotate-45"></div>
                  <h3 className="text-xs sm:text-sm font-bold font-rajdhani tracking-wider uppercase text-zinc-200">
                    {groupTitle}
                  </h3>
                  <span className="text-[11px] font-mono-tech text-zinc-400">
                    ({itemsInGroup.length} {itemsInGroup.length === 1 ? 'item' : 'itens'})
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {itemsInGroup.map((item) => {
                    const isSelected =
                      currentSelectedId === item.id || currentSelectedName === item.name;

                    // Core styling
                    let coreBadgeBg = 'bg-red-950/70 text-red-300 border-red-500/50';
                    if (item.coreType === 'blue') {
                      coreBadgeBg = 'bg-blue-950/70 text-blue-300 border-blue-500/50';
                    } else if (item.coreType === 'yellow') {
                      coreBadgeBg = 'bg-amber-950/70 text-amber-300 border-amber-500/50';
                    }

                    return (
                      <div
                        key={item.id}
                        className={`group relative p-3.5 bg-[#121824] border transition-all rounded-xs flex flex-col justify-between gap-2.5 ${
                          isSelected
                            ? 'border-orange-500 bg-[#1a2233] shadow-[0_0_15px_rgba(249,115,22,0.25)]'
                            : item.isExotic
                            ? 'border-orange-500/50 hover:border-orange-400 hover:bg-[#161e2c]'
                            : item.isNamed
                            ? 'border-amber-500/40 hover:border-amber-400 hover:bg-[#161e2c]'
                            : 'border-white/10 hover:border-white/30 hover:bg-[#151c2a]'
                        }`}
                        style={{
                          borderLeftWidth: '4px',
                          borderLeftColor: item.isExotic
                            ? '#ea580c'
                            : item.isNamed
                            ? '#d97706'
                            : item.brandOrSet?.toLowerCase().includes('gearset') || item.brandOrSet?.toLowerCase().includes('striker')
                            ? '#10b981'
                            : '#0284c7',
                        }}
                      >
                        {/* Header: Name + Badges */}
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4
                                  className={`text-sm sm:text-base font-bold font-rajdhani leading-tight ${
                                    item.isExotic
                                      ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                                      : item.isNamed
                                      ? 'text-amber-300'
                                      : 'text-white'
                                  }`}
                                >
                                  {item.name}
                                </h4>
                                {item.isExotic && (
                                  <span className="text-[10px] font-mono-tech px-1.5 py-0.2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xs flex items-center gap-0.5">
                                    <Sparkles className="w-2.5 h-2.5" /> EXÓTICO
                                  </span>
                                )}
                                {item.isNamed && (
                                  <span className="text-[10px] font-mono-tech px-1.5 py-0.2 bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold rounded-xs">
                                    NOMEADO
                                  </span>
                                )}
                                {item.brandOrSet && (
                                  <span className="text-[10px] font-mono-tech px-1.5 py-0.2 bg-white/10 text-zinc-300 border border-white/15 rounded-xs truncate max-w-[200px]">
                                    {item.brandOrSet}
                                  </span>
                                )}
                              </div>

                              {/* Category & Ballistic Description */}
                              {item.subType && (
                                <div className="text-xs font-mono-tech text-zinc-400 mt-1">
                                  {item.subType}
                                </div>
                              )}
                              {item.categoryDescription && (
                                <div className="text-[11px] text-zinc-300/90 leading-relaxed mt-1 font-rajdhani bg-black/40 p-1.5 rounded-xs border-l-2 border-zinc-600">
                                  {item.categoryDescription}
                                </div>
                              )}
                            </div>

                            {isSelected && (
                              <span className="px-2 py-0.5 bg-orange-500 text-black font-bold font-mono-tech text-[10px] rounded-xs flex items-center gap-1 flex-shrink-0">
                                <Check className="w-3 h-3" /> EQUIPADO
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stats / Core / Fixed Attributes */}
                        <div className="space-y-1.5 pt-1 border-t border-white/10 text-xs font-mono-tech">
                          {/* Core Attribute */}
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-400 text-[11px]">Núcleo:</span>
                            <span
                              className={`px-2 py-0.5 rounded-xs border font-bold text-[11px] ${coreBadgeBg}`}
                            >
                              {item.defaultCore}
                            </span>
                          </div>

                          {/* Fixed Secondaries */}
                          {item.fixedSecondaries && item.fixedSecondaries.length > 0 && (
                            <div className="flex items-start gap-1.5 text-amber-300/90 text-[11px]">
                              <Lock className="w-3 h-3 mt-0.5 flex-shrink-0 text-amber-400" />
                              <div className="flex-1">
                                <span className="text-zinc-400">Atributos Fixos: </span>
                                {item.fixedSecondaries.join(' • ')}
                              </div>
                            </div>
                          )}

                          {/* Rollable Secondaries note */}
                          {item.maxRollableSecondaries !== undefined && item.maxRollableSecondaries > 0 && (
                            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                              <Sliders className="w-3 h-3 flex-shrink-0 text-zinc-400" />
                              <span>
                                {item.maxRollableSecondaries}{' '}
                                {item.maxRollableSecondaries === 1
                                  ? 'slot secundário livre'
                                  : 'slots secundários livres'}
                              </span>
                            </div>
                          )}

                          {/* Talent / Special Perk */}
                          {item.defaultTalent && (
                            <div className="bg-black/50 p-2 rounded-xs border border-white/10 text-[11px] text-zinc-300 leading-tight">
                              <span className="text-orange-400 font-bold block mb-0.5">
                                Talento / Bônus Especial:
                              </span>
                              {item.defaultTalent}
                            </div>
                          )}

                          {/* Drop Source */}
                          {item.dropSource && (
                            <div className="flex items-start gap-1 text-[11px] text-zinc-400 bg-white/5 px-2 py-1 rounded-xs">
                              <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0 mt-0.5" />
                              <div className="flex-1 truncate" title={item.dropSource}>
                                <span className="text-zinc-300 font-medium">Onde Farmar: </span>
                                {item.dropSource}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Equip Button */}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              onSelect(item);
                              onClose();
                            }}
                            className={`w-full py-2 px-3 text-xs font-mono-tech font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 hover:bg-orange-500/30'
                                : 'bg-orange-600 hover:bg-orange-500 text-white shadow-md'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5" /> RE-EQUIPAR ESTE ITEM
                              </>
                            ) : (
                              <>
                                <Crosshair className="w-3.5 h-3.5" /> EQUIPAR NESTE SLOT
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#141a24] border-t border-white/15 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
          <div className="truncate">
            Pressione <kbd className="px-1.5 py-0.5 bg-black/60 border border-white/20 rounded-xs text-white">ESC</kbd> para fechar ou clique fora.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xs transition-colors uppercase tracking-wider"
          >
            Fechar Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
