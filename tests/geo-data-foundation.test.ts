/**
 * Automated Unit Test Suite for Astro Location Data Foundation
 * Uses Node.js native test runner (node:test & node:assert)
 * 
 * Verifies Phase 5.0 Data Foundation Integrity:
 * - 5 State Configurations
 * - 7 Product Configurations
 * - Physical Image Asset Existence (14 Files)
 * - Initial 49 City-Product Matrix
 * - Safe Pending & Unpublished Defaults
 * - Strict Product & City Isolation
 * - State & Regional Coverage Gates
 * - Invalid Hierarchy & Locality Route Rejection
 * - Empty Array Static Path Return on Defaults
 */

import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import {
  states,
  regionalSouthIndia,
  cities,
  products,
  APPROVED_STATE_SLUGS,
  APPROVED_PRODUCT_SLUGS,
  createDefaultProductAvailabilityMatrix,
  isValidHierarchyUrl,
  buildCanonicalUrl,
  isRouteIndexable,
  validateCityProductIndexing,
  validateStateProductIndexing,
  validateRegionalProductIndexing,
  getConfirmedCityProductPaths,
  resolveCampaignConfig
} from '../src/data/geo/index.ts';

import type { ProductSlug, CityConfig } from '../src/data/geo/types.ts';

test('1. State Configuration — All 5 approved states must exist with safe defaults', () => {
  assert.strictEqual(APPROVED_STATE_SLUGS.length, 5, 'Must have exactly 5 approved state slugs');
  assert.deepStrictEqual(
    APPROVED_STATE_SLUGS,
    ['andhra', 'telangana', 'karnataka', 'tamil-nadu', 'kerala'],
    'Approved states must match exact specification'
  );

  for (const slug of APPROVED_STATE_SLUGS) {
    const state = states[slug];
    assert.ok(state, `State config for '${slug}' must exist`);
    assert.strictEqual(state.slug, slug, `State slug must match key '${slug}'`);
    assert.strictEqual(
      state.operationalAvailability,
      'pending_business_confirmation',
      `State '${slug}' must default to 'pending_business_confirmation'`
    );
    assert.strictEqual(
      state.seoIndexingStatus,
      'unpublished',
      `State '${slug}' must default to 'unpublished'`
    );
    assert.ok(state.headline.length > 10, `State '${slug}' must have descriptive headline`);
    assert.ok(state.subheadline.length > 20, `State '${slug}' must have descriptive subheadline`);
    assert.ok(state.regionalContext.climateOverview.length > 10, `State '${slug}' must have climateOverview`);
    assert.ok(state.regionalContext.primaryConcerns.length >= 2, `State '${slug}' must document primary concerns`);
  }

  // Regional South India Root Config
  assert.strictEqual(regionalSouthIndia.id, 'south-india');
  assert.strictEqual(regionalSouthIndia.operationalAvailability, 'pending_business_confirmation');
  assert.strictEqual(regionalSouthIndia.seoIndexingStatus, 'unpublished');
});

