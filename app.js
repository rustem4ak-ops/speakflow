const courses = [
  {id:1,title:'At the Airport',level:'A2',time:'12 min',icon:'✈️',topic:'Travel',desc:'Check-in, gates, boarding and baggage',phrases:[
    ['Could I see your passport, please?','Могу я увидеть ваш паспорт, пожалуйста?'],
    ['Where can I check in for my flight?','Где я могу зарегистрироваться на рейс?'],
    ['Is this the line for security?','Это очередь на досмотр?'],
    ['Could you tell me where gate 24 is?','Не могли бы вы сказать, где выход 24?'],
    ['What time does boarding start?','Во сколько начинается посадка?'] ]},
  {id:2,title:'At a Hotel',level:'A1',time:'10 min',icon:'🏨',topic:'Travel',desc:'Check in, ask questions and solve simple problems',phrases:[
    ['I have a reservation under the name Smith.','У меня бронь на имя Смит.'],
    ['Could I check in a little early?','Могу я заселиться немного раньше?'],
    ['What time is breakfast served?','Во сколько подают завтрак?'],
    ['Could you send someone to fix the air conditioning?','Не могли бы вы прислать кого-нибудь починить кондиционер?'] ]},
  {id:3,title:'At the Restaurant',level:'A1',time:'10 min',icon:'🍽️',topic:'Everyday',desc:'Order food, ask about dishes and pay the bill',phrases:[
    ['Could I have a table for two?','Можно столик на двоих?'],
    ['What do you recommend?','Что вы рекомендуете?'],
    ['Could I have this without onions?','Можно это без лука?'],
    ['Could we have the bill, please?','Можно счёт, пожалуйста?'] ]},
  {id:4,title:'Shopping',level:'A2',time:'11 min',icon:'🛍️',topic:'Everyday',desc:'Find sizes, compare products and return an item',phrases:[
    ['Do you have this in a larger size?','У вас есть это в большем размере?'],
    ['Can I try this on?','Можно это примерить?'],
    ['How much does this cost?','Сколько это стоит?'],
    ['Could I return this if it does not fit?','Могу я вернуть это, если не подойдёт?'] ]},
  {id:5,title:'Small Talk',level:'A2',time:'9 min',icon:'💬',topic:'Speaking',desc:'Start conversations and keep them going',phrases:[
    ['How is your day going?','Как проходит твой день?'],
    ['What do you do for work?','Кем ты работаешь?'],
    ['How long have you lived here?','Как давно ты здесь живёшь?'],
    ['That sounds interesting. Tell me more.','Звучит интересно. Расскажи подробнее.'] ]},
  {id:6,title:'Job Interview',level:'B1',time:'14 min',icon:'💼',topic:'Career',desc:'Talk about experience, strengths and goals',phrases:[
    ['Tell me a little about yourself.','Расскажите немного о себе.'],
    ['What are your main strengths?','Каковы ваши главные сильные стороны?'],
    ['I am responsible for customer support.','Я отвечаю за поддержку клиентов.'],
    ['I am looking for a new challenge.','Я ищу новый профессиональный вызов.'],
    ['Why are you interested in this position?','Почему вас заинтересовала эта должность?'] ]},
  {id:7,title:'At Work',level:'B1',time:'12 min',icon:'🏢',topic:'Career',desc:'Meetings, deadlines and everyday office English',phrases:[
    ['Could we move the meeting to tomorrow?','Можем перенести встречу на завтра?'],
    ['I will send you the updated file this afternoon.','Я отправлю вам обновлённый файл сегодня днём.'],
    ['Could you give me a quick update?','Можете кратко рассказать о статусе?'],
    ['We are running a little behind schedule.','Мы немного отстаём от графика.'] ]},
  {id:8,title:'Doctor',level:'B1',time:'12 min',icon:'🩺',topic:'Health',desc:'Describe symptoms and understand simple medical questions',phrases:[
    ['I have had a headache since yesterday.','У меня болит голова со вчерашнего дня.'],
    ['Where exactly does it hurt?','Где именно болит?'],
    ['I have not felt well this week.','На этой неделе я плохо себя чувствовал(а).'],
    ['How often should I take this medicine?','Как часто мне принимать это лекарство?'] ]},
  {id:9,title:'Pharmacy',level:'A2',time:'9 min',icon:'💊',topic:'Health',desc:'Ask for common medicines and explain what you need',phrases:[
    ['Do you have anything for a sore throat?','У вас есть что-нибудь от боли в горле?'],
    ['Do I need a prescription for this?','Для этого нужен рецепт?'],
    ['How often should I take it?','Как часто это принимать?'],
    ['Are there any side effects I should know about?','Есть ли побочные эффекты, о которых мне нужно знать?'] ]},
  {id:10,title:'Taxi & Transport',level:'A2',time:'10 min',icon:'🚕',topic:'Travel',desc:'Get around a city and ask about routes and prices',phrases:[
    ['Could you take me to this address?','Вы можете отвезти меня по этому адресу?'],
    ['How long will it take?','Сколько времени это займёт?'],
    ['Could you drop me off here, please?','Можете высадить меня здесь, пожалуйста?'],
    ['Do you accept card payments?','Вы принимаете оплату картой?'] ]},
  {id:11,title:'Renting an Apartment',level:'B1',time:'14 min',icon:'🏠',topic:'Life',desc:'View a flat, ask about rent and understand the contract',phrases:[
    ['Is the apartment still available?','Квартира всё ещё доступна?'],
    ['How much is the monthly rent?','Сколько стоит аренда в месяц?'],
    ['Are utilities included in the rent?','Коммунальные услуги включены в аренду?'],
    ['When could I move in?','Когда я могу въехать?'] ]},
  {id:12,title:'Phone Calls',level:'B1',time:'10 min',icon:'📞',topic:'Everyday',desc:'Handle calls, leave messages and clarify information',phrases:[
    ['Could I speak to Anna, please?','Могу я поговорить с Анной, пожалуйста?'],
    ['Could you put me through to customer service?','Соедините меня со службой поддержки, пожалуйста.'],
    ['I am calling about my appointment.','Я звоню по поводу моей записи.'],
    ['Could you repeat that a little more slowly?','Не могли бы вы повторить немного медленнее?'] ]},
  {id:13,title:'Customer Service',level:'B2',time:'13 min',icon:'🎧',topic:'Work',desc:'Explain a problem politely and find a solution',phrases:[
    ['I am calling because there seems to be a problem with my order.','Я звоню, потому что, кажется, возникла проблема с моим заказом.'],
    ['Could you look into this for me?','Не могли бы вы разобраться с этим?'],
    ['I would appreciate a refund or a replacement.','Я был(а) бы благодарен(на) за возврат денег или замену.'],
    ['Thank you for taking the time to help me.','Спасибо, что нашли время мне помочь.'] ]},
  {id:14,title:'Making Friends',level:'B1',time:'10 min',icon:'🤝',topic:'Social',desc:'Meet people, make plans and talk naturally',phrases:[
    ['Would you like to grab a coffee sometime?','Не хочешь как-нибудь выпить кофе?'],
    ['What do you usually do at the weekend?','Что ты обычно делаешь на выходных?'],
    ['I am new to the area, so I am still getting to know people.','Я недавно здесь, поэтому пока знакомлюсь с людьми.'],
    ['That sounds like fun. I would love to join you.','Звучит здорово. Я с удовольствием присоединюсь.'] ]},
  {id:15,title:'Travel Conversations',level:'B2',time:'13 min',icon:'🌍',topic:'Travel',desc:'Talk about plans, experiences and unexpected situations',phrases:[
    ['Have you been here before?','Ты раньше здесь был(а)?'],
    ['We are planning to stay for about a week.','Мы планируем остаться примерно на неделю.'],
    ['We missed our connection because the first flight was delayed.','Мы пропустили пересадку, потому что первый рейс задержали.'],
    ['Is there anything you would recommend seeing nearby?','Есть что-нибудь рядом, что вы посоветуете посмотреть?'] ]},
  {id:16,title:'Study & University',level:'B2',time:'12 min',icon:'🎓',topic:'Study',desc:'Discuss classes, assignments and academic plans',phrases:[
    ['Could you explain what we need to do for the assignment?','Можете объяснить, что нужно сделать для задания?'],
    ['When is the deadline for the project?','Когда крайний срок проекта?'],
    ['I would like to discuss my study plan with you.','Я хотел(а) бы обсудить с вами мой учебный план.'],
    ['Could you recommend a good resource for this topic?','Можете порекомендовать хороший ресурс по этой теме?'] ]},
  {id:17,title:'Professional English',level:'C1',time:'15 min',icon:'📈',topic:'Career',desc:'Express ideas, negotiate and handle professional discussions',phrases:[
    ['From my perspective, the main issue is the lack of clear priorities.','С моей точки зрения, главная проблема — отсутствие чётких приоритетов.'],
    ['I would suggest looking at the issue from a different angle.','Я бы предложил(а) посмотреть на вопрос под другим углом.'],
    ['Could we explore a few alternatives before making a decision?','Можем рассмотреть несколько альтернатив перед принятием решения?'],
    ['I see your point, but I am not sure the data supports that conclusion.','Я понимаю вашу точку зрения, но не уверен(а), что данные подтверждают этот вывод.'] ]},
  {id:18,title:'Everyday English',level:'A1',time:'10 min',icon:'☀️',topic:'Everyday',desc:'The most useful phrases for daily life',phrases:[
    ['Could you help me, please?','Не могли бы вы мне помочь?'],
    ['Sorry, I did not catch that.','Извините, я не расслышал(а).'],
    ['Could you say that again?','Не могли бы вы повторить?'],
    ['That sounds good to me.','Меня это устраивает.'] ]}
];

