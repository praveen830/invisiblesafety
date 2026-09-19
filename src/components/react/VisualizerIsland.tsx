import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  RefreshCw,
  MessageCircle,
  ArrowRight,
  Sliders,
  Eye,
  Check
} from 'lucide-react';
import { business } from '../../data/business';
import { buildWhatsAppLink } from '../../utils/whatsapp';

interface PresetSpace {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
}

const PRESET_SPACES: PresetSpace[] = [
  {
    id: "panoramic-balcony",
    name: "Skyline High-Rise Balcony",
    type: "Residential Balcony (15th - 40th Floor)",
    description: "Wide panoramic opening overlooking cityscape, requiring fall protection without blocking sunset view.",
    image: "/images/hero-balcony.webp"
  },
  {
    id: "french-window",
    name: "Master Bedroom French Windows",
    type: "Floor-to-Ceiling Aperture",
    description: "Expansive glass facade requiring child and pet protection while allowing full breeze and daylight.",
    image: "/images/window-invisible-grills.webp"
  },
  {
    id: "terrace-deck",
    name: "Open Terrace & Sky Lounge",
    type: "Open Skydeck Perimeter",
    description: "High-wind exposed terrace deck requiring 400+ kg structural integrity.",
    image: "/images/safety-net-balcony.webp"
  }
];

interface ProductOption {
  id: string;
  name: string;
  tag: string;
  rate: string;
  warranty: string;
  spec: string;
}

const PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: "invisible-grill-vertical",
    name: "SS316 Invisible Grills (Vertical)",
    tag: "Flagship Architectural Standard",
    rate: "₹190/sq.ft",
    warranty: "10-Year Direct Warranty",
    spec: "50mm Child-Safe Spacing • 400+ kgf Tensile Force"
  },
  {
    id: "invisible-grill-horizontal",
    name: "SS316 Invisible Grills (Horizontal)",
    tag: "Ultra-Wide Panoramic Vista",
    rate: "₹195/sq.ft",
    warranty: "10-Year Direct Warranty",
    spec: "Aesthetic Horizontal Lines • Zero Horizon Clutter"
  },
  {
    id: "pigeon-net",
    name: "Translucent Anti-Pigeon Shield",
    tag: "100% Humane Bird Exclusion",
    rate: "₹28/sq.ft",
    warranty: "3-Year UV Anti-Sag",
    spec: "0.7mm Monofilament Mesh • Zero Daylight Loss"
  },
  {
    id: "child-safety",
    name: "Child Safety Reinforced Mesh",
    tag: "Zero-Climb Fall Barrier",
    rate: "₹26/sq.ft",
    warranty: "3-Year Certified Protection",
    spec: "Tested 250+ kg Load • Virgin Garware Polymer"
  }
];

