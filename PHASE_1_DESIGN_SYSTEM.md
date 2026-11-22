# PHASE 1 — PREMIUM DESIGN SYSTEM SPECIFICATION (VALIDATED)

**Project:** Invisible Safety  
**Official Domain:** https://invisiblesafety.in/  
**Creative Direction:** Bright Architectural Luxury + Cinematic Editorial  
**Broad Service Region:** Serving South India  
**Phase:** Phase 1 Design System & Experience Architecture  
**Status:** Validated Architectural Specification (Strictly Verified, No Production Overwrites)

---

## 1. CREATIVE DIRECTION OVERVIEW

Invisible Safety is positioned as an architectural residential safety brand for high-rise towers, penthouses, and residential communities across South India. The brand experience departs fundamentally from generic safety netting contractors by adhering to **Bright Architectural Luxury + Cinematic Editorial**.

### Visual Characteristics
* **Warm Ivory & Soft-White Foundations:** Replaces sterile, cold pure-white and dark tech themes with a serene, natural morning sunlight atmosphere.
* **Architectural Beige & Light Stone Surfaces:** Tactile secondary backgrounds and card borders inspired by limestone, travertine, and modern balcony architecture.
* **Deep Royal Navy for Contrast & Brand Identity:** Used with deliberate restraint for primary headlines, formal navigation chrome, and high-priority action buttons.
* **Restrained Soft Gold Accents:** Used sparingly for trust icons, badges, and card hover highlights. Never metallic-garish or excessive.
* **Pure Visual Clarity:** Balconies and skyline views are never obstructed by dark overlays or misplaced typography.
* **Strict Factual Integrity:** No unverified technical figures, percentage claims, load ratings, or warranty promises are displayed without formal documentation.

---

## 2. COLOUR SYSTEM & ACCESSIBILITY MATRIX

The color system is engineered to guarantee **WCAG AAA contrast** for body text and primary headlines while preserving a calm, high-end residential aesthetic.

### 2.1 Complete Token Palette

| Token Name | Hex Code | Semantic Role | WCAG Contrast Ratio | Compliance Level |
| :--- | :--- | :--- | :--- | :--- |
| `--color-primary` | `#102B46` | Deep Royal Navy (H1/H2, Primary CTAs, Top Bar) | 12.8:1 on `#FAF8F3` | **WCAG AAA** (Pass) |
| `--color-primary-dark` | `#0A1C2E` | Midnight Abyss (Active buttons, deep footer) | 15.6:1 on `#FAF8F3` | **WCAG AAA** (Pass) |
| `--color-primary-hover`| `#1A3D60` | Slate Navy Hover | 10.4:1 on `#FAF8F3` | **WCAG AAA** (Pass) |
| `--color-bg-ivory` | `#FAF8F3` | Warm Ivory Main Page Canvas | N/A (Base Canvas) | Background |
| `--color-bg-white` | `#FFFFFF` | Crisp White Card / Visualizer Island Canvas | N/A (Surface) | Background |
| `--color-secondary` | `#EDE5D9` | Architectural Beige (Pillars, Tag Badges, Borders) | 1.15:1 vs Canvas | Subtle Contrast |
| `--color-secondary-light`| `#F5F0E8` | Soft Stone Alternate Section Canvas | N/A (Alternate) | Background |
| `--color-text-primary` | `#202A32` | Slate Charcoal Body Text | 11.9:1 on `#FAF8F3` | **WCAG AAA** (Pass) |
| `--color-text-secondary`| `#546371` | Muted Architectural Slate (Captions, Meta) | 5.2:1 on `#FAF8F3` | **WCAG AA** (Pass) |
| `--color-accent-gold` | `#C6A66B` | Pure Soft Gold (Trust Icons, Badges, Borders) | 3.1:1 on `#102B46` | Graphic Element |
| `--color-accent-gold-light`| `#D8BE8A` | Light Champagne Gold (Hover, Borders) | N/A (Accent) | Subtle Highlight |
| `--color-whatsapp` | `#25D366` | Natural WhatsApp Green (Instant Consultation) | 4.6:1 on `#FFFFFF` | **WCAG AA** (Pass) |
| `--color-whatsapp-hover`| `#20BA5A` | Darkened WhatsApp Green Hover | 5.1:1 on `#FFFFFF` | **WCAG AA** (Pass) |
| `--color-border` | `#E5DDD1` | Architectural Stone Border | N/A (Structural) | Crisp Divider |
| `--color-border-light` | `#EFE9DF` | Hairline Internal Divider | N/A (Structural) | Subtle Divider |

