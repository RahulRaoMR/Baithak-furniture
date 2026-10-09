# Baithak Final QA and Launch Readiness

Date: 9 October 2026. Scope: Phase 7, local production preview.
FINAL STATUS: NOT READY TO DEPLOY.
Technical fixes and local verification are complete. Content approval, legal readiness and production configuration are not complete.
No deployment, commit, GitHub push, assumed production domain, analytics or redesign was performed.

## A. Final Build Result

npm run build: PASS, 1633 transformed modules, zero errors and no build warnings.
npm test: PASS, two focused tests covering supported/invalid phone formats.
git diff --check: PASS.

| Final output | Bytes | Decimal size / local gzip |
| --- | --- | --- |
| Entry JS | 291791 | 291.79 kB; gzip 87.95 kB |
| Entry CSS | 87207 | 87.21 kB; gzip 15.62 kB |
| All JS, 18 files | 396409 | 396.41 kB; gzip 116.15 kB |
| All CSS, 6 files | 104509 | 104.51 kB; gzip 20.51 kB |
| All images, 407 files | 53077911 | 53.08 MB |
| Entire dist, 433 files | 53581155 | 53.58 MB |

Storage totals include fallbacks and variants, not a claimed page transfer size.
The image pipeline produces 406 files and retains all 206 originals; the unchanged logo is emitted separately.
Generated outputs remain ignored and reproducible via the prebuild hook. Sharp is a build dependency, not browser code.

## B. Accessibility Result

52 axe WCAG-tagged scans cover all 38 public routes on desktop, nine mobile route states (including 404), mobile navigation, WhatsApp, product, project and sofa viewers.
Final scans report only existing color-contrast findings; no remaining label-name mismatch or unfocusable scrolling-region finding.
All scanned pages have one H1, no missing image alt attributes and no skipped heading level in the manual structure scan.
An empty decorative hero alt is intentional, not a missing alt.

21 expanded keyboard/form check groups pass, plus the prior 23 product/project/gallery/enquiry regression groups.
Tab/Shift+Tab, Enter/Space, ArrowDown, customization Left/Right/Home/End, gallery arrows, Escape, inert background isolation, focus trapping and opener restoration were tested where applicable.
The sole tab stop in the customization tablist tracks aria-selected; aria-controls points to the current panel.
Skip links target/focus main content. Existing focus-visible outlines remain; the craftsmanship strip now has a named keyboard-focusable group and focus outline.
Navigation and enquiry/viewer dialogs have appropriate labels and modal semantics.
Visible card/related-link text is no longer overridden by mismatched aria-label values.
The standalone customization panel now uses H2 under H1, with the same typography.

Remaining contrast includes light text on orange primary controls (~2.87:1), some small orange/muted labels and CTA secondary text. These are SHOULD FIX, not claimed compliant.
No colours, business wording or layout were changed solely to chase an audit score.
Automated scans are not screen-reader certification; real NVDA/VoiceOver/browser/device testing remains on the launch checklist.

## C. Navbar ArrowDown Fix

Confirmed cause: focus was attempted while the CSS opening transition still reported the first link as visibility:hidden, not a focusable decorative arrow.
ArrowDown now requests focus even if hover has already opened the menu; a cancellable frame callback waits for actual visibility.
Closing/Escape clears the pending request; hidden menu links are inert and aria-hidden.
Decorative navigation chevrons/menu/close icons are aria-hidden and focusable=false.
Desktop ArrowDown, hover + ArrowDown, reduced motion, Shift+Tab, Enter/Space toggling and Escape restoration pass.
Mobile Furniture and Collections accordions, menu focus trap, aria-expanded, native link activation and closing restoration pass at the appropriate widths.

## D. Mobile LCP Before and After

Measured BEFORE editing: performance 79, LCP 5.41 s, CLS 0.
Final AFTER: performance 84, LCP 4.50 s, CLS 0.
The LCP element is img.hero-media, not the heading/logo. It remains eager and high priority.

The same hero photograph now has a 1000 x 841 mobile delivery crop, left=557/top=0, mathematically matching the existing 64% object-position framing at <=767px.
Its source height and WebP quality 86 are unchanged; no aggressive blur/compression or new image was introduced.
Mobile WebP: 189924 bytes versus the existing 334254-byte full landscape WebP, 43.2% smaller.
The mobile JPEG fallback is 304681 bytes. Desktop/tablet retain the full-width responsive source.
Exactly one selected hero preload/request is observed on home; no hero preload is present on Privacy. No gallery preload was added.
Final screenshots confirm the existing mobile framing; Contact's tall crop also receives a full-resolution source hint rather than a small 640px image.