test('2. Product Configuration — Exactly 7 approved products must exist with full technical specs', () => {
  assert.strictEqual(APPROVED_PRODUCT_SLUGS.length, 7, 'Must have exactly 7 approved product slugs');
  assert.deepStrictEqual(
    APPROVED_PRODUCT_SLUGS,
    [
      'invisible-grills',
      'balcony-safety-nets',
      'child-safety-nets',
      'pigeon-safety-nets',
      'sports-nets',
      'cloth-drying-hangers',
      'bird-spikes'
    ],
    'Approved products must match exact catalogue'
  );

  const productKeys = Object.keys(products);
  assert.strictEqual(productKeys.length, 7, 'Products registry must contain exactly 7 products');

  for (const slug of APPROVED_PRODUCT_SLUGS) {
    const product = products[slug];
    assert.ok(product, `Product config for '${slug}' must exist`);
    assert.strictEqual(product.slug, slug, `Product slug must match key '${slug}'`);
    assert.ok(product.name.length > 3, `Product '${slug}' must have name`);
    if (product.materialGrade) {
      assert.ok(product.materialGrade.length > 3, `Product '${slug}' must specify descriptive material`);
    }
    // Factual Safety Check: Unverified warranty and load ratings must NOT be asserted or fabricated
    assert.strictEqual(product.warrantyYears, undefined, `Product '${slug}' must not specify unverified warranty years`);
    assert.strictEqual(product.breakLoadKg, undefined, `Product '${slug}' must not specify unverified break load`);
    assert.ok(product.coreFeatures.length >= 3, `Product '${slug}' must specify at least 3 core features`);
    assert.ok(product.technicalSpecs.length >= 3, `Product '${slug}' must specify at least 3 technical specs`);
    assert.ok(product.defaultFaqs.length >= 1, `Product '${slug}' must provide default FAQs`);
  }
});

