/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Core TypeScript Type Definitions & Data Contracts
 * 
 * Strict 3-Tier Hierarchy: State -> City -> Product
 * Approved Telugu States: Andhra Pradesh & Telangana
 * (No neighbourhood or locality routes permitted)
 */

/**
 * Operational service availability of a geography or specific product
 * - 'confirmed': Formally verified by business management as operationally active with local fulfillment capability
 * - 'pending_business_confirmation': Candidate location or product awaiting operational verification
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
 * Proposed redirect status for legacy URLs
 */
export type RedirectStatus = 'proposed_pending_manual_validation';

/**
 * The 2 approved Telugu states
 */
export type StateSlug = 'andhra' | 'telangana';

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
export type HierarchyLevel = 'state' | 'city' | 'city-product';

/**
 * Campaign scope levels
 */
export type CampaignScope = 'state' | 'city' | 'city-product';

/**
 * Granular operational and indexing state for a single product within a location.
 * Configured independently for every city-product and state-product combination.
 */
export interface LocationProductAvailability {
  productSlug: ProductSlug;
  operationalAvailability: OperationalAvailability;
  seoIndexingStatus: SeoIndexingStatus;
  localTurnaroundHours?: number;
  hasTrainedTechnicians?: boolean;
  hasMaterialInventory?: boolean;
  notes?: string;
}

/**
 * Complete 7-product availability matrix for a city, state, or region
 */
export type ProductAvailabilityMatrix = Record<ProductSlug, LocationProductAvailability>;

/**
 * Approved responsive hero WebP assets for a product (16:9 desktop, 4:5 mobile)
 */
export interface ProductHeroAssets {
  desktopWebp: string;
  mobileWebp: string;
  altText: string;
  widthDesktop: number;
  heightDesktop: number;
  widthMobile: number;
  heightMobile: number;
}

/**
 * Product Configuration Contract (The 7 Approved Services)
 */
export interface ProductConfig {
  slug: ProductSlug;
  name: string;
  shortTitle: string;
  categoryTag: string;
  warrantyYears?: number;
  breakLoadKg?: number;
  materialGrade?: string;
  spacingOptions: string[];
  heroAssets: ProductHeroAssets;
  coreFeatures: Array<{
    title: string;
    description: string;
  }>;
  technicalSpecs: Array<{
    label: string;
    value: string;
  }>;
  defaultFaqs: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * State Configuration Contract (The 2 Target Telugu States)
 */
export interface StateConfig {
  id: string;
  name: string;
  slug: StateSlug;
  capitalCitySlug: string;
  operationalAvailability: OperationalAvailability;
  seoIndexingStatus: SeoIndexingStatus;
  productAvailability: ProductAvailabilityMatrix;
  headline: string;
  subheadline: string;
  regionalContext: {
    climateOverview: string;
    windZoneRating: string;
    primaryConcerns: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/**
 * Locality reference for in-page visual chips only.
 * Under NO circumstances do these generate individual URLs or pages.
 */
export interface LocalityReference {
  name: string;
  description: string;
}

/**
 * Verified real project installation record (no fabricated numbers or claims)
 */
export interface VerifiedInstallation {
  community: string;
  locality: string;
  productSlug: ProductSlug;
  sqft: number;
  quote: string;
  year: string;
}

/**
 * City Configuration Contract (Seed candidate cities and scalable future cities)
 */
export interface CityConfig {
  id: string;
  name: string;
  slug: string;
  slugAliases?: string[];
  stateSlug: StateSlug;
  operationalAvailability: OperationalAvailability;
  seoIndexingStatus: SeoIndexingStatus;
  productAvailability: ProductAvailabilityMatrix;
  phone?: string;
  whatsapp?: string;
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
    heroTag: string;
    tagline: string;
    description: string;
    climateFactors: string[];
    architectureStyle: string;
  };
  coverageLocalities: LocalityReference[];
  verifiedInstallations?: VerifiedInstallation[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Regional Configuration Contract (South India Scope)
 */
export interface RegionalConfig {
  id: "south-india";
  name: "South India";
  slug: "south-india";
  operationalAvailability: OperationalAvailability;
  seoIndexingStatus: SeoIndexingStatus;
  productAvailability: ProductAvailabilityMatrix;
  headline: string;
  subheadline: string;
  seo: {
    title: string;
    description: string;
  };
}

/**
 * Campaign Configuration Contract for Multi-Scope Landing Experiences
 */
export interface CampaignConfig {
  campaignId: string;
  scope: CampaignScope;
  stateSlug: StateSlug;
  citySlug?: string;
  productSlug?: ProductSlug;
  canonicalUrl: string;
  operationalAvailability: OperationalAvailability;
  seoIndexingStatus: SeoIndexingStatus;
  eyebrow: string;
  headline: string;
  subheadline: string;
  valueProposition: string[];
  heroImage: {
    desktop: string;
    mobile: string;
    alt: string;
  };
  cta: {
    primaryText: string;
    phoneText: string;
    phoneNumber?: string;
    whatsappText: string;
    whatsappPrefill: string;
    trackingEventId: string;
  };
  schema: {
    breadcrumbs: Array<{ name: string; url: string }>;
    localBusiness?: boolean;
    service?: boolean;
    faqs?: Array<{ question: string; answer: string }>;
  };
}

/**
 * Diagnostic result returned by validation functions
 */
export interface IndexingValidationResult {
  isIndexable: boolean;
  failedConditions: string[];
}
