/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Procedural Pixel Art Canvas Renderer
 * 
 * Features:
 *   - Title Screen (Panoramic view of Aster Wall & North Access Gate)
 *   - CCTV Person Viewport with progressive arrival animation and LINA perception alteration
 *   - LINA AI Interactive Avatar (Idle, Analyzing, Result states)
 *   - Boss Office & Characters (José & Alberto) for shift-end narrative scenes
 *   - Reusable pixel portrait generator for dialogue boxes and documents
 * 
 * Palette:
 *   Dark Blue:   #26324A
 *   Violet:      #7653A6
 *   Orange:      #E58A3A
 *   Dark Red:    #A94442
 *   Muted Green: #557A68
 *   Warm White:  #E6E1D8
 */

class PixelRenderer {
  constructor() {
    this.titleCanvas = null;
    this.titleCtx = null;
    this.personCanvas = null;
    this.personCtx = null;
    this.linaCanvas = null;
    this.linaCtx = null;
    this.bossCanvas = null;
    this.bossCtx = null;
    this.portraitCanvas = null;
    this.portraitCtx = null;

    this.animFrame = null;
    this.tick = 0;
    this.currentCase = null;
    this.perceptionShift = false;
    this.glitchAmount = 0;

    // Arrival animation
    this.isArriving = false;
    this.arrivalProgress = 1.0;

    // LINA AI Avatar state: 'idle', 'analyzing', 'result_admit', 'result_reject'
    this.linaState = 'idle';
    this.linaAnalysisProgress = 0;

    // Searchlight & ambient particles
    this.searchlightAngle = 0;
    this.particles = [];
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: Math.random() * 320,
        y: Math.random() * 180,
        speed: 1.2 + Math.random() * 1.5,
        length: 2 + Math.random() * 3
      });
    }
  }

  initCanvases(titleCanvasId, personCanvasId, linaCanvasId, bossCanvasId, portraitCanvasId) {
    if (titleCanvasId) {
      this.titleCanvas = document.getElementById(titleCanvasId);
      if (this.titleCanvas) {
        this.titleCanvas.width = 320;
        this.titleCanvas.height = 180;
        this.titleCtx = this.titleCanvas.getContext('2d');
        this.titleCtx.imageSmoothingEnabled = false;
      }
    }

    if (personCanvasId) {
      this.personCanvas = document.getElementById(personCanvasId);
      if (this.personCanvas) {
        this.personCanvas.width = 320;
        this.personCanvas.height = 180;
        this.personCtx = this.personCanvas.getContext('2d');
        this.personCtx.imageSmoothingEnabled = false;
      }
    }

    if (linaCanvasId) {
      this.linaCanvas = document.getElementById(linaCanvasId);
      if (this.linaCanvas) {
        this.linaCanvas.width = 160;
        this.linaCanvas.height = 120;
        this.linaCtx = this.linaCanvas.getContext('2d');
        this.linaCtx.imageSmoothingEnabled = false;
      }
    }

    if (bossCanvasId) {
      this.bossCanvas = document.getElementById(bossCanvasId);
      if (this.bossCanvas) {
        this.bossCanvas.width = 320;
        this.bossCanvas.height = 180;
        this.bossCtx = this.bossCanvas.getContext('2d');
        this.bossCtx.imageSmoothingEnabled = false;
      }
    }

    if (portraitCanvasId) {
      this.portraitCanvas = document.getElementById(portraitCanvasId);
      if (this.portraitCanvas) {
        this.portraitCanvas.width = 72;
        this.portraitCanvas.height = 72;
        this.portraitCtx = this.portraitCanvas.getContext('2d');
        this.portraitCtx.imageSmoothingEnabled = false;
      }
    }

    this.startLoop();
  }

  setCase(caseData, perceptionShift = false, triggerArrival = false) {
    this.currentCase = caseData;
    this.perceptionShift = perceptionShift;
    if (perceptionShift) {
      this.glitchAmount = 1.0;
    } else {
      this.glitchAmount = 0;
    }

    if (triggerArrival) {
      this.isArriving = true;
      this.arrivalProgress = 0.0;
    } else {
      this.isArriving = false;
      this.arrivalProgress = 1.0;
    }

    this.updateDialoguePortrait();
  }

  setLinaState(state, analysisProgress = 0) {
    this.linaState = state;
    this.linaAnalysisProgress = analysisProgress;
  }

  startLoop() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    const loop = () => {
      this.tick++;
      this.updateParticles();
      this.searchlightAngle = Math.sin(this.tick * 0.02) * 0.45;

      if (this.titleCanvas && this.titleCanvas.offsetParent !== null) {
        this.renderTitleBackground();
      }

      if (this.personCanvas && this.personCanvas.offsetParent !== null) {
        this.renderPersonViewport();
      }

      if (this.linaCanvas && this.linaCanvas.offsetParent !== null) {
        this.renderLinaAvatar();
      }

      if (this.bossCanvas && this.bossCanvas.offsetParent !== null) {
        this.renderBossOffice();
      }

      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  updateParticles() {
    for (let p of this.particles) {
      p.y += p.speed;
      p.x -= 0.4;
      if (p.y > 180) {
        p.y = -5;
        p.x = Math.random() * 340;
      }
      if (p.x < -10) {
        p.x = 330;
      }
    }
  }

  // =========================================================================
  // TITLE SCREEN RENDERER (Panoramic View of Aster Wall & North Access Gate)
  // =========================================================================
  renderTitleBackground() {
    const ctx = this.titleCtx;
    if (!ctx) return;

    // Dark sky
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, 320, 180);

    // Distant Aster skyline silhouette
    ctx.fillStyle = '#161f30';
    ctx.fillRect(40, 60, 25, 90);
    ctx.fillRect(80, 45, 30, 105);
    ctx.fillRect(130, 30, 45, 120);
    ctx.fillRect(190, 50, 35, 100);
    ctx.fillRect(240, 70, 25, 80);

    // City lights
    ctx.fillStyle = '#e6e1d8';
    for (let i = 0; i < 20; i++) {
      const lx = 45 + ((i * 13) % 220);
      const ly = 55 + ((i * 7) % 70);
      ctx.fillRect(lx, ly, 1, 1);
    }

    // Concrete Perimeter Wall
    ctx.fillStyle = '#26324A';
    ctx.fillRect(0, 100, 320, 55);

    // Wall texture lines & embrasures
    ctx.fillStyle = '#1c2538';
    for (let x = 0; x < 320; x += 16) {
      ctx.fillRect(x, 100, 2, 55);
    }
    for (let x = 0; x < 320; x += 12) {
      ctx.fillRect(x, 96, 6, 4);
    }

    // Watchtower
    ctx.fillStyle = '#1a2233';
    ctx.fillRect(25, 65, 30, 85);
    ctx.fillStyle = '#354463';
    ctx.fillRect(20, 60, 40, 8);

    // Sweeping Searchlight
    ctx.save();
    ctx.translate(40, 64);
    ctx.rotate(this.searchlightAngle);
    const grad = ctx.createRadialGradient(0, 0, 5, 0, 140, 90);
    grad.addColorStop(0, 'rgba(230, 225, 216, 0.4)');
    grad.addColorStop(0.7, 'rgba(118, 83, 166, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-40, 160);
    ctx.lineTo(40, 160);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Checkpoint Booth Structure
    ctx.fillStyle = '#1b2333';
    ctx.fillRect(110, 115, 100, 45);
    ctx.fillStyle = '#557A68';
    ctx.fillRect(158, 110, 4, 4);

    // Ground & Asphalt
    ctx.fillStyle = '#121722';
    ctx.fillRect(0, 150, 320, 30);
    ctx.fillStyle = '#e58a3a';
    for (let x = 20; x < 320; x += 40) {
      ctx.fillRect(x, 165, 20, 2);
    }

    // Atmospheric particles
    ctx.fillStyle = 'rgba(230, 225, 216, 0.25)';
    for (let p of this.particles) {
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 1, p.length);
    }
  }

  // =========================================================================
  // BOOTH PERSON VIEWPORT RENDERER WITH PROGRESSIVE ARRIVAL ANIMATION
  // =========================================================================
  renderPersonViewport() {
    const ctx = this.personCtx;
    if (!ctx) return;

    // Decay glitch
    if (this.glitchAmount > 0) {
      this.glitchAmount = Math.max(0, this.glitchAmount - 0.03);
    }

    // Advance arrival animation
    if (this.isArriving) {
      this.arrivalProgress += 0.025;
      if (this.arrivalProgress >= 1.0) {
        this.arrivalProgress = 1.0;
        this.isArriving = false;
      }
    }

    // Background of inspection cubicle
    const bgCol = this.perceptionShift ? '#14111d' : '#101724';
    ctx.fillStyle = bgCol;
    ctx.fillRect(0, 0, 320, 180);

    // Security reinforced steel wall
    ctx.fillStyle = this.perceptionShift ? '#22192e' : '#1c2538';
    ctx.fillRect(20, 10, 280, 140);

    // Grid wire / security glass frame
    ctx.strokeStyle = this.perceptionShift ? 'rgba(118, 83, 166, 0.35)' : 'rgba(38, 50, 74, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 30; x < 300; x += 16) {
      ctx.moveTo(x, 10);
      ctx.lineTo(x, 150);
    }
    for (let y = 10; y < 150; y += 16) {
      ctx.moveTo(20, y);
      ctx.lineTo(300, y);
    }
    ctx.stroke();

    // Height measurement lines on the back wall
    ctx.fillStyle = this.perceptionShift ? '#7653A6' : '#354463';
    for (let h = 0; h < 5; h++) {
      const yPos = 40 + h * 18;
      ctx.fillRect(40, yPos, 240, 1);
      ctx.fillRect(270, yPos - 3, 8, 1);
    }

    // Checkpoint counter / desk edge
    ctx.fillStyle = '#26324A';
    ctx.fillRect(0, 148, 320, 32);
    ctx.fillStyle = '#161e2e';
    ctx.fillRect(0, 148, 320, 2);

    // CCTV Camera housing mounted in corner (top right)
    ctx.fillStyle = '#1c2436';
    ctx.fillRect(285, 12, 22, 12);
    ctx.fillStyle = (Math.floor(this.tick / 30) % 2 === 0) ? '#a94442' : '#2b1010';
    ctx.fillRect(298, 16, 4, 4);

    // Render Character Pixel Portrait with Arrival Offset & Dissolve
    if (this.currentCase) {
      ctx.save();
      
      let charOffsetX = 0;
      let charAlpha = 1.0;
      let scale = 1.0;

      if (this.isArriving) {
        // Smooth ease-out curve
        const t = this.arrivalProgress;
        const ease = 1 - Math.pow(1 - t, 3);
        // Arrives from left and scales into foreground
        charOffsetX = (1 - ease) * -90;
        charAlpha = Math.min(1.0, ease * 1.3);
        scale = 0.88 + 0.12 * ease;

        ctx.globalAlpha = charAlpha;
      }

      this.drawCharacterPixelArt(ctx, this.currentCase, this.perceptionShift, charOffsetX, scale);
      
      // If arriving, render horizontal pixel scanline reveal
      if (this.isArriving) {
        ctx.fillStyle = 'rgba(230, 225, 216, 0.4)';
        const scanY = 10 + Math.floor(this.arrivalProgress * 140);
        ctx.fillRect(20, scanY, 280, 2);
      }

      ctx.restore();
    }

    // Glitch / Scanline Displacement when perception shifts
    if (this.perceptionShift || this.glitchAmount > 0) {
      const glitchActive = this.perceptionShift || this.glitchAmount > 0.1;
      if (glitchActive) {
        const numSlices = Math.floor(Math.random() * 4);
        for (let i = 0; i < numSlices; i++) {
          const sy = Math.floor(Math.random() * 140) + 10;
          const sh = Math.floor(Math.random() * 8) + 2;
          const offset = (Math.random() - 0.5) * 8;
          ctx.drawImage(this.personCanvas, 20, sy, 280, sh, 20 + offset, sy, 280, sh);
        }

        ctx.fillStyle = 'rgba(118, 83, 166, 0.18)';
        ctx.fillRect(20, 10, 280, 140);
        ctx.fillStyle = 'rgba(169, 68, 66, 0.12)';
        ctx.fillRect(20, 10, 280, 140);
      }
    }

    // Viewport HUD Overlays (Crosshairs & Camera Timecode)
    ctx.fillStyle = '#a4b3cf';
    ctx.font = '8px monospace';
    const timeStr = `CAM-01 [PUESTO-NORTE] 2026-10-26 ${String(Math.floor(this.tick / 60)).padStart(2, '0')}:${String(this.tick % 60).padStart(2, '0')}`;
    ctx.fillText(timeStr, 26, 24);

    // Arrival status banner in CCTV
    if (this.isArriving) {
      ctx.fillStyle = 'rgba(229, 138, 58, 0.9)';
      ctx.fillRect(26, 32, 160, 12);
      ctx.fillStyle = '#0a0e17';
      ctx.font = 'bold 7px monospace';
      ctx.fillText("APROXIMACIÓN DETECTADA", 30, 41);
    }

    // Corner brackets of viewport
    ctx.strokeStyle = this.perceptionShift ? '#a94442' : '#354463';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(24, 30); ctx.lineTo(24, 16); ctx.lineTo(38, 16);
    ctx.moveTo(296, 30); ctx.lineTo(296, 16); ctx.lineTo(282, 16);
    ctx.moveTo(24, 134); ctx.lineTo(24, 146); ctx.lineTo(38, 146);
    ctx.moveTo(296, 134); ctx.lineTo(296, 146); ctx.lineTo(282, 146);
    ctx.stroke();
  }

  // =========================================================================
  // DETAILED PIXEL ART CHARACTER DRAWING
  // =========================================================================
  drawCharacterPixelArt(ctx, caseData, isAltered, offsetX = 0, scale = 1.0) {
    const cx = 160 + offsetX;
    const cy = 60;

    let skinTone = '#d4a373';
    let skinShadow = '#b88152';
    let hairCol = '#3d2b1f';
    let clothCol = '#455a64';
    let clothDetail = '#607d8b';
    let eyeCol = '#1a2233';

    switch (caseData.id) {
      case 'case-1': // Mateo Vargas
        hairCol = '#4a3b32';
        clothCol = '#37474f';
        clothDetail = '#e58a3a';
        break;
      case 'case-2': // Dra. Elena Morales
        skinTone = '#e0b58e';
        hairCol = '#1f1a17';
        clothCol = '#557A68';
        clothDetail = '#e6e1d8';
        break;
      case 'case-3': // Prof. Daniel Ruiz
        skinTone = '#d6ad85';
        skinShadow = '#ba8b5d';
        hairCol = '#9e9e9e';
        clothCol = '#5d4037';
        clothDetail = '#8d6e63';
        break;
      case 'case-4': // Valeria Ortiz
        skinTone = '#c9966b';
        hairCol = '#212121';
        clothCol = '#26324A';
        clothDetail = '#7653A6';
        break;
      case 'case-5': // Samuel Chen
        skinTone = '#deb887';
        hairCol = '#1a1a1a';
        clothCol = '#424242';
        clothDetail = '#e58a3a';
        break;
      case 'case-6': // Clara Santos
        skinTone = '#e8c39e';
        hairCol = '#5d4037';
        clothCol = '#8e24aa';
        clothDetail = '#e6e1d8';
        break;
      case 'case-7': // Dra. Inés Aranda
        skinTone = '#deb887';
        hairCol = '#757575';
        clothCol = '#e6e1d8';
        clothDetail = '#7653A6';
        break;
    }

    if (isAltered) {
      skinTone = '#93788a';
      skinShadow = '#56354f';
      clothCol = '#22192b';
      clothDetail = '#a94442';
      eyeCol = '#a94442';
    }

    // 1. Shoulders & Torso
    ctx.fillStyle = clothCol;
    ctx.fillRect(cx - 48, cy + 38, 96, 52);
    ctx.fillStyle = clothDetail;
    ctx.fillRect(cx - 14, cy + 38, 28, 26);

    // Accessories
    if (caseData.id === 'case-1') {
      ctx.fillStyle = '#e58a3a';
      ctx.fillRect(cx - 30, cy + 38, 6, 52);
      ctx.fillRect(cx + 24, cy + 38, 6, 52);
    } else if (caseData.id === 'case-2') {
      ctx.fillStyle = '#b0bec5';
      ctx.fillRect(cx - 18, cy + 42, 36, 4);
      ctx.fillRect(cx - 10, cy + 46, 20, 16);
    } else if (caseData.id === 'case-3') {
      ctx.fillStyle = '#e6e1d8';
      ctx.fillRect(cx - 6, cy + 40, 12, 10);
      ctx.fillStyle = '#8b0000';
      ctx.fillRect(cx - 3, cy + 45, 6, 22);
    } else if (caseData.id === 'case-7') {
      ctx.fillStyle = '#26324A';
      ctx.fillRect(cx + 22, cy + 62, 16, 22);
      ctx.fillStyle = '#7653A6';
      ctx.fillRect(cx + 25, cy + 66, 10, 14);
    }

    // 2. Neck
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 10, cy + 26, 20, 14);

    // 3. Head & Face
    ctx.fillStyle = skinTone;
    ctx.fillRect(cx - 24, cy - 16, 48, 44);

    // Jaw / Chin shadow
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 22, cy + 22, 44, 6);
    if (isAltered) {
      ctx.fillRect(cx - 24, cy - 2, 48, 8);
      ctx.fillRect(cx - 16, cy + 12, 32, 10);
    }

    // 4. Hair
    ctx.fillStyle = hairCol;
    ctx.fillRect(cx - 26, cy - 24, 52, 14);
    ctx.fillRect(cx - 28, cy - 14, 8, 28);
    ctx.fillRect(cx + 20, cy - 14, 8, 28);

    if (caseData.id === 'case-2' || caseData.id === 'case-4' || caseData.id === 'case-6') {
      ctx.fillRect(cx - 30, cy, 10, 36);
      ctx.fillRect(cx + 20, cy, 10, 36);
    }

    // 5. Eyebrows
    ctx.fillStyle = hairCol;
    if (isAltered) {
      ctx.fillRect(cx - 18, cy + 1, 14, 3);
      ctx.fillRect(cx - 8, cy + 3, 4, 3);
      ctx.fillRect(cx + 4, cy + 3, 4, 3);
      ctx.fillRect(cx + 4, cy + 1, 14, 3);
    } else {
      ctx.fillRect(cx - 18, cy + 1, 12, 3);
      ctx.fillRect(cx + 6, cy + 1, 12, 3);
    }

    // 6. Eyes
    if (isAltered) {
      ctx.fillStyle = '#421616';
      ctx.fillRect(cx - 16, cy + 6, 10, 4);
      ctx.fillRect(cx + 6, cy + 6, 10, 4);
      ctx.fillStyle = eyeCol;
      ctx.fillRect(cx - 12, cy + 7, 4, 3);
      ctx.fillRect(cx + 8, cy + 7, 4, 3);
    } else {
      ctx.fillStyle = '#e6e1d8';
      ctx.fillRect(cx - 16, cy + 5, 10, 6);
      ctx.fillRect(cx + 6, cy + 5, 10, 6);
      ctx.fillStyle = eyeCol;
      ctx.fillRect(cx - 13, cy + 6, 5, 5);
      ctx.fillRect(cx + 8, cy + 6, 5, 5);
    }

    // Glasses for Daniel Ruiz
    if (caseData.id === 'case-3') {
      ctx.strokeStyle = isAltered ? '#a94442' : '#e58a3a';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 18, cy + 3, 14, 9);
      ctx.strokeRect(cx + 4, cy + 3, 14, 9);
      ctx.fillRect(cx - 4, cy + 7, 8, 2);
    }

    // 7. Nose
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 2, cy + 9, 5, 8);
    ctx.fillRect(cx - 4, cy + 15, 8, 3);

    // 8. Mouth
    if (isAltered) {
      ctx.fillStyle = '#4a2530';
      ctx.fillRect(cx - 8, cy + 22, 16, 2);
      ctx.fillRect(cx - 10, cy + 23, 3, 2);
      ctx.fillRect(cx + 7, cy + 23, 3, 2);
    } else {
      ctx.fillStyle = '#8f5c49';
      ctx.fillRect(cx - 7, cy + 21, 14, 2);
    }

    // Subtle breathing animation
    const breath = Math.sin(this.tick * 0.05) > 0 ? 1 : 0;
    if (breath && !isAltered) {
      ctx.fillStyle = clothCol;
      ctx.fillRect(cx - 44, cy + 36, 88, 2);
    }
  }

  // Update dialogue portrait canvas
  updateDialoguePortrait() {
    if (!this.portraitCtx || !this.currentCase) return;
    const ctx = this.portraitCtx;
    ctx.clearRect(0, 0, 72, 72);

    // Draw dark tech frame
    ctx.fillStyle = '#161e2e';
    ctx.fillRect(0, 0, 72, 72);

    // Draw miniature bust
    ctx.save();
    ctx.translate(-124, -30);
    this.drawCharacterPixelArt(ctx, this.currentCase, this.perceptionShift, 0, 1.0);
    ctx.restore();

    // Border
    ctx.strokeStyle = this.perceptionShift ? '#a94442' : '#7653A6';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 70, 70);
  }

  // Draw pixel portrait directly onto any canvas (e.g. for Document ID photo)
  drawDocPhoto(targetCtx, caseData, w = 60, h = 60) {
    if (!targetCtx || !caseData) return;
    targetCtx.fillStyle = '#141c2b';
    targetCtx.fillRect(0, 0, w, h);

    targetCtx.save();
    const scale = w / 72;
    targetCtx.scale(scale, scale);
    targetCtx.translate(-124, -30);
    this.drawCharacterPixelArt(targetCtx, caseData, false, 0, 1.0);
    targetCtx.restore();

    // Security stamp line on photo
    targetCtx.strokeStyle = 'rgba(85, 122, 104, 0.6)';
    targetCtx.lineWidth = 1;
    targetCtx.strokeRect(2, 2, w - 4, h - 4);
  }

  // =========================================================================
  // LINA AI AVATAR RENDERER (INTERACTIVE TECH ELEMENT)
  // States: 'idle', 'analyzing', 'result_admit', 'result_reject'
  // =========================================================================
  renderLinaAvatar() {
    const ctx = this.linaCtx;
    if (!ctx) return;

    const w = 160;
    const h = 120;
    const cx = w / 2;
    const cy = h / 2;

    // Terminal deep dark background
    ctx.fillStyle = '#0b101a';
    ctx.fillRect(0, 0, w, h);

    // Background hexagonal grid
    ctx.strokeStyle = 'rgba(38, 50, 74, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 10; x < w; x += 20) {
      ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = 10; y < h; y += 20) {
      ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Dynamic state colors
    let coreColor = '#7653A6';
    let ringColor = 'rgba(118, 83, 166, 0.5)';
    let pulseRate = 0.05;

    if (this.linaState === 'analyzing') {
      coreColor = (Math.floor(this.tick / 6) % 2 === 0) ? '#e58a3a' : '#7653A6';
      ringColor = 'rgba(229, 138, 58, 0.7)';
      pulseRate = 0.25;
    } else if (this.linaState === 'result_admit') {
      coreColor = '#557A68';
      ringColor = 'rgba(85, 122, 104, 0.6)';
      pulseRate = 0.03;
    } else if (this.linaState === 'result_reject') {
      coreColor = '#a94442';
      ringColor = 'rgba(169, 68, 66, 0.7)';
      pulseRate = 0.12;
    }

    const pulse = Math.sin(this.tick * pulseRate);

    // 1. Outer Rotating Geometric Radar Ring
    ctx.save();
    ctx.translate(cx, cy);
    const rotation = (this.linaState === 'analyzing') ? (this.tick * 0.08) : (this.tick * 0.015);
    ctx.rotate(rotation);
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const rOuter = 34 + pulse * 2;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const rx = Math.cos(angle) * rOuter;
      const ry = Math.sin(angle) * rOuter;
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    ctx.closePath();
    ctx.stroke();

    // Satellite ticks
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const tx = Math.cos(angle) * (rOuter + 6);
      const ty = Math.sin(angle) * (rOuter + 6);
      ctx.fillStyle = coreColor;
      ctx.fillRect(tx - 1.5, ty - 1.5, 3, 3);
    }
    ctx.restore();

    // 2. Middle Biometric Eye Iris
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 22 + pulse * 1.5, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Diamond Core
    ctx.fillStyle = coreColor;
    ctx.beginPath();
    const dSize = 10 + pulse * 2;
    ctx.moveTo(cx, cy - dSize);
    ctx.lineTo(cx + dSize, cy);
    ctx.lineTo(cx, cy + dSize);
    ctx.lineTo(cx - dSize, cy);
    ctx.closePath();
    ctx.fill();

    // Center Pupil (Synthetic Lens)
    ctx.fillStyle = '#0b101a';
    ctx.fillRect(cx - 2, cy - 2, 4, 4);

    // Scanning Beam when analyzing
    if (this.linaState === 'analyzing') {
      const scanY = 15 + ((this.tick * 4) % (h - 30));
      ctx.fillStyle = 'rgba(229, 138, 58, 0.45)';
      ctx.fillRect(10, scanY, w - 20, 2);

      // Oscilloscope wave at bottom
      ctx.strokeStyle = '#e58a3a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 20; x < w - 20; x += 4) {
        const waveY = h - 16 + Math.sin(x * 0.2 + this.tick * 0.3) * 6;
        if (x === 20) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
    }

    // Status label at bottom
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    let statusText = "● LINA v3.4 [DISPONIBLE]";
    if (this.linaState === 'analyzing') {
      statusText = "⚡ PROCESANDO BIOMETRÍA...";
    } else if (this.linaState === 'result_admit') {
      statusText = "✓ EVALUACIÓN: ADMISIÓN";
    } else if (this.linaState === 'result_reject') {
      statusText = "⚠ EVALUACIÓN: RECHAZO";
    }
    ctx.fillStyle = coreColor;
    ctx.fillText(statusText, cx, h - 8);

    // Framing border
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(2, 2, w - 4, h - 4);
    ctx.textAlign = 'start';
  }

  // =========================================================================
  // BOSS OFFICE RENDERER (Supervisor José's Despatch for Shift-End Scenes)
  // =========================================================================
  renderBossOffice() {
    const ctx = this.bossCtx;
    if (!ctx) return;

    // Room background (dim high-rise office at night)
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(0, 0, 320, 180);

    // Large panoramic window showing Aster neon skyline
    ctx.fillStyle = '#141d2e';
    ctx.fillRect(30, 15, 260, 95);

    // Distant Aster spires with neon lights
    ctx.fillStyle = '#1c283f';
    ctx.fillRect(60, 35, 30, 75);
    ctx.fillRect(110, 25, 45, 85);
    ctx.fillRect(175, 40, 35, 70);
    ctx.fillRect(230, 30, 30, 80);

    // Neon red & violet tower signals
    ctx.fillStyle = (Math.floor(this.tick / 30) % 2 === 0) ? '#a94442' : '#7653A6';
    ctx.fillRect(74, 30, 2, 4);
    ctx.fillRect(132, 20, 2, 4);
    ctx.fillRect(192, 35, 2, 4);

    // Window vertical mullions
    ctx.fillStyle = '#26324A';
    ctx.fillRect(30, 15, 260, 4);
    ctx.fillRect(30, 106, 260, 4);
    ctx.fillRect(100, 15, 4, 95);
    ctx.fillRect(170, 15, 4, 95);
    ctx.fillRect(240, 15, 4, 95);

    // Rain on glass
    ctx.fillStyle = 'rgba(230, 225, 216, 0.2)';
    for (let p of this.particles) {
      if (p.x > 30 && p.x < 290 && p.y > 15 && p.y < 110) {
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 1, 2);
      }
    }

    // Heavy Executive Steel Desk (Foreground)
    ctx.fillStyle = '#1a2233';
    ctx.fillRect(0, 130, 320, 50);
    ctx.fillStyle = '#26324A';
    ctx.fillRect(0, 130, 320, 4);

    // Desktop monitors & paperwork
    ctx.fillStyle = '#101724';
    ctx.fillRect(20, 115, 35, 20); // Alberto terminal
    ctx.fillStyle = '#557A68';
    ctx.fillRect(23, 118, 29, 14);

    ctx.fillStyle = '#dfd8ca';
    ctx.fillRect(130, 134, 40, 14); // Dossier folder
    ctx.fillStyle = '#a94442';
    ctx.fillRect(132, 136, 12, 4);

    ctx.fillStyle = '#101724';
    ctx.fillRect(260, 110, 45, 25); // José surveillance multi-screen
    ctx.fillStyle = '#7653A6';
    ctx.fillRect(263, 113, 39, 19);

    // Render Boss (José) seated behind desk (center-right)
    this.drawJosePixelArt(ctx, 195, 78);

    // Render Alberto (Inspector) seated across (center-left, back/profile)
    this.drawAlbertoPixelArt(ctx, 80, 88);
  }

  // Supervisor José Pixel Art (Stern, older, military/security uniform)
  drawJosePixelArt(ctx, cx, cy) {
    // Shoulders & Security Uniform
    ctx.fillStyle = '#26324A';
    ctx.fillRect(cx - 36, cy + 30, 72, 35);
    // Gold/Orange rank epaulets
    ctx.fillStyle = '#e58a3a';
    ctx.fillRect(cx - 34, cy + 30, 12, 4);
    ctx.fillRect(cx + 22, cy + 30, 12, 4);
    // Tie / collar
    ctx.fillStyle = '#e6e1d8';
    ctx.fillRect(cx - 5, cy + 32, 10, 8);
    ctx.fillStyle = '#161e2e';
    ctx.fillRect(cx - 3, cy + 36, 6, 20);

    // Neck
    ctx.fillStyle = '#ba8b5d';
    ctx.fillRect(cx - 8, cy + 22, 16, 10);

    // Head
    ctx.fillStyle = '#d6ad85';
    ctx.fillRect(cx - 18, cy - 10, 36, 34);

    // Grey crew cut hair & sideburns
    ctx.fillStyle = '#8d99ae';
    ctx.fillRect(cx - 20, cy - 16, 40, 10);
    ctx.fillRect(cx - 21, cy - 10, 5, 20);
    ctx.fillRect(cx + 16, cy - 10, 5, 20);

    // Stern bushy grey brows
    ctx.fillStyle = '#5c677d';
    ctx.fillRect(cx - 14, cy + 2, 10, 3);
    ctx.fillRect(cx + 4, cy + 2, 10, 3);

    // Piercing dark eyes
    ctx.fillStyle = '#e6e1d8';
    ctx.fillRect(cx - 12, cy + 6, 8, 4);
    ctx.fillRect(cx + 4, cy + 6, 8, 4);
    ctx.fillStyle = '#101724';
    ctx.fillRect(cx - 10, cy + 7, 4, 3);
    ctx.fillRect(cx + 6, cy + 7, 4, 3);

    // Nose
    ctx.fillStyle = '#ba8b5d';
    ctx.fillRect(cx - 2, cy + 8, 4, 8);

    // Hard firm mouth
    ctx.fillStyle = '#7a4e3b';
    ctx.fillRect(cx - 6, cy + 19, 12, 2);

    // Cigarette smoke wisps
    if (Math.floor(this.tick / 20) % 2 === 0) {
      ctx.fillStyle = 'rgba(230, 225, 216, 0.35)';
      ctx.fillRect(cx + 18, cy + 18 - (this.tick % 15), 1, 3);
      ctx.fillRect(cx + 19, cy + 14 - (this.tick % 15), 1, 3);
    }
  }

  // Alberto (Inspector) Pixel Art (from behind/side profile)
  drawAlbertoPixelArt(ctx, cx, cy) {
    ctx.fillStyle = '#1c2538';
    ctx.fillRect(cx - 28, cy + 24, 56, 35);
    ctx.fillStyle = '#354463';
    ctx.fillRect(cx - 8, cy + 24, 16, 8);

    // Head back/side
    ctx.fillStyle = '#c9966b';
    ctx.fillRect(cx - 14, cy - 8, 28, 30);
    // Dark brown hair
    ctx.fillStyle = '#2b1d0c';
    ctx.fillRect(cx - 16, cy - 14, 32, 16);
    ctx.fillRect(cx - 16, cy - 6, 8, 18);
  }
}

// Global instance
window.pixelRenderer = new PixelRenderer();
