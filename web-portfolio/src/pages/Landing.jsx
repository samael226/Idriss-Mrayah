import { Link } from 'react-router-dom'
import { useRef } from 'react'

export default function Landing() {
  const rootRef = useRef(null)

  function handleMouseMove(e) {
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = x / rect.width - 0.5
    const dy = y / rect.height - 0.5
    el.style.setProperty('--px', `${x}px`)
    el.style.setProperty('--py', `${y}px`)
    el.style.setProperty('--dx', `${dx}`)
    el.style.setProperty('--dy', `${dy}`)
  }

  return (
    <div ref={rootRef} onMouseMove={handleMouseMove} className="relative min-h-screen bg-[#0b0b0c] text-white overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(80%_60%_at_100%_0%,rgba(224,75,67,0.18)_0%,rgba(224,75,67,0)_60%)] animate-[vignetteFloat_12s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute inset-0" style={{background: "radial-gradient(circle at var(--px) var(--py), rgba(224,75,67,0.14), transparent 45%)"}} />
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "2px 2px", transform: "translate3d(calc(var(--dx,0)*6px), calc(var(--dy,0)*6px), 0)"}} />
      <div className="pointer-events-none absolute inset-0 opacity-15" style={{backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)", backgroundSize: "3px 3px", transform: "translate3d(calc(var(--dx,0)*12px), calc(var(--dy,0)*12px), 0)"}} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_22px] animate-[scanDrift_6s_linear_infinite]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-[1200px] min-h-[100svh] px-6 py-12 flex items-center justify-center">
        <div className="group grid grid-cols-1 lg:grid-cols-[5fr_7fr] items-center gap-10 lg:gap-16">
          {/* Left: giant wordmark */}
          <div className="select-none lg:justify-self-end [transform-style:preserve-3d] transition-transform will-change-transform group-hover:[transform:perspective(1000px)_rotateX(calc(var(--dy,0)*6deg))_rotateY(calc(var(--dx,0)*-6deg))]">
            <h1 className="text-[clamp(96px,16vw,260px)] leading-[0.78] font-extrabold tracking-tight text-[#e04b43] drop-shadow-[0_10px_30px_rgba(224,75,67,0.15)] animate-[wordmarkReveal_.8s_ease-out_both] transition-transform duration-500 group-hover:-rotate-1">
              HI!
            </h1>
            <div className="mt-4 h-px w-24 bg-[#e04b43]/50" />
          </div>

          {/* Right: copy block */}
          <div className="max-w-xl lg:max-w-none lg:pl-10 lg:justify-self-start">
            <p className="uppercase tracking-[0.3em] text-[11px] md:text-[12px] text-neutral-300/90">
              Welcome to my personal website,
            </p>
            <p className="mt-6 text-neutral-300/90 leading-relaxed max-w-prose">
              I have created this website to feel like a game/sci‑fi interface. All text inside tries to reflect this.
            </p>
            <p className="mt-4 text-neutral-300/90 leading-relaxed max-w-prose">
              You will find “achievements” or “quests” that show the progress in my professional life and are related to what I am working on.
            </p>

            <div className="mt-10">
              <Link
                to="/system"
                className="group relative inline-flex items-center gap-2 rounded-sm border border-[#e04b43]/80 px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase text-[#e04b43] transition-all hover:bg-[#e04b43]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e04b43]"
              >
                <span className="absolute -inset-px rounded-sm opacity-0 transition group-hover:opacity-100 group-hover:animate-[glowPulse_2.6s_ease-in-out_infinite] [box-shadow:0_0_0_1px_rgba(224,75,67,0.6),0_0_12px_2px_rgba(224,75,67,0.25)_inset]" />
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" fill="currentColor" aria-hidden>
                  <path d="M13 5l7 7-7 7M5 12h14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                Enter the Systeme
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative corner frame */}
        <div className="pointer-events-none absolute left-0 top-0 h-14 w-14 border-l border-t border-[#e04b43]/20" />
        <div className="pointer-events-none absolute right-0 top-0 h-14 w-14 border-r border-t border-[#e04b43]/20" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-14 w-14 border-l border-b border-[#e04b43]/20" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-14 w-14 border-r border-b border-[#e04b43]/20" />
      </div>
    </div>
  )
}
