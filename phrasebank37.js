/* SpeakFlow 37 — 1000 phrase coach corpus */
window.SF37_BANK=(function(){
const topics=[
["Travel","airport","hotel","ticket","flight","passport","luggage","train","station","taxi","trip","reservation","map","platform","gate","journey","tour"],
["Food","breakfast","lunch","dinner","restaurant","menu","coffee","table","bill","order","dessert","vegetarian","spicy","water","dish","waiter","reservation"],
["Shopping","shop","price","size","color","receipt","cash","card","discount","return","customer","store","delivery","online","order","product","exchange"],
["Home","apartment","house","room","kitchen","bathroom","bedroom","neighbor","rent","repair","window","door","furniture","garden","heating","address","move"],
["Work","meeting","project","deadline","client","colleague","office","email","report","task","schedule","manager","team","idea","problem","plan","result"],
["Study","lesson","course","teacher","student","exam","homework","book","language","practice","question","answer","skill","university","class","research","topic"],
["Health","doctor","appointment","medicine","pain","headache","hospital","pharmacy","exercise","sleep","food","allergy","checkup","symptom","treatment","health","patient"],
["City","street","bus","subway","traffic","parking","building","center","museum","park","bank","post office","address","corner","crosswalk","neighborhood","road"],
["Friends","friend","weekend","movie","music","party","coffee","dinner","plan","hobby","sport","message","visit","conversation","family","birthday","holiday"],
["Technology","phone","computer","screen","internet","password","app","website","file","camera","battery","charger","update","account","message","device","software"],
["Communication","conversation","question","answer","opinion","example","reason","idea","explanation","message","call","meeting","discussion","agreement","difference","point","story"],
["Money","money","price","salary","payment","bank","account","cash","card","budget","cost","invoice","saving","loan","tax","fee","income"],
["Weather","weather","rain","sun","wind","snow","temperature","forecast","summer","winter","morning","evening","cold","warm","storm","cloud","season"],
["Family","mother","father","child","brother","sister","parents","family","home","birthday","visit","holiday","dinner","weekend","school","work","friend"],
["Transport","car","bus","train","taxi","bike","road","traffic","driver","station","ticket","stop","route","parking","fuel","airport","journey"],
["Social","party","meeting","people","neighbor","guest","invitation","event","conversation","introduction","name","country","job","city","interest","experience","plan"],
["Problems","problem","mistake","delay","damage","error","change","help","solution","issue","complaint","service","repair","lost","wrong","late","difficulty"],
["Plans","tomorrow","weekend","month","year","appointment","trip","meeting","project","holiday","goal","plan","schedule","decision","future","change","idea"],
["Nature","park","tree","river","mountain","beach","forest","animal","weather","walk","camping","garden","lake","country","view","air","place"],
["Professional","business","customer","contract","team","strategy","budget","project","deadline","quality","meeting","presentation","feedback","decision","market","career","responsibility"]
];
const patterns={
A1:[
"I need help with the {x}.","Where is the {x}, please?","How much is the {x}?","I would like to ask about the {x}.","Can you help me with the {x}?","I need the {x} today.","Where can I find the {x}?","Could you show me the {x}?","I have a question about the {x}.","Is the {x} available today?",
"Can I have the {x}, please?","I am looking for the {x}.","What time is the {x}?","I need to change the {x}.","Could you repeat that about the {x}?","I do not understand the {x}.","Is this the right {x}?","I have a problem with the {x}.","Can you write down the {x}?","Thank you for helping me with the {x}."
],
A2:[
"I am looking for information about the {x}.","Could you tell me more about the {x}?","I would like to change my {x}.","What would you recommend for the {x}?","Is it possible to book the {x} today?","How long does the {x} take?","Could you explain how the {x} works?","I need to find a cheaper {x}.","Can I pay for the {x} by card?","What is included with the {x}?",
"Could you send me the details about the {x}?","I would prefer the {x} if possible.","Is there another option for the {x}?","When should I arrive for the {x}?","Could you check the {x} for me?","I think there is a problem with the {x}.","I would like to cancel the {x}.","Can I get a receipt for the {x}?","How can I get to the {x}?","What should I do about the {x}?"
],
B1:[
"I would like to discuss the {x} with you.","Could you give me some advice about the {x}?","I am not sure what to do about the {x}.","What do you think about the {x}?","I have been thinking about the {x} recently.","We need to find a practical solution for the {x}.","Could you explain your experience with the {x}?","I would rather avoid problems with the {x}.","It would be useful to know more about the {x}.","I am trying to improve the way I handle the {x}.",
"From my experience, the {x} can be difficult sometimes.","I completely understand your concern about the {x}.","Could we talk about the {x} before we decide?","I would like to make a clear plan for the {x}.","There may be a better way to deal with the {x}.","What would you do if you had a problem with the {x}?","I agree that the {x} needs more attention.","Let me explain what happened with the {x}.","I think we should consider another option for the {x}.","Could you give me an example related to the {x}?"
],
B2:[
"I would like to take a closer look at the {x}.","There are several factors we should consider regarding the {x}.","I am concerned that the {x} may affect our plans.","Could you clarify what you mean by the {x}?","We need to decide how to approach the {x}.","I would suggest discussing the {x} before making a decision.","The main challenge with the {x} is that priorities can change.","It seems that the {x} requires a more flexible approach.","I see your point, but I would question the assumptions about the {x}.","We should probably focus on the most important aspects of the {x}.",
"One possible explanation for the {x} is a lack of clear communication.","I would be interested to hear your perspective on the {x}.","We need reliable information before reaching a conclusion about the {x}.","It might be worth considering the long-term impact of the {x}.","I think we could improve the situation by reviewing the {x}.","The way we handle the {x} could make a significant difference.","Could you outline the main risks associated with the {x}?","I would like to compare several approaches to the {x}.","We may need to adjust our strategy depending on the {x}.","Let us agree on the next steps regarding the {x}."
],
C1:[
"From my perspective, the key issue concerning the {x} is the lack of clear priorities.","I would argue that our approach to the {x} needs to be reconsidered.","The available evidence suggests that the {x} is more complex than it initially appeared.","Before reaching a conclusion, we should examine the broader implications of the {x}.","I am inclined to think that the {x} requires a more nuanced response.","One could reasonably argue that the {x} has both short-term and long-term consequences.","I would like to challenge the assumption that the {x} can be solved with a single measure.","The success of the {x} will largely depend on how effectively we manage competing priorities.","There is a strong case for taking a more systematic approach to the {x}.","We should distinguish between the immediate effects of the {x} and its wider consequences.",
"Having considered the alternatives, I would prioritize a solution that addresses the underlying causes of the {x}.","It is worth questioning whether our current approach to the {x} remains appropriate.","The discussion about the {x} should take account of both practical constraints and potential opportunities.","I would be reluctant to make a final decision about the {x} without further evidence.","A balanced assessment of the {x} requires us to consider perspectives that may initially appear contradictory.","The way we frame the {x} can significantly influence the decisions that follow.","I would recommend that we establish clear criteria before evaluating the {x}.","There is a risk that focusing exclusively on the {x} could obscure a more fundamental problem.","If we want to make sustainable progress, we need to rethink how we approach the {x}.","Ultimately, the question is not simply how to manage the {x}, but how to achieve the best possible outcome."
]};
let out=[],id=1;L.forEach(function(l){patterns[l].forEach(function(p,pi){topics.forEach(function(t,ti){out.push({id:"p"+id++,level:l,theme:t[0],text:p.replace("{x}",t[1+((pi+ti)%16)]),tr:"",topic:t[1+((pi+ti)%16)]})})})});return out.slice(0,1000)})();

