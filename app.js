/* ==========================================================================
   Game Logic & Interactions: The Third Age Escape Room
   ========================================================================== */

// Game State
const state = {
  currentRoom: 1,
  completedRooms: new Set(),
  playerName: "דר' דנה",
  soundEnabled: true,
  
  // Room 2 State (Clock)
  hourAngle: 0,     // 0 degrees corresponds to 12:00
  minuteAngle: 0,   // 0 degrees corresponds to :00
  selectedWords: new Set(),
  
  // Room 4 State (Barriers)
  currentBarrierIndex: 0,
  barriersCompleted: 0,
  
  // Room 5 State (Vaccine)
  vaccineStoredCorrectly: false,
  vaccineMixed: false,
  vaccineShaken: false
};

// Barriers Data (Room 4)
const barriersData = [
  {
    title: "פחד מכישלון וטעויות",
    statement: "אני מפחד לעשות נזק אם אלחץ על כפתור לא נכון במכשיר. כל הטכנולוגיה הזאת מסובכת ואני עלול לקלקל אותה...",
    correctAnswer: "הדרכת תרגול מובנית ואיטית, תוך תרגול פיזי מודרך, ובמידת האפשר שיתוף של בן משפחה תומך (Care-giver) בתהליך הלמידה.",
    options: [
      "הדרכת תרגול מובנית ואיטית, תוך תרגול פיזי מודרך, ובמידת האפשר שיתוף של בן משפחה תומך (Care-giver) בתהליך הלמידה.",
      "הגדלת תצוגת המסך של המערכת, הפעלת התראות קוליות או רטט חזקות, ושימוש באפליקציות ייעודיות למוגבלויות ראייה.",
      "הסבר מותאם על כך שהסנסור יפחית בכחצי את אירועי הירידה המסוכנת בסוכר (היפוגליקמיה) ויחסוך דקירות אצבע יומיות.",
      "חיבור למוקד תמיכה טלפוני רפואי וטכנולוגי הזמין 24/7 ושימוש בציוד גיבוי פשוט במקרה של תקלה.",
      "הסבר על הצפנת הנתונים במערכת, התאמה לפרוטוקול אבטחה של משרד הבריאות, ואימות זהות דו-שלבי."
    ]
  },
  {
    title: "ירידה פיזית ומוטורית",
    statement: "האצבעות שלי כבר לא כל כך זריזות, קשה לי ללחוץ על מסכים קטנים והראייה שלי לא כמו פעם. איך אסתדר עם המכשיר?",
    correctAnswer: "הגדלת תצוגת המסך של המערכת, הפעלת התראות קוליות או רטט חזקות, ושימוש באפליקציות ייעודיות למוגבלויות ראייה.",
    options: [
      "הדרכת תרגול מובנית ואיטית, תוך תרגול פיזי מודרך, ובמידת האפשר שיתוף של בן משפחה תומך.",
      "הגדלת תצוגת המסך של המערכת, הפעלת התראות קוליות או רטט חזקות, ושימוש באפליקציות ייעודיות למוגבלויות ראייה.",
      "הסבר מותאם על כך שהסנסור יפחית בכחצי את אירועי הירידה המסוכנת בסוכר ויחסוך דקירות אצבע יומיות.",
      "חיבור למוקד תמיכה טלפוני רפואי וטכנולוגי הזמין 24/7.",
      "הסבר על הצפנת הנתונים במערכת."
    ]
  },
  {
    title: "היעדר תמיכה והדרכה",
    statement: "מה אעשה בבית אם תהיה תקלה בלילה? מי יעזור לי כשהאחות במרפאה לא עובדת? אני אשאר לבד חסר אונים...",
    correctAnswer: "חיבור למוקד תמיכה טלפוני רפואי וטכנולוגי הזמין 24/7 ושימוש בציוד גיבוי פשוט (Low Tech) כחלק מתוכנית הגיבוי.",
    options: [
      "הדרכת תרגול מובנית ואיטית, תוך תרגול פיזי מודרך.",
      "הגדלת תצוגת המסך של המערכת.",
      "חיבור למוקד תמיכה טלפוני רפואי וטכנולוגי הזמין 24/7 ושימוש בציוד גיבוי פשוט (Low Tech) כחלק מתוכנית הגיבוי.",
      "הסבר מותאם על כך שהסנסור יפחית בכחצי את אירועי הירידה המסוכנת בסוכר.",
      "הסבר על הצפנת הנתונים במערכת."
    ]
  },
  {
    title: "חוסר בתועלת נתפסת",
    statement: "בשביל מה לי את כל הבלגן הזה? אני כבר שנים דוקר את האצבע ומסתדר מצוין. זה סתם מכשיר מיותר שייצמד לי לגוף...",
    correctAnswer: "הסבר מותאם על כך שהסנסור יפחית בכחצי את אירועי הירידה המסוכנת בסוכר (היפוגליקמיה) ויחסוך דקירות אצבע יומיות.",
    options: [
      "הדרכת תרגול מובנית ואיטית.",
      "הגדלת תצוגת המסך של המערכת.",
      "חיבור למוקד תמיכה טלפוני רפואי וטכנולוגי הזמין 24/7.",
      "הסבר מותאם על כך שהסנסור יפחית בכחצי את אירועי הירידה המסוכנת בסוכר (היפוגליקמיה) ויחסוך דקירות אצבע יומיות.",
      "הסבר על הצפנת הנתונים במערכת."
    ]
  },
  {
    title: "חשש מפרטיות ואבטחת מידע",
    statement: "אני דואג שיפרצו למכשיר שלי מהאינטרנט ויגנבו את המידע הרפואי שלי, או גרוע מכך - ישבשו את הזלפת האינסולין במשאבה שלי!",
    correctAnswer: "הסבר על הצפנת הנתונים במערכת, התאמה לפרוטוקול אבטחה של משרד הבריאות, ואימות זהות דו-שלבי להגנה מלאה.",
    options: [
      "הדרכת תרגול מובנית ואיטית.",
      "הגדלת תצוגת המסך של המערכת.",
      "חיבור למוקד תמיכה טלפוני רפואי וטכנולוגי הזמין 24/7.",
      "הסבר מותאם על כך שהסנסור יפחית בכחצי את אירועי הירידה המסוכנת בסוכר.",
      "הסבר על הצפנת הנתונים במערכת, התאמה לפרוטוקול אבטחה של משרד הבריאות, ואימות זהות דו-שלבי להגנה מלאה."
    ]
  }
];

