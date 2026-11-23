# PHASE 4 — SOUTH INDIA LOCATION ARCHITECTURE & DATA MODEL
## DOCUMENT 4: STEP-BY-STEP IMPLEMENTATION PLAN & ENGINEERING ROADMAP (REVISED — PHASE 4.2)

**Project:** Invisible Safety Architectural Home Safety Solutions  
**Domain:** `https://invisiblesafety.in/`  
**Phase:** 4.2 — Granular Product Implementation Plan & Execution Roadmap  
**Architect:** Senior Astro Architect & Full-Stack Implementation Lead  
**Date:** November 2026  
**Status:** Revised Specification — Pending Business Confirmation Before Execution  

---

## 1. IMPLEMENTATION PHILOSOPHY & QUALITY GATES

This implementation plan outlines the exact sequence to deploy the four-level South India location architecture without:
1. Breaking existing production builds or deployments.
2. Dropping current search engine rankings or creating 404 dead-ends.
3. Automatically indexing unverified city-product combinations or thin doorway pages.
4. Allowing confirmation of one product category to falsely activate or index other product categories.
5. Violating Google's Spam & Helpful Content guidelines regarding doorway pages.

### Phased Execution Sequence
```
Phase 4.1: Data Architecture Foundation (src/data/geo/)
     │     • Granular LocationProductAvailability contract
     │     • Independent 49-combination city-product matrix
     │     • Initial state: pending_business_confirmation / unpublished
     ▼
Phase 4.2: Dynamic Astro Route Templates (Astro getStaticPaths)
     │     • Exact-product confirmation enforcement
     │     • 6-point indexing condition enforcement per product
     │     • Zero neighbourhood routes
     ▼
Phase 4.3: Campaign & Conversion CTA Integration (4 Scopes)
     │     • Regional & state-wide campaigns require verified coverage
     ▼
Phase 4.4: Technical SEO, Breadcrumbs & Dynamic Sitemap Integration
     │
     ▼
Phase 4.5: Internal Link Refactor & Manual Redirect Validation
     │     • All redirects: proposed_pending_manual_validation
     │     • Zero redirects implemented; no homepage dumping
     ▼
Phase 4.6: Multi-Device Visual QA & Production Verification
```

---

## 2. PHASE 4.1: DATA ARCHITECTURE FOUNDATION

### 2.1 File Structure Creation
Create a clean, centralized geographic data layer under `src/data/geo/`:
```
src/data/geo/
├── types.ts          # TypeScript interfaces (LocationProductAvailability, ProductAvailabilityMatrix)
├── helpers.ts        # createDefaultProductAvailabilityMatrix() helper
├── states.ts         # The 5 approved South Indian states with per-product availability
├── cities.ts         # Candidate cities with independent 7-product availability matrices
├── products.ts       # The 7 approved services bound to Phase 3.8/3.9 verified WebP hero assets
├── campaigns.ts      # Campaign resolution engine & tracking IDs
├── redirects.ts      # Legacy redirects (proposed_pending_manual_validation)
└── validator.ts      # validateCityProductIndexing() & static path generator
```

### 2.2 Operational Verification Gate (Granular Product Isolation)
- **Zero Cross-Product Invalidation:** Confirming one product in a city (e.g. Invisible Grills in Vizag) leaves the other six products strictly in their configured state (`pending_business_confirmation` or `unavailable`).
- **Initial Baseline:** All 49 candidate combinations across the 7 cities are initialized with:
  - `operationalAvailability: 'pending_business_confirmation'`
  - `seoIndexingStatus: 'unpublished'`
- **Indexable Transition:** An individual city-product page transitions to `seoIndexingStatus: 'indexable'` only when **all six conditions** are satisfied for that exact product in that exact city:
  1. Confirmed service availability for this exact product.
  2. Actual ability to serve (certified crew & raw material inventory).
  3. Accurate local information.
  4. Unique useful content.
  5. Relevant approved images.
  6. Correct canonical URL.

---

## 3. PHASE 4.2: DYNAMIC ASTRO ROUTE TEMPLATES

Rather than writing over 60 individual `.astro` files, Astro's `getStaticPaths()` pattern will be implemented across 6 clean, maintainable dynamic route templates:

```
src/pages/
├── south-india/
│   ├── index.astro                  # Level 1 Regional Hub (/south-india/)
│   └── [product].astro              # Level 1 Regional Product Hub (/south-india/[product]/)
├── [state]/
│   ├── index.astro                  # Level 2 State Hub (/[state]/)
│   ├── [product].astro              # Level 2 State Product Hub (/[state]/[product]/)
│   └── [city]/
│       ├── index.astro              # Level 3 City Hub (/[state]/[city]/)
│       └── [product].astro          # Level 4 City + Product Page (/[state]/[city]/[product]/)
```

