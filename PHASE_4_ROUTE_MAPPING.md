# PHASE 4 — SOUTH INDIA LOCATION ARCHITECTURE & DATA MODEL
## DOCUMENT 3: ROUTE MAPPING & URL TAXONOMY SPECIFICATION (REVISED — PHASE 4.2)

**Project:** Invisible Safety Architectural Home Safety Solutions  
**Domain:** `https://invisiblesafety.in/`  
**Phase:** 4.2 — Granular City + Product Route Mapping & Availability Matrix  
**Strategist:** Technical SEO Specialist & Local Search Architect  
**Date:** November 2026  
**Status:** Revised Specification — Pending Business Confirmation  

---

## 1. THE FOUR-LEVEL URL TAXONOMY

Invisible Safety's geographic routing adheres strictly to a four-level hierarchical taxonomy. Every URL is lowercase, hyphen-separated, and enforces a trailing slash:

$$\begin{array}{c}
\mathbf{Level\ 1:\ Regional\ (South\ India)} \\
\Downarrow \\
\mathbf{Level\ 2:\ State\ Level} \\
\Downarrow \\
\mathbf{Level\ 3:\ City\ Hub\ Level} \\
\Downarrow \\
\mathbf{Level\ 4:\ City\ +\ Product\ Level}
\end{array}$$

### 1.1 Structural Invariant: Absolute Prohibition of Local-Area URLs
The URL path must **NEVER** contain five segments or insert neighbourhood/locality slugs.

| Permitted URL Pattern | Example | Status |
| :--- | :--- | :---: |
| `/[state]/[city]/[product]/` | `/andhra/vizag/invisible-grills/` | **APPROVED ARCHITECTURE** |
| `/[state]/[city]/[product]/` | `/telangana/hyderabad/balcony-safety-nets/` | **APPROVED ARCHITECTURE** |
| `/[state]/[city]/[area]/[product]/` | `/telangana/hyderabad/gachibowli/invisible-grills/` | ❌ **FORBIDDEN (404)** |
| `/[state]/[city]/[area]/` | `/andhra/vizag/mvp-colony/` | ❌ **FORBIDDEN (404)** |
| `/[city]/[area]/` | `/hyderabad/kondapur/` | ❌ **FORBIDDEN (404)** |

---

## 2. CANONICAL SLUG REGISTRY

### 2.1 State Slugs (5 Target States)
| State Name | Canonical Slug | Operational Availability | SEO Indexing Status |
| :--- | :--- | :---: | :---: |
| **Andhra Pradesh** | `andhra` | `pending_business_confirmation` | `unpublished` |
| **Telangana** | `telangana` | `pending_business_confirmation` | `unpublished` |
| **Karnataka** | `karnataka` | `pending_business_confirmation` | `unpublished` |
| **Tamil Nadu** | `tamil-nadu` | `pending_business_confirmation` | `unpublished` |
| **Kerala** | `kerala` | `pending_business_confirmation` | `unpublished` |

*Note: In accordance with approved conventions, Andhra Pradesh uses the concise, high-volume slug `andhra` (e.g. `/andhra/`).*

### 2.2 Candidate City Slugs & Canonical Aliases
| City Name | Canonical Slug | State Slug | Operational Availability | SEO Indexing Status | Proposed Alias Handling |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Visakhapatnam** | `vizag` | `andhra` | `pending_business_confirmation` | `unpublished` | `/andhra/visakhapatnam/` $\rightarrow$ `/andhra/vizag/` (`proposed_pending_manual_validation`) |
| **Vijayawada** | `vijayawada` | `andhra` | `pending_business_confirmation` | `unpublished` | Canonical |
| **Amaravati** | `amaravati` | `andhra` | `pending_business_confirmation` | `unpublished` | Canonical |
| **Hyderabad** | `hyderabad` | `telangana` | `pending_business_confirmation` | `unpublished` | Canonical |
| **Bengaluru** | `bengaluru` | `karnataka` | `pending_business_confirmation` | `unpublished` | `/karnataka/bangalore/` $\rightarrow$ `/karnataka/bengaluru/` (`proposed_pending_manual_validation`) |
| **Chennai** | `chennai` | `tamil-nadu` | `pending_business_confirmation` | `unpublished` | `/tamil-nadu/madras/` $\rightarrow$ `/tamil-nadu/chennai/` (`proposed_pending_manual_validation`) |
| **Kochi** | `kochi` | `kerala` | `pending_business_confirmation` | `unpublished` | `/kerala/cochin/` $\rightarrow$ `/kerala/kochi/` (`proposed_pending_manual_validation`) |

