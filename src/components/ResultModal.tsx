import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Prize, Segment } from '../types';

interface ResultModalProps {
  isOpen: boolean;
  prize: Prize | null;
  segment: Segment | null;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  prize,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen && prize?.isWin) {
      // Trigger canvas confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FBB404', '#006045', '#E07101', '#FAF8E5', '#ffffff'],
        });

        // Extra side bursts for premium
        if (prize.id === 'premium') {
          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#FBB404', '#FAF8E5'],
            });
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#FBB404', '#FAF8E5'],
            });
          }, 200);
        }
      } catch {
        // ignore confetti errors
      }
    }
  }, [isOpen, prize]);

  if (!isOpen || !prize) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#003E30] to-[#002C22] border-2 border-[#FBB404]/60 shadow-[0_0_60px_rgba(251,180,4,0.3)] text-center text-[#FAF8E5] overflow-hidden">
        
        {/* Background Decorative Rays */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FBB404] via-transparent to-transparent" />

        {/* Top Header Badge */}
        <div className="mb-4 inline-block px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-[#0F271C] border border-[#FBB404]/40 text-[#FBB404]">
          {prize.isWin ? '🎉 ¡FELICIDADES! 🎉' : '✨ MANIELADOS ✨'}
        </div>

        {/* Big Animated Icon */}
        <div className="text-6xl sm:text-7xl my-3 animate-bounce">
          {prize.icon}
        </div>

        {/* Prize Title */}
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#FBB404] my-2 drop-shadow-md">
          {prize.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#FAF8E5]/90 font-medium my-4 px-2 leading-relaxed">
          {prize.description}
        </p>

        {/* Win / Coupon Banner if Won */}
        {prize.isWin && (
          <div className="my-5 p-3 rounded-2xl bg-[#006045]/60 border border-[#FAF8E5]/20 text-xs sm:text-sm text-[#FAF8E5]">
            Muestra esta pantalla en el mostrador para reclamar tu premio.
          </div>
        )}

        {/* Action Button: "Girar de nuevo" */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-4 px-6 rounded-2xl font-serif-display text-xl font-bold bg-[#FBB404] text-[#0F271C] hover:bg-[#ffc226] active:scale-95 transition-all shadow-lg shadow-[#FBB404]/20 border border-[#FAF8E5] cursor-pointer"
          >
            Girar de nuevo 🔄
          </button>
        </div>
      </div>
    </div>
  );
};
