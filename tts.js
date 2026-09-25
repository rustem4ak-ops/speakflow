// SpeakFlow 6.0 — static Kokoro audio player.
// No Kokoro/ONNX inference runs in Safari. iPhone only downloads and plays WAV files.
const CACHE_NAME = 'speakflow-audio-v6.1';
let activeAudio = null;
let preloadJobs = new Map();

window.voiceEngine = {state:'idle', message:'Kokoro US English · af_heart', progress:0, error:null};
function setStatus(state,message,progress=0,error=null){
  window.voiceEngine={state,message,progress,error};
  window.dispatchEvent(new CustomEvent('speakflow-voice-status',{detail:window.voiceEngine}));
}
async function getCache(){try{return await caches.open(CACHE_NAME)}catch{return null}}
async function cachedBlob(url){
  const c=await getCache(); if(!c)return null;
  const r=await c.match(url); return r?r.blob():null;
}
async function fetchAndCache(url){
  const cached=await cachedBlob(url); if(cached)return cached;
  const res=await fetch(url,{cache:'no-cache'});
  if(!res.ok)throw new Error(`Audio file not found (${res.status})`);
  const blob=await res.blob();
  const c=await getCache(); if(c)await c.put(url,new Response(blob,{headers:{'Content-Type':'audio/wav'}}));
  return blob;
}
async function buildAudioIndex(){
  if(window.__speakflowAudioIndex)return window.__speakflowAudioIndex;
  const index=new Map();
  for(const c of (window.__speakflowCourses||[])){
    c.phrases.forEach((p,i)=>index.set(p[0],`audio/${c.slug}-${i+1}.wav?v=6.1`));
  }
  window.__speakflowAudioIndex=index; return index;
}
window.prepareNeuralVoice=async()=>{
  try{
    setStatus('loading','Checking Kokoro audio pack…',20);
    await buildAudioIndex();
    const first=window.__speakflowCourses?.[0]?.phrases?.[0]?.[0];
    if(!first)throw new Error('Course data is not ready.');
    await fetchAndCache(window.__speakflowAudioIndex.get(first));
    setStatus('ready','Kokoro US English ready',100); return true;
  }catch(e){
    setStatus('error','Kokoro audio pack is not ready',0,String(e?.message||e)); return false;
  }
};
window.neuralSpeak=async(text,opts={})=>{
  if(!text)return false;
  try{
    await buildAudioIndex();
    const url=window.__speakflowAudioIndex.get(text);
    if(!url)throw new Error('No audio path for this phrase.');
    const blob=await fetchAndCache(url);
    if(opts.cacheOnly)return true;
    if(activeAudio){try{activeAudio.pause()}catch{};if(activeAudio.src?.startsWith('blob:'))URL.revokeObjectURL(activeAudio.src);}
    const objectUrl=URL.createObjectURL(blob);
    activeAudio=new Audio(objectUrl); activeAudio.preload='auto';
    activeAudio.onended=()=>{URL.revokeObjectURL(objectUrl);activeAudio=null;setStatus('ready','Kokoro US English ready',100)};
    await activeAudio.play(); return true;
  }catch(e){
    setStatus('error','Kokoro audio failed',0,String(e?.message||e)); return false;
  }
};
window.prefetchLessonAudio=async(phrases,startIndex=0,onProgress=null)=>{
  const list=(phrases||[]).map(p=>p[0]).filter(Boolean);
  const key=list.join('|');
  if(preloadJobs.has(key))return preloadJobs.get(key);
  const job=(async()=>{
    await buildAudioIndex();
    for(let i=Math.max(0,startIndex);i<list.length;i++){
      const url=window.__speakflowAudioIndex.get(list[i]);
      if(!url)continue;
      await fetchAndCache(url);
      if(onProgress)onProgress(i+1,list.length);
      window.dispatchEvent(new CustomEvent('speakflow-audio-prefetch',{detail:{index:i,total:list.length}}));
    }
    setStatus('ready','Kokoro US English ready',100);
  })().catch(e=>{setStatus('error','Audio prefetch failed',0,String(e?.message||e));throw e})
    .finally(()=>preloadJobs.delete(key));
  preloadJobs.set(key,job); return job;
};
window.stopNeuralVoice=()=>{try{activeAudio?.pause()}catch{};if(activeAudio?.src?.startsWith('blob:'))URL.revokeObjectURL(activeAudio.src);activeAudio=null};
