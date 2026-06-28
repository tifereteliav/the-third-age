/* ==========================================================================
   Game Logic & State: 3D Doors Clinical Escape Room
   ========================================================================== */

// Game State
const state = {
  currentQuestionIndex: 0,
  playerName: "דר' דנה",
  soundEnabled: true,
  completedQuestions: new Set(),
  activeSelectionActive: true // blocks clicks during animations
};

// 8 Clinical Questions Database
const questionsData = [
  {
    indexLabel: "דלת 1: סיכון דמנציה מול גיל פרוץ סוכרת",
    question: "כיצד סוכרת בגיל מבוגר משפיעה על הסיכון לפתח דמנציה על פי מחקר ה-JAMA?",
    doors: [
      {
        answer: "סוכרת אינה משפיעה בכלל על הסיכון לפתח דמנציה.",
        correct: false,
        explanation: "שגיאה. מחקר ה-JAMA הראה קשר ישיר ומשמעותי בין סוכרת לסיכון מוגבר לדמנציה."
      },
      {
        answer: "סוכרת בגיל מבוגר מעלה משמעותית את הסיכון לדמנציה, במיוחד אם היא נמשכת שנים רבות 🗝️",
        correct: true,
        explanation: "נכון מאוד! אבחון של סוכרת מעל 10 שנים לפני גיל 70 מעלה את הסיכון לדמנציה פי 2.12."
      },
      {
        answer: "סוכרת דווקא מגינה על המוח ומפחיתה את הסיכון לירידה קוגניטיבית.",
        correct: false,
        explanation: "לא נכון. סוכרת היא גורם סיכון מוכר לפגיעה בכלי דם ובמערכת העצבים, דבר המגביר את הסיכון לדמנציה."
      }
    ]
  },
  {
    indexLabel: "דלת 2: מבחן ה-Mini-Cog",
    question: "איזה ציון במבחן ה-Mini-Cog מעיד על תפקוד קוגניטיבי תקין ומאפשר למשה להשתמש בטכנולוגיית סוכרת בעצמו?",
    doors: [
      {
        answer: "ציון 0 עד 2 (ציון נמוך המעיד על סיכון לירידה קוגניטיבית).",
        correct: false,
        explanation: "לא נכון. ציון נמוך מ-3 מעיד על חשד לירידה קוגניטיבית ומחייב הערכה מעמיקה יותר ומעורבות מטפל צמוד."
      },
      {
        answer: "ציון 3 ומעלה (ציון המעיד על תפקוד קוגניטיבי תקין) 🗝️",
        correct: true,
        explanation: "מעולה! ציון של 3 ומעלה (למשל 4 מתוך 5 שקיבל משה - 2 על המילים ו-2 על השעון התקין) נחשב תקין ומאפשר תפעול עצמאי."
      },
      {
        answer: "אין צורך בציון כלל, כולם יכולים להשתמש בטכנולוגיה ללא אומדן.",
        correct: false,
        explanation: "שגיאה. אומדן קוגניטיבי חשוב מאוד לפני חיבור לטכנולוגיות מתקדמות כדי למנוע טעויות מינון מסוכנות."
      }
    ]
  },
  {
    indexLabel: "דלת 3: יעילות CGM במבוגרים (מחקר WISDM)",
    question: "מהו היתרון המרכזי של שימוש בסנסור סוכר (CGM) אצל קשישים על פי מחקר ה-WISDM?",
    doors: [
      {
        answer: "הוא מפחית משמעותית אירועי היפוגליקמיה (נפילות סוכר) מסוכנות 🗝️",
        correct: true,
        explanation: "נכון מאוד! מחקר ה-WISDM הוכיח כי ניטור רציף (CGM) מפחית משמעותית את זמן השהייה בהיפוגליקמיה, והיתרון הזה עקבי לכולם ללא קשר לגיל או מצב קוגניטיבי."
      },
      {
        answer: "הוא מחליף לחלוטין את הצורך בפעילות גופנית או תזונה נכונה.",
        correct: false,
        explanation: "לא נכון. טכנולוגיה מנטרת סוכר אך אינה מחליפה את הצורך באורח חיים בריא וטיפול תרופתי."
      },
      {
        answer: "הוא מונע לחלוטין הופעה של מחלות לב וכלי דם.",
        correct: false,
        explanation: "לא מדויק. הוא מסייע באיזון הסוכר ובמניעת נפילות סוכר מסוכנות, אך אינו מונע מחלות באופן ישיר."
      }
    ]
  },
  {
    indexLabel: "דלת 4: פתרון חסמים - פחד מטעויות",
    question: "משה חושש: 'אני מפחד לעשות נזק אם אלחץ על כפתור לא נכון במכשיר'. איך עלינו לעזור לו?",
    doors: [
      {
        answer: "נגיד לו שאין לו ברירה ושינסה להסתדר לבד עם המכשיר.",
        correct: false,
        explanation: "שגיאה. גישה כזו תגביר את החרדה שלו ותוביל לנטישת הטיפול."
      },
      {
        answer: "ניתן לו הדרכה סבלנית ואיטית, נבצע תרגול פיזי מודרך, ונשתף קרוב משפחה תומך 🗝️",
        correct: true,
        explanation: "מדויק! הדרכה מותאמת אישית ותרגול מעשי מפחיתים את החרדה הטכנולוגית ומקנים ביטחון עצמי למטופל."
      },
      {
        answer: "נעביר אותו מיד לטיפול ישן יותר של זריקות ודקירות אצבע מרובות.",
        correct: false,
        explanation: "שגיאה. טכנולוגיה מודרנית (כמו CGM) משפרת משמעותית את איכות חייו, ולכן כדאי להשקיע בהדרכה במקום לוותר."
      }
    ]
  },
  {
    indexLabel: "דלת 5: זכאות לחיסון Shingrix בסל",
    question: "משה הוא בן 68 וללא מחלות רקע. האם הוא זכאי לקבל את החיסון לשלבקת חוגרת (Shingrix) בחינם בסל הבריאות?",
    doors: [
      {
        answer: "כן, החיסון כלול בסל הבריאות לכל אזרח מגיל 65 ומעלה 🗝️",
        correct: true,
        explanation: "נכון מאוד! על פי הנחיות משרד הבריאות בישראל, החיסון כלול בסל לכל מבוגר מגיל 65 ומעלה, וכן למבוגרים מגיל 18 עם דיכוי חיסוני."
      },
      {
        answer: "לא, החיסון כלול בסל רק לילדים קטנים בטיפת חלב.",
        correct: false,
        explanation: "שגיאה. החיסון מיועד במיוחד למבוגרים מגיל 50 ומעלה למניעת שלבקת חוגרת וסיבוכיה."
      },
      {
        answer: "לא, החיסון ניתן בחינם רק למי שכבר חלה בשלבקת חוגרת שלוש פעמים בעבר.",
        correct: false,
        explanation: "לא נכון. החיסון מיועד למניעה ומומלץ לכולם, גם למי שלא חלה מעולם וגם למי שחלה בעבר."
      }
    ]
  },
  {
    indexLabel: "דלת 6: טמפרטורת אחסון Shingrix",
    question: "היכן עלינו לשמור את חיסון ה-Shingrix במרפאה לפני הכנתו למשה?",
    doors: [
      {
        answer: "במקרר רגיל (בטמפרטורה של 2°C עד 8°C). חל איסור מוחלט להקפיא את החיסון! 🗝️",
        correct: true,
        explanation: "מדויק! יש לשמור את החיסון במקרר (2-8 מעלות) באריזה המקורית. הקפאה של החיסון תהרוס אותו ותפסול אותו משימוש."
      },
      {
        answer: "במקפיא בטמפרטורה של 18°C- כדי לשמור על האנטיגנים יציבים.",
        correct: false,
        explanation: "טעות חמורה! הקפאת חיסון ה-Shingrix פוגעת ביעילותו ומקלקלת את המרכיבים שלו."
      },
      {
        answer: "על המדף בארון התרופות בטמפרטורת החדר.",
        correct: false,
        explanation: "לא נכון. ללא שרשרת קירור (מקרר) החיסון יתקלקל במהירות ויאבד את יעילותו."
      }
    ]
  },
  {
    indexLabel: "דלת 7: לוח זמנים למנה השנייה",
    question: "משה קיבל את המנה הראשונה של חיסון ה-Shingrix היום. מתי הוא צריך לקבל את המנה השנייה להשלמת החיסון?",
    doors: [
      {
        answer: "כעבור שבוע אחד בלבד.",
        correct: false,
        explanation: "שגיאה. הגוף זקוק לזמן כדי לפתח תגובה חיסונית ראשונית לפני מנת הדחף השנייה."
      },
      {
        answer: "כעבור שנתיים שמיות.",
        correct: false,
        explanation: "לא נכון. הפרש של שנתיים הוא ארוך מדי וישאיר את המטופל ללא הגנה מלאה בזמן זה."
      },
      {
        answer: "כעבור 2 עד 6 חודשים מקבלת המנה הראשונה 🗝️",
        correct: true,
        explanation: "נכון מאוד! לוח הזמנים הסטנדרטי להשלמת החיסון הוא מתן מנה שנייה במרווח של 2 עד 6 חודשים לאחר המנה הראשונה."
      }
    ]
  },
  {
    indexLabel: "דלת 8: שילוב חיסונים בו-זמנית",
    question: "האם מותר לתת למשה את חיסון ה-Shingrix ואת חיסון השפעת העונתי באותו היום?",
    doors: [
      {
        answer: "כן, מותר לתת באותו יום, במזרקים שונים ובזרועות שונות 🗝️",
        correct: true,
        explanation: "מצוין, סיימת את האתגר! מותר לתת Shingrix וחיסון שפעת באותו ביקור במרפאה. יש להקפיד להזריק אותם במזרקים נפרדים ובאתרי הזרקה שונים (למשל זרוע ימין וזרוע שמאל)."
      },
      {
        answer: "אסור בהחלט. יש להמתין לפחות חודש שלם בין חיסון לחיסון.",
        correct: false,
        explanation: "לא נכון. אין שום מניעה לשלב את שני החיסונים באותו היום, והדבר אף משפר את אחוזי ההתחסנות באוכלוסייה."
      },
      {
        answer: "מותר, ואף מומלץ לשאוב את שניהם יחד לתוך אותו מזרק כדי לחסוך דקירה.",
        correct: false,
        explanation: "טעות חמורה! אסור לערבב חיסונים שונים באותו מזרק. הדבר עלול להרוס את החיסונים ולגרום לתופעות לוואי."
      }
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
  }
}

// DOM Elements
const elements = {
  screenIntro: document.getElementById('screen-intro'),
  screenRooms: document.getElementById('screen-rooms'),
  screenVictory: document.getElementById('screen-victory'),
  hud: document.getElementById('game-hud'),
  currentDoorIndicator: document.getElementById('current-door-indicator'),
  btnToggleSound: document.getElementById('btn-toggle-sound'),
  svgVolumeOn: document.getElementById('svg-volume-on'),
  svgVolumeOff: document.getElementById('svg-volume-off'),
  hudDotsContainer: document.getElementById('hud-dots-container'),
  
  // Game Play elements
  questionIndexLabel: document.getElementById('question-index-label'),
  questionText: document.getElementById('question-text'),
  doorsContainer: document.getElementById('doors-container'),
  feedbackPanel: document.getElementById('feedback-panel'),
  feedbackText: document.getElementById('feedback-text'),
  feedbackActionArea: document.getElementById('feedback-action-area'),
  btnNextQuestion: document.getElementById('btn-next-question'),
  
  // Player name inputs
  playerNameInput: document.getElementById('player-name-input'),
  certRecipientName: document.getElementById('cert-recipient-name'),
  certDateVal: document.getElementById('cert-date-val'),
  
  // General actions
  btnStartGame: document.getElementById('btn-start-game'),
  btnRestart: document.getElementById('btn-restart'),
  btnPrintCert: document.getElementById('btn-print-cert')
};

// Initialize Application
function init() {
  setupEventListeners();
  generateHUDDots();
  
  // Update certificate date to current year/month
  const now = new Date();
  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  elements.certDateVal.innerText = `${months[now.getMonth()]} ${now.getFullYear()}`;
}

// Generate the 8 dots in HUD
function generateHUDDots() {
  elements.hudDotsContainer.innerHTML = '';
  for (let i = 0; i < questionsData.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('data-question', i);
    elements.hudDotsContainer.appendChild(dot);
  }
}

// Update the HUD displays
function updateHUD() {
  elements.currentDoorIndicator.innerText = `דלת ${state.currentQuestionIndex + 1} מתוך ${questionsData.length}`;
  
  const dots = elements.hudDotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.className = 'dot';
    if (idx === state.currentQuestionIndex) {
      dot.classList.add('active');
    } else if (state.completedQuestions.has(idx)) {
      dot.classList.add('completed');
    }
  });
}

