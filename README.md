# Supernova EV Charging Solutions — Interactive Prototype

Open `index.html` in a browser. The prototype contains 13 connected pages and shared responsive CSS/JavaScript.

Pages: Home, Commercial Charging, CPO, Home Charging, Franchise, EV Drivers, Our Chargers, About Us, Success Stories, Success Story Detail, News & Updates, News Article Detail, Contact & FAQs.

The design uses original CSS/SVG visuals and the Supernova black/white/Electric Cyan palette.


Build: v16-cache-busted

## v18 update
- Replaced the global site background with the newly supplied dark universe image (`assets/background-universe-v18.jpg`).
- Loader now uses a pure black full-screen canvas above every site layer.
- Site content is hidden until loading completes.
- Loader is guaranteed to remain visible for at least 3 seconds, then fades into the website.


## v19 update
- Franchise Partners card now uses the supplied EV station image on hover.
- Loading state remains pure black for 2 seconds.
- The site fades in slowly after loading instead of appearing abruptly.
- HTML references cache-busted v19 CSS/JS assets.

## v20 update
- Added a dedicated dark overlay above the Franchise Partners hover image.
- Added a smoother fade-in/scale reveal for the Franchise Partners hover image.
- Kept hover text/CTA layered above the overlay for readability.
- Stylesheet cache-busted to `assets/style-v20.css`.

## v26 update
- Re-encoded the 3rd-section cinematic background for smoother scroll scrubbing at 1280×720 with frequent keyframes.
- Added a true black fade-in at the beginning and fade-out to black at the end of the mission video.
- Reduced the mission statement size so more of the film remains visible.
- Highlighted “future of sustainable transportation” and “safe, accessible, and intelligent” in Electric Cyan `#01C2D8`.
- Decoupled video seeking from the main scroll handler and eased media seeks at ~30 fps to reduce scroll stutter.
- Added a compositor-friendly vertical parallax movement to the mission video and refined global element-relative parallax.
- Removed the large blurred mission text backing layer to reduce GPU work.
- CSS validated with `tinycss2` with zero parse errors; JavaScript syntax validated with Node.

## v27 update
- Redesigned every inner-page hero with a split editorial layout and an interactive Supernova energy sculpture.
- Added a scroll-revealed statement section to every inner page, using Electric Cyan accents and lightweight parallax.
- Reworked process/how-it-works sections into interactive luminous step flows with pointer-following cyan hover light.
- Enhanced EV Driver journey steps with matching hover/focus light effects.
- Standardized the “Let’s Get Started!” to footer spacing across all pages and added the same bottom cyan gradient atmosphere used on the homepage.
- Restored a staggered scroll entrance animation for the homepage solutions section.
- Reduced scroll-time rendering cost by removing blur from reveal animations and lowering mission video seek frequency to ~24 fps.
- Added parallax motion to redesigned inner-page hero and statement elements while keeping transforms compositor-friendly.
- Cache-busted all HTML references to `assets/style-v27.css` and `assets/site-v27.js`.
- Fixed a pre-existing malformed CSS `will-change` declaration; full stylesheet parses successfully with PostCSS and JavaScript passes Node syntax validation.

## v28 update
- Franchise page hero is now a sticky, scroll-scrubbed cinematic section using `assets/franchise-scroll-video-v28.mp4`.
- The video is mapped in reverse to downward page progress: scrolling down scrubs backward; scrolling up scrubs forward.
- The hero provides enough scroll travel to traverse the complete 10-second clip before leaving the section.
- Added a dark cinematic overlay, subtle grid/parallax motion, and a progress indicator while preserving the franchise CTA.
- CSS: `assets/style-v28.css`; JavaScript: `assets/site-v28.js`.

## v29 updates
- Franchise hero scroll-scrub direction reversed from v28: scrolling down advances the full video from start to finish; scrolling up rewinds it. Boundary frames are pinned so the clip reaches the beginning/end before the neighboring section.
- Breadcrumb navigation added across all 13 pages.
- Inner-page content-card icons replaced with semantic animated SVG line icons. Process / How It Works step visuals are intentionally unchanged.
- Cache-busted assets: `assets/style-v29.css` and `assets/site-v29.js`.


## v30 update
Franchise hero now uses franchise-scroll-video-v30.mp4 with a film-first scroll phase, copy-only hold phase, full-experience progress bar, and lower breadcrumbs.

## v31 update
- Franchise hero uses the newly supplied `zoom2.mp4` footage.
- Added a baked-in 0.85s fade from black at the start and 0.85s fade to black at the end.
- Preserved scroll-driven playback behavior from v30.
- Cache-busted frontend assets to `style-v31.css` and `site-v31.js`.

## v32 update
- Franchise hero now uses `zoomFinal.mp4`, optimized for scroll scrubbing with a baked fade from black and fade to black.
- Our Chargers hero now uses `ChargerVid.mp4` with the same pinned film-to-copy scroll interaction used by the Franchise hero.
- Both scroll heroes play forward while scrolling down and rewind while scrolling up; the full film completes before the copy-only phase.

## v33 updates
- Added `SNAPP.mp4` to the EV Drivers hero as an optimized scroll-scrub cinematic (`assets/drivers-scroll-video-v33.mp4`).
- EV Drivers hero now uses the same film → black/copy phase behavior as Franchise and Our Chargers.
- Removed the standalone Supernova mobile app section from EV Drivers.
- Moved Explore How Charging Works, App Store, and Google Play actions into the EV Drivers hero.
- Redesigned the EV Drivers How It Works section with stronger interactive states, cyan glow hover effects, animated stage orbits, and elevated phone preview motion.
- Cache-busted all pages to `style-v33.css` and `site-v33.js`.
