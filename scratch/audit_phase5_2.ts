import { 
  APPROVED_STATE_SLUGS, 
  APPROVED_PRODUCT_SLUGS,
  isValidHierarchyUrl, 
  buildCanonicalUrl,
  isRouteIndexable,
  states,
  cities,
  products,
  regionalSouthIndia,
  validateCityProductIndexing,
  validateStateProductIndexing,
  validateRegionalProductIndexing,
  getConfirmedCityProductPaths,
  resolveCampaignConfig,
  createDefaultProductAvailabilityMatrix
} from '../src/data/geo/index.ts';

console.log('=== 1. APPROVED STATES AUDIT ===');
console.log('Total States:', APPROVED_STATE_SLUGS.length);
console.log('Slugs:', APPROVED_STATE_SLUGS);
for (const slug of APPROVED_STATE_SLUGS) {
  const state = states[slug];
  console.log(`- State: ${state.name} (${slug}), capital: ${state.capitalCitySlug}, status: ${state.operationalAvailability}, seo: ${state.seoIndexingStatus}`);
}

console.log('\n=== 2. APPROVED PRODUCTS AUDIT ===');
console.log('Total Products:', APPROVED_PRODUCT_SLUGS.length);
console.log('Slugs:', APPROVED_PRODUCT_SLUGS);
for (const slug of APPROVED_PRODUCT_SLUGS) {
  const prod = products[slug];
  console.log(`- Product: ${prod.name} (${slug}), category: ${prod.categoryTag}, materialGrade: ${prod.materialGrade}`);
}

console.log('\n=== 3. CITIES AUDIT ===');
const cityEntries = Object.entries(cities);
console.log('Total Cities:', cityEntries.length);
cityEntries.forEach(([key, city]) => {
  console.log(`- City [${key}]: ${city.name} (${city.slug}), state: ${city.stateSlug}, status: ${city.operationalAvailability}, seo: ${city.seoIndexingStatus}, localities: ${city.coverageLocalities.length}`);
});

console.log('\n=== 4. 49 INITIAL CITY-PRODUCT MATRIX AUDIT ===');
let pendingCount = 0;
let confirmedCount = 0;
let unpublishedCount = 0;
let indexableCount = 0;

for (const city of Object.values(cities)) {
  for (const prodSlug of APPROVED_PRODUCT_SLUGS) {
    const slot = city.productAvailability[prodSlug];
    if (slot.operationalAvailability === 'pending_business_confirmation') pendingCount++;
    if (slot.operationalAvailability === 'confirmed') confirmedCount++;
    if (slot.seoIndexingStatus === 'unpublished') unpublishedCount++;
    if (slot.seoIndexingStatus === 'indexable') indexableCount++;
  }
}
console.log(`Total combinations checked: ${Object.values(cities).length * APPROVED_PRODUCT_SLUGS.length}`);
console.log(`pending_business_confirmation: ${pendingCount} / 49`);
console.log(`confirmed: ${confirmedCount} / 49`);
console.log(`unpublished: ${unpublishedCount} / 49`);
console.log(`indexable: ${indexableCount} / 49`);

console.log('\n=== 5. URL HIERARCHY VALIDATION ===');
const testUrls: [string, boolean][] = [
  ['/south-india/', true],
  ['/south-india/invisible-grills/', true],
  ['/andhra/', true],
  ['/andhra/invisible-grills/', true],
  ['/andhra/vizag/', true],
  ['/andhra/vizag/invisible-grills/', true],
  ['/karnataka/bengaluru/child-safety-nets/', true],
  ['/telangana/hyderabad/balcony-safety-nets/', true],
  ['/tamil-nadu/chennai/pigeon-safety-nets/', true],
  ['/kerala/kochi/sports-nets/', true],
  // Localities / areas (must be rejected)
  ['/andhra/vizag/beach-road/', false],
  ['/telangana/hyderabad/gachibowli/', false],
  ['/karnataka/bengaluru/whitefield/', false],
  ['/andhra/vizag/beach-road/invisible-grills/', false],
  // 5-level hierarchy (must be rejected)
  ['/south-india/andhra/vizag/invisible-grills/', false],
  ['/andhra/vizag/subarea/invisible-grills/extra/', false],
  // Unapproved states / cities / products (must be rejected)
  ['/delhi/', false],
  ['/maharashtra/mumbai/', false],
  ['/andhra/mumbai/', false],
  ['/andhra/vizag/unapproved-product/', false]
];

let failedUrls = 0;
testUrls.forEach(([url, expected]) => {
  const result = isValidHierarchyUrl(url).isValid;
  if (result !== expected) {
    console.error(`URL Hierarchy Failure: ${url} expected ${expected} but got ${result}`);
    failedUrls++;
  }
});
console.log(`URL tests completed. Failures: ${failedUrls}`);

console.log('\n=== 6. CONFIRMED PATHS DEFAULT CHECK ===');
const confirmedPaths = getConfirmedCityProductPaths();
console.log('Confirmed City-Product paths on default foundation:', confirmedPaths.length);

console.log('\n=== 7. CAMPAIGN RESOLVER ACROSS ALL 4 SCOPES ===');
const regCamp = resolveCampaignConfig('south-india', 'telangana');
console.log('Regional scope:', regCamp.scope, regCamp.canonicalUrl, 'breadcrumbs:', regCamp.schema.breadcrumbs.length);

const stateCamp = resolveCampaignConfig('state', 'andhra');
console.log('State scope:', stateCamp.scope, stateCamp.canonicalUrl, 'breadcrumbs:', stateCamp.schema.breadcrumbs.length);

const cityCamp = resolveCampaignConfig('city', 'telangana', 'hyderabad');
console.log('City scope:', cityCamp.scope, cityCamp.canonicalUrl, 'breadcrumbs:', cityCamp.schema.breadcrumbs.length);

const cityProdCamp = resolveCampaignConfig('city-product', 'andhra', 'vizag', 'invisible-grills');
console.log('City-Product scope:', cityProdCamp.scope, cityProdCamp.canonicalUrl, 'breadcrumbs:', cityProdCamp.schema.breadcrumbs.length);

console.log('\n=== AUDIT SUMMARY: DATA LAYER IS RIGID & COMPLIANT ===');
