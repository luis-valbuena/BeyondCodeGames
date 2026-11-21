/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * UI Controller, Screen Transitions, Dialogue Engine, Document Viewer & Hotkeys
 * 
 * Features:
 *   - Typewriter effect for visitor dialogues with natural pauses and manual button control
 *   - 7 Mandatory visit phases with progressive document delivery
 *   - Standardized document rendering & in-universe classified archives
 *   - Daily summary report (Informe de cierre del día) with genuine state statistics
 *   - Boss conversation scene (Supervisor José) with dynamic dialogue branching
 *   - Full keyboard shortcuts [1-3, L, A, R, M, Space, Esc]
 */

class UIController {
  constructor() {
    this.currentScreen = 'title';
    this.toastTimer = null;

    // Typewriter state for visitor dialogue
    this.visitorTyping = false;
    this.visitorTypeTimer = null;
    this.visitorFullText = "";
    this.visitorCurrentText = "";
    this.lastDialogueClickTime = 0;

    // Boss scene state
    this.bossDialogues = [];
    this.bossDialogueIndex = 0;
    this.bossTyping = false;
    this.bossTypeTimer = null;
    this.bossFullText = "";
    this.currentShiftCompleted = 1;

    // Cinematic Ending state
    this.endingBeats = [];
    this.endingBeatIndex = 0;
    this.endingTyping = false;
    this.endingTypeTimer = null;
    this.endingFullText = "";
    this.currentEnding = null;
  }