*Note: Operational availability for every city is strictly set to `pending_business_confirmation`. No city is classified as an active or expansion hub.*

### 2.3 Approved Product Slugs (Exactly 7 Categories)
| Product Name | Canonical Product Slug | Material Grade |
| :--- | :--- | :--- |
| **Invisible Grills** | `invisible-grills` | Japanese AISI 316 Marine Grade SS |
| **Balcony Safety Nets** | `balcony-safety-nets` | UV-Stabilized Virgin HDPE Polymer |
| **Child Safety Nets** | `child-safety-nets` | Double-Knotted High-Tenacity Braided Mesh |
| **Pigeon Safety Nets** | `pigeon-safety-nets` | 0.7mm Translucent UV Monofilament |
| **Sports Nets** | `sports-nets` | Cricket-Ball-Tested Braided Multi-Ply Poly |
| **Cloth-Drying Hangers** | `cloth-drying-hangers` | 100% Stainless Steel Ceiling Pulley Rods |
| **Bird Spikes** | `bird-spikes` | Surgical SS304 Spikes on Polycarbonate Base |

---

## 3. MASTER ROUTE MANIFEST MATRIX

### 3.1 Level 1: Regional Routes (South India Scope)
Regional product campaigns require independently verified multi-state service coverage before indexing:

| URL Path | Target Level | Primary Content Scope | Operational Availability | Initial SEO Indexing Status |
| :--- | :--- | :--- | :---: | :---: |
| `/south-india/` | Region Overview | 5-State regional architecture footprint | `pending_business_confirmation` | `unpublished` |
| `/south-india/invisible-grills/` | Region + Product | High-rise coastal & metro invisible grills | `pending_business_confirmation` | `unpublished` |
| `/south-india/balcony-safety-nets/` | Region + Product | High-altitude fall containment regional scope | `pending_business_confirmation` | `unpublished` |
| `/south-india/child-safety-nets/` | Region + Product | Child & toddler high-rise safety certification | `pending_business_confirmation` | `unpublished` |
| `/south-india/pigeon-safety-nets/` | Region + Product | Skyline-clarity bird exclusion regional scope | `pending_business_confirmation` | `unpublished` |
| `/south-india/sports-nets/` | Region + Product | Rooftop cricket & sports turf containment arrays | `pending_business_confirmation` | `unpublished` |
| `/south-india/cloth-drying-hangers/` | Region + Product | Luxury ceiling-mounted pull-down drying systems | `pending_business_confirmation` | `unpublished` |
| `/south-india/bird-spikes/` | Region + Product | Surgical-grade SS304 ledge anti-perching spikes | `pending_business_confirmation` | `unpublished` |

---

### 3.2 Level 2: State-Level Routes (5 States $\times$ 7 Products = 35 Product Routes)
State-level product campaigns require verified multi-hub fulfillment capacity across the specific state:

