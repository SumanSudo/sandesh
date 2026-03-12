import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    particlesRef.current = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    setIsLoaded(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animId;
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const animate = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx + mousePosition.x * 0.15;
        p.y += p.vy + mousePosition.y * 0.15;
        if (p.x < 0 || p.x > 100) p.vx *= -1;
        if (p.y < 0 || p.y > 100) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(
          (p.x * canvas.width) / 100,
          (p.y * canvas.height) / 100,
          p.size,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [mousePosition]);

  const socials = [
    {
      name: "GitHub",
      icon: "fab fa-github",
      url: "https://github.com/SandeshPakhrin",
      glow: "rgba(99,102,241,0.5)",
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      url: "https://www.linkedin.com/notifications/?filter=all",
      glow: "rgba(59,130,246,0.5)",
    },
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      url: "https://wa.me/+9779845698929",
      glow: "rgba(34,197,94,0.5)",
    },
  ];

  // The exact bg color — used everywhere for perfect blending
  const BG = "#0c0e1a";

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      <canvas
        id="particle-canvas"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Single centered radial — NO sided purple shift */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 35%, rgba(55,48,163,0.16) 0%, rgba(30,27,75,0.1) 45%, transparent 70%)",
        }}
      />

      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 w-[800px] h-[380px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(79,70,229,0.11) 0%, transparent 65%)",
          transform: `translateX(-50%) translate(${mousePosition.x * 18}px, ${mousePosition.y * 8}px)`,
          transition: "transform 1s ease-out",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          transform: `translate(${mousePosition.x * 6}px, ${mousePosition.y * 6}px)`,
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* ── MAIN LAYOUT ── */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto py-20 gap-10 lg:gap-0">
        {/* ── LEFT: TEXT ── */}
        <div
          className="flex flex-col gap-5 w-full lg:w-[48%] text-center lg:text-left"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "none" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="h-px w-8 bg-indigo-500/60" />
            <span className="text-indigo-400/80 text-xs tracking-[0.25em] uppercase font-medium">
              Hello, I'm a
            </span>
          </div>

          <div className="text-4xl sm:text-5xl xl:text-[3.4rem] font-bold leading-[1.1]">
            <Typewriter
              options={{
                strings: [
                  "Backend Developer",
                  "Node.js Developer",
                  "API Architect",
                ],
                autoStart: true,
                loop: true,
                wrapperClassName:
                  "bg-gradient-to-r from-indigo-400 via-blue-300 to-violet-400 bg-clip-text text-transparent",
                cursorClassName: "text-indigo-400",
                delay: 55,
                deleteSpeed: 28,
              }}
            />
          </div>

          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
            <div className="h-[2px] w-5 rounded-full bg-indigo-500/30" />
          </div>

          <p className="text-gray-400 text-sm sm:text-[0.95rem] leading-relaxed max-w-md">
            Crafting scalable backend systems and clean APIs. I specialize in
            Node.js architecture with a focus on performance, reliability, and
            developer experience.
          </p>

          {/* Status pills */}
          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
            {[
              {
                dot: "#34d399",
                shadow: "rgba(52,211,153,0.6)",
                label: "Available for projects",
              },
              {
                dot: "#818cf8",
                shadow: "rgba(129,140,248,0.6)",
                label: "Open for freelance",
              },
            ].map(({ dot, shadow, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs text-gray-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: dot, boxShadow: `0 0 6px ${shadow}` }}
                />
                {label}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mt-2">
            <Link to="project" smooth offset={-70} duration={500}>
              <button
                className="group relative overflow-hidden px-8 py-3.5 rounded-xl font-semibold text-white text-sm min-w-[175px] transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
                  boxShadow:
                    "0 4px 20px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  View Projects
                  <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>

            <Link to="contact" smooth offset={-70} duration={500}>
              <button
                className="group relative overflow-hidden px-8 py-3.5 rounded-xl font-semibold text-gray-300 hover:text-white text-sm min-w-[175px] transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.65)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(79,70,229,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  Get In Touch
                  <i className="fas fa-envelope text-xs" />
                </span>
              </button>
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-3 justify-center lg:justify-start mt-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 text-sm transition-all duration-300 group-hover:text-white group-hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 16px ${s.glow}`;
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                  }}
                >
                  <i className={s.icon} />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: IMAGE ── bigger, perfectly blended ── */}
        <div className="hidden sm:flex items-end justify-center w-full lg:w-[52%]">
          <div className="relative group flex items-end justify-center">
            {/* 3D tilt wrapper */}
            <div className="relative z-10">
              <div className="">
                <img
                  src="/dada.png"
                  alt="Sandesh Pakhrin"
                  className="w-[500px] h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Hard directional fades — exact BG color for perfect seam */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `
                      linear-gradient(to top,  ${BG} 0%, rgba(12,14,26,0.7) 22%, transparent 44%),
                      linear-gradient(to right, ${BG} 0%, transparent 16%),
                      linear-gradient(to left,  ${BG} 0%, transparent 16%),
                      linear-gradient(to bottom,${BG} 0%, transparent 10%)
                    `,
                  }}
                />
              </div>

              {/* Online indicator */}
              <div
                className="absolute top-3 right-3 flex gap-1.5 z-30"
                style={{
                  transform: `translate(${mousePosition.x * -4}px, ${mousePosition.y * -4}px)`,
                  transition: "transform 0.4s ease-out",
                }}
              >
                <div
                  className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"
                  style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }}
                />
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse mt-0.5" />
              </div>

              {/* Hover tech badges */}
              <div
                className="absolute left-0 top-1/3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 z-30 pointer-events-none"
                style={{
                  transform: "translateX(calc(-100% - 8px))",
                  transition: "opacity 0.4s ease 0.1s",
                }}
              >
                {["React", "Node.js", "MongoDB"].map((t) => (
                  <div
                    key={t}
                    className="px-3 py-1 rounded-full text-xs text-indigo-200 whitespace-nowrap"
                    style={{
                      background: "rgba(79,70,229,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-600 animate-pulse">
          Scroll to explore
        </span>
        <div
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: "1px solid rgba(99,102,241,0.28)" }}
        >
          <div
            className="w-0.5 h-2 rounded-full animate-bounce"
            style={{
              background: "linear-gradient(to bottom, #818cf8, #3b82f6)",
            }}
          />
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  );
};

export default Landing;
