Lumina — AI-Powered Design Intelligence Landing Page

A production-grade interactive landing page built as an advanced frontend assignment. Demonstrates GSAP scroll animations, Three.js 3D integration, Next.js App Router, TypeScript, SEO, and WCAG accessibility.



Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- GSAP (core + ScrollTrigger)
- Three.js (vanilla, dynamically imported)


 Project Setup

 Install dependencies
 npm install

 Development server
 npm run dev

 Production build
 npm run build
 npm start


Open [http://localhost:3000](http://localhost:3000).

 Architecture


app/
├── components/
│   ├── ui/            Shared UI (Navbar)
│   └── sections/      Page sections (Hero, Features, 3D, Why, Pricing, Footer)
├── hooks/             Custom React hooks (useGSAPEffect)
├── lib/               Constants and data
├── types/             TypeScript interfaces
├── globals.css        Design tokens (CSS variables), Tailwind
├── layout.tsx         Root layout with full SEO metadata
└── page.tsx           Page composition — imports all sections


Key architectural decisions:
- Each section is a self-contained component managing its own animation lifecycle via `useEffect` + GSAP `Context` for proper cleanup
- Three.js and GSAP are dynamically imported (client-only) to avoid SSR hydration issues and keep the initial JS bundle small
- No single-file god components — UI, animation logic, and data are all separated
- Data lives in `lib/constants.ts`; types in `types/index.ts`


 GSAP Integration

 GSAP is loaded lazily inside `useEffect` via dynamic import

 Three.js Integration

 The `Interactive3DSection` creates a self-contained Three.js scene

 SEO Decisions

 `layout.tsx` exports full `Metadata` (title, description, keywords, OG, Twitter card, robots)
 Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<blockquote>`, `<cite>`
 Proper heading hierarchy: `h1` (Hero) → `h2` (section headings) → `h3` (card/step titles)
 All interactive elements have `aria-label` or descriptive text
 Canvas has `role="img"` with a descriptive `aria-label`
 Mobile nav `<button>` uses `aria-expanded`

