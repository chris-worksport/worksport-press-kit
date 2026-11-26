/* Worksport Press Kit — data and behaviour.
   Edit the data blocks at the top to add or swap assets. File sizes come from js/manifest.json
   (regenerate with tools/build-manifest.py after adding files).
   The Terravis media room (terravis.html) reuses the render functions below with its own data: see js/terravis.js. */

const ASSET_BASE = 'assets/';

/* ---------- Download bundles ----------
   Each bundle has a zip (file) and items(): the files inside it, so a click on the card opens them in the lightbox
   one at a time while the arrow button downloads the whole zip. */
const BUNDLES = [
  { file: 'downloads/Worksport-Press-Kit-All.zip', name: 'Worksport Press Kit — Everything', thumb: 'images/thumbs/nexus-lifestyle-red-f150.jpg',
    desc: 'Logos, full-resolution product and campus photography, leadership headshots and the brand guide in one archive. Terravis Energy assets are in the Terravis media room.', all: true,
    items: () => [...IMAGES.map(imageItem), ...logoItems(BRAND_LOGOS, PRODUCT_LOGOS), ...teamItems(), ...brochureItems(), pdfItem('Worksport Brand Guide 2026', 'docs/Worksport-Brand-Guide-2026.pdf')] },
  { file: 'downloads/Worksport-Logos.zip', name: 'Worksport Logos', thumb: 'logos/worksport/WKSP-FullLogo-ColoredBlack-PNG.png', pad: true,
    desc: 'Full logo, emblem and Nasdaq: WKSP lockup in SVG, PNG and PDF. Product wordmarks for NEXUS, HD3, AL4, AL3, SC4, SC3, SOLIS and COR.',
    items: () => logoItems(BRAND_LOGOS, PRODUCT_LOGOS) },
  { file: 'downloads/Worksport-Product-Images.zip', name: 'Product Photography (Full Resolution)', thumb: 'images/thumbs/solis-cor-jeep-canyon.jpg',
    desc: 'NEXUS, HD3, AL4, SOLIS and COR lifestyle and studio imagery, up to 5,000 px wide.',
    items: () => IMAGES.filter(i => i[2] !== 'factory' && !i[0].startsWith('web-')).map(imageItem) },
  { file: 'downloads/Worksport-Manufacturing-Images.zip', name: 'Worksport Campus & Manufacturing', thumb: 'images/thumbs/factory-assembly-line.jpg',
    desc: 'The 152,000 sq. ft. Worksport Campus in West Seneca, New York: production floor, assembly and campus exterior.',
    items: () => IMAGES.filter(i => i[2] === 'factory').map(imageItem) },
  { file: 'downloads/Worksport-Web-Ready-Images.zip', name: 'Web-Ready Images', thumb: 'images/thumbs/hd3-silver-truck-mountains.jpg',
    desc: 'Every photo in this kit resized to 1,600 px JPEG for web and social use.',
    items: () => IMAGES.map(i => imageItem(i, true)) },
  { file: 'downloads/Worksport-Leadership-Headshots.zip', name: 'Leadership Headshots', thumb: 'leadership/Steven-Rossi-CEO.jpg', pos: 'top',
    desc: 'Steven Rossi, the executive team and the board of directors. Square portraits on a dark background.',
    items: () => teamItems() },
  { file: 'downloads/Worksport-Product-Brochures.zip', name: 'Product Brochures (PDF)', thumb: 'images/thumbs/all-hard-covers-lineup.jpg',
    desc: 'The 2026 tri-fold brochures for NEXUS, HD3, AL4, AL3, SC4, SC3, SOLIS and COR: specs, features and fitment in print-ready PDF.',
    items: () => brochureItems() },
  { file: 'downloads/Worksport-Website-Images.zip', name: 'Website Product Images', thumb: 'images/thumbs/web-nexus-01.jpg',
    desc: 'The product carousel images from worksport.com, 1,260 to 5,040 px wide, as individual files.',
    items: () => IMAGES.filter(i => i[0].startsWith('web-')).map(imageItem) },
  { file: 'downloads/Worksport-Brand-Guide.zip', name: 'Brand Guide (PDF)', thumb: 'logos/worksport/WKSP-Emblem-Blue-PNG.png', pad: true,
    desc: 'Logo usage, colour and typography for Worksport and its product wordmarks, 2026 edition.',
    items: () => [pdfItem('Worksport Brand Guide 2026', 'docs/Worksport-Brand-Guide-2026.pdf')] },
];

/* ---------- Products ---------- */
const PRODUCTS = [
  { id: 'nexus', tag: 'Hard tonneau cover', name: 'NEXUS', logo: 'logos/products/NEXUS/Nexus_FullFormat-H-White-REV-A.png', img: 'images/thumbs/nexus-lifestyle-red-f150.jpg',
    desc: 'Worksport’s flagship flip-up hard tonneau cover with proprietary single-side operation. Launched into commercial production in April 2026 and made at the Worksport Campus in West Seneca, New York.',
    links: [['Product page', 'https://www.worksport.com/products/nexus'], ['Brochure (PDF)', 'assets/docs/brochures/Worksport-NEXUS-Brochure-2026.pdf'], ['Logo files', '#logos']] },
  { id: 'hd3', tag: 'Heavy-duty tonneau cover', name: 'HD3', logo: 'logos/products/HD3/HD3_FullFormat-White.png', img: 'images/thumbs/hd3-silver-truck-mountains.jpg',
    desc: 'Heavy-duty tri-fold hard cover built for work and fleet use. In production since October 2025 and sold through dealers and distributors across North America.',
    links: [['Product page', 'https://www.worksport.com/products/hd3'], ['Brochure (PDF)', 'assets/docs/brochures/Worksport-HD3-Brochure-2026.pdf'], ['Logo files', '#logos']] },
  { id: 'al4', tag: 'Premium tonneau cover', name: 'AL4', logo: 'logos/products/AL4/AL4_FullFormat-White.png', img: 'images/thumbs/al4-gmc-sierra-lumber.jpg',
    desc: 'Premium hard-folding tonneau cover, designed and manufactured in-house. The AL4 was Worksport’s first U.S.-made cover and anchored the company’s 2025 growth.',
    links: [['Product page', 'https://www.worksport.com/products/al4'], ['Brochure (PDF)', 'assets/docs/brochures/Worksport-AL4-Brochure-2026.pdf'], ['Logo files', '#logos']] },
  { id: 'solis', tag: 'Solar tonneau cover', name: 'SOLIS', logo: 'logos/products/SOLIS/SOLIS_FullFormat-White.png', img: 'images/thumbs/solis-open-panels-tundra.jpg',
    desc: 'A folding solar tonneau cover that turns the truck bed into a power source, generating up to 650 watts. Sold on its own, and the subject of Worksport’s active partnership with Hyundai.',
    links: [['Product page', 'https://www.worksport.com/products/solis'], ['Brochure (PDF)', 'assets/docs/brochures/Worksport-SOLIS-Brochure-2026.pdf'], ['Logo files', '#logos']] },
  { id: 'cor', tag: 'Portable energy system', name: 'COR', logo: 'logos/products/COR/COR-FullLogo-Rev-White-PNG.png', img: 'images/thumbs/cor-battery-studio.jpg', fit: true,
    desc: 'Portable battery generator and mobile energy storage system, sold on its own. UL and CSA certified and available through worksport.com and Amazon; charges from SOLIS, the wall or the vehicle.',
    links: [['Product page', 'https://www.worksport.com/products/cor'], ['Brochure (PDF)', 'assets/docs/brochures/Worksport-COR-Brochure-2026.pdf'], ['Logo files', '#logos']] },
  { id: 'accessories', tag: 'Accessories', name: 'SOLIS & COR accessories', logo: null, img: 'images/thumbs/cor-home-use.jpg',
    desc: 'Add-on COR battery packs (1 kWh each), the COR battery charger and the accessories that let SOLIS and COR work together as one mobile power system.',
    links: [['Shop accessories', 'https://www.worksport.com/products/cor']] },
];

