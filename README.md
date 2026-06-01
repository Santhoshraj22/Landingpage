# Lumina — AI-Powered Design Intelligence Landing Page

A production-grade interactive landing page built as an advanced frontend assignment. Demonstrates GSAP scroll animations, Three.js 3D integration, Next.js App Router, TypeScript, SEO, and WCAG accessibility.

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **GSAP** (core + ScrollTrigger)
- **Three.js** (vanilla, dynamically imported)

---

## Project Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture

```
app/
├── components/
│   ├── ui/           # Shared UI (Navbar)
│   └── sections/     # Page sections (Hero, Features, 3D, Why, Pricing, Footer)
├── hooks/            # Custom React hooks (useGSAPEffect)
├── lib/              # Constants and data
├── types/            # TypeScript interfaces
├── globals.css       # Design tokens (CSS variables), Tailwind
├── layout.tsx        # Root layout with full SEO metadata
└── page.tsx          # Page composition — imports all sections
```

**Key architectural decisions:**
- Each section is a self-contained component managing its own animation lifecycle via `useEffect` + GSAP `Context` for proper cleanup
- Three.js and GSAP are **dynamically imported** (client-only) to avoid SSR hydration issues and keep the initial JS bundle small
- No single-file god components — UI, animation logic, and data are all separated
- Data lives in `lib/constants.ts`; types in `types/index.ts`

---

## GSAP Integration

GSAP is loaded lazily inside `useEffect` via dynamic import:

```ts
const { gsap } = await import("gsap");
const { ScrollTrigger } = await import("gsap/ScrollTrigger");
gsap.registerPlugin(ScrollTrigger);
```

**Animations used:**

| Section | Technique |
|---------|-----------|
| Navbar | `gsap.fromTo` entry timeline on mount |
| Hero | Multi-element stagger timeline; word-by-word reveal; scroll-direction-reactive `letterSpacing`; parallax grid background via `scrub` |
| Features | Scroll-triggered stagger for cards + stats |
| 3D Section | `ScrollTrigger` camera zoom (`scrub`); section fade-in driven by scroll position |
| Why | Alternating left/right reveals per step; testimonial stagger |
| Pricing | Scale + opacity entrance |
| Footer | Simple fade-in on scroll |

All GSAP contexts are cleaned up via `ctx.revert()` in the `useEffect` cleanup function.

---

## Three.js Integration

The `Interactive3DSection` creates a self-contained Three.js scene:

- **Scene**: `IcosahedronGeometry` mesh with a solid `MeshStandardMaterial` + wireframe overlay
- **Lighting**: Ambient + 3 point lights (blue, purple, teal) that animate their positions for dynamic reflections
- **Orbiting spheres**: 4 small spheres orbit the central mesh on independent planes and speeds
- **Particle field**: 200 randomly distributed points in a sphere, slowly rotating
- **Mouse interaction**: `mousemove` updates a target rotation; the mesh lerps toward it each frame (`0.05` damping)
- **Scroll integration**: GSAP `ScrollTrigger` drives camera `position.z` (zoom) as the user scrolls through the section; the mesh scales in with an elastic ease on first entry
- **Cleanup**: `renderer.dispose()`, geometry/material dispose, `cancelAnimationFrame`, and event listener removal all run in the `useEffect` cleanup

---

## SEO Decisions

- `layout.tsx` exports full `Metadata` (title, description, keywords, OG, Twitter card, robots)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<blockquote>`, `<cite>`
- Proper heading hierarchy: `h1` (Hero) → `h2` (section headings) → `h3` (card/step titles)
- All interactive elements have `aria-label` or descriptive text
- Canvas has `role="img"` with a descriptive `aria-label`
- Mobile nav `<button>` uses `aria-expanded`

---

## Accessibility (WCAG)

- Color contrast ratios meet AA for body text
- All images and decorative elements use `aria-hidden="true"`
- Focus-visible styles inherited from browser defaults (enhanced via Tailwind)
- Skip-to-content link can be added as a quick improvement

---

## Trade-offs & Decisions

| Decision | Rationale |
|----------|-----------|
| Vanilla Three.js over react-three-fiber | Fewer abstractions, easier cleanup, no extra bundle weight from `@react-three/fiber` |
| Dynamic import for GSAP + Three.js | Prevents SSR errors; defers heavy libraries until client hydration |
| GSAP `Context` API | Scoped cleanup — ensures ScrollTriggers don't leak between component unmounts |
| CSS variables for design tokens | Consistent theming without Tailwind config overrides everywhere; easy to extend |
| No animation library (Framer Motion) | GSAP already covers all needs; adding another animation system would be redundant |

---

## What I'd Improve With More Time

1. **react-three-fiber + drei** — for better React integration patterns and easier camera controls
2. **GSAP SplitText** — for per-character animations on the hero headline (requires GSAP Club)
3. **Prefers-reduced-motion** — media query check before running any GSAP animation
4. **E2E tests** — Playwright tests verifying scroll animations trigger correctly
5. **Skip-to-content link** — improves keyboard navigation significantly
6. **Image optimisation** — `next/image` for any raster assets
7. **i18n** — Next.js built-in internationalisation routing
8. **CMS integration** — replace `lib/constants.ts` with Sanity or Contentlayer

---

## Deployment

Recommended: **Vercel** (zero-config with Next.js)

```bash
npx vercel
```
