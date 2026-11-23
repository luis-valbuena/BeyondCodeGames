/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Audio Engine (Web Audio API Procedural Synthesizer)
 * Pure procedural synthesis — Zero external dependencies, 100% offline.
 * Enhanced dynamic sound design pass: multi-layer transients, FM telemetry,
 * textured footsteps, dynamic gate acoustics & responsive ambient drone.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmGain = null;
    this.sfxGain = null;
    this.masterGain = null;
    this.bgmNodes = [];
    this.isBgmRunning = false;
    this.currentTension = 1; // 1 to 4
    this.heartbeatTimer = null;
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
    this.sfxGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
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

  // --- DYNAMIC SOUND EFFECTS ---

  /**
   * Footsteps / arrival of person
   * Multi-layer: Heel thump (low sine) + sole scuff (bandpass noise)
   * With random pitch jitter, stereo panning (L/R) and realistic deceleration cadence.
   */
  playArrival() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const stepCount = 3;
    const intervals = [0.0, 0.22, 0.48]; // Decelerating cadence as person halts

    for (let i = 0; i < stepCount; i++) {
      const stepTime = t + intervals[i];
      const panVal = (i % 2 === 0 ? -0.28 : 0.28) * (1 - i * 0.2); // Alternating stereo pan
      const pitchJitter = 1.0 + (Math.random() * 0.16 - 0.08);

      // Panner (StereoPannerNode or fallback)
      let panNode = null;
      if (typeof this.ctx.createStereoPanner === 'function') {
        panNode = this.ctx.createStereoPanner();
        panNode.pan.setValueAtTime(panVal, stepTime);
        panNode.connect(this.sfxGain);
      }

      const dest = panNode || this.sfxGain;

      // Component 1: Low-frequency heel impact thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      const startFreq = (95 + i * 8) * pitchJitter;
      osc.frequency.setValueAtTime(startFreq, stepTime);
      osc.frequency.exponentialRampToValueAtTime(32, stepTime + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, stepTime);

      gain.gain.setValueAtTime(0.24, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(stepTime);
      osc.stop(stepTime + 0.1);

      // Component 2: Textured leather sole friction / pavement scuff (filtered noise)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        data[j] = (Math.random() * 2 - 1) * 0.4;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1600 * pitchJitter, stepTime + 0.01);
      noiseFilter.Q.setValueAtTime(2.5, stepTime + 0.01);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, stepTime + 0.01);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.05);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(dest);

      noise.start(stepTime + 0.01);
    }
  }

  /**
   * Document paper rustle / flick
   * Two-phase: High-frequency paper slide + subtle desk landing tap.
   */
  playDocFlick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const jitter = 1.0 + (Math.random() * 0.14 - 0.07);

    // Phase 1: Crisp paper slide/friction
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.09);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400 * jitter, t);
    filter.frequency.exponentialRampToValueAtTime(1100 * jitter, t + 0.08);
    filter.Q.setValueAtTime(3.2, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.09);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(t);

    // Phase 2: Gentle desk landing tap (paper dropping onto physical mat)
    const tapOsc = this.ctx.createOscillator();
    const tapGain = this.ctx.createGain();
    tapOsc.type = 'sine';
    tapOsc.frequency.setValueAtTime(190 * jitter, t + 0.03);
    tapOsc.frequency.exponentialRampToValueAtTime(60, t + 0.07);

    tapGain.gain.setValueAtTime(0.18, t + 0.03);
    tapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    tapOsc.connect(tapGain);
    tapGain.connect(this.sfxGain);
    tapOsc.start(t + 0.03);
    tapOsc.stop(t + 0.09);
  }

  /**
   * LINA AI scanning telemetry: Cold futuristic biometric sweep.
   * Multi-frequency FM telemetry chirps + sweeping resonant filter.
   */
  playScanTone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Layer 1: Sweeping FM carrier / radar chirp
    const carrier = this.ctx.createOscillator();
    const modulator = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const carrierGain = this.ctx.createGain();
    const bandFilter = this.ctx.createBiquadFilter();

    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(750, t);
    carrier.frequency.exponentialRampToValueAtTime(1900, t + 0.28);

    modulator.type = 'triangle';
    modulator.frequency.setValueAtTime(55, t);
    modGain.gain.setValueAtTime(140, t);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);

    bandFilter.type = 'bandpass';
    bandFilter.frequency.setValueAtTime(1100, t);
    bandFilter.frequency.exponentialRampToValueAtTime(2200, t + 0.28);
    bandFilter.Q.setValueAtTime(6.0, t);

    carrierGain.gain.setValueAtTime(0.18, t);
    carrierGain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

    carrier.connect(bandFilter);
    bandFilter.connect(carrierGain);
    carrierGain.connect(this.sfxGain);

    carrier.start(t);
    modulator.start(t);
    carrier.stop(t + 0.32);
    modulator.stop(t + 0.32);

    // Layer 2: Rapid digital data telemetry arpeggio (LINA quantum calculations)
    const telemetryPitches = [880, 1174, 1480, 1760, 2349];
    telemetryPitches.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      const noteTime = t + 0.06 + idx * 0.045;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      g.gain.setValueAtTime(0.14, noteTime);
      g.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.06);

      osc.connect(g);
      g.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.07);
    });
  }

  /**
   * Institutional admission chime:
   * Harmonically rich euphonic C-Major chord + resonant warm sub-bass confirmation body.
   */
  playAdmitChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Harmonic bell chord: C5, E5, G5, B5, C6 (clean, optimistic, institutional)
    const chordNotes = [
      { f: 523.25, delay: 0.00, dur: 0.55, vol: 0.22 },
      { f: 659.25, delay: 0.07, dur: 0.55, vol: 0.24 },
      { f: 783.99, delay: 0.14, dur: 0.60, vol: 0.26 },
      { f: 987.77, delay: 0.21, dur: 0.65, vol: 0.20 },
      { f: 1046.50, delay: 0.28, dur: 0.75, vol: 0.28 }
    ];

    chordNotes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + note.delay;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, noteTime);

      // Bell envelope (quick attack, natural logarithmic decay)
      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(note.vol, noteTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + note.dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + note.dur);
    });

    // Deep warm sub-bass confirmation wave (gives physical weight to authorization)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(130.81, t);
    subOsc.frequency.exponentialRampToValueAtTime(65.41, t + 0.45);

    subGain.gain.setValueAtTime(0.26, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(t);
    subOsc.stop(t + 0.52);
  }

  /**
   * Bureaucratic rejection buzzer:
   * Heavy authoritarian alert: Dual detuned harsh sawtooth + sub-bass slam + mechanical circuit breaker snap.
   */
  playRejectBuzzer() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Component 1: Dual detuned sawtooth oscillators producing an aggressive beating buzz
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const buzzFilter = this.ctx.createBiquadFilter();
    const buzzGain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(92, t);
    osc1.frequency.setValueAtTime(80, t + 0.14);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(98.5, t); // Detuned for harsh dissonance
    osc2.frequency.setValueAtTime(85.5, t + 0.14);

    buzzFilter.type = 'lowpass';
    buzzFilter.frequency.setValueAtTime(1200, t);
    buzzFilter.frequency.exponentialRampToValueAtTime(500, t + 0.35);

    buzzGain.gain.setValueAtTime(0.38, t);
    buzzGain.gain.setValueAtTime(0.38, t + 0.28);
    buzzGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc1.connect(buzzFilter);
    osc2.connect(buzzFilter);
    buzzFilter.connect(buzzGain);
    buzzGain.connect(this.sfxGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.45);
    osc2.stop(t + 0.45);

    // Component 2: Sub-bass punch (55Hz) - industrial electrical relay hit
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(55, t);
    subOsc.frequency.exponentialRampToValueAtTime(30, t + 0.25);

    subGain.gain.setValueAtTime(0.42, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(t);
    subOsc.stop(t + 0.32);

    // Component 3: Mechanical relay transient snap
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'square';
    snapOsc.frequency.setValueAtTime(1800, t);
    snapOsc.frequency.exponentialRampToValueAtTime(200, t + 0.02);

    snapGain.gain.setValueAtTime(0.2, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    snapOsc.connect(snapGain);
    snapGain.connect(this.sfxGain);
    snapOsc.start(t);
    snapOsc.stop(t + 0.03);
  }

  /**
   * Heavy hydraulic barrier gate cycle:
   * 3 phases: High-pressure pneumatic release hiss, heavy sliding iron gate friction,
   * and distinct latch lock (smooth hydraulic release on admit, violent clang on reject).
   */
  playGateCycle(admitted = true) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Phase 1: High-pressure pneumatic air release hiss
    const hissDuration = admitted ? 0.35 : 0.45;
    const bufferSize = Math.floor(this.ctx.sampleRate * hissDuration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(admitted ? 1200 : 850, t);
    noiseFilter.frequency.exponentialRampToValueAtTime(350, t + hissDuration);
    noiseFilter.Q.setValueAtTime(3.0, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.28, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + hissDuration);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);

    // Phase 2: Heavy sliding iron gate groan
    const slideOsc = this.ctx.createOscillator();
    const slideGain = this.ctx.createGain();
    slideOsc.type = 'triangle';
    slideOsc.frequency.setValueAtTime(admitted ? 90 : 130, t + 0.08);
    slideOsc.frequency.exponentialRampToValueAtTime(admitted ? 140 : 45, t + 0.35);

    slideGain.gain.setValueAtTime(0.25, t + 0.08);
    slideGain.gain.exponentialRampToValueAtTime(0.01, t + 0.38);

    slideOsc.connect(slideGain);
    slideGain.connect(this.sfxGain);
    slideOsc.start(t + 0.08);
    slideOsc.stop(t + 0.4);

    // Phase 3: Heavy magnetic latch strike thud
    const lockTime = t + (admitted ? 0.32 : 0.28);
    const lockOsc = this.ctx.createOscillator();
    const lockGain = this.ctx.createGain();
    lockOsc.type = admitted ? 'sine' : 'sawtooth';
    lockOsc.frequency.setValueAtTime(admitted ? 180 : 75, lockTime);
    lockOsc.frequency.exponentialRampToValueAtTime(admitted ? 70 : 25, lockTime + 0.15);

    lockGain.gain.setValueAtTime(admitted ? 0.22 : 0.45, lockTime);
    lockGain.gain.exponentialRampToValueAtTime(0.001, lockTime + 0.2);

    lockOsc.connect(lockGain);
    lockGain.connect(this.sfxGain);
    lockOsc.start(lockTime);
    lockOsc.stop(lockTime + 0.22);
  }

  /**
   * Perception shift glitch sound:
   * Chilling CRT flyback whine + descending pitch-dive + crackling static burst.
   */
  playGlitchTone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Component 1: CRT flyback whine & dive
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(3200, t);
    osc.frequency.exponentialRampToValueAtTime(240, t + 0.08);
    osc.frequency.setValueAtTime(560, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.28);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.33);

    // Component 2: Crackling static burst
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() > 0.85 ? (Math.random() * 2 - 1) : 0) * 0.6;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(2500, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);
  }

  /**
   * UI tactile button click / console key
   */
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1100, t);
    osc.frequency.exponentialRampToValueAtTime(350, t + 0.035);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  // --- AMBIENT BGM ENGINE (Procedural Dystopian Synth Drone with Heartbeat Pulse) ---

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
    this.bgmNodes = [];

    // Layer 1: Dark drone chords (C minor ambient - C2, G2, Eb3)
    const droneFreqs = [65.41, 98.0, 155.56];
    droneFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(190 + tension * 45, t);

      // Slow organic breath modulation
      lfo.frequency.setValueAtTime(0.09 + idx * 0.04, t);
      lfoGain.gain.setValueAtTime(25 + tension * 10, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc.connect(filter);
      filter.connect(this.bgmGain);

      osc.start(t);
      lfo.start(t);

      this.bgmNodes.push({ osc, filter, lfo });
    });

    // Layer 2: Electrical ground hum (50Hz hum with soft harmonic)
    const humOsc = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    humOsc.type = 'sine';
    humOsc.frequency.setValueAtTime(50.0, t);
    humGain.gain.setValueAtTime(0.08, t);
    humOsc.connect(humGain);
    humGain.connect(this.bgmGain);
    humOsc.start(t);
    this.bgmNodes.push({ osc: humOsc });

    // Layer 3: Hypnotic 54 BPM low heartbeat throb pulse
    this.startHeartbeatLoop();
  }

  startHeartbeatLoop() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    // 54 BPM = ~1.11 seconds per beat
    const intervalMs = 1110;
    this.heartbeatTimer = setInterval(() => {
      if (!this.isBgmRunning || this.isMuted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Sub-bass thump (Lub)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(58, t);
        osc.frequency.exponentialRampToValueAtTime(28, t + 0.14);

        const vol = 0.12 + this.currentTension * 0.035;
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(t);
        osc.stop(t + 0.2);

        // Secondary softer thump (Dub) 0.22s later
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(48, t + 0.22);
        osc2.frequency.exponentialRampToValueAtTime(24, t + 0.34);

        gain2.gain.setValueAtTime(vol * 0.65, t + 0.22);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.36);

        osc2.connect(gain2);
        gain2.connect(this.bgmGain);

        osc2.start(t + 0.22);
        osc2.stop(t + 0.38);
      } catch (e) {}
    }, intervalMs);
  }

  updateBgmTension(tension) {
    this.currentTension = tension;
    if (!this.ctx || !this.isBgmRunning) return;
    const t = this.ctx.currentTime;

    // Filter opens up as tension mounts
    const cutoff = 170 + tension * 85;
    this.bgmNodes.forEach(obj => {
      if (obj.filter) {
        obj.filter.frequency.exponentialRampToValueAtTime(cutoff, t + 1.2);
      }
    });

    if (this.bgmGain) {
      const vol = 0.22 + tension * 0.05;
      this.bgmGain.gain.setValueAtTime(vol, t);
    }
  }

  duckBGM(duck = true) {
    if (!this.ctx || !this.bgmGain) return;
    const t = this.ctx.currentTime;
    const target = duck ? 0.08 : (0.22 + this.currentTension * 0.05);
    this.bgmGain.gain.setTargetAtTime(target, t, 0.4);
  }

  stopBGM() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (!this.isBgmRunning) return;
    this.bgmNodes.forEach(obj => {
      try {
        if (obj.osc) obj.osc.stop();
        if (obj.lfo) obj.lfo.stop();
      } catch (e) {}
    });
    this.bgmNodes = [];
    this.isBgmRunning = false;
  }
}

// Global instance
window.soundEngine = new SoundEngine();
