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

    // Per-case inspection tracking
    this.caseInspections = {}; // { [caseId]: { consultedLina: bool, docsExamined: Set/Array, decision: string|null } }
    
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
        decision: null
      };
    }
    return this.caseInspections[caseId];
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
    // expectedAction is based on ground truth and ethics
    const expected = currentCase.truth.expectedAction; // "ADMIT"
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
}

// Global instance
window.gameState = new GameState();
