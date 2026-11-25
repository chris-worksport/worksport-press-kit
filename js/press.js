/* Worksport Press Kit — data and behaviour.
   Edit the data blocks at the top to add or swap assets. File sizes come from js/manifest.json
   (regenerate with tools/build-manifest.py after adding files). */

const ASSET_BASE = 'assets/';

/* ---------- Download bundles (hero cards, Slate-style) ---------- */
const BUNDLES = [
  { file: 'downloads/Worksport-Press-Kit-All.zip', name: 'Worksport Press Kit — Everything', thumb: 'images/thumbs/nexus-lifestyle-red-f150.jpg',
    desc: 'Logos, full-resolution product and manufacturing photography, leadership headshots and the brand guide in one archive.', all: true },
  { file: 'downloads/Worksport-Logos.zip', name: 'Worksport Logos', thumb: 'logos/worksport/WKSP-FullLogo-ColoredBlack-PNG.png', pad: true,
    desc: 'Full logo, emblem and Nasdaq: WKSP lockup in SVG, PNG and PDF. Product wordmarks for NEXUS, HD3, AL4, AL3, SC4, SC3, SOLIS and COR.' },
  { file: 'downloads/Worksport-Product-Images.zip', name: 'Product Photography (Full Resolution)', thumb: 'images/thumbs/solis-cor-jeep-canyon.jpg',
    desc: 'NEXUS, HD3, AL4, SOLIS and COR lifestyle and studio imagery, up to 5,000 px wide.' },
  { file: 'downloads/Worksport-Manufacturing-Images.zip', name: 'Worksport Campus & Manufacturing', thumb: 'images/thumbs/factory-assembly-line.jpg',
    desc: 'The 152,000 sq. ft. West Seneca, New York factory: production floor, assembly and campus exterior.' },
  { file: 'downloads/Worksport-Web-Ready-Images.zip', name: 'Web-Ready Images', thumb: 'images/thumbs/hd3-silver-truck-mountains.jpg',
    desc: 'Every photo in this kit resized to 1,600 px JPEG for web and social use.' },
  { file: 'downloads/Worksport-Leadership-Headshots.zip', name: 'Leadership Headshots', thumb: 'images/thumbs/steven-rossi.jpg',
    desc: 'Steven Rossi, Founder and Chief Executive Officer.' },
  { file: 'downloads/Worksport-Brand-Guide.zip', name: 'Brand Guide (PDF)', thumb: 'logos/worksport/WKSP-Emblem-Blue-PNG.png', pad: true,
    desc: 'Logo usage, colour and typography reference.' },
];

