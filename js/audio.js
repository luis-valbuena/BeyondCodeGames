/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Procedural Audio Engine (Web Audio API Synthesizer)
 * 
 * Redesigned for a comfortable, non-fatiguing, atmospheric surveillance soundscape:
 *  - Warm, low-frequency ambient drone (smooth sub-bass pads, zero harsh frequencies).
 *  - Removed the repetitive 1-second pulse and removed piercing telemetry beeps.
 *  - Soft, quiet mechanical tactile typewriter keystrokes (no buzzing or screeching).
 *  - Calibrated volume levels and soft-attack envelopes across all sound effects.
 *  - 100% offline, zero external dependencies.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isBgmRunning = false;
    this.currentTension = 1; // 1 to 4

    // Ambient loop nodes
    this.droneNodes = [];
    this.noiseNode = null;
    
    // Typewriter throttle
    this.lastTypeTime = 0;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn("Web Audio API not supported on this browser.");
      return;
    }
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.40, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    this.bgmGain.connect(this.masterGain);
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // =========================================================================
  // CONTEXTUAL SOUND EFFECTS (Warm, soft, non-intrusive)
  // =========================================================================

  // Soft tactile mechanical keystroke (quiet, low-frequency, non-fatiguing)
  playTypewriterChar() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = Date.now();
    if (now - this.lastTypeTime < 65) return; // Gentle throttle
    this.lastTypeTime = now;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm, muted wooden/tactile click (240 - 320 Hz)
    osc.type = 'triangle';
    const pitch = 240 + Math.random() * 80;
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.02);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);
    filter.Q.setValueAtTime(0.7, t);

    // Very quiet level
    gain.gain.setValueAtTime(0.018, t);
    gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.022);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.022);
  }

  // Dialogue line advance (soft pleasant chirp)
  playDialogueNext() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, t);
    osc.frequency.exponentialRampToValueAtTime(540, t + 0.06);

    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Physical document delivery / slide onto inspector's desk (gentle paper friction)
  playDocSlide() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Warm friction noise (paper sliding)
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.16);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(350, t + 0.15);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.10, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.002, t + 0.16);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);

    // 2. Soft muffled desk placement tap
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, t + 0.03);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.14);

    oscGain.gain.setValueAtTime(0.09, t + 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(t + 0.03);
    osc.stop(t + 0.14);
  }

  // Footsteps & arrival of person at checkpoint
  playArrival() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Soft, deep muffled footsteps
    for (let i = 0; i < 3; i++) {
      const stepTime = t + i * 0.22;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(70 + i * 6, stepTime);
      osc.frequency.exponentialRampToValueAtTime(32, stepTime + 0.09);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, stepTime);

      gain.gain.setValueAtTime(0.12, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(stepTime);
      osc.stop(stepTime + 0.1);
    }

    // Soft pneumatic air cushion (gentle, warm)
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, t + 0.1);
    filter.frequency.exponentialRampToValueAtTime(250, t + 0.35);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, t + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t + 0.1);
  }

  // Document paper rustle (open)
  playDocFlick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, t);
    filter.Q.setValueAtTime(1.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.002, t + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(t);
  }

  // Document modal close
  playDocClose() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.07);

    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // LINA AI scanning sound: smooth atmospheric chords (warm, non-screeching)
  playScanTone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Pleasant low-mid chord notes (F#3, A3, C#4)
    const notes = [185, 220, 277.18, 370];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const noteTime = t + idx * 0.08;
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.045, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.22);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.22);
    });
  }

  // LINA AI result ready chime (warm two-tone harmonic chime)
  playLinaReady() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [440, 554.37]; // A4 and C#5 (smooth major third)
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const noteTime = t + idx * 0.09;
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.065, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
  }

  // Institutional admission chime (warm, gentle ascending triad)
  playAdmitChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [392.00, 493.88, 587.33]; // G4, B4, D5 (Warm G Major)
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const noteTime = t + idx * 0.09;
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.09, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  }

  // Bureaucratic rejection tone (deep, muted administrative double-tone, NOT a harsh buzzer)
  playRejectBuzzer() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const pulseTime = t + i * 0.14;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(125, pulseTime);
      osc.frequency.exponentialRampToValueAtTime(85, pulseTime + 0.11);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, pulseTime);

      gain.gain.setValueAtTime(0.14, pulseTime);
      gain.gain.exponentialRampToValueAtTime(0.001, pulseTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(pulseTime);
      osc.stop(pulseTime + 0.12);
    }
  }

  // Barrier gate transition
  playGateCycle(admitted = true) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(105, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.35);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.38);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.38);

    // Muffled air depressurization
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.3);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.10;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t + 0.05);
    filter.frequency.exponentialRampToValueAtTime(180, t + 0.32);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, t + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t + 0.05);
  }

  // Perception shift glitch sound (low digital flutter, non-piercing)
  playGlitchTone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.setValueAtTime(95, t + 0.06);
    osc.frequency.setValueAtTime(210, t + 0.12);
    osc.frequency.setValueAtTime(70, t + 0.18);

    gain.gain.setValueAtTime(0.10, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  // Shift completion fanfare / atmospheric chime
  playShiftEnd() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const chords = [
      [220, 261.63, 329.63], // A minor
      [174.61, 220, 261.63], // F major
      [164.81, 196, 246.94]  // E minor
    ];

    chords.forEach((chord, cIdx) => {
      const chordTime = t + cIdx * 0.32;
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chordTime);

        gain.gain.setValueAtTime(0.07, chordTime);
        gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 0.48);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(chordTime);
        osc.stop(chordTime + 0.48);
      });
    });
  }

  // UI button click / tap (soft tactile wooden-plastic tap)
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(360, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.035);

    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.035);
  }

  // =========================================================================
  // COMFORTABLE PROCEDURAL SURVEILLANCE AMBIENT BGM
  // Deep, soothing, dark atmospheric drone — no repetitive 1s thumping, no screechy beeps.
  // =========================================================================
  startBGM(tension = 1) {
    this.currentTension = tension;
    if (this.isBgmRunning) {
      this.updateBgmTension(tension);
      return;
    }
    this.ensureContext();
    if (!this.ctx) return;

    this.isBgmRunning = true;
    const t = this.ctx.currentTime;

    // Deep sub-bass and warm harmonic tones (G1: 49 Hz, D2: 73.4 Hz, G2: 98 Hz, Bb2: 116.5 Hz)
    const baseFreqs = [49.0, 73.42, 98.0, 116.54];
    this.droneNodes = [];

    baseFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const nodeGain = this.ctx.createGain();

      osc.type = (i === 0 || i === 1) ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      // Low, gentle non-resonant lowpass filter (warm and smooth)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(110 + tension * 25, t);
      filter.Q.setValueAtTime(0.6, t);

      // Very slow organic breathing (18 to 30 second cycle)
      lfo.frequency.setValueAtTime(0.035 + i * 0.015, t);
      lfoGain.gain.setValueAtTime(15 + tension * 5, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Balanced per-voice gain
      const voiceVol = (i === 0) ? 0.28 : 0.16;
      nodeGain.gain.setValueAtTime(voiceVol, t);

      osc.connect(filter);
      filter.connect(nodeGain);
      nodeGain.connect(this.bgmGain);

      osc.start(t);
      lfo.start(t);

      this.droneNodes.push({ osc, filter, lfo, nodeGain });
    });

    // Gentle quiet room air circulation whisper (soft pinkish low hum)
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 2.0);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.06;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(160, t);

      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.015, t);

      noise.connect(noiseFilter);
      noiseFilter.connect(nGain);
      nGain.connect(this.bgmGain);
      noise.start(t);

      this.noiseNode = { noise, noiseFilter, nGain };
    } catch (e) {}
  }

  updateBgmTension(tension) {
    this.currentTension = tension;
    if (!this.ctx || !this.isBgmRunning) return;
    const t = this.ctx.currentTime;

    const cutoff = 110 + tension * 30;
    this.droneNodes.forEach((obj) => {
      obj.filter.frequency.exponentialRampToValueAtTime(cutoff, t + 2.0);
    });

    if (this.bgmGain) {
      const vol = 0.12 + tension * 0.02;
      this.bgmGain.gain.setValueAtTime(vol, t);
    }
  }

  duckBGM(duck = true) {
    if (!this.ctx || !this.bgmGain) return;
    const t = this.ctx.currentTime;
    const target = duck ? 0.05 : (0.12 + this.currentTension * 0.02);
    this.bgmGain.gain.setTargetAtTime(target, t, 0.4);
  }

  stopBGM() {
    if (!this.isBgmRunning) return;

    this.droneNodes.forEach(obj => {
      try {
        obj.osc.stop();
        obj.lfo.stop();
      } catch (e) {}
    });
    this.droneNodes = [];

    if (this.noiseNode) {
      try {
        this.noiseNode.noise.stop();
      } catch (e) {}
      this.noiseNode = null;
    }

    this.isBgmRunning = false;
  }
}

// Global instance
window.soundEngine = new SoundEngine();
