// SpeakFlow 6.1 — audio-first English PWA
const courses = [{"id": 1, "title": "At the Airport", "level": "A2", "time": "12 min", "icon": "✈️", "topic": "Travel", "desc": "Check-in, gates, boarding and baggage", "slug": "airport", "phrases": [["Could I see your passport, please?", "Могу я увидеть ваш паспорт, пожалуйста?"], ["Where can I check in for my flight?", "Где я могу зарегистрироваться на рейс?"], ["Is this the line for security?", "Это очередь на досмотр?"], ["Could you tell me where gate 24 is?", "Не могли бы вы сказать, где выход 24?"], ["What time does boarding start?", "Во сколько начинается посадка?"]]}, {"id": 2, "title": "At a Hotel", "level": "A1", "time": "10 min", "icon": "🏨", "topic": "Travel", "desc": "Check in, ask questions and solve simple problems", "slug": "hotel", "phrases": [["I have a reservation under the name Smith.", "У меня бронь на имя Смит."], ["Could I check in a little early?", "Могу я заселиться немного раньше?"], ["What time is breakfast served?", "Во сколько подают завтрак?"], ["Could you send someone to fix the air conditioning?", "Не могли бы вы прислать кого-нибудь починить кондиционер?"]]}, {"id": 3, "title": "At the Restaurant", "level": "A1", "time": "10 min", "icon": "🍽️", "topic": "Everyday", "desc": "Order food, ask about dishes and pay the bill", "slug": "restaurant", "phrases": [["Could I have a table for two?", "Можно столик на двоих?"], ["What do you recommend?", "Что вы рекомендуете?"], ["Could I have this without onions?", "Можно это без лука?"], ["Could we have the bill, please?", "Можно счёт, пожалуйста?"]]}, {"id": 4, "title": "Shopping", "level": "A2", "time": "11 min", "icon": "🛍️", "topic": "Everyday", "desc": "Find sizes, compare products and return an item", "slug": "shopping", "phrases": [["Do you have this in a larger size?", "У вас есть это в большем размере?"], ["Can I try this on?", "Можно это примерить?"], ["How much does this cost?", "Сколько это стоит?"], ["Could I return this if it does not fit?", "Могу я вернуть это, если не подойдёт?"]]}, {"id": 5, "title": "Small Talk", "level": "A2", "time": "9 min", "icon": "💬", "topic": "Speaking", "desc": "Start conversations and keep them going", "slug": "small-talk", "phrases": [["How is your day going?", "Как проходит твой день?"], ["What do you do for work?", "Кем ты работаешь?"], ["How long have you lived here?", "Как давно ты здесь живёшь?"], ["That sounds interesting. Tell me more.", "Звучит интересно. Расскажи подробнее."]]}, {"id": 6, "title": "Job Interview", "level": "B1", "time": "14 min", "icon": "💼", "topic": "Career", "desc": "Talk about experience, strengths and goals", "slug": "job-interview", "phrases": [["Tell me a little about yourself.", "Расскажите немного о себе."], ["What are your main strengths?", "Каковы ваши главные сильные стороны?"], ["I am responsible for customer support.", "Я отвечаю за поддержку клиентов."], ["I am looking for a new challenge.", "Я ищу новый профессиональный вызов."], ["Why are you interested in this position?", "Почему вас заинтересовала эта должность?"]]}, {"id": 7, "title": "At Work", "level": "B1", "time": "12 min", "icon": "🏢", "topic": "Career", "desc": "Meetings, deadlines and everyday office English", "slug": "work", "phrases": [["Could we move the meeting to tomorrow?", "Можем перенести встречу на завтра?"], ["I will send you the updated file this afternoon.", "Я отправлю вам обновлённый файл сегодня днём."], ["Could you give me a quick update?", "Можете кратко рассказать о статусе?"], ["We are running a little behind schedule.", "Мы немного отстаём от графика."]]}, {"id": 8, "title": "Doctor", "level": "B1", "time": "12 min", "icon": "🩺", "topic": "Health", "desc": "Describe symptoms and understand simple medical questions", "slug": "doctor", "phrases": [["I have had a headache since yesterday.", "У меня болит голова со вчерашнего дня."], ["Where exactly does it hurt?", "Где именно болит?"], ["I have not felt well this week.", "На этой неделе я плохо себя чувствовал(а)."], ["How often should I take this medicine?", "Как часто мне принимать это лекарство?"]]}, {"id": 9, "title": "Pharmacy", "level": "A2", "time": "9 min", "icon": "💊", "topic": "Health", "desc": "Ask for common medicines and explain what you need", "slug": "pharmacy", "phrases": [["Do you have anything for a sore throat?", "У вас есть что-нибудь от боли в горле?"], ["Do I need a prescription for this?", "Для этого нужен рецепт?"], ["How often should I take it?", "Как часто это принимать?"], ["Are there any side effects I should know about?", "Есть ли побочные эффекты, о которых мне нужно знать?"]]}, {"id": 10, "title": "Taxi & Transport", "level": "A2", "time": "10 min", "icon": "🚕", "topic": "Travel", "desc": "Get around a city and ask about routes and prices", "slug": "taxi-transport", "phrases": [["Could you take me to this address?", "Вы можете отвезти меня по этому адресу?"], ["How long will it take?", "Сколько времени это займёт?"], ["Could you drop me off here, please?", "Можете высадить меня здесь, пожалуйста?"], ["Do you accept card payments?", "Вы принимаете оплату картой?"]]}, {"id": 11, "title": "Renting an Apartment", "level": "B1", "time": "14 min", "icon": "🏠", "topic": "Life", "desc": "View a flat, ask about rent and understand the contract", "slug": "renting-apartment", "phrases": [["Is the apartment still available?", "Квартира всё ещё доступна?"], ["How much is the monthly rent?", "Сколько стоит аренда в месяц?"], ["Are utilities included in the rent?", "Коммунальные услуги включены в аренду?"], ["When could I move in?", "Когда я могу въехать?"]]}, {"id": 12, "title": "Phone Calls", "level": "B1", "time": "10 min", "icon": "📞", "topic": "Everyday", "desc": "Handle calls, leave messages and clarify information", "slug": "phone-calls", "phrases": [["Could I speak to Anna, please?", "Могу я поговорить с Анной, пожалуйста?"], ["Could you put me through to customer service?", "Соедините меня со службой поддержки, пожалуйста."], ["I am calling about my appointment.", "Я звоню по поводу моей записи."], ["Could you repeat that a little more slowly?", "Не могли бы вы повторить немного медленнее?"]]}, {"id": 13, "title": "Customer Service", "level": "B2", "time": "13 min", "icon": "🎧", "topic": "Work", "desc": "Explain a problem politely and find a solution", "slug": "customer-service", "phrases": [["I am calling because there seems to be a problem with my order.", "Я звоню, потому что, кажется, возникла проблема с моим заказом."], ["Could you look into this for me?", "Не могли бы вы разобраться с этим?"], ["I would appreciate a refund or a replacement.", "Я был(а) бы благодарен(на) за возврат денег или замену."], ["Thank you for taking the time to help me.", "Спасибо, что нашли время мне помочь."]]}, {"id": 14, "title": "Making Friends", "level": "B1", "time": "10 min", "icon": "🤝", "topic": "Social", "desc": "Meet people, make plans and talk naturally", "slug": "making-friends", "phrases": [["Would you like to grab a coffee sometime?", "Не хочешь как-нибудь выпить кофе?"], ["What do you usually do at the weekend?", "Что ты обычно делаешь на выходных?"], ["I am new to the area, so I am still getting to know people.", "Я недавно здесь, поэтому пока знакомлюсь с людьми."], ["That sounds like fun. I would love to join you.", "Звучит здорово. Я с удовольствием присоединюсь."]]}, {"id": 15, "title": "Travel Conversations", "level": "B2", "time": "13 min", "icon": "🌍", "topic": "Travel", "desc": "Talk about plans, experiences and unexpected situations", "slug": "travel-conversations", "phrases": [["Have you been here before?", "Ты раньше здесь был(а)?"], ["We are planning to stay for about a week.", "Мы планируем остаться примерно на неделю."], ["We missed our connection because the first flight was delayed.", "Мы пропустили пересадку, потому что первый рейс задержали."], ["Is there anything you would recommend seeing nearby?", "Есть что-нибудь рядом, что вы посоветуете посмотреть?"]]}, {"id": 16, "title": "Study & University", "level": "B2", "time": "12 min", "icon": "🎓", "topic": "Study", "desc": "Discuss classes, assignments and academic plans", "slug": "study-university", "phrases": [["Could you explain what we need to do for the assignment?", "Можете объяснить, что нужно сделать для задания?"], ["When is the deadline for the project?", "Когда крайний срок проекта?"], ["I would like to discuss my study plan with you.", "Я хотел(а) бы обсудить с вами мой учебный план."], ["Could you recommend a good resource for this topic?", "Можете порекомендовать хороший ресурс по этой теме?"]]}, {"id": 17, "title": "Professional English", "level": "C1", "time": "15 min", "icon": "📈", "topic": "Career", "desc": "Express ideas, negotiate and handle professional discussions", "slug": "professional-english", "phrases": [["From my perspective, the main issue is the lack of clear priorities.", "С моей точки зрения, главная проблема — отсутствие чётких приоритетов."], ["I would suggest looking at the issue from a different angle.", "Я бы предложил(а) посмотреть на вопрос под другим углом."], ["Could we explore a few alternatives before making a decision?", "Можем рассмотреть несколько альтернатив перед принятием решения?"], ["I see your point, but I am not sure the data supports that conclusion.", "Я понимаю вашу точку зрения, но не уверен(а), что данные подтверждают этот вывод."]]}, {"id": 18, "title": "Everyday English", "level": "A1", "time": "10 min", "icon": "☀️", "topic": "Everyday", "desc": "The most useful phrases for daily life", "slug": "everyday-english", "phrases": [["Could you help me, please?", "Не могли бы вы мне помочь?"], ["Sorry, I did not catch that.", "Извините, я не расслышал(а)."], ["Could you say that again?", "Не могли бы вы повторить?"], ["That sounds good to me.", "Меня это устраивает."]]}];
window.__speakflowCourses = courses;

