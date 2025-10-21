import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import ProfileVideo from '../assets/videos/t3g4_fantasy_illustration_warforged_artificer_he_is_free_fall_4155ceab-c2ac-4d22-bed3-ee376a56b9df_0 (1).mp4'
import { achievements as ACH } from '../data/achievements.js'

export default function Achievements() {
  const [stats, setStats] = useState({ level: 48, coins: 1425, xp: 0 })
  const [visualCfg, setVisualCfg] = useState({ hue: 0, hudScale: 1, textScale: 100 })
  const [achEarned, setAchEarned] = useState({})
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all') // all | achieved | progress | todo
  const [rarityFilter, setRarityFilter] = useState({ legendary: true, epic: true, rare: true, common: true, uncommon: true })

  useEffect(() => {
    try { const raw = localStorage.getItem('stats_v1'); if (raw) { const p = JSON.parse(raw); setStats({ level: p.level ?? 48, coins: p.coins ?? 1425, xp: p.xp ?? 0 }) } } catch(e){ void e }
    try { const raw = localStorage.getItem('visual_cfg_v1'); if (raw) { const p = JSON.parse(raw); setVisualCfg({ hue: p.hue ?? 0, hudScale: p.hudScale ?? 1, textScale: p.textScale ?? 100 }) } } catch(e){ void e }
    try { const a = JSON.parse(localStorage.getItem('achievements_v1')||'{}'); if (a) setAchEarned(a) } catch(e){ void e }
  }, [])

  const computed = useMemo(() => {
    const order = { legendary: 5, epic: 4, rare: 3, common: 2, uncommon: 1 }
    const q = query.trim().toLowerCase()
    const items = ACH
      .map(x => ({ ...x, earned: achEarned[x.id] ?? x.earned }))
      .filter(x => rarityFilter[x.rarity] !== false)
      .filter(x => (q ? (x.name.toLowerCase().includes(q) || (x.desc||'').toLowerCase().includes(q)) : true))

    const earned = items
      .filter(i => i.earned)
      .sort((a,b)=> (order[b.rarity]-order[a.rarity]) || a.name.localeCompare(b.name))
    const inProgress = items
      .filter(i => !i.earned && (i.rarity==='epic' || i.rarity==='legendary'))
      .sort((a,b)=> (order[b.rarity]-order[a.rarity]) || a.name.localeCompare(b.name))
    const todo = items
      .filter(i => !i.earned && !(i.rarity==='epic' || i.rarity==='legendary'))
      .sort((a,b)=> (order[b.rarity]-order[a.rarity]) || a.name.localeCompare(b.name))

    let byStatus = { earned, inProgress, todo }
    if (status === 'achieved') byStatus = { earned, inProgress: [], todo: [] }
    if (status === 'progress') byStatus = { earned: [], inProgress, todo: [] }
    if (status === 'todo') byStatus = { earned: [], inProgress: [], todo }
    return { items, ...byStatus }
  }, [achEarned, query, rarityFilter, status])

  return (
    <div className="relative min-h-screen bg-[#0b0b0c] text-white" style={{ fontSize: `${visualCfg.textScale}%`, ['--accent']: `hsl(${visualCfg.hue} 70% 56%)` }}>
      <style>{`
        @keyframes shimmerSweep { 0%{transform:translateX(-120%)} 100%{transform:translateX(120%)} }
        @keyframes pulseSoft { 0%,100%{opacity:.9} 50%{opacity:1} }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition:none !important}
        }
      `}</style>
      {/* Top status bar */}
      <div className="relative border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="mx-auto max-w-[1300px] px-6 py-3 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-neutral-300">
          <div className="flex items-center gap-4">
            <Link to="/system" className="hover:text-white">⟵ System</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#a7ff4a]">{stats.level} Level</span>
            <span className="text-[#ffcc66]">{stats.coins.toLocaleString()} Coins</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1300px] px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_300px] gap-6" style={{ transform: `scale(${visualCfg.hudScale})` }}>
        {/* Left sidebar */}
        <aside className="space-y-4">
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4">
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--accent)]/40" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[var(--accent)]/40" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-4 w-4 border-l border-b border-[var(--accent)]/40" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[var(--accent)]/40" />
            <div className="aspect-square w-full overflow-hidden rounded">
              <video src={ProfileVideo} className="h-full w-full object-cover" autoPlay loop muted playsInline preload="auto" />
            </div>
            <div className="mt-4 text-sm uppercase tracking-[0.25em] text-neutral-400">Name</div>
            <div className="text-lg font-semibold">Idriss Mrayah</div>
          </div>
        </aside>

        {/* Center: Achievements */}
        <main className="relative rounded-md border border-white/15 bg-black/20 backdrop-blur-sm overflow-hidden">
          <span className="pointer-events-none absolute -inset-px rounded-md opacity-40 [background:radial-gradient(600px_300px_at_20%_20%,rgba(255,255,255,.06),transparent_60%)]" />
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-neutral-300 backdrop-blur">
            <div className="flex-1 text-center">Achievements</div>
            <div className="hidden md:flex items-center gap-3 pr-1">
              <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-yellow-500/60" /> Achieved</span>
              <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-fuchsia-500/60" /> In Progress</span>
              <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-white/40" /> To‑Do</span>
            </div>
          </div>
          <div className="p-5 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
            {/* Left col: progress */}
            <div className="space-y-4">
              <div className="rounded-md border border-white/15 bg-black/30 p-4 text-center">
                <div className="mx-auto h-36 w-36 relative">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="42" stroke="var(--accent)" strokeWidth="8" fill="none" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.25))', strokeDasharray: 264, strokeDashoffset: 264 - (264 * computed.earned.length) / Math.max(1, computed.items.length) }} />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-lg font-semibold">{computed.earned.length}/{computed.items.length}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">Progress</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-neutral-300/90">
                  I have created a set of achievements for myself. If you want to give me a challenge, send your idea and I’ll update this section.
                </p>
                <button className="mt-3 rounded-sm px-3 py-2 text-[11px] uppercase tracking-[0.2em]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 60%, transparent)', borderWidth: 1, color: 'var(--accent)' }}>Challenge Me</button>
              </div>
            </div>

            {/* Right col: lists */}
            <div className="space-y-4">
              <Section title="Achieved" items={computed.earned} variant="achieved" />
              <Section title="In Progress" items={computed.inProgress} variant="progress" />
              <Section title="To Achieve" items={computed.todo} subtle variant="todo" />
            </div>
          </div>
        </main>

        {/* Right sidebar (interactive filters) */}
        <aside className="space-y-4">
          <div className="relative rounded-md border border-white/15 bg-black/40 p-4 text-xs">
            <div className="uppercase tracking-[0.25em] text-neutral-400">Filters</div>
            <div className="mt-3">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search achievements" className="w-full rounded-sm border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-white/20" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
              {['legendary','epic','rare','common','uncommon'].map(r => (
                <button key={r} onClick={()=>setRarityFilter(f=>({ ...f, [r]: !f[r] }))} className={`rounded border px-2 py-1 text-center capitalize ${rarityFilter[r] ? '' : 'opacity-40'}`} style={{ borderColor: r==='legendary'?'rgba(234,179,8,.35)':r==='epic'?'rgba(217,70,239,.35)':r==='rare'?'rgba(14,165,233,.35)':'rgba(255,255,255,.15)', background: r==='legendary'?'rgba(234,179,8,.1)':r==='epic'?'rgba(217,70,239,.1)':r==='rare'?'rgba(14,165,233,.1)':'rgba(255,255,255,.06)' }}>{r}</button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-[11px]">
              {[
                {k:'all',label:'All'}, {k:'achieved',label:'Achieved'}, {k:'progress',label:'In Progress'}, {k:'todo',label:'To‑Do'}
              ].map(s=> (
                <button key={s.k} onClick={()=>setStatus(s.k)} className={`rounded border px-2 py-1 text-center ${status===s.k?'bg-white/10 text-[var(--accent)]':''}`} style={status===s.k?{ borderColor:'color-mix(in srgb, var(--accent) 60%, transparent)' }:{ borderColor:'rgba(255,255,255,.15)' }}>{s.label}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Section({ title, items, subtle, variant }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-neutral-300">{title}</div>
      <div className="p-3 space-y-3">
        {items.length === 0 && <div className="text-xs text-neutral-400">No items</div>}
        {items.map(it => (
          <div key={it.id} className={`group relative overflow-hidden rounded border p-3 transition-all ${it.rarity==='legendary'?'border-yellow-500/40 bg-yellow-500/10':it.rarity==='epic'?'border-fuchsia-500/40 bg-fuchsia-500/10':it.rarity==='rare'?'border-sky-500/40 bg-sky-500/10':'border-white/10 bg-black/30'} ${subtle?'opacity-80':''} ${variant==='progress'?'[animation:pulseSoft_2.4s_ease-in-out_infinite]':''} hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_50%,transparent)_inset]`}>
            <span className={`pointer-events-none absolute -top-2 -left-8 h-12 w-28 -rotate-12 ${it.rarity==='legendary'?'bg-yellow-500/15':it.rarity==='epic'?'bg-fuchsia-500/15':it.rarity==='rare'?'bg-sky-500/15':'bg-white/5'}`} />
            {(it.rarity==='legendary' || it.rarity==='epic') && (
              <span className="pointer-events-none absolute inset-y-0 -left-1 w-1/3 translate-x-[-120%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40" style={{ animation: 'shimmerSweep 2s linear infinite' }} />
            )}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-9 w-9 shrink-0 rounded bg-black/40 ring-1 ring-inset ring-white/10" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="truncate text-sm font-semibold">{it.name}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded ${it.rarity==='legendary'?'bg-yellow-500/15 text-yellow-300':it.rarity==='epic'?'bg-fuchsia-500/15 text-fuchsia-300':it.rarity==='rare'?'bg-sky-500/15 text-sky-300':'bg-white/10 text-neutral-300'}`}>{it.rarity}</span>
                    <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded ${it.earned?'bg-green-500/15 text-green-300':'bg-white/10 text-neutral-300'}`}>{it.earned?'Achieved':'Locked'}</span>
                  </div>
                </div>
                <div className="mt-1 text-xs text-neutral-300/90">{it.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
