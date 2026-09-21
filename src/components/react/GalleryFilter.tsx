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
      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.65rem',
        marginBottom: '2.75rem'
      }}>
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '30px',
                border: isActive ? '1px solid #2563EB' : '1px solid #E2E8F0',
                background: isActive ? '#2563EB' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#475569',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.background = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.color = '#475569';
                  e.currentTarget.style.background = '#FFFFFF';
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
        gap: '2rem'
      }}>
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 16px 30px -6px rgba(15, 23, 42, 0.12), 0 8px 14px -4px rgba(15, 23, 42, 0.06)';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 1px 4px -1px rgba(15, 23, 42, 0.04)';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            {/* Real Project Image Header */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 10',
              overflow: 'hidden',
              background: '#F1F5F9'
            }}>
              <img
                src={proj.imageAfter}
                alt={proj.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.35s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />

              {/* Location Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.82)',
                backdropFilter: 'blur(6px)',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.78rem',
                color: '#FFFFFF',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}>
                <MapPin size={13} color="#38BDF8" />
                <span>{proj.locality}, {proj.city}</span>
              </div>

              {/* Floor & Dimension Badge */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: '#16A34A',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.76rem',
                color: '#FFFFFF',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.4)'
              }}>
                {proj.floor} • {proj.sqft} sq.ft
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.35rem',
                lineHeight: 1.35
              }}>
                {proj.title}
              </h3>

              <div style={{
                fontSize: '0.86rem',
                color: '#2563EB',
                fontWeight: 700,
                marginBottom: '0.85rem'
              }}>
                {proj.apartmentName}
              </div>

              {/* Specification pill */}
              <div style={{
                fontSize: '0.82rem',
                color: '#475569',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                padding: '0.5rem 0.75rem',
                marginBottom: '1rem',
                lineHeight: 1.45
              }}>
                <strong style={{ color: '#0F172A' }}>Spec: </strong>
                {proj.configuration}
              </div>

              {/* Verified Client Feedback */}
              <div style={{
                background: '#F0F9FF',
                borderLeft: '3px solid #0284C7',
                padding: '0.85rem 1rem',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.86rem',
                color: '#1E293B',
                fontStyle: 'italic',
                marginBottom: '1.25rem',
                lineHeight: 1.55,
                flexGrow: 1
              }}>
                "{proj.clientQuote}"
                <div style={{
                  marginTop: '0.45rem',
                  fontStyle: 'normal',
                  fontSize: '0.78rem',
                  color: '#64748B',
                  fontWeight: 700
                }}>
                  — {proj.clientName}
                </div>
              </div>

              {/* Inquire on WhatsApp Button */}
              <a
                href={buildWhatsAppLink({
                  product: proj.title,
                  configuration: proj.configuration,
                  location: `${proj.locality}, ${proj.city}`,
                  leadSource: `Gallery Project: ${proj.slug}`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  height: '44px',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={17} />
                <span>Inquire for Similar Space</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
