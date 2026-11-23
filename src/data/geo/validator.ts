/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Pure Validation Utilities & Astro Static Path Generator
 * 
 * Enforces the Six Mandatory SEO Conditions for Indexable Status:
 * 1. Confirmed availability for the exact product and location.
 * 2. Actual ability to fulfil the service.
 * 3. Accurate location-specific information.
 * 4. Unique and useful content.
 * 5. Relevant approved imagery.
 * 6. Correct canonical URL.
 */

import type { StateSlug, ProductSlug, IndexingValidationResult } from './types.ts';
import { states } from './states.ts';
import { cities } from './cities.ts';
import { products } from './products.ts';
import { buildCanonicalUrl, isValidHierarchyUrl } from './helpers.ts';

/**
 * Validates the 6 mandatory indexing conditions for an individual City + Product combination.
 * Both the city and the specific product must be confirmed and verified.
 */
export function validateCityProductIndexing(
  stateSlug: StateSlug,
  citySlug: string,
  productSlug: ProductSlug
): IndexingValidationResult {
  const failedConditions: string[] = [];

  const state = states[stateSlug];
  if (!state) {
    return {
      isIndexable: false,
      failedConditions: [`Invalid state '${stateSlug}'. Must be one of the 2 approved states (andhra, telangana).`]
    };
  }

  const city = Object.values(cities).find(c => c.slug === citySlug && c.stateSlug === stateSlug);
  if (!city) {
    return {
      isIndexable: false,
      failedConditions: [`City '${citySlug}' is not registered under state '${stateSlug}'.`]
    };
  }

  const product = products[productSlug];
  if (!product) {
    return {
      isIndexable: false,
      failedConditions: [`Product '${productSlug}' is not in the approved 7-product catalog.`]
    };
  }

  const productAvail = city.productAvailability[productSlug];
  if (!productAvail) {
    return {
      isIndexable: false,
      failedConditions: [`No availability matrix entry found for product '${productSlug}' in city '${city.name}'.`]
    };
  }

  // Condition 1: Confirmed service availability for the exact product and location
  if (productAvail.operationalAvailability !== 'confirmed') {
    failedConditions.push(
      `Condition 1 Failed: Product '${productSlug}' operationalAvailability is '${productAvail.operationalAvailability}', not 'confirmed'.`
    );
  }
  if (productAvail.seoIndexingStatus !== 'indexable') {
    failedConditions.push(
      `Condition 1 Failed: Product '${productSlug}' seoIndexingStatus is '${productAvail.seoIndexingStatus}', not 'indexable'.`
    );
  }

  // Condition 2: Actual ability to fulfil the service (no negative flags if recorded)
  if (productAvail.hasTrainedTechnicians === false) {
    failedConditions.push(
      `Condition 2 Failed: Operational flag indicates trained technicians are currently unavailable for '${productSlug}' in '${city.name}'.`
    );
  }
  if (productAvail.hasMaterialInventory === false) {
    failedConditions.push(
      `Condition 2 Failed: Operational flag indicates material inventory is out of stock for '${productSlug}' in '${city.name}'.`
    );
  }

  // Condition 3: Accurate location-specific information
  if (!city.phone && !city.whatsapp) {
    failedConditions.push(
      `Condition 3 Failed: Missing verified local contact details (phone or WhatsApp) for '${city.name}'.`
    );
  }
  if (!city.localContext || !city.localContext.description || city.localContext.description.trim().length === 0) {
    failedConditions.push(
      `Condition 3 Failed: Incomplete local context description for '${city.name}'.`
    );
  }

  // Condition 4: Unique and useful content
  if (!city.localContext.climateFactors || city.localContext.climateFactors.length === 0) {
    failedConditions.push(
      `Condition 4 Failed: No localized climate or engineering factors documented for '${city.name}'.`
    );
  }

  // Condition 5: Relevant approved imagery (Separate desktop & mobile WebP assets)
  if (!product.heroAssets || !product.heroAssets.desktopWebp || !product.heroAssets.mobileWebp) {
    failedConditions.push(
      `Condition 5 Failed: Missing approved Phase 3.8/3.9 hero WebP assets for '${productSlug}'.`
    );
  } else {
    if (product.heroAssets.desktopWebp === product.heroAssets.mobileWebp) {
      failedConditions.push(
        `Condition 5 Failed: Desktop and mobile hero assets cannot be identical for '${productSlug}'.`
      );
    }
  }

  // Condition 6: Correct canonical URL
  const canonicalUrl = buildCanonicalUrl(stateSlug, citySlug, productSlug);
  const urlCheck = isValidHierarchyUrl(canonicalUrl);
  if (!urlCheck.isValid) {
    failedConditions.push(`Condition 6 Failed: ${urlCheck.reason}`);
  }

  return {
    isIndexable: failedConditions.length === 0,
    failedConditions
  };
}

