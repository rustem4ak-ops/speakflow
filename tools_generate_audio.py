import json, time, hashlib
from pathlib import Path
import soundfile as sf
from kokoro import KPipeline
import numpy as np

ROOT = Path(__file__).resolve().parent
DATA = json.loads((ROOT / "data.json").read_text(encoding="utf-8"))
OUT = ROOT / "audio"
OUT.mkdir(exist_ok=True)

# Delete all positional/legacy WAVs. 6.2 uses phrase-content filenames.
for old_wav in OUT.glob("*.wav"):
    old_wav.unlink()

pipeline = KPipeline(lang_code="a")
VOICE = "af_heart"
SPEED = 1.0

total = sum(len(c["phrases"]) for c in DATA)
done = 0

manifest = {}
for course in DATA:
    for text, _translation in course["phrases"]:
        key = hashlib.sha256(text.strip().encode("utf-8")).hexdigest()[:16]
        path = OUT / f"phrase-{key}.wav"
        done += 1
        print(f"[{done}/{total}] generating: {course['title']}: {text}")
        chunks = []
        for _gs, _ps, audio in pipeline(text, voice=VOICE, speed=SPEED, split_pattern=r"\n+"):
            if audio is not None:
                chunks.append(audio.numpy())
        if not chunks:
            raise RuntimeError(f"No audio returned for: {text}")
        audio = np.concatenate(chunks)
        sf.write(str(path), audio, 24000, subtype="PCM_16")
        manifest[text] = f"audio/phrase-{key}.wav"
        time.sleep(0.2)

(OUT / "index.json").write_text(json.dumps({
    "version":"6.2",
    "algorithm":"sha256-first-16",
    "phrases":manifest
}, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"All {total} Kokoro audio files generated and indexed by exact phrase.")