// Audio Context for sound synthesis
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!state.soundEnabled) return;
  initAudio();
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  if (type === 'click') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  } else if (type === 'success') {
    // Beautiful ascending major chord (C Major)
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, now + i * 0.08);
      g.gain.setValueAtTime(0.1, now + i * 0.08);
      g.gain.linearRampToValueAtTime(0.005, now + i * 0.08 + 0.25);
      o.start(now + i * 0.08);
      o.stop(now + i * 0.08 + 0.25);
    });
  } else if (type === 'error') {
    // Error buzzer
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.3);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'unlock') {
    // Safe unlocking futuristic sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.3);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'tick') {
    // Mechanical click tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.005, now + 0.02);
    osc.start(now);
    osc.stop(now + 0.02);
  }
}

// DOM Elements
const elements = {
  // Screens
  screenIntro: document.getElementById('screen-intro'),
  screenRooms: document.getElementById('screen-rooms'),
  screenVictory: document.getElementById('screen-victory'),
  
  // HUD
  hud: document.getElementById('game-hud'),
  currentRoomName: document.getElementById('current-room-name'),
  btnToggleSound: document.getElementById('btn-toggle-sound'),
  svgVolumeOn: document.getElementById('svg-volume-on'),
  svgVolumeOff: document.getElementById('svg-volume-off'),
  hudDots: document.querySelectorAll('.room-dots .dot'),
  
  // Clues Sidebar
  btnOpenClues: document.getElementById('btn-open-clues'),
  btnCloseClues: document.getElementById('btn-close-clues'),
  cluesPanel: document.getElementById('clues-panel'),
  cluesOverlay: document.getElementById('clues-overlay'),
  clueItems: document.querySelectorAll('.clue-content-item'),
  
  // Player name
  playerNameInput: null, // to be created / referenced
  
  // Room 1 Elements
  room1: document.getElementById('room-1'),
  hr10: document.getElementById('hr-10'),
  hr610: document.getElementById('hr-6-10'),
  hr5: document.getElementById('hr-5'),
  safeIndicator: document.getElementById('safe-indicator'),
  btnSubmitRoom1: document.getElementById('btn-submit-room1'),
  
  // Room 2 Elements
  room2: document.getElementById('room-2'),
  wordChips: document.querySelectorAll('.word-chip'),
  btnNextMinicogStep: document.getElementById('btn-next-minicog-step'),
  minicogStepWords: document.getElementById('minicog-step-words'),
  minicogStepClock: document.getElementById('minicog-step-clock'),
  handHour: document.getElementById('hand-hour'),
  handMinute: document.getElementById('hand-minute'),
  hourVal: document.getElementById('hour-val'),
  minuteVal: document.getElementById('minute-val'),
  btnRotateHands: document.querySelectorAll('.btn-rotate'),
  selectMinicogScore: document.getElementById('select-minicog-score'),
  btnSubmitRoom2: document.getElementById('btn-submit-room2'),
  
  // Room 3 Elements
  room3: document.getElementById('room-3'),
  selectCgm: document.getElementById('select-cgm'),
  selectAid: document.getElementById('select-aid'),
  selectHcl: document.getElementById('select-hcl'),
  selectWisdmConclusion: document.getElementById('select-wisdm-conclusion'),
  selectWisdmFactors: document.getElementById('select-wisdm-factors'),
  btnSubmitRoom3: document.getElementById('btn-submit-room3'),
  
  // Room 4 Elements
  room4: document.getElementById('room-4'),
  barrierStatement: document.getElementById('barrier-statement'),
  doctorReply: document.getElementById('doctor-reply'),
  optionsContainer: document.getElementById('barrier-options-container'),
  btnSubmitRoom4: document.getElementById('btn-submit-room4'),
  barrierNodes: document.querySelectorAll('.barrier-node'),
  
  // Room 5 Elements
  room5: document.getElementById('room-5'),
  vaccineVial: document.getElementById('vaccine-vial'),
  storageBoxes: document.querySelectorAll('.storage-box'),
  reconstitutePanel: document.getElementById('reconstitute-panel'),
  btnMixVials: document.getElementById('btn-mix-vials'),
  btnShakeVial: document.getElementById('btn-shake-vial'),
  fluidState: document.getElementById('fluid-state'),
  vaccineQuizPanel: document.getElementById('vaccine-quiz-panel'),
  quizInterval: document.getElementById('quiz-interval'),
  quizCoadmin: document.getElementById('quiz-coadmin'),
  quizBasket: document.getElementById('quiz-basket'),
  btnSubmitRoom5: document.getElementById('btn-submit-room5'),
  
  // Victory Screen Elements
  btnRestart: document.getElementById('btn-restart'),
  btnPrintCert: document.getElementById('btn-print-cert'),
  certDateVal: document.getElementById('cert-date-val')
};

