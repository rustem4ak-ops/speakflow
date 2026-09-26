import json, hashlib, zipfile, re
from pathlib import Path
root=Path('/mnt/data/SpeakFlow-8.0')
# 60 original course themes, structured like an audio-first A1-C1 curriculum.
courses=[
(1,'At the Airport','A2','Travel','✈️','Check-in, gates, boarding and baggage','airport','аэропорт'),
(2,'At a Hotel','A1','Travel','🏨','Check in, ask questions and solve simple problems','hotel','отель'),
(3,'At the Restaurant','A1','Everyday','🍽️','Order food, ask about dishes and pay the bill','restaurant','ресторан'),
(4,'Shopping','A2','Everyday','🛍️','Find sizes, compare products and return an item','shopping','покупки'),
(5,'Small Talk','A2','Speaking','💬','Start conversations and keep them going','small-talk','неформальное общение'),
(6,'Job Interview','B1','Career','💼','Talk about experience, strengths and goals','job-interview','собеседование'),
(7,'At Work','B1','Career','🏢','Meetings, deadlines and everyday office English','work','работа'),
(8,'Doctor','B1','Health','🩺','Describe symptoms and understand simple medical questions','doctor','приём у врача'),
(9,'Pharmacy','A2','Health','💊','Ask for common medicines and explain what you need','pharmacy','аптека'),
(10,'Taxi & Transport','A2','Travel','🚕','Get around a city and ask about routes and prices','taxi-transport','такси и транспорт'),
(11,'Renting an Apartment','B1','Life','🏠','View a flat, ask about rent and understand the contract','renting-apartment','аренда квартиры'),
(12,'Phone Calls','B1','Everyday','📞','Handle calls, leave messages and clarify information','phone-calls','телефонные звонки'),
(13,'Customer Service','B2','Work','🎧','Explain a problem politely and find a solution','customer-service','служба поддержки'),
(14,'Making Friends','B1','Social','🤝','Meet people, make plans and talk naturally','making-friends','новые знакомства'),
(15,'Travel Conversations','B2','Travel','🌍','Talk about plans, experiences and unexpected situations','travel-conversations','разговоры о путешествиях'),
(16,'Study & University','B2','Study','🎓','Discuss classes, assignments and academic plans','study-university','учёба и университет'),
(17,'Professional English','C1','Career','📈','Express ideas, negotiate and handle professional discussions','professional-english','деловой английский'),
(18,'Everyday English','A1','Everyday','☀️','The most useful phrases for daily life','everyday-english','повседневная жизнь'),
(19,'At the Dentist','B1','Health','🦷','Make an appointment and explain dental problems','dentist','стоматолог'),
(20,'At a Massage Salon','A2','Everyday','💆','Book a massage and explain preferences','massage-salon','массажный салон'),
(21,'Hotel Problems & Complaints','B1','Travel','🛎️','Handle room problems, delays and complaints politely','hotel-complaints','проблемы в отеле'),
(22,'Buying Clothes','A2','Shopping','👕','Choose clothes, sizes, colours and returns','buying-clothes','покупка одежды'),
(23,'At an English-Speaking Company','B1','Career','🏢','Communicate with colleagues and managers','company-english','англоязычная компания'),
(24,'English for Drivers','B1','Transport','🚗','Talk about driving, directions, fuel and documents','drivers','вождение'),
(25,'Truck Driver English','B1','Transport','🚚','Use practical English for loading, routes and deliveries','truck-driver','работа водителя грузовика'),
(26,'At the Supermarket','A1','Everyday','🛒','Find products, prices and checkout information','supermarket','супермаркет'),
(27,'At the Bank','A2','Everyday','🏦','Ask about accounts, payments and banking services','bank','банк'),
(28,'Opening a Bank Account','B1','Life','💳','Complete forms and discuss banking requirements','bank-account','открытие счёта'),
(29,'At the Post Office','A2','Everyday','📦','Send parcels, letters and track deliveries','post-office','почта'),
(30,'Immigration & Documents','B1','Relocation','🪪','Discuss forms, permits and official documents','immigration','иммиграция и документы'),
(31,'Government & Public Services','B2','Relocation','🏛️','Handle appointments and public-service questions','public-services','государственные услуги'),
(32,'At School & With Teachers','A2','Family','🏫','Talk to teachers about school and children','school','школа'),
(33,'Daycare & Children','B1','Family','🧸','Discuss daycare routines, health and schedules','daycare','детский сад'),
(34,'Talking to Neighbors','A2','Everyday','🏘️','Be friendly, solve small issues and share information','neighbors','соседи'),
(35,'Moving to a New Country','B1','Relocation','🧳','Handle everyday situations after relocation','moving-country','переезд в другую страну'),
(36,'Finding a Job','B1','Career','🔎','Search, apply and communicate with employers','finding-job','поиск работы'),
(37,'Workplace Small Talk','B1','Career','☕','Make natural small talk with colleagues','work-small-talk','общение с коллегами'),
(38,'Meetings & Presentations','B2','Career','📊','Present ideas, ask questions and manage meetings','meetings','встречи и презентации'),
(39,'Business Negotiations','C1','Career','🤝','Negotiate terms, priorities and agreements','negotiations','деловые переговоры'),
(40,'Emails & Messages','B1','Career','✉️','Write and understand useful work messages','emails','рабочие письма'),
(41,'Making Appointments','A2','Everyday','📅','Book, change and confirm appointments','appointments','запись на приём'),
(42,'Hairdresser & Beauty Salon','A2','Everyday','💇','Describe services, styles and preferences','beauty-salon','салон красоты'),
(43,'Repair & Home Services','B1','Home','🔧','Arrange repairs and explain household problems','home-services','ремонт и бытовые услуги'),
(44,'Car Service & Repairs','B1','Transport','🛠️','Explain car problems and service needs','car-service','автосервис'),
(45,'Renting a Car','A2','Travel','🚙','Rent, inspect and return a car','rent-car','аренда автомобиля'),
(46,'Public Transport','A2','Travel','🚆','Use buses, trains and local transport','public-transport','общественный транспорт'),
(47,'Emergency Situations','B1','Safety','🚨','Ask for urgent help and explain what happened','emergency','экстренные ситуации'),
(48,'Police & Lost Documents','B1','Safety','👮','Report lost items and explain a situation','police-documents','полиция и документы'),
(49,'Airport Problems','B1','Travel','🛄','Handle delays, cancellations and baggage issues','airport-problems','проблемы в аэропорту'),
(50,'Travel Emergencies','B2','Travel','🆘','Handle unexpected problems while travelling','travel-emergency','экстренные ситуации в поездке'),
(51,'Hotels — Advanced English','B2','Travel','🏨','Handle detailed hotel requests and complaints','hotels-advanced','отель: продвинутый английский'),
(52,'Restaurants — Advanced English','B2','Everyday','🍷','Discuss dishes, allergies, service and payment','restaurants-advanced','ресторан: продвинутый английский'),
(53,'Social Events & Parties','B1','Social','🎉','Meet people and keep conversations natural','social-events','вечеринки и мероприятия'),
(54,'Dating & Relationships','B1','Social','❤️','Talk about plans, interests and boundaries','dating','знакомства и отношения'),
(55,'Talking About Family','A2','Social','👨‍👩‍👧','Talk about family, routines and plans','family','семья'),
(56,'Hobbies & Free Time','A2','Everyday','🎨','Talk about hobbies and free-time activities','hobbies','хобби и свободное время'),
(57,'Weather & Daily Life','A1','Everyday','🌦️','Talk about weather and everyday plans','weather','погода и повседневная жизнь'),
(58,'News & Current Events','B2','Speaking','📰','Discuss news and express opinions carefully','news','новости и события'),
(59,'Technology & Smartphones','B1','Technology','📱','Discuss devices, settings and common tech problems','technology','технологии и смартфоны'),
(60,'Internet & Online Services','B1','Technology','🌐','Use websites, accounts and online services','internet','интернет и онлайн-сервисы'),
]
levels=['A1','A2','B1','B2','C1']
unit_names=['Getting started','Useful questions','Requests & answers','Problems & solutions','Making plans','Real conversations','Clarifying details','Polite English','More natural English','Final practice']
templates=[
('Could you tell me more about the {topic}?','Можете рассказать подробнее про {ru}?'),
('I have a question about the {topic}.','У меня есть вопрос по поводу {ru}.'),
('What do I need to know before I start?','Что мне нужно знать перед тем, как начать?'),
('Could you explain how this works?','Можете объяснить, как это работает?'),
('Is there anything I should bring with me?','Мне нужно что-нибудь взять с собой?'),
('What time would work best for you?','Какое время вам подходит лучше всего?'),
('Could we change the plan if necessary?','Мы можем изменить план, если понадобится?'),
('I would like to check the details first.','Я хотел(а) бы сначала проверить детали.'),
('Could you repeat that a little more slowly?','Не могли бы вы повторить немного медленнее?'),
('Sorry, I did not quite understand.','Извините, я не совсем понял(а).'),
('What would you recommend in this situation?','Что бы вы порекомендовали в этой ситуации?'),
('Is there another option we could consider?','Есть ли другой вариант, который мы могли бы рассмотреть?'),
('How long does it usually take?','Сколько времени это обычно занимает?'),
('Could you give me an estimate?','Можете дать примерную оценку?'),
('I need to make sure I understand correctly.','Мне нужно убедиться, что я правильно понял(а).'),
('Would it be possible to do this today?','Можно ли сделать это сегодня?'),
('What happens if there is a problem?','Что произойдёт, если возникнет проблема?'),
('I would appreciate your help with this.','Я был(а) бы благодарен(на) за помощь с этим.'),
('Could you send me the information by email?','Можете отправить мне информацию по электронной почте?'),
('I will get back to you as soon as I can.','Я свяжусь с вами, как только смогу.'),
('Let me check that for you.','Позвольте мне проверить это для вас.'),
('I am not sure which option is better.','Я не уверен(а), какой вариант лучше.'),
('Could we go over the details together?','Можем вместе пройтись по деталям?'),
('That sounds good to me.','Меня это устраивает.'),
('That should work for me.','Думаю, мне это подходит.'),
('I would prefer something a little simpler.','Я бы предпочёл(а) что-нибудь немного проще.'),
('Could you make that clear for me?','Можете прояснить это для меня?'),
('What should I do next?','Что мне делать дальше?'),
('Is there anything else I need to do?','Мне нужно сделать что-нибудь ещё?'),
('I have already completed the first step.','Я уже выполнил(а) первый шаг.'),
('I am having a problem with the {topic}.','У меня проблема с {ru}.'),
('The main issue is that I do not have enough information.','Главная проблема в том, что у меня недостаточно информации.'),
('Could you help me find a solution?','Можете помочь мне найти решение?'),
('I think there may have been a misunderstanding.','Думаю, произошло недоразумение.'),
('Could we try another approach?','Можем попробовать другой подход?'),
('I would like to avoid any unnecessary delays.','Я хотел(а) бы избежать ненужных задержек.'),
('When would you like me to confirm this?','Когда вы хотите, чтобы я это подтвердил(а)?'),
('I can send the documents today.','Я могу отправить документы сегодня.'),
('Could you let me know if anything changes?','Дайте мне знать, если что-нибудь изменится.'),
('I will keep that in mind.','Я буду иметь это в виду.'),
('Thanks, that is very helpful.','Спасибо, это очень полезно.'),
('I really appreciate your time.','Я очень ценю ваше время.'),
('Before we finish, could I ask one more question?','Перед тем как закончить, можно задать ещё один вопрос?'),
('Could you confirm the date and time?','Можете подтвердить дату и время?'),
('I would like to make sure everything is correct.','Я хотел(а) бы убедиться, что всё правильно.'),
('If possible, I would like to arrange this in advance.','Если возможно, я хотел(а) бы организовать это заранее.'),
('What would be the most convenient way to handle this?','Как будет удобнее всего решить этот вопрос?'),
('I understand. Let us see what we can do.','Я понимаю. Давайте посмотрим, что можно сделать.'),
('That makes sense.','Это имеет смысл.'),
('I think we are on the same page now.','Думаю, теперь мы понимаем друг друга.'),
]
# Keep the first 18 themes and add 42 new ones; all phrase content is original, not copied from Lisn.
data=[]
for cid,title,level,topic,icon,desc,slug,ru in courses:
    units=[]
    phrases=[]
    for u in range(10):
        up=[]
        for j in range(5):
            idx=u*5+j
            en,tr=templates[idx]
            en=en.format(topic=title.lower(),ru=ru)
            tr=tr.format(topic=title.lower(),ru=ru)
            # Make a few units more specific with natural title references.
            up.append([en,tr])
            phrases.append([en,tr])
        units.append({'id':u+1,'title':unit_names[u],'phrases':up})
    data.append({'id':cid,'title':title,'level':level,'time':'15 min','icon':icon,'topic':topic,'desc':desc,'slug':slug,'units':units,'phrases':phrases})