| State Base URL | Approved Product Slugs (7 Routes Per State) | Operational Availability | Initial SEO Indexing Status |
| :--- | :--- | :---: | :---: |
| `/andhra/` | `invisible-grills`, `balcony-safety-nets`, `child-safety-nets`, `pigeon-safety-nets`, `sports-nets`, `cloth-drying-hangers`, `bird-spikes` | `pending_business_confirmation` | `unpublished` |
| `/telangana/` | `invisible-grills`, `balcony-safety-nets`, `child-safety-nets`, `pigeon-safety-nets`, `sports-nets`, `cloth-drying-hangers`, `bird-spikes` | `pending_business_confirmation` | `unpublished` |
| `/karnataka/` | `invisible-grills`, `balcony-safety-nets`, `child-safety-nets`, `pigeon-safety-nets`, `sports-nets`, `cloth-drying-hangers`, `bird-spikes` | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/` | `invisible-grills`, `balcony-safety-nets`, `child-safety-nets`, `pigeon-safety-nets`, `sports-nets`, `cloth-drying-hangers`, `bird-spikes` | `pending_business_confirmation` | `unpublished` |
| `/kerala/` | `invisible-grills`, `balcony-safety-nets`, `child-safety-nets`, `pigeon-safety-nets`, `sports-nets`, `cloth-drying-hangers`, `bird-spikes` | `pending_business_confirmation` | `unpublished` |

---

### 3.3 Level 3: City Hub Overview Routes (7 Candidate Cities)
| URL Path | City | State | Operational Availability | Initial SEO Indexing Status | Target Conversion Action (Upon Confirmation) |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `/andhra/vizag/` | Visakhapatnam | `andhra` | `pending_business_confirmation` | `unpublished` | "Book Free Doorstep Laser Survey in Vizag" |
| `/andhra/vijayawada/` | Vijayawada | `andhra` | `pending_business_confirmation` | `unpublished` | "Schedule Free Measurement in Vijayawada" |
| `/andhra/amaravati/` | Amaravati | `andhra` | `pending_business_confirmation` | `unpublished` | "Request Amaravati Site Inspection" |
| `/telangana/hyderabad/` | Hyderabad | `telangana` | `pending_business_confirmation` | `unpublished` | "Book Free Hyderabad High-Rise Survey" |
| `/karnataka/bengaluru/` | Bengaluru | `karnataka` | `pending_business_confirmation` | `unpublished` | "Schedule Bengaluru Engineering Visit" |
| `/tamil-nadu/chennai/` | Chennai | `tamil-nadu` | `pending_business_confirmation` | `unpublished` | "Book Chennai Coastal Balcony Survey" |
| `/kerala/kochi/` | Kochi | `kerala` | `pending_business_confirmation` | `unpublished` | "Schedule Kochi Waterfront Balcony Survey" |

---

### 3.4 Level 4: Granular City + Product Route Availability Matrix (49 Candidate Routes)

> [!IMPORTANT]
> **Product Isolation Rule:**  
> Every row and column intersection below represents an independent data slot. Confirming a product (e.g. `invisible-grills` in `vizag`) updates ONLY that single cell. All other 6 products in `vizag` remain unchanged. A page is generated as `indexable` ONLY when that exact cell is set to `confirmed` AND satisfies all six indexing conditions.

| Canonical URL | City | Product Category | Operational Availability | Initial SEO Indexing Status |
| :--- | :--- | :--- | :---: | :---: |
| `/andhra/vizag/invisible-grills/` | Vizag | Invisible Grills | `pending_business_confirmation` | `unpublished` |
| `/andhra/vizag/balcony-safety-nets/` | Vizag | Balcony Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vizag/child-safety-nets/` | Vizag | Child Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vizag/pigeon-safety-nets/` | Vizag | Pigeon Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vizag/sports-nets/` | Vizag | Sports Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vizag/cloth-drying-hangers/` | Vizag | Cloth-Drying Hangers | `pending_business_confirmation` | `unpublished` |
| `/andhra/vizag/bird-spikes/` | Vizag | Bird Spikes | `pending_business_confirmation` | `unpublished` |
| `/andhra/vijayawada/invisible-grills/` | Vijayawada | Invisible Grills | `pending_business_confirmation` | `unpublished` |
| `/andhra/vijayawada/balcony-safety-nets/` | Vijayawada | Balcony Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vijayawada/child-safety-nets/` | Vijayawada | Child Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vijayawada/pigeon-safety-nets/` | Vijayawada | Pigeon Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vijayawada/sports-nets/` | Vijayawada | Sports Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/vijayawada/cloth-drying-hangers/` | Vijayawada | Cloth-Drying Hangers | `pending_business_confirmation` | `unpublished` |
| `/andhra/vijayawada/bird-spikes/` | Vijayawada | Bird Spikes | `pending_business_confirmation` | `unpublished` |
| `/andhra/amaravati/invisible-grills/` | Amaravati | Invisible Grills | `pending_business_confirmation` | `unpublished` |
| `/andhra/amaravati/balcony-safety-nets/` | Amaravati | Balcony Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/amaravati/child-safety-nets/` | Amaravati | Child Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/amaravati/pigeon-safety-nets/` | Amaravati | Pigeon Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/amaravati/sports-nets/` | Amaravati | Sports Nets | `pending_business_confirmation` | `unpublished` |
| `/andhra/amaravati/cloth-drying-hangers/` | Amaravati | Cloth-Drying Hangers | `pending_business_confirmation` | `unpublished` |
| `/andhra/amaravati/bird-spikes/` | Amaravati | Bird Spikes | `pending_business_confirmation` | `unpublished` |
| `/telangana/hyderabad/invisible-grills/` | Hyderabad | Invisible Grills | `pending_business_confirmation` | `unpublished` |
| `/telangana/hyderabad/balcony-safety-nets/` | Hyderabad | Balcony Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/telangana/hyderabad/child-safety-nets/` | Hyderabad | Child Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/telangana/hyderabad/pigeon-safety-nets/` | Hyderabad | Pigeon Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/telangana/hyderabad/sports-nets/` | Hyderabad | Sports Nets | `pending_business_confirmation` | `unpublished` |
| `/telangana/hyderabad/cloth-drying-hangers/` | Hyderabad | Cloth-Drying Hangers | `pending_business_confirmation` | `unpublished` |
| `/telangana/hyderabad/bird-spikes/` | Hyderabad | Bird Spikes | `pending_business_confirmation` | `unpublished` |
| `/karnataka/bengaluru/invisible-grills/` | Bengaluru | Invisible Grills | `pending_business_confirmation` | `unpublished` |
| `/karnataka/bengaluru/balcony-safety-nets/` | Bengaluru | Balcony Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/karnataka/bengaluru/child-safety-nets/` | Bengaluru | Child Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/karnataka/bengaluru/pigeon-safety-nets/` | Bengaluru | Pigeon Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/karnataka/bengaluru/sports-nets/` | Bengaluru | Sports Nets | `pending_business_confirmation` | `unpublished` |
| `/karnataka/bengaluru/cloth-drying-hangers/` | Bengaluru | Cloth-Drying Hangers | `pending_business_confirmation` | `unpublished` |
| `/karnataka/bengaluru/bird-spikes/` | Bengaluru | Bird Spikes | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/chennai/invisible-grills/` | Chennai | Invisible Grills | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/chennai/balcony-safety-nets/` | Chennai | Balcony Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/chennai/child-safety-nets/` | Chennai | Child Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/chennai/pigeon-safety-nets/` | Chennai | Pigeon Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/chennai/sports-nets/` | Chennai | Sports Nets | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/chennai/cloth-drying-hangers/` | Chennai | Cloth-Drying Hangers | `pending_business_confirmation` | `unpublished` |
| `/tamil-nadu/chennai/bird-spikes/` | Chennai | Bird Spikes | `pending_business_confirmation` | `unpublished` |
| `/kerala/kochi/invisible-grills/` | Kochi | Invisible Grills | `pending_business_confirmation` | `unpublished` |
| `/kerala/kochi/balcony-safety-nets/` | Kochi | Balcony Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/kerala/kochi/child-safety-nets/` | Kochi | Child Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/kerala/kochi/pigeon-safety-nets/` | Kochi | Pigeon Safety Nets | `pending_business_confirmation` | `unpublished` |
| `/kerala/kochi/sports-nets/` | Kochi | Sports Nets | `pending_business_confirmation` | `unpublished` |
| `/kerala/kochi/cloth-drying-hangers/` | Kochi | Cloth-Drying Hangers | `pending_business_confirmation` | `unpublished` |
| `/kerala/kochi/bird-spikes/` | Kochi | Bird Spikes | `pending_business_confirmation` | `unpublished` |