test('3. Responsive Hero Asset Verification — All 14 WebP image files must physically exist on disk', () => {
  const rootDir = process.cwd();

  for (const slug of APPROVED_PRODUCT_SLUGS) {
    const product = products[slug];
    assert.ok(product.heroAssets, `Product '${slug}' must have heroAssets`);
    
    // Desktop asset
    assert.ok(product.heroAssets.desktopWebp.endsWith('.webp'), `Desktop asset for '${slug}' must be .webp`);
    assert.ok(product.heroAssets.desktopWebp.startsWith('/images/'), `Desktop asset for '${slug}' must be in /images/`);
    const desktopDiskPath = path.join(rootDir, 'public', product.heroAssets.desktopWebp.replace(/^\//, ''));
    assert.ok(
      fs.existsSync(desktopDiskPath),
      `Desktop WebP file must physically exist at: ${desktopDiskPath}`
    );

    // Mobile asset
    assert.ok(product.heroAssets.mobileWebp.endsWith('.webp'), `Mobile asset for '${slug}' must be .webp`);
    assert.ok(product.heroAssets.mobileWebp.startsWith('/images/'), `Mobile asset for '${slug}' must be in /images/`);
    const mobileDiskPath = path.join(rootDir, 'public', product.heroAssets.mobileWebp.replace(/^\//, ''));
    assert.ok(
      fs.existsSync(mobileDiskPath),
      `Mobile WebP file must physically exist at: ${mobileDiskPath}`
    );

    // Composition check: Desktop and mobile must be distinct files
    assert.notStrictEqual(
      product.heroAssets.desktopWebp,
      product.heroAssets.mobileWebp,
      `Product '${slug}' must have separate desktop and mobile compositions (no cross-device reuse)`
    );
  }
});

test('4. Duplicate Slug Detection — All state, city, and product slugs must be unique', () => {
  // State slugs
  const stateSlugs = Object.keys(states);
  const uniqueStateSlugs = new Set(stateSlugs);
  assert.strictEqual(stateSlugs.length, uniqueStateSlugs.size, 'State slugs must be unique');

  // Product slugs
  const prodSlugs = Object.keys(products);
  const uniqueProdSlugs = new Set(prodSlugs);
  assert.strictEqual(prodSlugs.length, uniqueProdSlugs.size, 'Product slugs must be unique');

  // City slugs
  const citySlugs = Object.values(cities).map(c => c.slug);
  const uniqueCitySlugs = new Set(citySlugs);
  assert.strictEqual(citySlugs.length, uniqueCitySlugs.size, 'City slugs must be unique');
});

test('5. Initial 49 City-Product Matrix — All records must default to pending and unpublished', () => {
  const cityList = Object.values(cities);
  assert.ok(cityList.length >= 7, 'Must have at least 7 seed candidate cities');

  let totalSlotsCount = 0;

  for (const city of cityList) {
    // City-level defaults
    assert.strictEqual(
      city.operationalAvailability,
      'pending_business_confirmation',
      `City '${city.slug}' must default to 'pending_business_confirmation'`
    );
    assert.strictEqual(
      city.seoIndexingStatus,
      'unpublished',
      `City '${city.slug}' must default to 'unpublished'`
    );

    // 7 products per city
    for (const prodSlug of APPROVED_PRODUCT_SLUGS) {
      totalSlotsCount++;
      const slot = city.productAvailability[prodSlug];
      assert.ok(slot, `City '${city.slug}' must have product slot for '${prodSlug}'`);
      assert.strictEqual(slot.productSlug, prodSlug, 'Slot productSlug must match');
      assert.strictEqual(
        slot.operationalAvailability,
        'pending_business_confirmation',
        `Slot '${city.slug}' + '${prodSlug}' must default to 'pending_business_confirmation'`
      );
      assert.strictEqual(
        slot.seoIndexingStatus,
        'unpublished',
        `Slot '${city.slug}' + '${prodSlug}' must default to 'unpublished'`
      );
    }
  }

  assert.strictEqual(
    totalSlotsCount,
    cityList.length * 7,
    `Expected exactly ${cityList.length * 7} total city-product slots across ${cityList.length} candidate cities`
  );
});

test('6. Product Isolation Test — Confirming one product in a city does NOT change any other product', () => {
  // Create an isolated city copy using the matrix generator
  const testMatrix = createDefaultProductAvailabilityMatrix();
  
  // Mutate product 1 (invisible-grills)
  testMatrix['invisible-grills'].operationalAvailability = 'confirmed';
  testMatrix['invisible-grills'].seoIndexingStatus = 'indexable';

  // Verify product 1 is confirmed
  assert.strictEqual(testMatrix['invisible-grills'].operationalAvailability, 'confirmed');
  assert.strictEqual(testMatrix['invisible-grills'].seoIndexingStatus, 'indexable');

  // Verify the other 6 products remain strictly 'pending_business_confirmation' and 'unpublished'
  const otherProducts: ProductSlug[] = [
    'balcony-safety-nets',
    'child-safety-nets',
    'pigeon-safety-nets',
    'sports-nets',
    'cloth-drying-hangers',
    'bird-spikes'
  ];

  for (const otherProd of otherProducts) {
    assert.strictEqual(
      testMatrix[otherProd].operationalAvailability,
      'pending_business_confirmation',
      `Product '${otherProd}' must remain 'pending_business_confirmation' when invisible-grills is confirmed`
    );
    assert.strictEqual(
      testMatrix[otherProd].seoIndexingStatus,
      'unpublished',
      `Product '${otherProd}' must remain 'unpublished' when invisible-grills is confirmed`
    );
  }
});

test('7. City Isolation Test — Confirming a product in City A does NOT change City B', () => {
  const cityA: CityConfig = {
    ...cities.vizag,
    productAvailability: createDefaultProductAvailabilityMatrix()
  };
  const cityB: CityConfig = {
    ...cities.hyderabad,
    productAvailability: createDefaultProductAvailabilityMatrix()
  };

  // Mutate City A
  cityA.productAvailability['invisible-grills'].operationalAvailability = 'confirmed';

  // Verify City B is untouched
  assert.strictEqual(cityA.productAvailability['invisible-grills'].operationalAvailability, 'confirmed');
  assert.strictEqual(
    cityB.productAvailability['invisible-grills'].operationalAvailability,
    'pending_business_confirmation',
    'City B must not be altered when City A is confirmed'
  );
});

test('8. State & Regional Coverage Gates — Premature state/regional indexing is blocked', () => {
  // City product check when city product is pending
  const cityProdCheck = validateCityProductIndexing('andhra', 'vizag', 'invisible-grills');
  assert.strictEqual(cityProdCheck.isIndexable, false, 'City product must not be indexable on default pending slot');
  assert.ok(cityProdCheck.failedConditions.some(c => c.includes('Condition 1 Failed')), 'Must cite Condition 1 failure');

  // State product check when state is pending
  const stateCheck = validateStateProductIndexing('andhra', 'invisible-grills');
  assert.strictEqual(stateCheck.isIndexable, false, 'State product must not be indexable on default pending state');
  assert.ok(stateCheck.failedConditions.length > 0, 'Must report failed conditions for state product');

  // Regional product check when regional is pending
  const regCheck = validateRegionalProductIndexing('invisible-grills');
  assert.strictEqual(regCheck.isIndexable, false, 'Regional product must not be indexable on default pending regional');
  assert.ok(regCheck.failedConditions.length > 0, 'Must report failed conditions for regional product');
});

test('9. Invalid Hierarchy & Locality Route Rejection — No 5-level or area URLs permitted', () => {
  // Canonical URL construction
  assert.strictEqual(buildCanonicalUrl('andhra', 'vizag', 'invisible-grills'), '/andhra/vizag/invisible-grills/');
  assert.strictEqual(buildCanonicalUrl('andhra', 'vizag'), '/andhra/vizag/');
  assert.strictEqual(buildCanonicalUrl('andhra'), '/andhra/');
  assert.strictEqual(buildCanonicalUrl(), '/south-india/');

  // 1. Valid URLs across all 4 tiers
  assert.strictEqual(isValidHierarchyUrl('/south-india/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/south-india/invisible-grills/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/andhra/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/andhra/invisible-grills/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag/invisible-grills/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/telangana/hyderabad/balcony-safety-nets/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/karnataka/bengaluru/child-safety-nets/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/tamil-nadu/chennai/pigeon-safety-nets/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/kerala/kochi/sports-nets/').isValid, true);

  // 2. Invalid: Unknown state slugs
  const unknownState1 = isValidHierarchyUrl('/delhi/');
  assert.strictEqual(unknownState1.isValid, false, 'Must reject unknown state Delhi');
  assert.ok(unknownState1.reason?.includes('Invalid state slug'), 'Must cite invalid state slug');

  const unknownState2 = isValidHierarchyUrl('/maharashtra/mumbai/');
  assert.strictEqual(unknownState2.isValid, false, 'Must reject unknown state Maharashtra');

  // 3. Invalid: Cities that do NOT belong to the specified state (Parent-child validation)
  const wrongStateCity1 = isValidHierarchyUrl('/andhra/mumbai/');
  assert.strictEqual(wrongStateCity1.isValid, false, 'Must reject Mumbai under Andhra Pradesh');

  const wrongStateCity2 = isValidHierarchyUrl('/andhra/bengaluru/');
  assert.strictEqual(wrongStateCity2.isValid, false, 'Must reject Bengaluru under Andhra Pradesh');
  assert.ok(wrongStateCity2.reason?.includes('does not belong to state'), 'Must cite city state mismatch');

  const wrongStateCity3 = isValidHierarchyUrl('/telangana/chennai/');
  assert.strictEqual(wrongStateCity3.isValid, false, 'Must reject Chennai under Telangana');

  const wrongStateCity4 = isValidHierarchyUrl('/karnataka/vizag/child-safety-nets/');
  assert.strictEqual(wrongStateCity4.isValid, false, 'Must reject Vizag under Karnataka');
  assert.ok(wrongStateCity4.reason?.includes('does not belong to state'), 'Must cite city state mismatch in 3-segment URL');

  // 4. Invalid: Unapproved product categories
  const unapprovedProd1 = isValidHierarchyUrl('/south-india/car-parking/');
  assert.strictEqual(unapprovedProd1.isValid, false, 'Must reject unapproved product at regional level');

  const unapprovedProd2 = isValidHierarchyUrl('/andhra/vizag/coconut-nets/');
  assert.strictEqual(unapprovedProd2.isValid, false, 'Must reject unapproved product coconut-nets');

  // 5. Invalid: Locality / Sub-city / Neighbourhood URLs
  const invalidLocality1 = isValidHierarchyUrl('/andhra/vizag/beach-road/');
  assert.strictEqual(invalidLocality1.isValid, false, 'Must reject locality Beach Road');

  const invalidLocality2 = isValidHierarchyUrl('/telangana/hyderabad/gachibowli/');
  assert.strictEqual(invalidLocality2.isValid, false, 'Must reject locality Gachibowli');

  const invalidLocality3 = isValidHierarchyUrl('/karnataka/bengaluru/whitefield/');
  assert.strictEqual(invalidLocality3.isValid, false, 'Must reject locality Whitefield');

  // 6. Invalid: 4+ segments (5-level hierarchy violations)
  const invalidDepth1 = isValidHierarchyUrl('/andhra/vizag/mvp-colony/invisible-grills/');
  assert.strictEqual(invalidDepth1.isValid, false, '5-segment URL must be rejected');
  assert.ok(invalidDepth1.reason?.includes('Hierarchy depth'), 'Must cite depth violation');

  const invalidDepth2 = isValidHierarchyUrl('/telangana/hyderabad/gachibowli/balcony-safety-nets/');
  assert.strictEqual(invalidDepth2.isValid, false, 'Locality-level URL must be rejected');

  // 7. Invalid: Malformed paths & duplicate separators
  assert.strictEqual(isValidHierarchyUrl('//andhra/vizag/').isValid, false, 'Must reject duplicate leading slash');
  assert.strictEqual(isValidHierarchyUrl('/andhra//vizag/').isValid, false, 'Must reject duplicate internal slash');
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag//').isValid, false, 'Must reject duplicate trailing slash');
  assert.strictEqual(isValidHierarchyUrl('andhra/vizag/').isValid, false, 'Must reject missing leading slash');
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag').isValid, false, 'Must reject missing trailing slash');
  assert.strictEqual(isValidHierarchyUrl('/Andhra/Vizag/').isValid, false, 'Must reject uppercase characters');
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag /').isValid, false, 'Must reject whitespace');
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag/?ref=test').isValid, false, 'Must reject query parameter');
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag/#hash').isValid, false, 'Must reject fragment');
});

test('10. Safe Defaults: getConfirmedCityProductPaths() must return empty array on defaults', () => {
  const paths = getConfirmedCityProductPaths();
  assert.strictEqual(
    paths.length,
    0,
    'getConfirmedCityProductPaths() must return exactly 0 paths when all initial records are unconfirmed'
  );
  assert.deepStrictEqual(paths, [], 'Must be an empty array');
});

test('11. Safe Defaults: isRouteIndexable() must return false for all default routes', () => {
  assert.strictEqual(isRouteIndexable(), false, 'Regional South India root must not be indexable');
  assert.strictEqual(isRouteIndexable(undefined, undefined, 'invisible-grills'), false, 'Regional product must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra'), false, 'State root must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', undefined, 'invisible-grills'), false, 'State product must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', 'vizag'), false, 'City root must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', 'vizag', 'invisible-grills'), false, 'City product must not be indexable');
});

