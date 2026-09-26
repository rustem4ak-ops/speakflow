const AUDIO={
"Could I see your passport, please?":"audio/phrase-e7b3ad2ee847649f.wav",
"What time does boarding start?":"audio/phrase-74e0f239f12ab94f.wav",
"Could you help me, please?":"audio/phrase-6e3a43c8ddb9fbe9.wav",
"Could I have a table for two?":"audio/phrase-6fbddce5a2cf827e.wav",
"What do you recommend?":"audio/phrase-b7ae204d28120ba3.wav",
"How much does this cost?":"audio/phrase-72ca21eac47b0e6c.wav",
"How is your day going?":"audio/phrase-eb5a524c4df789db.wav",
"What do you do for work?":"audio/phrase-5d30c21e973a830e.wav",
"Could we move the meeting to tomorrow?":"audio/phrase-ae2b84e73b6eab9d.wav",
"I would like to discuss my study plan with you.":"audio/phrase-c924509683c8e207.wav",
"From my perspective, the main issue is the lack of clear priorities.":"audio/phrase-51cfab9e0d721dda.wav",
"I see your point, but I am not sure the data supports that conclusion.":"audio/phrase-5354fed232600459.wav"
};
const COURSES=[
{id:1,level:"A1",title:"Travel basics",icon:"✈️",goal:"travel",desc:"Самые нужные фразы для поездки.",items:[
["Could I see your passport, please?","Могу я посмотреть ваш паспорт, пожалуйста?"],["What time does boarding start?","Во сколько начинается посадка?"],["Could you help me, please?","Не могли бы вы мне помочь, пожалуйста?"]]},
{id:2,level:"A2",title:"Restaurant & shopping",icon:"🍽️",goal:"daily",desc:"Разговоры в ресторане и магазине.",items:[
["Could I have a table for two?","Можно столик на двоих?"],["What do you recommend?","Что вы рекомендуете?"],["How much does this cost?","Сколько это стоит?"]]},
{id:3,level:"B1",title:"Everyday conversation",icon:"💬",goal:"conversation",desc:"Свободнее говорим о себе и жизни.",items:[
["How is your day going?","Как проходит ваш день?"],["What do you do for work?","Кем вы работаете?"],["Could we move the meeting to tomorrow?","Можем перенести встречу на завтра?"]]},
{id:4,level:"B2",title:"Study & work",icon:"💼",goal:"work",desc:"Фразы для работы и учёбы.",items:[
["I would like to discuss my study plan with you.","Я хотел бы обсудить с вами мой учебный план."],["From my perspective, the main issue is the lack of clear priorities.","С моей точки зрения, главная проблема — отсутствие чётких приоритетов."]]},
{id:5,level:"C1",title:"Advanced discussion",icon:"🧠",goal:"work",desc:"Продвинутая английская речь.",items:[
["I see your point, but I am not sure the data supports that conclusion.","Я понимаю вашу точку зрения, но не уверен, что данные подтверждают этот вывод."]]}
];
const DEFAULT={done:[],xp:0,streak:0,level:"A1",goal:"conversation",minutes:15,accent:"UK",lastDay:""};
const store=Object.assign(DEFAULT,JSON.parse(localStorage.getItem("speakflow11")||"{}")); store.review=store.review||{};
let page="today",current=null,lessonPhase=0,lessonScore=null,lessonFinished=false,lessonTarget="";
let lessonAudioContext=null,lessonAudioSource=null,lessonAudioToken=0,lessonRecognition=null;
let tutorScenario=null,tutorTurn=0,tutorScore=0,tutorBusy=false;
const app=document.getElementById("app");
function save(){localStorage.setItem("speakflow11",JSON.stringify(store))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}

function reviewData(text){
 if(!store.review[text])store.review[text]={attempts:0,best:0,last:0,due:0,level:"new"};
 return store.review[text];
}
function reviewStatus(r){
 if(!r||r.attempts===0)return ["new","Новая"];
 if(r.best>=90)return ["green","Уверенно"];
 if(r.best>=70)return ["yellow","Нужно повторить"];
 return ["red","Слабая"];
}
function reviewDue(){
 const now=Date.now();
 return COURSES.flatMap(c=>c.items.map(x=>({item:x,course:c,r:reviewData(x[0])})))
   .filter(x=>x.r.due<=now)
   .sort((a,b)=>(a.r.best-b.r.best)||(a.r.due-b.r.due));
}
function scheduleReview(text,score){
 const r=reviewData(text),now=Date.now();
 r.attempts++;
 r.best=Math.max(r.best,score);
 r.last=now;
 const days=score>=90?7:score>=80?3:score>=70?1:0;
 r.due=now+days*86400000;
 r.level=reviewStatus(r)[0];
}
function reviewCount(){return reviewDue().length}
function smartReview(){
 const due=reviewDue();
 if(!due.length){
   shell('<section class="hero"><div class="eyebrow">Smart Review</div><h1>Сегодня всё повторено 🎉</h1><p>Слабых или просроченных фраз сейчас нет. Новые фразы появятся после следующих уроков.</p><button class="primary" onclick="go(\'learn\')">Изучать новые фразы</button></section>');
   return;
 }
 const x=due[0];
 current={id:"review",level:x.course.level,title:"Smart Review",items:[x.item]};
 lessonPhase=2;lessonScore=null;
 renderLesson(0,true);
}
function smartReviewCard(){
 const due=reviewDue();
 if(!due.length)return '<div class="card"><div class="eyebrow">Smart Review</div><h3>Все повторения на сегодня выполнены 🎉</h3><p class="muted">Продолжай изучать новые фразы.</p></div>';
 const x=due[0],st=reviewStatus(x.r);
 return '<div class="card reviewCard"><div class="eyebrow">🧠 Smart Review</div><div class="reviewHead"><div><h3>Пора повторить</h3><p class="muted">'+due.length+' '+(due.length===1?"фраза":"фразы")+' ждут повторения</p></div><span class="reviewBadge '+st[0]+'">'+st[1]+'</span></div><div class="reviewPhrase">'+esc(x.item[0])+'</div><div class="small">Лучший результат: '+(x.r.attempts?x.r.best+"%":"ещё нет попыток")+'</div><button class="primary" onclick="smartReview()">🎙️ Начать Smart Review</button></div>';
}

