import json, os, sys, time
from pathlib import Path
import soundfile as sf
from kokoro import KPipeline

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data.json").read_text(encoding="utf-8"))
OUT = ROOT / "audio"
OUT.mkdir(exist_ok=True)

pipeline = KPipeline(lang_code="a")
VOICE = "af_heart"
SPEED = 1.0

total = sum(len(c["phrases"]) for c in DATA)
done = 0

for course in DATA:
    for i, (text, _translation) in enumerate(course["phrases"], 1):
        path = OUT / f'{course["slug"]}-{i}.wav'
        done += 1
        if path.exists() and path.stat().st_size > 1000:
            print(f"[{done}/{total}] exists: {path.name}")
            continue

        print(f"[{done}/{total}] generating: {course['title']} #{i}: {text}")
        chunks = []
        for _gs, _ps, audio in pipeline(text, voice=VOICE, speed=SPEED, split_pattern=r"\n+"):
            if audio is not None:
                chunks.append(audio.numpy())
        if not chunks:
            raise RuntimeError(f"No audio returned for: {text}")
        import numpy as np
        audio = np.concatenate(chunks)
        sf.write(str(path), audio, 24000, subtype="PCM_16")
        time.sleep(0.2)

print("All Kokoro audio generated.")
