/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * LINA AI Terminal Logic & Algorithmic Perception Alteration Controller
 */

class LinaSystem {
  constructor() {
    this.isAnalyzing = false;
    this.terminalEl = null;
    this.progressBar = null;
    this.progressBox = null;
    this.telemetryText = null;
    this.resultBox = null;
    this.consultBtn = null;
    this.avatarImg = null;
    this.coreStateEl = null;
  }

  init(elements) {
    this.terminalEl = elements.terminalEl;
    this.progressBar = elements.progressBar;
    this.progressBox = elements.progressBox;
    this.telemetryText = elements.telemetryText;
    this.resultBox = elements.resultBox;
    this.consultBtn = elements.consultBtn;
    this.avatarImg = document.getElementById('lina-avatar-img');
    this.coreStateEl = document.getElementById('lina-core-state');

    if (this.consultBtn) {
      this.consultBtn.addEventListener('click', () => this.handleConsult());
    }
  }

  resetForNewCase(currentCase) {
    this.isAnalyzing = false;
    if (this.progressBox) this.progressBox.classList.remove('scanning');
    if (this.progressBar) this.progressBar.style.width = '0%';
    
    // Reset avatar to idle
    if (this.avatarImg) {
      this.avatarImg.src = 'assets/lina/lina_idle.jpg';
      this.avatarImg.classList.remove('corrupted');
    }
    if (this.coreStateEl) {
      this.coreStateEl.innerText = "NÚCLEO BIOMÉTRICO: ACTIVO";
      this.coreStateEl.style.color = "var(--col-violet)";
    }

    if (this.resultBox) {
      this.resultBox.innerHTML = `
        <div class="lina-placeholder">
          <div class="lina-placeholder-icon">👁️</div>
          <div class="lina-placeholder-title">[LINA v3.4 EN ESPERA]</div>
          <div class="lina-placeholder-desc">
            Haga clic en 'CONSULTAR A LINA' para procesar datos biométricos, antecedentes y lealtad predictiva.
          </div>
        </div>
      `;
    }
    if (this.consultBtn) {
      this.consultBtn.disabled = false;
      this.consultBtn.innerHTML = `<span class="btn-lina-glow"></span>CONSULTAR A LINA [L]`;
    }

    // Check if this case was already consulted previously (e.g. from state reload)
    const caseState = window.gameState.getCaseState(currentCase.id);
    if (caseState.consultedLina) {
      this.displayResults(currentCase, false);
      if (this.consultBtn) {
        this.consultBtn.disabled = true;
        this.consultBtn.innerHTML = `<span class="btn-lina-glow"></span>ANÁLISIS COMPLETADO`;
      }
    }
  }

  handleConsult() {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase || this.isAnalyzing) return;

    this.isAnalyzing = true;
    if (this.consultBtn) {
      this.consultBtn.disabled = true;
      this.consultBtn.innerHTML = `<span class="btn-lina-glow"></span>ANALIZANDO...`;
    }

    if (this.progressBox) this.progressBox.classList.add('scanning');
    if (this.coreStateEl) {
      this.coreStateEl.innerText = "CALCULANDO VECTORES...";
      this.coreStateEl.style.color = "var(--col-orange)";
    }

    window.soundEngine.playScanTone();