/* ---------- Brand logos ---------- */
const BRAND_LOGOS = [
  { name: 'Full logo — colour on light', bg: '', src: 'logos/worksport/WKSP-FullLogo-ColoredBlack-PNG.png', files: { SVG: 'logos/worksport/WKSP-FullLogo-ColoredBlack-SVG.svg', PNG: 'logos/worksport/WKSP-FullLogo-ColoredBlack-PNG.png' } },
  { name: 'Full logo — colour on dark', bg: 'dark', src: 'logos/worksport/WKSP-FullLogo-ColoredWhite-PNG.png', files: { SVG: 'logos/worksport/WKSP-FullLogo-ColoredWhite-SVG.svg', PNG: 'logos/worksport/WKSP-FullLogo-ColoredWhite-PNG.png' } },
  { name: 'Full logo — black', bg: '', src: 'logos/worksport/WKSP-FullLogo-Black-PNG.png', files: { SVG: 'logos/worksport/WKSP-FullLogo-Black-SVG.svg', PNG: 'logos/worksport/WKSP-FullLogo-Black-PNG.png' } },
  { name: 'Full logo — white', bg: 'blue', src: 'logos/worksport/WKSP-FullLogo-White-PNG.png', files: { SVG: 'logos/worksport/WKSP-FullLogo-White-SVG.svg', PNG: 'logos/worksport/WKSP-FullLogo-White-PNG.png' } },
  { name: 'Emblem — blue', bg: '', emblem: true, src: 'logos/worksport/WKSP-Emblem-Blue-PNG.png', files: { SVG: 'logos/worksport/WKSP-Emblem-Blue-SVG.svg', PNG: 'logos/worksport/WKSP-Emblem-Blue-PNG.png' } },
  { name: 'Emblem — black', bg: '', emblem: true, src: 'logos/worksport/WKSP-Emblem-Black-PNG.png', files: { SVG: 'logos/worksport/WKSP-Emblem-Black-SVG.svg', PNG: 'logos/worksport/WKSP-Emblem-Black-PNG.png' } },
  { name: 'Emblem — white', bg: 'dark', emblem: true, src: 'logos/worksport/WKSP-Emblem-White-PNG.png', files: { SVG: 'logos/worksport/WKSP-Emblem-White-SVG.svg', PNG: 'logos/worksport/WKSP-Emblem-White-PNG.png' } },
  { name: 'Nasdaq: WKSP lockup', bg: '', src: 'logos/nasdaq/NASDAQ-WKSP-Black-PNG.png', files: { SVG: 'logos/nasdaq/NASDAQ-WKSP-Black-SVG.svg', PNG: 'logos/nasdaq/NASDAQ-WKSP-Black-PNG.png', 'SVG (white)': 'logos/nasdaq/NASDAQ-WKSP-White-SVG.svg', 'PNG (white)': 'logos/nasdaq/NASDAQ-WKSP-White-PNG.png' } },
];

const PRODUCT_LOGOS = [
  { name: 'NEXUS', light: 'logos/products/NEXUS/Nexus_FullFormat-H-Black-REV-A.png', dark: 'logos/products/NEXUS/Nexus_FullFormat-H-White-REV-A.png', svg: 'logos/products/NEXUS/Nexus_FullFormat-H-Black-REV-A.svg' },
  { name: 'HD3', light: 'logos/products/HD3/HD3_FullFormat-Black.png', dark: 'logos/products/HD3/HD3_FullFormat-White.png', svg: 'logos/products/HD3/HD3_FullFormat-Black.svg' },
  { name: 'AL4', light: 'logos/products/AL4/AL4_FullFormat-Black.png', dark: 'logos/products/AL4/AL4_FullFormat-White.png', svg: 'logos/products/AL4/AL4_FullFormat-Black.svg' },
  { name: 'AL3', light: 'logos/products/AL3/AL3_FullFormat-Black.png', dark: 'logos/products/AL3/AL3_FullFormat-White.png', svg: 'logos/products/AL3/AL3_FullFormat-Black.svg' },
  { name: 'SC4', light: 'logos/products/SC4/SC4_FullFormat-Black.png', dark: 'logos/products/SC4/SC4_FullFormat-White.png', svg: 'logos/products/SC4/SC4_FullFormat-Black.svg' },
  { name: 'SC3', light: 'logos/products/SC3/SC3_FullFormat-Black.png', dark: 'logos/products/SC3/SC3_FullFormat-White.png', svg: 'logos/products/SC3/SC3_FullFormat-Black.svg' },
  { name: 'SOLIS', light: 'logos/products/SOLIS/SOLIS_FullFormat-Black.png', dark: 'logos/products/SOLIS/SOLIS_FullFormat-White.png', svg: 'logos/products/SOLIS/SOLIS_FullFormat-Black.svg' },
  { name: 'COR', light: 'logos/products/COR/COR-FullLogo-Rev-Black-PNG.png', dark: 'logos/products/COR/COR-FullLogo-Rev-White-PNG.png', svg: 'logos/products/COR/COR-FullLogo-Rev-Black-EPS.eps', svgLabel: 'EPS' },
];

