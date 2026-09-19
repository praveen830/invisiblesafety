import { business } from '../data/business';

export interface WhatsAppEnquiryParams {
  product: string;
  width?: string | number;
  height?: string | number;
  unit?: string;
  area?: string | number;
  configuration?: string;
  addons?: string[];
  estimatedAmount?: string;
  location?: string;
  leadSource?: string;
}

export function buildWhatsAppLink(params: WhatsAppEnquiryParams): string {
  const lines: string[] = [
    `Hello ${business.name},`,
    `I am interested in a quote.`,
    ``,
    `Product: ${params.product}`,
  ];

  if (params.width && params.height) {
    lines.push(`Dimensions: ${params.width} × ${params.height} ${params.unit || 'ft'}`);
  }

  if (params.area) {
    lines.push(`Area: ${params.area}`);
  }

  if (params.configuration) {
    lines.push(`Configuration: ${params.configuration}`);
  }

  if (params.addons && params.addons.length > 0) {
    lines.push(`Add-ons: ${params.addons.join(', ')}`);
  }

  if (params.estimatedAmount) {
    lines.push(`Estimated amount: ${params.estimatedAmount}`);
  }

  if (params.location) {
    lines.push(`Location / Area: ${params.location}`);
  }

  if (params.leadSource) {
    lines.push(`Enquiry Source: ${params.leadSource}`);
  }

  lines.push(``);
  lines.push(`Please arrange a site measurement.`);

  const messageText = lines.join('\n');
  const encoded = encodeURIComponent(messageText);

  return `https://wa.me/${business.whatsapp}?text=${encoded}`;
}

export function buildGeneralWhatsAppLink(intent?: string): string {
  const message = intent
    ? `Hello ${business.name}, I would like to enquire about ${intent}. Please share details and schedule a site visit.`
    : `Hello ${business.name}, I am interested in getting a free quote and site measurement for Invisible Grills / Safety Nets.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