test('12. Locality Treatment — Coverage localities are strictly descriptive chips', () => {
  for (const city of Object.values(cities)) {
    assert.ok(city.coverageLocalities.length > 0, `City '${city.name}' must have descriptive coverageLocalities`);
    for (const loc of city.coverageLocalities) {
      assert.ok(loc.name.length > 0, 'Locality chip must have name');
      assert.ok(loc.description.length > 0, 'Locality chip must have description');
      // Verify no URL field exists on LocalityReference
      assert.strictEqual((loc as any).url, undefined, 'LocalityReference must NOT contain a URL property');
      assert.strictEqual((loc as any).href, undefined, 'LocalityReference must NOT contain an href property');
      assert.strictEqual((loc as any).slug, undefined, 'LocalityReference must NOT contain a slug property');
    }
  }
});

test('13. Campaign Configuration Engine — Resolves all 4 scopes with proper IDs and breadcrumbs', () => {
  // Scope 1: Regional
  const regCamp = resolveCampaignConfig('south-india', 'telangana', undefined, 'invisible-grills');
  assert.strictEqual(regCamp.scope, 'south-india');
  assert.strictEqual(regCamp.campaignId, 'cmp-southindia-invisible-grills-2026');
  assert.strictEqual(regCamp.canonicalUrl, '/south-india/invisible-grills/');

  // Scope 2: State
  const stateCamp = resolveCampaignConfig('state', 'andhra', undefined, 'balcony-safety-nets');
  assert.strictEqual(stateCamp.scope, 'state');
  assert.strictEqual(stateCamp.campaignId, 'cmp-andhra-balcony-safety-nets-2026');
  assert.strictEqual(stateCamp.canonicalUrl, '/andhra/balcony-safety-nets/');

  // Scope 3: City
  const cityCamp = resolveCampaignConfig('city', 'telangana', 'hyderabad');
  assert.strictEqual(cityCamp.scope, 'city');
  assert.strictEqual(cityCamp.campaignId, 'cmp-telangana-hyderabad-city-2026');
  assert.strictEqual(cityCamp.canonicalUrl, '/telangana/hyderabad/');

  // Scope 4: City + Product
  const deepCamp = resolveCampaignConfig('city-product', 'andhra', 'vizag', 'child-safety-nets');
  assert.strictEqual(deepCamp.scope, 'city-product');
  assert.strictEqual(deepCamp.campaignId, 'cmp-andhra-vizag-child-safety-nets-2026');
  assert.strictEqual(deepCamp.canonicalUrl, '/andhra/vizag/child-safety-nets/');
  assert.strictEqual(deepCamp.schema.breadcrumbs.length, 5, 'City + Product breadcrumb must have 5 positions');
});

