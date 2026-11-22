# PHASE 1 — RESPONSIVE DESIGN SPECIFICATION (INCORPORATING PHASE 1.2 FIXES)

**Project:** Invisible Safety  
**Official Domain:** https://invisiblesafety.in/  
**Role:** Senior Frontend Architect & Responsive Design Specialist  
**Status:** Approved Architectural Specification (Phase 1.2 Validated, Zero Production Overwrites)

---

## 1. RESPONSIVE DESIGN PHILOSOPHY

Mobile responsiveness must never be treated as a compressed or degraded version of the desktop website. For Invisible Safety, the mobile experience is designed as an **independent, photo-first editorial journey** tailored for single-thumb navigation, zero text-over-image clashes, and instantaneous contact triggers.

---

## 2. DETAILED VIEWPORT BREAKPOINT MATRIX

| Parameter | Ultra-Wide (`1920px`) | Standard Desktop (`1440px`) | Laptop (`1280px`) | Tablet (`768px` - `1024px`) | Mobile Standard (`390px`) | Mobile Small (`360px`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Target** | 4K / 27"–32" Studio Displays | Standard Monitors, iMacs | MacBooks, 13"–15" Laptops | iPads, Surface Tablets | iPhone 12/13/14/15/16, Galaxy S | Compact Android Devices |
| **Max Content Width** | `1560px` | `1440px` | `1200px` | Full width with padding | Full width with padding | Full width with padding |
| **Horizontal Gutter** | `48px` to `64px` | `32px` to `48px` | `24px` to `32px` | `20px` to `24px` | `14px` (`px-3.5`) | `12px` (`px-3`) |
| **Vertical Section Spacing** | `96px` (`py-24`) | `80px` (`py-20`) | `64px` (`py-16`) | `56px` (`py-14`) | `40px` (`py-10`) | `32px` (`py-8`) |
| **Hero Architecture** | Balanced 2-Column (`1.05fr : 1fr`) | Balanced 2-Column (`1.05fr : 1fr`) | Balanced 2-Column (`1fr : 1fr`) | Stacked Editorial | **Strictly Stacked Zero-Overlap** | **Strictly Stacked Zero-Overlap** |
| **Hero Image Height** | `min-h-[560px] max-h-[640px]` | `min-h-[500px] max-h-[600px]` | `min-h-[460px] max-h-[540px]` | Auto aspect `16:10` | Fixed `260px` (`aspect-[16/11]`) | Fixed `220px` (`aspect-[16/11]`) |
| **Service Cards Grid** | 4 Columns | 4 Columns | 3 Columns | 2 Columns | **2 Columns** (`grid-cols-2`) | **2 Columns** (`grid-cols-2`) |
| **Fixed Contact Actions** | Floating Bottom-Right Dock | Floating Bottom-Right Dock | Floating Bottom-Right Dock | Floating Bottom-Right Dock | **Pinned Frosted Bottom Bar** | **Pinned Frosted Bottom Bar** |
| **Min Touch Target** | 44px × 44px | 44px × 44px | 44px × 44px | 48px × 48px | **48px × 48px** | **48px × 48px** |
| **Page Bottom Padding**| `0px` | `0px` | `0px` | `0px` | **84px - 96px** | **84px - 96px** |

---

## 3. SECTION-BY-SECTION RESPONSIVE ARCHITECTURE

### 3.1 Header & Global Navigation
* **Desktop (≥1024px):**
  * *Top Utility Bar:* Deep Royal Navy (`#102B46`), 36px height. Left: Factual coverage statement strictly grounded to broad territory (`"📍 Serving Across South India | Architectural Residential Safety"`). Right: Click-to-call `+91 83097 55398` and green WhatsApp Us badge. (Zero invented or unconfirmed city lists).
  * *Main Sticky Navbar:* Pristine white frosted background (`bg-white/96 backdrop-blur-md`), 72px height. Brand logo on left ("Invisible Safety.in" with subtitle "Safety. Style. Peace of Mind."), clean navigation links for the 7 Services, About Us, Our Work, and Contact, with prominent Deep Navy CTA button (`"Book a Free Visit →"`) on the right.
* **Mobile & Tablet (<1024px):**
  * Top utility bar condenses to `"📍 Serving Across South India"` on left and clickable phone `📞 +91 83097 55398` on right.
  * Main header is sticky, 56px height. Brand logo left, 44–48px hamburger icon right.
  * To avoid horizontal crowding on mobile screens, the header CTA button is hidden in favor of the persistent fixed bottom bar right at the user's thumb.

---

### 3.2 Hero Section Architecture (Phase 1.2 Corrections)

#### A. Desktop Resolution Fix (1920px, 1440px, 1280px)
* **Problem Addressed:** The initial desktop hero had an image occupying only part of the container with an excessively large blank white area on the right, pushing the headline below.
* **Architectural Fix:**
  * Adopted a balanced 2-column CSS Grid (`grid-template-columns: 1.05fr 1fr; align-items: center; min-height: 560px; gap: 48px; max-width: 1440px/1560px`).
  * Left column provides editorial breathing room for the H1 title ("Architectural Invisible Grills & Safety Nets" in Cinzel serif), factual lead text, 3 trust pills ("Fall Protection", "Clear Skyline Views", "Free Doorstep Survey"), and dual CTA buttons ("Book a Free Visit →" and "Explore 7 Services ▾").
  * Right column contains a full-height image frame (`border-radius: 24px; overflow: hidden; border: 1px solid #E5DDD1; box-shadow: 0 4px 20px -2px rgba(16,43,70,0.06)`). The invisible-grill installation photo fills 100% width and height (`object-fit: cover; object-position: center`), completely eliminating any white gaps while keeping the stainless steel cables crisp and unobstructed.

#### B. Mobile Resolution Fix (390px, 360px)
* **Problem Addressed:** The initial mobile hero image consumed almost the entire first screen, headline started too low and was partially clipped, and no fixed contact bar was clearly visible.
* **Architectural Fix:**
  * **Strictly Stacked Architecture (Zero Text Over Photo):**
    * **Top Photo Block (Order 1):** Dedicated container with `height: 260px` (or `220px` at 360px), `aspect-ratio: 16/11`, and `border-radius: 16px`. **Zero text, zero badges, and zero dark gradient overlays** cover the image. The balcony, view, and cables are 100% unobstructed.
    * **Elevated Conversion Card Directly Below (Order 2):** Positioned with a subtle `-16px` negative margin overlap (`background: #FAF8F3; border-radius: 24px; border: 1px solid #E5DDD1; padding: 20px 16px; box-shadow: 0 4px 20px -2px rgba(16,43,70,0.06)`).
    * Contains the complete H1 title sized via fluid clamp (`clamp(1.35rem, 5.5vw, 1.55rem)`) with `word-break: break-word`, guaranteeing zero clipping even on 360px viewports.
    * 3 compact trust badges ("Fall Protection", "Clear Skyline Views", "Free Doorstep Survey") wrap cleanly into 2 rows.
    * Side-by-side pill CTA buttons ("Book a Free Visit →" and "Explore 7 Services ▾") enforce 48px touch targets without horizontal overflow.

---

### 3.3 Seven Approved Services Showcase Grid
* **Desktop (≥1024px):** 4-column balanced grid with clean card labels and hover elevations.
* **Laptop (1280px):** 3-column balanced grid.
* **Mobile (<768px):**
  * **2-Column Compact Grid (`grid-cols-2 gap-2.5`):**
  * Eliminates endless vertical scrolling.
  * Each card features an unobstructed `aspect-[16/10]` photo on top and a compact label bar below with bold title and circular arrow link.
  * Customers scan all 7 approved services in seconds.

---

### 3.4 Persistent Fixed Contact Action System (Website-Wide Mandatory)

To maximize customer conversion across both desktop and mobile without obstructing page content, a persistent fixed contact system is mandated across the entire site:

#### A. Mobile Fixed Bottom Bar (<768px)
* **Position:** Fixed to the very bottom of the viewport (`position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999`).
* **Backdrop:** Pure frosted glass (`background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); border-top: 1px solid #E5DDD1; box-shadow: 0 -4px 20px -2px rgba(16,43,70,0.12)`).
* **Safe-Area Inset:** Complies with iOS home indicator via `padding-bottom: max(8px, env(safe-area-inset-bottom, 8px))`.
* **Actions (3 Equal Touch Targets, Min 48px Height):**
  1. **Call Now:** Deep Royal Navy pill (`#102B46`) with gold phone icon (`tel:+918309755398`).
  2. **WhatsApp:** Vibrant WhatsApp Green pill (`#25D366`) with chat icon (`https://wa.me/918309755398?...`).
  3. **Free Visit:** Deep Royal Navy pill (`#102B46`) with gold calendar icon (smoothly anchors to `#contact-booking`).
* **Page Padding Lock:** `body` and main page content enforces `padding-bottom: 84px` to `96px` so no text, buttons, or legal notices are ever obscured by the bottom bar.

#### B. Desktop Floating Contact Dock (≥768px)
* **Position:** Floating in the bottom-right corner (`position: fixed; bottom: 24px; right: 28px; z-index: 9999`).
* **Styling:** Frosted pill capsule (`background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); border: 1px solid rgba(229, 221, 209, 0.9); border-radius: 9999px; padding: 6px 10px; box-shadow: 0 8px 30px rgba(16, 43, 70, 0.18)`).
* **Actions (3 Compact Dock Pills, Min 44px Height):**
  1. **Free Visit & Survey:** Deep Royal Navy pill (`#102B46`) linking to `#contact-booking`.
  2. **WhatsApp:** WhatsApp Green pill (`#25D366`) linking to WhatsApp chat.
  3. **Call Now:** Deep Royal Navy pill (`#102B46`) linking to `tel:+918309755398`.

---

## 4. PREVENTING HORIZONTAL OVERFLOW & TOUCH TARGET RULES

1. **Global Overflow Lock:** `overflow-x: hidden; width: 100%; max-width: 100vw;` enforced on `<html>`, `<body>`, and `<main>` containers.
2. **Fluid Typography Safety:** Headings utilize CSS `clamp()` to guarantee text wraps cleanly without awkward character clipping on 360px screens:
   ```css
   .hero-title {
     font-size: clamp(1.35rem, 5.5vw, 1.55rem);
     line-height: 1.2;
     word-break: break-word;
     overflow-wrap: break-word;
   }
   ```
3. **Flex Shrink Safety:** Fixed bottom bar action pills enforce `flex: 1 1 0; min-width: 0;` so items can flex down cleanly on narrow devices without overflowing.
4. **Touch Target Standard:** All mobile interactive elements maintain a minimum bounding box of **48px × 48px** in accordance with WCAG 2.5.5 and Apple Human Interface Guidelines.

---

## 5. VERIFIED VIEWPORT EVIDENCE ARTIFACTS

All 5 required viewports have been rendered via Chrome DevTools Protocol device emulation and verified:

1. **Desktop 1920px:** [`hero_desktop_1920px.png`](file:///C:/Users/surya/.gemini/antigravity/brain/3169a49b-be10-4efb-8f08-efa174690bd4/hero_desktop_1920px.png) (1920 × 1080)
2. **Desktop 1440px:** [`hero_desktop_1440px.png`](file:///C:/Users/surya/.gemini/antigravity/brain/3169a49b-be10-4efb-8f08-efa174690bd4/hero_desktop_1440px.png) (1440 × 900)
3. **Laptop 1280px:** [`hero_laptop_1280px.png`](file:///C:/Users/surya/.gemini/antigravity/brain/3169a49b-be10-4efb-8f08-efa174690bd4/hero_laptop_1280px.png) (1280 × 800)
4. **Mobile Standard 390px:** [`hero_mobile_390px.png`](file:///C:/Users/surya/.gemini/antigravity/brain/3169a49b-be10-4efb-8f08-efa174690bd4/hero_mobile_390px.png) (390 × 844)
5. **Mobile Small 360px:** [`hero_mobile_360px.png`](file:///C:/Users/surya/.gemini/antigravity/brain/3169a49b-be10-4efb-8f08-efa174690bd4/hero_mobile_360px.png) (360 × 740)