/* ---------- Products ---------- */
const PRODUCTS = [
  { id: 'nexus', tag: 'Hard tonneau cover', name: 'NEXUS', logo: 'logos/products/NEXUS/Nexus_FullFormat-H-Black-REV-A.png', img: 'images/thumbs/nexus-lifestyle-red-f150.jpg',
    desc: 'Worksport’s flagship flip-up hard tonneau cover with proprietary single-side operation. Launched into commercial production in April 2026 and made at the Worksport Campus in West Seneca, New York.',
    links: [['Product page', 'https://www.worksport.com/products/nexus'], ['Logo files', '#logos']] },
  { id: 'hd3', tag: 'Heavy-duty tonneau cover', name: 'HD3', logo: 'logos/products/HD3/HD3_FullFormat-Black.png', img: 'images/thumbs/hd3-silver-truck-mountains.jpg',
    desc: 'Heavy-duty tri-fold hard cover built for work and fleet use. In production since October 2025 and sold through dealers and distributors across North America.',
    links: [['Product page', 'https://www.worksport.com/products/hd3'], ['Logo files', '#logos']] },
  { id: 'al4', tag: 'Premium tonneau cover', name: 'AL4', logo: 'logos/products/AL4/AL4_FullFormat-Black.png', img: 'images/thumbs/al4-gmc-sierra-lumber.jpg',
    desc: 'Premium hard-folding tonneau cover, designed and manufactured in-house. The AL4 was Worksport’s first U.S.-made cover and anchored the company’s 2025 growth.',
    links: [['Product page', 'https://www.worksport.com/products/al4'], ['Logo files', '#logos']] },
  { id: 'solis', tag: 'Solar tonneau cover', name: 'SOLIS', logo: 'logos/products/SOLIS/SOLIS_FullFormat-Black.png', img: 'images/thumbs/solis-ford-f150.jpg',
    desc: 'A folding solar tonneau cover that turns the truck bed into a power source. Pairs with COR to form a portable energy system for work, recreation, travel and backup power.',
    links: [['Product page', 'https://www.worksport.com/products/solis'], ['Logo files', '#logos']] },
  { id: 'cor', tag: 'Portable battery generator', name: 'COR', logo: 'logos/products/COR/COR-FullLogo-Rev-Black-PNG.png', img: 'images/thumbs/cor-portable-battery-render.jpg',
    desc: 'Portable battery generator and mobile energy storage system. UL and CSA certified, available through worksport.com and Amazon, and designed to charge from SOLIS on the move.',
    links: [['Product page', 'https://www.worksport.com/products/cor'], ['Logo files', '#logos']] },
  { id: 'terravis', tag: 'Subsidiary', name: 'Terravis Energy', logo: null, img: 'images/thumbs/terravis-dodge-worksite.jpg',
    desc: 'Worksport’s clean-energy subsidiary developing the patented Zerofrost™ cold-climate heat pump technology marketed as AetherLux™.',
    links: [['terravisenergy.com', 'https://terravisenergy.com']] },
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

/* ---------- Image gallery (file = name in images/originals, thumb/web share the name as .jpg) ---------- */
const IMAGES = [
  ['nexus-lifestyle-red-f150.jpg', 'NEXUS on a Ford F-150', 'nexus'],
  ['nexus-open-bed-gear.jpg', 'NEXUS flipped open, bed loaded', 'nexus'],
  ['nexus-blue-f150-road.jpg', 'NEXUS on the road', 'nexus'],
  ['nexus-hand-release.jpg', 'NEXUS release handle', 'nexus'],
  ['nexus-tailgate-work.jpg', 'NEXUS at the tailgate', 'nexus'],
  ['nexus-fall-grey-truck.png', 'NEXUS, fall shoot', 'nexus'],
  ['nexus-fall-loading.png', 'Loading under a NEXUS', 'nexus'],
  ['hd3-silver-truck-mountains.jpg', 'HD3 in the mountains', 'hd3'],
  ['hd3-outdoor-f150-mountains.png', 'HD3 on a Ford F-150', 'hd3'],
  ['hd3-grey-truck-site.jpg', 'HD3 on the job site', 'hd3'],
  ['al4-gmc-sierra-lumber.png', 'AL4 on a GMC Sierra', 'hd3'],
  ['al4-dodge-ram-rambox.png', 'AL4 on a Ram 1500', 'hd3'],
  ['al4-toyota-tundra-barn.png', 'AL4 on a Toyota Tundra', 'hd3'],
  ['all-hard-covers-lineup.jpg', 'Worksport hard cover line-up', 'hd3'],
  ['solis-ford-f150.jpg', 'SOLIS on a Ford F-150', 'solis'],
  ['solis-jeep-gladiator.jpg', 'SOLIS on a Jeep Gladiator', 'solis'],
  ['solis-open-panels-tundra.jpg', 'SOLIS panels deployed', 'solis'],
  ['solis-folded-barn.jpg', 'SOLIS folded', 'solis'],
  ['solis-lifestyle-sunset.png', 'SOLIS at sunset', 'solis'],
  ['solis-lifestyle-golden-hour.png', 'SOLIS, golden hour', 'solis'],
  ['solis-cor-jeep-canyon.jpg', 'SOLIS + COR, canyon', 'solis'],
  ['solis-cor-dodge-night.jpg', 'SOLIS + COR at night', 'solis'],
  ['solis-cor-hero-closeup.jpg', 'SOLIS + COR close-up', 'solis'],
  ['cor-portable-battery-render.jpg', 'COR portable battery', 'solis'],
  ['cor-battery-studio.png', 'COR, studio', 'solis'],
  ['cor-home-use.jpg', 'COR at home', 'solis'],
  ['cor-moving-day.jpg', 'COR on moving day', 'solis'],
  ['solis-nexus-cor-family.png', 'SOLIS, NEXUS and COR', 'solis'],
  ['terravis-dodge-worksite.jpg', 'Terravis Energy on site', 'solis'],
  ['factory-floor-overview.jpg', 'Worksport Campus production floor', 'factory'],
  ['factory-assembly-line.jpg', 'Assembly line', 'factory'],
  ['factory-panel-assembly.jpg', 'Panel assembly', 'factory'],
  ['factory-production-cell.jpg', 'Production cell', 'factory'],
  ['factory-press-line.jpg', 'Press line', 'factory'],
  ['factory-panel-build.jpg', 'Building a panel', 'factory'],
  ['factory-team-member.jpg', 'Worksport team member', 'factory'],
  ['factory-rail-inventory.jpg', 'Rail inventory', 'factory'],
  ['campus-exterior-flags.jpg', 'Worksport Campus, West Seneca, NY', 'factory'],
];

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

/* ======================================================================= */

const ICON_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 19h16"/></svg>';
const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

let MANIFEST = {};
const sizeOf = p => (MANIFEST[p] && MANIFEST[p].size) || '';
const typeOf = p => { const e = p.split('.').pop().toLowerCase(); return ({ zip: 'application/zip', pdf: 'application/pdf', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', eps: 'application/postscript' })[e] || e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const u = p => ASSET_BASE + p;
const webName = f => f.replace(/\.(png|jpeg)$/i, '.jpg');

function renderBundles() {
  const el = document.getElementById('bundles');
  el.innerHTML = BUNDLES.map(b => `
    <a class="dl-card" href="${u(b.file)}" download>
      <div class="thumb ${b.pad ? 'pad' : ''}"><img src="${u(b.thumb)}" alt="" loading="lazy"></div>
      <div class="body">
        <div>
          <div class="name">${esc(b.name)}</div>
          <div class="meta"><span>${typeOf(b.file)}</span><span>${sizeOf(b.file)}</span></div>
          <div class="desc">${esc(b.desc)}</div>
        </div>
        <span class="icon">${ICON_DL}</span>
      </div>
    </a>`).join('');
  const all = BUNDLES.find(b => b.all);
  document.querySelectorAll('[data-download-all]').forEach(a => { a.href = u(all.file); a.setAttribute('download', ''); });
  const s = document.getElementById('all-size'); if (s) s.textContent = sizeOf(all.file);
}

function renderProducts() {
  document.getElementById('products-grid').innerHTML = PRODUCTS.map(p => `
    <article class="prod" id="prod-${p.id}">
      <div class="img"><img src="${u(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>
      <div class="body">
        ${p.logo ? `<img class="plogo" src="${u(p.logo)}" alt="${esc(p.name)} logo">` : `<h3>${esc(p.name)}</h3>`}
        <div class="tag">${esc(p.tag)}</div>
        <p>${esc(p.desc)}</p>
        <div class="links">${p.links.map(([t, h]) => `<a href="${h}" ${h.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${esc(t)} →</a>`).join('')}</div>
      </div>
    </article>`).join('');
}

function renderLogos() {
  document.getElementById('brand-logos').innerHTML = BRAND_LOGOS.map(l => `
    <div class="logo-tile">
      <div class="art ${l.bg}"><img class="${l.emblem ? 'emblem' : ''}" src="${u(l.src)}" alt="${esc(l.name)}"></div>
      <div class="body">
        <div class="name">${esc(l.name)}</div>
        <div class="fmts">${Object.entries(l.files).map(([k, f]) => `<a class="chip" href="${u(f)}" download>${ICON_DL}${k} <span style="opacity:.6">${sizeOf(f)}</span></a>`).join('')}</div>
      </div>
    </div>`).join('');
  document.getElementById('product-logos').innerHTML = PRODUCT_LOGOS.map(l => `
    <div class="plogo-tile">
      <div class="art"><img src="${u(l.light)}" alt="${esc(l.name)} logo, black"></div>
      <div class="art dark"><img src="${u(l.dark)}" alt="${esc(l.name)} logo, white"></div>
      <div class="nm"><span>${esc(l.name)}</span><a href="${u(l.svg)}" download>${l.svgLabel || 'SVG'} ↓</a></div>
    </div>`).join('');
}

let galleryIndex = [];
function renderGallery() {
  const el = document.getElementById('gallery');
  galleryIndex = IMAGES;
  el.innerHTML = IMAGES.map(([f, cap, cat], i) => `
    <button class="gal-item" data-cat="${cat}" data-i="${i}" type="button" aria-label="View ${esc(cap)}">
      <img src="${u('images/thumbs/' + webName(f))}" alt="${esc(cap)}" loading="lazy">
      <span class="lbl">${esc(cap)}</span>
      <a class="dl" href="${u('images/originals/' + f)}" download title="Download full resolution" aria-label="Download ${esc(cap)}" onclick="event.stopPropagation()">${ICON_DL}</a>
    </button>`).join('');
  el.addEventListener('click', e => { const b = e.target.closest('.gal-item'); if (b) openLB(+b.dataset.i); });
  document.querySelectorAll('.filters button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed', b === btn));
    const c = btn.dataset.filter;
    el.querySelectorAll('.gal-item').forEach(it => it.classList.toggle('hidden', c !== 'all' && it.dataset.cat !== c));
  }));
}

/* Lightbox */
let lbIdx = 0;
function openLB(i) { lbIdx = i; updateLB(); document.getElementById('lb').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeLB() { document.getElementById('lb').classList.remove('open'); document.body.style.overflow = ''; }
function stepLB(d) { const vis = visibleIdx(); const k = vis.indexOf(lbIdx); lbIdx = vis[(k + d + vis.length) % vis.length]; updateLB(); }
function visibleIdx() { return [...document.querySelectorAll('.gal-item:not(.hidden)')].map(b => +b.dataset.i); }
function updateLB() {
  const [f, cap] = galleryIndex[lbIdx];
  document.getElementById('lb-img').src = u('images/web/' + webName(f));
  document.getElementById('lb-img').alt = cap;
  document.getElementById('lb-name').textContent = cap;
  const orig = 'images/originals/' + f;
  document.getElementById('lb-meta').textContent = `${f} · ${typeOf(f)} · ${sizeOf(orig)}`;
  const a = document.getElementById('lb-dl'); a.href = u(orig); a.setAttribute('download', '');
}

function renderNews() {
  document.getElementById('news-list').innerHTML = NEWS.map(([d, t, h]) => `
    <li><a href="${h}" target="_blank" rel="noopener"><span class="d">${esc(d)}</span><span class="t">${esc(t)}</span><span class="arrow">${ICON_ARROW}</span></a></li>`).join('');
}

function copyText(id, btn) {
  const t = document.getElementById(id).innerText;
  navigator.clipboard.writeText(t).then(() => toast('Copied to clipboard'), () => toast('Copy failed'));
}
let toastT;
function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); }

document.addEventListener('DOMContentLoaded', async () => {
  try { MANIFEST = await (await fetch('js/manifest.json')).json(); } catch (e) { MANIFEST = {}; }
  renderBundles(); renderProducts(); renderLogos(); renderGallery(); renderNews();
  document.getElementById('lb-x').addEventListener('click', closeLB);
  document.getElementById('lb-prev').addEventListener('click', () => stepLB(-1));
  document.getElementById('lb-next').addEventListener('click', () => stepLB(1));
  document.getElementById('lb').addEventListener('click', e => { if (e.target.id === 'lb') closeLB(); });
  document.addEventListener('keydown', e => { if (!document.getElementById('lb').classList.contains('open')) return; if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowLeft') stepLB(-1); if (e.key === 'ArrowRight') stepLB(1); });
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => copyText(b.dataset.copy, b)));
  document.getElementById('year').textContent = new Date().getFullYear();
});
