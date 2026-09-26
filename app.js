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
{id:1,level:"A1",title:"Travel & everyday basics",icon:"✈️",goal:"travel",desc:"Базовые фразы для поездок и обычных ситуаций.",items:[
["Could I see your passport, please?","Могу я посмотреть ваш паспорт, пожалуйста?"],["What time does boarding start?","Во сколько начинается посадка?"],["Could you help me, please?","Не могли бы вы мне помочь, пожалуйста?"],["Where is the nearest station?","Где ближайшая станция?"],["How much is a ticket to the city centre?","Сколько стоит билет до центра города?"],["I'd like a window seat, please.","Я бы хотел место у окна, пожалуйста."],["Where can I find the taxi stand?","Где я могу найти стоянку такси?"],["Could you speak more slowly, please?","Не могли бы вы говорить помедленнее?"],["I don't understand. Could you repeat that?","Я не понимаю. Не могли бы вы повторить?"],["What time does the shop open?","Во сколько открывается магазин?"],["Can I pay by card?","Можно оплатить картой?"],["I'm looking for this address.","Я ищу этот адрес."]]},
{id:2,level:"A2",title:"Restaurant, shopping & city",icon:"🍽️",goal:"daily",desc:"Уверенно общаемся в кафе, магазинах и городе.",items:[
["Could I have a table for two?","Можно столик на двоих?"],["What do you recommend?","Что вы рекомендуете?"],["How much does this cost?","Сколько это стоит?"],["I'd like a coffee with milk, please.","Я бы хотел кофе с молоком, пожалуйста."],["Could I have the bill, please?","Можно счёт, пожалуйста?"],["Do you have this in a different size?","У вас есть это в другом размере?"],["I'm just looking, thank you.","Я просто смотрю, спасибо."],["Could I try this on?","Можно это примерить?"],["Where are the changing rooms?","Где примерочные?"],["Is there a pharmacy nearby?","Здесь рядом есть аптека?"],["Could you show me on the map?","Можете показать мне на карте?"],["I'd like to order this to go.","Я хотел бы взять это с собой."]]},
{id:3,level:"B1",title:"Everyday conversation",icon:"💬",goal:"conversation",desc:"Говорим о себе, планах, людях и повседневной жизни.",items:[
["How is your day going?","Как проходит ваш день?"],["What do you do for work?","Кем вы работаете?"],["Could we move the meeting to tomorrow?","Можем перенести встречу на завтра?"],["What have you been up to lately?","Чем ты занимался в последнее время?"],["What do you usually do at weekends?","Что ты обычно делаешь по выходным?"],["I'm thinking about changing my routine.","Я думаю изменить свой распорядок."],["That sounds like a good idea.","Звучит как хорошая идея."],["I'm not sure yet, but I'll let you know.","Я пока не уверен, но дам тебе знать."],["How long have you lived here?","Как давно ты здесь живёшь?"],["What was the best part of your week?","Что было лучшим за твою неделю?"],["I'd rather stay home tonight.","Я бы предпочёл сегодня остаться дома."],["Let's keep in touch.","Давай будем на связи."]]},
{id:4,level:"B2",title:"Work, study & meetings",icon:"💼",goal:"work",desc:"Рабочие встречи, планы, задачи и аргументы.",items:[
["I would like to discuss my study plan with you.","Я хотел бы обсудить с вами мой учебный план."],["From my perspective, the main issue is the lack of clear priorities.","С моей точки зрения, главная проблема — отсутствие чётких приоритетов."],["Could we go over the main points again?","Можем ещё раз пройтись по основным пунктам?"],["I think we should focus on the most urgent tasks first.","Думаю, нам стоит сначала сосредоточиться на самых срочных задачах."],["Could you send me the details by email?","Можете прислать мне детали по электронной почте?"],["I'd like to make sure we're on the same page.","Я хочу убедиться, что мы одинаково понимаем ситуацию."],["What would be the best way to approach this?","Как лучше всего к этому подойти?"],["We may need to reconsider the timeline.","Возможно, нам нужно пересмотреть сроки."],["I'll get back to you by the end of the day.","Я свяжусь с вами до конца дня."],["Let's schedule a follow-up meeting next week.","Давайте назначим следующую встречу на следующую неделю."],["I agree with the general idea, but I have one concern.","Я согласен с общей идеей, но у меня есть одно замечание."],["Could you clarify what you mean by that?","Можете уточнить, что вы имеете в виду?"]]},
{id:5,level:"C1",title:"Advanced discussion",icon:"🧠",goal:"work",desc:"Естественная аргументация, нюансы и сложные темы.",items:[
["I see your point, but I am not sure the data supports that conclusion.","Я понимаю вашу точку зрения, но не уверен, что данные подтверждают этот вывод."],["There are several factors we need to take into account.","Нам нужно учитывать несколько факторов."],["I'd argue that the long-term benefits outweigh the initial costs.","Я бы сказал, что долгосрочные преимущества перевешивают первоначальные затраты."],["That raises an important question about how we measure success.","Это поднимает важный вопрос о том, как мы измеряем успех."],["I'm open to the idea, provided that we can manage the risks.","Я открыт к этой идее при условии, что мы сможем контролировать риски."],["It's worth considering an alternative approach before making a final decision.","Стоит рассмотреть альтернативный подход перед окончательным решением."],["The evidence suggests that the situation is more complex than it appears.","Данные показывают, что ситуация сложнее, чем кажется."],["We need to distinguish between short-term pressure and long-term priorities.","Нам нужно различать краткосрочное давление и долгосрочные приоритеты."],["I wouldn't necessarily draw the same conclusion from those results.","Я бы не обязательно сделал такой же вывод из этих результатов."],["Let's look at the issue from a different perspective.","Давайте посмотрим на этот вопрос с другой точки зрения."],["There is a strong case for investing more in practical training.","Есть веские основания больше инвестировать в практическое обучение."],["Ultimately, the decision depends on what we are trying to achieve.","В конечном счёте решение зависит от того, чего мы пытаемся добиться."]]},
{id:6,level:"A1",title:"Hotel basics",icon:"🏨",goal:"travel",desc:"Заселение, номер и простые просьбы.",items:[
["I have a reservation under Rustem.","У меня бронь на имя Рустем."],["I'd like to check in, please.","Я хотел бы зарегистрироваться."],["What time is breakfast?","Во сколько завтрак?"],["Could I have the Wi-Fi password?","Можно пароль от Wi-Fi?"],["Is there a room with a better view?","Есть номер с лучшим видом?"],["Could I get another towel, please?","Можно ещё одно полотенце?"],["What time is check-out?","Во сколько выселение?"],["Could you call a taxi for me?","Не могли бы вы вызвать мне такси?"],["The air conditioning isn't working.","Кондиционер не работает."],["Could you help me with my luggage?","Не могли бы вы помочь с багажом?"]]},
{id:7,level:"A1",title:"Daily routines",icon:"🌅",goal:"daily",desc:"Утро, дом, дела и простые планы.",items:[
["I usually get up at seven.","Обычно я встаю в семь."],["I need to get ready for work.","Мне нужно собраться на работу."],["What are you doing today?","Что ты делаешь сегодня?"],["I'm going to the supermarket.","Я иду в супермаркет."],["I'll be back in an hour.","Я вернусь через час."],["I'm a little tired today.","Я сегодня немного устал."],["Let's have dinner together.","Давай поужинаем вместе."],["I need to buy some groceries.","Мне нужно купить продукты."],["What time should we leave?","Во сколько нам нужно выйти?"],["See you tomorrow morning.","Увидимся завтра утром."]]},
{id:8,level:"A1",title:"Getting around",icon:"🚌",goal:"travel",desc:"Транспорт, направления и город.",items:[
["Which bus goes to the centre?","Какой автобус идёт в центр?"],["Where can I buy a ticket?","Где можно купить билет?"],["How long does the journey take?","Сколько занимает поездка?"],["Is this the right platform?","Это правильная платформа?"],["I need to get off at the next stop.","Мне нужно выйти на следующей остановке."],["Can you show me the way?","Можете показать мне дорогу?"],["Turn left at the traffic lights.","Поверните налево на светофоре."],["It's about five minutes on foot.","Это примерно пять минут пешком."],["Is it far from here?","Это далеко отсюда?"],["I'd like to go to this address.","Я хотел бы поехать по этому адресу."]]},
{id:9,level:"A2",title:"Food & restaurants",icon:"🍴",goal:"daily",desc:"Заказ еды, предпочтения и счёт.",items:[
["Could we see the menu, please?","Можно нам меню, пожалуйста?"],["Do you have any vegetarian options?","У вас есть вегетарианские блюда?"],["I'm allergic to nuts.","У меня аллергия на орехи."],["I'd like the chicken, please.","Я бы хотел курицу, пожалуйста."],["Could I have some water?","Можно немного воды?"],["Is the service included?","Обслуживание включено?"],["Everything was delicious.","Всё было очень вкусно."],["Could we have separate bills?","Можно отдельные счета?"],["Can I get this without onions?","Можно это без лука?"],["I'd like to make a reservation for tonight.","Я хотел бы забронировать столик на сегодня."]]},
{id:10,level:"A2",title:"Shopping & services",icon:"🛍️",goal:"daily",desc:"Размеры, возврат, цены и услуги.",items:[
["Do you have a larger size?","У вас есть размер побольше?"],["Is this on sale?","На это есть скидка?"],["Can I return it if it doesn't fit?","Можно вернуть это, если не подойдёт?"],["I'd like to exchange this.","Я хотел бы обменять это."],["Where is the customer service desk?","Где стойка обслуживания клиентов?"],["Could you check the price for me?","Можете проверить цену?"],["I'll take it.","Я это возьму."],["Do you accept contactless payment?","Вы принимаете бесконтактную оплату?"],["Could I have a receipt?","Можно чек?"],["I'm looking for something cheaper.","Я ищу что-нибудь подешевле."]]},
{id:11,level:"A2",title:"Health & appointments",icon:"🩺",goal:"daily",desc:"Простые фразы для врача и записи.",items:[
["I'd like to make an appointment.","Я хотел бы записаться на приём."],["I don't feel well today.","Я сегодня плохо себя чувствую."],["I have a headache.","У меня болит голова."],["My throat hurts.","У меня болит горло."],["How long have you had these symptoms?","Как давно у вас эти симптомы?"],["Do I need a prescription?","Мне нужен рецепт?"],["Where is the nearest pharmacy?","Где ближайшая аптека?"],["I'd like to see a doctor.","Я хотел бы попасть к врачу."],["Can I change the appointment time?","Можно изменить время записи?"],["Thank you for your help.","Спасибо за вашу помощь."]]},
{id:12,level:"B1",title:"Friends & social life",icon:"🎉",goal:"conversation",desc:"Встречи, приглашения и общение.",items:[
["Do you want to grab a coffee?","Хочешь выпить кофе?"],["What are you doing this weekend?","Что ты делаешь в эти выходные?"],["Would you like to join us?","Хочешь присоединиться к нам?"],["That sounds like fun.","Звучит весело."],["I'm running a little late.","Я немного опаздываю."],["Where should we meet?","Где нам встретиться?"],["I'll text you when I arrive.","Я напишу тебе, когда приеду."],["We haven't seen each other for ages.","Мы целую вечность не виделись."],["How did you meet?","Как вы познакомились?"],["It was great talking to you.","Было приятно с тобой поговорить."]]},
{id:13,level:"B1",title:"Home & neighbourhood",icon:"🏠",goal:"daily",desc:"Дом, соседи, бытовые вопросы.",items:[
["I live near the city centre.","Я живу недалеко от центра."],["How long does it take to get there?","Сколько времени туда добираться?"],["My apartment is on the second floor.","Моя квартира на втором этаже."],["The heating isn't working.","Отопление не работает."],["Could you fix this, please?","Не могли бы вы это исправить?"],["The neighbours are very friendly.","Соседи очень дружелюбные."],["I'm looking for a place to rent.","Я ищу жильё в аренду."],["How much is the rent per month?","Сколько стоит аренда в месяц?"],["Are utilities included?","Коммунальные услуги включены?"],["When can I move in?","Когда я могу въехать?"]]},
{id:14,level:"B1",title:"Travel conversations",icon:"🧳",goal:"travel",desc:"Проблемы и разговоры во время поездки.",items:[
["My flight has been delayed.","Мой рейс задержали."],["Where can I collect my luggage?","Где я могу получить багаж?"],["My bag hasn't arrived.","Мой багаж не прибыл."],["Could you help me find my gate?","Поможете найти мои ворота?"],["I think I've lost my wallet.","Кажется, я потерял кошелёк."],["Is there a train to the airport?","Есть поезд до аэропорта?"],["How often do the buses run?","Как часто ходят автобусы?"],["I'd like to change my booking.","Я хотел бы изменить бронирование."],["What do I need to show at the border?","Что нужно предъявить на границе?"],["Could you recommend a local restaurant?","Можете посоветовать местный ресторан?"]]},
{id:15,level:"B2",title:"Meetings & communication",icon:"🤝",goal:"work",desc:"Обсуждения, решения и рабочая коммуникация.",items:[
["Let's start with the main issue.","Давайте начнём с главного вопроса."],["Could you give us a quick update?","Можете кратко рассказать о текущем статусе?"],["I'd like to hear your opinion.","Я хотел бы услышать ваше мнение."],["Let's come back to this point later.","Давайте вернёмся к этому вопросу позже."],["We need to agree on the next steps.","Нам нужно договориться о следующих шагах."],["I'll take care of it.","Я этим займусь."],["Could you clarify the deadline?","Можете уточнить крайний срок?"],["Let's make sure everyone is informed.","Давайте убедимся, что все в курсе."],["I think we're ready to move forward.","Думаю, мы готовы двигаться дальше."],["I'll send a summary after the meeting.","Я отправлю краткое резюме после встречи."]]},
{id:16,level:"B2",title:"Presentations & opinions",icon:"📊",goal:"work",desc:"Презентации, аргументы и выражение мнения.",items:[
["Let me briefly explain the situation.","Позвольте кратко объяснить ситуацию."],["There are three main points to consider.","Нужно рассмотреть три основных момента."],["As you can see from this chart,","Как вы видите на этой диаграмме,"],["I'd like to highlight one important detail.","Я хотел бы выделить одну важную деталь."],["In my opinion, we should test this first.","По моему мнению, нам стоит сначала это протестировать."],["I partly agree with you.","Я частично с вами согласен."],["That's a fair point.","Это разумное замечание."],["Could you give an example?","Можете привести пример?"],["Let me know if you have any questions.","Дайте знать, если у вас есть вопросы."],["To sum up, these are our main priorities.","Подводя итог, вот наши главные приоритеты."]]},
{id:17,level:"B2",title:"Problems & solutions",icon:"🛠️",goal:"work",desc:"Обсуждаем проблемы и ищем решения.",items:[
["We have a problem with the current system.","У нас проблема с текущей системой."],["What do you think is causing this?","Как вы думаете, что это вызывает?"],["Let's identify the main cause first.","Давайте сначала определим основную причину."],["We could try a different approach.","Мы могли бы попробовать другой подход."],["What are the risks involved?","Какие здесь есть риски?"],["This solution would save us time.","Это решение сэкономило бы нам время."],["We need a backup plan.","Нам нужен запасной план."],["How quickly can we fix it?","Как быстро мы можем это исправить?"],["Let's test it before we make a decision.","Давайте протестируем это перед принятием решения."],["I think we've found a workable solution.","Думаю, мы нашли рабочее решение."]]},
{id:18,level:"C1",title:"Nuanced conversation",icon:"🗣️",goal:"conversation",desc:"Естественные формулировки и нюансы смысла.",items:[
["I tend to agree, although there is one issue.","Я скорее согласен, хотя есть один момент."],["That's not necessarily the case.","Это не обязательно так."],["It depends on how you define success.","Это зависит от того, как вы определяете успех."],["I can see where you're coming from.","Я понимаю, почему вы так думаете."],["I'm not entirely convinced by that argument.","Я не полностью убеждён этим аргументом."],["That's a reasonable assumption, but we need evidence.","Это разумное предположение, но нам нужны доказательства."],["There may be more to the story than we realize.","Возможно, в этой истории есть больше, чем мы понимаем."],["I'd be cautious about drawing a conclusion too quickly.","Я бы не спешил делать выводы."],["We should keep an open mind.","Нам стоит сохранять открытость к разным вариантам."],["Let's consider the broader context.","Давайте рассмотрим более широкий контекст."]]},
{id:19,level:"C1",title:"Negotiation & decisions",icon:"⚖️",goal:"work",desc:"Переговоры, компромиссы и решения.",items:[
["What would you need from us to move forward?","Что вам нужно от нас, чтобы двигаться дальше?"],["Is there any room for negotiation?","Есть ли возможность для переговоров?"],["We may be able to meet you halfway.","Возможно, мы сможем найти компромисс."],["That's beyond our current budget.","Это выходит за рамки нашего текущего бюджета."],["Could we revisit the terms?","Можем пересмотреть условия?"],["I'd prefer to avoid unnecessary risks.","Я бы предпочёл избежать ненужных рисков."],["Let's see if we can find a middle ground.","Давайте посмотрим, сможем ли найти компромисс."],["I think that's a fair compromise.","Думаю, это справедливый компромисс."],["We need a little more time to consider the proposal.","Нам нужно немного больше времени, чтобы рассмотреть предложение."],["Let's agree on the key points first.","Давайте сначала договоримся по ключевым пунктам."]]},
{id:20,level:"C1",title:"Professional fluency",icon:"🚀",goal:"work",desc:"Продвинутая рабочая речь и уверенное выступление.",items:[
["I'd like to put this proposal into perspective.","Я хотел бы рассмотреть это предложение в контексте."],["The key challenge is balancing quality and efficiency.","Главная задача — сбалансировать качество и эффективность."],["We need to anticipate potential obstacles.","Нам нужно предусмотреть возможные препятствия."],["This approach is likely to have long-term consequences.","Этот подход, вероятно, будет иметь долгосрочные последствия."],["I'd suggest we revisit the assumptions behind the plan.","Я бы предложил пересмотреть предположения, лежащие в основе плана."],["We should prioritize what has the greatest impact.","Нам следует уделить приоритет тому, что имеет наибольший эффект."],["The proposal is promising, but it needs further refinement.","Предложение перспективное, но требует дальнейшей доработки."],["I'd like to challenge that assumption.","Я хотел бы поставить это предположение под сомнение."],["We need to communicate this clearly to the wider team.","Нам нужно чётко донести это до всей команды."],["Ultimately, we need to make a decision based on evidence.","В конечном счёте нам нужно принять решение на основе данных."]]}

];
const DEFAULT={done:[],xp:0,streak:0,level:"A1",goal:"conversation",minutes:15,accent:"UK",lastDay:""};
const store=Object.assign(DEFAULT,JSON.parse(localStorage.getItem("speakflow11")||"{}")); store.review=store.review||{};
let page="today",current=null,lessonPhase=0,lessonScore=null,lessonFinished=false,lessonTarget="";
let lessonAudioContext=null,lessonAudioSource=null,lessonAudioToken=0,lessonRecognition=null;
let tutorScenario=null,tutorTurn=0,tutorScore=0,tutorBusy=false,tutorMessages=[];
const AI_TUTOR_ENDPOINT=(location.hostname.endsWith("vercel.app")?"/api/tutor":"");
let tutorLastAIReply="";
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
 if(!src){
  if(st)st.textContent="Для новой фразы используется озвучка браузера.";
  if(autoplay&&"speechSynthesis" in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.9;window.speechSynthesis.speak(u)}
  return;
 }
 if(!p){if(st)st.textContent="Аудио недоступно.";return}
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
function levelStats(level){
 const courses=COURSES.filter(c=>c.level===level);
 const total=courses.reduce((n,c)=>n+c.items.length,0);
 const done=courses.reduce((n,c)=>n+c.items.filter(x=>store.done.includes(x[0])).length,0);
 return {courses,total,done,pct:total?Math.round(done/total*100):0};
}
function learn(){
 const levels=["A1","A2","B1","B2","C1"];
 const st=levelStats(store.level),allDone=st.done>=st.total;
 const cards=st.courses.map((c,idx)=>{
  const d=c.items.filter(x=>store.done.includes(x[0])).length,p=c.items.length?Math.round(d/c.items.length*100):0;
  return '<div class="card course"><div class="courseIcon">'+c.icon+'</div><div style="flex:1"><div class="eyebrow">Модуль '+(idx+1)+' · '+c.level+'</div><h3>'+c.title+'</h3><div class="muted">'+c.desc+'</div><div style="display:flex;justify-content:space-between;margin-top:10px"><span class="small">'+d+'/'+c.items.length+' фраз</span><b class="small">'+p+'%</b></div><div class="meter" style="margin-top:6px"><i style="width:'+p+'%"></i></div><button class="secondary" style="margin-top:10px" onclick="openCourse('+c.id+')">'+(d===c.items.length?"Повторить":"Открыть модуль")+'</button></div></div>';
 }).join("");
 const tabs=levels.map(x=>'<button class="tab '+(store.level===x?"active":"")+'" onclick="store.level=\''+x+'\';save();learn()">'+x+'</button>').join("");
 const route=levels.map(x=>{const q=levelStats(x);return '<button class="secondary" style="flex:1;min-width:58px" onclick="store.level=\''+x+'\';save();learn()">'+x+' · '+q.pct+'%</button>'}).join("");
 shell('<div class="tabs">'+tabs+'</div><section class="hero"><div class="eyebrow">Карта обучения · '+store.level+'</div><h1>'+st.pct+'% уровня пройдено</h1><p>'+st.done+' из '+st.total+' фраз закреплено. Пройди четыре тематических модуля и итоговый тест.</p><div class="meter" style="margin-top:14px"><i style="width:'+st.pct+'%"></i></div>'+(allDone?'<button class="primary" style="margin-top:14px;width:100%" onclick="startLevelTest()">🏆 Итоговый тест '+store.level+'</button>':'<div class="small" style="margin-top:12px">Итоговый тест откроется после всех модулей.</div>')+'</section><div class="card"><div class="eyebrow">Все уровни</div><div style="display:flex;gap:8px;margin-top:10px">'+route+'</div></div>'+cards);
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
 const doneText=lessonFinished?'<div class="resultWord success">✓ Урок завершён</div><div class="small resultHint">Фразы урока пройдены. Теперь закрепим их коротким тестом.</div><button class="primary" style="margin-top:12px;width:100%" onclick="startCourseQuiz()">📝 Мини-тест урока</button>':'<span class="small">После прослушивания нажми микрофон и повтори фразу.</span>';
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
 if(!src){
  if("speechSynthesis" in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.9;u.onend=()=>{if(onDone)onDone()};window.speechSynthesis.speak(u)}
  else if(onDone)onDone();
  return;
 }
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



function startCourseQuiz(){
 if(!current||!current.items||current.id==="review"){toast("Тест доступен после обычного урока");return}
 const pool=[...current.items];
 courseQuizQuestions=pool.sort(()=>Math.random()-.5).slice(0,Math.min(5,pool.length));
 courseQuizIndex=0;courseQuizScore=0;
 renderCourseQuiz();
}
function renderCourseQuiz(){
 if(courseQuizIndex>=courseQuizQuestions.length){finishCourseQuiz();return}
 const item=courseQuizQuestions[courseQuizIndex],correct=item[1];
 const others=current.items.filter(x=>x!==item).sort(()=>Math.random()-.5).slice(0,3).map(x=>x[1]);
 const options=[correct,...others].sort(()=>Math.random()-.5);
 shell('<div class="lessonTop"><button class="back" onclick="renderLesson(current.items.length-1)">← Урок</button><span class="lessonCount">Тест '+(courseQuizIndex+1)+' / '+courseQuizQuestions.length+'</span></div>'+
 '<div class="card lessonCard"><div class="eyebrow">📝 Проверка урока · '+current.level+'</div>'+
 '<div class="miniMeter"><i style="width:'+Math.round(courseQuizIndex/courseQuizQuestions.length*100)+'%"></i></div>'+
 '<div class="phrase" style="font-size:20px">'+esc(item[0])+'</div><div class="small" style="margin-top:8px">Выбери правильный перевод:</div>'+
 '<div style="display:grid;gap:10px;margin-top:14px">'+options.map((x,i)=>'<button class="secondary quizOption" onclick="answerCourseQuiz(\''+jsq(x)+'\',\''+jsq(correct)+'\')">'+esc(x)+'</button>').join('')+'</div>'+
 '</div>');
}
function answerCourseQuiz(answer,correct){
 const buttons=[...document.querySelectorAll(".quizOption")];
 buttons.forEach(b=>b.disabled=true);
 const ok=answer===correct;
 if(ok)courseQuizScore++;
 toast(ok?"✓ Правильно":"↻ Не совсем");
 setTimeout(()=>{courseQuizIndex++;renderCourseQuiz()},450);
}
function finishCourseQuiz(){
 const total=courseQuizQuestions.length||1;
 const percent=Math.round(courseQuizScore/total*100);
 if(percent>=80){store.xp+=25;save()}
 shell('<section class="hero"><div class="eyebrow">Результат урока</div><h1>'+ (percent>=80?"Отлично! 🎉":"Хорошая работа") +'</h1><p>Ты ответил правильно на <b>'+courseQuizScore+' из '+total+'</b> вопросов · <b>'+percent+'%</b></p>'+
 '<div class="card"><h3>Что дальше?</h3><p class="muted">'+(percent>=80?"Урок закреплён. Можно переходить дальше.":"Повтори слабые фразы в Smart Review и попробуй тест ещё раз.")+'</p>'+
 '<button class="primary" onclick="go(\'learn\')">← К урокам</button></div></section>');
}

function startLevelTest(){
 const st=levelStats(store.level);
 if(st.done<st.total){toast("Сначала пройди все модули уровня");return}
 const pool=st.courses.flatMap(c=>c.items);
 courseQuizQuestions=pool.sort(()=>Math.random()-.5).slice(0,10);
 courseQuizIndex=0;courseQuizScore=0;renderLevelTest();
}
function renderLevelTest(){
 if(courseQuizIndex>=courseQuizQuestions.length){finishLevelTest();return}
 const item=courseQuizQuestions[courseQuizIndex],correct=item[1];
 const others=COURSES.filter(c=>c.level===store.level).flatMap(c=>c.items).filter(x=>x!==item).sort(()=>Math.random()-.5).slice(0,3).map(x=>x[1]);
 const options=[correct,...others].sort(()=>Math.random()-.5);
 shell('<div class="lessonTop"><button class="back" onclick="go(\'learn\')">← К карте</button><span class="lessonCount">🏆 '+store.level+' · '+(courseQuizIndex+1)+' / 10</span></div>'+
 '<div class="card lessonCard"><div class="eyebrow">Итоговый тест уровня</div><div class="miniMeter"><i style="width:'+Math.round(courseQuizIndex/10*100)+'%"></i></div>'+
 '<div class="phrase" style="font-size:20px">'+esc(item[0])+'</div><div class="small" style="margin-top:8px">Выбери правильный перевод:</div>'+
 '<div style="display:grid;gap:10px;margin-top:14px">'+options.map(x=>'<button class="secondary quizOption" onclick="answerLevelTest(\''+jsq(x)+'\',\''+jsq(correct)+'\')">'+esc(x)+'</button>').join('')+'</div></div>');
}
function answerLevelTest(answer,correct){
 document.querySelectorAll(".quizOption").forEach(b=>b.disabled=true);
 const ok=answer===correct;if(ok)courseQuizScore++;
 toast(ok?"✓ Правильно":"↻ Не совсем");
 setTimeout(()=>{courseQuizIndex++;renderLevelTest()},450);
}
function finishLevelTest(){
 const percent=Math.round(courseQuizScore/10*100);
 if(percent>=80){store.xp+=100;save()}
 shell('<section class="hero"><div class="eyebrow">🏆 Уровень '+store.level+'</div><h1>'+percent+'%</h1><p>Правильных ответов: <b>'+courseQuizScore+' из 10</b>.</p>'+
 '<div class="card"><h3>'+ (percent>=80?"Уровень закреплён 🎉":"Нужно ещё немного практики") +'</h3><p class="muted">'+(percent>=80?"Ты завершил учебный маршрут этого уровня. Можно переходить выше или продолжать повторение.":"Повтори Smart Review и пройди итоговый тест ещё раз.")+'</p>'+
 '<button class="primary" onclick="go(\'learn\')">← Вернуться к карте</button></div></section>');
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
,
 {id:"taxi",icon:"🚕",title:"В такси",desc:"Доедь до нужного места и уточни маршрут.",role:"Driver",opening:"Hi! Where would you like to go?",turns:[
 {keys:["hotel","station","airport","centre","center"],reply:"Sure. Do you have a preferred route?",tip:"Попробуй: Please take me to the city centre."},{keys:["fast","quick","route","traffic","prefer"],reply:"No problem. It may take about twenty minutes.",tip:"Попробуй: That's fine, thank you."},{keys:["thank","fine","okay","great"],reply:"Here we are. That will be twenty euros.",tip:"Попробуй: Can I pay by card?"}]},
 {id:"doctor",icon:"🩺",title:"У врача",desc:"Опиши простую проблему и задай вопрос.",role:"Doctor",opening:"Hello. What seems to be the problem?",turns:[
 {keys:["pain","hurt","headache","stomach","sick","feel"],reply:"I see. How long have you felt like this?",tip:"Попробуй: I've felt like this since yesterday."},{keys:["yesterday","today","week","days","hours"],reply:"Thank you. Do you have a fever or any other symptoms?",tip:"Попробуй: I have a slight fever."},{keys:["fever","cough","tired","no","yes"],reply:"Okay. I'll explain what you can do next.",tip:"Попробуй: Thank you, doctor."}]},
 {id:"supermarket",icon:"🛒",title:"В супермаркете",desc:"Найди товар, уточни цену и оплати покупку.",role:"Shop assistant",opening:"Hello. Can I help you find something?",turns:[
 {keys:["milk","bread","water","cheese","looking"],reply:"Sure. It's in aisle five, on the left.",tip:"Попробуй: Thank you. Where is the bread?"},{keys:["bread","price","cost","five"],reply:"The bread is two euros. Would you like anything else?",tip:"Попробуй: Yes, I also need some milk."},{keys:["milk","yes","no","nothing"],reply:"All right. You can pay at the checkout over there.",tip:"Попробуй: Great, thank you."}]},
 {id:"apartment",icon:"🏠",title:"Аренда квартиры",desc:"Спроси о квартире, цене и условиях.",role:"Landlord",opening:"Hi. Are you interested in the apartment?",turns:[
 {keys:["yes","interested","apartment","flat"],reply:"Great. How long are you planning to stay?",tip:"Попробуй: I'm planning to stay for a year."},{keys:["year","months","month","long"],reply:"The rent is one thousand euros per month, excluding utilities.",tip:"Попробуй: Are utilities included?"},{keys:["utilities","included","rent","price"],reply:"Water is included, but electricity is separate.",tip:"Попробуй: I see. When can I move in?"}]},
 {id:"job",icon:"👔",title:"Собеседование",desc:"Расскажи о себе и своём опыте.",role:"Interviewer",opening:"Good morning. Could you tell me a little about yourself?",turns:[
 {keys:["work","experience","years","company","job"],reply:"Thanks. What would you say is your strongest skill?",tip:"Попробуй: I'm good at solving problems."},{keys:["problem","communication","organizing","team","learning","skill"],reply:"That's useful. Can you give me a quick example?",tip:"Попробуй: In my last job, I solved a difficult problem."},{keys:["last","example","solved","project","team"],reply:"Thank you. Do you have any questions for me?",tip:"Попробуй: Yes. What does a typical day look like?"}]},
 {id:"friends",icon:"🎉",title:"Встреча с друзьями",desc:"Познакомься, предложи план и поддержи разговор.",role:"Friend",opening:"Hey! What are you doing this evening?",turns:[
 {keys:["nothing","free","home","tonight","evening"],reply:"Nice! Do you want to grab something to eat?",tip:"Попробуй: Sure, that sounds great."},{keys:["sure","great","yes","eat","dinner"],reply:"How about seven at the Italian place near the station?",tip:"Попробуй: Seven works for me."},{keys:["seven","works","okay","fine"],reply:"Perfect. See you there!",tip:"Попробуй: See you later!"}]},
 {id:"bank",icon:"🏦",title:"В банке",desc:"Открой счёт, уточни комиссию и карту.",role:"Bank clerk",opening:"Good morning. How can I help you today?",turns:[
 {keys:["account","open","bank"],reply:"Of course. What kind of account are you looking for?",tip:"Попробуй: I'd like to open a current account."},{keys:["current","account","card"],reply:"No problem. Do you need a debit card as well?",tip:"Попробуй: Yes, please. How much is the fee?"},{keys:["fee","yes","debit","card"],reply:"There is no monthly fee for this account.",tip:"Попробуй: Great. What documents do I need?"}]},
 {id:"car",icon:"🚗",title:"В автосервисе",desc:"Опиши проблему с машиной и уточни ремонт.",role:"Mechanic",opening:"Hello. What seems to be wrong with the car?",turns:[
 {keys:["engine","brake","noise","car","battery"],reply:"I see. When did you first notice the problem?",tip:"Попробуй: I noticed it yesterday."},{keys:["yesterday","today","week","noticed"],reply:"Thanks. I'll take a look. It may take about an hour.",tip:"Попробуй: How much will it cost?"},{keys:["cost","price","much","hour"],reply:"I'll give you an estimate before we start the repair.",tip:"Попробуй: Okay, thank you."}]},
 {id:"phone",icon:"📱",title:"В магазине техники",desc:"Выбери телефон, сравни модели и спроси гарантию.",role:"Sales assistant",opening:"Hi! Are you looking for a particular phone?",turns:[
 {keys:["phone","iphone","samsung","android","looking"],reply:"Sure. What features are most important to you?",tip:"Попробуй: I need a good camera and a long battery life."},{keys:["camera","battery","price","screen"],reply:"This model has a very good camera and a two-day battery.",tip:"Попробуй: How much does it cost?"},{keys:["cost","price","much"],reply:"It's nine hundred euros and comes with a two-year warranty.",tip:"Попробуй: Does it come with a charger?"}]},
 {id:"restaurant",icon:"🍷",title:"В ресторане",desc:"Полный разговор от заказа до счёта.",role:"Waiter",opening:"Good evening. Are you ready to order?",turns:[
 {keys:["ready","order","yes","chicken","fish"],reply:"Excellent. Would you like something to drink?",tip:"Попробуй: I'd like sparkling water, please."},{keys:["water","wine","coffee","drink"],reply:"Certainly. I'll bring that right away.",tip:"Попробуй: Thank you. Could we have some bread as well?"},{keys:["bread","thank","bill","dessert"],reply:"Of course. I'll bring the bread and check on your dessert.",tip:"Попробуй: Could we have the bill when you're ready?"}]},
 {id:"airport2",icon:"🛫",title:"Потерянный багаж",desc:"Реши проблему с багажом в аэропорту.",role:"Airport agent",opening:"Hello. How can I help you?",turns:[
 {keys:["bag","luggage","lost","missing"],reply:"I'm sorry to hear that. Could you describe your bag?",tip:"Попробуй: It's a black suitcase with a red tag."},{keys:["black","red","suitcase","bag"],reply:"Thank you. Do you have your baggage receipt?",tip:"Попробуй: Yes, here it is."},{keys:["yes","receipt","here"],reply:"We'll locate your bag and contact you as soon as possible.",tip:"Попробуй: Thank you for your help."}]},
 {id:"meeting",icon:"📅",title:"Деловая встреча",desc:"Назначь встречу и обсуди повестку.",role:"Colleague",opening:"Hi. Shall we arrange a meeting for next week?",turns:[
 {keys:["yes","meeting","next","week"],reply:"Great. What day would work for you?",tip:"Попробуй: Tuesday would work well for me."},{keys:["tuesday","monday","wednesday","thursday","friday"],reply:"How about ten in the morning?",tip:"Попробуй: Ten works for me. What's the agenda?"},{keys:["ten","agenda","morning","works"],reply:"We'll discuss the project timeline and next steps.",tip:"Попробуй: Perfect. See you then."}]},
 {id:"neighbour",icon:"🏡",title:"С новым соседом",desc:"Познакомься и поговори о районе.",role:"Neighbour",opening:"Hi! I don't think we've met. Are you new here?",turns:[
 {keys:["yes","new","moved","here"],reply:"Welcome! How are you finding the neighbourhood so far?",tip:"Попробуй: I really like it. It's quiet and convenient."},{keys:["quiet","convenient","like","good"],reply:"That's nice to hear. There are some good shops nearby.",tip:"Попробуй: Is there a good supermarket around here?"},{keys:["supermarket","shop","shops","nearby"],reply:"Yes, there's one five minutes away on foot.",tip:"Попробуй: Thanks, I'll check it out."}]},
 {id:"hotel2",icon:"🛎️",title:"Проблема в отеле",desc:"Попроси решить проблему с номером.",role:"Receptionist",opening:"Hello. Is everything okay with your room?",turns:[
 {keys:["no","problem","room","air","noise","hot"],reply:"I'm sorry. What seems to be the problem?",tip:"Попробуй: The room is very noisy."},{keys:["noisy","noise","cold","hot","clean"],reply:"I apologize. We can move you to another room.",tip:"Попробуй: That would be great, thank you."},{keys:["great","thank","move","room"],reply:"I'll arrange that for you right away.",tip:"Попробуй: I really appreciate your help."}]},
 {id:"project",icon:"💻",title:"Рабочий проект",desc:"Обсуди задачу, срок и следующий шаг.",role:"Project manager",opening:"How is the project going so far?",turns:[
 {keys:["good","fine","project","progress","going"],reply:"Good. Are there any issues we should know about?",tip:"Попробуй: We're slightly behind schedule."},{keys:["behind","issue","problem","schedule"],reply:"Thanks for letting me know. What do you need to get back on track?",tip:"Попробуй: We need two more days."},{keys:["two","days","help","need"],reply:"Okay. Let's update the deadline and inform the team.",tip:"Попробуй: That sounds like a good plan."}]},
 {id:"social",icon:"☕",title:"Небольшой разговор",desc:"Поддержи естественный small talk.",role:"New acquaintance",opening:"Nice to meet you. How's your day been?",turns:[
 {keys:["good","fine","great","busy","day"],reply:"That's good. What do you usually do in your free time?",tip:"Попробуй: I usually go for walks or watch movies."},{keys:["walk","movies","music","sport","free"],reply:"Sounds interesting. What kind of movies do you like?",tip:"Попробуй: I mostly watch comedies and thrillers."},{keys:["comedy","comedies","thriller","movie","movies"],reply:"Nice! I'll have to ask you for a recommendation sometime.",tip:"Попробуй: Sure, I'd be happy to recommend one."}]} ]}
];

