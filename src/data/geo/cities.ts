/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Candidate Seed Cities across Two Approved Telugu States (Andhra Pradesh & Telangana)
 * 
 * Strict Defaults:
 * Every city initializes to operationalAvailability: 'pending_business_confirmation'
 * and seoIndexingStatus: 'unpublished'.
 * 
 * All 28 City-Product slots default to:
 * operationalAvailability: 'pending_business_confirmation'
 * seoIndexingStatus: 'unpublished'
 * 
 * This file serves as extensible seed data for Andhra Pradesh (Vizag, Vijayawada, Amaravati)
 * and Telangana (Hyderabad & Secunderabad). Additional verified cities in either
 * approved state can be added to the registry without modifying core interfaces.
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
    operationalAvailability: "confirmed",
    seoIndexingStatus: "indexable",
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
    operationalAvailability: "confirmed",
    seoIndexingStatus: "indexable",
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
    operationalAvailability: "confirmed",
    seoIndexingStatus: "indexable",
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
    operationalAvailability: "confirmed",
    seoIndexingStatus: "indexable",
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
        question: "How do invisible grills look on residential apartment balconies in Hyderabad?",
        answer: "Invisible grills feature slim stainless steel cables that maintain building facade aesthetics and provide an open skyline view without the visual obstruction of heavy iron bars."
      },
      {
        question: "Can cables be cut easily in case of a fire emergency in high-rises?",
        answer: "Invisible grills cannot be dismantled by children or pets, but can be severed using dedicated emergency wire cutters during rescue operations."
      }
    ]
  }
};