// Event Listeners Setup
function setupEventListeners() {
  // Start Game click
  elements.btnStartGame.addEventListener('click', () => {
    playSound('click');
    if (elements.playerNameInput && elements.playerNameInput.value.trim() !== "") {
      state.playerName = elements.playerNameInput.value.trim();
    }
    elements.certRecipientName.innerText = `מוענקת בזאת ל-${state.playerName}`;
    
    showScreen(elements.screenRooms);
    elements.hud.classList.remove('hidden');
    
    state.currentQuestionIndex = 0;
    state.completedQuestions.clear();
    generateHUDDots();
    loadQuestion(0);
  });
  
  // Sound toggle click
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

  // Next question click
  elements.btnNextQuestion.addEventListener('click', () => {
    playSound('click');
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex < questionsData.length) {
      loadQuestion(nextIndex);
    } else {
      // Completed all questions! Show Victory!
      showScreen(elements.screenVictory);
      elements.hud.classList.add('hidden');
      playSound('success');
    }
  });

  // Restart click
  elements.btnRestart.addEventListener('click', () => {
    playSound('click');
    location.reload();
  });

  // Print Certificate click
  elements.btnPrintCert.addEventListener('click', () => {
    playSound('click');
    window.print();
  });
}

// Navigation helper
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

