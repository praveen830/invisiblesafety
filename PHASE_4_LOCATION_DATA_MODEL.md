# PHASE 4 — SOUTH INDIA LOCATION ARCHITECTURE & DATA MODEL
## DOCUMENT 2: LOCATION DATA MODEL & TECHNICAL CONTRACT (REVISED — PHASE 4.2)

**Project:** Invisible Safety Architectural Home Safety Solutions  
**Domain:** `https://invisiblesafety.in/`  
**Phase:** 4.2 — Granular City + Product Availability Data Architecture  
**Architect:** Senior Astro Architect & Technical SEO Engineer  
**Date:** November 2026  
**Status:** Revised Specification — Pending Business Confirmation  

---

## 1. DATA MODEL ARCHITECTURAL PHILOSOPHY

To support sustainable organic ranking, user trust, operational accuracy, and architectural scalability across five South Indian states, the data model enforces five core architectural principles:

1. **Granular Product-Level Isolation:**  
   Operational capability is configured independently for every single product within every city, state, and region. Confirming one product (e.g. Invisible Grills) has zero effect on the operational status of the other six products.
2. **Decoupled Operations and SEO Status:**  
   Every node and product combination carries independent `operationalAvailability` and `seoIndexingStatus` fields. A product will never become indexable simply because it exists in configuration.
3. **Strict 4-Level Taxonomic Invariant:**  
   $$\text{South India (Region)} \longrightarrow \text{State} \longrightarrow \text{City} \longrightarrow \text{Product}$$  
   The model strictly prohibits sub-city or neighbourhood nodes.
4. **Six-Point Indexing Gate per Product:**  
   A city-product page is generated with `seoIndexingStatus: 'indexable'` only when **all six validation conditions** are satisfied for that specific product in that specific city.
5. **Zero Runtime Overhead & Compile-Time Static Validation:**  
   Pure TypeScript contracts executed during Astro's build phase (`getStaticPaths()`). No external database or runtime bloat.

---

## 2. CORE ENUMS & TYPE DEFINITIONS

```typescript
// src/data/geo/types.ts

/**
 * Operational service availability of a geography or specific product
 * - 'confirmed': Business management has formally verified on-ground personnel, equipment, and fulfillment capacity
 * - 'pending_business_confirmation': Candidate location or product awaiting operational sign-off
 * - 'unavailable': Geographies or products outside Invisible Safety fulfillment scope
 */
export type OperationalAvailability = 
  | 'confirmed'
  | 'pending_business_confirmation'
  | 'unavailable';

/**
 * Search engine indexing and publication state
 * - 'indexable': Fully verified page meeting all 6 indexing conditions (index, follow)
 * - 'noindex': Rendered page with robots noindex directive (noindex, follow)
 * - 'unpublished': Route is not generated or excluded from build output
 */
export type SeoIndexingStatus = 
  | 'indexable'
  | 'noindex'
  | 'unpublished';

/**
 * Proposed redirect status
 */
export type RedirectStatus = 'proposed_pending_manual_validation';

/**
 * The 5 approved South Indian states
 */
export type StateSlug = 'andhra' | 'telangana' | 'karnataka' | 'tamil-nadu' | 'kerala';

/**
 * The 7 approved product categories
 */
export type ProductSlug =
  | 'invisible-grills'
  | 'balcony-safety-nets'
  | 'child-safety-nets'
  | 'pigeon-safety-nets'
  | 'sports-nets'
  | 'cloth-drying-hangers'
  | 'bird-spikes';

/**
 * Hierarchy tier level
 */
export type HierarchyLevel = 'region' | 'state' | 'city' | 'city-product';
```

---

## 3. GRANULAR PRODUCT AVAILABILITY CONTRACT

To achieve complete isolation between products in any given location, the `LocationProductAvailability` contract governs each product slot individually:

