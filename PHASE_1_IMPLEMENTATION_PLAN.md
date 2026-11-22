# PHASE 1 — IMPLEMENTATION PLAN & ARCHITECTURAL ROADMAP

**Project:** Invisible Safety  
**Official Domain:** https://invisiblesafety.in/  
**Role:** Senior Frontend Architect & Project Delivery Director  
**Status:** Approved Architectural Specification (Non-breaking, No Production Overwrites)

---

## 1. IMPLEMENTATION STRATEGY & ARCHITECTURAL PRINCIPLES

The transformation of Invisible Safety into a **Bright Architectural Luxury** digital flagship is structured into modular, strictly verifiable phases. Each phase can be executed independently, validated against Astro build checks (`npx astro check` and `npm run build`), and audited on both desktop and mobile viewports before any production release.

---

## 2. DETAILED PHASE-BY-PHASE EXECUTION PLAN

### Phase 2: Design Tokens & Asset Architecture
* **Step 2.1 — Implement Design Tokens in `src/styles/global.css`:**
  * Configure CSS custom properties for the approved palette:
    * `--color-primary: #102B46` (Deep Royal Navy)
    * `--color-secondary: #EDE5D9` (Architectural Beige)
    * `--color-bg-ivory: #FAF8F3` (Warm Ivory)
    * `--color-accent-gold: #C6A66B` (Restrained Soft Gold)
    * `--color-text-primary: #202A32` (Slate Charcoal)
    * `--color-whatsapp: #25D366` (Natural WhatsApp Green)
  * Establish fluid font scaling formulas using CSS `clamp()`.
* **Step 2.2 — Asset De-duplication & Image Optimization:**
  * Map unique, verified high-resolution imagery to each of the 7 approved services.
  * Generate WebP and AVIF optimized variants for all assets.
  * Update `src/utils/imageMap.ts` to reference distinct filenames.

---

### Phase 3: Global Header & Universal Floating CTA Dock
* **Step 3.1 — Dual-Bar Sticky Header (`src/components/Header.astro`):**
  * *Desktop:* Deep Royal Navy top utility bar with regional city indicators + sticky white frosted navbar with dropdowns for the 7 Services and Locations.
  * *Mobile:* Slim top bar + sticky header with 48×48px Deep Navy touch target hamburger menu.
  * Build smooth mobile drawer menu with zero horizontal overflow.
* **Step 3.2 — Universal Floating CTA Dock (`src/components/StickyMobileCTA.astro`):**
  * *Mobile (`<768px`):* Frosted bottom dock (`fixed bottom-0 z-[9999]`) with Free Survey, WhatsApp, and Call.
  * *Desktop (`≥768px`):* Elevated floating pill dock (`fixed bottom-6 right-6 z-[9999]`) with full phone number transparency.

---

### Phase 4: Hero Redesign (Eliminating Mobile Text Collision)
* **Step 4.1 — Mobile Strictly Stacked Hero (`src/components/Hero.astro`):**
  * Top container: `aspect-[4/5]` unobstructed balcony photograph with zero text, zero badges, and zero dark scrims.
  * Elevated conversion card: Placed directly below the image (`rounded-3xl bg-[#FAF8F3] -mt-6 p-5 shadow-card`) containing H1, subtitle, 3 horizontal trust badges, and side-by-side call/WhatsApp buttons.
* **Step 4.2 — Desktop 50/50 Split Hero:**
  * Left column: Warm Ivory card with editorial typography, value proposition, and trust icons.
  * Right column: High-resolution daylight balcony visual framed cleanly.
* **Step 4.3 — Performance Optimization:**
  * Set `fetchpriority="high"`, `loading="eager"`, and explicit `width`/`height` attributes to guarantee sub-1.2s LCP.

---

### Phase 5: 7-Service Showcase & Unified Balcony Lab
* **Step 5.1 — 7-Service Photo-First Cards (`src/pages/index.astro`):**
  * Implement clean 2-column mobile / 3-4 column desktop architectural card grid.
  * Top half: `aspect-[16/10]` crisp photo with zero text overlays.
  * Bottom half: Clean white label bar with service icon, bold title, and circular arrow link.
* **Step 5.2 — High-Contrast Deep Navy Trust Strip:**
  * 5 core engineering pillars (SS316 Steel, 15-Year Warranty, Child & Pet Safety, RWA Compliance, Dedicated South India Support).
* **Step 5.3 — Unified 3D Balcony Lab & Cost Estimator:**
  * Frame the Three.js 3D visualizer and live sq.ft. cost estimator in balanced `rounded-3xl` cards on an Architectural Stone (`#F5F0E8`) backdrop.

---

### Phase 6: Subpages & Regional City Expansion
* **Step 6.1 — Refactor 7 Core Service Subpages:**
  * Align `/invisible-grills/`, `/safety-nets/`, `/child-safety-nets/`, `/pigeon-nets/`, `/cloth-drying-hangers/`, `/sports-nets/`, and `/bird-spikes/` with the design system.
* **Step 6.2 — Regional City Landing Pages (`/locations/`):**
  * Standardize existing city pages: Hyderabad, Visakhapatnam, Vijayawada, Amaravati.
  * Launch dedicated landing pages for **Bengaluru**, **Chennai**, and **Kochi** to capture high-volume localized search traffic.

---

### Phase 7: Verification, Core Web Vitals & Production Deployment
* **Step 7.1 — Quality Assurance & Testing:**
  * Run `npx astro check` and verify 0 errors, 0 warnings.
  * Build all 53+ static pages with `npm run build`.
  * Validate WCAG AAA contrast and keyboard accessibility across all viewports.
* **Step 7.2 — Production Release:**
  * Deploy only upon explicit written sign-off from the website owner.

---

## 3. ZERO-RISK PACKAGE & DEPENDENCY STRATEGY

* **No New Packages Required:** The entire design system and experience architecture are designed to run natively within the existing Astro v5 + React 19 stack.
* **Strict Non-Destructive Methodology:** All existing routing structures, canonical tags, phone numbers (`+91 83097 55398`), and WhatsApp enquiry links (`918309755398`) remain 100% preserved.