// Initialize Application
function init() {
  setupEventListeners();
  
  // Add Name input dynamically to Intro Screen
  const introCard = elements.screenIntro.querySelector('.glass-card');
  const startBtn = document.getElementById('btn-start-game');
  
  const nameInputGroup = document.createElement('div');
  nameInputGroup.className = 'name-input-group';
  nameInputGroup.style.marginBottom = '20px';
  nameInputGroup.innerHTML = `
    <label for="player-name-input" style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--text-muted);">הזן את שמך (יופיע על גבי התעודה בסיום):</label>
    <input type="text" id="player-name-input" value="דר' דנה" placeholder="השם שלך" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 10px 14px; border-radius: 8px; font-family: var(--font-primary); font-size: 1.1rem; text-align: center; width: 100%; max-width: 300px; outline: none; transition: border-color 0.3s; direction: rtl;">
  `;
  introCard.insertBefore(nameInputGroup, startBtn);
  elements.playerNameInput = document.getElementById('player-name-input');
  
  // Update certificate date to current year/month
  const now = new Date();
  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  elements.certDateVal.innerText = `${months[now.getMonth()]} ${now.getFullYear()}`;
}

// Event Listeners Registration
function setupEventListeners() {
  // Start Game
  document.getElementById('btn-start-game').addEventListener('click', () => {
    playSound('click');
    if (elements.playerNameInput && elements.playerNameInput.value.trim() !== "") {
      state.playerName = elements.playerNameInput.value.trim();
    }
    
    // Update player name in certificate
    const certName = document.querySelector('.cert-name');
    if (certName) {
      certName.innerText = `מוענקת בזאת ל-${state.playerName}`;
    }
    
    showScreen(elements.screenRooms);
    elements.hud.classList.remove('hidden');
    loadRoom(1);
  });
  
  // Sound Toggle
  elements.btnToggleSound.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    if (state.soundEnabled) {
      elements.svgVolumeOn.classList.remove('hidden');
      elements.svgVolumeOff.classList.add('hidden');
      playSound('click');
    } else {
      elements.svgVolumeOn.classList.add('hidden');
      elements.svgVolumeOff.classList.remove('hidden');
    }
  });

  // Clues Sidebar triggers
  elements.btnOpenClues.addEventListener('click', openClues);
  elements.btnCloseClues.addEventListener('click', closeClues);
  elements.cluesOverlay.addEventListener('click', closeClues);

  // Room 1 Dials Logic
  elements.btnSubmitRoom1.addEventListener('click', validateRoom1);
  
  // Room 2 Mini-Cog Logic
  // Word chips selection
  elements.wordChips.forEach(chip => {
    chip.addEventListener('click', () => {
      playSound('click');
      const word = chip.getAttribute('data-word');
      if (state.selectedWords.has(word)) {
        state.selectedWords.delete(word);
        chip.classList.remove('selected');
      } else {
        if (state.selectedWords.size < 2) {
          state.selectedWords.add(word);
          chip.classList.add('selected');
        } else {
          // If already 2 selected, remove the oldest one
          const firstSelected = state.selectedWords.values().next().value;
          state.selectedWords.delete(firstSelected);
          document.querySelector(`.word-chip[data-word="${firstSelected}"]`).classList.remove('selected');
          
          state.selectedWords.add(word);
          chip.classList.add('selected');
        }
      }
      
      // Enable next step if 2 words selected
      elements.btnNextMinicogStep.disabled = (state.selectedWords.size !== 2);
    });
  });
  
  elements.btnNextMinicogStep.addEventListener('click', () => {
    playSound('click');
    elements.minicogStepWords.classList.add('hidden');
    elements.minicogStepWords.classList.remove('active');
    elements.minicogStepClock.classList.remove('hidden');
    elements.minicogStepClock.classList.add('active');
    elements.btnSubmitRoom2.classList.remove('hidden');
  });

  // Clock rotate buttons
  elements.btnRotateHands.forEach(btn => {
    btn.addEventListener('click', () => {
      const hand = btn.getAttribute('data-hand');
      const dir = btn.getAttribute('data-dir');
      playSound('tick');
      
      if (hand === 'hour') {
        const delta = (dir === 'cw') ? 30 : -30;
        state.hourAngle = (state.hourAngle + delta + 360) % 360;
        updateClockDisplay();
      } else if (hand === 'minute') {
        const delta = (dir === 'cw') ? 30 : -30;
        state.minuteAngle = (state.minuteAngle + delta + 360) % 360;
        updateClockDisplay();
      }
    });
  });

  elements.btnSubmitRoom2.addEventListener('click', validateRoom2);

  elements.btnSubmitRoom3.addEventListener('click', validateRoom3);

  // Room 4 Barrier bypass triggers
  elements.btnSubmitRoom4.addEventListener('click', () => {
    playSound('click');
    loadRoom(5);
  });

  // Room 5 Vaccine Drag & Drop (with Mobile Tap-to-Place fallback)
  elements.vaccineVial.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'vaccine');
    elements.vaccineVial.classList.add('dragged');
  });

  elements.vaccineVial.addEventListener('dragend', () => {
    elements.vaccineVial.classList.remove('dragged');
  });

  // Mobile Tap-to-Place support
  elements.vaccineVial.addEventListener('click', () => {
    playSound('click');
    state.selectedVialForTap = !state.selectedVialForTap;
    if (state.selectedVialForTap) {
      elements.vaccineVial.style.border = '2px solid var(--success-neon)';
      elements.vaccineVial.style.boxShadow = '0 0 15px var(--success-glow)';
    } else {
      elements.vaccineVial.style.border = '2px dashed var(--primary-neon)';
      elements.vaccineVial.style.boxShadow = 'none';
    }
  });

  elements.storageBoxes.forEach(box => {
    box.addEventListener('dragover', (e) => {
      e.preventDefault();
      box.classList.add('dragover');
    });

    box.addEventListener('dragleave', () => {
      box.classList.remove('dragover');
    });

    box.addEventListener('drop', (e) => {
      e.preventDefault();
      box.classList.remove('dragover');
      const data = e.dataTransfer.getData('text/plain');
      
      if (data === 'vaccine') {
        handleVaccinePlacement(box);
      }
    });

    // Mobile click-to-place handler
    box.addEventListener('click', () => {
      if (state.selectedVialForTap) {
        handleVaccinePlacement(box);
      }
    });
  });

  function handleVaccinePlacement(box) {
    const temp = parseInt(box.getAttribute('data-temp'), 10);
    if (temp === 4) { // Fridge is 2-8 degrees
      playSound('success');
      state.vaccineStoredCorrectly = true;
      box.innerHTML = `<span class="box-title highlight-green">החיסון מאוחסן בבטחה במקרר (4°C) ❄️</span>`;
      elements.vaccineVial.style.display = 'none';
      elements.reconstitutePanel.classList.remove('hidden');
      state.selectedVialForTap = false;
    } else {
      playSound('error');
      alert("טמפרטורה לא מתאימה! החיסון רקומביננטי ודורש אחסון במקרר בטמפרטורה של 2-8 מעלות צלזיוס בלבד. הקפאה או השארה בטמפרטורת החדר יפגעו ביעילות התכשיר.");
      elements.vaccineVial.style.border = '2px dashed var(--primary-neon)';
      elements.vaccineVial.style.boxShadow = 'none';
      state.selectedVialForTap = false;
    }
  }

  // Vaccine mixing logic
  elements.btnMixVials.addEventListener('click', () => {
    playSound('click');
    elements.btnMixVials.classList.add('hidden');
    elements.btnShakeVial.classList.remove('hidden');
    elements.fluidState.innerText = 'שולב (דרוש ניעור)';
    elements.fluidState.className = 'highlight-orange';
  });

  elements.btnShakeVial.addEventListener('click', () => {
    playSound('click');
    const container = document.querySelector('.vaccine-section');
    container.style.animation = 'shake 0.5s infinite';
    elements.btnShakeVial.disabled = true;
    
    setTimeout(() => {
      container.style.animation = '';
      playSound('success');
      state.vaccineShaken = true;
      elements.btnShakeVial.classList.add('hidden');
      elements.fluidState.innerText = 'מוכן להזרקה (נוזל צלול, שקוף עד חום בהיר)';
      elements.fluidState.className = 'highlight-green';
      elements.vaccineQuizPanel.classList.remove('hidden');
      checkRoom5QuizStatus();
    }, 1500);
  });

  // Quiz events
  elements.quizInterval.addEventListener('change', checkRoom5QuizStatus);
  elements.quizCoadmin.addEventListener('change', checkRoom5QuizStatus);
  elements.quizBasket.addEventListener('change', checkRoom5QuizStatus);
  elements.btnSubmitRoom5.addEventListener('click', validateRoom5);

  // Victory buttons
  elements.btnRestart.addEventListener('click', () => {
    playSound('click');
    location.reload();
  });

  elements.btnPrintCert.addEventListener('click', () => {
    playSound('click');
    window.print();
  });
}

