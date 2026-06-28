// Game State
const state = {
  currentQuestionIndex: 0,
  soundEnabled: true,
  selections: new Array(8).fill(null), // tracks chosen door index (0, 1, 2) for each question
  activeSelectionActive: true
};

// 8 Clinical Questions Database (Simplified & Direct)
const questionsData = [
  {
    indexLabel: "דלת 1: סיכון דמנציה מול גיל פרוץ סוכרת",
    question: "כיצד סוכרת בגיל מבוגר משפיעה על הסיכון לפתח דמנציה על פי מחקר ה-JAMA?",
    doors: [
      {
        answer: "סוכרת אינה משפיעה בכלל על הסיכון לפתח דמנציה.",
        correct: false,
        explanation: "סוכרת בגיל מבוגר אכן משפיעה משמעותית על הסיכון לפתח דמנציה."
      },
      {
        answer: "סוכרת בגיל מבוגר מעלה משמעותית את הסיכון לדמנציה, במיוחד אם היא נמשכת שנים רבות 🗝️",
        correct: true,
        explanation: "אבחון של סוכרת מעל 10 שנים לפני גיל 70 מעלה את הסיכון לדמנציה פי 2.12."
      },
      {
        answer: "סוכרת דווקא מגינה על המוח ומפחיתה את הסיכון לירידה קוגניטיבית.",
        correct: false,
        explanation: "סוכרת אינה מגינה על המוח אלא מהווה גורם סיכון לפגיעה בכלי דם ומערכת העצבים."
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
        explanation: "ציון נמוך מ-3 מעיד על חשד לירידה קוגניטיבית ומחייב הערכה מעמיקה יותר."
      },
      {
        answer: "ציון 3 ומעלה (ציון המעיד על תפקוד קוגניטיבי תקין) 🗝️",
        correct: true,
        explanation: "ציון 3 ומעלה (למשל ציון 4 שקיבל משה - 2 על המילים ו-2 על השעון) נחשב תקין."
      },
      {
        answer: "אין צורך בציון כלל, כולם יכולים להשתמש בטכנולוגיה ללא אומדן.",
        correct: false,
        explanation: "אומדן קוגניטיבי הוא קריטי כדי לוודא שהמטופל מסוגל לתפעל את המכשיר בבטחה."
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
        explanation: "מחקר ה-WISDM הוכיח כי ניטור רציף (CGM) מפחית משמעותית את זמן השהייה בהיפוגליקמיה."
      },
      {
        answer: "הוא מחליף לחלוטין את הצורך בפעילות גופנית או תזונה נכונה.",
        correct: false,
        explanation: "הסנסור מנטר אך אינו מחליף את החשיבות של תזונה ואורח חיים בריא."
      },
      {
        answer: "הוא מונע לחלוטין הופעה של מחלות לב וכלי דם.",
        correct: false,
        explanation: "הסנסור מסייע באיזון הסוכר, אך אינו מונע ישירות מחלות לב וכלי דם."
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
        explanation: "זה עלול להגביר את חרדתו ולהוביל לנטישת הטיפול."
      },
      {
        answer: "ניתן לו הדרכה סבלנית ואיטית, נבצע תרגול פיזי מודרך, ונשתף קרוב משפחה תומך 🗝️",
        correct: true,
        explanation: "הדרכה מעשית מעצימה את המטופל ומקנה לו ביטחון בתפעול המכשיר."
      },
      {
        answer: "נעביר אותו מיד לטיפול ישן יותר של זריקות ודקירות אצבע מרובות.",
        correct: false,
        explanation: "עדיף להשקיע בהדרכה מאשר לשלול ממנו את היתרונות הטכנולוגיים של סנסור מודרני."
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
        explanation: "על פי הנחיות סל הבריאות, החיסון כלול ומסובסד באופן מלא לכל אדם מעל גיל 65."
      },
      {
        answer: "לא, החיסון כלול בסל רק לילדים קטנים בטיפת חלב.",
        correct: false,
        explanation: "החיסון מיועד למבוגרים מגיל 50 למניעת שלבקת חוגרת וסיבוכיה."
      },
      {
        answer: "לא, החיסון ניתן בחינם רק למי שכבר חלה בשלבקת חוגרת שלוש פעמים בעבר.",
        correct: false,
        explanation: "החיסון מומלץ למניעה לכל המבוגרים, ללא קשר לשאלה האם חלו בעבר."
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
        explanation: "יש לאחסן במקרר רגיל (2-8 מעלות) באריזה המקורית. הקפאה של החיסון תהרוס אותו."
      },
      {
        answer: "במקפיא בטמפרטורה של 18°C- כדי לשמור על האנטיגנים יציבים.",
        correct: false,
        explanation: "אסור להקפיא את חיסון ה-Shingrix בשום אופן. הקפאה פוגעת במרכיביו."
      },
      {
        answer: "על המדף בארון התרופות בטמפרטורת החדר.",
        correct: false,
        explanation: "ללא שרשרת קירור (מקרר) החיסון יתקלקל במהירות ויאבד את יעילותו."
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
        explanation: "מרווח של שבוע קצר מדי לפיתוח תגובה חיסונית מספקת."
      },
      {
        answer: "כעבור שנתיים שמיות.",
        correct: false,
        explanation: "מרווח של שנתיים ארוך מדי ומשאיר את המטופל חשוף ללא הגנה מלאה."
      },
      {
        answer: "כעבור 2 עד 6 חודשים מקבלת המנה הראשונה 🗝️",
        correct: true,
        explanation: "מרווח הזמנים המומלץ להשלמת הסדרה באדם בריא הוא 2 עד 6 חודשים מהמנה הראשונה."
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
        explanation: "ניתן לשלב Shingrix עם חיסון שפעת באותו ביקור במרפאה, במזרקים ובאתרים נפרדים."
      },
      {
        answer: "אסור בהחלט. יש להמתין לפחות חודש שלם בין חיסון לחיסון.",
        correct: false,
        explanation: "אין שום מניעה לשלב את שני החיסונים המומתים הללו באותו היום."
      },
      {
        answer: "מותר, ואף מומלץ לשאוב את שניהם יחד לתוך אותו מזרק כדי לחסוך דקירה.",
        correct: false,
        explanation: "חל איסור לערבב חומרים במזרק אחד אלא אם צוין אחרת במפורש על ידי היצרנים."
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
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.3);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'unlock') {
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
  screenLogin: document.getElementById('screen-login'),
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
  room3dContainer: document.getElementById('room-3d-container'), // The 3D Room Box
  doorsContainer: document.getElementById('doors-container'), // The Back Wall
  feedbackPanel: document.getElementById('feedback-panel'),
  feedbackText: document.getElementById('feedback-text'),
  feedbackActionArea: document.getElementById('feedback-action-area'),
  btnNextQuestion: document.getElementById('btn-next-question'),
  
  // Passcode & Final Code elements
  passcodeInput: document.getElementById('passcode-input'),
  passcodeErrorMsg: document.getElementById('passcode-error-msg'),
  finalCodeValue: document.getElementById('final-code-value'),
  finalScoreText: document.getElementById('final-score-text'),
  
  // General actions
  btnSubmitPasscode: document.getElementById('btn-submit-passcode'),
  btnStartGame: document.getElementById('btn-start-game'),
  btnRestart: document.getElementById('btn-restart')
};

// Initialize Application
function init() {
  setupEventListeners();
  generateHUDDots();
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
  elements.currentDoorIndicator.innerText = 'דלת ' + (state.currentQuestionIndex + 1) + ' מתוך ' + questionsData.length;
  
  const dots = elements.hudDotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.className = 'dot';
    if (idx === state.currentQuestionIndex) {
      dot.classList.add('active');
    } else if (state.selections[idx] !== null) {
      dot.classList.add('completed');
    }
  });
}

