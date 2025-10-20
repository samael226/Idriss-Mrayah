import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import DemoVideo from '../assets/videos/momsuca_holographic_FOG_City_space_intricate_meander_Patterns_743c9ca8-0687-493f-9d51-13799ae5bc96_0.mp4'

export default function System() {
  const videoRef = useRef(null)
  const [openHire, setOpenHire] = useState(false)
  const formRef = useRef(null)
  const firstFieldRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      const p = v.play()
      if (p && typeof p.then === 'function') {
        p.catch(() => {})
      }
    }
  }, [])

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenHire(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Focus trap when panel is open
  useEffect(() => {
    if (!openHire) return
    const panel = formRef.current?.closest('aside')
    const focusables = panel?.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')
    const first = focusables?.[0]
    const last = focusables?.[focusables.length - 1]
    firstFieldRef.current?.focus()
    const handler = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    panel?.addEventListener('keydown', handler)
    return () => panel?.removeEventListener('keydown', handler)
  }, [openHire])

  function validate() {
    const next = {}
    if (!name.trim()) next.name = 'Required'
    if (!email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Invalid email'
    if (!message.trim()) next.message = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function submitForm() {
    if (!validate()) return
    setSubmitting(true)
    try {
      const FORMSPREE_ID = '' // optional: paste your Formspree form ID
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, message })
        })
        if (!res.ok) throw new Error('Submit failed')
      } else {
        // Local fallback: simulate success
        await new Promise(r => setTimeout(r, 600))
      }
      setSent(true)
      setTimeout(() => { setOpenHire(false); setSent(false); setName(''); setEmail(''); setMessage('') }, 900)
    } catch {
      setErrors(prev => ({ ...prev, submit: 'Failed to send. Try again.' }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0b0b0c] text-white overflow-hidden">

      {/* Top status bar */}
      <div className="relative border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="mx-auto max-w-[1300px] px-6 py-3 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-neutral-300">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-white">⟵ Home</Link>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline">Server Time: 00:42</span>
            <span className="hidden sm:inline">Local Time: 13:42</span>
          </div>

      {/* Slide-in Hire Form (legacy placement hidden) */}
      <div
        className={`hidden fixed inset-0 z-40 transition-colors duration-500 ${openHire ? 'pointer-events-auto bg-black/70' : 'pointer-events-none bg-transparent'}`}
        onClick={() => setOpenHire(false)}
      />
      <aside
        aria-hidden={!openHire}
        aria-label="Open for Hire Form"
        className={`hidden fixed left-0 top-0 z-50 h-full w-[320px] sm:w-[420px] translate-x-[-110%] ${openHire ? 'translate-x-0' : ''} transition-transform duration-500 bg-black/90 border-r border-white/10 backdrop-blur px-5 py-6 text-neutral-200 [box-shadow:0_0_0_1px_rgba(224,75,67,.35)_inset] animate-[glowPulse_3s_ease-in-out_infinite]`}
      > 
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-200">Open for Hire</div>
          <button type="button" onClick={()=>setOpenHire(false)} className="rounded-sm border border-white/15 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Close</button>
        </div>
        <div className="mt-1 text-[11px] text-neutral-400">I would love to hear about your projects!</div>

        <form ref={formRef} className="mt-6 space-y-4" onSubmit={(e)=>{e.preventDefault(); if (!submitting) submitForm()}}>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">How should I call you?</span>
            <input ref={firstFieldRef} value={name} onChange={e=>setName(e.target.value)} className={`mt-2 w-full rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.name ? 'border-[#e04b43]/60' : 'border-white/10'}`} placeholder="Your name" />
            {errors.name && <span className="mt-1 block text-[11px] text-[#e04b43]">{errors.name}</span>}
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Sending from</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className={`mt-2 w-full rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.email ? 'border-[#e04b43]/60' : 'border-white/10'}`} placeholder="your.name@email.com" />
            {errors.email && <span className="mt-1 block text-[11px] text-[#e04b43]">{errors.email}</span>}
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Transmitted data</span>
            <textarea
              rows={5}
              value={message}
              onChange={e=>setMessage(e.target.value)}
              onKeyDown={(e)=>{
                if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); if (!submitting) submitForm() }
              }}
              className={`mt-2 w-full resize-none rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.message ? 'border-[#e04b43]/60' : 'border-white/10'}`}
              placeholder="Hi, I write to you about..."
            />
            {errors.message && <span className="mt-1 block text-[11px] text-[#e04b43]">{errors.message}</span>}
          </label>

          <div className="mt-3 flex gap-3">
            <button type="submit" disabled={submitting} className="rounded-sm border border-[#e04b43]/70 bg-[#e04b43]/20 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-[#e04b43] hover:bg-[#e04b43]/30 disabled:opacity-60">{submitting ? 'Sending…' : sent ? 'Sent!' : 'Send Message [Enter]'}</button>
            <button type="button" onClick={()=>setOpenHire(false)} className="rounded-sm border border-white/15 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Discard [Esc]</button>
          </div>
          {errors.submit && <div className="mt-2 text-[11px] text-[#e04b43]">{errors.submit}</div>}
        </form>

        <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
      </aside>
          <div className="text-neutral-400">System Console</div>
        </div>
      </div>

      {/* Slide-in Hire Form (relocated under page container) */}
      <div
        className={`fixed inset-0 z-40 transition-colors duration-500 ${openHire ? 'pointer-events-auto bg-black/70' : 'pointer-events-none bg-transparent'}`}
        onClick={() => setOpenHire(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!openHire}
        aria-label="Open for Hire Form"
        className={`fixed left-0 top-0 z-50 h-full w-[320px] sm:w-[420px] translate-x-[-110%] ${openHire ? 'translate-x-0' : ''} transition-transform duration-500 bg-black/90 border-r border-white/10 backdrop-blur px-5 py-6 text-neutral-200 [box-shadow:0_0_0_1px_rgba(224,75,67,.35)_inset] animate-[glowPulse_3s_ease-in-out_infinite]`}
      > 
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-200">Open for Hire</div>
          <button type="button" onClick={()=>setOpenHire(false)} className="rounded-sm border border-white/15 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Close</button>
        </div>
        <div className="mt-1 text-[11px] text-neutral-400">I would love to hear about your projects!</div>

        <form ref={formRef} className="mt-6 space-y-4" onSubmit={(e)=>{e.preventDefault(); if (!submitting) submitForm()}}>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">How should I call you?</span>
            <input ref={firstFieldRef} value={name} onChange={e=>setName(e.target.value)} className={`mt-2 w-full rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.name ? 'border-[#e04b43]/60' : 'border-white/10'}`} placeholder="Your name" />
            {errors.name && <span className="mt-1 block text-[11px] text-[#e04b43]">{errors.name}</span>}
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Sending from</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className={`mt-2 w-full rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.email ? 'border-[#e04b43]/60' : 'border-white/10'}`} placeholder="your.name@email.com" />
            {errors.email && <span className="mt-1 block text-[11px] text-[#e04b43]">{errors.email}</span>}
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Transmitted data</span>
            <textarea
              rows={5}
              value={message}
              onChange={e=>setMessage(e.target.value)}
              onKeyDown={(e)=>{
                if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); if (!submitting) submitForm() }
              }}
              className={`mt-2 w-full resize-none rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.message ? 'border-[#e04b43]/60' : 'border-white/10'}`}
              placeholder="Hi, I write to you about..."
            />
            {errors.message && <span className="mt-1 block text-[11px] text-[#e04b43]">{errors.message}</span>}
          </label>

          <div className="mt-3 flex gap-3">
            <button type="submit" disabled={submitting} className="rounded-sm border border-[#e04b43]/70 bg-[#e04b43]/20 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-[#e04b43] hover:bg-[#e04b43]/30 disabled:opacity-60">{submitting ? 'Sending…' : sent ? 'Sent!' : 'Send Message [Enter]'}</button>
            <button type="button" onClick={()=>setOpenHire(false)} className="rounded-sm border border-white/15 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Discard [Esc]</button>
          </div>
          {errors.submit && <div className="mt-2 text-[11px] text-[#e04b43]">{errors.submit}</div>}
        </form>

        <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
      </aside>

      {/* Main three-column layout */}
      <div className={`relative mx-auto max-w-[1300px] px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_300px] gap-6 transition-transform duration-500 ${openHire ? 'lg:translate-x-[340px] lg:[transform:perspective(1400px)_rotateY(-5deg)]' : ''}`}>
        {/* Left sidebar: profile card */}
        <aside className="space-y-4">
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div className="aspect-square w-full overflow-hidden rounded">
              <div className="h-full w-full bg-white/10" />
            </div>
            <div className="mt-4">
              <div className="text-sm uppercase tracking-[0.25em] text-neutral-400">Name</div>
              <div className="mt-1 text-lg font-semibold">Idriss Mrayah</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center">Web Dev</span>
              <button type="button" onClick={()=>setOpenHire(true)} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center hover:bg-white/10 cursor-pointer">Open for Hire</button>
            </div>
            <div className="mt-4">
              <button onClick={() => setOpenHire(true)} className="w-full rounded-sm border border-[#e04b43]/60 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-[#e04b43] transition-all hover:bg-[#e04b43]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e04b43]">
                Open Connection
              </button>
            </div>
          </div>

          <div className="rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">Stats</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between"><span>Level</span><span className="text-[#a7ff4a]">48</span></div>
              <div className="flex items-center justify-between"><span>Coins</span><span className="text-[#ffcc66]">1,425</span></div>
            </div>
          </div>
        </aside>

        {/* Center panel over video */}
        <main className="relative rounded-md border border-white/15 bg-black/20 backdrop-blur-sm">
          {/* inner stroke sweep */}
          <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/10 [mask:linear-gradient(#000,transparent_95%)]" />
          <span className="pointer-events-none absolute -inset-px rounded-md opacity-0 md:opacity-100 [background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)] animate-[scanSweep_3s_linear_infinite]" />
          <div className="border-b border-white/10 px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-300">
            Swimming through a vast network of interconnected devices and servers...
          </div>
          <div className="p-4 md:p-5">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded ring-1 ring-white/10">
              <video
                ref={videoRef}
                src={DemoVideo}
                className="absolute inset-0 h-full w-full object-cover [object-position:center_85%] animate-[bgDrift_18s_ease-in-out_infinite]"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              {/* Removed dark overlay so the bottom remains visible */}
            </div>
          </div>
          {/* bottom tabs */}
          <div className="border-t border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em]">
            <div className="grid grid-cols-5 gap-2">
              <button className="rounded border border-[#e04b43]/60 bg-[#e04b43]/15 px-2 py-1 text-[#e04b43] transition-colors hover:bg-[#e04b43]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e04b43]">Beginning</button>
              <button className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50">Logs</button>
              <button className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50">Achievements</button>
              <button className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50">Creations</button>
              <button className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50">Games</button>
            </div>
          </div>
        </main>

        {/* Right sidebar: active quest & settings */}
        <aside className="space-y-4">
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">Active Quest</div>
            <div className="mt-2 text-sm font-semibold">React Website</div>
            <p className="mt-2 text-xs text-neutral-300/90">Build this website, implement all the sections with relevant projects, animations, and styling.</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center">+5 XP</span>
              <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center">+25 Coins</span>
            </div>
          </div>
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div className="uppercase tracking-[0.25em] text-neutral-400">Visual Settings</div>
            <div className="mt-3 space-y-2">
              <label className="flex items-center justify-between gap-4"><span>Sound Effects</span><input type="checkbox" className="accent-[#e04b43]" defaultChecked/></label>
              <label className="flex items-center justify-between gap-4"><span>Music</span><input type="checkbox" className="accent-[#e04b43]"/></label>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