const PROHIBITED_PATTERNS = [
  { name: 'AISI 316', regex: /aisi\s*316/i },
  { name: 'SS316 / SS304', regex: /ss\s*316|ss\s*304|ss\s*201/i },
  { name: 'Japanese Marine Grade', regex: /japanese\s*marine/i },
  { name: 'Marine Grade', regex: /marine\s*grade/i },
  { name: '400+ kg / Load Claims', regex: /400\+?\s*kg|break[- ]?load/i },
  { name: '10-Year / Specific Warranties', regex: /10[- ]year|5[- ]year|3[- ]year|lifetime\s*immunity/i },
  { name: 'DuPont', regex: /dupont/i },
  { name: 'Virgin Polymer / Nylon', regex: /virgin/i },
  { name: 'IS-tested / Testing Claims', regex: /is[- ]tested|drop[- ]tested/i },
  { name: 'Surgical Grade', regex: /surgical/i },
  { name: 'Specific Velocity (140+ km/h)', regex: /140\+?\s*km/i },
  { name: 'Absolute Percentages (99% / 98% / 100%)', regex: /99%|98%|100%\s*pure|100%\s*pigeon|100%\s*natural/i },
  { name: 'Molybdenum', regex: /molybdenum/i },
  // Phase 5.1.3 Technical & Material Claims Prohibitions:
  { name: 'Structural Slab Anchoring', regex: /structural\s*slab/i },
  { name: 'Reinforced concrete perimeter slabs', regex: /reinforced\s*concrete\s*perimeter/i },
  { name: 'Specialized anchor tracks', regex: /specialized\s*anchor/i },
  { name: 'Corrosion-resistant claims', regex: /corrosion-resistant/i },
  { name: 'High-Tensile Wire Cables / Claims', regex: /high-tensile/i },
  { name: 'UV-Stabilized Netting / Casing', regex: /uv-stabilized/i },
  { name: 'Dimension-Based Pricing', regex: /dimension-based\s*pricing/i },
  { name: 'Residential Fall Protection', regex: /residential\s*fall\s*protection/i }
];

