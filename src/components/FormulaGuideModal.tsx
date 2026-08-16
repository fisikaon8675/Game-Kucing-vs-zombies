import React, { useState } from 'react';
import { X, BookOpen, Atom, Zap, Activity, Waves, Gauge } from 'lucide-react';
import { LEVEL_CONFIGS } from '../data/physicsQuestions';

interface FormulaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaGuideModal: React.FC<FormulaGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div
      id="formula-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Buku Saku Rumus Fisika SMA • Prof. Mpus
              </h2>
              <p className="text-xs text-sky-400">
                Panduan konsep & rumus lengkap untuk mempertahankan 5 fasilitas lab
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/70 overflow-x-auto px-4 pt-2 gap-2">
          {LEVEL_CONFIGS.map((lvl) => (
            <button
              key={lvl.level}
              onClick={() => setActiveTab(lvl.level)}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border-t border-x ${
                activeTab === lvl.level
                  ? 'bg-slate-900 text-sky-400 border-slate-700'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              {lvl.level === 1 && <Gauge className="w-3.5 h-3.5" />}
              {lvl.level === 2 && <Waves className="w-3.5 h-3.5" />}
              {lvl.level === 3 && <Activity className="w-3.5 h-3.5" />}
              {lvl.level === 4 && <Atom className="w-3.5 h-3.5" />}
              {lvl.level === 5 && <Zap className="w-3.5 h-3.5" />}
              <span>Level {lvl.level}: {lvl.facilityName}</span>
            </button>
          ))}
        </div>

        {/* Formula Sheet Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-200">
          {activeTab === 1 && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-sky-900/50">
                <h3 className="font-bold text-sky-300 text-base mb-2 flex items-center gap-2">
                  <Gauge className="w-4 h-4" /> 1. Besaran Pokok & Satuan SI
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Terdapat 7 Besaran Pokok dalam Satuan Internasional (SI) dengan rumus jembatan keledai <strong>"JiWa SMeP-K"</strong>:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-sky-400">Panjang:</span> meter (m) [L]
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-sky-400">Massa:</span> kilogram (kg) [M]
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-sky-400">Waktu:</span> sekon (s) [T]
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-sky-400">Suhu:</span> Kelvin (K) [θ]
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-sky-400">Kuat Arus:</span> Ampere (A) [I]
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-sky-400">Intensitas:</span> Candela (cd) [J]
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-sky-900/50 space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">Analisis Dimensi Populer:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-300 font-mono">
                  <li>Kecepatan (v = s/t) ➔ [L] [T]⁻¹</li>
                  <li>Percepatan (a = v/t) ➔ [L] [T]⁻²</li>
                  <li>Gaya (F = m · a) ➔ [M] [L] [T]⁻²</li>
                  <li>Usaha & Energi (W = F · s) ➔ [M] [L]² [T]⁻²</li>
                  <li>Daya (P = W/t) ➔ [M] [L]² [T]⁻³</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-violet-900/50">
                <h3 className="font-bold text-violet-300 text-base mb-2 flex items-center gap-2">
                  <Waves className="w-4 h-4" /> 2. Gelombang Mekanik & Bunyi
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <div className="text-violet-400 font-bold text-sm">v = λ · f  atau  v = λ / T</div>
                    <p className="text-slate-400 mt-1">
                      v = cepat rambat gelombang (m/s), λ = panjang gelombang (m), f = frekuensi (Hz), T = periode (s)
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <div className="text-amber-400 font-bold text-sm">Efek Doppler: fp = [(v ± vp) / (v ∓ vs)] · fs</div>
                    <p className="text-slate-400 mt-1">
                      vp (+) saat pendengar mendekati sumber; vs (-) saat sumber mendekati pendengar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-orange-900/50">
                <h3 className="font-bold text-orange-300 text-base mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> 3. Hukum Newton & Gerak Lurus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <span className="font-bold text-orange-400">Hukum II Newton:</span>
                    <div className="text-base text-white mt-1">ΣF = m · a</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <span className="font-bold text-orange-400">Gaya Gesek Kinetis:</span>
                    <div className="text-base text-white mt-1">fk = μk · N</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono col-span-2">
                    <span className="font-bold text-amber-400">Persamaan GLBB:</span>
                    <div className="grid grid-cols-3 gap-2 mt-1 text-slate-200">
                      <div>vt = v0 + a · t</div>
                      <div>s = v0 · t + 1/2 a · t²</div>
                      <div>vt² = v0² + 2 a · s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/50">
                <h3 className="font-bold text-emerald-300 text-base mb-2 flex items-center gap-2">
                  <Atom className="w-4 h-4" /> 4. Usaha & Energi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <span className="font-bold text-emerald-400">Energi Kinetik:</span>
                    <div className="text-base text-white mt-1">Ek = 1/2 · m · v²</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <span className="font-bold text-emerald-400">Energi Potensial:</span>
                    <div className="text-base text-white mt-1">Ep = m · g · h</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono col-span-2">
                    <span className="font-bold text-emerald-400">Kekekalan Energi Mekanik (EM):</span>
                    <div className="text-sm text-slate-200 mt-1">Ep₁ + Ek₁ = Ep₂ + Ek₂</div>
                    <div className="text-xs text-slate-400 mt-1">Kecepatan jatuh bebas dari diam: v = √(2 · g · h)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 5 && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/50">
                <h3 className="font-bold text-rose-300 text-base mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 5. Listrik Dinamis & Hukum Ohm
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <span className="font-bold text-rose-400">Hukum Ohm:</span>
                    <div className="text-base text-white mt-1">V = I · R</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                    <span className="font-bold text-rose-400">Hambatan Kawat:</span>
                    <div className="text-base text-white mt-1">R = ρ · (L / A)</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono col-span-2">
                    <span className="font-bold text-rose-400">Hambatan Pengganti:</span>
                    <div className="grid grid-cols-2 gap-2 mt-1 text-slate-200">
                      <div>Seri: Rs = R₁ + R₂ + R₃</div>
                      <div>Paralel: 1/Rp = 1/R₁ + 1/R₂</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
          >
            Tutup Buku Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
