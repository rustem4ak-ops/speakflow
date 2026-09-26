/* SpeakFlow 37 — Trainer mode */
(function(){
const B=window.SF37_BANK||[], THEMES=[...new Set(B.map(x=>x.theme))];
let C37={level:store.level||"A1",theme:"Все темы",pool:[],i:0,spoken:0,results:[],test:false};
function esc37(x){return esc(String(x))}
function build(){let a=B.filter(x=>x.level===C37.level&&(C37.theme==="Все темы"||x.theme===C37.theme));for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}C37.pool=a.slice(0,24);C37.i=0;C37.spoken=0;C37.results=[];C37.test=false}
function speak37(t,rate){if("speechSynthesis"in window){speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=rate||.92;speechSynthesis.speak(u)}}
function chooseLevel(v){C37.level=v;store.level=v;save();build();render()}
function chooseTheme(v){C37.theme=v;build();render()}
window.sf37Level=chooseLevel;window.sf37Theme=chooseTheme;
function render(){
let x=C37.pool[C37.i],done=C37.spoken, total=C37.pool.length;
if(!x){return test37()}
let levels=["A1","A2","B1","B2","C1"].map(l=>"<button class='"+(l===C37.level?"on":"")+"' onclick='sf37Level("+JSON.stringify(l)+")'>"+l+"</button>").join("");
let themes=["Все темы"].concat(THEMES).map(t=>"<option "+(t===C37.theme?"selected":"")+">"+esc37(t)+"</option>").join("");
shell("<section class='hero sfCoachHero'><div class='eyebrow'>🧑‍🏫 SpeakFlow Trainer</div><h1>Тренировка на сегодня</h1><p>Сначала говорим все фразы. После 24 фраз — мини-тест.</p><div class='sfLevelPicker'>"+levels+"</div><select class='sfThemeSelect' onchange='sf37Theme(this.value)'>"+themes+"</select></section><div class='card sfCoachCard'><div class='sfCoachProgress'><b>"+(C37.i+1)+" / "+total+"</b><span>"+C37.spoken+" ответов</span></div><div class='miniMeter'><i style='width:"+Math.round(C37.i/total*100)+"%'></i></div><div class='eyebrow'>"+esc37(x.theme)+" · "+C37.level+"</div><div class='sfCoachPhrase'>"+esc37(x.text)+"</div><button class='sfListenCircle' onclick='sf37Speak()'>🔊</button><p class='muted'>Послушай → повтори вслух → получи результат.</p><button class='primary sfCoachMic' onclick='sf37Mic()'>🎙️ Сказать фразу</button><div id='sf37Result'></div><button id='sf37Next' class='secondary full' style='display:none' onclick='sf37Next()'>Следующая фраза →</button></div><div class='card'><div class='eyebrow'>💡 Режим тренера</div><p class='muted'>Можно менять уровень и тему в любой момент. Если выбрать «Все темы», тренер смешает темы текущего уровня.</p></div>");
}
window.sf37Speak=function(){let x=C37.pool[C37.i];if(x)speak37(x.text,.9)}
window.sf37Next=function(){C37.i++;render()}
window.sf37Mic=function(){
let x=C37.pool[C37.i];if(!x)return;
let SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){toast("Распознавание речи недоступно. Можно использовать прослушивание и повторить фразу вслух.");return}
let r=new SR();r.lang="en-US";r.interimResults=false;r.continuous=false;r.maxAlternatives=3;
let btn=document.querySelector(".sfCoachMic"),out=document.getElementById("sf37Result");if(btn){btn.disabled=true;btn.textContent="🎙️ Слушаю…"}
r.onresult=function(e){let got=e.results[0][0].transcript.trim(),score=similarity(x.text,got),fb=typeof feedbackHtml==="function"?feedbackHtml(x.text,got):"";C37.spoken++;C37.results.push(score);scheduleReview(x.text,score);if(score>=80){store.xp=(store.xp||0)+2;save()}out.innerHTML="<div class='tutorFeedback'><b>"+(score>=80?"✓ Хорошо":"↻ Повтори ещё раз")+"</b><div>"+esc37(got)+"</div><strong>"+score+"%</strong>"+fb+"</div><button class='secondary full' onclick='sf37Mic()'>↻ Повторить</button>";document.getElementById("sf37Next").style.display="block";if(btn){btn.disabled=false;btn.textContent="🎙️ Сказать фразу"}};
r.onerror=function(e){out.innerHTML="<div class='tutorFeedback'>Не получилось распознать речь. Попробуй ещё раз.</div>";if(btn){btn.disabled=false;btn.textContent="🎙️ Сказать фразу"}};
r.onend=function(){if(btn&&!btn.disabled){btn.textContent="🎙️ Сказать фразу"}};
try{r.start()}catch(e){if(btn){btn.disabled=false;btn.textContent="🎙️ Сказать фразу"}toast("Нажми ещё раз для доступа к микрофону")}};
function test37(){
C37.test=true;let q=C37.results.length?C37.results.slice():[];while(q.length<24)q.push(0);let score=Math.round(q.reduce((a,b)=>a+b,0)/q.length);let qs=[];for(let i=0;i<8;i++){let x=C37.pool[i%24],opts=[x.text].concat(C37.pool.filter(y=>y.text!==x.text).sort(()=>Math.random()-.5).slice(0,3).map(y=>y.text));opts.sort(()=>Math.random()-.5);qs.push({x:x,opts:opts})}
C37.testQs=qs;C37.testIndex=0;C37.testScore=0;renderTest()}
function renderTest(){let q=C37.testQs[C37.testIndex];if(!q){finishTest();return}shell("<section class='hero sfTestHero'><div class='eyebrow'>📝 Мини-тест</div><h1>Проверяем 24 фразы</h1><p>"+(C37.testIndex+1)+" / "+C37.testQs.length+" · уровень "+C37.level+"</p></section><div class='card sfCoachCard'><div class='eyebrow'>Ситуация / тема: "+esc37(q.x.theme)+"</div><h2>Какую фразу мы тренировали?</h2><p class='muted'>Выбери правильный вариант.</p><div class='sfChoices'>"+q.opts.map(o=>"<button class='choice' onclick='sf37Answer("+JSON.stringify(o)+","+JSON.stringify(q.x.text)+")'>"+esc37(o)+"</button>").join("")+"</div></div>")}
window.sf37Answer=function(a,c){if(a===c)C37.testScore++;C37.testIndex++;renderTest()}
function finishTest(){let p=Math.round(C37.testScore/C37.testQs.length*100);if(p>=80){store.xp=(store.xp||0)+25;store.streak=(store.streak||0)+0;save()}shell("<section class='hero'><div class='eyebrow'>🏁 Тренировка завершена</div><h1>"+p+"%</h1><p>Мини-тест: <b>"+C37.testScore+" из "+C37.testQs.length+"</b>.</p><div class='card'><h3>"+(p>=80?"Тренировка засчитана 🎉":"Есть что повторить")+"</h3><p class='muted'>Твои результаты речи уже попали в Smart Review.</p><button class='primary full' onclick='sf37Start()'>🔁 Новая тренировка</button><button class='secondary full' onclick=\"go('profile')\">📊 Мой профиль</button></div></section>")}
window.sf37Start=function(){build();render()}
window.sf37Home=function(){build();render()}
window.go=function(x){page=x;if(x==="today"){render()}else if(x==="profile"){profile()}else if(x==="learn"){learn()}else if(x==="tutor"){tutor()}else if(x==="english"){english()}else if(x==="listen"){listenQuiz()}else if(x==="drive"){driveMode()}else render()}
build();render();
})();