export default function VisualizerIsland() {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>("panoramic-balcony");
  const [selectedProduct, setSelectedProduct] = useState<string>("invisible-grill-vertical");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload'>('presets');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPreset = PRESET_SPACES.find(p => p.id === selectedSpaceId) || PRESET_SPACES[0];
  const currentProduct = PRODUCT_OPTIONS.find(p => p.id === selectedProduct) || PRODUCT_OPTIONS[0];
  const activeImage = customImage || currentPreset.image;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
        setActiveTab('upload');
        setTimeout(() => {
          setIsProcessing(false);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  // Split slider drag handling
  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const whatsappVisualizerUrl = buildWhatsAppLink({
    product: currentProduct.name,
    configuration: `Visualized on ${customImage ? 'Customer Balcony Photo' : currentPreset.name}`,
    leadSource: "See It On Your Home Studio",
    estimatedAmount: `${currentProduct.rate} (Approx.)`
  });

  return (
    <div style={{
      background: 'linear-gradient(180deg, #0F172A 0%, #090D16 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(56, 189, 248, 0.25)',
      boxShadow: '0 25px 65px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      overflow: 'hidden',
      color: '#FFFFFF'
    }}>
      {/* Studio Top Control Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.25rem 1.75rem',
        background: 'rgba(15, 23, 42, 0.85)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(2, 132, 199, 0.2)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38BDF8'
          }}>
            <Sparkles size={17} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.02em' }}>
              ARCHITECTURAL SIMULATION STUDIO
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
              Drag split-slider to compare Unprotected Void vs InvisProtect SS316
            </div>
          </div>
        </div>

        {/* Space Source Tabs: Presets vs Upload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(30, 41, 59, 0.7)', padding: '0.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            type="button"
            onClick={() => { setActiveTab('presets'); setCustomImage(null); }}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '7px',
              border: 'none',
              background: activeTab === 'presets' ? '#0284C7' : 'transparent',
              color: activeTab === 'presets' ? '#FFFFFF' : '#94A3B8',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sample Balconies
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '7px',
              border: 'none',
              background: activeTab === 'upload' ? '#10B981' : 'transparent',
              color: activeTab === 'upload' ? '#FFFFFF' : '#94A3B8',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Upload size={13} />
            <span>Upload Your Balcony</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Main Studio Interactive Workspace */}
      <div style={{ padding: '1.75rem' }}>
        {/* Preset Spaces Picker (Visible in presets tab) */}
        {activeTab === 'presets' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.25rem'
          }}>
            {PRESET_SPACES.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedSpaceId(preset.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '12px',
                  border: selectedSpaceId === preset.id ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: selectedSpaceId === preset.id ? 'rgba(56, 189, 248, 0.12)' : 'rgba(30, 41, 59, 0.5)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <img src={preset.image} alt={preset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{preset.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{preset.type}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Product Selection Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '0.65rem',
          marginBottom: '1.5rem'
        }}>
          {PRODUCT_OPTIONS.map(prod => (
            <button
              key={prod.id}
              type="button"
              onClick={() => setSelectedProduct(prod.id)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: selectedProduct === prod.id ? '2px solid #0284C7' : '1px solid rgba(255, 255, 255, 0.08)',
                background: selectedProduct === prod.id ? 'rgba(2, 132, 199, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: '#FFFFFF',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: selectedProduct === prod.id ? '#38BDF8' : '#F1F5F9' }}>
                  {prod.name}
                </span>
                {selectedProduct === prod.id && (
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={11} color="#FFFFFF" />
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '0.35rem' }}>{prod.tag}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.75rem' }}>
                <span style={{ color: '#38BDF8', fontWeight: 800 }}>{prod.rate}</span>
                <span style={{ color: '#10B981', fontWeight: 600 }}>{prod.warranty}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Live Interactive Before / After Split Slider */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{
            position: 'relative',
            height: '460px',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
            cursor: 'ew-resize',
            userSelect: 'none'
          }}
        >
          {/* Layer 1: BEFORE (Unprotected Balcony without wires) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${activeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {/* Before Tag */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(239, 68, 68, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              <span>⚠️ BEFORE: UNPROTECTED VOID</span>
            </div>
          </div>

          {/* Layer 2: AFTER (With InvisProtect Installed) - Clipped by Slider */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            backgroundImage: `url(${activeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {/* Subtly refined architectural clarity filter */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(2, 132, 199, 0.05)',
              pointerEvents: 'none'
            }}></div>

            {/* Vertical Wire Simulation */}
            {selectedProduct === "invisible-grill-vertical" && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'space-around',
                padding: '0 1rem',
                pointerEvents: 'none'
              }}>
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '2px',
                      height: '100%',
                      background: 'linear-gradient(180deg, rgba(226, 232, 240, 0.4) 0%, rgba(255, 255, 255, 0.95) 45%, rgba(226, 232, 240, 0.4) 100%)',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.6), 0 0 1px rgba(2, 132, 199, 0.8)'
                    }}
                  />
                ))}
                {/* Aerospace Extruded Aluminium Mounting Tracks */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '16px', background: '#334155', borderBottom: '2px solid #64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>6063-T6 Top Track Anchor</span>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '16px', background: '#334155', borderTop: '2px solid #64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Precision Tension Base Track</span>
                </div>
              </div>
            )}

            {/* Horizontal Wire Simulation */}
            {selectedProduct === "invisible-grill-horizontal" && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                padding: '1rem 0',
                pointerEvents: 'none'
              }}>
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '2px',
                      width: '100%',
                      background: 'linear-gradient(90deg, rgba(226, 232, 240, 0.4) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(226, 232, 240, 0.4) 100%)',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)'
                    }}
                  />
                ))}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '16px', background: '#334155', borderRight: '2px solid #64748B' }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '16px', background: '#334155', borderLeft: '2px solid #64748B' }} />
              </div>
            )}

            {/* Pigeon Net Simulation */}
            {selectedProduct === "pigeon-net" && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1.2px, transparent 1.2px)',
                backgroundSize: '22px 22px',
                pointerEvents: 'none'
              }}>
                <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(22, 163, 74, 0.6)' }} />
              </div>
            )}

            {/* Child Safety Reinforced Simulation */}
            {selectedProduct === "child-safety" && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }}>
                <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(2, 132, 199, 0.7)' }} />
              </div>
            )}

            {/* After Tag */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(2, 132, 199, 0.9)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              <ShieldCheck size={14} color="#FFFFFF" />
              <span>AFTER: {currentProduct.name}</span>
            </div>

            {/* Live Technical Specs HUD on After Side */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              fontSize: '0.75rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8', fontWeight: 800 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }}></span>
                <span>ARCHITECTURAL HUD METRICS</span>
              </div>
              <div style={{ color: '#E2E8F0', fontWeight: 600 }}>{currentProduct.spec}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.7rem' }}>Preserves 98% Natural Skyline Light & Ventilation</div>
            </div>
          </div>

          {/* Draggable Divider Line & Controller Handle */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '3px',
            background: '#FFFFFF',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(56, 189, 248, 0.8)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}>
            {/* Center Slider Knob */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#0284C7',
              border: '3px solid #FFFFFF',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Sliders size={20} />
            </div>
          </div>
        </div>

        {/* Slider Instructions Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginTop: '1rem',
          fontSize: '0.76rem',
          color: '#94A3B8'
        }}>
          <div>
            <span>👈 Drag handle or move cursor across image to reveal installation</span>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>✓ 400+ kg Breaking Load</span>
            <span>✓ Japanese AISI 316 Stainless Steel</span>
            <span>✓ Non-Combustible Fire Egress</span>
          </div>
        </div>
      </div>

      {/* Conversion Action Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        padding: '1.5rem 1.75rem',
        background: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 0.2rem 0' }}>
            Ready to inspect real physical SS316 wire samples?
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0 }}>
            Our structural engineer will visit your home with actual mounting tracks and perform precision laser measurement.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href={whatsappVisualizerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
          >
            <MessageCircle size={16} />
            <span>Send Photo on WhatsApp</span>
          </a>
          <a
            href="/invisible-grill-cost/"
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
          >
            <span>Instant Price Estimator</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
