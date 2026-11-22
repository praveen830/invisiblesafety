# PHASE 2 — DESKTOP & MOBILE IMAGE SPECIFICATION
## Responsive Viewport Engineering, Aspect Ratios, Focal Anchors & Art Direction

**Brand:** Invisible Safety  
**Domain:** [https://invisiblesafety.in/](https://invisiblesafety.in/)  
**Date:** November 21, 2026  
**Scope:** Viewport-by-viewport photographic composition specifications across 5 standard screen tiers (1920px, 1440px, 768px, 390px, 360px).

---

## 1. Core Engineering Principle: Art Direction vs. Blind Cropping

A common failure in local safety websites is utilizing a single 16:9 landscape image across all screens. When a 16:9 landscape image is rendered in a mobile viewport (where height exceeds width), the browser applies `object-fit: cover`, cropping out up to **58% of the horizontal periphery**. In residential safety photography, this catastrophic crop invariably removes the structural mounting tracks, the anchor bolts, and the ceiling pulleys—rendering the image meaningless.

**The Invisible Safety Rule:** Every hero and primary showcase component must employ **responsive art direction** via HTML5 `<picture>` elements, pairing an expansive landscape composition on desktop with a dedicated vertical composition on mobile.

```html
<!-- Production Standard: Responsive Art Direction Template -->
<picture class="block w-full h-full">
  <!-- Desktop Tier (≥1024px): 16:9 Landscape High-Res Master -->
  <source
    media="(min-width: 1024px)"
    srcset="/images/{service}/hero-desktop-1920.webp 1920w, /images/{service}/hero-desktop-1440.webp 1440w"
    sizes="(min-width: 1520px) 720px, 50vw"
    type="image/webp"
  />
  <!-- Tablet Tier (768px–1023px): 4:3 Balanced Composition -->
  <source
    media="(min-width: 768px)"
    srcset="/images/{service}/hero-tablet-768.webp"
    sizes="50vw"
    type="image/webp"
  />
  <!-- Mobile Tier (<768px): 4:5 Portrait Composition (Zero Text Overlay) -->
  <source
    media="(max-width: 767px)"
    srcset="/images/{service}/hero-mobile-390.webp 390w, /images/{service}/hero-mobile-768.webp 768w"
    sizes="100vw"
    type="image/webp"
  />
  <!-- Fallback Img -->
  <img
    src="/images/{service}/hero-desktop-1440.webp"
    alt="High-rise apartment balcony protected with stainless-steel invisible safety grills"
    class="w-full h-full object-cover object-center"
    loading="eager"
    fetchpriority="high"
    decoding="async"
    width="1440"
    height="900"
  />
</picture>
```

---

## 2. Specification Across the Five Viewport Tiers

### 2.1. Desktop Tier 1: 1920px (Ultra-Wide / Large Desktop)
* **Viewport Context:** High-resolution monitors (1920×1080 to 2560×1440). Hero container max-width: `1520px`. Two-column symmetric grid (`1.1fr 1fr`).
* **Aspect Ratio:** `16:9` or `16:10` (`min-height: 580px; max-height: 640px`).
* **Compositional Goal:** Expansive architectural grandeur. Showcases the entire panoramic vista through the safety cables or net, establishing the luxury high-rise context.
* **Focal Anchor (`object-position`):** `center 40%` (preserves skyline horizon and clean balcony floor).
* **Safe Zone:** Subject cables and architectural structure centered within the inner 80% of width.
* **Text Conflict:** **Zero conflict.** Content is positioned in the left column; image occupies the right column in its entirety.

### 2.2. Desktop Tier 2: 1440px (Standard Laptop / Desktop)
* **Viewport Context:** 13-inch to 16-inch laptops (MacBook Pro, ThinkPad, Dell XPS). Hero container: `1440px` with 40px margins.
* **Aspect Ratio:** `16:10` (`min-height: 520px; max-height: 580px`).
* **Compositional Goal:** Balanced intimacy and clarity. Both the ceiling track profile and the floor railing are sharply in view.
* **Focal Anchor:** `center center`.
* **Safe Zone:** Inner 85% width.
* **Text Conflict:** **Zero conflict.** Left-column content, right-column photo.

### 2.3. Tablet Tier: 768px (iPad Portrait / Foldables)
* **Viewport Context:** 768×1024 tablet portrait. Hero transitions into stacked column or compact side-by-side.
* **Aspect Ratio:** `4:3` or `1:1` (`min-height: 440px`).
* **Compositional Goal:** Compact architectural perspective. Focuses on the corner enclosure and cable tension turnbuckles.
* **Focal Anchor:** `center 45%`.
* **Safe Zone:** Full width.

### 2.4. Mobile Tier 1: 390px (Standard Modern Smartphone — iPhone 14/15/16, Galaxy S24)
* **Viewport Context:** 390×844 CSS pixels (device pixel ratio 3.0). Strictly stacked layout.
* **Aspect Ratio:** Strictly **`4:5`** (`aspect-[4/5]`) for hero photo; **`16:10`** for 2-column service cards.
* **Compositional Goal:** Unobstructed vertical view. The top half is open sky and city towers seen through pristine vertical cables/netting; lower half is the clean balcony parapet.
* **Focal Anchor:** `center top` or `center 30%`.
* **Safe Zone:** Entire height of the 4:5 container.
* **Text Conflict Rule:** **MANDATORY ZERO TEXT OVER PHOTO.** Text, badges, and CTAs sit in an elevated card *directly beneath* the 4:5 photo block (`-mt-6 rounded-3xl p-5`). The photo remains 100% visible, uncluttered, and photographic.

### 2.5. Mobile Tier 2: 360px (Compact Mobile — Galaxy A-series, budget Android)
* **Viewport Context:** 360×780 or 360×800 CSS pixels. Very narrow horizontal space (360px total).
* **Aspect Ratio:** Strictly **`4:5`** (`aspect-[4/5]`).
* **Compositional Goal:** High legibility on small screens. The product (vertical cables or mesh) must be thick enough to resolve sharply on a small physical display without shimmering or disappearing.
* **Focal Anchor:** `center top`.
* **Card Grid Strategy:** Clean 2-column grid (`grid-cols-2 gap-2.5`). Service cards use `aspect-[16/10]` top photo with clean text bar below.

---

## 3. Service-Specific Art Direction & Crop Safety Matrix

| Service | Primary Product Focus | Desktop Safe Zone (16:9) | Mobile Safe Zone (4:5) | Key Detail That Must Never Be Cropped Out |
| :--- | :--- | :--- | :--- | :--- |
| **1. Invisible Grills** | Vertical stainless-steel cables | Center 70% width, full vertical height. | Center 80% width, full vertical span. | **Top & bottom structural track profiles.** Proves professional architectural fixing. |
| **2. Balcony Safety Nets** | Netting enclosing open balcony | Diagonal perspective from wall to railing. | Top-to-bottom vertical opening. | **Ceiling eyelet hooks & floor boundary cable.** Proves secure fall protection. |
| **3. Child Safety Nets** | Net flush to floor & railing | Wide shot of safe balcony play area. | Vertical barrier height & floor seal. | **Bottom flush seal against the floor.** Assures toddlers cannot crawl underneath. |
| **4. Pigeon Safety Nets** | Fine translucent mesh | Full panoramic balcony facade. | Vertical facade opening. | **Tight corner closures.** Assures birds cannot enter through side gaps. |
| **5. Cloth-Drying Hangers**| Stainless-steel ceiling pipes | Ceiling tracks, lowered rods & wall control. | Full vertical travel from ceiling to waist level. | **Ceiling bracket & pull-down rope mechanism.** Proves easy space-saving operation. |
| **6. Sports Nets** | High-tensile cage netting | Full length of pitch/court to boundary. | Vertical height of net barrier (15ft+). | **Steel stanchion wire tensioner.** Proves ball rebound durability. |
| **7. Bird Spikes** | Fanned spikes on ledge | Linear perspective along parapet. | AC unit ledge / window sill coverage. | **Clear polycarbonate base & outward-pointing spike tips.** Proves dense barrier. |

---

## 4. Performance & Loading Optimization Standards

1. **Hero Images (Above the Fold):**
   - Attribute requirements: `loading="eager" fetchpriority="high" decoding="async"`.
   - Preload headers: `<link rel="preload" as="image" href="..." type="image/webp" />`.
   - File size budget: `< 180 KB` for 1920px desktop; `< 95 KB` for 768px mobile.
2. **Service Cards & Mid-Page Grids:**
   - Attribute requirements: `loading="lazy" decoding="async"`.
   - File size budget: `< 65 KB` per card WebP.
3. **Format Support:** WebP standard across all modern browsers, achieving 30-40% smaller byte payload than JPEG at equivalent visual fidelity.
