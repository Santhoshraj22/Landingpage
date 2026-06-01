"use client";
import { useEffect, useRef } from "react";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For individual designers exploring AI-powered workflows.",
    features: ["50 component generations/mo", "Brand Sync (1 brand)", "Community support", "Figma import"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Team",
    price: "$49",
    period: "/mo per seat",
    description: "For product teams who ship fast and care about consistency.",
    features: [
      "Unlimited generations",
      "Brand Sync (unlimited)",
      "Motion Studio access",
      "Priority support",
      "CI/CD hooks",
      "Async collaboration",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organisations with complex design systems and compliance needs.",
    features: [
      "Everything in Team",
      "SSO / SAML",
      "Audit logs",
      "Custom model fine-tuning",
      "Dedicated SLA",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    async function initAnimations() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current?.children ?? [],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        );

        gsap.fromTo(
          cardsRef.current?.querySelectorAll(".pricing-card") ?? [],
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
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
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-28 px-6 max-w-7xl mx-auto"
    >
      <div ref={headingRef} className="text-center max-w-xl mx-auto mb-16">
        <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-accent)] mb-3">
          — Pricing
        </p>
        <h2
          id="pricing-heading"
          className="text-[clamp(2rem,4vw,3rem)] font-display font-extrabold leading-tight text-[var(--color-text-primary)] mb-4"
        >
          Start free. Scale when you need to.
        </h2>
        <p className="text-[var(--color-text-secondary)] text-base">
          No surprise seats, no locked features. Pay for what you use.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
        role="list"
        aria-label="Pricing plans"
      >
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            role="listitem"
            className={`pricing-card relative rounded-2xl p-8 border flex flex-col ${
              plan.highlight
                ? "border-[var(--color-accent)]/50 bg-gradient-to-b from-[rgba(79,142,247,0.08)] to-[var(--color-surface)]"
                : "border-white/[0.07] bg-[var(--color-surface)]"
            }`}
            style={{ opacity: 0 }}
          >
            {plan.highlight && (
              <div
                aria-label="Most popular"
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-white tracking-wide"
                style={{ background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-warm))" }}
              >
                MOST POPULAR
              </div>
            )}

            <header className="mb-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
                {plan.name}
              </h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-display font-extrabold text-[var(--color-text-primary)]">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm font-mono text-[var(--color-text-secondary)] mb-1">
                    {plan.period}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {plan.description}
              </p>
            </header>

            <ul className="space-y-3 mb-8 flex-1" role="list">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-success)] flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className={`block text-center py-3 rounded-xl text-sm font-mono font-medium transition-all duration-200 ${
                plan.highlight
                  ? "text-white hover:opacity-90"
                  : "text-[var(--color-text-primary)] border border-white/[0.12] hover:border-white/[0.25]"
              }`}
              style={plan.highlight ? { background: "var(--color-accent)", boxShadow: "0 0 20px var(--color-accent-glow)" } : {}}
              aria-label={`${plan.cta} — ${plan.name} plan`}
            >
              {plan.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
