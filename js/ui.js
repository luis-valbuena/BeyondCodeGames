/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * UI Controller, Screen Transitions, Document Viewer & Hotkeys
 */

class UIController {
  constructor() {
    this.currentScreen = 'title';
    this.toastTimer = null;
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
        continueBtn.innerText = `CONTINUAR TURNO ${state.currentShift} (CASO ${state.currentCaseIndex + 1}/7)`;
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
      this.renderCurrentCase();
    } else if (screenId === 'intermission' || screenId === 'ending') {
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

    // Audio toggles (in top bar and title)
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
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // Close modal by clicking on darkened backdrop
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          window.soundEngine.playClick();
          modal.classList.remove('active');
        }
      });
    });

    // Allow selecting person with mouse (opens their dossier / pending document)
    const personView = document.querySelector('.person-viewport');
    const personBio = document.querySelector('.person-bio-card');
    const onPersonClick = () => {
      const currentCase = window.gameState.getCurrentCase();
      if (!currentCase) return;
      window.soundEngine.playDocFlick();
      const caseState = window.gameState.getCaseState(currentCase.id);
      const pendingDoc = currentCase.documents.find(d => !caseState.docsExamined.includes(d.id));
      const targetDoc = pendingDoc || currentCase.documents[0];
      if (targetDoc) {
        this.openDocumentModal(targetDoc);
      }
    };
    if (personView) personView.addEventListener('click', onPersonClick);
    if (personBio) personBio.addEventListener('click', onPersonClick);

    // Intro screen button
    const startShift1Btn = document.getElementById('btn-start-intro');
    if (startShift1Btn) {
      startShift1Btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.showScreen('gameplay');
      });
    }

    // Intermission advance button
    const nextShiftBtn = document.getElementById('btn-advance-shift');
    if (nextShiftBtn) {
      nextShiftBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.showScreen('gameplay');
      });
    }

    // View Secret Archive button in intermission
    const viewSecretBtn = document.getElementById('btn-view-secret');
    if (viewSecretBtn) {
      viewSecretBtn.addEventListener('click', () => {
        window.soundEngine.playDocFlick();
        this.openModal('secret-modal');
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
      // Don't trigger if input elements active
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();

      // Audio toggle
      if (key === 'M') {
        const isMuted = window.soundEngine.toggleMute();
        this.updateAudioButtonLabels(isMuted);
        return;
      }

      // Close modal with ESC
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        return;
      }

      // In gameplay:
      if (this.currentScreen === 'gameplay') {
        const currentCase = window.gameState.getCurrentCase();
        if (!currentCase) return;

        // Keys 1 to 4: open document
        if (['1', '2', '3', '4'].includes(e.key)) {
          const docIdx = parseInt(e.key) - 1;
          if (currentCase.documents[docIdx]) {
            this.openDocumentModal(currentCase.documents[docIdx]);
          }
          return;
        }

        // Key L: Consult LINA
        if (key === 'L') {
          window.linaSystem.handleConsult();
          return;
        }

        // Key A: Admit
        if (key === 'A') {
          this.handleDecision('ADMIT');
          return;
        }

        // Key R: Reject
        if (key === 'R') {
          this.handleDecision('REJECT');
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

  // =========================================================================
  // NARRATIVE INTRO & INTERMISSION RENDERING
  // =========================================================================
  showIntroScreen() {
    const intro = window.NARRATIVE.intro;
    document.getElementById('intro-title').innerText = intro.title;
    document.getElementById('intro-speaker').innerText = intro.speaker;
    
    const bodyEl = document.getElementById('intro-body');
    bodyEl.innerHTML = intro.paragraphs.map(p => `
      <p class="${p.type}">${p.text}</p>
    `).join('');

    document.getElementById('btn-start-intro').innerText = intro.buttonText;
    this.showScreen('intro');
  }

  showIntermissionScreen(shiftCompleted) {
    const interData = window.NARRATIVE.intermissions[shiftCompleted];
    if (!interData) {
      this.showScreen('gameplay');
      return;
    }

    const state = window.gameState;
    document.getElementById('intermission-title').innerText = interData.title;
    document.getElementById('intermission-speaker').innerText = interData.speaker;

    const bodyEl = document.getElementById('intermission-body');
    const paras = interData.getParagraphs(state);
    bodyEl.innerHTML = paras.map(p => `
      <p class="${p.type}">${p.text}</p>
    `).join('');

    // Secret Archive Setup
    const secretBtn = document.getElementById('btn-view-secret');
    if (interData.hasSecret) {
      secretBtn.style.display = 'inline-block';
      secretBtn.innerText = `📂 ABRIR ${interData.secretTitle}`;
      
      // Load secret modal content
      document.getElementById('secret-title-label').innerText = interData.secretTitle;
      document.getElementById('secret-body-content').innerText = interData.secretSnippet;

      // Register discovery in state
      state.discoverSecret(interData.secretId);
    } else {
      secretBtn.style.display = 'none';
    }

    document.getElementById('btn-advance-shift').innerText = interData.buttonText;
    this.showScreen('intermission');
  }

  showEndingScreen() {
    const state = window.gameState;
    const ending = window.NARRATIVE.calculateEnding(state);
    state.endingAchieved = ending.id;
    state.saveToStorage();

    document.getElementById('ending-title-badge').innerText = ending.title;
    document.getElementById('ending-title-badge').className = `ending-title-badge ${ending.badgeClass}`;
    
    document.getElementById('ending-narrative-text').innerHTML = `
      <p style="margin-bottom: 12px; line-height: 1.6;">${ending.narrative.trim()}</p>
      <blockquote style="font-style: italic; color: var(--col-orange); border-top: 1px dotted var(--col-dark-blue-light); padding-top: 10px;">
        "${ending.reflection}"
      </blockquote>
    `;

    // Audit Grid Statistics
    document.getElementById('stat-admitted').innerText = state.admittedCount;
    document.getElementById('stat-rejected').innerText = state.rejectedCount;
    document.getElementById('stat-lina-followed').innerText = `${state.followedLinaCount} / 7`;
    document.getElementById('stat-lina-questioned').innerText = `${state.questionedLinaCount} / 7`;
    document.getElementById('stat-unjustified-rejects').innerText = state.unjustifiedRejects;
    document.getElementById('stat-secrets-found').innerText = `${state.discoveredSecretsCount} / 2`;

    this.showScreen('ending');
  }

  // =========================================================================
  // GAMEPLAY CASE RENDERING
  // =========================================================================
  renderCurrentCase() {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase) {
      this.showEndingScreen();
      return;
    }

    const state = window.gameState;
    const caseState = state.getCaseState(currentCase.id);

    // Update Top Status Bar
    document.getElementById('status-shift-num').innerText = `TURNO ${currentCase.shift} / 4`;
    document.getElementById('status-case-progress').innerText = `CASO ${state.currentCaseIndex + 1} DE ${window.GAME_CASES.length}`;
    
    // Update Person Viewport Bio Card
    document.getElementById('bio-name').innerText = currentCase.name;
    document.getElementById('bio-age-origin').innerText = `${currentCase.age} años | ${currentCase.origin}`;
    document.getElementById('bio-statement').innerText = `"${currentCase.statement}"`;

    // Render Canvas Character
    window.pixelRenderer.setCase(currentCase, caseState.consultedLina && currentCase.linaEvaluation.altersPerception);

    // Render Documents Tray
    this.renderDocumentsTray(currentCase, caseState);

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

    // Play arrival footsteps sound
    window.soundEngine.playArrival();
  }

  renderDocumentsTray(currentCase, caseState) {
    const tray = document.getElementById('docs-tray');
    if (!tray) return;

    tray.innerHTML = currentCase.documents.map((doc, idx) => {
      const isInspected = caseState.docsExamined.includes(doc.id);
      return `
        <div class="doc-item-card ${isInspected ? 'inspected' : ''}" data-doc-id="${doc.id}" data-doc-idx="${idx}">
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

    // Attach click listeners to document cards
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

    // Populate modal
    document.getElementById('modal-doc-title').innerText = doc.title;
    document.getElementById('modal-doc-type').innerText = `${doc.type} | Expediente: ${doc.expediente}`;

    const fieldsContainer = document.getElementById('modal-doc-fields');
    fieldsContainer.innerHTML = doc.fields.map(f => `
      <div class="doc-field-row">
        <span class="doc-field-label">${f.label}:</span>
        <span class="doc-field-value">${f.value}</span>
      </div>
    `).join('');

    const stampEl = document.getElementById('modal-doc-stamp');
    stampEl.innerText = doc.stamp;
    stampEl.className = `doc-stamp ${doc.stampClass || ''}`;

    // Re-render tray to update 'REVISADO' badge
    const caseState = window.gameState.getCaseState(currentCase.id);
    this.renderDocumentsTray(currentCase, caseState);

    this.openModal('doc-modal');
  }

  // =========================================================================
  // IRREVERSIBLE DECISION HANDLER
  // =========================================================================
  handleDecision(decision) {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase) return;

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

    // Record in state
    const audit = window.gameState.recordDecision(decision);

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

      const previousShift = currentCase.shift;
      const nextCase = window.gameState.advanceToNextCase();

      if (!nextCase) {
        // All 7 cases completed -> Climax reached -> Ending
        this.showEndingScreen();
      } else if (nextCase.shift > previousShift) {
        // Shift transition! Show intermission
        this.showIntermissionScreen(previousShift);
      } else {
        // Continue to next person in current shift
        this.renderCurrentCase();
      }
    }, 700);
  }
}

// Global instance
window.ui = new UIController();
