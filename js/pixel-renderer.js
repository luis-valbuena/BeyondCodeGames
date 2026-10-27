/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Procedural Pixel Art Canvas Renderer
 * 
 * Target base logical resolution: 320 x 180
 * Strict 16x16 / 32px character proportions, hard pixels (no smoothing).
 * Color Palette:
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
    this.animFrame = null;
    this.tick = 0;
    this.currentCase = null;
    this.perceptionShift = false;
    this.glitchAmount = 0;

    // Searchlight angles
    this.searchlightAngle = 0;
    // Ambient rain/dust particles
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

  initCanvases(titleCanvasId, personCanvasId) {
    this.titleCanvas = document.getElementById(titleCanvasId);
    if (this.titleCanvas) {
      this.titleCanvas.width = 320;
      this.titleCanvas.height = 180;
      this.titleCtx = this.titleCanvas.getContext('2d');
      this.titleCtx.imageSmoothingEnabled = false;
    }

    this.personCanvas = document.getElementById(personCanvasId);
    if (this.personCanvas) {
      this.personCanvas.width = 320;
      this.personCanvas.height = 180;
      this.personCtx = this.personCanvas.getContext('2d');
      this.personCtx.imageSmoothingEnabled = false;
    }

    this.startLoop();
  }

  setCase(caseData, perceptionShift = false) {
    this.currentCase = caseData;
    this.perceptionShift = perceptionShift;
    if (perceptionShift) {
      this.glitchAmount = 1.0;
    } else {
      this.glitchAmount = 0;
    }
  }

  startLoop() {
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

    // Distant Aster skyline silhouette (Spires & Arcologies)
    ctx.fillStyle = '#161f30';
    ctx.fillRect(40, 60, 25, 90);
    ctx.fillRect(80, 45, 30, 105);
    ctx.fillRect(130, 30, 45, 120);
    ctx.fillRect(190, 50, 35, 100);
    ctx.fillRect(240, 70, 25, 80);

    // City lights in warm white and faint amber
    ctx.fillStyle = '#e6e1d8';
    for (let i = 0; i < 20; i++) {
      const lx = 45 + ((i * 13) % 220);
      const ly = 55 + ((i * 7) % 70);
      ctx.fillRect(lx, ly, 1, 1);
    }

    // Massive Concrete Perimeter Wall
    ctx.fillStyle = '#26324A';
    ctx.fillRect(0, 100, 320, 55);

    // Wall texture lines & embrasures
    ctx.fillStyle = '#1c2538';
    for (let x = 0; x < 320; x += 16) {
      ctx.fillRect(x, 100, 2, 55);
    }
    // Wall top battlements
    for (let x = 0; x < 320; x += 12) {
      ctx.fillRect(x, 96, 6, 4);
    }

    // Watchtower left
    ctx.fillStyle = '#1a2233';
    ctx.fillRect(25, 65, 30, 85);
    ctx.fillStyle = '#354463';
    ctx.fillRect(20, 60, 40, 8); // tower roof

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

    // Checkpoint Booth Structure (Foreground)
    ctx.fillStyle = '#1b2333';
    ctx.fillRect(110, 115, 100, 45); // gatehouse
    ctx.fillStyle = '#557A68'; // clearance light
    ctx.fillRect(158, 110, 4, 4);

    // Ground & Asphalt
    ctx.fillStyle = '#121722';
    ctx.fillRect(0, 150, 320, 30);
    // Yellow hazard road lines
    ctx.fillStyle = '#e58a3a';
    for (let x = 20; x < 320; x += 40) {
      ctx.fillRect(x, 165, 20, 2);
    }

    // Rain / Atmospheric particles
    ctx.fillStyle = 'rgba(230, 225, 216, 0.25)';
    for (let p of this.particles) {
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 1, p.length);
    }
  }

  // =========================================================================
  // BOOTH PERSON VIEWPORT RENDERER (CCTV & Pixel Portrait with Perception Alteration)
  // =========================================================================
  renderPersonViewport() {
    const ctx = this.personCtx;
    if (!ctx) return;

    // Decay glitch
    if (this.glitchAmount > 0) {
      this.glitchAmount = Math.max(0, this.glitchAmount - 0.03);
    }

    // Background of inspection cubicle
    const bgCol = this.perceptionShift ? '#14111d' : '#101724';
    ctx.fillStyle = bgCol;
    ctx.fillRect(0, 0, 320, 180);

    // Behind window: security mesh and reinforced steel wall
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

    // Height measurement lines on the back wall (1.50m, 1.60m, 1.70m, 1.80m)
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
    ctx.fillStyle = (Math.floor(this.tick / 30) % 2 === 0) ? '#a94442' : '#2b1010'; // Red recording blink
    ctx.fillRect(298, 16, 4, 4);

    // Render Character Pixel Portrait
    if (this.currentCase) {
      this.drawCharacterPixelArt(ctx, this.currentCase, this.perceptionShift);
    }

    // Glitch / Scanline Displacement when perception shifts
    if (this.perceptionShift || this.glitchAmount > 0) {
      const glitchActive = this.perceptionShift || this.glitchAmount > 0.1;
      if (glitchActive) {
        // Random horizontal slice displacement
        const numSlices = Math.floor(Math.random() * 4);
        for (let i = 0; i < numSlices; i++) {
          const sy = Math.floor(Math.random() * 140) + 10;
          const sh = Math.floor(Math.random() * 8) + 2;
          const offset = (Math.random() - 0.5) * 8;
          ctx.drawImage(this.personCanvas, 20, sy, 280, sh, 20 + offset, sy, 280, sh);
        }

        // Violet / Dark Red chromatic tint
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

    // Corner brackets of viewport
    ctx.strokeStyle = this.perceptionShift ? '#a94442' : '#354463';
    ctx.lineWidth = 2;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(24, 30); ctx.lineTo(24, 16); ctx.lineTo(38, 16);
    // Top-right
    ctx.moveTo(296, 30); ctx.lineTo(296, 16); ctx.lineTo(282, 16);
    // Bottom-left
    ctx.moveTo(24, 134); ctx.lineTo(24, 146); ctx.lineTo(38, 146);
    // Bottom-right
    ctx.moveTo(296, 134); ctx.lineTo(296, 146); ctx.lineTo(282, 146);
    ctx.stroke();
  }

  // =========================================================================
  // DETAILED PIXEL ART CHARACTER DRAWING
  // =========================================================================
  drawCharacterPixelArt(ctx, caseData, isAltered) {
    const cx = 160; // Center X
    const cy = 60;  // Head Center Y

    // Palette variants depending on altered perception
    let skinTone = '#d4a373';
    let skinShadow = '#b88152';
    let hairCol = '#3d2b1f';
    let clothCol = '#455a64';
    let clothDetail = '#607d8b';
    let eyeCol = '#1a2233';

    // Tailor colors to specific characters
    switch (caseData.id) {
      case 'case-1': // Mateo Vargas (Engineer)
        hairCol = '#4a3b32';
        clothCol = '#37474f';
        clothDetail = '#e58a3a'; // Orange safety harness
        break;
      case 'case-2': // Elena Morales (Doctor)
        skinTone = '#e0b58e';
        hairCol = '#1f1a17';
        clothCol = '#557A68'; // Muted green medical coat
        clothDetail = '#e6e1d8';
        break;
      case 'case-3': // Daniel Ruiz (History Professor)
        skinTone = '#d6ad85';
        skinShadow = '#ba8b5d';
        hairCol = '#9e9e9e'; // Grey hair
        clothCol = '#5d4037'; // Tweed brown vest
        clothDetail = '#8d6e63';
        break;
      case 'case-4': // Valeria Ortiz (AI Specialist)
        skinTone = '#c9966b';
        hairCol = '#212121';
        clothCol = '#26324A'; // Technical dark blue jacket
        clothDetail = '#7653A6'; // Violet cyber badge
        break;
      case 'case-5': // Samuel Chen (Parts Trader)
        skinTone = '#deb887';
        hairCol = '#1a1a1a';
        clothCol = '#424242';
        clothDetail = '#e58a3a';
        break;
      case 'case-6': // Clara Santos (Student)
        skinTone = '#e8c39e';
        hairCol = '#5d4037';
        clothCol = '#8e24aa'; // Scarf/sweater
        clothDetail = '#e6e1d8';
        break;
      case 'case-7': // Dra. Inés Aranda (Chief Scientist)
        skinTone = '#deb887';
        hairCol = '#757575'; // Silver streak
        clothCol = '#e6e1d8'; // Lab trench coat
        clothDetail = '#7653A6';
        break;
    }

    // IF PERCEPTION IS ALTERED BY LINA:
    // Heavy shadows, violet/red tints, tense sinister features
    if (isAltered) {
      skinTone = '#93788a';      // Unsettling purplish skin
      skinShadow = '#56354f';    // Deep violet shadow
      clothCol = '#22192b';
      clothDetail = '#a94442';   // Red accents
      eyeCol = '#a94442';        // Hostile glint
    }

    // 1. Shoulders & Torso
    ctx.fillStyle = clothCol;
    ctx.beginPath();
    // Broad pixel shoulders
    ctx.fillRect(cx - 48, cy + 38, 96, 52);
    // Collar / chest
    ctx.fillStyle = clothDetail;
    ctx.fillRect(cx - 14, cy + 38, 28, 26);

    // Character specific torso accessories
    if (caseData.id === 'case-1') {
      // Safety straps
      ctx.fillStyle = '#e58a3a';
      ctx.fillRect(cx - 30, cy + 38, 6, 52);
      ctx.fillRect(cx + 24, cy + 38, 6, 52);
    } else if (caseData.id === 'case-2') {
      // Stethoscope
      ctx.fillStyle = '#b0bec5';
      ctx.fillRect(cx - 18, cy + 42, 36, 4);
      ctx.fillRect(cx - 10, cy + 46, 20, 16);
    } else if (caseData.id === 'case-3') {
      // Professor tie & collar
      ctx.fillStyle = '#e6e1d8';
      ctx.fillRect(cx - 6, cy + 40, 12, 10);
      ctx.fillStyle = '#8b0000';
      ctx.fillRect(cx - 3, cy + 45, 6, 22);
    } else if (caseData.id === 'case-7') {
      // Scientist holding encrypted drive
      ctx.fillStyle = '#26324A';
      ctx.fillRect(cx + 22, cy + 62, 16, 22); // Hand holding drive
      ctx.fillStyle = '#7653A6';
      ctx.fillRect(cx + 25, cy + 66, 10, 14); // Glowing purple data chip
    }

    // 2. Neck
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 10, cy + 26, 20, 14);

    // 3. Head & Face (Pixel block structure)
    ctx.fillStyle = skinTone;
    ctx.fillRect(cx - 24, cy - 16, 48, 44);

    // Jaw / Chin shadow
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 22, cy + 22, 44, 6);
    if (isAltered) {
      // Heavy downward cast shadow under brows and cheekbones
      ctx.fillRect(cx - 24, cy - 2, 48, 8);
      ctx.fillRect(cx - 16, cy + 12, 32, 10);
    }

    // 4. Hair
    ctx.fillStyle = hairCol;
    ctx.fillRect(cx - 26, cy - 24, 52, 14); // Hair top
    ctx.fillRect(cx - 28, cy - 14, 8, 28);  // Left sideburn
    ctx.fillRect(cx + 20, cy - 14, 8, 28);  // Right sideburn

    // Long hair for Elena, Valeria, Clara
    if (caseData.id === 'case-2' || caseData.id === 'case-4' || caseData.id === 'case-6') {
      ctx.fillRect(cx - 30, cy, 10, 36);
      ctx.fillRect(cx + 20, cy, 10, 36);
    }

    // 5. Eyebrows
    ctx.fillStyle = hairCol;
    if (isAltered) {
      // Angled aggressive brows
      ctx.beginPath();
      // Left brow angled down
      ctx.fillRect(cx - 18, cy + 1, 14, 3);
      ctx.fillRect(cx - 8, cy + 3, 4, 3);
      // Right brow angled down
      ctx.fillRect(cx + 4, cy + 3, 4, 3);
      ctx.fillRect(cx + 4, cy + 1, 14, 3);
    } else {
      // Neutral level brows
      ctx.fillRect(cx - 18, cy + 1, 12, 3);
      ctx.fillRect(cx + 6, cy + 1, 12, 3);
    }

    // 6. Eyes
    if (isAltered) {
      // Narrowed, tense, shadowed eyes with red glint
      ctx.fillStyle = '#421616';
      ctx.fillRect(cx - 16, cy + 6, 10, 4);
      ctx.fillRect(cx + 6, cy + 6, 10, 4);

      ctx.fillStyle = eyeCol;
      ctx.fillRect(cx - 12, cy + 7, 4, 3);
      ctx.fillRect(cx + 8, cy + 7, 4, 3);
    } else {
      // Natural eyes with sclera
      ctx.fillStyle = '#e6e1d8';
      ctx.fillRect(cx - 16, cy + 5, 10, 6);
      ctx.fillRect(cx + 6, cy + 5, 10, 6);

      ctx.fillStyle = eyeCol;
      ctx.fillRect(cx - 13, cy + 6, 5, 5);
      ctx.fillRect(cx + 8, cy + 6, 5, 5);
    }

    // Glasses for Daniel Ruiz (Case 3)
    if (caseData.id === 'case-3') {
      ctx.strokeStyle = isAltered ? '#a94442' : '#e58a3a';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 18, cy + 3, 14, 9);
      ctx.strokeRect(cx + 4, cy + 3, 14, 9);
      ctx.fillRect(cx - 4, cy + 7, 8, 2); // bridge
    }

    // 7. Nose
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 2, cy + 9, 5, 8);
    ctx.fillRect(cx - 4, cy + 15, 8, 3);

    // 8. Mouth
    if (isAltered) {
      // Down-turned tense grimace
      ctx.fillStyle = '#4a2530';
      ctx.fillRect(cx - 8, cy + 22, 16, 2);
      ctx.fillRect(cx - 10, cy + 23, 3, 2);
      ctx.fillRect(cx + 7, cy + 23, 3, 2);
    } else {
      // Neutral calm mouth line
      ctx.fillStyle = '#8f5c49';
      ctx.fillRect(cx - 7, cy + 21, 14, 2);
    }

    // Subtle breathing animation (torso rises/falls by 1px)
    const breath = Math.sin(this.tick * 0.05) > 0 ? 1 : 0;
    if (breath && !isAltered) {
      ctx.fillStyle = clothCol;
      ctx.fillRect(cx - 44, cy + 36, 88, 2);
    }
  }
}

// Global instance
window.pixelRenderer = new PixelRenderer();
