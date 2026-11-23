/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Campaign Resolution Engine for Telugu States Landing Experiences
 * 
 * Supports Three Independent Campaign Scopes:
 * 1. State-Wide Scope (/[state]/ or /[state]/[product]/)
 * 2. City-Wide Scope (/[state]/[city]/)
 * 3. City + Product Deep Scope (/[state]/[city]/[product]/)
 * 
 * Target States: Andhra Pradesh & Telangana
 * 
 * Factual Safety Standard:
 * Purely factual, functional descriptions. No unverified assertions, load ratings,
 * material grades, or manufacturer claims without documentary verification.
 */

import type { CampaignConfig, CampaignScope, StateSlug, ProductSlug } from './types.ts';
import { states } from './states.ts';
import { cities } from './cities.ts';
import { products } from './products.ts';
import { buildCanonicalUrl } from './helpers.ts';

/**
 * Resolves a campaign configuration object for any of the 3 approved campaign scopes.
 * Guarantees unique campaignId, verified asset mapping, and tailored conversion copy.
 */
export function resolveCampaignConfig(
  scope: CampaignScope,
  stateSlug: StateSlug,
  citySlug?: string,
  productSlug?: ProductSlug
): CampaignConfig {
  const state = states[stateSlug] || states.telangana;
  const city = citySlug ? Object.values(cities).find(c => c.slug === citySlug && c.stateSlug === stateSlug) : undefined;
  const product = productSlug ? products[productSlug] : undefined;

  // Canonical URL resolution based on 3-tier hierarchy
  const canonicalUrl = buildCanonicalUrl(stateSlug, citySlug, productSlug);

  // Default fallback assets (Invisible Grills master asset)
  const defaultAssets = products['invisible-grills'].heroAssets;
  const heroImage = product ? {
    desktop: product.heroAssets.desktopWebp,
    mobile: product.heroAssets.mobileWebp,
    alt: product.heroAssets.altText
  } : {
    desktop: defaultAssets.desktopWebp,
    mobile: defaultAssets.mobileWebp,
    alt: state ? `${state.name} Architectural Home Safety` : 'Architectural Home Safety'
  };

  // Scope 1: State Campaign
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
        primaryText: `Request Quote in ${state.name}`,
        phoneText: `Call ${state.name} Support Team`,
        phoneNumber: '+91 83097 55398',
        whatsappText: 'Chat on WhatsApp',
        whatsappPrefill: encodeURIComponent(`Hi Invisible Safety, I live in ${state.name} and would like a quotation for ${product ? product.name : 'balcony safety'}.`),
        trackingEventId: `${campaignId}-cta`
      },
      schema: {
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: state.name, url: `/${state.slug}/` },
          ...(product ? [{ name: product.name, url: canonicalUrl }] : [])
        ]
      }
    };
  }

  // Scope 2: City Overview Campaign
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
        primaryText: `Request Quote in ${city.name.split(' ')[0]}`,
        phoneText: `Call ${city.name.split(' ')[0]} Team`,
        phoneNumber: city.phone || '+91 83097 55398',
        whatsappText: 'WhatsApp Enquiry',
        whatsappPrefill: encodeURIComponent(`Hi Invisible Safety, I am in ${city.name} and would like a quotation inquiry.`),
        trackingEventId: `${campaignId}-cta`
      },
      schema: {
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: state.name, url: `/${state.slug}/` },
          { name: city.name, url: canonicalUrl }
        ]
      }
    };
  }

  // Scope 3: City + Product Deep Campaign
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
      primaryText: `Request ${resolvedCity.name.split(' ')[0]} Site Quote`,
      phoneText: `Call ${resolvedCity.name.split(' ')[0]} Team`,
      phoneNumber: resolvedCity.phone || '+91 83097 55398',
      whatsappText: 'WhatsApp Enquiry',
      whatsappPrefill: encodeURIComponent(`Hi Invisible Safety, I am in ${resolvedCity.name} and would like a quotation for ${resolvedProduct.name}.`),
      trackingEventId: `${campaignId}-cta`
    },
    schema: {
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: state.name, url: `/${state.slug}/` },
        { name: resolvedCity.name, url: `/${state.slug}/${resolvedCity.slug}/` },
        { name: resolvedProduct.name, url: canonicalUrl }
      ]
    }
  };
}