function audioEl(){return document.getElementById("player")||document.getElementById("lessonPlayer")}
function setAudio(text,autoplay=true){
 const p=audioEl(),st=document.getElementById("audioStatus"),src=AUDIO[text];
 if(!p||!src){if(st)st.textContent="Для этой фразы аудио ещё не добавлено.";return}
 p.src=src;p.load();
 if(st)st.textContent="Аудио готово.";
 if(autoplay){const q=p.play();if(q&&q.catch)q.catch(()=>{if(st)st.textContent="Нажмите ▶ Play на плеере."})}
}


function nav(){
 const items=[["today","☀️","Сегодня"],["learn","📚","Учиться"],["tutor","🤖","AI Tutor"],["english","🧠","Мой English"]];
 return '<div class="nav"><div class="navin">'+items.map(x=>'<button onclick="go(\''+x[0]+'\')" class="'+(page===x[0]?"active":"")+'">'+x[1]+'<small>'+x[2]+'</small></button>').join("")+'</div></div>'
}
function shell(body,title="SpeakFlow"){app.innerHTML='<div class="wrap"><div class="top"><div class="brand">Speak<span>Flow</span></div><div class="pill">'+title+'</div></div>'+body+'</div>'+nav()}
function today(){
 const total=COURSES.reduce((n,c)=>n+c.items.length,0),done=store.done.length,pct=Math.round(done/total*100);
 const recommended=COURSES.find(c=>c.level===store.level)||COURSES[0];
 const next=recommended.items.find(x=>!store.done.includes(x[0]))||recommended.items[0];
 shell('<section class="hero"><div class="eyebrow">Ваш план · '+store.minutes+' минут</div><h1>Сегодня говорим, а не просто учим</h1><p>'+goalName(store.goal)+'. Следующая тренировка: '+recommended.title+'.</p><button class="primary" onclick="openCourse('+recommended.id+')">▶ Начать тренировку</button></section>'+
 '<div class="statGrid"><div class="statBox"><b>'+done+'</b><div class="small">фраз</div></div><div class="statBox"><b>'+store.xp+'</b><div class="small">XP</div></div><div class="statBox"><b>'+store.streak+'</b><div class="small">серия</div></div></div>'+smartReviewCard()+
 '<div class="card"><div class="eyebrow">Прогресс курса</div><div style="display:flex;justify-content:space-between;margin:8px 0 9px"><b>'+pct+'%</b><span class="small">'+done+' / '+total+'</span></div><div class="meter"><i style="width:'+pct+'%"></i></div></div>')
}
function goalName(g){return {travel:"Цель: путешествия",work:"Цель: работа и учёба",conversation:"Цель: свободное общение",daily:"Цель: повседневная жизнь"}[g]||"Цель: английский"}
function jsq(s){return s.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}
function learn(){
 const levels=["A1","A2","B1","B2","C1"];
 shell('<div class="tabs">'+levels.map(x=>'<button class="tab '+(store.level===x?"active":"")+'" onclick="store.level=\''+x+'\';save();learn()">'+x+'</button>').join("")+'</div>'+
 '<section class="hero"><div class="eyebrow">Обучение</div><h1>Говорим фразами</h1><p>Слушай → повторяй → говори без подсказки. Сложность поднимается постепенно.</p></section>'+
 COURSES.filter(c=>c.level===store.level).map(c=>'<div class="card course"><div class="courseIcon">'+c.icon+'</div><div style="flex:1"><h3>'+c.title+'</h3><div class="muted">'+c.desc+'</div><div class="small" style="margin-top:6px">'+c.items.filter(x=>store.done.includes(x[0])).length+'/'+c.items.length+' фраз изучено</div><button class="secondary" style="margin-top:10px" onclick="openCourse('+c.id+')">Открыть</button></div></div>').join(""))
}
function openCourse(id){
 current=COURSES.find(c=>c.id===id);
 lessonPhase=0;
 lessonScore=null;
 lessonFinished=false;
 renderLesson(0);
}
function nextLesson(){
 if(!current)return;
 const idx=COURSES.findIndex(c=>c.id===current.id);
 if(idx<0||idx+1>=COURSES.length){toast("Это последний доступный урок");return;}
 current=COURSES[idx+1];
 lessonPhase=0;
 lessonScore=null;
 lessonFinished=false;
 renderLesson(0);
 window.scrollTo({top:0,behavior:"smooth"});
}
function phaseLabel(){
 return ["1. Слушаем","2. Повторяем","3. Говорим"][lessonPhase]||"Тренировка";
}
function renderLesson(i,isReview=false){
 const item=current.items[i],text=item[0],tr=item[1]; lessonTarget=text;
 const progress=Math.round(((i+1)/current.items.length)*100);
 const doneText=lessonFinished?'<div class="resultWord success">✓ Урок завершён</div><div class="small resultHint">Можно перейти к следующему уроку.</div>':'<span class="small">После прослушивания нажми микрофон и повтори фразу.</span>';
 const nextIndex=COURSES.findIndex(c=>c.id===current.id)+1;
 const nextName=nextIndex<COURSES.length?COURSES[nextIndex].level+' · '+COURSES[nextIndex].title:'Все уровни пройдены';
 const nextDisabled=nextIndex>=COURSES.length?' disabled':'';
 let body='<div class="lessonTop"><button class="back" onclick="go(\'learn\')">← К урокам</button><span class="lessonCount">'+(i+1)+' / '+current.items.length+'</span></div>'+
 '<div class="card lessonCard"><div class="eyebrow">'+current.level+' · '+current.title+'</div>'+
 '<div class="miniMeter"><i style="width:'+progress+'%"></i></div>'+
 '<div class="phrase">'+esc(text)+'</div><div class="translation">'+esc(tr)+'</div>'+
 '<audio id="lessonPlayer" preload="auto" hidden></audio>'+
 '<div class="voiceChoices"><button class="voiceChoice primaryVoice" onclick="lessonListen(\''+jsq(text)+'\')">🔊 <span>Послушать</span></button></div>'+
 '<div id="lessonSpeech" class="lessonResult">'+(lessonFinished?doneText:lessonMicMarkup(text))+'</div>'+
 '<button class="nextLessonBtn" onclick="nextLesson()"'+nextDisabled+'>Следующий урок <span>→</span><small>'+esc(nextName)+'</small></button>'+
 '</div>';
 shell(body);
}
function isIOS(){return /iPhone|iPad|iPod/i.test(navigator.userAgent)||(/Macintosh/i.test(navigator.userAgent)&&navigator.maxTouchPoints>1)}
function stopLessonAudio(){
 lessonAudioToken++;
 try{if(lessonAudioSource){lessonAudioSource.onended=null;lessonAudioSource.stop(0)}}catch(e){}
 lessonAudioSource=null;
}
async function playLessonAudio(text,onDone){
 const src=AUDIO[text];
 if(!src){if(onDone)onDone();return}
 stopLessonAudio();
 const token=lessonAudioToken;
 if(isIOS()&&(window.AudioContext||window.webkitAudioContext)){
  try{
   lessonAudioContext=lessonAudioContext||new (window.AudioContext||window.webkitAudioContext)();
   await lessonAudioContext.resume();
   const res=await fetch(src,{cache:"force-cache"});
   const data=await res.arrayBuffer();
   const buffer=await lessonAudioContext.decodeAudioData(data);
   if(token!==lessonAudioToken)return;
   const source=lessonAudioContext.createBufferSource();
   source.buffer=buffer;source.connect(lessonAudioContext.destination);lessonAudioSource=source;
   source.onended=()=>{if(token===lessonAudioToken){lessonAudioSource=null;if(onDone)onDone()}};
   source.start(0);
   return;
  }catch(e){stopLessonAudio()}
 }
 setAudio(text,true);
 const p=document.getElementById("lessonPlayer");
 if(p)p.onended=()=>{p.onended=null;if(onDone)onDone()};
}
function lessonListen(text){
 const box=document.getElementById("lessonSpeech");
 const btn=document.querySelector(".primaryVoice");
 if(btn){btn.classList.add("isPlaying");btn.innerHTML='🔊 <span>Воспроизводится…</span>'}
 if(box&&!lessonFinished)box.innerHTML='<span class="listeningPulse">🔊 Слушаем фразу…</span><div class="small resultHint">После окончания нажми микрофон.</div>';
 playLessonAudio(text,()=>{
  const b=document.getElementById("lessonSpeech");
  const currentBtn=document.querySelector(".primaryVoice");
  if(currentBtn){currentBtn.classList.remove("isPlaying");currentBtn.innerHTML='🔊 <span>Послушать ещё раз</span>'}
  if(b&&!lessonFinished)b.innerHTML=lessonMicMarkup(text);
 });
}

