# PHASE 1 — MOTION AND INTERACTION GUIDELINES

**Project:** Invisible Safety  
**Official Domain:** https://invisiblesafety.in/  
**Role:** Creative Interaction Director & Frontend Motion Engineer  
**Status:** Approved Architectural Specification (Non-breaking, No Production Overwrites)

---

## 1. MOTION PHILOSOPHY: RESTRAINED ARCHITECTURAL PRECISION

Invisible Safety's interaction language is defined by **Restrained Architectural Precision**. Motion is employed exclusively to enhance spatial understanding, communicate physical material quality, and provide tactile confirmation of user intent.

### Uncompromising Rules:
* **Zero Scroll-Jacking:** Natural native scrolling rhythm is preserved at all times.
* **No Text Staggering or Character Spinning:** Headings and body copy render immediately to avoid delaying readability or hurting Core Web Vitals (LCP/CLS).
* **Spring-Like Deceleration:** All motion follows luxury physical spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 2. TIMING AND EASING TOKENS

| Motion Token | Duration | Cubic-Bezier Formula | Application |
| :--- | :--- | :--- | :--- |
| `--ease-luxury` | `350ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Card hover elevation, drawer slide-in, modal sheet |
| `--ease-quick` | `180ms` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Button active press, icon rotate, toggle pill |
| `--ease-fade` | `250ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Header backdrop blur, dropdown menu opacity |
| `--ease-3d-orbit` | Smooth | `dampingFactor = 0.05` | Three.js orbital camera deceleration |

---

## 3. COMPONENT INTERACTION SPECIFICATIONS

### 3.1 Header Sticky Transition
* **Trigger:** Window scroll $Y > 20\text{px}$.
* **Behavior:**
  * Background transitions from `rgba(255, 255, 255, 0.85)` to `rgba(255, 255, 255, 0.96)`.
  * Backdrop filter engages: `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`.
  * Bottom stone border fades in: `border-bottom: 1px solid rgba(229, 221, 209, 0.8);`.
  * Transition duration: `200ms ease`.

### 3.2 7-Service Card Hover Physics
* **Trigger:** Desktop cursor hover (`:hover`).
* **Behavior:**
  * Vertical elevation: `transform: translateY(-4px);`.
  * Shadow expansion: `box-shadow: 0 12px 32px -4px rgba(16, 43, 70, 0.12);`.
  * Border color shifts subtly from Stone (`#E5DDD1`) to Soft Gold (`#C6A66B`).
  * Image scale: `transform: scale(1.03);` within `overflow: hidden` container over `500ms ease`.
  * Arrow circle transitions to Deep Navy with white icon.

### 3.3 Three.js 3D Balcony Visualizer
* **Purpose:** Allows apartment owners to realistically preview SS316 cable pitch (50mm vs 75mm) against high-rise daylight.
* **Camera Controls:**
  * OrbitControls with damped inertia (`enableDamping: true`, `dampingFactor: 0.05`).
  * Horizontal orbit angle clamped to $\pm 35^\circ$ to prevent disorienting camera flips.
  * Vertical rotation locked to human eye level ($+5^\circ / -10^\circ$).
* **Cable Pitch Toggle:**
  * When switching between 50mm and 75mm spacing, cable opacities interpolate smoothly over `300ms` rather than jumping abruptly.

### 3.4 Before / After Comparison Slider
* **Interaction:** Horizontal drag handle with tactile divider bar.
* **Touch Optimization:** Direct pointer tracking with active drag indicator. Clip path updates synchronously at 60fps with zero layout thrashing.

### 3.5 Universal Floating Quick-Action Dock
* **Resting State:** Pinned bottom bar (mobile) or floating bottom-right pill dock (desktop) with `z-index: 9999`.
* **Hover Interaction:** Buttons translate `2px` upward with a soft glow shadow.
* **Active Press:** `transform: scale(0.97);` to give immediate tactile feedback upon touch.

---

## 4. AUDIT OF STATIC VS. ANIMATED ELEMENTS

| Website Element | Motion State | Architectural Justification |
| :--- | :--- | :--- |
| **All H1, H2, H3 Headings** | **Strictly Static** | Preserves immediate readability, eliminates LCP rendering delays, prevents visual fatigue. |
| **Body Text & Paragraphs** | **Strictly Static** | High readability is non-negotiable for engineering and safety specifications. |
| **Metallurgy Comparison Table**| **Strictly Static** | Technical data must remain stationary for accurate side-by-side evaluation. |
| **Architectural Photography** | **Subtle Hover Scale** | Sharp, unblurred images at rest; subtle `1.03x` zoom on hover indicates clickability. |
| **Service Cards** | **Tactile Elevation** | `-4px` vertical float signals interactive service exploration. |
| **Mobile Drawer Menu** | **Smooth Slide-In** | Slides in from right (`translateX(0)` from `100%`) over `280ms`. |
| **3D Balcony Canvas** | **Interactive Inertia**| Damped rotation gives realistic architectural perspective. |

---

## 5. ACCESSIBILITY & REDUCED MOTION SPECIFICATION

In compliance with **WCAG 2.2 Criterion 2.3.3 (Animation from Interactions)**, when the operating system requests reduced motion (`prefers-reduced-motion: reduce`), all animations are gracefully neutralized.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .service-card:hover {
    transform: none !important;
  }
  
  .card-photo {
    transform: none !important;
  }
  
  .cta-pill-btn:hover {
    transform: none !important;
  }
}
```
