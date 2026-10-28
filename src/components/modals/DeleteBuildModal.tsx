import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { BuildRecord } from '../../types/division';

interface DeleteBuildModalProps {
  isOpen: boolean;
  buildToDelete: BuildRecord | null;
  totalBuildsCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteBuildModal: React.FC<DeleteBuildModalProps> = ({
  isOpen,
  buildToDelete,
  totalBuildsCount,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !buildToDelete) return null;

  const isLastBuild = totalBuildsCount <= 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121722] border border-red-500/80 tactical-corner w-full max-w-md shadow-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-500/30">
          <div className="flex items-center gap-2 text-red-400 font-bold font-rajdhani text-lg uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>CONFIRMAÇÃO // PURGA DE DIRETRIZ</span>
          </div>
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 text-xs font-mono-tech text-zinc-300">
          <p className="text-sm text-white font-rajdhani font-semibold">
            Você tem certeza de que deseja excluir a diretriz:
          </p>

          <div
            className="p-3 bg-black/60 border border-white/15 rounded-xs flex items-center gap-2.5"
            style={{ borderLeftColor: buildToDelete.customColorHex, borderLeftWidth: '4px' }}
          >
            <span
              className="w-3 h-3 rounded-xs flex-shrink-0"
              style={{ backgroundColor: buildToDelete.customColorHex }}
            />
            <span className="text-base font-bold text-white font-rajdhani truncate">
              {buildToDelete.title}
            </span>
          </div>

          <p className="text-zinc-400 text-xs leading-relaxed">
            {isLastBuild
              ? 'Esta é a sua única diretriz ativa. Ao excluí-la, uma nova diretriz em branco (SHD-01) será criada automaticamente para você reiniciar o planejamento.'
              : 'Esta ação removerá todos os 12 slots e o progresso de itens associados a esta build da sua memória local.'}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-mono-tech font-bold border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white transition-colors rounded-xs"
          >
            CANCELAR
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 text-xs font-rajdhani font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition-all shadow-md rounded-xs"
          >
            <Trash2 className="w-4 h-4" />
            <span>CONFIRMAR EXCLUSÃO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