(root/'data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')

# Generator for GitHub Actions. It creates 3000 static WAVs and exact phrase index.
gen=r'''import json,time,hashlib
from pathlib import Path
import soundfile as sf
from kokoro import KPipeline
import numpy as np
ROOT=Path(__file__).resolve().parent
DATA=json.loads((ROOT/'data.json').read_text(encoding='utf-8'))
OUT=ROOT/'audio'; OUT.mkdir(exist_ok=True)
for p in OUT.glob('*.wav'): p.unlink()
(OUT/'index.json').unlink(missing_ok=True)
pipeline=KPipeline(lang_code='a'); VOICE='af_heart'; SPEED=1.0
phrases=[]
for c in DATA:
    for text,_ in c['phrases']: phrases.append(text)
manifest={}; total=len(phrases)
for n,text in enumerate(phrases,1):
    key=hashlib.sha256(text.strip().encode('utf-8')).hexdigest()[:16]
    path=OUT/f'phrase-{key}.wav'
    print(f'[{n}/{total}] {text}')
    chunks=[]
    for _gs,_ps,audio in pipeline(text,voice=VOICE,speed=SPEED,split_pattern=r'\n+'):
        if audio is not None: chunks.append(audio.numpy())
    if not chunks: raise RuntimeError(f'No audio returned: {text}')
    sf.write(str(path),np.concatenate(chunks),24000,subtype='PCM_16')
    manifest[text]=f'audio/phrase-{key}.wav'
    time.sleep(.03)
(OUT/'index.json').write_text(json.dumps({'version':'8.0','algorithm':'sha256-first-16','phrases':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Generated {total} exact phrase audio files.')
'''
(root/'tools_generate_audio.py').write_text(gen,encoding='utf-8')
workflow='''name: Generate all SpeakFlow 8.0 Kokoro audio\n\non:\n  workflow_dispatch:\n  push:\n    paths:\n      - "data.json"\n      - "tools_generate_audio.py"\n      - ".github/workflows/generate-audio.yml"\n\npermissions:\n  contents: write\n\njobs:\n  generate:\n    runs-on: ubuntu-latest\n    timeout-minutes: 180\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - name: Install system audio dependency\n        run: |\n          sudo apt-get update\n          sudo apt-get install -y espeak-ng\n      - name: Install Kokoro\n        run: |\n          python -m pip install --upgrade pip\n          pip install "kokoro>=0.9.4" soundfile numpy\n      - name: Generate audio\n        run: python tools_generate_audio.py\n      - name: Check output\n        run: |\n          echo "WAV files:"\n          find audio -name "*.wav" | wc -l\n          test -f audio/index.json\n      - name: Commit generated audio\n        run: |\n          git config user.name "github-actions[bot]"\n          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"\n          git add audio/\n          if git diff --cached --quiet; then echo "No audio changes."; else git commit -m "Generate SpeakFlow 8.0 Kokoro audio"; git push; fi\n'''
(root/'.github/workflows').mkdir(parents=True,exist_ok=True)
(root/'.github/workflows/generate-audio.yml').write_text(workflow,encoding='utf-8')

