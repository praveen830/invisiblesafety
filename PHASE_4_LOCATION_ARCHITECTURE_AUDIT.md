# PHASE 4 — SOUTH INDIA LOCATION ARCHITECTURE & DATA MODEL
## DOCUMENT 1: LOCATION ARCHITECTURE AUDIT (REVISED — PHASE 4.2)

**Project:** Invisible Safety Architectural Home Safety Solutions  
**Domain:** `https://invisiblesafety.in/`  
**Phase:** 4.2 — Granular City + Product Availability Audit & Governance  
**Auditor:** Senior Astro Architect, Technical SEO Engineer & Local SEO Strategist  
**Date:** November 2026  
**Status:** Revised Specification — Pending Business Confirmation  

---

## 1. EXECUTIVE SUMMARY & OBJECTIVES

Invisible Safety requires a scalable, programmatic, and technically rigorous location architecture covering five South Indian states:
1. **Andhra Pradesh**
2. **Telangana**
3. **Karnataka**
4. **Tamil Nadu**
5. **Kerala**

In Phase 4.1, operational capability was decoupled from SEO indexing status at the geographic level. Phase 4.2 extends this governance down to the **individual product level** for every city, state, and regional scope:
- **Granular City-Product Independence:** Operational availability is independently configurable for every single city-product combination. Confirming one product in a city (e.g. Invisible Grills in Vizag) does **NOT** confirm or imply availability for any of the other six products (e.g. Sports Nets, Cloth-Drying Hangers, or Bird Spikes).
- **Regional & State Product Verification:** Regional (`/south-india/[product]/`) and state-wide (`/[state]/[product]/`) product landing pages also require independently verified service coverage.
- **Strict 6-Point Indexing Gate per Product:** An individual city-product landing page is generated as `indexable` only if that exact product is verified as `confirmed` and satisfies all six technical SEO conditions.
- **Preserved Core Invariants:** Enforces the strict 4-level taxonomy ($\text{South India} \rightarrow \text{State} \rightarrow \text{City} \rightarrow \text{Product}$), strictly prohibits neighbourhood/locality URLs, preserves the 7 approved services and 5 target states, and holds all legacy redirects in `proposed_pending_manual_validation` status without implementation.

---

## 2. EXISTING CODEBASE & ROUTE FORENSIC AUDIT

### 2.1 Existing Route Inventory
A scan of `src/pages/` reveals the following existing location-related routes:

| Route Path | File Location | Purpose & Observations |
| :--- | :--- | :--- |
| `/locations/` | `src/pages/locations/index.astro` | Regional hub overview listing 4 legacy cities and 3 metro mentions |
| `/locations/hyderabad/` | `src/pages/locations/hyderabad.astro` | Legacy landing page for Hyderabad & Secunderabad |
| `/locations/visakhapatnam/` | `src/pages/locations/visakhapatnam.astro` | Legacy landing page for Visakhapatnam (Vizag) |
| `/locations/vijayawada/` | `src/pages/locations/vijayawada.astro` | Legacy landing page for Vijayawada |
| `/locations/amaravati/` | `src/pages/locations/amaravati.astro` | Legacy landing page for Amaravati Capital Region |

> [!IMPORTANT]
> **Audit Finding on Legacy Routes:**  
> The presence of these legacy files demonstrates prior marketing intent, but does **not** prove verified on-ground operational capacity for all products. Under Phase 4.2 governance, operational readiness cannot be inferred from legacy files. Every service category in every city must be explicitly confirmed by business management before being classified as operationally ready or indexable.

### 2.2 Missing Granular Product Routes
Under the current legacy `/locations/[city]/` structure:
1. **No Granular City + Product Pages:** A homeowner searching for *"cricket sports nets in Vizag"* or *"ceiling cloth drying hangers in Hyderabad"* is forced onto a generic city page that predominantly highlights invisible grills.
2. **Lumped Service Assumptions:** Legacy templates lump invisible grills, safety nets, and bird control together as if every crew carries identical tooling, materials, and training. In physical operations, sports net rigging (high-tension cable swaging, rooftop truss brackets) requires different specialized rigging equipment than invisible grill track anchoring or bird spike silicone bonding.
3. **No State or Regional Product Authority:** There are no verified routes for state-wide product searches (e.g. `/andhra/invisible-grills/`) or regional queries (e.g. `/south-india/pigeon-safety-nets/`).

---

## 3. STRICT PROHIBITION OF LOCAL-AREA / NEIGHBOURHOOD LEVEL

