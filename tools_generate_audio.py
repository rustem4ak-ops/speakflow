import json,time,hashlib
from pathlib import Path
import soundfile as sf
from kokoro import KPipeline
import numpy as np
ROOT=Path(__file__).resolve().parent
DATA=json.loads((ROOT/'data.json').read_text(encoding='utf-8'))
OUT=ROOT/'audio'; OUT.mkdir(exist_ok=True)
for p in OUT.glob('*.wav'): p.unlink()
(OUT/'index.json').unlink(missing_ok=True)
pipeline=KPipeline(lang_code='a'); VOICE='af_heart'; SPEED=1.0
phrases=[]
for c in DATA:
    for text,_ in c['phrases']: phrases.append(text)
manifest={}; total=len(phrases)
for n,text in enumerate(phrases,1):
    key=hashlib.sha256(text.strip().encode('utf-8')).hexdigest()[:16]
    path=OUT/f'phrase-{key}.wav'
    print(f'[{n}/{total}] {text}')
    chunks=[]
    for _gs,_ps,audio in pipeline(text,voice=VOICE,speed=SPEED,split_pattern=r'\n+'):
        if audio is not None: chunks.append(audio.numpy())
    if not chunks: raise RuntimeError(f'No audio returned: {text}')
    sf.write(str(path),np.concatenate(chunks),24000,subtype='PCM_16')
    manifest[text]=f'audio/phrase-{key}.wav'
    time.sleep(.03)
(OUT/'index.json').write_text(json.dumps({'version':'8.0','algorithm':'sha256-first-16','phrases':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Generated {total} exact phrase audio files.')
