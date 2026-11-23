import fs from 'fs';
import path from 'path';

function updateFile(relPath: string, updater: (content: string) => string): boolean {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${relPath}`);
    return false;
  }
  const original = fs.readFileSync(fullPath, 'utf8');
  const updated = updater(original);
  if (original !== updated) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`Updated: ${relPath}`);
    return true;
  }
  console.log(`No changes needed: ${relPath}`);
  return false;
}

// 1. src/components/Hero.astro
updateFile('src/components/Hero.astro', c => {
  return c
    .replace(/certified safety netting/g, 'residential safety netting')
    .replace(/<span>High-Tensile<\/span>/g, '<span>Stainless Steel</span>')
    .replace(/<span class="pillar-sub">Multi-strand cables<\/span>/g, '<span class="pillar-sub">Safety cables</span>')
    .replace(/<span>Free Survey<\/span>/g, '<span>Custom Sizing</span>')
    .replace(/<span class="pillar-title">Free Survey<\/span>/g, '<span class="pillar-title">Custom Sizing</span>')
    .replace(/<span class="pillar-sub">Custom on-site sizing<\/span>/g, '<span class="pillar-sub">Tailored to dimensions</span>');
});

// 2. src/components/TrustSection.astro
updateFile('src/components/TrustSection.astro', c => {
  return c
    .replace(/Residential Fall Protection/g, 'Balcony Safety')
    .replace(/DIRECT GUARANTEE/g, 'DIRECT SERVICE')
    .replace(/Direct Workmanship Guarantee/g, 'Direct Service Support')
    .replace(/Direct Guarantee/g, 'Direct Service')
    .replace(/Multi-strand stainless steel/gi, 'Stainless steel')
    .replace(/high-tensile/gi, 'durable')
    .replace(/certified/gi, 'professional')
    .replace(/Free on-site measurement/gi, 'Custom measurement and consultation')
    .replace(/complimentary on-site measurement/gi, 'measurement and consultation');
});

// 3. src/components/ProcessSection.astro
updateFile('src/components/ProcessSection.astro', c => {
  return c
    .replace(/certified high-rise safety/g, 'high-rise balcony safety')
    .replace(/Sign-Off & 10-Yr Warranty/g, 'Installation Sign-Off')
    .replace(/You inspect and approve the finished installation\. We issue your written documentation and warranty guarantee with scheduled follow-up support\./g,
      'You inspect and approve the finished installation. We review the completed fittings with you to ensure satisfaction.')
    .replace(/certified/gi, 'experienced')
    .replace(/guarantee/gi, 'service')
    .replace(/warranty/gi, 'service');
});

// 4. src/components/LocationLinks.astro
updateFile('src/components/LocationLinks.astro', c => {
  return c
    .replace(/multi-strand stainless steel cable core/g, 'stainless steel cable core')
    .replace(/Locally Certified Installation Teams/g, 'Local Installation Teams')
    .replace(/High-temperature resistant polymer netting/g, 'Durable outdoor netting')
    .replace(/certified/gi, 'experienced');
});

// 5. src/layouts/SubPageLayout.astro
updateFile('src/layouts/SubPageLayout.astro', c => {
  return c
    .replace(/doorstep laser measurement/gi, 'site measurement')
    .replace(/doorstep measurement/gi, 'measurement inquiry')
    .replace(/laser measurement/gi, 'measurement')
    .replace(/certified/gi, 'professional')
    .replace(/direct workmanship guarantee/gi, 'direct service support')
    .replace(/guarantee/gi, 'service');
});

// 6. src/data/business.ts
updateFile('src/data/business.ts', c => {
  return c
    .replace(/warrantyYears: "Quality Guarantee"/g, 'warrantyYears: "Standard Support"')
    .replace(/supportCommitment: "Direct Guarantee"/g, 'supportCommitment: "Direct Support"')
    .replace(/title: "Experienced Installation Team"/g, 'title: "Professional Installation"')
    .replace(/badge: "Certified"/g, 'badge: "Standard"')
    .replace(/Multi-strand stainless steel/gi, 'Stainless steel')
    .replace(/direct workmanship guarantee/gi, 'service support')
    .replace(/doorstep measurement/gi, 'consultation');
});

// 7. src/data/products.ts
updateFile('src/data/products.ts', c => {
  return c
    .replace(/warranty: "Direct Workmanship Guarantee"/g, 'warranty: "Standard installation"')
    .replace(/Direct Workmanship Guarantee/g, 'Standard installation')
    .replace(/Multi-strand stainless steel with protective polymer sleeve/gi, 'Stainless steel cables with protective coating')
    .replace(/Multi-strand stainless steel/gi, 'Stainless steel cables')
    .replace(/protective polymer sleeve/gi, 'protective coating')
    .replace(/high-density monofilament nylon/gi, 'nylon safety netting')
    .replace(/UV-stabilized/gi, 'weather-resistant')
    .replace(/high-tensile/gi, 'high-strength')
    .replace(/breakLoadKg: \d+/g, '')
    .replace(/breakLoadKg/g, '// breakLoadKg');
});

// 8. src/data/pricing.ts
updateFile('src/data/pricing.ts', c => {
  return c
    .replace(/Direct Workmanship Guarantee/gi, 'Standard installation')
    .replace(/Multi-strand stainless steel/gi, 'Stainless steel cables')
    .replace(/protective polymer sleeve/gi, 'protective coating')
    .replace(/high-density monofilament nylon/gi, 'nylon netting')
    .replace(/doorstep measurement/gi, 'measurement consultation')
    .replace(/on-site consultation/gi, 'service consultation')
    .replace(/guarantee/gi, 'support')
    .replace(/warranty/gi, 'support');
});

// 9. src/data/faq.ts
updateFile('src/data/faq.ts', c => {
  return c
    .replace(/We provide a direct workmanship guarantee covering cable integrity and installation alignment, alongside standard manufacturer warranties on high-density polymer netting materials\. Clear terms and documentation are provided with every quotation\./g,
      'We focus on proper installation and secure anchoring for all invisible grills and safety nets. Detailed service information and care guidelines are provided with your quotation.')
    .replace(/Every residential balcony is unique in dimension, structural anchoring points, and elevation\. Rather than generic rates that may overlook site specifics, our team conducts a complimentary on-site measurement to provide a clear, customized written estimate with zero obligation\./g,
      'Balcony dimensions, railing design, and anchoring requirements vary by property. We provide customized price estimates based on your dimensions and specifications.')
    .replace(/on-site measurement and consultation/gi, 'consultation and measurement')
    .replace(/complimentary on-site measurement/gi, 'measurement consultation')
    .replace(/on-site measurement/gi, 'measurement inquiry')
    .replace(/doorstep measurement/gi, 'measurement inquiry')
    .replace(/direct workmanship guarantee/gi, 'quality service support')
    .replace(/guarantee/gi, 'support');
});

// 10. src/data/locations.ts
updateFile('src/data/locations.ts', c => {
  return c
    .replace(/complimentary on-site measurement/gi, 'consultation and quotation')
    .replace(/on-site measurement/gi, 'quotation inquiry')
    .replace(/doorstep measurement/gi, 'quotation inquiry')
    .replace(/direct workmanship guarantee/gi, 'installation support')
    .replace(/guarantee/gi, 'support');
});

// 11. src/pages/index.astro
updateFile('src/pages/index.astro', c => {
  return c
    .replace(/On-site measurement and consultation takes 30-45 minutes\. Once confirmed, standard balcony installation is completed in 3 to 5 hours by our experienced installation team\./g,
      'Measurement and consultation takes 30-45 minutes. Once confirmed, standard balcony installation is completed in 3 to 5 hours by our installation team.')
    .replace(/SECTION 6: STREAMLINED CONTACT & FREE INSPECTION BOOKING/g, 'SECTION 6: STREAMLINED CONTACT & QUOTATION BOOKING')
    .replace(/Schedule Your Free Doorstep on-site measurement/g, 'Request an Installation Quotation')
    .replace(/Our senior structural safety engineer will visit your residence with authentic Stainless Steel wire and aluminium track samples, measure your balconies with laser accuracy, and provide a clear quotation\./g,
      'Our team will assist with wire and track samples, measure your balcony dimensions, and provide a clear quotation.')
    .replace(/laser/gi, 'accurate')
    .replace(/Free on-site measurement/gi, 'Quotation and consultation')
    .replace(/on-site measurement/gi, 'quotation inquiry')
    .replace(/doorstep measurement/gi, 'quotation inquiry')
    .replace(/direct workmanship guarantee/gi, 'installation support')
    .replace(/Three Quality Commitments/gi, 'Our Core Standards')
    .replace(/quality commitments/gi, 'service standards');
});

// 12. src/pages/about.astro
updateFile('src/pages/about.astro', c => {
  return c
    .replace(/full-body certified harnesses and dual lifelines/g, 'safety harnesses and dual lifelines')
    .replace(/certified/gi, 'trained')
    .replace(/direct workmanship guarantee/gi, 'installation support');
});

// 13. src/pages/contact.astro
updateFile('src/pages/contact.astro', c => {
  return c
    .replace(/Schedule Your Free on-site measurement/g, 'Contact Invisible Safety')
    .replace(/Book your free on-site measurement and site survey for invisible grills and safety nets\. Transparent pricing, high-grade stainless steel cables in Hyderabad, Vizag & Vijayawada\./g,
      'Contact Invisible Safety for invisible grills and safety nets. Transparent pricing and professional installation in Hyderabad, Vizag & Vijayawada.')
    .replace(/Complimentary on-site measurement/g, 'Clear Upfront Quotations')
    .replace(/Fastest way to send balcony photos, ask questions, or request same-day doorstep measurement\./g,
      'Fastest way to send balcony photos, ask questions, or request a quotation.')
    .replace(/trust-commitments/g, 'trust-standards')
    .replace(/doorstep measurement/gi, 'quotation')
    .replace(/on-site measurement/gi, 'consultation');
});

// 14. src/pages/solutions.astro
updateFile('src/pages/solutions.astro', c => {
  return c
    .replace(/DOORSTEP LASER CALIBRATION/g, 'BALCONY MEASUREMENT & SIZING')
    .replace(/laser/gi, 'accurate')
    .replace(/certified/gi, 'professional')
    .replace(/guarantee/gi, 'support');
});

// 15. src/pages/invisible-grill-cost.astro
updateFile('src/pages/invisible-grill-cost.astro', c => {
  return c
    .replace(/Accurate millimeter laser measuring of balconies, windows, and duct voids\./g,
      'Accurate measurement of balconies, windows, and duct openings.')
    .replace(/complimentary on-site on-site measurement/g, 'complimentary consultation')
    .replace(/on-site on-site measurement/g, 'measurement consultation')
    .replace(/on-site measurement/gi, 'consultation')
    .replace(/doorstep measurement/gi, 'consultation')
    .replace(/laser/gi, 'accurate')
    .replace(/certified/gi, 'professional')
    .replace(/direct workmanship guarantee/gi, 'installation support')
    .replace(/guarantee/gi, 'support');
});

// 16. src/pages/why-invisible-safety.astro
updateFile('src/pages/why-invisible-safety.astro', c => {
  return c
    .replace(/Certified Architectural Excellence/g, 'Professional Installation Standards')
    .replace(/A transparent look at the differences between certified engineering and low-cost shortcuts\./g,
      'A transparent look at the differences between professional installation and low-cost shortcuts.')
    .replace(/Multi-Strand Stainless Steel:/g, 'Stainless Steel Cables:')
    .replace(/Direct Workmanship Guarantee:/g, 'Service Support:')
    .replace(/Verbal False Guarantees:/g, 'Unverified Contractor Promises:')
    .replace(/Multi-strand/gi, 'Stainless steel')
    .replace(/certified/gi, 'professional')
    .replace(/guarantee/gi, 'service');
});

// 17. src/pages/window-invisible-grills.astro
updateFile('src/pages/window-invisible-grills.astro', c => {
  return c
    .replace(/Multi-Strand Stainless Steel/g, 'Stainless Steel Cables')
    .replace(/Direct Workmanship Guarantee/g, 'Standard Installation')
    .replace(/Full-height high-tensile Stainless Steel Cables/g, 'Full-height stainless steel cables')
    .replace(/High-tensile Stainless Steel-grade invisible grills/g, 'Stainless steel invisible grills')
    .replace(/instant certified engineering quotation/g, 'instant quotation estimate')
    .replace(/certified/gi, 'professional')
    .replace(/high-tensile/gi, 'durable')
    .replace(/guarantee/gi, 'service');
});
