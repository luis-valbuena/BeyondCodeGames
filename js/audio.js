/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Audio Engine (Web Audio API Synthesizer)
 * Pure procedural synthesis — Zero external dependencies, 100% offline.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmGain = null;
    this.sfxGain = null;
    this.masterGain = null;
    this.bgmOscs = [];
    this.isBgmRunning = false;
    this.currentTension = 1; // 1 to 4
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
    this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
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
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1.0, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // --- SOUND EFFECTS ---

  // Footsteps / arrival of person
  playArrival() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const stepTime = t + i * 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80 + i * 10, stepTime);
      osc.frequency.exponentialRampToValueAtTime(30, stepTime + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, stepTime);

      gain.gain.setValueAtTime(0.2, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(stepTime);
      osc.stop(stepTime + 0.1);
    }
  }

  // Document paper rustle / flick
  playDocFlick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.setValueAtTime(3, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(t);
  }

  // LINA AI scanning sound: cold synthetic digital arpeggio
  playScanTone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [440, 660, 880, 1100, 1320, 1760];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const noteTime = t + idx * 0.07;
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.12, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.1);
    });
  }

  // Institutional admission chime
  playAdmitChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major chord ascending
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const noteTime = t + idx * 0.08;
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }

  // Bureaucratic rejection buzzer
  playRejectBuzzer() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.setValueAtTime(95, t + 0.12);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.setValueAtTime(0.3, t + 0.28);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Heavy hydraulic barrier gate
  playGateCycle(admitted = true) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Heavy metallic clank
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.35);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.4);

    // Hydraulic hiss
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t + 0.1);
    filter.frequency.exponentialRampToValueAtTime(300, t + 0.5);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, t + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(t + 0.1);
  }

  // Perception shift glitch sound
  playGlitchTone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.setValueAtTime(120, t + 0.05);
    osc.frequency.setValueAtTime(450, t + 0.1);
    osc.frequency.setValueAtTime(80, t + 0.18);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // UI button click / tap
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  // --- AMBIENT BGM ENGINE (Procedural Dystopian Drone) ---
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

    // Base drone chords (C minor dark ambient)
    // C2 (65.41 Hz), G2 (98 Hz), Eb3 (155.56 Hz)
    const baseFreqs = [65.41, 98.0, 155.56];
    this.bgmOscs = [];

    baseFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220 + tension * 40, t);

      // Subtle slow modulation
      lfo.frequency.setValueAtTime(0.15 + i * 0.08, t);
      lfoGain.gain.setValueAtTime(20, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc.connect(filter);
      filter.connect(this.bgmGain);

      osc.start(t);
      lfo.start(t);

      this.bgmOscs.push({ osc, filter, lfo });
    });
  }

  updateBgmTension(tension) {
    this.currentTension = tension;
    if (!this.ctx || !this.isBgmRunning) return;
    const t = this.ctx.currentTime;

    // Increase cutoff frequency and drone resonance as tension mounts
    const cutoff = 180 + tension * 80;
    this.bgmOscs.forEach((obj, idx) => {
      obj.filter.frequency.exponentialRampToValueAtTime(cutoff, t + 1.5);
    });

    if (this.bgmGain) {
      const vol = 0.2 + tension * 0.04;
      this.bgmGain.gain.setValueAtTime(vol, t);
    }
  }

  duckBGM(duck = true) {
    if (!this.ctx || !this.bgmGain) return;
    const t = this.ctx.currentTime;
    const target = duck ? 0.08 : (0.2 + this.currentTension * 0.04);
    this.bgmGain.gain.setTargetAtTime(target, t, 0.5);
  }

  stopBGM() {
    if (!this.isBgmRunning) return;
    this.bgmOscs.forEach(obj => {
      try {
        obj.osc.stop();
        obj.lfo.stop();
      } catch (e) {}
    });
    this.bgmOscs = [];
    this.isBgmRunning = false;
  }
}

// Global instance
window.soundEngine = new SoundEngine();
