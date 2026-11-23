/**
 * Invisible Safety — Location Architecture & Data Foundation
 * Exactly Seven Approved Products Bound to Phase 3.8/3.9 Responsive Hero WebP Assets
 * 
 * Factual Safety Standard:
 * Purely factual, functional descriptions. No unverified assertions, load ratings,
 * material grades, or manufacturer claims without documentary verification.
 */

import type { ProductSlug, ProductConfig } from './types.ts';

export const products: Record<ProductSlug, ProductConfig> = {
  'invisible-grills': {
    slug: 'invisible-grills',
    name: 'Invisible Grills',
    shortTitle: 'Invisible Grills',
    categoryTag: 'ARCHITECTURAL BALCONY SAFETY',
    materialGrade: 'Stainless Steel Cable System',
    spacingOptions: ['50mm (Toddler/Pet Safe)', '100mm (Standard Elevation)'],
    heroAssets: {
      desktopWebp: '/images/ai-generated/architectural/invisible-grills/invisible-grills-desktop-hero.webp',
      mobileWebp: '/images/ai-generated/architectural/invisible-grills/invisible-grills-mobile-hero.webp',
      altText: 'Architectural Invisible Grills on Modern Balcony',
      widthDesktop: 1920,
      heightDesktop: 1080,
      widthMobile: 1080,
      heightMobile: 1350
    },
    coreFeatures: [
      { title: 'Zero Visual Obstruction', description: 'Preserves panoramic views and natural light from high-rise balconies while providing perimeter security.' },
      { title: 'Stainless Steel Wire Matrix', description: 'Stainless steel wire matrix designed to help safeguard children and household pets on balconies.' },
      { title: 'Stainless Steel Construction', description: 'Constructed with stainless steel cables suited for residential balconies.' },
      { title: 'Emergency Evacuation Access', description: 'Can be severed by emergency rescue personnel using specialized wire cutters, avoiding the trapped enclosure risk of traditional fixed iron cages.' }
    ],
    technicalSpecs: [
      { label: 'Cable Material', value: 'Stainless steel multi-strand cable' },
      { label: 'Cable Construction', value: 'Multi-strand braided wire rope' },
      { label: 'Protective Casing', value: 'Transparent polymer sleeve' },
      { label: 'Track System', value: 'Extruded aluminium framework' }
    ],
    defaultFaqs: [
      {
        question: 'Can children or pets squeeze through the invisible grills?',
        answer: 'With our recommended 50mm spacing, the tensioned cables help prevent children, toddlers, and household pets from passing through while maintaining open balcony views.'
      },
      {
        question: 'Will invisible grills rust over time?',
        answer: 'Our invisible grills are built using stainless steel cables encased in a protective polymer sleeve, designed for residential balconies and outdoor exposure.'
      }
    ]
  },

  'balcony-safety-nets': {
    slug: 'balcony-safety-nets',
    name: 'Balcony Safety Nets',
    shortTitle: 'High-Rise Balcony Nets',
    categoryTag: 'RESIDENTIAL BALCONY SAFETY',
    materialGrade: 'High-Density Polyethylene Netting',
    spacingOptions: ['25mm Micro-Mesh', '40mm Standard Mesh'],
    heroAssets: {
      desktopWebp: '/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-desktop-hero.webp',
      mobileWebp: '/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-mobile-hero.webp',
      altText: 'High-Rise Balcony Safety Net Installation',
      widthDesktop: 1920,
      heightDesktop: 1080,
      widthMobile: 1080,
      heightMobile: 1350
    },
    coreFeatures: [
      { title: 'Balcony Safety Barrier', description: 'Helps prevent children, household pets, and objects from falling off open balconies.' },
      { title: 'Durable Polymer Netting', description: 'Durable polymer material suited for residential balcony conditions.' },
      { title: 'Secure Border Rigging', description: 'Fitted with perimeter border ropes and wall fixings to cover the opening securely.' },
      { title: 'Unimpeded Cross-Breeze', description: 'Maintains natural balcony airflow and daylight while forming a protective containment barrier.' }
    ],
    technicalSpecs: [
      { label: 'Polymer Base', value: 'High-Density Polyethylene (HDPE)' },
      { label: 'Outdoor Durability', value: 'Designed for residential outdoor balcony exposure' },
      { label: 'Mesh Array', value: 'Square knotted mesh design' },
      { label: 'Border Rigging', value: 'Perimeter border rope' }
    ],
    defaultFaqs: [
      {
        question: 'How long does a balcony safety net last in South Indian weather?',
        answer: 'Our polymer safety nets are designed for residential balconies and installed with perimeter border hardware to fit your opening.'
      }
    ]
  },

  'child-safety-nets': {
    slug: 'child-safety-nets',
    name: 'Child Safety Nets',
    shortTitle: 'Toddler & Child Balcony Protection',
    categoryTag: 'CHILD BALCONY SAFETY',
    materialGrade: 'Knotted Polymer Mesh',
    spacingOptions: ['25mm Anti-Climb Pitch'],
    heroAssets: {
      desktopWebp: '/images/ai-generated/safety-nets/child-safety-nets/child-safety-net-desktop-hero.webp',
      mobileWebp: '/images/ai-generated/safety-nets/child-safety-nets/child-safety-net-mobile-hero.webp',
      altText: 'Child Safety Net for High-Rise Balcony Protection',
      widthDesktop: 1920,
      heightDesktop: 1080,
      widthMobile: 1080,
      heightMobile: 1350
    },
    coreFeatures: [
      { title: 'Anti-Climb Mesh Design', description: 'Close mesh pitch helps prevent toddlers from obtaining footholds on balcony railings.' },
      { title: 'Interlocked Weave', description: 'Knotted interlock construction prevents mesh deformation under localized pressure.' },
      { title: 'Smooth Edge Finish', description: 'Smooth polymer fibers help prevent abrasive scratches during everyday balcony use.' },
      { title: 'Secure Perimeter Border', description: 'Fitted securely around balcony railings and window openings.' }
    ],
    technicalSpecs: [
      { label: 'Fiber Composition', value: 'Multi-filament polymer mesh' },
      { label: 'Knot Structure', value: 'Locked interlock knotted array' },
      { label: 'Perimeter Hardware', value: 'Boundary wire cord' },
      { label: 'Application Profile', value: 'Balcony railings, open windows, and stairwell voids' }
    ],
    defaultFaqs: [
      {
        question: 'Is this net safe if a child leans against it?',
        answer: 'Yes. The net is secured along its perimeter to provide a reliable protective barrier for balconies, windows, and stairwells.'
      }
    ]
  },

  'pigeon-safety-nets': {
    slug: 'pigeon-safety-nets',
    name: 'Pigeon Safety Nets',
    shortTitle: 'Anti-Pigeon Balcony Nets',
    categoryTag: 'HUMANE BIRD EXCLUSION',
    materialGrade: 'Monofilament Polymer Netting',
    spacingOptions: ['25mm Pigeon Exclusion Grid'],
    heroAssets: {
      desktopWebp: '/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-desktop-hero.webp',
      mobileWebp: '/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-mobile-hero.webp',
      altText: 'Translucent Anti-Pigeon Net Installed on Apartment Balcony',
      widthDesktop: 1920,
      heightDesktop: 1080,
      widthMobile: 1080,
      heightMobile: 1350
    },
    coreFeatures: [
      { title: 'Discreet Visual Profile', description: 'Translucent monofilament mesh blends cleanly into the daylight backdrop without obstructing outdoor views.' },
      { title: 'Humane Bird Exclusion', description: 'Mesh geometry physically prevents pigeons from perching, nesting, or roosting on balconies and utility shafts.' },
      { title: 'Hygiene & Cleanliness', description: 'Helps protect balconies, AC ledges, and drying areas from pigeon droppings and nesting debris.' },
      { title: 'Society Compliant', description: 'Low visual profile from ground elevation, meeting aesthetic guidelines of residential gated communities.' }
    ],
    technicalSpecs: [
      { label: 'Filament Type', value: 'Translucent monofilament' },
      { label: 'Mesh Aperture', value: 'Square anti-bird matrix' },
      { label: 'Visibility Profile', value: 'Daylight-transmitting low-visibility design' },
      { label: 'Material Properties', value: 'Durable polymer mesh for outdoor use' }
    ],
    defaultFaqs: [
      {
        question: 'Can pigeons get trapped or injured in the net?',
        answer: 'The mesh sizing is designed to act as an impassable physical barrier, deterring birds from landing without entangling or injuring them.'
      }
    ]
  },

  'sports-nets': {
    slug: 'sports-nets',
    name: 'Sports Nets',
    shortTitle: 'Cricket Practice & Sports Turf Nets',
    categoryTag: 'SPORTS CONTAINMENT & LEISURE',
    materialGrade: 'Braided Polymer Sports Mesh',
    spacingOptions: ['40mm Cricket Ball Pitch', '50mm Multi-Sport Pitch'],
    heroAssets: {
      desktopWebp: '/images/ai-generated/safety-nets/sports-nets/sports-net-desktop-hero.webp',
      mobileWebp: '/images/ai-generated/safety-nets/sports-nets/sports-net-mobile-hero.webp',
      altText: 'Cricket Practice Sports Net on Rooftop Terrace',
      widthDesktop: 1920,
      heightDesktop: 1080,
      widthMobile: 1080,
      heightMobile: 1350
    },
    coreFeatures: [
      { title: 'Sports Ball Containment', description: 'Braided twine designed to contain sports balls during cricket and athletic practice.' },
      { title: 'Rooftop & Terrace Enclosures', description: 'Custom installations tailored for residential society terraces, sports clubs, and school grounds.' },
      { title: 'Impact Cushioning', description: 'Braided twine design helps dampen rebound velocity to protect surrounding windows and property.' },
      { title: 'Perimeter Tension Cables', description: 'Perimeter tension cables and turnbuckles to maintain net alignment.' }
    ],
    technicalSpecs: [
      { label: 'Twine Construction', value: 'Braided multi-ply polymer yarn' },
      { label: 'Application Profile', value: 'Cricket practice, football turf, and multi-sport containment' },
      { label: 'Support Rigging', value: 'Perimeter support wire ropes' },
      { label: 'Tension Hardware', value: 'Turnbuckles and mounting fixtures' }
    ],
    defaultFaqs: [
      {
        question: 'Can this net be installed on an apartment rooftop for society sports?',
        answer: 'Yes. We install rooftop cricket pitches and sports enclosures using cable supports designed for terrace spaces.'
      }
    ]
  },

  'cloth-drying-hangers': {
    slug: 'cloth-drying-hangers',
    name: 'Cloth-Drying Hangers',
    shortTitle: 'Ceiling-Mounted Pulley Hangers',
    categoryTag: 'BALCONY UTILITY ACCESSORIES',
    materialGrade: 'Stainless Steel Tubes with Pulleys',
    spacingOptions: ['4-Pipe System', '6-Pipe System', '8-Pipe System'],
    heroAssets: {
      desktopWebp: '/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-desktop-hero.webp',
      mobileWebp: '/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-mobile-hero.webp',
      altText: 'Ceiling-Mounted Pull-Down Cloth Drying Hanger in Luxury Balcony',
      widthDesktop: 1920,
      heightDesktop: 1080,
      widthMobile: 1080,
      heightMobile: 1350
    },
    coreFeatures: [
      { title: 'Zero Floor Clutter', description: 'Suspended from the ceiling, maximizing usable balcony and utility floor space.' },
      { title: 'Individual Pulley Operation', description: 'Each pipe lowers independently via a mechanical pulley system for comfortable loading.' },
      { title: 'Natural Air Circulation', description: 'Elevated ceiling positioning takes advantage of natural warm airflow for efficient laundry drying.' },
      { title: 'Stainless Steel Tubes', description: 'Smooth stainless steel rods that help keep laundry clean and organized.' }
    ],
    technicalSpecs: [
      { label: 'Pipe Material', value: 'Polished stainless steel rods' },
      { label: 'Pulley Mechanism', value: 'Dual-bearing nylon pulleys with metal inserts' },
      { label: 'Rope Construction', value: 'Braided nylon cord' },
      { label: 'Application', value: 'Standard household wet laundry' }
    ],
    defaultFaqs: [
      {
        question: 'Can children or elderly family members operate the pulley easily?',
        answer: 'Yes. The pulley mechanism provides mechanical leverage, allowing individual laundry pipes to be raised and lowered with smooth manual effort.'
      }
    ]
  },

  'bird-spikes': {
    slug: 'bird-spikes',
    name: 'Bird Spikes',
    shortTitle: 'Stainless Steel Anti-Perching Spikes',
    categoryTag: 'HUMANE LEDGE PROTECTION',
    materialGrade: 'Stainless Steel Spikes on Polycarbonate Base',
    spacingOptions: ['Narrow Ledge (2-Row)', 'Wide Ledge (4-Row)'],
    heroAssets: {
      desktopWebp: '/images/ai-generated/architectural/bird-spikes/bird-spikes-desktop-hero.webp',
      mobileWebp: '/images/ai-generated/architectural/bird-spikes/bird-spikes-mobile-hero.webp',
      altText: 'Stainless Steel Bird Spikes Installed on Window Parapet',
      widthDesktop: 1920,
      heightDesktop: 1080,
      widthMobile: 1080,
      heightMobile: 1350
    },
    coreFeatures: [
      { title: 'Humane Physical Deterrence', description: 'Blunt curved tip geometry prevents birds from landing without causing physical harm.' },
      { title: 'Stainless Steel Rods', description: 'Stainless steel rods maintain shape through outdoor heat and weather.' },
      { title: 'Architectural Integration', description: 'Low-profile design adheres cleanly to AC outdoor units, window sills, parapet ledges, and signage.' },
      { title: 'Polycarbonate Base', description: 'Polycarbonate base designed for outdoor parapet and ledge mounting.' }
    ],
    technicalSpecs: [
      { label: 'Spike Material', value: 'Stainless steel wire' },
      { label: 'Base Track', value: 'Polycarbonate base' },
      { label: 'Bonding Method', value: 'Silicone adhesive bonding' },
      { label: 'Protection Profile', value: 'Multi-directional fan spread for parapets and ledges' }
    ],
    defaultFaqs: [
      {
        question: 'Can bird spikes damage the building facade or parapet during installation?',
        answer: 'Our technicians use adhesive bonding to secure spike tracks without drilling into stone coping or compromising waterproofing.'
      }
    ]
  }
};
