# Scarlett Chen — Portfolio

React + Vite single-page portfolio. Current design follows the supplied dot-grid reference and the separate two-column right-sidebar reference. Reference documents, original photos and original videos remain untouched.

## Development

If npm is available: `npm run dev`, and `npm run build` for production.

On this computer, Node is available while npm is not on PATH. With dependencies already installed:

```powershell
cd C:\Users\cqqq3\Desktop\portfolio
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173
# Build:
node node_modules/vite/bin/vite.js build
```

Preview: http://127.0.0.1:5173/. If Vite reports that the port is occupied, an existing server may already be running.

## Replace content

Edit `src/content.js` for project names, images, videos and verified contact links. Project order: Barbour, New Balance, SKP, A Day in Bubble, Boucheron, 3D Works. Supplied bilingual overviews and client, role and year metadata are displayed. About appears between Hero and Work. Source-to-web asset mappings are listed in `design/used-project-media.md`. Images preserve their proportions; videos appear before images and autoplay muted on a loop, with native playback controls and metadata preloading.  Project dates, roles and descriptions use the supplied copy.

No resume was present during initial setup. Education and disciplines come from the brief; Contact now displays the supplied name, phone, WeChat and email. The iFI logo uses the supplied Institute for Fashioning Innovation image. No reference artwork or fabricated client imagery is displayed. Selected supplied 3D work is now included.

Visual direction: neutral dot-grid background, left two-line name, transparent right numbered outline flower using the earlier contour, left continuous SVG route measured from real sections, and a fixed right navigation/ticker rail. Route drawing and ticker movement respect reduced-motion settings. No scroll hijacking or animation library.


## Latest review changes

About uses the exact revised single-paragraph introduction, Education / Software columns and eight transparent black client logos, with optical sizing and no graduation year. Software remains two columns on mobile. Client provenance is recorded in design/client-logo-sources.md.

New Balance and Barbour use the latest supplied bilingual copy. New Balance's first photographs sit side by side; its videos preserve native aspect ratios, with column widths proportioned to give matching desktop heights. The invitation note is removed.

The flower has one floating SVG head and a stationary SVG stem/leaf. ASCII faces change discretely. Its first touch flies the head away; Work entry docks it at Route's measured drawing tip, and Home return reassembles it. Separate Home / Work thresholds and cancellable transitions prevent reversals and duplicate heads. Reduced motion switches states directly. Run node design/flower-journey.test.mjs for state, coordinate tracking and reduced-motion checks.

Contact includes a separate SVG chair with occasional idle movement, hover and click expressions. Expressions remain horizontal. Dot interaction retains its 24px grid, subtle enlargement and 800ms fade; touch and reduced-motion backgrounds stay static.

The latest review adds a shared DesignStrip to New Balance and Barbour. Eight numbered source units per project loop at 30 CSS pixels/second; distances are measured per group, and both video copies autoplay muted inline without controls. New Balance uses a uniform source-pixel scale to preserve relative sizes; Barbour uses a uniform scale with a smaller round badge. Reduced motion wraps the original group as static content. The flower begins its outgoing arc while Home is still visible, retains a 40px desktop / 36px compact head, and adds a side-oriented colon/dash/curve face.

## October 12 content update

SKP is explicitly presented as a pitch / proposal, with four source images and a supplied window-animation study. 3D Works selects two distinct works. A Day in Bubble is a title placeholder, as requested while `项目图片/barbour guideline` is empty. Full selection and omission records: `design/new-project-media-selection.md`. Contact uses a horizontal information grid and rotating eight-ray asterisk; its three external URLs remain configurable and unset. New Balance uses the requested replacement photo and 160px desktop / 120px mobile strip video. The route flower is 48px desktop / 40px mobile, with an orange-red heart and white expression while docked.

Latest review supersedes the earlier placeholder: the fourth project is now A Day in Barbour, with the supplied KOL video-layout guideline (portrait, 576×1024). SKP uses the supplied bilingual copy, six interleaved landscape/detail images in the existing seamless strip, then the full-width film. No duplicate static gallery. Contact platform URLs are now configured, and the ArtStation SVG is sourced from Simple Icons. Only the docked marker gets a regular five-petal contour; the home flower remains unchanged.

## Unified reveal and Hero motion
`src/components/useScrollReveal.js` adds once-only IntersectionObserver reveal to 58 content blocks, without wrapping or moving layout containers. Titles: 32px/850ms; body:24px/760ms; still images:32px/950ms; video containers:25px/850ms; marquee:whole-component fade only. Descriptions stagger 110/230ms and metadata 340ms. Reduced motion, absent/failed observer, and an on-screen visibility watchdog keep content readable. `design/scroll-reveal.test.mjs` covers once-only behavior and fallback paths.
Hero uses the shared `--content-inset` variable to align its title, intro, and scroll link with About on desktop. A compact static metadata header replaces SC/occupation. The title has its own 950ms decode, excluded from reveal.
The original home flower paths remain intact; nested groups and the existing frame controller add a 3.1s head sway, subtle stem bend and delayed leaf sway. Flight takes over smoothly, and reduced motion disables sustained sway. Red node diameters are 35% larger, with their labels unchanged. SKP has no hover pause.

## Latest repeatable reveal review
This supersedes the once-only reveal description above. The same hook now observes an 80%-of-viewport entry line, holds shown content until it fully exits the viewport plus 12px, resets instantly offscreen, and replays in either direction. Stable bounds subtract the reveal translation to avoid observer feedback. Text uses 40px / 1150ms; images/videos 50px / 1250ms; base delay is 200ms with group stagger. Whole-marquee fade remains separate from its continuously moving inner track. Reduced-motion and failure paths show content directly. The title still decodes once per mount, now over 2050ms with discrete Riso character colors; a fixed original text line and measured character slots retain its original geometry.
3D Works now uses the editorial gallery in ThreeDGallery.jsx; see design/3d-editorial-layout.md for exact source mappings. Header metadata aligns to the existing title; the old route-start anchor remains in place while only its visible star moves to the header. Docked flower lobes have controlled individual variations; home flower geometry is unchanged.

## Latest seven-comment completion
- Removed homepage header star and Contact star, including their unused rotation styling; metadata/text positions remain intact.
- Route starts at measured chapter 00 and ends exactly at measured chapter 07, with no upper/lower extension. Existing chapter marker shapes/positions are preserved; fill colors in order are #FF6A00, #FF48B0, #2454FF, #00A95C, #F5D000, #9B51E0, #00B8C4, #FF4B3A.
- The same flower uses the retained original asymmetric head path in marker mode. Past 07, measured scroll progress controls a reversible Bezier curve to an empty measured anchor in Contact. Its miniature size is constant throughout this trip. A short smoothing response handles wheel jumps and reversals; it rotates gently at the anchor, and reduced motion switches directly. The 07 chapter marker stays visible once the flower leaves the line.
- Both 3D studies share ModelStudy, with exact Sake House source mapping in design/3d-editorial-layout.md.
- Shared Reveal is 600ms / 16px with 0–40ms ordinary delays, 60ms group staggering, and a 90% entry line; repeat-on-reentry and full-exit reset remain.
- Riso title decode is 800ms, with glyph/color updates every 42ms; its colors, Syne font and fixed text geometry are unchanged.
- Tests: design/contact-route.test.mjs and extended design/flower-journey.test.mjs cover forward/reverse endpoints, same-head continuity, short-page limits and reduced motion.