window.__speakflowCourses = courses;

let state=JSON.parse(localStorage.getItem('speakflow-v5')||'{"tab":"home","level":"A2","streak":1,"completed":[],"minutes":0,"xp":0,"daily":0}');
const save=()=>localStorage.setItem('speakflow-v5',JSON.stringify(state));
const screen=document.getElementById('screen');
const streakEl=document.getElementById('streak');
streakEl.textContent=state.streak;
function setTab(tab){state.tab=tab;save();render();document.querySelectorAll('.tabbar button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));}
document.querySelectorAll('.tabbar button').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));

function render(){
  if(state.tab==='home') home();
  if(state.tab==='learn') learn();
  if(state.tab==='practice') practice();
  if(state.tab==='progress') progress();
}
function levelIndex(){return ['A1','A2','B1','B2','C1'].indexOf(state.level);}
function home(){
  const done=state.completed.length;
  const next=courses.find(c=>!state.completed.includes(c.id))||courses[0];
  screen.innerHTML=`<section class="hero"><small>YOUR NEXT LESSON · ${state.level}</small><h2>${next.title} ${next.icon}</h2><p>${next.desc}. Listen → repeat → speak.</p><button class="btn btn-light" onclick="openLesson(${next.id})">Continue lesson →</button></section>
  <div class="section-title"><h3>Your learning plan</h3><span class="muted">${done}/${courses.length} lessons</span></div>
  <div class="card"><div style="display:flex;justify-content:space-between"><b>${state.level} English</b><b>${Math.round(done/courses.length*100)}%</b></div><div class="progressbar" style="margin-top:10px"><i style="width:${done/courses.length*100}%"></i></div><p class="muted" style="margin:10px 0 0">Whole phrases · Audio lessons · Shadowing · AI practice</p></div>
  <div class="section-title"><h3>Lisn-style routine</h3></div><div class="grid"><div class="stat"><strong>🎧</strong><span class="muted">Listen</span></div><div class="stat"><strong>🗣️</strong><span class="muted">Repeat</span></div><div class="stat"><strong>🔁</strong><span class="muted">Shadow</span></div><div class="stat"><strong>🤖</strong><span class="muted">Speak</span></div></div>
  <div class="section-title"><h3>Today</h3></div><div class="notice">10–15 minutes is enough for a short daily session. Your lesson audio can be prepared and replayed from the device cache.</div>`;
}
function learn(){
  const levels=['A1','A2','B1','B2','C1'];
  const selected=courses.filter(c=>c.level===state.level);
  screen.innerHTML=`<div class="section-title"><h3>Courses</h3><span class="muted">A1–C1</span></div><div class="chips">${levels.map(l=>`<button class="chip" style="border:0;cursor:pointer;${l===state.level?'background:#4f46e5;color:white':''}" onclick="setLevel('${l}')">${l}</button>`).join('')}</div>
  <div class="section-title"><h3>${state.level} learning plan</h3><span class="muted">${selected.length} courses</span></div>
  ${selected.length?selected.map(courseCard).join(''):'<div class="empty">No course in this level yet.</div>'}
  <div class="section-title"><h3>All themes</h3></div>
  ${courses.filter(c=>c.level!==state.level).map(courseCard).join('')}`;
}
function setLevel(level){state.level=level;save();learn();}
function courseCard(l){return `<div class="card" onclick="openLesson(${l.id})"><div class="lesson-row"><div class="icon">${l.icon}</div><div style="flex:1"><h4>${l.title}</h4><div class="muted">${l.level} · ${l.time} · ${l.topic}</div><div class="muted" style="margin-top:5px">${l.desc}</div></div><b>›</b></div></div>`}
function voiceStatusText(){const v=window.voiceEngine||{};if(v.state==='ready')return '🧠 US English voice ready';if(v.state==='loading')return `⏳ Loading voice${v.progress?` · ${v.progress}%`:''}`;if(v.state==='synthesizing')return '🧠 Kokoro audio readying…';if(v.state==='error')return `⚠️ Voice error: ${v.error||'check connection'}`;return '🧠 Kokoro US English neural voice';}
function updateVoiceStatus(){const el=document.getElementById('voiceStatus');if(el)el.textContent=voiceStatusText();}
window.addEventListener('speakflow-voice-status',updateVoiceStatus);
async function prepareCourseAudio(id){const c=courses.find(x=>x.id===id);if(!c)return;const btn=document.getElementById('prepareBtn');if(btn){btn.disabled=true;btn.textContent='Preparing audio…'}for(let i=0;i<c.phrases.length;i++){const p=c.phrases[i];if(btn)btn.textContent=`Preparing ${i+1}/${c.phrases.length}…`;await window.neuralSpeak(p[0],{cacheOnly:true});}if(btn){btn.disabled=false;btn.textContent='✓ Lesson audio ready'}}
function practice(){screen.innerHTML=`<div class="section-title"><h3>Practice</h3></div>
<div class="card voice-card"><div class="lesson-row"><div class="icon">🇺🇸</div><div style="flex:1"><h4>US English voice</h4><div class="muted" id="voiceStatus">${voiceStatusText()}</div></div></div><button class="btn btn-dark" style="margin-top:14px;width:100%" onclick="prepareNeuralVoice()">Load voice</button><button class="btn" style="margin-top:8px;width:100%" onclick='testNeuralEnglish()'>▶ Test US English</button></div>
<div class="card"><div class="lesson-row"><div class="icon">🎧</div><div><h4>Audio-first practice</h4><div class="muted">Generate lesson audio once, cache it, then replay it quickly and offline.</div></div></div><button class="btn btn-dark" style="margin-top:14px;width:100%" onclick="openLesson(1)">Open a lesson</button></div>
<div class="card"><div class="lesson-row"><div class="icon">🔁</div><div><h4>Shadowing</h4><div class="muted">Listen to the same speaker, then repeat immediately.</div></div></div><button class="btn btn-dark" style="margin-top:14px;width:100%" onclick="openLesson(5)">Start shadowing</button></div>
<div class="card"><div class="lesson-row"><div class="icon">🤖</div><div><h4>AI tutor demo</h4><div class="muted">Practice the phrases from the lesson in a simple conversation.</div></div></div><button class="btn btn-dark" style="margin-top:14px;width:100%" onclick="chatDemo()">Open conversation</button></div>
<div class="notice"><b>Version 5.4:</b> Kokoro US English runs in a worker. Lesson phrases are pre-generated one by one and cached, so after the first preparation, Listen starts almost immediately.</div>`;}
function progress(){const pct=Math.round(state.completed.length/courses.length*100);screen.innerHTML=`<div class="section-title"><h3>Progress</h3></div><div class="grid"><div class="stat"><strong>${state.xp}</strong><span class="muted">XP</span></div><div class="stat"><strong>${state.minutes}</strong><span class="muted">Minutes</span></div><div class="stat"><strong>${state.completed.length}</strong><span class="muted">Lessons</span></div><div class="stat"><strong>🔥 ${state.streak}</strong><span class="muted">Day streak</span></div></div><div class="section-title"><h3>Course completion</h3></div><div class="card"><b>A1–C1 SpeakFlow plan</b><div class="progressbar" style="margin:12px 0 7px"><i style="width:${pct}%"></i></div><span class="muted">${pct}% complete</span></div><div class="section-title"><h3>Method</h3></div><div class="notice">Listen to complete phrases in context, repeat aloud, shadow the speaker, then use the phrases in conversation.</div>`;}

