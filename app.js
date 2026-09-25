const lessons=[
{id:1,title:"At the Airport",level:"A2",time:"10 min",icon:"✈️",topic:"Travel",phrases:[
["Excuse me, where is gate 24?","Извините, где выход 24?"],
["Could you tell me where gate 24 is?","Не могли бы вы сказать, где выход 24?"],
["I need to find my gate.","Мне нужно найти мой выход."]
]},
{id:2,title:"At the Restaurant",level:"A1",time:"8 min",icon:"🍽️",topic:"Everyday",phrases:[
["Could I have a table for two?","Можно столик на двоих?"],
["I'd like to order, please.","Я хотел(а) бы сделать заказ."],
["Could we have the bill, please?","Можно счёт, пожалуйста?"]
]},
{id:3,title:"Small Talk",level:"A2",time:"9 min",icon:"💬",topic:"Speaking",phrases:[
["How's your day going?","Как проходит твой день?"],
["What do you do for work?","Кем ты работаешь?"],
["That's interesting! Tell me more.","Интересно! Расскажи подробнее."]
]},
{id:4,title:"Job Interview",level:"B1",time:"12 min",icon:"💼",topic:"Work",phrases:[
["Tell me a little about yourself.","Расскажите немного о себе."],
["I'm responsible for customer support.","Я отвечаю за поддержку клиентов."],
["I'm looking for a new challenge.","Я ищу новый профессиональный вызов."]
]}
];

let state=JSON.parse(localStorage.getItem("speakflow")||'{"tab":"home","streak":1,"completed":[],"minutes":0,"xp":0}');
const save=()=>localStorage.setItem("speakflow",JSON.stringify(state));
const screen=document.getElementById("screen");
const streakEl=document.getElementById("streak");
streakEl.textContent=state.streak;

