import React, { useState, useMemo } from 'react';
import { business } from '../../data/business';
import { calculateQuote, formatINR, type CalculationInput } from '../../utils/calculator';
import { buildWhatsAppLink } from '../../utils/whatsapp';
import { Calculator, MessageCircle, CheckCircle2, Info, MapPin } from 'lucide-react';

export default function CostEstimator() {
  const [productType, setProductType] = useState<"invisible-grill" | "safety-net">("invisible-grill");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [width, setWidth] = useState<number>(12);
  const [height, setHeight] = useState<number>(6);
  const [wireGauge, setWireGauge] = useState<"2.0mm" | "2.5mm">("2.5mm");
  const [spacing, setSpacing] = useState<"50mm" | "75mm">("50mm");
  const [safetyNetType, setSafetyNetType] = useState<"balconyStandard" | "childSafetyHeavy" | "pigeonProtection" | "ductShaftIndustrial">("balconyStandard");
  const [selectedCity, setSelectedCity] = useState<string>("Hyderabad");

  const calcInput: CalculationInput = {
    productType,
    unit,
    width: Number(width) || 0,
    height: Number(height) || 0,
    wireGauge,
    spacing,
    safetyNetType,
    includePigeonNet: false,
    includeMosquitoMesh: false,
    includeClothHanger: false,
  };

  const result = useMemo(() => calculateQuote(calcInput), [
    productType, unit, width, height, wireGauge, spacing, safetyNetType
  ]);

  const whatsappUrl = useMemo(() => {
    const productName = productType === "invisible-grill" ? "Invisible Grills" : "Safety Nets";
    const configDetail = productType === "invisible-grill"
      ? `${wireGauge} SS316, ${spacing} spacing`
      : `${safetyNetType === 'balconyStandard' ? 'Balcony Standard' : safetyNetType === 'childSafetyHeavy' ? 'Child Safety Heavy' : 'Anti-Pigeon'}`;

    return buildWhatsAppLink({
      product: productName,
      width: width,
      height: height,
      unit: unit,
      area: `${result.actualAreaSqFt} sq.ft`,
      configuration: configDetail,
      addons: [],
      location: selectedCity,
      leadSource: "Free Site Measurement Tool"
    });
  }, [productType, wireGauge, spacing, safetyNetType, width, height, unit, result, selectedCity]);

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: 'clamp(1rem, 3vw, 2rem)',
      boxShadow: '0 4px 20px -4px rgba(15, 23, 42, 0.08)',
      maxWidth: '860px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: '#EFF6FF',
            color: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calculator size={18} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Plan Your Free Site Measurement
          </h3>
        </div>
        <p style={{ fontSize: '0.92rem', color: '#64748B', margin: 0 }}>
          Select your product type, approximate dimensions, and city to request a complimentary laser measurement & custom quote.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem' }}>
        {/* Left Column: Inputs */}
        <div>
          {/* Product Type Toggle */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
              1. Choose Product
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setProductType("invisible-grill")}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: productType === "invisible-grill" ? '2px solid #2563EB' : '1px solid #CBD5E1',
                  background: productType === "invisible-grill" ? '#EFF6FF' : '#FFFFFF',
                  color: productType === "invisible-grill" ? '#1E40AF' : '#334155',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Invisible Grills (SS316)
              </button>
              <button
                type="button"
                onClick={() => setProductType("safety-net")}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: productType === "safety-net" ? '2px solid #2563EB' : '1px solid #CBD5E1',
                  background: productType === "safety-net" ? '#EFF6FF' : '#FFFFFF',
                  color: productType === "safety-net" ? '#1E40AF' : '#334155',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Safety Nets (HDPE)
              </button>
            </div>
          </div>

          {/* Configuration Options */}
          {productType === "invisible-grill" ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Cable Thickness
                </label>
                <select
                  value={wireGauge}
                  onChange={(e) => setWireGauge(e.target.value as "2.0mm" | "2.5mm")}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    color: '#0F172A',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="2.5mm">2.5 mm (Standard High-Rise)</option>
                  <option value="2.0mm">2.0 mm (Standard Residential)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Cable Spacing
                </label>
                <select
                  value={spacing}
                  onChange={(e) => setSpacing(e.target.value as "50mm" | "75mm")}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    color: '#0F172A',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="50mm">50 mm (Child & Pet Safe)</option>
                  <option value="75mm">75 mm (Expansive View)</option>
                </select>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                Safety Net Category
              </label>
              <select
                value={safetyNetType}
                onChange={(e) => setSafetyNetType(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem',
                  color: '#0F172A',
                  background: '#FFFFFF'
                }}
              >
                <option value="balconyStandard">Balcony Standard Anti-Fall Mesh</option>
                <option value="childSafetyHeavy">Child Safety Heavy High-Density Mesh</option>
                <option value="pigeonProtection">Anti-Pigeon 28mm Translucent Net</option>
                <option value="ductShaftIndustrial">Utility Duct & Shaft Heavy-Duty Net</option>
              </select>
            </div>
          )}

          {/* Dimensions Controls */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', margin: 0 }}>
                2. Approximate Dimensions
              </label>
              <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '2px', borderRadius: '6px' }}>
                <button
                  type="button"
                  onClick={() => setUnit("feet")}
                  style={{
                    border: 'none',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: unit === "feet" ? '#FFFFFF' : 'transparent',
                    color: unit === "feet" ? '#0F172A' : '#64748B',
                    boxShadow: unit === "feet" ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  Feet
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("meters")}
                  style={{
                    border: 'none',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: unit === "meters" ? '#FFFFFF' : 'transparent',
                    color: unit === "meters" ? '#0F172A' : '#64748B',
                    boxShadow: unit === "meters" ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  Meters
                </button>
              </div>
            </div>

            {/* Width Slider */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                <span style={{ color: '#475569' }}>Width</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{width} {unit}</span>
              </div>
              <input
                type="range"
                min={unit === 'feet' ? 4 : 1.2}
                max={unit === 'feet' ? 50 : 15}
                step={unit === 'feet' ? 1 : 0.2}
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
              />
            </div>

            {/* Height Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                <span style={{ color: '#475569' }}>Height</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{height} {unit}</span>
              </div>
              <input
                type="range"
                min={unit === 'feet' ? 3 : 0.9}
                max={unit === 'feet' ? 14 : 4.5}
                step={unit === 'feet' ? 0.5 : 0.1}
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* City Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
              3. Service City
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {["Hyderabad", "Visakhapatnam", "Vijayawada"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: selectedCity === city ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                    background: selectedCity === city ? '#EFF6FF' : '#FFFFFF',
                    color: selectedCity === city ? '#1E40AF' : '#475569',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Indicative Estimate Output */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Indicative Estimate Label */}
          <div style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            background: '#EFF6FF',
            color: '#1D4ED8',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            marginBottom: '0.85rem'
          }}>
            SITE-BASED QUOTATION
          </div>

          {/* Area & Price */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.2rem' }}>
              Approximate Opening Area: <strong style={{ color: '#0F172A' }}>{result.actualAreaSqFt} sq. ft</strong>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.25 }}>
              Custom Site-Based Quote
            </div>
            <div style={{
              fontSize: '0.82rem',
              color: '#334155',
              marginTop: '0.65rem',
              lineHeight: 1.5,
              background: '#FEF3C7',
              border: '1px solid #FDE68A',
              borderRadius: '6px',
              padding: '0.65rem 0.8rem',
              display: 'flex',
              gap: '6px',
              alignItems: 'flex-start'
            }}>
              <Info size={16} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                <strong>Accurate Pricing:</strong> Costs depend on building floor height, concrete anchoring points, and curvature. We provide a <strong>100% Free On-Site Laser Measurement</strong> to give you the exact best quote.
              </span>
            </div>
          </div>

          {/* What is Included */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.25rem',
            flexGrow: 1
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.65rem' }}>
              WHAT IS INCLUDED IN EVERY INSTALLATION:
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#16A34A" />
                <span>{productType === 'invisible-grill' ? 'Virgin SS316 marine-grade tensile cables' : 'UV-stabilized virgin polymer netting'}</span>
              </li>
              <li style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#16A34A" />
                <span>{productType === 'invisible-grill' ? '6063-T6 powder-coated aluminium track frames' : 'Heavy-duty perimeter border anchors'}</span>
              </li>
              <li style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#16A34A" />
                <span>Certified technicians with IS 3521 safety harness gear</span>
              </li>
              <li style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#16A34A" />
                <span>Free on-site laser measurement & material demonstration</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: '#16A34A',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.15s ease'
              }}
            >
              <MessageCircle size={18} />
              <span>Book Free Site Visit on WhatsApp</span>
            </a>
            <a
              href="/contact/#quote"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.88rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.15s ease'
              }}
            >
              <span>Schedule Inspection Online</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
