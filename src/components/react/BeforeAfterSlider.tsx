import React, { useState, useRef, useCallback } from 'react';
import { Eye, Shield, ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function BeforeAfterSlider({
  beforeLabel = "Traditional Iron Bars / Obstructed View",
  afterLabel = "InvisProtect SS316 Invisible Safety Grills",
  beforeImage,
  afterImage
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', userSelect: 'none' }}>
      <div
        ref={containerRef}
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          height: '460px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
          cursor: 'ew-resize',
          background: '#0F172A'
        }}
      >
        {/* Underneath: AFTER View (InvisProtect View) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          {/* Visual representation of clear panoramic balcony with sleek invisible wires */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(ellipse at top, rgba(2, 132, 199, 0.25), transparent 70%), linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
          }} />

          {/* Wire overlay simulation */}
          <div style={{
            position: 'absolute',
            inset: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            pointerEvents: 'none'
          }}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(203, 213, 225, 0.4) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(203, 213, 225, 0.4) 100%)',
                  boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)'
                }}
              />
            ))}
          </div>

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', marginLeft: 'auto', paddingRight: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: '#34D399',
              fontWeight: 600,
              marginBottom: '0.75rem'
            }}>
              <Shield size={14} /> InvisProtect SS316 View
            </div>
            <h4 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Unobstructed Panoramic Skyline
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              400+ kg tensile safety cables with 98% visual transparency. No cage feel, full daylight, and 100% natural breeze.
            </p>
          </div>
        </div>

        {/* Top/Clipped: BEFORE View (Traditional Heavy Iron Bars) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${sliderPosition}%`,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '2rem',
          borderRight: '2px solid #38BDF8'
        }}>
          {/* Traditional heavy black bars simulation */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'space-around',
            pointerEvents: 'none'
          }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '18px',
                  height: '100%',
                  background: 'linear-gradient(90deg, #18181B 0%, #3F3F46 50%, #18181B 100%)',
                  boxShadow: '2px 0 6px rgba(0,0,0,0.8)'
                }}
              />
            ))}
            {/* Horizontal bars */}
            <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: '18px', background: '#27272A' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '18px', background: '#27272A' }} />
            <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, height: '18px', background: '#27272A' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '340px', background: 'rgba(0,0,0,0.75)', padding: '1rem', borderRadius: '10px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.65rem',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#F87171',
              fontWeight: 600,
              marginBottom: '0.5rem'
            }}>
              Traditional Iron Bars
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.3rem' }}>
              Heavy, Dark & Rust-Prone
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#A1A1AA', lineHeight: 1.4 }}>
              Blocks daylight, creates a claustrophobic prison feel, accumulates rust and pigeon droppings, and blocks fire escape.
            </p>
          </div>
        </div>

        {/* Center Draggable Handle */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          width: '4px',
          background: '#38BDF8',
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#0284C7',
            border: '3px solid #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            cursor: 'ew-resize'
          }}>
            <ArrowLeftRight size={18} />
          </div>
        </div>
      </div>

      {/* Caption & Instructions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.8rem', color: '#94A3B8' }}>
        <span>← Drag left or right to compare</span>
        <span>Simulated 28th-Floor High-Rise View</span>
      </div>
    </div>
  );
}
