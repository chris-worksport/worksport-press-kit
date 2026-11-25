# Worksport Press Kit

A single-page press kit for Worksport Ltd. (Nasdaq: WKSP), modelled on the Slate Auto press page: company facts and boilerplate, downloadable asset bundles, product overview, logos with usage rules, a filterable photo gallery with full-resolution downloads, leadership, recent press releases and media contacts.

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
| `index.html` | The page. Static copy lives here (hero, about, boilerplate, guidelines, leadership, contact). |
| `css/press.css` | All styles. Design tokens at the top match the worksport.com rebuild (Poppins, Worksport blue `#0072CE`). |
| `js/press.js` | Data-driven sections: download bundles, products, logos, gallery images and press releases are arrays at the top of the file. Edit those to add or swap assets. |
| `js/manifest.json` | File sizes shown on the cards. Regenerate with `python3 tools/build-manifest.py` after adding files. |
| `assets/logos/` | Worksport full logo, emblem and Nasdaq lockup (SVG, PNG, PDF) and product wordmarks (SVG/PNG, COR in EPS). |
| `assets/images/originals/` | Full-resolution photography (1,920 to 5,472 px). |
| `assets/images/web/` | Same images at 1,600 px JPEG, used by the lightbox. |
| `assets/images/thumbs/` | 720 px thumbnails used by the cards and gallery grid. |
| `assets/leadership/` | CEO headshot. |
| `assets/docs/` | Brand guide PDF. |
| `assets/downloads/` | Zip bundles linked from the Downloads section. |

## Large files

GitHub rejects single files over 100 MB, so two bundles are not in this repository and must be uploaded to the host (Shopify Files, S3, etc.) alongside the page, or regenerated:

- `assets/downloads/Worksport-Press-Kit-All.zip` (about 174 MB)
- `assets/downloads/Worksport-Product-Images.zip` (about 130 MB)

To rebuild them from the originals in this repo, from the `press-kit` folder:

```
cd assets && zip -r downloads/Worksport-Press-Kit-All.zip logos images/originals leadership docs -x '*.DS_Store'
cd images/originals && zip ../../downloads/Worksport-Product-Images.zip nexus-* solis-* cor-* hd3-* al4-* all-* terravis-*
```

## Where the assets came from

- Logos, product wordmarks, fonts and the brand guide: OneDrive, `OLD - Marketing - Internal/.../Creative Development/1. Branding/Worksport`.
- Product and manufacturing photography: Box, `Marketing/3. Media Repository/3. Images` (Product-Specific and Not-Product-Specific), plus released lifestyle edits from `Creative Development/4. MediaDevelopment/3. Product-Media`.
- Boilerplate, contacts and company facts: the November 2026 AAM and Slate Auto press releases and investors.worksport.com.
- CEO headshot: Investor Relations file share.

## Before publishing

- Confirm the media contact. The page uses the IR line (investors@worksport.com, 1-888-554-8789 x128) because no separate press contact exists in the releases.
- Add headshots and bios for other executives if wanted; the Leadership section is text-only beyond the CEO.
- Check the brand guidelines block against the current brand guide. The PDF in `assets/docs` is the 2022 draft (Avenir era); the usage rules on the page follow it, with Poppins per the 2026 font readme.
- Photography rights: images are the company's own shoots and renders. Confirm nothing in the gallery is customer UGC before it goes public.