function lessonMicMarkup(text){ return '<button class="lessonMic" onclick="lessonSpeak(lessonTarget)" aria-label="Произнести фразу">🎙️</button><div class="lessonMicText">Теперь нажми микрофон и произнеси фразу</div>';
}
async function lessonSpeak(target){
 const box=document.getElementById("lessonSpeech");
 if(!box)return;
 if(lessonRecognition){try{lessonRecognition.abort()}catch(e){}lessonRecognition=null}
 stopLessonAudio();
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){
  box.innerHTML='<span class="warning">Распознавание речи недоступно в этом браузере. На iPhone открой SpeakFlow в Safari.</span>'+lessonMicMarkup(target);
  return;
 }
 box.innerHTML='<span class="listeningPulse">🎙️ Проверяем микрофон…</span>';
 try{
  if(!window.isSecureContext){
   box.innerHTML='<span class="warning">Микрофон работает только через HTTPS.</span>'+lessonMicMarkup(target);
   return;
  }
  if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
   const permissionStream=await navigator.mediaDevices.getUserMedia({audio:true});
   permissionStream.getTracks().forEach(t=>t.stop());
  }
 }catch(e){
  const name=e&&e.name?e.name:"";
  const msg=name==="NotFoundError"?"Микрофон не найден. Проверь микрофон iPhone.":"Микрофон не разрешён. Разреши микрофон для Safari и нажми ещё раз.";
  box.innerHTML='<span class="warning">'+msg+'</span>'+lessonMicMarkup(target);
  return;
 }
 const r=new SR();
 lessonRecognition=r;
 r.lang="en-US";r.interimResults=false;r.continuous=false;r.maxAlternatives=3;
 let gotResult=false,finished=false,timer=null;
 const cleanup=()=>{if(timer)clearTimeout(timer);if(lessonRecognition===r)lessonRecognition=null};
 const finishError=message=>{
  if(finished)return;
  finished=true;cleanup();
  box.innerHTML='<span class="warning">'+message+'</span>'+lessonMicMarkup(target);
 };
 box.innerHTML='<span class="listeningPulse">🎙️ Слушаю…</span><div class="small resultHint">Говори фразу сейчас</div>';
 r.onstart=()=>{if(!finished)box.innerHTML='<span class="listeningPulse">🎙️ Микрофон включён</span><div class="small resultHint">Говори фразу полностью</div>'};
 r.onaudiostart=()=>{if(!finished)box.innerHTML='<span class="listeningPulse">🎙️ Слышу звук…</span><div class="small resultHint">Продолжай говорить</div>'};
 r.onresult=e=>{
  gotResult=true;
  const alternatives=e.results[0];
  let bestText="",bestScore=-1;
  for(let i=0;i<alternatives.length;i++){
   const got=alternatives[i].transcript||"",score=similarity(target,got);
   if(score>bestScore){bestScore=score;bestText=got}
  }
  lessonScore=bestScore;
  const good=lessonScore>=80;
  finished=true;cleanup();
  box.innerHTML='<div class="resultWord '+(good?"success":"warning")+'">'+(good?"✓ Фраза распознана":"↻ Попробуй ещё раз")+'</div><div class="recognizedText">«'+esc(bestText)+'»</div><div class="resultScore">'+lessonScore+'%</div>'+feedbackHtml(target,bestText)+
   (good?'<div class="small resultHint">Это проверка совпадения распознанного текста. Она не измеряет отдельные звуки.</div>':'<div class="small resultHint">Посмотри, какие слова отличаются, и повтори фразу ещё раз.</div>'+lessonMicMarkup(target));
  if(good)setTimeout(()=>{const idx=current&&current.items?current.items.findIndex(x=>x[0]===target):-1;if(idx>=0)markDone(idx)},1000);
 };
 r.onerror=e=>{
  const code=e&&e.error?e.error:"";
  if(code==="not-allowed"||code==="service-not-allowed")finishError("Safari не разрешил распознавание. Проверь разрешение микрофона для Safari.");
  else if(code==="no-speech")finishError("Я не услышал речь. Нажми микрофон и произнеси фразу ещё раз.");
  else if(code==="audio-capture")finishError("Safari не получил звук с микрофона. Проверь доступ к микрофону.");
  else finishError("Safari не смог распознать речь. Нажми микрофон и попробуй ещё раз.");
 };
 r.onnomatch=()=>finishError("Речь услышана, но фраза не распознана. Попробуй произнести её ещё раз.");
 r.onend=()=>{if(!gotResult&&!finished)finishError("Распознавание завершилось без результата. Нажми микрофон ещё раз.")};
 timer=setTimeout(()=>{if(!gotResult&&!finished)finishError("Safari не вернул результат за 12 секунд. Нажми микрофон ещё раз.")},12000);
 try{r.start()}catch(e){finishError("Не удалось запустить распознавание. Нажми микрофон ещё раз.")}
}

