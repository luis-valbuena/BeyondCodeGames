/**
 * UNDER SURVEILLANCE â€” Beyond Code Games
 * Procedural Pixel Art Canvas Renderer
 * 
 * Features:
 *   - Title Screen (Panoramic view of Aster Wall & North Access Gate)
 *   - CCTV Person Viewport with progressive arrival animation and LINA perception alteration
 *   - LINA AI Interactive Avatar (Idle, Analyzing, Result states)
 *   - Boss Office & Characters (JosÃ© & Alberto) for shift-end narrative scenes
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
    this.endingCanvas = null;
    this.endingCtx = null;
    this.introCanvas = null;
    this.introCtx = null;
    this.currentEndingId = null;

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

  initCanvases(titleCanvasId, personCanvasId, linaCanvasId, bossCanvasId, portraitCanvasId, endingCanvasId, introCanvasId) {
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

    const inId = introCanvasId || 'intro-canvas';
    this.introCanvas = document.getElementById(inId);
    if (this.introCanvas) {
      this.introCanvas.width = 320;
      this.introCanvas.height = 180;
      this.introCtx = this.introCanvas.getContext('2d');
      this.introCtx.imageSmoothingEnabled = false;
    }
        const endId = endingCanvasId || 'ending-canvas';
    this.endingCanvas = document.getElementById(endId);
    if (this.endingCanvas) {
      this.endingCanvas.width = 320;
      this.endingCanvas.height = 180;
      this.endingCtx = this.endingCanvas.getContext('2d');
      this.endingCtx.imageSmoothingEnabled = false;
    }

    this.startLoop();
  }

  setEndingScene(endingId) {
    this.currentEndingId = endingId;
    if (!this.endingCanvas) {
      this.endingCanvas = document.getElementById('ending-canvas');
      if (this.endingCanvas) {
        this.endingCanvas.width = 320;
        this.endingCanvas.height = 180;
        this.endingCtx = this.endingCanvas.getContext('2d');
        this.endingCtx.imageSmoothingEnabled = false;
      }
    }
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

      if (this.endingCanvas && this.endingCanvas.offsetParent !== null && this.currentEndingId) {
        this.renderEndingScene(this.currentEndingId);
      }

      if (this.introCanvas && this.introCanvas.offsetParent !== null) {
        this.renderIntroScene(this.introCtx);
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
  // CINEMATIC INTRO SCREEN RENDERER (Dawn arrival at North Checkpoint)
  // =========================================================================
  renderIntroScene(ctx) {
    if (!ctx) return;

    // 1. Dawn Cold Sky Gradient
    ctx.fillStyle = '#080d16';
    ctx.fillRect(0, 0, 320, 180);

    // Fog / horizon glow
    const hGrad = ctx.createLinearGradient(0, 50, 0, 110);
    hGrad.addColorStop(0, '#101726');
    hGrad.addColorStop(1, '#1e2c42');
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, 50, 320, 60);

    // 2. Concrete Perimeter Wall & Watchtower
    ctx.fillStyle = '#162032';
    ctx.fillRect(0, 85, 320, 40);
    // Heavy concrete seam lines
    ctx.fillStyle = '#0e1522';
    for (let x = 40; x < 320; x += 55) {
      ctx.fillRect(x, 85, 2, 40);
    }
    // Barbed wire coils along wall top
    ctx.strokeStyle = '#3a4d6b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < 320; x += 8) {
      ctx.moveTo(x, 85);
      ctx.lineTo(x + 4, 81);
      ctx.lineTo(x + 8, 85);
    }
    ctx.stroke();

    // Tower silhouette (left-center)
    ctx.fillStyle = '#121a28';
    ctx.fillRect(70, 40, 36, 45);
    ctx.fillRect(66, 36, 44, 5); // catwalk
    ctx.fillRect(74, 25, 28, 12); // glass observation deck
    ctx.fillStyle = '#e58a3a';
    ctx.fillRect(78, 28, 4, 5); // tower console amber light
    ctx.fillRect(92, 28, 4, 5);

    // 3. Sweeping Searchlight Beam
    ctx.save();
    ctx.translate(88, 30);
    const beamAngle = Math.sin(this.tick * 0.02) * 0.55 + 0.3;
    ctx.rotate(beamAngle);
    const bGrad = ctx.createLinearGradient(0, 0, 0, 130);
    bGrad.addColorStop(0, 'rgba(230, 225, 216, 0.45)');
    bGrad.addColorStop(0.4, 'rgba(230, 225, 216, 0.15)');
    bGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-35, 130);
    ctx.lineTo(35, 130);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Wet Ground / Pavement & Puddles
    ctx.fillStyle = '#0b0f17';
    ctx.fillRect(0, 120, 320, 60);
    // Pavement curb line
    ctx.fillStyle = '#1c2638';
    ctx.fillRect(0, 120, 320, 3);

    // Wet puddle reflections
    ctx.fillStyle = 'rgba(38, 50, 74, 0.7)';
    ctx.fillRect(25, 138, 55, 6);
    ctx.fillRect(110, 150, 70, 8);
    ctx.fillRect(190, 142, 45, 5);

    // 5. Inspection Booth Kiosk (Right)
    ctx.fillStyle = '#1a2333';
    ctx.fillRect(215, 65, 105, 75);
    ctx.fillStyle = '#26324A';
    ctx.fillRect(212, 60, 108, 6); // Overhanging metal roof

    // Yellow hazard stripes under booth roof
    for (let x = 215; x < 320; x += 12) {
      ctx.fillStyle = '#ecc94b';
      ctx.fillRect(x, 66, 6, 3);
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(x + 6, 66, 6, 3);
    }

    // Booth Armored Window with green terminal glow inside
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(225, 74, 50, 32);
    ctx.fillStyle = '#48bb78';
    ctx.fillRect(235, 82, 14, 10); // LINA CRT monitor screen
    ctx.fillStyle = '#22543d';
    ctx.fillRect(254, 84, 16, 8); // Aux monitor

    // Fluorescent exterior entrance lamp
    ctx.fillStyle = '#e6e1d8';
    ctx.fillRect(288, 70, 12, 3);
    const lampGlow = ctx.createRadialGradient(294, 72, 1, 294, 90, 40);
    lampGlow.addColorStop(0, 'rgba(230, 225, 216, 0.3)');
    lampGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lampGlow;
    ctx.fillRect(260, 70, 60, 60);

    // Heavy steel door with frosted glass panel
    ctx.fillStyle = '#121824';
    ctx.fillRect(285, 74, 25, 60);
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(287, 78, 12, 14); // window
    ctx.fillStyle = '#ecc94b';
    ctx.fillRect(304, 104, 3, 3); // brass handle

    // 6. Inspector Alberto Silhouette (Walking towards the booth door)
    const albX = 175;
    const albY = 112;
    // Trench coat & body
    ctx.fillStyle = '#141c2b';
    ctx.fillRect(albX - 8, albY + 12, 16, 32);
    ctx.fillRect(albX - 11, albY + 16, 22, 24);
    // Coat collar & shoulders
    ctx.fillStyle = '#1f2a3e';
    ctx.fillRect(albX - 10, albY + 10, 20, 6);
    // Head with inspector fedora hat
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(albX - 4, albY + 2, 8, 8); // face
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(albX - 8, albY - 2, 18, 5); // hat brim
    ctx.fillRect(albX - 6, albY - 7, 13, 6); // hat crown
    // Inspector leather briefcase
    ctx.fillStyle = '#4a3319';
    ctx.fillRect(albX + 9, albY + 26, 9, 8);
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(albX + 12, albY + 24, 3, 2); // brass buckle
    // Legs walking
    ctx.fillStyle = '#0b0f17';
    ctx.fillRect(albX - 6, albY + 44, 5, 12);
    ctx.fillRect(albX + 2, albY + 44, 5, 12);

    // 7. Drifting Mist & Rain Particles
    ctx.fillStyle = 'rgba(230, 225, 216, 0.25)';
    for (let p of this.particles) {
      ctx.fillRect(p.x, p.y, 1, p.length);
    }

    // 8. Surveillance Telemetry Header HUD
    ctx.fillStyle = 'rgba(10, 14, 23, 0.85)';
    ctx.fillRect(0, 0, 320, 14);
    ctx.fillStyle = '#557A68';
    ctx.font = '6px monospace';
    ctx.fillText('CAM-01 // ACCESO NORTE // 05:45 AM // CONDICIÓN: NIEBLA // ALERTA: FASE 1', 10, 10);
    // Blinking REC dot
    if (Math.floor(this.tick / 30) % 2 === 0) {
      ctx.fillStyle = '#e53e3e';
      ctx.fillRect(296, 4, 5, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('REC', 304, 9);
    }

    // CRT scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let y = 0; y < 180; y += 2) {
      ctx.fillRect(0, y, 320, 1);
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
      ctx.fillText("APROXIMACIÃ“N DETECTADA", 30, 41);
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
      case 'case-7': // Dra. InÃ©s Aranda
        skinTone = '#deb887';
        hairCol = '#757575';
        clothCol = '#e6e1d8';
        clothDetail = '#7653A6';
        break;
      case 'case-8': // Nadia Sokolov
        skinTone = '#f0c8a0';
        hairCol = '#cda250';
        clothCol = '#2d3748';
        clothDetail = '#e58a3a';
        break;
      case 'case-9': // DamiÃ¡n Cruz
        skinTone = '#c29774';
        hairCol = '#1a1a1a';
        clothCol = '#4a5568';
        clothDetail = '#38a169';
        break;
      case 'case-10': // Lucas Vane
        skinTone = '#deb887';
        hairCol = '#2d3748';
        clothCol = '#1a202c';
        clothDetail = '#a0aec0';
        break;
      case 'case-11': // Dra. Eliana Silva
        skinTone = '#d4a373';
        hairCol = '#374151';
        clothCol = '#edf2f7';
        clothDetail = '#3182ce';
        break;
      case 'case-12': // Goran Petrov
        skinTone = '#ba8b5d';
        hairCol = '#4b382a';
        clothCol = '#5d4037';
        clothDetail = '#c53030';
        break;
      case 'case-13': // Renata Morales
        skinTone = '#e2b087';
        hairCol = '#9c4221';
        clothCol = '#d69e2e';
        clothDetail = '#2b6cb0';
        break;
      case 'case-14': // Comandante Bruno Stark
        skinTone = '#b58c67';
        hairCol = '#4a5568';
        clothCol = '#171923';
        clothDetail = '#d69e2e';
        break;
      case 'case-15': // TomÃ¡s Aris
        skinTone = '#cfa27e';
        hairCol = '#231f20';
        clothCol = '#4a5568';
        clothDetail = '#718096';
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
    } else if (caseData.id === 'case-8') {
      ctx.fillStyle = '#e58a3a';
      ctx.fillRect(cx - 28, cy + 38, 6, 52);
      ctx.fillRect(cx + 22, cy + 38, 6, 52);
      ctx.fillRect(cx - 28, cy + 62, 56, 6);
    } else if (caseData.id === 'case-9') {
      ctx.fillStyle = '#38a169';
      ctx.fillRect(cx - 3, cy + 42, 6, 26);
    } else if (caseData.id === 'case-10') {
      ctx.fillStyle = '#a0aec0';
      ctx.fillRect(cx - 8, cy + 38, 16, 4);
    } else if (caseData.id === 'case-11') {
      ctx.fillStyle = '#3182ce';
      ctx.fillRect(cx - 16, cy + 40, 4, 30);
      ctx.fillRect(cx + 12, cy + 40, 4, 30);
    } else if (caseData.id === 'case-12') {
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(cx - 24, cy + 38, 6, 52);
      ctx.fillRect(cx + 18, cy + 38, 6, 52);
    } else if (caseData.id === 'case-13') {
      ctx.fillStyle = '#2b6cb0';
      ctx.fillRect(cx - 24, cy + 38, 12, 12);
      ctx.fillRect(cx - 12, cy + 50, 12, 12);
      ctx.fillRect(cx, cy + 62, 12, 12);
      ctx.fillRect(cx + 12, cy + 74, 12, 12);
    } else if (caseData.id === 'case-14') {
      ctx.fillStyle = '#d69e2e';
      ctx.fillRect(cx - 20, cy + 42, 10, 4);
      ctx.fillRect(cx + 10, cy + 42, 10, 4);
      ctx.fillStyle = '#e53e3e';
      ctx.fillRect(cx - 18, cy + 50, 6, 8);
    } else if (caseData.id === 'case-15') {
      ctx.fillStyle = '#718096';
      ctx.fillRect(cx - 18, cy + 34, 36, 12);
      ctx.fillRect(cx - 8, cy + 46, 16, 18);
    } else if (caseData.id === 'case-16') {
      // Karek Vance: Reflector vest stripes & tool harness
      ctx.fillStyle = '#ecc94b';
      ctx.fillRect(cx - 24, cy + 36, 48, 4);
      ctx.fillRect(cx - 24, cy + 48, 48, 4);
      ctx.fillStyle = '#cbd5e0';
      ctx.fillRect(cx - 14, cy + 40, 4, 18); // harness clip
      ctx.fillRect(cx + 10, cy + 40, 4, 18);
    } else if (caseData.id === 'case-17') {
      // Dante Navarro: Red insurgent ribbon & high combat collar
      ctx.fillStyle = '#e53e3e';
      ctx.fillRect(cx - 14, cy + 30, 28, 6);
      ctx.fillRect(cx - 6, cy + 36, 12, 10);
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(cx - 26, cy + 28, 8, 12); // popped tactical collar
      ctx.fillRect(cx + 18, cy + 28, 8, 12);
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

    if (['case-2', 'case-4', 'case-6', 'case-8', 'case-11', 'case-13'].includes(caseData.id)) {
      ctx.fillRect(cx - 30, cy, 10, 36);
      ctx.fillRect(cx + 20, cy, 10, 36);
    }

    // Goran Petrov (case-12): Red work beanie & rugged beard
    if (caseData.id === 'case-12') {
      ctx.fillStyle = '#c53030';
      ctx.fillRect(cx - 28, cy - 28, 56, 16);
      ctx.fillRect(cx - 24, cy - 32, 48, 6);
      ctx.fillStyle = '#4b382a';
      ctx.fillRect(cx - 20, cy + 18, 40, 14);
    }

    if (caseData.id === 'case-16') {
      // Yellow industrial hard-hat helmet
      ctx.fillStyle = '#d69e2e';
      ctx.fillRect(cx - 30, cy - 22, 60, 8); // helmet brim
      ctx.fillStyle = '#ecc94b';
      ctx.fillRect(cx - 24, cy - 32, 48, 14); // helmet crown
      ctx.fillStyle = '#f6e05e';
      ctx.fillRect(cx - 20, cy - 30, 40, 4); // reflective ridge
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

    // Glasses for Daniel Ruiz (case-3) and Dra. Eliana Silva (case-11)
    if (caseData.id === 'case-3' || caseData.id === 'case-11') {
      ctx.strokeStyle = isAltered ? '#a94442' : (caseData.id === 'case-11' ? '#4299e1' : '#e58a3a');
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 18, cy + 3, 14, 9);
      ctx.strokeRect(cx + 4, cy + 3, 14, 9);
      ctx.fillRect(cx - 4, cy + 7, 8, 2);
    }

    // Cybernetic eye implant for Comandante Bruno Stark (case-14)
    if (caseData.id === 'case-14' && !isAltered) {
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(cx - 14, cy + 5, 8, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 11, cy + 6, 2, 2);
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
    let statusText = "â— LINA v3.4 [DISPONIBLE]";
    if (this.linaState === 'analyzing') {
      statusText = "âš¡ PROCESANDO BIOMETRÃA...";
    } else if (this.linaState === 'result_admit') {
      statusText = "âœ“ EVALUACIÃ“N: ADMISIÃ“N";
    } else if (this.linaState === 'result_reject') {
      statusText = "âš  EVALUACIÃ“N: RECHAZO";
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
  // BOSS OFFICE RENDERER (Supervisor JosÃ©'s Despatch for Shift-End Scenes)
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
    ctx.fillRect(260, 110, 45, 25); // JosÃ© surveillance multi-screen
    ctx.fillStyle = '#7653A6';
    ctx.fillRect(263, 113, 39, 19);

    // Render Boss (JosÃ©) seated behind desk (center-right)
    this.drawJosePixelArt(ctx, 195, 78);

    // Render Alberto (Inspector) seated across (center-left, back/profile)
    this.drawAlbertoPixelArt(ctx, 80, 88);
  }

  // Supervisor JosÃ© Pixel Art (Stern, older, military/security uniform)
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

  // =========================================================================
  // CINEMATIC ENDING SCENE RENDERERS (4 TAILORED VISUAL STAGINGS)
  // =========================================================================
  renderEndingScene(endingId) {
    const ctx = this.endingCtx;
    if (!ctx) return;

    switch (endingId) {
      case 'ending-1':
        this.renderEnding1(ctx);
        break;
      case 'ending-2':
        this.renderEnding2(ctx);
        break;
      case 'ending-3':
        this.renderEnding3(ctx);
        break;
      case 'ending-4':
        this.renderEnding4(ctx);
        break;
      case 'ending-catastrophe':
        this.renderEndingCatastrophe(ctx);
        break;
      case 'ending-rebellion':
        this.renderEndingRebellion(ctx);
        break;
      case 'ending-fired':
        this.renderEndingFired(ctx);
        break;
    }
  }

  // ENDING 1: OBEDIENCIA Y PROTOCOLO ABSOLUTO (Floor 40 Executive Panorama)
  renderEnding1(ctx) {
    // 1. Dark panoramic sky
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, 320, 180);

    // 2. Distant Aster Mega-Spires with neon grids
    ctx.fillStyle = '#101726';
    ctx.fillRect(20, 30, 45, 110);
    ctx.fillRect(80, 15, 60, 125);
    ctx.fillRect(160, 25, 50, 115);
    ctx.fillRect(230, 35, 65, 105);

    // Neon amber & cyan window grids
    ctx.fillStyle = '#e58a3a';
    for (let y = 35; y < 120; y += 8) {
      ctx.fillRect(32, y, 2, 2);
      ctx.fillRect(172, y, 2, 2);
      ctx.fillRect(245, y, 2, 2);
    }
    ctx.fillStyle = '#38b2ac';
    for (let y = 25; y < 130; y += 8) {
      ctx.fillRect(95, y, 2, 2);
      ctx.fillRect(115, y, 2, 2);
      ctx.fillRect(270, y, 2, 2);
    }

    // 3. Surveillance Blimp (Dirigible de Vigilancia) drifting horizontally
    const blimpX = 30 + ((this.tick * 0.4) % 260);
    const blimpY = 28 + Math.sin(this.tick * 0.03) * 4;
    ctx.fillStyle = '#1f293d';
    ctx.fillRect(blimpX, blimpY, 48, 14);
    ctx.fillRect(blimpX + 8, blimpY - 3, 32, 3);
    ctx.fillRect(blimpX + 8, blimpY + 14, 32, 3);
    // Gondola & red navigation strobe
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(blimpX + 16, blimpY + 17, 16, 5);
    ctx.fillStyle = (Math.floor(this.tick / 20) % 2 === 0) ? '#e53e3e' : '#4a5568';
    ctx.fillRect(blimpX + 46, blimpY + 6, 3, 3);

    // Downward sweeping searchlight beam from blimp
    ctx.save();
    ctx.translate(blimpX + 24, blimpY + 22);
    const bAngle = Math.sin(this.tick * 0.02) * 0.3;
    ctx.rotate(bAngle);
    const grad = ctx.createLinearGradient(0, 0, 0, 110);
    grad.addColorStop(0, 'rgba(230, 225, 216, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-25, 110);
    ctx.lineTo(25, 110);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Heavy Steel Window Mullions
    ctx.fillStyle = '#1a2333';
    ctx.fillRect(0, 115, 320, 8);
    ctx.fillRect(100, 0, 6, 120);
    ctx.fillRect(210, 0, 6, 120);

    // 5. Executive Polished Floor & Desk
    ctx.fillStyle = '#0f141f';
    ctx.fillRect(0, 123, 320, 57);
    ctx.fillStyle = '#1a2333';
    ctx.fillRect(0, 123, 320, 2);

    // Sleek Obsidian Executive Desk (Right-Center)
    ctx.fillStyle = '#161f2e';
    ctx.fillRect(140, 135, 160, 45);
    ctx.fillStyle = '#26324A';
    ctx.fillRect(140, 135, 160, 4);

    // Gold Commendation Medal on stand
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(240, 125, 12, 10);
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(243, 120, 6, 5); // red ribbon
    ctx.fillStyle = '#ecc94b';
    ctx.fillRect(243, 128, 6, 4);

    // LINA holographic emblem on desk monitor
    ctx.fillStyle = '#7653A6';
    ctx.fillRect(265, 122, 28, 13);
    ctx.fillStyle = '#557A68';
    ctx.fillRect(268, 125, 4, 4);
    ctx.fillStyle = '#e6e1d8';
    ctx.font = '6px monospace';
    ctx.fillText("LINA-OK", 274, 131);

    // 6. Characters: JosÃ© on the right, Alberto on the left
    this.drawJosePixelArt(ctx, 110, 80);
    this.drawAlbertoUniformPixelArt(ctx, 60, 80);

    // Title banner
    this.drawSceneTitleTag(ctx, "FINAL 1 // OBEDIENCIA Y PROTOCOLO", "#e58a3a");
  }

  // Alberto in Formal Uniform (Ending 1)
  drawAlbertoUniformPixelArt(ctx, cx, cy) {
    // Dark ceremonial suit
    ctx.fillStyle = '#161f2e';
    ctx.fillRect(cx - 26, cy + 24, 52, 40);
    // Gold epaulets & chest insignia
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(cx - 24, cy + 24, 8, 3);
    ctx.fillRect(cx + 16, cy + 24, 8, 3);
    ctx.fillRect(cx - 18, cy + 34, 10, 3);

    // White shirt & dark tie
    ctx.fillStyle = '#e6e1d8';
    ctx.fillRect(cx - 5, cy + 25, 10, 8);
    ctx.fillStyle = '#26324A';
    ctx.fillRect(cx - 3, cy + 28, 6, 16);

    // Head
    ctx.fillStyle = '#c9966b';
    ctx.fillRect(cx - 14, cy - 8, 28, 30);
    ctx.fillStyle = '#2b1d0c';
    ctx.fillRect(cx - 16, cy - 14, 32, 14);
    ctx.fillRect(cx - 16, cy - 6, 6, 16);
    // Profile features
    ctx.fillStyle = '#101724';
    ctx.fillRect(cx + 4, cy + 2, 4, 4); // eye looking forward
    ctx.fillStyle = '#8f5c49';
    ctx.fillRect(cx + 4, cy + 14, 6, 2); // mouth
  }

  // ENDING 2: CUESTIONAMIENTO SIN CAMBIO (Subterranean Level -4 Archive)
  renderEnding2(ctx) {
    // 1. Murky subterranean background
    ctx.fillStyle = '#0c100e';
    ctx.fillRect(0, 0, 320, 180);

    // 2. Concrete walls with dark vertical moisture leaks
    ctx.fillStyle = '#17201c';
    ctx.fillRect(0, 0, 320, 130);
    ctx.fillStyle = '#0e1411';
    for (let x = 30; x < 320; x += 55) {
      ctx.fillRect(x, 0, 12, 130);
    }

    // Overhead industrial rusty pipe
    ctx.fillStyle = '#28362f';
    ctx.fillRect(0, 18, 320, 10);
    ctx.fillStyle = '#3c5246';
    ctx.fillRect(0, 18, 320, 2);
    // Pipe valve & bolt rings
    ctx.fillStyle = '#6b4f3b';
    ctx.fillRect(90, 14, 6, 18);
    ctx.fillRect(230, 14, 6, 18);

    // Animated water droplet dripping from pipe down to puddle
    const dropTick = (this.tick * 2) % 110;
    const dropY = 28 + dropTick;
    ctx.fillStyle = '#719985';
    ctx.fillRect(92, dropY, 2, 3);
    // Puddle on floor
    ctx.fillStyle = '#131e18';
    ctx.fillRect(80, 138, 26, 4);

    // 3. Hanging single bare incandescent yellow bulb on swaying cord
    const cordSway = Math.sin(this.tick * 0.04) * 14;
    const bulbX = 160 + cordSway;
    const bulbY = 55;
    ctx.strokeStyle = '#1a221d';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(160, 0);
    ctx.lineTo(bulbX, bulbY);
    ctx.stroke();

    // Bulb glass & filament
    ctx.fillStyle = (Math.floor(this.tick / 12) % 15 === 0) ? '#4a3d1c' : '#d69e2e'; // occasional flicker
    ctx.fillRect(bulbX - 4, bulbY, 8, 10);
    ctx.fillStyle = '#fff3bf';
    ctx.fillRect(bulbX - 2, bulbY + 2, 4, 4);

    // Bulb radial warm glow
    const bulbGrad = ctx.createRadialGradient(bulbX, bulbY + 5, 4, bulbX, bulbY + 5, 75);
    bulbGrad.addColorStop(0, 'rgba(214, 158, 46, 0.35)');
    bulbGrad.addColorStop(0.6, 'rgba(107, 79, 23, 0.12)');
    bulbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bulbGrad;
    ctx.fillRect(bulbX - 75, bulbY - 70, 150, 150);

    // 4. Stacks of dusty archive boxes (Towering left and right)
    // Left stack
    ctx.fillStyle = '#3d3023';
    ctx.fillRect(15, 60, 42, 28);
    ctx.fillRect(20, 88, 40, 24);
    ctx.fillRect(10, 112, 50, 30);
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(25, 70, 14, 4); // red 'ARCHIVADO' label
    ctx.fillRect(28, 98, 14, 4);

    // Right stack
    ctx.fillStyle = '#382a1d';
    ctx.fillRect(260, 50, 45, 26);
    ctx.fillRect(255, 76, 50, 28);
    ctx.fillRect(250, 104, 55, 36);
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(270, 60, 16, 4); // yellow label
    ctx.fillRect(268, 88, 16, 4);

    // 5. Concrete floor
    ctx.fillStyle = '#0f1412';
    ctx.fillRect(0, 138, 320, 42);

    // 6. Rusty metal desk in center
    ctx.fillStyle = '#222b27';
    ctx.fillRect(105, 120, 110, 40);
    ctx.fillStyle = '#313d37';
    ctx.fillRect(105, 120, 110, 4);

    // Paper folder open on desk
    ctx.fillStyle = '#c5a059';
    ctx.fillRect(145, 116, 24, 10);
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(147, 118, 8, 3);

    // 7. Slumped Alberto at desk (weary, head resting on hand)
    this.drawAlbertoSlumpedPixelArt(ctx, 135, 96);

    // Title banner
    this.drawSceneTitleTag(ctx, "FINAL 2 // CUESTIONAMIENTO SIN CAMBIO", "#d69e2e");
  }

  // Slumped Alberto Pixel Art (Ending 2)
  drawAlbertoSlumpedPixelArt(ctx, cx, cy) {
    // Slumped posture
    ctx.fillStyle = '#1c2538';
    ctx.fillRect(cx - 18, cy + 14, 40, 26);
    // Arm resting on desk
    ctx.fillRect(cx + 8, cy + 22, 22, 6);

    // Head tilted down
    ctx.fillStyle = '#ba8b5d';
    ctx.fillRect(cx - 10, cy, 22, 20);
    ctx.fillStyle = '#2b1d0c';
    ctx.fillRect(cx - 12, cy - 6, 26, 12);
    // Weary eye
    ctx.fillStyle = '#101724';
    ctx.fillRect(cx + 2, cy + 8, 4, 2);
  }

  // ENDING 3: RESISTENCIA Y RESPONSABILIDAD (Golden Dawn Breaking Over Gate)
  renderEnding3(ctx) {
    // 1. Radiant Dawn Sky Gradient (Sky changing from dark violet to gold)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 120);
    skyGrad.addColorStop(0, '#1a102f');
    skyGrad.addColorStop(0.4, '#4a2545');
    skyGrad.addColorStop(0.75, '#c05621');
    skyGrad.addColorStop(1, '#ecc94b');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 320, 120);

    // Rising Sun disc peeking over wall gap
    ctx.fillStyle = '#fffaf0';
    ctx.beginPath();
    ctx.arc(160, 68, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 236, 153, 0.4)';
    ctx.beginPath();
    ctx.arc(160, 68, 38, 0, Math.PI * 2);
    ctx.fill();

    // 2. Giant Concrete Perimeter Wall
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 65, 115, 65);
    ctx.fillRect(205, 65, 115, 65);

    // Massive North Blast Gate (Lifted high open in center!)
    ctx.fillStyle = '#374151';
    ctx.fillRect(115, 15, 90, 30); // Raised heavy iron gate
    ctx.fillStyle = '#d97706';
    for (let x = 120; x < 200; x += 14) {
      ctx.fillRect(x, 22, 6, 16); // Hazard warning stripes on gate bottom
    }

    // Radiant sunlight streaming through the open portal gap
    const sunBeam = ctx.createLinearGradient(160, 45, 160, 150);
    sunBeam.addColorStop(0, 'rgba(255, 240, 180, 0.6)');
    sunBeam.addColorStop(1, 'rgba(255, 240, 180, 0.05)');
    ctx.fillStyle = sunBeam;
    ctx.beginPath();
    ctx.moveTo(115, 45);
    ctx.lineTo(205, 45);
    ctx.lineTo(240, 160);
    ctx.lineTo(80, 160);
    ctx.closePath();
    ctx.fill();

    // Silhouettes of Dra. InÃ©s Aranda and refugees walking through portal to freedom
    const walkBob = Math.sin(this.tick * 0.1) * 2;
    // InÃ©s silhouette
    ctx.fillStyle = '#111827';
    ctx.fillRect(152, 64 + walkBob, 12, 24); // body & coat
    ctx.fillRect(155, 56 + walkBob, 6, 8);   // head
    ctx.fillRect(146, 72 + walkBob, 8, 12);  // coat tail blowing in wind
    // Accompanying citizen silhouette
    ctx.fillRect(172, 68 - walkBob, 10, 20);
    ctx.fillRect(174, 61 - walkBob, 6, 7);

    // Pulsing Red Alarm Beacon on the left wall
    ctx.fillStyle = (Math.floor(this.tick / 15) % 2 === 0) ? '#e53e3e' : '#4a1515';
    ctx.fillRect(100, 58, 8, 8);

    // 3. Ground / Checkpoint Forecourt
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 120, 320, 60);
    ctx.fillStyle = '#e58a3a';
    ctx.fillRect(0, 120, 320, 2);

    // 4. Alberto in handcuffs flanked by 2 guards in foreground (Left-Center)
    // Left Guard
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(35, 115, 24, 45);
    ctx.fillStyle = '#475569';
    ctx.fillRect(38, 102, 18, 14); // helmet

    // Alberto standing tall in center
    ctx.fillStyle = '#334155';
    ctx.fillRect(65, 110, 26, 50); // coat
    ctx.fillStyle = '#c9966b';
    ctx.fillRect(70, 96, 16, 16);  // head upright, dignified
    ctx.fillStyle = '#2b1d0c';
    ctx.fillRect(69, 92, 18, 8);   // hair
    // Handcuffs in front
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(74, 134, 10, 4);  // steel cuffed wrists
    ctx.fillRect(78, 138, 2, 4);   // chain link

    // Right Guard holding arm
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(96, 115, 24, 45);
    ctx.fillStyle = '#475569';
    ctx.fillRect(99, 102, 18, 14);

    // Title banner
    this.drawSceneTitleTag(ctx, "FINAL 3 // RESISTENCIA Y RESPONSABILIDAD", "#48bb78");
  }

  // ENDING 4: COMPLICIDAD CONSCIENTE (The Cynical Cog & Incinerator Fire)
  renderEnding4(ctx) {
    // 1. Dark noir backroom
    ctx.fillStyle = '#080a0f';
    ctx.fillRect(0, 0, 320, 180);

    // 2. Wall with dramatic angled shadows of closed Venetian blinds
    ctx.fillStyle = '#111622';
    ctx.fillRect(0, 0, 320, 130);
    ctx.fillStyle = '#090c13';
    for (let y = 5; y < 130; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(320, y + 25);
      ctx.lineTo(320, y + 32);
      ctx.lineTo(0, y + 7);
      ctx.closePath();
      ctx.fill();
    }

    // 3. Centerpiece: Cast-iron Incinerator Barrel
    const barrelX = 145;
    const barrelY = 95;
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(barrelX, barrelY, 38, 55);
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(barrelX - 2, barrelY, 42, 6);
    ctx.fillRect(barrelX - 2, barrelY + 24, 42, 4);
    ctx.fillRect(barrelX - 2, barrelY + 50, 42, 5);

    // Overhead smoke exhaust hood
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(154, 0, 20, 35);
    ctx.beginPath();
    ctx.moveTo(135, 35);
    ctx.lineTo(193, 35);
    ctx.lineTo(174, 15);
    ctx.lineTo(154, 15);
    ctx.closePath();
    ctx.fill();

    // Animated Fire inside barrel
    const flameFlicker = Math.sin(this.tick * 0.25) * 5;
    const fireGrad = ctx.createRadialGradient(barrelX + 19, barrelY - 4, 4, barrelX + 19, barrelY - 4, 30);
    fireGrad.addColorStop(0, '#fff5f5');
    fireGrad.addColorStop(0.3, '#f6ad55');
    fireGrad.addColorStop(0.7, '#dd6b20');
    fireGrad.addColorStop(1, 'rgba(155, 44, 44, 0)');
    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.moveTo(barrelX + 4, barrelY + 6);
    ctx.lineTo(barrelX + 19 + flameFlicker, barrelY - 18);
    ctx.lineTo(barrelX + 34, barrelY + 6);
    ctx.closePath();
    ctx.fill();

    // Rising burning ash/embers towards exhaust duct
    for (let i = 0; i < 8; i++) {
      const emberTick = (this.tick * 2 + i * 18) % 70;
      const emberX = barrelX + 12 + Math.sin(emberTick * 0.1 + i) * 10;
      const emberY = barrelY - emberTick;
      ctx.fillStyle = (i % 2 === 0) ? '#f6ad55' : '#e53e3e';
      ctx.fillRect(emberX, emberY, 2, 2);
    }

    // Warm ambient glow cast on room from incinerator fire
    const roomGlow = ctx.createRadialGradient(barrelX + 19, barrelY, 15, barrelX + 19, barrelY, 110);
    roomGlow.addColorStop(0, 'rgba(237, 137, 54, 0.22)');
    roomGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = roomGlow;
    ctx.fillRect(30, 20, 260, 150);

    // 4. Characters
    // Director JosÃ© on left, feeding classified documents into the flames
    this.drawJoseIncineratingPixelArt(ctx, 110, 85);

    // Alberto on right, standing composed, clutching classified ledger under his arm
    this.drawAlbertoAccomplicePixelArt(ctx, 215, 85);

    // Floor
    ctx.fillStyle = '#0f131a';
    ctx.fillRect(0, 145, 320, 35);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 145, 320, 2);

    // Title banner
    this.drawSceneTitleTag(ctx, "FINAL 4 // COMPLICIDAD CONSCIENTE", "#e53e3e");
  }

  // JosÃ© feeding classified folders into fire
  drawJoseIncineratingPixelArt(ctx, cx, cy) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 20, cy + 22, 38, 38);
    // Arms extended toward barrel holding folder
    ctx.fillStyle = '#334155';
    ctx.fillRect(cx + 8, cy + 26, 26, 6);
    // White dossier folder with red classified stamp
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(cx + 26, cy + 22, 14, 10);
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(cx + 28, cy + 25, 8, 4);

    // Head
    ctx.fillStyle = '#d6ad85';
    ctx.fillRect(cx - 10, cy, 22, 22);
    ctx.fillStyle = '#8d99ae';
    ctx.fillRect(cx - 12, cy - 6, 26, 10);
  }

  // Alberto holding ledger of secrets as accomplice
  drawAlbertoAccomplicePixelArt(ctx, cx, cy) {
    ctx.fillStyle = '#171923';
    ctx.fillRect(cx - 18, cy + 20, 36, 42);
    // Arm holding black book/ledger
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(cx - 16, cy + 26, 12, 20);
    // Secret black binder with gold lock
    ctx.fillStyle = '#000000';
    ctx.fillRect(cx - 18, cy + 32, 10, 18);
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(cx - 14, cy + 39, 4, 4);

    // Head
    ctx.fillStyle = '#c9966b';
    ctx.fillRect(cx - 8, cy, 22, 20);
    ctx.fillStyle = '#2b1d0c';
    ctx.fillRect(cx - 10, cy - 6, 26, 12);
  }

  // Reusable title badge at the top of ending scenes
  drawSceneTitleTag(ctx, title, color) {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.85)';
    ctx.fillRect(10, 8, 230, 14);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 8, 230, 14);
    ctx.fillStyle = color;
    ctx.font = 'bold 8px monospace';
    ctx.fillText(title, 16, 18);
  }

  // =========================================================================
  // ENDING EXTRA: CATÁSTROFE PERIMETRAL (SABOTAJE ENERGÉTICO)
  // =========================================================================
  renderEndingCatastrophe(ctx) {
    // 1. Fiery apocalyptic night sky
    const fGrad = ctx.createLinearGradient(0, 0, 0, 130);
    fGrad.addColorStop(0, '#120404');
    fGrad.addColorStop(0.6, '#3d120a');
    fGrad.addColorStop(1, '#822709');
    ctx.fillStyle = fGrad;
    ctx.fillRect(0, 0, 320, 180);

    // 2. Colossal billowing black smoke columns
    ctx.fillStyle = '#111010';
    for (let i = 0; i < 5; i++) {
      const sx = 40 + i * 55 + Math.sin(this.tick * 0.03 + i) * 6;
      const sy = 10 + (i % 3) * 15;
      ctx.beginPath();
      ctx.arc(sx, sy + 40, 28, 0, Math.PI * 2);
      ctx.arc(sx + 15, sy + 25, 22, 0, Math.PI * 2);
      ctx.arc(sx - 12, sy + 20, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Substation Spires Ablaze (Flames flickering)
    ctx.fillStyle = '#1c0f0b';
    ctx.fillRect(30, 60, 40, 75);
    ctx.fillRect(95, 45, 55, 90);
    ctx.fillRect(175, 70, 45, 65);
    ctx.fillRect(245, 50, 50, 85);

    // Blazing fire tongues
    const fireColors = ['#e53e3e', '#dd6b20', '#ecc94b', '#f6ad55'];
    for (let f = 0; f < 18; f++) {
      const col = fireColors[f % fireColors.length];
      ctx.fillStyle = col;
      const fx = 35 + ((f * 15) % 250);
      const fh = 15 + ((this.tick * 3 + f * 11) % 25);
      const fy = 120 - fh;
      ctx.beginPath();
      ctx.moveTo(fx, 120);
      ctx.lineTo(fx + 6, fy);
      ctx.lineTo(fx + 12, 120);
      ctx.closePath();
      ctx.fill();
    }

    // High-voltage electrical spark arcs
    if (Math.floor(this.tick / 8) % 3 === 0) {
      ctx.strokeStyle = '#63b3ed';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(95, 60);
      ctx.lineTo(110, 50);
      ctx.lineTo(105, 70);
      ctx.lineTo(125, 65);
      ctx.stroke();
    }

    // 4. Shattered Ground & Rubble
    ctx.fillStyle = '#171010';
    ctx.fillRect(0, 120, 320, 60);
    ctx.fillStyle = '#2d1810';
    ctx.fillRect(0, 120, 320, 3);

    // Debris blocks
    ctx.fillStyle = '#321c17';
    ctx.fillRect(45, 140, 18, 12);
    ctx.fillRect(120, 148, 26, 14);
    ctx.fillRect(210, 138, 22, 16);

    // Flashing emergency sirens (red & orange)
    const sirenFlicker = (Math.floor(this.tick / 15) % 2 === 0);
    ctx.fillStyle = sirenFlicker ? 'rgba(229, 62, 62, 0.35)' : 'rgba(221, 107, 32, 0.15)';
    ctx.fillRect(0, 0, 320, 180);

    // Emergency beacon vehicles
    ctx.fillStyle = '#1a1010';
    ctx.fillRect(60, 145, 40, 16);
    ctx.fillStyle = sirenFlicker ? '#e53e3e' : '#4a5568';
    ctx.fillRect(75, 141, 6, 4);

    // Warning HUD stamp
    ctx.fillStyle = 'rgba(10, 5, 5, 0.85)';
    ctx.fillRect(10, 10, 300, 20);
    ctx.fillStyle = '#e53e3e';
    ctx.font = '7px monospace';
    ctx.fillText('ALERTA MÁXIMA // SUBESTACIÓN 4 DESTRUIDA // APAGÓN TOTAL DE ASTER', 18, 23);

    // CRT scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let y = 0; y < 180; y += 2) {
      ctx.fillRect(0, y, 320, 1);
    }
  }

  // =========================================================================
  // ENDING EXTRA: GOLPE DE ESTADO (INSURRECCIÓN POPULAR ARMADA)
  // =========================================================================
  renderEndingRebellion(ctx) {
    // 1. Ruby dawn insurrection sky
    const rGrad = ctx.createLinearGradient(0, 0, 0, 120);
    rGrad.addColorStop(0, '#1a0b14');
    rGrad.addColorStop(0.6, '#381627');
    rGrad.addColorStop(1, '#631f38');
    ctx.fillStyle = rGrad;
    ctx.fillRect(0, 0, 320, 180);

    // 2. Breached Perimeter Walls & Checkpoint Gate forced open
    ctx.fillStyle = '#1c1b24';
    ctx.fillRect(0, 80, 110, 55);
    ctx.fillRect(210, 80, 110, 55);

    // Massive opened gates swinging inwards
    ctx.fillStyle = '#2d2c38';
    ctx.fillRect(90, 65, 12, 70); // left gate post
    ctx.fillRect(218, 65, 12, 70); // right gate post
    ctx.fillStyle = '#4a485c';
    ctx.fillRect(75, 75, 18, 55); // angled open gate leaf
    ctx.fillRect(227, 75, 18, 55);

    // 3. Fluttering Red Insurgent Flags
    const flagWiggle = Math.sin(this.tick * 0.15) * 4;
    // Left tower flag
    ctx.fillStyle = '#718096';
    ctx.fillRect(40, 45, 3, 40); // flagpole
    ctx.fillStyle = '#e53e3e';
    ctx.beginPath();
    ctx.moveTo(43, 45);
    ctx.lineTo(65 + flagWiggle, 52);
    ctx.lineTo(43, 62);
    ctx.closePath();
    ctx.fill();

    // Right tower flag
    ctx.fillStyle = '#718096';
    ctx.fillRect(270, 45, 3, 40);
    ctx.fillStyle = '#e53e3e';
    ctx.beginPath();
    ctx.moveTo(273, 45);
    ctx.lineTo(295 + flagWiggle, 52);
    ctx.lineTo(273, 62);
    ctx.closePath();
    ctx.fill();

    // 4. Barricade Dismantled Ground & Torches
    ctx.fillStyle = '#100f14';
    ctx.fillRect(0, 125, 320, 55);
    ctx.fillStyle = '#262430';
    ctx.fillRect(0, 125, 320, 3);

    // Silhouettes of insurgent crowd marching through the open gate
    ctx.fillStyle = '#08070a';
    for (let c = 0; c < 12; c++) {
      const cx = 105 + c * 9;
      const cy = 118 + (c % 3) * 4;
      ctx.fillRect(cx, cy, 6, 16); // body
      ctx.fillRect(cx + 1, cy - 4, 4, 4); // head
      if (c % 2 === 0) {
        // Raised arm / flag / radio
        ctx.fillRect(cx + 4, cy - 10, 2, 10);
      }
    }

    // Tactical flare glow descending
    const flareY = 25 + ((this.tick * 0.5) % 80);
    ctx.fillStyle = '#feb2b2';
    ctx.fillRect(160, flareY, 3, 3);
    const fGrad = ctx.createRadialGradient(161, flareY + 1, 2, 161, flareY + 1, 45);
    fGrad.addColorStop(0, 'rgba(229, 62, 62, 0.45)');
    fGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = fGrad;
    ctx.fillRect(116, flareY - 44, 90, 90);

    // Insurgent victory banner across gate arch
    ctx.fillStyle = '#9b2c2c';
    ctx.fillRect(110, 68, 100, 10);
    ctx.fillStyle = '#fff5f5';
    ctx.font = '6px monospace';
    ctx.fillText('FRENTE LIBRE // SEDE TOMADA', 114, 75);

    // CRT scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let y = 0; y < 180; y += 2) {
      ctx.fillRect(0, y, 320, 1);
    }
  }

  // =========================================================================
  // ENDING EXTRA: DESTITUCIÓN FULMINANTE (NEGLIGENCIA BUROCRÁTICA)
  // =========================================================================
  renderEndingFired(ctx) {
    // 1. Dark claustrophobic booth interior
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, 320, 180);

    // 2. Half-dropped blast shutters with caution stripes
    ctx.fillStyle = '#1f242e';
    ctx.fillRect(30, 20, 170, 75);
    // Warning hazard stripes
    for (let x = 30; x < 200; x += 14) {
      ctx.fillStyle = '#ecc94b';
      ctx.fillRect(x, 88, 7, 7);
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(x + 7, 88, 7, 7);
    }

    // 3. Locked Computer Terminal with flashing red padlock screen
    ctx.fillStyle = '#141a24';
    ctx.fillRect(50, 40, 75, 45);
    const lockFlicker = (Math.floor(this.tick / 20) % 2 === 0);
    ctx.fillStyle = lockFlicker ? '#e53e3e' : '#742a2a';
    ctx.fillRect(54, 44, 67, 37);
    // Padlock icon
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(82, 54, 11, 10); // lock body
    ctx.fillRect(84, 50, 7, 5); // shackle
    ctx.fillStyle = '#000000';
    ctx.fillRect(86, 52, 3, 3);
    ctx.fillRect(86, 58, 3, 3);

    // 4. Two Internal Affairs Officers standing at the booth door (Right)
    ctx.fillStyle = '#11151c';
    ctx.fillRect(220, 20, 80, 140); // open doorway frame
    ctx.fillStyle = '#26324A';
    ctx.fillRect(225, 25, 70, 130);

    // Officer 1 (Left)
    ctx.fillStyle = '#0c1017';
    ctx.fillRect(232, 55, 24, 70); // heavy body
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(242, 65, 4, 6); // gold IA badge
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(236, 42, 16, 14); // visor helmet
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(238, 48, 12, 3); // red helmet visor slot

    // Officer 2 (Right)
    ctx.fillStyle = '#0c1017';
    ctx.fillRect(262, 55, 24, 70);
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(272, 65, 4, 6);
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(266, 42, 16, 14);
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(268, 48, 12, 3);

    // 5. Heavy Steel Inspection Desk with Discarded Badge
    ctx.fillStyle = '#161e2b';
    ctx.fillRect(0, 125, 320, 55);
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(0, 125, 320, 4);

    // Alberto's metallic inspector badge discarded on the desk
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(85, 135, 14, 10);
    ctx.fillStyle = '#ecc94b';
    ctx.fillRect(87, 137, 10, 6);
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(89, 139, 6, 2);

    // Dossier with red "REVOCADO" stamp
    ctx.fillStyle = '#d4cbb8';
    ctx.fillRect(115, 132, 38, 26);
    ctx.fillStyle = '#e53e3e';
    ctx.font = '6px monospace';
    ctx.fillText('EXPULSIÓN', 119, 146);

    // 6. Overhead Red Audit Alarm Strobe
    ctx.fillStyle = lockFlicker ? 'rgba(229, 62, 62, 0.28)' : 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, 320, 180);

    // HUD Header
    ctx.fillStyle = 'rgba(10, 10, 15, 0.9)';
    ctx.fillRect(10, 6, 300, 16);
    ctx.fillStyle = '#e53e3e';
    ctx.font = '7px monospace';
    ctx.fillText('ASUNTOS INTERNOS // ACCESO BLOQUEADO POR NEGLIGENCIA REITERADA', 18, 17);

    // CRT scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let y = 0; y < 180; y += 2) {
      ctx.fillRect(0, y, 320, 1);
    }
  }

}

// Global instance
window.pixelRenderer = new PixelRenderer();
