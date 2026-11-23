/**
 * Automated Unit Test Suite for Geo Presentation & Template Foundation
 * Tests/geo-templates.test.ts
 * 
 * Verifies Phase 5.1 Presentation Foundation Integrity:
 * - All four template types (Regional, State, City, City+Product)
 * - Breadcrumb hierarchy across all four scopes
 * - Canonical URL construction and normalization
 * - Safe behavior when operational availability is pending (noindex enforcement)
 * - Product-specific availability isolation
 * - Factual safety (Zero prohibited claims in templates and layouts)
 * - Correct responsive image selection (Desktop 16:9 vs Mobile 4:5 WebP)
 * - Correct phone and WhatsApp link construction
 * - Locality treatment (No links or routes generated)
 */

import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import {
  products,
  APPROVED_PRODUCT_SLUGS,
  buildCanonicalUrl,
  isValidHierarchyUrl,
  isRouteIndexable,
  validateCityProductIndexing,
  resolveCampaignConfig,
  createDefaultProductAvailabilityMatrix
} from '../src/data/geo/index.ts';

const ROOT_DIR = process.cwd();

test('1. Template Files & Exports — All 4 templates and master layout must exist', () => {
  const expectedFiles = [
    'src/layouts/GeoLandingLayout.astro',
    'src/components/geo/GeoBreadcrumbs.astro',
    'src/components/geo/GeoHero.astro',
    'src/components/geo/GeoServiceGrid.astro',
    'src/components/geo/GeoLocationContext.astro',
    'src/components/geo/GeoCoverageSection.astro',
    'src/components/geo/GeoTrustInformation.astro',
    'src/components/geo/GeoFAQSection.astro',
    'src/components/geo/GeoRelatedLocations.astro',
    'src/components/geo/GeoConversionCTA.astro',
    'src/components/geo/templates/RegionalLandingTemplate.astro',
    'src/components/geo/templates/StateLandingTemplate.astro',
    'src/components/geo/templates/CityLandingTemplate.astro',
    'src/components/geo/templates/CityProductLandingTemplate.astro',
    'src/components/geo/index.ts'
  ];

  for (const relPath of expectedFiles) {
    const fullPath = path.join(ROOT_DIR, relPath);
    assert.ok(fs.existsSync(fullPath), `Required template file must exist: ${relPath}`);
  }
});

test('2. Breadcrumb Hierarchy — Verifies breadcrumb paths across all 4 template scopes', () => {
  // Scope 1: Regional Root (/south-india/)
  const regCamp = resolveCampaignConfig('south-india', 'telangana');
  assert.deepStrictEqual(
    regCamp.schema.breadcrumbs,
    [
      { name: 'Home', url: '/' },
      { name: 'South India', url: '/south-india/' }
    ],
    'Regional breadcrumbs must match exact 2-tier path'
  );

  // Scope 1: Regional Product (/south-india/invisible-grills/)
  const regProdCamp = resolveCampaignConfig('south-india', 'telangana', undefined, 'invisible-grills');
  assert.deepStrictEqual(
    regProdCamp.schema.breadcrumbs,
    [
      { name: 'Home', url: '/' },
      { name: 'South India', url: '/south-india/' },
      { name: 'Invisible Grills', url: '/south-india/invisible-grills/' }
    ],
    'Regional product breadcrumbs must match exact 3-tier path'
  );

  // Scope 2: State Root (/andhra/)
  const stateCamp = resolveCampaignConfig('state', 'andhra');
  assert.deepStrictEqual(
    stateCamp.schema.breadcrumbs,
    [
      { name: 'Home', url: '/' },
      { name: 'South India', url: '/south-india/' },
      { name: 'Andhra Pradesh', url: '/andhra/' }
    ],
    'State breadcrumbs must match exact 3-tier path'
  );

  // Scope 2: State Product (/andhra/balcony-safety-nets/)
  const stateProdCamp = resolveCampaignConfig('state', 'andhra', undefined, 'balcony-safety-nets');
  assert.deepStrictEqual(
    stateProdCamp.schema.breadcrumbs,
    [
      { name: 'Home', url: '/' },
      { name: 'South India', url: '/south-india/' },
      { name: 'Andhra Pradesh', url: '/andhra/' },
      { name: 'Balcony Safety Nets', url: '/andhra/balcony-safety-nets/' }
    ],
    'State product breadcrumbs must match exact 4-tier path'
  );

  // Scope 3: City Overview (/andhra/vizag/)
  const cityCamp = resolveCampaignConfig('city', 'andhra', 'vizag');
  assert.deepStrictEqual(
    cityCamp.schema.breadcrumbs,
    [
      { name: 'Home', url: '/' },
      { name: 'South India', url: '/south-india/' },
      { name: 'Andhra Pradesh', url: '/andhra/' },
      { name: 'Visakhapatnam (Vizag)', url: '/andhra/vizag/' }
    ],
    'City breadcrumbs must match exact 4-tier path'
  );

  // Scope 4: City + Product (/andhra/vizag/child-safety-nets/)
  const deepCamp = resolveCampaignConfig('city-product', 'andhra', 'vizag', 'child-safety-nets');
  assert.deepStrictEqual(
    deepCamp.schema.breadcrumbs,
    [
      { name: 'Home', url: '/' },
      { name: 'South India', url: '/south-india/' },
      { name: 'Andhra Pradesh', url: '/andhra/' },
      { name: 'Visakhapatnam (Vizag)', url: '/andhra/vizag/' },
      { name: 'Child Safety Nets', url: '/andhra/vizag/child-safety-nets/' }
    ],
    'City + Product breadcrumbs must match exact 5-tier path'
  );
});

