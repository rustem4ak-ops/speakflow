// SpeakFlow 9.1 — reliable audio engine
const AUDIO_INDEX_URL='audio/index.json?v=9.1';
const CACHE_NAME='speakflow-audio-v9.1';
let audioIndex=null;
let audioElement=null;
let activeObjectUrl=null;
let preloadJobs=new Map();

window.voiceEngine={state:'loading',message:'Loading English audio…',progress:0,error:null};

function setStatus(state,message,progress=0,error=null){
  window.voiceEngine={state,message,progress,error};
  window.dispatchEvent(new CustomEvent('speakflow-voice-status',{detail:window.voiceEngine}));
}

function speakFallback(text){
  return new Promise(resolve=>{
    if(!('speechSynthesis' in window)){ resolve(false); return; }
    try{
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(String(text));
      u.lang='en-US';
      u.rate=.9;
      u.pitch=1;
      u.volume=1;
      u.onend=()=>resolve(true);
      u.onerror=()=>resolve(false);
      speechSynthesis.speak(u);
      // Some mobile browsers do not reliably fire onend.
      setTimeout(()=>resolve(true),120);
    }catch{resolve(false);}
  });
}

function ensureAudioElement(){
  if(audioElement)return audioElement;
  audioElement=document.createElement('audio');
  audioElement.preload='auto';
  audioElement.setAttribute('playsinline','');
  audioElement.playsInline=true;
  audioElement.style.position='fixed';
  audioElement.style.width='1px';
  audioElement.style.height='1px';
  audioElement.style.opacity='0';
  audioElement.style.pointerEvents='none';
  document.body.appendChild(audioElement);
  audioElement.addEventListener('ended',()=>{
    if(activeObjectUrl){try{URL.revokeObjectURL(activeObjectUrl)}catch{}activeObjectUrl=null;}
    setStatus('ready','English audio ready',100);
  });
  audioElement.addEventListener('error',()=>setStatus('ready','Using device English voice',100));
  return audioElement;
}

async function getCache(){try{return await caches.open(CACHE_NAME)}catch{return null}}

async function cachedBlob(url){
  const c=await getCache();if(!c)return null;
  try{const r=await c.match(url);return r?r.blob():null}catch{return null}
}

async function fetchAndCache(url){
  const cached=await cachedBlob(url);if(cached)return cached;
  const res=await fetch(url,{cache:'no-cache'});
  if(!res.ok)throw new Error('Audio file not found');
  const blob=await res.blob();
  const c=await getCache();
  if(c){try{await c.put(url,new Response(blob,{headers:{'Content-Type':res.headers.get('Content-Type')||'audio/mpeg'}}))}catch{}}
  return blob;
}

async function buildAudioIndex(){
  if(window.__speakflowAudioIndex)return window.__speakflowAudioIndex;
  try{
    setStatus('loading','Loading English audio…',20);
    const res=await fetch(AUDIO_INDEX_URL,{cache:'no-store'});
    if(!res.ok)throw new Error('Audio index unavailable');
    const json=await res.json();
    const index=new Map(Object.entries(json.phrases||{}).map(([phrase,url])=>[phrase.trim(),url]));
    window.__speakflowAudioIndex=index;
    setStatus('ready','English audio ready',100);
    return index;
  }catch(e){
    setStatus('ready','Instant device English voice ready',100);
    return null;
  }
}

async function audioPathForText(text){
  const index=await buildAudioIndex();
  return index?.get(String(text).trim())||null;
}

window.prepareNeuralVoice=async()=>{
  const first=window.__speakflowCourses?.[0]?.phrases?.[0]?.[0];
  if(!first){setStatus('ready','Instant device English voice ready',100);return false}
  const url=await audioPathForText(first);
  if(!url){setStatus('ready','Instant device English voice ready',100);return false}
  try{await fetchAndCache(url);setStatus('ready','English audio ready',100);return true}
  catch{setStatus('ready','Instant device English voice ready',100);return false}
};

window.neuralSpeak=async(text,opts={})=>{
  if(!text)return false;
  const url=await audioPathForText(text);
  if(!url){return await speakFallback(text)}
  try{
    const blob=await fetchAndCache(url);
    if(opts.cacheOnly)return true;
    const el=ensureAudioElement();
    if(activeObjectUrl){try{URL.revokeObjectURL(activeObjectUrl)}catch{}}
    try{el.pause()}catch{}
    activeObjectUrl=URL.createObjectURL(blob);
    el.src=activeObjectUrl;
    el.currentTime=0;
    el.load();
    await el.play();
    return true;
  }catch{
    setStatus('ready','Using instant device English voice',100);
    return await speakFallback(text);
  }
};

window.prefetchLessonAudio=async(phrases,startIndex=0,onProgress=null)=>{
  const list=(phrases||[]).map(p=>Array.isArray(p)?p[0]:p).filter(Boolean);
  const key=list.join('|');
  if(preloadJobs.has(key))return preloadJobs.get(key);
  const job=(async()=>{
    const index=await buildAudioIndex();
    if(!index)return;
    const ordered=list.slice(Math.max(0,startIndex)).concat(list.slice(0,Math.max(0,startIndex)));
    for(let n=0;n<ordered.length;n++){
      const url=index.get(String(ordered[n]).trim());
      if(url){try{await fetchAndCache(url)}catch{}}
      onProgress?.(n+1,list.length);
    }
  })().finally(()=>preloadJobs.delete(key));
  preloadJobs.set(key,job);
  return job;
};

window.stopNeuralVoice=()=>{
  try{audioElement?.pause()}catch{}
  if(activeObjectUrl){try{URL.revokeObjectURL(activeObjectUrl)}catch{}activeObjectUrl=null}
  if(audioElement){try{audioElement.removeAttribute('src');audioElement.load()}catch{}}
  try{speechSynthesis?.cancel()}catch{}
};

window.addEventListener('pageshow',()=>{try{audioElement?.load()}catch{}});
buildAudioIndex();