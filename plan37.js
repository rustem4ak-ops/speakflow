(function(){
  var KEY="sf37plan";
  var THEMES=["Все темы","Travel","Food","Shopping","Home","Work","Study","Health","City","Friends","Technology","Communication","Money","Weather","Family","Transport","Social","Problems","Plans","Nature","Professional"];
  var LEVELS=["A1","A2","B1","B2","C1"];

  function cfg(){
    try{
      var x=JSON.parse(localStorage.getItem(KEY)||"{}");
      return {level:x.level||store.level||"A1",theme:x.theme||"Все темы"};
    }catch(e){return {level:store.level||"A1",theme:"Все темы"}}
  }
  function saveCfg(c){localStorage.setItem(KEY,JSON.stringify(c));}
  function esc37(x){return esc(String(x))}
  function q37(x){return JSON.stringify(String(x))}
  function allBank(){return (window.SF37_BANK||[]).slice()}
  function previousPool(){
    var out=[], seen={}, r=store.review||{};
    function add(text,theme,level){
      var x=r[text];
      if(!x || typeof x.best!=="number" || x.best>=100 || seen[text])return;
      seen[text]=1;out.push({text:text,theme:theme||"Review",level:level||store.level});
    }
    Object.keys(r).forEach(function(text){
      var legacy=(typeof COURSES!=="undefined"?COURSES:[]).find(function(c){return c.items.some(function(i){return i[0]===text})});
      var bank=allBank().find(function(p){return p.text===text});
      if(legacy)add(text,legacy.title,legacy.level);else if(bank)add(text,bank.theme,bank.level);else add(text,"Review",store.level);
    });
    return out.sort(function(a,b){
      var ra=r[a.text]||{}, rb=r[b.text]||{};
      return (ra.best||0)-(rb.best||0) || ((ra.last||0)-(rb.last||0));
    }).slice(0,15);
  }
  function weakPool(){return previousPool()}
  function newPool(c,weak){
    var blocked={}; weak.forEach(function(x){blocked[x.text]=1});
    var arr=allBank().filter(function(p){
      return p.level===c.level && !blocked[p.text] && !((store.done||[]).indexOf(p.text)>=0) &&
        (c.theme==="Все темы" || p.theme===c.theme);
    });
    arr.sort(function(){return Math.random()-.5});
    return arr.slice(0,20);
  }
  function fallbackNew(c,weak){
    var blocked={}; weak.forEach(function(x){blocked[x.text]=1});
    var arr=allBank().filter(function(p){
      return p.level===c.level && !blocked[p.text] && (c.theme==="Все темы" || p.theme===c.theme);
    });
    arr.sort(function(){return Math.random()-.5});
    return arr.slice(0,20);
  }
  function speak37(text,rate){
    if(window.AUDIO && window.AUDIO[text]){try{var a=new Audio(window.AUDIO[text]);a.playbackRate=rate||1;a.play();return}catch(e){}}
    if("speechSynthesis" in window){
      speechSynthesis.cancel();
      var u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=rate||1;speechSynthesis.speak(u);
    }
  }
  function similarity37(a,b){
    a=String(a||"").toLowerCase().replace(/[^a-z0-9' ]/g," ").split(/\s+/).filter(Boolean);
    b=String(b||"").toLowerCase().replace(/[^a-z0-9' ]/g," ").split(/\s+/).filter(Boolean);
    if(!a.length||!b.length)return 0;
    var dp=Array.from({length:a.length+1},function(){return Array(b.length+1).fill(0)});
    for(var i=0;i<=a.length;i++)dp[i][0]=i;
    for(var j=0;j<=b.length;j++)dp[0][j]=j;
    for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return Math.max(0,Math.round((1-dp[a.length][b.length]/Math.max(a.length,b.length))*100));
  }
  function review37(text,score){
    try{
      if(typeof scheduleReview==="function")scheduleReview(text,score);
      else{
        store.review=store.review||{};var r=store.review[text]||{attempts:0,best:0};
        r.attempts++;r.best=Math.max(r.best||0,score);r.last=Date.now();store.review[text]=r;save();
      }
    }catch(e){}
  }
  function themeLabel(t){return t==="Все темы"?"Рандомные темы":t}

  function today37(){
    var c=cfg(), weak=weakPool();
    var themeOptions=THEMES.map(function(t){return "<option value="+q37(t)+" "+(t===c.theme?"selected":"")+">"+esc37(themeLabel(t))+"</option>"}).join("");
    var weakHtml=weak.length
      ? weak.map(function(p,i){var b=(store.review[p.text]||{}).best||0;return "<div class='sfPlanRow'><span class='sfPlanNum'>"+(i+1)+"</span><div><b>"+esc37(p.text)+"</b><small>"+esc37(p.theme)+" · "+b+"%</small></div><span class='sfPlanBadge "+(b<70?"bad":"warn")+"'>"+b+"%</span></div>"}).join("")
      : "<div class='sfPlanEmpty'>Нет фраз с результатом ниже 100%. Сначала пойдём в новые.</div>";
    shell("<section class='hero sfPlanHero'>"+
      "<div class='eyebrow'>🧠 План на сегодня</div>"+
      "<div class='sfPlanTitleRow'><div><h1>Полноценная тренировка</h1><p>"+esc37(c.level)+" · "+esc37(themeLabel(c.theme))+"</p></div><button class='sfGear' onclick='sfPlanSettings()'>⚙️</button></div>"+
      "<div class='sfPlanPromise'>Ошибки → 20 новых фраз → мини-диалог</div>"+
      "</section>"+
      "<div class='card sfPlanCard'><div class='sfPlanHead'><span class='sfPlanIcon'>🔁</span><div><h3>1. Повторить слабые места</h3><p>"+(weak.length?weak.length+" фраз из прошлых тренировок":"Ошибок нет — этот этап пропускаем")+"</p></div></div>"+
      "<div class='sfPlanList'>"+weakHtml+"</div></div>"+
      "<div class='card sfPlanCard'><div class='sfPlanHead'><span class='sfPlanIcon'>🆕</span><div><h3>2. Новые фразы</h3><p>20 новых фраз · "+esc37(themeLabel(c.theme))+"</p></div></div><div class='sfPlanNewInfo'>Уровень <b>"+esc37(c.level)+"</b><span>⚙️ можно поменять тему</span></div></div>"+
      "<div class='card sfPlanCard'><div class='sfPlanHead'><span class='sfPlanIcon'>🗣️</span><div><h3>3. Мини-диалог</h3><p>Закрепим сегодняшние фразы в живой ситуации</p></div></div><div class='sfDialoguePreview'>5 коротких реплик · слушай → отвечай → получай подсказку</div></div>"+
      "<button class='primary sfPlanStart' onclick='sfPlanStart()'>▶ Начать обучение <span>≈ "+(weak.length+20+5)+" заданий</span></button>"+
      "<div class='sfPlanNote'>Каждый результат сохраняется. Фразы, где не получилось 100%, снова попадут в будущий план.</div>"+
      "</section>");
  }

  window.sfPlanSettings=function(){
    var c=cfg();
    var levels=LEVELS.map(function(l){return "<button class='sfSetLevel "+(l===c.level?"on":"")+"' onclick='sfSetLevel("+q37(l)+")'>"+l+"</button>"}).join("");
    var opts=THEMES.map(function(t){return "<option value="+q37(t)+" "+(t===c.theme?"selected":"")+">"+esc37(themeLabel(t))+"</option>"}).join("");
    shell("<div class='lessonTop'><button class='back' onclick=\"go('today')\">← План на сегодня</button></div>"+
      "<div class='card sfSettings'><div class='eyebrow'>⚙️ Настройки тренировки</div><h2>Что будем учить?</h2><p class='muted'>Выбери уровень и тематику. Если выбрать «Рандомные темы», новые фразы будут смешаны.</p>"+
      "<h4>Уровень</h4><div class='sfSetLevels'>"+levels+"</div><h4>Тематика</h4><select id='sfTheme37' class='sfThemeSelect' onchange='sfSetTheme(this.value)'>"+opts+"</select>"+
      "<button class='primary full' onclick=\"go('today')\">Готово</button></div>");
  };
  window.sfSetLevel=function(l){var c=cfg();c.level=l;store.level=l;saveCfg(c);save();sfPlanSettings()};
  window.sfSetTheme=function(t){var c=cfg();c.theme=t;saveCfg(c);sfPlanSettings()};

  function sessionStart(){
    var c=cfg(),w=weakPool(),n=newPool(c,w);
    if(n.length<20)n=fallbackNew(c,w);
    var d=n.slice(0,20);
    window.sfPlan={level:c.level,theme:c.theme,weak:w,newItems:d,phase:"weak",index:0,score:0,dialogueIndex:0,dialogueScore:0,phaseScores:[]};
    renderPlanStep();
  }
  window.sfPlanStart=sessionStart;

  function currentItem(){
    var z=window.sfPlan;
    return z.phase==="weak"?z.weak[z.index]:z.newItems[z.index];
  }
  function renderPlanStep(){
    var z=window.sfPlan;
    if(!z){today37();return}
    if(z.phase==="weak" && z.index>=z.weak.length){z.phase="new";z.index=0}
    if(z.phase==="new" && z.index>=z.newItems.length){z.phase="dialogue";z.index=0;renderDialogue37();return}
    if(z.phase==="done"){finishPlan37();return}
    var it=currentItem(), total=z.weak.length+z.newItems.length, done=(z.phase==="weak"?z.index:z.weak.length+z.index);
    var pct=Math.round(done/Math.max(1,total)*100), label=z.phase==="weak"?"Повторение слабых мест":"Новые фразы";
    window.sfPlanListen=function(){speak37(it.text,1)};
    window.sfPlanMic=function(){listenPlan37(it)};
    shell("<div class='lessonTop'><button class='back' onclick=\"go('today')\">✕ Выйти</button><span class='lessonCount'>"+label+" · "+(z.phase==="weak"?z.index+1:z.index+1)+" / "+(z.phase==="weak"?z.weak.length:z.newItems.length)+"</span></div>"+
      "<div class='card sfPlanLesson'><div class='sfPlanPhase'><b>"+esc37(label)+"</b><span>"+pct+"% блока</span></div><div class='miniMeter'><i style='width:"+pct+"%'></i></div>"+
      "<div class='sfPlanTheme'>"+esc37(it.theme)+" · "+esc37(it.level)+"</div><div class='sfPlanPhrase'>"+esc37(it.text)+"</div><button class='sfPlanListen' onclick='sfPlanListen()'>🔊 Послушать</button>"+
      "<button class='sfPlanMic' onclick='sfPlanMic()'>🎙️ Сказать фразу<small>Нажми и произнеси её</small></button><div id='sfPlanResult' class='sfPlanResult'>Готов? Сначала послушай, затем скажи фразу.</div></div>");
    setTimeout(function(){speak37(it.text,1)},220);
  }

  function listenPlan37(it){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){document.getElementById("sfPlanResult").innerHTML="<b>🎙️ Распознавание недоступно</b><br><small>Открой приложение в Safari/Chrome с разрешённым микрофоном.</small>";return}
    var out=document.getElementById("sfPlanResult");
    out.innerHTML="🎙️ Слушаю…";
    var r=new SR();r.lang="en-US";r.interimResults=false;r.continuous=false;r.maxAlternatives=3;
    var ended=false;
    r.onresult=function(e){
      if(ended)return;ended=true;
      var got=e.results[0][0].transcript,score=similarity37(it.text,got);
      review37(it.text,score);
      if(score>=80){try{store.xp=(store.xp||0)+2;save()}catch(x){}}
      out.innerHTML="<div class='recognizedText'>"+esc37(got)+"</div><div class='resultScore "+(score>=80?"success":"warning")+"'>"+score+"%</div><div class='feedbackLine'>"+(score>=90?"Отлично. Идём дальше.":score>=80?"Хорошо. Закрепляем и идём дальше.":"Не идеально — эта фраза останется в повторении.")+"</div><button class='secondary full' style='margin-top:8px' onclick='sfPlanRetry()'>🎙️ Повторить</button>";
      window.sfPlanRetry=function(){listenPlan37(it)};
      setTimeout(function(){if(score>=80)nextPlan37();},score>=80?800:0);
    };
    r.onerror=function(e){if(ended)return;ended=true;out.innerHTML="<b>Не удалось распознать речь.</b><br><small>"+esc37(e.error||"Попробуй ещё раз.")+"</small>";window.sfPlanRetry=function(){listenPlan37(it)}};
    r.onend=function(){};
    try{r.start()}catch(e){ended=true;out.innerHTML="<b>Нажми ещё раз</b><br><small>Браузер не запустил микрофон с первого раза.</small>"} 
  }
  function nextPlan37(){var z=window.sfPlan;if(!z)return;z.index++;renderPlanStep()}
  
  var dialogPrompts={
    Travel:["You are at a hotel or airport. Ask for help.","You have a small problem during your trip. Explain it.","Ask about a ticket, booking, or direction.","The other person asks for more details.","Finish the conversation politely."],
    Food:["You are in a restaurant. Start by asking for something.","Ask a question about the food or menu.","Order something and make a preference clear.","Ask for the bill or another service.","Thank the person and finish."],
    Shopping:["You are in a shop. Ask for help.","Ask about price, size, or availability.","Explain what you want to buy.","Ask about payment, return, or delivery.","Finish the purchase politely."],
    Work:["You are in a work meeting. Start the discussion.","Ask for an update or explanation.","Give your opinion about the topic.","Suggest a practical next step.","Finish the meeting politely."],
    Home:["You are discussing a home or apartment.","Explain a small problem.","Ask for help or information.","Discuss a possible solution.","Finish the conversation politely."],
    Friends:["You meet a friend. Start a casual conversation.","Ask about plans or the weekend.","Suggest an activity.","React to your friend's answer.","Say goodbye naturally."],
    Health:["You are making a simple appointment.","Explain what you need.","Answer a follow-up question.","Ask what you should do next.","Thank the person."],
    City:["You are asking someone about the city.","Ask for directions.","Ask about transport or time.","Clarify the answer.","Thank the person and finish."],
    Communication:["Start a short conversation.","Ask for an explanation.","Give your opinion.","Ask a follow-up question.","Summarize what you understood."],
    Problems:["Explain a problem.","Give one detail about it.","Ask for a solution.","Respond to a possible solution.","Finish politely."],
    Plans:["Talk about a plan.","Ask about timing.","Suggest a change.","Agree on the next step.","Finish the conversation."],
    Professional:["Start a professional conversation.","Ask for an update.","Explain your view.","Discuss the next step.","Close the conversation."],
    default:["Start a short real-life conversation.","Ask for more information.","Give your opinion or explain your situation.","Respond to the other person.","Finish the conversation naturally."]
  };
  function dialoguePool(z){
    var a=z.newItems.slice();if(!a.length)a=z.weak.slice();a.sort(function(){return Math.random()-.5});return a.slice(0,5);
  }
  function renderDialogue37(){
    var z=window.sfPlan;
    if(!z.dialogueItems)z.dialogueItems=dialoguePool(z);
    if(z.dialogueIndex>=5){z.phase="done";finishPlan37();return}
    var it=z.dialogueItems[z.dialogueIndex],theme=z.theme==="Все темы"?it.theme:z.theme;
    var arr=dialogPrompts[theme]||dialogPrompts.default;
    var prompt=arr[z.dialogueIndex]||arr[0];
    window.sfDialogueListen=function(){speak37(prompt,0.95)};
    window.sfDialogueMic=function(){listenDialogue37(it,prompt)};
    shell("<div class='lessonTop'><button class='back' onclick=\"go('today')\">✕ Выйти</button><span class='lessonCount'>Диалог · "+(z.dialogueIndex+1)+" / 5</span></div>"+
      "<div class='card sfDialogueCard'><div class='sfPlanPhase'><b>🗣️ Мини-диалог</b><span>закрепляем фразы</span></div><div class='miniMeter'><i style='width:"+(z.dialogueIndex/5*100)+"%'></i></div>"+
      "<div class='sfDialogueRole'>Ситуация · "+esc37(theme)+"</div><div class='sfDialoguePrompt'>"+esc37(prompt)+"</div><button class='sfPlanListen' onclick='sfDialogueListen()'>🔊 Послушать ситуацию</button>"+
      "<div class='sfDialogueTarget'>💡 Попробуй использовать:<b>"+esc37(it.text)+"</b></div>"+
      "<button class='sfPlanMic' onclick='sfDialogueMic()'>🎙️ Ответить</button><div id='sfDialogueResult' class='sfPlanResult'>Говори своими словами — главное, используй изученную фразу.</div></div>");
    setTimeout(function(){speak37(prompt,0.95)},220);
  }
  function listenDialogue37(it,prompt){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    var out=document.getElementById("sfDialogueResult");
    if(!SR){out.innerHTML="<b>Распознавание недоступно.</b>";return}
    out.innerHTML="🎙️ Слушаю…";var r=new SR();r.lang="en-US";r.interimResults=false;r.continuous=false;r.maxAlternatives=3;var ended=false;
    r.onresult=function(e){
      if(ended)return;ended=true;
      var got=e.results[0][0].transcript,score=similarity37(it.text,got);review37(it.text,score);
      zScore(score);
      out.innerHTML="<div class='recognizedText'>"+esc37(got)+"</div><div class='resultScore "+(score>=80?"success":"warning")+"'>"+score+"%</div><div class='feedbackLine'>"+(score>=80?"Отлично — фраза вошла в диалог.":"Попробуй ещё раз или перефразируй, используя целевую фразу.")+"</div><button class='secondary full' style='margin-top:8px' onclick='sfDialogueRetry()'>🎙️ Повторить</button>";
      window.sfDialogueRetry=function(){listenDialogue37(it,prompt)};
      if(score>=80)setTimeout(function(){window.sfPlan.dialogueIndex++;renderDialogue37()},900);
    };
    r.onerror=function(e){if(ended)return;ended=true;out.innerHTML="<b>Не услышал.</b><br><small>"+esc37(e.error||"Попробуй ещё раз.")+"</small>";window.sfDialogueRetry=function(){listenDialogue37(it,prompt)}};
    try{r.start()}catch(e){ended=true;out.innerHTML="<b>Нажми ещё раз</b>"} 
  }
  function zScore(s){var z=window.sfPlan;z.dialogueScore+=s}
  function finishPlan37(){
    var z=window.sfPlan||{},total=z.weak.length+z.newItems.length+5;
    var avg=0;
    var rr=Object.values(store.review||{}).filter(function(x){return x.last&&typeof x.best==="number"});
    if(rr.length)avg=Math.round(rr.reduce(function(a,x){return a+x.best},0)/rr.length);
    var xp=0;
    if(z.dialogueScore>=400)xp+=10;
    if(z.newItems.length>=20)xp+=10;
    store.xp=(store.xp||0)+xp;save();
    shell("<section class='hero sfPlanFinish'><div class='eyebrow'>🎉 Тренировка завершена</div><h1>Отличная работа</h1><p>Ты прошёл весь сегодняшний маршрут: слабые места → новые фразы → диалог.</p><div class='sfFinishStats'><div><b>"+z.weak.length+"</b><span>повторено</span></div><div><b>"+z.newItems.length+"</b><span>новых</span></div><div><b>"+(z.dialogueItems?z.dialogueItems.length:5)+"</b><span>в диалоге</span></div></div><div class='card'><h3>Что дальше?</h3><p class='muted'>Фразы ниже 100% автоматически остаются в базе повторения.</p><button class='primary full' onclick='sfPlanStart()'>🔁 Новая тренировка</button><button class='secondary full' onclick="go('profile')">📊 Посмотреть прогресс</button></div></section>");
    window.sfPlan=null;
  }
  window.go=window.go||function(x){page=x;today37()};
  window.today=today37;
  try{if(page==="today"||!page)today37()}catch(e){console.error(e)}
})();