/* ---------- Image gallery (file = name in images/originals; thumb/web share the name as .jpg)
   Optional 4th value 'fit' shows the whole image in the tile; optional 5th value is the tile background colour behind a fitted image. ---------- */
const IMAGES = [
  ['nexus-lifestyle-red-f150.jpg', 'NEXUS on a Ford F-150', 'nexus'],
  ['solis-cor-jeep-canyon.jpg', 'SOLIS and COR, canyon', 'solis'],
  ['hd3-silver-truck-mountains.jpg', 'HD3 in the mountains', 'hd3'],
  ['factory-assembly-line.jpg', 'Assembly line, Worksport Campus', 'factory'],
  ['nexus-open-bed-gear.jpg', 'NEXUS flipped open, bed loaded', 'nexus'],
  ['solis-ford-f150.jpg', 'SOLIS on a Ford F-150', 'solis'],
  ['al4-gmc-sierra-lumber.png', 'AL4 on a GMC Sierra', 'hd3'],
  ['cor-portable-battery-render.jpg', 'COR portable battery', 'solis'],
  ['nexus-blue-f150-road.jpg', 'NEXUS on the road', 'nexus'],
  ['nexus-hand-release.jpg', 'NEXUS release handle', 'nexus'],
  ['nexus-tailgate-work.jpg', 'NEXUS at the tailgate', 'nexus'],
  ['nexus-fall-grey-truck.png', 'NEXUS, fall shoot', 'nexus'],
  ['nexus-fall-loading.png', 'Loading under a NEXUS', 'nexus'],
  ['hd3-outdoor-f150-mountains.png', 'HD3 on a Ford F-150', 'hd3'],
  ['hd3-grey-truck-site.jpg', 'HD3 on the job site', 'hd3'],
  ['al4-dodge-ram-rambox.png', 'AL4 on a Ram 1500', 'hd3'],
  ['al4-toyota-tundra-barn.png', 'AL4 on a Toyota Tundra', 'hd3'],
  ['all-hard-covers-lineup.jpg', 'Worksport hard cover line-up', 'hd3'],
  ['solis-jeep-gladiator.jpg', 'SOLIS on a Jeep Gladiator', 'solis'],
  ['solis-open-panels-tundra.jpg', 'SOLIS panels deployed', 'solis'],
  ['solis-folded-barn.jpg', 'SOLIS folded', 'solis'],
  ['solis-lifestyle-sunset.png', 'SOLIS at sunset', 'solis'],
  ['solis-lifestyle-golden-hour.png', 'SOLIS, golden hour', 'solis'],
  ['solis-cor-dodge-night.jpg', 'SOLIS and COR at night', 'solis'],
  ['solis-cor-hero-closeup.jpg', 'SOLIS and COR close-up', 'solis'],
  ['cor-battery-studio.png', 'COR, studio', 'solis', 'fit'],
  ['cor-home-use.jpg', 'COR at home', 'solis'],
  ['cor-moving-day.jpg', 'COR on moving day', 'solis'],
  ['solis-nexus-cor-family.png', 'SOLIS, NEXUS and COR', 'solis'],
  ['terravis-dodge-worksite.jpg', 'SOLIS and COR on site', 'solis'],
  ['factory-floor-overview.jpg', 'Worksport Campus production floor', 'factory'],
  ['factory-panel-assembly.jpg', 'Panel assembly', 'factory'],
  ['factory-production-cell.jpg', 'Production cell', 'factory'],
  ['factory-press-line.jpg', 'Press line', 'factory'],
  ['factory-panel-build.jpg', 'Building a panel', 'factory'],
  ['factory-rail-inventory.jpg', 'Rail inventory', 'factory'],
  ['campus-exterior-flags.jpg', 'Worksport Campus, West Seneca, NY', 'factory'],
  /* Product carousel images from worksport.com (file names keep the site's numbering) */
  ['web-nexus-01.jpg', 'NEXUS, worksport.com', 'nexus'],
  ['web-nexus-02.jpg', 'NEXUS on a red truck, worksport.com', 'nexus'],
  ['web-nexus-04.jpg', 'NEXUS, orange truck, worksport.com', 'nexus'],
  ['web-nexus-05.jpg', 'NEXUS open bed, worksport.com', 'nexus'],
  ['web-nexus-07.jpg', 'Loading under a NEXUS, worksport.com', 'nexus'],
  ['web-nexus-09.jpg', 'NEXUS latch, worksport.com', 'nexus'],
  ['web-hd3-01.jpg', 'HD3 in the mountains, worksport.com', 'hd3'],
  ['web-hd3-02.jpg', 'HD3 on the job, worksport.com', 'hd3'],
  ['web-hd3-03.jpg', 'HD3 on a black truck, worksport.com', 'hd3'],
  ['web-hd3-04.jpg', 'HD3 release, worksport.com', 'hd3'],
  ['web-al4-01.png', 'AL4 on a silver truck, worksport.com', 'hd3'],
  ['web-al4-06.png', 'AL4 on a Ram, worksport.com', 'hd3'],
  ['web-al4-08.png', 'AL4 panel detail, worksport.com', 'hd3'],
  ['web-al3-02.png', 'AL3 with gear, worksport.com', 'hd3'],
  ['web-al3-04.png', 'AL3 on a white truck, worksport.com', 'hd3'],
  ['web-solis-keagan-02.jpg', 'SOLIS deployed, worksport.com', 'solis'],
  ['web-solis-frank-04.jpg', 'SOLIS and COR at the tailgate, worksport.com', 'solis'],
  ['web-solis-tbs-01.jpg', 'SOLIS folded, worksport.com', 'solis'],
  ['web-solis-01.png', 'SOLIS on a silver truck, worksport.com', 'solis'],
  ['web-solis-03.png', 'SOLIS panels open, worksport.com', 'solis'],
  ['web-solis-07.jpg', 'SOLIS in snow, worksport.com', 'solis'],
  ['web-cor-tbs-01.jpg', 'COR at the tailgate, worksport.com', 'solis'],
  ['web-cor-tbs-03.jpg', 'COR at camp, worksport.com', 'solis'],
  ['web-cor-01.png', 'COR in the bed, worksport.com', 'solis'],
  ['web-cor-03.png', 'COR on the bench, worksport.com', 'solis'],
  ['web-cor-07.png', 'COR display, worksport.com', 'solis'],
  ['web-cor-08.jpg', 'COR on site, worksport.com', 'solis'],
];