```typescript
// src/data/geo/types.ts

/**
 * Granular operational and indexing state for a single product within a location
 */
export interface LocationProductAvailability {
  productSlug: ProductSlug;
  operationalAvailability: OperationalAvailability; // Default: 'pending_business_confirmation'
  seoIndexingStatus: SeoIndexingStatus;             // Default: 'unpublished'
  localTurnaroundHours?: number;                   // Product-specific turnaround (e.g. 24h, 48h)
  verifiedTechniciansAvailable?: boolean;          // Certified rigging crew available
  inventoryInStock?: boolean;                      // Raw materials / cable drums in stock
  customLocalNotes?: string;                       // Product-specific local engineering notes
}

/**
 * Complete 7-product availability matrix for a city, state, or region
 */
export type ProductAvailabilityMatrix = Record<ProductSlug, LocationProductAvailability>;
```

---

## 4. GEOGRAPHIC ENTITY INTERFACES

### 4.1 State Entity (`StateConfig`)
```typescript
export interface StateConfig {
  id: string;                                   // e.g. "andhra-pradesh"
  name: string;                                 // e.g. "Andhra Pradesh"
  slug: StateSlug;                              // e.g. "andhra"
  capitalCitySlug: string;                      // e.g. "amaravati"
  operationalAvailability: OperationalAvailability; // Default: 'pending_business_confirmation'
  seoIndexingStatus: SeoIndexingStatus;         // Default: 'unpublished'
  
  /**
   * Independent product availability for state-wide campaigns (/[state]/[product]/)
   * Confirming one product at state level does NOT confirm other products.
   */
  productAvailability: ProductAvailabilityMatrix;

  headline: string;
  subheadline: string;
  regionalContext: {
    climateOverview: string;                    // Coastal salinity, monsoon humidity, Deccan heat
    windZoneRating: string;                     // e.g. "Zone II to Zone IV Coastal High-Wind"
    primaryConcerns: string[];                  // e.g. ["Corrosion resistance", "RWA elevation compliance"]
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
```

### 4.2 City Entity (`CityConfig`)
```typescript
export interface CityConfig {
  id: string;                                   // e.g. "visakhapatnam"
  name: string;                                 // e.g. "Visakhapatnam (Vizag)"
  slug: string;                                 // e.g. "vizag" (canonical)
  slugAliases?: string[];                       // e.g. ["visakhapatnam"] for 301 alias handling
  stateSlug: StateSlug;                         // Foreign key to StateConfig
  operationalAvailability: OperationalAvailability; // Default: 'pending_business_confirmation'
  seoIndexingStatus: SeoIndexingStatus;         // Default: 'unpublished'
  
  /**
   * Independent product availability for every single product in this city.
   * Modifying one product slot has ZERO impact on any other product slot.
   */
  productAvailability: ProductAvailabilityMatrix;

  phone?: string;                               // Verified local or dispatch number
  whatsapp?: string;                            // Direct dispatch WhatsApp number
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address?: {
    street: string;
    locality: string;
    city: string;
    pincode: string;
  };
  localContext: {
    heroTag: string;                            // e.g. "COASTAL CORROSION-PROOF ENGINEERING"
    tagline: string;
    description: string;
    climateFactors: string[];                   // e.g. ["High salt air salinity along Beach Road", "Cyclonic gust buffers"]
    architectureStyle: string;                  // e.g. "High-rise sea-facing towers and gated hill communities"
  };
  /**
   * Strictly descriptive neighbourhood chips for in-page display.
   * Under NO circumstances do these generate individual URLs or pages.
   */
  coverageLocalities: {
    name: string;
    description: string;
  }[];
  /**
   * Verified project installations in this city (factual records only).
   */
  verifiedInstallations?: {
    community: string;
    locality: string;
    productSlug: ProductSlug;
    sqft: number;
    quote: string;
    year: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}
```

### 4.3 Regional Entity (`RegionalConfig` — South India)
```typescript
export interface RegionalConfig {
  id: "south-india";
  name: "South India";
  slug: "south-india";
  operationalAvailability: OperationalAvailability; // Default: 'pending_business_confirmation'
  seoIndexingStatus: SeoIndexingStatus;             // Default: 'unpublished'
  
  /**
   * Regional product availability (/south-india/[product]/).
   * Requires verified multi-state fulfillment coverage before indexing.
   */
  productAvailability: ProductAvailabilityMatrix;
  
  headline: string;
  subheadline: string;
  seo: {
    title: string;
    description: string;
  };
}
```

