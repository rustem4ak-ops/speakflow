// SpeakFlow 8.1 — fast static audio engine, based on the proven 6.2/6.3 architecture.
// All Kokoro speech is generated ahead of time. The iPhone only downloads/plays the file.
const AUDIO_INDEX_URL='audio/index.json?v=8.1';
const CACHE_NAME='speakflow-audio-v8.1';
let audioIndex=null;
let activeAudio=null;
let activeObjectUrl=null;
let preloadJobs=new Map();
let audioElement=null;

window.voiceEngine={state:'loading',message:'Loading audio library…',progress:0,error:null};

function setStatus(state,message,progress=0,error=null){
  window.voiceEngine={state,message,progress,error};
  window.dispatchEvent(new CustomEvent('speakflow-voice-status',{detail:window.voiceEngine}));
}

function ensureAudioElement(){
  if(audioElement) return audioElement;
  audioElement=document.createElement('audio');
  audioElement.preload='auto';
  audioElement.setAttribute('playsinline','');
  audioElement.playsInline=true;
  audioElement.style.display='none';
  document.body.appendChild(audioElement);
  audioElement.addEventListener('ended',()=>{
    if(activeObjectUrl){URL.revokeObjectURL(activeObjectUrl);activeObjectUrl=null;}
    activeAudio=null;
    setStatus('ready','Kokoro US English ready',100);
  });
  audioElement.addEventListener('error',()=>{
    if(activeObjectUrl){URL.revokeObjectURL(activeObjectUrl);activeObjectUrl=null;}
    activeAudio=null;
  });
  return audioElement;
}

async function getCache(){
  try{return await caches.open(CACHE_NAME);}catch{return null;}
}

async function cachedBlob(url){
  const c=await getCache();
  if(!c)return null;
  try{const r=await c.match(url);return r?r.blob():null;}catch{return null;}
}

async function fetchAndCache(url){
  const cached=await cachedBlob(url);
  if(cached)return cached;
  const res=await fetch(url,{cache:'no-cache'});
  if(!res.ok)throw new Error(`Audio file not found (${res.status})`);
  const blob=await res.blob();
  const c=await getCache();
  if(c){try{await c.put(url,new Response(blob,{headers:{'Content-Type':'audio/mpeg'}}));}catch{}}
  return blob;
}

async function buildAudioIndex(){
  if(window.__speakflowAudioIndex)return window.__speakflowAudioIndex;
  try{
    setStatus('loading','Loading audio library…',10);
    const res=await fetch(AUDIO_INDEX_URL,{cache:'no-cache'});
    if(!res.ok)throw new Error(`Audio index unavailable (${res.status})`);
    audioIndex=await res.json();
    const index=new Map();
    for(const [phrase,url] of Object.entries(audioIndex.phrases||{})) index.set(phrase.trim(),url);
    window.__speakflowAudioIndex=index;
    setStatus('ready','Kokoro US English ready',100);
    return index;
  }catch(e){
    setStatus('ready','Audio library loaded — browser voice available as fallback',100);
    return null;
  }
}

async function audioPathForText(text){
  const index=await function speakFallback(text){ if(!('speechSynthesis' in window)) return; speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang='en-US'; u.rate=.92; speechSynthesis.speak(u); }

buildAudioIndex();
  return index?.get(String(text).trim())||null;
}

window.prepareNeuralVoice=async()=>{
  try{
    const first=window.__speakflowCourses?.[0]?.phrases?.[0]?.[0];
    if(!first)throw new Error('Course data is not ready.');
    const url=await audioPathForText(first);
    if(!url)throw new Error('This lesson text has no matching audio file.');
    await fetchAndCache(url);
    setStatus('ready','Kokoro US English ready',100);
    return true;
  }catch(e){
    setStatus('ready','Audio library loaded — some phrases use instant device voice',100);
    return false;
  }
};

window.neuralSpeak=async(text,opts={})=>{
  if(!text)return false;
  try{
    const url=await audioPathForText(text);
    if(!url){ speakFallback(text); return true; }
    const blob=await fetchAndCache(url);
    if(opts.cacheOnly)return true;

    const el=ensureAudioElement();
    if(activeObjectUrl){try{URL.revokeObjectURL(activeObjectUrl);}catch{}activeObjectUrl=null;}
    try{el.pause();}catch{}
    const objectUrl=URL.createObjectURL(blob);
    activeObjectUrl=objectUrl;
    activeAudio=el;
    el.src=objectUrl;
    el.currentTime=0;
    el.load();
    try{
      await el.play();
    }catch(firstError){
      // iOS PWA can occasionally keep a stale media element after returning from background.
      // Reset the same element once; this remains within the user's tap gesture.
      try{el.pause();el.removeAttribute('src');el.load();el.src=objectUrl;el.load();await el.play();}
      catch{throw firstError;}
    }
    return true;
  }catch(e){
    setStatus('ready','Using instant device voice',100); speakFallback(text);
    return false;
  }
};

window.prefetchLessonAudio=async(phrases,startIndex=0,onProgress=null)=>{
  const list=(phrases||[]).map(p=>Array.isArray(p)?p[0]:p).filter(Boolean);
  const key=list.join('|');
  if(preloadJobs.has(key))return preloadJobs.get(key);
  const job=(async()=>{
    try{
      const index=await buildAudioIndex();
      if(!index)throw new Error('Audio index unavailable');
      // Current phrase first, then the rest of the lesson. This makes the first Listen fast.
      const ordered=list.slice(Math.max(0,startIndex)).concat(list.slice(0,Math.max(0,startIndex)));
      const total=list.length;
      for(let n=0;n<ordered.length;n++){
        const text=ordered[n],url=index.get(String(text).trim());
        if(!url)throw new Error(`No audio for: ${text}`);
        await fetchAndCache(url);
        if(onProgress)onProgress(Math.min(total,n+1),total);
        window.dispatchEvent(new CustomEvent('speakflow-audio-prefetch',{detail:{index:n,total}}));
      }
      setStatus('ready','Kokoro US English ready',100);
    }catch(e){
      setStatus('error','Audio prefetch failed',0,String(e?.message||e));
      throw e;
    }finally{preloadJobs.delete(key);}
  })();
  preloadJobs.set(key,job);
  return job;
};

window.stopNeuralVoice=()=>{
  try{audioElement?.pause();}catch{}
  if(activeObjectUrl){try{URL.revokeObjectURL(activeObjectUrl);}catch{}activeObjectUrl=null;}
  if(audioElement){try{audioElement.removeAttribute('src');audioElement.load();}catch{}}
  activeAudio=null;
};

// Recover the media element when an iOS PWA returns from the background.
window.addEventListener('pageshow',()=>{if(audioElement){try{audioElement.load();}catch{}}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){try{audioElement?.pause();}catch{}}});

buildAudioIndex();