    // High-tech telemetry steps
    const telemetrySteps = [
      "Extrayendo descriptores faciales 68-puntos...",
      "Cruzando vectores con Base Central de Aster...",
      "Evaluando índice de lealtad predictiva (Algoritmo P-72)...",
      "Calculando riesgo de desestabilización social...",
      "Dictamen de LINA consolidado."
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = (step / telemetrySteps.length) * 100;
      if (this.progressBar) this.progressBar.style.width = `${progress}%`;
      if (this.telemetryText && telemetrySteps[step - 1]) {
        this.telemetryText.innerText = telemetrySteps[step - 1];
      }

      if (step >= telemetrySteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.isAnalyzing = false;
          if (this.progressBox) this.progressBox.classList.remove('scanning');
          
          // Record consultation in state
          window.gameState.consultLina(currentCase.id);

          // Display results and trigger perception shift
          this.displayResults(currentCase, true);

          if (this.consultBtn) {
            this.consultBtn.disabled = true;
            this.consultBtn.innerHTML = `<span class="btn-lina-glow"></span>ANÁLISIS COMPLETADO`;
          }
        }, 220);
      }
    }, 180);
  }

  displayResults(currentCase, isFirstTrigger = false) {
    const evalData = currentCase.linaEvaluation;
    const riskClass = `risk-${evalData.risk.toLowerCase()}`;

    // Switch avatar if perception is altered / high risk
    if (evalData.altersPerception || evalData.risk === 'ALTO') {
      if (this.avatarImg) {
        this.avatarImg.src = 'assets/lina/lina_alert.jpg';
        this.avatarImg.classList.add('corrupted');
      }
      if (this.coreStateEl) {
        this.coreStateEl.innerText = "ALERTA PREDICTIVA: ANOMALÍA";
        this.coreStateEl.style.color = "var(--col-dark-red)";
      }
    } else {
      if (this.avatarImg) {
        this.avatarImg.src = 'assets/lina/lina_idle.jpg';
        this.avatarImg.classList.remove('corrupted');
      }
      if (this.coreStateEl) {
        this.coreStateEl.innerText = "NÚCLEO: DICTAMEN EMITIDO";
        this.coreStateEl.style.color = "var(--col-muted-green)";
      }
    }

    let html = `
      <div class="risk-meter ${riskClass}">
        <div class="risk-meter-header">
          <span class="risk-title">NIVEL DE RIESGO:</span>
          <span class="risk-level-tag">${evalData.risk}</span>
        </div>
        <div class="risk-bars-container">
          <span class="risk-bar-segment ${evalData.risk === 'BAJO' || evalData.risk === 'MEDIO' || evalData.risk === 'ALTO' ? 'active-green' : ''}"></span>
          <span class="risk-bar-segment ${evalData.risk === 'MEDIO' || evalData.risk === 'ALTO' ? 'active-orange' : ''}"></span>
          <span class="risk-bar-segment ${evalData.risk === 'ALTO' ? 'active-red' : ''}"></span>
        </div>
      </div>

      <div class="lina-recommendation ${evalData.recommendation === 'ADMITIR' ? 'rec-box-admit' : 'rec-box-reject'}">
        <div class="rec-label">DICTAMEN INSTITUCIONAL DE LINA:</div>
        <div class="rec-decision">
          RECOMENDACIÓN — 
          <span class="rec-verdict-pill ${evalData.recommendation === 'ADMITIR' ? 'verdict-admit' : 'verdict-reject'}">
            ${evalData.recommendation}
          </span>
        </div>
      </div>

      <div class="lina-criteria">
        <div class="criteria-header">CRITERIOS ALGORÍTMICOS:</div>
        <div class="criteria-text">${evalData.explanation}</div>
      </div>
    `;

    if (evalData.altersPerception) {
      html += `
        <div class="lina-perception-warning">
          ⚠️ [DIRECTIVA P-72]: ENCUADRE DE AMENAZA ACTIVADO EN MONITOR ÓPTICO.
        </div>
      `;
    }

    if (this.resultBox) {
      this.resultBox.innerHTML = html;
    }

    // Trigger visual alteration on the person viewport
    if (evalData.altersPerception) {
      window.pixelRenderer.setCase(currentCase, true);
      const reticle = document.getElementById('threat-reticle');
      if (reticle) reticle.classList.add('active');
      const overlay = document.getElementById('perception-overlay');
      if (overlay) overlay.classList.add('active');

      if (isFirstTrigger) {
        window.soundEngine.playGlitchTone();
        window.ui.showToast("LINA: Percepción óptica recalculada. Filtro de amenaza activo.");
      }
    } else {
      window.pixelRenderer.setCase(currentCase, false);
      const reticle = document.getElementById('threat-reticle');
      if (reticle) reticle.classList.remove('active');
      const overlay = document.getElementById('perception-overlay');
      if (overlay) overlay.classList.remove('active');
    }
  }
}

// Global instance
window.linaSystem = new LinaSystem();