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
    question: "משה אובחן עם סוכרת סוג 2 בגיל 56 (כלומר 12 שנים לפני גיל 70). על פי מחקר ה-JAMA המפורסם משנת 2021, מהו יחס הסיכון (Hazard Ratio) שלו לפתח דמנציה בהשוואה לאדם ללא סוכרת בגיל 70?",
    doors: [
      {
        answer: "יחס סיכון (HR) של 1.11 - סיכון מוגבר קלות בלבד (תואם לפרוץ סוכרת של 5 שנים ומטה לפני גיל 70).",
        correct: false,
        explanation: "לא מדויק. יחס סיכון של 1.11 תואם למטופלים שאובחנו עם סוכרת ממש סמוך לגיל 70 (עד 5 שנים). משה אובחן הרבה קודם לכן."
      },
      {
        answer: "יחס סיכון (HR) של 1.49 - סיכון מוגבר בינוני (תואם לפרוץ סוכרת של 6 עד 10 שנים לפני גיל 70).",
        correct: false,
        explanation: "לא מדויק. יחס סיכון של 1.49 תואם למטופלים שאובחנו 6-10 שנים לפני גיל 70. משה אובחן לפני 12 שנים (מעל 10 שנים)."
      },
      {
        answer: "יחס סיכון (HR) של 2.12 - סיכון מוגבר ביותר מפי 2 (תואם לפרוץ סוכרת של מעל 10 שנים לפני גיל 70) 🗝️",
        correct: true,
        explanation: "נכון מאוד! מחקר ה-JAMA הוכיח קשר הדרגתי: ככל שהסוכרת מתפרצת מוקדם יותר, הסיכון לדמנציה עולה. אבחון מעל 10 שנים לפני גיל 70 מעלה את הסיכון פי 2.12."
      }
    ]
  },
  {
    indexLabel: "דלת 2: מבחן ה-Mini-Cog",
    question: "לפני חיבור של משה לטכנולוגיית סוכרת מתקדמת (CGM ומשאבה), ביצעת לו אומדן קוגניטיבי בעזרת מבחן Mini-Cog. משה הצליח להיזכר ב-2 מתוך 3 מילים, וציור השעון שלו (11:10) נמצא תקין לחלוטין. מהו הציון הכולל שלו, והאם הוא כשיר?",
    doors: [
      {
        answer: "ציון 2 - הוא אינו כשיר לחיבור עצמאי ומחייב מעורבות מלאה של מטפל צמוד.",
        correct: false,
        explanation: "שגיאה. ציור שעון תקין מזכה ב-2 נקודות בפני עצמו, ובנוסף משה זכר 2 מילים (עוד 2 נקודות). הציון שלו גבוה מ-2."
      },
      {
        answer: "ציון 4 - משה נמצא תקין (כשיר קוגניטיבית לחיבור לטכנולוגיה) 🗝️",
        correct: true,
        explanation: "מצוין! משה מקבל 2 נקודות על שחזור המילים ועוד 2 נקודות על השעון התקין. ציון 3 ומעלה נחשב תקין ומאפשר מעבר לטכנולוגיות מתקדמות לאחר הדרכה מתאימה."
      },
      {
        answer: "ציון 5 - משה נמצא תקין לחלוטין (ציון מקסימלי).",
        correct: false,
        explanation: "לא מדויק. ציון 5 ניתן רק אם המטופל זוכר את כל 3 המילים (3 נקודות) ומצייר שעון תקין (2 נקודות). משה זכר רק 2 מילים."
      }
    ]
  },
  {
    indexLabel: "דלת 3: יעילות CGM במבוגרים (מחקר WISDM)",
    question: "משה חושש שהטכנולוגיה לא תועיל לו בגלל גילו. בהסתמך על ממצאי מחקר ה-WISDM בקרב מבוגרים מעל גיל 60 עם סוכרת, מהי המסקנה הקלינית הרחבה לגבי יעילות הניטור הרציף (CGM)?",
    doors: [
      {
        answer: "הפחתת ההיפוגליקמיה בשימוש ב-CGM היא משמעותית ועקבית לכולם, ללא תלות בגיל או בקיום ירידה קוגניטיבית 🗝️",
        correct: true,
        explanation: "תשובה מדויקת! מחקר ה-WISDM הוכיח כי השימוש ב-CGM מפחית משמעותית ובאופן בטוח את זמן ההיפוגליקמיה, והיתרון הזה נשמר ללא קשר למאפייני הרקע, לגיל המדויק או לקיומה של ירידה קוגניטיבית קלה."
      },
      {
        answer: "CGM מפחית היפוגליקמיות רק בקרב מבוגרים מתחת לגיל 70 בעלי תפקוד קוגניטיבי מושלם.",
        correct: false,
        explanation: "שגיאה. ממצאי ה-WISDM הראו במפורש שההפחתה בהיפוגליקמיות הייתה עקבית ובלתי תלויה ביכולת הקוגניטיבית או בגיל המטופל."
      },
      {
        answer: "התועלת של CGM במבוגרים היא מועטה, וההיענות לשימוש במכשיר יורדת מתחת ל-50% כעבור 6 חודשים.",
        correct: false,
        explanation: "הפוך לגמרי! ההיענות (Adherence) במחקר WISDM הייתה גבוהה ביותר - 83% מהמשתתפים השתמשו ב-CGM מעל 6 ימים בשבוע לאורך כל תקופת המחקר."
      }
    ]
  },
  {
    indexLabel: "דלת 4: פתרון חסמים - פחד מטעויות",
    question: "משה משתף אותך בחשש שלו: 'אני מפחד לעשות נזק אם אלחץ על כפתור לא נכון במכשיר. כל הטכנולוגיה הזו נראית לי מסובכת מדי'. מהו המענה הטיפולי הנכון ביותר לחסם זה?",
    doors: [
      {
        answer: "הפעלת מצב תצוגה מונגש ומלל מוגדל במכשיר על מנת להקל על הראייה שלו.",
        correct: false,
        explanation: "לא החסם המרכזי כאן. החשש של משה נובע מחרדה טכנולוגית ופחד מטעויות (טכנופוביה), ולא מקושי פיזי של ראייה."
      },
      {
        answer: "הדרכת תרגול מובנית ואיטית, ביצוע תרגול פיזי מודרך, ובמידת האפשר שיתוף של בן משפחה תומך (Care-giver) בתהליך 🗝️",
        correct: true,
        explanation: "כל הכבוד! כדי להתגבר על חרדה טכנולוגית, מומלץ לבצע הדרכה מובנית ואיטית, לתת למטופל להתנסות בעצמו פיזית, ולרתום את קרוב המשפחה המטפל (Care-giver) כרשת ביטחון ותמיכה."
      },
      {
        answer: "חיבור שלו למוקד תמיכה טלפוני רפואי וטכנולוגי הזמין 24/7.",
        correct: false,
        explanation: "תמיכה טלפונית היא חשובה, אך היא אינה פותרת את חרדת הלמידה הראשונית ואת הפחד לתפעל את המכשיר בבית ללא הדרכה מסודרת."
      }
    ]
  },
  {
    indexLabel: "דלת 5: זכאות לחיסון Shingrix בסל",
    question: "משה מעוניין להתחסן נגד שלבקת חוגרת (חיסון Shingrix - RZV). משה הוא בן 68 ואין לו מחלות רקע מיוחדות. האם הוא זכאי לקבל את החיסון בסבסוד מלא בתוך סל הבריאות הנוכחי?",
    doors: [
      {
        answer: "לא, החיסון כלול בסל הבריאות רק למבוגרים מעל גיל 75 או למטופלים מדוכאי חיסון.",
        correct: false,
        explanation: "לא נכון. גיל הזכאות בסל ללא מחלות רקע נמוך מ-75."
      },
      {
        answer: "כן, החיסון מומלץ מגיל 50 ומעלה, וכלול בסל הבריאות ללא מחלות רקע לבני 65 ומעלה (ומשה בן 68) 🗝️",
        correct: true,
        explanation: "נכון מאוד! על פי תדריך החיסונים של משרד הבריאות, החיסון מומלץ לכל אדם מעל גיל 50, וכלול בסל הבריאות בסבסוד מלא עבור בני 65 ומעלה ללא צורך במחלת רקע."
      },
      {
        answer: "לא, החיסון אינו כלול בסל עבור אנשים בריאים, והוא ניתן רק למאובחנים שחלו בשלבקת חוגרת בשנה האחרונה.",
        correct: false,
        explanation: "שגיאה. החיסון מיועד למניעה (רפואה מונעת) וניתן ללא קשר לשאלה האם חלו בעבר (למעשה, מומלץ לתת אותו גם למי שחלה בעבר לאחר החלמת הפצעים)."
      }
    ]
  },
  {
    indexLabel: "דלת 6: טמפרטורת אחסון Shingrix",
    question: "קיבלת את ערכת חיסון ה-Shingrix (אבקה ותרחיף לשחזור). כיצד יש לאחסן את התרכיב במרפאה לפני הכנתו למשה?",
    doors: [
      {
        answer: "במקרר בטמפרטורה של 2°C עד 8°C באריזה המקורית. חל איסור מוחלט להקפיא את התרכיב! 🗝️",
        correct: true,
        explanation: "נכון ביותר! יש לשמור את החיסון במקרר (2-8 מעלות) ולהימנע מחשיפה לאור (באריזה המקורית). הקפאה של התכשיר או התרחיף תהרוס אותו ותפסול אותו לשימוש."
      },
      {
        answer: "במקפיא בטמפרטורה של 18°C- כדי למנוע פירוק של הגליקופרוטאין הרקומביננטי.",
        correct: false,
        explanation: "שגיאה חמורה! אסור להקפיא את חיסון ה-Shingrix בשום אופן. הקפאה פוגעת במבנה החלבון ובתרחיף ה-Adjuvant שלו."
      },
      {
        answer: "במדף פתוח או בארון התרופות (עד 25°C), כל עוד החיסון לא עבר שחזור עם הנוזל.",
        correct: false,
        explanation: "לא נכון. החיסון רגיש לחום וחייב להישמר בשרשרת קירור (מקרר) מרגע הייצור ועד רגע ההזרקה."
      }
    ]
  },
  {
    indexLabel: "דלת 7: לוח זמנים למנה השנייה",
    question: "משה קיבל את המנה הראשונה של חיסון ה-Shingrix כעת. מתי עליך לתאם איתו את קבלת המנה השנייה להשלמת סדרת החיסון?",
    doors: [
      {
        answer: "במרווח של 4 שבועות בדיוק (חודש אחד) מהמנה הראשונה.",
        correct: false,
        explanation: "לא מדויק. מרווח של 4 שבועות הוא המינימום האפשרי למדוכאי חיסון קשים שצריכים הגנה מזורזת, אך זהו אינו הפרוטוקול הסטנדרטי למשה."
      },
      {
        answer: "שנה שלמה (12 חודשים) לאחר מתן המנה הראשונה.",
        correct: false,
        explanation: "לא נכון. מרווח של שנה הוא ארוך מדי ועלול לפגוע ביעילות התגובה החיסונית המצטברת של הגוף."
      },
      {
        answer: "במרווח של 2 עד 6 חודשים מקבלת המנה הראשונה 🗝️",
        correct: true,
        explanation: "נכון מאוד! הפרוטוקול המקובל לאדם בריא מעל גיל 50 הוא שתי מנות בהפרש של 2 עד 6 חודשים. אם חלף יותר זמן, יש לתת את המנה השנייה בהקדם (אין צורך להתחיל את הסדרה מחדש)."
      }
    ]
  },
  {
    indexLabel: "דלת 8: שילוב חיסונים בו-זמנית",
    question: "משה מעוניין לנצל את הגעתו למרפאה ולקבל באותו יום גם את חיסון השפעת העונתי שלו. מהי ההנחיה הנכונה לגבי שילוב Shingrix עם חיסונים אחרים?",
    doors: [
      {
        answer: "ניתן לתת את החיסון בו-זמנית עם חיסון שפעת, אך יש להזריקם בגפיים שונות (או בהפרש של 2.5 ס\"מ לפחות) 🗝️",
        correct: true,
        explanation: "מצוין, עברת את האתגר! ניתן לשלב Shingrix עם כל חיסון מומת אחר בו-זמנית. הדרישה היא להזריק בגפיים שונות, או להפריד בטווח של 2.5 ס\"מ לפחות אם מזריקים באותה זרוע."
      },
      {
        answer: "אסור לשלב. יש להמתין מרווח בטיחות של 14 יום לפחות בין מתן Shingrix לכל חיסון אחר.",
        correct: false,
        explanation: "לא נכון. מכיוון ש-Shingrix הוא חיסון מומת רקומביננטי, אין שום מגבלת מרווח זמנים בינו לבין חיסונים אחרים (מומתים או חיים)."
      },
      {
        answer: "ניתן לשלבם, ומותר לשאוב את תרכיב השפעת ותרכיב ה-Shingrix לאותו מזרק כדי לחסוך דקירה.",
        correct: false,
        explanation: "שגיאה חמורה! לעולם אין לערבב תכשירים שונים באותו מזרק אלא אם כן הדבר צוין במפורש על ידי היצרן. יש להשתמש במזרקים נפרדים ובאתרי הזרקה נפרדים."
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