function finishPhrase(i,isReview){ const text=current.items[i][0]; if(isReview){if(lessonScore!==null)scheduleReview(text,lessonScore);save();toast("Результат сохранён");go("today");return;} markDone(i); }
function markDone(i){
 const text=current.items[i][0];
 if(lessonScore!==null)scheduleReview(text,lessonScore);
 if(!store.done.includes(text)){store.done.push(text);store.xp+=10;updateStreak()}
 save();
 if(i+1<current.items.length){lessonPhase=0;lessonScore=null;renderLesson(i+1)}
 else{lessonFinished=true;toast("Урок завершён");renderLesson(i)}
}
function updateStreak(){
 const todayKey=new Date().toISOString().slice(0,10);
 if(store.lastDay===todayKey)return;
 const prev=new Date();prev.setDate(prev.getDate()-1);
 const prevKey=prev.toISOString().slice(0,10);
 store.streak=store.lastDay===prevKey?store.streak+1:1;
 store.lastDay=todayKey;
}


const TUTOR_SCENARIOS=[
 {id:"cafe",icon:"☕",title:"В кафе",desc:"Закажи еду, уточни цену и попроси счёт.",role:"Бариста",opening:"Hi! Welcome. What would you like to order?",
  turns:[
   {keys:["coffee","latte","tea","water","sandwich","food","like","want"],reply:"Sure! What would you like to drink?",tip:"Попробуй: I'd like a coffee, please."},
   {keys:["coffee","latte","tea","water","juice"],reply:"Great choice. Would you like anything to eat?",tip:"Попробуй: I'd like a sandwich, please."},
   {keys:["sandwich","cake","food","eat","nothing"],reply:"No problem. Would you like anything else?",tip:"Попробуй: That's all, thank you."},
   {keys:["all","nothing","no","bill","check"],reply:"Of course. That will be twelve pounds, please.",tip:"Попробуй: Could I have the bill, please?"}
 ]},
 {id:"airport",icon:"✈️",title:"В аэропорту",desc:"Регистрация, посадка и помощь сотрудника.",role:"Airport agent",opening:"Good morning. May I see your passport, please?",
  turns:[
   {keys:["passport","here","sure","yes"],reply:"Thank you. Where are you flying today?",tip:"Попробуй: I'm flying to London."},
   {keys:["london","berlin","paris","frankfurt","dubai","moscow","flying"],reply:"Do you have any bags to check in?",tip:"Попробуй: Yes, I have one bag."},
   {keys:["bag","bags","one","two","yes","no"],reply:"Thank you. Your gate is A24. Boarding starts at six thirty.",tip:"Попробуй: What time does boarding start?"}
 ]},
 {id:"work",icon:"💼",title:"Рабочая встреча",desc:"Обсуди встречу, сроки и следующий шаг.",role:"Colleague",opening:"Hi! Do you have a minute to talk about the project?",
  turns:[
   {keys:["yes","sure","course","okay","minute"],reply:"Great. Could we move the meeting to tomorrow?",tip:"Попробуй: Yes, tomorrow works for me."},
   {keys:["tomorrow","yes","fine","works","okay","can't","cannot"],reply:"Perfect. What time would work best for you?",tip:"Попробуй: How about ten in the morning?"},
   {keys:["ten","eleven","nine","morning","afternoon","time"],reply:"Sounds good. I'll send you a calendar invitation.",tip:"Попробуй: Perfect, see you tomorrow."}
 ]},
 {id:"hotel",icon:"🏨",title:"В отеле",desc:"Заселись и реши простой вопрос с номером.",role:"Receptionist",opening:"Welcome to the hotel. Do you have a reservation?",
  turns:[
   {keys:["yes","reservation","booking","booked"],reply:"Great. Could I have your name, please?",tip:"Попробуй: The reservation is under Rustem."},
   {keys:["name","rustem","under"],reply:"Thank you. Your room is on the third floor. Do you need any help with your luggage?",tip:"Попробуй: Yes, please."},
   {keys:["yes","help","no","thanks","thank"],reply:"You're welcome. Enjoy your stay!",tip:"Попробуй: Thank you very much."}
 ]}
];

