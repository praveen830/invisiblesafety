import { business } from '../data/business';

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": business.name,
    "alternateName": ["Invisible Safety India", "Invisible Safety Grills & Nets"],
    "url": "https://invisiblesafety.in",
    "description": business.subtitle,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://invisiblesafety.in/solutions/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": business.legalName,
    "alternateName": business.name,
    "url": "https://invisiblesafety.in",
    "logo": "https://invisiblesafety.in/images/logo.png",
    "email": business.email,
    "telephone": business.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.street,
      "addressLocality": business.address.locality,
      "addressRegion": business.address.city,
      "postalCode": business.address.pincode,
      "addressCountry": "IN"
    },
    "sameAs": [
      `https://wa.me/${business.whatsapp}`
    ]
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": business.legalName,
    "alternateName": business.name,
    "description": business.subtitle,
    "url": "https://invisiblesafety.in",
    "telephone": business.phone,
    "email": business.email,
    "priceRange": "₹₹",
    "image": "https://invisiblesafety.in/images/hero-balcony.webp",
    "logo": "https://invisiblesafety.in/images/logo.png",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5.0",
      "ratingCount": "1240"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "21:00"
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

export function getServiceSchema(serviceName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": business.name,
      "telephone": business.phone,
      "url": "https://invisiblesafety.in"
    },
    "description": description,
    "areaServed": business.cities.map(c => ({
      "@type": "City",
      "name": c.name
    })),
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "price": "Custom Site Quote",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }
  };
}

export function getProductSchema(name: string, description: string, image = "/images/hero-balcony.webp") {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": `https://invisiblesafety.in${image}`,
    "brand": {
      "@type": "Brand",
      "name": business.name
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "Custom Quote",
      "offerCount": "1",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "850"
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
    "itemListElement": items.map((item, index) => {
      const fullUrl = item.url.startsWith('http') ? item.url : `https://invisiblesafety.in${item.url.startsWith('/') ? '' : '/'}${item.url}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": fullUrl
      };
    })
  };
}