---

## 4. PROPOSED LEGACY 301 REDIRECTION MATRIX

> [!CAUTION]
> **Strict Redirection Rules:**
> 1. **Status:** All redirects are strictly in `proposed_pending_manual_validation` status.
> 2. **No Implementation:** Zero redirects are implemented in this phase.
> 3. **Never Redirect to Homepage:** Unrelated location URLs must never be redirected to the homepage. Each redirect must strictly map to a valid 1:1 hierarchical target upon manual business validation.

| Legacy Incoming URL | Proposed Target Canonical URL | Proposed Status | Rationale |
| :--- | :--- | :---: | :--- |
| `/locations/` | `/south-india/` | `proposed_pending_manual_validation` | Regional overview migration |
| `/locations/hyderabad/` | `/telangana/hyderabad/` | `proposed_pending_manual_validation` | State-hierarchical restructuring |
| `/locations/visakhapatnam/` | `/andhra/vizag/` | `proposed_pending_manual_validation` | State hierarchy + canonical short slug |
| `/andhra/visakhapatnam/` | `/andhra/vizag/` | `proposed_pending_manual_validation` | Canonical alias preservation |
| `/locations/vijayawada/` | `/andhra/vijayawada/` | `proposed_pending_manual_validation` | State-hierarchical restructuring |
| `/locations/amaravati/` | `/andhra/amaravati/` | `proposed_pending_manual_validation` | State-hierarchical restructuring |
| `/karnataka/bangalore/` | `/karnataka/bengaluru/` | `proposed_pending_manual_validation` | Official spelling canonicalization |
| `/tamil-nadu/madras/` | `/tamil-nadu/chennai/` | `proposed_pending_manual_validation` | Official spelling canonicalization |
| `/kerala/cochin/` | `/kerala/kochi/` | `proposed_pending_manual_validation` | Official spelling canonicalization |

