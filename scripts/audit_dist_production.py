import os, json, re

dist_dir = 'dist'
total_html = 0
canonical_count = 0
faq_count = 0
local_business_count = 0
org_count = 0
website_count = 0
phone_click_count = 0
wa_click_count = 0
conversion_listener_count = 0

for root, dirs, files in os.walk(dist_dir):
    for f in files:
        if f.endswith('.html'):
            total_html += 1
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                html = fh.read()
            
            # Canonical check
            if '<link rel="canonical" href="https://invisiblesafety.in' in html:
                canonical_count += 1
                
            # Click to call & WhatsApp
            if 'tel:+918309755398' in html:
                phone_click_count += 1
            if '918309755398' in html and 'wa.me' in html:
                wa_click_count += 1
                
            # Conversion listener
            if 'lead_phone_call' in html and 'lead_whatsapp_click' in html:
                conversion_listener_count += 1
                
            # Schema checks
            for match in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL):
                try:
                    data = json.loads(match.group(1))
                    graph = data.get('@graph', [data])
                    for item in graph:
                        t = str(item.get('@type', ''))
                        if 'FAQPage' in t:
                            faq_count += 1
                        if any(lb in t for lb in ['LocalBusiness', 'HomeAndConstructionBusiness']):
                            local_business_count += 1
                        if 'Organization' in t:
                            org_count += 1
                        if 'WebSite' in t:
                            website_count += 1
                except Exception as e:
                    pass

print(f"Total HTML files in dist: {total_html}")
print(f"Canonical URLs verified: {canonical_count}/{total_html}")
print(f"Global Conversion Tracking Script: {conversion_listener_count}/{total_html}")
print(f"Pages with direct +918309755398 phone link: {phone_click_count}/{total_html}")
print(f"Pages with direct WhatsApp link: {wa_click_count}/{total_html}")
print(f"Pages with Organization schema: {org_count}/{total_html}")
print(f"Pages with WebSite schema: {website_count}/{total_html}")
print(f"Pages with FAQPage schema: {faq_count}")
print(f"Pages with LocalBusiness schema: {local_business_count}")
