"use client";
import { useEffect, useRef } from "react";
import { FEATURES, STATS } from "@/lib/constants";

function FeatureCard({
  icon,
  title,
  description,
  tag,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  tag: string;
  index: number;
}) {
  return (
    <article
      className="feature-card group relative rounded-2xl p-6 border border-white/[0.07] bg-[var(--color-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/30"
      style={{ opacity: 0, transform: "translateY(40px)" }}
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(79,142,247,0.06) 0%, transparent 70%)",
        }}
      />

      <header className="flex items-start justify-between mb-4">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: "rgba(79,142,247,0.12)", color: "var(--color-accent)" }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-accent-warm)] border border-[var(--color-accent-warm)]/30 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      </header>

      <h3 className="text-base font-display font-semibold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>

      {/* Corner number */}
      <span
        className="absolute bottom-4 right-5 text-4xl font-display font-extrabold text-white/[0.04] select-none"
        aria-hidden="true"
      >
        0{index + 1}
      </span>
    </article>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-item text-center" style={{ opacity: 0, transform: "translateY(30px)" }}>
      <p className="text-[clamp(2.5rem,5vw,4rem)] font-display font-extrabold text-gradient leading-none mb-1">
        {value}
      </p>
      <p className="text-sm font-mono text-[var(--color-text-secondary)]">{label}</p>
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    async function initAnimations() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── Heading reveal ─────────────────────────────────────────────────
        gsap.fromTo(
          headingRef.current?.children ?? [],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );

        // ── Feature cards: staggered reveal on scroll ──────────────────────
        gsap.to(".feature-card", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".feature-card",
            start: "top 82%",
          },
        });

        // ── Stats counter-like pop ─────────────────────────────────────────
        gsap.to(".stat-item", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.3)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stat-item",
            start: "top 88%",
          },
        });
      }, sectionRef);
    }

    initAnimations();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby="features-heading"
      className="py-28 px-6 max-w-7xl mx-auto"
    >
      {/* Section label + heading */}
      <div ref={headingRef} className="max-w-2xl mb-16">
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-accent)] mb-3">
          — Product
        </p>
        <h2
          id="features-heading"
          className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-tight text-[var(--color-text-primary)] mb-4"
        >
          Everything your design team{" "}
          <span className="text-gradient">actually needs.</span>
        </h2>
        <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
          Not a Figma plugin. Not a component library. A full design intelligence
          layer that sits between your brand and your code.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24" role="list">
        {FEATURES.map((feature, i) => (
          <div key={feature.id} role="listitem">
            <FeatureCard {...feature} index={i} />
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="border border-white/[0.07] rounded-2xl bg-[var(--color-surface)] p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
