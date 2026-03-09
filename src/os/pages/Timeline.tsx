import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type EventType = 'brand' | 'drop' | 'campaign' | 'partnership' | 'creative' | 'milestone' | 'team'

interface TimelineEvent {
  id: string
  date: string
  sortDate: string
  title: string
  type: EventType
  brand?: string
  brandColor?: string
  description: string
  results?: string[]
  auto: boolean
}

const events: TimelineEvent[] = [
  { id: 'te1', date: 'January 2024', sortDate: '2024-01', title: 'Wilson Collective Group LLC Founded', type: 'milestone', description: 'Wilson Collective Group LLC was officially registered as the parent company for a portfolio of creative brands and businesses spanning fashion, music, art, and digital culture.', results: ['LLC formed', 'Vision & mission defined', 'Operational blueprint created'], auto: false },
  { id: 'te2', date: 'March 2024', sortDate: '2024-03', title: 'District88 Concept Developed', type: 'brand', brand: 'District88', brandColor: '#3b82f6', description: 'The concept for District88 — a sneaker and streetwear marketplace and community hub — was developed and planning began for the platform.', results: ['Market research completed', 'Brand identity drafted', 'Core feature set defined'], auto: false },
  { id: 'te3', date: 'May 2024', sortDate: '2024-05', title: 'Divergent Studios Brand Created', type: 'brand', brand: 'Divergent Studios', brandColor: '#8b5cf6', description: 'Divergent Studios was launched as a streetwear brand blending futuristic, space-inspired designs with wearable art.', results: ['Brand identity finalized', 'First design concepts created', 'Social channels launched'], auto: true },
  { id: 'te4', date: 'June 2024', sortDate: '2024-06', title: 'Canjustalllove Brand Launch', type: 'brand', brand: 'Canjustalllove', brandColor: '#f59e0b', description: 'Canjustalllove was established as a lifestyle and fashion brand centered on self-expression, inclusivity, and positivity.', results: ['First collection conceptualized', 'Brand messaging defined', 'Community building started'], auto: true },
  { id: 'te5', date: 'July 2024', sortDate: '2024-07', title: 'Velvair Studios Established', type: 'brand', brand: 'Velvair Studios', brandColor: '#ec4899', description: 'Velvair Studios joined the WCG portfolio as a streetwear brand fusing bold, edgy fashion with artistic expression.', results: ['Brand identity created', 'Initial design direction set', 'Team assembled'], auto: true },
  { id: 'te6', date: 'August 2024', sortDate: '2024-08', title: 'First Team Members Onboarded', type: 'team', description: 'The initial core team was assembled across operations, design, and marketing roles to support multi-brand operations.', results: ['8 team members hired', 'Role assignments completed', 'Internal workflows established'], auto: false },
  { id: 'te7', date: 'October 2024', sortDate: '2024-10', title: 'WCG Dashboard Development Started', type: 'creative', brand: 'WCG Dashboard', brandColor: '#10b981', description: 'Development began on the Wilson Collective Group Dashboard — a centralized hub for creators, entrepreneurs, and innovators.', results: ['Architecture designed', 'Tech stack selected (React + Vite)', 'Core features spec\'d'], auto: true },
  { id: 'te8', date: 'December 2024', sortDate: '2024-12', title: 'First Cross-Brand Photoshoot', type: 'creative', description: 'The first multi-brand photoshoot was organized, capturing content for Divergent Studios, Velvair Studios, and Canjustalllove in a unified creative session.', results: ['200+ photos captured', 'Content for 3 brands produced', 'New creative workflow tested'], auto: true },
  { id: 'te9', date: 'January 2025', sortDate: '2025-01', title: 'WCG LLC Website Launched', type: 'milestone', description: 'The official Wilson Collective Group LLC website went live, showcasing all brands, the company vision, and career opportunities.', results: ['Full website deployed', 'Careers page with 10 roles', 'Application system integrated'], auto: false },
  { id: 'te10', date: 'February 2025', sortDate: '2025-02', title: 'Wilson Collective OS Development Begins', type: 'milestone', description: 'Development began on the internal operating system — Wilson Collective OS — to serve as the digital headquarters for the entire company.', results: ['16 core modules designed', 'Authentication system built', 'Role-based access control implemented'], auto: true },
  { id: 'te11', date: 'March 2025', sortDate: '2025-03', title: 'District88 Platform Feature Development', type: 'creative', brand: 'District88', brandColor: '#3b82f6', description: 'Active development on District88 community features, moderation tools, and marketplace functionality.', results: ['Community features in progress', 'Moderation system designed', 'Mobile UI planning started'], auto: true },
  { id: 'te12', date: 'June 2025', sortDate: '2025-06', title: 'First Influencer Partnership Program', type: 'partnership', description: 'WCG LLC launched its first structured influencer partnership program, connecting creators with brand campaigns across the portfolio.', results: ['5 influencer partnerships signed', 'Cross-brand campaign strategy', 'Content collaboration framework'], auto: false },
  { id: 'te13', date: 'September 2025', sortDate: '2025-09', title: 'Spring Love Campaign — Canjustalllove', type: 'campaign', brand: 'Canjustalllove', brandColor: '#f59e0b', description: 'The Spring Love campaign launched, centered on emotional storytelling and self-love, becoming the brand\'s first major marketing push.', results: ['32K+ reach across platforms', '6.2% engagement rate', '$4,200 in sales'], auto: true },
  { id: 'te14', date: 'January 2026', sortDate: '2026-01', title: 'WCG OS V2 — Advanced Features Deployed', type: 'milestone', description: 'Major upgrade to Wilson Collective OS including role-based dashboards, automated workflows, campaign war rooms, and product drop command centers.', results: ['5 role-based dashboards', '6 automated workflows', 'Campaign war rooms live', 'Drop command centers active'], auto: true },
  { id: 'te15', date: 'March 2026', sortDate: '2026-03', title: 'NOVA Collection Campaign Launch', type: 'campaign', brand: 'Divergent Studios', brandColor: '#8b5cf6', description: 'The NOVA campaign went live with a social media blitz, influencer partnerships, and multi-phase rollout strategy.', results: ['48K+ reach in first week', '4.8% engagement rate', '186 email signups', 'Teaser reel hit 12K views in 2 hours'], auto: true },
  { id: 'te16', date: 'April 2026', sortDate: '2026-04', title: 'NOVA Collection Drop — Divergent Studios', type: 'drop', brand: 'Divergent Studios', brandColor: '#8b5cf6', description: 'Limited edition space-themed capsule collection. 200 units per style. The biggest product release in Divergent Studios history.', results: ['4 products launched', '900 total units', 'Limited — no restock'], auto: true },
  { id: 'te17', date: 'April 2026', sortDate: '2026-04', title: 'PS2 Collection Drop — Velvair Studios', type: 'drop', brand: 'Velvair Studios', brandColor: '#ec4899', description: 'Bold, urban-inspired collection blending street culture with artistic expression. Velvair\'s debut drop.', results: ['3 products launched', '450 total units', 'Limited edition'], auto: true },
  { id: 'te18', date: 'May 2026', sortDate: '2026-05', title: 'District88 Public Launch', type: 'milestone', brand: 'District88', brandColor: '#3b82f6', description: 'District88 marketplace and community platform opened to the public after a successful beta period.', results: ['Platform live', 'Creator beta complete', 'Full marketplace active'], auto: true },
]

