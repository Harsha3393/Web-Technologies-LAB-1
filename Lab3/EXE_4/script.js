// ────────────────────────────────────────────────
// State
// ────────────────────────────────────────────────
const activityLog = [];
let clickCount = 0;
let keyCount = 0;
let focusCount = 0;

// Thresholds for suspicious behavior
const CLICK_THRESHOLD = 25;           // clicks in 5 seconds
const CLICK_WINDOW_MS = 5000;
const ACTIVITY_SCORE_THRESHOLD = 80;

// Recent clicks buffer (for rapid clicking detection)
const recentClicks = [];

// DOM elements
const logContainer = document.getElementById('log');
const clickEl = document.getElementById('clickCount');
const keyEl = document.getElementById('keyCount');
const focusEl = document.getElementById('focusCount');
const scoreEl = document.getElementById('activityScore');
const warningEl = document.getElementById('warningBox');

// ────────────────────────────────────────────────
// Log entry helper
// ────────────────────────────────────────────────
function addLog(type, details = '') {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 });
  
  const entry = {
    timestamp: now.getTime(),
    type,
    details,
    timeStr: time
  };

  activityLog.push(entry);

  // Display in UI
  const div = document.createElement('div');
  div.className = `log-entry event-${type.toLowerCase()}`;
  div.innerHTML = `<span>[${time}]</span> <strong>${type}</strong> ${details ? `→ ${details}` : ''}`;
  logContainer.prepend(div); // newest on top

  // Keep only last 300 entries in DOM to avoid slowdown
  while (logContainer.children.length > 300) {
    logContainer.removeChild(logContainer.lastChild);
  }

  updateStats();
  checkSuspiciousActivity(entry);
}

// ────────────────────────────────────────────────
// Update counters & score
// ────────────────────────────────────────────────
function updateStats() {
  clickEl.textContent = clickCount;
  keyEl.textContent = keyCount;
  focusEl.textContent = focusCount;

  // Very simple activity score (can be improved)
  const score = Math.min(100, 
    Math.floor(clickCount * 1.8) + 
    Math.floor(keyCount * 0.6) + 
    Math.floor(focusCount * 5)
  );

  scoreEl.textContent = score;
  scoreEl.style.color = score > ACTIVITY_SCORE_THRESHOLD ? '#e74c3c' : '#2ecc71';
}

// ────────────────────────────────────────────────
// Suspicious activity detection
// ────────────────────────────────────────────────
function checkSuspiciousActivity(latestEntry) {
  // 1. Rapid clicking detection
  if (latestEntry.type === 'CLICK') {
    const now = latestEntry.timestamp;
    recentClicks.push(now);
    
    // Remove old clicks
    while (recentClicks.length > 0 && now - recentClicks[0] > CLICK_WINDOW_MS) {
      recentClicks.shift();
    }

    if (recentClicks.length >= CLICK_THRESHOLD) {
      showWarning(`Too many clicks (${recentClicks.length}) in last ${CLICK_WINDOW_MS/1000} seconds`);
    }
  }

  // 2. High activity score
  const currentScore = parseInt(scoreEl.textContent);
  if (currentScore > ACTIVITY_SCORE_THRESHOLD) {
    showWarning(`High activity score (${currentScore})`);
  }
}

function showWarning(message) {
  warningEl.textContent = `⚠️ ${message}`;
  warningEl.style.display = 'block';
  
  // Auto-hide after 6 seconds
  setTimeout(() => {
    warningEl.style.display = 'none';
  }, 6000);
}

// ────────────────────────────────────────────────
// Event listeners (capturing + bubbling)
// ────────────────────────────────────────────────
// Use both capturing (true) and bubbling (false) phases

document.addEventListener('click', e => {
  clickCount++;
  const path = e.composedPath ? e.composedPath() : e.path || [];
  const target = e.target.tagName === 'BUTTON' ? e.target.textContent.trim() : e.target.tagName;
  addLog('CLICK', `element: ${target}  path-length: ${path.length}`);
}, true);   // capturing phase

document.addEventListener('keydown', e => {
  keyCount++;
  const key = e.key.length === 1 ? e.key : e.code;
  addLog('KEY', `${key}${e.ctrlKey ? ' + Ctrl' : ''}${e.shiftKey ? ' + Shift' : ''}${e.altKey ? ' + Alt' : ''}`);
}, false);

['focus', 'blur'].forEach(eventType => {
  document.addEventListener(eventType, e => {
    focusCount++;
    const type = eventType.toUpperCase();
    const target = e.target.id || e.target.tagName || 'window';
    addLog(type, `element: ${target}`);
  }, true);
});

// ────────────────────────────────────────────────
// Controls
// ────────────────────────────────────────────────
function resetMonitor() {
  if (!confirm('Reset all activity data?')) return;

  activityLog.length = 0;
  recentClicks.length = 0;
  clickCount = keyCount = focusCount = 0;
  logContainer.innerHTML = '';
  warningEl.style.display = 'none';
  updateStats();
}

function exportLog() {
  if (activityLog.length === 0) {
    alert('No activity to export.');
    return;
  }

  const text = activityLog.map(entry => 
    `[${entry.timeStr}] ${entry.type.padEnd(6)} ${entry.details}`
  ).join('\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `activity-log-${new Date().toISOString().slice(0,16).replace('T','_')}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// Initial message
addLog('SYSTEM', 'Activity monitor started');