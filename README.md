# Worksport Press Kit

A press kit for Worksport Ltd. (Nasdaq: WKSP), modelled on the Slate Auto press page: company facts and boilerplate, downloadable asset bundles, a company timeline, product overview with brochures, logos with usage rules, a filterable photo gallery with per-image and per-set downloads, video, leadership, recent press releases and media contacts. Dark graphite theme with Worksport blue.

`terravis.html` is the Terravis Energy media room: the same structure in the Terravis look (black, Terravis yellow, Exo 2 headlines) with AetherLux renders, Terravis logos, facts and press. It shares `css/press.css` and the render functions in `js/press.js`; `css/terravis.css` overrides the tokens and `js/terravis.js` holds its data.

Live: https://chris-worksport.github.io/worksport-press-kit/ (Terravis: https://chris-worksport.github.io/worksport-press-kit/terravis.html)

Built as static HTML, CSS and vanilla JavaScript with no build step, so it can be dropped into any host (Shopify page with assets on the CDN, GitHub Pages, Webflow embed, or the investor site).

## Run it locally

Open `index.html` through any static server (a plain `file://` open blocks the manifest fetch in some browsers):

```
python3 -m http.server 8000
```

then visit http://localhost:8000/.

## Structure

| Path | What it is |
|---|---|
| `index.html` | The Worksport page. Static copy lives here (hero, about, boilerplate, guidelines, leadership, contact). |
| `terravis.html` | The Terravis Energy media room. |
| `brand-guide/*.html` | Sources for the two brand guide PDFs. Edit, then re-render with headless Chrome (see below). |
| `css/press.css` | All styles. Design tokens at the top match the worksport.com rebuild (Poppins, Worksport blue `#0072CE`). |
| `js/press.js` | Data-driven sections (each Downloads bundle also lists its `items()` so a click on the card browses the files in the lightbox): download bundles, products, logos, gallery images, videos, the timeline, social links and press releases are arrays at the top of the file. Edit those to add or swap assets. `GALLERY_INITIAL`, `NEWS_INITIAL`, `VIDEOS_INITIAL` and `TIMELINE_INITIAL` set how many items show before "Show all". A 4th value `'fit'` on an image shows the whole picture in its tile instead of cropping (studio renders). |
| `tools/update-news.py` | Pulls new press releases from investors.worksport.com/press into `NEWS` (and `TVE_NEWS` for Terravis items). Run it, review, then add any milestone to `TIMELINE` by hand. |
| `js/terravis.js` | The same data for the Terravis page. |
| `js/manifest.json` | File sizes shown on the cards. After running `python3 tools/build-manifest.py`, restore the existing entries for externally hosted files from the previous manifest. |
| `assets/logos/` | Worksport full logo, emblem and Nasdaq lockup (SVG, PNG, PDF) and product wordmarks (SVG/PNG, COR in EPS). |
| `assets/images/originals/` | Full-resolution photography (1,920 to 5,472 px). |
| `assets/images/web/` | Same images at 1,600 px JPEG, used by the lightbox. |
| `assets/images/thumbs/` | 720 px thumbnails used by the cards and gallery grid. |
| `assets/terravis/` | AetherLux renders (originals, 1,600 px web, 720 px thumbs). Outdoor-unit views are the November 2026 render package from the TVE Library (`Image Assets/AetherLux_Outdoor_Colour_Package`); interior and exploded views are conceptual. Home scenes are from `AetherLux_True3D_Winter.zip` in the same folder (modern winter environment; the earlier traditional-house renders were retired on 2026-11-25). |
| `assets/video/` | Video posters and locally hosted videos. The AetherLux commercial and selected large videos are hosted on Shopify; the 4K commercial master is in Box › Marketing › 3. Media Repository › 2. Videos › Video-Other › Non-Product Specific › 2025 › TVE. |
| `tools/transcode.swift` | AVFoundation re-encoder for making web copies of large videos: `swift tools/transcode.swift in.mp4 out.mp4 1280 2600`. |
| `assets/leadership/` | CEO headshot. |
| `assets/docs/` | Worksport Brand Guide 2026, Terravis Energy Brand Guide 2026, the AetherLux Launch Brochure (v5.6) and `brochures/` with the eight 2026 product tri-folds from Box (Marketing › 3. Media Repository › 5. Print › 2. B2B Marketing Collateral › Brochures). Also filed in Box (Marketing › 1. Corporate Branding) and the TVE SharePoint library (05_Marketing › 1. TVE Media Asset Folder › Corporate Branding › 2. Brand Guide). |
| `assets/downloads/` | Zip bundles linked from the Downloads section. |

## Large files

