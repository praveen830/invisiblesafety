import React, { useState, useRef, useEffect } from 'react';
import { business } from '../../data/business';
import {
  Sun,
  Sunset,
  Moon,
  Shield,
  MessageCircle,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  MoveHorizontal,
  Download,
  Compass,
  Info
} from 'lucide-react';

export interface Point {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface QuadCorners {
  tl: Point; // Top-Left
  tr: Point; // Top-Right
  br: Point; // Bottom-Right
  bl: Point; // Bottom-Left
}

export interface PresetSpace {
  id: string;
  name: string;
  category: 'balcony' | 'window' | 'staircase' | 'terrace';
  type: string;
  image: string;
  defaultCorners: QuadCorners;
}

export const PRESET_SPACES: PresetSpace[] = [
  {
    id: 'modern-balcony',
    name: 'Modern Apartment Balcony',
    category: 'balcony',
    type: 'High-Rise Living Room Balcony',
    image: '/images/hero-balcony.webp',
    defaultCorners: {
      tl: { x: 34, y: 8 },
      tr: { x: 79, y: 18 },
      br: { x: 79, y: 78 },
      bl: { x: 34, y: 92 }
    }
  },
  {
    id: 'luxury-balcony',
    name: 'Luxury Villa Balcony',
    category: 'balcony',
    type: 'Panoramic High-Ceiling Deck',
    image: '/images/balcony-safety.webp',
    defaultCorners: {
      tl: { x: 18, y: 12 },
      tr: { x: 84, y: 12 },
      br: { x: 84, y: 82 },
      bl: { x: 18, y: 82 }
    }
  },
  {
    id: 'small-balcony',
    name: 'Small Apartment Balcony',
    category: 'balcony',
    type: 'Compact Bedroom Balcony',
    image: '/images/safety-net-balcony.webp',
    defaultCorners: {
      tl: { x: 22, y: 10 },
      tr: { x: 80, y: 10 },
      br: { x: 80, y: 86 },
      bl: { x: 22, y: 86 }
    }
  },
  {
    id: 'french-window',
    name: 'Floor-to-Ceiling Window',
    category: 'window',
    type: 'Master Bedroom French Window',
    image: '/images/window-invisible-grills.webp',
    defaultCorners: {
      tl: { x: 22, y: 12 },
      tr: { x: 82, y: 12 },
      br: { x: 82, y: 88 },
      bl: { x: 22, y: 88 }
    }
  },
  {
    id: 'bedroom-window',
    name: 'Bedroom Bay Window',
    category: 'window',
    type: 'High-Rise Sliding Window',
    image: '/images/projects/prestige-after.webp',
    defaultCorners: {
      tl: { x: 24, y: 14 },
      tr: { x: 78, y: 14 },
      br: { x: 78, y: 84 },
      bl: { x: 24, y: 84 }
    }
  },
  {
    id: 'living-window',
    name: 'Living Room Glass Wall',
    category: 'window',
    type: 'Floor Glass Railing Window',
    image: '/images/invisible-grills-page.webp',
    defaultCorners: {
      tl: { x: 26, y: 8 },
      tr: { x: 86, y: 14 },
      br: { x: 86, y: 82 },
      bl: { x: 26, y: 88 }
    }
  },
  {
    id: 'duplex-staircase',
    name: 'Duplex Open Staircase',
    category: 'staircase',
    type: 'Architectural Stairwell Void',
    image: '/images/staircase-invisible-grills.webp',
    defaultCorners: {
      tl: { x: 30, y: 6 },
      tr: { x: 74, y: 12 },
      br: { x: 74, y: 92 },
      bl: { x: 30, y: 88 }
    }
  },
  {
    id: 'stairwell-void',
    name: 'Open Building Stairwell',
    category: 'staircase',
    type: 'Multi-Floor Open Railing',
    image: '/images/duct-net.webp',
    defaultCorners: {
      tl: { x: 20, y: 8 },
      tr: { x: 80, y: 8 },
      br: { x: 80, y: 92 },
      bl: { x: 20, y: 92 }
    }
  },
  {
    id: 'terrace-deck',
    name: 'Rooftop Terrace',
    category: 'terrace',
    type: 'Open Sky Terrace Perimeter',
    image: '/images/terrace-top-net.jpg',
    defaultCorners: {
      tl: { x: 14, y: 18 },
      tr: { x: 88, y: 18 },
      br: { x: 88, y: 84 },
      bl: { x: 14, y: 84 }
    }
  }
];

export default function VisualizerIsland() {
  const [selectedSpace, setSelectedSpace] = useState<PresetSpace>(PRESET_SPACES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'balcony' | 'window' | 'staircase' | 'terrace'>('all');

  // Installation settings
  const [solutionType, setSolutionType] = useState<'vertical' | 'horizontal' | 'net' | 'combo'>('vertical');
  const [spacing, setSpacing] = useState<'50mm' | '75mm' | '100mm'>('50mm');
  const [wireGauge, setWireGauge] = useState<'2.0mm' | '2.5mm' | '3.0mm'>('2.5mm');
  const [finish, setFinish] = useState<'marine' | 'silver' | 'anthracite'>('marine');
  const [netDensity, setNetDensity] = useState<'fine' | 'heavy'>('fine');
  const [ambientLight, setAmbientLight] = useState<'day' | 'sunset' | 'evening'>('day');

  // Interactive Perspective Boundaries
  const [corners, setCorners] = useState<QuadCorners>(PRESET_SPACES[0].defaultCorners);
  const [isAdjustingPerspective, setIsAdjustingPerspective] = useState<boolean>(false);
  const [activeCornerDrag, setActiveCornerDrag] = useState<keyof QuadCorners | null>(null);

  // View & Comparison
  const [viewMode, setViewMode] = useState<'installed' | 'split' | 'before'>('installed');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // AI Generation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef<boolean>(false);

  // Reset corners when preset changes
  useEffect(() => {
    if (!customImage) {
      setCorners(selectedSpace.defaultCorners);
    }
  }, [selectedSpace, customImage]);

  // Handle image upload with validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      alert('Please upload a valid image file (JPG, JPEG, PNG, or WEBP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('Image file size is too large (Maximum 15MB allowed).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomImage(event.target.result as string);
        // Default perspective boundary for user photos
        setCorners({
          tl: { x: 18, y: 12 },
          tr: { x: 82, y: 12 },
          br: { x: 82, y: 84 },
          bl: { x: 18, y: 84 }
        });
        triggerAIGeneration();
      }
    };
    reader.readAsDataURL(file);
  };

  // Simulate AI Architectural Processing Workflow
  const triggerAIGeneration = () => {
    setIsGenerating(true);
    setGenerationStep('Analyzing architectural perspective and vanishing points...');
    setTimeout(() => {
      setGenerationStep('Computing 3D opening geometry and anchor planes...');
    }, 450);
    setTimeout(() => {
      setGenerationStep('Synthesizing SS316 marine cables & specular reflection model...');
    }, 950);
    setTimeout(() => {
      setGenerationStep('Refining ambient light and final architectural blend...');
    }, 1350);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setViewMode('installed');
    }, 1700);
  };

  // Slider Mouse/Touch Controls
  const handleSliderMove = (clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Draggable Perspective Pin Controls
  const handleCornerMove = (clientX: number, clientY: number) => {
    if (!activeCornerDrag || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    setCorners((prev) => ({
      ...prev,
      [activeCornerDrag]: { x, y }
    }));
  };

  // Download high-resolution visualization
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentImageSrc;
    img.onload = () => {
      canvas.width = img.naturalWidth || 1200;
      canvas.height = img.naturalHeight || 800;

      // Draw original photo
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw perspective cables
      const numLines = spacing === '50mm' ? 24 : spacing === '75mm' ? 16 : 12;
      const strokeW = (wireGauge === '2.0mm' ? 1.8 : wireGauge === '2.5mm' ? 2.4 : 3.0) * (canvas.width / 800);

      ctx.lineWidth = strokeW;
      ctx.strokeStyle = finish === 'marine' ? 'rgba(230, 240, 255, 0.92)' : finish === 'silver' ? 'rgba(245, 245, 250, 0.95)' : 'rgba(51, 65, 85, 0.95)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 3;

      if (solutionType === 'vertical' || solutionType === 'combo') {
        for (let i = 0; i <= numLines; i++) {
          const t = i / numLines;
          const topX = (corners.tl.x * (1 - t) + corners.tr.x * t) * (canvas.width / 100);
          const topY = (corners.tl.y * (1 - t) + corners.tr.y * t) * (canvas.height / 100);
          const botX = (corners.bl.x * (1 - t) + corners.br.x * t) * (canvas.width / 100);
          const botY = (corners.bl.y * (1 - t) + corners.br.y * t) * (canvas.height / 100);

          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.lineTo(botX, botY);
          ctx.stroke();
        }
      }

      if (solutionType === 'horizontal' || solutionType === 'combo') {
        const numH = Math.round(numLines * 0.75);
        for (let j = 0; j <= numH; j++) {
          const u = j / numH;
          const leftX = (corners.tl.x * (1 - u) + corners.bl.x * u) * (canvas.width / 100);
          const leftY = (corners.tl.y * (1 - u) + corners.bl.y * u) * (canvas.height / 100);
          const rightX = (corners.tr.x * (1 - u) + corners.br.x * u) * (canvas.width / 100);
          const rightY = (corners.tr.y * (1 - u) + corners.br.y * u) * (canvas.height / 100);

          ctx.beginPath();
          ctx.moveTo(leftX, leftY);
          ctx.lineTo(rightX, rightY);
          ctx.stroke();
        }
      }

      // Add watermark brand footer
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(`Invisible Safety | Architectural Visualizer Preview (${solutionType.toUpperCase()} - ${spacing})`, 20, canvas.height - 15);

      const link = document.createElement('a');
      link.download = `invisible-safety-visualization-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  const currentImageSrc = customImage || selectedSpace.image;

  // Filtered Preset Gallery
  const filteredPresets = PRESET_SPACES.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  // Number of cables based on chosen spacing
  const numCables = spacing === '50mm' ? 22 : spacing === '75mm' ? 15 : 11;
  const numHorizontalCables = 14;

  // Cable stroke styling based on finish
  const cableColor =
    finish === 'marine'
      ? 'url(#ss316-gradient)'
      : finish === 'silver'
      ? 'url(#silver-gradient)'
      : 'url(#anthracite-gradient)';

  const cableWidthPx = wireGauge === '2.0mm' ? 1.4 : wireGauge === '2.5mm' ? 1.9 : 2.4;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        margin: '0 auto',
        maxWidth: '1360px',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)'
      }}
    >
      {/* Visualizer Studio Header Bar */}
      <div
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          borderBottom: '1px solid #E2E8F0',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
            }}
          >
            <Compass size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Practical Home Visualizer
              </h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #A7F3D0',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}
              >
                AI ARCHITECTURAL FIT
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
              Realistic perspective alignment & physical SS316 tension cable simulation
            </p>
          </div>
        </div>

        {/* Studio View Mode Toggles */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#F1F5F9',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid #E2E8F0'
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode('before')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '7px',
              border: 'none',
              background: viewMode === 'before' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'before' ? '#0F172A' : '#64748B',
              boxShadow: viewMode === 'before' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            1. Original View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('installed')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '7px',
              border: 'none',
              background: viewMode === 'installed' ? '#2563EB' : 'transparent',
              color: viewMode === 'installed' ? '#FFFFFF' : '#64748B',
              boxShadow: viewMode === 'installed' ? '0 2px 6px rgba(37, 99, 235, 0.25)' : 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            2. Safety Installed
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '7px',
              border: 'none',
              background: viewMode === 'split' ? '#0F172A' : 'transparent',
              color: viewMode === 'split' ? '#FFFFFF' : '#64748B',
              boxShadow: viewMode === 'split' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
          >
            <MoveHorizontal size={14} />
            3. Before / After Slider
          </button>
        </div>
      </div>

      {/* Main Studio Split Layout: Controls on Left, Panoramic Stage on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(330px, 390px) 1fr',
          minHeight: '680px'
        }}
        className="visualizer-grid-layout"
      >
        {/* LEFT COLUMN: Controls, Customization & Gallery */}
        <div
          style={{
            borderRight: '1px solid #E2E8F0',
            background: '#FFFFFF',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.35rem',
            overflowY: 'auto',
            maxHeight: '780px'
          }}
        >
          {/* STEP 1: Upload Your Photograph or Choose Preset */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.05em' }}>
                STEP 1 • UPLOAD OR SELECT SPACE
              </span>
              {customImage && (
                <button
                  type="button"
                  onClick={() => setCustomImage(null)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#DC2626',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <RotateCcw size={12} /> Reset to Presets
                </button>
              )}
            </div>

            {/* Upload Drag & Drop Trigger */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #3B82F6',
                background: '#EFF6FF',
                borderRadius: '12px',
                padding: '0.9rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                color: '#1D4ED8',
                fontWeight: 700,
                fontSize: '0.86rem',
                marginBottom: '0.85rem'
              }}
            >
              <Upload size={18} />
              <span>{customImage ? 'Replace Uploaded Photograph' : 'Upload Your Balcony / Window Photo'}</span>
            </div>

            {/* Preset Gallery Categories */}
            {!customImage && (
              <div>
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  {(['all', 'balcony', 'window', 'staircase', 'terrace'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '0.25rem 0.55rem',
                        borderRadius: '6px',
                        border: activeCategory === cat ? '1px solid #2563EB' : '1px solid #E2E8F0',
                        background: activeCategory === cat ? '#EFF6FF' : '#F8FAFC',
                        color: activeCategory === cat ? '#1D4ED8' : '#64748B',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.45rem',
                    maxHeight: '135px',
                    overflowY: 'auto'
                  }}
                >
                  {filteredPresets.map((space) => {
                    const isSelected = selectedSpace.id === space.id;
                    return (
                      <button
                        key={space.id}
                        type="button"
                        onClick={() => setSelectedSpace(space)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                          background: isSelected ? '#EFF6FF' : '#FFFFFF',
                          padding: '3px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={space.image}
                          alt={space.name}
                          style={{
                            width: '100%',
                            height: '42px',
                            objectFit: 'cover',
                            borderRadius: '5px'
                          }}
                        />
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: isSelected ? '#1D4ED8' : '#334155',
                            marginTop: '3px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            padding: '0 2px'
                          }}
                        >
                          {space.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Choose Safety System */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
              STEP 2 • SAFETY INSTALLATION SYSTEM
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {[
                { id: 'vertical', title: 'Vertical Grills', desc: 'SS316 Marine Cables', badge: 'Popular' },
                { id: 'horizontal', title: 'Horizontal Grills', desc: 'Panoramic Lines', badge: 'Modern' },
                { id: 'net', title: 'Safety Net', desc: 'Translucent High-Tenacity', badge: 'Aesthetic' },
                { id: 'combo', title: 'Combo System', desc: 'Grills + Safety Net', badge: 'Max Safety' }
              ].map((item) => {
                const isSelected = solutionType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSolutionType(item.id as any)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      border: isSelected ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                      background: isSelected ? '#F0F7FF' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isSelected ? '#1D4ED8' : '#0F172A' }}>
                        {item.title}
                      </span>
                      {isSelected && <CheckCircle2 size={13} color="#2563EB" />}
                    </div>
                    <span style={{ fontSize: '0.69rem', color: '#64748B' }}>{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Customize Architectural Appearance */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
              STEP 3 • CUSTOMIZE SPECIFICATIONS
            </span>

            {/* Cable Spacing & Gauge (If invisible grills or combo) */}
            {solutionType !== 'net' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                    CABLE SPACING
                  </label>
                  <select
                    value={spacing}
                    onChange={(e) => setSpacing(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '0.45rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      background: '#FFFFFF'
                    }}
                  >
                    <option value="50mm">50 mm (Child Safe)</option>
                    <option value="75mm">75 mm (Standard)</option>
                    <option value="100mm">100 mm (Open View)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                    CABLE GAUGE
                  </label>
                  <select
                    value={wireGauge}
                    onChange={(e) => setWireGauge(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '0.45rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      background: '#FFFFFF'
                    }}
                  >
                    <option value="2.0mm">2.0 mm Standard</option>
                    <option value="2.5mm">2.5 mm High-Rise</option>
                    <option value="3.0mm">3.0 mm Ultra-Heavy</option>
                  </select>
                </div>
              </div>
            )}

            {/* Architectural Finishes */}
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                ARCHITECTURAL FINISH
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                {[
                  { id: 'marine', label: 'SS316 Marine', color: '#CBD5E1' },
                  { id: 'silver', label: 'Metallic Silver', color: '#E2E8F0' },
                  { id: 'anthracite', label: 'Anthracite Dark', color: '#334155' }
                ].map((f) => {
                  const isSelected = finish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinish(f.id as any)}
                      style={{
                        padding: '0.4rem 0.3rem',
                        borderRadius: '6px',
                        border: isSelected ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: isSelected ? '#1D4ED8' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <span
                        style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          background: f.color,
                          border: '1px solid rgba(0,0,0,0.15)'
                        }}
                      />
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Natural Lighting Simulation */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                NATURAL SUNLIGHT REFLECTION
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                {[
                  { id: 'day', label: 'Daylight', icon: Sun },
                  { id: 'sunset', label: 'Sunset', icon: Sunset },
                  { id: 'evening', label: 'Evening', icon: Moon }
                ].map((l) => {
                  const isSelected = ambientLight === l.id;
                  const Icon = l.icon;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setAmbientLight(l.id as any)}
                      style={{
                        padding: '0.4rem',
                        borderRadius: '6px',
                        border: isSelected ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        color: isSelected ? '#1D4ED8' : '#475569',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Icon size={13} />
                      {l.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Perspective Boundary Calibration Toggle */}
          <div
            style={{
              padding: '0.75rem',
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                Architectural Perspective Fit
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                Drag 4 corner pins to match exact balcony angle
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAdjustingPerspective(!isAdjustingPerspective)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: isAdjustingPerspective ? '1px solid #2563EB' : '1px solid #CBD5E1',
                background: isAdjustingPerspective ? '#2563EB' : '#FFFFFF',
                color: isAdjustingPerspective ? '#FFFFFF' : '#334155',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isAdjustingPerspective ? 'Finish Pins' : 'Adjust Pins'}
            </button>
          </div>

          {/* GENERATE MY DESIGN Primary CTA */}
          <button
            type="button"
            onClick={triggerAIGeneration}
            disabled={isGenerating}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.92rem',
              letterSpacing: '0.02em',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Sparkles size={18} />
            <span>{isGenerating ? 'Synthesizing Architecture...' : 'GENERATE MY DESIGN'}</span>
          </button>

          {/* Bottom Actions: Download Image & WhatsApp Quote */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
            <button
              type="button"
              onClick={handleDownload}
              style={{
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Download size={14} />
              <span>Save HD Render</span>
            </button>

            <a
              href={`https://wa.me/${business.whatsapp}?text=Hi%20Invisible Safety%2C%20I%20designed%20my%20balcony%20on%20the%20Visualizer%20(${solutionType.toUpperCase()}%20grills%2C%20${spacing}%20spacing%2C%20${finish}%20finish)%20and%20would%20like%20a%20free%20doorstep%20site%20measurement.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.65rem',
                borderRadius: '8px',
                background: '#16A34A',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <MessageCircle size={14} />
              <span>Book Site Visit</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Large Architectural Panoramic Stage */}
        <div
          ref={stageRef}
          onMouseMove={(e) => {
            if (isDraggingSlider.current) handleSliderMove(e.clientX);
            if (activeCornerDrag) handleCornerMove(e.clientX, e.clientY);
          }}
          onTouchMove={(e) => {
            if (isDraggingSlider.current) handleSliderMove(e.touches[0].clientX);
            if (activeCornerDrag) handleCornerMove(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onMouseUp={() => {
            isDraggingSlider.current = false;
            setActiveCornerDrag(null);
          }}
          onTouchEnd={() => {
            isDraggingSlider.current = false;
            setActiveCornerDrag(null);
          }}
          style={{
            position: 'relative',
            background: '#0B1120',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            minHeight: '600px'
          }}
        >
          {/* Base Architectural Photograph */}
          <img
            src={currentImageSrc}
            alt="Balcony Architecture"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter:
                ambientLight === 'sunset'
                  ? 'brightness(0.92) sepia(0.2) saturate(1.15) hue-rotate(-10deg)'
                  : ambientLight === 'evening'
                  ? 'brightness(0.65) contrast(1.1) saturate(0.85)'
                  : 'none',
              transition: 'filter 0.4s ease'
            }}
          />

          {/* SVG Vector Perspective Layer: SS316 Invisible Grills & Nets */}
          {viewMode !== 'before' && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: isAdjustingPerspective ? 'none' : 'auto',
                clipPath:
                  viewMode === 'split'
                    ? `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
                    : 'none'
              }}
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                <defs>
                  {/* Natural SS316 Marine Multi-Stop Gradient */}
                  <linearGradient id="ss316-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#64748B" stopOpacity="0.75" />
                    <stop offset="35%" stopColor="#E2E8F0" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="85%" stopColor="#CBD5E1" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#475569" stopOpacity="0.7" />
                  </linearGradient>

                  {/* Metallic Silver Finish */}
                  <linearGradient id="silver-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#F8FAFC" stopOpacity="1" />
                    <stop offset="100%" stopColor="#64748B" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Architectural Anthracite Dark Finish */}
                  <linearGradient id="anthracite-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#475569" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Mounting Track Linear Gradient */}
                  <linearGradient id="track-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>

                  {/* Subtle Cable Shadow for 3D Depth */}
                  <filter id="cable-depth-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0.5" dy="0.8" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* 1. TOP ARCHITECTURAL TRACK PROFILE */}
                {solutionType !== 'net' && (
                  <line
                    x1={corners.tl.x}
                    y1={corners.tl.y}
                    x2={corners.tr.x}
                    y2={corners.tr.y}
                    stroke="url(#track-gradient)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    filter="url(#cable-depth-shadow)"
                  />
                )}

                {/* 2. BOTTOM ARCHITECTURAL TRACK PROFILE */}
                {solutionType !== 'net' && (
                  <line
                    x1={corners.bl.x}
                    y1={corners.bl.y}
                    x2={corners.br.x}
                    y2={corners.br.y}
                    stroke="url(#track-gradient)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    filter="url(#cable-depth-shadow)"
                  />
                )}

                {/* 3. VERTICAL INVISIBLE GRILL TENSION CABLES */}
                {(solutionType === 'vertical' || solutionType === 'combo') && (
                  <g filter="url(#cable-depth-shadow)">
                    {Array.from({ length: numCables + 1 }).map((_, i) => {
                      const t = i / numCables;
                      const topX = corners.tl.x * (1 - t) + corners.tr.x * t;
                      const topY = corners.tl.y * (1 - t) + corners.tr.y * t;
                      const botX = corners.bl.x * (1 - t) + corners.br.x * t;
                      const botY = corners.bl.y * (1 - t) + corners.br.y * t;

                      return (
                        <g key={`vert-${i}`}>
                          {/* Cable Strand */}
                          <line
                            x1={topX}
                            y1={topY}
                            x2={botX}
                            y2={botY}
                            stroke={cableColor}
                            strokeWidth={cableWidthPx * 0.22}
                            strokeLinecap="round"
                            opacity={ambientLight === 'evening' ? 0.75 : 0.95}
                          />

                          {/* Top Mounting Rivet Anchor */}
                          <circle
                            cx={topX}
                            cy={topY}
                            r="0.5"
                            fill="#E2E8F0"
                            stroke="#1E293B"
                            strokeWidth="0.2"
                          />

                          {/* Bottom Mounting Rivet Anchor */}
                          <circle
                            cx={botX}
                            cy={botY}
                            r="0.5"
                            fill="#E2E8F0"
                            stroke="#1E293B"
                            strokeWidth="0.2"
                          />
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 4. HORIZONTAL INVISIBLE GRILL CABLES */}
                {(solutionType === 'horizontal' || solutionType === 'combo') && (
                  <g filter="url(#cable-depth-shadow)">
                    {Array.from({ length: numHorizontalCables + 1 }).map((_, j) => {
                      const u = j / numHorizontalCables;
                      const leftX = corners.tl.x * (1 - u) + corners.bl.x * u;
                      const leftY = corners.tl.y * (1 - u) + corners.bl.y * u;
                      const rightX = corners.tr.x * (1 - u) + corners.br.x * u;
                      const rightY = corners.tr.y * (1 - u) + corners.br.y * u;

                      return (
                        <g key={`horiz-${j}`}>
                          <line
                            x1={leftX}
                            y1={leftY}
                            x2={rightX}
                            y2={rightY}
                            stroke={cableColor}
                            strokeWidth={cableWidthPx * 0.22}
                            strokeLinecap="round"
                            opacity={ambientLight === 'evening' ? 0.75 : 0.95}
                          />
                          <circle cx={leftX} cy={leftY} r="0.45" fill="#E2E8F0" stroke="#1E293B" strokeWidth="0.15" />
                          <circle cx={rightX} cy={rightY} r="0.45" fill="#E2E8F0" stroke="#1E293B" strokeWidth="0.15" />
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 5. TRANSLUCENT HIGH-TENACITY SAFETY NET MESH */}
                {(solutionType === 'net' || solutionType === 'combo') && (
                  <g opacity={solutionType === 'combo' ? 0.5 : 0.85}>
                    {/* Perspective grid lattice */}
                    {Array.from({ length: 26 }).map((_, idx) => {
                      const f = idx / 25;
                      const p1X = corners.tl.x * (1 - f) + corners.tr.x * f;
                      const p1Y = corners.tl.y * (1 - f) + corners.tr.y * f;
                      const p2X = corners.bl.x * (1 - f) + corners.br.x * f;
                      const p2Y = corners.bl.y * (1 - f) + corners.br.y * f;

                      const q1X = corners.tl.x * (1 - f) + corners.bl.x * f;
                      const q1Y = corners.tl.y * (1 - f) + corners.bl.y * f;
                      const q2X = corners.tr.x * (1 - f) + corners.br.x * f;
                      const q2Y = corners.tr.y * (1 - f) + corners.br.y * f;

                      return (
                        <React.Fragment key={`net-${idx}`}>
                          <line
                            x1={p1X}
                            y1={p1Y}
                            x2={p2X}
                            y2={p2Y}
                            stroke="rgba(255, 255, 255, 0.45)"
                            strokeWidth="0.18"
                            strokeDasharray="0.8,0.8"
                          />
                          <line
                            x1={q1X}
                            y1={q1Y}
                            x2={q2X}
                            y2={q2Y}
                            stroke="rgba(255, 255, 255, 0.45)"
                            strokeWidth="0.18"
                            strokeDasharray="0.8,0.8"
                          />
                        </React.Fragment>
                      );
                    })}
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* INTERACTIVE 4-CORNER PERSPECTIVE ADJUSTMENT OVERLAY */}
          {isAdjustingPerspective && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'auto',
                zIndex: 10
              }}
            >
              {/* Outer boundary polygon */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <polygon
                  points={`${corners.tl.x},${corners.tl.y} ${corners.tr.x},${corners.tr.y} ${corners.br.x},${corners.br.y} ${corners.bl.x},${corners.bl.y}`}
                  fill="rgba(37, 99, 235, 0.12)"
                  stroke="#2563EB"
                  strokeWidth="0.5"
                  strokeDasharray="1.5,1.5"
                />
              </svg>

              {/* 4 Interactive Drag Handles */}
              {(['tl', 'tr', 'br', 'bl'] as const).map((key) => {
                const pt = corners[key];
                const labels: Record<string, string> = {
                  tl: 'Top-Left Ceiling',
                  tr: 'Top-Right Column',
                  br: 'Bottom-Right Rail',
                  bl: 'Bottom-Left Rail'
                };
                return (
                  <div
                    key={key}
                    onMouseDown={() => setActiveCornerDrag(key)}
                    onTouchStart={() => setActiveCornerDrag(key)}
                    style={{
                      position: 'absolute',
                      top: `${pt.y}%`,
                      left: `${pt.x}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '3px solid #2563EB',
                      boxShadow: '0 0 15px rgba(37, 99, 235, 0.75)',
                      cursor: 'grab',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 20
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />
                    <span
                      style={{
                        position: 'absolute',
                        top: '32px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        color: '#FFFFFF',
                        fontSize: '0.65rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none'
                      }}
                    >
                      {labels[key]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* BEFORE / AFTER SPLIT COMPARISON SLIDER */}
          {viewMode === 'split' && (
            <>
              {/* Vertical Divider Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${sliderPosition}%`,
                  width: '3px',
                  background: '#FFFFFF',
                  boxShadow: '0 0 10px rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                  zIndex: 5
                }}
              />

              {/* Draggable Circular Handle */}
              <div
                onMouseDown={() => {
                  isDraggingSlider.current = true;
                }}
                onTouchStart={() => {
                  isDraggingSlider.current = true;
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${sliderPosition}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#2563EB',
                  border: '3px solid #FFFFFF',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'ew-resize',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                  zIndex: 6
                }}
              >
                <MoveHorizontal size={20} />
              </div>

              {/* Floating Status Badges */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  pointerEvents: 'none',
                  zIndex: 4
                }}
              >
                BEFORE INSTALLATION
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(37, 99, 235, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  pointerEvents: 'none',
                  zIndex: 4
                }}
              >
                AFTER INSTALLATION ({solutionType.toUpperCase()})
              </div>
            </>
          )}

          {/* AI PROCESSING ANIMATION MODAL */}
          {isGenerating && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(11, 17, 32, 0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                zIndex: 30,
                color: '#FFFFFF',
                padding: '2rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '3px solid rgba(56, 189, 248, 0.2)',
                  borderTopColor: '#38BDF8',
                  animation: 'spin 0.9s linear infinite'
                }}
              />
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#F8FAFC' }}>
                AI Architectural Rendering
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', maxWidth: '400px', margin: 0 }}>
                {generationStep}
              </p>
            </div>
          )}

          {/* Bottom Floating Technical Info Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              right: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 23, 42, 0.78)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              padding: '0.55rem 1rem',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              pointerEvents: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} color="#38BDF8" />
              <span>
                <strong>System:</strong> {solutionType === 'vertical' ? 'SS316 Vertical Invisible Grills' : solutionType === 'horizontal' ? 'SS316 Horizontal Invisible Grills' : solutionType === 'net' ? 'Translucent Safety Net' : 'Combo System'}
              </span>
              <span style={{ color: '#64748B' }}>•</span>
              <span><strong>Spacing:</strong> {spacing}</span>
              <span style={{ color: '#64748B' }}>•</span>
              <span><strong>Gauge:</strong> {wireGauge}</span>
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.7rem' }}>
              High-Tension SS316 Marine Grade (Breaking Load &gt; 400kg)
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Honesty Transparency Notice */}
      <div
        style={{
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          color: '#64748B',
          fontSize: '0.74rem'
        }}
      >
        <Info size={15} style={{ flexShrink: 0, color: '#0284C7' }} />
        <span>
          <strong>Architectural Visualization Notice:</strong> This visualizer provides an accurate aesthetic preview of how invisible grills or safety nets blend into your building architecture. Actual structural anchoring, cable spacing, and material specifications are confirmed on-site during our complimentary doorstep inspection.
        </span>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 860px) {
          .visualizer-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