// Navigation helpers
function showScreen(screen) {
  elements.screenIntro.classList.add('hidden');
  elements.screenIntro.classList.remove('active');
  elements.screenRooms.classList.add('hidden');
  elements.screenRooms.classList.remove('active');
  elements.screenVictory.classList.add('hidden');
  elements.screenVictory.classList.remove('active');
  
  screen.classList.remove('hidden');
  screen.classList.add('active');
}

function loadRoom(roomNum) {
  state.currentRoom = roomNum;
  
  // Hide all rooms
  elements.room1.classList.add('hidden');
  elements.room2.classList.add('hidden');
  elements.room3.classList.add('hidden');
  elements.room4.classList.add('hidden');
  elements.room5.classList.add('hidden');
  
  // Show active room
  const activeRoom = document.getElementById(`room-${roomNum}`);
  activeRoom.classList.remove('hidden');
  
  // Update HUD
  const roomNames = {
    1: "מעבדת האבחון (סיכוני דמנציה)",
    2: "אומדן קוגניטיבי (Mini-Cog)",
    3: "היכל הטכנולוגיה (Vitals & WISDM)",
    4: "מעבר החסמים (קול המטופל)",
    5: "מקדש החיסונים (Shingrix)"
  };
  elements.currentRoomName.innerText = roomNames[roomNum];
  
  // Update HUD dots
  elements.hudDots.forEach(dot => {
    const dotRoom = parseInt(dot.getAttribute('data-room'), 10);
    dot.className = 'dot';
    if (dotRoom === roomNum) {
      dot.classList.add('active');
    } else if (state.completedRooms.has(dotRoom)) {
      dot.classList.add('completed');
    }
  });
  
  // If Room 4, load initial barrier
  if (roomNum === 4) {
    state.currentBarrierIndex = 0;
    loadBarrierStatement();
  }
}

