import fs from 'fs';

let content = fs.readFileSync('src/pages/index.astro', 'utf-8');

content = content.replace(
  'Over 15,000+ luxury apartments and penthouses protected with zero view obstruction and 100% elevation compliance.',
  'Modern residential apartments and penthouses protected with zero view obstruction and building elevation compliance.'
);

content = content.replace(
  'Compare the metallurgical and material engineering behind our Stainless Steel molybdenum marine steel invisible grills vs. UV-stabilized virgin high-density polymer HDPE safety nets.',
  'Compare the material engineering behind our stainless steel invisible grills vs. UV-stabilized high-density polymer HDPE safety nets.'
);

content = content.replace(
  '<span class="eng-spec-val">Virgin Stainless Steel (16-18% Cr, 10-14% Ni, 2-3% Molybdenum)</span>',
  '<span class="eng-spec-val">Multi-Strand Stainless Steel Cable System</span>'
);

content = content.replace(
  '<span class="eng-spec-val">high-tensile breaking load per individual cable strand</span>',
  '<span class="eng-spec-val">High-tensile multi-strand construction</span>'
);

content = content.replace(
  '<span class="eng-spec-val">15-Year Direct Written Guarantee against rust &amp; structural sag</span>',
  '<span class="eng-spec-val">Direct Workmanship Guarantee covering materials &amp; alignment</span>'
);

content = content.replace(
  '<td class="grill-val"><strong>100% Rust-Proof</strong> (Molybdenum Stainless Steel)</td>',
  '<td class="grill-val"><strong>Weather Resistant</strong> (Polymer-Encased Stainless Steel)</td>'
);

content = content.replace(
  '<td class="grill-val"><strong>100% Approved</strong> across all RWAs</td>',
  '<td class="grill-val"><strong>Compliant</strong> with residential society elevation guidelines</td>'
);

content = content.replace(
  'Our certified in-house technician fleets deliver same-day doorstep on-site measurements, physical cable demonstrations, and prompt installation across 7 major metropolitan regions.',
  'Our experienced installation teams deliver scheduled on-site measurements, physical cable demonstrations, and prompt installation across residential hubs.'
);

fs.writeFileSync('src/pages/index.astro', content, 'utf-8');
console.log('Final clean on src/pages/index.astro completed.');
