import React, { useState, useRef } from 'react';
import { business } from '../../data/business';
import {
  Eye,
  Sun,
  Sunset,
  Moon,
  Shield,
  MessageCircle,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MoveHorizontal
} from 'lucide-react';

interface PresetSpace {
  id: string;
  name: string;
  type: string;
  image: string;
  // Opening aperture percentage relative to image [top, left, width, height]
  aperture: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const PRESET_SPACES: PresetSpace[] = [
  {
    id: "balcony",
    name: "Apartment Balcony",
    type: "High-Rise Living Room Balcony",
    image: "/images/hero-balcony.webp",
    aperture: { top: 12, left: 18, width: 80, height: 76 }
  },
  {
    id: "window",
    name: "French Windows",
    type: "Floor-to-Ceiling Bedroom Window",
    image: "/images/window-invisible-grills.webp",
    aperture: { top: 14, left: 16, width: 72, height: 80 }
  },
  {
    id: "staircase",
    name: "Duplex Staircase",
    type: "Interior Staircase Void",
    image: "/images/staircase-invisible-grills.webp",
    aperture: { top: 8, left: 22, width: 60, height: 86 }
  }
];

export default function VisualizerIsland() {
  const [selectedSpace, setSelectedSpace] = useState<PresetSpace>(PRESET_SPACES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [solutionType, setSolutionType] = useState<"vertical" | "horizontal" | "net">("vertical");
  const [spacing, setSpacing] = useState<"50mm" | "75mm">("50mm");
  const [wireGauge, setWireGauge] = useState<"2.0mm" | "2.5mm">("2.5mm");
  const [ambientLight, setAmbientLight] = useState<"day" | "dusk" | "night">("day");
  const [viewMode, setViewMode] = useState<"installed" | "split" | "before">("installed");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [customAperture, setCustomAperture] = useState<{ top: number; left: number; width: number; height: number }>({
    top: 10,
    left: 10,
    width: 80,
    height: 80
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef(false);

  // Handle custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const activeAperture = customImage ? customAperture : selectedSpace.aperture;
  const currentImageSrc = customImage || selectedSpace.image;

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px -4px rgba(15, 23, 42, 0.08)',
      maxWidth: '1140px',
      margin: '0 auto'
    }}>
      {/* Top Header & Actions */}
      <div style={{
        padding: '1rem clamp(1rem, 2.5vw, 2rem)',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: '#F8FAFC'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              PRACTICAL HOME VISUALIZER
            </span>
            <span style={{ fontSize: '0.75rem', background: '#DCFCE7', color: '#16A34A', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
              Live Architectural Preview
            </span>
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Visualize Invisible Grills On Your Balcony
          </h3>
        </div>

        {/* View Mode Toggle: Installed vs Split vs Before */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', padding: '3px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
          <button
            type="button"
            onClick={() => setViewMode('installed')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'installed' ? '#2563EB' : 'transparent',
              color: viewMode === 'installed' ? '#FFFFFF' : '#475569',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Grills Installed
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'split' ? '#2563EB' : 'transparent',
              color: viewMode === 'split' ? '#FFFFFF' : '#475569',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Before / After Slider
          </button>
          <button
            type="button"
            onClick={() => setViewMode('before')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'before' ? '#2563EB' : 'transparent',
              color: viewMode === 'before' ? '#FFFFFF' : '#475569',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Original Open View
          </button>
        </div>
      </div>

      {/* Main Studio Body: Left Controls + Right Architectural Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr' }}>
        {/* Left Column: Interactive Controls */}
        <div style={{
          padding: '1.5rem',
          borderRight: '1px solid #E2E8F0',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Upload Custom Balcony Photo Option */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                1. APARTMENT PHOTO
              </label>
              {customImage && (
                <button
                  type="button"
                  onClick={() => setCustomImage(null)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#DC2626',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <RotateCcw size={12} /> Reset to Presets
                </button>
              )}
            </div>

            {/* Upload Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1.5px dashed #2563EB',
                background: '#EFF6FF',
                color: '#1D4ED8',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                transition: 'background 0.15s ease'
              }}
            >
              <Upload size={16} />
              <span>{customImage ? 'Upload Different Photo' : 'Upload Your Balcony / Window'}</span>
            </button>

            {/* Presets Grid */}
            {!customImage && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {PRESET_SPACES.map((space) => (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => setSelectedSpace(space)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      border: selectedSpace.id === space.id ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                      background: selectedSpace.id === space.id ? '#F0F7FF' : '#FFFFFF',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <img
                      src={space.image}
                      alt={space.name}
                      style={{ width: '42px', height: '32px', borderRadius: '4px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: selectedSpace.id === space.id ? '#1E40AF' : '#0F172A' }}>
                        {space.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                        {space.type}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Solution Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.45rem' }}>
              2. SAFETY SYSTEM
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { id: 'vertical', name: 'SS316 Vertical Invisible Grills', tag: 'Flagship standard' },
                { id: 'horizontal', name: 'SS316 Horizontal Invisible Grills', tag: 'Panoramic lines' },
                { id: 'net', name: 'Translucent Balcony Safety Net', tag: 'High-density polymer' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSolutionType(item.id as any)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: solutionType === item.id ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                    background: solutionType === item.id ? '#EFF6FF' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: solutionType === item.id ? '#1E40AF' : '#334155' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    {item.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Wire Spacing & Gauge if Invisible Grills */}
          {solutionType !== 'net' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  WIRE SPACING
                </label>
                <select
                  value={spacing}
                  onChange={(e) => setSpacing(e.target.value as "50mm" | "75mm")}
                  style={{
                    width: '100%',
                    padding: '0.45rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#0F172A',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="50mm">50 mm (Child Safe)</option>
                  <option value="75mm">75 mm (Open Vista)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  CABLE GAUGE
                </label>
                <select
                  value={wireGauge}
                  onChange={(e) => setWireGauge(e.target.value as "2.0mm" | "2.5mm")}
                  style={{
                    width: '100%',
                    padding: '0.45rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#0F172A',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="2.5mm">2.5 mm High-Rise</option>
                  <option value="2.0mm">2.0 mm Standard</option>
                </select>
              </div>
            </div>
          )}

          {/* Time of Day Lighting Toggle */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
              NATURAL LIGHTING
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setAmbientLight('day')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  border: ambientLight === 'day' ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                  background: ambientLight === 'day' ? '#EFF6FF' : '#FFFFFF',
                  color: ambientLight === 'day' ? '#1E40AF' : '#475569',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Sun size={13} /> Day
              </button>
              <button
                type="button"
                onClick={() => setAmbientLight('dusk')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  border: ambientLight === 'dusk' ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                  background: ambientLight === 'dusk' ? '#EFF6FF' : '#FFFFFF',
                  color: ambientLight === 'dusk' ? '#1E40AF' : '#475569',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Sunset size={13} /> Sunset
              </button>
              <button
                type="button"
                onClick={() => setAmbientLight('night')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  border: ambientLight === 'night' ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                  background: ambientLight === 'night' ? '#EFF6FF' : '#FFFFFF',
                  color: ambientLight === 'night' ? '#1E40AF' : '#475569',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Moon size={13} /> Evening
              </button>
            </div>
          </div>

          {/* Quick Quote Action */}
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
            <a
              href={`https://wa.me/${business.whatsapp}?text=Hi%20Invisible Safety%2C%20I%20tested%20the%20Visualizer%20for%20${solutionType === 'vertical' ? 'Vertical%20SS316%20Grills' : solutionType === 'horizontal' ? 'Horizontal%20SS316%20Grills' : 'Balcony%20Safety%20Nets'}%20(${spacing})%20and%20would%20like%20a%20site%20measurement%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: '#16A34A',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: '0.75rem',
                borderRadius: '8px',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={17} />
              <span>Get Quote for This Setup</span>
            </a>
          </div>
        </div>

        {/* Right Column: Realistic Architectural Stage */}
        <div
          ref={containerRef}
          onMouseMove={(e) => isDraggingSlider.current && handleSliderMove(e.clientX)}
          onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
          onMouseUp={() => { isDraggingSlider.current = false; }}
          onMouseLeave={() => { isDraggingSlider.current = false; }}
          style={{
            position: 'relative',
            minHeight: '520px',
            background: '#0F172A',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: viewMode === 'split' ? 'ew-resize' : 'default',
            userSelect: 'none'
          }}
        >
          {/* Base Apartment Image */}
          <img
            src={currentImageSrc}
            alt={selectedSpace.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: ambientLight === 'dusk'
                ? 'brightness(0.88) sepia(0.2) hue-rotate(-15deg)'
                : ambientLight === 'night'
                ? 'brightness(0.6) contrast(1.1) saturate(0.8)'
                : 'none',
              transition: 'filter 0.3s ease'
            }}
          />

          {/* Grills / Mesh Realistic Architectural Overlay */}
          {viewMode !== 'before' && (
            <div
              style={{
                position: 'absolute',
                top: `${activeAperture.top}%`,
                left: `${activeAperture.left}%`,
                width: `${activeAperture.width}%`,
                height: `${activeAperture.height}%`,
                pointerEvents: 'none',
                overflow: 'hidden',
                // If split mode, clip to slider percentage
                clipPath: viewMode === 'split' ? `inset(0 0 0 ${sliderPosition}%)` : 'none',
                transition: viewMode === 'split' ? 'none' : 'all 0.25s ease'
              }}
            >
              {/* Top Structural Mounting Track Bar */}
              {solutionType !== 'net' && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '14px',
                  background: 'linear-gradient(180deg, #64748B 0%, #1E293B 70%, #0F172A 100%)',
                  borderRadius: '2px',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  zIndex: 2
                }}>
                  {/* Screws / Anchors representation */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CBD5E1', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.6)' }} />
                  ))}
                </div>
              )}

              {/* Bottom Structural Mounting Track Bar */}
              {solutionType !== 'net' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '14px',
                  background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 70%, #334155 100%)',
                  borderRadius: '2px',
                  boxShadow: '0 -3px 8px rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  zIndex: 2
                }}>
                  {/* Screws / Anchors representation */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CBD5E1', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.6)' }} />
                  ))}
                </div>
              )}

              {/* Realistic Vertical Cables */}
              {solutionType === 'vertical' && (
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  bottom: '14px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  {Array.from({ length: spacing === '50mm' ? 26 : 18 }).map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        width: wireGauge === '2.5mm' ? '2px' : '1.5px',
                        height: '100%',
                        // Realistic SS316 metallic specular core with DuPont nylon reflection
                        background: ambientLight === 'dusk'
                          ? 'linear-gradient(180deg, rgba(254, 215, 170, 0.4) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(251, 146, 60, 0.4) 100%)'
                          : ambientLight === 'night'
                          ? 'linear-gradient(180deg, rgba(148, 163, 184, 0.3) 0%, rgba(226, 232, 240, 0.8) 50%, rgba(100, 116, 139, 0.3) 100%)'
                          : 'linear-gradient(180deg, rgba(226, 232, 240, 0.5) 0%, rgba(255, 255, 255, 0.95) 48%, rgba(203, 213, 225, 0.5) 100%)',
                        boxShadow: '0 0 2px rgba(255, 255, 255, 0.7), 1px 0 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {/* Realistic cross stiffener clamp at mid-height */}
                      {idx % 7 === 3 && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '-2px',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#E2E8F0',
                          border: '1px solid #475569'
                        }} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Realistic Horizontal Cables */}
              {solutionType === 'horizontal' && (
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  bottom: '14px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  {Array.from({ length: spacing === '50mm' ? 20 : 14 }).map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        height: wireGauge === '2.5mm' ? '2px' : '1.5px',
                        width: '100%',
                        background: ambientLight === 'dusk'
                          ? 'linear-gradient(90deg, rgba(254, 215, 170, 0.4) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(251, 146, 60, 0.4) 100%)'
                          : 'linear-gradient(90deg, rgba(226, 232, 240, 0.5) 0%, rgba(255, 255, 255, 0.95) 48%, rgba(203, 213, 225, 0.5) 100%)',
                        boxShadow: '0 0 2px rgba(255, 255, 255, 0.7), 0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Realistic Safety Netting with Border Rope */}
              {solutionType === 'net' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  border: '3px solid rgba(255, 255, 255, 0.6)',
                  borderRadius: '4px',
                  backgroundImage: `
                    linear-gradient(45deg, rgba(255, 255, 255, 0.45) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(255, 255, 255, 0.45) 1px, transparent 1px)
                  `,
                  backgroundSize: '18px 18px',
                  boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)'
                }}>
                  {/* Anchor ties along perimeter */}
                  <div style={{
                    position: 'absolute',
                    inset: '-4px',
                    border: '1px dashed rgba(255, 255, 255, 0.8)',
                    pointerEvents: 'none'
                  }} />
                </div>
              )}
            </div>
          )}

          {/* Draggable Divider for Before / After Split Mode */}
          {viewMode === 'split' && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${sliderPosition}%`,
                  width: '3px',
                  background: '#2563EB',
                  boxShadow: '0 0 8px rgba(37, 99, 235, 0.8)',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              />
              <div
                onMouseDown={() => { isDraggingSlider.current = true; }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${sliderPosition}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'ew-resize',
                  zIndex: 11,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
                  border: '2px solid #FFFFFF'
                }}
              >
                <MoveHorizontal size={16} />
              </div>

              {/* Labels on Split View */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                zIndex: 8
              }}>
                BEFORE (Unenclosed)
              </div>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                zIndex: 8
              }}>
                AFTER (Installed)
              </div>
            </>
          )}

          {/* Architectural Overlay Status Pill at bottom */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '6px 14px',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 8
          }}>
            <Shield size={15} color="#38BDF8" />
            <span>
              {viewMode === 'before'
                ? 'Original Open Opening (No Fall Protection)'
                : `${solutionType === 'vertical' ? 'Vertical SS316 Grills' : solutionType === 'horizontal' ? 'Horizontal SS316 Grills' : 'Balcony Safety Net'} (${spacing} • ${wireGauge})`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
