"use client";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function animateIn() {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );
    }
    animateIn();
  }, []);

  return (
    <header
      ref={navRef}
      role="banner"
      style={{ opacity: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(5,8,16,0.88)] backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <a href="#" aria-label="Lumina home" className="flex items-center gap-2 group">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform duration-200"
            style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-warm))" }}
          >
            L
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-[var(--color-text-primary)]">
            lumina
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 font-mono"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 font-mono">
            Sign in
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm font-mono font-medium rounded-lg text-white transition-all duration-200"
            style={{ background: "var(--color-accent)" }}
          >
            Get early access
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-white/[0.07] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#" className="px-4 py-2 text-sm font-mono font-medium rounded-lg text-white text-center" style={{ background: "var(--color-accent)" }}>
            Get early access
          </a>
        </div>
      )}
    </header>
  );
}
