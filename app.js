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
{id:1,level:"A1",title:"Travel basics",icon:"✈️",desc:"Самые нужные фразы для поездки.",items:[
["Could I see your passport, please?","Могу я посмотреть ваш паспорт, пожалуйста?"],
["What time does boarding start?","Во сколько начинается посадка?"],
["Could you help me, please?","Не могли бы вы мне помочь, пожалуйста?"]]},
{id:2,level:"A2",title:"Restaurant & shopping",icon:"🍽️",desc:"Разговоры в ресторане и магазине.",items:[
["Could I have a table for two?","Можно столик на двоих?"],
["What do you recommend?","Что вы рекомендуете?"],
["How much does this cost?","Сколько это стоит?"]]},
{id:3,level:"B1",title:"Everyday conversation",icon:"💬",desc:"Свободнее говорим о себе и жизни.",items:[
["How is your day going?","Как проходит ваш день?"],
["What do you do for work?","Кем вы работаете?"],
["Could we move the meeting to tomorrow?","Можем перенести встречу на завтра?"]]},
{id:4,level:"B2",title:"Study & work",icon:"💼",desc:"Более длинные фразы для работы и учёбы.",items:[
["I would like to discuss my study plan with you.","Я хотел бы обсудить с вами мой учебный план."],
["From my perspective, the main issue is the lack of clear priorities.","С моей точки зрения, главная проблема — отсутствие чётких приоритетов."]]},
{id:5,level:"C1",title:"Advanced discussion",icon:"🧠",desc:"Продвинутая английская речь.",items:[
["I see your point, but I am not sure the data supports that conclusion.","Я понимаю вашу точку зрения, но не уверен, что данные подтверждают этот вывод."]]}
];
const store=JSON.parse(localStorage.getItem("speakflow10")||'{"done":[],"xp":0,"streak":0,"level":"A1"}');
let page="home",current=null;
const app=document.getElementById("app");
function save(){localStorage.setItem("speakflow10",JSON.stringify(store))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
function audioEl(){return document.getElementById("player")}
function setAudio(text,autoplay=true){
 const src=AUDIO[text], p=audioEl(), st=document.getElementById("audioStatus");
 if(!p||!src){if(st)st.textContent="Для этой фразы аудио ещё не добавлено.";return}
 p.src=src;
 p.load();
 if(st)st.textContent="Аудио готово. Нажмите Play.";
 if(autoplay){
   const promise=p.play();
   if(promise&&promise.catch)promise.catch(()=>{if(st)st.textContent="Safari заблокировал автоматический запуск. Нажмите ▶ Play на плеере."})
 }
}
function nav(){
 return '<div class="nav"><div class="navin">'+
 '<button onclick="go(\'home\')" class="'+(page==="home"?"active":"")+'">🏠<small>Главная</small></button>'+
 '<button onclick="go(\'learn\')" class="'+(page==="learn"?"active":"")+'">📚<small>Уроки</small></button>'+
 '<button onclick="go(\'progress\')" class="'+(page==="progress"?"active":"")+'">📈<small>Прогресс</small></button>'+
 '</div></div>'
}
function shell(body,title="SpeakFlow"){
 app.innerHTML='<div class="wrap"><div class="top"><div class="brand">Speak<span>Flow</span></div><div class="pill">'+title+'</div></div>'+body+'</div>'+nav()
}
function home(){
 const done=store.done.length;
 shell('<section class="hero"><div class="eyebrow">English speaking trainer</div><h1>Учимся говорить английский естественно</h1><p>Слушай реальную аудиодорожку, повторяй фразу и постепенно собирай свой словарный запас.</p><button class="primary" onclick="go(\'learn\')">Начать обучение</button></section>'+
 '<div class="levels">'+["A1","A2","B1","B2","C1"].map(x=>'<button class="level '+(store.level===x?"active":"")+'" onclick="store.level=\''+x+'\';save();home()">'+x+'</button>').join('')+'</div>'+
 '<div class="card"><div class="eyebrow">Сегодня</div><div class="row" style="margin-top:10px"><div><b>'+done+'</b><div class="small">фраз изучено</div></div><div><b>'+store.xp+'</b><div class="small">XP</div></div><div><b>'+store.streak+'</b><div class="small">дней серии</div></div></div></div>'+
 '<div class="card"><b>🔊 Проверка озвучки</b><p class="muted">Здесь используется обычный HTML5-аудиоплеер и WAV-файл, без TTS.</p><div class="audioBox"><div class="phrase" style="font-size:20px">Could I see your passport, please?</div><audio id="player" controls preload="auto" src="'+AUDIO["Could I see your passport, please?"]+'"></audio><button class="bigPlay" onclick="testAudio()">▶ Проверить английскую озвучку</button><div id="audioStatus" class="status">Нажмите кнопку или ▶ на плеере.</div></div></div>')
}
function learn(){
 const list=COURSES.filter(c=>c.level===store.level);
 shell('<button class="back" onclick="go(\'home\')">← Назад</button><div class="hero"><div class="eyebrow">Уровень '+store.level+'</div><h1>Уроки</h1><p>Каждый урок построен вокруг коротких фраз, которые можно слушать и повторять.</p></div>'+
 list.map(c=>'<div class="card course"><div class="courseIcon">'+c.icon+'</div><div style="flex:1"><h3>'+c.title+'</h3><div class="muted">'+c.desc+'</div><button class="secondary" style="margin-top:10px" onclick="openCourse('+c.id+')">Открыть урок</button></div></div>').join(''))
}
function openCourse(id){current=COURSES.find(c=>c.id===id);renderLesson(0)}
function renderLesson(i){
 const text=current.items[i][0],tr=current.items[i][1],done=store.done.includes(text);
 shell('<button class="back" onclick="go(\'learn\')">← К урокам</button><div class="card"><div class="eyebrow">'+current.level+' · '+current.title+'</div><div class="small" style="margin-top:7px">Фраза '+(i+1)+' из '+current.items.length+'</div><div class="phrase">'+esc(text)+'</div><div class="translation">'+esc(tr)+'</div><div class="audioBox"><audio id="player" controls preload="auto" src="'+(AUDIO[text]||"")+'"></audio><button class="bigPlay" onclick="playCurrent('+i+')">▶ Слушать</button><div id="audioStatus" class="status">'+(AUDIO[text]?"Аудио готово.":"Аудио для этой фразы пока не добавлено.")+'</div></div><button class="primary" onclick="markDone('+i+')">'+(done?"✓ Повторить и продолжить":"Я выучил эту фразу")+'</button></div>')
}
function playCurrent(i){setAudio(current.items[i][0],true)}
function markDone(i){
 const text=current.items[i][0]; if(!store.done.includes(text))store.done.push(text);store.xp+=10;save();
 if(i+1<current.items.length)renderLesson(i+1);else{toast("Урок завершён +30 XP");go("learn")}
}
function progress(){
 const total=COURSES.reduce((n,c)=>n+c.items.length,0),pct=Math.round(store.done.length/total*100);
 shell('<div class="hero"><div class="eyebrow">Ваш прогресс</div><h1>'+pct+'%</h1><p>'+store.done.length+' из '+total+' фраз отмечены как изученные.</p><div class="meter" style="margin-top:16px"><i style="width:'+pct+'%"></i></div></div>'+
 '<div class="card"><h3>Изученные фразы</h3><div class="list">'+(store.done.length?store.done.map(x=>'<div class="listItem"><div><b>'+esc(x)+'</b><div class="small">English phrase</div></div><span class="check">✓</span></div>').join(''):'<div class="empty">Пока нет изученных фраз.</div>')+'</div></div>'+
 '<button class="secondary" style="width:100%" onclick="resetProgress()">Сбросить прогресс</button>')
}
function resetProgress(){if(confirm("Сбросить прогресс?")){store.done=[];store.xp=0;save();progress()}}
function testAudio(){const p=audioEl(),st=document.getElementById("audioStatus");p.currentTime=0;const q=p.play();if(q&&q.catch)q.catch(()=>{st.textContent="Не удалось начать воспроизведение. Попробуйте нажать ▶ на самом плеере."});else st.textContent="🔊 Воспроизведение запущено."}
function toast(t){const x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),1800)}
function go(x){page=x;({home,learn,progress}[x])()}
home();
