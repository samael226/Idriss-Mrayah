import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import ProfileVideo from '../assets/videos/t3g4_fantasy_illustration_warforged_artificer_he_is_free_fall_4155ceab-c2ac-4d22-bed3-ee376a56b9df_0 (1).mp4'
import { achievements as ACH } from '../data/achievements.js'
import ChallengeForm from '../components/ChallengeForm'

export default function Achievements() {
  const [stats, setStats] = useState({ level: 48, coins: 1425, xp: 0 })
  const [visualCfg, setVisualCfg] = useState({ hue: 0, hudScale: 1, textScale: 100 })
  const [achEarned, setAchEarned] = useState({})
  const [challenges, setChallenges] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all') // all | achieved | progress | todo
  const [rarityFilter, setRarityFilter] = useState({ legendary: true, epic: true, rare: true, common: true, uncommon: true })
  const [showChallengeForm, setShowChallengeForm] = useState(false)

  useEffect(() => {
    try { const raw = localStorage.getItem('stats_v1'); if (raw) { const p = JSON.parse(raw); setStats({ level: p.level ?? 48, coins: p.coins ?? 1425, xp: p.xp ?? 0 }) } } catch(e){ void e }
    try { const raw = localStorage.getItem('visual_cfg_v1'); if (raw) { const p = JSON.parse(raw); setVisualCfg({ hue: p.hue ?? 0, hudScale: p.hudScale ?? 1, textScale: p.textScale ?? 100 }) } } catch(e){ void e }
    try { const a = JSON.parse(localStorage.getItem('achievements_v1')||'{}'); if (a) setAchEarned(a) } catch(e){ void e }
    try { const c = JSON.parse(localStorage.getItem('challenges_v1')||'[]'); if (c) setChallenges(c) } catch(e){ void e }
    // Read filters from URL if present
    try {
      const sp = new URLSearchParams(window.location.search)
      const qs = sp.get('q') || ''
      const st = sp.get('status') || 'all'
      const rf = sp.get('rarity') // csv
      if (qs) setQuery(qs)
      if (st && ['all','achieved','progress','todo'].includes(st)) setStatus(st)
      if (rf) {
        const set = rf.split(',').reduce((acc,k)=>{ acc[k]=true; return acc }, {})
        setRarityFilter({ legendary: !!set.legendary, epic: !!set.epic, rare: !!set.rare, common: !!set.common, uncommon: !!set.uncommon })
      }
    } catch(e){ void e }
  }, [])

  // Sync filters to URL
  useEffect(() => {
    try {
      const on = Object.entries(rarityFilter).filter(([,v])=>v).map(([k])=>k).join(',')
      const sp = new URLSearchParams(window.location.search)
      query ? sp.set('q', query) : sp.delete('q')
      status !== 'all' ? sp.set('status', status) : sp.delete('status')
      on !== 'legendary,epic,rare,common,uncommon' && on !== '' ? sp.set('rarity', on) : sp.delete('rarity')
      const url = `${window.location.pathname}?${sp.toString()}`.replace(/\?$/, '')
      window.history.replaceState({}, '', url)
    } catch(e){ void e }
  }, [query, status, rarityFilter])

  // Shortcuts: F focus search, 1/2/3 switch status
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return
      if (e.key.toLowerCase() === 'f') {
        const el = document.querySelector('#ach-search')
        el?.focus(); e.preventDefault()
      }
      if (e.key === '1') setStatus('all')
      if (e.key === '2') setStatus('achieved')
      if (e.key === '3') setStatus('progress')
      if (e.key === '4') setStatus('todo')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleNewChallenge = (challenge) => {
    const updatedChallenges = [...challenges, challenge];
    setChallenges(updatedChallenges);
    localStorage.setItem('challenges_v1', JSON.stringify(updatedChallenges));
  };

  const toggleChallengeComplete = (challengeId) => {
    const updatedChallenges = challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, completed: !challenge.completed } 
        : challenge
    );
    setChallenges(updatedChallenges);
    localStorage.setItem('challenges_v1', JSON.stringify(updatedChallenges));
  };

  const computed = useMemo(() => {
    const order = { legendary: 5, epic: 4, rare: 3, common: 2, uncommon: 1 }
    const q = query.trim().toLowerCase()
    
    // Combine regular achievements with user-submitted challenges
    const allAchievements = [
      ...ACH.map(x => ({ 
        ...x, 
        earned: achEarned[x.id] ?? x.earned,
        isChallenge: false
      })),
      ...challenges.map(c => ({
        id: c.id,
        name: c.title,
        desc: c.description,
        category: 'challenge',
        rarity: c.rarity,
        icon: '🎯',
        xp: c.rarity === 'legendary' ? 100 : 
            c.rarity === 'epic' ? 75 : 
            c.rarity === 'rare' ? 50 : 
            c.rarity === 'uncommon' ? 25 : 10,
        earned: c.completed,
        isChallenge: true,
        timestamp: c.timestamp
      }))
    ];

    const items = allAchievements
      .filter(x => rarityFilter[x.rarity] !== false)
      .filter(x => (q ? (x.name.toLowerCase().includes(q) || (x.desc||'').toLowerCase().includes(q)) : true))
      .sort((a, b) => {
        // Sort by completion status (uncompleted first) then by rarity
        if (a.earned !== b.earned) return a.earned ? 1 : -1;
        return (order[b.rarity] - order[a.rarity]) || a.name.localeCompare(b.name);
      });

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
  }, [achEarned, challenges, query, rarityFilter, status])

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

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar with Challenge Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-white/10 rounded-lg p-4 bg-black/20 backdrop-blur-sm">
              <h3 className="text-sm font-medium mb-3 text-neutral-200">Challenges</h3>
              <p className="text-xs text-neutral-400 mb-3">
                {challenges.length > 0 
                  ? `You have ${challenges.filter(c => !c.completed).length} pending challenge${challenges.filter(c => !c.completed).length !== 1 ? 's' : ''}`
                  : 'No challenges yet. Be the first to suggest one!'
                }
              </p>
              <button
                onClick={() => setShowChallengeForm(!showChallengeForm)}
                className="w-full text-center text-sm py-2 px-4 bg-white/5 hover:bg-white/10 rounded transition-colors mb-4"
              >
                {showChallengeForm ? 'Hide Form' : 'Suggest a Challenge'}
              </button>
              
              {showChallengeForm && (
                <div className="mt-2">
                  <ChallengeForm onSubmit={handleNewChallenge} />
                </div>
              )}
            </div>

            {/* Filters Section */}
            <div className="border border-white/10 rounded-lg p-4 bg-black/20 backdrop-blur-sm">
              <div className="uppercase tracking-[0.25em] text-neutral-400 text-xs mb-3">Filters</div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-neutral-300 mb-2">Rarity</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['legendary', 'epic', 'rare', 'uncommon', 'common'].map((rarity) => (
                      <label key={rarity} className="flex items-center space-x-2 text-xs">
                        <input
                          type="checkbox"
                          checked={rarityFilter[rarity]}
                          onChange={() => setRarityFilter(prev => ({
                            ...prev,
                            [rarity]: !prev[rarity]
                          }))}
                          className="rounded border-white/20 bg-black/30"
                        />
                        <span className="capitalize">{rarity}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-300 mb-2">Status</div>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'achieved', label: 'Achieved' },
                      { value: 'progress', label: 'In Progress' },
                      { value: 'todo', label: 'To Do' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setStatus(value)}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded transition-colors ${
                          status === value
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search bar */}
            <div className="relative">
              <input
                id="ach-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search achievements..."
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <kbd className="text-xs bg-black/50 px-2 py-1 rounded border border-white/10 text-neutral-400">F</kbd>
              </div>
            </div>

            {/* Achievements List */}
            <div className="space-y-6">
              {computed.earned.length > 0 && (
                <Section 
                  title="Earned" 
                  items={computed.earned} 
                  onToggleComplete={toggleChallengeComplete}
                />
              )}
              {computed.inProgress.length > 0 && (
                <Section 
                  title="In Progress" 
                  items={computed.inProgress} 
                  onToggleComplete={toggleChallengeComplete}
                />
              )}
              {computed.todo.length > 0 && (
                <Section 
                  title="To Do" 
                  items={computed.todo} 
                  subtle 
                  onToggleComplete={toggleChallengeComplete}
                />
              )}
              {!computed.earned.length && !computed.inProgress.length && !computed.todo.length && (
                <div className="text-center py-12 text-neutral-400">
                  No achievements found. Try adjusting your filters.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function Section({ title, items, variant, onToggleComplete }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 overflow-hidden">
      <div className="border-b border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-neutral-300">{title}</div>
      <div className="p-3 space-y-3">
        {items.length === 0 && <div className="text-xs text-neutral-400">No items</div>}
        {items.map(it => (
          <div 
            key={it.id} 
            onClick={() => it.isChallenge && onToggleComplete && onToggleComplete(it.id)}
            className={`group relative overflow-hidden rounded border p-3 transition-all cursor-pointer ${
              it.rarity === 'legendary' ? 'border-yellow-500/40 bg-yellow-500/10' :
              it.rarity === 'epic' ? 'border-fuchsia-500/40 bg-fuchsia-500/10' :
              it.rarity === 'rare' ? 'border-sky-500/40 bg-sky-500/10' :
              'border-white/10 bg-black/30'
            } ${
              it.earned ? 'opacity-80' : ''
            } ${
              variant === 'progress' ? 'animate-pulse' : ''
            } hover:bg-white/5 hover:border-white/20 transition-all duration-200`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                it.earned ? 'bg-green-500/20' : 'bg-white/10'
              }`}>
                {it.earned ? (
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white/60">{it.icon || '🎯'}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">{it.name}</h3>
                  {it.isChallenge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      it.rarity === 'legendary' ? 'bg-yellow-900/50 text-yellow-200' :
                      it.rarity === 'epic' ? 'bg-purple-900/50 text-purple-200' :
                      it.rarity === 'rare' ? 'bg-blue-900/50 text-blue-200' :
                      'bg-gray-900/50 text-gray-200'
                    }">
                      {it.rarity.charAt(0).toUpperCase() + it.rarity.slice(1)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-300">{it.desc}</p>
                {it.xp > 0 && (
                  <div className="mt-2 flex items-center text-xs text-amber-400">
                    <span>+{it.xp} XP</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <div className="mt-0.5 h-9 w-9 shrink-0 rounded bg-black/40 ring-1 ring-inset ring-white/10" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="truncate text-sm font-semibold">{it.name}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded ${it.rarity === 'legendary' ? 'bg-yellow-500/15 text-yellow-300' : it.rarity === 'epic' ? 'bg-fuchsia-500/15 text-fuchsia-300' : it.rarity === 'rare' ? 'bg-sky-500/15 text-sky-300' : 'bg-white/10 text-neutral-300'}`}>{it.rarity}</span>
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
