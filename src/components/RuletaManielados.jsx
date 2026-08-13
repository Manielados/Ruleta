import React, { useState, useRef, useEffect } from 'react';
import { Wheel } from './Wheel';
import { ResultModal } from './ResultModal';
import { PrizeList } from './PrizeList';
import { Header } from './Header';
import { StatsBar } from './StatsBar';
import { getRandomSpinTarget } from '../data/prizes';
import { soundManager } from '../utils/audio';

export function RuletaManielados() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningSegment, setWinningSegment] = useState(null);
  const [winningPrize, setWinningPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Session Statistics
  const [stats, setStats] = useState({
    totalSpins: 0,
    graciasCount: 0,
    naturalCount: 0,
    cremosoCount: 0,
    premiumCount: 0,
  });

  const animFrameRef = useRef(null);
  const lastSegmentIndexRef = useRef(-1);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleResetStats = () => {
    if (window.confirm('¿Deseas reiniciar las estadísticas de esta sesión?')) {
      setStats({
        totalSpins: 0,
        graciasCount: 0,
        naturalCount: 0,
        cremosoCount: 0,
        premiumCount: 0,
      });
      setWinningSegment(null);
      setWinningPrize(null);
    }
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsModalOpen(false);
    setWinningSegment(null);
    setWinningPrize(null);

    // 1. Pick target prize based on real probabilities (72/20/6/2)
    const { chosenSegment, chosenPrize } = getRandomSpinTarget();

    // 2. Compute exact landing rotation angle
    const startRotation = rotation;
    const fullSpins = 5 + Math.floor(Math.random() * 3); // 5, 6, or 7 full spins
    const segmentAngle = 7.2;

    // Center angle of chosen segment is chosenSegment.index * 7.2
    // To position this segment under 12 o'clock pointer (0°):
    const targetWheelAngle = 360 - chosenSegment.index * segmentAngle;
    
    // Slight random offset inside segment [-2.2°, +2.2°] to feel natural
    const randomOffset = (Math.random() - 0.5) * 4.4;

    const currentNormalized = startRotation % 360;
    let delta = (targetWheelAngle - currentNormalized + 360) % 360;
    delta += randomOffset;
    if (delta < 180) delta += 360;

    const totalRotationDelta = fullSpins * 360 + delta;
    const finalRotation = startRotation + totalRotationDelta;

    const spinDuration = 5500; // 5.5 seconds animation
    const startTime = performance.now();

    lastSegmentIndexRef.current = -1;

    // Animation Loop with power-4 easing & audio tick
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Ease Out Quartic: 1 - (1 - t)^4
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentRot = startRotation + easeProgress * totalRotationDelta;

      setRotation(currentRot);

      // Determine which segment is currently passing under top pointer
      const currentNormalizedRot = (currentRot % 360 + 360) % 360;
      const currentSegmentIdx = Math.floor(((360 - currentNormalizedRot + 3.6) % 360) / 7.2);

      if (currentSegmentIdx !== lastSegmentIndexRef.current) {
        lastSegmentIndexRef.current = currentSegmentIdx;
        soundManager.playTick();
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Spin Completed!
        setRotation(finalRotation);
        setIsSpinning(false);
        setWinningSegment(chosenSegment);
        setWinningPrize(chosenPrize);

        // Update Stats
        setStats((prev) => ({
          ...prev,
          totalSpins: prev.totalSpins + 1,
          graciasCount: prev.graciasCount + (chosenPrize.id === 'gracias' ? 1 : 0),
          naturalCount: prev.naturalCount + (chosenPrize.id === 'natural' ? 1 : 0),
          cremosoCount: prev.cremosoCount + (chosenPrize.id === 'cremoso' ? 1 : 0),
          premiumCount: prev.premiumCount + (chosenPrize.id === 'premium' ? 1 : 0),
        }));

        // Audio Feedback
        if (chosenPrize.isWin) {
          soundManager.playWinFanfare();
        } else {
          soundManager.playNeutralChime();
        }

        // Open Result Modal after tiny delay
        setTimeout(() => {
          setIsModalOpen(true);
        }, 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen pb-16 flex flex-col justify-between">
      <div>
        <Header
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          stats={stats}
          onResetStats={handleResetStats}
        />

        <main className="container mx-auto px-4 flex flex-col items-center">
          {/* Main Wheel View */}
          <Wheel
            rotation={rotation}
            isSpinning={isSpinning}
            onSpinStart={spinWheel}
            disabled={isSpinning}
            winningSegment={winningSegment}
          />

          {/* Session Win Counts Bar */}
          <StatsBar stats={stats} />

          {/* Probability Breakdown Section */}
          <PrizeList />
        </main>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={isModalOpen}
        prize={winningPrize}
        segment={winningSegment}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer Branding */}
      <footer className="mt-12 text-center text-xs text-[#FAF8E5]/50 font-lato">
        <p>© Manielados — Heladería Artesanal Dominicana. Todos los derechos reservados.</p>
        <p className="mt-1 opacity-75">San José de Ocoa.</p>
      </footer>
    </div>
  );
}

export default RuletaManielados;