The under-2.5-second target was NOT reached. This is not blamed on an unproven environment restriction.
The audit still identifies render-blocking shared CSS (~150 ms estimated opportunity) and image transfer/compression opportunities. The hero depends on the client-rendered React startup path.
The final observed localhost trace has approximately 816 ms of element-render delay after early discovery/loading. This observed breakdown is not the same as the simulated 4.50-second LCP metric.
Further work should measure the client render path, proven CSS/JS reductions and real hosting cache/compression before sacrificing image quality or attempting a rendering architecture change.

## E. Final Lighthouse

Lighthouse 13.5.0; production homepage preview; desktop preset and default simulated mobile. No run warnings.
These are local lab samples, not production guarantees.

| Mode | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Phase 6 desktop | 99 | 97 | 100 | 100 | 0.98 s | 0 |
| Phase 6 mobile | 79 | 97 | 100 | 100 | 5.41 s | 0 |
| Phase 7 desktop | 99 | 97 | 100 | 100 | 0.99 s | 0 |
| Phase 7 mobile | 84 | 97 | 100 | 100 | 4.50 s | 0 |

Earlier Phase 7 local runs measured desktop 98 and mobile 83; variation is retained here, not concealed.
Final mobile FCP 1.39 s and TBT 68.5 ms.
Accessibility score 97 does not mean all WCAG contrast failures were resolved.

## F. Route Crawl Result

All 38 known linked routes pass on the actual production preview, at 1440/1280/1024/768/430/390/360: 266 route/width checks.
No missing image/CSS/JS response, decoded-image failure, horizontal overflow, console/page error, broken internal route/anchor or external tracking request.
All titles/descriptions match the route metadata source; no accidental Home fallback.
Unknown page/product/project paths render client 404/noindex; returning to Home restores normal indexing.
Direct deep links and refreshes are covered locally. Production HTTP status/rewrite behavior is NOT yet verified.

All four products match the existing name/category/image/breadcrumb/related-item data and enquiry destination on mobile.
All three projects match the existing title/category/location/image and related-project data. This verifies binding, NOT accuracy of unconfirmed business facts.
Current product/project galleries each contain only their supplied hero; no extra photos or arrow controls were invented.
Project 03 remains visibly Custom Woodwork with a seating image; owner correction/confirmation is still required.

### Final Route Inventory

Status is local preview status. Utility invalid examples are not sitemap entries.

### HOME

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/` | HTTP 200; correct render | Baithak \| Custom Furniture & Upholstered Furniture in Bengaluru | Yes |

### MAIN PAGES

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/about` | HTTP 200; correct render | About Baithak \| Custom Furniture in Bengaluru | Yes |
| `/contact` | HTTP 200; correct render | Contact Baithak \| Furniture Enquiries in Bengaluru | Yes |
| `/materials` | HTTP 200; correct render | Materials & Finishes \| Baithak | Yes |
| `/collections` | HTTP 200; correct render | Furniture Collections \| Baithak | Yes |
| `/customise` | HTTP 200; correct render | Customise Your Furniture \| Baithak | Yes |
| `/our-work` | HTTP 200; correct render | Our Work \| Baithak | Yes |

