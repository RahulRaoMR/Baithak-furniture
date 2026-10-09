# Baithak Launch Checklist

Prepared: 9 October 2026. Developer/business-owner checklist, not customer-facing copy.
Status: NOT READY TO DEPLOY until the content, legal and production-configuration blockers below are resolved.
No deployment, Git commit or GitHub push has been performed.

## Before Deployment

- [ ] Approve Aster Sofa, Noma Lounge Chair, Arden Dining and Mira Bed names, category labels and copy, or supply exact replacements. Do not infer missing specifications.
- [ ] Confirm ownership/licensing and accurate Baithak attribution of product, project, editorial and gallery photographs, including AI/edited/reference images.
- [ ] Approve project titles and locations. Resolve Project 03's Custom Woodwork category versus its seating photograph using supplied business facts.
- [ ] Resolve the four publicly visible P1 assets listed below with approved replacements or documented permission and approved presentation. Do not use stock replacements or remove categories without instruction.
- [ ] Review the remaining P2/photo-quality/provenance items in CONTENT-REVIEW.md. Supply approved photographs where required.
- [ ] Confirm that the configured phone/WhatsApp destination, Maps address and Instagram/Facebook/YouTube/X accounts are official and usable. The email is explicitly user-supplied; code consistency is not ownership verification.
- [ ] Obtain business/legal approval of Privacy and Terms, including offline enquiry handling and actual order/cancellation/aftercare practices. Current form mechanics are accurate; this is not legal certification.
- [ ] Provide a dedicated square Baithak favicon. The official wide PNG logo remains unchanged; do not crop or redraw it.
- [ ] Provide an owned/approved landscape share image, preferably around 1200 x 630 without questionable marks. No placeholder has been fabricated.
- [ ] Confirm the production domain, hosting destination, authorised deployment access and the final publication instruction. Keep credentials outside this repository/document.
- [ ] Agree a focused contrast correction for existing orange/light text and muted CTA labels; no palette redesign was made in this QA phase.
- [ ] Run npm test and npm run build on the intended build environment. Publish dist, not the source directory.
- [ ] Verify the image-generation prebuild hook runs with dev/build dependencies installed. Sharp is required during build; generated images/manifests are deliberately not committed.
- [ ] Configure and test application deep links, real static asset delivery, HTTPS, HTML refresh/cache policy and content-hashed asset caching.

### LAUNCH BLOCKER - CONTENT ASSET

All four originals and their delivery copies remain unchanged. They were not hidden or promoted.

| Source file | Observed concern | Current public routes |
| --- | --- | --- |
| src/assets/images/gallery/archive-048.jpg | Lower-right source mark; rights/attribution unconfirmed | /custom-woodwork, /our-work, /beds, /collections/bedroom, /collections/bespoke |
| src/assets/images/gallery/dining-chair-003.jpeg | Lower-right third-party-looking mark; rights/attribution unconfirmed | /dining-chairs, /collections/dining |
| src/assets/images/gallery/dining-chair-005.jpeg | Visible Made with AI label; truthful product/reference presentation and rights not approved | /dining-chairs, /collections/dining |
| src/assets/images/gallery/dining-chair-006.jpeg | Repeated Legno watermark; rights/attribution unconfirmed | /dining-chairs, /collections/dining |

A watermark or AI label alone does not prove infringement. These are launch blockers because approved use and truthful attribution have not been established.
See CONTENT-REVIEW.md for the full unresolved catalogue and image review; existing original paths still apply.

## Domain Setup

- [ ] Supply the confirmed HTTPS production origin; select the preferred www/non-www host and redirect the alternate host.
- [ ] Add one route-appropriate absolute canonical URL per indexable route via src/utils/seo.js. Keep unknown/404 views noindex and without a misleading canonical.
- [ ] Add route-specific og:url using the confirmed origin.
- [ ] Add absolute og:image and twitter:image URLs for the approved share image; change Twitter to summary_large_image when that real asset exists.
- [ ] Generate the production sitemap from publicRoutes in src/data/routes.js, using only approved public canonical routes. Resolve whether legacy aliases should redirect before submitting them as separate URLs.
- [ ] Add the real sitemap URL to public/robots.txt. Never include localhost or an assumed domain.
- [ ] Verify routes update title, description, OG/Twitter text and normal robots metadata after leaving a 404.
- [ ] Decide on route-head prerendering/server rendering if social previews on secondary pages are required. Non-JavaScript crawlers currently see the index.html homepage baseline.
- [ ] Decide how to emit real HTTP 404 status for invalid routes without breaking valid SPA deep links. Current local SPA fallback returns HTTP 200 with client-side 404/noindex.

