/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Game State Management & Irreversible Decision Ledger
 */

const STORAGE_KEY = "UNDER_SURVEILLANCE_SAVE_V1";

class GameState {
  constructor() {
    this.resetToDefaults();
    this.loadFromStorage();
  }

  resetToDefaults() {
    this.currentCaseIndex = 0; // 0 to 6 (7 cases total)
    this.currentShift = 1;     // 1 to 4
    
    // Core decision metrics required by design specifications
    this.admittedCount = 0;
    this.rejectedCount = 0;
    this.unjustifiedRejects = 0;
    this.unjustifiedAdmits = 0;
    this.followedLinaCount = 0;
    this.questionedLinaCount = 0;
    this.totalDocsExamined = 0;
    this.discoveredSecretsCount = 0;
    this.finalDecision = null; // 'ADMIT' or 'REJECT' on Dra. Inés Aranda

    // Per-case inspection tracking: { [caseId]: { consultedLina: bool, docsExamined: Array, decision: string|null, currentPhase: number } }
    this.caseInspections = {};
    
    // Full audit history
    this.history = [];
    
    // Flag if game completed
    this.isCompleted = false;
    this.endingAchieved = null;
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        Object.assign(this, data);
      }
    } catch (e) {
      console.warn("Failed to load local storage save, using defaults.", e);
    }
  }

  saveToStorage() {
    try {
      const data = {
        currentCaseIndex: this.currentCaseIndex,
        currentShift: this.currentShift,
        admittedCount: this.admittedCount,
        rejectedCount: this.rejectedCount,
        unjustifiedRejects: this.unjustifiedRejects,
        unjustifiedAdmits: this.unjustifiedAdmits,
        followedLinaCount: this.followedLinaCount,
        questionedLinaCount: this.questionedLinaCount,
        totalDocsExamined: this.totalDocsExamined,
        discoveredSecretsCount: this.discoveredSecretsCount,
        finalDecision: this.finalDecision,
        caseInspections: this.caseInspections,
        history: this.history,
        isCompleted: this.isCompleted,
        endingAchieved: this.endingAchieved
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to write to local storage", e);
    }
  }

  clearSave() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    this.resetToDefaults();
  }

  getCurrentCase() {
    if (this.currentCaseIndex < window.GAME_CASES.length) {
      return window.GAME_CASES[this.currentCaseIndex];
    }
    return null;
  }

  getCaseState(caseId) {
    if (!this.caseInspections[caseId]) {
      this.caseInspections[caseId] = {
        consultedLina: false,
        docsExamined: [],
        decision: null,
        currentPhase: 1
      };
    }
    return this.caseInspections[caseId];
  }

  getCaseDialoguePhase(caseId) {
    const cs = this.getCaseState(caseId);
    return cs.currentPhase || 1;
  }

  setCaseDialoguePhase(caseId, phase) {
    const cs = this.getCaseState(caseId);
    cs.currentPhase = phase;
    this.saveToStorage();
  }

  examineDocument(caseId, docId) {
    const cs = this.getCaseState(caseId);
    if (!cs.docsExamined.includes(docId)) {
      cs.docsExamined.push(docId);
      this.totalDocsExamined++;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  consultLina(caseId) {
    const cs = this.getCaseState(caseId);
    if (!cs.consultedLina) {
      cs.consultedLina = true;
      this.saveToStorage();
    }
  }

  discoverSecret(secretId) {
    if (!this.caseInspections[`secret_${secretId}`]) {
      this.caseInspections[`secret_${secretId}`] = true;
      this.discoveredSecretsCount++;
      this.saveToStorage();
    }
  }

  /**
   * Record irreversible decision for the current case.
   * @param {string} decision 'ADMIT' or 'REJECT'
   * @returns {Object} result summary with audit flags
   */
  recordDecision(decision) {
    const currentCase = this.getCurrentCase();
    if (!currentCase) return null;

    const cs = this.getCaseState(currentCase.id);
    if (cs.decision !== null) {
      console.error("Decision already recorded and irreversible for case", currentCase.id);
      return null;
    }

    cs.decision = decision;

    // 1. Tally admissions & rejections
    if (decision === "ADMIT") {
      this.admittedCount++;
    } else {
      this.rejectedCount++;
    }

    // 2. Tally LINA alignment
    const linaRec = currentCase.linaEvaluation.recommendation; // "ADMITIR" or "RECHAZAR"
    const isFollowed = (decision === "ADMIT" && linaRec === "ADMITIR") ||
                       (decision === "REJECT" && linaRec === "RECHAZAR");
    
    if (isFollowed) {
      this.followedLinaCount++;
    } else {
      this.questionedLinaCount++;
    }

    // 3. Tally justified vs unjustified actions
    let wasUnjustifiedReject = false;
    let wasUnjustifiedAdmit = false;

    if (decision === "REJECT" && currentCase.truth.isLegallyValid && !currentCase.truth.isActuallyThreat) {
      // Innocent person rejected purely due to system bias or fear
      this.unjustifiedRejects++;
      wasUnjustifiedReject = true;
    } else if (decision === "ADMIT" && currentCase.truth.isActuallyThreat) {
      this.unjustifiedAdmits++;
      wasUnjustifiedAdmit = true;
    }

    // Special: Final decision on Case 7 (Dra. Inés Aranda)
    if (currentCase.id === "case-7") {
      this.finalDecision = decision;
    }

    const auditEntry = {
      caseId: currentCase.id,
      name: currentCase.name,
      shift: currentCase.shift,
      decision,
      linaRecommendation: linaRec,
      followedLina: isFollowed,
      consultedLina: cs.consultedLina,
      docsExaminedCount: cs.docsExamined.length,
      wasUnjustifiedReject,
      wasUnjustifiedAdmit,
      timestamp: new Date().toISOString()
    };

    this.history.push(auditEntry);
    this.saveToStorage();

    return auditEntry;
  }

  advanceToNextCase() {
    this.currentCaseIndex++;
    const nextCase = this.getCurrentCase();
    if (nextCase) {
      this.currentShift = nextCase.shift;
    } else {
      this.isCompleted = true;
    }
    this.saveToStorage();
    return nextCase;
  }

  /**
   * Generates genuine statistical summary for the specified shift
   * @param {number} shiftNumber 1 to 4
   */
  getShiftSummary(shiftNumber) {
    const shiftHistory = this.history.filter(h => h.shift === shiftNumber);
    const totalVisitors = shiftHistory.length;
    const admitted = shiftHistory.filter(h => h.decision === 'ADMIT').length;
    const rejected = shiftHistory.filter(h => h.decision === 'REJECT').length;
    const linaConsulted = shiftHistory.filter(h => h.consultedLina).length;
    const docsExamined = shiftHistory.reduce((acc, h) => acc + h.docsExaminedCount, 0);
    const questionableDecisions = shiftHistory.filter(h => h.wasUnjustifiedReject || h.wasUnjustifiedAdmit).length;

    // Detect actual incidents occurred during this shift
    const incidents = [];
    shiftHistory.forEach(h => {
      const caseData = window.GAME_CASES.find(c => c.id === h.caseId);
      if (caseData && caseData.linaEvaluation.altersPerception && h.consultedLina) {
        incidents.push(`Anomalía de percepción óptica activada en CAM-01 (${h.name})`);
      }
      if (h.caseId === 'case-2' && h.decision === 'ADMIT') {
        incidents.push("Cargamento de insulina y reactivos admitido bajo protocolo prioritario");
      }
      if (h.caseId === 'case-3' && h.decision === 'ADMIT') {
        incidents.push("Ingreso de bienes culturales no homologados autorizado (Desacato de alerta P-72)");
      }
      if (h.caseId === 'case-4' && h.decision === 'REJECT') {
        incidents.push("Ex-empleada técnica rechazada bajo sospecha de análisis ético");
      }
      if (h.caseId === 'case-5') {
        incidents.push("Contratista de sensores perimetrales verificado con Jefatura de Guardia");
      }
      if (h.caseId === 'case-6' && h.wasUnjustifiedReject) {
        incidents.push("Solicitud de urgencia hospitalaria rechazada por código territorial del Sector 9");
      }
    });

    if (incidents.length === 0) {
      incidents.push("Jornada transcurrida sin incidencias críticas registradas en la esclusa");
    }

    return {
      shift: shiftNumber,
      totalVisitors,
      admitted,
      rejected,
      linaConsulted,
      docsExamined,
      questionableDecisions,
      incidents,
      discoveredSecretsCount: this.discoveredSecretsCount,
      shiftHistory
    };
  }
}

// Global instance
window.gameState = new GameState();