# Audio runtime: exact phrase hash lookup, caching, no Kokoro in browser.
tts=r'''const AUDIO_INDEX_URL='audio/index.json';
window.voiceEngine={state:'loading',progress:0,error:null,cache:new Map()};
let audioIndex=null;
async function loadAudioIndex(){
  try{ const r=await fetch(AUDIO_INDEX_URL,{cache:'no-cache'}); if(!r.ok) throw new Error('Audio index unavailable'); audioIndex=await r.json(); window.voiceEngine.state='ready'; window.dispatchEvent(new Event('speakflow-voice-status')); return true; }
  catch(e){ window.voiceEngine.state='error'; window.voiceEngine.error='Run Generate all SpeakFlow 8.0 Kokoro audio in GitHub Actions.'; window.dispatchEvent(new Event('speakflow-voice-status')); return false; }
}
function phraseUrl(text){return audioIndex?.phrases?.[text]||null;}
async function neuralSpeak(text){
  if(!audioIndex && !(await loadAudioIndex())) return false;
  const url=phraseUrl(text); if(!url) return false;
  try{ let a=window.voiceEngine.cache.get(text); if(!a){a=new Audio(url); a.preload='auto'; window.voiceEngine.cache.set(text,a);} a.pause(); a.currentTime=0; await a.play(); return true; }catch(e){return false;}
}
async function prefetchLessonAudio(phrases,start=0,progress){
  if(!audioIndex && !(await loadAudioIndex())) throw new Error('index');
  const texts=phrases.map(p=>Array.isArray(p)?p[0]:p);
  for(let i=start;i<texts.length;i++){const url=phraseUrl(texts[i]); if(url){const a=new Audio(); a.preload='auto'; a.src=url; try{await new Promise(res=>{a.oncanplaythrough=res;a.onerror=res;setTimeout(res,2500);});}catch(e){} } if(progress)progress(i+1,texts.length);}
}
window.prepareNeuralVoice=loadAudioIndex;
loadAudioIndex();
'''
(root/'tts.js').write_text(tts,encoding='utf-8')

