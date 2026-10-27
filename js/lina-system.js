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
  }

  init(elements) {
    this.terminalEl = elements.terminalEl;
    this.progressBar = elements.progressBar;
    this.progressBox = elements.progressBox;
    this.telemetryText = elements.telemetryText;
    this.resultBox = elements.resultBox;
    this.consultBtn = elements.consultBtn;

    if (this.consultBtn) {
      this.consultBtn.addEventListener('click', () => this.handleConsult());
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
          Haga clic en 'CONSULTAR A LINA' para procesar datos biométricos y antecedentes.
        </div>
      `;
    }
    if (this.consultBtn) {
      this.consultBtn.disabled = false;
      this.consultBtn.innerText = "CONSULTAR A LINA [L]";
    }

    // Check if this case was already consulted previously (e.g., from reload)
    const caseState = window.gameState.getCaseState(currentCase.id);
    if (caseState.consultedLina) {
      this.displayResults(currentCase, false);
      if (this.consultBtn) {
        this.consultBtn.disabled = true;
        this.consultBtn.innerText = "ANÁLISIS COMPLETADO";
      }
    }
  }

  handleConsult() {
    const currentCase = window.gameState.getCurrentCase();
    if (!currentCase || this.isAnalyzing) return;

    this.isAnalyzing = true;
    if (this.consultBtn) {
      this.consultBtn.disabled = true;
      this.consultBtn.innerText = "ANALIZANDO...";
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

          // Display results and trigger perception shift
          this.displayResults(currentCase, true);

          if (this.consultBtn) {
            this.consultBtn.disabled = true;
            this.consultBtn.innerText = "ANÁLISIS COMPLETADO";
          }
        }, 200);
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
        <div style="background: rgba(169, 68, 66, 0.2); border: 1px solid var(--col-dark-red); padding: 6px; font-size: 10px; color: #ffb4b4;">
          ⚠️ [SISTEMA]: ENCUADRE DE AMENAZA ACTIVADO EN MONITOR ÓPTICO.
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
