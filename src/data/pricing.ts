export interface PricingConfig {
  invisibleGrill: {
    "2.0mm": number;
    "2.5mm": number;
  };
  spacingMultipliers: {
    "50mm": number; // 2 inches - high safety standard
    "75mm": number; // 3 inches - wide panoramic view
  };
  safetyNet: {
    balconyStandard: number;
    childSafetyHeavy: number;
    pigeonProtection: number;
    ductShaftIndustrial: number;
    coconutTreeNet: number;
    sportsPracticeNet: number;
    mosquitoScreenNet: number;
  };
  addOns: {
    pigeonNetPerSqFt: number;
    mosquitoMeshPerSqFt: number;
    clothHangerFlat: number;
  };
  minimumBillableAreaSqFt: number;
  discounts: {
    bulkThresholdSqFt: number;
    bulkDiscountPercentage: number;
    societyDiscountPercentage: number;
  };
  currencySymbol: string;
  disclaimer: string;
}

export const pricing: PricingConfig = {
  invisibleGrill: {
    "2.0mm": 190, // ₹190 / sq ft baseline
    "2.5mm": 225  // ₹225 / sq ft premium heavy-gauge
  },
  spacingMultipliers: {
    "50mm": 1.0,  // Standard 2" spacing for children & pets
    "75mm": 0.92  // 3" spacing for maximum openness
  },
  safetyNet: {
    balconyStandard: 25,       // ₹25 / sq ft
    childSafetyHeavy: 35,      // ₹35 / sq ft
    pigeonProtection: 28,      // ₹28 / sq ft
    ductShaftIndustrial: 22,   // ₹22 / sq ft
    coconutTreeNet: 26,        // ₹26 / sq ft
    sportsPracticeNet: 18,     // ₹18 / sq ft
    mosquitoScreenNet: 45      // ₹45 / sq ft
  },
  addOns: {
    pigeonNetPerSqFt: 22,
    mosquitoMeshPerSqFt: 38,
    clothHangerFlat: 2450
  },
  minimumBillableAreaSqFt: 30,
  discounts: {
    bulkThresholdSqFt: 250,
    bulkDiscountPercentage: 8,
    societyDiscountPercentage: 12
  },
  currencySymbol: "₹",
  disclaimer: "Final pricing is confirmed following an on-site laser measurement and surface anchoring audit. Figures above reflect planning estimates based on standard installations."
};
