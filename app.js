// Game State
const state = {
 currentQuestionIndex: 0,
 soundEnabled: true,
 feedbackMode: 'immediate', // 'immediate' or 'summary'
 selections: new Array(8).fill(null), // tracks chosen door index (0, 1, 2) for each question
 activeSelectionActive: true,
 questionAnswered: false
};

// 8 Clinical Questions Database
const questionsData = [
 {
 indexLabel: "דלת 1: סיכון דמנציה מול משך סוכרת",
 question: "כיצד סוכרת בגיל מבוגר משפיעה על הסיכון לפתח דמנציה על פי מחקר ה-JAMA?",
 doors: [
 {
 answer: "סוכרת אינה משפיעה בכלל על הסיכון לפתח דמנציה.",
 correct: false,
 explanation: "סוכרת בגיל מבוגר מהווה גורם סיכון מוכח לפגיעה וסקולרית ועצבית במוח."
 },
 {
 answer: "סוכרת בגיל מבוגר מעלה משמעותית את הסיכון לדמנציה, במיוחד אם היא נמשכת שנים רבות",
 correct: true,
 explanation: "אבחון של סוכרת מעל 10 שנים לפני גיל 70 מעלה את הסיכון לדמנציה פי 2.12."
 },
 {
 answer: "סוכרת דווקא מגינה על המוח ומפחיתה את הסיכון לירידה קוגניטיבית.",
 correct: false,
 explanation: "סוכרת אינה מגינה על המוח אלא מגבירה סיכון לירידה קוגניטיבית."
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
 explanation: "ציון נמוך מ-3 מעיד על חשד לירידה קוגניטיבית ומחייב סיוע או הערכה מעמיקה."
 },
 {
 answer: "ציון 3 ומעלה (ציון המעיד על תפקוד קוגניטיבי תקין)",
 correct: true,
 explanation: "ציון 3 ומעלה במבחן ה-Mini-Cog (למשל ציון 4 של משה) נחשב תקין ומאפשר שימוש עצמאי בטכנולוגיה."
 },
 {
 answer: "אין צורך בציון כלל, כולם יכולים להשתמש בטכנולוגיה ללא אומדן.",
 correct: false,
 explanation: "אומדן קוגניטיבי חיוני להבטחת בטיחות המטופל בתפעול מכשירים ומזרקים."
 }
 ]
 },
 {
 indexLabel: "דלת 3: יעילות CGM במבוגרים (מחקר WISDM)",
 question: "מהו היתרון המרכזי של שימוש בסנסור סוכר (CGM) אצל קשישים על פי מחקר ה-WISDM?",
 doors: [
 {
 answer: "הוא מפחית משמעותית אירועי היפוגליקמיה (נפילות סוכר) מסוכנות",
 correct: true,
 explanation: "מחקר ה-WISDM הוכיח כי ניטור רציף (CGM) מפחית משמעותית את משך השהייה בהיפוגליקמיה ומעלה את הזמן בטווח המטרה (TIR)."
 },
 {
 answer: "הוא מחליף לחלוטין את הצורך בפעילות גופנית או תזונה נכונה.",
 correct: false,
 explanation: "הסנסור מנטר אך אינו תחליף לאורח חיים בריא ותזונה מאוזנת."
 },
 {
 answer: "הוא מונע לחלוטין הופעה של מחלות לב וכלי דם.",
 correct: false,
 explanation: "הסנסור מסייע באיזון רמות הסוכר, אך אינו תרופה המונעת ישירות מחלות קרדיווסקולריות."
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
 explanation: "גישה זו מגבירה חרדה ומובילה לנטישת הטכנולוגיה והטיפול."
 },
 {
 answer: "ניתן לו הדרכה סבלנית ואיטית, נבצע תרגול פיזי מודרך, ונשתף קרוב משפחה תומך",
 correct: true,
 explanation: "הדרכה מעשית, חזרה על פעולות בסביבה תומכת ושיתוף בן משפחה מעניקים ביטחון ומסירים חסמים טכנולוגיים."
 },
 {
 answer: "נעביר אותו מיד לטיפול ישן יותר של זריקות ודקירות אצבע מרובות.",
 correct: false,
 explanation: "הדרכה נכונה עדיפה בהרבה על שלילת היתרונות הטכנולוגיים של סנסור מודרני."
 }
 ]
 },
 {
 indexLabel: "דלת 5: זכאות לחיסון Shingrix בסל",
 question: "משה הוא בן 68 וללא מחלות רקע. האם הוא זכאי לקבל את החיסון לשלבקת חוגרת (Shingrix) בחינם בסל הבריאות?",
 doors: [
 {
 answer: "כן, החיסון כלול בסל הבריאות לכל אזרח מגיל 65 ומעלה",
 correct: true,
 explanation: "על פי הנחיות משרד הבריאות וסל הבריאות, החיסון Shingrix מסובסד באופן מלא לכל אדם מגיל 65."
 },
 {
 answer: "לא, החיסון כלול בסל רק לילדים קטנים בטיפת חלב.",
 correct: false,
 explanation: "החיסון מיועד למבוגרים מגיל 50 למניעת שלבקת חוגרת והכאב העצבי הכרוני (PHN)."
 },
 {
 answer: "לא, החיסון ניתן בחינם רק למי שכבר חלה בשלבקת חוגרת שלוש פעמים בעבר.",
 correct: false,
 explanation: "החיסון מומלץ למניעה לכל המבוגרים ללא תלות במספר מקרי עבר."
 }
 ]
 },
 {
 indexLabel: "דלת 6: טמפרטורת אחסון Shingrix",
 question: "היכן עלינו לשמור את חיסון ה-Shingrix במרפאה לפני הכנתו למשה?",
 doors: [
 {
 answer: "במקרר רגיל (בטמפרטורה של 2°C עד 8°C). חל איסור מוחלט להקפיא את החיסון!",
 correct: true,
 explanation: "יש לשמור במקרר רגיל (2-8 מעלות) באריזה המקורית. הקפאה הורסת את האנטיגן והאדג'ובנט."
 },
 {
 answer: "במקפיא בטמפרטורה של 18°C- כדי לשמור על האנטיגנים יציבים.",
 correct: false,
 explanation: "חל איסור מוחלט להקפיא את החיסון; הקפאה פוגעת ביעילותו."
 },
 {
 answer: "על המדף בארון התרופות בטמפרטורת החדר.",
 correct: false,
 explanation: "ללא קירור מתאים החיסון מאבד את יציבותו ויעילותו."
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
 explanation: "שבוע הוא מרווח קצר מדי שאינו מאפשר בניית זיכרון חיסוני מספק."
 },
 {
 answer: "כעבור שנתיים שלמות.",
 correct: false,
 explanation: "שנתיים הן מרווח ארוך מדי המותיר את המטופל חשוף להדבקה."
 },
 {
 answer: "כעבור 2 עד 6 חודשים מקבלת המנה הראשונה",
 correct: true,
 explanation: "לוח הזמנים המומלץ למתן המנה השנייה במבוגרים הוא 2 עד 6 חודשים לאחר המנה הראשונה."
 }
 ]
 },
 {
 indexLabel: "דלת 8: שילוב חיסונים בו-זמנית",
 question: "האם מותר לתת למשה את חיסון ה-Shingrix ואת חיסון השפעת העונתי באותו היום?",
 doors: [
 {
 answer: "כן, מותר לתת באותו יום, במזרקים שונים ובזרועות שונות",
 correct: true,
 explanation: "ניתן לשלב מתן של Shingrix וחיסון שפעת באותו ביקור, במזרקים שונים ובאתרי הזרקה נפרדים."
 },
 {
 answer: "אסור בהחלט. יש להמתין לפחות חודש שלם בין חיסון לחיסון.",
 correct: false,
 explanation: "אין מניעה לשלב חיסונים אלו באותו היום באתרים שונים."
 },
 {
 answer: "מותר, ואף מומלץ לשאוב את שניהם יחד לתוך אותו מזרק כדי לחסוך דקירה.",
 correct: false,
 explanation: "חל איסור לערבב חיסונים שונים באותו מזרק."
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
 room3dContainer: document.getElementById('room-3d-container'),
 doorsContainer: document.getElementById('doors-container'),
 feedbackPanel: document.getElementById('feedback-panel'),
 feedbackText: document.getElementById('feedback-text'),
 feedbackActionArea: document.getElementById('feedback-action-area'),
 btnNextQuestion: document.getElementById('btn-next-question'),
 
 // Transition elements
 transitionOverlay: document.getElementById('transition-overlay'),

 // Feedback Mode Selector elements
 modeCardImmediate: document.getElementById('mode-card-immediate'),
 modeCardSummary: document.getElementById('mode-card-summary'),

 // Victory & Assessment elements
 finalScorePercent: document.getElementById('final-score-percent'),
 finalScoreRatio: document.getElementById('final-score-ratio'),
 finalScoreFeedback: document.getElementById('final-score-feedback'),
 reviewListContainer: document.getElementById('review-list-container'),

 // General actions
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
 // Mode selector cards
 const modeRadios = document.querySelectorAll('input[name="feedback-mode"]');
 modeRadios.forEach(radio => {
 radio.addEventListener('change', (e) => {
 state.feedbackMode = e.target.value;
 if (elements.modeCardImmediate) {
 elements.modeCardImmediate.classList.toggle('selected', state.feedbackMode === 'immediate');
 }
 if (elements.modeCardSummary) {
 elements.modeCardSummary.classList.toggle('selected', state.feedbackMode === 'summary');
 }
 playSound('click');
 });
 });

 // Start Game click (Welcome page "להתחלה לחצו כאן")
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
 
 // Set dynamic transition image to show progression in space
 const transitionImages = [
 'clinic_corridor.png',
 'clinic_reception.png',
 'clinic_lab.png',
 'clinic_scanner.png',
 'clinic_server.png',
 'clinic_icu.png',
 'clinic_gate.png',
 'clinic_vault.png'
 ];
 const nextImg = transitionImages[state.currentQuestionIndex % transitionImages.length];
 const bgElement = elements.transitionOverlay.querySelector('.transition-bg');
 if (bgElement) {
 bgElement.style.backgroundImage = "url('" + nextImg + "')";
 }
 
 // Show full-screen atmospheric transition corridor overlay after a short delay
 setTimeout(() => {
 elements.transitionOverlay.classList.remove('hidden');
 elements.transitionOverlay.classList.add('active');
 }, 300);
 
 setTimeout(() => {
 const nextIndex = state.currentQuestionIndex + 1;
 if (nextIndex < questionsData.length) {
 loadQuestion(nextIndex);
 
 // emerging walk-out effect in the next room box
 elements.room3dContainer.className = 'room-3d fade-enter';
 // Force reflow
 elements.room3dContainer.offsetHeight;
 elements.room3dContainer.classList.remove('fade-enter');
 
 // Hide transition overlay
 elements.transitionOverlay.classList.remove('active');
 setTimeout(() => {
 elements.transitionOverlay.classList.add('hidden');
 state.activeSelectionActive = true;
 }, 400);
 } else {
 // Completed all questions! Evaluate selections
 let correctCount = 0;
 questionsData.forEach((q, idx) => {
 const userChoice = state.selections[idx];
 if (userChoice !== null && q.doors[userChoice].correct) {
 correctCount++;
 }
 });
 
 const total = questionsData.length;
 const percent = Math.round((correctCount / total) * 100);
 
 // Relative percentage score display
 elements.finalScorePercent.innerText = percent + '%';
 elements.finalScoreRatio.innerText = 'ענית נכון על ' + correctCount + ' מתוך ' + total + ' שאלות';
 
 if (percent === 100) {
 elements.finalScoreFeedback.innerText = 'מושלם! שליטה מצוינת ודיוק קליני מלא בהנחיות הטיפול והאומדן.';
 } else if (percent >= 75) {
 elements.finalScoreFeedback.innerText = 'ביצוע מרשים מאוד! הפגנת ידע קליני מעמיק בהתאמת הטיפול והטכנולוגיה.';
 } else if (percent >= 50) {
 elements.finalScoreFeedback.innerText = 'תוצאה טובה! מומלץ לעיין בהסברים המפורטים למטה כדי להעמיק בהנחיות.';
 } else {
 elements.finalScoreFeedback.innerText = 'התנסות טובה! מומלץ לעבור ביסודיות על ההסברים הקליניים למטה ולנסות שוב.';
 }
 
 // Populate Detailed Review List
 elements.reviewListContainer.innerHTML = '';
 questionsData.forEach((q, idx) => {
 const userChoice = state.selections[idx];
 const isCorrect = userChoice !== null && q.doors[userChoice].correct;
 const correctDoor = q.doors.find(d => d.correct);
 const userDoor = userChoice !== null ? q.doors[userChoice] : null;

 const card = document.createElement('div');
 card.className = 'review-card ' + (isCorrect ? 'correct-item' : 'incorrect-item');
 
 card.innerHTML = 
 '<div class="review-card-header">' +
 '<span class="review-q-title">דלת ' + (idx + 1) + ': ' + q.question + '</span>' +
 '<span class="review-badge ' + (isCorrect ? 'correct' : 'incorrect') + '">' +
 (isCorrect ? '✔️ תשובה נכונה' : '❌ תשובה שגויה') +
 '</span>' +
 '</div>' +
 '<div class="review-answers">' +
 (userDoor ? '<div class="review-user-ans"><strong>תשובתך:</strong> ' + userDoor.answer.replace('', '').trim() + '</div>' : '') +
 (!isCorrect && correctDoor ? '<div class="review-correct-ans"><strong>התשובה הנכונה:</strong> ' + correctDoor.answer.replace('', '').trim() + '</div>' : '') +
 '</div>' +
 '<div class="review-explanation">' +
 '<strong>הסבר קליני:</strong> ' + (correctDoor ? correctDoor.explanation : '') +
 '</div>';

 elements.reviewListContainer.appendChild(card);
 });

 // Hide transition overlay and show victory screen
 elements.transitionOverlay.classList.remove('active');
 setTimeout(() => {
 elements.transitionOverlay.classList.add('hidden');
 showScreen(elements.screenVictory);
 elements.hud.classList.add('hidden');
 playSound('success');
 state.activeSelectionActive = true;
 }, 400);
 }
 }, 1400);
 });

 // Restart click
 elements.btnRestart.addEventListener('click', () => {
 playSound('click');
 location.reload();
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
 state.questionAnswered = false;
 updateHUD();
 
 // Reset room box container class
 elements.room3dContainer.className = 'room-3d';
 
 const qData = questionsData[index];
 
 elements.questionIndexLabel.innerText = qData.indexLabel;
 elements.questionText.innerText = qData.question;
 
 // Reset feedback panel
 elements.feedbackPanel.className = 'feedback-panel idles';
 elements.feedbackText.innerText = "בחר בדלת בעלת התשובה הנכונה ביותר...";
 elements.feedbackActionArea.classList.add('hidden');
 elements.btnNextQuestion.innerText = "לפתח את הדלת ➡️";
 
 // Render doors
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

// Handle clicking a door
function handleDoorSelection(doorIdx, doorData) {
 // If in immediate mode and question already answered, do not allow changing
 if (state.feedbackMode === 'immediate' && state.questionAnswered) {
 return;
 }
 
 // Clear previous selection classes from all doors
 const cards = elements.doorsContainer.querySelectorAll('.door-card');
 cards.forEach(c => {
 c.classList.remove('selected-door', 'selected-door-correct', 'selected-door-incorrect', 'selected-door-reveal-correct');
 });
 
 // Store choice in state
 state.selections[state.currentQuestionIndex] = doorIdx;
 updateHUD();
 
 const card = document.getElementById("door-card-" + doorIdx);
 const qData = questionsData[state.currentQuestionIndex];
 
 if (state.feedbackMode === 'immediate') {
 state.questionAnswered = true;
 
 if (doorData.correct) {
 card.classList.add('selected-door-correct');
 playSound('success');
 elements.feedbackPanel.className = 'feedback-panel correct';
 elements.feedbackText.innerHTML = '<strong>תשובה נכונה! 🌟</strong> ' + doorData.explanation;
 } else {
 card.classList.add('selected-door-incorrect');
 playSound('error');
 // Reveal correct door
 const correctIdx = qData.doors.findIndex(d => d.correct);
 if (correctIdx !== -1) {
 const correctCard = document.getElementById("door-card-" + correctIdx);
 if (correctCard) correctCard.classList.add('selected-door-reveal-correct');
 }
 elements.feedbackPanel.className = 'feedback-panel incorrect';
 elements.feedbackText.innerHTML = '<strong>תשובה לא נכונה. ❌</strong> ' + doorData.explanation;
 }
 
 elements.btnNextQuestion.innerText = "לפתוח את הדלת ולהתקדם ➡️";
 elements.feedbackActionArea.classList.remove('hidden');
 
 } else {
 // Summary feedback mode: Neutral selection
 card.classList.add('selected-door');
 playSound('click');
 
 elements.feedbackPanel.className = 'feedback-panel idles';
 elements.feedbackText.innerText = 'דלת נבחרה. לחץ "לפתח את הדלת" כדי לפתוח אותה ולהתקדם.';
 elements.btnNextQuestion.innerText = "לפתח את הדלת ➡️";
 elements.feedbackActionArea.classList.remove('hidden');
 }
}

// Auto start
window.addEventListener('DOMContentLoaded', () => {
 init();
});
