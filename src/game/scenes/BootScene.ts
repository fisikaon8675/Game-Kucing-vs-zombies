import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Generate all procedural game textures
    this.createProceduralTextures();
  }

  create() {
    this.scene.start('MenuScene');
  }

  private createProceduralTextures() {
    // 1. Prof. Mpus Texture (Cute Cat with lab goggles & white lab collar)
    const catCanvas = document.createElement('canvas');
    catCanvas.width = 64;
    catCanvas.height = 64;
    const catCtx = catCanvas.getContext('2d');
    if (catCtx) {
      // Ears
      catCtx.fillStyle = '#f59e0b'; // Amber cat fur
      catCtx.beginPath();
      catCtx.moveTo(14, 24);
      catCtx.lineTo(20, 6);
      catCtx.lineTo(28, 20);
      catCtx.fill();

      catCtx.beginPath();
      catCtx.moveTo(36, 20);
      catCtx.lineTo(44, 6);
      catCtx.lineTo(50, 24);
      catCtx.fill();

      // Inner ear pink
      catCtx.fillStyle = '#f472b6';
      catCtx.beginPath();
      catCtx.moveTo(18, 22);
      catCtx.lineTo(21, 10);
      catCtx.lineTo(26, 20);
      catCtx.fill();

      catCtx.beginPath();
      catCtx.moveTo(38, 20);
      catCtx.lineTo(43, 10);
      catCtx.lineTo(46, 22);
      catCtx.fill();

      // Head
      catCtx.fillStyle = '#f59e0b';
      catCtx.beginPath();
      catCtx.arc(32, 32, 20, 0, Math.PI * 2);
      catCtx.fill();

      // Lab Coat Body
      catCtx.fillStyle = '#f8fafc';
      catCtx.beginPath();
      catCtx.arc(32, 54, 14, Math.PI, 0);
      catCtx.fill();
      catCtx.strokeStyle = '#94a3b8';
      catCtx.lineWidth = 1.5;
      catCtx.stroke();

      // Lab Tie / Badge
      catCtx.fillStyle = '#0284c7';
      catCtx.fillRect(30, 44, 4, 10);

      // Lab Goggles / Glasses
      catCtx.fillStyle = '#38bdf8';
      catCtx.strokeStyle = '#0f172a';
      catCtx.lineWidth = 2.5;

      // Left glass
      catCtx.beginPath();
      catCtx.arc(24, 30, 7, 0, Math.PI * 2);
      catCtx.fill();
      catCtx.stroke();

      // Right glass
      catCtx.beginPath();
      catCtx.arc(40, 30, 7, 0, Math.PI * 2);
      catCtx.fill();
      catCtx.stroke();

      // Bridge & strap
      catCtx.beginPath();
      catCtx.moveTo(31, 30);
      catCtx.lineTo(33, 30);
      catCtx.moveTo(17, 30);
      catCtx.lineTo(12, 30);
      catCtx.moveTo(47, 30);
      catCtx.lineTo(52, 30);
      catCtx.stroke();

      // Cute Eyes (blinking pupils)
      catCtx.fillStyle = '#0f172a';
      catCtx.beginPath();
      catCtx.arc(24, 30, 3, 0, Math.PI * 2);
      catCtx.arc(40, 30, 3, 0, Math.PI * 2);
      catCtx.fill();

      // Nose & Whiskers
      catCtx.fillStyle = '#f472b6';
      catCtx.beginPath();
      catCtx.arc(32, 37, 2.5, 0, Math.PI * 2);
      catCtx.fill();

      catCtx.strokeStyle = '#78350f';
      catCtx.lineWidth = 1;
      catCtx.beginPath();
      // Whiskers left
      catCtx.moveTo(22, 38);
      catCtx.lineTo(8, 36);
      catCtx.moveTo(22, 40);
      catCtx.lineTo(8, 43);
      // Whiskers right
      catCtx.moveTo(42, 38);
      catCtx.lineTo(56, 36);
      catCtx.moveTo(42, 40);
      catCtx.lineTo(56, 43);
      catCtx.stroke();

      this.textures.addCanvas('cat_mpus', catCanvas);
    }

    // 2. Standard Zombie (Zombi Hampa Biasa)
    const z1Canvas = document.createElement('canvas');
    z1Canvas.width = 64;
    z1Canvas.height = 64;
    const z1Ctx = z1Canvas.getContext('2d');
    if (z1Ctx) {
      // Body
      z1Ctx.fillStyle = '#475569';
      z1Ctx.fillRect(22, 36, 20, 24);

      // Head (Green zombie skin)
      z1Ctx.fillStyle = '#4ade80';
      z1Ctx.beginPath();
      z1Ctx.arc(32, 22, 16, 0, Math.PI * 2);
      z1Ctx.fill();
      z1Ctx.strokeStyle = '#15803d';
      z1Ctx.lineWidth = 2;
      z1Ctx.stroke();

      // Vacant purple glowing eyes
      z1Ctx.fillStyle = '#c084fc';
      z1Ctx.beginPath();
      z1Ctx.arc(26, 20, 4, 0, Math.PI * 2);
      z1Ctx.arc(38, 20, 4, 0, Math.PI * 2);
      z1Ctx.fill();

      // Sluggish open mouth
      z1Ctx.fillStyle = '#1e293b';
      z1Ctx.fillRect(27, 28, 10, 5);

      // Outstretched arms
      z1Ctx.fillStyle = '#4ade80';
      z1Ctx.fillRect(10, 36, 14, 7);
      z1Ctx.fillRect(6, 34, 6, 9);

      this.textures.addCanvas('zombie_normal', z1Canvas);
    }

    // 3. Fast Zombie (Zombi Cepat / Runner)
    const zFastCanvas = document.createElement('canvas');
    zFastCanvas.width = 64;
    zFastCanvas.height = 64;
    const zfCtx = zFastCanvas.getContext('2d');
    if (zfCtx) {
      // Leaner body with speed streaks
      zfCtx.fillStyle = '#334155';
      zfCtx.fillRect(24, 38, 16, 22);

      // Head (Yellow-green fast mutant)
      zfCtx.fillStyle = '#a3e635';
      zfCtx.beginPath();
      zfCtx.arc(32, 22, 14, 0, Math.PI * 2);
      zfCtx.fill();
      zfCtx.strokeStyle = '#4d7c0f';
      zfCtx.lineWidth = 2;
      zfCtx.stroke();

      // Red glowing eyes
      zfCtx.fillStyle = '#ef4444';
      zfCtx.beginPath();
      zfCtx.arc(27, 20, 3.5, 0, Math.PI * 2);
      zfCtx.arc(37, 20, 3.5, 0, Math.PI * 2);
      zfCtx.fill();

      // Speed goggles
      zfCtx.strokeStyle = '#f59e0b';
      zfCtx.lineWidth = 2;
      zfCtx.strokeRect(22, 16, 20, 8);

      this.textures.addCanvas('zombie_fast', zFastCanvas);
    }

    // 4. Tank Zombie (Zombi Zirah Besi)
    const zTankCanvas = document.createElement('canvas');
    zTankCanvas.width = 68;
    zTankCanvas.height = 68;
    const ztCtx = zTankCanvas.getContext('2d');
    if (ztCtx) {
      // Heavy Steel Armor Body
      ztCtx.fillStyle = '#64748b';
      ztCtx.fillRect(18, 32, 32, 30);
      ztCtx.strokeStyle = '#334155';
      ztCtx.lineWidth = 3;
      ztCtx.strokeRect(18, 32, 32, 30);

      // Steel Helmet Head
      ztCtx.fillStyle = '#94a3b8';
      ztCtx.beginPath();
      ztCtx.arc(34, 20, 18, 0, Math.PI * 2);
      ztCtx.fill();
      ztCtx.stroke();

      // Slit Visor Glowing Cyan
      ztCtx.fillStyle = '#06b6d4';
      ztCtx.fillRect(22, 18, 24, 5);

      this.textures.addCanvas('zombie_tank', zTankCanvas);
    }

    // 5. Boss Zombie Quantum Void (Level 5)
    const zBossCanvas = document.createElement('canvas');
    zBossCanvas.width = 80;
    zBossCanvas.height = 80;
    const zbCtx = zBossCanvas.getContext('2d');
    if (zbCtx) {
      // Cosmic void aura
      const grad = zbCtx.createRadialGradient(40, 40, 10, 40, 40, 38);
      grad.addColorStop(0, '#a855f7');
      grad.addColorStop(0.7, '#6b21a8');
      grad.addColorStop(1, 'rgba(107, 33, 168, 0)');
      zbCtx.fillStyle = grad;
      zbCtx.beginPath();
      zbCtx.arc(40, 40, 38, 0, Math.PI * 2);
      zbCtx.fill();

      // Big Head
      zbCtx.fillStyle = '#581c87';
      zbCtx.beginPath();
      zbCtx.arc(40, 30, 22, 0, Math.PI * 2);
      zbCtx.fill();
      zbCtx.strokeStyle = '#f43f5e';
      zbCtx.lineWidth = 3;
      zbCtx.stroke();

      // Menacing Three Eyes
      zbCtx.fillStyle = '#fbbf24';
      zbCtx.beginPath();
      zbCtx.arc(30, 28, 4, 0, Math.PI * 2);
      zbCtx.arc(50, 28, 4, 0, Math.PI * 2);
      zbCtx.arc(40, 20, 4.5, 0, Math.PI * 2);
      zbCtx.fill();

      // Energy core inside chest
      zbCtx.fillStyle = '#f43f5e';
      zbCtx.fillRect(28, 46, 24, 26);

      this.textures.addCanvas('zombie_boss', zBossCanvas);
    }

    // 6. Bola Benang Foton (Photon Yarn Ball)
    const yarnCanvas = document.createElement('canvas');
    yarnCanvas.width = 32;
    yarnCanvas.height = 32;
    const yarnCtx = yarnCanvas.getContext('2d');
    if (yarnCtx) {
      // Glowing outer ring
      yarnCtx.fillStyle = '#38bdf8';
      yarnCtx.beginPath();
      yarnCtx.arc(16, 16, 13, 0, Math.PI * 2);
      yarnCtx.fill();

      // Yarn ball core
      yarnCtx.fillStyle = '#0284c7';
      yarnCtx.beginPath();
      yarnCtx.arc(16, 16, 10, 0, Math.PI * 2);
      yarnCtx.fill();

      // Thread weaves
      yarnCtx.strokeStyle = '#e0f2fe';
      yarnCtx.lineWidth = 1.8;
      yarnCtx.beginPath();
      yarnCtx.arc(16, 16, 8, 0.4, 2.5);
      yarnCtx.moveTo(8, 14);
      yarnCtx.lineTo(24, 18);
      yarnCtx.moveTo(12, 22);
      yarnCtx.lineTo(20, 10);
      yarnCtx.stroke();

      this.textures.addCanvas('yarn_bullet', yarnCanvas);
    }

    // 7. Particle Spark
    const sparkCanvas = document.createElement('canvas');
    sparkCanvas.width = 16;
    sparkCanvas.height = 16;
    const spCtx = sparkCanvas.getContext('2d');
    if (spCtx) {
      spCtx.fillStyle = '#38bdf8';
      spCtx.beginPath();
      spCtx.arc(8, 8, 6, 0, Math.PI * 2);
      spCtx.fill();
      this.textures.addCanvas('spark_particle', sparkCanvas);
    }

    // 8. Generator Shield Barricade
    const shieldCanvas = document.createElement('canvas');
    shieldCanvas.width = 24;
    shieldCanvas.height = 96;
    const shCtx = shieldCanvas.getContext('2d');
    if (shCtx) {
      const grad = shCtx.createLinearGradient(0, 0, 24, 0);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(1, '#67e8f9');
      shCtx.fillStyle = grad;
      shCtx.fillRect(4, 4, 16, 88);
      shCtx.strokeStyle = '#ffffff';
      shCtx.lineWidth = 2;
      shCtx.strokeRect(4, 4, 16, 88);
      this.textures.addCanvas('lab_shield', shieldCanvas);
    }
  }
}
