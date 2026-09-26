const AUDIO_INDEX_URL='audio/index.json';
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
