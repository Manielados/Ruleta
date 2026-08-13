import React, { useMemo } from 'react';
import { SEGMENTS } from '../data/prizes';
import { Segment } from '../types';

interface WheelProps {
  rotation: number;
  isSpinning: boolean;
  onSpinStart: () => void;
  disabled: boolean;
  winningSegment: Segment | null;
}

export const Wheel: React.FC<WheelProps> = ({
  rotation,
  isSpinning,
  onSpinStart,
  disabled,
  winningSegment,
}) => {
  const totalSegments = SEGMENTS.length; // 50
  const segmentAngle = 360 / totalSegments; // 7.2 deg
  const cx = 400;
  const cy = 400;
  const rOuter = 345;
  const rHub = 100;
  const rBulbs = 362;

  // Pre-calculate path coordinates for 50 slices
  const slicePaths = useMemo(() => {
    return SEGMENTS.map((seg) => {
      const i = seg.index;
      // Center of segment i is at i * 7.2 deg
      // Half-width is 3.6 deg
      const startDeg = (i - 0.5) * segmentAngle - 90;
      const endDeg = (i + 0.5) * segmentAngle - 90;

      const startRad = (startDeg * Math.PI) / 180;
      const endRad = (endDeg * Math.PI) / 180;

      const x1o = cx + rOuter * Math.cos(startRad);
      const y1o = cy + rOuter * Math.sin(startRad);
      const x2o = cx + rOuter * Math.cos(endRad);
      const y2o = cy + rOuter * Math.sin(endRad);

      const x1i = cx + rHub * Math.cos(startRad);
      const y1i = cy + rHub * Math.sin(startRad);
      const x2i = cx + rHub * Math.cos(endRad);
      const y2i = cy + rHub * Math.sin(endRad);

      // SVG path: Move to inner start, Line to outer start, Arc to outer end, Line to inner end, Arc back to inner start
      const pathD = `
        M ${x1i} ${y1i}
        L ${x1o} ${y1o}
        A ${rOuter} ${rOuter} 0 0 1 ${x2o} ${y2o}
        L ${x2i} ${y2i}
        A ${rHub} ${rHub} 0 0 0 ${x1i} ${y1i}
        Z
      `;

      return {
        ...seg,
        pathD,
        centerDeg: i * segmentAngle,
      };
    });
  }, [segmentAngle]);

  // Pre-calculate 50 casino light bulbs along the outer rim
  const bulbs = useMemo(() => {
    return Array.from({ length: 50 }, (_, idx) => {
      const angleDeg = idx * segmentAngle - 90;
      const angleRad = (angleDeg * Math.PI) / 180;
      const bx = cx + rBulbs * Math.cos(angleRad);
      const by = cy + rBulbs * Math.sin(angleRad);
      return { idx, bx, by };
    });
  }, [segmentAngle]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isSpinning ? 'spinning' : ''}`}>
      {/* Outer Glow Wrapper */}
      <div className="relative p-2 md:p-4 rounded-full bg-gradient-to-b from-[#FBB404]/30 via-transparent to-[#FBB404]/10 shadow-[0_0_60px_rgba(251,180,4,0.25)]">
        
        {/* Top Metallic Pointer Indicator (Fixed at 12 o'clock) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30 pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pointerGrad" x1="0" y1="0" x2="48" y2="56">
                <stop offset="0%" stopColor="#FAF8E5" />
                <stop offset="40%" stopColor="#FBB404" />
                <stop offset="100%" stopColor="#9E6E00" />
              </linearGradient>
              <filter id="pointerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.6" />
              </filter>
            </defs>
            {/* Top mounting pin */}
            <circle cx="24" cy="12" r="8" fill="#006045" stroke="#FBB404" strokeWidth="2.5" />
            <circle cx="24" cy="12" r="3" fill="#FAF8E5" />
            {/* Pointer arrow pointing down */}
            <path
              d="M 12 16 L 36 16 L 24 52 Z"
              fill="url(#pointerGrad)"
              stroke="#0F271C"
              strokeWidth="2"
              filter="url(#pointerShadow)"
            />
            {/* Center metallic highlight line */}
            <line x1="24" y1="18" x2="24" y2="46" stroke="#FAF8E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>

        {/* SVG Wheel Container */}
        <svg
          viewBox="0 0 800 800"
          className="w-[330px] h-[330px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[600px] lg:h-[600px] max-w-[92vw] max-h-[92vw] drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)]"
        >
          <defs>
            {/* Outer Rim Gradient */}
            <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#006045" />
              <stop offset="94%" stopColor="#002C22" />
              <stop offset="100%" stopColor="#0F271C" />
            </radialGradient>

            {/* Gold Rim Border Gradient */}
            <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBB404" />
              <stop offset="50%" stopColor="#FAF8E5" />
              <stop offset="100%" stopColor="#B37E00" />
            </linearGradient>

            {/* Hub Metallic Gradient */}
            <radialGradient id="hubGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#00805c" />
              <stop offset="60%" stopColor="#006045" />
              <stop offset="100%" stopColor="#002C22" />
            </radialGradient>

            {/* Premium Glow Filter */}
            <filter id="premiumGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Outer Metallic Rim with Texture & Gold Accent */}
          <circle cx={cx} cy={cy} r="392" fill="url(#goldBorder)" />
          <circle cx={cx} cy={cy} r="386" fill="url(#rimGrad)" stroke="#002C22" strokeWidth="3" />
          <circle cx={cx} cy={cy} r="348" fill="none" stroke="url(#goldBorder)" strokeWidth="3" />

          {/* 2. Casino Light Bulbs Ring */}
          <g>
            {bulbs.map(({ idx, bx, by }) => (
              <circle
                key={`bulb-${idx}`}
                cx={bx}
                cy={by}
                r="5.5"
                className={idx % 2 === 0 ? 'light-bulb-even' : 'light-bulb-odd'}
                stroke="#523F0B"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* 3. ROTATING WHEEL GROUP */}
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              transition: isSpinning ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            {/* Wheel background base */}
            <circle cx={cx} cy={cy} r={rOuter} fill="#0F271C" />

            {/* 50 Segments */}
            {slicePaths.map((seg) => {
              const isWinningHighlight = !isSpinning && winningSegment?.index === seg.index;
              return (
                <g key={`slice-${seg.index}`}>
                  {/* Segment slice path */}
                  <path
                    d={seg.pathD}
                    fill={seg.colorBg}
                    stroke="#000000"
                    strokeWidth="0.5"
                    className={seg.glow ? 'brightness-110' : ''}
                    filter={seg.glow ? 'url(#premiumGlow)' : undefined}
                  />

                  {/* Winning slice pulse highlight */}
                  {isWinningHighlight && (
                    <path
                      d={seg.pathD}
                      fill="#FAF8E5"
                      opacity="0.35"
                      className="animate-pulse"
                    />
                  )}

                  {/* Segment Content (Rotated radially to align with slice center) */}
                  <g transform={`rotate(${seg.centerDeg}, ${cx}, ${cy})`}>
                    {/* Icon near outer rim */}
                    <text
                      x={cx}
                      y={cy - 290}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="14"
                      className="select-none pointer-events-none"
                    >
                      {seg.icon}
                    </text>

                    {/* Short Text Label closer to hub */}
                    <text
                      x={cx}
                      y={cy - 195}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={seg.colorText}
                      fontSize="8.5"
                      fontWeight="900"
                      fontFamily="'Lato', sans-serif"
                      letterSpacing="0.4"
                      className="uppercase tracking-wider select-none pointer-events-none"
                      transform={`rotate(90, ${cx}, ${cy - 195})`}
                    >
                      {seg.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Radii / Spokes Thin Metallic Lines */}
            {slicePaths.map((seg) => {
              const startDeg = (seg.index - 0.5) * segmentAngle - 90;
              const rad = (startDeg * Math.PI) / 180;
              const x1 = cx + rHub * Math.cos(rad);
              const y1 = cy + rHub * Math.sin(rad);
              const x2 = cx + rOuter * Math.cos(rad);
              const y2 = cy + rOuter * Math.sin(rad);

              return (
                <line
                  key={`spoke-${seg.index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#FAF8E5"
                  strokeWidth="1.2"
                  opacity="0.7"
                />
              );
            })}

            {/* Decorative inner ring border */}
            <circle cx={cx} cy={cy} r={rHub + 2} fill="none" stroke="#FBB404" strokeWidth="2" />
          </g>

          {/* 4. CENTRAL HUB (FIXED LOGO - DOES NOT ROTATE, OR STAYS STABLE) */}
          <g className="cursor-pointer" onClick={!disabled ? onSpinStart : undefined}>
            {/* Hub Outer Ring */}
            <circle cx={cx} cy={cy} r={rHub} fill="url(#hubGrad)" stroke="url(#goldBorder)" strokeWidth="6" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.8))" />
            <circle cx={cx} cy={cy} r={rHub - 8} fill="none" stroke="#FBB404" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />

            {/* Brand Logo "Manielados" */}
            <text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'DM Serif Display', serif"
              fontSize="23"
              fontWeight="bold"
              fill="#FAF8E5"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide"
            >
              Manielados
            </text>

            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Lato', sans-serif"
              fontSize="8"
              fontWeight="900"
              fill="#FBB404"
              className="tracking-[0.25em] uppercase opacity-90"
            >
              HELADERÍA ARTESANAL
            </text>

            {/* Decorative center star icon */}
            <text
              x={cx}
              y={cy + 34}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
            >
              🍨
            </text>
          </g>
        </svg>
      </div>

      {/* "¡GIRAR!" Button below wheel */}
      <div className="mt-6 md:mt-8 z-20">
        <button
          onClick={onSpinStart}
          disabled={disabled || isSpinning}
          className={`
            group relative px-10 py-4 sm:px-14 sm:py-5 rounded-full font-serif-display text-2xl sm:text-3xl font-bold tracking-wider uppercase
            transition-all duration-200 transform
            ${
              disabled || isSpinning
                ? 'bg-amber-800/50 text-amber-200/40 cursor-not-allowed shadow-none scale-95 border-2 border-amber-900/40'
                : 'bg-[#FBB404] hover:bg-[#ffc226] text-[#0F271C] active:scale-95 shadow-[0_0_35px_rgba(251,180,4,0.6)] hover:shadow-[0_0_50px_rgba(251,180,4,0.9)] cursor-pointer border-2 border-[#FAF8E5]'
            }
          `}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>✨</span>
            <span>{isSpinning ? 'GIRANDO...' : '¡GIRAR!'}</span>
            <span>✨</span>
          </span>
          {!isSpinning && !disabled && (
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      </div>
    </div>
  );
};
