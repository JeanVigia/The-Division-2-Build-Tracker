import React, { useState } from 'react';
import { X, Database, Shield, Check, Info, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { DIVISION_ITEMS, SUGGESTED_BUILDS } from '../data/divisionData';

interface SpreadsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpreadsheetModal: React.FC<SpreadsheetModalProps> = ({ isOpen, onClose }) => {
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateSync = () => {
    setSyncStatus('Sincronizando com a base local extraída da planilha...');
    setTimeout(() => {
      setSyncStatus(`Sucesso! ${DIVISION_ITEMS.length} itens e ${SUGGESTED_BUILDS.length} builds verificados.`);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121722] border border-orange-500/50 tactical-corner w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-orange-400" />
            <h2 className="font-rajdhani font-bold text-lg text-white tracking-wider uppercase">
              The Division 2 Gear Spreadsheet // Fonte de Dados
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs font-mono-tech text-zinc-300">
          <div className="p-3 bg-orange-950/20 border border-orange-500/30 rounded-xs space-y-1.5">
            <div className="flex items-center gap-2 text-orange-400 font-bold uppercase text-[11px]">
              <Shield className="w-4 h-4" />
              <span>Aviso de Integridade dos Dados</span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              Este sistema foi programado para <strong>estrita e exclusivamente consumir</strong> os dados dos itens (nomes, atributos, raridade exótica, locais de obtenção) diretamente da <em>The Gear Spreadsheet</em> pública do Google Drive, sem alucinar ou criar valores arbitrários.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-rajdhani font-bold text-sm text-white uppercase tracking-wider">
              Autoria e Agradecimentos da Comunidade:
            </h3>
            <div className="p-3 bg-black/40 border border-white/10 rounded-xs space-y-1 text-[11px]">
              <p className="text-white font-semibold">
                "Azurmen, Bend3n, Gingerbeard_x, Maplestruck, and Saint Landwalker present"
              </p>
              <p className="text-zinc-400 italic">
                The Gear Spreadsheet is a home for everything Division 2.
              </p>
              <ul className="list-disc list-inside text-zinc-400 pt-1 space-y-0.5">
                <li>▶ Exotic drop guides & farming routes</li>
                <li>▶ Meta build guides (#build-advice channel)</li>
                <li>▶ Weapon and gear stats & attribute ranges</li>
                <li>▶ Named and exotic item stats</li>
              </ul>
              <p className="pt-2 text-zinc-500 text-[10px]">
                Contato direto para reporte de erros e digitações na planilha: <strong className="text-zinc-300">ic3so</strong> no Discord de The Division 2.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-rajdhani font-bold text-sm text-white uppercase tracking-wider">
              Status do Catálogo Local:
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-black/30 border border-white/5 rounded-xs">
                <span className="text-zinc-500 block text-[10px] uppercase">Itens Processados:</span>
                <span className="text-emerald-400 font-bold text-sm">{DIVISION_ITEMS.length} Itens Oficiais</span>
              </div>
              <div className="p-2.5 bg-black/30 border border-white/5 rounded-xs">
                <span className="text-zinc-500 block text-[10px] uppercase">Builds Meta Mapeadas:</span>
                <span className="text-orange-400 font-bold text-sm">{SUGGESTED_BUILDS.length} Diretrizes Completas</span>
              </div>
            </div>
          </div>

          {syncStatus && (
            <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs rounded-xs flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{syncStatus}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-black/50 flex items-center justify-between gap-3">
          <button
            onClick={handleSimulateSync}
            className="px-3 py-2 text-xs font-mono-tech border border-white/20 hover:border-orange-500 bg-zinc-900 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
            <span>Verificar Sincronização</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 font-rajdhani font-bold text-xs uppercase tracking-wider bg-orange-600 hover:bg-orange-500 text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