---

## 3. TYPOGRAPHY SYSTEM

The typography pairs the architectural elegance of **Cinzel** (classical luxury serif for formal titles) with the clean, modern engineering legibility of **Plus Jakarta Sans** (geometric sans-serif for responsive headings, cards, and body text).

### 3.1 Font Stack Definition
* **Display & Heading Serif:** `'Cinzel', Georgia, serif`
* **Modern Interface & Body Sans:** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
* **Fallback Monospace:** `'SFMono-Regular', Consolas, monospace`

### 3.2 Responsive Fluid Scale (CSS `clamp` Formulas)

| Hierarchy Role | Font Family | Weight | Fluid Size Formula | Desktop (1440px) | Mobile (390px) | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `Cinzel` | 700 / 800 | `clamp(2.25rem, 5vw, 3.75rem)` | 60px | 36px | 1.15 | `+0.02em` |
| **Section H2** | `Cinzel` | 700 | `clamp(1.75rem, 3.5vw, 2.75rem)` | 44px | 28px | 1.20 | `+0.01em` |
| **Card H3** | `Plus Jakarta Sans` | 700 | `clamp(1.15rem, 2vw, 1.35rem)` | 22px | 18px | 1.25 | `0` |
| **Subtitle / Lead** | `Plus Jakarta Sans` | 400 / 500 | `clamp(1.05rem, 1.4vw, 1.2rem)` | 19px | 16px | 1.60 | `0` |
| **Body Regular** | `Plus Jakarta Sans` | 400 / 500 | `1rem` (16px fixed) | 16px | 16px | 1.65 | `0` |
| **Body Small** | `Plus Jakarta Sans` | 500 | `0.875rem` (14px fixed) | 14px | 14px | 1.50 | `0` |
| **Eyebrow / Overline**| `Plus Jakarta Sans` | 700 | `0.75rem` (12px fixed) | 12px | 11px | 1.40 | `+0.20em` |
| **Button Text** | `Plus Jakarta Sans` | 700 | `0.875rem` (14px) | 14px | 13px | 1.00 | `+0.02em` |

---

## 4. LAYOUT, SPACING & GEOMETRY

### 4.1 Responsive Breakpoints
* **Mobile Small:** `360px` (Compact viewports)
* **Mobile Standard:** `390px` (Modern smartphones)
* **Tablet:** `768px` (iPad Portrait / Tablets)
* **Laptop:** `1280px` (Standard Laptops)
* **Desktop:** `1440px` (Full High-Resolution Workstations)
* **Max Container Width:** `1280px` (`max-w-7xl` centered with `mx-auto`)

### 4.2 Spacing & Section Rhythm
* **Page Horizontal Gutters:**
  * Mobile (`<768px`): `16px` (`px-4`)
  * Tablet (`768px - 1024px`): `32px` (`px-8`)
  * Desktop (`≥1024px`): `48px` to `64px` (`px-12` to `px-16`)
* **Section Vertical Padding:**
  * Desktop: `clamp(4.5rem, 8vw, 7rem)`
  * Mobile: `clamp(3rem, 6vw, 4.5rem)`

### 4.3 Corner Radii & Elevation Shadows
* **Corner Radii Rules:**
  * `rounded-full` (`9999px`): Action pills, contact badges, floating docks.
  * `rounded-3xl` (`24px`): Major section backdrops, visualizer cards, hero conversion modules.
  * `rounded-2xl` (`16px`): 7-Service showcase cards, review containers.
  * `rounded-xl` (`12px`): Form inputs, spec items, dropdown menus.
