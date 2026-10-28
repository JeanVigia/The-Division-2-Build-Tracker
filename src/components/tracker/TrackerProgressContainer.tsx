import React, { useEffect } from 'react';
import { ShieldCheck, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrackerProgressContainerProps {
  acquiredCount: number;
  totalSlotsCount: number;
  accentColor: string;
}

export const TrackerProgressContainer: React.FC<TrackerProgressContainerProps> = ({
  acquiredCount,
  totalSlotsCount,
  accentColor,
}) => {
  const progressPercentage = Math.round((acquiredCount / totalSlotsCount) * 100);

  // Trigger celebration on 12/12
  useEffect(() => {
    if (acquiredCount === totalSlotsCount) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: [accentColor, '#FF6B00', '#10B981', '#ffffff'],
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [acquiredCount, totalSlotsCount, accentColor]);

  return (
    <div className="p-4 bg-[#10141d] border border-white/15 rounded-sm space-y-3 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm font-mono-tech">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" style={{ color: accentColor }} />
          <span className="uppercase text-zinc-200 font-semibold">
            Progresso de Coleta Operacional:
          </span>
          <strong className="text-white text-base" style={{ color: accentColor }}>
            {acquiredCount} / {totalSlotsCount} Itens Adquiridos
          </strong>
        </div>
        <div className="font-bold text-base tracking-wider" style={{ color: accentColor }}>
          {progressPercentage}% CONCLUÍDO
        </div>
      </div>

      {/* Continuous Bar with 12 Visible Segments */}
      <div className="grid grid-cols-12 gap-1.5 h-4 p-0.5 bg-black/70 border border-white/20 rounded-xs">
        {Array.from({ length: totalSlotsCount }).map((_, index) => {
          const isFilled = index < acquiredCount;
          return (
            <div
              key={index}
              className="h-full rounded-xs transition-all duration-300"
              style={{
                backgroundColor: isFilled ? accentColor : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isFilled ? `0 0 10px ${accentColor}90` : 'none',
              }}
            />
          );
        })}
      </div>

      {/* 100% Completion Victory Banner */}
      {acquiredCount === totalSlotsCount && (
        <div
          className="p-4 border tactical-corner flex items-center gap-3 animate-pulse shadow-lg"
          style={{
            borderColor: accentColor,
            backgroundColor: `${accentColor}20`,
          }}
        >
          <Trophy className="w-7 h-7 flex-shrink-0" style={{ color: accentColor }} />
          <div>
            <div className="font-rajdhani font-bold text-lg uppercase text-white tracking-wider">
              PROTOCOLO COMPLETO // TODOS OS 12 ITENS COLETADOS
            </div>
            <p className="text-xs font-mono-tech text-zinc-200">
              Sua diretriz tática está 100% pronta para combate em Raids, Incursões ou Mundo Aberto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