// Event Listeners Setup
function setupEventListeners() {
  // Passcode submit click
  elements.btnSubmitPasscode.addEventListener('click', () => {
    const passcode = elements.passcodeInput.value.trim();
    if (passcode === '7878') {
      elements.passcodeErrorMsg.classList.add('hidden');
      playSound('unlock');
      
      // Go to patient briefing screen
      showScreen(elements.screenIntro);
    } else {
      playSound('error');
      elements.passcodeErrorMsg.classList.remove('hidden');
      elements.passcodeInput.style.borderColor = 'var(--alert-neon)';
      elements.passcodeInput.style.boxShadow = '0 0 10px var(--alert-glow)';
    }
  });

  // Start Game click (Patient Briefing page "התחל")
  elements.btnStartGame.addEventListener('click', () => {
    playSound('click');
    showScreen(elements.screenRooms);
    elements.hud.classList.remove('hidden');
    
    state.currentQuestionIndex = 0;
    state.selections.fill(null);
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

  // Next question click (with 3D Room Box walking zoom transition)
  elements.btnNextQuestion.addEventListener('click', () => {
    if (!state.activeSelectionActive) return;
    state.activeSelectionActive = false; // Block clicks during walking animation
    
    const choice = state.selections[state.currentQuestionIndex];
    const card = document.getElementById("door-card-" + choice);
    const container = card.parentElement;
    
    // Turn LED indicator green & swing door open in 3D
    playSound('unlock');
    container.classList.add('correct-unlocked');
    card.classList.add('door-opened');
    
    // Zoom/walk camera forward through the selected door into the Room Box
    elements.room3dContainer.classList.add("zoom-door-" + choice);
    
    setTimeout(() => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex < questionsData.length) {
        loadQuestion(nextIndex);
        
        // emerging walk-out effect in the next room box
        elements.room3dContainer.className = 'room-3d fade-enter';
        // Force reflow
        elements.room3dContainer.offsetHeight;
        elements.room3dContainer.classList.remove('fade-enter');
        
        state.activeSelectionActive = true;
      } else {
        // Completed all questions! Evaluate selections
        let correctCount = 0;
        questionsData.forEach((q, idx) => {
          const userChoice = state.selections[idx];
          if (userChoice !== null && q.doors[userChoice].correct) {
            correctCount++;
          }
        });
        
        if (correctCount === 8) {
          elements.finalCodeValue.innerText = 'The Third Age';
          elements.finalScoreText.innerText = 'כל הכבוד! ענית נכון על כל 8 השאלות של האתגר!';
        } else {
          elements.finalCodeValue.innerText = 'Shingrix';
          elements.finalScoreText.innerText = 'ענית נכון על ' + correctCount + ' מתוך 8 שאלות. נסה שוב לקבלת הקוד הסודי המלא!';
        }
        
        showScreen(elements.screenVictory);
        elements.hud.classList.add('hidden');
        playSound('success');
        state.activeSelectionActive = true;
      }
    }, 1200); // 1200ms corridor zoom timeout
  });

  // Restart click
  elements.btnRestart.addEventListener('click', () => {
    playSound('click');
    location.reload();
  });
}