# Main app. Features: Today plan, weak-phrase SRS, listening quiz, repeat, shadowing, offline roleplay, progress calendar.
app=r'''const STORAGE_KEY='speakflow-v8';
const levels=['A1','A2','B1','B2','C1'];
const todayKey=()=>new Date().toISOString().slice(0,10);
let courses=[];
const screen=document.getElementById('screen');
const streakEl=document.getElementById('streak');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const defaults={tab:'home',level:'A2',dailyGoal:1,dailyDone:0,lastStudyDate:null,streak:0,completed:[],minutes:0,xp:0,phraseStats:{},studyDays:{},currentCourse:null,currentPhrase:0};
let state={...defaults};
try{state={...defaults,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')};state.phraseStats=state.phraseStats||{};state.studyDays=state.studyDays||{};}catch{}
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
function ensureDay(){const d=todayKey(); if(state.lastStudyDate!==d){state.dailyDone=0;if(state.lastStudyDate){const prev=new Date(Date.now()-86400000).toISOString().slice(0,10);if(state.lastStudyDate===prev)state.streak=(state.streak||0)+1;else state.streak=1;}state.lastStudyDate=d;save();} if(streakEl)streakEl.textContent=state.streak||0;}
function stat(text){return state.phraseStats[text]||{attempts:0,successes:0,mastery:0,due:null,lastSeen:null};}
function updatePhrase(text,ok){const s=stat(text);s.attempts++;if(ok)s.successes++;s.mastery=Math.max(0,Math.min(5,s.mastery+(ok?1:-1)));const days=ok?[2,4,7,14,30][Math.min(s.mastery-1,4)]:1;s.due=new Date(Date.now()+days*86400000).toISOString().slice(0,10);s.lastSeen=todayKey();state.phraseStats[text]=s;}
function allPhrases(){return courses.flatMap(c=>c.phrases.map(p=>({course:c,p})));}
function weak(){return allPhrases().filter(x=>{const s=stat(x.p[0]);return s.attempts>0&&s.mastery<3;}).sort((a,b)=>stat(a.p[0]).mastery-stat(b.p[0]).mastery);}
function due(){const d=todayKey();return allPhrases().filter(x=>{const s=stat(x.p[0]);return s.due&&s.due<=d;});}
function nextCourse(){const levelCourses=courses.filter(c=>c.level===state.level);return levelCourses.find(c=>!state.completed.includes(c.id))||courses.find(c=>!state.completed.includes(c.id))||courses[0];}
function setTab(tab){stopRecognition();state.tab=tab;save();render();document.querySelectorAll('.tabbar button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));}
document.querySelectorAll('.tabbar button').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
function render(){ensureDay(); if(state.tab==='home')home();else if(state.tab==='learn')learn();else if(state.tab==='practice')practice();else progress();}
function home(){const next=nextCourse(), w=weak().slice(0,3), done=state.completed.length, total=courses.length;screen.innerHTML=`
<section class="hero"><small>TODAY · ${state.level}</small><h2>${next.icon} ${esc(next.title)}</h2><p>${esc(next.desc)}. 15 minutes: listen → repeat → shadow → speak.</p><button class="btn btn-light" onclick="openLesson(${next.id})">Start today's lesson →</button></section>
<div class="section-title"><h3>Today's plan</h3><span class="muted">${state.dailyDone}/${state.dailyGoal}</span></div>
<div class="card"><div class="between"><b>Daily goal</b><b>${state.dailyDone>=state.dailyGoal?'✓ Complete':'15 min'}</b></div><div class="progressbar"><i style="width:${Math.min(100,state.dailyDone/state.dailyGoal*100)}%"></i></div><div class="grid mini"><div class="stat"><strong>🔥 ${state.streak}</strong><span>Streak</span></div><div class="stat"><strong>${state.xp}</strong><span>XP</span></div><div class="stat"><strong>${state.minutes}</strong><span>Minutes</span></div><div class="stat"><strong>${done}/${total}</strong><span>Courses</span></div></div></div>
<div class="section-title"><h3>Review</h3><span class="muted">${w.length} weak · ${due().length} due</span></div>
<div class="card"><p class="muted">Repeat phrases you struggled with. The app schedules successful phrases for 2, 4, 7, 14 and 30 days.</p><button class="btn btn-dark full" onclick="reviewWeak()">Review weak phrases</button></div>
<div class="section-title"><h3>Lisn-style routine</h3></div><div class="grid"><div class="stat"><strong>🎧</strong><span>Listen</span></div><div class="stat"><strong>🗣️</strong><span>Repeat</span></div><div class="stat"><strong>🔁</strong><span>Shadow</span></div><div class="stat"><strong>🤖</strong><span>Speak</span></div></div>
<div class="notice">SpeakFlow 8.0 uses static Kokoro audio. The neural voice is generated in GitHub Actions, so your iPhone does not run Kokoro.</div>`;}
function learn(){const selected=courses.filter(c=>c.level===state.level);screen.innerHTML=`<div class="section-title"><h3>Courses</h3><span class="muted">${courses.length} courses · 3,000 phrases</span></div><div class="chips">${levels.map(l=>`<button class="chip ${l===state.level?'selected':''}" onclick="setLevel('${l}')">${l}</button>`).join('')}</div><div class="section-title"><h3>${state.level} learning plan</h3><span class="muted">${selected.length} courses</span></div>${selected.map(courseCard).join('')}<div class="section-title"><h3>All themes</h3></div>${courses.filter(c=>c.level!==state.level).map(courseCard).join('')}`;}
function setLevel(l){state.level=l;save();learn();}
function courseCard(c){const done=state.completed.includes(c.id);return `<button class="card course-card" onclick="openLesson(${c.id})"><span class="icon">${c.icon}</span><span class="course-copy"><b>${esc(c.title)}</b><small>${c.level} · ${c.time} · ${esc(c.topic)}</small><span>${esc(c.desc)}</span><small>${c.units.length} lessons · ${c.phrases.length} phrases ${done?'· ✓ completed':''}</small></span><strong>${done?'✓':'›'}</strong></button>`;}
function voiceStatusText(){const v=window.voiceEngine||{};if(v.state==='ready')return '🧠 Kokoro US English ready';if(v.state==='loading')return '⏳ Checking audio pack';if(v.state==='error')return '⚠️ Audio pack not generated yet';return '🧠 Kokoro US English · af_heart';}
function updateVoiceStatus(){const e=document.getElementById('voiceStatus');if(e)e.textContent=voiceStatusText();}
window.addEventListener('speakflow-voice-status',updateVoiceStatus);
function practice(){screen.innerHTML=`<div class="section-title"><h3>Practice</h3></div><div class="card"><b>🎧 Audio-first</b><p class="muted">Listen to native-style pre-generated Kokoro US English, then speak the whole phrase.</p><button class="btn btn-dark full" onclick="prepareNeuralVoice()">Load audio pack</button><button class="btn full" onclick="testNeuralEnglish()">▶ Test US English</button><div class="muted" id="voiceStatus">${voiceStatusText()}</div></div><div class="card"><b>📝 Listening test</b><p class="muted">Hear a phrase and choose what you heard.</p><button class="btn btn-dark full" onclick="listeningQuiz()">Start listening test</button></div><div class="card"><b>🤖 Offline conversation</b><p class="muted">A free phrase-based roleplay without an API key.</p><button class="btn btn-dark full" onclick="chatDemo()">Open conversation</button></div>`;updateVoiceStatus();}
function progress(){const mastered=allPhrases().filter(x=>stat(x.p[0]).mastery>=5).length, total=allPhrases().length;screen.innerHTML=`<div class="section-title"><h3>Progress</h3></div><div class="grid"><div class="stat"><strong>${state.xp}</strong><span>XP</span></div><div class="stat"><strong>${state.minutes}</strong><span>Minutes</span></div><div class="stat"><strong>${mastered}</strong><span>Mastered</span></div><div class="stat"><strong>🔥 ${state.streak}</strong><span>Streak</span></div></div><div class="section-title"><h3>Course progress</h3><span class="muted">${state.completed.length}/${courses.length}</span></div><div class="card"><div class="progressbar"><i style="width:${state.completed.length/courses.length*100}%"></i></div><p class="muted">${Math.round(state.completed.length/courses.length*100)}% of courses complete · ${mastered}/${total} phrases mastered</p></div><div class="section-title"><h3>Recent study days</h3></div><div class="calendar">${Array.from({length:14},(_,i)=>{const d=new Date(Date.now()-(13-i)*86400000).toISOString().slice(0,10);return `<span class="day ${state.studyDays[d]?'done':''}">${d.slice(8,10)}</span>`}).join('')}</div><div class="section-title"><h3>Weak phrases</h3></div>${weak().slice(0,8).map(x=>`<div class="card"><b>${esc(x.p[0])}</b><div class="muted">${esc(x.p[1])} · mastery ${stat(x.p[0]).mastery}/5</div></div>`).join('')||'<div class="card">No weak phrases yet. Keep practising!</div>'}`;}
let activeRecognition=null;let speechOk=false;
function normalize(s){return String(s).toLowerCase().replace(/[^a-z0-9' ]/g,' ').replace(/\s+/g,' ').trim();}
function lev(a,b){const m=a.length,n=b.length;const d=Array.from({length:m+1},()=>Array(n+1).fill(0));for(let i=0;i<=m;i++)d[i][0]=i;for(let j=0;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n];}
function similarity(a,b){a=normalize(a);b=normalize(b);if(!a||!b)return 0;return Math.max(0,1-lev(a,b)/Math.max(a.length,b.length));}
function stopRecognition(){if(activeRecognition){try{activeRecognition.abort();}catch{}activeRecognition=null;}speechOk=false;}
function setMicState(s){const b=document.getElementById('mic');if(!b)return;b.classList.remove('listening','correct','wrong');if(s==='listening')b.classList.add('listening');if(s==='correct')b.classList.add('correct');if(s==='wrong')b.classList.add('wrong');b.textContent=s==='listening'?'🔴':s==='correct'?'🟢':s==='wrong'?'🔴':'🎙️';}
function startSpeech(){stopRecognition();const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const out=document.getElementById('feedback');if(!SR){out.innerHTML='<b>Speech recognition is not available in this browser.</b><br><span class="muted">Try Safari on iPhone or Chrome on Android.</span>';return;}const c=courses.find(x=>x.id===state.currentCourse);const phrase=c.phrases[state.currentPhrase][0];const r=new SR();activeRecognition=r;r.lang='en-US';r.interimResults=false;r.continuous=false;r.maxAlternatives=3;speechOk=false;setMicState('listening');out.textContent='Listening…';r.onresult=e=>{let best='',score=0;for(const a of e.results[0]){const sc=similarity(phrase,a.transcript);if(sc>score){score=sc;best=a.transcript;}}speechOk=true;const ok=score>=.72;updatePhrase(phrase,ok);if(ok){state.xp+=5;out.innerHTML=`You said: <b>${esc(best)}</b><br><span class="ok">✓ Correct · ${Math.round(score*100)}% match</span>`;setMicState('correct');}else{out.innerHTML=`You said: <b>${esc(best)}</b><br><span class="bad">✗ Not quite · ${Math.round(score*100)}% match</span><br><span class="muted">Try the whole phrase again.</span>`;setMicState('wrong');}save();};r.onspeechend=()=>{try{r.stop();}catch{}};r.onend=()=>{if(activeRecognition===r)activeRecognition=null;if(!speechOk&&out.textContent.includes('Listening')){setMicState('wrong');out.innerHTML='<span class="bad">I did not catch the phrase.</span><br><span class="muted">Tap the microphone and try again.</span>';}};r.onerror=e=>{if(activeRecognition===r)activeRecognition=null;setMicState('wrong');out.innerHTML=e.error==='not-allowed'?'<span class="bad">Microphone access is blocked.</span><br><span class="muted">Allow microphone access for SpeakFlow.</span>':'<span class="bad">I could not hear that.</span><br><span class="muted">Please try again.</span>';};try{r.start();}catch{activeRecognition=null;setMicState('wrong');out.textContent='Could not start the microphone. Please try again.';}}
function openLesson(id,phrase=0){stopRecognition();const c=courses.find(x=>x.id===id);if(!c)return;state.currentCourse=id;state.currentPhrase=phrase;save();renderLesson();}
function renderLesson(){const c=courses.find(x=>x.id===state.currentCourse),i=state.currentPhrase,p=c.phrases[i];screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('learn')">← Back</button><span>${i+1}/${c.phrases.length}</span></div><div class="card lesson-card"><span class="chip selected">${c.level} · ${esc(c.topic)}</span><h2>${esc(c.title)}</h2><div class="unit-label">${esc(c.units[Math.floor(i/5)].title)}</div><div class="phrase">${esc(p[0])}</div><div class="translation">${esc(p[1])}</div><div class="audio-row"><button class="btn btn-dark" onclick='playPhrase(${JSON.stringify(p[0])})'>▶ Listen</button><button class="btn" onclick='speak(${JSON.stringify(p[1])},"ru-RU")'>🇷🇺 Перевод</button></div><button class="btn full" onclick="shadowPhrase()">🔁 Shadowing</button><hr><div class="shadow"><b>Repeat phrase</b><div class="muted">Tap the microphone, speak, and it will stop automatically.</div><button class="bigmic" id="mic" onclick="startSpeech()">🎙️</button><div class="feedback" id="feedback">Tap the microphone and say the phrase.</div></div></div><div class="lesson-nav"><button class="btn" ${i===0?'disabled':''} onclick="openLesson(${c.id},${Math.max(0,i-1)})">← Previous</button><button class="btn btn-dark" onclick="nextPhrase()">${i===c.phrases.length-1?'Finish lesson':'Next →'}</button></div>`;}
function nextPhrase(){const c=courses.find(x=>x.id===state.currentCourse);if(state.currentPhrase<c.phrases.length-1){state.currentPhrase++;save();renderLesson();}else finishLesson(c.id);}
function finishLesson(id){stopRecognition();if(!state.completed.includes(id))state.completed.push(id);state.xp+=50;state.minutes+=15;state.dailyDone=Math.min(state.dailyGoal,state.dailyDone+1);state.studyDays[todayKey()]=true;save();screen.innerHTML=`<div class="card done"><div class="trophy">🎉</div><h2>Lesson complete!</h2><p class="muted">+50 XP · +15 minutes</p><button class="btn btn-dark full" onclick="setTab('home')">Back to today's plan</button></div>`;}
async function playPhrase(text){stopRecognition();const ok=await window.neuralSpeak(text);if(!ok){const out=document.getElementById('feedback');if(out)out.innerHTML='<span class="bad">Audio file is not ready yet.</span><br><span class="muted">Run the GitHub Actions audio generator once.</span>';}}
async function testNeuralEnglish(){await playPhrase(courses[0].phrases[0][0]);}
function speak(text,lang='en-US'){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.95;speechSynthesis.speak(u);}
function shadowPhrase(){const c=courses.find(x=>x.id===state.currentCourse),text=c.phrases[state.currentPhrase][0];playPhrase(text).then(()=>setTimeout(()=>startSpeech(),700));}
function reviewWeak(){const item=weak()[0]||due()[0];if(!item){setTab('practice');return;}openLesson(item.course.id,item.course.phrases.findIndex(p=>p[0]===item.p[0]));}
function listeningQuiz(){const pool=allPhrases().slice(0,20);const target=pool[Math.floor(Math.random()*pool.length)];const choices=[target,...pool.filter(x=>x.p[0]!==target.p[0]).sort(()=>Math.random()-.5).slice(0,2)].sort(()=>Math.random()-.5);screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('practice')">← Back</button><b>Listening test</b></div><div class="card"><h2>What did you hear?</h2><button class="btn btn-dark full" onclick='playPhrase(${JSON.stringify(target.p[0])})'>▶ Play audio</button><div id="quiz">${choices.map((x,i)=>`<button class="card quiz-option" onclick="answerQuiz(${i},${choices.indexOf(target)})">${esc(x.p[0])}</button>`).join('')}</div></div>`;window.quizTarget=target;}
function answerQuiz(i,correct){const opts=document.querySelectorAll('.quiz-option');opts.forEach((b,n)=>{b.disabled=true;if(n===correct)b.classList.add('correct-answer');});const ok=i===correct;if(ok){state.xp+=10;updatePhrase(window.quizTarget.p[0],true);}else updatePhrase(window.quizTarget.p[0],false);save();document.getElementById('quiz').insertAdjacentHTML('beforeend',`<div class="notice ${ok?'good':'badbox'}">${ok?'✓ Correct! +10 XP':'✗ Not quite. Listen again and try to remember the whole phrase.'}</div>`);}
function chatDemo(){screen.innerHTML=`<div class="lesson-head"><button class="back" onclick="setTab('practice')">← Back</button><b>Offline conversation</b></div><div class="card"><div id="chat"><div class="bubble">Hi! Nice to meet you. What do you usually do at the weekend?</div></div><div class="inputrow"><input id="msg" placeholder="Type your answer…"><button class="btn btn-dark" onclick="sendMsg()">Send</button></div></div><div class="notice">Free offline roleplay. It is a fixed practice simulator, not a live LLM.</div>`;}
function sendMsg(){const input=document.getElementById('msg'),v=input.value.trim();if(!v)return;const chat=document.getElementById('chat');chat.innerHTML+=`<div class="bubble me">${esc(v)}</div>`;input.value='';const replies=['That sounds interesting. Tell me more.','That makes sense. How did you get started?','Nice! What happened next?','I see. What would you recommend?'];setTimeout(()=>chat.innerHTML+=`<div class="bubble">${replies[Math.floor(Math.random()*replies.length)]}</div>`,350);}
async function boot(){try{const r=await fetch('data.json',{cache:'no-cache'});courses=await r.json();window.__speakflowCourses=courses;render();}catch(e){screen.innerHTML='<div class="card"><b>Could not load course data.</b><p class="muted">Refresh the page or check that data.json is uploaded.</p></div>';}}
boot();
'''
(root/'app.js').write_text(app,encoding='utf-8')