### 3.1 Google Doorway Risk Analysis
In Google Search Essentials, generating pages for micro-localities (neighbourhoods, postal sectors, colonies, or landmarks) with template-swapped content violates anti-spam guidelines:
> *"Doorways are sites or pages created to rank for very specific, similar search queries. They lead users to intermediate pages that are not as useful as the final destination... Examples include having multiple pages with slight variations that funnel users to one central page."*

If pages such as `/telangana/hyderabad/gachibowli/invisible-grills/` or `/andhra/vizag/mvp-colony/balcony-safety-nets/` were generated, they would share 95%+ identical copy, identical technical specs, and identical contact numbers. This creates doorway spam risk, threatens organic search performance, and wastes crawl budget.

### 3.2 Permanent Structural Invariant
The ONLY permitted hierarchy across the entire domain is:
$$\text{South India} \longrightarrow \text{State} \longrightarrow \text{City} \longrightarrow \text{Product}$$

Under NO circumstances will the hierarchy expand to:
$$\text{South India} \longrightarrow \text{State} \longrightarrow \text{City} \longrightarrow \text{Area} \longrightarrow \text{Product} \quad \text{[STRICTLY FORBIDDEN]}$$

**Treatment of Localities:**
Neighbourhoods and prominent communities (e.g. *Kokapet*, *HITEC City*, *Rushikonda*, *Kanuru*, *Whitefield*) will function exclusively as:
1. In-page visual coverage chips (`<span class="locality-chip">`) on City and City+Product pages.
2. Verified project badges (e.g. *"Installed at Community X, Locality Y"*).
3. Schema.org `areaServed` structured data elements within the City JSON-LD.
4. Local society FAQ responses.  
They will **NEVER** possess an independent URL, route, or static page.

---

## 4. GRANULAR SERVICE AVAILABILITY & PRODUCT ISOLATION GOVERNANCE

### 4.1 The Per-Product Operational Reality
In architectural safety installations, operational capability is fundamentally product-specific:
- **Invisible Grills:** Requires high-tensile wire tensioners, T6 structural aluminium track extrusions, Hilti expansion anchors, and laser alignment tools.
- **Balcony Safety Nets & Child Safety Nets:** Requires nylon border ropes, drop-tested knotted netting rolls, perimeter hook anchors, and tension rigging.
- **Sports & Cricket Practice Nets:** Requires heavy-gauge multi-strand mesh, high-altitude terrace truss rigging, turnbuckles, and safety arrest lines.
- **Cloth-Drying Hangers:** Requires ceiling-mounted dual-bearing nylon pulleys, stainless steel tube arrays, and wall-mounted cleat brackets.
- **Bird Spikes:** Requires surgical-grade SS304 spikes and industrial weatherproof neutral-cure silicone bonding agents.

**Governance Mandate:**  
A local crew may have full equipment and inventory to install Invisible Grills in a city, but zero inventory or certified rigging teams for Sports Practice Nets. Therefore, **confirming one product must NEVER automatically confirm the other six products.**

### 4.2 Decoupled Status at Every Taxonomic Level
Every candidate entity (Region-Product, State-Product, and City-Product) carries two decoupled, independent fields:

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│       operationalAvailability        │     │          seoIndexingStatus           │
├──────────────────────────────────────┤     ├──────────────────────────────────────┤
│ • confirmed                          │     │ • indexable                          │
│ • pending_business_confirmation      │     │ • noindex                            │
│ • unavailable                        │     │ • unpublished                        │
└──────────────────────────────────────┘     └──────────────────────────────────────┘
```

### 4.3 Initial Status for All 49 City-Product Combinations
Under Phase 4.2 governance, all 49 candidate combinations (7 cities $\times$ 7 approved products) are initialized to:
- `operationalAvailability: pending_business_confirmation`
- `seoIndexingStatus: unpublished`

```
                                  CITY + PRODUCT AVAILABILITY MATRIX (INITIAL STATE)