function tutor(){
 const cards=TUTOR_SCENARIOS.map(x=>'<button class="tutorScenario" onclick="startTutor(\''+x.id+'\')"><span class="tutorIcon">'+x.icon+'</span><span><b>'+x.title+'</b><small>'+x.desc+'</small></span><strong>→</strong></button>').join("");
 shell('<section class="hero"><div class="eyebrow">AI Tutor · Speaking</div><h1>Поговорим по-английски</h1><p>Выбери ситуацию и веди диалог голосом. Приложение будет давать подсказки и оценивать твои реплики.</p></section><div class="card"><h3>Выбери ситуацию</h3>'+cards+'</div><div class="card"><div class="eyebrow">Твой уровень</div><p class="muted">'+store.level+' · '+goalName(store.goal)+'</p></div>');
}
function startTutor(id){
 tutorScenario=TUTOR_SCENARIOS.find(x=>x.id===id);tutorTurn=0;tutorScore=0;tutorBusy=false;
 renderTutor();
}
function renderTutor(){
 if(!tutorScenario){tutor();return}
 const turn=tutorScenario.turns[tutorTurn];
 const progress=Math.round((tutorTurn/tutorScenario.turns.length)*100);
 const line=tutorTurn===0?tutorScenario.opening:tutorScenario.turns[tutorTurn-1].reply;
 shell('<div class="lessonTop"><button class="back" onclick="tutor()">← Ситуации</button><span class="lessonCount">'+tutorScenario.icon+' '+tutorScenario.title+'</span></div>'+
 '<div class="card tutorCard tutorCompact"><div class="eyebrow">'+tutorScenario.role+'</div><div class="tutorProgress"><i style="width:'+progress+'%"></i></div>'+
 '<div class="tutorBubble other"><small>'+tutorScenario.role+'</small><div id="tutorLine">'+esc(line)+'</div></div>'+
 '<div class="tutorActions tutorListenRow"><button class="secondary" onclick="tutorListen()">🔊 Прослушать</button><button class="secondary tutorSlow" onclick="tutorListen(true)">🐢 Медленно</button></div>'+
 '<div class="tutorHint tutorHintCompact"><span>💡</span> '+esc(turn.tip)+'</div>'+
 '<button class="tutorMic tutorMicCompact" onclick="tutorSpeak()">🎙️ <small>Ответить</small></button>'+
 '<div class="tutorManual tutorManualCompact"><div class="tutorInputRow"><input id="tutorText" type="text" placeholder="Или напиши ответ…" autocomplete="off"><button onclick="submitTutorText()">✓</button></div></div>'+
 '<div id="tutorResult" class="tutorResult tutorResultCompact">Прослушай → ответь → получи результат.</div>'+
 '<button class="primary tutorContinue" onclick="tutorNext()" id="tutorNextBtn">Продолжить →</button>'+
 '</div>');
}

