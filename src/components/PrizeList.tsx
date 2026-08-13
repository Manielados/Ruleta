import React from 'react';
import { PRIZES } from '../data/prizes';
import { PrizeId } from '../types';

export const PrizeList: React.FC = () => {
  const prizeOrder: PrizeId[] = ['premium', 'cremoso', 'natural', 'gracias'];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4 sm:px-6">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="font-serif-display text-2xl sm:text-3xl text-[#FBB404] font-bold tracking-wide">
          Tabla de Premios y Probabilidades
        </h3>
        <p className="text-xs sm:text-sm text-[#FAF8E5]/70 mt-1 font-lato">
          Probabilidades reales de victoria por giro
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {prizeOrder.map((id) => {
          const prize = PRIZES[id];
          return (
            <div
              key={prize.id}
              className={`
                relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between
                ${
                  prize.id === 'premium'
                    ? 'bg-gradient-to-b from-[#006045] to-[#002C22] border-[#FBB404] shadow-[0_0_20px_rgba(251,180,4,0.3)]'
                    : 'bg-[#002C22]/80 border-[#006045] hover:border-[#FBB404]/50'
                }
              `}
            >
              {/* Badge Probabilidad */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{prize.icon}</span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#0F271C] text-[#FBB404] border border-[#FBB404]/30">
                  {prize.probability}% Prob.
                </span>
              </div>

              <div>
                <h4 className="font-serif-display text-lg font-bold text-[#FAF8E5] mb-1">
                  {prize.title}
                </h4>
                <p className="text-xs text-[#FAF8E5]/80 leading-snug">
                  {prize.description}
                </p>
              </div>

              {prize.id === 'premium' && (
                <div className="mt-3 text-[10px] font-bold text-[#FBB404] uppercase tracking-wider text-center bg-[#FBB404]/10 py-1 rounded-lg">
                  ⭐ Premio Especial ⭐
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
