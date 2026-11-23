/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Candidate Seed Cities across Five South Indian States
 * 
 * Strict Defaults:
 * Every city initializes to operationalAvailability: 'pending_business_confirmation'
 * and seoIndexingStatus: 'unpublished'.
 * 
 * All 49 City-Product slots default to:
 * operationalAvailability: 'pending_business_confirmation'
 * seoIndexingStatus: 'unpublished'
 * 
 * This file serves as extensible seed data. Additional verified cities in any of the
 * five target states can be added to the registry without modifying core interfaces.
 */

import type { CityConfig } from './types.ts';
import { createDefaultProductAvailabilityMatrix } from './helpers.ts';

export const cities: Record<string, CityConfig> = {
  vizag: {
    id: "visakhapatnam",
    name: "Visakhapatnam (Vizag)",
    slug: "vizag",
    slugAliases: ["visakhapatnam"],
    stateSlug: "andhra",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    phone: "+91 83097 55398",
    whatsapp: "918309755398",
    coordinates: { latitude: 17.6868, longitude: 83.2185 },
    localContext: {
      heroTag: "COASTAL BALCONY SAFETY SOLUTIONS",
      tagline: "Architectural Invisible Grills & Balcony Safety in Vizag",
      description: "invisible grills and protective safety netting designed for coastal high-rises and residential communities across Visakhapatnam.",
      climateFactors: [
        "High airborne salt salinity along Beach Road and Rushikonda",
        "High coastal humidity and salt-air atmosphere",
        "Coastal wind patterns and open balcony exposure"
      ],
      architectureStyle: "Sea-facing high-rise towers, cliffside apartments, and gated hill communities"
    },
    coverageLocalities: [
      { name: "Beach Road & Pandurangapuram", description: "Direct sea-facing luxury penthouses and high-wind balconies." },
      { name: "MVP Colony & Lawson's Bay", description: "Established residential balconies requiring bird control and child safety." },
      { name: "Madhurawada & Yendada", description: "Rapidly growing high-rise IT corridor towers and gated communities." },
      { name: "Rushikonda & Sagar Nagar", description: "Scenic coastal cliffside residences and apartment balconies." },
      { name: "Seethammadhara & Siripuram", description: "Central city residential apartments and duplex homes." },
      { name: "Kommadi & Pedda Waltair", description: "Modern residential complexes with contemporary architectural standards." }
    ],
    faqs: [
      {
        question: "How do invisible safety installations perform in Visakhapatnam's coastal environment?",
        answer: "Visakhapatnam's coastal climate features high salt-air humidity. Invisible Safety provides stainless steel cables and protective netting suited for residential balconies in coastal areas."
      },
      {
        question: "Can invisible grills withstand high coastal wind storms in Vizag?",
        answer: "The slim profile of the cables allows air to circulate freely across the balcony while providing a secure barrier."
      }
    ]
  },

  vijayawada: {
    id: "vijayawada",
    name: "Vijayawada",
    slug: "vijayawada",
    stateSlug: "andhra",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    phone: "+91 83097 55398",
    whatsapp: "918309755398",
    coordinates: { latitude: 16.5062, longitude: 80.6480 },
    localContext: {
      heroTag: "TROPICAL HEAT & VENTILATION PROFILE",
      tagline: "Modern Invisible Grills & Pigeon Nets in Vijayawada",
      description: "architecturally harmonious invisible grills and anti-bird mesh designed for maximum airflow in tropical climates.",
      climateFactors: [
        "Intense summer heat requiring unimpeded natural cross-ventilation",
        "Urban pigeon roosting along multi-storey balcony ledges",
        "High dust accumulation requiring washable low-maintenance barriers"
      ],
      architectureStyle: "Dense urban residential towers, modern multi-storey apartments, and commercial corridors"
    },
    coverageLocalities: [
      { name: "Benz Circle & Patamata", description: "Prime central residential apartments and commercial complexes." },
      { name: "Labbipet & Moghalrajpuram", description: "Spacious multi-storey family homes and modern apartment balconies." },
      { name: "Kanuru & Poranki", description: "Fast-growing gated high-rise communities with young families." },
      { name: "Tadigadapa & Currency Nagar", description: "Modern apartment corridors and independent residential floors." },
      { name: "Ramavarappadu & Gunadala", description: "Contemporary residential developments requiring reliable safety systems." }
    ],
    faqs: [
      {
        question: "How do invisible grills compare to traditional iron grills in Vijayawada?",
        answer: "Traditional iron grills require recurring painting, trap dust, and give an enclosed appearance. Invisible Safety grills are low-maintenance, allow natural cross-breeze, and maintain open outdoor visibility."
      }
    ]
  },

  amaravati: {
    id: "amaravati",
    name: "Amaravati",
    slug: "amaravati",
    stateSlug: "andhra",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    phone: "+91 83097 55398",
    whatsapp: "918309755398",
    coordinates: { latitude: 16.5131, longitude: 80.5165 },
    localContext: {
      heroTag: "CAPITAL REGION RESIDENTIAL SAFETY",
      tagline: "Invisible Grills & Balcony Safety in Amaravati Capital Region",
      description: "invisible safety grills and protective nets designed for river-basin residences and modern high-rise developments.",
      climateFactors: [
        "Open-plain wind velocities across expansive riverfront developments",
        "High river-basin humidity along the Krishna River corridor",
        "New residential construction and modern apartment balconies"
      ],
      architectureStyle: "Contemporary residential projects, government employee quarters, and luxury villas"
    },
    coverageLocalities: [
      { name: "Tadepalli & Mangalagiri", description: "Capital region luxury residential developments along the Krishna riverfront." },
      { name: "Undavalli & Penumaka", description: "Scenic residential communities and modern high-rise riverbank apartments." },
      { name: "Neerukonda & Kuragallu", description: "Emerging educational and institutional residential corridors." },
      { name: "Mandadam & Velagapudi", description: "Administrative zone residential enclaves and employee housing." },
      { name: "Rayapudi & Thullur", description: "Core capital sector modern villas and private residential developments." }
    ],
    faqs: [
      {
        question: "How do invisible grills perform in open high-wind capital plain areas?",
        answer: "The slim profile of the stainless steel cables allows air to circulate freely across the balcony while maintaining an effective protective barrier."
      }
    ]
  },

  hyderabad: {
    id: "hyderabad",
    name: "Hyderabad & Secunderabad",
    slug: "hyderabad",
    stateSlug: "telangana",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    phone: "+91 83097 55398",
    whatsapp: "918309755398",
    coordinates: { latitude: 17.3850, longitude: 78.4867 },
    localContext: {
      heroTag: "HIGH-RISE BALCONY SAFETY SOLUTIONS",
      tagline: "Invisible Grills & Balcony Safety in Hyderabad",
      description: "balcony safety nets and invisible grills for modern high-rises across Hyderabad and Secunderabad residential communities.",
      climateFactors: [
        "Open balcony breeze and wind flow in high-rise apartment towers",
        "Deccan plateau semi-arid climate and regular balcony washing",
        "Intense summer heat and direct sunlight exposure on balconies"
      ],
      architectureStyle: "Gated community high-rises, IT corridor towers, and luxury villa perimeters"
    },
    coverageLocalities: [
      { name: "Financial District & Gachibowli", description: "Serving residential towers in Nanakramguda, Puppalguda & Kokapet corridor." },
      { name: "HITEC City & Kondapur", description: "Balcony safety netting and invisible grills for high-rise apartments." },
      { name: "Madhapur & Jubilee Hills", description: "Architectural luxury villas and duplex apartment installations." },
      { name: "Banjara Hills & Manikonda", description: "Central residential enclaves and independent apartment floors." },
      { name: "Tellapur & Nallagandla", description: "Comprehensive child safety and anti-pigeon balcony netting for high-rises." }
    ],
    faqs: [
      {
        question: "Are invisible grills allowed by Hyderabad gated community RWAs?",
        answer: "Yes. Unlike traditional box grills that alter building exteriors, Invisible Safety's slim profile is discreet from the ground and meets architectural guidelines across major societies."
      },
      {
        question: "Can cables be cut easily in case of a fire emergency in high-rises?",
        answer: "Invisible grills cannot be dismantled by children or pets, but can be severed using dedicated emergency wire cutters during rescue operations."
      }
    ]
  },

  bengaluru: {
    id: "bengaluru",
    name: "Bengaluru",
    slug: "bengaluru",
    slugAliases: ["bangalore"],
    stateSlug: "karnataka",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    phone: "+91 83097 55398",
    whatsapp: "918309755398",
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
    localContext: {
      heroTag: "TECH CORRIDOR BALCONY SAFETY SOLUTIONS",
      tagline: "Invisible Grills & Balcony Safety Nets in Bengaluru",
      description: "balcony safety nets, invisible grills, and bird protection for residential communities across Bengaluru.",
      climateFactors: [
        "Urban pigeon roosting along balcony shafts and utility ducts",
        "Elevation wind patterns in upper-level apartment towers",
        "Seasonal monsoon rains and balcony moisture exposure"
      ],
      architectureStyle: "High-density residential complexes, high-rise gated societies, and villa enclaves"
    },
    coverageLocalities: [
      { name: "Whitefield & Sarjapur", description: "Major residential high-rise apartment corridors." },
      { name: "Electronic City & Bellandur", description: "Modern apartment communities requiring child safety and bird exclusion." },
      { name: "Hebbal & Manyata Tech Park", description: "North Bengaluru high-rise residential towers and duplexes." },
      { name: "Indiranagar & Koramangala", description: "Established central residential apartments and luxury homes." }
    ],
    faqs: [
      {
        question: "How do you handle pigeon issues in Bengaluru high-rises?",
        answer: "We install translucent monofilament netting that prevents pigeon roosting while preserving natural daylight and balcony views."
      }
    ]
  },

  chennai: {
    id: "chennai",
    name: "Chennai",
    slug: "chennai",
    slugAliases: ["madras"],
    stateSlug: "tamil-nadu",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    phone: "+91 83097 55398",
    whatsapp: "918309755398",
    coordinates: { latitude: 13.0827, longitude: 80.2707 },
    localContext: {
      heroTag: "COASTAL BALCONY SAFETY SOLUTIONS",
      tagline: "Balcony Invisible Grills & Safety Nets in Chennai",
      description: "balcony safety installations along OMR, ECR, and residential corridors across Chennai.",
      climateFactors: [
        "Persistent maritime humidity and airborne sea salt along coastal roads",
        "Direct sun and high humidity exposure along the coastal belt",
        "Seasonal coastal breeze and balcony ventilation"
      ],
      architectureStyle: "Coastal apartment balconies, expressway residential towers, and beach villa communities"
    },
    coverageLocalities: [
      { name: "OMR & ECR", description: "Coastal corridor high-rise apartments and residential villas." },
      { name: "Velachery & Anna Nagar", description: "Family residential communities requiring child safety netting." },
      { name: "Porur & Vadapalani", description: "Residential apartment towers and complexes." }
    ],
    faqs: [
      {
        question: "Will invisible grills withstand Chennai's coastal humidity?",
        answer: "Our invisible grills use stainless steel cables with protective polymer sheathing designed for residential balconies in coastal humidity and outdoor conditions."
      }
    ]
  },

  kochi: {
    id: "kochi",
    name: "Kochi",
    slug: "kochi",
    slugAliases: ["cochin"],
    stateSlug: "kerala",
    operationalAvailability: "pending_business_confirmation",
    seoIndexingStatus: "unpublished",
    productAvailability: createDefaultProductAvailabilityMatrix(),
    phone: "+91 83097 55398",
    whatsapp: "918309755398",
    coordinates: { latitude: 9.9312, longitude: 76.2673 },
    localContext: {
      heroTag: "WATERFRONT BALCONY SAFETY SOLUTIONS",
      tagline: "Balcony Invisible Grills & Safety Nets in Kochi",
      description: "balcony safety nets and invisible grills for waterfront residential towers across Kochi.",
      climateFactors: [
        "Prolonged heavy seasonal monsoon rainfall",
        "Continuous tropical humidity and heavy seasonal rains",
        "Waterfront wind conditions along Marine Drive and backwater areas"
      ],
      architectureStyle: "Waterfront apartments, backwater residences, and modern city towers"
    },
    coverageLocalities: [
      { name: "Marine Drive & Panampilly Nagar", description: "Waterfront residential developments." },
      { name: "Kakkanad & Edappally", description: "Modern residential high-rise communities." }
    ],
    faqs: [
      {
        question: "Can cables or track fittings rust during heavy Kerala monsoons?",
        answer: "Our installations feature aluminium mounting tracks and stainless steel cables with protective sheathing designed for outdoor balcony environments."
      }
    ]
  }
};