### CATEGORY PAGES

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/sofas` | HTTP 200; correct render | Sofas & Sectionals \| Baithak | Yes |
| `/custom-woodwork` | HTTP 200; correct render | Custom Woodwork & Upholstered Walls \| Baithak | Yes |
| `/sectionals` | HTTP 200; correct render | Sectionals \| Baithak | Yes |
| `/chairs` | HTTP 200; correct render | Chairs \| Baithak | Yes |
| `/recliners` | HTTP 200; correct render | Recliners \| Baithak | Yes |
| `/ottomans-benches` | HTTP 200; correct render | Ottomans & Benches \| Baithak | Yes |
| `/beds` | HTTP 200; correct render | Beds \| Baithak | Yes |
| `/bedside` | HTTP 200; correct render | Bedside Furniture \| Baithak | Yes |
| `/dining` | HTTP 200; correct render | Dining Tables \| Baithak | Yes |
| `/dining-chairs` | HTTP 200; correct render | Dining Chairs \| Baithak | Yes |
| `/coffee-tables` | HTTP 200; correct render | Coffee Tables \| Baithak | Yes |
| `/side-tables` | HTTP 200; correct render | Side Tables \| Baithak | Yes |
| `/tables` | HTTP 200; correct render | Tables \| Baithak | Yes |
| `/custom` | HTTP 200; correct render | Custom Furniture \| Baithak | Yes |

### COLLECTION PAGES

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/collections/living` | HTTP 200; correct render | Living Collection \| Baithak | Yes |
| `/collections/seating` | HTTP 200; correct render | Seating Collection \| Baithak | Yes |
| `/collections/bedroom` | HTTP 200; correct render | Bedroom Collection \| Baithak | Yes |
| `/collections/dining` | HTTP 200; correct render | Dining Collection \| Baithak | Yes |
| `/collections/tables` | HTTP 200; correct render | Tables Collection \| Baithak | Yes |
| `/collections/bespoke` | HTTP 200; correct render | Bespoke Collection \| Baithak | Yes |

### PRODUCT PAGES

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/furniture/aster-sofa` | HTTP 200; correct render | Aster Sofa \| Baithak | Yes |
| `/furniture/noma-chair` | HTTP 200; correct render | Noma Lounge Chair \| Baithak | Yes |
| `/furniture/arden-dining` | HTTP 200; correct render | Arden Dining \| Baithak | Yes |
| `/furniture/mira-bed` | HTTP 200; correct render | Mira Bed \| Baithak | Yes |

### PROJECT PAGES

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/our-work/project-01` | HTTP 200; correct render | The Living Room, Reconsidered. \| Baithak | Yes |
| `/our-work/project-02` | HTTP 200; correct render | Built Around Comfort. \| Baithak | Yes |
| `/our-work/project-03` | HTTP 200; correct render | Made to Belong. \| Baithak | Yes |