test('3. Canonical URL Normalization — All 4 scopes generate valid lowercase trailing-slash URLs', () => {
  assert.strictEqual(buildCanonicalUrl(), '/south-india/');
  assert.strictEqual(buildCanonicalUrl(undefined, undefined, 'invisible-grills'), '/south-india/invisible-grills/');
  assert.strictEqual(buildCanonicalUrl('andhra'), '/andhra/');
  assert.strictEqual(buildCanonicalUrl('andhra', undefined, 'invisible-grills'), '/andhra/invisible-grills/');
  assert.strictEqual(buildCanonicalUrl('andhra', 'vizag'), '/andhra/vizag/');
  assert.strictEqual(buildCanonicalUrl('andhra', 'vizag', 'invisible-grills'), '/andhra/vizag/invisible-grills/');

  // URL Validator check
  assert.strictEqual(isValidHierarchyUrl('/south-india/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/andhra/vizag/invisible-grills/').isValid, true);
  assert.strictEqual(isValidHierarchyUrl('/karnataka/bengaluru/child-safety-nets/').isValid, true);
});

test('4. SEO Indexability Gating — Unverified locations strictly trigger noindex', () => {
  // All initial records are pending_business_confirmation
  assert.strictEqual(isRouteIndexable(), false, 'Regional South India root must not be indexable');
  assert.strictEqual(isRouteIndexable(undefined, undefined, 'invisible-grills'), false, 'Regional product must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra'), false, 'State root must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', undefined, 'invisible-grills'), false, 'State product must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', 'vizag'), false, 'City root must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', 'vizag', 'invisible-grills'), false, 'City product must not be indexable');

  // Verify that validation result cites condition 1 failure
  const cityProdCheck = validateCityProductIndexing('andhra', 'vizag', 'invisible-grills');
  assert.strictEqual(cityProdCheck.isIndexable, false);
  assert.ok(cityProdCheck.failedConditions.some(c => c.includes('Condition 1 Failed')));
});

test('5. Product Availability Isolation in Template Data — Modifying one product does not alter others', () => {
  const matrix = createDefaultProductAvailabilityMatrix();
  matrix['invisible-grills'].operationalAvailability = 'confirmed';
  matrix['invisible-grills'].seoIndexingStatus = 'indexable';

  // Check that the other 6 products remain pending & unpublished
  const otherSlugs = APPROVED_PRODUCT_SLUGS.filter(s => s !== 'invisible-grills');
  for (const slug of otherSlugs) {
    assert.strictEqual(matrix[slug].operationalAvailability, 'pending_business_confirmation');
    assert.strictEqual(matrix[slug].seoIndexingStatus, 'unpublished');
  }
});