const typeConfig: Record<EventType, { icon: string; color: string; label: string }> = {
  brand: { icon: '◆', color: '#8b5cf6', label: 'Brand Launch' },
  drop: { icon: '◈', color: '#ec4899', label: 'Product Drop' },
  campaign: { icon: '◉', color: '#f59e0b', label: 'Campaign' },
  partnership: { icon: '◎', color: '#10b981', label: 'Partnership' },
  creative: { icon: '✦', color: '#3b82f6', label: 'Creative Project' },
  milestone: { icon: '⬡', color: '#ffffff', label: 'Company Milestone' },
  team: { icon: '◫', color: '#6366f1', label: 'Team' },
}

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterBrand, setFilterBrand] = useState<string>('all')

  const allBrands = [...new Set(events.filter((e) => e.brand).map((e) => e.brand!))]
  const filtered = events
    .filter((e) => filterType === 'all' || e.type === filterType)
    .filter((e) => filterBrand === 'all' || e.brand === filterBrand)
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate))

  const years = [...new Set(filtered.map((e) => e.sortDate.split('-')[0]))]

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">Company Timeline</h1>
        <p className="text-sm text-white/40 mt-1">The complete history of Wilson Collective Group.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Events', value: events.length, color: 'bg-white/[0.02] border-white/[0.06]' },
          { label: 'Brand Launches', value: events.filter((e) => e.type === 'brand').length, color: 'bg-purple-500/10 border-purple-500/20' },
          { label: 'Product Drops', value: events.filter((e) => e.type === 'drop').length, color: 'bg-pink-500/10 border-pink-500/20' },
          { label: 'Milestones', value: events.filter((e) => e.type === 'milestone').length, color: 'bg-blue-500/10 border-blue-500/20' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} border rounded-xl p-4`}>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => setFilterType('all')} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterType === 'all' ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>All Types</button>
          {Object.entries(typeConfig).map(([key, cfg]) => (
            <button key={key} onClick={() => setFilterType(key)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterType === key ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>
              <span style={{ color: cfg.color }} className="mr-1">{cfg.icon}</span> {cfg.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => setFilterBrand('all')} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterBrand === 'all' ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>All Brands</button>
          {allBrands.map((b) => {
            const brandEvent = events.find((e) => e.brand === b)
            return (
              <button key={b} onClick={() => setFilterBrand(b)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterBrand === b ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>
                <span style={{ color: brandEvent?.brandColor }} className="mr-1">●</span> {b}
              </button>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {years.map((year) => {
          const yearEvents = filtered.filter((e) => e.sortDate.startsWith(year))
          return (
            <div key={year}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-bold text-white/20">{year}</span>
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[10px] text-white/15">{yearEvents.length} events</span>
              </div>
              <div className="space-y-0 ml-4">
                {yearEvents.map((event, i) => {
                  const cfg = typeConfig[event.type]
                  const isExpanded = expandedId === event.id
                  return (
                    <div key={event.id} className="flex gap-4">
                      {/* Timeline spine */}
                      <div className="flex flex-col items-center w-6 flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                          style={{ borderColor: cfg.color, background: `${cfg.color}20` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
                        </motion.div>
                        {i < yearEvents.length - 1 && (
                          <div className="w-0.5 flex-1 min-h-[16px]" style={{ background: `${cfg.color}15` }} />
                        )}
                      </div>
                      {/* Event card */}
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`flex-1 mb-3 bg-white/[0.02] border rounded-xl overflow-hidden cursor-pointer transition-all ${isExpanded ? 'border-white/[0.12] bg-white/[0.04]' : 'border-white/[0.06] hover:border-white/[0.1]'}`}
                        onClick={() => setExpandedId(isExpanded ? null : event.id)}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-semibold text-white">{event.title}</h3>
                                {event.auto && <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/20 border border-white/[0.04]">AUTO</span>}
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-[10px] text-white/25">{event.date}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full border" style={{ color: cfg.color, borderColor: `${cfg.color}30`, background: `${cfg.color}10` }}>{cfg.label}</span>
                                {event.brand && <span className="text-[10px]" style={{ color: event.brandColor }}>{event.brand}</span>}
                              </div>
                            </div>
                            <span className="text-xs text-white/15 flex-shrink-0">{isExpanded ? '▲' : '▼'}</span>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                              <div className="px-4 pb-4 border-t border-white/[0.04] pt-3 space-y-3">
                                <p className="text-sm text-white/50 leading-relaxed">{event.description}</p>
                                {event.results && (
                                  <div>
                                    <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1.5">Results</p>
                                    <div className="space-y-1">
                                      {event.results.map((r, ri) => (
                                        <div key={ri} className="flex items-center gap-2">
                                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                                          <span className="text-xs text-white/40">{r}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
