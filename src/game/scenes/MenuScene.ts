import Phaser from 'phaser';
import { LEVEL_CONFIGS } from '../../data/physicsQuestions';
import { soundManager } from '../audio';

export class MenuScene extends Phaser.Scene {
  private selectedLevel: number = 1;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Background Grid
    this.createLabBackground(width, height);

    // Glowing Header Container
    const titleY = 80;
    const catSprite = this.add.sprite(width / 2 - 140, titleY, 'cat_mpus').setScale(1.3);
    this.tweens.add({
      targets: catSprite,
      y: titleY - 6,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const titleText = this.add.text(width / 2 + 20, titleY - 14, 'PROF. MPUS', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '34px',
      fontStyle: 'bold',
      color: '#38bdf8',
      stroke: '#0369a1',
      strokeThickness: 4
    }).setOrigin(0.5);

    const subTitleText = this.add.text(width / 2 + 20, titleY + 22, 'MEOW-CHANICS DEFENSE • FISIKA SMA', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '15px',
      fontStyle: '600',
      color: '#facc15',
      stroke: '#854d0e',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Story Summary Pill
    const storyPill = this.add.rectangle(width / 2, 145, 680, 44, 0x0f172a, 0.85);
    storyPill.setStrokeStyle(1.5, 0x38bdf8);
    this.add.text(width / 2, 145, '🔬 Pertahankan 5 Fasilitas Laboratorium dari Pasukan Zombi Hampa dengan Kuis Fisika!', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      color: '#e2e8f0'
    }).setOrigin(0.5);

    // Level Selection Section
    this.add.text(width / 2, 195, 'PILIH FASILITAS LABORATORIUM (LEVEL)', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#94a3b8'
    }).setOrigin(0.5);

    this.createLevelCards(width);

    // Main Action Button: Mulai Misi
    const startBtn = this.add.rectangle(width / 2, 530, 280, 52, 0x0284c7, 1);
    startBtn.setStrokeStyle(2, 0x7dd3fc);
    startBtn.setInteractive({ useHandCursor: true });

    const startText = this.add.text(width / 2, 530, '⚡ MULAI PERTAHANAN', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '18px',
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
      this.scene.start('StoryScene', { level: this.selectedLevel });
    });
  }

  private createLabBackground(width: number, height: number) {
    const bg = this.add.rectangle(width / 2, height / 2, width, height, 0x090d16);

    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x1e293b, 0.4);

    // Grid lines
    for (let x = 0; x < width; x += 40) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 40) {
      graphics.moveTo(0, y);
      graphics.lineTo(width, y);
    }
    graphics.strokePath();

    // Floating particles
    for (let i = 0; i < 15; i++) {
      const px = Phaser.Math.Between(20, width - 20);
      const py = Phaser.Math.Between(20, height - 20);
      const dot = this.add.circle(px, py, Phaser.Math.Between(2, 4), 0x38bdf8, 0.3);
      this.tweens.add({
        targets: dot,
        y: py - 30,
        alpha: { from: 0.1, to: 0.5 },
        duration: Phaser.Math.Between(2000, 4000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  private createLevelCards(width: number) {
    const startY = 230;
    const cardHeight = 52;
    const spacing = 58;

    LEVEL_CONFIGS.forEach((lvl, idx) => {
      const cardY = startY + idx * spacing;
      const isSelected = this.selectedLevel === lvl.level;

      const cardBg = this.add.rectangle(width / 2, cardY, 680, cardHeight, isSelected ? 0x1e293b : 0x0f172a, 0.95);
      cardBg.setStrokeStyle(isSelected ? 2.5 : 1, isSelected ? 0x38bdf8 : 0x334155);
      cardBg.setInteractive({ useHandCursor: true });

      // Badge Level Number
      const badge = this.add.circle(width / 2 - 310, cardY, 18, isSelected ? 0x0284c7 : 0x1e293b);
      badge.setStrokeStyle(1.5, isSelected ? 0x7dd3fc : 0x475569);
      const badgeText = this.add.text(width / 2 - 310, cardY, `L${lvl.level}`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        fontStyle: 'bold',
        color: '#ffffff'
      }).setOrigin(0.5);

      // Facility Name
      const nameText = this.add.text(width / 2 - 275, cardY - 11, `${lvl.facilityName} (${lvl.facilityCode})`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
        color: isSelected ? '#38bdf8' : '#e2e8f0'
      });

      // Topic Summary
      const topicText = this.add.text(width / 2 - 275, cardY + 7, `Materi: ${lvl.topic}`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
        color: '#94a3b8'
      });

      // Zombie indicator
      const wavePill = this.add.text(width / 2 + 280, cardY, `🧟 × ${lvl.zombieCount}`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        fontStyle: '600',
        color: '#f87171'
      }).setOrigin(0.5);

      // Select handler
      cardBg.on('pointerdown', () => {
        this.selectedLevel = lvl.level;
        soundManager.playReloadClick();
        this.scene.restart();
      });

      cardBg.on('pointerover', () => {
        if (this.selectedLevel !== lvl.level) {
          cardBg.setFillStyle(0x1e293b, 0.7);
        }
      });

      cardBg.on('pointerout', () => {
        if (this.selectedLevel !== lvl.level) {
          cardBg.setFillStyle(0x0f172a, 0.95);
        }
      });
    });
  }
}