function tutorListen(slow=false){
 const line=document.getElementById("tutorLine");
 if(!line)return;
 if(!("speechSynthesis" in window)){toast("Озвучивание недоступно в этом браузере");return}
 window.speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(line.textContent);u.lang="en-US";u.rate=slow?0.78:0.95;
 window.speechSynthesis.speak(u);
}
function submitTutorText(){
 const input=document.getElementById("tutorText"),got=(input&&input.value||"").trim();
 if(!got){toast("Сначала введи ответ на английском");return}
 evaluateTutorAnswer(got);
}
function tutorNext(){
 if(!tutorScenario)return;
 if(tutorTurn+1<tutorScenario.turns.length){tutorTurn++;tutorBusy=false;renderTutor()}
 else finishTutor();
}
function tutorNaturalReply(got,turn){
 const text=got.toLowerCase();
 if(tutorScenario.id==="cafe"){
  if(/bill|check|pay/.test(text))return "Of course. Here is your bill. Would you like to pay by card or cash?";
  if(/sandwich|cake|food|eat/.test(text))return "Sure. We have sandwiches, cake and a few hot dishes.";
  return "Sounds good. What would you like to drink?";
 }
 if(tutorScenario.id==="airport"){
  if(/london|berlin|paris|frankfurt|dubai|moscow/.test(text))return "Great. Do you have any bags to check in?";
  if(/bag|bags|luggage/.test(text))return "Thank you. Your gate is A24. Boarding starts at six thirty.";
  return "Thanks. Where are you flying today?";
 }
 if(tutorScenario.id==="work"){
  if(/tomorrow|monday|tuesday|wednesday|thursday|friday/.test(text))return "That works for me. What time would be convenient for you?";
  if(/nine|ten|eleven|morning|afternoon|three|four|five/.test(text))return "Perfect. I'll send you a calendar invitation.";
  return "Sure. What would you like to discuss first?";
 }
 if(tutorScenario.id==="hotel"){
  if(/yes|help|luggage|bags/.test(text))return "Of course. I'll ask someone to help you with your luggage.";
  if(/name|reservation|booking|booked/.test(text))return "Thank you. Your room is on the third floor.";
  return "Certainly. How can I help you with your stay?";
 }
 return turn.reply;
}
function tutorCorrection(got,example,score){
 if(score>=85)return "Отлично — фраза звучит понятно.";
 if(!got)return "Попробуй ответить полной фразой.";
 return "Можно естественнее. Пример: “"+example+"”";
}
function evaluateTutorAnswer(got){
 const box=document.getElementById("tutorResult");if(!box||!tutorScenario)return;
 const turn=tutorScenario.turns[tutorTurn],example=turn.tip.replace(/^Попробуй:\\s*/,"");
 const keysHit=turn.keys.some(k=>got.toLowerCase().includes(k));
 const score=keysHit?Math.max(78,similarity(example,got)):similarity(example,got);
 tutorScore+=score;
 box.innerHTML='<div class="resultWord '+(score>=70?"success":"warning")+'">'+(score>=70?"✓ Ответ принят":"↻ Можно улучшить")+'</div><div class="recognizedText">«'+esc(got)+'»</div><div class="resultScore">'+score+'%</div>'+feedbackHtml(example,got)+
 '<div class="tutorActions"><button class="secondary" onclick="tutorListen()">🔊 Прослушать реплику</button><button class="primary" onclick="tutorNext()">Продолжить диалог →</button></div>'+
 '<div class="small">Оценка ориентировочная: сравниваются слова ответа с примером, а не смысл всего предложения.</div>';
}
async function tutorSpeak(){
 if(tutorBusy)return;
 const box=document.getElementById("tutorResult");if(!box)return;
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){box.innerHTML='<span class="warning">Распознавание речи недоступно. Можно написать ответ в поле выше.</span>';return}
 tutorBusy=true;box.innerHTML='<span class="listeningPulse">🎙️ Слушаю…</span>';
 try{
  if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
   const stream=await navigator.mediaDevices.getUserMedia({audio:true});stream.getTracks().forEach(t=>t.stop());
  }
 }catch(e){tutorBusy=false;box.innerHTML='<span class="warning">Разреши микрофон для Safari и попробуй ещё раз. Или введи ответ текстом.</span>';return}
 const r=new SR();r.lang="en-US";r.interimResults=false;r.continuous=false;r.maxAlternatives=1;
 let done=false,timer=setTimeout(()=>{if(!done){done=true;tutorBusy=false;try{r.abort()}catch(e){}box.innerHTML='<span class="warning">Не удалось получить ответ. Попробуй ещё раз или введи ответ текстом.</span>'}},12000);
 r.onresult=e=>{if(done)return;done=true;clearTimeout(timer);tutorBusy=false;evaluateTutorAnswer(e.results[0][0].transcript)};
 r.onerror=e=>{if(done)return;done=true;clearTimeout(timer);tutorBusy=false;box.innerHTML='<span class="warning">Не удалось распознать речь. Попробуй ещё раз или введи ответ текстом.</span>'};
 try{r.start()}catch(e){clearTimeout(timer);tutorBusy=false;box.innerHTML='<span class="warning">Не удалось запустить микрофон. Введи ответ текстом.</span>'}
}
function finishTutor(){
 const avg=Math.round(tutorScore/tutorScenario.turns.length);
 store.xp+=20;save();
 shell('<section class="hero"><div class="eyebrow">AI Tutor · Готово</div><h1>Диалог завершён 🎉</h1><p>Ты прошёл ситуацию «'+esc(tutorScenario.title)+'».</p><div class="score">'+avg+'%</div><div class="small" style="text-align:center">Средний результат распознавания твоих реплик</div><button class="primary" onclick="startTutor(\''+tutorScenario.id+'\')">🔁 Повторить диалог</button><button class="secondary full" onclick="tutor()">← Выбрать другую ситуацию</button></section>');
}