/* ---------- Video (click a poster to play; posters are in assets/video/).
   src 'yt' or 'vimeo' with id, or src 'mp4' with file (path under assets/) and poster. ---------- */
const VIDEOS_INITIAL = 6;
const VIDEOS = [
  { src: 'vimeo', id: '1021123467', title: 'Worksport campaign video', note: 'Brand film, 4 min · investors.worksport.com', mp4: 'https://cdn.prod.website-files.com/675add148ab8737131a0a937/675add148ab8737131a0aa5b_Worksport%20Campaign%20Video_1-transcode.mp4' },
  { src: 'vimeo', id: '1035606502', title: 'Live interview at the Nasdaq MarketSite with CEO Steven Rossi', note: '6 min · investors.worksport.com' },
  { src: 'vimeo', id: '1037805972', title: 'Creating 280 new jobs: expanding production at the West Seneca campus', note: '3 min · investors.worksport.com' },
  { src: 'yt', id: '_Jp9CY-74DM', title: 'Tonneau cover tech hasn’t changed in 20 years: why NEXUS exists', note: 'YouTube · Worksport' },
  { src: 'yt', id: '5Tk5nwn2XKo', title: 'Inside the Worksport factory: how it runs every day', note: 'YouTube · Worksport' },
  { src: 'yt', id: 'hQtDqjoLtlE', title: 'Solar tonneau cover: why you can throw weight on it', note: 'YouTube · SOLIS' },
  { src: 'yt', id: '4AfKYQJ7YXE', title: 'Flip-up tonneau cover: why open both sides ever again?', note: 'YouTube · NEXUS' },
  { src: 'yt', id: 'bsGoVrZO45E', title: 'Portable power station with a battery that pops out and goes', note: 'YouTube · COR' },
  { src: 'yt', id: 'hU8BqjyHUjo', title: 'Portable power station uses you never thought of', note: 'YouTube · COR' },
  { src: 'yt', id: 'WsfkLT8sYeA', title: 'Hard tonneau cover vs 396 lbs of limestone', note: 'YouTube · HD3' },
  { src: 'yt', id: 'oQ3LwJ6lqSY', title: 'Auto-latching tonneau cover: once you try it, no going back', note: 'YouTube · NEXUS' },
  { src: 'yt', id: '93aZHa1tI70', title: 'Behind the build: the people and engineering behind Worksport', note: 'YouTube · short' },
];

/* ---------- Team (photo = file in leadership/) ---------- */
const TEAM_EXEC = [
  ['Chris Bernaudo', 'Chief Operations Officer', 'Chris-Bernaudo-COO.jpg'],
  ['Jennifer Kartychak', 'Chief Financial Officer', 'Jennifer-Kartychak.jpg'],
  ['Nilay Choksi', 'General Counsel', 'Nilay-Choksi.jpg'],
  ['Tyler Sunderville', 'Director of Operations, West Seneca Factory', 'Tyler-Sunderville.jpg'],
  ['Chris Lofstrand', 'Operational Controller', 'Chris-Lofstrand.jpg'],
  ['Chris Lundberg', 'Sales Manager', 'Chris-Lundberg.jpg'],
  ['Josh Swanigan', 'Sales Manager', 'Josh-Swanigan.jpg'],
];
const TEAM_BOARD = [
  ['Steven Rossi', 'Founder & CEO, Chairman', 'Steven-Rossi-CEO.jpg'],
  ['Lorenzo Rossi', 'Director', 'Lorenzo-Rossi.jpg'],
  ['Bill Caragol', 'Independent Director', 'Bill-Caragol.jpg'],
  ['Amb. Ned Siegel', 'Independent Director', 'Ned-Siegel.jpg'],
  ['Craig Loverock', 'Independent Director', 'Craig-Loverock.jpg'],
];

const GALLERY_INITIAL = 8;   /* images shown before "Show all" */
const NEWS_INITIAL = 6;      /* releases shown before "Show more" */

/* ---------- Press releases (newest first) ---------- */
const NEWS = [
  ['November 24, 2026', 'U.S. Manufacturer Worksport Signs Largest Distribution Agreement to Date With The AAM Group, Gaining Access to About 11,500 Jobber Locations and 60+ Distribution Centers for NEXUS and HD3', 'https://investors.worksport.com/post/u-s-manufacturer-worksport-nasdaq-wksp-signs-largest-distribution-agreement-to-date-with-the-aam-group-gaining-access-to-aams-north-american-truck-accessory-network-of-about-11-500-jobber-locations-and-60-distribution-centers'],
  ['November 10, 2026', 'Worksport Q3 Net Sales Increase 44.2% Year-Over-Year to a Record $7.2 Million as Net Loss Narrows 28%', 'https://investors.worksport.com/post/worksport-nasdaq-wksp-q3-net-sales-increase-44-2-year-over-year-to-a-record-7-2-million-q3-revenue-rises-44-to-record-7-23-million-as-net-loss-narrows-28'],
  ['November 4, 2026', 'Worksport Signs Term Sheet to Acquire U.S. Manufactured Truck Bed Accessory Business & Accompanying IP Portfolio', 'https://investors.worksport.com/post/worksport-signs-term-sheet-to-acquire-u-s-manufactured-truck-bed-accessory-business-accompanying-ip-portfolio'],
  ['November 3, 2026', 'Worksport Reports Preliminary Q3 Results, Reduces Operating Cash Use 89% from Second Quarter; Delivers Record Net Sales of Approximately $7.24 Million', 'https://investors.worksport.com/post/worksport-reports-preliminary-q3-results-reduces-operating-cash-use-89-from-second-quarter-to-approximately-0-37-million-delivers-record-net-sales-of-approximately-7-24-million'],
  ['October 6, 2026', 'Worksport Books $2.92M August Orders; Annualized Order Run Rate Reaches $35M', 'https://investors.worksport.com/post/worksport-nasdaq-wksp-books-2-92m-august-orders-annualized-order-run-rate-reaches-35m'],
  ['September 30, 2026', 'Worksport COR Energy System Now Available Through Amazon', 'https://investors.worksport.com/post/worksport-cor-energy-system-now-available-through-amazon'],
  ['September 10, 2026', 'Worksport Invites Shareholders to September 15 CEO Town Hall', 'https://investors.worksport.com/post/worksport-nasdaq-wksp-invites-shareholders-to-september-15-ceo-town-hall'],
  ['August 25, 2026', 'Worksport Posts Record $2.5M July Orders; Seven-Month Consecutive Sales Climb Continues; $30M ARR', 'https://investors.worksport.com/post/worksport-nasdaq-wksp-posts-record-2-5m-july-orders-seven-month-consecutive-sales-climb-continues-30m-arr'],
  ['August 11, 2026', 'Worksport Announces Q2 2026 Earnings Call and Investor Town Hall', 'https://investors.worksport.com/post/worksport-announces-q2-2026-earnings-call-and-investor-town-hall-for-august-11-2026-ceo-believes-current-market-valuation-does-not-yet-fully-reflect-recent-positive-operating-progress'],
  ['July 23, 2026', 'Worksport Announces 132% Gross Profit Growth from April to June; June 2026 Marks Strongest Month in Company History', 'https://investors.worksport.com/post/worksport-announces-132-gross-profit-growth-from-april-to-june-june-2026-marks-strongest-month-in-company-history'],
  ['June 25, 2026', 'Worksport Regains $1 Bid Price Requirement, Announces CEO Town Hall, Highlights Multiple Recent Growth Drivers in CEO Letter', 'https://investors.worksport.com/post/worksport-nasdaq-wksp-regains-1-bid-price-requirement-announces-ceo-town-hall-highlights-multiple-recent-growth-drivers-in-ceo-letter'],
  ['June 22, 2026', 'Worksport Achieves 35% May Gross Margin, Lands Meyer Distribution, Targets $36M+ Revenue Run-Rate', 'https://investors.worksport.com/post/worksport-nasdaq-wksp-achieves-35-may-gross-margin-lands-meyer-distribution-targets-36m-revenue-run-rate'],
];

