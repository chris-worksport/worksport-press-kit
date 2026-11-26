/* Terravis Energy media room — data. Rendering comes from js/press.js (loaded first). */

const TVE_BUNDLES = [
  { file: 'downloads/Terravis-Energy-Press-Kit.zip', name: 'Terravis Energy Press Kit — Everything', thumb: 'terravis/thumbs/aetherlux-outdoor-front-right.jpg',
    desc: 'Terravis and AetherLux logos, full-resolution AetherLux renders and the Terravis brand guide.', all: true,
    items: () => [...TVE_IMAGES.map(i => imageItem(i)), ...logoItems(TVE_LOGOS, null), pdfItem('AetherLux Launch Brochure 2026', 'docs/AetherLux-Launch-Brochure-2026.pdf'), pdfItem('Terravis Energy Brand Guide 2026', 'docs/Terravis-Energy-Brand-Guide-2026.pdf')] },
  { file: 'downloads/Terravis-Logos.zip', name: 'Terravis & AetherLux Logos', thumb: 'logos/terravis/TVE-logo-white.svg', pad: true, dark: true,
    desc: 'Terravis Energy wordmark (SVG, PNG) and the AetherLux logo and badge.',
    items: () => logoItems(TVE_LOGOS, null) },
  { file: 'downloads/Terravis-AetherLux-Renders.zip', name: 'AetherLux Renders (Full Resolution)', thumb: 'terravis/thumbs/aetherlux-home-winter.jpg',
    desc: 'The November 2026 outdoor-unit render package (nine views), indoor units and two in-situ scenes.',
    items: () => TVE_IMAGES.map(i => imageItem(i)) },
  { file: 'docs/AetherLux-Launch-Brochure-2026.pdf', name: 'AetherLux Launch Brochure (PDF)', thumb: 'terravis/thumbs/aetherlux-outdoor-front.jpg',
    desc: 'The AetherLux™ launch brochure (v5.6, November 2026): product story, ZeroFrost™ technology, specifications and lab results.',
    items: () => [pdfItem('AetherLux Launch Brochure 2026', 'docs/AetherLux-Launch-Brochure-2026.pdf')] },
  { file: 'downloads/Terravis-Brand-Guide.zip', name: 'Terravis Brand Guide (PDF)', thumb: 'logos/terravis/20261119-AetherLux-AppLogo-PNG.png', pad: true, dark: true,
    desc: 'Logo usage, colour and typography for Terravis Energy, AetherLux and ZeroFrost.',
    items: () => [pdfItem('Terravis Energy Brand Guide 2026', 'docs/Terravis-Energy-Brand-Guide-2026.pdf')] },
];

const TVE_LOGOS = [
  { name: 'Terravis Energy — on dark', bg: 'dark', src: 'logos/terravis/TVE-logo-white.svg', files: { SVG: 'logos/terravis/TVE-logo-white.svg' } },
  { name: 'Terravis Energy — on light', bg: '', src: 'logos/terravis/TVE_Logo_20250305.png', files: { PNG: 'logos/terravis/TVE_Logo_20250305.png' } },
  { name: 'AetherLux — app icon', bg: 'dark', emblem: true, src: 'logos/terravis/20261119-AetherLux-AppLogo-PNG.png', files: { SVG: 'logos/terravis/20261119-AetherLux-AppLogo-SVG.svg', PNG: 'logos/terravis/20261119-AetherLux-AppLogo-PNG.png', PDF: 'logos/terravis/20261119-AetherLux-AppLogo-PDF.pdf' } },
  { name: 'AetherLux — badge', bg: '', emblem: true, src: 'logos/terravis/AetherLux-Badge.svg', files: { SVG: 'logos/terravis/AetherLux-Badge.svg' } },
];

/* Newest first: the November 2026 outdoor-unit render package from the TVE Library (Image Assets/AetherLux_Outdoor_Colour_Package),
   then the indoor units and the two in-situ scenes. 4th value 'fit' shows the whole render in the tile instead of cropping it. */