function tutor(){
 const cards=TUTOR_SCENARIOS.map(x=>'<button class="tutorScenario" onclick="startTutor(\''+x.id+'\')"><span class="tutorIcon">'+x.icon+'</span><span><b>'+x.title+'</b><small>'+x.desc+'</small></span><strong>→</strong></button>').join("");
 shell('<section class="hero"><div class="eyebrow">AI Tutor · Speaking</div><h1>Поговорим по-английски</h1><p>Выбери ситуацию и веди диалог голосом. Приложение будет давать подсказки и оценивать твои реплики.</p></section><div class="card"><h3>Выбери ситуацию</h3>'+cards+'</div><div class="card"><div class="eyebrow">Твой уровень</div><p class="muted">'+store.level+' · '+goalName(store.goal)+'</p></div>');
}
function startTutor(id){
 tutorScenario=TUTOR_SCENARIOS.find(x=>x.id===id);tutorTurn=0;tutorScore=0;tutorBusy=false;tutorMessages=[];
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
function addTutorReview(text,lesson){
 if(!text)return;
 const key="AI:"+text.slice(0,120);
 const rd=reviewData(key);
 rd.attempts=(rd.attempts||0)+1;
 rd.last=Date.now();
 rd.level=store.level;
 if(lesson)rd.note=lesson;
 rd.due=Date.now()+86400000;
 save();
}
function tutorSpeakAI(){
 if(!tutorLastAIReply){toast("Сначала получи ответ Tutor");return}
 if(!("speechSynthesis" in window)){toast("Озвучивание недоступно");return}
 window.speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(tutorLastAIReply);
 u.lang="en-US";
 u.rate=0.9;
 window.speechSynthesis.speak(u);
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
async function evaluateTutorAnswer(got){
 const box=document.getElementById("tutorResult");if(!box||!tutorScenario)return;
 const turn=tutorScenario.turns[tutorTurn];
 const example=turn.tip.replace(/^Попробуй:\\s*/,"").trim();
 box.innerHTML='<span class="listeningPulse">🧠 Анализирую ответ…</span>';
 tutorBusy=true;
 if(AI_TUTOR_ENDPOINT){
  try{
   const response=await fetch(AI_TUTOR_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
    level:store.level,goal:store.goal,scenario:tutorScenario.title,turn:tutorCurrentLine(),userText:got,messages:tutorMessages
   })});
   if(response.ok){
    const ai=await response.json();
    const score=Math.max(0,Math.min(100,Number(ai.score)||0));
    tutorScore+=score;
    tutorLastAIReply=ai.reply||"";
    tutorMessages.push({role:"user",content:got},{role:"assistant",content:tutorLastAIReply});
    if(ai.correction||ai.suggestion) addTutorReview(got,ai.correction||ai.suggestion);
    box.innerHTML='<div class="resultWord '+(score>=70?"success":"warning")+'">'+(score>=70?"✓ Понятно":"↻ Можно улучшить")+'</div>'+
    '<div class="recognizedText">«'+esc(got)+'»</div><div class="resultScore">'+score+'%</div>'+
    (ai.correction?'<div class="tutorFeedback"><b>✏️ Исправление</b><div>'+esc(ai.correction)+'</div></div>':"")+
    '<div class="tutorAIReply"><small>'+esc(tutorScenario.role)+' · AI Tutor</small><div>'+esc(ai.reply||"Tell me more.")+'</div></div>'+
    (ai.suggestion?'<div class="tutorFeedback"><b>💡 Естественнее</b><div>'+esc(ai.suggestion)+'</div></div>':"")+
    '<div class="small">Настоящий AI анализирует смысл ответа и контекст диалога.</div>';
    tutorBusy=false;
    const next=document.getElementById("tutorNextBtn");if(next)next.style.display="block";
    return;
   }
  }catch(e){}
 }
 const keysHit=turn.keys.some(k=>got.toLowerCase().includes(k.toLowerCase()));
 const base=similarity(example,got);
 const score=Math.min(98,Math.max(45,keysHit?Math.max(78,base):base));
 tutorScore+=score;
 const correction=tutorCorrection(got,example,score);
 const reply=tutorNaturalReply(got,turn);
 box.innerHTML='<div class="resultWord '+(score>=70?"success":"warning")+'">'+(score>=70?"✓ Понятно":"↻ Можно улучшить")+'</div>'+
 '<div class="recognizedText">«'+esc(got)+'»</div><div class="resultScore">'+score+'%</div>'+
 '<div class="tutorFeedback"><b>💬 Обратная связь</b><div>'+esc(correction)+'</div></div>'+
 '<div class="tutorAIReply"><small>'+tutorScenario.role+' · адаптивный режим</small><div>'+esc(reply)+'</div></div>'+
 feedbackHtml(example,got)+
 '<div class="small">Сейчас используется адаптивный режим. На сервере с AI Tutor анализ будет смысловым.</div>';
 tutorBusy=false;
 const next=document.getElementById("tutorNextBtn");if(next)next.style.display="block";
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