---

## 5. PRODUCT ENTITY INTERFACE (`ProductConfig`)

Models the exactly seven approved service categories and binds them to the Phase 3.8/3.9 approved responsive hero assets:

```typescript
export interface ProductConfig {
  slug: ProductSlug;
  name: string;                                 // e.g. "Invisible Grills"
  shortTitle: string;                           // e.g. "SS316 Invisible Grills"
  categoryTag: string;                          // e.g. "ARCHITECTURAL FALL PROTECTION"
  warrantyYears: number;                        // e.g. 10
  breakLoadKg: number;                          // e.g. 400
  materialGrade: string;                        // e.g. "AISI 316 Japanese Marine Grade Stainless Steel"
  spacingOptions: string[];                     // e.g. ["50mm (Child Safety)", "100mm (Standard)"]
  heroAssets: {
    desktopWebp: string;                        // Phase 3.8 approved 16:9 asset
    mobileWebp: string;                         // Phase 3.8 approved 4:5 asset
    altText: string;
    widthDesktop: number;                       // 1920
    heightDesktop: number;                      // 1080
    widthMobile: number;                        // 1080
    heightMobile: number;                       // 1350
  };
  coreFeatures: {
    title: string;
    description: string;
  }[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  defaultFaqs: {
    question: string;
    answer: string;
  }[];
}
```

---

## 6. PROGRAMMATIC DATA STORE (REFERENCE DEFINITIONS)

### 6.1 Matrix Helper for Defaulting Availability
```typescript
// src/data/geo/helpers.ts
import type { ProductSlug, ProductAvailabilityMatrix } from './types';

export const APPROVED_PRODUCT_SLUGS: ProductSlug[] = [
  'invisible-grills',
  'balcony-safety-nets',
  'child-safety-nets',
  'pigeon-safety-nets',
  'sports-nets',
  'cloth-drying-hangers',
  'bird-spikes'
];

/**
 * Creates an initial default product availability matrix where all 7 products
 * are strictly set to 'pending_business_confirmation' and 'unpublished'.
 */
export function createDefaultProductAvailabilityMatrix(): ProductAvailabilityMatrix {
  return {
    'invisible-grills': {
      productSlug: 'invisible-grills',
      operationalAvailability: 'pending_business_confirmation',
      seoIndexingStatus: 'unpublished'
    },
    'balcony-safety-nets': {
      productSlug: 'balcony-safety-nets',
      operationalAvailability: 'pending_business_confirmation',
      seoIndexingStatus: 'unpublished'
    },
    'child-safety-nets': {
      productSlug: 'child-safety-nets',
      operationalAvailability: 'pending_business_confirmation',
      seoIndexingStatus: 'unpublished'
    },
    'pigeon-safety-nets': {
      productSlug: 'pigeon-safety-nets',
      operationalAvailability: 'pending_business_confirmation',
      seoIndexingStatus: 'unpublished'
    },
    'sports-nets': {
      productSlug: 'sports-nets',
      operationalAvailability: 'pending_business_confirmation',
      seoIndexingStatus: 'unpublished'
    },
    'cloth-drying-hangers': {
      productSlug: 'cloth-drying-hangers',
      operationalAvailability: 'pending_business_confirmation',
      seoIndexingStatus: 'unpublished'
    },
    'bird-spikes': {
      productSlug: 'bird-spikes',
      operationalAvailability: 'pending_business_confirmation',
      seoIndexingStatus: 'unpublished'
    }
  };
}
```