The large ZIP bundles are attached to the `press-assets-v1` GitHub Release, and selected large videos are hosted on Shopify. `RELEASE_BUNDLES` and `SHOPIFY_VIDEOS` in `js/press.js` map their original asset paths to those public URLs. Upload and verify replacements before changing the mappings; do not remove a release asset while it is still linked.

The two largest bundles are:

- `assets/downloads/Worksport-Press-Kit-All.zip` (about 390 MB)
- `assets/downloads/Worksport-Product-Images.zip` (about 325 MB)

Both are also kept in OneDrive: `1. Chris Bernaudo/_Claude/Website Builds/Worksport Press Kit - Large Downloads`. The "Download shown" buttons in the Images section do not depend on these: they zip the selected images in the browser (JSZip from cdnjs).

To rebuild them from the originals in this repo, from the `press-kit` folder:

```
cd assets
zip -r downloads/Worksport-Press-Kit-All.zip docs/Worksport-Brand-Guide-2026.pdf docs/brochures images/originals leadership logos/worksport logos/nasdaq logos/products -x '.*' -x '*/.DS_Store'
cd images/originals && ls | grep -v -E '^(factory-|campus-|steven-rossi|hero-)' | zip -@ ../../downloads/Worksport-Product-Images.zip
```

## Rebuilding the brand guide PDFs

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=assets/docs/Worksport-Brand-Guide-2026.pdf http://localhost:8000/brand-guide/worksport.html
```

Same for `brand-guide/terravis.html` → `assets/docs/Terravis-Energy-Brand-Guide-2026.pdf`, then rebuild the brand guide zips.

## Where the assets came from

- Logos, product wordmarks, fonts and the brand guide: OneDrive, `OLD - Marketing - Internal/.../Creative Development/1. Branding/Worksport`.
- Product and manufacturing photography: Box, `Marketing/3. Media Repository/3. Images` (Product-Specific and Not-Product-Specific), plus released lifestyle edits from `Creative Development/4. MediaDevelopment/3. Product-Media`.
- Boilerplate, contacts and company facts: the November 2026 AAM and Slate Auto press releases and investors.worksport.com. Timeline facts before 2024 (Nasdaq uplisting, campus purchase, Hyundai) come from the 2021 and 2022 releases and SEC filings, since the IR site listing only goes back to late 2024.
- Website images: `web-*` are the product carousels on worksport.com, `soft-*` the SC3/SC4 pages, `*-studio-*` the white-background product views and `info-*` the feature infographics (panel cross-sections, seals, latches, installation). Videos: Vimeo embeds on investors.worksport.com, the Worksport YouTube channel, the short product animation clips from the worksport.com and IR players (`assets/video/clip-*`), and finished films from Box › Marketing › 3. Media Repository › 2. Videos (`assets/video/box-*`: Factory Journey, SEMA 2025, Going Places and Truck Talk commercials, Behind the Brand episodes 1 to 3, product features films, testimonials). All re-encoded at 1280 px to stay under 80 MB each with tools/transcode.swift (bitrate chosen from duration); posters via tools/poster.swift. The batch used is in work/boxvid/batch.sh (gitignored). Terravis motion graphics come from the TVE Library's AetherLux_ESD_v11_Package/motion folder.
- CEO headshot: Investor Relations file share.
- Terravis: logos from Box › Marketing › 1. Corporate Branding › Terravis Energy; AetherLux renders from Box › 3. Media Repository › 4. 3D Renders › Terravis; facts from the AetherLux launch brochure (TVE SharePoint › 05_Marketing › 2. Brochure).

## Before publishing

- Media contact is marketing@worksport.com on both pages; investor relations stays on the IR line.
- Slate Auto Marketplace is under embargo until **December 3, 2026**: the timeline entry (commented out in TIMELINE), the About distribution sentence and the fast-facts partnership line go back on that day.
- When a new release goes up on the IR site: `python3 tools/update-news.py`, then add a `TIMELINE` entry in js/press.js if it is a milestone, commit and push.
- Leadership portraits (all except Steven Rossi's original) are the November 2026 edited set matched to a dark background; some were reconstructed from low-resolution sources. Replace any with studio originals when available (same filenames in assets/leadership).
- The ZeroFrost patent release has no day in its list entry (the IR post dateline is a placeholder, "May XX, 2026"); fill it in when known.
- The AetherLux brochure on the Terravis page is v5.6 from the TVE Library (05_Marketing › 2. Brochure › Zerofrost Brochures Oct 2026 › Brochure remake). Swap the file in assets/docs when a newer version is approved.
- Photography is the company's own shoots and renders. Confirm nothing in the gallery is customer UGC before it goes public.
