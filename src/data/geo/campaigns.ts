/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Campaign Resolution Engine for Multi-Scope Landing Experiences
 * 
 * Supports Four Independent Campaign Scopes:
 * 1. South India Regional Scope (/south-india/ or /south-india/[product]/)
 * 2. State-Wide Scope (/[state]/ or /[state]/[product]/)
 * 3. City-Wide Scope (/[state]/[city]/)
 * 4. City + Product Deep Scope (/[state]/[city]/[product]/)
 * 
 * Factual Safety Standard:
 * Purely factual, functional descriptions. No unverified assertions, load ratings,
 * material grades, or manufacturer claims without documentary verification.
 */

import type { CampaignConfig, CampaignScope, StateSlug, ProductSlug } from './types.ts';
import { states, regionalSouthIndia } from './states.ts';
import { cities } from './cities.ts';
import { products } from './products.ts';
import { buildCanonicalUrl } from './helpers.ts';

/**
 * Resolves a campaign configuration object for any of the 4 approved campaign scopes.
 * Guarantees unique campaignId, verified asset mapping, and tailored conversion copy.
 */
export function resolveCampaignConfig(
  scope: CampaignScope,
  stateSlug: StateSlug,
  citySlug?: string,
  productSlug?: ProductSlug
): CampaignConfig {
  const state = states[stateSlug];
  const city = citySlug ? Object.values(cities).find(c => c.slug === citySlug && c.stateSlug === stateSlug) : undefined;
  const product = productSlug ? products[productSlug] : undefined;

  // Canonical URL resolution based on scope
  const canonicalUrl = scope === 'south-india'
    ? buildCanonicalUrl(undefined, undefined, productSlug)
    : buildCanonicalUrl(stateSlug, citySlug, productSlug);

  // Default fallback assets (Invisible Grills master asset)
  const defaultAssets = products['invisible-grills'].heroAssets;
  const heroImage = product ? {
    desktop: product.heroAssets.desktopWebp,
    mobile: product.heroAssets.mobileWebp,
    alt: product.heroAssets.altText
  } : {
    desktop: defaultAssets.desktopWebp,
    mobile: defaultAssets.mobileWebp,
    alt: state ? `${state.name} Architectural Home Safety` : 'South India Architectural Safety'
  };

  // Scope 1: Regional Campaign (South India)
  if (scope === 'south-india') {
    const campaignId = productSlug ? `cmp-southindia-${productSlug}-2026` : 'cmp-southindia-regional-2026';
    const prodAvail = productSlug ? regionalSouthIndia.productAvailability[productSlug] : undefined;

    return {
      campaignId,
      scope: 'south-india',
      stateSlug,
      productSlug,
      canonicalUrl,
      operationalAvailability: prodAvail ? prodAvail.operationalAvailability : regionalSouthIndia.operationalAvailability,
      seoIndexingStatus: prodAvail ? prodAvail.seoIndexingStatus : regionalSouthIndia.seoIndexingStatus,
      eyebrow: product ? `SOUTH INDIA REGIONAL • ${product.categoryTag}` : 'SOUTH INDIA REGIONAL HEADQUARTERS',
      headline: product ? `${product.name} Across South India` : regionalSouthIndia.headline,
      subheadline: product ? `${product.shortTitle} designed for high-rises and residential communities across South India.` : regionalSouthIndia.subheadline,
      valueProposition: [
        'Balcony safety and protection solutions across South India',
        'Stainless steel cables and protective netting systems',
        'Custom measurements tailored to balcony and window openings',
        'Approved range of invisible grills, safety nets, and bird spikes'
      ],
      heroImage,
      cta: {
        primaryText: 'Book Free South India Site Survey',
        phoneText: 'Call Invisible Safety Regional Team',
        phoneNumber: '+91 83097 55398',
        whatsappText: 'Chat on WhatsApp',
        whatsappPrefill: encodeURIComponent(`Hi Invisible Safety, I am inquiring about ${product ? product.name : 'home safety solutions'} across South India.`),
        trackingEventId: `${campaignId}-cta`
      },
      schema: {
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'South India', url: '/south-india/' },
          ...(product ? [{ name: product.name, url: canonicalUrl }] : [])
        ]
      }
    };
  }

  // Scope 2: State Campaign
  if (scope === 'state' && state) {
    const campaignId = productSlug ? `cmp-${stateSlug}-${productSlug}-2026` : `cmp-${stateSlug}-statewide-2026`;
    const prodAvail = productSlug ? state.productAvailability[productSlug] : undefined;

    return {
      campaignId,
      scope: 'state',
      stateSlug,
      productSlug,
      canonicalUrl,
      operationalAvailability: prodAvail ? prodAvail.operationalAvailability : state.operationalAvailability,
      seoIndexingStatus: prodAvail ? prodAvail.seoIndexingStatus : state.seoIndexingStatus,
      eyebrow: product ? `${state.name.toUpperCase()} • ${product.categoryTag}` : `${state.name.toUpperCase()} STATEWIDE SAFETY`,
      headline: product ? `${product.name} in ${state.name}` : state.headline,
      subheadline: product ? `${product.shortTitle} calibrated for ${state.regionalContext.climateOverview}` : state.subheadline,
      valueProposition: state.regionalContext.primaryConcerns,
      heroImage,
      cta: {
        primaryText: `Book Free Survey in ${state.name}`,
        phoneText: `Call ${state.name} Support Team`,
        phoneNumber: '+91 83097 55398',
        whatsappText: 'Chat on WhatsApp',
        whatsappPrefill: encodeURIComponent(`Hi Invisible Safety, I live in ${state.name} and need a survey for ${product ? product.name : 'balcony safety'}.`),
        trackingEventId: `${campaignId}-cta`
      },
      schema: {
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'South India', url: '/south-india/' },
          { name: state.name, url: `/${state.slug}/` },
          ...(product ? [{ name: product.name, url: canonicalUrl }] : [])
        ]
      }
    };
  }

  // Scope 3: City Overview Campaign
  if (scope === 'city' && city) {
    const campaignId = `cmp-${stateSlug}-${city.slug}-city-2026`;

    return {
      campaignId,
      scope: 'city',
      stateSlug,
      citySlug: city.slug,
      canonicalUrl,
      operationalAvailability: city.operationalAvailability,
      seoIndexingStatus: city.seoIndexingStatus,
      eyebrow: `${city.name.toUpperCase()} • ${city.localContext.heroTag}`,
      headline: city.localContext.tagline,
      subheadline: city.localContext.description,
      valueProposition: city.localContext.climateFactors,
      heroImage,
      cta: {
        primaryText: `Book Free Doorstep Survey in ${city.name.split(' ')[0]}`,
        phoneText: `Call ${city.name.split(' ')[0]} Team`,
        phoneNumber: city.phone || '+91 83097 55398',
        whatsappText: 'WhatsApp Dispatch',
        whatsappPrefill: encodeURIComponent(`Hi Invisible Safety, I am in ${city.name} and need a free doorstep measurement.`),
        trackingEventId: `${campaignId}-cta`
      },
      schema: {
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'South India', url: '/south-india/' },
          { name: state.name, url: `/${state.slug}/` },
          { name: city.name, url: canonicalUrl }
        ]
      }
    };
  }

  // Scope 4: City + Product Deep Campaign
  const resolvedCity = city || Object.values(cities)[0];
  const resolvedProduct = product || products['invisible-grills'];
  const prodAvail = resolvedCity.productAvailability[resolvedProduct.slug];
  const campaignId = `cmp-${stateSlug}-${resolvedCity.slug}-${resolvedProduct.slug}-2026`;

  return {
    campaignId,
    scope: 'city-product',
    stateSlug,
    citySlug: resolvedCity.slug,
    productSlug: resolvedProduct.slug,
    canonicalUrl,
    operationalAvailability: prodAvail ? prodAvail.operationalAvailability : 'pending_business_confirmation',
    seoIndexingStatus: prodAvail ? prodAvail.seoIndexingStatus : 'unpublished',
    eyebrow: `${resolvedCity.name.toUpperCase()} • ${resolvedProduct.categoryTag}`,
    headline: `${resolvedProduct.name} in ${resolvedCity.name}`,
    subheadline: `${resolvedProduct.shortTitle} engineered for ${resolvedCity.localContext.description}`,
    valueProposition: resolvedCity.localContext.climateFactors,
    heroImage,
    cta: {
      primaryText: `Book Free ${resolvedCity.name.split(' ')[0]} Site Survey`,
      phoneText: `Call ${resolvedCity.name.split(' ')[0]} Specialist`,
      phoneNumber: resolvedCity.phone || '+91 83097 55398',
      whatsappText: 'WhatsApp Dispatch',
      whatsappPrefill: encodeURIComponent(`Hi Invisible Safety, I am in ${resolvedCity.name} and need a doorstep survey for ${resolvedProduct.name}.`),
      trackingEventId: `${campaignId}-cta`
    },
    schema: {
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'South India', url: '/south-india/' },
        { name: state.name, url: `/${state.slug}/` },
        { name: resolvedCity.name, url: `/${state.slug}/${resolvedCity.slug}/` },
        { name: resolvedProduct.name, url: canonicalUrl }
      ]
    }
  };
}
