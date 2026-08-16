import Phaser from 'phaser';
import { LEVEL_CONFIGS } from '../../data/physicsQuestions';
import { LevelData } from '../../types/game';
import { soundManager } from '../audio';

interface ZombieEntity {
  sprite: Phaser.GameObjects.Sprite;
  hpBarBg: Phaser.GameObjects.Rectangle;
  hpBarFill: Phaser.GameObjects.Rectangle;
  type: 'normal' | 'fast' | 'tank' | 'boss';
  lane: number;
  hp: number;
  maxHp: number;
  speed: number;
  isDead: boolean;
}

interface BulletEntity {
  sprite: Phaser.GameObjects.Sprite;
  lane: number;
  damage: number;
  speed: number;
}

export class GameScene extends Phaser.Scene {
  private levelData!: LevelData;
  private currentLane: number = 1; // 0, 1, 2, 3
  private laneY: number[] = [165, 265, 365, 465];
  private catSprite!: Phaser.GameObjects.Sprite;
  private coreShields: Phaser.GameObjects.Sprite[] = [];
  
  // Game Stats
  private ammo: number = 8;
  private maxAmmo: number = 15;
  private score: number = 0;
  private coreHp: number = 100;
  private combo: number = 0;
  private zombiesSpawned: number = 0;
  private zombiesDefeated: number = 0;
  private isGameOver: boolean = false;
  private isGamePaused: boolean = false;

  // Pools & Groups
  private zombies: ZombieEntity[] = [];
  private bullets: BulletEntity[] = [];
  private spawnTimerEvent?: Phaser.Time.TimerEvent;

