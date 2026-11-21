import os

PAGES_CONFIG = [
    # Top Tier (1.0)
    ("", 1.0, "daily"),
    
    # Core Pillars (0.95)
    ("invisible-grills/", 0.95, "weekly"),
    ("safety-nets/", 0.95, "weekly"),
    ("cloth-drying-hangers/", 0.95, "weekly"),
    ("visualizer/", 0.95, "weekly"),
    ("invisible-grill-cost/", 0.95, "weekly"),
    
    # Core Services & Locations (0.90)
    ("balcony-safety/", 0.90, "weekly"),
    ("balcony-invisible-grills/", 0.90, "weekly"),
    ("window-invisible-grills/", 0.90, "weekly"),
    ("staircase-invisible-grills/", 0.90, "weekly"),
    ("child-safety-invisible-grills/", 0.90, "weekly"),
    ("child-safety-nets/", 0.90, "weekly"),
    ("pigeon-nets/", 0.90, "weekly"),
    ("bird-spikes/", 0.90, "weekly"),
    ("sports-nets/", 0.90, "weekly"),
    ("locations/", 0.90, "weekly"),
    ("locations/hyderabad/", 0.90, "weekly"),
    ("locations/visakhapatnam/", 0.90, "weekly"),
    ("locations/vijayawada/", 0.90, "weekly"),
    ("locations/amaravati/", 0.90, "weekly"),
    ("solutions/", 0.90, "weekly"),
    
    # Specialized Netting & Solutions (0.85)
    ("animals-birds-safety-nets/", 0.85, "monthly"),
    ("balconies/", 0.85, "monthly"),
    ("bird-protection/", 0.85, "monthly"),
    ("building-safety-nets/", 0.85, "monthly"),
    ("car-parking-safety-nets/", 0.85, "monthly"),
    ("coconut-safety-nets/", 0.85, "monthly"),
    ("construction-safety/", 0.85, "monthly"),
    ("construction-safety-nets/", 0.85, "monthly"),
    ("duct-safety-nets/", 0.85, "monthly"),
    ("industrial-safety-nets/", 0.85, "monthly"),
    ("monkey-safety-nets/", 0.85, "monthly"),
    ("mosquito-safety-nets/", 0.85, "monthly"),
    ("solutions/bird-protection/", 0.85, "monthly"),
    ("solutions/construction-safety/", 0.85, "monthly"),
    ("solutions/invisible-grills/", 0.85, "monthly"),
    ("solutions/safety-nets/", 0.85, "monthly"),
    ("solutions/sports-nets/", 0.85, "monthly"),
    ("sports-practice-nets/", 0.85, "monthly"),
    ("staircase-safety-nets/", 0.85, "monthly"),
    ("swimming-pool-nets/", 0.85, "monthly"),
    ("terrace-safety-nets/", 0.85, "monthly"),
    
    # Company, Proof & Trust (0.85)
    ("about/", 0.85, "monthly"),
    ("contact/", 0.85, "monthly"),
    ("faq/", 0.85, "monthly"),
    ("gallery/", 0.85, "monthly"),
    ("materials/", 0.85, "monthly"),
    ("projects/", 0.85, "monthly"),
    ("warranty/", 0.85, "monthly"),
    ("why-invisible-safety/", 0.85, "monthly"),
    ("why-invisprotect/", 0.85, "monthly"),
]

BASE_URL = "https://invisiblesafety.in/"
TODAY = "2026-11-21"

def generate_sitemap_xml():
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
    ]
    for path, priority, freq in PAGES_CONFIG:
        url = f"{BASE_URL}{path}"
        lines.append('  <url>')
        lines.append(f'    <loc>{url}</loc>')
        lines.append(f'    <lastmod>{TODAY}</lastmod>')
        lines.append(f'    <changefreq>{freq}</changefreq>')
        lines.append(f'    <priority>{priority:.2f}</priority>')
        lines.append('  </url>')
    lines.append('</urlset>')
    return '\n'.join(lines) + '\n'

def generate_sitemap_index_xml():
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <sitemap>',
        f'    <loc>{BASE_URL}sitemap.xml</loc>',
        f'    <lastmod>{TODAY}</lastmod>',
        '  </sitemap>',
        '</sitemapindex>'
    ]
    return '\n'.join(lines) + '\n'

def generate_robots_txt():
    return (
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /thank-you/\n"
        "Disallow: /404/\n\n"
        f"Sitemap: {BASE_URL}sitemap.xml\n"
        f"Sitemap: {BASE_URL}sitemap-index.xml\n"
    )

if __name__ == '__main__':
    with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(generate_sitemap_xml())
    print(f"Generated public/sitemap.xml with {len(PAGES_CONFIG)} URLs.")
    
    with open('public/sitemap-index.xml', 'w', encoding='utf-8') as f:
        f.write(generate_sitemap_index_xml())
    print("Generated public/sitemap-index.xml.")
    
    with open('public/robots.txt', 'w', encoding='utf-8') as f:
        f.write(generate_robots_txt())
    print("Updated public/robots.txt.")