---

## 5. BREADCRUMB SCHEMA ARCHITECTURE

Every page rendered within the hierarchy will emit a valid Schema.org `BreadcrumbList` matching the exact hierarchy path:

### Example: Level 4 Page (`/andhra/vizag/invisible-grills/`)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://invisiblesafety.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "South India",
      "item": "https://invisiblesafety.in/south-india/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Andhra Pradesh",
      "item": "https://invisiblesafety.in/andhra/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Visakhapatnam",
      "item": "https://invisiblesafety.in/andhra/vizag/"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Invisible Grills",
      "item": "https://invisiblesafety.in/andhra/vizag/invisible-grills/"
    }
  ]
}
```

---

## 6. ROUTE VALIDATION CHECKLIST (PHASE 4.2 COMPLIANT)

- ✅ **No Local-Area URLs:** Zero neighbourhood-level routes exist in the matrix.
- ✅ **Strict 7 Products:** Only approved service categories are represented.
- ✅ **49-Slot Isolation:** All 49 city-product combinations are independently modeled and validated.
- ✅ **Decoupled Status:** Separate `operationalAvailability: pending_business_confirmation` and `seoIndexingStatus: unpublished` across all 49 slots.
- ✅ **Zero Automatic Indexing:** No route is marked as "automatically indexable" or "100% indexable".
- ✅ **Redirects Governed:** All redirects marked `proposed_pending_manual_validation`; zero redirects implemented.

*Next Step: Review the updated execution roadmap in `PHASE_4_IMPLEMENTATION_PLAN.md`.*
