"use client";
import { useEffect, useRef } from "react";


export default function Interactive3DSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: import("three").WebGLRenderer;
    let animFrameId: number;
    let ctx: gsap.Context;

    async function initThree() {
      const THREE = await import("three");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!canvasRef.current) return;

    
      const scene = new THREE.Scene();
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.set(0, 0, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      canvasRef.current.appendChild(renderer.domElement);

    
      const geo = new THREE.IcosahedronGeometry(1.6, 1);

   
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x4f8ef7,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      scene.add(wireMesh);

   
      const solidMat = new THREE.MeshStandardMaterial({
        color: 0x0c1120,
        metalness: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.95,
      });
      const solidMesh = new THREE.Mesh(geo, solidMat);
      scene.add(solidMesh);

     
      type OrbitEntry = { mesh: InstanceType<typeof THREE.Mesh>; speed: number; radius: number; phase: number };
      const orbitData: OrbitEntry[] = [];
      const orbitColors = [0x4f8ef7, 0xe06bff, 0x64ffda, 0xffa64f];

      for (let i = 0; i < 4; i++) {
        const orbitGeo = new THREE.SphereGeometry(0.08, 12, 12);
        const orbitMat = new THREE.MeshBasicMaterial({
          color: orbitColors[i],
          transparent: true,
          opacity: 0.9,
        });
        const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
        scene.add(orbitMesh);
        orbitData.push({
          mesh: orbitMesh,
          speed: 0.4 + i * 0.15,
          radius: 2.2 + i * 0.35,
          phase: (Math.PI * 2 * i) / 4,
        });
      }

     
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 3 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x4f8ef7,
        size: 0.03,
        transparent: true,
        opacity: 0.6,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

     
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const frontLight = new THREE.PointLight(0x4f8ef7, 3, 10);
      frontLight.position.set(2, 2, 4);
      scene.add(frontLight);

      const rimLight = new THREE.PointLight(0xe06bff, 2, 10);
      rimLight.position.set(-3, -1, 2);
      scene.add(rimLight);

      const fillLight = new THREE.PointLight(0x64ffda, 1.5, 8);
      fillLight.position.set(0, -3, -2);
      scene.add(fillLight);

      
      const mouse = { x: 0, y: 0 };
      const targetRotation = { x: 0, y: 0 };

      const onMouseMove = (e: MouseEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove);

    
      ctx = gsap.context(() => {
        // Scale up and fade in as the section enters view
        gsap.fromTo(
          [solidMesh.scale, wireMesh.scale],
          { x: 0, y: 0, z: 0 },
          {
            x: 1, y: 1, z: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

      
        gsap.to(camera.position, {
          z: 3.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });

       
        gsap.fromTo(
          labelRef.current?.children ?? [],
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });

     
      const clock = new THREE.Clock();

      function animate() {
        animFrameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Smooth mouse rotation
        targetRotation.x += (mouse.y * 0.4 - targetRotation.x) * 0.05;
        targetRotation.y += (mouse.x * 0.4 - targetRotation.y) * 0.05;

        solidMesh.rotation.x = targetRotation.x + t * 0.06;
        solidMesh.rotation.y = targetRotation.y + t * 0.09;
        wireMesh.rotation.x = solidMesh.rotation.x;
        wireMesh.rotation.y = solidMesh.rotation.y;

        // Orbit the small spheres
        orbitData.forEach(({ mesh, speed, radius, phase }) => {
          mesh.position.x = Math.cos(t * speed + phase) * radius;
          mesh.position.y = Math.sin(t * speed * 0.7 + phase) * radius * 0.5;
          mesh.position.z = Math.sin(t * speed + phase) * radius * 0.3;
        });

        // Slowly rotate particles
        particles.rotation.y = t * 0.02;

        // Animate lights for dynamic reflections
        frontLight.position.x = Math.sin(t * 0.5) * 3;
        frontLight.position.y = Math.cos(t * 0.3) * 2;

        renderer.render(scene, camera);
      }
      animate();

      
      const onResize = () => {
        if (!canvasRef.current) return;
        const w = canvasRef.current.clientWidth;
        const h = canvasRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Cleanup
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animFrameId);
        renderer.dispose();
        geo.dispose();
        wireMat.dispose();
        solidMat.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
          canvasRef.current.removeChild(renderer.domElement);
        }
        ctx?.revert();
      };
    }

    const cleanup = initThree();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="interactive"
      aria-labelledby="interactive-heading"
      className="relative py-28 overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 60% 50%, rgba(79,142,247,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div ref={labelRef}>
          <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-accent)] mb-3">
            — 3D Preview
          </p>
          <h2
            id="interactive-heading"
            className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-tight text-[var(--color-text-primary)] mb-6"
          >
            Design that exists{" "}
            <span className="text-gradient">in every dimension.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-8">
            Lumina's rendering engine previews components in spatial context — not
            just flat mockups. Move your mouse over the orb to interact. Scroll to
            see it respond.
          </p>

          <ul className="space-y-3" role="list">
            {[
              "Mouse-reactive realtime rendering",
              "Scroll-driven camera animations via GSAP",
              "Three.js custom lighting & materials",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-mono text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-success)] mt-0.5" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Canvas side */}
        <div
          ref={canvasRef}
          aria-label="Interactive 3D design preview — move your mouse to rotate"
          role="img"
          className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/[0.07] bg-[var(--color-surface)] cursor-crosshair"
          style={{ background: "radial-gradient(circle at 50% 50%, #0d1628 0%, var(--color-bg) 100%)" }}
        />
      </div>
    </section>
  );
}
