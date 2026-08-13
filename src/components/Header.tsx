import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { WheelStats } from '../types';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  stats: WheelStats;
  onResetStats: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  stats,
  onResetStats,
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#006045]/40 mb-6">
      {/* Brand Title */}
      <div className="text-center sm:text-left">
        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#FAF8E5] drop-shadow-md">
          Manielados
        </h1>
        <p className="text-xs sm:text-sm font-lato text-[#FBB404] tracking-widest uppercase font-bold mt-0.5">
          Helados en fundita artesanales, San José de Ocoa.
        </p>
      </div>

      {/* Header Actions & Quick Stats */}
      <div className="flex items-center gap-3">
        {/* Total Spins Pill */}
        <div className="px-3 py-1.5 rounded-full bg-[#002C22] border border-[#006045] text-xs font-bold text-[#FAF8E5] flex items-center gap-2">
          <span className="text-[#FBB404]">Giros:</span>
          <span>{stats.totalSpins}</span>
        </div>

        {/* Audio Mute Button */}
        <button
          onClick={onToggleMute}
          className="p-2.5 rounded-full bg-[#002C22] border border-[#006045] hover:border-[#FBB404] text-[#FAF8E5] hover:text-[#FBB404] transition-all cursor-pointer"
          title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          aria-label="Sonido"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Reset Stats Button */}
        {stats.totalSpins > 0 && (
          <button
            onClick={onResetStats}
            className="p-2.5 rounded-full bg-[#002C22] border border-[#006045] hover:border-red-400 text-[#FAF8E5] hover:text-red-400 transition-all cursor-pointer"
            title="Reiniciar estadísticas"
            aria-label="Reiniciar estadísticas"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>
    </header>
  );
};