const TVE_IMAGES = [
  ['aetherlux-outdoor-front-right.png', 'AetherLux outdoor unit, front right', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-outdoor-front.png', 'AetherLux outdoor unit, front', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-outdoor-front-left.png', 'AetherLux outdoor unit, front left', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-home-winter.jpg', 'AetherLux at home, winter', 'home'],
  ['aetherlux-outdoor-service-side.png', 'AetherLux outdoor unit, service side', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-outdoor-rear-right.png', 'AetherLux outdoor unit, rear right', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-outdoor-rear-left.png', 'AetherLux outdoor unit, rear left', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-home-summer.jpg', 'AetherLux at home, summer', 'home'],
  ['aetherlux-indoor-unit.png', 'AetherLux indoor unit', 'render', 'fit'],
  ['aetherlux-indoor-unit-angle.png', 'AetherLux indoor unit, angle', 'render', 'fit'],
  ['aetherlux-outdoor-exploded.png', 'Exploded view (conceptual)', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-outdoor-interior.png', 'Exposed interior (illustrative finishes)', 'render', 'fit', '#b9c1c9'],
  ['aetherlux-outdoor-interior-detail.png', 'Interior detail (illustrative finishes)', 'render', 'fit', '#b9c1c9'],
];

/* Video: finished pieces only. Raw demo footage (Oct 2026 "Unstoppable", "Death Valley", IDU mass production) stays in the TVE Library. */
const TVE_VIDEOS = [
  { src: 'mp4', file: 'video/AetherLux-Commercial-720p.mp4', poster: 'terravis/web/aetherlux-home-winter.jpg', title: 'AetherLux™ commercial', note: '3 min · 720p web copy; 4K master on request' },
  { src: 'mp4', file: 'video/aetherlux-pro-in-action.mp4', poster: 'terravis/web/aetherlux-outdoor-front-right.jpg', title: 'AetherLux Pro in action', note: 'Short clip from aetherlux.terravisenergy.com' },
];

const TVE_NEWS = [
  ['February 12, 2026', 'Worksport Confirms Government Evaluating AetherLux™ Heat Pump for Potential Long-Term Supply Deal; Certification Accelerated', 'https://investors.worksport.com/post/worksport-confirms-government-evaluating-aetherlux-tm-heat-pump-for-potentiallong-term-supply-deal-certification-accelerated'],
  ['January 27, 2026', 'Worksport Subsidiary Terravis Energy Selects Major Asian Manufacturing Partner for Breakthrough ZeroFrost™ Heat Pump; Announces Path to Commercialization Within 2026', 'https://investors.worksport.com/post/worksport-subsidiary-terravis-energy-selects-major-asian-manufacturing-partner-for-breakthrough-zerofrost-tm-heat-pump-announces-path-to-commercialization-within-2026'],
  ['2026', 'Worksport Secures U.S. Patent for “Industry-First” ZeroFrost Heat Pump Through Its Subsidiary, Terravis Energy', 'https://investors.worksport.com/post/worksport-nasdaq-wksp-secures-u-s-patent-for-industry-first-zerofrost-heat-pump-through-its-subsidiary-terravis-energy'],
  ['October 6, 2025', 'Worksport Subsidiary Terravis Energy Selected for Competitive NTAP Award to Analyze ZeroFrost™ Heat Pump Technology in Alaska', 'https://investors.worksport.com/post/worksport-subsidiary-terravis-energy-selected-for-competitive-ntap-award-to-analyze-zerofrost-tm-heat-pump-technology-in-alaska'],
  ['March 6, 2025', 'AetherLux’s ZeroFrost™ Heat Pump Technology: Proven, Measured, and Setting a New Standard in the HVAC Industry', 'https://investors.worksport.com/post/aetherluxs-zerofrost-tm-heat-pump-technology-proven-measured-and-setting-a-new-standard-in-the-hvac-industry'],
  ['February 11, 2025', 'Worksport Subsidiary Terravis Energy Unveils Revolutionary Heat Pump, Eliminating Defrost Cycles and Shattering Performance Standards: AetherLux™', 'https://investors.worksport.com/post/worksport-subsidiary-terravis-energy-unveils-revolutionary-heat-pump-eliminating-defrost-cycles-shattering-performance-standards-aetherlux-tm'],
  ['January 22, 2025', 'Worksport Subsidiary Terravis Energy Announces Two Major Heat Pump Breakthroughs, Begins 20-Day Countdown', 'https://investors.worksport.com/post/worksport-subsidiary-terravis-energy-announces-two-major-heat-pump-breakthroughs-begins-20-day-countdown'],
];

document.addEventListener('DOMContentLoaded', async () => {
  await loadManifest();
  renderBundles(TVE_BUNDLES); renderLogos(TVE_LOGOS, null); renderGallery(TVE_IMAGES, 99); renderVideos(TVE_VIDEOS, 99); renderNews(TVE_NEWS, 99);
  wireCommon();
});
