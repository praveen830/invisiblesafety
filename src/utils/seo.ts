import { business } from '../data/business';

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": business.legalName,
    "alternateName": business.name,
    "description": business.subtitle,
    "url": "https://invisprotect.com",
    "telephone": business.phone,
    "email": business.email,
    "priceRange": "₹₹",
    "image": "https://invisprotect.com/images/hero-balcony.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.street,
      "addressLocality": business.address.locality,
      "addressRegion": business.address.city,
      "postalCode": business.address.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4435,
      "longitude": 78.3772
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:30"
      }
    ],
    "areaServed": business.cities.map(c => ({
      "@type": "City",
      "name": c.name,
      "addressRegion": c.state,
      "addressCountry": "IN"
    }))
  };
}

export function getServiceSchema(serviceName: string, description: string, startingPrice: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "LocalBusiness",
      "name": business.name,
      "telephone": business.phone
    },
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": startingPrice,
      "priceCurrency": "INR",
      "unitText": "SQFT"
    }
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
