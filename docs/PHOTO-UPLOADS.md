# Campaign photograph upload guide

The site generates its own photo index from `public` at startup/build time. You do not edit components, JSON or routes when adding photos.

## Homepage slideshow
Save **three genuine campaign images** as:
- `public/images/hero/slide-01.webp`
- `public/images/hero/slide-02.webp`
- `public/images/hero/slide-03.webp`

Recommend landscape photos at least 1600×900 px, with the person slightly right of centre to leave space for text on the left. The carousel uses `object-cover` so mobile/desktop may crop edges but never stretch the photograph. Transparent overlays are applied by CSS, never baked into the image.

## Candidate portrait
- `public/images/candidate/candidate-portrait.webp`

Recommend high-resolution portrait orientation (e.g. 1200×1500). The same photo is used for homepage "The candidate" and About page. The original image retains its full integrity; the web card crops for consistent display.

## Automatic gallery
- `public/gallery/visit-to-prisoners/DSC_0372.jpg`
- `public/gallery/visit-to-prisoners/IMG_9472.webp`
- `public/gallery/community-outreach/camera-001.png`

Create as many subfolders under **public/gallery** as needed, using short descriptive folder names. The **folder name becomes the gallery title**, such as **Visit to Prisoners**. The image files themselves may have any ordinary filenames (letters, numbers, spaces, hyphens, periods, parentheses). Valid types: JPG, JPEG, PNG, WebP, AVIF; exclude videos, PSD, GIF, HEIC unless converted.

After committing/pushing images and triggering a successful Vercel build, the site automatically:
1. Discovers all nonempty gallery subfolders;
2. Converts their names into gallery titles and URL slugs;
3. Uses four stable-pseudorandom photographs as the album-cover 2×2 collage;
4. Lists each album’s full images in equal-aspect cards;
5. Opens original images (no forced cropping) in an accessible keyboard-supported lightbox.

Do not add captions to filenames unless you want them for your own organisation; filenames are never displayed to visitors.

**Local commands (Windows PowerShell):**
```powershell
cd C:\path\to\Musa-Ndakpayi
pnpm media:build
pnpm dev
```

When adding folders with a running dev server, rerun `pnpm media:build` and refresh. To publish, use `git add public/images public/gallery && git commit -m "Add campaign photos" && git push origin main`, after merging the feature PR. The Vercel Git integration must be connected so a push initiates a new build.

**Privacy and rights:** upload only photos that the campaign may lawfully publish, particularly when people in prisons, detention facilities, medical settings or vulnerable circumstances are identifiable. Confirm consent and appropriate permissions before placing such photographs on the public site. Avoid exposing sensitive identities or minors without appropriate lawful permission.

No image names or real photographs are fabricated in this repository. The public site uses a branded visual fallback until you provide real images.

## You can keep JPEG or PNG for the four named photo positions
If your photos are JPG/JPEG/PNG, you do not have to convert them to WebP. The homepage and candidate photo slots also accept:
- `public/images/hero/slide-01.jpg`, `slide-02.png`, `slide-03.jpeg`
- `public/images/candidate/candidate-portrait.jpg`

The base filename (`slide-01`, `slide-02`, `slide-03`, `candidate-portrait`) must match. Use **only one image per slot**; for example, don't keep `slide-01.jpg` alongside `slide-01.webp`. The build detects duplicate formats and reports an error. Conversion to WebP remains a good optimization but is optional. Never merely rename a JPEG to .webp.

**Seventeen-photo album behaviour:** A folder containing 17 supported images generates exactly 17 separate, fixed-aspect 4:3 cards (without duplicate images) on its album page. The album landing card uses four distinct preview images. Each album image opens at its natural aspect ratio in a modal. Click the dark background outside the picture (including the empty letterbox) or use the close button/Escape.