// Clues Sidebar Actions
function openClues() {
  playSound('click');
  elements.cluesPanel.classList.remove('closed');
  elements.cluesPanel.classList.add('open');
  elements.cluesOverlay.classList.remove('hidden');
  
  // Hide all clue items first
  elements.clueItems.forEach(item => item.classList.add('hidden'));
  
  // Show clue item corresponding to current room
  const activeClue = document.getElementById(`clue-content-room${state.currentRoom}`);
  if (activeClue) {
    activeClue.classList.remove('hidden');
  }
}

function closeClues() {
  playSound('click');
  elements.cluesPanel.classList.remove('open');
  elements.cluesPanel.classList.add('closed');
  elements.cluesOverlay.classList.add('hidden');
}

// --------------------------------------------------------------------------
// Validation: Room 1 (Dementia Safe)
// --------------------------------------------------------------------------
function validateRoom1() {
  const hr10Val = parseFloat(elements.hr10.value);
  const hr610Val = parseFloat(elements.hr610.value);
  const hr5Val = parseFloat(elements.hr5.value);
  
  // Expected values: hr10 = 2.12, hr6-10 = 1.49, hr5 = 1.11
  // We allow a small tolerance of 0.02
  const tolerance = 0.02;
  const isHr10Correct = Math.abs(hr10Val - 2.12) <= tolerance;
  const isHr610Correct = Math.abs(hr610Val - 1.49) <= tolerance;
  const isHr5Correct = Math.abs(hr5Val - 1.11) <= tolerance;
  
  if (isHr10Correct && isHr610Correct && isHr5Correct) {
    playSound('unlock');
    elements.safeIndicator.innerText = "כספת נפתחה בהצלחה! 🔓";
    elements.safeIndicator.className = "indicator unlocked";
    
    state.completedRooms.add(1);
    elements.btnSubmitRoom1.disabled = true;
    
    setTimeout(() => {
      loadRoom(2);
    }, 1500);
  } else {
    playSound('error');
    elements.safeIndicator.innerText = "קוד כספת שגוי! בדוק את יחסי הסיכון במצגת 🔒";
    elements.safeIndicator.className = "indicator locked";
    
    // Highlight incorrect inputs
    highlightInput(elements.hr10, !isHr10Correct);
    highlightInput(elements.hr610, !isHr610Correct);
    highlightInput(elements.hr5, !isHr5Correct);
  }
}

