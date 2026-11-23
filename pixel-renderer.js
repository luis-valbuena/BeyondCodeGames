/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Procedural Pixel Art Canvas Renderer & Visual FX Engine
 * 
 * Logical canvas resolutions:
 *   Title Canvas:  320 x 180 (16:9 panoramic)
 *   Person Canvas: 320 x 240 (4:3 true CCTV CRT camera ratio, uncompressed 1:1 square pixels)
 * 
 * Color Palette:
 *   Dark Blue:   #26324A
 *   Deep Blue:   #161e2e
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

    // Searchlight & atmospheric animation
    this.searchlightAngle = 0;
    this.fogOffset = 0;

    // Ambient rain/dust/ash particles for Title
    this.particles = [];
    for (let i = 0; i < 48; i++) {
      this.particles.push({
        x: Math.random() * 320,
        y: Math.random() * 180,
        speed: 0.8 + Math.random() * 1.5,
        length: 2 + Math.random() * 4,
        alpha: 0.15 + Math.random() * 0.35
      });
    }

    // Natural micro-blinking timer for characters
    this.blinkTimer = 0;
    this.isBlinking = false;
  }

  initCanvases(titleCanvasId, personCanvasId) {
    this.titleCanvas = document.getElementById(titleCanvasId);
    if (this.titleCanvas) {
      this.titleCanvas.width = 320;
      this.titleCanvas.height = 180;
      this.titleCtx = this.titleCanvas.getContext('2d');
      this.titleCtx.imageSmoothingEnabled = false;
    }

    // Person Canvas at 320x240 (Perfect 4:3 security CRT aspect ratio matching viewport)
    this.personCanvas = document.getElementById(personCanvasId);
    if (this.personCanvas) {
      this.personCanvas.width = 320;
      this.personCanvas.height = 240;
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
      this.searchlightAngle = Math.sin(this.tick * 0.016) * 0.38;
      this.fogOffset = (this.fogOffset + 0.15) % 320;

      // Natural character micro-blink logic (every ~160-220 ticks, blink for 5 ticks)
      if (this.blinkTimer <= 0) {
        if (Math.random() < 0.012) {
          this.isBlinking = true;
          this.blinkTimer = 6;
        }
      } else {
        this.blinkTimer--;
        if (this.blinkTimer <= 0) {
          this.isBlinking = false;
        }
      }

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
      p.x -= 0.3;
      if (p.y > 180) {
        p.y = -6;
        p.x = Math.random() * 340;
      }
      if (p.x < -10) {
        p.x = 330;
      }
    }
  }

  // =========================================================================
  // TITLE SCREEN RENDERER (Cinematic Layer Over Aster Wall Background)
  // =========================================================================
  renderTitleBackground() {
    const ctx = this.titleCtx;
    if (!ctx) return;

    ctx.clearRect(0, 0, 320, 180);

    // Subtle atmospheric mist layer drifting across the wall
    ctx.fillStyle = 'rgba(22, 30, 46, 0.2)';
    ctx.fillRect(0, 80, 320, 100);

    // Sweeping Searchlight 1 (Watchtower Left)
    ctx.save();
    ctx.translate(45, 66);
    ctx.rotate(this.searchlightAngle);
    const grad1 = ctx.createRadialGradient(0, 0, 2, 0, 130, 80);
    grad1.addColorStop(0, 'rgba(230, 225, 216, 0.38)');
    grad1.addColorStop(0.5, 'rgba(229, 138, 58, 0.16)');
    grad1.addColorStop(0.85, 'rgba(118, 83, 166, 0.06)');
    grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-40, 155);
    ctx.lineTo(40, 155);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Secondary Searchlight (Watchtower Right)
    ctx.save();
    ctx.translate(275, 60);
    ctx.rotate(-this.searchlightAngle * 0.85 + 0.12);
    const grad2 = ctx.createRadialGradient(0, 0, 2, 0, 120, 70);
    grad2.addColorStop(0, 'rgba(230, 225, 216, 0.28)');
    grad2.addColorStop(0.6, 'rgba(118, 83, 166, 0.1)');
    grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-34, 140);
    ctx.lineTo(34, 140);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Gatehouse clearance light
    const gateFlash = Math.sin(this.tick * 0.05) > 0;
    ctx.fillStyle = gateFlash ? '#557A68' : '#23332b';
    ctx.fillRect(158, 122, 4, 3);
    if (gateFlash) {
      ctx.fillStyle = 'rgba(85, 122, 104, 0.3)';
      ctx.fillRect(155, 119, 10, 9);
    }

    // Atmospheric Rain / Cold Ash particles
    for (let p of this.particles) {
      ctx.fillStyle = `rgba(230, 225, 216, ${p.alpha})`;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 1, p.length);
    }

    // Subtle CRT scanline pass
    ctx.fillStyle = 'rgba(10, 14, 22, 0.15)';
    for (let y = 0; y < 180; y += 2) {
      ctx.fillRect(0, y, 320, 1);
    }
  }

  // =========================================================================
  // BOOTH PERSON VIEWPORT RENDERER (CCTV 4:3 Monitor, Natural Character Proportions)
  // =========================================================================
  renderPersonViewport() {
    const ctx = this.personCtx;
    if (!ctx) return;

    // Decay glitch when coming out of alteration
    if (this.glitchAmount > 0) {
      this.glitchAmount = Math.max(0, this.glitchAmount - 0.025);
    }

    // Background of inspection cubicle (320x240 frame)
    const bgCol = this.perceptionShift ? '#140f1c' : '#0c121e';
    ctx.fillStyle = bgCol;
    ctx.fillRect(0, 0, 320, 240);

    // Behind reinforced window: steel walls & depth
    ctx.fillStyle = this.perceptionShift ? '#1c1426' : '#141d2c';
    ctx.fillRect(16, 10, 288, 185);

    // Security Wire Mesh / Grid Frame (320x240)
    ctx.strokeStyle = this.perceptionShift ? 'rgba(118, 83, 166, 0.35)' : 'rgba(38, 50, 74, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 24; x < 300; x += 18) {
      ctx.moveTo(x, 10);
      ctx.lineTo(x, 195);
    }
    for (let y = 10; y < 195; y += 18) {
      ctx.moveTo(16, y);
      ctx.lineTo(304, y);
    }
    ctx.stroke();

    // Height measurement lines on the back wall (1.50m to 1.90m)
    ctx.fillStyle = this.perceptionShift ? 'rgba(169, 68, 66, 0.55)' : 'rgba(85, 122, 104, 0.45)';
    for (let h = 0; h < 5; h++) {
      const yPos = 42 + h * 24;
      ctx.fillRect(32, yPos, 256, 1);
      ctx.fillRect(280, yPos - 3, 8, 1);
      ctx.fillRect(32, yPos - 3, 6, 1);
    }

    // Draw the Person Pixel Art (Upper body & portrait)
    if (this.currentCase) {
      this.drawCharacterPixelArt(ctx, this.currentCase, this.perceptionShift);
    }

    // Heavy checkpoint counter / desk edge in foreground (Y: 195 to 240)
    ctx.fillStyle = '#182233';
    ctx.fillRect(0, 195, 320, 45);
    // Steel counter trim line
    ctx.fillStyle = this.perceptionShift ? '#7653A6' : '#26324A';
    ctx.fillRect(0, 194, 320, 2);
    // Counter rivets
    ctx.fillStyle = '#31425f';
    for (let r = 12; r < 320; r += 24) {
      ctx.fillRect(r, 199, 2, 2);
    }

    // Top-right CCTV surveillance camera housing
    ctx.fillStyle = '#161f2e';
    ctx.fillRect(280, 12, 26, 14);
    ctx.fillStyle = '#26324A';
    ctx.fillRect(276, 14, 4, 10);
    // Blinking red recording LED
    const isRecBlink = Math.floor(this.tick / 24) % 2 === 0;
    ctx.fillStyle = isRecBlink ? '#A94442' : '#2e1212';
    ctx.fillRect(296, 16, 4, 4);

    // Glitch and chromatic displacement when perception is altered
    if (this.perceptionShift || this.glitchAmount > 0) {
      const isAlteredActive = this.perceptionShift || this.glitchAmount > 0.08;
      if (isAlteredActive) {
        // Horizontal scanline displacement slices
        const slices = Math.floor(Math.random() * 4);
        for (let i = 0; i < slices; i++) {
          const sy = Math.floor(Math.random() * 160) + 16;
          const sh = Math.floor(Math.random() * 12) + 3;
          const offset = (Math.random() - 0.5) * 10;
          ctx.drawImage(this.personCanvas, 16, sy, 288, sh, 16 + offset, sy, 288, sh);
        }

        // Violet chromatic displacement wash
        ctx.fillStyle = 'rgba(118, 83, 166, 0.2)';
        ctx.fillRect(16, 10, 288, 185);
        
        // Red threat tint
        ctx.fillStyle = 'rgba(169, 68, 66, 0.12)';
        ctx.fillRect(16, 10, 288, 185);

        // Biometric threat telemetry overlay directly on canvas
        ctx.fillStyle = '#A94442';
        ctx.font = '9px monospace';
        ctx.fillText("! DIRECTIVA P-72: ANOMALÍA ÓPTICA", 26, 186);
        ctx.fillText("RIESGO: ALTO", 226, 186);
      }
    }

    // Viewport HUD Overlays (Crosshairs & Camera Timecode)
    ctx.fillStyle = this.perceptionShift ? '#bfa9dd' : '#70839e';
    ctx.font = '8px monospace';
    const s = String(this.tick % 60).padStart(2, '0');
    const m = String(Math.floor(this.tick / 60) % 60).padStart(2, '0');
    const h = String(21 + Math.floor(this.tick / 3600)).padStart(2, '0');
    ctx.fillText(`CAM-01 [PUERTA NORTE] ${h}:${m}:${s}`, 24, 24);

    // Optical Reticle Corner Brackets
    ctx.strokeStyle = this.perceptionShift ? '#A94442' : '#31425f';
    ctx.lineWidth = 2;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(22, 34); ctx.lineTo(22, 16); ctx.lineTo(40, 16);
    // Top-right
    ctx.moveTo(298, 34); ctx.lineTo(298, 16); ctx.lineTo(280, 16);
    // Bottom-left
    ctx.moveTo(22, 178); ctx.lineTo(22, 192); ctx.lineTo(40, 192);
    // Bottom-right
    ctx.moveTo(298, 178); ctx.lineTo(298, 192); ctx.lineTo(280, 192);
    ctx.stroke();

    // Subtle CRT raster scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    for (let y = 10; y < 195; y += 3) {
      ctx.fillRect(16, y, 288, 1);
    }
  }

  // =========================================================================
  // BELIEVABLE, NATURALLY PROPORTIONED PIXEL ART CHARACTER DRAWING
  // =========================================================================
  drawCharacterPixelArt(ctx, caseData, isAltered) {
    const cx = 160; // Center X
    const cy = 82;  // Head Center Y in 320x240 frame

    // Subtle breathing cycle (1px vertical movement)
    const breath = Math.sin(this.tick * 0.045) > 0 ? 1 : 0;
    const by = cy - breath;

    // Base character parameters
    let skinTone = '#d4a373';
    let skinShadow = '#b88152';
    let hairCol = '#3d2b1f';
    let hairHighlight = '#5c4333';
    let clothCol = '#455a64';
    let clothDetail = '#607d8b';
    let eyeCol = '#1a2233';

    // Tailor appearance to specific character
    switch (caseData.id) {
      case 'case-1': // Mateo Vargas (Hydraulic Technician, 34)
        skinTone = '#d4a07d';
        skinShadow = '#af7856';
        hairCol = '#42342b';
        hairHighlight = '#5e4c41';
        clothCol = '#37474f';       // Rugged work jacket
        clothDetail = '#E58A3A';    // Orange safety straps
        break;

      case 'case-2': // Dra. Elena Morales (Physician, 41)
        skinTone = '#e2ba96';
        skinShadow = '#c29772';
        hairCol = '#1c1714';
        hairHighlight = '#3a322c';
        clothCol = '#557A68';       // Medical green overcoat
        clothDetail = '#E6E1D8';    // White physician lapels
        break;

      case 'case-3': // Prof. Daniel Ruiz (Historian, 62)
        skinTone = '#d8b08a';
        skinShadow = '#b68962';
        hairCol = '#a6a6a6';       // Grey/silver hair
        hairHighlight = '#cccccc';
        clothCol = '#5d4037';       // Tweed vest
        clothDetail = '#8d6e63';
        break;

      case 'case-4': // Valeria Ortiz (AI Developer, 29)
        skinTone = '#cca078';
        skinShadow = '#a87a52';
        hairCol = '#212121';
        hairHighlight = '#3b3b3b';
        clothCol = '#26324A';       // Tech jacket
        clothDetail = '#7653A6';    // Violet cyber keycard badge
        break;

      case 'case-5': // Samuel Chen (Parts Trader, 45)
        skinTone = '#deb887';
        skinShadow = '#bd9362';
        hairCol = '#1a1a1a';
        hairHighlight = '#333333';
        clothCol = '#383838';       // Heavy industrial trader coat
        clothDetail = '#E58A3A';    // Amber sensor clasps
        break;

      case 'case-6': // Clara Santos (Nursing Student, 21)
        skinTone = '#e8c4a2';
        skinShadow = '#c69d7a';
        hairCol = '#533c30';
        hairHighlight = '#705344';
        clothCol = '#7b1fa2';       // Purple knitted scarf/sweater
        clothDetail = '#E6E1D8';
        break;

      case 'case-7': // Dra. Inés Aranda (Chief Scientist, 53)
        skinTone = '#dfb992';
        skinShadow = '#bd9168';
        hairCol = '#45403c';        // Dark with silver streak
        hairHighlight = '#c0b8b0';
        clothCol = '#E6E1D8';       // Clinical trench coat
        clothDetail = '#7653A6';    // Encrypted drive glow
        break;
    }

    // IF PERCEPTION IS ALTERED BY LINA (Directiva P-72):
    // Cold sallow skin, deep bruised violet shadows, hostile crimson glint
    if (isAltered) {
      skinTone = '#78647b';       // Cold purplish sallow tint
      skinShadow = '#452c48';     // Deep bruised shadow
      clothCol = '#1b1224';       // Darkened hostile silhouette
      clothDetail = '#A94442';    // Scarlet danger accents
      eyeCol = '#A94442';         // Hostile glint
    }

    // -------------------------------------------------------------
    // 1. Shoulders & Torso (Wide, Natural Human Proportions: 170-190px wide)
    // -------------------------------------------------------------
    let shoulderW = 176;
    if (caseData.id === 'case-1' || caseData.id === 'case-5') shoulderW = 186; // Broad working men
    if (caseData.id === 'case-6') shoulderW = 162; // Petite student
    const halfSW = Math.floor(shoulderW / 2);

    ctx.fillStyle = clothCol;
    // Main Torso block reaching down to counter at Y: 195
    ctx.fillRect(cx - halfSW + 6, by + 46, shoulderW - 12, 195 - (by + 46));
    // Shoulder slope caps
    ctx.fillRect(cx - halfSW, by + 58, 6, 195 - (by + 58));
    ctx.fillRect(cx + halfSW - 6, by + 58, 6, 195 - (by + 58));
    // Trapezoid neck-to-shoulder slope
    ctx.beginPath();
    ctx.moveTo(cx - 20, by + 34);
    ctx.lineTo(cx - halfSW + 6, by + 48);
    ctx.lineTo(cx + halfSW - 6, by + 48);
    ctx.lineTo(cx + 20, by + 34);
    ctx.closePath();
    ctx.fill();

    // Collar / Lapels & Chest opening
    ctx.fillStyle = clothDetail;
    ctx.fillRect(cx - 20, by + 40, 40, 42);
    ctx.fillStyle = clothCol;
    ctx.fillRect(cx - 10, by + 44, 20, 38);

    // Character-Specific Torso Details
    if (caseData.id === 'case-1') {
      // High-visibility harness straps
      ctx.fillStyle = isAltered ? '#A94442' : '#E58A3A';
      ctx.fillRect(cx - 38, by + 44, 10, 195 - (by + 44));
      ctx.fillRect(cx + 28, by + 44, 10, 195 - (by + 44));
      // Reflective silver tape crossbar
      ctx.fillStyle = '#E6E1D8';
      ctx.fillRect(cx - 38, by + 76, 10, 5);
      ctx.fillRect(cx + 28, by + 76, 10, 5);
      // Tool clasp
      ctx.fillStyle = '#78909c';
      ctx.fillRect(cx - 5, by + 68, 10, 8);
    } else if (caseData.id === 'case-2') {
      // Stethoscope
      ctx.fillStyle = isAltered ? '#452c48' : '#b0bec5';
      ctx.fillRect(cx - 26, by + 46, 52, 4);
      ctx.fillRect(cx - 16, by + 50, 32, 28);
      ctx.fillStyle = '#78909c';
      ctx.fillRect(cx - 6, by + 78, 12, 10); // Bell
    } else if (caseData.id === 'case-3') {
      // White shirt collar & crimson academic tie
      ctx.fillStyle = '#E6E1D8';
      ctx.fillRect(cx - 10, by + 42, 20, 16);
      ctx.fillStyle = isAltered ? '#A94442' : '#8b0000';
      ctx.fillRect(cx - 5, by + 50, 10, 36);
      // Books held at counter level
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(cx - 35, 185, 70, 12);
      ctx.fillStyle = '#d4af37'; // Gold spine trim
      ctx.fillRect(cx - 33, 188, 66, 2);
    } else if (caseData.id === 'case-4') {
      // Cyber keycard lanyard & security badge
      ctx.fillStyle = isAltered ? '#A94442' : '#7653A6';
      ctx.fillRect(cx - 24, by + 66, 16, 24);
      ctx.fillStyle = '#E58A3A'; // Chip
      ctx.fillRect(cx - 21, by + 72, 10, 8);
      // Lanyard strap
      ctx.strokeStyle = '#7653A6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 10, by + 46);
      ctx.lineTo(cx - 18, by + 66);
      ctx.stroke();
    } else if (caseData.id === 'case-5') {
      // Rugged shearling coat collar
      ctx.fillStyle = isAltered ? '#452c48' : '#555555';
      ctx.fillRect(cx - 48, by + 44, 96, 12);
      // Holding sensor hardware module on counter
      ctx.fillStyle = '#26324A';
      ctx.fillRect(cx + 28, 182, 22, 14);
      ctx.fillStyle = '#E58A3A';
      ctx.fillRect(cx + 34, 185, 10, 8);
    } else if (caseData.id === 'case-6') {
      // Thick knitted purple wool scarf wrap
      ctx.fillStyle = isAltered ? '#452c48' : '#8e24aa';
      ctx.fillRect(cx - 28, by + 38, 56, 20);
      ctx.fillRect(cx - 20, by + 58, 18, 30); // Scarf tail
      ctx.fillStyle = '#ab47bc'; // Stitch texture
      for (let s = -24; s < 24; s += 6) {
        ctx.fillRect(cx + s, by + 44, 3, 2);
      }
    } else if (caseData.id === 'case-7') {
      // Scientist holding glowing encrypted data drive
      ctx.fillStyle = '#26324A';
      ctx.fillRect(cx + 34, 178, 22, 18); // Hand
      // Glowing purple encrypted data drive
      const driveGlow = Math.sin(this.tick * 0.1) > 0;
      ctx.fillStyle = driveGlow ? '#d1b8f0' : '#7653A6';
      ctx.fillRect(cx + 38, 180, 14, 14);
      ctx.fillStyle = '#ffffff'; // Status LED
      ctx.fillRect(cx + 43, 182, 4, 3);
    }

    // -------------------------------------------------------------
    // 2. Neck (Sturdy, proportional: 28px wide)
    // -------------------------------------------------------------
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 14, by + 26, 28, 18);

    // -------------------------------------------------------------
    // 3. Head & Facial Structure (54px wide x 52px tall, Natural Rounded Skull)
    // -------------------------------------------------------------
    ctx.fillStyle = skinTone;
    // Cranium & Mid-face
    ctx.fillRect(cx - 27, by - 24, 54, 46);
    // Lower jaw & Chin curve
    ctx.fillRect(cx - 22, by + 20, 44, 8);
    ctx.fillRect(cx - 16, by + 26, 32, 4);

    // Jawline shadow
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 24, by + 22, 48, 6);
    ctx.fillRect(cx - 16, by + 26, 32, 4);

    // Ears on sides of head
    ctx.fillStyle = skinTone;
    ctx.fillRect(cx - 30, by - 2, 4, 16);
    ctx.fillRect(cx + 26, by - 2, 4, 16);
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 29, by + 2, 2, 8);
    ctx.fillRect(cx + 27, by + 2, 2, 8);

    // If perception is altered: harsh downward shadow under brows and cheek hollows
    if (isAltered) {
      ctx.fillStyle = skinShadow;
      ctx.fillRect(cx - 27, by - 4, 54, 10);  // Deep eye socket hollow
      ctx.fillRect(cx - 24, by + 10, 48, 10); // Hollow cheeks
      ctx.fillRect(cx - 18, by + 20, 36, 8);  // Tense jaw
    }

    // -------------------------------------------------------------
    // 4. Hair Volume & Hairstyle
    // -------------------------------------------------------------
    ctx.fillStyle = hairCol;
    // Hair Crown Volume (Sits on top of skull, 58px wide)
    ctx.fillRect(cx - 29, by - 31, 58, 16);
    ctx.fillRect(cx - 31, by - 18, 6, 30);  // Left sideburn
    ctx.fillRect(cx + 25, by - 18, 6, 30);  // Right sideburn

    // Hair texture highlights
    ctx.fillStyle = hairHighlight;
    ctx.fillRect(cx - 24, by - 30, 46, 4);

    // Specific Hairstyle variations
    if (caseData.id === 'case-1') {
      // Mateo: Stubble shadow along jaw
      ctx.fillStyle = isAltered ? '#452c48' : '#9e6c48';
      ctx.fillRect(cx - 18, by + 22, 36, 6);
      ctx.fillRect(cx - 12, by + 28, 24, 3);
    } else if (caseData.id === 'case-2') {
      // Elena: Neat physician bun & parted bangs
      ctx.fillStyle = hairCol;
      ctx.fillRect(cx - 16, by - 37, 32, 8); // Top bun
      ctx.fillRect(cx - 32, by - 8, 8, 38);
      ctx.fillRect(cx + 24, by - 8, 8, 38);
    } else if (caseData.id === 'case-3') {
      // Daniel: Receding crown with bald top and silver side volume
      ctx.fillStyle = skinTone;
      ctx.fillRect(cx - 16, by - 31, 32, 10); // Bald forehead
      ctx.fillStyle = hairCol;
      ctx.fillRect(cx - 34, by - 14, 10, 26);
      ctx.fillRect(cx + 24, by - 14, 10, 26);
    } else if (caseData.id === 'case-4') {
      // Valeria: Sharp bob with side bangs
      ctx.fillStyle = hairCol;
      ctx.fillRect(cx - 33, by - 12, 10, 44);
      ctx.fillRect(cx + 23, by - 12, 10, 44);
      ctx.fillRect(cx - 22, by - 22, 18, 8); // Angled bangs
    } else if (caseData.id === 'case-5') {
      // Samuel: Eyebrow scar
      ctx.fillStyle = skinShadow;
      ctx.fillRect(cx - 16, by - 2, 4, 8);
    } else if (caseData.id === 'case-6') {
      // Clara: Long wavy chestnut hair tumbling over shoulders
      ctx.fillStyle = hairCol;
      ctx.fillRect(cx - 34, by - 8, 12, 54);
      ctx.fillRect(cx + 22, by - 8, 12, 54);
    } else if (caseData.id === 'case-7') {
      // Inés: Signature distinguished silver streak
      ctx.fillStyle = '#E6E1D8';
      ctx.fillRect(cx - 20, by - 31, 8, 24);
    }

    // -------------------------------------------------------------
    // 5. Eyebrows
    // -------------------------------------------------------------
    ctx.fillStyle = hairCol;
    if (isAltered) {
      // Threat state: aggressively angled downward brows
      ctx.fillRect(cx - 21, by + 1, 16, 4);
      ctx.fillRect(cx - 7, by + 4, 4, 3);
      ctx.fillRect(cx + 3, by + 4, 4, 3);
      ctx.fillRect(cx + 5, by + 1, 16, 4);
    } else {
      // Natural human brows
      ctx.fillRect(cx - 20, by + 1, 14, 3);
      ctx.fillRect(cx + 6, by + 1, 14, 3);
    }

    // -------------------------------------------------------------
    // 6. Eyes (Proportional: 12px wide, 7px tall, separated by 14px bridge)
    // -------------------------------------------------------------
    if (this.isBlinking) {
      // Natural blink: closed eyelid crease
      ctx.fillStyle = skinShadow;
      ctx.fillRect(cx - 19, by + 7, 13, 3);
      ctx.fillRect(cx + 6, by + 7, 13, 3);
    } else if (isAltered) {
      // Tense, narrowed, hostile slit eyes with crimson/amber threat glint
      ctx.fillStyle = '#35161c';
      ctx.fillRect(cx - 20, by + 6, 14, 5);
      ctx.fillRect(cx + 6, by + 6, 14, 5);

      ctx.fillStyle = eyeCol;
      ctx.fillRect(cx - 15, by + 7, 6, 3);
      ctx.fillRect(cx + 9, by + 7, 6, 3);

      // Red specular threat glint
      ctx.fillStyle = '#ff5252';
      ctx.fillRect(cx - 14, by + 7, 2, 2);
      ctx.fillRect(cx + 10, by + 7, 2, 2);
    } else {
      // Natural eyes with Warm White sclera
      ctx.fillStyle = '#E6E1D8';
      ctx.fillRect(cx - 19, by + 5, 13, 8);
      ctx.fillRect(cx + 6, by + 5, 13, 8);

      // Iris & Pupil (6x6)
      ctx.fillStyle = eyeCol;
      ctx.fillRect(cx - 16, by + 6, 7, 6);
      ctx.fillRect(cx + 9, by + 6, 7, 6);

      // Specular white catchlight pip (2x2)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 15, by + 6, 2, 2);
      ctx.fillRect(cx + 10, by + 6, 2, 2);
    }

    // Spectacles for Prof. Daniel Ruiz (Case 3)
    if (caseData.id === 'case-3') {
      ctx.strokeStyle = isAltered ? '#A94442' : '#E58A3A';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 21, by + 3, 16, 11);
      ctx.strokeRect(cx + 5, by + 3, 16, 11);
      ctx.fillRect(cx - 6, by + 8, 12, 2); // Bridge
    }

    // -------------------------------------------------------------
    // 7. Nose (Bridge & Nostril wings)
    // -------------------------------------------------------------
    ctx.fillStyle = skinShadow;
    ctx.fillRect(cx - 2, by + 10, 5, 12);
    ctx.fillRect(cx - 5, by + 20, 11, 4);

    // -------------------------------------------------------------
    // 8. Mouth & Lips
    // -------------------------------------------------------------
    if (isAltered) {
      // Harsh downturned sinister grimace
      ctx.fillStyle = '#3a1b24';
      ctx.fillRect(cx - 11, by + 28, 22, 3);
      ctx.fillRect(cx - 13, by + 30, 4, 3);
      ctx.fillRect(cx + 9, by + 30, 4, 3);
    } else {
      // Natural human mouth line with lip shadow
      ctx.fillStyle = '#8f5c49';
      ctx.fillRect(cx - 10, by + 27, 20, 3);
      ctx.fillStyle = skinShadow;
      ctx.fillRect(cx - 7, by + 30, 14, 2); // Lower lip shadow
    }
  }
}

// Global instance
window.pixelRenderer = new PixelRenderer();