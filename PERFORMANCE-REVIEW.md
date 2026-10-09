# Baithak SEO and Performance Review

Date: 9 October 2026. Scope: Phase 6 only.
No deployment or GitHub push performed. Phase 4/5 work and all unconfirmed business content are preserved.

## A. SEO Changes

- All 38 public routes now have unique document titles and route-appropriate descriptions.
- Product descriptions use the existing shortDescription; project descriptions use the existing summary, without invented facts or padding.
- Page titles and social title/description metadata update together.
- Unknown routes receive client-managed noindex; normal indexing is restored on navigation/unmount.
- No canonical, og:url, production-domain assumption, tracking or full Product schema was added.

## B. Meta System

Sources: `src/data/routes.js`, `src/hooks/usePageMeta.js`, `src/utils/seo.js`, `index.html`.
The old page-level document.title assignments were removed. The App hook owns document title, description, robots, OG and Twitter text.
Baseline head metadata remains available before React; route-specific metadata is managed client-side.
Non-JavaScript social crawlers can still see the homepage baseline on secondary routes. Route-head prerendering/server rendering is a future hosting decision, not implemented or claimed here.

## C. Structured Data

Minimal FurnitureStore JSON-LD contains only name and email from `src/data/contact.js`.
The existing, confirmed display name Baithak is now explicit in that central record; no other contact value changed.
Phone, address, Maps-derived coordinates, social ownership, opening hours, price range, service area, dates, ratings and reviews were NOT asserted in schema.
A minimal truthful entity does not guarantee a Google local-business rich result.
Product schema is deferred: names are unconfirmed and price/SKU/availability/specifications are not supplied.
JSON-LD is not emitted on the 404 view.

## D. Robots and Route Inventory

`public/robots.txt` allows crawling: User-agent: *; Allow: /. No Sitemap URL is present.
No production sitemap XML has been generated. `publicRoutes` in `src/data/routes.js` is the reusable sitemap source.
All known public routes are listed below; legacy /furniture and /bespoke-furniture aliases are retained.

| Indexable public route | Document title | Description characters |
| --- | --- | --- |
| `/` | Baithak \| Custom Furniture & Upholstered Furniture in Bengaluru | 157 |
| `/about` | About Baithak \| Custom Furniture in Bengaluru | 147 |
| `/contact` | Contact Baithak \| Furniture Enquiries in Bengaluru | 159 |
| `/materials` | Materials & Finishes \| Baithak | 150 |
| `/collections` | Furniture Collections \| Baithak | 156 |
| `/customise` | Customise Your Furniture \| Baithak | 155 |
| `/sofas` | Sofas & Sectionals \| Baithak | 150 |
| `/custom-woodwork` | Custom Woodwork & Upholstered Walls \| Baithak | 151 |
| `/our-work` | Our Work \| Baithak | 152 |
| `/privacy` | Privacy Policy \| Baithak | 156 |
| `/terms` | Terms & Conditions \| Baithak | 158 |
| `/sectionals` | Sectionals \| Baithak | 149 |
| `/chairs` | Chairs \| Baithak | 159 |
| `/recliners` | Recliners \| Baithak | 150 |
| `/ottomans-benches` | Ottomans & Benches \| Baithak | 154 |
| `/beds` | Beds \| Baithak | 153 |
| `/bedside` | Bedside Furniture \| Baithak | 168 |
| `/dining` | Dining Tables \| Baithak | 154 |
| `/dining-chairs` | Dining Chairs \| Baithak | 157 |
| `/coffee-tables` | Coffee Tables \| Baithak | 160 |
| `/side-tables` | Side Tables \| Baithak | 153 |
| `/tables` | Tables \| Baithak | 162 |
| `/custom` | Custom Furniture \| Baithak | 160 |
| `/furniture` | Furniture \| Baithak | 156 |
| `/bespoke-furniture` | Bespoke Furniture \| Baithak | 164 |
| `/collections/living` | Living Collection \| Baithak | 152 |
| `/collections/seating` | Seating Collection \| Baithak | 153 |
| `/collections/bedroom` | Bedroom Collection \| Baithak | 153 |
| `/collections/dining` | Dining Collection \| Baithak | 152 |
| `/collections/tables` | Tables Collection \| Baithak | 152 |
| `/collections/bespoke` | Bespoke Collection \| Baithak | 153 |
| `/furniture/aster-sofa` | Aster Sofa \| Baithak | 68 |
| `/furniture/noma-chair` | Noma Lounge Chair \| Baithak | 66 |
| `/furniture/arden-dining` | Arden Dining \| Baithak | 70 |
| `/furniture/mira-bed` | Mira Bed \| Baithak | 57 |
| `/our-work/project-01` | The Living Room, Reconsidered. \| Baithak | 92 |
| `/our-work/project-02` | Built Around Comfort. \| Baithak | 98 |
| `/our-work/project-03` | Made to Belong. \| Baithak | 92 |

Descriptions are approximately 140-165 characters where practical. Short existing product/project copy is intentionally not inflated.

## E. Favicon and Share Image

SQUARE BAITHAK FAVICON REQUIRED.
The current official PNG logo is 614 x 406, not a dedicated square mark. The favicon configuration and logo artwork remain unchanged; nothing was cropped/redrawn.

SHARE IMAGE REQUIRED.
No clearly approved owned landscape photograph was established in Phase 5. No OG/Twitter image was invented or selected from questionable assets.
Twitter stays on summary until an approved share image is supplied; summary_large_image can then be configured with that real asset.

## F. Image Optimization

Build pipeline: `scripts/optimize-images.mjs`, `src/utils/images.js`, `src/utils/galleryImages.js`, `src/components/ResponsiveImage.jsx`.
Run `npm run dev` or `npm run build`; their pre-hooks generate images before Vite reads its configuration.
`npm run images:build` runs the pipeline independently. Sharp is a dev/build dependency, not browser code.
Generated images/manifests/detailed JSON audit are ignored by Git and are reproducible from retained originals.
A source-hash/encoding-policy cache skips unchanged output. Bump policyVersion when changing encoding policy.
Only obsolete generated files listed by the prior report may be removed; original image directories are never pruned.

- 206 originals retained; SHA-256 comparison against Phase 5 found zero changes.
- 180 unique photo groups produce 404 delivery files. The unchanged official logo is handled separately by Vite.
- WebP quality 86; full photo width capped at 1920 without enlargement. Aspect ratios preserved.
- JPEG/transparent-PNG fallback retained. JPEG encoding uses quality 90; an already smaller original JPEG is copied instead of growing the fallback.
- Larger editorial groups use 640/1024/full-width options. Only 13 other large/heavy gallery groups receive one 640-pixel thumbnail; small gallery photos do not get unnecessary variant sets.
- Picture sources use sizes/srcSet; contained product viewers use their actual slot width. Cropped tall heroes/editorial frames and stretched gallery rows use conservative larger hints to preserve clarity, not artificially small downloads.
- Width/height attributes and existing containers reserve space. Logo, heroes and first visible gallery tiles are not lazy-loaded; below-fold images stay lazy/async.
- Hero: the SAME 1870 x 841 image, 2,851,859-byte PNG -> 334,254-byte full WebP (88.3% smaller). No replacement/crop or business-content change.
- Exactly one high-priority hero preload is inserted ONLY on /. A secondary privacy-route check confirms no hero preload/download; the homepage does not request the deferred gallery manifest chunk.
- Source EXIF audit found no non-default orientation. Existing sideways photographs were not silently rotated.
- Protected P1 files are byte-identical copies, with no WebP optimization or new hero/OG/featured use:
  `gallery/archive-048.jpg`, `gallery/dining-chair-003.jpeg`, `gallery/dining-chair-005.jpeg`, `gallery/dining-chair-006.jpeg`.
- Total image bytes below include BOTH modern images and fallbacks plus responsive variants. Browsers request selected formats/variants, not the whole directory.
- Full generated WebP directory: 22.56 MB. This is a storage figure, not a claimed page-transfer size.
- Some high-quality WebP outputs are larger than already heavily compressed JPEGs; the main measurable benefit is the large PNG/editorial reduction and responsive delivery. Ownership flags are not resolved by compression.

### Exact Duplicate Delivery Groups

No original duplicates were deleted or renamed. The same byte-identical original group shares one derivative family.
Vite already deduplicated original production assets before Phase 6; do not attribute the full image reduction to duplicate removal.
Logical path fragments preserve gallery identity/order without distinct HTTP image requests.
The collection-level Map deduplicates by the physical delivery URL, matching the previous Vite production build's content-hashed image URLs. SHA-256 sequence/label comparisons pass for all six collections: Living 19, Seating 18, Bedroom 37, Dining 15, Tables 4, Bespoke 57. The Phase 5 development counts of Bedroom 38/Bespoke 58 reflected distinct original dev URLs; production already displayed 37/57. Category galleries retain their original membership/order.

| Group | Retained original files | Shared fallback |
| --- | --- | --- |
| 1 | `src/assets/images/brand-story.png`, `src/assets/images/gallery/studio-011.png` | `public/images/brand-story-2a975f1a07.jpg` |
| 2 | `src/assets/images/category-bespoke.jpg`, `src/assets/images/gallery/archive-120.jpg` | `public/images/category-bespoke-4afae4629a.jpg` |
| 3 | `src/assets/images/category-chairs.png`, `src/assets/images/gallery/studio-014.png` | `public/images/category-chairs-b87ded9931.jpg` |
| 4 | `src/assets/images/category-sofas.png`, `src/assets/images/gallery/studio-013.png` | `public/images/category-sofas-97dccd0348.jpg` |
| 5 | `src/assets/images/category-woodwork.jpg`, `src/assets/images/gallery/archive-103.jpg` | `public/images/category-woodwork-0e098356eb.jpg` |
| 6 | `src/assets/images/collection-beds.jpg`, `src/assets/images/gallery/archive-111.jpg` | `public/images/collection-beds-1c98908348.jpg` |
| 7 | `src/assets/images/collection-chairs.png`, `src/assets/images/gallery/studio-003.png` | `public/images/collection-chairs-31645cd00b.jpg` |
| 8 | `src/assets/images/collection-dining.jpg`, `src/assets/images/furniture-arden-dining.jpg`, `src/assets/images/gallery/archive-107.jpg` | `public/images/collection-dining-eca573faf4.jpg` |
| 9 | `src/assets/images/collection-sofas.png`, `src/assets/images/gallery/studio-012.png` | `public/images/collection-sofas-d875c89981.jpg` |
| 10 | `src/assets/images/collection-tables.jpg`, `src/assets/images/gallery/archive-045.jpg` | `public/images/collection-tables-5775b9db7b.jpg` |
| 11 | `src/assets/images/collection-woodwork.jpg`, `src/assets/images/gallery/archive-100.jpg` | `public/images/collection-woodwork-041e19a3a1.jpg` |
| 12 | `src/assets/images/craftsmanship-detail.jpg`, `src/assets/images/gallery/archive-127.jpg` | `public/images/craftsmanship-detail-2d0a5a56f7.jpg` |
| 13 | `src/assets/images/craftsmanship-main.jpg`, `src/assets/images/gallery/archive-125.jpg` | `public/images/craftsmanship-main-085cd6bf47.jpg` |
| 14 | `src/assets/images/craftsmanship-upholstery.jpg`, `src/assets/images/gallery/archive-133.jpg` | `public/images/craftsmanship-upholstery-c8d7efc749.jpg` |
| 15 | `src/assets/images/craftsmanship-wood.jpg`, `src/assets/images/gallery/archive-102.jpg` | `public/images/craftsmanship-wood-2487372f77.jpg` |
| 16 | `src/assets/images/customisation-main.png`, `src/assets/images/gallery/studio-004.png`, `src/assets/images/project-01.png` | `public/images/customisation-main-ffd2f696b6.jpg` |
| 17 | `src/assets/images/furniture-aster-sofa.png`, `src/assets/images/gallery/studio-006.png`, `src/assets/images/project-02.png` | `public/images/furniture-aster-sofa-4135992df4.jpg` |
| 18 | `src/assets/images/furniture-mira-bed.png`, `src/assets/images/gallery/studio-005.png` | `public/images/furniture-mira-bed-8b5ef7d22d.jpg` |
| 19 | `src/assets/images/furniture-noma-chair.png`, `src/assets/images/gallery/studio-008.png` | `public/images/furniture-noma-chair-594ef39353.jpg` |
| 20 | `src/assets/images/gallery/archive-041.jpg`, `src/assets/images/gallery/archive-046.jpg` | `public/images/archive-041-c10a40e247.jpg` |
| 21 | `src/assets/images/gallery/archive-132.jpg`, `src/assets/images/project-03.jpg` | `public/images/archive-132-a8e466228e.jpg` |
| 22 | `src/assets/images/gallery/studio-010.png`, `src/assets/images/hero-main.png` | `public/images/studio-010-0d8cce4a30.jpg` |

