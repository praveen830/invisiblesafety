/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Core Helper Functions & Matrix Generators
 */

import type { StateSlug, ProductSlug, ProductAvailabilityMatrix } from './types.ts';

export const APPROVED_STATE_SLUGS: StateSlug[] = [
  'andhra',
  'telangana',
  'karnataka',
  'tamil-nadu',
  'kerala'
];

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
 * Approved registered candidate cities by state.
 * Supports primary canonical slugs and registered aliases.
 * Enforces parent-child state-to-city relationship integrity.
 */
export const APPROVED_CITY_SLUGS_BY_STATE: Record<StateSlug, readonly string[]> = {
  andhra: ['vizag', 'vijayawada', 'amaravati', 'visakhapatnam'],
  telangana: ['hyderabad', 'secunderabad'],
  karnataka: ['bengaluru', 'bangalore'],
  'tamil-nadu': ['chennai', 'madras'],
  kerala: ['kochi', 'cochin']
} as const;

/**
 * Creates an independent 7-product availability matrix where every product slot
 * defaults to 'pending_business_confirmation' and 'unpublished'.
 * Modifying one slot in the returned matrix will never mutate other slots.
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

/**
 * Builds canonical URL enforcing strict lowercase, trailing slash, and 4-tier taxonomy.
 */
export function buildCanonicalUrl(stateSlug?: string, citySlug?: string, productSlug?: string): string {
  if (!stateSlug) {
    if (productSlug) {
      return `/south-india/${productSlug.toLowerCase()}/`;
    }
    return '/south-india/';
  }
  if (stateSlug && !citySlug && !productSlug) {
    return `/${stateSlug.toLowerCase()}/`;
  }
  if (stateSlug && !citySlug && productSlug) {
    return `/${stateSlug.toLowerCase()}/${productSlug.toLowerCase()}/`;
  }
  if (stateSlug && citySlug && !productSlug) {
    return `/${stateSlug.toLowerCase()}/${citySlug.toLowerCase()}/`;
  }
  if (stateSlug && citySlug && productSlug) {
    return `/${stateSlug.toLowerCase()}/${citySlug.toLowerCase()}/${productSlug.toLowerCase()}/`;
  }
  return '/south-india/';
}

/**
 * Validates whether a proposed URL strictly adheres to the approved 4-tier taxonomy,
 * validates parent-child relationships (state -> city -> product), and rejects any 5-level,
 * sub-city, neighbourhood, mismatched geography, duplicate separator, or malformed URL.
 */
export function isValidHierarchyUrl(url: string): { isValid: boolean; reason?: string } {
  if (!url || typeof url !== 'string') {
    return { isValid: false, reason: "URL must be a non-empty string." };
  }
  if (!url.startsWith('/')) {
    return { isValid: false, reason: "URL must start with a leading slash ('/')." };
  }
  if (!url.endsWith('/')) {
    return { isValid: false, reason: "URL must enforce a trailing slash ('/')." };
  }
  if (url !== url.toLowerCase()) {
    return { isValid: false, reason: "URL must be strictly lowercase." };
  }
  if (url.includes('//')) {
    return { isValid: false, reason: "URL must not contain duplicate separators ('//')." };
  }
  if (/\s/.test(url)) {
    return { isValid: false, reason: "URL must not contain whitespace." };
  }
  if (url.includes('?') || url.includes('#')) {
    return { isValid: false, reason: "Hierarchy URL must not contain query parameters or fragments." };
  }

  // Split segments (excluding empty strings from leading/trailing slashes)
  const segments = url.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { isValid: false, reason: "URL must contain at least one path segment." };
  }

  // Region: /south-india/ or /south-india/[product]/
  if (segments[0] === 'south-india') {
    if (segments.length === 1) return { isValid: true };
    if (segments.length === 2) {
      if (APPROVED_PRODUCT_SLUGS.includes(segments[1] as ProductSlug)) {
        return { isValid: true };
      }
      return { isValid: false, reason: `Invalid regional product slug '${segments[1]}'. Must be one of the 7 approved products.` };
    }
    return { isValid: false, reason: `Regional hierarchy depth cannot exceed 2 segments. Found ${segments.length} segments.` };
  }

  // State: must be one of the 5 approved states
  const stateSlug = segments[0] as StateSlug;
  if (!APPROVED_STATE_SLUGS.includes(stateSlug)) {
    return { isValid: false, reason: `Invalid state slug '${segments[0]}'. Must be one of the 5 approved states: ${APPROVED_STATE_SLUGS.join(', ')}.` };
  }

  // Segment length 1: State overview (/[state]/)
  if (segments.length === 1) {
    return { isValid: true };
  }

  const validCitiesForState = APPROVED_CITY_SLUGS_BY_STATE[stateSlug] || [];

  // Segment length 2: State product (/[state]/[product]/) OR City overview (/[state]/[city]/)
  if (segments.length === 2) {
    const isProduct = APPROVED_PRODUCT_SLUGS.includes(segments[1] as ProductSlug);
    const isCity = validCitiesForState.includes(segments[1]);

    if (isProduct || isCity) {
      return { isValid: true };
    }

    // Check if it's a known city from another state to give a precise error
    const isCityInOtherState = Object.entries(APPROVED_CITY_SLUGS_BY_STATE).some(
      ([otherState, cList]) => otherState !== stateSlug && cList.includes(segments[1])
    );
    if (isCityInOtherState) {
      return { isValid: false, reason: `City '${segments[1]}' does not belong to state '${stateSlug}'.` };
    }

    return {
      isValid: false,
      reason: `Segment 2 '${segments[1]}' in '/${stateSlug}/${segments[1]}/' is neither an approved product nor an approved city in '${stateSlug}'.`
    };
  }

  // Segment length 3: City + Product (/[state]/[city]/[product]/)
  if (segments.length === 3) {
    const cityCandidate = segments[1];
    const productCandidate = segments[2] as ProductSlug;

    // Validate parent-child relationship: city must belong to this state
    if (!validCitiesForState.includes(cityCandidate)) {
      const isCityInOtherState = Object.entries(APPROVED_CITY_SLUGS_BY_STATE).some(
        ([otherState, cList]) => otherState !== stateSlug && cList.includes(cityCandidate)
      );
      if (isCityInOtherState) {
        return { isValid: false, reason: `City '${cityCandidate}' does not belong to state '${stateSlug}'.` };
      }
      return {
        isValid: false,
        reason: `Segment 2 '${cityCandidate}' is not an approved city in state '${stateSlug}'. Localities or unapproved cities are strictly prohibited.`
      };
    }

    // Validate product is in the 7 approved products
    if (!APPROVED_PRODUCT_SLUGS.includes(productCandidate)) {
      return {
        isValid: false,
        reason: `Segment 3 '${segments[2]}' is not one of the 7 approved product categories.`
      };
    }

    return { isValid: true };
  }

  // Segment length 4 or greater: STRICTLY FORBIDDEN (No neighbourhood or locality URLs)
  return {
    isValid: false,
    reason: `Hierarchy depth of ${segments.length} segments violates the 4-tier taxonomy. Neighbourhood / locality URLs and 5-level routing are strictly prohibited.`
  };
}
