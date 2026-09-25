// SpeakFlow 6.2 — audio is keyed by the exact English phrase, not by lesson position.
// This prevents an old/new lesson from ever playing a different phrase's WAV.
const CACHE_NAME = 'speakflow-audio-v6.2';
let activeAudio = null;
let preloadJobs = new Map();
let audioManifest = null;

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
  const c=await getCache();
  if(c)await c.put(url,new Response(blob,{headers:{'Content-Type':'audio/wav'} }));
  return blob;
}

async function sha256Key(text){
  const bytes=new TextEncoder().encode(String(text).trim());
  const hash=await crypto.subtle.digest('SHA-256',bytes);
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,16);
}

async function buildAudioIndex(){
  if(window.__speakflowAudioIndex)return window.__speakflowAudioIndex;
  setStatus('loading','Loading exact phrase audio index…',10);
  const res=await fetch('audio/index.json?v=6.2',{cache:'no-cache'});
  if(!res.ok)throw new Error(`Audio index not found (${res.status})`);
  audioManifest=await res.json();
  const index=new Map();
  for(const [phrase,url] of Object.entries(audioManifest.phrases||{})) index.set(phrase,url);
  window.__speakflowAudioIndex=index;
  return index;
}

async function audioPathForText(text){
  const index=await buildAudioIndex();
  return index.get(String(text).trim()) || null;
}

window.prepareNeuralVoice=async()=>{
  try{
    setStatus('loading','Checking exact Kokoro audio pack…',20);
    const first=window.__speakflowCourses?.[0]?.phrases?.[0]?.[0];
    if(!first)throw new Error('Course data is not ready.');
    const url=await audioPathForText(first);
    if(!url)throw new Error('This lesson text has no matching audio file.');
    await fetchAndCache(url);
    setStatus('ready','Kokoro US English ready',100); return true;
  }catch(e){
    setStatus('error','Audio pack does not match this lesson text',0,String(e?.message||e)); return false;
  }
};

window.neuralSpeak=async(text,opts={})=>{
  if(!text)return false;
  try{
    const url=await audioPathForText(text);
    if(!url)throw new Error('No audio file for this exact phrase.');
    const blob=await fetchAndCache(url);
    if(opts.cacheOnly)return true;
    if(activeAudio){
      try{activeAudio.pause()}catch{}
      if(activeAudio.src?.startsWith('blob:'))URL.revokeObjectURL(activeAudio.src);
    }
    const objectUrl=URL.createObjectURL(blob);
    activeAudio=new Audio(objectUrl);
    activeAudio.preload='auto';
    activeAudio.onended=()=>{
      URL.revokeObjectURL(objectUrl); activeAudio=null;
      setStatus('ready','Kokoro US English ready',100);
    };
    await activeAudio.play();
    return true;
  }catch(e){
    setStatus('error','Kokoro audio failed',0,String(e?.message||e));
    return false;
  }
};

window.prefetchLessonAudio=async(phrases,startIndex=0,onProgress=null)=>{
  const list=(phrases||[]).map(p=>p[0]).filter(Boolean);
  const key=list.join('|');
  if(preloadJobs.has(key))return preloadJobs.get(key);
  const job=(async()=>{
    try{
      await buildAudioIndex();
      for(let i=Math.max(0,startIndex);i<list.length;i++){
        const url=await audioPathForText(list[i]);
        if(!url)throw new Error(`No audio for: ${list[i]}`);
        await fetchAndCache(url);
        if(onProgress)onProgress(i+1,list.length);
        window.dispatchEvent(new CustomEvent('speakflow-audio-prefetch',{detail:{index:i,total:list.length}}));
      }
      setStatus('ready','Kokoro US English ready',100);
    }catch(e){
      setStatus('error','Audio prefetch failed',0,String(e?.message||e));
      throw e;
    }finally{preloadJobs.delete(key)}
  })();
  preloadJobs.set(key,job); return job;
};

window.stopNeuralVoice=()=>{
  try{activeAudio?.pause()}catch{}
  if(activeAudio?.src?.startsWith('blob:'))URL.revokeObjectURL(activeAudio.src);
  activeAudio=null;
};
