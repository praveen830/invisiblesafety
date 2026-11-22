# PHASE 0 — INVISIBLE SAFETY WEBSITE AUDIT & RESEARCH REPORT

**Website Name:** Invisible Safety  
**Official Domain:** https://invisiblesafety.in/  
**Primary Contact / Direct Inquiries:** +91 83097 55398 | https://wa.me/918309755398  
**Audit Date:** November 21, 2026  
**Auditor Roles:** Senior UI/UX Designer, Creative Director, Frontend Architect, SEO Strategist, Image Specialist & Performance Engineer  
**Status:** Strictly Read-Only Audit & Strategic Research (No Code / Images Modified, No Deployments)

---

## 1. EXECUTIVE SUMMARY

Invisible Safety (https://invisiblesafety.in/) is a premier residential safety engineering specialist serving high-rise apartment towers, luxury penthouses, and gated villa communities across South India (operating across Hyderabad, Visakhapatnam, Vijayawada, Amaravati, Bengaluru, Chennai, and Kochi). 

The primary business offerings encompass:
1. **SS316 Marine-Grade Invisible Grills** (2.0mm & 2.5mm high-tensile cables for balconies, windows, and staircases).
2. **Certified Balcony & Anti-Pigeon Safety Nets** (Virgin Garware UV-stabilized HDPE netting).
3. **Child & Pet Fall-Containment Safety Nets**.
4. **Smart Ceiling Cloth Drying Hangers** (Stainless steel pull-down dual-pulley systems).
5. **SS304 Bird Spikes & Deterrence Systems**.
6. **Commercial, Industrial & Sports Practice Nets**.

### Strategic Transformation Goal
To transition Invisible Safety from a functional local safety contractor website into an **exceptional, high-trust, image-first architectural safety brand**. The digital platform must embody **Bright Architectural Luxury + Cinematic Editorial**, rivaling global reference brands (Apple, Tesla, Louis Vuitton) while honoring the local residential architectural realities of high-rise living in South India.

### High-Level Audit Findings
* **Live Production Status:** The live domain is accessible (HTTP 200 OK) with functioning static asset delivery and metadata.
* **Critical Mobile UI Failure:** On smartphones (`<768px`), massive H1 serif typography and marketing copy are superimposed directly over the hero balcony photograph, obstructing the product visual, clashing with the woman/cables, and causing horizontal text clipping/truncation.
* **Dark Hero Aesthetics:** The live hero is cloaked in a dark gradient scrim (`rgba(15, 35, 61, 0.75)` to `rgba(15, 35, 61, 0.95)`), contradicting the core brand proposition of **"Uninterrupted Daylight and Clear Skyline Views"**.
* **Image Duplication:** Hash verification revealed multiple duplicate image assets masquerading under different file names across core categories (e.g., child safety nets and balcony safety nets share the exact same binary file).
* **Missing City Landing Pages:** Marketing copy promises service in 7 cities (including Bengaluru, Chennai, and Kochi), but dedicated landing pages exist for only 4 cities.
* **Strict Phase 0 Compliance:** This audit was conducted in a **100% read-only mode**. Zero project code files were modified, zero images were deleted or replaced, zero npm packages were installed, and zero code was deployed.

---

## 2. EXISTING WEBSITE TECHNICAL AUDIT

### 2.1 Framework & Core Technologies
* **Static Site Generator:** Astro v5.4.2 running in pure static output mode (`output: "static"`).
* **UI Component Framework:** React 19 (`@astrojs/react` v4.2.0) powering interactive islands.
* **Icon Library:** Lucide React (`lucide-react` v0.475.0).
* **3D & Visualization Engine:** Three.js integrated via custom canvas within `VisualizerIsland.tsx` for real-time balcony perspective and cable spacing simulation.
* **Utility Libraries:** `clsx` (v2.1.1) and `tailwind-merge` (v3.0.1).
* **Language:** TypeScript v5.7.3 (`tsconfig.json` extending `astro/tsconfigs/strict`).

### 2.2 Project Architecture & Directory Structure
```
invisiblesafety-master/
├── public/
│   ├── favicon.png, favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml (311 lines), sitemap-index.xml
│   └── images/ (36 image files totaling 7.16 MB)
├── src/
│   ├── components/ (13 Astro components + 4 React islands)
│   │   ├── Header.astro, Footer.astro, Hero.astro, StickyMobileCTA.astro
│   │   ├── SEO.astro, ProductCard.astro, TrustSection.astro, ComparisonTable.astro
│   │   ├── EngineeringSection.astro, ProcessSection.astro, LocationLinks.astro
│   │   └── react/ (VisualizerIsland.tsx, CostEstimator.tsx, GalleryFilter.tsx, BeforeAfterSlider.tsx)
│   ├── data/ (business.ts, locations.ts, pricing.ts, products.ts, projects.ts, faq.ts)
│   ├── layouts/ (BaseLayout.astro, SubPageLayout.astro)
│   ├── pages/ (49 .astro files compiling to 53 static routes)
│   ├── styles/ (global.css — 1,318 lines of CSS design tokens and custom rules)
│   └── utils/ (seo.ts, imageMap.ts)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

### 2.3 CSS & Styling Pipeline
* The project styles are primarily driven by `src/styles/global.css` using native CSS custom properties (`:root` variables) and scoped `<style>` blocks in Astro components.
* **Critical Technical Note:** While `tailwind.config.mjs` exists in the root directory, `tailwindcss` and `@astrojs/tailwind` are **not installed** in `package.json` nor registered in `astro.config.mjs`. Consequently, utility classes written in JSX/Astro templates (e.g., arbitrary Tailwind utility strings) do not compile into CSS unless explicitly backed by definitions in `global.css` or scoped component styles.

### 2.4 Build & Compilation Performance
* `npm run build` generates **53 static HTML routes** in `dist/`.
* Total client build bundle: `~280 KB` gzip (dominated by Three.js `VisualizerIsland.js` and React runtime).
* Build compilation time: **18.3 to 36.4 seconds** on Windows local environment.

---

## 3. UI/UX PROBLEMS (VERIFIED EVIDENCE FROM LIVE SITE AUDIT)

A live site inspection of https://invisiblesafety.in/ was conducted on November 21, 2026. The actual production layout exhibits several verified usability and design flaws:

### Problem 1: Mobile Text-over-Image Collision
* **Visual Evidence:** Live mobile screenshot (`audit/live_audit_screenshots/live_mobile_390px.png`).
* **Root Cause:** The hero `<h1>` (`"ARCHITECTURAL SS316 INVISIBLE GRILLS & SAFETY NETS"`), eyebrow tag, two body sentences, and two conversion buttons are rendered with absolute positioning over the photo.
* **Impact:** On a 390px iPhone viewport, the text completely covers the woman's face, torso, and balcony cables. The headline is clipped at the right viewport margin (`"ARCHITECTURAL SS3I INVISIBLE GRILLS & SAF NETS"`).

### Problem 2: Dark Vignette / Scrim Dimming Balcony Views
* **Visual Evidence:** Live desktop screenshot (`audit/live_audit_screenshots/live_desktop_1440px.png`).
* **Root Cause:** A heavy dark gradient scrim (`linear-gradient(180deg, rgba(15,35,61,0.6) 0%, rgba(15,35,61,0.95) 100%)`) is applied over the hero image.
* **Impact:** Balconies sell open air, expansive sky, and freedom. The dark scrim makes the balcony feel enclosed, somber, and dim.

### Problem 3: 3-Service Artificial Constraint
* **Visual Evidence:** Live desktop services screenshot (`audit/live_audit_screenshots/live_desktop_fullpage.png`).
* **Root Cause:** The homepage only provides 3 tall service columns: *Pillar 1: Flagship Invisible Grills*, *Pillar 2: Certified HDPE Safety Nets*, and *Pillar 3: Smart Ceiling Cloth Hangers*.
* **Impact:** High-demand residential services—specifically **Child Safety Nets**, **Pigeon Deterrence Nets**, **Bird Spikes**, and **Sports Turf Nets**—are buried inside tiny bullet points under Pillar 2, severely reducing customer inquiry rates.

### Problem 4: Mobile Vertical Scroll Fatigue
* **Visual Evidence:** Live mobile services screenshot (`audit/live_audit_screenshots/live_mobile_fullpage.png`).
* **Root Cause:** The 3 vertical service cards stack into a single column on mobile, with each card measuring over 800px in height due to 4 feature bullets, technical specs, and dual buttons.
* **Impact:** Mobile visitors must scroll through over **2,500px of text** just to see three services, leading to high bounce rates before reaching the 3D visualizer or contact form.

### Problem 5: Missing Floating Action Dock on Desktop
* **Impact:** While mobile users have a bottom contact bar, desktop users who scroll down the long homepage lose access to direct contact buttons. They must scroll thousands of pixels back up to the header or hunt for the footer.

---

## 4. DESKTOP AND MOBILE FINDINGS (ACTUAL SCREENSHOT EVIDENCE)

Actual visual evidence captured directly from the live production website (https://invisiblesafety.in/):

### 4.1 Live Production Desktop View (1440px × 900px)
* Reference file: `audit/live_audit_screenshots/live_desktop_1440px.png`
* **Header:** Clean brand logo ("INVISIBLE SAFETY") with contact number `+91 83097 55398` and "Book Free Inspection" button.
* **Hero Observation:** 50% of the balcony photo is hidden behind dark blue shading and large serif text. The subtle elegance of the stainless steel cables is lost against the dark background.

### 4.2 Live Production Mobile View (390px × 844px)
* Reference file: `audit/live_audit_screenshots/live_mobile_390px.png`
* **Severe Text Overlap:** Massive white serif text covers the entire balcony photo from top to bottom.
* **Text Truncation:** Headline characters clip at the right screen edge.
* **Floating Bottom Bar:** Features "Call Now" and "WhatsApp", but lacks the high-intent "Free Survey" booking trigger.

### 4.3 Live Production Services Section
* Reference file: `audit/live_audit_screenshots/live_desktop_fullpage.png` (Section 2)
* Text-heavy 3-pillar structure requiring substantial vertical scrolling.

---

## 5. CURRENT PAGE INVENTORY (53 STATIC ROUTES)

The complete application contains **49 Astro page templates** compiling into **53 static routes**:

| Category | Route / URL | Template File | Primary Purpose / Status |
| :--- | :--- | :--- | :--- |
| **Core** | `/` | `src/pages/index.astro` | Homepage flagship landing page |
| **Core** | `/about/` | `src/pages/about.astro` | Company story, engineering certifications |
| **Core** | `/contact/` | `src/pages/contact.astro` | Direct contact details, inquiry form, map |
| **Core** | `/projects/` | `src/pages/projects.astro` | Completed high-rise installation case studies |
| **Core** | `/gallery/` | `src/pages/gallery.astro` | Filterable project photo gallery |
| **Core** | `/faq/` | `src/pages/faq.astro` | Frequently asked customer & RWA questions |
| **Interactive** | `/visualizer/` | `src/pages/visualizer.astro` | Dedicated Three.js 3D Balcony Lab |
| **Interactive** | `/invisible-grill-cost/` | `src/pages/invisible-grill-cost.astro` | Dynamic sq.ft. pricing calculator island |
| **Trust** | `/warranty/` | `src/pages/warranty.astro` | 15-Year SS316 warranty terms & registration |
| **Trust** | `/materials/` | `src/pages/materials.astro` | Metallurgy specs: SS316 vs HDPE polymer |
| **Trust** | `/why-invisible-safety/` | `src/pages/why-invisible-safety.astro` | Architectural comparison vs traditional MS grills |
| **Utility** | `/thank-you/` | `src/pages/thank-you.astro` | Lead conversion confirmation page |
| **Utility** | `/404/` | `src/pages/404.astro` | Custom branded 404 error page |
| **Legacy** | `/why-invisprotect/` | `src/pages/why-invisprotect.astro` | 301 meta-refresh redirect to `/why-invisible-safety/` |
| **Services (Core)** | `/invisible-grills/` | `src/pages/invisible-grills.astro` | Flagship SS316 invisible grills master hub |
| **Services (Core)** | `/safety-nets/` | `src/pages/safety-nets.astro` | Garware HDPE safety nets master hub |
| **Services (Core)** | `/bird-protection/` | `src/pages/bird-protection.astro` | Bird exclusion netting & spikes master hub |
| **Services (Core)** | `/cloth-drying-hangers/` | `src/pages/cloth-drying-hangers.astro` | Ceiling pull-down hanger solutions |
| **Sub-Services** | `/balcony-invisible-grills/` | `src/pages/balcony-invisible-grills.astro` | SEO targeted subpage: Balcony grills |
| **Sub-Services** | `/window-invisible-grills/` | `src/pages/window-invisible-grills.astro` | SEO targeted subpage: Window grills |
| **Sub-Services** | `/staircase-invisible-grills/`| `src/pages/staircase-invisible-grills.astro`| SEO targeted subpage: Duplex staircase grills |
| **Sub-Services** | `/child-safety-invisible-grills/`| `src/pages/child-safety-invisible-grills.astro`| Child-safe 50mm wire spacing grills |
| **Sub-Services** | `/balconies/` | `src/pages/balconies.astro` | Balcony enclosure architectural overview |
| **Sub-Services** | `/balcony-safety/` | `src/pages/balcony-safety.astro` | Balcony fall safety net installation |
| **Sub-Services** | `/child-safety-nets/` | `src/pages/child-safety-nets.astro` | Heavy-duty child containment netting |
| **Sub-Services** | `/pigeon-nets/` | `src/pages/pigeon-nets.astro` | Anti-pigeon balcony exclusion netting |
| **Sub-Services** | `/bird-spikes/` | `src/pages/bird-spikes.astro` | SS304 polycarbonate bird deterrent spikes |
| **Sub-Services** | `/sports-nets/` | `src/pages/sports-nets.astro` | Box cricket & terrace sports netting |
| **Sub-Services** | `/sports-practice-nets/` | `src/pages/sports-practice-nets.astro` | Professional cricket practice enclosures |
| **Sub-Services** | `/building-safety-nets/` | `src/pages/building-safety-nets.astro` | High-rise exterior elevation perimeter nets |
| **Sub-Services** | `/construction-safety/` | `src/pages/construction-safety.astro` | Industrial site fall protection netting |
| **Sub-Services** | `/construction-safety-nets/`| `src/pages/construction-safety-nets.astro`| Debris containment & worker safety nets |
| **Sub-Services** | `/car-parking-safety-nets/` | `src/pages/car-parking-safety-nets.astro` | Ceiling bird exclusion in parking basements |
| **Sub-Services** | `/duct-safety-nets/` | `src/pages/duct-safety-nets.astro` | Internal ventilation plumbing duct nets |
| **Sub-Services** | `/industrial-safety-nets/` | `src/pages/industrial-safety-nets.astro` | Warehouse & factory ceiling nets |
| **Sub-Services** | `/monkey-safety-nets/` | `src/pages/monkey-safety-nets.astro` | Heavy-wire monkey exclusion enclosures |
| **Sub-Services** | `/mosquito-safety-nets/` | `src/pages/mosquito-safety-nets.astro` | Fine mesh insect & mosquito screens |
| **Sub-Services** | `/coconut-safety-nets/` | `src/pages/coconut-safety-nets.astro` | Tree fall protection nets for driveways |
| **Sub-Services** | `/staircase-safety-nets/` | `src/pages/staircase-safety-nets.astro` | Open riser staircase child barrier nets |
| **Sub-Services** | `/swimming-pool-nets/` | `src/pages/swimming-pool-nets.astro` | Child & debris swimming pool safety nets |
| **Sub-Services** | `/terrace-safety-nets/` | `src/pages/terrace-safety-nets.astro` | Rooftop terrace parapet extension nets |
| **Sub-Services** | `/animals-birds-safety-nets/`| `src/pages/animals-birds-safety-nets.astro`| General pet & animal safety enclosures |
| **Solutions Hub**| `/solutions/` | `src/pages/solutions.astro` | Categorized architectural safety hub |
| **Dynamic** | `/solutions/invisible-grills/` | `src/pages/solutions/[slug].astro` | Dynamic solution landing page |
| **Dynamic** | `/solutions/safety-nets/` | `src/pages/solutions/[slug].astro` | Dynamic solution landing page |
| **Dynamic** | `/solutions/bird-protection/`| `src/pages/solutions/[slug].astro` | Dynamic solution landing page |
| **Dynamic** | `/solutions/sports-nets/` | `src/pages/solutions/[slug].astro` | Dynamic solution landing page |
| **Dynamic** | `/solutions/construction-safety/`| `src/pages/solutions/[slug].astro`| Dynamic solution landing page |
| **Locations** | `/locations/` | `src/pages/locations/index.astro` | South India Regional Operations Hub |
| **Locations** | `/locations/hyderabad/` | `src/pages/locations/hyderabad.astro` | Hyderabad & Secunderabad city page |
| **Locations** | `/locations/visakhapatnam/` | `src/pages/locations/visakhapatnam.astro` | Vizag & Coastal Andhra city page |
| **Locations** | `/locations/vijayawada/` | `src/pages/locations/vijayawada.astro` | Vijayawada & Krishna District city page |
| **Locations** | `/locations/amaravati/` | `src/pages/locations/amaravati.astro` | Amaravati Capital Region city page |

---

## 6. IMAGE AUDIT & ASSET INVENTORY

The `public/images/` directory contains **36 image files** totaling **7.16 MB**. An MD5 hash inspection identified significant duplication:

### 6.1 Verified Duplicate Groups (Identical File Hashes)
1. **Duplicate Group 1 (274.9 KB - 1376×768 JPEG):**
   * `balcony-safety-twilight.jpg`
   * `category-child-safety.jpg`
   * `safety-net-balcony.jpg`
   * *Finding:* Child safety and balcony nets are using the exact same generic twilight image.
2. **Duplicate Group 2 (237.4 KB - 1376×768 WebP):**
   * `balcony-safety.webp`
   * `safety-net-balcony.webp`
   * *Finding:* Identical WebP image saved under two different names.
3. **Duplicate Group 3 (204.2 KB - 1376×768 JPEG):**
   * `bird-spikes.jpg`
   * `category-bird-protection.jpg`
   * `pigeon-net-twilight.jpg`
   * *Finding:* Bird spikes and pigeon nets share the exact same asset, meaning customers clicking "Bird Spikes" see pigeon netting instead of stainless steel spikes.
4. **Duplicate Group 4 (338.7 KB - 1376×768 JPEG):**
   * `category-structural-safety.jpg`
   * `construction-safety-net.jpg`
   * *Finding:* Identical structural net asset duplicated across two categories.

### 6.2 Image Format & Compression Analysis
* **WebP Adoption:** Only 13 of 36 images are WebP (36%). 20 images remain uncompressed standard JPEGs.
* **Large File Sizes:** Several images exceed 300 KB (`coconut-safety-net.jpg` is 362 KB; `category-structural-safety.jpg` is 338 KB). Converting these to WebP/AVIF will yield **65% to 80% file size reductions** while improving visual fidelity.
* **Mobile Aspect Ratios:** Only 2 vertical images exist (`hero-balcony-twilight-mobile.jpg` and `construction-safety-mobile-twilight.jpg` at 768×1376). Most service cards attempt to force 16:9 landscape images into portrait cards, resulting in awkward object cropping on mobile devices.

---

## 7. REFERENCE WEBSITE RESEARCH & STRATEGIC BENCHMARKS

To create an original identity for Invisible Safety, we benchmarked six world-class platforms:

### Key Principles Adopted:
1. **From Apple:** Zero text overlaying the primary product hero. The invisible grills and balcony architecture must be 100% visible, bright, and unobstructed.
2. **From Tesla:** Pinned, high-contrast floating quick-action buttons ("Call", "WhatsApp", "Free Survey") that follow the user seamlessly on mobile and desktop.
3. **From Louis Vuitton:** Rejection of cold, tech-black backgrounds. Adoption of warm residential architectural luxury: soft ivory (`#FAFCFE`), warm sand (`#FDF6EE`), and restrained soft gold borders (`#C6A66B`).
4. **From Awwwards & GSAP:** Meaningful 3D interactivity (the 3D Balcony Visualizer) that provides tangible utility rather than gratuitous visual noise.

---

## 8. RECOMMENDED DESIGN SYSTEM: BRIGHT ARCHITECTURAL LUXURY

### 8.1 The Architectural Color Palette
* **Primary (Deep Royal Navy):** `#0F233D` — Used for main headlines (`<h1>`), primary action buttons, and top utility bar. Communicates marine-grade engineering strength.
* **Secondary (Soft Sky Blue & Azure):** `#F0F5FA` (soft backdrop) and `#2D89EF` (active accent) — Reminds homeowners of clear blue skies and unhindered balcony daylight.
* **Accent (Pure Architectural Gold):** `#C6A66B` / `#D8BE8A` — Used selectively for warranty badges, star ratings, and subtle card borders.
* **Neutral Backgrounds (Warm Ivory & Architectural Sand):**
  * Pristine Page White: `#FFFFFF`
  * Warm Architectural Sand: `#FDF6EE`
  * Soft Editorial Off-White: `#FAFCFE`
* **Text / Neutral (High-Contrast Slate):** `#1E293B` (Body) and `#334155` (Secondary) — Guarantees 100% WCAG AAA contrast and legibility across all lighting environments.
* **Conversion Accent (Natural WhatsApp Green):** `#25D366` / `#20BA5A` — Recognizable instant messaging trigger.

### 8.2 Typography Hierarchy
* **Brand Headings:** *Plus Jakarta Sans* (Weight 800/700) paired with subtle accents of *Cinzel* (classical luxury serif for formal titles).
* **Fluid Font Sizing:**
  clamp(1.85rem, 4vw, 3.4rem)
* **Body Copy:** *Plus Jakarta Sans* / *Inter* (Weights 400, 500, 600; line-height 1.6).

### 8.3 Card Architecture & Elevation
* **Border Radii:** `16px` (`rounded-2xl`) for service cards; `24px` (`rounded-3xl`) for section containers and visualizer frames.
* **Elevation & Shadows:**
  * Card Resting: `0 4px 20px -2px rgba(15, 35, 61, 0.05)`
  * Card Hover: `0 12px 30px -4px rgba(15, 35, 61, 0.12)`

---

## 9. PROPOSED WEBSITE STRUCTURE (CLEAN 8-PILLAR ARCHITECTURE)

1. **Home (`/`)**: Photo-first luxury hero (strictly stacked on mobile), 6 photo-first service cards (2-col mobile, 6-col desktop), high-contrast navy trust strip, interactive 3D Balcony Visualizer & Live Cost Estimator, recent installations gallery, verified testimonials, regional city hub, and global fixed quick-action dock.
2. **About (`/about/`)**: Engineering heritage, IS 3521 safety compliance, virgin AISI 316 steel certifications, team credentials, and high-rise installation safety protocols.
3. **Services Master Hub (`/services/` or `/solutions/`)**: Clean visual directory categorized into 3 distinct verticals:
   * *Architectural Invisible Grills* (Balconies, Windows, Staircases, French Doors).
   * *Certified Safety Nets* (Balcony fall protection, Children & Pet nets, Anti-Pigeon netting, Duct nets).
   * *Utility & Specialty Solutions* (Smart ceiling cloth drying hangers, SS304 bird spikes, Sports nets).
4. **Individual Service Pages (6 Core Services)**:
   * `/invisible-grills/`
   * `/safety-nets/`
   * `/child-safety-nets/`
   * `/pigeon-nets/`
   * `/cloth-drying-hangers/`
   * `/bird-spikes/`
5. **Projects (`/projects/`)**: High-resolution project case studies from top gated communities (e.g., My Home Bhooja, Prestige High Fields, Aparna Serene Park, Sea Pearl Vizag).
6. **Gallery (`/gallery/`)**: Filterable real-world installation photo album with Before/After sliders.
7. **Locations Hub (`/locations/`)**: Dedicated regional city landing pages for all 7 operational cities:
   * Hyderabad
   * Visakhapatnam (Vizag)
   * Vijayawada
   * Amaravati
   * *Bengaluru (New)*
   * *Chennai (New)*
   * *Kochi (New)*
8. **Contact & Booking (`/contact/`)**: Instant doorstep laser measurement booking, direct WhatsApp dispatcher, emergency safety consultation, and office address details.

---

## 10. IMAGE GENERATION & CURATION STRATEGY

To resolve asset duplication and support the **Bright Architectural Luxury** design direction, every core category requires tailored photography specifications:

| Service Category | Visual Subject | Realistic Style | Desktop Comp | Mobile Comp | Target Ratio | Current Status & Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Homepage Hero** | Modern sunlit luxury penthouse balcony, vertical SS316 cables, lush skyline, happy homeowner | Warm morning sunlight, crisp architectural detail | 16:9 landscape, subject right-aligned | 4:5 vertical portrait, centered balcony | Desktop: `16:9`<br>Mobile: `4:5` | **Replace:** Current dark twilight image with warm natural morning architectural photo |
| **Invisible Grills** | Macro shot of 2.5mm SS316 cables anchored in sleek black powder-coated aluminum track | High-precision engineering, metallic luster | Wide angle balcony vista with macro inset | Vertical eye-level balcony cable view | `16:10` | **Retain & Optimize:** `category-invisible-grills.jpg` is strong; convert to WebP |
| **Balcony Safety Nets** | Translucent Garware virgin HDPE net installed across high-rise balcony perimeter | Clean residential setting, sky visible through mesh | 3/4 balcony perspective with outdoor seating | Eye-level balcony rail with translucent mesh | `16:10` | **Replace:** Current duplicate `safety-net-balcony.jpg` with authentic daylight installation photo |
| **Child Safety Nets** | Child and pet safe on high-rise balcony, tight 50mm wire mesh, warm family setting | Warm, emotional, secure residential feel | Wide view of family on balcony | Close perspective of child sitting safely near rail | `16:10` | **Replace:** Current duplicate with dedicated high-clarity child-safe balcony asset |
| **Pigeon Safety Nets** | High-floor balcony overlooking city, translucent pigeon exclusion net, clean floor | Clean, spotless balcony, humane bird exclusion | Wide view showing zero pigeon droppings | Vertical balcony view with city skyline | `16:10` | **Retain & Optimize:** `pigeon-net.webp` is good; eliminate duplicate `pigeon-net-twilight.jpg` |
| **Sports Nets** | High-rise terrace cricket practice net or turf box enclosure | Dynamic, athletic, high-tension netting | Wide panorama of rooftop sports cage | Ground-to-netting vertical action angle | `16:10` | **Retain:** `sports-nets.webp` is high quality |
| **Cloth Hangers** | 6-pipe stainless steel ceiling pull-down drying rack neatly retracted in utility balcony | Minimalist interior design, smart space utilization | Utility balcony showing retracted rack | Close-up of smooth nylon pulley and steel pipes | `16:10` | **Retain & Optimize:** `cloth-drying-hanger.jpg` is clean; convert to WebP |
| **Bird Spikes** | Polycarbonate base with 304 stainless steel spikes neatly fitted on AC ledge and parapet | Clean exterior ledge, zero rust, sharp focus | Horizontal view of AC outdoor unit protection | Detailed angle shot of spike density on window ledge | `16:10` | **Replace:** Current duplicate asset with dedicated SS304 bird spike photo |
| **Project Gallery** | Real installations in gated communities (My Home Bhooja, Prestige, Aparna, Sea Pearl) | Authentic, unedited customer installation photos | Before & After split views | Square / 4:5 swipeable cards | `4:5` & `16:10` | **Curate:** Gather 12–16 authentic on-site installation photographs |
| **About Page** | Certified installation technician with safety harness, laser measuring tool, and wire certs | Professional craftsmanship, trust, safety rigour | Team standing at luxury project site | Portrait of technician holding SS316 wire sample | `16:10` | **Introduce:** New authentic team/technician imagery |
| **Contact Page** | Customer service desk or doorstep survey technician arriving at luxury apartment | Welcoming, punctual, equipped with laser meter | Split: Form left, luxury building right | Header banner above contact booking form | `16:9` | **Introduce:** Clean architectural survey booking banner |

---

## 11. RECOMMENDED FRONTEND TECHNOLOGIES

1. **Astro v5 (Retain):** Outstanding choice for static content, zero runtime JavaScript overhead for marketing pages, and sub-second TTFB.
2. **React 19 (Retain):** Confined strictly to interactive islands (`VisualizerIsland`, `CostEstimator`, `GalleryFilter`).
3. **Tailwind CSS Integration (Fix):** Formally install `@astrojs/tailwind` or maintain strict custom CSS modules to prevent template class failures.
4. **Three.js & Canvas (Enhance):** Maintain the 3D visualizer island, adding smooth orbit damping and wire-spacing toggle controls.
5. **Modern Image Formats:** Native `<picture>` elements serving WebP and AVIF with explicit `width`, `height`, `loading="lazy"`, and `fetchpriority="high"` on LCP hero elements.

---

## 12. SEO AND PERFORMANCE FINDINGS

### 12.1 SEO Strengths Verified
* **Sitemap Architecture:** `sitemap.xml` and `sitemap-index.xml` exist and are correctly referenced in `robots.txt`.
* **Structured Data:** Robust JSON-LD schemas (`LocalBusiness`, `Organization`, `WebSite`, `BreadcrumbList`, `FAQPage`) are dynamically injected via `SEO.astro`.
* **Canonical URLs:** Strict absolute canonical tags are generated across all routes.
* **Crawler Directives:** `robots.txt` correctly allows indexing while disallowing `/thank-you/` and `/404/`.

### 12.2 SEO & Performance Deficiencies
* **Missing City Landing Pages:** Copy mentions operations in Bengaluru, Chennai, and Kochi, but the site lacks dedicated URLs for these metros. This forfeits substantial local search volume (e.g., *"invisible grills in bangalore"*, *"balcony safety nets chennai"*).
* **Missing Image Alt Text:** Several subpage image tags contain generic alt text (`alt="Image"`) or duplicate descriptions.
* **LCP Optimization:** Hero images on several subpages lack `fetchpriority="high"` and are uncompressed JPEGs over 200 KB.
* **Mobile CLS:** Some dynamic elements in the 3D visualizer lack fixed container aspect ratios, risking layout shift during script execution.

---

## 13. RISKS & REQUIRED BUSINESS CONFIRMATIONS

Before commencing Phase 1, the following business decisions require explicit confirmation from the website owner:

1. **Confirmation on Service Scope:** Confirm whether all 6 categories (Invisible Grills, Balcony Safety Nets, Child Safety Nets, Pigeon Nets, Cloth Drying Hangers, Bird Spikes) should be displayed as top-level services on the homepage.
2. **Confirmation on Regional Coverage:** Confirm whether Invisible Safety has active installation crews in **Bengaluru**, **Chennai**, and **Kochi**, and whether we should build dedicated city landing pages for them.
3. **Confirmation on Warranty Rules:** Confirm warranty terms: Is the 15-year warranty exclusive to SS316 invisible grills, while HDPE safety nets carry a 5-year warranty?
4. **Authentic Project Photography:** Confirm if the business owner can provide 10–15 uncompressed, real-world installation photos from completed projects in Hyderabad, Vizag, and Vijayawada to replace duplicate assets.

---

## 14. COMPLETE PHASE-BY-PHASE IMPLEMENTATION ROADMAP

* **Phase 0 (Completed):** Complete inspection, live site evaluation, reference research, comprehensive report (Strictly Read-Only).
* **Phase 1 (Preparation):** Resolve duplicate image assets, prepare WebP/AVIF files, update data stores (`business.ts`), align city targets.
* **Phase 2 (Design Tokens):** Implement the Warm Ivory + Deep Royal Navy design system in CSS.
* **Phase 3 (Navigation & CTA):** Upgrade Header (dual-bar desktop, clean mobile drawer) and Universal Floating Action Dock (Call, WhatsApp, Free Survey).
* **Phase 4 (Hero Redesign):** Build the strictly stacked mobile hero (zero text over photo) and 50/50 desktop split hero.
* **Phase 5 (Homepage Conversion):** Build the 6-service photo-first grid, high-contrast navy trust strip, and unified 3D Balcony Lab.
* **Phase 6 (Subpages & Regional Hubs):** Launch dedicated landing pages for Bengaluru, Chennai, and Kochi; update sub-service templates.
* **Phase 7 (Verification & Launch):** Core Web Vitals audit, schema verification, accessibility review, and final production deployment upon explicit client approval.

---

## 15. PHASE 1 RECOMMENDATIONS

Upon receiving explicit approval from the website owner, Phase 1 should immediately execute the following non-breaking foundational tasks:

1. **Purge Duplicate Image Mappings:** Remove redundant files (`category-child-safety.jpg`, `pigeon-net-twilight.jpg`, `safety-net-balcony.webp`) and update `src/utils/imageMap.ts` to map unique high-res assets to each service.
2. **Standardize Data Stores:** Update `src/data/business.ts` and `src/data/locations.ts` to formally include Bengaluru, Chennai, and Kochi with accurate regional phone routing and popular high-rise residential areas.
3. **Establish Asset Compression Pipeline:** Generate optimized WebP/AVIF variants for all 36 assets in `public/images/`.
4. **Prepare Subpage Layout Template:** Refactor `src/layouts/SubPageLayout.astro` to ensure consistent hero presentation and breadcrumb navigation across all 24 sub-services.

---

### Verification and Compliance Sign-Off
* **Read-Only Verification:** `git status` confirms working directory is 100% clean with **zero modified project files**.
* **Deployment Check:** Zero files were pushed or deployed to the production server.
* **Review Gate:** All work is paused pending website owner review and explicit instruction to proceed to Phase 1.