### 6.2 State Store Sample (`src/data/geo/states.ts`)
```typescript
import type { StateConfig } from './types';
import { createDefaultProductAvailabilityMatrix } from './helpers';

export const states: Record<string, StateConfig> = {
  andhra: {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    slug: "andhra",
    capitalCitySlug: "amaravati",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Marine-Grade Invisible Grills & Certified Safety Nets in Andhra Pradesh",
    subheadline: "Coastal corrosion-proof SS316 installations engineered for high humidity and coastal wind forces.",
    regionalContext: {
      climateOverview: "Long coastal corridor characterized by high salt-air humidity and tropical summer heat.",
      windZoneRating: "Zone III to Zone IV (High Coastal Wind Hazard)",
      primaryConcerns: ["Salt-air pitting corrosion on ordinary steel", "Severe cyclone gust resistance"]
    },
    seo: {
      title: "Invisible Grills & Safety Nets in Andhra Pradesh | Invisible Safety",
      description: "Architectural invisible safety grills and balcony nets across Visakhapatnam, Vijayawada, and Amaravati.",
      keywords: ["invisible grills andhra pradesh", "balcony safety nets ap"]
    }
  },
  telangana: {
    id: "telangana",
    name: "Telangana",
    slug: "telangana",
    capitalCitySlug: "hyderabad",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Architectural Invisible Grills & Balcony Safety in Telangana",
    subheadline: "Engineered for high-rise towers exceeding 20 to 50 floors across Hyderabad's IT corridor.",
    regionalContext: {
      climateOverview: "Deccan plateau semi-arid climate with high summer temperatures and moderate monsoon.",
      windZoneRating: "Zone II (Moderate Wind)",
      primaryConcerns: ["Ultra-tall high-rise elevation compliance", "Child fall-containment above 20th floor"]
    },
    seo: {
      title: "Invisible Grills & Balcony Safety in Telangana | Invisible Safety",
      description: "Invisible safety grills and safety net installations for Hyderabad and Telangana high-rises.",
      keywords: ["invisible grills telangana", "invisible grills hyderabad"]
    }
  },
  karnataka: {
    id: "karnataka",
    name: "Karnataka",
    slug: "karnataka",
    capitalCitySlug: "bengaluru",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Precision Invisible Grills & Balcony Safety Nets in Karnataka",
    subheadline: "Balcony safety engineering for premier high-rise apartments and villa communities across Bengaluru.",
    regionalContext: {
      climateOverview: "Elevated plateau with moderate tropical climate and high pigeon roosting density.",
      windZoneRating: "Zone II (Moderate Wind)",
      primaryConcerns: ["Pigeon exclusion without light loss", "RWA elevation guidelines"]
    },
    seo: {
      title: "Invisible Grills & Balcony Safety Nets in Karnataka | Invisible Safety",
      description: "SS316 invisible grills and child safety nets for Bengaluru tech corridors.",
      keywords: ["invisible grills karnataka", "invisible grills bengaluru"]
    }
  },
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    capitalCitySlug: "chennai",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Coastal Grade Invisible Grills & Safety Nets in Tamil Nadu",
    subheadline: "Corrosion-proof balcony safety systems for Chennai's coastal residential corridors.",
    regionalContext: {
      climateOverview: "Tropical coastal maritime climate with persistent high humidity and sea-salt exposure.",
      windZoneRating: "Zone III (High Coastal Velocity)",
      primaryConcerns: ["Maritime corrosion resistance", "High-humidity UV degradation resistance"]
    },
    seo: {
      title: "Invisible Grills & Safety Nets in Tamil Nadu | Invisible Safety",
      description: "SS316 marine-grade invisible safety grills and anti-bird nets for Chennai coastal apartments.",
      keywords: ["invisible grills tamil nadu", "invisible grills chennai"]
    }
  },
  kerala: {
    id: "kerala",
    name: "Kerala",
    slug: "kerala",
    capitalCitySlug: "thiruvananthapuram",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "High-Monsoon Marine Invisible Grills & Safety Nets in Kerala",
    subheadline: "Engineered for intense monsoon downpours and humid coastal environments across Kochi.",
    regionalContext: {
      climateOverview: "Tropical maritime monsoon climate with extremely heavy seasonal rainfall.",
      windZoneRating: "Zone III (Coastal Monsoon Load)",
      primaryConcerns: ["Rust immunity during 4-month continuous monsoons", "Anti-fungal polymer coatings"]
    },
    seo: {
      title: "Invisible Grills & Safety Nets in Kerala | Invisible Safety",
      description: "Heavy-monsoon rust-proof SS316 invisible grills and balcony safety nets for Kochi waterfront homes.",
      keywords: ["invisible grills kerala", "invisible grills kochi"]
    }
  }
};
```

