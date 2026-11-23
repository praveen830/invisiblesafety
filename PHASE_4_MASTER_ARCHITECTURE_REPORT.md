# PHASE 4 — SOUTH INDIA LOCATION ARCHITECTURE & DATA MODEL
## MASTER EXECUTIVE SUMMARY & SPECIFICATION PACKAGE (REVISED — PHASE 4.2)

**Project:** Invisible Safety Architectural Home Safety Solutions  
**Domain:** `https://invisiblesafety.in/`  
**Phase:** 4.2 — Granular City + Product Availability Architecture & Validation  
**Role:** Senior Astro Architect, Technical SEO Engineer, Local SEO Strategist & Frontend Developer  
**Status:** Completed & Ready for User Review (Strict Read-Only Specification Phase)  

---

## 1. PHASE 4.2 GRANULAR PRODUCT AVAILABILITY SUMMARY

Phase 4.2 establishes granular, per-product operational and indexing governance across all five South Indian states, ensuring absolute isolation between different service categories:

### 1.1 Granular City-Product Independence (49 Distinct Slots)
- Operational availability is independently configurable for every individual combination of **7 candidate cities $\times$ 7 approved products = 49 slots**.
- **Product Isolation Invariant:** Confirming one product in a city (e.g. Invisible Grills in Vizag) does **NOT** confirm, activate, or imply availability for any other product (e.g. Sports Nets, Cloth-Drying Hangers, or Bird Spikes).
- All 49 slots are initialized strictly to:
  $$\mathbf{operationalAvailability:}\ \text{'pending\_business\_confirmation'}$$
  $$\mathbf{seoIndexingStatus:}\ \text{'unpublished'}$$

### 1.2 Separation of Operational & SEO Status
Two independent fields govern every geographic node and every individual product slot:
- `operationalAvailability`:
  - `confirmed`
  - `pending_business_confirmation`
  - `unavailable`
- `seoIndexingStatus`:
  - `indexable`
  - `noindex`
  - `unpublished`

### 1.3 Regional & State-Wide Campaign Coverage Requirements
- State product campaigns (`/[state]/[product]/`) require verified multi-hub fulfillment capacity across the target state.
- Regional product campaigns (`/south-india/[product]/`) require verified fulfillment capacity across all target operational states.
- If a product is confirmed in only one city, regional and state-level pages for that product remain `unpublished` or `noindex`.

### 1.4 The Six Mandatory Indexing Conditions (Per Product)
A city-product page is generated with `seoIndexingStatus: 'indexable'` only when **all six conditions** are met for that specific product in that specific city:
1. **Confirmed service availability for this exact product.**
2. **Actual ability to serve** (certified technicians and material inventory in stock).
3. **Accurate local information** (verified local dispatch phone/WhatsApp, genuine context).
4. **Unique useful content** (non-templated copy addressing local climate and building bylaws for this product).
5. **Relevant approved images** (Phase 3.8/3.9 approved desktop 16:9 and mobile 4:5 WebP assets).
6. **Correct canonical URL** (lowercase, trailing slash, zero locality segments).

### 1.5 Preserved Core Invariants
- **Five Target States:** Andhra Pradesh (`andhra`), Telangana (`telangana`), Karnataka (`karnataka`), Tamil Nadu (`tamil-nadu`), Kerala (`kerala`).
- **Seven Approved Services:** Invisible Grills, Balcony Safety Nets, Child Safety Nets, Pigeon Safety Nets, Sports Nets, Cloth-Drying Hangers, Bird Spikes.
- **Hierarchy:** Strictly $\text{South India} \longrightarrow \text{State} \longrightarrow \text{City} \longrightarrow \text{Product}$.
- **Zero Local-Area Pages:** Prohibit neighbourhood/locality routes entirely. Localities exist only as in-page descriptive chips (`<span class="locality-chip">`).
- **Redirection Governance:** All legacy redirects remain in `proposed_pending_manual_validation` status without implementation. No homepage dumping.

---

## 2. REVISED SPECIFICATION DOCUMENTS IN PROJECT ROOT

1. [PHASE_4_LOCATION_ARCHITECTURE_AUDIT.md](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/PHASE_4_LOCATION_ARCHITECTURE_AUDIT.md)
   - Granular product availability audit and physical operational reality analysis.
   - Analysis of Google doorway spam risks and per-product indexing gates.

2. [PHASE_4_LOCATION_DATA_MODEL.md](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/PHASE_4_LOCATION_DATA_MODEL.md)
   - Strongly-typed `LocationProductAvailability` contract and `ProductAvailabilityMatrix`.
   - Complete 49-combination initialization with static validators (`validateCityProductIndexing()`, `validateStateProductIndexing()`).

3. [PHASE_4_ROUTE_MAPPING.md](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/PHASE_4_ROUTE_MAPPING.md)
   - Four-level URL taxonomy: Level 1 (Regional), Level 2 (State), Level 3 (City Hub), Level 4 (City + Product).
   - Complete 49-route manifest table showing per-product isolation and `pending_business_confirmation` baseline.
   - Legacy 301 redirection table with status `proposed_pending_manual_validation`.

4. [PHASE_4_IMPLEMENTATION_PLAN.md](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/PHASE_4_IMPLEMENTATION_PLAN.md)
   - Dynamic Astro template blueprint for `src/pages/[state]/[city]/[product].astro` enforcing exact-product confirmation.
   - Five automated quality gates including Granular Product Availability Isolation check.

---

## 3. NEXT STEPS (AWAITING APPROVAL)

Work remains strictly paused. No production code, routes, sitemaps, or redirects have been altered.  
**Awaiting User Approval to Proceed.**
