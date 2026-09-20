import React, { useState, useRef, useCallback } from 'react';
import { ShieldCheck, AlertTriangle, ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/hero-balcony.webp",
  afterImage = "/images/hero-balcony.webp"
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
    <div style={{ maxWidth: '920px', margin: '0 auto', userSelect: 'none' }}>
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
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #CBD5E1',
          boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.08)',
          cursor: 'ew-resize',
          background: '#0F172A'
        }}
      >
        {/* Underneath: AFTER View (Invisible Grills Installed) */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={afterImage}
            alt="Balcony with invisible grills installed"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Realistic Cable Overlay on After View */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '24px 30px',
            pointerEvents: 'none'
          }}>
            {Array.from({ length: 22 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.4) 100%)',
                  boxShadow: '0 0 2px rgba(255, 255, 255, 0.6)'
                }}
              />
            ))}
          </div>

          {/* After Badge (Top Right) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(15, 23, 42, 0.85)',
            color: '#FFFFFF',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldCheck size={16} color="#16A34A" />
            <span>AFTER: Invisible Grills Installed</span>
          </div>
        </div>

        {/* Top/Clipped: BEFORE View (Open / Unenclosed Balcony) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${sliderPosition}%`,
          overflow: 'hidden',
          borderRight: '3px solid #2563EB'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: containerRef.current ? `${containerRef.current.clientWidth}px` : '920px', height: '100%' }}>
            <img
              src={beforeImage}
              alt="Balcony without invisible grills"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Before Badge (Top Left) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(15, 23, 42, 0.85)',
            color: '#FFFFFF',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <AlertTriangle size={15} color="#F59E0B" />
            <span>BEFORE: Open Balcony (No Safety Barrier)</span>
          </div>
        </div>

        {/* Slider Draggable Divider Handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#2563EB',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            border: '2px solid #FFFFFF'
          }}>
            <ArrowLeftRight size={16} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.82rem', color: '#64748B' }}>
        <span>← Drag left or right to compare</span>
        <span>Minimal visual obstruction with high-rise fall protection</span>
      </div>
    </div>
  );
}
