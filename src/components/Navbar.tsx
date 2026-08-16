import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen } from 'lucide-react';
import { soundManager } from '../game/audio';

interface NavbarProps {
  onOpenFormulaGuide: () => void;
  onSelectLevel: (lvl: number) => void;
  currentLevel: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFormulaGuide,
  onSelectLevel,
  currentLevel
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playMeow();
    }
  };

  return (
    <header className="w-full bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => soundManager.playMeow()}
            title="Klik untuk suara Prof. Mpus!"
            className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-2xl shadow-inner hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            🐱
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-wide">
                PROF. MPUS: MEOW-CHANICS DEFENSE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                Fisika SMA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pertahankan Laboratorium dengan Pemahaman Konsep Fisika
            </p>
          </div>
        </div>

        {/* Level Quick Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => onSelectLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentLevel === lvl
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              L{lvl}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Formula Guide */}
          <button
            onClick={onOpenFormulaGuide}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sky-400 hover:text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Buku Rumus</span>
          </button>
        </div>
      </div>
    </header>
  );
};
