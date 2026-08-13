import { Prize, PrizeId, Segment } from '../types';

export const PRIZES: Record<PrizeId, Prize> = {
  gracias: {
    id: 'gracias',
    title: 'Gracias por participar',
    shortLabel: 'Gracias',
    icon: '✨',
    probability: 72,
    colorBg: '#0F271C',
    colorText: '#FAF8E5',
    description: '¡Sigue intentándolo en tu próxima visita!',
    isWin: false,
  },
  natural: {
    id: 'natural',
    title: 'Helado Natural',
    shortLabel: 'Natural',
    icon: '🍦',
    probability: 20,
    colorBg: '#006045',
    colorText: '#FAF8E5',
    description: '1 Helado Natural.',
    isWin: true,
  },
  cremoso: {
    id: 'cremoso',
    title: 'Helado Cremoso',
    shortLabel: 'Cremoso',
    icon: '🍨',
    probability: 6,
    colorBg: '#E07101',
    colorText: '#FAF8E5',
    description: '1 Helado Cremoso de textura rica y suave.',
    isWin: true,
  },
  premium: {
    id: 'premium',
    title: 'Helado Premium',
    shortLabel: 'Premium',
    icon: '⭐',
    probability: 2,
    colorBg: '#FBB404',
    colorText: '#0F271C',
    description: '¡GRAN PREMIO! 1 Helado de nuestra linea Premium.',
    isWin: true,
    glow: true,
  },
};

// Index mapping for 50 segments:
// Premium: 1 segment -> index 0
// Cremoso: 3 segments -> index 12, 25, 38
// Natural: 10 segments -> index 3, 7, 15, 19, 22, 28, 32, 35, 41, 45
// Gracias: 36 segments -> all remaining indices
const SPECIAL_INDICES: Record<number, PrizeId> = {
  0: 'premium',
  
  12: 'cremoso',
  25: 'cremoso',
  38: 'cremoso',

  3: 'natural',
  7: 'natural',
  15: 'natural',
  19: 'natural',
  22: 'natural',
  28: 'natural',
  32: 'natural',
  35: 'natural',
  41: 'natural',
  45: 'natural',
};

export const SEGMENTS: Segment[] = Array.from({ length: 50 }, (_, i) => {
  const prizeId: PrizeId = SPECIAL_INDICES[i] || 'gracias';
  const prize = PRIZES[prizeId];
  return {
    index: i,
    prizeId,
    label: prize.shortLabel,
    icon: prize.icon,
    colorBg: prize.colorBg,
    colorText: prize.colorText,
    glow: prize.glow,
  };
});

/**
 * Chooses a winning prize based on real probabilities (72/20/6/2)
 * and picks a random segment among those matching that prize.
 */
export function getRandomSpinTarget(): { chosenSegment: Segment; chosenPrize: Prize } {
  const rand = Math.random() * 100; // 0 to 100

  let chosenPrizeId: PrizeId = 'gracias';
  if (rand < 72) {
    chosenPrizeId = 'gracias';
  } else if (rand < 92) { // 72 + 20 = 92
    chosenPrizeId = 'natural';
  } else if (rand < 98) { // 92 + 6 = 98
    chosenPrizeId = 'cremoso';
  } else { // 98 to 100 = 2%
    chosenPrizeId = 'premium';
  }

  const matchingSegments = SEGMENTS.filter((s) => s.prizeId === chosenPrizeId);
  const chosenSegment = matchingSegments[Math.floor(Math.random() * matchingSegments.length)];

  return {
    chosenSegment,
    chosenPrize: PRIZES[chosenPrizeId],
  };
}
