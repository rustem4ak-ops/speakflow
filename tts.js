import { PiperPlus } from 'piper-plus';
import * as ort from 'onnxruntime-web';

// Single-speaker US English voice. The model is MIT-licensed; model card: en_US, 1 speaker.
const MODEL_URL = 'https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/kusal/medium/en_US-kusal-medium.onnx';
const CACHE_NAME = 'speakflow-audio-v5';
let enginePromise = null;
let activeAudio = null;

window.voiceEngine = {state:'idle',message:'US English voice is ready to load.',progress:0,error:null};
function setStatus(state,message,progress=0,error=null){window.voiceEngine={state,message,progress,error};window.dispatchEvent(new CustomEvent('speakflow-voice-status',{detail:window.voiceEngine}));}
function cacheKey(text){return new Request(`${location.origin}${location.pathname}__audio__/${encodeURIComponent(text)}`);}
async function getCache(){try{return await caches.open(CACHE_NAME)}catch{return null}}
async function getCached(text){const c=await getCache();if(!c)return null;const r=await c.match(cacheKey(text));return r||null}
async function putCached(text,blob){const c=await getCache();if(!c)return;await c.put(cacheKey(text),new Response(blob,{headers:{'Content-Type':'audio/wav','Cache-Control':'public, max-age=31536000'} }));}
async function getEngine(){
  if(!enginePromise){
    setStatus('loading','Downloading US English voice…',0);
    enginePromise=PiperPlus.initialize({model:MODEL_URL,ort,onProgress:({stage,progress,message})=>{setStatus('loading',message||stage||'Loading voice…',Math.round((progress||0)*100));}}).then(engine=>{setStatus('ready','US English voice ready',100);return engine}).catch(err=>{enginePromise=null;setStatus('error','US English voice could not be loaded',0,String(err?.message||err));throw err});
  }
  return enginePromise;
}
window.prepareNeuralVoice=()=>getEngine().catch(()=>null);

window.neuralSpeak=async function(text,opts={}){
  if(!text)return false;
  try{
    const cached=await getCached(text);
    if(cached){
      if(opts.cacheOnly)return true;
      if(activeAudio){try{activeAudio.pause()}catch{}activeAudio=null}
      activeAudio=new Audio(URL.createObjectURL(await cached.blob()));
      activeAudio.onended=()=>{URL.revokeObjectURL(activeAudio.src);activeAudio=null;setStatus('ready','US English voice ready',100)};
      await activeAudio.play();
      return true;
    }
    setStatus('synthesizing','Generating lesson audio…',100);
    const tts=await getEngine();
    if(!tts)return false;
    const result=await tts.synthesize(text,{language:'en',lengthScale:0.98,noiseScale:0.55,noiseW:0.65});
    const blob=result.toBlob();
    await putCached(text,blob);
    if(opts.cacheOnly)return true;
    if(activeAudio){try{activeAudio.pause()}catch{}activeAudio=null}
    activeAudio=new Audio(URL.createObjectURL(blob));
    activeAudio.onended=()=>{URL.revokeObjectURL(activeAudio.src);activeAudio=null;setStatus('ready','US English voice ready',100)};
    await activeAudio.play();
    return true;
  }catch(err){setStatus('error','US English voice failed',0,String(err?.message||err));return false;}
};
window.stopNeuralVoice=()=>{try{activeAudio?.pause()}catch{}if(activeAudio?.src?.startsWith('blob:'))URL.revokeObjectURL(activeAudio.src);activeAudio=null};