### 3.1 Dynamic Template Implementation Blueprint: `src/pages/[state]/[city]/[product].astro`
```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import CostEstimator from '../../../components/react/CostEstimator';
import TrustSection from '../../../components/TrustSection.astro';
import { getConfirmedCityProductPaths, validateCityProductIndexing } from '../../../data/geo/validator';
import { getBreadcrumbSchema, getServiceSchema, getProductSchema, getFAQSchema } from '../../../utils/seo';
import { ShieldCheck, Award, Wrench, CheckCircle2, Phone, MessageCircle, ArrowRight, MapPin } from 'lucide-react';

export async function getStaticPaths() {
  // Strictly returns only paths where THIS EXACT PRODUCT is confirmed and indexable
  return getConfirmedCityProductPaths();
}

const { state, city, product } = Astro.props;

// Canonical URL & Hierarchy
const canonicalUrl = `/${state.slug}/${city.slug}/${product.slug}/`;

// Dynamic Breadcrumbs
const breadcrumbs = getBreadcrumbSchema([
  { name: "Home", url: "https://invisiblesafety.in/" },
  { name: "South India", url: "https://invisiblesafety.in/south-india/" },
  { name: state.name, url: `https://invisiblesafety.in/${state.slug}/` },
  { name: city.name, url: `https://invisiblesafety.in/${state.slug}/${city.slug}/` },
  { name: product.name, url: `https://invisiblesafety.in${canonicalUrl}` }
]);

// Dynamic SEO Schemas
const serviceSchema = getServiceSchema(`${product.name} in ${city.name}`, `${product.shortTitle} for residences in ${city.name}.`);
const productSchema = getProductSchema(`${product.name} - ${city.name}`, product.heroAssets.altText, product.heroAssets.desktopWebp);
const faqSchema = getFAQSchema(product.defaultFaqs);

// Page Headings
const pageTitle = `${product.name} in ${city.name} | ${product.materialGrade} | Invisible Safety`;
const metaDesc = `Premier ${product.name.toLowerCase()} in ${city.name}. ${product.shortTitle} engineered for ${city.localContext.tagline.toLowerCase()}.`;
---

<BaseLayout
  title={pageTitle}
  description={metaDesc}
  canonicalUrl={canonicalUrl}
  schema={[breadcrumbs, serviceSchema, productSchema, faqSchema]}
