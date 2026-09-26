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
 const items=[["today","☀️","Сегодня"],["learn","📚","Учиться"],["speak","🎙️","Говорить"],["english","🧠","Мой English"]];
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
  box.innerHTML='<div class="resultWord '+(good?"success":"warning")+'">'+(good?"✓ Фраза распознана":"↻ Попробуй ещё раз")+'</div><div class="recognizedText">«'+esc(bestText)+'»</div><div class="resultScore">'+lessonScore+'%</div>'+
   (good?'<div class="small resultHint">Текст совпал достаточно хорошо. Переходим дальше…</div>':'<div class="small resultHint">Это проверка распознанного текста, а не фонемный анализ.</div>'+lessonMicMarkup(target));
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
   box.innerHTML='<b>'+esc(got)+'</b><br><span class="'+(score>=80?"success":"warning")+'">Похожесть: '+score+'%</span><div class="small">Это сравнение текста распознавания с целевой фразой, не полноценная проверка произношения.</div>';
 };
 r.onerror=e=>{
   box.innerHTML='<span class="warning">'+(e.error==="no-speech"?"Речь не распознана. Попробуй ещё раз.":"Не удалось распознать речь. Проверь разрешение микрофона Safari.")+'</span>';
 };
 try{r.start()}catch(e){box.innerHTML='<span class="warning">Не удалось запустить распознавание. Нажми ещё раз.</span>'}
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
function go(x){page=x;({today,learn,speak,english}[x])()}
today();
