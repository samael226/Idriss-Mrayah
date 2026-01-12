import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import DemoVideo from '../assets/videos/momsuca_holographic_FOG_City_space_intricate_meander_Patterns_743c9ca8-0687-493f-9d51-13799ae5bc96_0.mp4'
import ProfileVideo from '../assets/videos/t3g4_fantasy_illustration_warforged_artificer_he_is_free_fall_4155ceab-c2ac-4d22-bed3-ee376a56b9df_0 (1).mp4'
import { achievements as ACH } from '../data/achievements.js'

export default function System() {
  const videoRef = useRef(null)
  const [openForm, setOpenForm] = useState(false)
  const [openConfig, setOpenConfig] = useState(false)
  const formRef = useRef(null)
  const firstFieldRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  // Form state
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [formType, _setFormType] = useState('connect')
  const [activeTab, setActiveTab] = useState('beginning')
  const tabs = [
    { key: 'beginning', label: 'Beginning' },
    { key: 'logs', label: 'Logs' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'creations', label: 'Creations' },
    { key: 'games', label: 'Games' },
  ]

  // Simple dynamic stats
  const [stats, setStats] = useState({ level: 48, coins: 1425, xp: 0 })
  const [coinsDisplay, setCoinsDisplay] = useState(1425)
  const toastIdRef = useRef(0)
  const [toasts, setToasts] = useState([])
  const coinsRef = useRef(null)
  const [confetti, setConfetti] = useState([]) // level-up celebration pieces
  const [coinBurst, setCoinBurst] = useState([]) // coin particles
  const [achEarned, setAchEarned] = useState({}) // id -> true
  const [visitedTabs, setVisitedTabs] = useState({}) // discovery XP
  const [quest, setQuest] = useState({
    name: 'React Website',
    milestones: [
      { id: 'wire-contact', label: 'Wire contact panel', done: false, xp: 10, coins: 50 },
      { id: 'logs-page', label: 'Build Logs page', done: false, xp: 8, coins: 25 },
      { id: 'theme', label: 'Add visual configurator', done: false, xp: 7, coins: 20 },
    ],
    lastRefresh: 0,
  })
  const pushToast = (title, body) => {
    const id = ++toastIdRef.current
    setToasts(ts => [...ts, { id, title, body }])
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 2600)
  }
  const awardCoins = (n) => {
    setStats(s => ({ ...s, coins: s.coins + n }))
    pushToast('Coins Received', `+${n} coins`)
    triggerCoinBurst()
  }
  const awardXp = (n) => {
    const THRESHOLD = 100
    let xp = (stats.xp ?? 0) + n
    let level = stats.level
    let leveled = false
    while (xp >= THRESHOLD) { xp -= THRESHOLD; level += 1; leveled = true }
    setStats(s => ({ ...s, xp, level }))
    if (leveled) { pushToast('Level Up', `You reached level ${level}`); triggerLevelUp() }
    else pushToast('XP Gained', `+${n} XP`)
  }

  function triggerLevelUp() {
    const pieces = Array.from({ length: 26 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: Math.random() * 100,
      y: -10 - Math.random() * 10,
      r: Math.random() * 360,
      v: 30 + Math.random() * 40,
      h: Math.floor((visualCfg?.hue ?? 0) + Math.random() * 60) % 360,
    }))
    setConfetti(pieces)
    setTimeout(() => setConfetti([]), 1200)
  }

  function triggerCoinBurst() {
    // spawn particles near the coins label
    const rect = coinsRef.current?.getBoundingClientRect?.()
    const baseX = rect ? rect.left + rect.width / 2 : window.innerWidth - 80
    const baseY = rect ? rect.top : 60
    const pieces = Array.from({ length: 8 }, (_, i) => ({
      id: `${Date.now()}c-${i}`,
      x: baseX,
      y: baseY,
      dx: (Math.random() - 0.5) * 120,
      dy: -40 - Math.random() * 60,
    }))
    setCoinBurst(pieces)
    setTimeout(() => setCoinBurst([]), 700)
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem('stats_v1')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed.level === 'number' && typeof parsed.coins === 'number') {
          setStats({ level: parsed.level, coins: parsed.coins, xp: parsed.xp ?? 0 })
        }
      }
    } catch (e) { void e }
    try {
      const a = JSON.parse(localStorage.getItem('achievements_v1') || '{}')
      if (a && typeof a === 'object') setAchEarned(a)
    } catch (e) { void e }
    try {
      const q = JSON.parse(localStorage.getItem('quest_v1') || 'null')
      if (q && q.milestones) setQuest(q)
    } catch (e) { void e }
    try {
      const d = JSON.parse(localStorage.getItem('discovery_v1') || '{}')
      if (d && typeof d === 'object') setVisitedTabs(d)
    } catch (e) { void e }
  }, [])

  // Simple 3D tilt state for profile video
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, s: 1 })
  const onProfileMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const ry = (px - 0.5) * 16
    const rx = -(py - 0.5) * 16
    setTilt({ rx, ry, gx: px * 100, gy: py * 100, s: 1.03 })
  }
  const onProfileLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, s: 1 })

  // Visual configuration (persisted)
  const [visualCfg, setVisualCfg] = useState({ hue: 0, hudScale: 1, textScale: 100 })
  useEffect(() => {
    try {
      const raw = localStorage.getItem('visual_cfg_v1')
      if (raw) {
        const p = JSON.parse(raw)
        setVisualCfg({
          hue: typeof p.hue === 'number' ? p.hue : 0,
          hudScale: typeof p.hudScale === 'number' ? p.hudScale : 1,
          textScale: typeof p.textScale === 'number' ? p.textScale : 100,
        })
      }
    } catch (e) { void e }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('stats_v1', JSON.stringify(stats)) } catch (e) { void e }
  }, [stats])

  // persist quest and achievements
  useEffect(() => { try{ localStorage.setItem('achievements_v1', JSON.stringify(achEarned)) }catch(e){ void e } }, [achEarned])
  useEffect(() => { try{ localStorage.setItem('quest_v1', JSON.stringify(quest)) }catch(e){ void e } }, [quest])
  useEffect(() => { try{ localStorage.setItem('discovery_v1', JSON.stringify(visitedTabs)) }catch(e){ void e } }, [visitedTabs])

  useEffect(() => {
    let raf
    const animate = () => {
      setCoinsDisplay(prev => {
        const target = stats.coins
        const diff = target - prev
        if (Math.abs(diff) < 1) return target
        return prev + diff * 0.18
      })
      if (Math.abs(coinsDisplay - stats.coins) >= 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.coins])

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

  // Optional: Auto-open via URL hash for quick testing
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      setOpenForm(true);
    }
  }, [])

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpenForm(false); setOpenConfig(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Focus trap when panel is open
  useEffect(() => {
    if (!openForm) return
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
  }, [openForm])

  // Focus trap for Visual Configurator
  const configRef = useRef(null)
  useEffect(() => {
    if (!openConfig) return
    const root = configRef.current
    if (!root) return
    const focusables = root.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    first?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [openConfig])

  // Quest refresh helpers
  const COOLDOWN_MS = 2 * 60 * 60 * 1000
  const nowTs = Date.now()
  const remainingMs = Math.max(0, (quest.lastRefresh ?? 0) + COOLDOWN_MS - nowTs)
  const fmtRemain = (ms) => {
    const s = Math.ceil(ms / 1000)
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const ss = s % 60
    if (h > 0) return `${h}h ${m}m`
    if (m > 0) return `${m}m ${ss}s`
    return `${ss}s`
  }
  const refreshQuest = () => {
    if (remainingMs > 0) {
      pushToast('Cooldown', `Quest refresh in ${fmtRemain(remainingMs)}`)
      return
    }
    // Reset milestones and rotate for freshness
    setQuest(q => ({
      ...q,
      milestones: q.milestones.map(m => ({ ...m, done: false })).sort(()=>Math.random()-0.5),
      lastRefresh: Date.now(),
    }))
    pushToast('Quest Updated', 'New objectives are available')
  }

  // Discovery XP on first visit to a tab
  useEffect(() => {
    if (!visitedTabs[activeTab]) {
      setVisitedTabs(v => ({ ...v, [activeTab]: true }))
      if (activeTab !== 'beginning') awardXp(2)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  function validate() {
    const next = {}
    
    // Validate name
    if (!name || !name.trim()) {
      next.name = 'Name is required'
      console.log('Validation failed: Name is required')
    }
    
    // Validate email
    if (!email || !email.trim()) {
      next.email = 'Email is required'
      console.log('Validation failed: Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Please enter a valid email address'
      console.log('Validation failed: Invalid email format')
    }
    
    // Validate message
    if (!message || !message.trim()) {
      next.message = 'Message is required'
      console.log('Validation failed: Message is required')
    }
    
    setErrors(next)
    const isValid = Object.keys(next).length === 0
    console.log(`Form validation ${isValid ? 'passed' : 'failed'}`)
    return isValid
  }

  async function submitForm() {
    console.log('submitForm called');
    
    // Validate form
    if (!validate()) {
      console.log('Validation failed');
      return;
    }
    
    console.log('Setting submitting to true');
    setSubmitting(true);
    
    try {
      console.log('Preparing template params');
      const templateParams = {
        to_email: 'samael01lu@gmail.com',
        from_name: name,
        from_email: email,
        message: message,
        subject: `New Message from ${name} (${email})`,
        reply_to: email,
        date: new Date().toLocaleString()
      };

      console.log('Sending email with params:', templateParams);
      
      const result = await emailjs.send(
        'service_zwjz7uo', // Your EmailJS service ID
        'template_1kvmgq7', // Your EmailJS template ID
        templateParams,
        'qsxknAzNivqDQqvbw' // Your EmailJS public key
      );
      
      console.log('EmailJS response:', result);
      
      if (result.status === 200) {
        console.log('Email sent successfully');
        setSent(true);
        // unlock achievement and complete quest step
        setAchEarned(prev => ({ ...prev, ['contact-form']: true }));
        setQuest(q => ({
          ...q,
          milestones: q.milestones.map(m => m.id === 'wire-contact' ? { ...m, done: true } : m)
        }));
        pushToast('Success', 'Your message has been sent!');
        
        // Reset form after delay
        setTimeout(() => {
          console.log('Resetting form');
          setOpenForm(false);
          setSent(false);
          setName('');
          setEmail('');
          setMessage('');
          setErrors({});
        }, 1500);
      } else {
        console.error('Unexpected response status:', result.status);
        throw new Error(`Unexpected response status: ${result.status}`);
      }
    } catch (error) {
      console.error('Error in submitForm:', {
        error,
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      
      pushToast('Error', 'Failed to send message. Please try again.');
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to send. Please try again.'
      }));
    } finally {
      console.log('Setting submitting to false');
      setSubmitting(false);
    }
  }

  return (
    <div
      className="relative min-h-screen bg-[#0b0b0c] text-white overflow-hidden"
      style={{
        fontSize: `${visualCfg.textScale}%`,
        ['--accentH']: visualCfg.hue,
        ['--accent']: `hsl(${visualCfg.hue} 70% 56%)`,
      }}
    >

      {/* Top status bar */}
      <div className="relative border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="mx-auto max-w-[1300px] px-6 py-3 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-neutral-300">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-white">⟵ Home</Link>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline">Server Time: 00:42</span>
            <span className="hidden sm:inline">Local Time: 13:42</span>
          </div>
          
          <button 
            onClick={() => setOpenForm(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/10 hover:bg-white/5 transition-colors text-xs tracking-wider"
          >
            <span>Contact Me</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>

      {/* Slide-in Hire Form (legacy placement hidden) */}
      {/* Overlay that appears when form is open */}
      <div
        className={`fixed inset-0 z-40 transition-colors duration-500 ${openForm ? 'pointer-events-auto bg-black/70' : 'pointer-events-none bg-transparent'}`}
        onClick={() => setOpenForm(false)}
      />
      <aside
        aria-hidden={!openForm}
        aria-label="Open for Hire Form"
        className={`fixed left-0 top-0 z-50 h-full w-[320px] sm:w-[420px] ${openForm ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 bg-black/90 border-r border-white/10 backdrop-blur px-5 py-6 text-neutral-200 [box-shadow:0_0_0_1px_rgba(224,75,67,.35)_inset] animate-[glowPulse_3s_ease-in-out_infinite]`}
      > 
        {/* Form Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-neutral-200">
              Contact Me
            </div>
            <div className="text-[11px] text-neutral-400">
              I'll get back to you as soon as possible
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setOpenForm(false)} 
            className="rounded-sm border border-white/15 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <form 
          ref={formRef} 
          className="mt-6 space-y-4" 
          onSubmit={async (e) => {
            e.preventDefault();
            console.log('Form submitted');
            if (!submitting) {
              console.log('Calling submitForm');
              await submitForm();
            } else {
              console.log('Form is already submitting');
            }
          }}
        >
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Your Name</span>
            <input 
              ref={firstFieldRef} 
              type="text"
              name="from_name"
              value={name} 
              onChange={e => setName(e.target.value)} 
              className={`mt-2 w-full rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.name ? 'border-[#e04b43]/60' : 'border-white/10'}`} 
              placeholder="Enter your name"
              required
            />
            {errors.name && <span className="mt-1 block text-[11px] text-[#e04b43]">{errors.name}</span>}
          </label>
          
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Email Address</span>
            <input 
              type="email" 
              name="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className={`mt-2 w-full rounded-sm border bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#e04b43]/60 ${errors.email ? 'border-[#e04b43]/60' : 'border-white/10'}`} 
              placeholder="your@email.com" 
              required
            />
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
            <button 
              type="submit" 
              disabled={submitting} 
              className="relative overflow-hidden rounded-sm bg-[#e04b43] px-4 py-2 text-sm font-medium text-white hover:bg-[#c53d36] disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={(e) => {
                if (submitting) {
                  e.preventDefault();
                }
              }}
            >
              {submitting ? (
                <>
                  <span className="opacity-0">Sending...</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-2">Sending...</span>
                  </div>
                </>
              ) : 'Send Message'}
            </button>
            <button type="button" onClick={()=>setOpenForm(false)} className="rounded-sm border border-white/15 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Discard [Esc]</button>
          </div>
          {errors.submit && (
            <div className="mt-4 rounded-md bg-red-500/20 p-3 text-sm text-red-300">
              {errors.submit}
            </div>
          )}
        </form>

        <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
      </aside>

      {/* Visual Configurator Modal */}
      <div className={`fixed inset-0 z-[70] ${openConfig ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 transition-colors duration-300 ${openConfig ? 'bg-black/70' : 'bg-transparent'}`} onClick={()=>setOpenConfig(false)} />
        <div ref={configRef} className={`absolute left-1/2 top-1/2 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/15 bg-black/80 p-5 text-sm text-neutral-200 backdrop-blur transition-transform duration-300 ${openConfig ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-300">Visual Configurator</div>
          <div className="text-[11px] text-neutral-400">Apply what works best for you</div>

          <div className="mt-4 space-y-4">
            <label className="block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">HUD Hue</div>
              <input type="range" min={0} max={360} value={visualCfg.hue} onChange={e=>setVisualCfg(v=>({...v, hue: Number(e.target.value)}))} className="mt-2 w-full" />
              <div className="mt-1 text-[11px] text-neutral-400">Black: 8.4 · White: 7.5</div>
            </label>
            <label className="block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">HUD Size</div>
              <input type="range" min={0.85} max={1.15} step={0.01} value={visualCfg.hudScale} onChange={e=>setVisualCfg(v=>({...v, hudScale: Number(e.target.value)}))} className="mt-2 w-full" />
            </label>
            <label className="block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Text Scale</div>
              <input type="range" min={90} max={120} step={1} value={visualCfg.textScale} onChange={e=>setVisualCfg(v=>({...v, textScale: Number(e.target.value)}))} className="mt-2 w-full" />
              <div className="mt-1 text-center text-base font-semibold" style={{ color: 'var(--accent)' }}>Hi!</div>
            </label>
            <div className="rounded border border-white/10 bg-black/40 p-3 text-[11px] text-neutral-300/90">
              The configuration is stored in your browser. If you load a different browser or machine, your settings will not apply.
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={()=>{ try { localStorage.setItem('visual_cfg_v1', JSON.stringify(visualCfg)); pushToast('Saved', 'Visual configuration written to disk'); } catch(e){ void e } setOpenConfig(false)}} className="rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:opacity-90" style={{ borderColor: 'color-mix(in srgb, var(--accent) 70%, transparent)', borderWidth: 1, background: 'color-mix(in srgb, var(--accent) 20%, transparent)', color: 'var(--accent)' }}>Write to Disk [Enter]</button>
            <button onClick={()=>setOpenConfig(false)} className="rounded-sm border border-white/15 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Discard [Esc]</button>
          </div>
        </div>
      </div>
          <div className="text-neutral-400">System Console</div>
        </div>
      </div>

      {/* Level-up Confetti */}
      <div className="pointer-events-none fixed inset-0 z-[65]">
        {confetti.map(p => (
          <span
            key={p.id}
            className="absolute block h-2 w-2 rotate-12"
            style={{
              left: `calc(${p.x}% - 1px)`,
              top: `${p.y}px`,
              background: `hsl(${p.h} 80% 60%)`,
              boxShadow: '0 0 10px rgba(255,255,255,0.2)',
              transform: `translateY(${p.v}px) rotate(${p.r}deg)`,
              transition: 'transform 1s ease, top 1s ease',
            }}
          />
        ))}
      </div>

      {/* Coin burst particles */}
      <div className="pointer-events-none fixed inset-0 z-[66]">
        {coinBurst.map((c,i)=>(
          <span key={c.id}
            className="absolute inline-block h-3 w-3 rounded-full bg-[#ffcc66]"
            style={{ left: c.x + 'px', top: c.y + 'px', transform: `translate(${c.dx}px, ${c.dy}px)`, transition: 'transform 0.7s ease, opacity 0.7s ease', opacity: 0.9 - i*0.05 }} />
        ))}
      </div>

      {/* Slide-in Form (relocated under page container, supports 'hire' and 'connect') */}
      <div
        className={`fixed inset-0 z-40 transition-colors duration-500 ${openForm ? 'pointer-events-auto bg-black/70' : 'pointer-events-none bg-transparent'}`}
        onClick={() => setOpenForm(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!openForm}
        aria-label={formType === 'connect' ? 'Open Connection Form' : 'Open for Hire Form'}
        className={`fixed left-0 top-0 z-50 h-full w-[320px] sm:w-[420px] ${openForm ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 will-change-transform bg-black/90 border-r border-white/10 backdrop-blur px-5 py-6 text-neutral-200 [box-shadow:0_0_0_1px_rgba(224,75,67,.35)_inset] animate-[glowPulse_3s_ease-in-out_infinite]`}
      > 
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-200">{formType === 'connect' ? 'Connect with me' : 'Open for Hire'}</div>
          <button type="button" onClick={()=>setOpenForm(false)} className="rounded-sm border border-white/15 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Close</button>
        </div>
        // eslint-disable-next-line no-undef
        <div className="mt-1 text-[11px] text-neutral-400">{formType === 'connect' ? 'Wanna chat? Or just share something cool?' : 'I would love to hear about your projects!'}</div>

        <form 
          ref={formRef} 
          className="mt-6 space-y-4" 
          onSubmit={async (e) => {
            e.preventDefault();
            console.log('Form submitted');
            if (!submitting) {
              console.log('Calling submitForm');
              await submitForm();
            } else {
              console.log('Form is already submitting');
            }
          }}
        >
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
            <button type="submit" disabled={submitting} className="rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-60" style={{ borderColor: 'color-mix(in srgb, var(--accent) 70%, transparent)', borderWidth: 1, background: 'color-mix(in srgb, var(--accent) 20%, transparent)', color: 'var(--accent)' }}>{submitting ? 'Sending…' : sent ? 'Sent!' : 'Send Message [Enter]'}</button>
            <button type="button" onClick={()=>setOpenForm(false)} className="rounded-sm border border-white/15 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Discard [Esc]</button>
          </div>
          {errors.submit && <div className="mt-2 text-[11px] text-[#e04b43]">{errors.submit}</div>}
        </form>

        <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
      </aside>

      {/* Toasts */}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[60] space-y-2">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto rounded border border-white/10 bg-black/70 px-3 py-2 text-sm text-neutral-200 shadow-md backdrop-blur transition-all">
            <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>{t.title}</div>
            <div className="text-xs">{t.body}</div>
          </div>
        ))}
      </div>

      {/* Main three-column layout */}
      <div className={`relative mx-auto max-w-[1300px] px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_300px] gap-6 transition-transform duration-500 ${openForm ? 'lg:translate-x-[340px] lg:[transform:perspective(1400px)_rotateY(-5deg)]' : ''}`} style={{ transform: `${openForm ? 'translateX(340px) ' : ''}scale(${visualCfg.hudScale})` }}>
        {/* Left sidebar: profile card */}
        <aside className="space-y-4">
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div
              className="aspect-square w-full overflow-hidden rounded relative transform-gpu transition-transform duration-200 will-change-transform"
              onMouseMove={onProfileMove}
              onMouseLeave={onProfileLeave}
              style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})` }}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
                style={{ background: `radial-gradient(220px 180px at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.15), transparent 60%)` }}
              />
              <video
                src={ProfileVideo}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
            <div className="mt-4">
              <div className="text-sm uppercase tracking-[0.25em] text-neutral-400">Name</div>
              <div className="mt-1 text-lg font-semibold">Idriss Mrayah</div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => setOpenForm(true)} 
                className="w-full rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2" 
                style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">Stats</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>Level</span>
                <span className="inline-flex items-center gap-2">
                  <svg width="36" height="36" viewBox="0 0 36 36" className="-mr-1">
                    <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
                    <circle cx="18" cy="18" r="14" stroke="var(--accent)" strokeWidth="4" fill="none" strokeLinecap="round" style={{ strokeDasharray: 88, strokeDashoffset: 88 - (88 * (stats.xp % 100)) / 100, transition: 'stroke-dashoffset .3s ease' }} />
                  </svg>
                  <span className="text-[#a7ff4a]">{stats.level}</span>
                </span>
              </div>
              <div className="flex items-center justify-between"><span>Coins</span><span ref={coinsRef} className="text-[#ffcc66]">{Math.round(coinsDisplay).toLocaleString()}</span></div>
            </div>
          </div>

          {/* Logs quick access card */}
          <div className="rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">Logs</div>
            <p className="mt-2 text-neutral-300/90">Read detailed updates, challenges, and next steps.</p>
            <Link to="/logs" className="mt-3 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-white/10" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>Open Logs</Link>
          </div>

          {/* Achievements quick access card */}
          <div className="rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">Achievements</div>
            <p className="mt-2 text-neutral-300/90">View earned badges and upcoming goals.</p>
            <Link to="/achievements" className="mt-3 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-white/10" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>Open Achievements</Link>
          </div>


          <div className="rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">Projects</div>
            <p className="mt-2 text-neutral-300/90">View your active and completed projects.</p>
            <Link to="/projects" className="mt-3 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-white/10" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>Open Projects</Link>
          </div>

          <div className="rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">About me</div>
            <p className="mt-2 text-neutral-300/90">Learn more about me and my journey.</p>
            <Link to="/about" className="mt-3 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-white/10" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>Open About</Link>
          </div>
          
        </aside>

        {/* Center panel over video */}
        <main className="relative rounded-md border border-white/15 bg-black/20 backdrop-blur-sm">
          {/* inner stroke sweep */}
          <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/10 [mask:linear-gradient(#000,transparent_95%)]" />
          <span className="pointer-events-none absolute -inset-px rounded-md opacity-0 md:opacity-100 [background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)] animate-[scanSweep_3s_linear_infinite]" />
          <div className="border-b border-white/10 px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-300">
            Crossing through the adventure of a vast network of interconnected devices and servers...
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
          <div className="border-t border-white/10 px-3 py-2">
            <div className="grid grid-cols-5 gap-2 text-[11px] uppercase tracking-[0.2em]">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={()=>setActiveTab(t.key)}
                  className={
                    `rounded px-2 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ` +
                    (activeTab === t.key
                      ? 'bg-black/30 text-[var(--accent)]'
                      : 'border border-white/15 bg-black/30 text-neutral-300 hover:bg-white/10 focus-visible:outline-white/50')
                  }
                  style={activeTab===t.key ? { borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1 } : {}}
                >{t.label}</button>
              ))}
            </div>

            {/* dynamic content area */}
            <div className="mt-4 rounded-md border border-white/10 bg-black/20 p-4 text-sm text-neutral-300 min-h-[160px]">
              {activeTab === 'beginning' && (
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">Welcome</div>
                  <p className="mt-2">A glimpse into my journey. Expect snapshots of early projects, learning milestones, and how I shape ideas into shipped features.</p>
                </div>
              )}
              {activeTab === 'logs' && (
                <ul className="space-y-2">
                  <li className="flex items-center justify-between"><span>Deployed portfolio v2</span><span className="text-xs text-neutral-400">Today</span></li>
                  <li className="flex items-center justify-between"><span>Refactored UI state to finite modes</span><span className="text-xs text-neutral-400">Yesterday</span></li>
                  <li className="flex items-center justify-between"><span>Added slide-in contact panel</span><span className="text-xs text-neutral-400">This week</span></li>
                </ul>
              )}
              {activeTab === 'achievements' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ACH.map(b => { const earned = achEarned[b.id] ?? b.earned; return (
                    <div key={b.id} className={`relative rounded border p-3 ${earned ? 'border-white/15 bg-black/30' : 'border-white/5 bg-black/20 opacity-70'}`}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{b.name}</div>
                        <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded ${b.rarity==='legendary'?'bg-yellow-500/15 text-yellow-400':b.rarity==='epic'?'bg-fuchsia-500/15 text-fuchsia-300':b.rarity==='rare'?'bg-sky-500/15 text-sky-300':'bg-white/10 text-neutral-300'}`}>{b.rarity}</span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-300/90">{b.desc}</div>
                      {!earned && <div className="absolute inset-0 rounded bg-black/40" />}
                    </div>
                  )})}
                </div>
              )}
              {activeTab === 'creations' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded border border-white/10 bg-black/30 p-3">Landing page animation</div>
                  <div className="rounded border border-white/10 bg-black/30 p-3">System console layout</div>
                </div>
              )}
              {activeTab === 'games' && (
                <div>
                  <p>Small interactive experiments and shaders. More coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right sidebar: active quest & settings */}
        <aside className="space-y-4">
          {/* Active Quest with checklist */}
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">Active Quest</div>
            <div className="mt-2 text-sm font-semibold">{quest.name}</div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <button onClick={refreshQuest} disabled={remainingMs>0} className="rounded-sm px-2 py-1 hover:opacity-90 disabled:opacity-50" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>{remainingMs>0? 'Refresh Locked' : 'Refresh Quest'}</button>
              <span className="text-neutral-400">{remainingMs>0? `Ready in ${fmtRemain(remainingMs)}` : 'Ready now'}</span>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {quest.milestones.map(m => (
                <label key={m.id} className="flex items-center justify-between gap-2">
                  <span className={`${m.done ? 'line-through text-neutral-500' : ''}`}>{m.label}</span>
                  <button
                    onClick={()=>{
                      if (m.done) return
                      setQuest(q=>({ ...q, milestones: q.milestones.map(x=>x.id===m.id?{...x, done:true}:x) }))
                      awardXp(m.xp); awardCoins(m.coins)
                    }}
                    className="rounded border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10"
                  >{m.done? 'Done' : `+${m.xp}XP +${m.coins}`}</button>
                </label>
              ))}
            </div>
          </div>
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">Active Quest</div>
            <div className="mt-2 text-sm font-semibold">React Website</div>
            <p className="mt-2 text-xs text-neutral-300/90">Build this website, implement all the sections with relevant projects, animations, and styling.</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <button onClick={()=>awardXp(5)} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center hover:bg-white/10">+5 XP</button>
              <button onClick={()=>awardCoins(25)} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center hover:bg-white/10">+25 Coins</button>
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
            <button onClick={()=>setOpenConfig(true)} className="mt-3 w-full rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-white/10" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>Visual Configuration</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
