import json, hashlib, os, subprocess
from pathlib import Path
import numpy as np
from kokoro import KPipeline

ROOT=Path(__file__).resolve().parent
DATA=json.loads((ROOT/'data.json').read_text(encoding='utf-8'))
ALL=[]
for course in DATA:
    for text,_translation in course['phrases']:
        ALL.append(text.strip())

shard=int(os.getenv('SHARD_INDEX','0'))
total_shards=int(os.getenv('SHARD_TOTAL','1'))
items=ALL[shard::total_shards]
OUT=ROOT/'audio-shard'; OUT.mkdir(exist_ok=True)
for p in OUT.glob('*'): p.unlink()

pipeline=KPipeline(lang_code='a')
VOICE='af_heart'
SPEED=1.0
manifest={}

def key_for(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()[:16]

for n,text in enumerate(items,1):
    key=key_for(text)
    out=OUT/f'phrase-{key}.mp3'
    print(f'[shard {shard}/{total_shards} {n}/{len(items)}] {text}',flush=True)
    chunks=[]
    for _gs,_ps,audio in pipeline(text,voice=VOICE,speed=SPEED,split_pattern=r'\n+'):
        if audio is not None:
            chunks.append(audio.numpy())
    if not chunks:
        raise RuntimeError(f'No audio returned: {text}')
    pcm=np.concatenate(chunks).astype(np.float32).tobytes()
    proc=subprocess.run([
        'ffmpeg','-hide_banner','-loglevel','error','-y',
        '-f','f32le','-ar','24000','-ac','1','-i','pipe:0',
        '-codec:a','libmp3lame','-b:a','64k','-ac','1','-ar','24000',str(out)
    ],input=pcm,check=False)
    if proc.returncode!=0 or not out.exists() or out.stat().st_size<256:
        raise RuntimeError(f'ffmpeg failed for: {text}')
    manifest[text]=f'audio/{out.name}'

(OUT/'index.json').write_text(json.dumps({'version':'8.1','algorithm':'sha256-first-16','format':'mp3-64k-mono-24khz','phrases':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Generated {len(items)} files for shard {shard}. Total source phrases: {len(ALL)}',flush=True)
