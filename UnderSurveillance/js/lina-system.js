/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * LINA AI Terminal Logic & Algorithmic Perception Alteration Controller
 * 
 * Features:
 *  - Interactive central LINA avatar (idle, analysis animation, result state)
 *  - Click-on-avatar to consult LINA (as well as keyboard [L] or button)
 *  - Visual availability badge ("CONSULTAR LINA" / "ANÁLISIS DISPONIBLE")
 *  - Deterministic evaluation rendering & visual threat alteration
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
    this.avatarContainer = null;
    this.statusBadge = null;
  }

  init(elements) {
    this.terminalEl = elements.terminalEl;
    this.progressBar = elements.progressBar;
    this.progressBox = elements.progressBox;
    this.telemetryText = elements.telemetryText;
    this.resultBox = elements.resultBox;
    this.consultBtn = elements.consultBtn;
    this.avatarContainer = elements.avatarContainer;
    this.statusBadge = elements.statusBadge;

    if (this.consultBtn) {
      this.consultBtn.addEventListener('click', () => this.handleConsult());
    }

    if (this.avatarContainer) {
      this.avatarContainer.addEventListener('click', () => this.handleConsult());
    }
  }

  resetForNewCase(currentCase) {
    this.isAnalyzing = false;
    if (this.progressBox) this.progressBox.classList.remove('scanning');
    if (this.progressBar) this.progressBar.style.width = '0%';
    
    if (this.resultBox) {
      this.resultBox.innerHTML = `
        <div style="color: #6a7c99; font-style: italic; padding: 10px; text-align: center;">
          [LINA v3.4 EN ESPERA]<br>
          Haga clic en el avatar de LINA o pulse [L] para procesar datos biométricos.
        </div>
      `;
    }

    const caseState = window.gameState.getCaseState(currentCase.id);
    if (caseState.consultedLina) {
      // Already evaluated
      const evalData = currentCase.linaEvaluation;
      window.pixelRenderer.setLinaState(evalData.recommendation === 'ADMITIR' ? 'result_admit' : 'result_reject');
      this.displayResults(currentCase, false);
      
      if (this.consultBtn) {
        this.consultBtn.disabled = true;
        this.consultBtn.innerText = "ANÁLISIS COMPLETADO";
      }
      if (this.statusBadge) {
        this.statusBadge.innerText = "● DICTAMEN CONSOLIDADO";
        this.statusBadge.className = "lina-avatar-badge evaluated";
      }
    } else {
      // Available to consult
      window.pixelRenderer.setLinaState('idle');
      if (this.consultBtn) {
        this.consultBtn.disabled = false;
        this.consultBtn.innerText = "CONSULTAR A LINA [L]";
      }
      if (this.statusBadge) {
        this.statusBadge.innerText = "⚡ ANÁLISIS DISPONIBLE [CLIC PARA CONSULTAR]";
        this.statusBadge.className = "lina-avatar-badge available";
      }
    }
  }

  handleConsult() {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase || this.isAnalyzing) return;

    const caseState = window.gameState.getCaseState(currentCase.id);
    if (caseState.consultedLina) return; // Already analyzed

    this.isAnalyzing = true;
    window.pixelRenderer.setLinaState('analyzing');

    if (this.consultBtn) {
      this.consultBtn.disabled = true;
      this.consultBtn.innerText = "ANALIZANDO...";
    }
    if (this.statusBadge) {
      this.statusBadge.innerText = "⏳ PROCESANDO BIOMETRÍA...";
      this.statusBadge.className = "lina-avatar-badge analyzing";
    }

    if (this.progressBox) this.progressBox.classList.add('scanning');
    window.soundEngine.playScanTone();

    // Telemetry steps
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

          // Update avatar state to evaluated
          const evalData = currentCase.linaEvaluation;
          window.pixelRenderer.setLinaState(evalData.recommendation === 'ADMITIR' ? 'result_admit' : 'result_reject');
          window.soundEngine.playLinaReady();

          // Display results and trigger perception shift
          this.displayResults(currentCase, true);

          if (this.consultBtn) {
            this.consultBtn.disabled = true;
            this.consultBtn.innerText = "ANÁLISIS COMPLETADO";
          }
          if (this.statusBadge) {
            this.statusBadge.innerText = "● DICTAMEN CONSOLIDADO";
            this.statusBadge.className = "lina-avatar-badge evaluated";
          }
        }, 220);
      }
    }, 180);
  }

  displayResults(currentCase, isFirstTrigger = false) {
    const evalData = currentCase.linaEvaluation;
    const riskClass = `risk-${evalData.risk.toLowerCase()}`;

    let html = `
      <div class="risk-meter ${riskClass}">
        <span>NIVEL DE RIESGO:</span>
        <span class="risk-level-tag">${evalData.risk}</span>
      </div>
      <div class="lina-recommendation">
        <strong>DICTAMEN DE LINA:</strong> RECOMENDACIÓN — 
        <span style="color: ${evalData.recommendation === 'ADMITIR' ? 'var(--col-muted-green)' : 'var(--col-dark-red)'}; font-weight: bold;">
          ${evalData.recommendation}
        </span>
      </div>
      <div class="lina-criteria">
        <strong>CRITERIOS ALGORÍTMICOS:</strong><br>
        ${evalData.explanation}
      </div>
    `;

    if (evalData.altersPerception) {
      html += `
        <div style="background: rgba(169, 68, 66, 0.25); border: 1px solid var(--col-dark-red); padding: 6px; font-size: 10px; color: #ffb4b4;">
          ⚠️ [SISTEMA]: ENCUADRE DE AMENAZA ACTIVADO EN MONITOR ÓPTICO.
        </div>
      `;
    }

    if (this.resultBox) {
      this.resultBox.innerHTML = html;
    }

    // Trigger visual alteration on person viewport
    if (evalData.altersPerception) {
      window.pixelRenderer.setCase(currentCase, true);
      const reticle = document.getElementById('threat-reticle');
      if (reticle) reticle.classList.add('active');
      const overlay = document.getElementById('perception-overlay');
      if (overlay) overlay.classList.add('active');

      if (isFirstTrigger) {
        window.soundEngine.playGlitchTone();
        if (window.ui && window.ui.showToast) {
          window.ui.showToast("LINA: Percepción óptica recalculada. Filtro de amenaza activo.");
        }
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