### POLICY PAGES

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/privacy` | HTTP 200; correct render | Privacy Policy \| Baithak | Yes |
| `/terms` | HTTP 200; correct render | Terms & Conditions \| Baithak | Yes |

### UTILITY PAGES

| Route | Status | Title | Indexable |
| --- | --- | --- | --- |
| `/furniture` | HTTP 200; correct render | Furniture \| Baithak | Yes |
| `/bespoke-furniture` | HTTP 200; correct render | Bespoke Furniture \| Baithak | Yes |
| `/not-real` (invalid example) | SPA HTTP 200; client 404/noindex | Page Not Found \| Baithak | No |
| `/furniture/not-a-product` (invalid example) | SPA HTTP 200; client 404/noindex | Page Not Found \| Baithak | No |
| `/our-work/not-a-project` (invalid example) | SPA HTTP 200; client 404/noindex | Page Not Found \| Baithak | No |

## G. WhatsApp and Contact Result

Contact and floating forms reject empty/spaces-only names, malformed/letter-containing phones, repeated-digit values and unsupported prefixes.
Both use src/utils/enquiry.js, preserving the existing Contact validation contract and normalizing accepted national/+91/space/hyphen formats.
Valid-format submissions contain trimmed names, +91-normalized phones, selected furniture/project and details.
Contact details remain required; floating project details remain optional.
Synchronous repeated submission opens one prepared destination, not two. The WhatsApp destination is unchanged.
Tests intercept window.open; no message/customer enquiry was sent. Feedback does not claim delivery.

Launcher/dialog checks pass at 360/390/430/768/1440.
The reserved launcher area now includes tablet widths up to 1023; desktop root/scroll clearance prevents essential CTA/footer overlap without changing the floating icon.
Popups keep focus isolation, trapping, Escape, validation, dropdown and restoration.
All eight configured contact destinations are present; all 38 routes' external new-tab links include noopener noreferrer.
Phone/email app launching and real WhatsApp delivery require an owner/device test. Public social-page fetches were unavailable in this environment; account reachability/ownership is NOT claimed verified.

## H. SEO Result

38 unique titles and 38 unique descriptions; route-specific OG and Twitter text match them.
Normal routes remain index,follow; invalid routes noindex,follow. No Product schema, false commercial facts, tracking or unconfirmed domain added.
Minimal business schema and robots.txt remain as reviewed in Phase 6.
Policies are footer-linked, responsive and titled; their descriptions of prepared WhatsApp messages, no checkout, no form database and no analytics match the implementation.
Legal/business review is still required.

## I. Image and Content Launch Blockers

LAUNCH BLOCKER - CONTENT ASSET: all four P1 files are still public and unchanged.

| Image | Public routes |
| --- | --- |
| gallery/archive-048.jpg | /custom-woodwork, /our-work, /beds, /collections/bedroom, /collections/bespoke |
| gallery/dining-chair-003.jpeg | /dining-chairs, /collections/dining |
| gallery/dining-chair-005.jpeg | /dining-chairs, /collections/dining |
| gallery/dining-chair-006.jpeg | /dining-chairs, /collections/dining |

Visual review confirms source marks on archive-048/003, Made with AI on 005, and repeated Legno watermark on 006.
These observations do not alone prove infringement; approved rights and truthful Baithak attribution are not established.
No original image or protected delivery copy was modified/deleted; all 206 hashes, including the logo, match Phase 5.
No important category was hidden and no stock photograph substituted.
Aster/Noma/Arden/Mira names, image ownership, project titles/locations, Project 03 category and process/manufacture claims still need owner approval.
Unknown technical specifications remain null/hidden; no facts were guessed. CONTENT-REVIEW.md remains the full source of unresolved content.

## J. Branding Status

FAVICON STILL REQUIRED.
SHARE IMAGE STILL REQUIRED.
No new approved square mark or landscape share asset was supplied. Official logo artwork/favicon remain unchanged.

## K. Domain-Dependent Items

Confirmed origin/host and authorised deployment access are still missing for this phase.
Canonical, og:url, approved absolute share-image URLs and production sitemap/robots Sitemap entry remain deferred.
No localhost sitemap or guessed production URL was generated.
LAUNCH-CHECKLIST.md identifies the exact files and post-domain steps, alias policy, social-crawler head rendering and true HTTP 404 decisions.

## L. Security and Git Hygiene

Scan of 60 frontend/config files found no hardcoded secret pattern, debug logging, localhost URL in production logic or analytics/pixel code. This is a focused scan, not a penetration test.
npm audit reported zero known dependency vulnerabilities at check time.
Environment variants, local/log files, node_modules, dist, generated delivery files/manifests/report are ignored; .env.example may be tracked but must never contain secrets.
No passwords, private tokens or deployment credentials are included in these notes.
Existing uncommitted work is preserved. No commit, push or deployment performed.

## M. Deep-Link Requirements

The host must serve real files normally and rewrite application paths without physical files internally to index.html while preserving the URL.
The custom React router then displays the requested route or its own 404; redirecting all paths to / would lose deep links.
Existing vercel.json has a SPA fallback. It was not changed, deployed or considered evidence that live hosting works.
Vercel/Netlify/Nginx preparation notes and primary documentation links are in LAUNCH-CHECKLIST.md.
Missing assets must not be cached as HTML. Real HTTP 404 semantics and route-specific non-JS share metadata need a hosting/prerender strategy.

## N. Launch Checklist Result

LAUNCH-CHECKLIST.md created with before-deployment approvals, exact P1 routes, domain setup, build/deep-link notes and after-deployment owner/device/Search Console checks.
CONTENT-REVIEW.md and PERFORMANCE-REVIEW.md are preserved with clearly labelled Phase 7 addenda.

## O. Outstanding Classification

BLOCKER: unapproved public content-asset rights/attribution; unconfirmed published product/project identities and Project 03 category mismatch; legal/business sign-off; missing confirmed production host/domain/access and unverified production routing.
SHOULD FIX: existing contrast, mobile LCP above target, square favicon/share image, externally verified contact/social destinations, fuller confirmed catalogue facts, route-head/true-404 strategy.
OPTIONAL: valid richer schema once facts exist; additional approved gallery photographs; further proven CSS/bundle cleanup and cross-browser automation.

## P. Final Status

NOT READY TO DEPLOY.
Local technical QA is complete. The outstanding content/brand, legal and production-configuration approvals genuinely prevent a responsible launch.
No deployment or GitHub push was performed. Stop here pending explicit approved inputs/publication instructions.