function highlightInput(inputElement, isIncorrect) {
  if (isIncorrect) {
    inputElement.style.borderColor = 'var(--alert-neon)';
    inputElement.style.boxShadow = '0 0 8px var(--alert-glow)';
  } else {
    inputElement.style.borderColor = 'var(--success-neon)';
    inputElement.style.boxShadow = '0 0 8px var(--success-glow)';
  }
}

// --------------------------------------------------------------------------
// Validation: Room 2 (Mini-Cog)
// --------------------------------------------------------------------------
function updateClockDisplay() {
  // Update rotation in SVG
  elements.handHour.setAttribute('transform', `rotate(${state.hourAngle}, 100, 100)`);
  elements.handMinute.setAttribute('transform', `rotate(${state.minuteAngle}, 100, 100)`);
  
  // Calculate display string
  // Hour hand angle 330 is 11 o'clock. 0 is 12 o'clock, 30 is 1 o'clock.
  let hour = Math.round(state.hourAngle / 30);
  if (hour === 0) hour = 12;
  
  // Minute hand: 360 degrees = 60 minutes. So 1 minute = 6 degrees.
  const minutes = Math.round(state.minuteAngle / 6);
  const minStr = minutes.toString().padStart(2, '0');
  
  elements.hourVal.innerText = `${hour.toString().padStart(2, '0')}:${minStr}`;
  elements.minuteVal.innerText = `:${minStr}`;
}

