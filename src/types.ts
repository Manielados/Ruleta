export type PrizeId = 'gracias' | 'natural' | 'cremoso' | 'premium';

export interface Prize {
  id: PrizeId;
  title: string;
  shortLabel: string;
  icon: string;
  probability: number; // Percentage, e.g. 72, 20, 6, 2
  colorBg: string;
  colorText: string;
  description: string;
  isWin: boolean;
  glow?: boolean;
}

export interface Segment {
  index: number;
  prizeId: PrizeId;
  label: string;
  icon: string;
  colorBg: string;
  colorText: string;
  glow?: boolean;
}

export interface SpinResult {
  segment: Segment;
  prize: Prize;
  timestamp: number;
}

export interface WheelStats {
  totalSpins: number;
  graciasCount: number;
  naturalCount: number;
  cremosoCount: number;
  premiumCount: number;
}
