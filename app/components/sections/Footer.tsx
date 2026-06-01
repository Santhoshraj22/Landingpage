"use client";
import { useEffect, useRef } from "react";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Docs", "API Reference", "Status", "Community"],
  Legal: ["Privacy", "Terms", "Cookie policy", "Licenses"],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    async function initAnimations() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 95%" },
          }
        );
      }, footerRef);
    }

    initAnimations();
    return () => ctx?.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      aria-label="Site footer"
      className="border-t border-white/[0.07] pt-16 pb-8 px-6"
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" aria-label="Lumina home" className="flex items-center gap-2 mb-4 group">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-warm))" }}
              >
                L
              </span>
              <span className="font-display font-bold text-lg text-[var(--color-text-primary)]">
                lumina
              </span>
            </a>
            <p className="text-xs font-mono text-[var(--color-text-secondary)] leading-relaxed">
              AI-powered design intelligence for teams who ship.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]/60 mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
          <p className="text-xs font-mono text-[var(--color-text-secondary)]/50">
            © {new Date().getFullYear()} Lumina Inc. All rights reserved.
          </p>
          <p className="text-xs font-mono text-[var(--color-text-secondary)]/40">
            Built with Next.js · GSAP · Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