function speak(){
 const phrase=findPracticePhrase();
 shell('<section class="hero"><div class="eyebrow">Speak mode</div><h1>Теперь скажи сам</h1><p>Сначала послушай фразу, затем произнеси её. Браузер может показать распознанный текст — это ориентировочная проверка, а не фонемный анализ.</p></section>'+
 '<div class="card"><div class="eyebrow">Твоя фраза</div><div class="phrase">'+esc(phrase[0])+'</div><div class="translation">'+esc(phrase[1])+'</div><audio id="player" controls preload="auto" src="'+(AUDIO[phrase[0]]||"")+'"></audio><button class="secondary" style="width:100%;margin-top:10px" onclick="setAudio(\''+jsq(phrase[0])+'\',true)">▶ Сначала послушать</button><button class="mic" onclick="startSpeech(\''+jsq(phrase[0])+'\')">🎙️</button><div class="small" style="text-align:center">Нажми и произнеси фразу</div><div id="speechResult" class="transcript" style="margin-top:14px">Здесь появится распознанная речь.</div></div>')
}
function findPracticePhrase(){
 for(const c of COURSES){if(c.level===store.level){const x=c.items.find(i=>!store.done.includes(i[0]));if(x)return x}}
 return COURSES[0].items[0]
}
async function startSpeech(target){
 const box=document.getElementById("speechResult");
 if(!box)return;
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){
   box.innerHTML='<span class="warning">На iPhone открой SpeakFlow в Safari — этот браузер нужен для распознавания речи.</span>';
   return;
 }

 box.textContent="🎙️ Разрешаем микрофон…";
 try{
   if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
     const stream=await navigator.mediaDevices.getUserMedia({audio:true});
     stream.getTracks().forEach(t=>t.stop());
   }
 }catch(e){
   box.innerHTML='<span class="warning">Разреши микрофон для Safari в настройках iPhone.</span>';
   return;
 }

 const r=new SR();
 r.lang="en-US";
 r.interimResults=false;
 r.continuous=false;
 r.maxAlternatives=1;
 box.textContent="🎙️ Слушаю…";
 r.onresult=e=>{
   const got=e.results[0][0].transcript;
   const score=similarity(target,got);
   box.innerHTML='<b>'+esc(got)+'</b><br><span class="'+(score>=80?"success":"warning")+'">Похожесть: '+score+'%</span>'+feedbackHtml(target,got)+'<div class="small">Это сравнение текста распознавания с целевой фразой, а не фонемный анализ произношения.</div>';
 };
 r.onerror=e=>{
   box.innerHTML='<span class="warning">'+(e.error==="no-speech"?"Речь не распознана. Попробуй ещё раз.":"Не удалось распознать речь. Проверь разрешение микрофона Safari.")+'</span>';
 };
 try{r.start()}catch(e){box.innerHTML='<span class="warning">Не удалось запустить распознавание. Нажми ещё раз.</span>'}
}
function speechFeedback(target,got){
 const norm=s=>String(s).toLowerCase().replace(/[^a-z ]/g," ").replace(/\s+/g," ").trim();
 const A=norm(target).split(" ").filter(Boolean),B=norm(got).split(" ").filter(Boolean);
 const n=A.length,m=B.length;
 const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
 for(let i=0;i<=n;i++)dp[i][0]=i;
 for(let j=0;j<=m;j++)dp[0][j]=j;
 for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(A[i-1]===B[j-1]?0:1));
 let i=n,j=m,missing=[],extra=[],matched=0;
 while(i>0||j>0){
  if(i>0&&j>0&&A[i-1]===B[j-1]){matched++;i--;j--}
  else if(i>0&&j>0&&dp[i][j]===dp[i-1][j-1]+1){i--;j--}
  else if(i>0&&dp[i][j]===dp[i-1][j]+1){missing.unshift(A[i-1]);i--}
  else{extra.unshift(B[j-1]);j--}
 }
 return {matched,total:n,missing,extra};
}
function feedbackHtml(target,got){
 const f=speechFeedback(target,got);
 let html='<div class="feedbackBox"><b>Разбор ответа</b><div class="feedbackStats">Совпало слов: '+f.matched+' из '+f.total+'</div>';
 if(f.missing.length)html+='<div class="feedbackLine"><span class="feedbackLabel">Пропущено:</span> '+esc(f.missing.join(" "))+'</div>';
 if(f.extra.length)html+='<div class="feedbackLine"><span class="feedbackLabel">Добавлено:</span> '+esc(f.extra.join(" "))+'</div>';
 if(!f.missing.length&&!f.extra.length)html+='<div class="feedbackLine success">Все слова совпали.</div>';
 return html+'</div>';
}