### File-Level Image Audit

Dimensions/format/size in the first columns describe originals; delivery dimensions/bytes describe generated files.
Where-used values are actual rendered route use, including related items and the hero; not eager-import assumptions.
`reports/image-delivery.json` is regenerated by the pipeline with all variant files, exact bytes and duplicate mappings.
Original paths in `CONTENT-REVIEW.md` remain valid. Image authenticity/rights issues still require business approval.

| Original file | Dimensions | Format | Original bytes | Where used | Delivery and exact filenames |
| --- | --- | --- | --- | --- | --- |
| `src/assets/images/baithak-logo.png` | 614 x 406 | png | 67523 | `/`, `/about`, `/contact`, `/materials`, `/collections`, `/customise`, `/sofas`, `/custom-woodwork`, `/our-work`, `/privacy`, `/terms`, `/sectionals`, `/chairs`, `/recliners`, `/ottomans-benches`, `/beds`, `/bedside`, `/dining`, `/dining-chairs`, `/coffee-tables`, `/side-tables`, `/tables`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/living`, `/collections/seating`, `/collections/bedroom`, `/collections/dining`, `/collections/tables`, `/collections/bespoke`, `/furniture/aster-sofa`, `/furniture/noma-chair`, `/furniture/arden-dining`, `/furniture/mira-bed`, `/our-work/project-01`, `/our-work/project-02`, `/our-work/project-03` | Official logo unchanged; original PNG remains configured. |
| `src/assets/images/brand-story.png` | 1875 x 839 | png | 2579279 | `/`, `/about` | 1875 x 839; WebP 259664 bytes: `public/images/brand-story-2a975f1a07-1875.webp`; fallback 479260 bytes: `public/images/brand-story-2a975f1a07.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/category-bespoke.jpg` | 1599 x 722 | jpeg | 60757 | `/` | 1599 x 722; WebP 43548 bytes: `public/images/category-bespoke-4afae4629a-1599.webp`; fallback 60757 bytes: `public/images/category-bespoke-4afae4629a.jpg`; widths 640, 1024, 1599. |
| `src/assets/images/category-chairs.png` | 1046 x 1503 | png | 2347043 | `/` | 1046 x 1503; WebP 213988 bytes: `public/images/category-chairs-b87ded9931-1046.webp`; fallback 451667 bytes: `public/images/category-chairs-b87ded9931.jpg`; widths 640, 1024, 1046. |
| `src/assets/images/category-sofas.png` | 1875 x 839 | png | 2406484 | `/` | 1875 x 839; WebP 214882 bytes: `public/images/category-sofas-97dccd0348-1875.webp`; fallback 420241 bytes: `public/images/category-sofas-97dccd0348.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/category-woodwork.jpg` | 721 x 1600 | jpeg | 61258 | `/` | 721 x 1600; WebP 40142 bytes: `public/images/category-woodwork-0e098356eb-721.webp`; fallback 61258 bytes: `public/images/category-woodwork-0e098356eb.jpg`; widths 721. |
| `src/assets/images/collection-beds.jpg` | 1203 x 1600 | jpeg | 235769 | `/custom-woodwork` | 1203 x 1600; WebP 234134 bytes: `public/images/collection-beds-1c98908348-1203.webp`; fallback 235769 bytes: `public/images/collection-beds-1c98908348.jpg`; widths 640, 1024, 1203. |
| `src/assets/images/collection-chairs.png` | 1848 x 851 | png | 2131947 | `/`, `/collections` | 1848 x 851; WebP 178138 bytes: `public/images/collection-chairs-31645cd00b-1848.webp`; fallback 395714 bytes: `public/images/collection-chairs-31645cd00b.jpg`; widths 640, 1024, 1848. |
| `src/assets/images/collection-dining.jpg` | 1079 x 1434 | jpeg | 508941 | `/`, `/collections` | 1079 x 1434; WebP 77658 bytes: `public/images/collection-dining-eca573faf4-1079.webp`; fallback 202131 bytes: `public/images/collection-dining-eca573faf4.jpg`; widths 640, 1024, 1079. |
| `src/assets/images/collection-sofas.png` | 1875 x 839 | png | 2207047 | `/`, `/collections`, `/collections/living` | 1875 x 839; WebP 191008 bytes: `public/images/collection-sofas-d875c89981-1875.webp`; fallback 408735 bytes: `public/images/collection-sofas-d875c89981.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/collection-tables.jpg` | 1080 x 874 | jpeg | 74404 | `/`, `/collections` | 1080 x 874; WebP 51642 bytes: `public/images/collection-tables-5775b9db7b-1080.webp`; fallback 74404 bytes: `public/images/collection-tables-5775b9db7b.jpg`; widths 640, 1024, 1080. |
| `src/assets/images/collection-woodwork.jpg` | 721 x 1600 | jpeg | 66723 | `/`, `/collections`, `/collections/bespoke` | 721 x 1600; WebP 44630 bytes: `public/images/collection-woodwork-041e19a3a1-721.webp`; fallback 66723 bytes: `public/images/collection-woodwork-041e19a3a1.jpg`; widths 721. |
| `src/assets/images/craftsmanship-detail.jpg` | 4096 x 3072 | jpeg | 712599 | `/`, `/materials` | 1920 x 1440; WebP 267308 bytes: `public/images/craftsmanship-detail-2d0a5a56f7-1920.webp`; fallback 564210 bytes: `public/images/craftsmanship-detail-2d0a5a56f7.jpg`; widths 640, 1024, 1920. |
| `src/assets/images/craftsmanship-main.jpg` | 4096 x 3072 | jpeg | 693625 | `/`, `/materials` | 1920 x 1440; WebP 254990 bytes: `public/images/craftsmanship-main-085cd6bf47-1920.webp`; fallback 547446 bytes: `public/images/craftsmanship-main-085cd6bf47.jpg`; widths 640, 1024, 1920. |
| `src/assets/images/craftsmanship-upholstery.jpg` | 1280 x 860 | jpeg | 125666 | `/`, `/about`, `/materials` | 1280 x 860; WebP 102454 bytes: `public/images/craftsmanship-upholstery-c8d7efc749-1280.webp`; fallback 125666 bytes: `public/images/craftsmanship-upholstery-c8d7efc749.jpg`; widths 640, 1024, 1280. |
| `src/assets/images/craftsmanship-wood.jpg` | 576 x 1280 | jpeg | 61268 | `/`, `/materials` | 576 x 1280; WebP 47112 bytes: `public/images/craftsmanship-wood-2487372f77-576.webp`; fallback 61268 bytes: `public/images/craftsmanship-wood-2487372f77.jpg`; widths 576. |
| `src/assets/images/customisation-main.png` | 1782 x 883 | png | 2516909 | `/`, `/about`, `/customise` | 1782 x 883; WebP 256902 bytes: `public/images/customisation-main-ffd2f696b6-1782.webp`; fallback 469684 bytes: `public/images/customisation-main-ffd2f696b6.jpg`; widths 640, 1024, 1782. |
| `src/assets/images/furniture-arden-dining.jpg` | 1079 x 1434 | jpeg | 508941 | `/`, `/furniture/aster-sofa`, `/furniture/noma-chair`, `/furniture/arden-dining`, `/furniture/mira-bed` | 1079 x 1434; WebP 77658 bytes: `public/images/collection-dining-eca573faf4-1079.webp`; fallback 202131 bytes: `public/images/collection-dining-eca573faf4.jpg`; widths 640, 1024, 1079. |
| `src/assets/images/furniture-aster-sofa.png` | 1870 x 841 | png | 2851859 | `/`, `/furniture/aster-sofa`, `/furniture/noma-chair`, `/furniture/arden-dining`, `/furniture/mira-bed` | 1870 x 841; WebP 334254 bytes: `public/images/furniture-aster-sofa-4135992df4-1870.webp`; fallback 542676 bytes: `public/images/furniture-aster-sofa-4135992df4.jpg`; widths 640, 1024, 1870. |
| `src/assets/images/furniture-mira-bed.png` | 1875 x 839 | png | 2273721 | `/`, `/collections`, `/custom-woodwork`, `/beds`, `/collections/bedroom`, `/collections/bespoke`, `/furniture/aster-sofa`, `/furniture/noma-chair`, `/furniture/arden-dining`, `/furniture/mira-bed` | 1875 x 839; WebP 176828 bytes: `public/images/furniture-mira-bed-8b5ef7d22d-1875.webp`; fallback 360342 bytes: `public/images/furniture-mira-bed-8b5ef7d22d.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/furniture-noma-chair.png` | 1024 x 1536 | png | 2469308 | `/`, `/furniture/aster-sofa`, `/furniture/noma-chair`, `/furniture/arden-dining`, `/furniture/mira-bed` | 1024 x 1536; WebP 200920 bytes: `public/images/furniture-noma-chair-594ef39353-1024.webp`; fallback 426215 bytes: `public/images/furniture-noma-chair-594ef39353.jpg`; widths 640, 1024. |
| `src/assets/images/gallery/archive-002.jpg` | 1080 x 870 | jpeg | 229397 | `/sofas`, `/our-work`, `/sectionals`, `/collections/living` | 1080 x 870; WebP 30062 bytes: `public/images/archive-002-366b77ee19-1080.webp`; fallback 87459 bytes: `public/images/archive-002-366b77ee19.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-003.jpg` | 1080 x 1023 | jpeg | 225809 | `/sofas`, `/our-work`, `/sectionals`, `/collections/living` | 1080 x 1023; WebP 28304 bytes: `public/images/archive-003-b9f84679bf-1080.webp`; fallback 87409 bytes: `public/images/archive-003-b9f84679bf.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-004.jpg` | 970 x 691 | jpeg | 306072 | `/sofas`, `/our-work` | 970 x 691; WebP 56952 bytes: `public/images/archive-004-ed111d38e7-970.webp`; fallback 122874 bytes: `public/images/archive-004-ed111d38e7.jpg`; widths 970. |
| `src/assets/images/gallery/archive-005.jpg` | 1057 x 788 | jpeg | 408104 | `/sofas`, `/our-work`, `/sectionals`, `/collections/living` | 1057 x 788; WebP 69492 bytes: `public/images/archive-005-6561eabe08-1057.webp`; fallback 157087 bytes: `public/images/archive-005-6561eabe08.jpg`; widths 1057. |
| `src/assets/images/gallery/archive-006.jpg` | 1079 x 394 | jpeg | 107141 | `/sofas`, `/our-work`, `/sectionals`, `/collections/living` | 1079 x 394; WebP 14168 bytes: `public/images/archive-006-d908407465-1079.webp`; fallback 42849 bytes: `public/images/archive-006-d908407465.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-007.jpg` | 1080 x 487 | jpeg | 116087 | `/sofas`, `/our-work`, `/sectionals`, `/collections/living` | 1080 x 487; WebP 16720 bytes: `public/images/archive-007-926f8c367c-1080.webp`; fallback 48455 bytes: `public/images/archive-007-926f8c367c.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-008.jpg` | 1080 x 700 | jpeg | 125637 | `/sofas`, `/our-work`, `/sectionals`, `/collections/living` | 1080 x 700; WebP 17382 bytes: `public/images/archive-008-428473fb3f-1080.webp`; fallback 52488 bytes: `public/images/archive-008-428473fb3f.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-009.jpg` | 1018 x 424 | jpeg | 108020 | `/sofas`, `/our-work` | 1018 x 424; WebP 14986 bytes: `public/images/archive-009-64e11853e9-1018.webp`; fallback 44009 bytes: `public/images/archive-009-64e11853e9.jpg`; widths 1018. |
| `src/assets/images/gallery/archive-010.jpg` | 1061 x 1098 | jpeg | 429262 | `/custom-woodwork`, `/our-work`, `/beds`, `/bedside`, `/collections/bedroom`, `/collections/bespoke` | 1061 x 1098; WebP 61734 bytes: `public/images/archive-010-b96d31d74c-1061.webp`; fallback 179375 bytes: `public/images/archive-010-b96d31d74c.jpg`; widths 1061. |
| `src/assets/images/gallery/archive-011.jpg` | 1074 x 476 | jpeg | 196912 | `/sofas`, `/our-work` | 1074 x 476; WebP 27526 bytes: `public/images/archive-011-9122491419-1074.webp`; fallback 76889 bytes: `public/images/archive-011-9122491419.jpg`; widths 1074. |
| `src/assets/images/gallery/archive-012.jpg` | 1079 x 806 | jpeg | 101697 | `/custom-woodwork`, `/our-work`, `/beds`, `/bedside`, `/side-tables`, `/collections/bedroom`, `/collections/bespoke` | 1079 x 806; WebP 103966 bytes: `public/images/archive-012-8eb03febc0-1079.webp`; fallback 101697 bytes: `public/images/archive-012-8eb03febc0.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-013.jpg` | 1080 x 473 | jpeg | 187443 | `/sofas`, `/our-work` | 1080 x 473; WebP 27704 bytes: `public/images/archive-013-1a0c7652ce-1080.webp`; fallback 74496 bytes: `public/images/archive-013-1a0c7652ce.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-014.jpg` | 1080 x 474 | jpeg | 189189 | `/sofas`, `/our-work` | 1080 x 474; WebP 26370 bytes: `public/images/archive-014-184b064b80-1080.webp`; fallback 73500 bytes: `public/images/archive-014-184b064b80.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-015.jpg` | 1072 x 782 | jpeg | 321596 | `/sofas`, `/our-work` | 1072 x 782; WebP 46088 bytes: `public/images/archive-015-9e319a7566-1072.webp`; fallback 129236 bytes: `public/images/archive-015-9e319a7566.jpg`; widths 1072. |
| `src/assets/images/gallery/archive-016.jpg` | 1055 x 746 | jpeg | 279755 | `/sofas`, `/our-work` | 1055 x 746; WebP 40678 bytes: `public/images/archive-016-9435843e9e-1055.webp`; fallback 113789 bytes: `public/images/archive-016-9435843e9e.jpg`; widths 1055. |
| `src/assets/images/gallery/archive-017.jpg` | 1079 x 627 | jpeg | 63875 | `/sofas`, `/our-work` | 1079 x 627; WebP 53376 bytes: `public/images/archive-017-82add98710-1079.webp`; fallback 63875 bytes: `public/images/archive-017-82add98710.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-018.jpg` | 1080 x 638 | jpeg | 220075 | `/sofas`, `/our-work` | 1080 x 638; WebP 58984 bytes: `public/images/archive-018-087dfd47eb-1080.webp`; fallback 105151 bytes: `public/images/archive-018-087dfd47eb.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-019.jpg` | 857 x 484 | jpeg | 92965 | `/sofas`, `/our-work` | 857 x 484; WebP 18246 bytes: `public/images/archive-019-6a51ef3d1e-857.webp`; fallback 41186 bytes: `public/images/archive-019-6a51ef3d1e.jpg`; widths 857. |
| `src/assets/images/gallery/archive-020.jpg` | 904 x 459 | jpeg | 197205 | `/sofas`, `/our-work` | 904 x 459; WebP 71188 bytes: `public/images/archive-020-a9ddfc6b72-904.webp`; fallback 100848 bytes: `public/images/archive-020-a9ddfc6b72.jpg`; widths 904. |
| `src/assets/images/gallery/archive-021.jpg` | 936 x 433 | jpeg | 150074 | `/sofas`, `/our-work` | 936 x 433; WebP 30194 bytes: `public/images/archive-021-e8cae7abd4-936.webp`; fallback 65442 bytes: `public/images/archive-021-e8cae7abd4.jpg`; widths 936. |
| `src/assets/images/gallery/archive-022.jpg` | 910 x 475 | jpeg | 129884 | `/sofas`, `/our-work` | 910 x 475; WebP 19764 bytes: `public/images/archive-022-21201e2fc2-910.webp`; fallback 54776 bytes: `public/images/archive-022-21201e2fc2.jpg`; widths 910. |
| `src/assets/images/gallery/archive-023.jpg` | 945 x 448 | jpeg | 103864 | `/sofas`, `/our-work` | 945 x 448; WebP 24242 bytes: `public/images/archive-023-da6a021bee-945.webp`; fallback 49281 bytes: `public/images/archive-023-da6a021bee.jpg`; widths 945. |
| `src/assets/images/gallery/archive-024.jpg` | 883 x 538 | jpeg | 240601 | `/sofas`, `/our-work` | 883 x 538; WebP 72306 bytes: `public/images/archive-024-7fa466fef1-883.webp`; fallback 119598 bytes: `public/images/archive-024-7fa466fef1.jpg`; widths 883. |
| `src/assets/images/gallery/archive-025.jpg` | 1016 x 492 | jpeg | 154886 | `/sofas`, `/our-work` | 1016 x 492; WebP 34380 bytes: `public/images/archive-025-8e2d7f7fe8-1016.webp`; fallback 68353 bytes: `public/images/archive-025-8e2d7f7fe8.jpg`; widths 1016. |
| `src/assets/images/gallery/archive-026.jpg` | 962 x 427 | jpeg | 138540 | `/sofas`, `/our-work` | 962 x 427; WebP 24442 bytes: `public/images/archive-026-64410bbcdd-962.webp`; fallback 57838 bytes: `public/images/archive-026-64410bbcdd.jpg`; widths 962. |
| `src/assets/images/gallery/archive-027.jpg` | 906 x 433 | jpeg | 131013 | `/sofas`, `/our-work` | 906 x 433; WebP 22548 bytes: `public/images/archive-027-cb201812fc-906.webp`; fallback 55835 bytes: `public/images/archive-027-cb201812fc.jpg`; widths 906. |
| `src/assets/images/gallery/archive-028.jpg` | 779 x 394 | jpeg | 98895 | `/sofas`, `/our-work` | 779 x 394; WebP 18438 bytes: `public/images/archive-028-8ae72abc58-779.webp`; fallback 41417 bytes: `public/images/archive-028-8ae72abc58.jpg`; widths 779. |
| `src/assets/images/gallery/archive-029.jpg` | 1043 x 521 | jpeg | 147592 | `/sofas`, `/our-work` | 1043 x 521; WebP 30332 bytes: `public/images/archive-029-db2d757c7e-1043.webp`; fallback 65041 bytes: `public/images/archive-029-db2d757c7e.jpg`; widths 1043. |
| `src/assets/images/gallery/archive-030.jpg` | 1020 x 529 | jpeg | 139379 | `/sofas`, `/our-work` | 1020 x 529; WebP 26008 bytes: `public/images/archive-030-4d77078064-1020.webp`; fallback 60789 bytes: `public/images/archive-030-4d77078064.jpg`; widths 1020. |
| `src/assets/images/gallery/archive-031.jpg` | 1079 x 613 | jpeg | 230677 | `/sofas`, `/our-work` | 1079 x 613; WebP 34790 bytes: `public/images/archive-031-7d8951100e-1079.webp`; fallback 93510 bytes: `public/images/archive-031-7d8951100e.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-032.jpg` | 790 x 1599 | jpeg | 147111 | `/our-work` | 790 x 1599; WebP 133866 bytes: `public/images/archive-032-14a305172f-790.webp`; fallback 147111 bytes: `public/images/archive-032-14a305172f.jpg`; widths 790. |
| `src/assets/images/gallery/archive-033.jpg` | 716 x 1600 | jpeg | 88845 | `/our-work` | 716 x 1600; WebP 68684 bytes: `public/images/archive-033-c6ab12d8c2-716.webp`; fallback 88845 bytes: `public/images/archive-033-c6ab12d8c2.jpg`; widths 716. |
| `src/assets/images/gallery/archive-034.jpg` | 1080 x 810 | jpeg | 611663 | `/sofas`, `/our-work` | 1080 x 810; WebP 147872 bytes: `public/images/archive-034-f2e5331411-1080.webp`; fallback 253052 bytes: `public/images/archive-034-f2e5331411.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-035.jpg` | 1078 x 659 | jpeg | 316928 | `/sofas`, `/our-work` | 1078 x 659; WebP 59138 bytes: `public/images/archive-035-a833adac72-1078.webp`; fallback 127844 bytes: `public/images/archive-035-a833adac72.jpg`; widths 1078. |
| `src/assets/images/gallery/archive-036.jpg` | 716 x 1600 | jpeg | 85088 | `/sofas`, `/our-work` | 716 x 1600; WebP 76348 bytes: `public/images/archive-036-76182d9207-716.webp`; fallback 85088 bytes: `public/images/archive-036-76182d9207.jpg`; widths 716. |
| `src/assets/images/gallery/archive-037.jpg` | 1079 x 805 | jpeg | 437806 | `/sofas`, `/our-work` | 1079 x 805; WebP 83468 bytes: `public/images/archive-037-871c14805c-1079.webp`; fallback 174711 bytes: `public/images/archive-037-871c14805c.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-038.jpg` | 1079 x 832 | jpeg | 632874 | `/sofas`, `/our-work` | 1079 x 832; WebP 164288 bytes: `public/images/archive-038-78c5c1da34-1079.webp`; fallback 270974 bytes: `public/images/archive-038-78c5c1da34.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-039.jpg` | 1079 x 763 | jpeg | 607829 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1079 x 763; WebP 145446 bytes: `public/images/archive-039-13263c17a1-1079.webp`; fallback 251243 bytes: `public/images/archive-039-13263c17a1.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-040.jpg` | 1079 x 844 | jpeg | 689718 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1079 x 844; WebP 172334 bytes: `public/images/archive-040-4a44b149b2-1079.webp`; fallback 291909 bytes: `public/images/archive-040-4a44b149b2.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-041.jpg` | 1280 x 576 | jpeg | 113217 | `/our-work` | 1280 x 576; WebP 123806 bytes: `public/images/archive-041-c10a40e247-1280.webp`; fallback 113217 bytes: `public/images/archive-041-c10a40e247.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-042.jpg` | 1079 x 849 | jpeg | 654742 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1079 x 849; WebP 149840 bytes: `public/images/archive-042-a7345f9002-1079.webp`; fallback 268582 bytes: `public/images/archive-042-a7345f9002.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-043.jpg` | 1080 x 776 | jpeg | 723594 | `/our-work`, `/chairs`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1080 x 776; WebP 229862 bytes: `public/images/archive-043-ab31dbf059-1080.webp`; fallback 366505 bytes: `public/images/archive-043-ab31dbf059.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-044.jpg` | 1079 x 926 | jpeg | 305786 | `/our-work`, `/chairs`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1079 x 926; WebP 43074 bytes: `public/images/archive-044-0beb6d8b2b-1079.webp`; fallback 117653 bytes: `public/images/archive-044-0beb6d8b2b.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-045.jpg` | 1080 x 874 | jpeg | 74404 | `/our-work`, `/coffee-tables`, `/tables`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/living`, `/collections/tables`, `/collections/bespoke` | 1080 x 874; WebP 51642 bytes: `public/images/collection-tables-5775b9db7b-1080.webp`; fallback 74404 bytes: `public/images/collection-tables-5775b9db7b.jpg`; widths 640, 1024, 1080. |
| `src/assets/images/gallery/archive-046.jpg` | 1280 x 576 | jpeg | 113217 | `/sofas`, `/our-work` | 1280 x 576; WebP 123806 bytes: `public/images/archive-041-c10a40e247-1280.webp`; fallback 113217 bytes: `public/images/archive-041-c10a40e247.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-047.jpg` | 770 x 534 | jpeg | 89245 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 770 x 534; WebP 49822 bytes: `public/images/archive-047-a6ab06c2ce-770.webp`; fallback 89245 bytes: `public/images/archive-047-a6ab06c2ce.jpg`; widths 770. |
| `src/assets/images/gallery/archive-048.jpg` | 770 x 636 | jpeg | 31580 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | UNCHANGED COPY: `public/images/archive-048-82a5d2f0ad.jpg`; 31580 bytes. P1 review retained. |
| `src/assets/images/gallery/archive-049.jpg` | 770 x 604 | jpeg | 77642 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 770 x 604; WebP 40136 bytes: `public/images/archive-049-9ed2eb7d80-770.webp`; fallback 77642 bytes: `public/images/archive-049-9ed2eb7d80.jpg`; widths 770. |
| `src/assets/images/gallery/archive-050.jpg` | 770 x 786 | jpeg | 93342 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 770 x 786; WebP 49044 bytes: `public/images/archive-050-7a63d6245b-770.webp`; fallback 93342 bytes: `public/images/archive-050-7a63d6245b.jpg`; widths 770. |
| `src/assets/images/gallery/archive-051.jpg` | 770 x 771 | jpeg | 66160 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 770 x 771; WebP 58554 bytes: `public/images/archive-051-ac09961c3d-770.webp`; fallback 66160 bytes: `public/images/archive-051-ac09961c3d.jpg`; widths 770. |
| `src/assets/images/gallery/archive-052.jpg` | 770 x 773 | jpeg | 78009 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 770 x 773; WebP 71244 bytes: `public/images/archive-052-7f60762137-770.webp`; fallback 78009 bytes: `public/images/archive-052-7f60762137.jpg`; widths 770. |
| `src/assets/images/gallery/archive-053.jpg` | 716 x 1600 | jpeg | 133779 | `/our-work` | 716 x 1600; WebP 129540 bytes: `public/images/archive-053-9515032614-716.webp`; fallback 133779 bytes: `public/images/archive-053-9515032614.jpg`; widths 716. |
| `src/assets/images/gallery/archive-054.jpg` | 1600 x 716 | jpeg | 130569 | `/sofas`, `/our-work` | 1600 x 716; WebP 125964 bytes: `public/images/archive-054-37746d8d3d-1600.webp`; fallback 130569 bytes: `public/images/archive-054-37746d8d3d.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-055.jpg` | 770 x 782 | jpeg | 80070 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 770 x 782; WebP 38878 bytes: `public/images/archive-055-bb26ca9417-770.webp`; fallback 80070 bytes: `public/images/archive-055-bb26ca9417.jpg`; widths 770. |
| `src/assets/images/gallery/archive-056.jpg` | 1600 x 1203 | jpeg | 257405 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1600 x 1203; WebP 265196 bytes: `public/images/archive-056-e0f03098cc-1600.webp`; fallback 257405 bytes: `public/images/archive-056-e0f03098cc.jpg`; widths 640, 1600. |
| `src/assets/images/gallery/archive-057.jpg` | 716 x 1600 | jpeg | 131359 | `/our-work` | 716 x 1600; WebP 124772 bytes: `public/images/archive-057-ee6310609d-716.webp`; fallback 131359 bytes: `public/images/archive-057-ee6310609d.jpg`; widths 716. |
| `src/assets/images/gallery/archive-058.jpg` | 1080 x 1347 | jpeg | 89871 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1080 x 1347; WebP 63958 bytes: `public/images/archive-058-278291f475-1080.webp`; fallback 89871 bytes: `public/images/archive-058-278291f475.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-059.jpg` | 1280 x 576 | jpeg | 107397 | `/sofas`, `/our-work` | 1280 x 576; WebP 111772 bytes: `public/images/archive-059-7f8e34ed79-1280.webp`; fallback 107397 bytes: `public/images/archive-059-7f8e34ed79.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-060.jpg` | 904 x 1276 | jpeg | 604951 | `/custom-woodwork`, `/our-work`, `/ottomans-benches`, `/collections/living`, `/collections/seating` | 904 x 1276; WebP 122166 bytes: `public/images/archive-060-acf6707a4a-904.webp`; fallback 259711 bytes: `public/images/archive-060-acf6707a4a.jpg`; widths 904. |
| `src/assets/images/gallery/archive-061.jpg` | 1074 x 815 | jpeg | 393540 | `/sofas`, `/our-work` | 1074 x 815; WebP 73492 bytes: `public/images/archive-061-712c08dd50-1074.webp`; fallback 166494 bytes: `public/images/archive-061-712c08dd50.jpg`; widths 1074. |
| `src/assets/images/gallery/archive-062.jpg` | 1080 x 809 | jpeg | 145743 | `/sofas`, `/our-work` | 1080 x 809; WebP 182950 bytes: `public/images/archive-062-9369627977-1080.webp`; fallback 145743 bytes: `public/images/archive-062-9369627977.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-063.jpg` | 1080 x 1350 | jpeg | 254166 | `/sofas`, `/our-work` | 1080 x 1350; WebP 329926 bytes: `public/images/archive-063-49c2b3e0aa-1080.webp`; fallback 254166 bytes: `public/images/archive-063-49c2b3e0aa.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-064.jpg` | 1280 x 576 | jpeg | 107702 | `/sofas`, `/our-work` | 1280 x 576; WebP 110442 bytes: `public/images/archive-064-8a8d47b5c8-1280.webp`; fallback 107702 bytes: `public/images/archive-064-8a8d47b5c8.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-065.jpg` | 768 x 1024 | jpeg | 90133 | `/our-work`, `/recliners`, `/collections/seating` | 768 x 1024; WebP 86082 bytes: `public/images/archive-065-4f8eac8ab3-768.webp`; fallback 90133 bytes: `public/images/archive-065-4f8eac8ab3.jpg`; widths 768. |
| `src/assets/images/gallery/archive-066.jpg` | 716 x 1600 | jpeg | 150008 | `/our-work` | 716 x 1600; WebP 151102 bytes: `public/images/archive-066-1bea2707ed-716.webp`; fallback 150008 bytes: `public/images/archive-066-1bea2707ed.jpg`; widths 716. |
| `src/assets/images/gallery/archive-067.jpg` | 899 x 1599 | jpeg | 57611 | `/our-work`, `/recliners`, `/collections/seating` | 899 x 1599; WebP 37594 bytes: `public/images/archive-067-438ea44d48-899.webp`; fallback 57611 bytes: `public/images/archive-067-438ea44d48.jpg`; widths 899. |
| `src/assets/images/gallery/archive-068.jpg` | 716 x 1600 | jpeg | 128588 | `/our-work` | 716 x 1600; WebP 121304 bytes: `public/images/archive-068-32ca5a5dde-716.webp`; fallback 128588 bytes: `public/images/archive-068-32ca5a5dde.jpg`; widths 716. |
| `src/assets/images/gallery/archive-069.jpg` | 716 x 1600 | jpeg | 109975 | `/our-work` | 716 x 1600; WebP 102228 bytes: `public/images/archive-069-3acee5d687-716.webp`; fallback 109975 bytes: `public/images/archive-069-3acee5d687.jpg`; widths 716. |
| `src/assets/images/gallery/archive-070.jpg` | 1080 x 624 | jpeg | 436314 | `/our-work`, `/recliners`, `/collections/seating` | 1080 x 624; WebP 95536 bytes: `public/images/archive-070-645fa320e6-1080.webp`; fallback 185494 bytes: `public/images/archive-070-645fa320e6.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-071.jpg` | 1024 x 724 | jpeg | 52990 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1024 x 724; WebP 38794 bytes: `public/images/archive-071-3f25ca156f-1024.webp`; fallback 52990 bytes: `public/images/archive-071-3f25ca156f.jpg`; widths 1024. |
| `src/assets/images/gallery/archive-072.jpg` | 716 x 1600 | jpeg | 142514 | `/our-work` | 716 x 1600; WebP 147330 bytes: `public/images/archive-072-555ceb8304-716.webp`; fallback 142514 bytes: `public/images/archive-072-555ceb8304.jpg`; widths 716. |
| `src/assets/images/gallery/archive-073.jpg` | 1079 x 1112 | jpeg | 480106 | `/our-work`, `/chairs`, `/collections/seating` | 1079 x 1112; WebP 88974 bytes: `public/images/archive-073-fdbfc84052-1079.webp`; fallback 196866 bytes: `public/images/archive-073-fdbfc84052.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-074.jpg` | 1600 x 716 | jpeg | 113878 | `/sofas`, `/our-work` | 1600 x 716; WebP 109086 bytes: `public/images/archive-074-79ab30ebe2-1600.webp`; fallback 113878 bytes: `public/images/archive-074-79ab30ebe2.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-075.jpg` | 843 x 1280 | jpeg | 113467 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 843 x 1280; WebP 102210 bytes: `public/images/archive-075-252260f2f7-843.webp`; fallback 113467 bytes: `public/images/archive-075-252260f2f7.jpg`; widths 843. |
| `src/assets/images/gallery/archive-076.jpg` | 1080 x 1465 | jpeg | 108085 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1080 x 1465; WebP 83740 bytes: `public/images/archive-076-9416f2b773-1080.webp`; fallback 108085 bytes: `public/images/archive-076-9416f2b773.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-077.jpg` | 1080 x 820 | jpeg | 62554 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1080 x 820; WebP 47920 bytes: `public/images/archive-077-d01570d802-1080.webp`; fallback 62554 bytes: `public/images/archive-077-d01570d802.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-078.jpg` | 1080 x 1082 | jpeg | 65676 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1080 x 1082; WebP 48608 bytes: `public/images/archive-078-b572bed41d-1080.webp`; fallback 65676 bytes: `public/images/archive-078-b572bed41d.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-079.jpg` | 1079 x 1449 | jpeg | 92973 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1079 x 1449; WebP 69424 bytes: `public/images/archive-079-e33df855e8-1079.webp`; fallback 92973 bytes: `public/images/archive-079-e33df855e8.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-080.jpg` | 1079 x 1080 | jpeg | 95228 | `/sofas`, `/our-work` | 1079 x 1080; WebP 79220 bytes: `public/images/archive-080-5bd6c5c9de-1079.webp`; fallback 95228 bytes: `public/images/archive-080-5bd6c5c9de.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-081.jpg` | 1080 x 1030 | jpeg | 100264 | `/sofas`, `/our-work` | 1080 x 1030; WebP 87168 bytes: `public/images/archive-081-01852bc4ef-1080.webp`; fallback 100264 bytes: `public/images/archive-081-01852bc4ef.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-082.jpg` | 716 x 1600 | jpeg | 95964 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 716 x 1600; WebP 81282 bytes: `public/images/archive-082-b865456d8e-716.webp`; fallback 95964 bytes: `public/images/archive-082-b865456d8e.jpg`; widths 716. |
| `src/assets/images/gallery/archive-083.jpg` | 917 x 1600 | jpeg | 130070 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 917 x 1600; WebP 110776 bytes: `public/images/archive-083-3f4491dbad-917.webp`; fallback 130070 bytes: `public/images/archive-083-3f4491dbad.jpg`; widths 917. |
| `src/assets/images/gallery/archive-084.jpg` | 640 x 628 | jpeg | 40459 | `/custom-woodwork`, `/our-work`, `/beds`, `/bedside`, `/side-tables`, `/tables`, `/collections/bedroom`, `/collections/tables`, `/collections/bespoke` | 640 x 628; WebP 35492 bytes: `public/images/archive-084-bf52874ff3-640.webp`; fallback 40459 bytes: `public/images/archive-084-bf52874ff3.jpg`; widths 640. |
| `src/assets/images/gallery/archive-085.jpg` | 1600 x 1203 | jpeg | 200667 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1600 x 1203; WebP 191054 bytes: `public/images/archive-085-b767a5f5f8-1600.webp`; fallback 200667 bytes: `public/images/archive-085-b767a5f5f8.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-086.jpg` | 1600 x 716 | jpeg | 163656 | `/sofas`, `/our-work` | 1600 x 716; WebP 167640 bytes: `public/images/archive-086-fc1faa41a2-1600.webp`; fallback 163656 bytes: `public/images/archive-086-fc1faa41a2.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-087.jpg` | 1280 x 573 | jpeg | 82340 | `/sofas`, `/our-work` | 1280 x 573; WebP 78562 bytes: `public/images/archive-087-9270ad5b0c-1280.webp`; fallback 82340 bytes: `public/images/archive-087-9270ad5b0c.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-088.jpg` | 1080 x 1057 | jpeg | 63604 | `/sofas`, `/our-work` | 1080 x 1057; WebP 41900 bytes: `public/images/archive-088-b6140cce2e-1080.webp`; fallback 63604 bytes: `public/images/archive-088-b6140cce2e.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-089.jpg` | 1280 x 573 | jpeg | 103084 | `/sofas`, `/our-work` | 1280 x 573; WebP 102318 bytes: `public/images/archive-089-95365eb5f3-1280.webp`; fallback 103084 bytes: `public/images/archive-089-95365eb5f3.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-090.jpg` | 1600 x 716 | jpeg | 132939 | `/sofas`, `/our-work` | 1600 x 716; WebP 128554 bytes: `public/images/archive-090-1ae0109210-1600.webp`; fallback 132939 bytes: `public/images/archive-090-1ae0109210.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-091.jpg` | 1280 x 573 | jpeg | 97169 | `/sofas`, `/our-work` | 1280 x 573; WebP 97016 bytes: `public/images/archive-091-799dee55e9-1280.webp`; fallback 97169 bytes: `public/images/archive-091-799dee55e9.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-092.jpg` | 1600 x 716 | jpeg | 125231 | `/sofas`, `/our-work` | 1600 x 716; WebP 117238 bytes: `public/images/archive-092-272fb1c090-1600.webp`; fallback 125231 bytes: `public/images/archive-092-272fb1c090.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-093.jpg` | 896 x 1287 | jpeg | 125052 | `/sofas`, `/our-work` | 896 x 1287; WebP 119060 bytes: `public/images/archive-093-d01d236c5a-896.webp`; fallback 125052 bytes: `public/images/archive-093-d01d236c5a.jpg`; widths 896. |
| `src/assets/images/gallery/archive-094.jpg` | 809 x 1600 | jpeg | 165884 | `/sofas`, `/our-work` | 809 x 1600; WebP 171774 bytes: `public/images/archive-094-d62a72e0db-809.webp`; fallback 165884 bytes: `public/images/archive-094-d62a72e0db.jpg`; widths 809. |
| `src/assets/images/gallery/archive-095.jpg` | 716 x 1600 | jpeg | 89975 | `/our-work` | 716 x 1600; WebP 81996 bytes: `public/images/archive-095-642d90f2c7-716.webp`; fallback 89975 bytes: `public/images/archive-095-642d90f2c7.jpg`; widths 716. |
| `src/assets/images/gallery/archive-096.jpg` | 716 x 1600 | jpeg | 86743 | `/our-work` | 716 x 1600; WebP 78744 bytes: `public/images/archive-096-5a88a582d3-716.webp`; fallback 86743 bytes: `public/images/archive-096-5a88a582d3.jpg`; widths 716. |
| `src/assets/images/gallery/archive-097.jpg` | 576 x 1280 | jpeg | 51529 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 576 x 1280; WebP 40378 bytes: `public/images/archive-097-8a8bed972e-576.webp`; fallback 51529 bytes: `public/images/archive-097-8a8bed972e.jpg`; widths 576. |
| `src/assets/images/gallery/archive-098.jpg` | 576 x 1280 | jpeg | 52061 | `/custom-woodwork`, `/our-work` | 576 x 1280; WebP 38648 bytes: `public/images/archive-098-b48b217e56-576.webp`; fallback 52061 bytes: `public/images/archive-098-b48b217e56.jpg`; widths 576. |
| `src/assets/images/gallery/archive-099.jpg` | 721 x 1600 | jpeg | 68379 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 721 x 1600; WebP 49842 bytes: `public/images/archive-099-8e132edaaa-721.webp`; fallback 68379 bytes: `public/images/archive-099-8e132edaaa.jpg`; widths 721. |
| `src/assets/images/gallery/archive-100.jpg` | 721 x 1600 | jpeg | 66723 | `/custom-woodwork`, `/our-work` | 721 x 1600; WebP 44630 bytes: `public/images/collection-woodwork-041e19a3a1-721.webp`; fallback 66723 bytes: `public/images/collection-woodwork-041e19a3a1.jpg`; widths 721. |
| `src/assets/images/gallery/archive-101.jpg` | 576 x 1280 | jpeg | 52178 | `/custom-woodwork`, `/our-work` | 576 x 1280; WebP 36578 bytes: `public/images/archive-101-a744414688-576.webp`; fallback 52178 bytes: `public/images/archive-101-a744414688.jpg`; widths 576. |
| `src/assets/images/gallery/archive-102.jpg` | 576 x 1280 | jpeg | 61268 | `/custom-woodwork`, `/our-work` | 576 x 1280; WebP 47112 bytes: `public/images/craftsmanship-wood-2487372f77-576.webp`; fallback 61268 bytes: `public/images/craftsmanship-wood-2487372f77.jpg`; widths 576. |
| `src/assets/images/gallery/archive-103.jpg` | 721 x 1600 | jpeg | 61258 | `/custom-woodwork`, `/our-work` | 721 x 1600; WebP 40142 bytes: `public/images/category-woodwork-0e098356eb-721.webp`; fallback 61258 bytes: `public/images/category-woodwork-0e098356eb.jpg`; widths 721. |
| `src/assets/images/gallery/archive-104.jpg` | 1080 x 1064 | jpeg | 96512 | `/sofas`, `/our-work` | 1080 x 1064; WebP 73418 bytes: `public/images/archive-104-02e82fa9d1-1080.webp`; fallback 96512 bytes: `public/images/archive-104-02e82fa9d1.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-105.jpg` | 1080 x 1068 | jpeg | 75932 | `/sofas`, `/our-work` | 1080 x 1068; WebP 56004 bytes: `public/images/archive-105-326a6ea00c-1080.webp`; fallback 75932 bytes: `public/images/archive-105-326a6ea00c.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-106.jpg` | 1079 x 582 | jpeg | 50405 | `/sofas`, `/our-work` | 1079 x 582; WebP 36158 bytes: `public/images/archive-106-65f3b4c498-1079.webp`; fallback 50405 bytes: `public/images/archive-106-65f3b4c498.jpg`; widths 1079. |
| `src/assets/images/gallery/archive-107.jpg` | 1079 x 1434 | jpeg | 508941 | `/our-work`, `/dining`, `/dining-chairs`, `/tables`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/dining`, `/collections/tables`, `/collections/bespoke` | 1079 x 1434; WebP 77658 bytes: `public/images/collection-dining-eca573faf4-1079.webp`; fallback 202131 bytes: `public/images/collection-dining-eca573faf4.jpg`; widths 640, 1024, 1079. |
| `src/assets/images/gallery/archive-108.jpg` | 1078 x 1086 | jpeg | 492304 | `/sofas`, `/our-work` | 1078 x 1086; WebP 71946 bytes: `public/images/archive-108-05c118d29a-1078.webp`; fallback 193409 bytes: `public/images/archive-108-05c118d29a.jpg`; widths 1078. |
| `src/assets/images/gallery/archive-109.jpg` | 1600 x 1203 | jpeg | 145840 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1600 x 1203; WebP 121192 bytes: `public/images/archive-109-c9fc2201b6-1600.webp`; fallback 145840 bytes: `public/images/archive-109-c9fc2201b6.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-110.jpg` | 1080 x 1008 | jpeg | 221940 | `/custom-woodwork`, `/our-work`, `/beds`, `/bedside`, `/side-tables`, `/collections/bedroom`, `/collections/bespoke` | 1080 x 1008; WebP 29992 bytes: `public/images/archive-110-ecceee239a-1080.webp`; fallback 97067 bytes: `public/images/archive-110-ecceee239a.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-111.jpg` | 1203 x 1600 | jpeg | 235769 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1203 x 1600; WebP 234134 bytes: `public/images/collection-beds-1c98908348-1203.webp`; fallback 235769 bytes: `public/images/collection-beds-1c98908348.jpg`; widths 640, 1024, 1203. |
| `src/assets/images/gallery/archive-112.jpg` | 1600 x 716 | jpeg | 128322 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1600 x 716; WebP 122868 bytes: `public/images/archive-112-b21b057278-1600.webp`; fallback 128322 bytes: `public/images/archive-112-b21b057278.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-113.jpg` | 1600 x 716 | jpeg | 152935 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1600 x 716; WebP 152494 bytes: `public/images/archive-113-31d2d629fe-1600.webp`; fallback 152935 bytes: `public/images/archive-113-31d2d629fe.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-114.jpg` | 953 x 1280 | jpeg | 85440 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 953 x 1280; WebP 65890 bytes: `public/images/archive-114-142c76f8c7-953.webp`; fallback 85440 bytes: `public/images/archive-114-142c76f8c7.jpg`; widths 953. |
| `src/assets/images/gallery/archive-115.jpg` | 1600 x 716 | jpeg | 169195 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1600 x 716; WebP 176516 bytes: `public/images/archive-115-48822718a5-1600.webp`; fallback 169195 bytes: `public/images/archive-115-48822718a5.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-116.jpg` | 576 x 1280 | jpeg | 46797 | `/sofas`, `/our-work` | 576 x 1280; WebP 36560 bytes: `public/images/archive-116-56d86420ba-576.webp`; fallback 46797 bytes: `public/images/archive-116-56d86420ba.jpg`; widths 576. |
| `src/assets/images/gallery/archive-117.jpg` | 1280 x 576 | jpeg | 123305 | `/sofas`, `/our-work` | 1280 x 576; WebP 134292 bytes: `public/images/archive-117-c6fa717ce9-1280.webp`; fallback 123305 bytes: `public/images/archive-117-c6fa717ce9.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-118.jpg` | 1600 x 721 | jpeg | 84636 | `/our-work`, `/chairs`, `/collections/seating` | 1600 x 721; WebP 64536 bytes: `public/images/archive-118-b03b288118-1600.webp`; fallback 84636 bytes: `public/images/archive-118-b03b288118.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-119.jpg` | 1600 x 721 | jpeg | 80470 | `/our-work`, `/chairs`, `/collections/seating` | 1600 x 721; WebP 59918 bytes: `public/images/archive-119-fd658475a7-1600.webp`; fallback 80470 bytes: `public/images/archive-119-fd658475a7.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-120.jpg` | 1599 x 722 | jpeg | 60757 | `/our-work`, `/chairs`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1599 x 722; WebP 43548 bytes: `public/images/category-bespoke-4afae4629a-1599.webp`; fallback 60757 bytes: `public/images/category-bespoke-4afae4629a.jpg`; widths 640, 1024, 1599. |
| `src/assets/images/gallery/archive-121.jpg` | 1600 x 1204 | jpeg | 192939 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1600 x 1204; WebP 175156 bytes: `public/images/archive-121-445a3c850c-1600.webp`; fallback 192939 bytes: `public/images/archive-121-445a3c850c.jpg`; widths 1600. |
| `src/assets/images/gallery/archive-122.jpg` | 1080 x 1289 | jpeg | 86895 | `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1080 x 1289; WebP 62198 bytes: `public/images/archive-122-5cacc9827e-1080.webp`; fallback 86895 bytes: `public/images/archive-122-5cacc9827e.jpg`; widths 1080. |
| `src/assets/images/gallery/archive-123.jpg` | 4096 x 3072 | jpeg | 770445 | `/sofas`, `/our-work` | 1920 x 1440; WebP 284074 bytes: `public/images/archive-123-304058683d-1920.webp`; fallback 595407 bytes: `public/images/archive-123-304058683d.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-124.jpg` | 4096 x 3072 | jpeg | 838021 | `/sofas`, `/our-work` | 1920 x 1440; WebP 311736 bytes: `public/images/archive-124-981be0c17a-1920.webp`; fallback 633051 bytes: `public/images/archive-124-981be0c17a.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-125.jpg` | 4096 x 3072 | jpeg | 693625 | `/our-work` | 1920 x 1440; WebP 254990 bytes: `public/images/craftsmanship-main-085cd6bf47-1920.webp`; fallback 547446 bytes: `public/images/craftsmanship-main-085cd6bf47.jpg`; widths 640, 1024, 1920. |
| `src/assets/images/gallery/archive-126.jpg` | 4096 x 3072 | jpeg | 595330 | `/our-work` | 1920 x 1440; WebP 206160 bytes: `public/images/archive-126-19b072d5cf-1920.webp`; fallback 496677 bytes: `public/images/archive-126-19b072d5cf.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-127.jpg` | 4096 x 3072 | jpeg | 712599 | `/our-work` | 1920 x 1440; WebP 267308 bytes: `public/images/craftsmanship-detail-2d0a5a56f7-1920.webp`; fallback 564210 bytes: `public/images/craftsmanship-detail-2d0a5a56f7.jpg`; widths 640, 1024, 1920. |
| `src/assets/images/gallery/archive-128.jpg` | 4096 x 3072 | jpeg | 468037 | `/sofas`, `/our-work` | 1920 x 1440; WebP 139666 bytes: `public/images/archive-128-ec253b5ce3-1920.webp`; fallback 372544 bytes: `public/images/archive-128-ec253b5ce3.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-129.jpg` | 3072 x 4096 | jpeg | 487144 | `/sofas`, `/our-work` | 1920 x 2560; WebP 207476 bytes: `public/images/archive-129-8be453eeb4-1920.webp`; fallback 603132 bytes: `public/images/archive-129-8be453eeb4.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-130.jpg` | 4096 x 3072 | jpeg | 458290 | `/sofas`, `/our-work` | 1920 x 1440; WebP 138272 bytes: `public/images/archive-130-58ffd81be7-1920.webp`; fallback 370357 bytes: `public/images/archive-130-58ffd81be7.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-131.jpg` | 1280 x 960 | jpeg | 133690 | `/our-work`, `/ottomans-benches`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/living`, `/collections/seating`, `/collections/bespoke` | 1280 x 960; WebP 131364 bytes: `public/images/archive-131-6af2c12cf7-1280.webp`; fallback 133690 bytes: `public/images/archive-131-6af2c12cf7.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-132.jpg` | 4096 x 3072 | jpeg | 422070 | `/sofas`, `/our-work` | 1920 x 1440; WebP 131548 bytes: `public/images/archive-132-a8e466228e-1920.webp`; fallback 334384 bytes: `public/images/archive-132-a8e466228e.jpg`; widths 640, 1024, 1920. |
| `src/assets/images/gallery/archive-133.jpg` | 1280 x 860 | jpeg | 125666 | `/custom-woodwork`, `/our-work`, `/beds`, `/collections/bedroom`, `/collections/bespoke` | 1280 x 860; WebP 102454 bytes: `public/images/craftsmanship-upholstery-c8d7efc749-1280.webp`; fallback 125666 bytes: `public/images/craftsmanship-upholstery-c8d7efc749.jpg`; widths 640, 1024, 1280. |
| `src/assets/images/gallery/archive-134.jpg` | 4096 x 1856 | jpeg | 2121898 | `/sofas`, `/our-work` | 1920 x 870; WebP 282742 bytes: `public/images/archive-134-5ebbe83003-1920.webp`; fallback 492216 bytes: `public/images/archive-134-5ebbe83003.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-135.jpg` | 1280 x 580 | jpeg | 101203 | `/sofas`, `/our-work` | 1280 x 580; WebP 118932 bytes: `public/images/archive-135-e769cf61a0-1280.webp`; fallback 101203 bytes: `public/images/archive-135-e769cf61a0.jpg`; widths 1280. |
| `src/assets/images/gallery/archive-136.jpg` | 4096 x 1856 | jpeg | 546428 | `/sofas`, `/our-work` | 1920 x 870; WebP 202928 bytes: `public/images/archive-136-fdcf3904e7-1920.webp`; fallback 399665 bytes: `public/images/archive-136-fdcf3904e7.jpg`; widths 640, 1920. |
| `src/assets/images/gallery/archive-137.jpg` | 1856 x 4096 | jpeg | 427183 | `/sofas`, `/our-work` | 1856 x 4096; WebP 431706 bytes: `public/images/archive-137-ee1068f71b-1856.webp`; fallback 427183 bytes: `public/images/archive-137-ee1068f71b.jpg`; widths 640, 1856. |
| `src/assets/images/gallery/archive-138.jpg` | 1856 x 4096 | jpeg | 334515 | `/sofas`, `/our-work` | 1856 x 4096; WebP 312140 bytes: `public/images/archive-138-7099bec59f-1856.webp`; fallback 334515 bytes: `public/images/archive-138-7099bec59f.jpg`; widths 640, 1856. |
| `src/assets/images/gallery/coffee-table-001.jpeg` | 1068 x 1600 | jpeg | 132437 | `/coffee-tables`, `/collections/living` | 1068 x 1600; WebP 121462 bytes: `public/images/coffee-table-001-7f33b6d9e2-1068.webp`; fallback 132437 bytes: `public/images/coffee-table-001-7f33b6d9e2.jpg`; widths 1068. |
| `src/assets/images/gallery/coffee-table-002.jpeg` | 736 x 1104 | jpeg | 87080 | `/side-tables` | 736 x 1104; WebP 92520 bytes: `public/images/coffee-table-002-1fd44b996b-736.webp`; fallback 87080 bytes: `public/images/coffee-table-002-1fd44b996b.jpg`; widths 736. |
| `src/assets/images/gallery/coffee-table-003.jpeg` | 1200 x 988 | jpeg | 82867 | `/coffee-tables`, `/collections/living` | 1200 x 988; WebP 72204 bytes: `public/images/coffee-table-003-cdfe14030a-1200.webp`; fallback 82867 bytes: `public/images/coffee-table-003-cdfe14030a.jpg`; widths 1200. |
| `src/assets/images/gallery/coffee-table-004.jpeg` | 736 x 1104 | jpeg | 73650 | `/coffee-tables`, `/collections/living` | 736 x 1104; WebP 75124 bytes: `public/images/coffee-table-004-9e45ca87a8-736.webp`; fallback 73650 bytes: `public/images/coffee-table-004-9e45ca87a8.jpg`; widths 736. |
| `src/assets/images/gallery/coffee-table-005.jpeg` | 600 x 600 | jpeg | 30128 | `/side-tables` | 600 x 600; WebP 25744 bytes: `public/images/coffee-table-005-a706851e75-600.webp`; fallback 30128 bytes: `public/images/coffee-table-005-a706851e75.jpg`; widths 600. |
| `src/assets/images/gallery/coffee-table-006.jpeg` | 1080 x 1350 | jpeg | 109518 | `/coffee-tables`, `/collections/living` | 1080 x 1350; WebP 97216 bytes: `public/images/coffee-table-006-30a44ab6a6-1080.webp`; fallback 109518 bytes: `public/images/coffee-table-006-30a44ab6a6.jpg`; widths 1080. |
| `src/assets/images/gallery/coffee-table-007.jpeg` | 1200 x 1200 | jpeg | 198278 | `/coffee-tables`, `/collections/living` | 1200 x 1200; WebP 241970 bytes: `public/images/coffee-table-007-dff965e5b0-1200.webp`; fallback 198278 bytes: `public/images/coffee-table-007-dff965e5b0.jpg`; widths 1200. |
| `src/assets/images/gallery/coffee-table-008.jpeg` | 795 x 820 | jpeg | 104884 | `/side-tables` | 795 x 820; WebP 119210 bytes: `public/images/coffee-table-008-874ddeb83b-795.webp`; fallback 104884 bytes: `public/images/coffee-table-008-874ddeb83b.jpg`; widths 795. |
| `src/assets/images/gallery/coffee-table-009.jpeg` | 1000 x 1500 | jpeg | 159684 | `/coffee-tables`, `/collections/living` | 1000 x 1500; WebP 156324 bytes: `public/images/coffee-table-009-6c4a776561-1000.webp`; fallback 159684 bytes: `public/images/coffee-table-009-6c4a776561.jpg`; widths 1000. |
| `src/assets/images/gallery/coffee-table-010.jpeg` | 736 x 931 | jpeg | 75971 | `/side-tables` | 736 x 931; WebP 77738 bytes: `public/images/coffee-table-010-b63c0ee178-736.webp`; fallback 75971 bytes: `public/images/coffee-table-010-b63c0ee178.jpg`; widths 736. |
| `src/assets/images/gallery/dining-001.jpeg` | 613 x 1080 | jpeg | 74290 | `/dining`, `/collections/dining` | 613 x 1080; WebP 64596 bytes: `public/images/dining-001-4c3b12bf68-613.webp`; fallback 74290 bytes: `public/images/dining-001-4c3b12bf68.jpg`; widths 613. |
| `src/assets/images/gallery/dining-002.jpeg` | 1200 x 1200 | jpeg | 113884 | `/dining`, `/collections/dining` | 1200 x 1200; WebP 109220 bytes: `public/images/dining-002-e1d00516b7-1200.webp`; fallback 113884 bytes: `public/images/dining-002-e1d00516b7.jpg`; widths 1200. |
| `src/assets/images/gallery/dining-003.jpeg` | 1024 x 1536 | jpeg | 165117 | `/dining`, `/collections/dining` | 1024 x 1536; WebP 162526 bytes: `public/images/dining-003-005da7dc99-1024.webp`; fallback 165117 bytes: `public/images/dining-003-005da7dc99.jpg`; widths 1024. |
| `src/assets/images/gallery/dining-004.jpeg` | 1000 x 1500 | jpeg | 80616 | `/dining`, `/collections/dining` | 1000 x 1500; WebP 54722 bytes: `public/images/dining-004-a48eebc7b1-1000.webp`; fallback 80616 bytes: `public/images/dining-004-a48eebc7b1.jpg`; widths 1000. |
| `src/assets/images/gallery/dining-005.jpeg` | 1200 x 1200 | jpeg | 196355 | `/dining`, `/collections/dining` | 1200 x 1200; WebP 213242 bytes: `public/images/dining-005-c372d282f5-1200.webp`; fallback 196355 bytes: `public/images/dining-005-c372d282f5.jpg`; widths 1200. |
| `src/assets/images/gallery/dining-006.jpeg` | 1199 x 1598 | jpeg | 384166 | `/dining`, `/collections/dining` | 1199 x 1598; WebP 456796 bytes: `public/images/dining-006-2f181ab0e4-1199.webp`; fallback 384166 bytes: `public/images/dining-006-2f181ab0e4.jpg`; widths 1199. |
| `src/assets/images/gallery/dining-007.jpeg` | 960 x 1280 | jpeg | 113034 | `/dining`, `/collections/dining` | 960 x 1280; WebP 111246 bytes: `public/images/dining-007-e28fd8fadd-960.webp`; fallback 113034 bytes: `public/images/dining-007-e28fd8fadd.jpg`; widths 960. |
| `src/assets/images/gallery/dining-chair-001.jpeg` | 960 x 1200 | jpeg | 59607 | `/dining-chairs`, `/collections/dining` | 960 x 1200; WebP 48600 bytes: `public/images/dining-chair-001-e4f3b2cb69-960.webp`; fallback 59607 bytes: `public/images/dining-chair-001-e4f3b2cb69.jpg`; widths 960. |
| `src/assets/images/gallery/dining-chair-002.jpeg` | 896 x 896 | jpeg | 55554 | `/dining-chairs`, `/collections/dining` | 896 x 896; WebP 57362 bytes: `public/images/dining-chair-002-fc2899060e-896.webp`; fallback 55554 bytes: `public/images/dining-chair-002-fc2899060e.jpg`; widths 896. |
| `src/assets/images/gallery/dining-chair-003.jpeg` | 1200 x 1500 | jpeg | 219907 | `/dining-chairs`, `/collections/dining` | UNCHANGED COPY: `public/images/dining-chair-003-d700e18f5b.jpeg`; 219907 bytes. P1 review retained. |
| `src/assets/images/gallery/dining-chair-004.jpeg` | 1200 x 1600 | jpeg | 183525 | `/dining-chairs`, `/collections/dining` | 1200 x 1600; WebP 195970 bytes: `public/images/dining-chair-004-bcaf4352ba-1200.webp`; fallback 183525 bytes: `public/images/dining-chair-004-bcaf4352ba.jpg`; widths 1200. |
| `src/assets/images/gallery/dining-chair-005.jpeg` | 1024 x 1536 | jpeg | 139025 | `/dining-chairs`, `/collections/dining` | UNCHANGED COPY: `public/images/dining-chair-005-2b531f6593.jpeg`; 139025 bytes. P1 review retained. |
| `src/assets/images/gallery/dining-chair-006.jpeg` | 1054 x 1600 | jpeg | 120675 | `/dining-chairs`, `/collections/dining` | UNCHANGED COPY: `public/images/dining-chair-006-717d36b3fb.jpeg`; 120675 bytes. P1 review retained. |
| `src/assets/images/gallery/dining-chair-007.jpeg` | 1024 x 1024 | jpeg | 85062 | `/dining-chairs`, `/collections/dining` | 1024 x 1024; WebP 103024 bytes: `public/images/dining-chair-007-cf358cb386-1024.webp`; fallback 85062 bytes: `public/images/dining-chair-007-cf358cb386.jpg`; widths 1024. |
| `src/assets/images/gallery/side-table-001.jpeg` | 1076 x 1600 | jpeg | 85160 | `/side-tables` | 1076 x 1600; WebP 53576 bytes: `public/images/side-table-001-323e386d16-1076.webp`; fallback 85160 bytes: `public/images/side-table-001-323e386d16.jpg`; widths 1076. |
| `src/assets/images/gallery/side-table-002.jpeg` | 1000 x 1000 | jpeg | 47044 | `/side-tables` | 1000 x 1000; WebP 30514 bytes: `public/images/side-table-002-6e385c839d-1000.webp`; fallback 47044 bytes: `public/images/side-table-002-6e385c839d.jpg`; widths 1000. |
| `src/assets/images/gallery/side-table-003.jpeg` | 900 x 1600 | jpeg | 91168 | `/side-tables` | 900 x 1600; WebP 69148 bytes: `public/images/side-table-003-750b1c4668-900.webp`; fallback 91168 bytes: `public/images/side-table-003-750b1c4668.jpg`; widths 900. |
| `src/assets/images/gallery/side-table-004.jpeg` | 1066 x 1600 | jpeg | 126460 | `/side-tables` | 1066 x 1600; WebP 99374 bytes: `public/images/side-table-004-050bd27e19-1066.webp`; fallback 126460 bytes: `public/images/side-table-004-050bd27e19.jpg`; widths 1066. |
| `src/assets/images/gallery/side-table-005.jpeg` | 704 x 1024 | jpeg | 56543 | `/side-tables` | 704 x 1024; WebP 47538 bytes: `public/images/side-table-005-847b92c33e-704.webp`; fallback 56543 bytes: `public/images/side-table-005-847b92c33e.jpg`; widths 704. |
| `src/assets/images/gallery/side-table-006.jpeg` | 1080 x 1356 | jpeg | 48954 | `/side-tables` | 1080 x 1356; WebP 34596 bytes: `public/images/side-table-006-2c19201457-1080.webp`; fallback 48954 bytes: `public/images/side-table-006-2c19201457.jpg`; widths 1080. |
| `src/assets/images/gallery/studio-001.png` | 1546 x 1017 | png | 2531991 | `/our-work`, `/recliners`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1546 x 1017; WebP 241174 bytes: `public/images/studio-001-bc346b5b5f-1546.webp`; fallback 465568 bytes: `public/images/studio-001-bc346b5b5f.jpg`; widths 640, 1546. |
| `src/assets/images/gallery/studio-002.png` | 1222 x 1287 | png | 2292721 | `/our-work`, `/chairs`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1222 x 1287; WebP 211982 bytes: `public/images/studio-002-a66209b0c9-1222.webp`; fallback 446059 bytes: `public/images/studio-002-a66209b0c9.jpg`; widths 1222. |
| `src/assets/images/gallery/studio-003.png` | 1848 x 851 | png | 2131947 | `/contact`, `/our-work`, `/chairs`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1848 x 851; WebP 178138 bytes: `public/images/collection-chairs-31645cd00b-1848.webp`; fallback 395714 bytes: `public/images/collection-chairs-31645cd00b.jpg`; widths 640, 1024, 1848. |
| `src/assets/images/gallery/studio-004.png` | 1782 x 883 | png | 2516909 | `/sofas`, `/our-work`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/bespoke` | 1782 x 883; WebP 256902 bytes: `public/images/customisation-main-ffd2f696b6-1782.webp`; fallback 469684 bytes: `public/images/customisation-main-ffd2f696b6.jpg`; widths 640, 1024, 1782. |
| `src/assets/images/gallery/studio-005.png` | 1875 x 839 | png | 2273721 | `/our-work`, `/beds`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/bedroom`, `/collections/bespoke` | 1875 x 839; WebP 176828 bytes: `public/images/furniture-mira-bed-8b5ef7d22d-1875.webp`; fallback 360342 bytes: `public/images/furniture-mira-bed-8b5ef7d22d.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/gallery/studio-006.png` | 1870 x 841 | png | 2851859 | `/`, `/sofas`, `/our-work`, `/sectionals`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/living`, `/collections/bespoke` | 1870 x 841; WebP 334254 bytes: `public/images/furniture-aster-sofa-4135992df4-1870.webp`; fallback 542676 bytes: `public/images/furniture-aster-sofa-4135992df4.jpg`; widths 640, 1024, 1870. |
| `src/assets/images/gallery/studio-007.png` | 1086 x 1448 | png | 2139959 | `/our-work`, `/recliners`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1086 x 1448; WebP 161328 bytes: `public/images/studio-007-9db38a76ea-1086.webp`; fallback 379976 bytes: `public/images/studio-007-9db38a76ea.jpg`; widths 1086. |
| `src/assets/images/gallery/studio-008.png` | 1024 x 1536 | png | 2469308 | `/our-work`, `/recliners`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1024 x 1536; WebP 200920 bytes: `public/images/furniture-noma-chair-594ef39353-1024.webp`; fallback 426215 bytes: `public/images/furniture-noma-chair-594ef39353.jpg`; widths 640, 1024. |
| `src/assets/images/gallery/studio-009.png` | 1650 x 953 | png | 2768283 | `/our-work`, `/recliners`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/seating`, `/collections/bespoke` | 1650 x 953; WebP 314684 bytes: `public/images/studio-009-6e4b4e4108-1650.webp`; fallback 568326 bytes: `public/images/studio-009-6e4b4e4108.jpg`; widths 640, 1650. |
| `src/assets/images/gallery/studio-010.png` | 1875 x 839 | png | 2382196 | `/sofas`, `/our-work`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/bespoke` | 1875 x 839; WebP 229618 bytes: `public/images/studio-010-0d8cce4a30-1875.webp`; fallback 450890 bytes: `public/images/studio-010-0d8cce4a30.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/gallery/studio-011.png` | 1875 x 839 | png | 2579279 | `/sofas`, `/our-work`, `/coffee-tables`, `/tables`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/living`, `/collections/tables`, `/collections/bespoke` | 1875 x 839; WebP 259664 bytes: `public/images/brand-story-2a975f1a07-1875.webp`; fallback 479260 bytes: `public/images/brand-story-2a975f1a07.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/gallery/studio-012.png` | 1875 x 839 | png | 2207047 | `/sofas`, `/our-work`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/bespoke` | 1875 x 839; WebP 191008 bytes: `public/images/collection-sofas-d875c89981-1875.webp`; fallback 408735 bytes: `public/images/collection-sofas-d875c89981.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/gallery/studio-013.png` | 1875 x 839 | png | 2406484 | `/sofas`, `/our-work`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/bespoke` | 1875 x 839; WebP 214882 bytes: `public/images/category-sofas-97dccd0348-1875.webp`; fallback 420241 bytes: `public/images/category-sofas-97dccd0348.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/gallery/studio-014.png` | 1046 x 1503 | png | 2347043 | `/`, `/our-work`, `/chairs`, `/ottomans-benches`, `/custom`, `/furniture`, `/bespoke-furniture`, `/collections/living`, `/collections/seating`, `/collections/bespoke` | 1046 x 1503; WebP 213988 bytes: `public/images/category-chairs-b87ded9931-1046.webp`; fallback 451667 bytes: `public/images/category-chairs-b87ded9931.jpg`; widths 640, 1024, 1046. |
| `src/assets/images/hero-main.png` | 1875 x 839 | png | 2382196 | No current rendered use | 1875 x 839; WebP 229618 bytes: `public/images/studio-010-0d8cce4a30-1875.webp`; fallback 450890 bytes: `public/images/studio-010-0d8cce4a30.jpg`; widths 640, 1024, 1875. |
| `src/assets/images/project-01.png` | 1782 x 883 | png | 2516909 | `/`, `/our-work/project-01`, `/our-work/project-02`, `/our-work/project-03` | 1782 x 883; WebP 256902 bytes: `public/images/customisation-main-ffd2f696b6-1782.webp`; fallback 469684 bytes: `public/images/customisation-main-ffd2f696b6.jpg`; widths 640, 1024, 1782. |
| `src/assets/images/project-02.png` | 1870 x 841 | png | 2851859 | `/`, `/our-work/project-01`, `/our-work/project-02`, `/our-work/project-03` | 1870 x 841; WebP 334254 bytes: `public/images/furniture-aster-sofa-4135992df4-1870.webp`; fallback 542676 bytes: `public/images/furniture-aster-sofa-4135992df4.jpg`; widths 640, 1024, 1870. |
| `src/assets/images/project-03.jpg` | 4096 x 3072 | jpeg | 422070 | `/`, `/our-work/project-01`, `/our-work/project-02`, `/our-work/project-03` | 1920 x 1440; WebP 131548 bytes: `public/images/archive-132-a8e466228e-1920.webp`; fallback 334384 bytes: `public/images/archive-132-a8e466228e.jpg`; widths 640, 1024, 1920. |

## G. Duplicate Assets Cleaned

22 exact duplicate groups, 25 extra original copies retained intentionally.
Their generated photo delivery is consolidated; gallery ordering and logical image identifiers are preserved.
Removed original files: NONE. Renamed original files: NONE. Replaced questionable imagery: NONE.
Unused eager original-image globs were removed from runtime modules; image delivery is now explicitly mapped.

## H. Before and After Build Size

Decimal kB/MB. Gzip is locally computed, not a claim about hosting headers.
Baseline is the Phase 5 production build, before Phase 6 edits.

| Measure | Before | After |
| --- | --- | --- |
| Initial JS | 371.46 kB | 289.88 kB |
| Initial JS gzip | 102.75 kB | 87.29 kB |
| Initial CSS | 103.52 kB | 87.02 kB |
| Initial CSS gzip | 17.91 kB | 15.57 kB |
| All JS chunks | 371.46 kB (1 file) | 396.19 kB (18 files) |
| All JS chunks gzip | 102.75 kB | 116.20 kB |
| All CSS chunks | 103.52 kB | 104.33 kB (6 files) |
| All image assets | 68.19 MB | 52.58 MB |
| Entire dist | 68.67 MB | 53.09 MB |

Initial JS and CSS are smaller. Total JS is slightly larger because route metadata, image delivery helpers and async boundaries were added; code splitting is an initial-loading improvement, not a claim that the sum of all JS files fell.
Main avoidable original costs were large PNG photos, eagerly linked gallery metadata and all secondary pages/styles bundled into the entry.

## I. Route Code Splitting

`src/App.jsx` keeps Home, Navbar, Footer and the small launcher eager.
12 secondary page components use React.lazy/Suspense. Gallery data is owned by `src/pages/GalleryRoute.jsx` and its deferred manifest.
`src/data/collections.js` no longer imports every gallery for homepage cards/navigation; `src/data/collectionPages.js` handles gallery composition.
A shared-header/footer loading state covers lazy pages; no route names or custom-routing behavior was changed.
Page-specific CSS is extracted into async chunks by Vite.
The modal was not split into another network dependency: its initial DOM/listener work is already guarded while closed.

## J. CSS and Font Result

PostCSS audit found zero exact repeated rule blocks and zero consecutive identical blocks.
No existing CSS was removed without evidence of unused/duplicate behavior. This avoids a visual rewrite.
Only picture/hero positioning, loading-state and mobile launcher reservation rules were added; mobile hero object-position matches the old background-position.
The large shared stylesheet remains a future focused cleanup candidate.
System/local --font-serif and --font-sans stacks remain unchanged. No Google Fonts/font downloads added.

## K. WhatsApp Mobile Fix

`src/components/WhatsAppButton.jsx` / `src/styles/globals.css`.
At <=767 pixels a narrow opaque bottom launcher area reserves space; root bottom padding and scroll padding let footer/CTA controls move above it.
The icon remains 50 x 50 pixels and inside the viewport at 430/390/360; aria-label is Chat with Baithak on WhatsApp.
No wide visible launcher label or new enquiry workflow was added.
The existing popup keeps focus trapping, Escape, field validation, central WhatsApp message generation and duplicate-submit protection.
CTA/footer bounding-box and modal/focus tests passed at all three narrow widths.

## L. Local Lighthouse

Lighthouse 13.5.0, production preview homepage, desktop preset and default simulated mobile settings.
These are local samples, not deployed-domain guarantees or a release SLA. No run warnings.

| Mode | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Desktop | 99 | 97 | 100 | 100 | 1.0 s | 0 |
| Mobile (latest) | 79 | 97 | 100 | 100 | 5.4 s | 0 |

Mobile performance is not yet equivalent to desktop: the latest simulated LCP is 5.4 seconds (FCP 1.4 s, TBT 120 ms). An earlier final-series sample measured performance 81/LCP 5.0 s; local runs vary. The latest result is reported rather than selecting the highest score.
The final trace confirms early/discoverable, eager, high-priority hero loading; no duplicate hero fallback request was seen.
Remaining audits include image sizing/transfer, render-blocking shared CSS, and existing contrast and visible-label/accessibility-name mismatches.
No content or palette changes were made solely to chase scores. Assess real deployed compression/cache behavior and field performance after domain/hosting confirmation.

## M. Deferred Technical Preparation

CANONICALS DEFERRED UNTIL DOMAIN CONFIRMATION.
Production sitemap URLs and og:url are also deferred; no localhost sitemap was generated.
Approved landscape share image and square favicon remain required.
Product-rich data and fuller business schema wait for verified names/specifications/commercial data and contact ownership.
Non-JavaScript route-head rendering and real HTTP 404 responses require a hosting/prerender strategy. Current SPA fallback returns HTML with client 404/noindex, not a guaranteed HTTP 404 response.
No deployment settings, tracking, ecommerce or business-content claims were added.

## N. Verification

- npm run build: PASS; 1632 modules transformed; image cache skips unchanged work.
- All 38 known routes, 266 route/width checks at 1440/1280/1024/768/430/390/360: PASS.
- No horizontal overflow, failed images, missing CSS/JS, console/page errors, broken internal routes/anchors or external tracking requests.
- Product/project viewers, arrow navigation, Escape and focus restoration: PASS.
- Contact/floating WhatsApp validation and prepared messages, customisation preferences, mobile menu: PASS. No messages were sent.
- Furniture mega-menu/accordion click navigation, desktop hover/Tab and Escape focus restoration: PASS at all seven widths. A pre-existing ArrowDown focus-transfer issue was found in the unchanged Navbar: the menu opens but focus stays on its trigger. It is not claimed fixed by this phase.
- Unknown generic/product/project paths show 404 and noindex; returning home restores index, follow.
- JSON-LD contains only the verified central name/email fields and schema context/type.
- All 206 original hashes unchanged; protected P1 delivery copies unchanged.
- Desktop homepage before/after screenshots have identical dimensions and mean channel difference 0.87/255, with no channels differing by more than 20 in that comparison. Differences are image compression, not a layout redesign.
- Desktop/mobile screenshots reviewed; allowed mobile launcher reservation is the intended visual change.
- Existing dev server remains available; separate local production preview started without disrupting it.
- CONTENT-REVIEW.md preserved, with Phase 6 delivery and production-count addenda only.
- No GitHub push or deployment performed.

Implementation references: [React lazy](https://react.dev/reference/react/lazy), [Vite asynchronous chunk loading](https://vite.dev/guide/features.html#async-chunk-loading-optimization), [Sharp output options](https://sharp.pixelplumbing.com/api-output/).

## Phase 7 Addendum

The measurements above remain the historical Phase 6 baseline. FINAL-QA.md records the final Phase 7 build, Lighthouse, route inventory and launch status.
The previously documented ArrowDown focus issue is fixed and tested, including hovered/reduced-motion states. Card/gallery accessible names, standalone heading order, mobile image-strip keyboard focus and popup/menu focus isolation are corrected; existing contrast findings remain.
Home mobile delivery now uses a framing-equivalent 1000 x 841 crop of the same photo at the same WebP quality: 189924 bytes instead of 334254. Only the selected hero source is preloaded. Contact's tall hero uses a full-resolution size hint. No original or protected P1 file changed.
Launcher clearance includes tablet widths and desktop end-of-page/scroll spacing. Phone-format validation is shared between Contact and the floating form; duplicate-submit and message-preparation tests pass without sending messages.
Final local performance is 99 desktop / 84 mobile, with mobile LCP 4.50 seconds (Phase 6: 5.41) and CLS 0. Accessibility 97, Best Practices 100 and SEO 100 on both. These are local lab samples, not deployed guarantees.
All content, branding-asset, legal and domain/hosting confirmations remain as listed in LAUNCH-CHECKLIST.md. No commit, push or deployment performed.
