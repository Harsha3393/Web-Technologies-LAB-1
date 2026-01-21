const activityLog = [];
let clickCount = 0;
let keyCount = 0;
let focusCount = 0;

const CLICK_THRESHOLD = 25;           
const CLICK_WINDOW_MS = 5000;
const ACTIVITY_SCORE_THRESHOLD = 80;

const recentClicks = [];

const logContainer = document.getElementById('log');
const clickEl = document.getElementById('clickCount');
const keyEl = document.getElementById('keyCount');
const focusEl = document.getElementById('focusCount');
const scoreEl = document.getElementById('activityScore');
const warningEl = document.getElementById('warningBox');

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

  const div = document.createElement('div');
  div.className = `log-entry event-${type.toLowerCase()}`;
  div.innerHTML = `<span>[${time}]</span> <strong>${type}</strong> ${details ? `→ ${details}` : ''}`;
  logContainer.prepend(div); 

  while (logContainer.children.length > 300) {
    logContainer.removeChild(logContainer.lastChild);
  }

  updateStats();
  checkSuspiciousActivity(entry);
}

function updateStats() {
  clickEl.textContent = clickCount;
  keyEl.textContent = keyCount;
  focusEl.textContent = focusCount;

  const score = Math.min(100, 
    Math.floor(clickCount * 1.8) + 
    Math.floor(keyCount * 0.6) + 
    Math.floor(focusCount * 5)
  );

  scoreEl.textContent = score;
  scoreEl.style.color = score > ACTIVITY_SCORE_THRESHOLD ? '#e74c3c' : '#2ecc71';
}

function checkSuspiciousActivity(latestEntry) {
  if (latestEntry.type === 'CLICK') {
    const now = latestEntry.timestamp;
    recentClicks.push(now);
 
    while (recentClicks.length > 0 && now - recentClicks[0] > CLICK_WINDOW_MS) {
      recentClicks.shift();
    }

    if (recentClicks.length >= CLICK_THRESHOLD) {
      showWarning(`Too many clicks (${recentClicks.length}) in last ${CLICK_WINDOW_MS/1000} seconds`);
    }
  }

  const currentScore = parseInt(scoreEl.textContent);
  if (currentScore > ACTIVITY_SCORE_THRESHOLD) {
    showWarning(`High activity score (${currentScore})`);
  }
}

function showWarning(message) {
  warningEl.textContent = `⚠️ ${message}`;
  warningEl.style.display = 'block';

  setTimeout(() => {
    warningEl.style.display = 'none';
  }, 6000);
}


document.addEventListener('click', e => {
  clickCount++;
  const path = e.composedPath ? e.composedPath() : e.path || [];
  const target = e.target.tagName === 'BUTTON' ? e.target.textContent.trim() : e.target.tagName;
  addLog('CLICK', `element: ${target}  path-length: ${path.length}`);
}, true);  

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


addLog('SYSTEM', 'Activity monitor started');
