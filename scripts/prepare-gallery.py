"""Generate responsive, lossless-WebP display derivatives; keep source files intact."""
from pathlib import Path
from PIL import Image, ImageOps
import json
root=Path(__file__).resolve().parents[1]
photos=root/'public/assets/photography'
manifest=json.loads((root/'src/photography-source.json').read_text())
files=[photos/p['file'] for p in manifest]+[root/'public/assets/running'/n for n in ['school-1500m.png','shanghaitech-400m-silver.png','changjiang-half-2025-banner.png']]
before=after=0
for file in files:
 with Image.open(file) as opened:
  im=ImageOps.exif_transpose(opened).convert('RGB')
  if file.suffix=='.png':
   dest=file.with_suffix('.webp');im.save(dest,'WEBP',lossless=True,method=6)
   with Image.open(dest) as check: assert check.convert('RGB').tobytes()==im.tobytes()
   before+=file.stat().st_size;after+=dest.stat().st_size
  for width in [320,640]:
   thumb=im.copy();thumb.thumbnail((width,width*4),Image.Resampling.LANCZOS)
   thumb.save(file.with_name(file.stem+f'-{width}.webp'),'WEBP',lossless=True,method=6)
print(f'Full-size PNGs: {before:,} -> {after:,} bytes (lossless; identical RGB pixels).')