function setTab(tab){state.tab=tab;save();render();document.querySelectorAll(".tabbar button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab))}
document.querySelectorAll(".tabbar button").forEach(b=>b.onclick=()=>setTab(b.dataset.tab));

function render(){
 if(state.tab==="home") home();
 if(state.tab==="learn") learn();
 if(state.tab==="practice") practice();
 if(state.tab==="progress") progress();
}
function home(){
 const done=state.completed.length;
 screen.innerHTML=`<section class="hero"><small>TODAY'S LESSON</small><h2>At the Airport ✈️</h2><p>Learn useful English for your next trip.</p><button class="btn btn-light" onclick="openLesson(1)">Continue lesson →</button></section>
 <div class="section-title"><h3>Your progress</h3><span class="muted">${done}/4 lessons</span></div>
 <div class="card"><div style="display:flex;justify-content:space-between"><b>A2 English</b><b>${Math.round(done/4*100)}%</b></div><div class="progressbar" style="margin-top:10px"><i style="width:${done/4*100}%"></i></div></div>
 <div class="section-title"><h3>Quick practice</h3></div>
 <div class="grid"><div class="stat"><strong>🎧</strong><span class="muted">Listen</span></div><div class="stat"><strong>🗣️</strong><span class="muted">Shadowing</span></div><div class="stat"><strong>📚</strong><span class="muted">Phrases</span></div><div class="stat"><strong>🤖</strong><span class="muted">AI chat</span></div></div>
 <div class="section-title"><h3>Keep going 🔥</h3></div><div class="notice">Study for 10 minutes today to keep your streak alive.</div>`;
}
function learn(){
 screen.innerHTML=`<div class="section-title"><h3>English courses</h3></div>
 <div class="chips"><span class="chip">A1</span><span class="chip">A2</span><span class="chip">B1</span><span class="chip">B2</span></div>
 ${lessons.map(l=>`<div class="card" onclick="openLesson(${l.id})"><div class="lesson-row"><div class="icon">${l.icon}</div><div style="flex:1"><h4>${l.title}</h4><div class="muted">${l.level} · ${l.time} · ${l.topic}</div></div><b>›</b></div></div>`).join("")}`;
}
function voiceStatusText(){
 const v=window.voiceEngine||{};
 if(v.state==="ready") return "🧠 Neural English voice ready";
 if(v.state==="loading") return `⏳ Loading neural voice${v.progress?` · ${v.progress}%`:"…"}`;
 if(v.state==="synthesizing") return "🧠 Generating natural English…";
 if(v.state==="error") return `⚠️ Neural voice error: ${v.error||"check connection"}`;
 return "🧠 Neural English voice";
}
function updateVoiceStatus(){
 const el=document.getElementById("voiceStatus");
 if(el) el.textContent=voiceStatusText();
}
window.addEventListener("speakflow-voice-status",updateVoiceStatus);

function practice(){
 screen.innerHTML=`<div class="section-title"><h3>Practice</h3></div>
 <div class="card voice-card"><div class="lesson-row"><div class="icon">🧠</div><div style="flex:1"><h4>Neural English voice</h4><div class="muted" id="voiceStatus">${voiceStatusText()}</div></div></div><button class="btn btn-dark" style="margin-top:14px;width:100%" onclick='prepareNeuralVoice()'>Load / prepare voice</button><button class="btn" style="margin-top:8px;width:100%" onclick='speakEnglish("Hello! Welcome to SpeakFlow. Lets practice English together.")'>▶ Test natural English</button></div>
 <div class="card"><div class="lesson-row"><div class="icon">🗣️</div><div><h4>Shadowing</h4><div class="muted">Listen to the neural voice and repeat useful phrases.</div></div></div><button class="btn btn-dark" style="margin-top:14px;width:100%" onclick="openLesson(1)">Start speaking</button></div>
 <div class="card"><div class="lesson-row"><div class="icon">🤖</div><div><h4>AI conversation demo</h4><div class="muted">Practice a real-life conversation without an API.</div></div></div><button class="btn btn-dark" style="margin-top:14px;width:100%" onclick="chatDemo()">Open conversation</button></div>
 <div class="notice"><b>Что изменилось в v3:</b> уроки больше не используют голос iPhone для английских фраз. SpeakFlow загружает нейросетевой голос Piper Plus прямо в браузер и синтезирует речь на устройстве. API-ключ не нужен. Первый запуск скачивает модель примерно на 80 МБ и кеширует её в браузере; после этого повторная загрузка обычно не требуется. Если нейросетевой движок недоступен, приложение временно использует голос устройства.</div>`;
 updateVoiceStatus();
}
function progress(){
 const pct=Math.round(state.completed.length/lessons.length*100);
 screen.innerHTML=`<div class="section-title"><h3>Your progress</h3></div>
 <div class="grid"><div class="stat"><strong>${state.xp}</strong><span class="muted">XP</span></div><div class="stat"><strong>${state.minutes}</strong><span class="muted">Minutes</span></div><div class="stat"><strong>${state.completed.length}</strong><span class="muted">Lessons</span></div><div class="stat"><strong>🔥 ${state.streak}</strong><span class="muted">Day streak</span></div></div>
 <div class="section-title"><h3>Course completion</h3></div><div class="card"><b>A1–B1 starter course</b><div class="progressbar" style="margin:12px 0 7px"><i style="width:${pct}%"></i></div><span class="muted">${pct}% complete</span></div>
 <div class="section-title"><h3>Privacy</h3></div><div class="notice">This free prototype stores your progress only on this device using local storage. No account is required.</div>`;
}
function openLesson(id){
 const l=lessons.find(x=>x.id===id);let i=0;
 function draw(){
  const p=l.phrases[i];
  screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('learn')">← Back</button><span class="muted">${i+1}/${l.phrases.length}</span></div>
  <div class="card"><span class="chip">${l.level} · ${l.topic}</span><div class="phrase">${p[0]}</div><div class="translation">${p[1]}</div>
  <div class="audio"><button class="btn btn-dark" onclick='speakEnglish(${JSON.stringify(p[0])})'>🧠 Natural English</button><button class="btn" onclick='speak(${JSON.stringify(p[1])},"ru-RU")'>🇷🇺 Перевод</button></div>
  <hr style="border:0;border-top:1px solid #eee;margin:24px 0">
  <div style="text-align:center"><b>Now repeat</b><button class="bigmic" id="mic">🎙️</button><div class="feedback" id="feedback">Tap the microphone and say the phrase.</div></div></div>
  <button class="btn btn-dark" style="width:100%" id="next">${i===l.phrases.length-1?"Finish lesson":"Next phrase →"}</button>`;
  document.getElementById("next").onclick=()=>{if(i<l.phrases.length-1){i++;draw()}else finishLesson(l.id)};
  document.getElementById("mic").onclick=startSpeech;
 }
 function startSpeech(){
  const out=document.getElementById("feedback");
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){out.textContent="Speech recognition isn't available in this browser. You can still listen and repeat.";return}
  const r=new SR();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;
  out.textContent="Listening…";
  r.onresult=e=>{const said=e.results[0][0].transcript;out.innerHTML=`You said: <b>${said}</b><br><span style="color:#16a34a">✓ Nice! Try again and get even closer.</span>`};
  r.onerror=()=>out.textContent="I couldn't hear that. Please try again.";
  r.start();
 }
 draw();
}
function finishLesson(id){if(!state.completed.includes(id))state.completed.push(id);state.xp+=50;state.minutes+=10;save();screen.innerHTML=`<div class="card" style="text-align:center;padding:40px 20px"><div style="font-size:60px">🎉</div><h2>Lesson complete!</h2><p class="muted">+50 XP · +10 minutes</p><button class="btn btn-dark" onclick="setTab('home')">Continue</button></div>`}
let cachedVoices=[];
function loadVoices(){
  if(!("speechSynthesis" in window)) return;
  const refresh=()=>{cachedVoices=speechSynthesis.getVoices()||[]};
  refresh();
  if(speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged",refresh);
}
loadVoices();
function pickVoice(lang){
  const voices=(cachedVoices.length?speechSynthesis.getVoices():cachedVoices)||[];
  const exact=voices.filter(v=>v.lang && v.lang.toLowerCase()===lang.toLowerCase());
  const same=voices.filter(v=>v.lang && v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()));
  return exact[0] || same[0] || null;
}
function speak(text, lang="en-US"){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang=lang;
  u.rate=lang.startsWith("en") ? .92 : .95;
  u.pitch=1;
  const voice=pickVoice(lang);
  if(voice) u.voice=voice;
  speechSynthesis.speak(u);
}
async function speakEnglish(text){
  if(window.stopNeuralVoice) window.stopNeuralVoice();
  const ok=await (window.neuralSpeak ? window.neuralSpeak(text) : Promise.resolve(false));
  if(!ok) speak(text,"en-US");
}
function chatDemo(){
 screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('practice')">← Back</button><b>Airport English</b></div><div class="card"><div class="chat" id="chat"><div class="bubble">Hi! Welcome to the airport. How can I help you?</div></div><div class="inputrow"><input id="msg" placeholder="Type your answer…"><button class="btn btn-dark" onclick="sendMsg()">Send</button></div></div><div class="notice">This is an offline conversation demo. A real AI teacher can be connected later without changing the interface.</div>`;
}
function sendMsg(){const input=document.getElementById("msg"),v=input.value.trim();if(!v)return;const chat=document.getElementById("chat");chat.innerHTML+=`<div class="bubble me">${escapeHtml(v)}</div>`;input.value="";setTimeout(()=>{chat.innerHTML+=`<div class="bubble">Great! A natural way to say that is: <b>Could you help me find my gate?</b> What gate are you looking for?</div>`},350)}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
render();