  // UI Texts
  private ammoText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private coreHpText!: Phaser.GameObjects.Text;
  private waveProgressText!: Phaser.GameObjects.Text;
  private reloadPromptText!: Phaser.GameObjects.Text;
  private comboText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: { level: number }) {
    const lvl = data.level || 1;
    this.levelData = LEVEL_CONFIGS.find((l) => l.level === lvl) || LEVEL_CONFIGS[0];
    
    // Reset state
    this.ammo = 8;
    this.score = 0;
    this.coreHp = 100;
    this.combo = 0;
    this.zombiesSpawned = 0;
    this.zombiesDefeated = 0;
    this.isGameOver = false;
    this.isGamePaused = false;
    this.zombies = [];
    this.bullets = [];
    this.coreShields = [];
  }

  create() {
    const { width, height } = this.scale;

    // 1. Arena Background & Lanes
    this.createLanes(width, height);

    // 2. Core Generator Shield on the Left
    this.createShieldBarricade();

    // 3. Prof. Mpus Cannon Unit
    this.catSprite = this.add.sprite(75, this.laneY[1], 'cat_mpus').setScale(1.2);
    this.currentLane = 1;

    // 4. In-Game HUD (Top & Bottom Bar)
    this.createHUD(width, height);

    // 5. Input Listeners (Clicking Lanes, Keyboard 1-4, R for Reload)
    this.setupInputs();

    // 6. Zombie Spawning Wave Timer
    this.startZombieSpawner();

    // Notify React state
    this.syncStatsToReact();
  }

  private createLanes(width: number, height: number) {
    // Dark Lab Floor
    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0f1d);

    // Grid Floor Pattern
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x1e293b, 0.5);
    for (let x = 0; x < width; x += 40) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, height);
    }
    graphics.strokePath();

    // 4 Horizontal Lanes
    this.laneY.forEach((y, idx) => {
      // Lane background strip
      const laneBg = this.add.rectangle(width / 2, y, width - 20, 88, idx % 2 === 0 ? 0x0f172a : 0x131f37, 0.7);
      laneBg.setStrokeStyle(1, 0x334155, 0.6);
      laneBg.setInteractive({ useHandCursor: true });

      // Click to shoot & move lane
      laneBg.on('pointerdown', () => {
        this.selectLaneAndShoot(idx);
      });

      // Lane Number Indicator on Left
      this.add.text(20, y, `L${idx + 1}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#64748b'
      }).setOrigin(0.5);

      // Lane Guide Line
      const laneLine = this.add.graphics();
      laneLine.lineStyle(1, 0x38bdf8, 0.15);
      laneLine.moveTo(110, y);
      laneLine.lineTo(width - 20, y);
      laneLine.strokePath();
    });
  }

  private createShieldBarricade() {
    this.laneY.forEach((y) => {
      const shield = this.add.sprite(110, y, 'lab_shield').setScale(0.85);
      this.coreShields.push(shield);

      this.tweens.add({
        targets: shield,
        alpha: { from: 0.7, to: 1.0 },
        duration: 1500,
        yoyo: true,
        repeat: -1
      });
    });
  }

  private createHUD(width: number, height: number) {
    // Top Bar HUD
    const topBar = this.add.rectangle(width / 2, 40, width - 20, 60, 0x020617, 0.95);
    topBar.setStrokeStyle(1.5, 0x1e293b);

    // Facility Badge
    this.add.rectangle(130, 40, 220, 36, 0x0f172a, 1).setStrokeStyle(1, 0x38bdf8);
    this.add.text(130, 40, `⚡ LVL ${this.levelData.level}: ${this.levelData.facilityName}`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#38bdf8'
    }).setOrigin(0.5);

    // Core Shield HP
    this.coreHpText = this.add.text(310, 40, `🛡️ Core HP: 100%`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#22c55e'
    }).setOrigin(0.5);

    // Ammo Counter
    this.ammoText = this.add.text(470, 40, `🧶 Peluru: ${this.ammo}`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#facc15'
    }).setOrigin(0.5);

    // Score & Wave
    this.scoreText = this.add.text(620, 40, `⭐ Skor: 0`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#e2e8f0'
    }).setOrigin(0.5);

    this.waveProgressText = this.add.text(740, 40, `🧟 0/${this.levelData.zombieCount}`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#f87171'
    }).setOrigin(0.5);

    // Bottom Action HUD
    const bottomY = height - 42;
    const bottomBar = this.add.rectangle(width / 2, bottomY, width - 20, 60, 0x020617, 0.95);
    bottomBar.setStrokeStyle(1.5, 0x1e293b);

    // BIG RELOAD BUTTON (Core mechanic: Isi Ulang via Kuis Fisika)
    const reloadBtn = this.add.rectangle(width / 2, bottomY, 280, 44, 0xd97706, 1);
    reloadBtn.setStrokeStyle(2, 0xfde047);
    reloadBtn.setInteractive({ useHandCursor: true });

    const reloadText = this.add.text(width / 2, bottomY, '📚 ISI PELURU (KUIS FISIKA)', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5);

    reloadBtn.on('pointerover', () => {
      reloadBtn.setFillStyle(0xb45309);
      reloadBtn.setScale(1.03);
      reloadText.setScale(1.03);
    });

    reloadBtn.on('pointerout', () => {
      reloadBtn.setFillStyle(0xd97706);
      reloadBtn.setScale(1);
      reloadText.setScale(1);
    });

    reloadBtn.on('pointerdown', () => {
      this.triggerQuizReload();
    });

    // Instructions on bottom left & right
    this.add.text(140, bottomY, '💡 Klik Jalur / Tombol 1-4 untuk Tembak', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      color: '#94a3b8'
    }).setOrigin(0.5);

    this.reloadPromptText = this.add.text(670, bottomY, 'Tekan [R] atau Tombol untuk Isi Ulang', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      fontStyle: '600',
      color: '#fbbf24'
    }).setOrigin(0.5);

    // Combo Floating Indicator
    this.comboText = this.add.text(width / 2, 85, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#f43f5e'
    }).setOrigin(0.5).setAlpha(0);
  }

  private setupInputs() {
    // Keyboard controls (Keys 1-4 to shoot in lane 1-4, R or Space to Reload)
    this.input.keyboard?.on('keydown-ONE', () => this.selectLaneAndShoot(0));
    this.input.keyboard?.on('keydown-TWO', () => this.selectLaneAndShoot(1));
    this.input.keyboard?.on('keydown-THREE', () => this.selectLaneAndShoot(2));
    this.input.keyboard?.on('keydown-FOUR', () => this.selectLaneAndShoot(3));
    this.input.keyboard?.on('keydown-R', () => this.triggerQuizReload());
    this.input.keyboard?.on('keydown-SPACE', () => this.triggerQuizReload());
  }

  private selectLaneAndShoot(laneIndex: number) {
    if (this.isGameOver || this.isGamePaused) return;

    this.currentLane = laneIndex;
    const targetY = this.laneY[laneIndex];

    // Smooth movement for Prof. Mpus
    this.tweens.add({
      targets: this.catSprite,
      y: targetY,
      duration: 100,
      ease: 'Power1',
      onComplete: () => {
        this.fireBullet(laneIndex);
      }
    });
  }

  private fireBullet(laneIndex: number) {
    if (this.isGameOver || this.isGamePaused) return;

    // Check Ammo
    if (this.ammo <= 0) {
      soundManager.playWrongAnswer();
      this.showFloatingNotice('⚠️ PELURU HABIS! Tekan RELOAD untuk Kuis Fisika', '#f43f5e');
      this.pulseReloadButton();
      return;
    }

    // Consume ammo
    this.ammo--;
    this.ammoText.setText(`🧶 Peluru: ${this.ammo}`);
    this.ammoText.setColor(this.ammo <= 2 ? '#f87171' : '#facc15');

    // Play shoot SFX
    soundManager.playShoot();

    // Spawn Photon Yarn Ball projectile
    const targetY = this.laneY[laneIndex];
    const bulletSprite = this.add.sprite(115, targetY, 'yarn_bullet').setScale(0.9);

    this.bullets.push({
      sprite: bulletSprite,
      lane: laneIndex,
      damage: 25,
      speed: 480
    });

    // Mpus recoil animation
    this.tweens.add({
      targets: this.catSprite,
      x: 65,
      duration: 60,
      yoyo: true
    });

    this.syncStatsToReact();
  }

  private pulseReloadButton() {
    this.tweens.add({
      targets: this.reloadPromptText,
      scale: 1.2,
      duration: 200,
      yoyo: true,
      repeat: 2
    });
  }

  public triggerQuizReload() {
    if (this.isGameOver || this.isGamePaused) return;

    this.isGamePaused = true;
    soundManager.playReloadClick();

    // Pause physics timer
    if (this.spawnTimerEvent) {
      this.spawnTimerEvent.paused = true;
    }

    // Trigger React Modal callback
    if (typeof window !== 'undefined' && (window as unknown as { __triggerQuizModal?: (lvl: number, cb: (correct: boolean) => void) => void }).__triggerQuizModal) {
      (window as unknown as { __triggerQuizModal: (lvl: number, cb: (correct: boolean) => void) => void }).__triggerQuizModal(
        this.levelData.level,
        (isCorrect: boolean) => {
          this.handleQuizResult(isCorrect);
        }
      );
    }
  }

  public handleQuizResult(isCorrect: boolean) {
    this.isGamePaused = false;
    if (this.spawnTimerEvent) {
      this.spawnTimerEvent.paused = false;
    }

    if (isCorrect) {
      // Reward Ammo
      const ammoGain = 5;
      this.ammo = Math.min(this.maxAmmo, this.ammo + ammoGain);
      this.ammoText.setText(`🧶 Peluru: ${this.ammo}`);
      this.ammoText.setColor('#facc15');

      this.score += 150;
      this.scoreText.setText(`⭐ Skor: ${this.score}`);

      soundManager.playCorrectAnswer();
      this.showFloatingNotice(`+${ammoGain} PELURU! ⚡ ENERGI INTELEKTUAL TERISI`, '#22c55e');

      // Hypercharge burst around Prof. Mpus
      this.createSparkExplosion(this.catSprite.x, this.catSprite.y, 0x38bdf8, 12);
    } else {
      // Penalty: Zombi maju sedikit!
      soundManager.playWrongAnswer();
      this.showFloatingNotice('❌ JAWABAN SALAH! Zombi Merangsek Maju!', '#f43f5e');

      this.zombies.forEach((z) => {
        if (!z.isDead) {
          z.sprite.x -= 35;
          z.hpBarBg.x -= 35;
          z.hpBarFill.x -= 35;
        }
      });
    }

    this.syncStatsToReact();
  }

  private startZombieSpawner() {
    this.spawnTimerEvent = this.time.addEvent({
      delay: this.levelData.spawnIntervalMs,
      callback: () => {
        this.spawnZombie();
      },
      callbackScope: this,
      loop: true
    });
  }

  private spawnZombie() {
    if (this.isGameOver || this.isGamePaused) return;

    if (this.zombiesSpawned >= this.levelData.zombieCount) {
      if (this.spawnTimerEvent) this.spawnTimerEvent.destroy();
      return;
    }

    this.zombiesSpawned++;
    this.waveProgressText.setText(`🧟 ${this.zombiesDefeated}/${this.levelData.zombieCount}`);

    // Random Lane (0-3)
    const laneIndex = Phaser.Math.Between(0, 3);
    const spawnY = this.laneY[laneIndex];
    const spawnX = this.scale.width + 30;

    // Determine zombie type based on level
    let zType: 'normal' | 'fast' | 'tank' | 'boss' = 'normal';
    let textureKey = 'zombie_normal';
    let baseHp = 50 * this.levelData.zombieHealthMultiplier;
    let baseSpeed = 22 * this.levelData.zombieSpeedMultiplier;

    if (this.levelData.level === 5 && this.zombiesSpawned === this.levelData.zombieCount) {
      // Final Boss on level 5!
      zType = 'boss';
      textureKey = 'zombie_boss';
      baseHp = 220;
      baseSpeed = 16;
      this.showFloatingNotice('⚠️ PERINGATAN: BOS ZOMBI QUANTUM VOID MUNCUL!', '#ec4899');
    } else if (this.levelData.specialZombies) {
      const roll = Math.random();
      if (roll < 0.3) {
        zType = 'fast';
        textureKey = 'zombie_fast';
        baseHp = 35 * this.levelData.zombieHealthMultiplier;
        baseSpeed = 40 * this.levelData.zombieSpeedMultiplier;
      } else if (roll < 0.55) {
        zType = 'tank';
        textureKey = 'zombie_tank';
        baseHp = 95 * this.levelData.zombieHealthMultiplier;
        baseSpeed = 16 * this.levelData.zombieSpeedMultiplier;
      }
    }

    const zombieSprite = this.add.sprite(spawnX, spawnY, textureKey).setScale(zType === 'boss' ? 1.2 : 0.95);

    // HP Bar UI
    const hpBarBg = this.add.rectangle(spawnX, spawnY - 36, 40, 6, 0x1e293b);
    const hpBarFill = this.add.rectangle(spawnX, spawnY - 36, 40, 6, 0x22c55e);

    const zombieEntity: ZombieEntity = {
      sprite: zombieSprite,
      hpBarBg,
      hpBarFill,
      type: zType,
      lane: laneIndex,
      hp: baseHp,
      maxHp: baseHp,
      speed: baseSpeed,
      isDead: false
    };

    this.zombies.push(zombieEntity);
  }

  override update(_time: number, delta: number) {
    if (this.isGameOver || this.isGamePaused) return;

    const dt = delta / 1000;

    // 1. Move & Update Bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.sprite.x += b.speed * dt;
      b.sprite.angle += 360 * dt * 2; // Spinning yarn effect

      // Check collision with zombies in same lane
      let bulletHit = false;
      for (const z of this.zombies) {
        if (!z.isDead && z.lane === b.lane) {
          const dist = Math.abs(z.sprite.x - b.sprite.x);
          if (dist < 32) {
            // Collision!
            this.hitZombie(z, b.damage);
            bulletHit = true;
            break;
          }
        }
      }

      // Remove bullet if hit or left screen
      if (bulletHit || b.sprite.x > this.scale.width + 40) {
        b.sprite.destroy();
        this.bullets.splice(i, 1);
      }
    }

    // 2. Move & Update Zombies
    for (let i = this.zombies.length - 1; i >= 0; i--) {
      const z = this.zombies[i];
      if (z.isDead) continue;

      z.sprite.x -= z.speed * dt;
      z.hpBarBg.x = z.sprite.x;
      z.hpBarFill.x = z.sprite.x - (40 - (z.hp / z.maxHp) * 40) / 2;
      z.hpBarFill.width = Math.max(0, (z.hp / z.maxHp) * 40);

      // Zombie walking bobbing animation
      z.sprite.y = this.laneY[z.lane] + Math.sin(_time / 180 + i) * 3;
      z.hpBarBg.y = z.sprite.y - 36;
      z.hpBarFill.y = z.sprite.y - 36;

      // Check if zombie breaches Generator Shield (X <= 110)
      if (z.sprite.x <= 110) {
        this.handleZombieBreach(z, i);
      }
    }

    // 3. Check Victory Condition
    if (
      this.zombiesSpawned >= this.levelData.zombieCount &&
      this.zombies.every((z) => z.isDead) &&
      !this.isGameOver
    ) {
      this.handleVictory();
    }
  }

  private hitZombie(zombie: ZombieEntity, damage: number) {
    zombie.hp -= damage;
    soundManager.playHit();

    // Damage flash
    zombie.sprite.setTint(0xff0000);
    this.time.delayedCall(80, () => {
      if (zombie.sprite && zombie.sprite.active) {
        zombie.sprite.clearTint();
      }
    });

    // Particle hit
    this.createSparkExplosion(zombie.sprite.x, zombie.sprite.y, 0x38bdf8, 6);

    // Floating damage text
    this.createFloatingText(zombie.sprite.x, zombie.sprite.y - 20, `-${damage}`, '#fde047');

    if (zombie.hp <= 0) {
      this.defeatZombie(zombie);
    }
  }

  private defeatZombie(zombie: ZombieEntity) {
    zombie.isDead = true;
    soundManager.playZombieDefeat();

    // Particle explosion
    this.createSparkExplosion(zombie.sprite.x, zombie.sprite.y, 0xa855f7, 16);

    // Fade out & destroy
    this.tweens.add({
      targets: [zombie.sprite, zombie.hpBarBg, zombie.hpBarFill],
      alpha: 0,
      scale: 0.2,
      duration: 250,
      onComplete: () => {
        zombie.sprite.destroy();
        zombie.hpBarBg.destroy();
        zombie.hpBarFill.destroy();
      }
    });

    // Combo & Score
    this.combo++;
    const points = (zombie.type === 'boss' ? 500 : zombie.type === 'tank' ? 120 : 60) * (1 + this.combo * 0.1);
    this.score += Math.round(points);
    this.zombiesDefeated++;

    this.scoreText.setText(`⭐ Skor: ${this.score}`);
    this.waveProgressText.setText(`🧟 ${this.zombiesDefeated}/${this.levelData.zombieCount}`);

    // Show combo
    if (this.combo > 1) {
      this.comboText.setText(`🔥 COMBO ×${this.combo}!`);
      this.comboText.setAlpha(1);
      this.tweens.add({
        targets: this.comboText,
        alpha: 0,
        y: 75,
        duration: 800
      });
    }

    this.syncStatsToReact();
  }

  private handleZombieBreach(zombie: ZombieEntity, index: number) {
    zombie.isDead = true;
    zombie.sprite.destroy();
    zombie.hpBarBg.destroy();
    zombie.hpBarFill.destroy();
    this.zombies.splice(index, 1);

    // Damage Core Shield
    const breachDamage = zombie.type === 'boss' ? 50 : 25;
    this.coreHp = Math.max(0, this.coreHp - breachDamage);
    this.combo = 0;

    this.coreHpText.setText(`🛡️ Core HP: ${this.coreHp}%`);
    this.coreHpText.setColor(this.coreHp <= 30 ? '#ef4444' : this.coreHp <= 60 ? '#facc15' : '#22c55e');

    soundManager.playGameOver();
    this.showFloatingNotice(`⚠️ GENERATOR RUSAK! (-${breachDamage}% HP)`, '#ef4444');

    // Camera shake
    this.cameras.main.shake(300, 0.015);

    if (this.coreHp <= 0) {
      this.handleGameOver();
    }

    this.syncStatsToReact();
  }

  private handleGameOver() {
    this.isGameOver = true;
    soundManager.playGameOver();

    // Trigger Game Over Modal in React
    if (typeof window !== 'undefined' && (window as unknown as { __onGameOverModal?: (score: number, level: number) => void }).__onGameOverModal) {
      (window as unknown as { __onGameOverModal: (score: number, level: number) => void }).__onGameOverModal(this.score, this.levelData.level);
    }
  }

  private handleVictory() {
    this.isGameOver = true;
    soundManager.playVictory();

    // Trigger Victory Modal in React
    if (typeof window !== 'undefined' && (window as unknown as { __onVictoryModal?: (score: number, level: number) => void }).__onVictoryModal) {
      (window as unknown as { __onVictoryModal: (score: number, level: number) => void }).__onVictoryModal(this.score, this.levelData.level);
    }
  }

  private createSparkExplosion(x: number, y: number, color: number, count: number) {
    for (let i = 0; i < count; i++) {
      const spark = this.add.circle(x, y, Phaser.Math.Between(2, 4), color);
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const speed = Phaser.Math.Between(40, 140);

      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        alpha: 0,
        scale: 0.1,
        duration: Phaser.Math.Between(300, 600),
        onComplete: () => spark.destroy()
      });
    }
  }

  private createFloatingText(x: number, y: number, message: string, colorHex: string) {
    const text = this.add.text(x, y, message, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: colorHex
    }).setOrigin(0.5);

    this.tweens.add({
      targets: text,
      y: y - 25,
      alpha: 0,
      duration: 600,
      onComplete: () => text.destroy()
    });
  }

  private showFloatingNotice(message: string, colorHex: string) {
    const notice = this.add.text(this.scale.width / 2, 110, message, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: colorHex,
      backgroundColor: '#020617ee',
      padding: { x: 14, y: 6 }
    }).setOrigin(0.5);

    this.tweens.add({
      targets: notice,
      y: 95,
      alpha: 0,
      delay: 1400,
      duration: 400,
      onComplete: () => notice.destroy()
    });
  }

  private syncStatsToReact() {
    if (typeof window !== 'undefined' && (window as unknown as { __onStatsUpdate?: (stats: unknown) => void }).__onStatsUpdate) {
      (window as unknown as { __onStatsUpdate: (stats: unknown) => void }).__onStatsUpdate({
        ammo: this.ammo,
        score: this.score,
        coreHp: this.coreHp,
        combo: this.combo,
        zombiesDefeated: this.zombiesDefeated,
        totalZombies: this.levelData.zombieCount,
        level: this.levelData.level
      });
    }
  }
}
