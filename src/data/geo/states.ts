/**
 * Invisible Safety — Location Architecture & Data Foundation
 * The 5 Target South Indian States & Regional South India Configuration
 * 
 * Strict Defaults:
 * All states initialize to operationalAvailability: 'pending_business_confirmation'
 * and seoIndexingStatus: 'unpublished'.
 */

import type { StateSlug, StateConfig, RegionalConfig } from './types.ts';
import { createDefaultProductAvailabilityMatrix } from './helpers.ts';

export const states: Record<StateSlug, StateConfig> = {
  andhra: {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    slug: "andhra",
    capitalCitySlug: "amaravati",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Invisible Grills & Balcony Safety Nets in Andhra Pradesh",
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
      description: "Architectural invisible safety grills, child protection nets, and pigeon exclusion solutions across Andhra Pradesh residences.",
      keywords: ["invisible grills andhra pradesh", "balcony safety nets ap", "safety nets vizag", "invisible grills vijayawada"]
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
      title: "Invisible Grills & Balcony Safety in Telangana | Invisible Safety",
      description: "Invisible safety grills and protective balcony netting systems for high-rises and residential apartments across Telangana.",
      keywords: ["invisible grills telangana", "invisible grills hyderabad", "balcony safety nets gachibowli", "pigeon nets kondapur"]
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
    subheadline: "Balcony safety engineering for high-rise apartments and villa communities across Karnataka.",
    regionalContext: {
      climateOverview: "Elevated plateau with moderate tropical climate, strong monsoon gusts, and high pigeon roosting density in residential high-rises.",
      windZoneRating: "Zone II (Moderate Wind)",
      primaryConcerns: [
        "Pigeon exclusion without light loss",
        "Society architectural guidelines compliance",
        "Pet and toddler balcony containment"
      ]
    },
    seo: {
      title: "Invisible Grills & Balcony Safety Nets in Karnataka | Invisible Safety",
      description: "Architectural invisible grills, child safety nets, and pigeon exclusion solutions for residential apartments and communities in Karnataka.",
      keywords: ["invisible grills karnataka", "invisible grills bengaluru", "balcony safety nets whitefield"]
    }
  },

  'tamil-nadu': {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    capitalCitySlug: "chennai",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    headline: "Invisible Grills & Balcony Safety Nets in Tamil Nadu",
    subheadline: "Balcony safety systems for coastal residential corridors and high-rise developments across Tamil Nadu.",
    regionalContext: {
      climateOverview: "Tropical coastal maritime climate with persistent high humidity, intense solar radiation, and sea-salt exposure along coastal corridors.",
      windZoneRating: "Zone III (High Coastal Velocity)",
      primaryConcerns: [
        "Maritime coastal atmospheric exposure",
        "High-humidity and sunlight exposure",
        "Balcony views and aesthetic preservation"
      ]
    },
    seo: {
      title: "Invisible Grills & Safety Nets in Tamil Nadu | Invisible Safety",
      description: "Invisible safety grills, balcony containment nets, and bird exclusion systems for residential apartments across Tamil Nadu.",
      keywords: ["invisible grills tamil nadu", "invisible grills chennai", "balcony safety nets omr"]
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
    headline: "Invisible Grills & Balcony Safety Nets in Kerala",
    subheadline: "Balcony safety installations engineered for high rainfall, tropical humidity, and waterfront residential buildings across Kerala.",
    regionalContext: {
      climateOverview: "Tropical maritime monsoon climate with extremely heavy seasonal rainfall, continuous high humidity, and lush waterfront greenery.",
      windZoneRating: "Zone III (Coastal Monsoon Zone)",
      primaryConcerns: [
        "Continuous monsoon season rainfall",
        "Moisture accumulation on outdoor fixtures",
        "Waterfront balcony ventilation"
      ]
    },
    seo: {
      title: "Invisible Grills & Safety Nets in Kerala | Invisible Safety",
      description: "Invisible safety grills and balcony protection nets for tropical weather across Kerala.",
      keywords: ["invisible grills kerala", "invisible grills kochi", "balcony safety nets marine drive"]
    }
  }
};

/**
 * Regional Configuration for South India (/south-india/)
 */
export const regionalSouthIndia: RegionalConfig = {
  id: "south-india",
  name: "South India",
  slug: "south-india",
  operationalAvailability: "pending_business_confirmation",
  seoIndexingStatus: "unpublished",
  productAvailability: createDefaultProductAvailabilityMatrix(),
  headline: "Architectural Invisible Grills & Balcony Safety Across South India",
  subheadline: "Precision safety installations engineered for high-rises, coastal villas, and modern residential societies across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, and Kerala.",
  seo: {
    title: "Invisible Grills & Safety Nets Across South India | Invisible Safety",
    description: "Architectural safety grills, child containment nets, and pigeon exclusion solutions engineered for South Indian climates and high-rise architecture."
  }
};
