import React from 'react';
import { WheelStats } from '../types';

interface StatsBarProps {
  stats: WheelStats;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <div className="p-4 rounded-2xl bg-[#002C22]/90 border border-[#006045] shadow-lg flex flex-wrap items-center justify-around gap-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#FAF8E5]/70 font-bold uppercase">Natural</span>
          <span className="text-xl font-serif-display font-bold text-[#FAF8E5]">
            🍦 {stats.naturalCount}
          </span>
        </div>

        <div className="h-8 w-px bg-[#006045]" />

        <div className="flex flex-col items-center">
          <span className="text-xs text-[#FAF8E5]/70 font-bold uppercase">Cremoso</span>
          <span className="text-xl font-serif-display font-bold text-[#E07101]">
            🍨 {stats.cremosoCount}
          </span>
        </div>

        <div className="h-8 w-px bg-[#006045]" />

        <div className="flex flex-col items-center">
          <span className="text-xs text-[#FAF8E5]/70 font-bold uppercase">Premium</span>
          <span className="text-xl font-serif-display font-bold text-[#FBB404]">
            ⭐ {stats.premiumCount}
          </span>
        </div>

        <div className="h-8 w-px bg-[#006045]" />

        <div className="flex flex-col items-center">
          <span className="text-xs text-[#FAF8E5]/70 font-bold uppercase">Gracias</span>
          <span className="text-xl font-serif-display font-bold text-[#FAF8E5]/60">
            ✨ {stats.graciasCount}
          </span>
        </div>
      </div>
    </div>
  );
};