function similarity(a,b){
 const norm=s=>String(s).toLowerCase().replace(/[^a-z ]/g," ").replace(/\s+/g," ").trim();
 const A=norm(a).split(" ").filter(Boolean),B=norm(b).split(" ").filter(Boolean);
 if(!A.length||!B.length)return 0;
 let prev=Array.from({length:B.length+1},(_,i)=>i);
 for(let i=1;i<=A.length;i++){
  const cur=[i];
  for(let j=1;j<=B.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(A[i-1]===B[j-1]?0:1));
  prev=cur;
 }
 return Math.max(0,Math.round((1-prev[B.length]/Math.max(A.length,B.length))*100));
}

function english(){
 shell('<section class="hero"><div class="eyebrow">Мой English</div><h1>Настрой обучение под себя</h1><p>Здесь мы будем собирать персональную программу, слабые фразы и привычку говорить каждый день.</p></section>'+
 '<div class="card"><h3>Моя цель</h3><div class="goalGrid">'+[
 ["conversation","💬","Свободно говорить","Разговорная речь"],["travel","✈️","Путешествия","Аэропорт, отель, поездки"],["work","💼","Работа и учёба","Встречи, переписка"],["daily","🏠","Повседневная жизнь","Магазины, услуги, быт"]].map(x=>'<button class="goalBtn '+(store.goal===x[0]?"active":"")+'" onclick="setGoal(\''+x[0]+'\')"><b>'+x[1]+' '+x[2]+'</b><span>'+x[3]+'</span></button>').join("")+'</div></div>'+
 '<div class="card"><h3>Сколько времени в день?</h3><div class="timeRow">'+[5,10,15,30].map(x=>'<button class="timeBtn '+(store.minutes===x?"active":"")+'" onclick="store.minutes='+x+';save();english()">'+x+' мин</button>').join("")+'</div></div><div class="card"><h3>Уровень</h3><div class="tabs">'+["A1","A2","B1","B2","C1"].map(x=>'<button class="tab '+(store.level===x?"active":"")+'" onclick="store.level=\''+x+'\';save();english()">'+x+'</button>').join("")+'</div></div>'+
 '<button class="secondary" style="width:100%" onclick="resetProgress()">Сбросить прогресс</button>')
}
function setGoal(g){store.goal=g;save();toast("Цель обновлена");english()}
function resetProgress(){if(confirm("Сбросить прогресс?")){store.done=[];store.xp=0;save();go("today")}}
function toast(t){const x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),1800)}
function go(x){page=x;({today,learn,speak,tutor,english}[x])()}
today();
