"use client";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";


export function useGSAPEffect(
  callback: (gsap: typeof import("gsap").gsap) => gsap.core.Timeline | void,
  deps: React.DependencyList = []
) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let tl: gsap.core.Timeline | void;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      tl = callback(gsap);
    }

    init();

    return () => {
      if (cleanupRef.current) cleanupRef.current();
      if (tl) tl.kill();
    };
 
  }, deps);
}


export function useScrollReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null!);
  const seenRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !seenRef.current) {
          seenRef.current = true;
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, seenRef.current];
}
