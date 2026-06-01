"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    async function initAnimations() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
       
        const tl = gsap.timeline({ delay: 0.5 });

        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
        )
          .fromTo(
            // Animate each word span individually
            headlineRef.current?.querySelectorAll(".word") ?? [],
            { opacity: 0, y: 60, rotateX: -15 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: "power4.out",
              stagger: 0.1,
            },
            "-=0.2"
          )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            ctaRef.current?.children ?? [],
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.12,
            },
            "-=0.3"
          )
          .fromTo(
            scrollIndicatorRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            "-=0.2"
          );

       
        gsap.to(gridRef.current, {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "80% top",
          onUpdate: (self) => {
            const direction = self.direction; // 1 = down, -1 = up
            gsap.to(headlineRef.current, {
              letterSpacing: direction === 1 ? "0.06em" : "0em",
              opacity: 1 - self.progress * 0.6,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });

       
        const scrollDot = scrollIndicatorRef.current?.querySelector(".scroll-dot") ?? null;
        gsap.to(scrollDot, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }, sectionRef);
    }

    initAnimations();

    return () => ctx?.revert();
  }, []);

  const words = ["AI-Powered", "Design", "Intelligence"];

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6"
    >
     
      <div
        ref={gridRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

    
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(224,107,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-mono mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
         
        </div>

        
        <h1
          ref={headlineRef}
          className="text-[clamp(2.8rem,8vw,6.5rem)] font-display font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{ perspective: "800px" }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`word inline-block mr-[0.25em] ${
                i === 2 ? "text-gradient" : "text-[var(--color-text-primary)]"
              }`}
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Sub-heading */}
        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Lumina learns your brand, accelerates your workflow, and ships
          pixel-perfect React components — without the iteration tax.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            className="px-8 py-3.5 rounded-xl font-mono font-medium text-white text-base transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), #6ba3ff)",
              boxShadow: "0 0 30px var(--color-accent-glow)",
            }}
          >
            Start building free
          </a>
          <a
            href="#interactive"
            className="px-8 py-3.5 rounded-xl font-mono font-medium text-[var(--color-text-secondary)] text-base border border-white/[0.1] hover:border-white/[0.2] hover:text-[var(--color-text-primary)] transition-all duration-300 flex items-center gap-2"
          >
            See it in 3D
            <span aria-hidden="true">→</span>
          </a>
        </div>

      
        <p className="mt-10 text-xs font-mono text-[var(--color-text-secondary)]/60 tracking-widest uppercase">
          Trusted by teams at{" "}
          {["Stripe", "Linear", "Vercel", "Figma", "Notion"].map((co, i, arr) => (
            <span key={co}>
              <span className="text-[var(--color-text-secondary)]">{co}</span>
              {i < arr.length - 1 && " · "}
            </span>
          ))}
        </p>
      </div>


      <div
        ref={scrollIndicatorRef}
        style={{ opacity: 0 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="scroll-dot w-1 h-1 rounded-full bg-[var(--color-accent)]" />
        </div>
        <span className="text-[10px] font-mono text-[var(--color-text-secondary)]/40 tracking-widest uppercase">
          scroll
        </span>
      </div>
    </section>
  );
}
