import { useEffect, useRef, useState, useCallback } from 'react';
import Phaser from 'phaser';
import { createGameConfig } from './game/config';
import { Navbar } from './components/Navbar';
import { QuizModal } from './components/QuizModal';
import { FormulaGuideModal } from './components/FormulaGuideModal';
import { VictoryGameOverModal } from './components/VictoryGameOverModal';
import { LEVEL_CONFIGS } from './data/physicsQuestions';
import { BookOpen, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

interface GameStatsState {
  ammo: number;
  score: number;
  coreHp: number;
  combo: number;
  zombiesDefeated: number;
  totalZombies: number;
  level: number;
}

export default function App() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [stats, setStats] = useState<GameStatsState>({
    ammo: 8,
    score: 0,
    coreHp: 100,
    combo: 0,
    zombiesDefeated: 0,
    totalZombies: 8,
    level: 1
  });

  // Modal States
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizCallback, setQuizCallback] = useState<((correct: boolean) => void) | null>(null);
  const [isFormulaGuideOpen, setIsFormulaGuideOpen] = useState(false);
  const [resultModal, setResultModal] = useState<{
    isOpen: boolean;
    type: 'victory' | 'gameover';
    score: number;
    level: number;
  }>({
    isOpen: false,
    type: 'victory',
    score: 0,
    level: 1
  });

  // Global window callbacks for Phaser -> React bridge
  useEffect(() => {
    (window as unknown as {
      __triggerQuizModal?: (lvl: number, cb: (correct: boolean) => void) => void;
      __onGameOverModal?: (score: number, lvl: number) => void;
      __onVictoryModal?: (score: number, lvl: number) => void;
      __onStatsUpdate?: (newStats: GameStatsState) => void;
    }).__triggerQuizModal = (lvl: number, cb: (correct: boolean) => void) => {
      setCurrentLevel(lvl);
      setQuizCallback(() => cb);
      setIsQuizOpen(true);
    };

    (window as unknown as {
      __onGameOverModal?: (score: number, lvl: number) => void;
    }).__onGameOverModal = (score: number, lvl: number) => {
      setResultModal({
        isOpen: true,
        type: 'gameover',
        score,
        level: lvl
      });
    };

    (window as unknown as {
      __onVictoryModal?: (score: number, lvl: number) => void;
    }).__onVictoryModal = (score: number, lvl: number) => {
      setResultModal({
        isOpen: true,
        type: 'victory',
        score,
        level: lvl
      });
    };

    (window as unknown as {
      __onStatsUpdate?: (newStats: GameStatsState) => void;
    }).__onStatsUpdate = (newStats: GameStatsState) => {
      setStats(newStats);
      if (newStats.level) setCurrentLevel(newStats.level);
    };

    return () => {
      delete (window as unknown as { __triggerQuizModal?: unknown }).__triggerQuizModal;
      delete (window as unknown as { __onGameOverModal?: unknown }).__onGameOverModal;
      delete (window as unknown as { __onVictoryModal?: unknown }).__onVictoryModal;
      delete (window as unknown as { __onStatsUpdate?: unknown }).__onStatsUpdate;
    };
  }, []);

  // Initialize Phaser 3 Game instance
  useEffect(() => {
    if (!gameRef.current) {
      const config = createGameConfig('game-canvas-wrapper');
      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  const handleAnswerResolved = (isCorrect: boolean) => {
    setIsQuizOpen(false);
    if (quizCallback) {
      quizCallback(isCorrect);
      setQuizCallback(null);
    }
  };

  const startLevel = useCallback((lvl: number) => {
    setCurrentLevel(lvl);
    setResultModal((prev) => ({ ...prev, isOpen: false }));
    if (gameRef.current) {
      gameRef.current.scene.stop('StoryScene');
      gameRef.current.scene.stop('GameScene');
      gameRef.current.scene.start('StoryScene', { level: lvl });
    }
  }, []);

  const restartCurrentLevel = () => {
    setResultModal((prev) => ({ ...prev, isOpen: false }));
    if (gameRef.current) {
      gameRef.current.scene.stop('GameScene');
      gameRef.current.scene.start('GameScene', { level: currentLevel });
    }
  };

  const goToMainMenu = () => {
    setResultModal((prev) => ({ ...prev, isOpen: false }));
    if (gameRef.current) {
      gameRef.current.scene.stop('GameScene');
      gameRef.current.scene.stop('StoryScene');
      gameRef.current.scene.start('MenuScene');
    }
  };

  const activeLevelConfig = LEVEL_CONFIGS.find((l) => l.level === currentLevel) || LEVEL_CONFIGS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentLevel={currentLevel}
        onSelectLevel={startLevel}
        onOpenFormulaGuide={() => setIsFormulaGuideOpen(true)}
      />

      {/* Main Game Stage Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 flex flex-col items-center justify-center space-y-4">
        {/* Active Facility Banner */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white shadow"
              style={{ backgroundColor: activeLevelConfig.colorTheme }}
            >
              L{currentLevel}
            </div>
            <div>
              <div className="text-xs font-bold text-sky-400">
                FASILITAS {currentLevel}: {activeLevelConfig.facilityName.toUpperCase()}
              </div>
              <div className="text-xs text-slate-300">
                Materi: <span className="text-slate-100 font-semibold">{activeLevelConfig.topic}</span>
              </div>
            </div>
          </div>

          {/* Quick HUD status indicators */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
              🧶 Peluru: {stats.ammo}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Core: {stats.coreHp}%
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-sky-300 font-bold">
              ⭐ Skor: {stats.score}
            </span>
          </div>
        </div>

        {/* Phaser 3 Canvas Frame */}
        <div className="relative w-full max-w-[800px] aspect-[4/3] bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-sky-600/70">
          <div
            id="game-canvas-wrapper"
            className="w-full h-full flex items-center justify-center"
          />
        </div>

        {/* Control Hints Bar for Players & Students */}
        <div className="w-full max-w-[800px] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-400">
          <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-800 text-sky-400 flex items-center justify-center font-bold font-mono">
              🖱️
            </span>
            <span>Klik jalur 1-4 untuk mengarahkan & menembak</span>
          </div>
          <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-900/50 text-amber-300 flex items-center justify-center font-bold font-mono">
              [R]
            </span>
            <span>Tekan tombol <strong>RELOAD</strong> untuk jawab Kuis Fisika (+5 Peluru)</span>
          </div>
          <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-emerald-900/50 text-emerald-300 flex items-center justify-center font-bold font-mono">
              ⚡
            </span>
            <span>Jawaban benar memberi peluru; salah membuat zombi maju</span>
          </div>
        </div>

        {/* Learning & Story Synopsis Card */}
        <div className="w-full max-w-[800px] bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-400" /> Storyline Prof. Mpus: Meow-chanics Defense
            </span>
            <button
              onClick={() => setIsFormulaGuideOpen(true)}
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5" /> Buka Rumus Lengkap
            </button>
          </div>
          <p className="leading-relaxed">
            Prof. Mpus mempertahankan generator inti laboratorium dari serbuan Pasukan Zombi Hampa. Senjata meriam Foton membutuhkan daya kecerdasan. Jawab soal Fisika SMA di setiap reload untuk mengisi amunisi dan raih skor tertinggi di 5 fasilitas laboratorium!
          </p>
        </div>
      </main>

      {/* Physics Quiz Popup Modal (HTML DOM overlay with safe Pause/Resume) */}
      <QuizModal
        isOpen={isQuizOpen}
        level={currentLevel}
        onAnswerResolved={handleAnswerResolved}
      />

      {/* High School Physics Formula Sheet Guide */}
      <FormulaGuideModal
        isOpen={isFormulaGuideOpen}
        onClose={() => setIsFormulaGuideOpen(false)}
      />

      {/* Victory & Game Over Result Dialogs */}
      <VictoryGameOverModal
        isOpen={resultModal.isOpen}
        type={resultModal.type}
        score={resultModal.score}
        level={resultModal.level}
        onRestart={restartCurrentLevel}
        onNextLevel={() => startLevel(Math.min(5, resultModal.level + 1))}
        onGoHome={goToMainMenu}
      />
    </div>
  );
}