## Production Deep Links

This is a Vite SPA with a custom pathname router. Serve existing files normally; application paths that have no physical file need an internal fallback to index.html, not a redirect to the homepage URL. React then renders the requested page or its own 404. Preserve the pathname.

- Vercel: vercel.json already contains the SPA rewrite to /index.html. Configure the correct project root, npm run build and dist output directory. Test real image/JS/CSS/robots paths after deployment; a rewrite is not proof that hosting is configured.
- Netlify-style static hosting: configure a final, non-forced fallback /* /index.html 200 after any specific rules. Existing files must keep normal delivery. Add this only when that host is chosen.
- Nginx-style hosting: use a web root pointing at dist and application fallback such as try_files $uri $uri/ /index.html. Keep /assets/ and /images/ locations on try_files $uri =404 so missing assets do not return HTML.
- Other static hosts: enable their equivalent SPA fallback, or generate host-appropriate route pages. Do not assume clean deep links work by default.

These are preparation notes, not applied server changes. A broad SPA fallback typically returns HTTP 200 for invalid application paths; a true HTTP 404 requires a route-aware hosting/prerender strategy.
Do not aggressively cache index.html. Test browser refreshes, unknown routes and missing assets before declaring production readiness.

Sources: [Vercel Vite SPA guidance](https://vercel.com/docs/frameworks/frontend/vite), [Netlify rewrites](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/), [Nginx try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files).

## Local Verification

```powershell
npm install
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

If the preview port is occupied, choose another free port; do not stop an existing user server.
Preview is a local test server, not a production hosting recommendation.
Check /contact, /sofas, /furniture/aster-sofa, /our-work/project-01, /materials, /privacy, /terms and /not-real by entering each URL directly and refreshing it.
No QA test sent a WhatsApp message or customer enquiry.

## After Deployment

- [ ] Test every linked route, direct deep link, refresh and invalid slug on the production URL.
- [ ] Verify missing assets fail as assets, not as successful HTML responses.
- [ ] Test WhatsApp on a real mobile device and desktop, including normalised phone formats and duplicate-submit protection. Opening a prepared message is not proof of delivery.
- [ ] Test phone, email and Maps in their intended applications. Verify the actual recipient/place, not just URL syntax.
- [ ] Verify Instagram, Facebook, YouTube and X destinations using an authorised owner account where public access is limited.
- [ ] Confirm external new-tab links retain rel="noopener noreferrer".
- [ ] Run desktop and mobile Lighthouse on the production URL; record Performance, Accessibility, Best Practices, SEO, LCP and CLS.
- [ ] Check mobile widths 360/390/430, tablet 768/1024 and desktop 1280/1440, including menus, forms, viewers, footer and launcher clearance.
- [ ] Test Tab/Shift+Tab, Enter/Space, ArrowDown/arrow keys and Escape with keyboard only, reduced motion and a real screen reader.
- [ ] Test approved favicon and social cards on actual sharing platforms; confirm per-route metadata is available to their crawlers.
- [ ] Set up Search Console using authorised owner access, verify the confirmed domain and submit the production sitemap.
- [ ] Recheck contact/policy wording if hosting logs or enquiry processing differ from the reviewed implementation.
- [ ] Do not add analytics, advertising pixels, tracking cookies or new business claims without a separate instruction and corresponding privacy review.

## Outstanding Classification

BLOCKER: unapproved publicly visible P1/reference-photo use and attribution; unconfirmed public product/project identity and Project 03 mismatch; business/legal sign-off; unprovided production domain/host/access and unverified live deep-link configuration.

SHOULD FIX: existing text contrast; mobile LCP still above the 2.5-second target; square favicon/share image; fuller verified catalogue details; external account/destination verification; route-head rendering and true HTTP 404 strategy.

OPTIONAL: richer Product/business schema only after valid data exists; additional approved product/project gallery photographs; further proven CSS/bundle cleanup and repeatable cross-browser automation.

Passing technical QA does not resolve ownership, brand accuracy, legal readiness or production configuration. Final status remains NOT READY TO DEPLOY.
