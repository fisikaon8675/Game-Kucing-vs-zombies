import Phaser from 'phaser';
import { LEVEL_CONFIGS } from '../../data/physicsQuestions';
import { LevelData } from '../../types/game';
import { soundManager } from '../audio';

export class StoryScene extends Phaser.Scene {
  private levelData!: LevelData;

  constructor() {
    super({ key: 'StoryScene' });
  }

  init(data: { level: number }) {
    const lvl = data.level || 1;
    this.levelData = LEVEL_CONFIGS.find((l) => l.level === lvl) || LEVEL_CONFIGS[0];
  }

  create() {
    const { width, height } = this.scale;

    // Background Lab Dark
    this.add.rectangle(width / 2, height / 2, width, height, 0x090d16);

    // Grid FX
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x1e293b, 0.3);
    for (let x = 0; x < width; x += 40) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 40) {
      graphics.moveTo(0, y);
      graphics.lineTo(width, y);
    }
    graphics.strokePath();

    // Top Header: Facility Code & Alert
    const alertBox = this.add.rectangle(width / 2, 60, 720, 50, 0x1e1b4b, 0.9);
    alertBox.setStrokeStyle(1.5, 0x818cf8);
    this.add.text(width / 2, 60, `🚨 ANOMALI TERDETEKSI: FASILITAS LEVEL ${this.levelData.level} - ${this.levelData.facilityName.toUpperCase()}`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#f43f5e'
    }).setOrigin(0.5);

    // Comic dialogue frame
    const frame = this.add.rectangle(width / 2, 280, 720, 320, 0x0f172a, 0.95);
    frame.setStrokeStyle(2, 0x38bdf8);

    // Prof. Mpus Avatar
    const catAvatar = this.add.sprite(130, 230, 'cat_mpus').setScale(1.8);
    this.tweens.add({
      targets: catAvatar,
      angle: { from: -3, to: 3 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.add.text(130, 315, 'Prof. Mpus', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#f59e0b'
    }).setOrigin(0.5);

    this.add.text(130, 335, 'Kepala Riset Fisika', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      color: '#94a3b8'
    }).setOrigin(0.5);

    // Story Dialog Bubble
    const bubbleX = 440;
    const bubbleY = 220;
    const bubble = this.add.rectangle(bubbleX, bubbleY, 440, 160, 0x1e293b, 0.9);
    bubble.setStrokeStyle(1.5, 0x60a5fa);

    // Dialogue text
    this.add.text(bubbleX - 200, bubbleY - 60, `"${this.levelData.storyIntro}"`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      color: '#f8fafc',
      wordWrap: { width: 400 },
      lineSpacing: 5
    });

    // Learning target box
    const learnBox = this.add.rectangle(bubbleX, 330, 440, 50, 0x0369a1, 0.3);
    learnBox.setStrokeStyle(1, 0x38bdf8);
    this.add.text(bubbleX, 330, `📚 Modul Pengetahuan: ${this.levelData.topic}`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: '600',
      color: '#7dd3fc'
    }).setOrigin(0.5);

    // Action Buttons: Kembali & Pasang Barikade
    const backBtn = this.add.rectangle(width / 2 - 160, 490, 180, 46, 0x334155, 1);
    backBtn.setStrokeStyle(1.5, 0x64748b);
    backBtn.setInteractive({ useHandCursor: true });
    this.add.text(width / 2 - 160, 490, '⬅ Menu Utama', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#e2e8f0'
    }).setOrigin(0.5);

    backBtn.on('pointerdown', () => {
      soundManager.playReloadClick();
      this.scene.start('MenuScene');
    });

    const startBtn = this.add.rectangle(width / 2 + 160, 490, 240, 46, 0x0284c7, 1);
    startBtn.setStrokeStyle(2, 0x7dd3fc);
    startBtn.setInteractive({ useHandCursor: true });
    const startText = this.add.text(width / 2 + 160, 490, '🚀 LUNCURKAN MERIAM!', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5);

    startBtn.on('pointerover', () => {
      startBtn.setFillStyle(0x0369a1);
      startBtn.setScale(1.03);
      startText.setScale(1.03);
    });

    startBtn.on('pointerout', () => {
      startBtn.setFillStyle(0x0284c7);
      startBtn.setScale(1);
      startText.setScale(1);
    });

    startBtn.on('pointerdown', () => {
      soundManager.playMeow();
      this.scene.start('GameScene', { level: this.levelData.level });
    });
  }
}