test('14. Factual Safety — Zero prohibited claims in all 7 product configurations', () => {
  for (const slug of APPROVED_PRODUCT_SLUGS) {
    const product = products[slug];
    const serialized = JSON.stringify(product);

    for (const { name, regex } of PROHIBITED_PATTERNS) {
      assert.strictEqual(
        regex.test(serialized),
        false,
        `Product '${slug}' must not contain prohibited claim '${name}'. Found match in: ${serialized}`
      );
    }
  }
});

test('15. Factual Safety — Zero prohibited claims in state & regional configurations', () => {
  for (const slug of APPROVED_STATE_SLUGS) {
    const state = states[slug];
    const serialized = JSON.stringify(state);

    for (const { name, regex } of PROHIBITED_PATTERNS) {
      assert.strictEqual(
        regex.test(serialized),
        false,
        `State '${slug}' must not contain prohibited claim '${name}'. Found match in: ${serialized}`
      );
    }
  }

  const regSerialized = JSON.stringify(regionalSouthIndia);
  for (const { name, regex } of PROHIBITED_PATTERNS) {
    assert.strictEqual(
      regex.test(regSerialized),
      false,
      `Regional South India must not contain prohibited claim '${name}'.`
    );
  }
});

test('16. Factual Safety — Zero prohibited claims in candidate city configurations', () => {
  for (const city of Object.values(cities)) {
    const serialized = JSON.stringify(city);

    for (const { name, regex } of PROHIBITED_PATTERNS) {
      assert.strictEqual(
        regex.test(serialized),
        false,
        `City '${city.slug}' must not contain prohibited claim '${name}'. Found match in: ${serialized}`
      );
    }
  }
});

