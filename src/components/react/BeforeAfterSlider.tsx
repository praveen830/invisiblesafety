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
    <div style={{ maxWidth: '960px', margin: '0 auto', userSelect: 'none' }}>
      <div
        ref={containerRef}
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          height: 'clamp(280px, 50vw, 460px)',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid #D8E6F3',
          boxShadow: '0 4px 20px -2px rgba(30, 58, 95, 0.08)',
          cursor: 'ew-resize',
          background: '#0F1E36'
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
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.45) 100%)',
                  boxShadow: '0 0 3px rgba(2, 132, 199, 0.5)'
                }}
              />
            ))}
          </div>

          {/* After Badge (Top Right) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(30, 58, 95, 0.9)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(216, 230, 243, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}>
            <ShieldCheck size={16} color="#38BDF8" />
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
          borderRight: '3px solid #0284C7'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: containerRef.current ? `${containerRef.current.clientWidth}px` : '960px', height: '100%' }}>
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
            background: 'rgba(15, 30, 54, 0.9)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
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
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#0284C7',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.45)',
            border: '2px solid #FFFFFF'
          }}>
            <ArrowLeftRight size={17} />
          </div>
        </div>
      </div>

      {/* Comparison Text Bar: Fixed missing space bug with explicit semantic separation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginTop: '0.85rem',
        padding: '0.6rem 0.25rem',
        fontSize: '0.85rem',
        color: '#475569',
        borderTop: '1px solid #D8E6F3'
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: '#EBF3FA',
          color: '#1E3A5F',
          padding: '0.3rem 0.85rem',
          borderRadius: '9999px',
          fontWeight: 700,
          border: '1px solid #D8E6F3'
        }}>
          &larr; Drag left or right to compare
        </span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          color: '#334155',
          fontWeight: 600
        }}>
          <span style={{ color: '#0284C7', fontWeight: 800 }}>&bull;</span>
          <span>Minimal visual obstruction with high-rise fall protection</span>
        </span>
      </div>
    </div>
  );
}