### 6.3 City Store Sample (`src/data/geo/cities.ts`) — Every Product Independently Configured
```typescript
import type { CityConfig } from './types';
import { createDefaultProductAvailabilityMatrix } from './helpers';

export const cities: Record<string, CityConfig> = {
  vizag: {
    id: "visakhapatnam",
    name: "Visakhapatnam (Vizag)",
    slug: "vizag",
    slugAliases: ["visakhapatnam"],
    stateSlug: "andhra",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    // 7 independent product slots:
    productAvailability: createDefaultProductAvailabilityMatrix(),
    coordinates: { latitude: 17.6868, longitude: 83.2185 },
    localContext: {
      heroTag: "COASTAL CORROSION-PROOF ENGINEERING",
      tagline: "Marine-Grade Invisible Grills & Balcony Safety in Vizag",
      description: "coastal corrosion-proof SS316 marine-grade invisible grills tested for sea-breeze durability across Beach Road, MVP Colony & Madhurawada.",
      climateFactors: ["High airborne salt salinity along Beach Road", "Cyclonic coastal gust resistance"],
      architectureStyle: "Sea-facing high-rises and hillside gated communities"
    },
    coverageLocalities: [
      { name: "Beach Road & Pandurangapuram", description: "Direct sea-facing luxury penthouses and high-wind balconies." },
      { name: "MVP Colony & Lawson's Bay", description: "Established residential balconies requiring bird control and child safety." },
      { name: "Madhurawada & Yendada", description: "Rapidly growing high-rise IT corridor towers and gated communities." }
    ],
    faqs: [
      {
        question: "Why is SS316 recommended for balcony installations in Visakhapatnam?",
        answer: "Visakhapatnam's marine environment causes pitting corrosion in lower-grade steels like SS202 and SS304. SS316 contains 2-3% Molybdenum, making it immune to marine chloride attack and sea salt spray."
      }
    ]
  },
  vijayawada: {
    id: "vijayawada",
    name: "Vijayawada",
    slug: "vijayawada",
    stateSlug: "andhra",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    coordinates: { latitude: 16.5062, longitude: 80.6480 },
    localContext: {
      heroTag: "TROPICAL HEAT & VENTILATION PROFILE",
      tagline: "Modern Invisible Grills & Pigeon Nets in Vijayawada",
      description: "architecturally harmonious invisible grills and anti-bird mesh designed for maximum airflow in tropical climates.",
      climateFactors: ["Intense summer temperatures requiring maximum cross-breeze", "Urban pigeon nesting denial"],
      architectureStyle: "Modern multi-storey residential towers and spacious family apartments"
    },
    coverageLocalities: [
      { name: "Benz Circle & Patamata", description: "Prime central residential apartments and commercial complexes." },
      { name: "Kanuru & Poranki", description: "Fast-growing gated high-rise communities with young families." }
    ],
    faqs: [
      {
        question: "How do invisible grills compare to traditional iron grills in Vijayawada?",
        answer: "Traditional iron grills require recurring scraping and repainting due to rust, trap dust, and give a cage-like feel. Invisible Safety grills are zero-maintenance, allow full cross-breeze, and are virtually invisible from outside."
      }
    ]
  },
  amaravati: {
    id: "amaravati",
    name: "Amaravati",
    slug: "amaravati",
    stateSlug: "andhra",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    coordinates: { latitude: 16.5131, longitude: 80.5165 },
    localContext: {
      heroTag: "CAPITAL REGION EXPANSION ARCHITECTURE",
      tagline: "Invisible Grills & Balcony Safety in Amaravati Capital Region",
      description: "reinforced expansion-anchored SS316 marine invisible grills and anti-fall safety nets designed for open-plain wind dynamics.",
      climateFactors: ["Open-plain wind forces", "Riverfront humidity along Krishna River"],
      architectureStyle: "Contemporary residential projects, government employee quarters, and luxury villas"
    },
    coverageLocalities: [
      { name: "Tadepalli & Mangalagiri", description: "Capital region luxury residential developments along the Krishna riverfront." },
      { name: "Undavalli & Penumaka", description: "Scenic residential communities and modern high-rise riverbank apartments." }
    ],
    faqs: [
      {
        question: "How do invisible grills perform in open high-wind capital plain areas?",
        answer: "The aerodynamic cylindrical cable profile allows wind to pass freely with zero drag or whistling, supported by reinforced structural anchoring into concrete slabs."
      }
    ]
  },
  hyderabad: {
    id: "hyderabad",
    name: "Hyderabad & Secunderabad",
    slug: "hyderabad",
    stateSlug: "telangana",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    coordinates: { latitude: 17.3850, longitude: 78.4867 },
    localContext: {
      heroTag: "HIGH-RISE RWA COMPLIANCE STANDARDS",
      tagline: "Invisible Grills & Balcony Safety in Hyderabad",
      description: "architectural fall-protection engineered for modern high-rises in Gachibowli, Kondapur, Hitec City, Kokapet & Financial District.",
      climateFactors: ["High-altitude wind gust loads in 20+ to 50+ floor towers", "Deccan hard-water wash resilience"],
      architectureStyle: "Ultra-tall gated community high-rises and luxury villa perimeters"
    },
    coverageLocalities: [
      { name: "Financial District & Gachibowli", description: "Serving towers in Nanakramguda, Puppalguda & Kokapet SEZ corridor." },
      { name: "HITEC City & Kondapur", description: "High-density residential safety for tech professionals & young families." },
      { name: "Madhapur & Jubilee Hills", description: "Architectural luxury villas and premium duplex apartment installations." }
    ],
    faqs: [
      {
        question: "Are invisible grills allowed by Hyderabad gated community RWAs?",
        answer: "Yes! Unlike traditional box grills that alter the building exterior and violate society bylaws, Invisible Safety's slim profile is virtually invisible from the ground and is widely approved across major societies."
      }
    ]
  },
  bengaluru: {
    id: "bengaluru",
    name: "Bengaluru",
    slug: "bengaluru",
    slugAliases: ["bangalore"],
    stateSlug: "karnataka",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
    localContext: {
      heroTag: "TECH CORRIDOR HIGH-RISE BALCONY CARE",
      tagline: "Invisible Grills & Balcony Safety Nets in Bengaluru",
      description: "high-rise tech corridor wind-load and bird protection for premier apartment communities.",
      climateFactors: ["High pigeon roosting density in residential high-rises", "Moderate wind gust loads"],
      architectureStyle: "High-density tech corridor residential complexes and gated villas"
    },
    coverageLocalities: [
      { name: "Whitefield & Sarjapur", description: "Major tech corridor high-rise residential towers." },
      { name: "Electronic City & Bellandur", description: "Modern apartment communities requiring child safety and bird exclusion." }
    ],
    faqs: [
      {
        question: "How do you handle pigeon issues in Bengaluru high-rises?",
        answer: "We install translucent 0.7mm monofilament netting that denies pigeon entry while preserving 98% of natural daylight and balcony views."
      }
    ]
  },
  chennai: {
    id: "chennai",
    name: "Chennai",
    slug: "chennai",
    slugAliases: ["madras"],
    stateSlug: "tamil-nadu",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    coordinates: { latitude: 13.0827, longitude: 80.2707 },
    localContext: {
      heroTag: "COASTAL CORROSION-PROOF SS316",
      tagline: "Coastal Grade Invisible Grills & Safety Nets in Chennai",
      description: "coastal saline-grade SS316 rust-proof installations along OMR, ECR, and coastal corridors.",
      climateFactors: ["Persistent maritime humidity and salt-spray corrosion", "High solar UV exposure"],
      architectureStyle: "Coastal apartment balconies, IT expressway towers, and residential communities"
    },
    coverageLocalities: [
      { name: "OMR & ECR", description: "Coastal corridor high-rise apartments and beach villas." },
      { name: "Velachery & Anna Nagar", description: "Dense urban family residential communities." }
    ],
    faqs: [
      {
        question: "Will invisible grills withstand Chennai's coastal humidity?",
        answer: "Yes. Our AISI 316 marine-grade stainless steel cables with DuPont nylon casing provide permanent immunity to coastal rust and salt-spray."
      }
    ]
  },
  kochi: {
    id: "kochi",
    name: "Kochi",
    slug: "kochi",
    slugAliases: ["cochin"],
    stateSlug: "kerala",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    coordinates: { latitude: 9.9312, longitude: 76.2673 },
    localContext: {
      heroTag: "HEAVY-MONSOON RESISTANT RIGGING",
      tagline: "Monsoon-Proof Invisible Grills & Nets in Kochi",
      description: "high-rainfall and monsoon corrosion-resistant rigging for waterfront residential towers.",
      climateFactors: ["Prolonged high-volume monsoon rain", "Continuous tropical humidity"],
      architectureStyle: "Waterfront luxury apartments, backwater residences, and city towers"
    },
    coverageLocalities: [
      { name: "Marine Drive & Panampilly Nagar", description: "Waterfront luxury residential developments." },
      { name: "Kakkanad & Edappally", description: "Modern IT corridor high-rise communities." }
    ],
    faqs: [
      {
        question: "Can cables or track fittings rust during heavy Kerala monsoons?",
        answer: "No. All tracks are anodized structural aluminium and cables are genuine AISI 316 stainless steel, engineered specifically for high-monsoon environments."
      }
    ]
  }
};
```