// Load a Question into the view
function loadQuestion(index) {
  state.currentQuestionIndex = index;
  state.activeSelectionActive = true;
  updateHUD();
  
  const qData = questionsData[index];
  
  elements.questionIndexLabel.innerText = qData.indexLabel;
  elements.questionText.innerText = qData.question;
  
  // Reset feedback panel
  elements.feedbackPanel.className = 'feedback-panel idles';
  elements.feedbackText.innerText = "קרא את התרחיש הקליני ובחר בדלת בעלת התשובה הנכונה ביותר...";
  elements.feedbackActionArea.classList.add('hidden');
  
  // Render doors
  elements.doorsContainer.innerHTML = '';
  const labels = ['א', 'ב', 'ג'];
  
  qData.doors.forEach((door, idx) => {
    // 3D Door HTML structure
    const container = document.createElement('div');
    container.className = 'door-container';
    
    container.innerHTML = `
      <div class="door-card" id="door-card-${idx}">
        <!-- Door Front -->
        <div class="door-front">
          <div class="door-panel">
            <div class="door-handle"></div>
            <div class="door-number">דלת ${labels[idx]}</div>
            <div class="door-text-plate">${door.answer}</div>
          </div>
        </div>
        <!-- Door Back (Revealed on Open) -->
        <div class="door-back">
          <div class="door-light-glowing"></div>
          <div class="door-success-seal">🔓</div>
        </div>
      </div>
    `;
    
    // Add Click listener to the door card
    container.addEventListener('click', () => {
      if (!state.activeSelectionActive) return;
      handleDoorSelection(idx, door);
    });
    
    elements.doorsContainer.appendChild(container);
  });
}

