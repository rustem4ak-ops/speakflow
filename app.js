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
let page="today",current=null,lessonPhase=0,lessonScore=null;
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

function audioEl(){return document.getElementById("player")}
function setAudio(text,autoplay=true){
 const p=audioEl(),st=document.getElementById("audioStatus"),src=AUDIO[text];
 if(!p||!src){if(st)st.textContent="Для этой фразы аудио ещё не добавлено.";return}
 p.src=src;p.load();
 if(st)st.textContent="Аудио готово.";
 if(autoplay){const q=p.play();if(q&&q.catch)q.catch(()=>{if(st)st.textContent="Нажмите ▶ Play на плеере."})}
}

let voices=[];
function loadVoices(){voices=window.speechSynthesis?window.speechSynthesis.getVoices():[]}
if("speechSynthesis" in window){
  loadVoices();
  window.speechSynthesis.onvoiceschanged=loadVoices;
}
function speakEnglish(text){
  if(!("speechSynthesis" in window)){
    setAudio(text,true);
    return;
  }
  const u=new SpeechSynthesisUtterance(text);
  u.lang=store.accent==="US"?"en-US":"en-GB";
  u.rate=0.95;
  u.pitch=1;
  const wanted=store.accent==="US"?["en-US","en_US"]:["en-GB","en_GB","en"];
  const v=voices.find(x=>wanted.includes(x.lang));
  if(v)u.voice=v;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
  const st=document.getElementById("audioStatus");
  if(st)st.textContent=(v?"English voice: "+v.name:"English voice selected by phone");
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
 '<div class="card"><div class="eyebrow">Следующая фраза</div><div class="phrase" style="font-size:21px">'+esc(next[0])+'</div><div class="translation">'+esc(next[1])+'</div><audio id="player" controls preload="auto" src="'+(AUDIO[next[0]]||"")+'"></audio><button class="secondary" style="width:100%;margin-top:10px" onclick="setAudio(\''+jsq(next[0])+'\',true)">▶ Послушать</button><div id="audioStatus" class="status">Аудио готово.</div></div>'+
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
 renderLesson(0);
}
function phaseLabel(){
 return ["1. Слушаем","2. Повторяем","3. Говорим"][lessonPhase]||"Тренировка";
}
function renderLesson(i,isReview=false){
 const item=current.items[i],text=item[0],tr=item[1];
 const progress=Math.round(((i+1)/current.items.length)*100);
 let body='<div class="lessonTop"><button class="back" onclick="go(\\'learn\\')">← К урокам</button><span class="lessonCount">'+(i+1)+' / '+current.items.length+'</span></div>'+
 '<div class="card lessonCard"><div class="eyebrow">'+current.level+' · '+current.title+'</div>'+
 '<div class="miniMeter"><i style="width:'+progress+'%"></i></div>'+
 '<div class="phrase">'+esc(text)+'</div><div class="translation">'+esc(tr)+'</div>'+
 '<button class="listenAction" onclick="lessonListen(\\''+jsq(text)+'\\')" aria-label="Прослушать фразу"><span>🔊</span><b>Прослушать фразу</b></button>'+
 '<div class="lessonListenHint">Нажми, чтобы услышать английскую фразу</div>'+
 '<div id="lessonSpeech" class="lessonResult"><span class="small">После прослушивания нажми микрофон внизу и повтори фразу.</span></div>'+
 '</div>'+
 '<div class="lessonBottom"><button class="bottomMic" onclick="lessonSpeak(\\''+jsq(text)+'\\')" aria-label="Повторить фразу"><span>🎙️</span></button><div class="bottomMicText">Повтори фразу</div></div>';
 shell(body);
}
function lessonListen(text){
 const box=document.getElementById("lessonSpeech");
 if(box)box.innerHTML='<span class="listeningPulse">🔊 Слушаем…</span>';
 speakEnglish(text);
 setTimeout(()=>{
   const b=document.getElementById("lessonSpeech");
   if(b)b.innerHTML='<span class="small">Теперь нажми 🎙️ внизу и повтори фразу.</span>';
 },900);
}
function lessonSpeak(target){
 const box=document.getElementById("lessonSpeech");
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){
   box.innerHTML='<span class="warning">Распознавание речи недоступно. Разреши микрофон в браузере.</span>';
   return;
 }
 const r=new SR();
 r.lang=store.accent==="UK"?"en-GB":"en-US";
 r.interimResults=false;r.maxAlternatives=1;
 box.innerHTML='<span class="listeningPulse">🎙️ Слушаю…</span>';
 try{r.start();}catch(e){
   box.innerHTML='<span class="warning">Не удалось запустить микрофон. Попробуй ещё раз.</span>';
   return;
 }
 r.onresult=e=>{
   const got=e.results[0][0].transcript;
   lessonScore=similarity(target,got);
   const good=lessonScore>=80;
   box.innerHTML='<div class="resultWord '+(good?"success":"warning")+'">'+(good?"✓ Получилось!":"↻ Пока не получилось")+'</div><div class="recognizedText">'+esc(got)+'</div><div class="resultScore">'+lessonScore+'%</div>'+
     (good?'<div class="small resultHint">Отлично. Переходим дальше…</div>':'<div class="small resultHint">Нажми 🎙️ и попробуй ещё раз.</div>');
   if(good){
     setTimeout(()=>{
       const idx=current.items.findIndex(x=>x[0]===target);
       if(idx>=0)markDone(idx);
     },1000);
   }
 };
 r.onerror=()=>box.innerHTML='<span class="warning">Не удалось распознать речь. Проверь разрешение микрофона.</span>';
}
function finishPhrase(i,isReview){ const text=current.items[i][0]; if(isReview){if(lessonScore!==null)scheduleReview(text,lessonScore);save();toast("Результат сохранён");go("today");return;} markDone(i); }
function markDone(i){
 const text=current.items[i][0];
 if(lessonScore!==null)scheduleReview(text,lessonScore);
 if(!store.done.includes(text)){store.done.push(text);store.xp+=10;updateStreak()}
 save();
 if(i+1<current.items.length){lessonPhase=0;lessonScore=null;renderLesson(i+1)}
 else{toast("Урок завершён");go("today")}
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
function startSpeech(target){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 const box=document.getElementById("speechResult");
 if(!SR){box.innerHTML='<span class="warning">Safari/браузер не дал доступ к распознаванию речи. Попробуйте Chrome или Safari с разрешённым микрофоном.</span>';return}
 const r=new SR();r.lang=store.accent==="UK"?"en-GB":"en-US";r.interimResults=false;r.maxAlternatives=1;
 box.textContent="🎙️ Слушаю…";
 r.onresult=e=>{const got=e.results[0][0].transcript;const score=similarity(target,got);box.innerHTML='<b>'+esc(got)+'</b><br><span class="'+(score>=80?"success":"warning")+'">Похожесть: '+score+'%</span><div class="small">Это сравнение текста распознавания с целевой фразой, не полноценная проверка произношения.</div>'};
 r.onerror=()=>box.innerHTML='<span class="warning">Не удалось распознать речь. Проверь разрешение микрофона.</span>';
 r.start()
}
function similarity(a,b){
 const A=a.toLowerCase().replace(/[^a-z ]/g,"").split(/\s+/),B=b.toLowerCase().replace(/[^a-z ]/g,"").split(/\s+/);let same=0;for(const x of A)if(B.includes(x))same++;return Math.round(same/Math.max(A.length,B.length)*100)
}
function english(){
 shell('<section class="hero"><div class="eyebrow">Мой English</div><h1>Настрой обучение под себя</h1><p>Здесь мы будем собирать персональную программу, слабые фразы и привычку говорить каждый день.</p></section>'+
 '<div class="card"><h3>Моя цель</h3><div class="goalGrid">'+[
 ["conversation","💬","Свободно говорить","Разговорная речь"],["travel","✈️","Путешествия","Аэропорт, отель, поездки"],["work","💼","Работа и учёба","Встречи, переписка"],["daily","🏠","Повседневная жизнь","Магазины, услуги, быт"]].map(x=>'<button class="goalBtn '+(store.goal===x[0]?"active":"")+'" onclick="setGoal(\''+x[0]+'\')"><b>'+x[1]+' '+x[2]+'</b><span>'+x[3]+'</span></button>').join("")+'</div></div>'+
 '<div class="card"><h3>Сколько времени в день?</h3><div class="timeRow">'+[5,10,15,30].map(x=>'<button class="timeBtn '+(store.minutes===x?"active":"")+'" onclick="store.minutes='+x+';save();english()">'+x+' мин</button>').join("")+'</div></div>'+
 '<div class="card"><h3>Вариант английского</h3><div class="timeRow"><button class="timeBtn '+(store.accent==="UK"?"active":"")+'" onclick="store.accent=\'UK\';save();english()">🇬🇧 UK</button><button class="timeBtn '+(store.accent==="US"?"active":"")+'" onclick="store.accent=\'US\';save();english()">🇺🇸 US</button></div></div>'+
 '<div class="card"><h3>Уровень</h3><div class="tabs">'+["A1","A2","B1","B2","C1"].map(x=>'<button class="tab '+(store.level===x?"active":"")+'" onclick="store.level=\''+x+'\';save();english()">'+x+'</button>').join("")+'</div></div>'+
 '<button class="secondary" style="width:100%" onclick="resetProgress()">Сбросить прогресс</button>')
}
function setGoal(g){store.goal=g;save();toast("Цель обновлена");english()}
function resetProgress(){if(confirm("Сбросить прогресс?")){store.done=[];store.xp=0;save();go("today")}}
function toast(t){const x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),1800)}
function go(x){page=x;({today,learn,speak,english}[x])()}
today();