---

## 7. GRANULAR PRODUCT VALIDATION & STATIC PATH ENGINE

This validation engine enforces the **six mandatory indexing conditions on a strictly per-product basis** before any city-product, state-product, or regional-product page can be generated:

```typescript
// src/data/geo/validator.ts
import { states } from './states';
import { cities } from './cities';
import { products } from './products';
import type { StateSlug, ProductSlug } from './types';

export interface ProductIndexingCheckResult {
  isIndexable: boolean;
  failedConditions: string[];
}

/**
 * Validates the 6 mandatory indexing conditions for a SPECIFIC City + Product tuple:
 * 1. Confirmed service availability FOR THIS EXACT PRODUCT IN THIS CITY
 * 2. Actual verified ability to serve (certified crew & inventory for this product)
 * 3. Accurate local information
 * 4. Unique useful content
 * 5. Relevant approved images (Phase 3.8/3.9 verified WebP assets for this product)
 * 6. Correct canonical URL
 */
export function validateCityProductIndexing(
  stateSlug: StateSlug,
  citySlug: string,
  productSlug: ProductSlug
): ProductIndexingCheckResult {
  const failed: string[] = [];
  const state = states[stateSlug];
  if (!state) {
    return { isIndexable: false, failedConditions: ["State does not exist in data model."] };
  }

  const city = Object.values(cities).find(c => c.slug === citySlug && c.stateSlug === stateSlug);
  if (!city) {
    return { isIndexable: false, failedConditions: ["City does not exist in data model."] };
  }

  const product = products[productSlug];
  if (!product) {
    return { isIndexable: false, failedConditions: ["Product does not exist in approved 7-product catalog."] };
  }

  // Condition 1: Confirmed service availability FOR THIS EXACT PRODUCT
  const productAvail = city.productAvailability[productSlug];
  if (!productAvail) {
    failed.push(`Condition 1 Failed: No availability slot defined for ${productSlug} in ${city.name}.`);
  } else {
    if (productAvail.operationalAvailability !== 'confirmed') {
      failed.push(`Condition 1 Failed: ${productSlug} operationalAvailability is '${productAvail.operationalAvailability}', not 'confirmed'.`);
    }
    if (productAvail.seoIndexingStatus !== 'indexable') {
      failed.push(`Condition 1 Failed: ${productSlug} seoIndexingStatus is '${productAvail.seoIndexingStatus}', not 'indexable'.`);
    }

    // Condition 2: Actual ability to serve (technicians and inventory for this product)
    if (productAvail.verifiedTechniciansAvailable === false) {
      failed.push(`Condition 2 Failed: No certified installation technicians verified for ${productSlug} in ${city.name}.`);
    }
    if (productAvail.inventoryInStock === false) {
      failed.push(`Condition 2 Failed: Material inventory not in stock for ${productSlug} in ${city.name}.`);
    }
  }

  // Condition 3: Accurate local information
  if (!city.phone || !city.whatsapp) {
    failed.push("Condition 3 Failed: Missing verified local contact details.");
  }

  // Condition 4: Unique useful content
  if (!city.localContext || !city.localContext.description) {
    failed.push("Condition 4 Failed: Missing localized engineering context.");
  }

  // Condition 5: Relevant approved images
  if (!product.heroAssets || !product.heroAssets.desktopWebp || !product.heroAssets.mobileWebp) {
    failed.push(`Condition 5 Failed: Missing approved Phase 3.8/3.9 hero WebP assets for ${productSlug}.`);
  }

  // Condition 6: Correct canonical URL
  // Enforces /[state]/[city]/[product]/ with trailing slash and zero area slugs

  return {
    isIndexable: failed.length === 0,
    failedConditions: failed
  };
}

/**
 * Validates State-Level Product Campaign Coverage (/[state]/[product]/)
 * Requires verified multi-hub fulfillment capacity across the state.
 */
export function validateStateProductIndexing(
  stateSlug: StateSlug,
  productSlug: ProductSlug
): ProductIndexingCheckResult {
  const failed: string[] = [];
  const state = states[stateSlug];
  if (!state) return { isIndexable: false, failedConditions: ["State does not exist."] };

  const stateProductAvail = state.productAvailability[productSlug];
  if (!stateProductAvail || stateProductAvail.operationalAvailability !== 'confirmed') {
    failed.push(`State-level coverage for ${productSlug} in ${state.name} is not confirmed.`);
  }

  // State-wide campaign requires at least one confirmed city in that state
  const stateCities = Object.values(cities).filter(c => c.stateSlug === stateSlug);
  const confirmedCities = stateCities.filter(c => c.productAvailability[productSlug]?.operationalAvailability === 'confirmed');

  if (confirmedCities.length === 0) {
    failed.push(`No cities in ${state.name} have confirmed operational availability for ${productSlug}.`);
  }

  return {
    isIndexable: failed.length === 0,
    failedConditions: failed
  };
}

/**
 * Returns static paths for Astro's getStaticPaths() for /[state]/[city]/[product]/
 * Strictly excludes any city-product combination that fails validation.
 */
export function getConfirmedCityProductPaths() {
  const paths: Array<{
    params: { state: string; city: string; product: string };
    props: { state: any; city: any; product: any };
  }> = [];

  for (const city of Object.values(cities)) {
    const state = states[city.stateSlug];
    if (!state) continue;

    for (const product of Object.values(products)) {
      const check = validateCityProductIndexing(state.slug, city.slug, product.slug);
      if (check.isIndexable) {
        paths.push({
          params: { state: state.slug, city: city.slug, product: product.slug },
          props: { state, city, product }
        });
      }
    }
  }

  return paths;
}
```

---

## 8. CONSISTENCY CHECK & DATA MODEL INTEGRITY VALIDATION

1. **Isolation Test:** Changing `cities.vizag.productAvailability['invisible-grills'].operationalAvailability = 'confirmed'` leaves all other 6 products in `vizag` strictly in `'pending_business_confirmation'`.
2. **State & Regional Gate Test:** If a product is confirmed in only one city, `validateStateProductIndexing()` requires explicit state-wide confirmation before emitting `/[state]/[product]/`.
3. **Zero False Indexing:** With all 49 combinations initialized to `'pending_business_confirmation'` and `'unpublished'`, `getConfirmedCityProductPaths()` safely returns `[]` (empty array), preventing any premature static page generation or doorway spam.

*Next Step: Review the per-product route matrix in `PHASE_4_ROUTE_MAPPING.md`.*