function validateRoom2() {
  // 1. Verify words selected: must select "sunrise" and "chair"
  const isWordsCorrect = state.selectedWords.has('sunrise') && state.selectedWords.has('chair') && state.selectedWords.size === 2;
  
  // 2. Verify clock rotation: Minute hand should be at 10 past (60 degrees), Hour hand should be at 11 (330 degrees)
  const isClockCorrect = (state.minuteAngle === 60) && (state.hourAngle === 330);
  
  // 3. Verify selected score: should be "4" (2 points for words, 2 points for clock)
  const scoreVal = elements.selectMinicogScore.value;
  const isScoreCorrect = (scoreVal === "4");
  
  if (isWordsCorrect && isClockCorrect && isScoreCorrect) {
    playSound('success');
    state.completedRooms.add(2);
    elements.btnSubmitRoom2.disabled = true;
    
    alert("מעולה! משה הציג הערכה קוגניטיבית תקינה לחלוטין (ציון 4 מתוך 5). הוא כשיר ומוכן לחיבור לטכנולוגיות ניטור והזלפה מתקדמות!");
    
    setTimeout(() => {
      loadRoom(3);
    }, 1000);
  } else {
    playSound('error');
    
    let errMsg = "חלק מהערכי האומדן אינם נכונים:\n";
    if (!isWordsCorrect) errMsg += "- שחזור המילים אינו מתאים (משה זכר 2 מילים ספציפיות).\n";
    if (!isClockCorrect) errMsg += "- מחוגי השעון אינם מכוונים נכון ל-11:10 (שעה 11, דקה 10).\n";
    if (isClockCorrect && isWordsCorrect && !isScoreCorrect) errMsg += "- חישוב הציון הסופי שגוי (השעון תקין = 2 נק', 2 מילים = 2 נק').\n";
    
    alert(errMsg + "\nאנא העזר בשקופיות הרמז ונסה שוב.");
  }
}

// --------------------------------------------------------------------------
// Validation: Room 3 (Technology & WISDM)
// --------------------------------------------------------------------------
function validateRoom3() {
  // 1. Validate acronym match selectors
  const isCgmMatch = elements.selectCgm.value === 'cgm';
  const isAidMatch = elements.selectAid.value === 'aid';
  const isHclMatch = elements.selectHcl.value === 'hcl';
  
  // 2. Validate WISDM study questions
  const isConclusionCorrect = elements.selectWisdmConclusion.value === 'correct';
  const isFactorsCorrect = elements.selectWisdmFactors.value === 'correct';
  
  if (isCgmMatch && isAidMatch && isHclMatch && isConclusionCorrect && isFactorsCorrect) {
    playSound('success');
    state.completedRooms.add(3);
    elements.btnSubmitRoom3.disabled = true;
    
    alert("המערכת הוגדרה בהצלחה! הבנת היטב את ממצאי מחקר ה-WISDM: ניטור סוכר רציף (CGM) מפחית משמעותית אירועי היפוגליקמיה במבוגרים, ותועלת זו עקבית לכולם ואינה תלויה בגיל או במצב קוגניטיבי!");
    
    setTimeout(() => {
      loadRoom(4);
    }, 1000);
  } else {
    playSound('error');
    let errMsg = "חלק מההגדרות שגויות:\n";
    if (!isCgmMatch || !isAidMatch || !isHclMatch) errMsg += "- שיוך ראשי התיבות אינו מדויק.\n";
    if (!isConclusionCorrect) errMsg += "- התשובה לשאלה 1 לגבי יעילות ה-CGM אינה נכונה.\n";
    if (!isFactorsCorrect) errMsg += "- התשובה לשאלה 2 לגבי השפעת מאפייני המטופל אינה נכונה.\n";
    
    alert(errMsg + "\nעיין בשקופיות הרמז ונסה שוב.");
  }
}

// --------------------------------------------------------------------------
// Validation: Room 4 (Barriers Bypass)
// --------------------------------------------------------------------------
function loadBarrierStatement() {
  const barrier = barriersData[state.currentBarrierIndex];
  elements.barrierStatement.innerText = `"${barrier.statement}"`;
  elements.doctorReply.classList.add('hidden');
  
  // Render options in randomized order
  const shuffledOptions = [...barrier.options].sort(() => Math.random() - 0.5);
  elements.optionsContainer.innerHTML = '';
  
  shuffledOptions.forEach(optionText => {
    const btn = document.createElement('button');
    btn.className = 'barrier-option-btn';
    btn.innerText = optionText;
    btn.addEventListener('click', () => handleBarrierAnswer(btn, optionText));
    elements.optionsContainer.appendChild(btn);
  });
  
  // Update progress nodes classes
  elements.barrierNodes.forEach((node, idx) => {
    node.className = 'barrier-node';
    if (idx === state.currentBarrierIndex) {
      node.classList.add('active');
    } else if (idx < state.currentBarrierIndex) {
      node.classList.add('completed');
    }
  });
}