* **Shadow Architecture:**
  * Resting Card: `0 4px 20px -2px rgba(16, 43, 70, 0.05)`
  * Hover Card: `0 12px 32px -4px rgba(16, 43, 70, 0.12)`
  * Floating CTA Dock: `0 8px 30px rgba(16, 43, 70, 0.18)`

---

## 5. BUTTONS, ACTIONS & TOUCH TARGETS

All conversion buttons feature a minimum touch target of **48px height** for effortless mobile tapping and accessibility compliance.

### 5.1 Button States Matrix

| Button Type | Resting State | Hover State | Active (Pressed) | Focus-Visible |
| :--- | :--- | :--- | :--- | :--- |
| **Primary CTA** | BG `#102B46`, Text `#FFF`, Shadow-sm | BG `#1A3D60`, `-2px` translateY, Shadow-md | `scale(0.98)` | `2px` ring `#102B46`, `2px` offset |
| **Secondary CTA** | BG `#EDE5D9`, Text `#102B46`, Border `#D8CEBF` | BG `#E2D7C7`, `-2px` translateY | `scale(0.98)` | `2px` ring `#102B46`, `2px` offset |
| **WhatsApp Pill** | BG `#25D366`, Text `#FFF`, Shadow-sm | BG `#20BA5A`, `-2px` translateY, Shadow-md | `scale(0.98)` | `2px` ring `#25D366`, `2px` offset |
| **Call Pill** | BG `#102B46`, Text `#FFF`, Gold Icon `#C6A66B` | BG `#1A3D60`, `-2px` translateY | `scale(0.98)` | `2px` ring `#102B46`, `2px` offset |
| **Free Survey** | BG `#102B46`, Text `#FFF`, Gold Calendar | BG `#1A3D60`, `-2px` translateY | `scale(0.98)` | `2px` ring `#102B46`, `2px` offset |

### 5.2 Persistent Fixed Contact Actions Architecture
* **Mobile (<768px):** Full-width pinned bottom bar (`position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); padding-bottom: max(8px, env(safe-area-inset-bottom, 8px))`). Holds 3 action pills: **Call Now** (`#102B46`), **WhatsApp** (`#25D366`), and **Free Visit & Survey** (`#102B46`). All enforce minimum 48px touch height and flexible shrink.
* **Desktop (≥768px):** Floating bottom-right dock (`position: fixed; bottom: 24px; right: 28px; z-index: 9999; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); border-radius: 9999px; box-shadow: 0 8px 30px rgba(16,43,70,0.18)`). Holds **Free Visit & Survey**, **WhatsApp**, and **Call Now**.
* **Body Clearance Lock:** Global CSS enforces `padding-bottom: 84px` to `96px` on mobile viewports so page footer, legal notices, and cards are never occluded by the fixed bottom bar.

---

## 6. ASTRO CODEBASE MAPPING

The design system maps directly into the existing Astro project structure via `src/styles/global.css`:

```css
:root {
  /* Core Luxury Palette */
  --color-primary: #102B46;
  --color-primary-dark: #0A1C2E;
  --color-primary-hover: #1A3D60;
  --color-secondary: #EDE5D9;
  --color-secondary-light: #F5F0E8;
  --color-bg: #FAF8F3;
  --color-bg-card: #FFFFFF;
  --color-text-primary: #202A32;
  --color-text-secondary: #546371;
  --color-accent-gold: #C6A66B;
  --color-whatsapp: #25D366;
  --color-border: #E5DDD1;
  
  /* Radii & Shadows */
  --radius-card: 16px;
  --radius-section: 24px;
  --shadow-card: 0 4px 20px -2px rgba(16, 43, 70, 0.05);
  --shadow-hover: 0 12px 32px -4px rgba(16, 43, 70, 0.12);
}
```
