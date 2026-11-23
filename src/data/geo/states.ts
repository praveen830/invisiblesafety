/**
 * Invisible Safety — Location Architecture & Data Foundation
 * The 2 Target Telugu States (Andhra Pradesh & Telangana)
 * 
 * Strict Defaults:
 * All states initialize to operationalAvailability: 'pending_business_confirmation'
 * and seoIndexingStatus: 'unpublished'.
 */

import type { StateSlug, StateConfig } from './types.ts';
import { createDefaultProductAvailabilityMatrix } from './helpers.ts';

export const states: Record<StateSlug, StateConfig> = {
  andhra: {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    slug: "andhra",
    capitalCitySlug: "amaravati",
    operationalAvailability: "confirmed",
    seoIndexingStatus: "indexable",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Invisible Grills & Safety Nets in Andhra Pradesh",
    subheadline: "Balcony safety installations for high humidity, coastal wind conditions, and high-rise residences across Andhra Pradesh.",
    regionalContext: {
      climateOverview: "Long coastal corridor characterized by high salt-air humidity, tropical summer heat, and severe monsoonal wind gusts.",
      windZoneRating: "Zone III to Zone IV (High Coastal Wind Hazard)",
      primaryConcerns: [
        "Salt-air coastal exposure on outdoor fixtures",
        "Seasonal wind gust exposure",
        "Riverfront and coastal balcony ventilation"
      ]
    },
    seo: {
      title: "Invisible Grills & Safety Nets in Andhra Pradesh | Invisible Safety",
      description: "Explore invisible safety grills, balcony safety nets, and bird exclusion systems across Andhra Pradesh residences. Contact Invisible Safety for service enquiries.",
      keywords: ["invisible grills andhra pradesh", "balcony safety nets ap", "safety nets vizag", "invisible grills vijayawada"]
    }
  },

  telangana: {
    id: "telangana",
    name: "Telangana",
    slug: "telangana",
    capitalCitySlug: "hyderabad",
    operationalAvailability: "confirmed",
    seoIndexingStatus: "indexable",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Invisible Grills & Safety Nets in Telangana",
    subheadline: "Engineered for high-rise residential towers and gated communities across Telangana.",
    regionalContext: {
      climateOverview: "Deccan plateau semi-arid climate with high summer temperatures, moderate monsoon, and hard ground-water balcony wash conditions.",
      windZoneRating: "Zone II (Moderate Wind)",
      primaryConcerns: [
        "High-rise elevation compliance",
        "Child fall-containment for upper floors",
        "Pigeon exclusion in utility shafts and balconies"
      ]
    },
    seo: {
      title: "Invisible Grills & Safety Nets in Telangana | Invisible Safety",
      description: "Explore invisible safety grills, balcony safety nets, and bird exclusion systems across Telangana residences. Contact Invisible Safety for service enquiries.",
      keywords: ["invisible grills telangana", "invisible grills hyderabad", "balcony safety nets gachibowli", "pigeon nets kondapur"]
    }
  }
};
