# PHASE 2 — EXISTING ASSET AUDIT & INVENTORY REPORT

**Brand:** Invisible Safety  
**Domain:** [https://invisiblesafety.in/](https://invisiblesafety.in/)  
**Date:** November 21, 2026  
**Scope:** Complete inspection of all photographic assets across `/public/images/` and source references in `/src/`.  

---

## 1. Executive Asset Summary

A forensic inspection of the project's static image directory revealed **41 total graphic and photographic files**. The audit uncovered severe structural issues that compromise brand credibility, create visual repetition, and degrade mobile responsiveness:

| Metric | Measured Value | Severity | Impact |
| :--- | :---: | :---: | :--- |
| **Total Images in Repository** | 41 files | Info | Existing catalog of all raster & vector assets. |
| **Duplicate Image Groups** | **6 groups (16 files)** | **CRITICAL** | Identical images assigned to completely different services and projects. |
| **Missing Images (Referenced in Code)** | **5 files** | **HIGH** | `*-before.webp` project files referenced in code cause 404 HTTP errors. |
| **Orphaned Images (Unused in Code)** | 9 files | Medium | Unused legacy assets consuming repository space. |
| **Mobile-Optimized Vertical Images** | **Only 2 files** | **CRITICAL** | 39 of 41 images are landscape (16:9 / 4:3); mobile viewports suffer awkward crops. |
| **Services with Dedicated Mobile Photos** | 1 of 7 | **CRITICAL** | Only Invisible Grills has a mobile portrait hero asset. 6 services have zero mobile framing. |

> [!CAUTION]
> **Policy Enforcement:** Per Phase 2 instructions, **NO existing images have been deleted or overwritten**. This report documents the current state and establishes a non-destructive replacement blueprint.

---

## 2. Complete Asset Inventory (All 41 Existing Files)

| File Path in `/public/images/` | Format | Resolution | Aspect Ratio | File Size | Current Usage / Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `/images/balcony-safety-twilight.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 274.9 KB | **Duplicate** of child safety & safety net balcony (Orphaned in code). |
| `/images/balcony-safety.webp` | WEBP | 1376×768 | 1.79 (16:9) | 237.4 KB | **Duplicate** of `safety-net-balcony.webp`. Used on balcony safety page. |
| `/images/bird-spikes.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 204.2 KB | **Duplicate** of pigeon net & category bird protection. |
| `/images/building-safety-net.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 274.9 KB | Used on building safety nets subpage. |
| `/images/car-parking-net.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 256.5 KB | Used on car parking nets subpage. |
| `/images/category-bird-protection.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 204.2 KB | **Duplicate** of bird-spikes.jpg. Used in category cards. |
| `/images/category-child-safety.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 274.9 KB | **Duplicate** of balcony-safety-twilight.jpg. Used in category cards. |
| `/images/category-invisible-grills.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 148.6 KB | Used in category cards for invisible grills. |
| `/images/category-structural-safety.jpg`| JPEG | 1376×768 | 1.79 (16:9) | 338.7 KB | **Duplicate** of construction-safety-net.jpg. |
| `/images/child-safety.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 104.3 KB | Orphaned unoptimized JPG version. |
| `/images/child-safety.webp` | WEBP | 1200×896 | 1.34 (4:3) | 56.6 KB | Used on child safety subpage; low-res/compressed. |
| `/images/cloth-drying-hanger.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 203.6 KB | Used on cloth drying hangers subpage; 4:3 ratio. |
| `/images/coconut-safety-net.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 362.1 KB | Used on coconut safety net subpage. |
| `/images/construction-safety-mobile-twilight.jpg` | JPEG | 768×1376 | 0.56 (9:16) | 225.4 KB | Vertical portrait; orphaned (unreferenced in code). |
| `/images/construction-safety-net.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 338.7 KB | **Duplicate** of category-structural-safety.jpg. |
| `/images/construction-safety-twilight.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 208.4 KB | Orphaned landscape variant. |
| `/images/duct-net.webp` | WEBP | 1376×768 | 1.79 (16:9) | 213.6 KB | **Duplicate** used as project photos for Aparna & Kanuru! |
| `/images/hero-balcony-twilight-mobile.jpg` | JPEG | 768×1376 | 0.56 (9:16) | 227.8 KB | **Active mobile hero asset** on homepage. |
| `/images/hero-balcony-twilight.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 229.4 KB | Orphaned landscape twilight hero variant. |
| `/images/hero-balcony.webp` | WEBP | 1376×768 | 1.79 (16:9) | 145.4 KB | **Active desktop hero asset** on homepage. |
| `/images/industrial-safety-net.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 362.1 KB | Used on industrial safety nets subpage. |
| `/images/invisible-grills-page.webp` | WEBP | 1376×768 | 1.79 (16:9) | 79.8 KB | Used on invisible grills subpage. |
| `/images/logo-192.png` | PNG | 192×192 | 1.0 (1:1) | 17.8 KB | Web manifest & apple touch icon. |
| `/images/logo-raw.jpg` | JPEG | 1024×1024 | 1.0 (1:1) | 130.7 KB | Raw source logo; orphaned. |
| `/images/logo.png` | PNG | 512×512 | 1.0 (1:1) | 83.8 KB | Main brand logo icon. |
| `/images/pigeon-net-twilight.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 204.2 KB | **Duplicate** of bird-spikes.jpg; orphaned in code. |
| `/images/pigeon-net.webp` | WEBP | 1376×768 | 1.79 (16:9) | 150.9 KB | Used on pigeon nets subpage. |
| `/images/projects/aparna-after.webp` | WEBP | 1376×768 | 1.79 (16:9) | 213.6 KB | **Duplicate** of duct-net.webp & kanuru-after.webp. |
| `/images/projects/bhooja-after.webp` | WEBP | 1376×768 | 1.79 (16:9) | 129.7 KB | **Duplicate** of prestige-after.webp & vizag-after.webp. |
| `/images/projects/kanuru-after.webp` | WEBP | 1376×768 | 1.79 (16:9) | 213.6 KB | **Duplicate** of aparna-after.webp & duct-net.webp. |
| `/images/projects/prestige-after.webp` | WEBP | 1376×768 | 1.79 (16:9) | 129.7 KB | **Duplicate** of bhooja-after.webp & vizag-after.webp. |
| `/images/projects/vizag-after.webp` | WEBP | 1376×768 | 1.79 (16:9) | 129.7 KB | **Duplicate** of bhooja-after.webp & prestige-after.webp. |
| `/images/safety-net-balcony.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 274.9 KB | **Duplicate** of balcony-safety-twilight.jpg; orphaned. |
| `/images/safety-net-balcony.webp` | WEBP | 1376×768 | 1.79 (16:9) | 237.4 KB | **Duplicate** of balcony-safety.webp. |
| `/images/sports-nets-twilight.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 174.5 KB | Orphaned twilight sports variant. |
| `/images/sports-nets.webp` | WEBP | 1376×768 | 1.79 (16:9) | 127.6 KB | Used on sports nets subpage. |
| `/images/staircase-invisible-grills.webp`| WEBP | 896×1200 | 0.75 (3:4) | 84.4 KB | Portrait orientation; used on staircase grills page. |
| `/images/swimming-pool-net.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 276.8 KB | Used on swimming pool nets page. |
| `/images/terrace-top-net.jpg` | JPEG | 1200×896 | 1.34 (4:3) | 296.2 KB | Used on terrace safety nets page. |
| `/images/window-invisible-grills-twilight.jpg` | JPEG | 1376×768 | 1.79 (16:9) | 185.7 KB | Orphaned twilight window variant. |
| `/images/window-invisible-grills.webp` | WEBP | 1376×768 | 1.79 (16:9) | 111.9 KB | Used on window invisible grills page. |

---

## 3. Forensic Duplicate Image Report

Our MD5 cryptographic hash audit confirmed **six distinct duplicate clusters comprising 16 files**:

### Cluster 1: Balcony Safety / Child Safety Triplicate
* **MD5:** `3a766e5b08dedfc01183904fa91fb441` (Size: 281,452 bytes)
* **Files:**
  1. `/images/balcony-safety-twilight.jpg`
  2. `/images/category-child-safety.jpg`
  3. `/images/safety-net-balcony.jpg`
* **Defect:** A single twilight balcony net photo was renamed to "Child Safety" and "Balcony Safety". A customer seeking child safety sees an identical image to general balcony netting.

### Cluster 2: Balcony Safety WebP Duplicate
* **MD5:** `2f3fc3ee2de42539f08a0fe3f2fd9e8e` (Size: 243,092 bytes)
* **Files:**
  1. `/images/balcony-safety.webp`
  2. `/images/safety-net-balcony.webp`
* **Defect:** Redundant file storage with duplicate names.

### Cluster 3: Bird Spikes / Pigeon Net Triplicate
* **MD5:** `277d427d98145ed4e62cd834c4d47104` (Size: 209,143 bytes)
* **Files:**
  1. `/images/bird-spikes.jpg`
  2. `/images/category-bird-protection.jpg`
  3. `/images/pigeon-net-twilight.jpg`
* **Defect:** **Severe cross-service contamination.** The exact same image of polycarbonate/steel bird spikes was duplicated to represent pigeon netting!

### Cluster 4: Structural / Construction Safety Duplicate
* **MD5:** `e60e334bedc7ff953925bbf28e8d1ff6` (Size: 346,819 bytes)
* **Files:**
  1. `/images/category-structural-safety.jpg`
  2. `/images/construction-safety-net.jpg`

### Cluster 5: Duct Net / Aparna / Kanuru Project Triplicate
* **MD5:** `7992cec64eba23d0ea5e95007ecf19ec` (Size: 218,678 bytes)
* **Files:**
  1. `/images/duct-net.webp`
  2. `/images/projects/aparna-after.webp`
  3. `/images/projects/kanuru-after.webp`
* **Defect:** High-profile completed projects (Aparna Sarovar and Kanuru High-rise) were assigned the exact same photo as a generic building duct net!

### Cluster 6: Bhooja / Prestige / Vizag Project Triplicate
* **MD5:** `5855f9e1b890e445654be277dbb8e0f0` (Size: 132,850 bytes)
* **Files:**
  1. `/images/projects/bhooja-after.webp`
  2. `/images/projects/prestige-after.webp`
  3. `/images/projects/vizag-after.webp`
* **Defect:** Three flagship installations across Hyderabad, Bengaluru, and Visakhapatnam all display the identical balcony photo!

---

## 4. Missing Image Report (404 Broken References in Code)

The codebase in `src/pages/index.astro` and `src/pages/gallery.astro` contains interactive before/after transformation cards that reference 5 non-existent files:
1. `/images/projects/aparna-before.webp` — **MISSING** (HTTP 404)
2. `/images/projects/bhooja-before.webp` — **MISSING** (HTTP 404)
3. `/images/projects/kanuru-before.webp` — **MISSING** (HTTP 404)
4. `/images/projects/prestige-before.webp` — **MISSING** (HTTP 404)
5. `/images/projects/vizag-before.webp` — **MISSING** (HTTP 404)

*Impact:* Any visitor clicking or scrolling to before/after comparison sliders experiences broken image placeholders.

---

## 5. Service-to-Image Integrity Audit (The 7 Approved Services)

| Approved Service Category | Current Primary Image | Visual Assessment & Accuracy | Remediation Required |
| :--- | :--- | :--- | :--- |
| **1. Invisible Grills** | `hero-balcony.webp` (Desktop)<br>`hero-balcony-twilight-mobile.jpg` (Mobile) | High quality, modern high-rise balcony with visible cables. Good baseline for home hero. | Needs dedicated close-up macro of stainless-steel cables (grade pending owner verification), track fixing, and window installation. |
| **2. Balcony Safety Nets** | `balcony-safety.webp` | Shows white polymer netting on balcony, but duplicated across 2 other files. | Needs distinct, non-duplicated residential high-rise net installation with clear perimeter fixing. |
| **3. Child Safety Nets** | `child-safety.webp` / `category-child-safety.jpg` | **Severe failure.** Category card is duplicate of general balcony net; `child-safety.webp` is low-res (56KB). | Needs dedicated lifestyle photography showing a safe high-rise balcony with family presence. |
| **4. Pigeon Safety Nets** | `pigeon-net.webp` / `pigeon-net-twilight.jpg` | **Severe failure.** Twilight variant is literally a photo of bird spikes! | Needs dedicated anti-pigeon netting cleanly covering open balcony space without spikes conflation. |
| **5. Cloth-Drying Hangers** | `cloth-drying-hanger.jpg` | Functional 4:3 shot of ceiling pipes, but dated lighting and lack of modern architectural context. | Needs luxury utility balcony setting with sleek stainless-steel ceiling pulley mechanism. |
| **6. Sports Nets** | `sports-nets.webp` | Box cricket / rooftop sports cage. Good, but only landscape. | Needs professional cricket practice crease and box net with clear boundary protection. |
| **7. Bird Spikes** | `bird-spikes.jpg` | Clean close-up of polycarbonate and SS spikes on a parapet ledge. Accurate representation. | Needs architectural window ledge and AC outdoor ledge context shots. |

---

## 6. Desktop vs. Mobile Framing Audit

* **Desktop Viewports (1920px & 1440px):** Landscape assets (16:9, aspect 1.79) fit desktop columns well, provided container widths reach 1520px.
* **Mobile Viewports (390px & 360px):**
  - Standard mobile screens require **4:5 vertical cards** (`aspect-[4/5]`) or **9:16 vertical heroes** (`aspect-[9/16]`).
  - When a 16:9 landscape image is placed in a 4:5 or 3:4 container on mobile, the browser clips **55% of the horizontal width**. In most safety net photos, the ceiling hooks and lower perimeter fixings are completely cropped out, leaving only an unidentifiable texture!
  - **Requirement:** Phase 2 must plan independent 4:5 and 9:16 mobile compositions for all 7 services.