const STORAGE_KEY = 'speakflow-v6';
const defaultState = {tab:'home', level:'A2', streak:1, completed:[], minutes:0, xp:0};
let state;
try { state = {...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')}; }
catch { state = {...defaultState}; }

const screen = document.getElementById('screen');
const streakEl = document.getElementById('streak');
if (streakEl) streakEl.textContent = state.streak;

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

function setTab(tab){
  state.tab = tab; save(); render();
  document.querySelectorAll('.tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
}
document.querySelectorAll('.tabbar button').forEach(b => b.onclick = () => setTab(b.dataset.tab));

function render(){
  if(state.tab==='home') home();
  else if(state.tab==='learn') learn();
  else if(state.tab==='practice') practice();
  else progress();
}

function home(){
  const done = state.completed.length;
  const next = courses.find(c => !state.completed.includes(c.id)) || courses[0];
  const pct = Math.round(done / courses.length * 100);
  screen.innerHTML = `
  <section class="hero">
    <small>YOUR NEXT LESSON · ${state.level}</small>
    <h2>${next.icon} ${esc(next.title)}</h2>
    <p>${esc(next.desc)}. Listen → repeat → speak.</p>
    <button class="btn btn-light" onclick="openLesson(${next.id})">Continue lesson →</button>
  </section>
  <div class="section-title"><h3>Your learning plan</h3><span class="muted">${done}/${courses.length}</span></div>
  <div class="card">
    <div class="between"><b>${state.level} English</b><b>${pct}%</b></div>
    <div class="progressbar"><i style="width:${pct}%"></i></div>
    <p class="muted">Whole phrases · Kokoro audio · Shadowing · Offline practice</p>
  </div>
  <div class="section-title"><h3>Lisn-style routine</h3></div>
  <div class="grid">
    <div class="stat"><strong>🎧</strong><span>Listen</span></div>
    <div class="stat"><strong>🗣️</strong><span>Repeat</span></div>
    <div class="stat"><strong>🔁</strong><span>Shadow</span></div>
    <div class="stat"><strong>🤖</strong><span>Speak</span></div>
  </div>
  <div class="notice">Audio is pre-generated with Kokoro and served as static WAV files. Your iPhone does not run the neural model.</div>`;
}

function learn(){
  const levels=['A1','A2','B1','B2','C1'];
  const selected=courses.filter(c=>c.level===state.level);
  screen.innerHTML = `
  <div class="section-title"><h3>Courses</h3><span class="muted">18 lessons</span></div>
  <div class="chips">${levels.map(l=>`<button class="chip ${l===state.level?'selected':''}" onclick="setLevel('${l}')">${l}</button>`).join('')}</div>
  <div class="section-title"><h3>${state.level} plan</h3><span class="muted">${selected.length} courses</span></div>
  ${selected.map(courseCard).join('')}
  <div class="section-title"><h3>All themes</h3></div>
  ${courses.filter(c=>c.level!==state.level).map(courseCard).join('')}`;
}

function setLevel(level){state.level=level;save();learn();}
function courseCard(c){
  const done=state.completed.includes(c.id);
  return `<button class="card course-card" onclick="openLesson(${c.id})">
    <span class="icon">${c.icon}</span><span class="course-copy"><b>${esc(c.title)}</b>
    <small>${c.level} · ${c.time} · ${esc(c.topic)}</small><span>${esc(c.desc)}</span></span>
    <strong>${done?'✓':'›'}</strong>
  </button>`;
}

function voiceStatusText(){
  const v=window.voiceEngine||{};
  if(v.state==='ready') return '🧠 Kokoro US English ready';
  if(v.state==='loading') return `⏳ Checking audio pack${v.progress?` · ${v.progress}%`:''}`;
  if(v.state==='error') return `⚠️ ${v.error||'Audio pack error'}`;
  return '🧠 Kokoro US English · af_heart';
}
function updateVoiceStatus(){
  const el=document.getElementById('voiceStatus'); if(el) el.textContent=voiceStatusText();
}
window.addEventListener('speakflow-voice-status', updateVoiceStatus);

async function prepareCourseAudio(id){
  const c=courses.find(x=>x.id===id); if(!c) return;
  const btn=document.getElementById('prepareBtn');
  if(btn){btn.disabled=true;btn.textContent='Preparing audio…';}
  try{
    await window.prefetchLessonAudio(c.phrases,0,(i,total)=>{
      if(btn) btn.textContent=`Preparing ${i}/${total}…`;
    });
    if(btn) btn.textContent='✓ Lesson audio ready';
  }catch(e){
    if(btn) btn.textContent='⚠️ Audio unavailable';
  }finally{
    if(btn) btn.disabled=false;
  }
}

function practice(){
  screen.innerHTML=`
  <div class="section-title"><h3>Practice</h3></div>
  <div class="card">
    <div class="lesson-row"><div class="icon">🇺🇸</div><div><b>US English · Kokoro af_heart</b><div class="muted" id="voiceStatus">${voiceStatusText()}</div></div></div>
    <button class="btn btn-dark full" onclick="prepareNeuralVoice()">Load audio pack</button>
    <button class="btn full" onclick="testNeuralEnglish()">▶ Test US English</button>
  </div>
  <div class="card">
    <div class="lesson-row"><div class="icon">🎧</div><div><b>Audio-first lessons</b><div class="muted">Static Kokoro WAV files are cached on the device.</div></div></div>
    <button class="btn btn-dark full" onclick="openLesson(1)">Open Airport</button>
  </div>
  <div class="card">
    <div class="lesson-row"><div class="icon">🔁</div><div><b>Shadowing</b><div class="muted">Listen and repeat immediately.</div></div></div>
    <button class="btn btn-dark full" onclick="openLesson(5)">Start shadowing</button>
  </div>
  <div class="card">
    <div class="lesson-row"><div class="icon">🤖</div><div><b>Conversation demo</b><div class="muted">Offline phrase-based conversation practice.</div></div></div>
    <button class="btn btn-dark full" onclick="chatDemo()">Open conversation</button>
  </div>`;
  updateVoiceStatus();
}

function progress(){
  const pct=Math.round(state.completed.length/courses.length*100);
  screen.innerHTML=`
  <div class="section-title"><h3>Progress</h3></div>
  <div class="grid">
    <div class="stat"><strong>${state.xp}</strong><span>XP</span></div>
    <div class="stat"><strong>${state.minutes}</strong><span>Minutes</span></div>
    <div class="stat"><strong>${state.completed.length}</strong><span>Lessons</span></div>
    <div class="stat"><strong>🔥 ${state.streak}</strong><span>Streak</span></div>
  </div>
  <div class="section-title"><h3>Course completion</h3></div>
  <div class="card"><div class="between"><b>18 lessons</b><b>${pct}%</b></div><div class="progressbar"><i style="width:${pct}%"></i></div></div>`;
}

function renderLesson(c,i){
  const p=c.phrases[i];
  window.currentPhrase=i;
  screen.innerHTML=`
  <div class="lesson-head"><button class="back" onclick="setTab('learn')">← Back</button><span>${i+1}/${c.phrases.length}</span></div>
  <div class="card lesson-card">
    <span class="chip selected">${c.level} · ${esc(c.topic)}</span>
    <div class="phrase">${esc(p[0])}</div>
    <div class="translation">${esc(p[1])}</div>
    <div class="audio-row">
      <button class="btn btn-dark" id="listenBtn" onclick='playPhrase(${JSON.stringify(p[0])})'>▶ Listen</button>
      <button class="btn" onclick='speak(${JSON.stringify(p[1])},"ru-RU")'>🇷🇺 Перевод</button>
    </div>
    <button class="btn full" id="prepareBtn" onclick="prepareCourseAudio(${c.id})">💾 Prepare lesson audio</button>
    <hr>
    <div class="shadow">
      <b>Shadowing</b><div class="muted">Listen → repeat immediately</div>
      <button class="bigmic" id="mic">🎙️</button>
      <div class="feedback" id="feedback">Tap the microphone and say the phrase.</div>
    </div>
  </div>
  <button class="btn btn-dark full" id="next">${i===c.phrases.length-1?'Finish lesson':'Next phrase →'}</button>`;
  document.getElementById('next').onclick=()=>{
    if(i<c.phrases.length-1){renderLesson(c,i+1);window.prefetchLessonAudio(c.phrases,i+1);}
    else finishLesson(c.id);
  };
  document.getElementById('mic').onclick=startSpeech;
  window.prefetchLessonAudio(c.phrases,i);
}

function openLesson(id){const c=courses.find(x=>x.id===id);if(c)renderLesson(c,0);}

function startSpeech(){
  const out=document.getElementById('feedback');
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){out.textContent='Speech recognition is not available in this browser.';return;}
  const r=new SR(); r.lang='en-US'; r.interimResults=false; r.maxAlternatives=1;
  out.textContent='Listening…';
  r.onresult=e=>{
    const said=e.results[0][0].transcript;
    out.innerHTML=`You said: <b>${esc(said)}</b><br><span class="ok">✓ Good. Listen again and repeat.</span>`;
  };
  r.onerror=()=>out.textContent="I couldn't hear that. Please try again.";
  r.start();
}

function finishLesson(id){
  if(!state.completed.includes(id)) state.completed.push(id);
  state.xp+=50; state.minutes+=10; save();
  screen.innerHTML=`<div class="card done"><div class="trophy">🎉</div><h2>Lesson complete!</h2><p class="muted">+50 XP · +10 minutes</p><button class="btn btn-dark" onclick="setTab('home')">Continue</button></div>`;
}

let cachedVoices=[];
function loadVoices(){
  if(!('speechSynthesis' in window))return;
  const refresh=()=>cachedVoices=speechSynthesis.getVoices()||[];
  refresh(); if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',refresh);
}
loadVoices();
function pickVoice(lang){
  const voices=(cachedVoices.length?speechSynthesis.getVoices():cachedVoices)||[];
  return voices.find(v=>v.lang?.toLowerCase()===lang.toLowerCase())||voices.find(v=>v.lang?.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()))||null;
}
function speak(text,lang='en-US'){
  if(!('speechSynthesis'in window))return;
  speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang=lang; u.rate=.95;
  const voice=pickVoice(lang); if(voice)u.voice=voice; speechSynthesis.speak(u);
}
async function playPhrase(text){
  const out=document.getElementById('feedback');
  try{
    const ok=await window.neuralSpeak(text);
    if(!ok && out) out.textContent='Audio file is not available yet. Run Generate Kokoro audio in GitHub Actions.';
  }catch(e){if(out)out.textContent='Audio file is not available yet.';}
}
async function testNeuralEnglish(){
  await playPhrase(courses[0].phrases[0][0]);
}
function chatDemo(){
  screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('practice')">← Back</button><b>Everyday English</b></div>
  <div class="card"><div class="chat" id="chat"><div class="bubble">Hi! Nice to meet you. What do you usually do at the weekend?</div></div>
  <div class="inputrow"><input id="msg" placeholder="Type your answer…"><button class="btn btn-dark" onclick="sendMsg()">Send</button></div></div>
  <div class="notice">Offline demo. No API key is required.</div>`;
}
function sendMsg(){
  const input=document.getElementById('msg'),v=input.value.trim(); if(!v)return;
  const chat=document.getElementById('chat'); chat.innerHTML+=`<div class="bubble me">${esc(v)}</div>`; input.value='';
  setTimeout(()=>chat.innerHTML+=`<div class="bubble">A natural way to continue could be: <b>That sounds interesting. Tell me more.</b></div>`,350);
}
render();