/**
 * Validates State-Level Product Campaign Coverage (/[state]/[product]/).
 * State-wide campaigns require independently validated service coverage.
 * One confirmed city does not automatically authorize a state-wide campaign.
 */
export function validateStateProductIndexing(
  stateSlug: StateSlug,
  productSlug: ProductSlug
): IndexingValidationResult {
  const failedConditions: string[] = [];

  const state = states[stateSlug];
  if (!state) {
    return {
      isIndexable: false,
      failedConditions: [`Invalid state '${stateSlug}'.`]
    };
  }

  const product = products[productSlug];
  if (!product) {
    return {
      isIndexable: false,
      failedConditions: [`Invalid product '${productSlug}'.`]
    };
  }

  const stateProductAvail = state.productAvailability[productSlug];
  if (!stateProductAvail || stateProductAvail.operationalAvailability !== 'confirmed') {
    failedConditions.push(
      `Condition 1 Failed: State-level coverage for '${productSlug}' in '${state.name}' is not confirmed.`
    );
  }
  if (!stateProductAvail || stateProductAvail.seoIndexingStatus !== 'indexable') {
    failedConditions.push(
      `Condition 1 Failed: State-level SEO status for '${productSlug}' in '${state.name}' is not 'indexable'.`
    );
  }

  // State-wide campaign requires verified coverage across multiple hubs in that state
  const stateCities = Object.values(cities).filter(c => c.stateSlug === stateSlug);
  const confirmedCities = stateCities.filter(
    c => c.productAvailability[productSlug]?.operationalAvailability === 'confirmed'
  );

  if (confirmedCities.length === 0) {
    failedConditions.push(
      `Condition 2 Failed: No individual cities within '${state.name}' have verified availability for '${productSlug}'.`
    );
  }

  const canonicalUrl = buildCanonicalUrl(stateSlug, undefined, productSlug);
  const urlCheck = isValidHierarchyUrl(canonicalUrl);
  if (!urlCheck.isValid) {
    failedConditions.push(`Condition 6 Failed: ${urlCheck.reason}`);
  }

  return {
    isIndexable: failedConditions.length === 0,
    failedConditions
  };
}

/**
 * High-level boolean check for route indexability across any level of the hierarchy
 */
export function isRouteIndexable(
  stateSlug?: string,
  citySlug?: string,
  productSlug?: string
): boolean {
  if (!stateSlug) {
    return false;
  }

  // State Root (/[state]/)
  if (stateSlug && !citySlug && !productSlug) {
    const state = states[stateSlug as StateSlug];
    return Boolean(
      state &&
      state.operationalAvailability === 'confirmed' &&
      state.seoIndexingStatus === 'indexable'
    );
  }

  // State Product (/[state]/[product]/)
  if (stateSlug && !citySlug && productSlug) {
    return validateStateProductIndexing(stateSlug as StateSlug, productSlug as ProductSlug).isIndexable;
  }

  // City Root (/[state]/[city]/)
  if (stateSlug && citySlug && !productSlug) {
    const city = Object.values(cities).find(c => c.slug === citySlug && c.stateSlug === stateSlug);
    return Boolean(
      city &&
      city.operationalAvailability === 'confirmed' &&
      city.seoIndexingStatus === 'indexable'
    );
  }

  // City + Product (/[state]/[city]/[product]/)
  if (stateSlug && citySlug && productSlug) {
    return validateCityProductIndexing(
      stateSlug as StateSlug,
      citySlug,
      productSlug as ProductSlug
    ).isIndexable;
  }

  return false;
}

/**
 * Returns static paths for Astro getStaticPaths() for /[state]/[city]/[product]/.
 * Strictly returns ONLY combinations that meet all six approved indexing conditions.
 * When all initial records are unconfirmed, this safely returns an empty array [].
 */
export function getConfirmedCityProductPaths(): Array<{
  params: { state: string; city: string; product: string };
  props: { state: any; city: any; product: any };
}> {
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
          params: {
            state: state.slug,
            city: city.slug,
            product: product.slug
          },
          props: { state, city, product }
        });
      }
    }
  }

  return paths;
}
