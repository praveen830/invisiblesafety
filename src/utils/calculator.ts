import { pricing } from '../data/pricing';

export interface CalculationInput {
  productType: "invisible-grill" | "safety-net";
  unit: "feet" | "meters";
  width: number;
  height: number;
  wireGauge?: "2.0mm" | "2.5mm";
  spacing?: "50mm" | "75mm";
  safetyNetType?: "balconyStandard" | "childSafetyHeavy" | "pigeonProtection" | "ductShaftIndustrial" | "coconutTreeNet" | "sportsPracticeNet" | "mosquitoScreenNet";
  includePigeonNet?: boolean;
  includeMosquitoMesh?: boolean;
  includeClothHanger?: boolean;
}

export interface CalculationResult {
  actualAreaSqFt: number;
  billableAreaSqFt: number;
  ratePerSqFt: number;
  basePrice: number;
  addOnsBreakdown: {
    name: string;
    cost: number;
  }[];
  totalAddOns: number;
  subtotal: number;
  estimatedMin: number;
  estimatedMax: number;
  formattedArea: string;
  isMinimumApplied: boolean;
}

export function calculateQuote(input: CalculationInput): CalculationResult {
  // Convert to feet if in meters (1 meter = 3.28084 feet)
  const widthInFt = input.unit === "meters" ? input.width * 3.28084 : input.width;
  const heightInFt = input.unit === "meters" ? input.height * 3.28084 : input.height;

  const actualAreaSqFt = Math.max(0, widthInFt * heightInFt);
  const isMinimumApplied = actualAreaSqFt > 0 && actualAreaSqFt < pricing.minimumBillableAreaSqFt;
  const billableAreaSqFt = actualAreaSqFt === 0 ? 0 : Math.max(actualAreaSqFt, pricing.minimumBillableAreaSqFt);

  let ratePerSqFt = 0;

  if (input.productType === "invisible-grill") {
    const gauge = input.wireGauge || "2.5mm";
    const baseGaugeRate = pricing.invisibleGrill[gauge] || 225;
    const spacing = input.spacing || "50mm";
    const multiplier = pricing.spacingMultipliers[spacing] || 1.0;
    ratePerSqFt = Math.round(baseGaugeRate * multiplier);
  } else {
    const netType = input.safetyNetType || "balconyStandard";
    ratePerSqFt = pricing.safetyNet[netType] || 25;
  }

  const basePrice = Math.round(billableAreaSqFt * ratePerSqFt);

  const addOnsBreakdown: { name: string; cost: number }[] = [];

  if (input.includePigeonNet && input.productType === "invisible-grill") {
    const pigeonNetCost = Math.round(billableAreaSqFt * pricing.addOns.pigeonNetPerSqFt);
    addOnsBreakdown.push({ name: "Anti-Pigeon Monofilament Netting", cost: pigeonNetCost });
  }

  if (input.includeMosquitoMesh) {
    const meshCost = Math.round(billableAreaSqFt * pricing.addOns.mosquitoMeshPerSqFt);
    addOnsBreakdown.push({ name: "Fiberglass Mosquito Screen Layer", cost: meshCost });
  }

  if (input.includeClothHanger) {
    addOnsBreakdown.push({ name: "Balcony Ceiling Cloth Drying Hanger (6-Pipe)", cost: pricing.addOns.clothHangerFlat });
  }

  const totalAddOns = addOnsBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const subtotal = basePrice + totalAddOns;

  // Realistic range buffer (-5% to +5% for variation in hardware/anchoring)
  const estimatedMin = Math.round(subtotal * 0.95);
  const estimatedMax = Math.round(subtotal * 1.05);

  return {
    actualAreaSqFt: Number(actualAreaSqFt.toFixed(1)),
    billableAreaSqFt: Number(billableAreaSqFt.toFixed(1)),
    ratePerSqFt,
    basePrice,
    addOnsBreakdown,
    totalAddOns,
    subtotal,
    estimatedMin,
    estimatedMax,
    formattedArea: `${actualAreaSqFt.toFixed(1)} sq.ft`,
    isMinimumApplied
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
