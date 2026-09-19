import React, { useState, useMemo } from 'react';
import { pricing } from '../../data/pricing';
import { business } from '../../data/business';
import { calculateQuote, formatINR, type CalculationInput } from '../../utils/calculator';
import { buildWhatsAppLink } from '../../utils/whatsapp';
import { Calculator, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CostEstimator() {
  const [productType, setProductType] = useState<"invisible-grill" | "safety-net">("invisible-grill");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(5);
  const [wireGauge, setWireGauge] = useState<"2.0mm" | "2.5mm">("2.5mm");
  const [spacing, setSpacing] = useState<"50mm" | "75mm">("50mm");
  const [safetyNetType, setSafetyNetType] = useState<"balconyStandard" | "childSafetyHeavy" | "pigeonProtection" | "ductShaftIndustrial" | "coconutTreeNet" | "sportsPracticeNet" | "mosquitoScreenNet">("balconyStandard");
  const [includePigeonNet, setIncludePigeonNet] = useState<boolean>(false);
  const [includeMosquitoMesh, setIncludeMosquitoMesh] = useState<boolean>(false);
  const [includeClothHanger, setIncludeClothHanger] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("Hyderabad");

  const calcInput: CalculationInput = {
    productType,
    unit,
    width: Number(width) || 0,
    height: Number(height) || 0,
    wireGauge,
    spacing,
    safetyNetType,
    includePigeonNet,
    includeMosquitoMesh,
    includeClothHanger,
  };

  const result = useMemo(() => calculateQuote(calcInput), [
    productType, unit, width, height, wireGauge, spacing, safetyNetType, includePigeonNet, includeMosquitoMesh, includeClothHanger
  ]);

  const activeAddonsList = useMemo(() => {
    const list: string[] = [];
    if (includePigeonNet && productType === "invisible-grill") list.push("Pigeon Net");
    if (includeMosquitoMesh) list.push("Mosquito Mesh");
    if (includeClothHanger) list.push("Cloth Hanger");
    return list;
  }, [includePigeonNet, includeMosquitoMesh, includeClothHanger, productType]);

  const whatsappUrl = useMemo(() => {
    const productName = productType === "invisible-grill" ? "Invisible Grill" : "Safety Net";
    const netLabels: Record<string, string> = {
      balconyStandard: "Balcony Standard Mesh (₹25/sqft)",
      childSafetyHeavy: "Child Safety Heavy Mesh (₹35/sqft)",
      pigeonProtection: "Anti-Pigeon 28mm Translucent Net (₹28/sqft)",
      ductShaftIndustrial: "Utility Duct & Shaft Net (₹22/sqft)",
      coconutTreeNet: "Coconut Palm Canopy Net (₹26/sqft)",
      sportsPracticeNet: "Sports Cricket Practice Net (₹18/sqft)",
      mosquitoScreenNet: "Mosquito Screen Mesh (₹45/sqft)"
    };
    const configDetail = productType === "invisible-grill"
      ? `Wire: ${wireGauge} SS316, Spacing: ${spacing}`
      : `Type: ${netLabels[safetyNetType] || safetyNetType}`;

    return buildWhatsAppLink({
      product: productName,
      width: width,
      height: height,
      unit: unit,
      area: `${result.billableAreaSqFt} sq.ft (${result.actualAreaSqFt} actual sq.ft)`,
      configuration: configDetail,
      addons: activeAddonsList,
      estimatedAmount: `${formatINR(result.estimatedMin)} – ${formatINR(result.estimatedMax)}`,
      city: selectedCity,
      source: "Smart Cost Estimator"
    });
  }, [productType, wireGauge, spacing, safetyNetType, width, height, unit, result, activeAddonsList, selectedCity]);

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      border: '1px solid #E2E8F0',
      padding: '2rem',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      {/* Estimator Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#E0F2FE', padding: '0.6rem', borderRadius: '10px', color: '#0284C7' }}>
            <Calculator size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Smart Cost & Area Estimator</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>Instant indicative price breakdown based on your balcony dimensions</p>
          </div>
        </div>
        <div style={{ display: 'inline-flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px', border: '1px solid #E2E8F0' }}>
          <button
            type="button"
            onClick={() => setUnit('feet')}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: unit === 'feet' ? '#0284C7' : 'transparent',
              color: unit === 'feet' ? '#FFFFFF' : '#475569'
            }}
          >
            Feet (ft)
          </button>
          <button
            type="button"
            onClick={() => setUnit('meters')}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: unit === 'meters' ? '#0284C7' : 'transparent',
              color: unit === 'meters' ? '#FFFFFF' : '#475569'
            }}
          >
            Meters (m)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {/* Left Inputs Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Step 1: Product Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
              1. Select Solution
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setProductType('invisible-grill')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: productType === 'invisible-grill' ? '2px solid #0284C7' : '1px solid #E2E8F0',
                  background: productType === 'invisible-grill' ? '#F0F9FF' : '#F8FAFC',
                  color: '#0F172A',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Invisible Grills</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>SS316 Marine (70% Choice)</div>
              </button>
              <button
                type="button"
                onClick={() => setProductType('safety-net')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: productType === 'safety-net' ? '2px solid #0284C7' : '1px solid #E2E8F0',
                  background: productType === 'safety-net' ? '#F0F9FF' : '#F8FAFC',
                  color: '#0F172A',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Safety Nets</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>UV Monofilament Mesh</div>
              </button>
            </div>
          </div>

          {/* Step 2: Dimensions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                2. Balcony / Window Dimensions ({unit})
              </label>
              <span style={{ fontSize: '0.8rem', color: '#0284C7', fontWeight: 600 }}>
                {result.actualAreaSqFt} sq.ft
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Width ({unit})</label>
                <input
                  type="number"
                  min="2"
                  max="100"
                  step="0.5"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Height ({unit})</label>
                <input
                  type="number"
                  min="2"
                  max="50"
                  step="0.5"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 3: Product Configuration */}
          {productType === "invisible-grill" ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Wire Gauge Specification
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setWireGauge('2.0mm')}
                    style={{
                      padding: '0.55rem',
                      borderRadius: '8px',
                      border: wireGauge === '2.0mm' ? '2px solid #0284C7' : '1px solid #E2E8F0',
                      background: wireGauge === '2.0mm' ? '#E0F2FE' : '#F8FAFC',
                      color: wireGauge === '2.0mm' ? '#0369A1' : '#475569',
                      fontWeight: wireGauge === '2.0mm' ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    2.0 mm Standard (₹190/sqft)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWireGauge('2.5mm')}
                    style={{
                      padding: '0.55rem',
                      borderRadius: '8px',
                      border: wireGauge === '2.5mm' ? '2px solid #0284C7' : '1px solid #E2E8F0',
                      background: wireGauge === '2.5mm' ? '#E0F2FE' : '#F8FAFC',
                      color: wireGauge === '2.5mm' ? '#0369A1' : '#475569',
                      fontWeight: wireGauge === '2.5mm' ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    2.5 mm Heavy-Duty (₹225/sqft)
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Wire Spacing
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setSpacing('50mm')}
                    style={{
                      padding: '0.55rem',
                      borderRadius: '8px',
                      border: spacing === '50mm' ? '2px solid #0284C7' : '1px solid #E2E8F0',
                      background: spacing === '50mm' ? '#E0F2FE' : '#F8FAFC',
                      color: spacing === '50mm' ? '#0369A1' : '#475569',
                      fontWeight: spacing === '50mm' ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    50 mm (2" Child/Pet Safe)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpacing('75mm')}
                    style={{
                      padding: '0.55rem',
                      borderRadius: '8px',
                      border: spacing === '75mm' ? '2px solid #0284C7' : '1px solid #E2E8F0',
                      background: spacing === '75mm' ? '#E0F2FE' : '#F8FAFC',
                      color: spacing === '75mm' ? '#0369A1' : '#475569',
                      fontWeight: spacing === '75mm' ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    75 mm (3" Panoramic View)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                Safety Net Purpose
              </label>
              <select
                value={safetyNetType}
                onChange={(e: any) => setSafetyNetType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                <option value="balconyStandard">Balcony Standard Fall Mesh (₹25/sqft)</option>
                <option value="childSafetyHeavy">Child Safety Heavy Mesh (₹35/sqft)</option>
                <option value="pigeonProtection">Anti-Pigeon 28mm Translucent Net (₹28/sqft)</option>
                <option value="ductShaftIndustrial">Utility Duct & Shaft Netting (₹22/sqft)</option>
                <option value="coconutTreeNet">Coconut Tree Canopy Defense Net (₹26/sqft)</option>
                <option value="sportsPracticeNet">Sports & Cricket Rooftop Net (₹18/sqft)</option>
                <option value="mosquitoScreenNet">Mosquito Fiberglass Screen Mesh (₹45/sqft)</option>
              </select>
            </div>
          )}

          {/* Step 4: Optional Add-ons */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
              Optional Value Add-ons
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {productType === 'invisible-grill' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includePigeonNet}
                    onChange={(e) => setIncludePigeonNet(e.target.checked)}
                    style={{ accentColor: '#0284C7', width: '16px', height: '16px' }}
                  />
                  <span>Dual Protection: Add Pigeon Net Layer (+₹22/sqft)</span>
                </label>
              )}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeMosquitoMesh}
                  onChange={(e) => setIncludeMosquitoMesh(e.target.checked)}
                  style={{ accentColor: '#0284C7', width: '16px', height: '16px' }}
                />
                <span>Add Mosquito Fiberglass Mesh (+₹38/sqft)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeClothHanger}
                  onChange={(e) => setIncludeClothHanger(e.target.checked)}
                  style={{ accentColor: '#0284C7', width: '16px', height: '16px' }}
                />
                <span>Ceiling Cloth Drying Hanger 6-Pipe (+₹2,450)</span>
              </label>
            </div>
          </div>

          {/* Location Picker */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
              Your City / Area
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              <option value="Hyderabad">Hyderabad (Gachibowli, Kondapur, Hitec City, etc.)</option>
              <option value="Visakhapatnam">Visakhapatnam (Beach Road, MVP Colony, Madhurawada)</option>
              <option value="Vijayawada">Vijayawada (Benz Circle, Kanuru, Tadepalli)</option>
              <option value="Other Area">Other Region (Telangana / Andhra Pradesh)</option>
            </select>
          </div>
        </div>

        {/* Right Output & CTA Column */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0284C7', fontWeight: 800 }}>
                Quotation Summary
              </span>
              <span style={{ fontSize: '0.75rem', color: '#15803D', background: '#DCFCE7', border: '1px solid #BBF7D0', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: 700 }}>
                Free Site Visit Included
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#334155', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Product Selected:</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{productType === 'invisible-grill' ? 'SS316 Invisible Grill' : 'HDPE Safety Net'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Opening Size:</span>
                <span style={{ fontWeight: 600 }}>{width} × {height} {unit}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Calculated Area:</span>
                <span>{result.actualAreaSqFt} sq.ft</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Billable Area:</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{result.billableAreaSqFt} sq.ft</span>
              </div>
              {result.isMinimumApplied && (
                <div style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600 }}>
                  * Minimum billable opening area is {pricing.minimumBillableAreaSqFt} sq.ft
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Effective Rate:</span>
                <span style={{ fontWeight: 600 }}>₹{result.ratePerSqFt} / sq.ft</span>
              </div>
              {result.addOnsBreakdown.map((addon, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748B' }}>
                  <span>+ {addon.name}</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{formatINR(addon.cost)}</span>
                </div>
              ))}
            </div>

            {/* Price Total Range */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginBottom: '0.2rem' }}>Estimated Planning Range:</div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span>{formatINR(result.estimatedMin)}</span>
                <span style={{ fontSize: '1.2rem', color: '#94A3B8', fontWeight: 400 }}>–</span>
                <span>{formatINR(result.estimatedMax)}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                {productType === 'invisible-grill'
                  ? 'Inclusive of SS316 marine cables, aerospace aluminium tracks & standard installation.'
                  : 'Inclusive of virgin UV-stabilized polymer mesh, SS304 anchor fasteners & professional installation.'}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={18} />
              <span>Get Exact Quote on WhatsApp</span>
            </a>

            <a
              href={`tel:${business.phoneRaw}`}
              className="btn btn-outline"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.65rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                textDecoration: 'none'
              }}
            >
              <span>Or Call Our Technical Lead: {business.phone}</span>
            </a>

            <p style={{ fontSize: '0.72rem', color: '#64748B', textAlign: 'center', margin: 0 }}>
              {pricing.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