  init() {
    this.bindButtons();
    this.bindKeyboard();

    // Check if there is an in-progress game saved
    const state = window.gameState;
    if (state.history.length > 0 && !state.isCompleted) {
      const continueBtn = document.getElementById('btn-continue-game');
      if (continueBtn) {
        continueBtn.style.display = 'block';
        const total = window.GAME_CASES ? window.GAME_CASES.length : 15;
        continueBtn.innerText = `CONTINUAR TURNO ${state.currentShift} (CASO ${state.currentCaseIndex + 1}/${total})`;
      }
    }
  }

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`${screenId}-screen`);
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId;
    }

    const topBar = document.getElementById('top-bar');
    if (topBar) {
      topBar.style.display = (screenId === 'gameplay') ? 'flex' : 'none';
    }

    // Audio tension adjustments based on screen
    if (screenId === 'title') {
      window.soundEngine.startBGM(1);
    } else if (screenId === 'gameplay') {
      const shift = window.gameState.currentShift;
      window.soundEngine.startBGM(shift);
      window.soundEngine.duckBGM(false);
      this.renderCurrentCase(true);
    } else if (screenId === 'day-summary' || screenId === 'boss-scene' || screenId === 'intermission' || screenId === 'ending') {
      window.soundEngine.duckBGM(true);
    }
  }

  bindButtons() {
    // Title screen
    const newGameBtn = document.getElementById('btn-new-game');
    if (newGameBtn) {
      newGameBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        window.soundEngine.ensureContext();
        window.gameState.clearSave();
        this.showIntroScreen();
      });
    }

    const continueBtn = document.getElementById('btn-continue-game');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        window.soundEngine.ensureContext();
        this.showScreen('gameplay');
      });
    }

    const howToPlayBtn = document.getElementById('btn-how-to-play');
    if (howToPlayBtn) {
      howToPlayBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.openModal('help-modal');
      });
    }

    // Audio toggles
    document.querySelectorAll('.btn-toggle-sound').forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundEngine.ensureContext();
        const isMuted = window.soundEngine.toggleMute();
        this.updateAudioButtonLabels(isMuted);
      });
    });

    // Close buttons on modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.soundEngine.playClick();
        window.soundEngine.playDocClose();
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // Close modal by clicking backdrop
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          window.soundEngine.playClick();
          window.soundEngine.playDocClose();
          modal.classList.remove('active');
        }
      });
    });

    // Visitor Dialogue Advance Button
    const btnAdvDialogue = document.getElementById('btn-dialogue-advance') || document.getElementById('btn-advance-dialogue');
    if (btnAdvDialogue) {
      btnAdvDialogue.addEventListener('click', () => this.handleAdvanceVisitorDialogue());
    }

    // Intro screen buttons
    const btnIntroAdvance = document.getElementById('btn-intro-advance');
    if (btnIntroAdvance) {
      btnIntroAdvance.addEventListener('click', () => this.handleAdvanceIntroDialogue());
    }

    const startShift1Btn = document.getElementById('btn-start-intro');
    if (startShift1Btn) {
      startShift1Btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        window.soundEngine.stopEndingBGM();
        this.showScreen('gameplay');
      });
    }

    // Gameplay decision buttons (ADMIT & REJECT)
    const btnAdmit = document.getElementById('btn-decision-admit');
    if (btnAdmit) {
      btnAdmit.addEventListener('click', () => this.handleDecision('ADMIT'));
    }

    const btnReject = document.getElementById('btn-decision-reject');
    if (btnReject) {
      btnReject.addEventListener('click', () => this.handleDecision('REJECT'));
    }

    // Day Summary Screen: Proceed to Boss Scene
    const btnProceedToBoss = document.getElementById('btn-proceed-to-boss');
    if (btnProceedToBoss) {
      btnProceedToBoss.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.showBossSceneScreen(this.currentShiftCompleted);
      });
    }

    // Boss Scene Advance Button
    const btnBossAdvance = document.getElementById('btn-boss-advance');
    if (btnBossAdvance) {
      btnBossAdvance.addEventListener('click', () => this.handleAdvanceBossDialogue());
    }

    // Boss Scene View Secret Button
    const btnBossSecret = document.getElementById('btn-boss-view-secret');
    if (btnBossSecret) {
      btnBossSecret.addEventListener('click', () => {
        window.soundEngine.playDocFlick();
        const interData = window.NARRATIVE.intermissions[this.currentShiftCompleted];
        if (interData && interData.hasSecret) {
          this.openSecretModal(interData.secretId);
        }
      });
    }

    // Boss Scene: Next Shift Button
    const btnBossNextShift = document.getElementById('btn-boss-next-shift');
    if (btnBossNextShift) {
      btnBossNextShift.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.showScreen('gameplay');
      });
    }

    // Legacy Intermission advance button fallback
    const nextShiftBtn = document.getElementById('btn-advance-shift');
    if (nextShiftBtn) {
      nextShiftBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.showScreen('gameplay');
      });
    }

    // Ending Cinematic Scene Advance Button
    const btnEndingAdvance = document.getElementById('btn-ending-advance');
    if (btnEndingAdvance) {
      btnEndingAdvance.addEventListener('click', () => this.handleAdvanceEndingDialogue());
    }

    // Ending Cinematic: Proceed to Audit and Statistics Screen
    const btnEndingToAudit = document.getElementById('btn-ending-to-audit');
    if (btnEndingToAudit) {
      btnEndingToAudit.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.showEndingScreen(this.currentEnding);
      });
    }

    // Restart game from ending screen
    const btnRestartEnding = document.getElementById('btn-restart-ending');
    if (btnRestartEnding) {
      btnRestartEnding.addEventListener('click', () => {
        window.soundEngine.playClick();
        window.gameState.clearSave();
        this.showScreen('title');
      });
    }
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();

      // Audio toggle [M]
      if (key === 'M') {
        const isMuted = window.soundEngine.toggleMute();
        this.updateAudioButtonLabels(isMuted);
        return;
      }

      // Close modal with [Esc]
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay.active');
        if (openModal) {
          window.soundEngine.playDocClose();
          openModal.classList.remove('active');
          return;
        }
      }

      // Space or Enter: Advance current dialogue or intro screen
      if (e.key === ' ' || e.key === 'Enter') {
        if (this.currentScreen === 'intro') {
          e.preventDefault();
          this.handleAdvanceIntroDialogue();
          return;
        } else if (this.currentScreen === 'gameplay') {
          e.preventDefault();
          this.handleAdvanceVisitorDialogue();
          return;
        } else if (this.currentScreen === 'boss-scene') {
          e.preventDefault();
          this.handleAdvanceBossDialogue();
          return;
        } else if (this.currentScreen === 'day-summary') {
          e.preventDefault();
          const btnProceed = document.getElementById('btn-proceed-to-boss');
          if (btnProceed) btnProceed.click();
          return;
        } else if (this.currentScreen === 'ending-cinematic') {
          e.preventDefault();
          const btnToAudit = document.getElementById('btn-ending-to-audit');
          if (btnToAudit && btnToAudit.style.display !== 'none') {
            btnToAudit.click();
          } else {
            this.handleAdvanceEndingDialogue();
          }
          return;
        }
      }

      // In gameplay:
      if (this.currentScreen === 'gameplay') {
        const currentCase = window.gameState.getCurrentCase();
        if (!currentCase) return;

        const currentPhase = window.gameState.getCaseDialoguePhase(currentCase.id);

        // Keys 1 to 3: Open delivered document
        if (['1', '2', '3'].includes(e.key)) {
          const docIdx = parseInt(e.key) - 1;
          const deliveredCount = this.getDeliveredDocsCount(currentPhase);
          if (docIdx < deliveredCount && currentCase.documents[docIdx]) {
            this.openDocumentModal(currentCase.documents[docIdx]);
          }
          return;
        }

        // Key [L]: Consult LINA
        if (key === 'L') {
          window.linaSystem.handleConsult();
          return;
        }

        // Key [A]: Admit (Only unlocked in Phase 7)
        if (key === 'A') {
          if (currentPhase >= 7) {
            this.handleDecision('ADMIT');
          } else {
            this.showToast("Debe completar la presentación antes de emitir una decisión.");
          }
          return;
        }

        // Key [R]: Reject (Only unlocked in Phase 7)
        if (key === 'R') {
          if (currentPhase >= 7) {
            this.handleDecision('REJECT');
          } else {
            this.showToast("Debe completar la presentación antes de emitir una decisión.");
          }
          return;
        }
      }
    });
  }

  updateAudioButtonLabels(isMuted) {
    document.querySelectorAll('.btn-toggle-sound').forEach(btn => {
      btn.innerText = isMuted ? "🔇 SONIDO: OFF [M]" : "🔊 SONIDO: ON [M]";
    });
  }

  showToast(message) {
    const toast = document.getElementById('game-toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  // Helper: How many documents are delivered for a given phase
  getDeliveredDocsCount(phase) {
    if (phase >= 6) return 3;
    if (phase >= 4) return 2;
    if (phase >= 2) return 1;
    return 0;
  }

  // =========================================================================
  // NARRATIVE INTRO & ENDING SCREENS
  // =========================================================================
  showIntroScreen() {
    const intro = window.NARRATIVE.intro;
    const introCinematic = window.NARRATIVE.introCinematic;

    // Legacy elements for backwards compatibility
    const titleEl = document.getElementById('intro-title');
    if (titleEl) titleEl.innerText = intro.title;
    const spkEl = document.getElementById('intro-speaker');
    if (spkEl) spkEl.innerText = intro.speaker;
    
    const bodyEl = document.getElementById('intro-body');
    if (bodyEl) {
      bodyEl.innerHTML = intro.paragraphs.map(p => `
        <p class="${p.type}">${p.text}</p>
      `).join('');
    }

    // Set up cinematic sequence
    this.introBeats = introCinematic ? introCinematic.beats : [];
    this.currentIntroBeat = 0;
    this.isIntroTyping = false;
    this.introTypeTimer = null;

    // Start intro atmospheric sound
    window.soundEngine.startIntroBGM();

    // Render first beat
    this.renderIntroDialogueBeat();

    this.showScreen('intro');
  }

  renderIntroDialogueBeat() {
    if (!this.introBeats || this.introBeats.length === 0) return;
    const beat = this.introBeats[this.currentIntroBeat];
    if (!beat) return;

    // Update speaker name
    const spkBadge = document.getElementById('intro-speaker-name');
    if (spkBadge) spkBadge.innerText = beat.speaker;

    // Update counter
    const counterEl = document.getElementById('intro-beat-counter');
    if (counterEl) counterEl.innerText = `SECUENCIA ${this.currentIntroBeat + 1} / ${this.introBeats.length}`;

    // Update buttons
    const btnAdv = document.getElementById('btn-intro-advance');
    const btnStart = document.getElementById('btn-start-intro');
    const isLastBeat = this.currentIntroBeat === this.introBeats.length - 1;

    if (isLastBeat) {
      if (btnAdv) btnAdv.style.display = 'none';
      if (btnStart) {
        btnStart.style.display = 'inline-block';
        btnStart.innerText = "INGRESAR A LA CABINA DE CONTROL ▶";
      }
    } else {
      if (btnAdv) {
        btnAdv.style.display = 'inline-block';
        btnAdv.innerText = "CONTINUAR [ESPACIO] ▶";
      }
      if (btnStart) btnStart.style.display = 'none';
    }

    // Start typewriter
    this.startIntroTypewriter(beat.text);
  }

  startIntroTypewriter(fullText) {
    if (this.introTypeTimer) clearInterval(this.introTypeTimer);
    const textEl = document.getElementById('intro-dialogue-text');
    if (!textEl) return;

    textEl.innerText = '';
    this.isIntroTyping = true;
    this.introFullText = fullText;
    let charIdx = 0;

    this.introTypeTimer = setInterval(() => {
      if (charIdx < fullText.length) {
        textEl.innerText += fullText[charIdx];
        if (fullText[charIdx] !== ' ') {
          window.soundEngine.playTypewriterChar();
        }
        charIdx++;
      } else {
        this.finishIntroTyping();
      }
    }, 18);
  }

  finishIntroTyping() {
    if (this.introTypeTimer) {
      clearInterval(this.introTypeTimer);
      this.introTypeTimer = null;
    }
    const textEl = document.getElementById('intro-dialogue-text');
    if (textEl && this.introFullText) {
      textEl.innerText = this.introFullText;
    }
    this.isIntroTyping = false;
  }

  handleAdvanceIntroDialogue() {
    if (this.isIntroTyping) {
      this.finishIntroTyping();
      return;
    }

    if (this.currentIntroBeat < this.introBeats.length - 1) {
      window.soundEngine.playClick();
      this.currentIntroBeat++;
      this.renderIntroDialogueBeat();
    } else {
      // Last beat finished, trigger start intro button
      const btnStart = document.getElementById('btn-start-intro');
      if (btnStart) btnStart.click();
    }
  }

  // =========================================================================
  // CINEMATIC ANIMATED ENDING PRESENTATION
  // =========================================================================
  showEndingCinematic(ending = null) {
    const state = window.gameState;
    if (!ending) {
      ending = window.NARRATIVE.calculateEnding(state);
    }
    this.currentEnding = ending;
    state.endingAchieved = ending.id;
    state.saveToStorage();

    const cinematic = window.NARRATIVE.getEndingCinematic(ending.id, state);
    if (!cinematic) {
      this.showEndingScreen(ending);
      return;
    }

    // Header badge & location
    const badgeEl = document.getElementById('ending-cinematic-badge');
    if (badgeEl) {
      badgeEl.innerText = cinematic.badgeText || "DESENLACE";
      badgeEl.className = `badge-tag ${cinematic.badgeClass || 'highlight'}`;
    }

    const locEl = document.getElementById('ending-cinematic-location');
    if (locEl) {
      locEl.innerText = cinematic.location || "ASTER // PROTOCOLO FINAL";
    }

    // Initialize ending canvas visual scene
    window.pixelRenderer.setEndingScene(ending.id);

    // Start ending tailored audio soundscape
    window.soundEngine.startEndingBGM(ending.id);

    // Initialize dialogue beats
    this.endingBeats = cinematic.beats || [];
    this.endingBeatIndex = 0;

    const btnAdv = document.getElementById('btn-ending-advance');
    const btnToAudit = document.getElementById('btn-ending-to-audit');
    if (btnAdv) {
      btnAdv.style.display = 'inline-block';
      btnAdv.innerText = "CONTINUAR [ESPACIO] ▶";
    }
    if (btnToAudit) {
      btnToAudit.style.display = 'none';
    }

    this.showScreen('ending-cinematic');
    this.renderEndingDialogueBeat();
  }

  renderEndingDialogueBeat() {
    const beat = this.endingBeats[this.endingBeatIndex];
    if (!beat) return;

    const speakerEl = document.getElementById('ending-speaker-name');
    if (speakerEl) {
      speakerEl.innerText = `DESENLACE // ${beat.speaker.toUpperCase()}`;
    }

    const stepEl = document.getElementById('ending-dialogue-step');
    if (stepEl) {
      stepEl.innerText = `ESCENA ${this.endingBeatIndex + 1} / ${this.endingBeats.length}`;
    }

    this.startEndingTypewriter(beat.text);
  }

  startEndingTypewriter(text) {
    if (this.endingTypeTimer) clearTimeout(this.endingTypeTimer);

    this.endingTyping = true;
    this.endingFullText = text;

    const textEl = document.getElementById('ending-dialogue-text');
    const btnAdv = document.getElementById('btn-ending-advance');
    if (!textEl || !btnAdv) return;

    btnAdv.innerText = "COMPLETAR ▶";

    let charIdx = 0;
    let current = "";
    const typeStep = () => {
      if (charIdx < text.length) {
        current += text[charIdx];
        textEl.innerHTML = `${current}<span class="dialogue-cursor"></span>`;
        if (charIdx % 3 === 0) {
          window.soundEngine.playTypewriterChar();
        }

        charIdx++;
        let delay = 22;
        const char = text[charIdx - 1];
        if (['.', '!', '?'].includes(char)) delay = 180;
        else if ([',', ';', ':'].includes(char)) delay = 80;

        this.endingTypeTimer = setTimeout(typeStep, delay);
      } else {
        this.finishEndingTyping();
      }
    };

    typeStep();
  }

  finishEndingTyping() {
    if (this.endingTypeTimer) clearTimeout(this.endingTypeTimer);
    this.endingTyping = false;

    const textEl = document.getElementById('ending-dialogue-text');
    const btnAdv = document.getElementById('btn-ending-advance');
    const btnToAudit = document.getElementById('btn-ending-to-audit');
    if (textEl) textEl.innerText = this.endingFullText;

    if (this.endingBeatIndex < this.endingBeats.length - 1) {
      if (btnAdv) {
        btnAdv.style.display = 'inline-block';
        btnAdv.innerText = "CONTINUAR [ESPACIO] ▶";
      }
      if (btnToAudit) btnToAudit.style.display = 'none';
    } else {
      // Last beat reached! Show button to proceed to final audit screen
      if (btnAdv) btnAdv.style.display = 'none';
      if (btnToAudit) {
        btnToAudit.style.display = 'inline-block';
        btnToAudit.innerText = "VER AUDITORÍA FINAL Y ESTADÍSTICAS ▶";
      }
    }
  }

  handleAdvanceEndingDialogue() {
    if (this.endingTyping) {
      this.finishEndingTyping();
      window.soundEngine.playClick();
      return;
    }

    if (this.endingBeatIndex < this.endingBeats.length - 1) {
      this.endingBeatIndex++;
      window.soundEngine.playDialogueNext();
      this.renderEndingDialogueBeat();
    }
  }

  showEndingScreen(ending = null) {
    const state = window.gameState;
    if (!ending) {
      ending = window.NARRATIVE.calculateEnding(state);
    }
    state.endingAchieved = ending.id;
    state.saveToStorage();

    // Stop ending BGM when transitioning to audit screen
    window.soundEngine.stopEndingBGM();
    window.soundEngine.duckBGM(true);

    const titleBadge = document.getElementById('ending-title-badge');
    if (titleBadge) {
      titleBadge.innerText = ending.title;
      titleBadge.className = `ending-title-badge ${ending.badgeClass}`;
    }
    
    const narrativeEl = document.getElementById('ending-narrative-text');
    if (narrativeEl) {
      narrativeEl.innerHTML = `
        <p style="margin-bottom: 12px; line-height: 1.6;">${ending.narrative.trim()}</p>
        <blockquote style="font-style: italic; color: var(--col-orange); border-top: 1px dotted var(--col-dark-blue-light); padding-top: 10px;">
          "${ending.reflection}"
        </blockquote>
      `;
    }

    // Audit Grid Statistics
    const totalCases = window.GAME_CASES ? window.GAME_CASES.length : 15;
    const statAdmitted = document.getElementById('stat-admitted');
    if (statAdmitted) statAdmitted.innerText = state.admittedCount;
    const statRejected = document.getElementById('stat-rejected');
    if (statRejected) statRejected.innerText = state.rejectedCount;
    const statFollowed = document.getElementById('stat-lina-followed');
    if (statFollowed) statFollowed.innerText = `${state.followedLinaCount} / ${totalCases}`;
    const statQuestioned = document.getElementById('stat-lina-questioned');
    if (statQuestioned) statQuestioned.innerText = `${state.questionedLinaCount} / ${totalCases}`;
    const statUnjustified = document.getElementById('stat-unjustified-rejects');
    if (statUnjustified) statUnjustified.innerText = state.unjustifiedRejects;
    const statSecrets = document.getElementById('stat-secrets-found');
    if (statSecrets) statSecrets.innerText = `${state.discoveredSecretsCount} / 2`;

    this.showScreen('ending');
  }

  // =========================================================================
  // GAMEPLAY CASE RENDERING & VISITOR ARRIVAL
  // =========================================================================
  renderCurrentCase(triggerArrival = false) {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase) {
      this.showEndingCinematic();
      return;
    }

    const state = window.gameState;
    const caseState = state.getCaseState(currentCase.id);
    const currentPhase = state.getCaseDialoguePhase(currentCase.id);

    // Update Top Status Bar
    document.getElementById('status-shift-num').innerText = `TURNO ${currentCase.shift} / 4`;
    document.getElementById('status-case-progress').innerText = `CASO ${state.currentCaseIndex + 1} DE ${window.GAME_CASES.length}`;
    
    // Set up Pixel Renderer with arrival animation
    window.pixelRenderer.setCase(
      currentCase, 
      caseState.consultedLina && currentCase.linaEvaluation.altersPerception,
      triggerArrival
    );

    // Render dialogue phase
    this.renderVisitorDialoguePhase(currentCase, currentPhase);

    // Render progressive documents tray
    this.renderDocumentsTray(currentCase, caseState, currentPhase);

    // Update dock decision buttons state (locked during phases 1-6)
    this.updateDecisionButtonsState(currentPhase);

    // Reset LINA terminal
    window.linaSystem.resetForNewCase(currentCase);

    // Reset Reticle & Perception overlay
    const reticle = document.getElementById('threat-reticle');
    const overlay = document.getElementById('perception-overlay');
    if (caseState.consultedLina && currentCase.linaEvaluation.altersPerception) {
      if (reticle) reticle.classList.add('active');
      if (overlay) overlay.classList.add('active');
    } else {
      if (reticle) reticle.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    }

    // Play arrival sounds
    if (triggerArrival) {
      window.soundEngine.playArrival();
    }
  }

  // =========================================================================
  // VISITOR DIALOGUE ENGINE (7 PHASES WITH TYPEWRITER)
  // =========================================================================
  renderVisitorDialoguePhase(currentCase, phaseNum) {
    const phaseData = currentCase.dialoguePhases.find(p => p.phase === phaseNum) || currentCase.dialoguePhases[0];

    // Update speaker meta
    document.getElementById('dialogue-speaker-name').innerText = phaseData.speaker;
    document.getElementById('dialogue-speaker-sub').innerText = `${currentCase.age} años | ${currentCase.occupation} | ${currentCase.origin}`;
    document.getElementById('dialogue-phase-tag').innerText = `FASE ${phaseNum} / 7: ${phaseData.phaseName.toUpperCase()}`;

    // Start typewriter
    this.startVisitorTypewriter(phaseData.text, phaseData.actionPrompt);
  }

  startVisitorTypewriter(text, actionPrompt) {
    if (this.visitorTypeTimer) clearTimeout(this.visitorTypeTimer);

    this.visitorTyping = true;
    this.visitorFullText = text;
    this.visitorCurrentText = "";

    const textEl = document.getElementById('dialogue-text-content');
    const btnAdv = document.getElementById('btn-dialogue-advance') || document.getElementById('btn-advance-dialogue');
    if (!textEl) return;

    if (btnAdv) {
      btnAdv.innerText = "CONTINUAR ▶";
    }

    let charIdx = 0;
    const typeStep = () => {
      if (charIdx < text.length) {
        this.visitorCurrentText += text[charIdx];
        textEl.innerHTML = `${this.visitorCurrentText}<span class="dialogue-cursor"></span>`;
        
        // Gentle rhythmic keystroke sound (every 3 characters)
        if (charIdx % 3 === 0) {
          if (charIdx % 3 === 0) {
          window.soundEngine.playTypewriterChar();
        }
        }

        charIdx++;
        // Natural pauses on punctuation
        let delay = 22;
        const char = text[charIdx - 1];
        if (['.', '!', '?'].includes(char)) delay = 160;
        else if ([',', ';', ':'].includes(char)) delay = 80;

        this.visitorTypeTimer = setTimeout(typeStep, delay);
      } else {
        this.finishVisitorTyping(actionPrompt);
      }
    };

    typeStep();
  }

  finishVisitorTyping(actionPrompt = "Continuar") {
    if (this.visitorTypeTimer) clearTimeout(this.visitorTypeTimer);
    this.visitorTyping = false;

    const textEl = document.getElementById('dialogue-text-content');
    const btnAdv = document.getElementById('btn-dialogue-advance') || document.getElementById('btn-advance-dialogue');
    if (textEl) {
      textEl.innerText = this.visitorFullText;
    }
    if (btnAdv) {
      const label = (actionPrompt && actionPrompt.trim()) ? actionPrompt.toUpperCase() : "CONTINUAR";
      btnAdv.innerText = `${label} ▶`;
    }
  }

  handleAdvanceVisitorDialogue() {
    const now = Date.now();
    // Accidental double-click protection (gentle 110ms debounce)
    if (now - this.lastDialogueClickTime < 110) return;
    this.lastDialogueClickTime = now;

    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase) return;

    const currentPhase = window.gameState.getCaseDialoguePhase(currentCase.id);
    const phaseData = currentCase.dialoguePhases.find(p => p.phase === currentPhase) || currentCase.dialoguePhases[0];

    // If still typing, clicking completes the line immediately
    if (this.visitorTyping) {
      this.finishVisitorTyping(phaseData.actionPrompt);
      window.soundEngine.playClick();
      return;
    }

    // If line is finished and we have more phases:
    if (currentPhase < 7) {
      const nextPhase = currentPhase + 1;
      window.gameState.setCaseDialoguePhase(currentCase.id, nextPhase);

      window.soundEngine.playDialogueNext();

      // Check if this new phase delivers a document!
      // Phase 2: DNI, Phase 4: Work Record, Phase 6: Security Certificate
      if (nextPhase === 2 || nextPhase === 4 || nextPhase === 6) {
        window.soundEngine.playDocSlide();
      }

      this.renderCurrentCase(false);
    } else {
      // In Phase 7: inspection is active, show clear hint
      this.showToast("Fase 7 completada. Revise los 3 expedientes en su mesa, consulte a LINA [L] y decida [A / R].");
    }
  }

  updateDecisionButtonsState(currentPhase) {
    const btnAdmit = document.getElementById('btn-decision-admit');
    const btnReject = document.getElementById('btn-decision-reject');
    const dockMsg = document.getElementById('dock-status-msg');

    if (currentPhase >= 7) {
      if (btnAdmit) btnAdmit.disabled = false;
      if (btnReject) btnReject.disabled = false;
      if (dockMsg) {
        dockMsg.innerHTML = `<span style="color: var(--col-muted-green); font-weight: bold;">✓ FASE 7 COMPLETADA: INSPECCIÓN DISPONIBLE. EMITA RESOLUCIÓN IRREVERSIBLE.</span>`;
      }
    } else {
      if (btnAdmit) btnAdmit.disabled = true;
      if (btnReject) btnReject.disabled = true;
      if (dockMsg) {
        dockMsg.innerHTML = `<span>⚠️ ADVERTENCIA: Fase ${currentPhase}/7 en curso. Complete la presentación antes de emitir una decisión.</span>`;
      }
    }
  }

  // =========================================================================
  // PROGRESSIVE DOCUMENTS TRAY
  // =========================================================================
  renderDocumentsTray(currentCase, caseState, currentPhase) {
    const tray = document.getElementById('docs-tray');
    const countLabel = document.getElementById('docs-count-label');
    const phaseStatus = document.getElementById('docs-phase-status');
    if (!tray) return;

    const deliveredCount = this.getDeliveredDocsCount(currentPhase);
    if (countLabel) {
      countLabel.innerText = `DOCUMENTOS ENTREGADOS: ${deliveredCount} / 3`;
    }
    if (phaseStatus) {
      if (currentPhase >= 7) {
        phaseStatus.innerText = "✓ EXPEDIENTES LISTOS PARA REVISIÓN";
        phaseStatus.className = "status-ready";
      } else {
        phaseStatus.innerText = `FASE ${currentPhase}/7 EN CURSO`;
        phaseStatus.className = "status-waiting";
      }
    }

    if (deliveredCount === 0) {
      tray.innerHTML = `
        <div style="color: #6a7c99; font-style: italic; padding: 18px; text-align: center; border: 1px dashed var(--col-dark-blue-light);">
          [ESCRITORIO VACÍO]<br>
          A la espera de que el visitante entregue su documentación oficial en las fases 2, 4 y 6.
        </div>
      `;
      return;
    }

    // Only render delivered documents
    tray.innerHTML = currentCase.documents.slice(0, deliveredCount).map((doc, idx) => {
      const isInspected = caseState.docsExamined.includes(doc.id);
      return `
        <div class="doc-item-card delivered-anim ${isInspected ? 'inspected' : ''}" data-doc-id="${doc.id}" data-doc-idx="${idx}">
          <div class="doc-info">
            <span class="doc-title">[${idx + 1}] ${doc.title}</span>
            <span class="doc-desc">${doc.type} • Exp: ${doc.expediente}</span>
          </div>
          <div class="doc-status-badge">
            ${isInspected ? '✓ REVISADO' : 'PENDIENTE'}
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to delivered cards
    tray.querySelectorAll('.doc-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const docIdx = parseInt(card.getAttribute('data-doc-idx'));
        this.openDocumentModal(currentCase.documents[docIdx]);
      });
    });
  }

  openDocumentModal(doc) {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase) return;

    window.soundEngine.playDocFlick();
    window.gameState.examineDocument(currentCase.id, doc.id);

    // Populate modal title and header
    document.getElementById('modal-doc-title').innerText = doc.title;
    document.getElementById('modal-doc-type').innerText = `${doc.type} | Expediente: ${doc.expediente}`;

    // Show/hide pixel portrait for Documento de Identidad
    const photoArea = document.getElementById('doc-photo-area');
    const photoCanvas = document.getElementById('modal-doc-photo');
    if (doc.type === "Documento de identidad" && photoArea && photoCanvas) {
      photoArea.style.display = 'flex';
      const pCtx = photoCanvas.getContext('2d');
      pCtx.imageSmoothingEnabled = false;
      window.pixelRenderer.drawDocPhoto(pCtx, currentCase, 64, 64);
    } else if (photoArea) {
      photoArea.style.display = 'none';
    }

    // Populate fields
    const fieldsContainer = document.getElementById('modal-doc-fields');
    fieldsContainer.innerHTML = doc.fields.map(f => `
      <div class="doc-field-row">
        <span class="doc-field-label">${f.label}:</span>
        <span class="doc-field-value">${f.value}</span>
      </div>
    `).join('');

    // Stamp
    const stampEl = document.getElementById('modal-doc-stamp');
    stampEl.innerText = doc.stamp;
    stampEl.className = `doc-stamp ${doc.stampClass || ''}`;

    // Barcode hash
    const barcodeEl = document.getElementById('modal-doc-barcode');
    if (barcodeEl) {
      barcodeEl.innerText = `||||| ||| ||| ${doc.expediente} |||| |||||`;
    }

    // Re-render tray to update 'REVISADO' badge
    const caseState = window.gameState.getCaseState(currentCase.id);
    const currentPhase = window.gameState.getCaseDialoguePhase(currentCase.id);
    this.renderDocumentsTray(currentCase, caseState, currentPhase);

    this.openModal('doc-modal');
  }

  // =========================================================================
  // DAY SUMMARY SCREEN (Section 6: Informe de cierre del día)
  // =========================================================================
  showDaySummaryScreen(shiftNumber) {
    this.currentShiftCompleted = shiftNumber;
    const report = window.NARRATIVE.getDayReport(shiftNumber, window.gameState);

    document.getElementById('day-summary-title').innerText = report.title;
    document.getElementById('day-summary-ref').innerText = `${report.reference} // FECHA: ${report.date}`;
    document.getElementById('day-summary-organism').innerText = report.organism;

    // Render stats grid
    const statsGrid = document.getElementById('day-summary-stats-grid');
    if (statsGrid) {
      statsGrid.innerHTML = report.stats.map(s => `
        <div class="day-stat-card ${s.type}">
          <span class="day-stat-label">${s.label}:</span>
          <span class="day-stat-val">${s.value}</span>
        </div>
      `).join('');
    }

    // Render incidents
    const incidentsList = document.getElementById('day-summary-incidents-list');
    if (incidentsList) {
      incidentsList.innerHTML = report.incidents.map(inc => `
        <li>${inc}</li>
      `).join('');
    }

    // Stamp
    const stampEl = document.getElementById('day-summary-stamp');
    if (stampEl) {
      stampEl.innerText = report.stamp;
      stampEl.className = `doc-stamp ${report.stampClass}`;
    }

    // Play shift end fanfare
    window.soundEngine.playShiftEnd();

    this.showScreen('day-summary');
  }

  // =========================================================================
  // BOSS SCENE CONVERSATION (Section 6: Conversación con el superior)
  // =========================================================================
  showBossSceneScreen(shiftNumber) {
    this.currentShiftCompleted = shiftNumber;
    this.bossDialogues = window.NARRATIVE.getBossScene(shiftNumber, window.gameState);
    this.bossDialogueIndex = 0;

    const shiftIndicator = document.getElementById('boss-shift-indicator');
    if (shiftIndicator) {
      shiftIndicator.innerText = `FIN DEL TURNO ${shiftNumber}`;
    }

    // Secret archive button visibility check
    const secretBtn = document.getElementById('btn-boss-view-secret');
    const interData = window.NARRATIVE.intermissions[shiftNumber];
    if (secretBtn && interData && interData.hasSecret) {
      secretBtn.style.display = 'inline-block';
      secretBtn.innerText = `📂 ${interData.secretTitle}`;
      window.gameState.discoverSecret(interData.secretId);
    } else if (secretBtn) {
      secretBtn.style.display = 'none';
    }

    const nextShiftBtn = document.getElementById('btn-boss-next-shift');
    if (nextShiftBtn) nextShiftBtn.style.display = 'none';

    this.showScreen('boss-scene');
    this.renderBossDialogueLine();
  }

  renderBossDialogueLine() {
    const dialogue = this.bossDialogues[this.bossDialogueIndex];
    if (!dialogue) return;

    document.getElementById('boss-speaker-name').innerText = `SUPERVISOR // ${dialogue.speaker.toUpperCase()}`;
    document.getElementById('boss-dialogue-step').innerText = `INTERVENCIÓN ${this.bossDialogueIndex + 1} / ${this.bossDialogues.length}`;

    this.startBossTypewriter(dialogue.text);
  }

  startBossTypewriter(text) {
    if (this.bossTypeTimer) clearTimeout(this.bossTypeTimer);

    this.bossTyping = true;
    this.bossFullText = text;

    const textEl = document.getElementById('boss-dialogue-text');
    const btnAdv = document.getElementById('btn-boss-advance');
    if (!textEl || !btnAdv) return;

    btnAdv.innerText = "COMPLETAR ▶";

    let charIdx = 0;
    let current = "";
    const typeStep = () => {
      if (charIdx < text.length) {
        current += text[charIdx];
        textEl.innerHTML = `${current}<span class="dialogue-cursor"></span>`;
        if (charIdx % 3 === 0) {
          window.soundEngine.playTypewriterChar();
        }

        charIdx++;
        let delay = 22;
        const char = text[charIdx - 1];
        if (['.', '!', '?'].includes(char)) delay = 180;
        else if ([',', ';', ':'].includes(char)) delay = 80;

        this.bossTypeTimer = setTimeout(typeStep, delay);
      } else {
        this.finishBossTyping();
      }
    };

    typeStep();
  }

  finishBossTyping() {
    if (this.bossTypeTimer) clearTimeout(this.bossTypeTimer);
    this.bossTyping = false;

    const textEl = document.getElementById('boss-dialogue-text');
    const btnAdv = document.getElementById('btn-boss-advance');
    const btnNext = document.getElementById('btn-boss-next-shift');
    if (textEl) textEl.innerText = this.bossFullText;

    if (this.bossDialogueIndex < this.bossDialogues.length - 1) {
      if (btnAdv) {
        btnAdv.style.display = 'inline-block';
        btnAdv.innerText = "CONTINUAR [ESPACIO] ▶";
      }
      if (btnNext) btnNext.style.display = 'none';
    } else {
      // Last speech in boss scene reached
      if (btnAdv) btnAdv.style.display = 'none';
      if (btnNext) {
        btnNext.style.display = 'inline-block';
        const nextShift = this.currentShiftCompleted + 1;
        btnNext.innerText = nextShift > 3 ? "INICIAR TURNO FINAL (CLÍMAX) ▶" : `INICIAR TURNO ${nextShift} ▶`;
      }
    }
  }

  handleAdvanceBossDialogue() {
    if (this.bossTyping) {
      this.finishBossTyping();
      window.soundEngine.playClick();
      return;
    }

    if (this.bossDialogueIndex < this.bossDialogues.length - 1) {
      this.bossDialogueIndex++;
      window.soundEngine.playDialogueNext();
      this.renderBossDialogueLine();
    }
  }

  // =========================================================================
  // AUTHENTIC CLASSIFIED RESEARCH DOSSIER MODAL (Section 7)
  // =========================================================================
  openSecretModal(secretId) {
    const docData = window.NARRATIVE.getSecretDocument(secretId);
    if (!docData) {
      // Fallback
      const inter = window.NARRATIVE.intermissions[this.currentShiftCompleted];
      if (inter) {
        document.getElementById('secret-title-label').innerText = inter.secretTitle;
        document.getElementById('secret-body-content').innerText = inter.secretSnippet;
        this.openModal('secret-modal');
      }
      return;
    }

    document.getElementById('secret-title-label').innerText = docData.title;
    document.getElementById('secret-meta-line').innerText = `REGISTRO: ${docData.registryNumber} // FECHA: ${docData.date} // EMISOR: ${docData.organism}`;
    document.getElementById('secret-stamp-label').innerText = docData.stamp;

    const bodyContainer = document.getElementById('secret-body-content');
    bodyContainer.innerHTML = docData.sections.map(s => `
      <div>
        <div class="classified-section-title">${s.heading}</div>
        <p style="white-space: pre-wrap;">${s.content}</p>
      </div>
    `).join('');

    this.openModal('secret-modal');
  }

  // =========================================================================
  // IRREVERSIBLE DECISION HANDLER
  // =========================================================================
  handleDecision(decision) {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase) return;

    const currentPhase = window.gameState.getCaseDialoguePhase(currentCase.id);
    if (currentPhase < 7) {
      this.showToast("Debe completar la presentación antes de emitir una decisión.");
      return;
    }

    const caseState = window.gameState.getCaseState(currentCase.id);
    if (caseState.decision !== null) {
      this.showToast("Decisión ya registrada. No se puede modificar.");
      return;
    }

    // Play feedback sound
    if (decision === 'ADMIT') {
      window.soundEngine.playAdmitChime();
    } else {
      window.soundEngine.playRejectBuzzer();
    }
    window.soundEngine.playGateCycle(decision === 'ADMIT');

    // Record decision in state ledger
    window.gameState.recordDecision(decision);

    this.showToast(`DECISIÓN REGISTRADA: ${decision === 'ADMIT' ? 'ADMITIDO' : 'RECHAZADO'}`);

    // Disable decision buttons momentarily
    const btnAdmit = document.getElementById('btn-decision-admit');
    const btnReject = document.getElementById('btn-decision-reject');
    if (btnAdmit) btnAdmit.disabled = true;
    if (btnReject) btnReject.disabled = true;

    // Check if shift ended or game completed
    setTimeout(() => {
      if (btnAdmit) btnAdmit.disabled = false;
      if (btnReject) btnReject.disabled = false;

      // Check Early Endings (Catastrophe, Rebellion or Negligence Dismissal)
      const earlyEnding = window.NARRATIVE ? window.NARRATIVE.checkEarlyEndings(window.gameState) : null;
      if (earlyEnding) {
        window.gameState.isCompleted = true;
        window.soundEngine.stopBGM();
        this.showEndingCinematic(earlyEnding);
        return;
      }

      const previousShift = currentCase.shift;
      const nextCase = window.gameState.advanceToNextCase();

      if (!nextCase) {
        // All cases completed -> Climax reached -> Ending Cinematic
        this.showEndingCinematic();
      } else if (nextCase.shift > previousShift) {
        // Shift transition! Show Daily Summary Report
        this.showDaySummaryScreen(previousShift);
      } else {
        // Continue to next visitor in current shift
        this.renderCurrentCase(true);
      }
    }, 800);
  }
}

// Global instance
window.ui = new UIController();