function handleBarrierAnswer(btnElement, selectedAnswer) {
  const barrier = barriersData[state.currentBarrierIndex];
  
  if (selectedAnswer === barrier.correctAnswer) {
    playSound('success');
    btnElement.style.borderColor = 'var(--success-neon)';
    btnElement.style.background = 'rgba(0, 245, 212, 0.15)';
    btnElement.style.color = '#fff';
    
    // Disable all options
    const allButtons = elements.optionsContainer.querySelectorAll('button');
    allButtons.forEach(b => b.disabled = true);
    
    // Show Doctor Reply bubble
    elements.doctorReply.innerText = `מעולה! המענה מתאים ביותר. פתרנו את חסם ה"${barrier.title}".`;
    elements.doctorReply.classList.remove('hidden');
    
    setTimeout(() => {
      state.currentBarrierIndex++;
      if (state.currentBarrierIndex < barriersData.length) {
        loadBarrierStatement();
      } else {
        // Completed all barriers!
        state.completedRooms.add(4);
        elements.btnSubmitRoom4.disabled = false;
        elements.optionsContainer.innerHTML = '<p class="highlight-green text-center" style="font-size: 1.2rem; padding: 20px;">פירקת בהצלחה את כל 5 חסמי הטכנולוגיה של משה! הוא רתום ומלא ביטחון. 👴💖</p>';
        elements.barrierStatement.innerText = "תודה לך, דוקטור! כעת אני מרגיש בטוח ומבין לגמרי כיצד הכלים הללו ישפרו את איכות החיים שלי!";
        
        // Mark all nodes completed
        elements.barrierNodes.forEach(node => {
          node.className = 'barrier-node completed';
        });
      }
    }, 1800);
  } else {
    playSound('error');
    btnElement.classList.add('wrong');
    setTimeout(() => {
      btnElement.classList.remove('wrong');
    }, 500);
  }
}

// --------------------------------------------------------------------------
// Validation: Room 5 (Shingrix vaccine)
// --------------------------------------------------------------------------
function checkRoom5QuizStatus() {
  // Enable submit button only if:
  // 1. Vaccine stored correctly (fridge)
  // 2. Reconstituted and shaken
  // 3. All quiz selectors answered (not empty)
  const isStored = state.vaccineStoredCorrectly;
  const isReady = state.vaccineShaken;
  const isIntervalSelect = elements.quizInterval.value !== "";
  const isCoadminSelect = elements.quizCoadmin.value !== "";
  const isBasketSelect = elements.quizBasket.value !== "";
  
  elements.btnSubmitRoom5.disabled = !(isStored && isReady && isIntervalSelect && isCoadminSelect && isBasketSelect);
}

function validateRoom5() {
  const isIntervalCorrect = elements.quizInterval.value === '2-6months';
  const isCoadminCorrect = elements.quizCoadmin.value === 'simultaneous';
  const isBasketCorrect = elements.quizBasket.value === 'yes';
  
  if (isIntervalCorrect && isCoadminCorrect && isBasketCorrect) {
    playSound('success');
    state.completedRooms.add(5);
    elements.btnSubmitRoom5.disabled = true;
    
    alert("החיסון בוצע בהצלחה! משה קיבל מנה ראשונה של Shingrix, תואם מרווח של 2-6 חודשים למנה השנייה, והחיסון סומן כמאושר בסל הבריאות לגילו!");
    
    setTimeout(() => {
      // Trigger victory screen
      showScreen(elements.screenVictory);
      elements.hud.classList.add('hidden');
    }, 1200);
  } else {
    playSound('error');
    let errMsg = "חלק מההנחיות הקליניות בפרוטוקול החיסון שגויות:\n";
    if (!isIntervalCorrect) errMsg += "- לוח הזמנים למנה השנייה שגוי (מבוגר ללא דיכוי חיסוני).\n";
    if (!isCoadminCorrect) errMsg += "- הנחיית שילוב החיסונים שגויה.\n";
    if (!isBasketCorrect) errMsg += "- הגדרת הזכאות של משה בסל הבריאות שגויה.\n";
    
    alert(errMsg + "\nאנא עיין בהנחיות משרד הבריאות ברמז ונסה שוב.");
  }
}

// Global start
window.addEventListener('DOMContentLoaded', () => {
  init();
});
