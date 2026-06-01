import { NavLink, Feature, Stat, Testimonial } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Product", href: "#features" },
  { label: "3D Preview", href: "#interactive" },
  { label: "Why Lumina", href: "#why" },
  { label: "Pricing", href: "#pricing" },
];

export const FEATURES: Feature[] = [
  {
    id: "brand-sync",
    icon: "◈",
    title: "Brand Sync Engine",
    description:
      "Feed Lumina your Figma tokens, design system, or brand guidelines once. Every output generated will match your visual DNA — automatically.",
    tag: "Intelligent",
  },
  {
    id: "component-forge",
    icon: "⬡",
    title: "Component Forge",
    description:
      "Describe a UI in plain language. Lumina generates accessible, production-ready React components with variants, states, and Storybook stories.",
    tag: "Generative",
  },
  {
    id: "motion-studio",
    icon: "◎",
    title: "Motion Studio",
    description:
      "Add life to interfaces. Lumina's animation layer generates scroll-based, gesture-driven, and orchestrated transitions — no keyframe math required.",
    tag: "Expressive",
  },
  {
    id: "collab-mode",
    icon: "⬟",
    title: "Async Collaboration",
    description:
      "Real-time cursors, threaded comments on live components, and version branching built for distributed design teams working across time zones.",
    tag: "Team-First",
  },
];

export const STATS: Stat[] = [
  { value: "12×", label: "Faster component iteration" },
  { value: "94%", label: "WCAG AA pass rate" },
  { value: "3.2M", label: "Components shipped" },
  { value: "800+", label: "Design teams globally" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Lumina cut our design-to-dev handoff time by 70%. The brand sync alone saved us weeks of QA cycles.",
    author: "Priya Nair",
    role: "Head of Design",
    company: "Cascade Systems",
  },
  {
    quote:
      "I was skeptical about AI in design. Lumina changed that. It actually understands our system, not just patterns.",
    author: "Marcus Webb",
    role: "Principal Engineer",
    company: "Orbit Labs",
  },
  {
    quote:
      "The Motion Studio is unlike anything I've used. Complex scroll animations in minutes, not days.",
    author: "Leila Fontaine",
    role: "Creative Director",
    company: "Studio Nord",
  },
];