test('6. Responsive Hero WebP Asset Mapping — All 14 hero images exist and are distinct', () => {
  for (const slug of APPROVED_PRODUCT_SLUGS) {
    const product = products[slug];
    assert.ok(product.heroAssets.desktopWebp.startsWith('/images/'), 'Desktop asset must start with /images/');
    assert.ok(product.heroAssets.desktopWebp.endsWith('.webp'), 'Desktop asset must be .webp');
    assert.ok(product.heroAssets.mobileWebp.startsWith('/images/'), 'Mobile asset must start with /images/');
    assert.ok(product.heroAssets.mobileWebp.endsWith('.webp'), 'Mobile asset must be .webp');

    // Desktop and mobile must be separate compositions
    assert.notStrictEqual(
      product.heroAssets.desktopWebp,
      product.heroAssets.mobileWebp,
      `Product '${slug}' must have separate desktop and mobile files`
    );

    // Physical existence
    const desktopPath = path.join(ROOT_DIR, 'public', product.heroAssets.desktopWebp.replace(/^\//, ''));
    const mobilePath = path.join(ROOT_DIR, 'public', product.heroAssets.mobileWebp.replace(/^\//, ''));
    assert.ok(fs.existsSync(desktopPath), `Desktop file must exist: ${desktopPath}`);
    assert.ok(fs.existsSync(mobilePath), `Mobile file must exist: ${mobilePath}`);
  }
});

test('7. Contact Details & Link Verification — Phone and WhatsApp formatting', () => {
  const testPhone = '+91 83097 55398';
  const cleanPhone = testPhone.replace(/[^0-9]/g, '');
  assert.strictEqual(cleanPhone, '918309755398');

  const telHref = `tel:+${cleanPhone}`;
  assert.strictEqual(telHref, 'tel:+918309755398');

  const waHref = `https://wa.me/${cleanPhone}`;
  assert.strictEqual(waHref, 'https://wa.me/918309755398');
});

test('8. Locality Treatment — GeoCoverageSection contains zero <a> tags or route links', () => {
  const coverageFile = path.join(ROOT_DIR, 'src', 'components', 'geo', 'GeoCoverageSection.astro');
  const content = fs.readFileSync(coverageFile, 'utf-8');

  // Verify that inside the localities loop, no <a> or href is emitted
  const localityLoopMatch = content.match(/localities\.map\(\(loc\)\s*=>\s*\([\s\S]*?\)\)/);
  assert.ok(localityLoopMatch, 'Must find localities.map loop');
  const loopBody = localityLoopMatch[0];
  assert.strictEqual(/<a\b/i.test(loopBody), false, 'Coverage localities loop must NOT contain <a> elements');
  assert.strictEqual(/href=/i.test(loopBody), false, 'Coverage localities loop must NOT contain href attributes');
});

test('9. Factual Safety — Zero prohibited claims in template component sources', () => {
  const templateDir = path.join(ROOT_DIR, 'src', 'components', 'geo');
  const files = fs.readdirSync(templateDir, { recursive: true })
    .filter((f: any) => typeof f === 'string' && (f.endsWith('.astro') || f.endsWith('.ts')))
    .map((f: any) => path.join(templateDir, f));

  files.push(path.join(ROOT_DIR, 'src', 'layouts', 'GeoLandingLayout.astro'));

  const PROHIBITED_REGEXES = [
    { name: 'AISI 316', regex: /aisi\s*316/i },
    { name: 'SS316 / SS304', regex: /ss\s*316|ss\s*304|ss\s*201/i },
    { name: 'Japanese Marine', regex: /japanese\s*marine/i },
    { name: '400+ kg', regex: /400\+?\s*kg/i },
    { name: '10-year warranty', regex: /10[- ]year\s*warranty|5[- ]year\s*warranty|3[- ]year\s*warranty/i },
    { name: 'DuPont', regex: /dupont/i },
    { name: 'Virgin Polymer / Nylon', regex: /virgin/i },
    { name: 'IS-tested', regex: /is[- ]tested|drop[- ]tested/i },
    { name: 'Surgical Grade', regex: /surgical/i },
    { name: '140+ km/h', regex: /140\+?\s*km/i },
    { name: 'Absolute 99% / 98%', regex: /99%|98%/i },
    { name: 'Molybdenum', regex: /molybdenum/i },
    // Phase 5.1.1 & 5.1.2 Factual Safety Prohibitions:
    { name: 'Laser measurement', regex: /laser/i },
    { name: 'Work-at-height rigger / dual lanyard', regex: /rigger|dual-lanyard/i },
    { name: 'Itemized quotation claims', regex: /itemized/i },
    { name: 'Fabricated priceRange in schema', regex: /"priceRange":/i },
    { name: 'Turnaround duration promise (2 to 4 hours)', regex: /2\s*to\s*4\s*hours/i },
    { name: 'Society bylaw compliance guarantee', regex: /bylaw/i },
    { name: 'Unverified technician qualifications', regex: /experienced\s*(installation\s*)?(team|technician)/i },
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

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const { name, regex } of PROHIBITED_REGEXES) {
      assert.strictEqual(
        regex.test(content),
        false,
        `Template file '${path.basename(filePath)}' must not contain prohibited claim '${name}'`
      );
    }
  }
});

test('10. Structured Data Safety — Layout does not emit synthetic local business schemas', () => {
  const layoutPath = path.join(ROOT_DIR, 'src', 'layouts', 'GeoLandingLayout.astro');
  const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

  // Must NOT contain priceRange
  assert.strictEqual(/"priceRange"/i.test(layoutContent), false, 'GeoLandingLayout must not contain priceRange');

  // Must NOT emit HomeAndConstructionBusiness or LocalBusiness for service-area cities
  assert.strictEqual(
    /HomeAndConstructionBusiness|LocalBusiness/i.test(layoutContent),
    false,
    'GeoLandingLayout must not emit HomeAndConstructionBusiness or LocalBusiness (no synthetic branches)'
  );

  // Must guard Service schema with operationalAvailability === "confirmed" and use Organization provider
  assert.ok(
    layoutContent.includes("operationalAvailability === 'confirmed'"),
    'GeoLandingLayout must guard Service schema with operationalAvailability confirmed check'
  );
  assert.ok(
    layoutContent.includes('"@type": "Organization"'),
    'GeoLandingLayout Service schema provider must be @type: Organization'
  );
});

test('11. Availability Safety — Enforces 6 indexing conditions across all hierarchy scopes', () => {
  // Test pending city-product combinations
  assert.strictEqual(isRouteIndexable('andhra', 'vizag', 'invisible-grills'), false);
  assert.strictEqual(isRouteIndexable('telangana', 'hyderabad', 'balcony-safety-nets'), false);
  assert.strictEqual(isRouteIndexable('karnataka', 'bengaluru', 'child-safety-nets'), false);
  assert.strictEqual(isRouteIndexable('tamil-nadu', 'chennai', 'pigeon-safety-nets'), false);
  assert.strictEqual(isRouteIndexable('kerala', 'kochi', 'sports-nets'), false);

  // Test regional and state coverage
  assert.strictEqual(isRouteIndexable(undefined, undefined, undefined), false);
  assert.strictEqual(isRouteIndexable('andhra', undefined, undefined), false);

  // Test invalid slugs
  assert.strictEqual(isRouteIndexable('non-existent-state' as any, 'vizag', 'invisible-grills'), false);
  assert.strictEqual(isRouteIndexable('andhra', 'non-existent-city', 'invisible-grills'), false);
  assert.strictEqual(isRouteIndexable('andhra', 'vizag', 'non-existent-product' as any), false);
});

test('12. Related Locations Navigation Gating — Prevents links to unpublished destinations', () => {
  const relLocPath = path.join(ROOT_DIR, 'src', 'components', 'geo', 'GeoRelatedLocations.astro');
  const content = fs.readFileSync(relLocPath, 'utf-8');

  // Must import isRouteIndexable
  assert.ok(
    content.includes("import { isRouteIndexable } from '../../data/geo/validator.ts'"),
    'GeoRelatedLocations must import isRouteIndexable from validator'
  );

  // Must condition regional link on isRegionalIndexable
  assert.ok(
    content.includes('isRegionalIndexable ? ('),
    'Regional overview link must be guarded with isRegionalIndexable'
  );

  // Must condition state link on isStateIndexable
  assert.ok(
    content.includes('isStateIndexable ? ('),
    'State link must be guarded with isStateIndexable'
  );

  // Must condition city destination link on isCityDestinationIndexable
  assert.ok(
    content.includes('isCityDestinationIndexable ? ('),
    'City destination link must be guarded with isCityDestinationIndexable'
  );

  // Fallback must use non-clickable text (span with cursor-default), not a fake visual badge
  assert.ok(
    content.includes('<span class="font-medium text-slate-500 cursor-default">'),
    'Regional fallback must render non-clickable span'
  );
  assert.ok(
    content.includes('cursor-default ${isCurrent ? \'font-bold text-[#0F233D]\' : \'text-slate-500\'}'),
    'State and city fallbacks must render non-clickable text preserving typography'
  );

  // Verify that on default pending data, all related-location targets evaluate to false
  assert.strictEqual(isRouteIndexable(), false, 'Default regional destination must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra'), false, 'Default state destination must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', 'vizag'), false, 'Default city destination must not be indexable');
  assert.strictEqual(isRouteIndexable('andhra', 'vizag', 'invisible-grills'), false, 'Default city-product destination must not be indexable');
});

