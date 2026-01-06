// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import logo from '../assets/images/logo-portfolio.png';

export default function Landing() {
  const rootRef = useRef(null);
  const logoRef = useRef(null);

  // Mouse move effect for parallax
  function handleMouseMove(e) {
    const el = rootRef.current;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x / rect.width - 0.5;
    const dy = y / rect.height - 0.5;
    
    el.style.setProperty('--px', `${x}px`);
    el.style.setProperty('--py', `${y}px`);
    el.style.setProperty('--dx', `${dx}`);
    el.style.setProperty('--dy', `${dy}`);
  }

  // Logo animation on load
  useEffect(() => {
    const logoElement = logoRef.current;
    if (logoElement) {
      logoElement.style.opacity = '0';
      logoElement.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        logoElement.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        logoElement.style.opacity = '1';
        logoElement.style.transform = 'translateY(0)';
      }, 500);
    }
  }, []);

  return (
    <div ref={rootRef} onMouseMove={handleMouseMove} className="bg-[#0b0b0c] text-white min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 py-4 px-6 md:px-12 flex justify-between items-center">
        <div 
          ref={logoRef}
          className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-white/10 hover:border-[#e04b43] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(224,75,67,0.3)]"
        >
          <img 
            src={logo} 
            alt="Idriss Mrayah" 
            className="w-full h-full object-cover"
          />
        </div>
        
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-24">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(80%_60%_at_100%_0%,rgba(224,75,67,0.18)_0%,rgba(224,75,67,0)_60%)] animate-[vignetteFloat_12s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute inset-0" style={{background: "radial-gradient(circle at var(--px) var(--py), rgba(224,75,67,0.14), transparent 45%)"}} />
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "2px 2px", transform: "translate3d(calc(var(--dx,0)*6px), calc(var(--dy,0)*6px), 0)"}} />
        <div className="pointer-events-none absolute inset-0 opacity-15" style={{backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)", backgroundSize: "3px 3px", transform: "translate3d(calc(var(--dx,0)*12px), calc(var(--dy,0)*12px), 0)"}} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_22px] animate-[scanDrift_6s_linear_infinite]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:24px_24px]" />

        <div className="relative mx-auto max-w-[1200px] min-h-[calc(100vh-6rem)] px-6 py-12 flex items-center justify-center">
          <div className="group grid grid-cols-1 lg:grid-cols-[5fr_7fr] items-center gap-10 lg:gap-16">
            {/* Left: Logo and welcome */}
            <div className="select-none lg:justify-self-end [transform-style:preserve-3d] transition-transform will-change-transform group-hover:[transform:perspective(1000px)_rotateX(calc(var(--dy,0)*6deg))_rotateY(calc(var(--dx,0)*-6deg))]">
              <div className="mb-8 lg:mb-12 flex flex-col items-center lg:items-end">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-2 border-white/10 hover:border-[#e04b43] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(224,75,67,0.4)] mb-6">
                  <img 
                    src={logo} 
                    alt="Idriss Mrayah" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-[clamp(48px,10vw,96px)] leading-[0.9] font-extrabold tracking-tight text-[#e04b43] drop-shadow-[0_10px_30px_rgba(224,75,67,0.15)] animate-[wordmarkReveal_.8s_ease-out_both]">
                  HI!
                </h1>
                <p className="mt-2 text-lg text-white/70">I'm Idriss Mrayah</p>
                <div className="mt-4 h-px w-24 bg-[#e04b43]/50" />
              </div>
            </div>

            {/* Right: Introduction */}
            <div className="max-w-xl lg:max-w-none lg:pl-10 lg:justify-self-start">
              <p className="uppercase tracking-[0.3em] text-[11px] md:text-[12px] text-neutral-300/90 mb-2">
                Welcome to my digital space
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Full Stack Developer &<br />
                <span className="text-[#e04b43]">Creative Problem Solver</span>
              </h2>
              <p className="text-neutral-300/90 leading-relaxed mb-8 text-lg">
                I craft exceptional digital experiences with modern web technologies.
                Let's build something amazing together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/system" 
                  className="px-6 py-3 bg-[#e04b43] text-white rounded-md font-medium hover:bg-[#c53d36] transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(224,75,67,0.4)]"
                >
                  Explore My System
                </Link>
                <Link 
                  to="/contact" 
                  className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-md font-medium hover:bg-white/5 transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}