/* ---------- Social channels (icons render wherever an element has data-socials) ---------- */
const SOCIALS = [
  ['LinkedIn', 'https://www.linkedin.com/company/worksport/', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>'],
  ['X', 'https://x.com/WorksportLtd', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg>'],
  ['Instagram', 'https://www.instagram.com/worksportltd/', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>'],
  ['Facebook', 'https://www.facebook.com/WorksportLtd/', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>'],
  ['YouTube', 'https://www.youtube.com/channel/UCmZTPFel5WeDi38c2ilPHRg', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>'],
];

/* ---------- Timeline (oldest first). Categories: company, capital, product, terravis.
   When a new release lands on investors.worksport.com, tools/update-news.py adds it to NEWS; add a line here if it is a milestone. */
const TIMELINE_INITIAL = 7;  /* items shown on mobile before "Show full timeline" */
const TIMELINE = [
  ['2011', 'Founded', 'Steven Rossi founds Worksport as a maker of pickup truck bed covers.', 'company'],
  ['Aug 2021', 'Nasdaq listing', 'Worksport uplists to the Nasdaq Capital Market as WKSP with an upsized $18 million public offering.', 'capital'],
  ['May 2022', 'An American campus', 'Buys the 152,000 sq. ft. manufacturing campus in West Seneca, New York, bringing production of its covers to the United States.', 'company'],
  ['2022', 'Hyundai', 'Formal agreement with Hyundai America Technical Center to build SOLIS and COR prototypes for the Hyundai Santa Cruz; the SOLIS partnership is still active today.', 'product'],
  ['May 2024', '280 new jobs', 'New York State announces Worksport’s $6 million expansion at the West Seneca campus, creating 280 jobs.', 'company'],
  ['2024', '455% growth', 'Fiscal 2024 revenue grows 455% year over year as U.S. production ramps.', 'company'],
  ['Feb 2025', 'AetherLux™ unveiled', 'Subsidiary Terravis Energy reveals AetherLux, the cold-climate heat pump with ZeroFrost™ technology that eliminates defrost cycles, tested from −57 °F to +131 °F.', 'terravis'],
  ['Apr 2025', 'AL4 sets records', 'The U.S.-made AL4 drives a record sales month, with March B2B sales up 70% and the dealer network up 64% in the first quarter.', 'product'],
  ['2025', 'ISO 9001', 'The Worksport Campus earns ISO 9001 certification, opening OEM and fleet pathways.', 'company'],
  ['Fall 2025', 'SOLIS and COR launch', 'The SOLIS solar tonneau and COR portable energy system go on sale with UL and CSA certification; a $10 million Regulation A raise closes.', 'product'],
  ['Oct 2025', 'HD3 and Alaska', 'The HD3 heavy-duty cover enters production, and Terravis wins a competitive NTAP award with the U.S. DOE’s NREL to analyse ZeroFrost in Alaska.', 'terravis'],
  ['Jan 2026', 'Heat pump manufacturing partner', 'Terravis selects a major Asian manufacturing partner for AetherLux, with commercialisation planned within 2026.', 'terravis'],
  ['Feb 2026', 'Breakout quarter', 'Q4 2025 revenue up 65% and gross profit up 380% year over year; a government agency begins evaluating AetherLux for a potential long-term supply deal.', 'company'],
  ['Apr 2026', 'NEXUS', 'NEXUS, the flagship single-side flip-up cover, enters commercial production at the Worksport Campus and becomes the fastest-growing product in company history.', 'product'],
  ['2026', 'ZeroFrost™ patented', 'U.S. Patent No. 12,624,872 B2 is granted for the AetherLux heat pump system with ZeroFrost technology.', 'terravis'],
  ['Jun 2026', 'Strongest month ever', 'June 2026 is the strongest month in company history, with gross profit up 132% from April to June; Worksport regains Nasdaq’s $1 bid price requirement.', 'company'],
  ['Sep 2026', 'COR on Amazon', 'The COR energy system launches on Amazon; August orders of $2.92 million put the annualised order run rate at $35 million.', 'product'],
  ['Oct 2026', 'Slate Auto', 'Named a supplier on the Slate Auto Marketplace; SOLIS and COR shown on a Slate Truck at the Slate Collective Summit.', 'product'],
  ['Nov 2026', 'Record quarter', 'Record Q3 net sales of $7.23 million, up 44% year over year, with net loss narrowing 28%; a term sheet is signed to acquire a U.S.-made truck bed accessory business and its IP.', 'company'],
  ['Nov 2026', 'Largest distribution deal to date', 'Supplier agreement with The AAM Group puts NEXUS and HD3 in front of about 11,500 jobber locations and 60+ distribution centers across North America.', 'company'],
];
const TL_LABEL = { company: 'Enterprise', capital: 'Capital', product: 'Products', terravis: 'Terravis Energy' };

/* ======================================================================= */

const ICON_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 19h16"/></svg>';
const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

let MANIFEST = {};
const sizeOf = p => (MANIFEST[p] && MANIFEST[p].size) || '';
const typeOf = p => { const e = p.split('.').pop().toLowerCase(); return ({ zip: 'application/zip', pdf: 'application/pdf', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', eps: 'application/postscript' })[e] || e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const u = p => ASSET_BASE + p;
const webName = f => f.replace(/\.(png|jpeg)$/i, '.jpg');

/* Image folders: the main kit uses images/, the Terravis page sets window.KIT = { dir: 'terravis' } */
const KIT = window.KIT || { dir: 'images' };

/* Lightbox items: { name, view, dl, web?, meta, kind: 'img' | 'pdf' | 'file', bg? } */
function imageItem([f, cap], webOnly) {
  const orig = KIT.dir + '/originals/' + f, web = KIT.dir + '/web/' + webName(f);
  return { name: cap, view: u(web), dl: u(webOnly ? web : orig), web: webOnly ? null : u(web), webSize: sizeOf(web), kind: 'img',
    meta: webOnly ? `${webName(f)} · 1,600 px JPEG · ${sizeOf(web)}` : `${f} · ${typeOf(f)} · ${sizeOf(orig)}` };
}
function fileItem(name, path, bg) {
  const ext = path.split('.').pop().toLowerCase();
  const kind = ext === 'pdf' ? 'pdf' : (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext) ? 'img' : 'file');
  return { name, view: u(path), dl: u(path), kind, bg, meta: `${path.split('/').pop()} · ${typeOf(path)} · ${sizeOf(path)}` };
}
const pdfItem = (name, path) => fileItem(name, path);
const TILE_BG = { '': '#FFFFFF', dark: '#0B0D10', blue: '#0072CE', yellow: '#FFCE2D' };
function logoItems(brand, product) {
  const out = [];
  (brand || []).forEach(l => Object.entries(l.files).forEach(([k, f]) => out.push(fileItem(`${l.name} (${k})`, f, TILE_BG[l.bg] || '#fff'))));
  (product || []).forEach(l => { out.push(fileItem(`${l.name} wordmark, black (PNG)`, l.light, '#fff')); out.push(fileItem(`${l.name} wordmark, white (PNG)`, l.dark, '#0B0D10')); out.push(fileItem(`${l.name} wordmark (${l.svgLabel || 'SVG'})`, l.svg, '#fff')); });
  return out;
}
function teamItems() {
  if (typeof TEAM_BOARD === 'undefined') return [];
  return [...TEAM_BOARD, ...TEAM_EXEC].map(([n, t, f]) => ({ name: `${n}, ${t}`, view: u('leadership/' + f), dl: u('leadership/' + f), kind: 'img', meta: `${f} · ${typeOf(f)} · ${sizeOf('leadership/' + f)}` }));
}
function brochureItems() { return ['NEXUS', 'HD3', 'AL4', 'AL3', 'SC4', 'SC3', 'SOLIS', 'COR'].map(p => pdfItem(`${p} brochure 2026`, `docs/brochures/Worksport-${p}-Brochure-2026.pdf`)); }
let BUNDLE_LIST = [];

function renderBundles(list) {
  const el = document.getElementById('bundles'); if (!el) return;
  BUNDLE_LIST = list;
  el.innerHTML = list.map((b, i) => {
    const n = b.items ? b.items().length : 0;
    return `
    <article class="dl-card" data-b="${i}">
      <button class="thumb ${b.pad ? 'pad' : ''} ${b.dark ? 'dark' : ''}" type="button" aria-label="Browse ${esc(b.name)}">
        <img src="${u(b.thumb)}" alt="" loading="lazy" ${b.pos ? `style="object-position:center ${b.pos}"` : ''}>
        ${n ? `<span class="browse">Browse ${n} file${n === 1 ? '' : 's'}</span>` : ''}
      </button>
      <div class="body">
        <div>
          <button class="name" type="button">${esc(b.name)}</button>
          <div class="meta">${n ? `<span>${n} file${n === 1 ? '' : 's'}</span>` : ''}<span>${typeOf(b.file)}</span><span>${sizeOf(b.file)}</span></div>
          <div class="desc">${esc(b.desc)}</div>
        </div>
        <a class="icon" href="${u(b.file)}" download title="Download ${esc(b.name)} (${typeOf(b.file).split('/').pop()})" aria-label="Download ${esc(b.name)}">${ICON_DL}</a>
      </div>
    </article>`; }).join('');
  el.addEventListener('click', e => {
    if (e.target.closest('.icon')) return;
    const card = e.target.closest('.dl-card'); if (!card) return;
    const b = BUNDLE_LIST[+card.dataset.b];
    const items = b.items ? b.items() : [];
    if (items.length) openLBItems(items, 0); else window.location.href = u(b.file);
  });
  const all = list.find(b => b.all);
  if (all) {
    document.querySelectorAll('[data-download-all]').forEach(a => { a.href = u(all.file); a.setAttribute('download', ''); });
    const sz = document.getElementById('all-size'); if (sz) sz.textContent = sizeOf(all.file);
  }
}

function renderProducts(list) {
  const el = document.getElementById('products-grid'); if (!el) return;
  el.innerHTML = list.map(p => `
    <article class="prod" id="prod-${p.id}">
      <div class="img ${p.fit ? 'fit' : ''}"><img src="${u(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>
      <div class="body">
        ${p.logo ? `<img class="plogo" src="${u(p.logo)}" alt="${esc(p.name)} logo">` : `<h3>${esc(p.name)}</h3>`}
        <div class="tag">${esc(p.tag)}</div>
        <p>${esc(p.desc)}</p>
        <div class="links">${p.links.map(([t, h]) => `<a href="${h}" ${h.startsWith('http') ? 'target="_blank" rel="noopener"' : (h.startsWith('assets/') ? 'download' : '')}>${esc(t)} →</a>`).join('')}</div>
      </div>
    </article>`).join('');
}

function renderLogos(brand, product) {
  const b = document.getElementById('brand-logos');
  if (b) b.innerHTML = brand.map(l => `
    <div class="logo-tile">
      <div class="art ${l.bg}"><img class="${l.emblem ? 'emblem' : ''}" src="${u(l.src)}" alt="${esc(l.name)}"></div>
      <div class="body">
        <div class="name">${esc(l.name)}</div>
        <div class="fmts">${Object.entries(l.files).map(([k, f]) => `<a class="chip" href="${u(f)}" download>${ICON_DL}${k} <span style="opacity:.6">${sizeOf(f)}</span></a>`).join('')}</div>
      </div>
    </div>`).join('');
  const p = document.getElementById('product-logos');
  if (p && product) p.innerHTML = product.map(l => `
    <div class="plogo-tile">
      <div class="art"><img src="${u(l.light)}" alt="${esc(l.name)} logo, black"></div>
      <div class="art dark"><img src="${u(l.dark)}" alt="${esc(l.name)} logo, white"></div>
      <div class="nm"><span>${esc(l.name)}</span><a href="${u(l.svg)}" download>${l.svgLabel || 'SVG'} ↓</a></div>
    </div>`).join('');
}

let galleryIndex = [];
let galleryExpanded = false;
function renderGallery(list, initial) {
  const el = document.getElementById('gallery'); if (!el) return;
  galleryIndex = list;
  el.innerHTML = list.map(([f, cap, cat, fit, bg], i) => `
    <button class="gal-item ${i >= initial ? 'collapsed' : ''} ${fit ? 'fit' : ''}" data-cat="${cat}" data-i="${i}" type="button" aria-label="View ${esc(cap)}">
      <img src="${u(KIT.dir + '/thumbs/' + webName(f))}" alt="${esc(cap)}" loading="lazy" ${bg ? `style="background:${bg}"` : ''}>
      <span class="lbl">${esc(cap)}</span>
      <a class="dl" href="${u(KIT.dir + '/originals/' + f)}" download title="Download full resolution" aria-label="Download ${esc(cap)}" onclick="event.stopPropagation()">${ICON_DL}</a>
    </button>`).join('');
  el.addEventListener('click', e => { const b = e.target.closest('.gal-item'); if (b) openLB(+b.dataset.i); });
  const moreRow = document.getElementById('gallery-more'); const moreBtn = document.getElementById('gallery-more-btn');
  if (moreRow) { if (list.length <= initial) moreRow.classList.add('hidden'); moreBtn.addEventListener('click', () => { galleryExpanded = true; el.querySelectorAll('.collapsed').forEach(x => x.classList.remove('collapsed')); moreRow.classList.add('hidden'); }); }
  document.querySelectorAll('.filters button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed', b === btn));
    const c = btn.dataset.filter;
    if (!galleryExpanded) { galleryExpanded = true; el.querySelectorAll('.collapsed').forEach(x => x.classList.remove('collapsed')); if (moreRow) moreRow.classList.add('hidden'); }
    el.querySelectorAll('.gal-item').forEach(it => it.classList.toggle('hidden', c !== 'all' && it.dataset.cat !== c));
    updateSetButtons();
  }));
  updateSetButtons();
}

/* Section downloads: zip the images currently shown (respects the filter) in the browser, full-res or web size. */
function shownImages() { return [...document.querySelectorAll('.gal-item:not(.hidden)')].map(b => galleryIndex[+b.dataset.i]); }
function updateSetButtons() {
  const n = shownImages().length;
  const f = document.querySelector('.filters [aria-pressed="true"]');
  const what = f && f.dataset.filter !== 'all' ? f.textContent.trim() : 'all';
  document.querySelectorAll('[data-dl-set]').forEach(b => { b.querySelector('.n').textContent = `${what === 'all' ? 'all ' : ''}${n} ${what === 'all' ? 'images' : what + ' images'}`; });
}
let zipBusy = false;
async function downloadSet(kind) {
  if (zipBusy) return;
  if (!window.JSZip) { toast('Zip tool is still loading, try again in a moment'); return; }
  const items = shownImages(); if (!items.length) return;
  zipBusy = true;
  const f = document.querySelector('.filters [aria-pressed="true"]');
  const tag = f && f.dataset.filter !== 'all' ? f.dataset.filter : 'all';
  const zip = new JSZip(); let n = 0;
  try {
    for (const [file] of items) {
      const name = kind === 'web' ? webName(file) : file;
      const path = KIT.dir + (kind === 'web' ? '/web/' : '/originals/') + name;
      toast(`Adding ${++n} of ${items.length}…`);
      const r = await fetch(u(path)); if (!r.ok) continue;
      zip.file(name, await r.blob());
    }
    toast('Zipping…');
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `${KIT.name || 'Worksport'}-images-${tag}-${kind === 'web' ? 'web' : 'full-res'}.zip`;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    toast(`Download started (${items.length} files)`);
  } catch (e) { toast('Could not build the zip'); }
  zipBusy = false;
}

/* Lightbox: browses any list of items (gallery images, a bundle's files, headshots, PDFs) with one-at-a-time downloads */
const LB = { items: [], i: 0 };
function openLBItems(items, i) { LB.items = items; LB.i = i; updateLB(); document.getElementById('lb').classList.add('open'); document.body.style.overflow = 'hidden'; }
function openLB(i) { const vis = visibleIdx(); openLBItems(vis.map(k => imageItem(galleryIndex[k])), Math.max(0, vis.indexOf(i))); }
function closeLB() { document.getElementById('lb').classList.remove('open'); document.body.style.overflow = ''; const fr = document.getElementById('lb-frame'); if (fr) fr.src = 'about:blank'; }
function stepLB(d) { if (LB.items.length < 2) return; LB.i = (LB.i + d + LB.items.length) % LB.items.length; updateLB(); }
function visibleIdx() { return [...document.querySelectorAll('.gal-item:not(.hidden):not(.collapsed)')].map(b => +b.dataset.i); }
function updateLB() {
  const it = LB.items[LB.i]; if (!it) return;
  const img = document.getElementById('lb-img'), fr = document.getElementById('lb-frame'), none = document.getElementById('lb-none'), stage = document.getElementById('lb-stage');
  img.hidden = it.kind !== 'img'; if (fr) fr.hidden = it.kind !== 'pdf'; if (none) none.hidden = it.kind !== 'file';
  if (it.kind === 'img') { img.src = it.view; img.alt = it.name; } else img.removeAttribute('src');
  if (fr) fr.src = it.kind === 'pdf' ? it.view + '#view=FitH' : 'about:blank';
  if (stage) stage.style.background = it.bg || 'transparent';
  if (stage) stage.classList.toggle('padded', !!it.bg);
  document.getElementById('lb-name').textContent = it.name;
  document.getElementById('lb-meta').textContent = it.meta || '';
  const c = document.getElementById('lb-count'); if (c) c.textContent = LB.items.length > 1 ? `${LB.i + 1} / ${LB.items.length}` : '';
  const a = document.getElementById('lb-dl'); a.href = it.dl; a.setAttribute('download', '');
  const w = document.getElementById('lb-dl-web'); if (w) { w.hidden = !it.web; if (it.web) { w.href = it.web; w.setAttribute('download', ''); w.querySelector('.sz').textContent = it.webSize || ''; } }
  const pv = document.getElementById('lb-prev'), nx = document.getElementById('lb-next'); const many = LB.items.length > 1; if (pv) pv.hidden = !many; if (nx) nx.hidden = !many;
}

function renderTeam(id, list) {
  const el = document.getElementById(id); if (!el) return;
  el.innerHTML = list.map(([n, t, f]) => `
    <a class="person" href="${u('leadership/' + f)}" download title="Download headshot">
      <img src="${u('leadership/' + f)}" alt="${esc(n)}" loading="lazy">
      <div class="pb"><div class="pn">${esc(n)}</div><div class="pt">${esc(t)}</div></div>
      <span class="pd">${ICON_DL}</span>
    </a>`).join('');
}

function renderNews(list, initial) {
  const el = document.getElementById('news-list'); if (!el) return;
  el.innerHTML = list.map(([d, t, h], i) => `
    <li class="${i >= initial ? 'collapsed' : ''}"><a href="${h}" target="_blank" rel="noopener"><span class="d">${esc(d)}</span><span class="t">${esc(t)}</span><span class="arrow">${ICON_ARROW}</span></a></li>`).join('');
  const moreRow = document.getElementById('news-more'); const moreBtn = document.getElementById('news-more-btn');
  if (moreRow) { if (list.length <= initial) moreRow.classList.add('hidden'); moreBtn.addEventListener('click', () => { el.querySelectorAll('.collapsed').forEach(x => x.classList.remove('collapsed')); moreRow.classList.add('hidden'); }); }
}

function renderVideos(list, initial) {
  const el = document.getElementById('video-grid'); if (!el) return;
  el.innerHTML = list.map((v, i) => `
    <figure class="vid ${i >= initial ? 'collapsed' : ''}" data-src="${v.src}" data-id="${v.id || ''}" data-file="${v.file ? u(v.file) : ''}">
      <button class="poster" type="button" aria-label="Play: ${esc(v.title)}">
        <img src="${u(v.poster || ('video/' + (v.src === 'yt' ? 'yt-' : 'vimeo-') + v.id + '.jpg'))}" alt="" loading="lazy">
        <span class="play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>
      </button>
      <figcaption>
        <div class="vt">${esc(v.title)}</div>
        <div class="vn">${esc(v.note)}${v.mp4 ? ` · <a href="${v.mp4}" download>Download MP4</a>` : ''}${v.file ? ` · <a href="${u(v.file)}" download>Download MP4 ${sizeOf(v.file)}</a>` : ''}${v.src === 'mp4' ? '' : ` · <a href="${v.src === 'yt' ? 'https://www.youtube.com/watch?v=' + v.id : 'https://vimeo.com/' + v.id}" target="_blank" rel="noopener">Open ↗</a>`}</div>
      </figcaption>
    </figure>`).join('');
  el.addEventListener('click', e => {
    const b = e.target.closest('.poster'); if (!b) return;
    const f = b.closest('.vid'); const { src, id, file } = f.dataset;
    if (src === 'mp4') { b.outerHTML = `<div class="frame"><video src="${file}" controls autoplay playsinline></video></div>`; return; }
    const url = src === 'yt' ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : `https://player.vimeo.com/video/${id}?autoplay=1`;
    b.outerHTML = `<div class="frame"><iframe src="${url}" title="Video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  });
  const moreRow = document.getElementById('video-more'); const moreBtn = document.getElementById('video-more-btn');
  if (moreRow) { if (list.length <= initial) moreRow.classList.add('hidden'); moreBtn.addEventListener('click', () => { el.querySelectorAll('.collapsed').forEach(x => x.classList.remove('collapsed')); moreRow.classList.add('hidden'); }); }
}

function renderTimeline(list, initial) {
  const el = document.getElementById('timeline-list'); if (!el) return;
  el.innerHTML = list.map(([d, t, txt, c], i) => `
    <li class="tl-item ${c} ${i >= initial ? 'extra' : ''}">
      <div class="tl-date">${esc(d)}</div>
      <div class="tl-card"><span class="tl-tag">${TL_LABEL[c] || c}</span><h3>${esc(t)}</h3><p>${esc(txt)}</p></div>
    </li>`).join('');
  const btn = document.getElementById('timeline-more-btn');
  if (btn) btn.addEventListener('click', () => { el.querySelectorAll('.extra').forEach(x => x.classList.remove('extra')); btn.parentElement.classList.add('hidden'); });
}

function renderSocials() {
  document.querySelectorAll('[data-socials]').forEach(el => {
    el.innerHTML = SOCIALS.map(([n, h, icon]) => `<a class="soc" href="${h}" target="_blank" rel="noopener" aria-label="Worksport on ${n}" title="${n}">${icon}</a>`).join('');
  });
}

function copyText(id) {
  const t = document.getElementById(id).innerText;
  navigator.clipboard.writeText(t).then(() => toast('Copied to clipboard'), () => toast('Copy failed'));
}
let toastT;
function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); }

function wireCommon() {
  document.getElementById('lb-x').addEventListener('click', closeLB);
  document.getElementById('lb-prev').addEventListener('click', () => stepLB(-1));
  document.getElementById('lb-next').addEventListener('click', () => stepLB(1));
  document.getElementById('lb').addEventListener('click', e => { if (e.target.id === 'lb') closeLB(); });
  document.addEventListener('keydown', e => { if (!document.getElementById('lb').classList.contains('open')) return; if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowLeft') stepLB(-1); if (e.key === 'ArrowRight') stepLB(1); });
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => copyText(b.dataset.copy)));
  document.querySelectorAll('[data-dl-set]').forEach(b => b.addEventListener('click', () => downloadSet(b.dataset.dlSet)));
  renderSocials();
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
}

async function loadManifest() { try { MANIFEST = await (await fetch('js/manifest.json')).json(); } catch (e) { MANIFEST = {}; } }

if (!window.KIT) {
  document.addEventListener('DOMContentLoaded', async () => {
    await loadManifest();
    renderBundles(BUNDLES); renderProducts(PRODUCTS); renderLogos(BRAND_LOGOS, PRODUCT_LOGOS); renderGallery(IMAGES, GALLERY_INITIAL); renderTeam('team-exec', TEAM_EXEC); renderTeam('team-board', TEAM_BOARD); renderNews(NEWS, NEWS_INITIAL); renderTimeline(TIMELINE, TIMELINE_INITIAL); renderVideos(VIDEOS, VIDEOS_INITIAL);
    wireCommon();
  });
}
