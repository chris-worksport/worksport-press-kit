# Worksport Press Kit

A press kit for Worksport Ltd. (Nasdaq: WKSP), modelled on the Slate Auto press page: company facts and boilerplate, downloadable asset bundles, product overview, logos with usage rules, a filterable photo gallery with full-resolution downloads, leadership, recent press releases and media contacts. Dark graphite theme with Worksport blue.

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
| `js/press.js` | Data-driven sections: download bundles, products, logos, gallery images and press releases are arrays at the top of the file. Edit those to add or swap assets. `GALLERY_INITIAL` and `NEWS_INITIAL` set how many items show before "Show all". |
| `js/terravis.js` | The same data for the Terravis page. |
| `js/manifest.json` | File sizes shown on the cards. Regenerate with `python3 tools/build-manifest.py` after adding files. |
| `assets/logos/` | Worksport full logo, emblem and Nasdaq lockup (SVG, PNG, PDF) and product wordmarks (SVG/PNG, COR in EPS). |
| `assets/images/originals/` | Full-resolution photography (1,920 to 5,472 px). |
| `assets/images/web/` | Same images at 1,600 px JPEG, used by the lightbox. |
| `assets/images/thumbs/` | 720 px thumbnails used by the cards and gallery grid. |
| `assets/terravis/` | AetherLux renders (originals, 1,600 px web, 720 px thumbs). |
| `assets/leadership/` | CEO headshot. |
| `assets/docs/` | Worksport Brand Guide 2026 and Terravis Energy Brand Guide 2026 (PDF). Also filed in Box (Marketing › 1. Corporate Branding) and the TVE SharePoint library (05_Marketing › 1. TVE Media Asset Folder › Corporate Branding › 2. Brand Guide). |
| `assets/downloads/` | Zip bundles linked from the Downloads section. |

## Large files

GitHub rejects single files over 100 MB, so two bundles are not in this repository and must be uploaded to the host (Shopify Files, S3, etc.) alongside the page, or regenerated:

- `assets/downloads/Worksport-Press-Kit-All.zip` (about 190 MB)
- `assets/downloads/Worksport-Product-Images.zip` (about 130 MB)

To rebuild them from the originals in this repo, from the `press-kit` folder:

```
cd assets && zip -r downloads/Worksport-Press-Kit-All.zip logos images/originals leadership docs terravis/originals -x '*.DS_Store'
cd images/originals && zip ../../downloads/Worksport-Product-Images.zip nexus-* solis-* cor-* hd3-* al4-* all-* terravis-*
```

## Rebuilding the brand guide PDFs

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=assets/docs/Worksport-Brand-Guide-2026.pdf http://localhost:8000/brand-guide/worksport.html
```

Same for `brand-guide/terravis.html` → `assets/docs/Terravis-Energy-Brand-Guide-2026.pdf`, then rebuild the brand guide zips.

## Where the assets came from

- Logos, product wordmarks, fonts and the brand guide: OneDrive, `OLD - Marketing - Internal/.../Creative Development/1. Branding/Worksport`.
- Product and manufacturing photography: Box, `Marketing/3. Media Repository/3. Images` (Product-Specific and Not-Product-Specific), plus released lifestyle edits from `Creative Development/4. MediaDevelopment/3. Product-Media`.
- Boilerplate, contacts and company facts: the November 2026 AAM and Slate Auto press releases and investors.worksport.com.
- CEO headshot: Investor Relations file share.
- Terravis: logos from Box › Marketing › 1. Corporate Branding › Terravis Energy; AetherLux renders from Box › 3. Media Repository › 4. 3D Renders › Terravis; facts from the AetherLux launch brochure (TVE SharePoint › 05_Marketing › 2. Brochure).

## Before publishing

- Media contact is theskar@worksport.com on both pages; investor relations stays on the IR line.
- Leadership headshots other than the CEO and COO were pulled from investors.worksport.com, where most are small circular crops on white. Replace them with original full-frame headshots when marketing has them (drop the file in assets/leadership and update TEAM_EXEC / TEAM_BOARD in js/press.js).
- The ZeroFrost patent release has no day in its list entry (the IR post page carries no date); fill it in when known.
- Photography is the company's own shoots and renders. Confirm nothing in the gallery is customer UGC before it goes public.
