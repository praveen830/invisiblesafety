# LOCATION CONFIGURATION UPDATE — TELUGU STATES ONLY
**Comprehensive Architecture & Configuration Audit Report**  
**Domain:** [invisiblesafety.in](https://invisiblesafety.in/)  
**Date:** November 23, 2026  
**Status:** COMPLETE & VERIFIED — PENDING USER APPROVAL

---

## Executive Summary

Per business directive, the location architecture of Invisible Safety has been restructured to strictly target the two Telugu states: **Andhra Pradesh** and **Telangana**. All references, data contracts, and navigation elements for **Karnataka**, **Tamil Nadu**, **Kerala**, and regional **South India** have been removed from the location system and production components.

The 3-tier location hierarchy (`State → City → Product`) is preserved with strict availability safeguards: all 28 candidate city-product combinations default to `pending_business_confirmation` and `unpublished`. Zero location landing routes are generated in `src/pages/` without business approval.

---

## 1. Summary of Modified Files

| Category | File Path | Scope of Modifications |
| :--- | :--- | :--- |
| **Geo Types** | [`src/data/geo/types.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/data/geo/types.ts) | Narrowed `StateSlug` to `'andhra' \| 'telangana'`. Updated `HierarchyLevel` and `CampaignScope` to 3 tiers (`state`, `city`, `city-product`). |
| **Geo States** | [`src/data/geo/states.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/data/geo/states.ts) | Removed Karnataka, Tamil Nadu, Kerala, and `regionalSouthIndia`. Retained strictly Andhra Pradesh and Telangana. |
| **Geo Cities** | [`src/data/geo/cities.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/data/geo/cities.ts) | Removed Bengaluru, Chennai, Kochi. Retained strictly existing Andhra cities (`vizag`, `vijayawada`, `amaravati`) and Telangana (`hyderabad`). |
| **Geo Helpers** | [`src/data/geo/helpers.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/data/geo/helpers.ts) | Updated `APPROVED_STATE_SLUGS` and `APPROVED_CITY_SLUGS_BY_STATE`. Updated `buildCanonicalUrl` to 3-tier taxonomy. Enforced explicit rejection of `/south-india/` and non-Telugu states in `isValidHierarchyUrl()`. |
| **Campaigns** | [`src/data/geo/campaigns.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/data/geo/campaigns.ts) | Removed South India regional campaign scope. Normalized breadcrumbs to 3 tiers: `Home → State → City → Product`. |
| **Validator** | [`src/data/geo/validator.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/data/geo/validator.ts) | Removed regional indexing functions. Updated state coverage validator and static path generator to operate across Telugu cities only. |
| **Layout** | [`src/layouts/GeoLandingLayout.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/layouts/GeoLandingLayout.astro) | Removed `regionalSouthIndia` imports and fallback titles. Cleaned schema breadcrumbs to exclude South India. |
| **Related Locations** | [`src/components/geo/GeoRelatedLocations.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/geo/GeoRelatedLocations.astro) | Replaced South India regional block with 3-tier Telugu navigation: Approved States, State Service Hubs, and All Telugu Service Hubs. |
| **Templates** | [`src/components/geo/templates/RegionalLandingTemplate.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/geo/templates/RegionalLandingTemplate.astro) | Scoped to state fallback / marked obsolete; updated copy to reflect Andhra & Telangana. |
| **Templates** | [`src/components/geo/templates/StateLandingTemplate.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/geo/templates/StateLandingTemplate.astro) | Updated state validation error message and docstring to reflect 2 approved states. |
| **Templates** | [`src/components/geo/templates/CityLandingTemplate.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/geo/templates/CityLandingTemplate.astro) | Replaced Karnataka example with Vijayawada. |
| **Templates** | [`src/components/geo/templates/CityProductLandingTemplate.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/geo/templates/CityProductLandingTemplate.astro) | Replaced Bengaluru example with Hyderabad. |
| **Navigation** | [`src/components/Header.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/Header.astro) | Pruned `serviceCities` to Hyderabad, Vizag, Vijayawada, Amaravati. Updated title to `TELANGANA & ANDHRA PRADESH SERVICE HUBS`. |
| **Footer** | [`src/components/Footer.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/Footer.astro) | Removed Bengaluru Tech Corridor and Chennai/Kochi Corridor links. Updated brand description to Telangana & Andhra Pradesh. |
| **Location Links** | [`src/components/LocationLinks.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/LocationLinks.astro) | Removed non-Telugu `metroExpansions` card and Bengaluru/Chennai/Kochi references. |
| **Homepage** | [`src/pages/index.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/pages/index.astro) | Pruned `metroCities` to 4 Telugu cities. Updated section title to `TELANGANA & ANDHRA PRADESH METRO HUBS`. Updated regional copy. |
| **Hero** | [`src/components/Hero.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/components/Hero.astro) | Updated eyebrow badge and assurance copy to Telangana & Andhra Pradesh focus. |
| **Business Data** | [`src/data/business.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/data/business.ts) | Updated subtitle to specify Telangana and Andhra Pradesh. |
| **Locations Page** | [`src/pages/locations/index.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/pages/locations/index.astro) | Updated headline to `Across Telangana & Andhra Pradesh`. |
| **Invisible Grills** | [`src/pages/invisible-grills.astro`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/src/pages/invisible-grills.astro) | Updated description meta tag to specify Telangana and Andhra Pradesh. |
| **Unit Tests** | [`tests/geo-data-foundation.test.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/tests/geo-data-foundation.test.ts) | Updated to test 2 approved states, 28 city-product matrix slots, rejection of `/south-india/` and non-Telugu states. |
| **Unit Tests** | [`tests/geo-templates.test.ts`](file:///c:/Users/surya/OneDrive/Desktop/bhuvi%20safety%20nets%20project/invisiblesafety-master/tests/geo-templates.test.ts) | Updated breadcrumb assertions to 3-tier hierarchy and canonical URL tests. |

---

## 2. Final Target Location Matrix

### A. Approved States (2)
1. **Andhra Pradesh** (`andhra`) — Capital: Amaravati
2. **Telangana** (`telangana`) — Capital: Hyderabad

### B. Approved Candidate Cities (4)
| City Name | Slug | State | Status | Phone |
| :--- | :--- | :--- | :--- | :--- |
| **Visakhapatnam (Vizag)** | `vizag` (alias: `visakhapatnam`) | Andhra Pradesh (`andhra`) | `pending_business_confirmation` / `unpublished` | +91 83097 55398 |
| **Vijayawada** | `vijayawada` | Andhra Pradesh (`andhra`) | `pending_business_confirmation` / `unpublished` | +91 83097 55398 |
| **Amaravati** | `amaravati` | Andhra Pradesh (`andhra`) | `pending_business_confirmation` / `unpublished` | +91 83097 55398 |
| **Hyderabad & Secunderabad** | `hyderabad` (alias: `secunderabad`) | Telangana (`telangana`) | `pending_business_confirmation` / `unpublished` | +91 83097 55398 |

*Note: Existing Andhra Pradesh city records were preserved exactly as present in the codebase. Zero synthetic cities were invented.*

### C. Approved Products (7)
1. `invisible-grills` — Invisible Grills
2. `balcony-safety-nets` — Balcony Safety Nets
3. `child-safety-nets` — Child Safety Nets
4. `pigeon-safety-nets` — Pigeon Safety Nets
5. `sports-nets` — Sports Nets
6. `cloth-drying-hangers` — Ceiling Cloth Drying Hangers
7. `bird-spikes` — Stainless Steel Bird Spikes

### D. City-Product Matrix Size
$$\text{4 Candidate Cities} \times \text{7 Approved Products} = \mathbf{28\text{ Candidate Combinations}}$$
- **Operational Availability:** 28 / 28 default to `pending_business_confirmation`
- **SEO Indexing Status:** 28 / 28 default to `unpublished`
- **Astro Static Paths Exported:** `getConfirmedCityProductPaths()` returns `[]` (empty array)

---

## 3. Confirmation of Removed Locations & Scopes

The following entities have been completely purged from location data, state configs, navigation menus, selectors, campaign resolvers, internal links, and SEO metadata:

| Entity Type | Removed Slugs / Names | Verification Check |
| :--- | :--- | :--- |
| **States** | Karnataka (`karnataka`), Tamil Nadu (`tamil-nadu`), Kerala (`kerala`) | `states[slug]` evaluates to `undefined`. `APPROVED_STATE_SLUGS` contains only `andhra` and `telangana`. |
| **Cities** | Bengaluru (`bengaluru`, `bangalore`), Chennai (`chennai`, `madras`), Kochi (`kochi`, `cochin`) | `cities[slug]` evaluates to `undefined`. Purged from `Header.astro`, `Footer.astro`, `index.astro`, `LocationLinks.astro`. |
| **Regional Scope** | South India (`south-india`, `regionalSouthIndia`) | Removed from `types.ts`, `states.ts`, `campaigns.ts`, `validator.ts`, `GeoLandingLayout.astro`. |

---

## 4. Hierarchy & URL Validation

The strict 3-tier hierarchy is enforced:
$$\text{State} \longrightarrow \text{City} \longrightarrow \text{Product}$$

### Valid Route Patterns:
- `/[state]/` (e.g. `/andhra/`, `/telangana/`)
- `/[state]/[product]/` (e.g. `/andhra/invisible-grills/`)
- `/[state]/[city]/` (e.g. `/andhra/vizag/`, `/telangana/hyderabad/`)
- `/[state]/[city]/[product]/` (e.g. `/telangana/hyderabad/invisible-grills/`, `/andhra/vizag/child-safety-nets/`)

### Strict Rejections Enforced by `isValidHierarchyUrl()`:
| Test Input | Validation Result | Error Reason |
| :--- | :--- | :--- |
| `/south-india/` | **REJECTED** | Regional South India URLs are no longer supported. |
| `/south-india/invisible-grills/` | **REJECTED** | Regional South India URLs are no longer supported. |
| `/karnataka/` | **REJECTED** | Invalid state slug 'karnataka'. Must be one of the 2 approved states. |
| `/tamil-nadu/chennai/` | **REJECTED** | Invalid state slug 'tamil-nadu'. |
| `/kerala/kochi/sports-nets/` | **REJECTED** | Invalid state slug 'kerala'. |
| `/andhra/hyderabad/` | **REJECTED** | City 'hyderabad' does not belong to state 'andhra'. |
| `/telangana/vizag/` | **REJECTED** | City 'vizag' does not belong to state 'telangana'. |
| `/andhra/vizag/beach-road/` | **REJECTED** | Segment 2 'beach-road' is an unapproved locality (localities forbidden). |
| `/andhra/vizag/mvp-colony/invisible-grills/` | **REJECTED** | Depth of 4 segments violates 3-tier taxonomy. |

---

## 5. Confirmation of Zero Unapproved Location Page Generation

- **Dynamic Route Generation:** Checked `src/pages/`. Zero dynamic location pages (`[state]/...`) exist in `src/pages/`.
- **Static Paths Generator:** `getConfirmedCityProductPaths()` strictly evaluates the 6 mandatory indexing conditions. Because all 28 slots default to `pending_business_confirmation`, it returns `[]`.
- **Production Build:** `npm run build` compiled exactly 53 static pages in 26.33 seconds (identical to baseline static pages; zero unapproved location pages).
- **Type Checking:** `npx astro check` evaluated 101 files with **0 errors, 0 warnings**.
- **Unit Test Suite:** `npm test` executed 30 unit tests across `tests/geo-data-foundation.test.ts` and `tests/geo-templates.test.ts` with **30 passed, 0 failed**.

---

## 6. Verification Status

```
[PASS] 2 Approved States Configured (Andhra Pradesh, Telangana)
[PASS] 4 Candidate Cities Configured (Visakhapatnam, Vijayawada, Amaravati, Hyderabad)
[PASS] 7 Approved Products Configured
[PASS] 28 Candidate City-Product Slots Initialized to 'pending_business_confirmation' and 'unpublished'
[PASS] 3 Non-Telugu States Purged (Karnataka, Tamil Nadu, Kerala)
[PASS] 3 Non-Telugu Cities Purged (Bengaluru, Chennai, Kochi)
[PASS] South India Regional Scope Purged
[PASS] Navigation & UI Menus Updated (Header, Footer, Homepage, LocationLinks)
[PASS] All 30 Unit Tests Passing
[PASS] Astro Typecheck: 0 Errors, 0 Warnings (101 files)
[PASS] Astro Static Build: 53 Pages Built Cleanly
[PASS] Zero Unapproved Location Pages Emitted in src/pages/
```

> [!IMPORTANT]
> **Awaiting User Approval:**  
> Per instructions, no code has been committed, pushed, or deployed. Development server is running cleanly on `http://localhost:4321/`. Awaiting user review and authorization before proceeding with any subsequent phases.