>
  <!-- Architectural Hero Section (Bright Luxury Aesthetic) -->
  <section class="section-spacing hero-gradient" style="border-bottom: 1px solid var(--color-border);">
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="hero-badge">
          <MapPin size={14} />
          <span>{city.name.toUpperCase()} • {product.categoryTag}</span>
        </div>
        <h1 class="hero-title">
          {product.name} <br />
          <span class="text-accent">in {city.name}</span>
        </h1>
        <p class="hero-subtitle">
          {product.shortTitle} engineered for {city.localContext.description}
        </p>

        <!-- Conversion CTAs -->
        <div class="cta-group">
          <a href="#estimator" class="btn btn-primary">
            <span>Calculate {city.name.split(' ')[0]} Balcony Quote</span>
            <ArrowRight size={16} />
          </a>
          {city.whatsapp && (
            <a
              href={`https://wa.me/${city.whatsapp}?text=Hi%20Invisible%20Safety%2C%20I%20am%20in%20${encodeURIComponent(city.name)}%20and%20need%20a%20doorstep%20survey%20for%20${encodeURIComponent(product.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-whatsapp"
            >
              <MessageCircle size={17} />
              <span>Book Free Doorstep Survey</span>
            </a>
          )}
        </div>
      </div>

      <!-- Phase 3.8/3.9 Responsive Hero Picture Element -->
      <div class="hero-visual">
        <picture>
          <source media="(max-width: 767px)" srcset={product.heroAssets.mobileWebp} type="image/webp" />
          <source media="(min-width: 768px)" srcset={product.heroAssets.desktopWebp} type="image/webp" />
          <img
            src={product.heroAssets.desktopWebp}
            alt={product.heroAssets.altText}
            width={product.heroAssets.widthDesktop}
            height={product.heroAssets.heightDesktop}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            class="hero-img"
          />
        </picture>
      </div>
    </div>
  </section>

  <!-- Localized Engineering Standards & Climate Notes -->
  <section class="section-spacing bg-warm" style="border-bottom: 1px solid var(--color-border);">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">{city.name.toUpperCase()} CLIMATE &amp; BUILDING COMPLIANCE</span>
        <h2>Engineered for Local Balcony Conditions</h2>
        <p>Calibrated specifically for {state.regionalContext.climateOverview}</p>
      </div>

      <!-- Descriptive Locality Chips (In-Page ONLY, No Locality URLs) -->
      <div class="card p-6" style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: 16px;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #0F233D; margin-bottom: 1rem;">
          Prominent {city.name.split(' ')[0]} High-Rise Communities Served:
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          {city.coverageLocalities.map((loc: any) => (
            <span class="locality-chip">{loc.name}</span>
          ))}
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Doorstep Estimator -->
  <section class="section-spacing bg-white" id="estimator" style="border-bottom: 1px solid var(--color-border);">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">INSTANT PRICING</span>
        <h2>Calculate Your {city.name.split(' ')[0]} Installation Cost</h2>
      </div>
      <CostEstimator client:load />
    </div>
  </section>

  <TrustSection />
</BaseLayout>
```

---

## 4. PHASE 4.3: CAMPAIGN & CONVERSION CTA INTEGRATION

To satisfy campaign requirements (Google Ads, Meta Ads, and Local Campaigns) across the four approved campaign scopes:
1. **Regional Campaigns:** `/south-india/` and `/south-india/[product]/` (Requires multi-state verified coverage).
2. **State Campaigns:** `/[state]/` and `/[state]/[product]/` (Requires multi-hub verified coverage within that state).
3. **City Campaigns:** `/[state]/[city]/` (Requires verified city operational hub).
4. **City + Product Campaigns:** `/[state]/[city]/[product]/` (Requires verified capacity for that exact product).

### Features:
- Unique `campaignId` for conversion event tracking (e.g. `cmp-ap-vzg-invgrill-2026`).
- Pre-filled WhatsApp inquiry strings specifying the exact product and city.
- Turnaround time messaging displayed only where verified by management for that specific product category.

---

## 5. PHASE 4.4: SEO, CANONICAL & SITEMAP INTEGRATION

### 5.1 Dynamic Canonical Tag Enforcement
In `BaseLayout.astro`, canonical URLs strictly enforce the lowercase hierarchical pattern with trailing slash:
$$\text{href}=\text{"https://invisiblesafety.in" + canonicalUrl}$$

### 5.2 Dynamic Sitemap Generation
- Only pages meeting `seoIndexingStatus === 'indexable'` for their specific product slot will be included in the sitemap.
- Pages in `unpublished` or `noindex` status are strictly omitted from `sitemap.xml`.

---

## 6. PHASE 4.5: INTERNAL LINKING & LEGACY REDIRECTIONS

### 6.1 Redirection Governance
> [!CAUTION]
> **Strict Redirect Policy:**
> - Status of all proposed redirects: `proposed_pending_manual_validation`.
> - **Do Not Implement Redirects** during this planning phase.
> - **Never Redirect to Homepage:** Unrelated location URLs must never be redirected to the homepage. Each redirect must strictly point to a relevant 1:1 hierarchical target upon manual business validation.

### 6.2 Proposed Redirect Manifest
```
/locations/                       /south-india/                   # proposed_pending_manual_validation
/locations/hyderabad/             /telangana/hyderabad/           # proposed_pending_manual_validation
/locations/visakhapatnam/         /andhra/vizag/                  # proposed_pending_manual_validation
/andhra/visakhapatnam/            /andhra/vizag/                  # proposed_pending_manual_validation
/locations/vijayawada/            /andhra/vijayawada/             # proposed_pending_manual_validation
/locations/amaravati/             /andhra/amaravati/              # proposed_pending_manual_validation
/karnataka/bangalore/             /karnataka/bengaluru/           # proposed_pending_manual_validation
/tamil-nadu/madras/               /tamil-nadu/chennai/            # proposed_pending_manual_validation
/kerala/cochin/                   /kerala/kochi/                  # proposed_pending_manual_validation
```

---

## 7. PHASE 4.6: QUALITY ASSURANCE & VERIFICATION PROTOCOL

```
┌─────────────────────────────────────────────────────────────┐
│                      QUALITY GATE 1:                        │
│                  TypeScript Type Checking                   │
│   Command: npx astro check                                  │
│   Criteria: 0 errors across all geo modules                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      QUALITY GATE 2:                        │
│            Granular Product Availability Isolation          │
│   Criteria: Verify confirming one product does not emit     │
│             indexable pages for other 6 unconfirmed products│
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      QUALITY GATE 3:                        │
│               Six-Point Indexing Gate Check                 │
│   Criteria: Zero pages with pending_business_confirmation   │
│             are emitted with indexable robots tags          │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      QUALITY GATE 4:                        │
│               No Local-Area Route Inspection                │
│   Command: Audit generated dist/ folders                    │
│   Criteria: Strictly 0 locality/neighbourhood HTML files   │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      QUALITY GATE 5:                        │
│                  Responsive Asset Audit                     │
│   Criteria: 100% of generated pages load approved           │
│             Phase 3.8/3.9 WebP hero assets                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. SUMMARY: PHASE 4.2 EXECUTION READINESS

| Task Component | Scope | Governance Status |
| :--- | :--- | :--- |
| **Data Layer** | `src/data/geo/` | Granular `LocationProductAvailability` contract |
| **49 City-Product Slots** | 7 cities $\times$ 7 products | All initialized to `pending_business_confirmation` / `unpublished` |
| **Product Isolation** | Per-product independence | Zero cross-product leakage |
| **Regional/State Gate** | Broad campaigns | Requires verified multi-hub fulfillment |
| **Area Routes** | Neighbourhood level | Strictly 0 area URLs; in-page chips only |
| **Legacy Redirects** | Legacy `/locations/*` | `proposed_pending_manual_validation` (none implemented) |

---

> [!IMPORTANT]
> **COMPLETION STATUS: PHASE 4.2 REVISED SPECIFICATION COMPLETE**  
> All requested Phase 4.2 product-availability controls have been applied across all documents.  
> No production source code, routes, sitemaps, or redirects were modified.  
> **Awaiting User Approval.**