┌──────────────────────┬──────────────────┬──────────────────┬──────────────────┬──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ City Candidate       │ Invisible Grills │ Balcony Nets     │ Child Nets       │ Pigeon Nets      │ Sports Nets      │ Cloth Hangers    │ Bird Spikes      │
├──────────────────────┼──────────────────┼──────────────────┼──────────────────┼──────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Visakhapatnam        │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │
│ Vijayawada           │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │
│ Amaravati            │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │
│ Hyderabad            │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │
│ Bengaluru            │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │
│ Chennai              │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │
│ Kochi                │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │ PENDING / UNPUB  │
└──────────────────────┴──────────────────┴──────────────────┴──────────────────┴──────────────────┴──────────────────┴──────────────────┴──────────────────┘
Legend: PENDING / UNPUB = operationalAvailability: 'pending_business_confirmation' | seoIndexingStatus: 'unpublished'
```

*Note: No city or product is presumed to be operational or automatically indexable.*

### 4.4 The Six Mandatory Indexing Conditions (Per City-Product)
For any specific city-product landing page (e.g. `/andhra/vizag/invisible-grills/`) to receive `seoIndexingStatus: 'indexable'`, it must satisfy **all six conditions**:

```
┌────────────────────────────────────────────────────────────────────────┐
│             THE 6 MANDATORY INDEXING CONDITIONS (PER PRODUCT)          │
│                                                                        │
│  1. Confirmed Service Availability:                                    │
│     Management has formally verified that THIS EXACT PRODUCT is        │
│     actively fulfilled in THIS SPECIFIC CITY.                          │
│                                                                        │
│  2. Actual Ability to Serve the Location:                              │
│     Verified local inventory and technicians certified for this        │
│     specific product category (e.g. sports net rigging certified).     │
│                                                                        │
│  3. Accurate Local Information:                                        │
│     Verified local phone/WhatsApp dispatch, verified local turnaround  │
│     time for this product, and genuine local building context.         │
│                                                                        │
│  4. Unique Useful Content:                                             │
│     Substantial, non-templated copy addressing local climate, building │
│     bylaws, and elevation wind loads for THIS product in THIS city.    │
│                                                                        │
│  5. Relevant Approved Images:                                          │
│     Integration of the Phase 3.8/3.9 approved desktop (16:9) and        │
│     mobile (4:5) WebP hero assets for this exact product category.     │
│                                                                        │
│  6. Correct Canonical URL:                                             │
│     Strict lowercase URL with trailing slash matching the approved     │
│     4-tier taxonomy: /[state]/[city]/[product]/ (zero area slugs).     │
└────────────────────────────────────────────────────────────────────────┘
```

**Rule:** If even a single condition is unmet, or if that exact product is not confirmed, the page MUST remain `unpublished` or `noindex`.

### 4.5 Regional and State Campaign Coverage Requirements
Regional (`/south-india/[product]/`) and state-wide (`/[state]/[product]/`) campaigns must also require independently verified service coverage:
- A state product page (e.g. `/andhra/invisible-grills/`) can only become indexable if management confirms active fulfillment capacity across that state's primary hubs.
- A regional product page (e.g. `/south-india/invisible-grills/`) can only become indexable if active fulfillment capacity is confirmed across all target operational states.
- If a product is only confirmed in one single city, state-wide and regional landing pages for that product remain `unpublished` or `noindex` until multi-hub coverage is verified.

---

## 5. APPROVED SERVICE CATALOGUE AUDIT

The location architecture restricts its service relationships strictly to the **seven approved service categories**:

| # | Service Category | Canonical Product Slug | Primary Material / Engineering Highlight |
| :-: | :--- | :--- | :--- |
| 1 | **Invisible Grills** | `invisible-grills` | Japanese AISI 316 Marine Grade SS, DuPont nylon casing, 400+ kg load |
| 2 | **Balcony Safety Nets** | `balcony-safety-nets` | High-density UV-stabilized virgin polymer, IS-tested knotted netting |
| 3 | **Child Safety Nets** | `child-safety-nets` | 50mm high-tensile containment mesh, edge-reinforced anchored rigging |
| 4 | **Pigeon Safety Nets** | `pigeon-safety-nets` | Translucent 0.7mm UV monofilament, 98% optical skyline clarity |
| 5 | **Sports Nets** | `sports-nets` | Heavy-impact multi-strand braided netting for rooftops and cricket turf |
| 6 | **Cloth-Drying Hangers** | `cloth-drying-hangers` | Ceiling-mounted individual SS pulley rods, space-saving architectural design |
| 7 | **Bird Spikes** | `bird-spikes` | Surgical-grade SS304 spikes on UV polycarbonate base for ledges & AC units |

**Constraint:** No additional service categories will be introduced into the location architecture.

---

## 6. APPROVED HERO ASSET INTEGRATION & MAPPING

All location templates inherit the 14 approved Phase 3.8/3.9 responsive WebP assets:

| Product Category | Desktop Hero Asset (16:9 Landscape) | Mobile Hero Asset (4:5 Vertical) |
| :--- | :--- | :--- |
| **Invisible Grills** | `/images/ai-generated/architectural/invisible-grills/invisible-grill-desktop-hero.webp` | `/images/ai-generated/architectural/invisible-grills/invisible-grill-mobile-hero.webp` |
| **Balcony Safety Nets** | `/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-desktop-hero.webp` | `/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-mobile-hero.webp` |
| **Child Safety Nets** | `/images/ai-generated/safety-nets/child-safety-nets/child-safety-desktop.webp` | `/images/ai-generated/safety-nets/child-safety-nets/child-safety-mobile.webp` |
| **Pigeon Safety Nets** | `/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-desktop-hero.webp` | `/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-mobile-hero.webp` |
| **Sports Nets** | `/images/ai-generated/safety-nets/sports-nets/sports-net-desktop-hero.webp` | `/images/ai-generated/safety-nets/sports-nets/sports-net-mobile-hero.webp` |
| **Cloth-Drying Hangers** | `/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-desktop-hero.webp` | `/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-mobile-hero.webp` |
| **Bird Spikes** | `/images/ai-generated/architectural/bird-spikes/bird-spikes-desktop-hero.webp` | `/images/ai-generated/architectural/bird-spikes/bird-spikes-mobile-hero.webp` |

---

## 7. PROPOSED LEGACY MIGRATION & REDIRECTION GOVERNANCE

### 7.1 Redirect Status
All proposed redirects are classified as:
`proposed_pending_manual_validation`

> [!CAUTION]
> **Strict Redirect Rules:**
> 1. **Do Not Implement Redirects:** No redirects will be implemented during this audit phase.
> 2. **No Homepage Dumping:** Never redirect unrelated or defunct location URLs to the homepage. Each redirect must point strictly to a relevant 1:1 hierarchical equivalent.
> 3. **Manual Validation Prerequisite:** Redirects can only be deployed after target pages are built, verified, and approved.

### 7.2 Proposed Redirection Table
| Legacy Incoming URL | Proposed Target Canonical URL | Status | Redirection Rationale |
| :--- | :--- | :---: | :--- |
| `/locations/` | `/south-india/` | `proposed_pending_manual_validation` | Regional overview migration |
| `/locations/hyderabad/` | `/telangana/hyderabad/` | `proposed_pending_manual_validation` | State-hierarchical restructuring |
| `/locations/visakhapatnam/` | `/andhra/vizag/` | `proposed_pending_manual_validation` | State hierarchy + canonical short slug |
| `/andhra/visakhapatnam/` | `/andhra/vizag/` | `proposed_pending_manual_validation` | Canonical alias preservation |
| `/locations/vijayawada/` | `/andhra/vijayawada/` | `proposed_pending_manual_validation` | State-hierarchical restructuring |
| `/locations/amaravati/` | `/andhra/amaravati/` | `proposed_pending_manual_validation` | State-hierarchical restructuring |

---

## 8. AUDIT CONCLUSION & REVISED READINESS CHECKLIST

| Audit Item | Governance Status | Implementation Directive |
| :--- | :---: | :--- |
| **Location Hierarchy** | ✅ Defined | Strictly $\text{South India} \rightarrow \text{State} \rightarrow \text{City} \rightarrow \text{Product}$ |
| **Local-Area Level Pages** | ✅ Verified Clean | Prohibit neighbourhood routes; keep localities as descriptive chips only |
| **Granular Product Availability** | ✅ Defined | Independently configurable for all 49 city-product combinations |
| **Per-Product Isolation** | ✅ Enforced | Confirming one product does not confirm the other six products |
| **Regional/State Coverage Gate** | ✅ Enforced | Broad campaigns require verified multi-hub fulfillment |
| **Six-Point Indexing Gate** | ✅ Enforced | All 6 conditions must be satisfied per product prior to indexing |
| **Approved Services** | ✅ Verified Clean | Exactly the 7 approved categories |
| **Asset Mapping** | ✅ Verified Clean | Maps to the 14 approved Phase 3.8/3.9 hero WebP assets |
| **Redirect Governance** | ✅ Governed | Marked `proposed_pending_manual_validation`; zero redirects implemented |

*Next Step: Review the granular TypeScript data contracts in `PHASE_4_LOCATION_DATA_MODEL.md`.*
