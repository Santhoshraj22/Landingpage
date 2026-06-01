"use client";
import { useEffect, useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Connect your brand",
    body: "Import your Figma tokens, design system docs, or paste your brand URL. Lumina builds a living model of your visual DNA.",
  },
  {
    number: "02",
    title: "Describe what you need",
    body: "Use plain English. 'A pricing table with three tiers and a highlighted recommended plan' — done in seconds.",
  },
  {
    number: "03",
    title: "Review & iterate",
    body: "Every output is editable, has variants, and comes with accessibility audit baked in. Iterate in the browser, ship to code.",
  },
  {
    number: "04",
    title: "Ship to production",
    body: "Export React, Tailwind, or raw CSS. CI hooks ensure your brand stays consistent across every future deployment.",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    async function initAnimations() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
      
        const steps = stepsRef.current?.querySelectorAll(".workflow-step") ?? [];
        steps.forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 82%",
              },
            }
          );
        });

      
        gsap.fromTo(
          testimonialsRef.current?.querySelectorAll(".testimonial-card") ?? [],
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: "top 80%",
            },
          }
        );

       
        gsap.fromTo(
          ".progress-line",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 75%",
            },
          }
        );
      }, sectionRef);
    }

    initAnimations();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      aria-labelledby="why-heading"
      className="py-28 px-6 max-w-7xl mx-auto"
    >
      {/* Section header */}
      <div className="max-w-2xl mb-20">
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-accent)] mb-3">
          — Why Lumina
        </p>
        <h2
          id="why-heading"
          className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-tight text-[var(--color-text-primary)] mb-4"
        >
          From brief to{" "}
          <span className="text-gradient">production-ready</span> — in one session.
        </h2>
        <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
          The average design-to-code cycle takes 11 days. Lumina collapses it to
          under an afternoon.
        </p>
      </div>

      {/* Workflow steps */}
      <div ref={stepsRef} className="mb-24">
        {/* Progress line (desktop) */}
        <div className="hidden md:block relative mb-12">
          <div className="h-px w-full bg-white/[0.06]" />
          <div
            className="progress-line absolute top-0 left-0 h-px bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-warm)]"
            style={{ width: "100%" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORKFLOW_STEPS.map((step, i) => (
            <article
              key={step.number}
              className="workflow-step relative border border-white/[0.07] rounded-2xl p-8 bg-[var(--color-surface)] hover:border-[var(--color-accent)]/25 transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              <span
                className="text-[4rem] font-display font-extrabold leading-none mb-4 block"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-warm))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="text-lg font-display font-semibold text-[var(--color-text-primary)] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-text-secondary)]/50 mb-8 text-center">
          What real teams say
        </p>
        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          role="list"
          aria-label="Customer testimonials"
        >
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.author}
              className="testimonial-card border border-white/[0.07] rounded-2xl p-6 bg-[var(--color-surface)] flex flex-col"
              role="listitem"
              style={{ opacity: 0 }}
            >
              <p className="text-[var(--color-text-primary)] text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-warm))" }}
                  aria-hidden="true"
                >
                  {t.author[0]}
                </div>
                <div>
                  <cite className="text-xs font-semibold font-display text-[var(--color-text-primary)] not-italic block">
                    {t.author}
                  </cite>
                  <span className="text-[10px] font-mono text-[var(--color-text-secondary)]">
                    {t.role}, {t.company}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
