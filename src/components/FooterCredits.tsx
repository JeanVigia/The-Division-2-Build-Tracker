import React from 'react';
import { Database, Shield, Heart, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';

interface FooterCreditsProps {
  onOpenSpreadsheetModal: () => void;
}

export const FooterCredits: React.FC<FooterCreditsProps> = ({ onOpenSpreadsheetModal }) => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#090d13] text-zinc-400 py-8 px-4 text-xs font-mono-tech">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Credits Box */}
        <div className="p-4 bg-[#0d121a] border border-white/10 tactical-corner flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-500" />
              <span className="font-rajdhani font-bold text-sm tracking-wider uppercase text-white">
                The Division 2 // Créditos Oficiais da Base de Dados
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed max-w-3xl">
              Aplicação alimentada pelos dados públicos da consagrada <strong className="text-orange-400">The Division 2 Gear Spreadsheet</strong>, desenvolvida e mantida artesanalmente pela equipe do canal <span className="text-white">#build-advice</span> no Discord oficial de The Division 2.
            </p>
            <p className="text-[10px] text-zinc-500">
              Autores e Curadores: <em>Azurmen, Bend3n, Gingerbeard_x, Maplestruck e Saint Landwalker</em>. Contato para correções: <em>ic3so</em> no Discord.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenSpreadsheetModal}
              className="px-3 py-1.5 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/40 text-orange-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono-tech"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Ver Estrutura da Planilha</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright / disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-500 border-t border-white/5 pt-4">
          <div>
            The Division 2 é uma marca registrada da Ubisoft Entertainment e Massive Entertainment. Este aplicativo é uma ferramenta comunitária de suporte tático sem fins lucrativos.
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Armazenamento local (Offline-first) • SHD Protocol v2.8</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