// Handle clicking a door
function handleDoorSelection(doorIdx, doorData) {
  const card = document.getElementById(`door-card-${doorIdx}`);
  
  if (doorData.correct) {
    state.activeSelectionActive = false; // block clicks
    playSound('unlock');
    
    // Apply 3D swing open animation
    card.classList.add('door-opened');
    
    // Disable incorrect doors styling
    const allContainers = elements.doorsContainer.querySelectorAll('.door-card');
    allContainers.forEach((c, idx) => {
      if (idx !== doorIdx) {
        c.style.opacity = '0.4';
        c.style.pointerEvents = 'none';
      }
    });

    // Update state & HUD
    state.completedQuestions.add(state.currentQuestionIndex);
    updateHUD();
    
    // Show success feedback
    elements.feedbackPanel.className = 'feedback-panel correct fade-in';
    elements.feedbackText.innerHTML = `<strong>נכון מאוד! 🎉</strong><br>${doorData.explanation}`;
    elements.feedbackActionArea.classList.remove('hidden');
  } else {
    playSound('error');
    
    // Apply shake animation to door front
    card.classList.add('door-locked-shake');
    setTimeout(() => {
      card.classList.remove('door-locked-shake');
    }, 500);
    
    // Style this door container as wrong
    card.querySelector('.door-panel').style.borderColor = 'var(--alert-neon)';
    card.querySelector('.door-panel').style.boxShadow = '0 0 15px var(--alert-glow)';
    
    // Show error feedback with explanation
    elements.feedbackPanel.className = 'feedback-panel incorrect fade-in';
    elements.feedbackText.innerHTML = `<strong>דלת נעולה 🔒</strong><br>${doorData.explanation}`;
  }
}

// Auto start
window.addEventListener('DOMContentLoaded', () => {
  init();
});