window.currentPhrase=0;
function renderLesson(l,i){window.currentPhrase=i;const p=l.phrases[i];screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('learn')">← Back</button><span class="muted">${i+1}/${l.phrases.length}</span></div><div class="card"><span class="chip">${l.level} · ${l.topic}</span><div class="phrase">${p[0]}</div><div class="translation">${p[1]}</div><div class="audio"><button class="btn btn-dark" id="listenBtn" onclick='playPhrase(${JSON.stringify(p[0])})'>▶ Listen</button><button class="btn" onclick='speak(${JSON.stringify(p[1])},"ru-RU")'>🇷🇺 Перевод</button></div><button class="btn" id="prepareBtn" style="margin-top:10px;width:100%" onclick="prepareCourseAudio(${l.id})">💾 Prepare lesson audio</button><hr style="border:0;border-top:1px solid #eee;margin:24px 0"><div style="text-align:center"><b>Shadowing</b><div class="muted" style="margin-top:5px">Listen → repeat immediately</div><button class="bigmic" id="mic">🎙️</button><div class="feedback" id="feedback">Tap the microphone and say the phrase.</div></div></div><button class="btn btn-dark" style="width:100%" id="next">${i===l.phrases.length-1?'Finish lesson':'Next phrase →'}</button>`;document.getElementById('next').onclick=()=>{if(i<l.phrases.length-1){renderLesson(l,i+1);if(window.prefetchLessonAudio)window.prefetchLessonAudio(l.phrases,i+1);}else finishLesson(l.id)};document.getElementById('mic').onclick=startSpeech;}
function openLesson(id){const l=courses.find(x=>x.id===id);if(l){renderLesson(l,0);if(window.prefetchLessonAudio)window.prefetchLessonAudio(l.phrases,0);}}
function startSpeech(){const out=document.getElementById('feedback');const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){out.textContent='Speech recognition is not available in this browser.';return}const r=new SR();r.lang='en-US';r.interimResults=false;r.maxAlternatives=1;out.textContent='Listening…';r.onresult=e=>{const said=e.results[0][0].transcript;out.innerHTML=`You said: <b>${escapeHtml(said)}</b><br><span style="color:#16a34a">✓ Good. Listen again and repeat.</span>`};r.onerror=()=>out.textContent="I couldn't hear that. Please try again.";r.start();}
function finishLesson(id){if(!state.completed.includes(id))state.completed.push(id);state.xp+=50;state.minutes+=10;save();screen.innerHTML=`<div class="card" style="text-align:center;padding:40px 20px"><div style="font-size:60px">🎉</div><h2>Lesson complete!</h2><p class="muted">+50 XP · +10 minutes</p><button class="btn btn-dark" onclick="setTab('home')">Continue</button></div>`;}
let cachedVoices=[];function loadVoices(){if(!('speechSynthesis'in window))return;const refresh=()=>{cachedVoices=speechSynthesis.getVoices()||[]};refresh();if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',refresh)}loadVoices();
function pickVoice(lang){const voices=(cachedVoices.length?speechSynthesis.getVoices():cachedVoices)||[];const exact=voices.filter(v=>v.lang&&v.lang.toLowerCase()===lang.toLowerCase());const same=voices.filter(v=>v.lang&&v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()));return exact[0]||same[0]||null;}
function speak(text,lang='en-US'){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=lang.startsWith('en')?.95:.95;u.pitch=1;const voice=pickVoice(lang);if(voice)u.voice=voice;speechSynthesis.speak(u);}
async function playPhrase(text){const ok=await (window.neuralSpeak?window.neuralSpeak(text):Promise.resolve(false));if(!ok){const out=document.getElementById('feedback');if(out)out.textContent='Neural audio is not ready. Open Practice → Load voice.';}}
async function testNeuralEnglish(){await playPhrase('Hi! Welcome to SpeakFlow. Let’s practice English together.');}
function chatDemo(){screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('practice')">← Back</button><b>Everyday English</b></div><div class="card"><div class="chat" id="chat"><div class="bubble">Hi! Nice to meet you. What do you usually do at the weekend?</div></div><div class="inputrow"><input id="msg" placeholder="Type your answer…"><button class="btn btn-dark" onclick="sendMsg()">Send</button></div></div><div class="notice">Offline demo. It gives phrase-based corrections without an API key.</div>`;}
function sendMsg(){const input=document.getElementById('msg'),v=input.value.trim();if(!v)return;const chat=document.getElementById('chat');chat.innerHTML+=`<div class="bubble me">${escapeHtml(v)}</div>`;input.value='';setTimeout(()=>{chat.innerHTML+=`<div class="bubble">A natural way to continue could be: <b>That sounds interesting. Tell me more.</b></div>`},350)}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
render();
