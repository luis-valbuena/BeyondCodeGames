/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Application Entrypoint & System Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("=================================================");
  console.log("UNDER SURVEILLANCE — Beyond Code Games");
  console.log("Desarrollo de videojuego funcional para navegador");
  console.log("=================================================");

  // 1. Initialize procedural pixel art renderer
  window.pixelRenderer.initCanvases('title-canvas', 'person-canvas');

  // 2. Initialize LINA AI terminal elements
  window.linaSystem.init({
    terminalEl: document.getElementById('lina-terminal-screen'),
    progressBar: document.getElementById('scan-progress-fill'),
    progressBox: document.getElementById('scan-progress-box'),
    telemetryText: document.getElementById('telemetry-text'),
    resultBox: document.getElementById('lina-result-box'),
    consultBtn: document.getElementById('btn-consult-lina')
  });

  // 3. Initialize UI controller and event bindings
  window.ui.init();

  // 4. Default start on Title Screen
  window.ui.showScreen('title');

  // 5. Unlock Web Audio Context on first interaction
  const unlockAudio = () => {
    window.soundEngine.ensureContext();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
  };
  document.addEventListener('click', unlockAudio);
  document.addEventListener('keydown', unlockAudio);
});