// Navigation helper
function showScreen(screen) {
  elements.screenLogin.classList.add('hidden');
  elements.screenLogin.classList.remove('active');
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
  
  // Reset room box container class
  elements.room3dContainer.className = 'room-3d';
  
  const qData = questionsData[index];
  
  elements.questionIndexLabel.innerText = qData.indexLabel;
  elements.questionText.innerText = qData.question;
  
  // Reset feedback panel (does not show correct/incorrect)
  elements.feedbackPanel.className = 'feedback-panel idles';
  elements.feedbackText.innerText = "בחר בדלת בעלת התשובה הנכונה ביותר...";
  elements.feedbackActionArea.classList.add('hidden');
  
  // Render doors (without any letters or labels - looks like a real 3D room doorway!)
  elements.doorsContainer.innerHTML = '';
  
  qData.doors.forEach((door, idx) => {
    const container = document.createElement('div');
    container.className = 'door-container';
    
    container.innerHTML = '<div class="door-frame"></div>' +
        '<div class="door-pathway-glow">🔓</div>' +
        '<div class="door-card" id="door-card-' + idx + '">' +
          '<div class="door-front">' +
            '<div class="door-card-reader"></div>' +
            '<div class="door-screen">' + door.answer + '</div>' +
          '</div>' +
        '</div>';
    
    container.addEventListener('click', () => {
      if (!state.activeSelectionActive) return;
      handleDoorSelection(idx, door);
    });
    
    elements.doorsContainer.appendChild(container);
  });
}

// Handle clicking a door (hidden correctness during gameplay)
function handleDoorSelection(doorIdx, doorData) {
  // Clear selected class from all doors
  const cards = elements.doorsContainer.querySelectorAll('.door-card');
  cards.forEach(c => c.classList.remove('selected-door'));
  
  // Highlight clicked door
  const card = document.getElementById("door-card-" + doorIdx);
  card.classList.add('selected-door');
  
  // Store choice in state
  state.selections[state.currentQuestionIndex] = doorIdx;
  updateHUD();
  
  // Play click sound
  playSound('click');
  
  // Show next button and update description box neutrally
  elements.feedbackPanel.className = 'feedback-panel idles';
  elements.feedbackText.innerText = 'דלת נבחרה. לחץ "המשך" כדי לעבור לשלב הבא באתגר.';
  elements.feedbackActionArea.classList.remove('hidden');
}

// Auto start
window.addEventListener('DOMContentLoaded', () => {
  init();
});
