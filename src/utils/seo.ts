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
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Telangana" },
      { "@type": "AdministrativeArea", "name": "Andhra Pradesh" }
    ],
    "sameAs": [
      `https://wa.me/${business.whatsapp}`
    ]
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": business.legalName,
    "alternateName": business.name,
    "description": business.subtitle,
    "url": "https://invisiblesafety.in",
    "telephone": business.phone,
    "email": business.email,
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Telangana" },
      { "@type": "AdministrativeArea", "name": "Andhra Pradesh" }
    ]
  };
}

export function getServiceSchema(serviceName: string, description: string, customSpecOrPrice?: string | number) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
      "@type": "Organization",
      "name": business.name,
      "telephone": business.phone,
      "url": "https://invisiblesafety.in"
    },
    "description": description,
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Telangana" },
      { "@type": "AdministrativeArea", "name": "Andhra Pradesh" }
    ]
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