test('17. Factual Safety — Zero prohibited claims in campaign resolution engine outputs', () => {
  // Test all 4 scopes
  const regCamp = resolveCampaignConfig('south-india', 'telangana', undefined, 'invisible-grills');
  const stateCamp = resolveCampaignConfig('state', 'andhra', undefined, 'balcony-safety-nets');
  const cityCamp = resolveCampaignConfig('city', 'telangana', 'hyderabad');
  const deepCamp = resolveCampaignConfig('city-product', 'andhra', 'vizag', 'child-safety-nets');

  const campaigns = [regCamp, stateCamp, cityCamp, deepCamp];

  for (const camp of campaigns) {
    const serialized = JSON.stringify(camp);
    for (const { name, regex } of PROHIBITED_PATTERNS) {
      assert.strictEqual(
        regex.test(serialized),
        false,
        `Campaign '${camp.campaignId}' must not contain prohibited claim '${name}'.`
      );
    }
  }
});

test('18. Factual Safety — Safe handling of missing warranty & load fields (no fabrication)', () => {
  for (const slug of APPROVED_PRODUCT_SLUGS) {
    const product = products[slug];
    // Fields must be undefined rather than fabricated numbers or strings
    assert.strictEqual(product.warrantyYears, undefined, `Product '${slug}' warrantyYears must be undefined`);
    assert.strictEqual(product.breakLoadKg, undefined, `Product '${slug}' breakLoadKg must be undefined`);
  }

  // Confirm validation utilities execute without error when warrantyYears and breakLoadKg are missing
  const cityProdCheck = validateCityProductIndexing('andhra', 'vizag', 'invisible-grills');
  assert.strictEqual(typeof cityProdCheck.isIndexable, 'boolean');

  const stateCheck = validateStateProductIndexing('andhra', 'invisible-grills');
  assert.strictEqual(typeof stateCheck.isIndexable, 'boolean');

  const regCheck = validateRegionalProductIndexing('invisible-grills');
  assert.strictEqual(typeof regCheck.isIndexable, 'boolean');
});
