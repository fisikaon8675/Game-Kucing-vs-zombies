import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Globe, Sparkles } from 'lucide-react';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneExportModal: React.FC<StandaloneExportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);

  if (!isOpen) return null;

  // 1-File Standalone HTML for Blogger and GitHub Pages
  const standaloneHTMLCode = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prof. Mpus: Meow-chanics Defense</title>
  <!-- Phaser 3 CDN -->
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #090d16;
      color: #e2e8f0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow-x: hidden;
      padding: 10px;
    }
    #game-wrapper {
      position: relative;
      width: 100%;
      max-width: 800px;
      aspect-ratio: 4 / 3;
      background: #000;
      border: 2px solid #0284c7;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(2, 132, 199, 0.25);
    }
    #game-container {
      width: 100%;
      height: 100%;
    }
    /* Modal Kuis Fisika (HTML DOM Overlay) */
    #quiz-overlay {
      display: none;
      position: absolute;
      inset: 0;
      background: rgba(9, 13, 22, 0.88);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .quiz-card {
      background: #0f172a;
      border: 2px solid #38bdf8;
      border-radius: 16px;
      width: 100%;
      max-width: 580px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      color: #fff;
    }
    .quiz-badge {
      display: inline-block;
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      font-size: 11px;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .quiz-question {
      font-size: 15px;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 16px;
      background: #1e293b;
      padding: 12px;
      border-radius: 8px;
    }
    .quiz-option-btn {
      width: 100%;
      text-align: left;
      background: #1e293b;
      color: #e2e8f0;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 8px;
      font-size: 13px;
      cursor: pointer;
      transition: 0.15s;
    }
    .quiz-option-btn:hover {
      background: #334155;
      border-color: #38bdf8;
    }
    .quiz-feedback {
      margin-top: 12px;
      padding: 10px;
      border-radius: 8px;
      font-size: 12px;
      display: none;
    }
  </style>
</head>
<body>

  <div id="game-wrapper">
    <div id="game-container"></div>

    <!-- DOM Kuis Overlay -->
    <div id="quiz-overlay">
      <div class="quiz-card">
        <span id="quiz-badge" class="quiz-badge">KUIS FISIKA SMA</span>
        <div id="quiz-question" class="quiz-question">Pertanyaan Fisika...</div>
        <div id="quiz-options"></div>
        <div id="quiz-feedback" class="quiz-feedback"></div>
        <button id="quiz-continue-btn" style="display:none; width:100%; margin-top:12px; padding:10px; background:#0284c7; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">
          Lanjutkan Pertahanan 🚀
        </button>
      </div>
    </div>
  </div>

  <script>
    /* ==========================================================================
       1. DATABASE PERTANYAAN FISIKA SMA (5 LEVEL / ARENA)
       Anda dapat menambah/mengedit pertanyaan di array berikut!
       ========================================================================== */
    const PHYSICS_QUESTIONS = [
      // Level 1: Ruang Pengukuran
      {
        level: 1,
        topic: "Besaran Pokok & Satuan SI",
        question: "Di antara kelompok besaran berikut, manakah yang seluruhnya merupakan BESARAN POKOK SI?",
        options: [
          { key: "A", text: "Panjang, Massa, Kecepatan, dan Waktu" },
          { key: "B", text: "Panjang, Massa, Waktu, Suhu, dan Kuat Arus" },
          { key: "C", text: "Massa, Berat, Gaya, dan Percepatan" },
          { key: "D", text: "Kuat Arus, Tegangan, Daya, dan Hambatan" }
        ],
        correct: "B",
        explanation: "7 Besaran Pokok SI disingkat JiWa SMeP-K (Jumlah zat, Waktu, Suhu, Massa, Intensitas, Panjang, Kuat arus)."
      },
      {
        level: 1,
        topic: "Analisis Dimensi Gaya",
        question: "Gaya didefinisikan sebagai F = m x a. Apakah dimensi dari besaran GAYA tersebut?",
        options: [
          { key: "A", text: "[M] [L] [T]⁻¹" },
          { key: "B", text: "[M] [L] [T]⁻²" },
          { key: "C", text: "[M] [L]² [T]⁻²" },
          { key: "D", text: "[M] [L]⁻¹ [T]⁻²" }
        ],
        correct: "B",
        explanation: "F = m.a -> kg . m/s^2 -> Dimensi: [M][L][T]^-2."
      },
      // Level 2: Lorong Resonansi
      {
        level: 2,
        topic: "Frekuensi & Cepat Rambat",
        question: "Sebuah gelombang memiliki panjang gelombang 4 meter dan cepat rambat 20 m/s. Berapakah frekuensinya?",
        options: [
          { key: "A", text: "80 Hz" },
          { key: "B", text: "5 Hz" },
          { key: "C", text: "0,2 Hz" },
          { key: "D", text: "16 Hz" }
        ],
        correct: "B",
        explanation: "Rumus: v = lambda . f -> f = v / lambda = 20 / 4 = 5 Hz."
      },
      // Level 3: Gudang Gaya
      {
        level: 3,
        topic: "Hukum II Newton",
        question: "Balok bermassa 4 kg ditarik gaya F = 20 N pada lantai licin. Berapakah percepatannya?",
        options: [
          { key: "A", text: "80 m/s²" },
          { key: "B", text: "5 m/s²" },
          { key: "C", text: "16 m/s²" },
          { key: "D", text: "0,2 m/s²" }
        ],
        correct: "B",
        explanation: "a = F / m = 20 N / 4 kg = 5 m/s²."
      },
      // Level 4: Reaktor Energi
      {
        level: 4,
        topic: "Energi Kinetik",
        question: "Sebuah proyektil bermassa 0,2 kg melesat dengan kelajuan 50 m/s. Berapakah Energi Kinetiknya?",
        options: [
          { key: "A", text: "250 Joule" },
          { key: "B", text: "500 Joule" },
          { key: "C", text: "50 Joule" },
          { key: "D", text: "125 Joule" }
        ],
        correct: "A",
        explanation: "Ek = 1/2 . m . v^2 = 0.5 * 0.2 * 2500 = 250 Joule."
      },
      // Level 5: Pusat Generator
      {
        level: 5,
        topic: "Hukum Ohm",
        question: "Resistor R = 12 Ohm dihubungkan dengan sumber tegangan V = 24 Volt. Berapakah kuat arus listrik yang mengalir?",
        options: [
          { key: "A", text: "2 Ampere" },
          { key: "B", text: "288 Ampere" },
          { key: "C", text: "0,5 Ampere" },
          { key: "D", text: "12 Ampere" }
        ],
        correct: "A",
        explanation: "I = V / R = 24 V / 12 Ohm = 2 Ampere."
      }
    ];

    /* ==========================================================================
       2. PHASER 3 GAME SCENE
       ========================================================================== */
    class GameScene extends Phaser.Scene {
      constructor() { super('GameScene'); }

      create() {
        this.laneY = [160, 260, 360, 460];
        this.ammo = 8;
        this.score = 0;
        this.coreHp = 100;
        this.level = 1;
        this.zombies = [];
        this.bullets = [];
        this.isPaused = false;
        this.zombiesDefeated = 0;
        this.totalWave = 8;

        // Background
        this.add.rectangle(400, 300, 800, 600, 0x090d16);

        // Render 4 Lanes
        this.laneY.forEach((y, i) => {
          const laneBg = this.add.rectangle(400, y, 780, 84, i % 2 === 0 ? 0x0f172a : 0x131f37);
          laneBg.setStrokeStyle(1, 0x334155);
          laneBg.setInteractive({ useHandCursor: true });
          laneBg.on('pointerdown', () => this.shootInLane(i));
          this.add.text(25, y, \`L\${i+1}\`, { fontSize: '12px', color: '#64748b' }).setOrigin(0.5);
        });

        // Prof Mpus (Cat)
        this.cat = this.add.text(70, this.laneY[1], '🐱', { fontSize: '38px' }).setOrigin(0.5);

        // UI Texts
        this.ammoText = this.add.text(20, 25, '🧶 Peluru: ' + this.ammo, { fontSize: '16px', color: '#facc15', fontStyle: 'bold' });
        this.scoreText = this.add.text(320, 25, '⭐ Skor: 0', { fontSize: '16px', color: '#fff', fontStyle: 'bold' });
        this.coreText = this.add.text(580, 25, '🛡️ Core: 100%', { fontSize: '16px', color: '#22c55e', fontStyle: 'bold' });

        // Reload Button
        const reloadBtn = this.add.rectangle(400, 560, 260, 42, 0xd97706).setInteractive({ useHandCursor: true });
        reloadBtn.setStrokeStyle(2, 0xfde047);
        this.add.text(400, 560, '📚 RELOAD (KUIS FISIKA)', { fontSize: '13px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
        reloadBtn.on('pointerdown', () => this.triggerQuiz());

        // Keyboard R to reload
        this.input.keyboard.on('keydown-R', () => this.triggerQuiz());

        // Zombie Spawner Timer (ATUR KECEPATAN SPAWN DI SINI)
        this.time.addEvent({
          delay: 3500,
          callback: () => this.spawnZombie(),
          loop: true
        });
      }

      shootInLane(laneIndex) {
        if (this.isPaused) return;
        if (this.ammo <= 0) {
          alert('Peluru habis! Tekan tombol RELOAD untuk menjawab kuis fisika.');
          return;
        }

        this.cat.y = this.laneY[laneIndex];
        this.ammo--;
        this.ammoText.setText('🧶 Peluru: ' + this.ammo);

        // Peluru Benang Foton
        const bullet = this.add.text(100, this.laneY[laneIndex], '🧶', { fontSize: '20px' }).setOrigin(0.5);
        this.bullets.push({ sprite: bullet, lane: laneIndex, speed: 450 });
      }

      spawnZombie() {
        if (this.isPaused) return;
        const laneIndex = Phaser.Math.Between(0, 3);
        const z = this.add.text(780, this.laneY[laneIndex], '🧟', { fontSize: '32px' }).setOrigin(0.5);
        this.zombies.push({
          sprite: z,
          lane: laneIndex,
          hp: 40,
          speed: 24 // ATUR KECEPATAN ZOMBI DI SINI
        });
      }

      triggerQuiz() {
        this.isPaused = true;
        showQuizOverlay(this.level, (isCorrect) => {
          this.isPaused = false;
          if (isCorrect) {
            this.ammo += 5;
            this.ammoText.setText('🧶 Peluru: ' + this.ammo);
            this.score += 150;
            this.scoreText.setText('⭐ Skor: ' + this.score);
          } else {
            // Penalti: Zombi maju!
            this.zombies.forEach(z => z.sprite.x -= 40);
          }
        });
      }

      update(time, delta) {
        if (this.isPaused) return;
        const dt = delta / 1000;

        // Move Bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
          const b = this.bullets[i];
          b.sprite.x += b.speed * dt;

          // Check hit
          for (let j = this.zombies.length - 1; j >= 0; j--) {
            const z = this.zombies[j];
            if (z.lane === b.lane && Math.abs(z.sprite.x - b.sprite.x) < 25) {
              z.hp -= 25;
              b.sprite.destroy();
              this.bullets.splice(i, 1);
              if (z.hp <= 0) {
                z.sprite.destroy();
                this.zombies.splice(j, 1);
                this.score += 60;
                this.scoreText.setText('⭐ Skor: ' + this.score);
              }
              break;
            }
          }

          if (b.sprite.x > 820) {
            b.sprite.destroy();
            this.bullets.splice(i, 1);
          }
        }

        // Move Zombies
        for (let i = this.zombies.length - 1; i >= 0; i--) {
          const z = this.zombies[i];
          z.sprite.x -= z.speed * dt;

          if (z.sprite.x <= 110) {
            z.sprite.destroy();
            this.zombies.splice(i, 1);
            this.coreHp -= 25;
            this.coreText.setText('🛡️ Core: ' + this.coreHp + '%');
            if (this.coreHp <= 0) {
              alert('Game Over! Zombi Hampa menembus generator.');
              this.scene.restart();
            }
          }
        }
      }
    }

    // Phaser Config
    const config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: 800,
      height: 600,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [GameScene]
    };
    const game = new Phaser.Game(config);

    /* ==========================================================================
       3. FUNGSI POPUP KUIS FISIKA
       ========================================================================== */
    let currentQuizCallback = null;

    function showQuizOverlay(level, callback) {
      currentQuizCallback = callback;
      const overlay = document.getElementById('quiz-overlay');
      const questionEl = document.getElementById('quiz-question');
      const optionsEl = document.getElementById('quiz-options');
      const feedbackEl = document.getElementById('quiz-feedback');
      const continueBtn = document.getElementById('quiz-continue-btn');

      const questions = PHYSICS_QUESTIONS.filter(q => q.level === level) || [PHYSICS_QUESTIONS[0]];
      const q = questions[Math.floor(Math.random() * questions.length)];

      questionEl.innerText = q.question;
      optionsEl.innerHTML = '';
      feedbackEl.style.display = 'none';
      continueBtn.style.display = 'none';

      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerText = opt.key + '. ' + opt.text;
        btn.onclick = () => {
          const isCorrect = opt.key === q.correct;
          feedbackEl.style.display = 'block';
          feedbackEl.style.background = isCorrect ? '#065f46' : '#881337';
          feedbackEl.innerHTML = (isCorrect ? '✅ <b>Benar! +5 Peluru Foton Terisi!</b><br>' : '❌ <b>Salah! Zombi merangsek maju.</b><br>') + q.explanation;
          
          Array.from(optionsEl.children).forEach(b => b.disabled = true);
          continueBtn.style.display = 'block';
          continueBtn.onclick = () => {
            overlay.style.display = 'none';
            if (currentQuizCallback) currentQuizCallback(isCorrect);
          };
        };
        optionsEl.appendChild(btn);
      });

      overlay.style.display = 'flex';
    }
  </script>
</body>
</html>`;

  const bloggerIframeCode = `<!-- Kode Embed Prof. Mpus untuk Blogger (HTML / JavaScript Gadget) -->
<div style="position:relative; width:100%; max-width:800px; aspect-ratio:4/3; margin:0 auto; overflow:hidden; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.3);">
  <iframe 
    src="https://your-github-username.github.io/prof-mpus-defense/" 
    style="width:100%; height:100%; border:none;" 
    allow="autoplay"
    title="Prof. Mpus: Meow-chanics Defense">
  </iframe>
</div>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(standaloneHTMLCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(bloggerIframeCode);
    setCopiedIframe(true);
    setTimeout(() => setCopiedIframe(false), 2500);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([standaloneHTMLCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="standalone-export-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Export Kode 1-File HTML (Blogger & GitHub Pages)
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-sky-300">
                Sesuai permintaan: File HTML tunggal dengan CSS, JS, dan CDN Phaser 3 siap pakai.
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-200">
          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-900/50 space-y-2">
              <div className="font-bold text-sky-400 flex items-center gap-2">
                <Download className="w-4 h-4" /> Download 1-File index.html
              </div>
              <p className="text-xs text-slate-400">
                Unduh file HTML tunggal untuk langsung di-upload ke GitHub Pages atau dibuka offline di browser.
              </p>
              <button
                onClick={handleDownloadFile}
                className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download index.html
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/50 space-y-2">
              <div className="font-bold text-indigo-400 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Embed Kode Blogger (iFrame)
              </div>
              <p className="text-xs text-slate-400">
                Salin kode iFrame responsif untuk dipasang pada gadget HTML/JavaScript Blogger.
              </p>
              <button
                onClick={handleCopyIframe}
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                {copiedIframe ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIframe ? 'Tersalin ke Clipboard!' : 'Salin Kode Embed Blogger'}
              </button>
            </div>
          </div>

          {/* Guide for Customization */}
          <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs space-y-2 text-amber-200/90">
            <div className="font-bold text-amber-300 text-sm">
              📝 Panduan Kustomisasi Kode untuk Guru / Pengembang:
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Mengubah / Menambah Pertanyaan Kuis:</strong> Cari array <code>PHYSICS_QUESTIONS</code> di bagian atas script.</li>
              <li><strong>Mengatur Kecepatan Zombi:</strong> Ubah properti <code>speed: 24</code> pada objek zombi di method <code>spawnZombie()</code>.</li>
              <li><strong>Mengatur Interval Muncul Zombi:</strong> Ubah <code>delay: 3500</code> di timer spawner.</li>
              <li><strong>Mengatur Jumlah Peluru Saat Kuis Benar:</strong> Ubah <code>this.ammo += 5;</code> pada method <code>triggerQuiz()</code>.</li>
            </ul>
          </div>

          {/* Code Viewer Preview */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-slate-400">Preview 1-File HTML Source Code:</span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg font-semibold flex items-center gap-1 transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? 'Tersalin!' : 'Salin Seluruh Kode HTML'}
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
              <code>{standaloneHTMLCode}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
