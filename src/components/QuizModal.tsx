import React, { useState, useEffect } from 'react';
import { PhysicsQuestion } from '../types/game';
import { getRandomQuestionForLevel } from '../data/physicsQuestions';
import { BookOpen, CheckCircle2, XCircle, Zap, Clock, HelpCircle, ArrowRight } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  level: number;
  onAnswerResolved: (isCorrect: boolean) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  level,
  onAnswerResolved
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<PhysicsQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFormulaHint, setShowFormulaHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);

  // Generate question whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const q = getRandomQuestionForLevel(level);
      setCurrentQuestion(q);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowFormulaHint(false);
      setTimeLeft(25);
    }
  }, [isOpen, level]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isAnswered || !currentQuestion) return;

    if (timeLeft <= 0) {
      // Time is up -> treat as wrong answer
      handleSelectOption('A', true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isAnswered, timeLeft, currentQuestion]);

  if (!isOpen || !currentQuestion) return null;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D', isTimeout = false) => {
    if (isAnswered) return;

    setSelectedOption(isTimeout ? null : key);
    setIsAnswered(true);
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleContinue = () => {
    onAnswerResolved(isCorrect);
  };

  return (
    <div
      id="quiz-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="quiz-modal-card"
        className="w-full max-w-2xl bg-slate-900 border-2 border-sky-500/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 px-6 py-4 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-xl shadow-inner">
              🐱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/30 text-sky-300 border border-sky-500/50">
                  LEVEL {level} • {currentQuestion.facilityName}
                </span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> +5 Peluru Foton
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-wide mt-0.5">
                Pengisian Energi Intelektual (Kuis Fisika)
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          {!isAnswered && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                timeLeft <= 7
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>

        {/* Question Topic & Prompt Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1 text-sky-400 font-medium">
              <BookOpen className="w-3.5 h-3.5" /> Topik: {currentQuestion.topic}
            </span>
            <button
              onClick={() => setShowFormulaHint(!showFormulaHint)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-2 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {showFormulaHint ? 'Sembunyikan Petunjuk' : 'Bantuan Rumus Fisika'}
            </button>
          </div>

          {/* Formula Hint Box */}
          {showFormulaHint && currentQuestion.formulaHint && (
            <div className="bg-amber-950/40 border border-amber-500/50 rounded-xl p-3.5 text-xs text-amber-200/90 animate-in slide-in-from-top-2 duration-150">
              <div className="font-bold text-amber-300 mb-1 flex items-center gap-1">
                💡 Petunjuk Rumus Fisika:
              </div>
              <p className="font-mono">{currentQuestion.formulaHint}</p>
            </div>
          )}

          {/* Question Text */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <p className="text-slate-100 font-medium text-base leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.key;
              const isTargetCorrect = option.key === currentQuestion.correctAnswer;

              let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';
              let badgeStyle = 'bg-slate-700 text-slate-300 border-slate-600';

              if (isAnswered) {
                if (isTargetCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500';
                  badgeStyle = 'bg-emerald-600 text-white border-emerald-400';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-1 ring-rose-500';
                  badgeStyle = 'bg-rose-600 text-white border-rose-400';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={option.key}
                  id={`quiz-option-${option.key}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option.key)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 ${btnStyle} ${
                    !isAnswered ? 'active:scale-[0.99] cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${badgeStyle}`}
                  >
                    {option.key}
                  </span>
                  <span className="text-sm font-medium leading-normal flex-1">
                    {option.text}
                  </span>
                  {isAnswered && isTargetCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 self-center" />
                  )}
                  {isAnswered && isSelected && !isTargetCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 self-center" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box After Answering */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl border animate-in slide-in-from-bottom-2 duration-200 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                  : 'bg-rose-950/40 border-rose-500/60 text-rose-100'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">
                      Benar Sekali! +5 Peluru Foton Terisi!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-300">
                      Kurang Tepat! Zombi Merangsek Maju Sebagai Penalti.
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed text-slate-300 mt-2 pl-7">
                <span className="font-semibold text-sky-300">Penjelasan Guru Fisika:</span>{' '}
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer Action Button */}
        {isAnswered && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
            <button
              id="quiz-continue-btn"
              onClick={handleContinue}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer ${
                isCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40'
              }`}
            >
              <span>{isCorrect ? 'Lanjutkan Bertahan (+5 Peluru)' : 'Lanjutkan Pertahanan (Awas Zombi!)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
