import React, { useState } from 'react';
import { projects, type ProjectItem } from '../../data/projects';
import { ShieldCheck, MapPin, Layers, Award, ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export default function GalleryFilter() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Completed Works" },
    { id: "invisible-grill", label: "SS316 Invisible Grills" },
    { id: "balcony", label: "Balcony Installations" },
    { id: "high-rise", label: "High-Rise Towers" },
    { id: "safety-net", label: "Safety & Pigeon Nets" },
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory || (activeCategory === "balcony" && p.title.toLowerCase().includes("balcony")));

  return (
    <div>
      {/* Category Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.6rem',
        marginBottom: '2.5rem'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '30px',
              border: activeCategory === cat.id ? '1px solid #0284C7' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeCategory === cat.id ? 'rgba(2, 132, 199, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: activeCategory === cat.id ? '#38BDF8' : '#94A3B8',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="arch-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.5rem',
              background: 'rgba(17, 24, 39, 0.85)'
            }}
          >
            <div>
              {/* Image simulation container */}
              <div style={{
                position: 'relative',
                height: '210px',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                {/* Visual architectural simulation overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle at top right, rgba(56, 189, 248, 0.2), transparent 70%)'
                }} />

                {/* Wire lines simulation */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '0 1rem',
                  pointerEvents: 'none'
                }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '1px',
                        height: '100%',
                        background: 'rgba(203, 213, 225, 0.4)',
                        boxShadow: '0 0 2px rgba(255, 255, 255, 0.4)'
                      }}
                    />
                  ))}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#38BDF8',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <MapPin size={13} /> {proj.locality}, {proj.city}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: '#34D399',
                  fontWeight: 600
                }}>
                  {proj.floor} • {proj.sqft} sq.ft
                </div>
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                {proj.title}
              </h4>
              <div style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 600, marginBottom: '0.75rem' }}>
                {proj.apartmentName}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '1rem', lineHeight: 1.4 }}>
                <span style={{ color: '#CBD5E1', fontWeight: 600 }}>Spec: </span>
                {proj.configuration}
              </div>

              {/* Client Quote Box */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                borderLeft: '3px solid #0284C7',
                padding: '0.75rem 1rem',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.82rem',
                color: '#CBD5E1',
                fontStyle: 'italic',
                marginBottom: '1rem'
              }}>
                "{proj.clientQuote}"
                <div style={{ marginTop: '0.35rem', fontStyle: 'normal', fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                  — {proj.clientName}
                </div>
              </div>
            </div>

            {/* Inquire for Similar Balcony Button */}
            <a
              href={buildWhatsAppLink({
                product: proj.title,
                configuration: proj.configuration,
                location: `${proj.locality}, ${proj.city}`,
                leadSource: `Gallery Project: ${proj.slug}`
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                width: '100%',
                fontSize: '0.82rem',
                color: '#38BDF8',
                borderColor: 'rgba(56, 189, 248, 0.3)'
              }}
            >
              <MessageCircle size={14} />
              <span>Inquire for Similar Space</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
