import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import ProfileVideo from '../assets/videos/t3g4_fantasy_illustration_warforged_artificer_he_is_free_fall_4155ceab-c2ac-4d22-bed3-ee376a56b9df_0 (1).mp4'
import { logs as logsData } from '../data/logs.js'

export default function Logs() {
  const navigate = useNavigate()
  const location = useLocation()
  const [stats, setStats] = useState({ level: 48, coins: 1425, xp: 0 })
  const [entries] = useState(() => logsData)
  const [activeId, setActiveId] = useState(() => entries[0]?.id)
  const toastIdRef = useRef(0)
  const [toasts, setToasts] = useState([])
  const configRef = useRef(null)
  const [openConfig, setOpenConfig] = useState(false)
  const [visualCfg, setVisualCfg] = useState({ hue: 0, hudScale: 1, textScale: 100 })
  const pushToast = (title, body) => {
    const id = ++toastIdRef.current
    setToasts(ts => [...ts, { id, title, body }])
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 2400)
  }
  const awardCoins = (n) => { setStats(s => ({ ...s, coins: s.coins + n })); pushToast('Coins Received', `+${n} coins`) }
  const awardXp = (n) => {
    const THRESHOLD = 100
    let xp = (stats.xp ?? 0) + n
    let level = stats.level
    let leveled = false
    while (xp >= THRESHOLD) { xp -= THRESHOLD; level += 1; leveled = true }
    setStats(s => ({ ...s, xp, level }))
    pushToast(leveled ? 'Level Up' : 'XP Gained', leveled ? `You reached level ${level}` : `+${n} XP`)
  }

  // init from localStorage and URL (?id=)
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
    // visual cfg
    try {
      const rawCfg = localStorage.getItem('visual_cfg_v1')
      if (rawCfg) {
        const p = JSON.parse(rawCfg)
        setVisualCfg({
          hue: typeof p.hue === 'number' ? p.hue : 0,
          hudScale: typeof p.hudScale === 'number' ? p.hudScale : 1,
          textScale: typeof p.textScale === 'number' ? p.textScale : 100,
        })
      }
    } catch (e) { void e }
    const p = new URLSearchParams(location.search)
    const initial = p.get('id')
    if (initial && entries.some(e => e.id === initial)) setActiveId(initial)
  }, [entries, location.search])

  useEffect(() => {
    try { localStorage.setItem('stats_v1', JSON.stringify(stats)) } catch (e) { void e }
  }, [stats])

  const active = entries.find(e => e.id === activeId) || entries[0]
  const setActive = (id) => { setActiveId(id); const p = new URLSearchParams(location.search); p.set('id', id); navigate({ search: p.toString() }, { replace: true }) }

  // ESC to close config
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenConfig(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Focus trap for Visual Configurator
  useEffect(() => {
    if (!openConfig) return
    const root = configRef.current
    if (!root) return
    const els = root.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')
    const first = els[0]
    const last = els[els.length - 1]
    const handler = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', handler)
    first?.focus()
    return () => document.removeEventListener('keydown', handler)
  }, [openConfig])

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
            <Link to="/system" className="hover:text-white">⟵ System</Link>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline">Credits</span>
          </div>
          <div className="flex items-center gap-4 text-[#a7ff4a]">
            <span>{stats.level} Level</span>
            <span className="text-[#ffcc66]">{stats.coins.toLocaleString()} Coins Awarded</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1300px] px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_300px] gap-6" style={{ transform: `scale(${visualCfg.hudScale})` }}>
        {/* Left Sidebar */}
        <aside className="space-y-4">
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div className="aspect-square w-full overflow-hidden rounded">
              <video src={ProfileVideo} className="h-full w-full object-cover" autoPlay loop muted playsInline preload="auto" />
            </div>
            <div className="mt-4 text-xs grid grid-cols-2 gap-x-3 gap-y-2">
              <div className="col-span-2 text-neutral-400 uppercase tracking-[0.25em]">Name</div>
              <div className="col-span-2 text-base font-semibold">Idriss Mrayah</div>
              <div className="col-span-2 text-neutral-400 uppercase tracking-[0.25em] mt-2">Occupation</div>
              <div className="col-span-2">Web Developer</div>
              <div className="col-span-2 text-neutral-400 uppercase tracking-[0.25em] mt-2">Availability</div>
              <div className="col-span-2">Open for Hire</div>
              <div className="col-span-2 text-neutral-400 uppercase tracking-[0.25em] mt-2">Social</div>
              <div className="col-span-2">
                <Link to="/system#connect" className="inline-flex items-center gap-2 rounded-sm border border-[#e04b43]/60 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-[#e04b43] hover:bg-[#e04b43]/10">Open Connection</Link>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">Motto</div>
            <p className="mt-2 text-neutral-300/90">Saepe omnis neque numquam recusandae laudantium.</p>
          </div>
        </aside>

        {/* Center Logs (dynamic) */}
        <main className="relative rounded-md border border-white/15 bg-black/20 backdrop-blur-sm">
          <div className="border-b border-white/10 px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-300">Data log dump initialized.</div>

          <div className="p-4 md:p-6 space-y-4">
            {/* Top red log banner */}
            <div className="rounded border border-[#e04b43]/70 bg-[#e04b43]/15 p-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="font-semibold tracking-wide">Log Entry: {active.title}</div>
                <div className="text-neutral-300/90">Date: {active.date}</div>
              </div>
              <div className="mt-1 text-neutral-300/90">Project status: {active.status} · Location: {active.location}</div>
            </div>

            {/* Log blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {active.sections.length === 0 && (
                <div className="rounded border border-white/15 bg-black/30 p-3 md:col-span-2 text-neutral-400">No additional details for this log.</div>
              )}
              {active.sections.map(sec => (
                <section key={sec.id} className="rounded border border-white/15 bg-black/30 p-3">
                  <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">{sec.heading}</div>
                  <p className="mt-2 text-sm text-neutral-300/90">{sec.body}</p>
                </section>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <button className="rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:opacity-90" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, background: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)' }}>Preview Visual Records</button>
            </div>

            {/* Older logs */}
            <div className="rounded border border-white/15 bg-black/30 p-3 text-sm">
              <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">Older Logs</div>
              <div className="divide-y divide-white/10">
                {entries.map((l)=> (
                  <div key={l.id} className="flex items-center justify-between py-2">
                    <button onClick={()=>setActive(l.id)} className={`text-left hover:text-white ${active.id===l.id? 'text-[#e04b43]' : ''}`}>Log Entry: {l.title}</button>
                    <span className="text-neutral-400">Date: {l.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom nav */}
          <div className="border-t border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em]">
            <div className="grid grid-cols-5 gap-2">
              <Link to="/system" className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 hover:bg-white/10">Beginning</Link>
              <span className="rounded border border-[#e04b43]/60 bg-[#e04b43]/15 px-2 py-1 text-[#e04b43] text-center">Logs</span>
              <Link to="/system#achievements" className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 hover:bg-white/10">Achievements</Link>
              <Link to="/system#creations" className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 hover:bg-white/10">Creations</Link>
              <Link to="/system#games" className="rounded border border-white/15 bg-black/30 px-2 py-1 text-neutral-300 hover:bg-white/10">Games</Link>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
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
              <button onClick={()=>awardXp(5)} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center hover:bg-white/10">+5 XP</button>
              <button onClick={()=>awardCoins(25)} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-center hover:bg-white/10">+25 Coins</button>
            </div>
          </div>

          {/* Visual Settings + Configurator trigger */}
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e04b43]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[#e04b43]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#e04b43]/40" />
            <div className="uppercase tracking-[0.25em] text-neutral-400">Visual Settings</div>
            <button onClick={()=>setOpenConfig(true)} className="mt-3 w-full rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-white/10" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>Visual Configuration</button>
          </div>
        </aside>
      </div>

      {/* Toasts */}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[60] space-y-2">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto rounded border border-white/10 bg-black/70 px-3 py-2 text-sm text-neutral-200 shadow-md backdrop-blur transition-all">
            <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>{t.title}</div>
            <div className="text-xs">{t.body}</div>
          </div>
        ))}
      </div>

      {/* Visual Configurator Modal */}
      <div className={`fixed inset-0 z-[70] ${openConfig ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 transition-colors duration-300 ${openConfig ? 'bg-black/70' : 'bg-transparent'}`} onClick={()=>setOpenConfig(false)} />
        <div ref={configRef} className={`absolute left-1/2 top-1/2 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/15 bg-black/80 p-5 text-sm text-neutral-200 backdrop-blur transition-transform duration-300 ${openConfig ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-300">Visual Configurator</div>
          <div className="text-[11px] text-neutral-400">Apply what works best for you</div>
          <div className="mt-4 space-y-4">
            <label className="block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">HUD Hue</div>
              <input type="range" min={0} max={360} value={visualCfg.hue} onChange={e=>{ const v={...visualCfg, hue:Number(e.target.value)}; setVisualCfg(v); try{localStorage.setItem('visual_cfg_v1', JSON.stringify(v))}catch(err){ void err }}} className="mt-2 w-full" />
            </label>
            <label className="block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">HUD Size</div>
              <input type="range" min={0.85} max={1.15} step={0.01} value={visualCfg.hudScale} onChange={e=>{ const v={...visualCfg, hudScale:Number(e.target.value)}; setVisualCfg(v); try{localStorage.setItem('visual_cfg_v1', JSON.stringify(v))}catch(err){ void err }}} className="mt-2 w-full" />
            </label>
            <label className="block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Text Scale</div>
              <input type="range" min={90} max={120} step={1} value={visualCfg.textScale} onChange={e=>{ const v={...visualCfg, textScale:Number(e.target.value)}; setVisualCfg(v); try{localStorage.setItem('visual_cfg_v1', JSON.stringify(v))}catch(err){ void err }}} className="mt-2 w-full" />
            </label>
            <div className="rounded border border-white/10 bg-black/40 p-3 text-[11px] text-neutral-300/90">
              The configuration is stored in your browser.
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={()=>setOpenConfig(false)} className="rounded-sm border border-white/15 bg-black/40 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:bg-white/10">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
