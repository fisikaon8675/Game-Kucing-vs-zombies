import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, ArrowRight, Home, Zap } from 'lucide-react';
import { LEVEL_CONFIGS } from '../data/physicsQuestions';

interface VictoryGameOverModalProps {
  type: 'victory' | 'gameover';
  isOpen: boolean;
  score: number;
  level: number;
  onRestart: () => void;
  onNextLevel: () => void;
  onGoHome: () => void;
}

export const VictoryGameOverModal: React.FC<VictoryGameOverModalProps> = ({
  type,
  isOpen,
  score,
  level,
  onRestart,
  onNextLevel,
  onGoHome
}) => {
  const currentLvlConfig = LEVEL_CONFIGS.find((l) => l.level === level) || LEVEL_CONFIGS[0];
  const hasNextLevel = level < 5;

  useEffect(() => {
    if (isOpen && type === 'victory') {
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const isVictory = type === 'victory';

  return (
    <div
      id="game-result-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-slate-900 border-2 rounded-2xl shadow-2xl overflow-hidden text-center p-6 space-y-5 border-slate-700">
        {/* Animated Icon Avatar */}
        <div className="flex justify-center">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl border-2 ${
              isVictory
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-4 ring-amber-500/20'
                : 'bg-rose-500/20 border-rose-500 text-rose-400 ring-4 ring-rose-500/20'
            }`}
          >
            {isVictory ? '🏆' : '🧟'}
          </div>
        </div>

        {/* Title */}
        <div>
          <h2
            className={`text-2xl font-black tracking-tight ${
              isVictory ? 'text-amber-300' : 'text-rose-400'
            }`}
          >
            {isVictory ? 'FASILITAS BERHASIL DIPERTAHANKAN!' : 'GENERATOR INTI JEBOL!'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isVictory
              ? `Prof. Mpus berhasil mengamankan ${currentLvlConfig.facilityName}!`
              : 'Zombi Hampa berhasil menyerap daya generator. Ayo coba lagi!'}
          </p>
        </div>

        {/* Score & Facility Card */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Fasilitas:</span>
            <span className="text-sky-300 font-semibold">{currentLvlConfig.facilityName}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Topik Materi:</span>
            <span className="text-slate-200 font-semibold">{currentLvlConfig.topic}</span>
          </div>
          <div className="border-t border-slate-800 pt-2 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> Total Skor:
            </span>
            <span className="text-lg font-black text-amber-400 font-mono">{score} Pts</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {isVictory && hasNextLevel ? (
            <button
              onClick={onNextLevel}
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-900/40 transition active:scale-95 cursor-pointer"
            >
              <span>Lanjut ke Level {level + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : isVictory && !hasNextLevel ? (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/60 rounded-xl text-xs text-emerald-200 font-semibold flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> Selamat! Seluruh Fasilitas Lab Berhasil Diselamatkan!
            </div>
          ) : null}

          <div className="flex gap-2">
            <button
              onClick={onRestart}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
            <button
              onClick={onGoHome}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Menu Utama</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