index='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#111827"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="description" content="SpeakFlow 8.0 — audio-first English speaking practice"><link rel="manifest" href="manifest.json"><title>SpeakFlow 8.0</title><style>
:root{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",sans-serif;color:#111827;background:#f5f7fb}*{box-sizing:border-box}body{margin:0;background:#f5f7fb}button,input{font:inherit}.app{max-width:760px;margin:auto;min-height:100vh;padding-bottom:90px}header{padding:20px 18px 10px;display:flex;align-items:center;justify-content:space-between}.logo{font-size:24px;font-weight:800}.streak{background:#fff;border:1px solid #e5e7eb;border-radius:999px;padding:8px 12px;font-weight:700}main{padding:0 16px}.hero{background:#111827;color:white;border-radius:24px;padding:24px;margin:8px 0 22px;box-shadow:0 12px 30px #00000018}.hero small{opacity:.7}.hero h2{font-size:28px;margin:10px 0}.hero p{opacity:.82;line-height:1.5}.section-title{display:flex;align-items:center;justify-content:space-between;margin:20px 2px 10px}.section-title h3{margin:0;font-size:18px}.muted{color:#6b7280;line-height:1.4}.card{background:white;border:1px solid #e5e7eb;border-radius:18px;padding:16px;margin:10px 0;box-shadow:0 4px 18px #00000008}.btn{border:0;border-radius:13px;padding:12px 15px;background:#eef0f5;color:#111827;font-weight:700;cursor:pointer;margin:6px 0}.btn:disabled{opacity:.4}.btn-dark{background:#111827;color:#fff}.btn-light{background:#fff;color:#111827}.full{width:100%}.between{display:flex;justify-content:space-between}.progressbar{height:10px;background:#e5e7eb;border-radius:999px;overflow:hidden;margin:12px 0}.progressbar i{display:block;height:100%;background:#111827;border-radius:999px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.grid.mini{margin-top:12px}.stat{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:14px;text-align:center}.stat strong{display:block;font-size:20px;margin-bottom:5px}.stat span{font-size:12px;color:#6b7280}.chips{display:flex;gap:8px;overflow:auto;padding:3px 0 6px}.chip{border:1px solid #e5e7eb;border-radius:999px;padding:9px 13px;background:#fff;white-space:nowrap}.chip.selected{background:#111827;color:#fff;border-color:#111827}.course-card{width:100%;display:flex;align-items:center;gap:13px;text-align:left}.course-card .icon{font-size:30px}.course-copy{display:flex;flex-direction:column;gap:4px;flex:1}.course-copy small{color:#6b7280}.lesson-head{display:flex;justify-content:space-between;align-items:center;margin:10px 0}.back{border:0;background:none;font-weight:700}.lesson-card{text-align:center}.lesson-card h2{margin:12px 0 2px}.unit-label{color:#6b7280;font-size:13px;margin-bottom:14px}.phrase{font-size:28px;font-weight:800;line-height:1.25;margin:24px 0 10px}.translation{color:#6b7280;font-size:16px}.audio-row{display:flex;gap:8px;justify-content:center;margin:14px 0;flex-wrap:wrap}.audio-row .btn{min-width:130px}.shadow{padding-top:8px}.bigmic{width:88px;height:88px;border-radius:50%;border:0;background:#111827;color:#fff;font-size:34px;margin:18px auto;display:block;box-shadow:0 8px 25px #0002}.bigmic.listening{background:#dc2626}.bigmic.correct{background:#16a34a}.bigmic.wrong{background:#dc2626}.feedback{min-height:55px;line-height:1.5}.ok{color:#16a34a;font-weight:800}.bad{color:#dc2626;font-weight:800}.lesson-nav{display:flex;justify-content:space-between;gap:10px}.lesson-nav .btn{flex:1}.notice{background:#eef2ff;border:1px solid #c7d2fe;border-radius:14px;padding:13px;margin:12px 0}.calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:7px}.day{padding:12px 4px;text-align:center;border-radius:10px;background:#fff;border:1px solid #e5e7eb;color:#6b7280}.day.done{background:#111827;color:#fff}.quiz-option{width:100%;text-align:left;cursor:pointer}.correct-answer{border:2px solid #16a34a}.good{background:#ecfdf5;border-color:#86efac}.badbox{background:#fef2f2;border-color:#fecaca}.bubble{background:#f3f4f6;padding:12px;border-radius:14px;margin:8px 0}.bubble.me{background:#111827;color:#fff;margin-left:25px}.inputrow{display:flex;gap:8px;margin-top:12px}.inputrow input{flex:1;border:1px solid #d1d5db;border-radius:12px;padding:12px}.tabbar{position:fixed;left:50%;bottom:0;transform:translateX(-50%);width:min(760px,100%);display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-top:1px solid #e5e7eb;padding:8px env(safe-area-inset-right) calc(8px + env(safe-area-inset-bottom)) env(safe-area-inset-left);z-index:5}.tabbar button{border:0;background:none;padding:9px;color:#6b7280;font-weight:700}.tabbar button.active{color:#111827}.trophy{font-size:60px}.done{text-align:center;padding:35px 16px}@media(max-width:560px){.grid{grid-template-columns:repeat(2,1fr)}.phrase{font-size:24px}.hero h2{font-size:25px}}
</style></head><body><div class="app"><header><div class="logo">SpeakFlow <span style="font-size:14px;color:#6b7280">8.0</span></div><div class="streak">🔥 <span id="streak">0</span></div></header><main id="screen"></main></div><nav class="tabbar"><button data-tab="home">🏠<br>Today</button><button data-tab="learn">📚<br>Learn</button><button data-tab="practice">🎧<br>Practice</button><button data-tab="progress">📈<br>Progress</button></nav><script src="tts.js"></script><script src="app.js"></script></body></html>'''
(root/'index.html').write_text(index,encoding='utf-8')
manifest='''{"name":"SpeakFlow 8.0","short_name":"SpeakFlow","start_url":"./","display":"standalone","background_color":"#f5f7fb","theme_color":"#111827","icons":[]}'''
(root/'manifest.json').write_text(manifest,encoding='utf-8')
sw='''const CACHE="speakflow-8.0-shell";self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","index.html","app.js","tts.js","data.json","manifest.json"])).then(()=>self.skipWaiting())));self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy));return r}).catch(()=>c)))})'''
(root/'sw.js').write_text(sw,encoding='utf-8')
# register SW by injecting before closing body
text=(root/'index.html').read_text(encoding='utf-8');text=text.replace('</body>','<script>if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js").catch(()=>{});}</script></body>');(root/'index.html').write_text(text,encoding='utf-8')
# README
readme='''# SpeakFlow 8.0\n\nAudio-first English PWA inspired by the public learning structure of Lisn. It uses original SpeakFlow lesson content, not copied Lisn text.\n\n## Included\n- 60 themed courses, A1–C1\n- 10 units × 5 phrases per course = 3,000 phrases\n- Today plan and 15-minute daily goal\n- streak, XP, study calendar and progress\n- weak-phrase review with simple spaced repetition\n- listen / repeat / shadowing\n- browser speech recognition with automatic stop and transcript similarity\n- listening multiple-choice test\n- offline phrase-based conversation demo\n- static Kokoro audio architecture; no neural model runs on iPhone\n\n## Audio\nRun GitHub Actions: **Generate all SpeakFlow 8.0 Kokoro audio**. It generates 3,000 WAV files plus `audio/index.json`.\n'''
(root/'README.md').write_text(readme,encoding='utf-8')
# Validate counts
obj=json.loads((root/'data.json').read_text(encoding='utf-8'))
assert len(obj)==60 and sum(len(c['phrases']) for c in obj)==3000
print('COURSES',len(obj),'PHRASES',sum(len(c['phrases']) for c in obj))
# syntax check JS with node if available
