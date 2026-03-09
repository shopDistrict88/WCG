import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../store/DataContext'

type IdeaStatus = 'Idea' | 'Concept' | 'In Development' | 'Testing' | 'Launched'
type IdeaCategory = 'Platform Feature' | 'Product Concept' | 'Campaign Idea' | 'Brand Idea' | 'Internal Tool' | 'Experience'

interface MarketIdea {
  id: string
  title: string
  description: string
  category: IdeaCategory
  creator: string
  supports: number
  supporters: string[]
  comments: { author: string; text: string; time: string }[]
  status: IdeaStatus
  brand?: string
  brandColor?: string
  volunteers: string[]
  date: string
}

const ideas: MarketIdea[] = [
  {
    id: 'im1', title: 'District88 Sneaker Archive Feature', description: 'A page where users can catalog their sneaker collections, track value over time, and share with the community. Think "Goodreads for sneakers" — users build their shelf, rate pairs, and discover new releases.', category: 'Platform Feature', creator: 'u4', supports: 14, supporters: ['u1', 'u2', 'u3', 'u5', 'u6', 'u7', 'u8'], brand: 'District88', brandColor: '#3b82f6',
    comments: [
      { author: 'u1', text: 'This would be a huge differentiator from other marketplaces. Prioritizing.', time: '2 days ago' },
      { author: 'u6', text: 'Could add price tracking integration — users would love that.', time: '3 days ago' },
      { author: 'u4', text: 'Already have mockups ready. Happy to lead development.', time: '3 days ago' },
    ],
    volunteers: ['u4', 'u6'], status: 'Concept', date: 'Feb 28, 2026',
  },
  {
    id: 'im2', title: 'Cross-Brand Mystery Box', description: 'A limited-edition mystery box containing items from multiple WCG brands. Customers don\'t know exactly what they\'re getting, but each box is curated to a theme. Drives cross-brand discovery and creates viral unboxing content.', category: 'Product Concept', creator: 'u8', supports: 11, supporters: ['u1', 'u3', 'u5', 'u7'],
    comments: [
      { author: 'u3', text: 'Could do seasonal themes — Summer Essentials, Street Culture, etc.', time: '1 day ago' },
      { author: 'u1', text: 'Love this. Great way to introduce customers to all our brands.', time: '2 days ago' },
    ],
    volunteers: ['u8', 'u3'], status: 'Idea', date: 'Mar 2, 2026',
  },
  {
    id: 'im3', title: 'Creator Spotlight Series', description: 'Weekly video/blog series spotlighting creators, designers, and entrepreneurs in the WCG community. Each episode tells their story, shows their work, and connects them with the audience. Builds community and provides valuable content.', category: 'Campaign Idea', creator: 'u5', supports: 9, supporters: ['u1', 'u7', 'u8'],
    comments: [
      { author: 'u7', text: 'I can produce these — already have a format in mind.', time: '4 days ago' },
      { author: 'u8', text: 'Perfect for social media. Each spotlight drives engagement.', time: '5 days ago' },
    ],
    volunteers: ['u5', 'u7'], status: 'In Development', date: 'Feb 20, 2026',
  },
  {
    id: 'im4', title: 'AR Try-On for Streetwear', description: 'Augmented reality feature on the e-commerce sites letting customers virtually try on hoodies, tees, and caps before buying. Reduces returns, increases conversion, and feels futuristic.', category: 'Platform Feature', creator: 'u4', supports: 8, supporters: ['u1', 'u3'],
    comments: [
      { author: 'u1', text: 'This is forward-thinking. Research phase first.', time: '1 week ago' },
    ],
    volunteers: ['u4'], status: 'Idea', date: 'Feb 15, 2026',
  },
  {
    id: 'im5', title: 'WCG Loyalty & Rewards Program', description: 'A unified loyalty program across all WCG brands. Customers earn points from any brand and redeem across the ecosystem. Tiers unlock early access, exclusive drops, and community perks.', category: 'Brand Idea', creator: 'u2', supports: 12, supporters: ['u1', 'u5', 'u6', 'u8'],
    comments: [
      { author: 'u8', text: 'This ties the whole ecosystem together. Big impact on retention.', time: '3 days ago' },
      { author: 'u1', text: 'Top priority after current drops ship.', time: '4 days ago' },
      { author: 'u2', text: 'I can draft the points structure and tier system.', time: '5 days ago' },
    ],
    volunteers: ['u2', 'u8'], status: 'Concept', date: 'Feb 10, 2026',
  },
  {
    id: 'im6', title: 'Internal Design System Library', description: 'A shared component library and design system for all WCG digital properties. Ensures visual consistency across brands while allowing brand-specific theming. Speeds up development significantly.', category: 'Internal Tool', creator: 'u4', supports: 6, supporters: ['u3'],
    comments: [
      { author: 'u3', text: 'Yes — tired of recreating the same components for each brand site.', time: '1 week ago' },
    ],
    volunteers: ['u4', 'u3'], status: 'In Development', date: 'Feb 5, 2026',
  },
  {
    id: 'im7', title: 'Pop-Up Shop Experience', description: 'Physical pop-up shops in major cities featuring all WCG brands under one roof. Immersive experience with live DJ, photo ops, exclusive in-store drops, and community meetups.', category: 'Experience', creator: 'u1', supports: 15, supporters: ['u2', 'u3', 'u5', 'u7', 'u8'],
    comments: [
      { author: 'u8', text: 'The marketing content from this alone would be worth it.', time: '2 days ago' },
      { author: 'u5', text: 'I can handle all the visual/content production for the event.', time: '3 days ago' },
      { author: 'u2', text: 'Logistics are doable — start with one city as a test.', time: '4 days ago' },
    ],
    volunteers: ['u1', 'u2', 'u5', 'u8'], status: 'Concept', date: 'Mar 1, 2026',
  },
  {
    id: 'im8', title: 'Automated Size Recommendation', description: 'AI-powered size recommendation tool based on customer measurements and past purchase data. Reduces size-related returns by 40%+ and improves customer satisfaction.', category: 'Platform Feature', creator: 'u4', supports: 7, supporters: ['u2', 'u6'],
    comments: [
      { author: 'u2', text: 'Return rates on sizing are our biggest cost. This pays for itself.', time: '1 week ago' },
    ],
    volunteers: ['u4'], status: 'Idea', date: 'Jan 28, 2026',
  },
  {
    id: 'im9', title: 'Artist Collaboration Marketplace', description: 'A platform within District88 where independent artists can submit designs to be featured on WCG brand products. Revenue share model. Turns the community into collaborators.', category: 'Brand Idea', creator: 'u3', supports: 10, supporters: ['u1', 'u5', 'u7'], brand: 'District88', brandColor: '#3b82f6',
    comments: [
      { author: 'u1', text: 'This aligns perfectly with the WCG mission. Let\'s scope it.', time: '5 days ago' },
      { author: 'u7', text: 'Could create amazing content around each artist collab story.', time: '6 days ago' },
    ],
    volunteers: ['u3', 'u5'], status: 'Concept', date: 'Feb 22, 2026',
  },
]

function getInnovationLeaderboard(ideasList: MarketIdea[], getUserById: (id: string) => { name: string } | undefined) {
  const scores: Record<string, { name: string; ideas: number; supports: number; approved: number; leading: number }> = {}
  ideasList.forEach((idea) => {
    if (!scores[idea.creator]) {
      const user = getUserById(idea.creator)
      scores[idea.creator] = { name: user?.name || 'Unknown', ideas: 0, supports: 0, approved: 0, leading: 0 }
    }
    scores[idea.creator].ideas++
    scores[idea.creator].supports += idea.supports
    if (idea.status !== 'Idea') scores[idea.creator].approved++
    if (idea.volunteers.includes(idea.creator)) scores[idea.creator].leading++
  })
  return Object.entries(scores).sort((a, b) => b[1].supports - a[1].supports)
}

const categoryColors: Record<IdeaCategory, string> = {
  'Platform Feature': '#3b82f6',
  'Product Concept': '#ec4899',
  'Campaign Idea': '#f59e0b',
  'Brand Idea': '#8b5cf6',
  'Internal Tool': '#10b981',
  'Experience': '#6366f1',
}

const statusFlow: IdeaStatus[] = ['Idea', 'Concept', 'In Development', 'Testing', 'Launched']

export default function IdeaMarket() {
  const { getUserById } = useData()
  const [expandedId, setExpandedId] = useState<string | null>('im1')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [sortBy, setSortBy] = useState<'supports' | 'recent'>('supports')

  const leaderboard = getInnovationLeaderboard(ideas, getUserById)

  const filtered = ideas
    .filter((i) => filterCategory === 'all' || i.category === filterCategory)
    .filter((i) => filterStatus === 'all' || i.status === filterStatus)
    .sort((a, b) => sortBy === 'supports' ? b.supports - a.supports : 0)

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Idea Market</h1>
          <p className="text-sm text-white/40 mt-1">Where employees trade concepts and drive innovation.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowLeaderboard(!showLeaderboard)} className={`px-4 py-2 rounded-xl text-sm border transition-all ${showLeaderboard ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-white/[0.04] text-white/50 border-white/[0.06] hover:bg-white/[0.08]'}`}>
            Leaderboard
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">+ Submit Idea</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-blue-400">{ideas.length}</p>
          <p className="text-[10px] text-blue-400/60 mt-0.5">Total Ideas</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-purple-400">{ideas.filter((i) => i.status !== 'Idea').length}</p>
          <p className="text-[10px] text-purple-400/60 mt-0.5">Approved</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-emerald-400">{ideas.filter((i) => i.status === 'In Development' || i.status === 'Testing').length}</p>
          <p className="text-[10px] text-emerald-400/60 mt-0.5">In Progress</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-amber-400">{ideas.reduce((a, i) => a + i.supports, 0)}</p>
          <p className="text-[10px] text-amber-400/60 mt-0.5">Total Supports</p>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-pink-400">{[...new Set(ideas.flatMap((i) => i.volunteers))].length}</p>
          <p className="text-[10px] text-pink-400/60 mt-0.5">Volunteers</p>
        </div>
      </div>

      {/* Leaderboard */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/5 to-amber-600/5 border border-amber-500/20 rounded-xl">
              <div className="px-5 py-4 border-b border-amber-500/10"><h2 className="text-sm font-semibold text-amber-400">Innovation Leaderboard</h2></div>
              <div className="divide-y divide-amber-500/10">
                {leaderboard.map(([id, stats], i) => (
                  <div key={id} className="px-5 py-3 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-white/[0.06] text-white/50' : 'bg-white/[0.03] text-white/25'}`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{stats.name}</p>
                      <p className="text-[10px] text-white/30">{stats.ideas} ideas · {stats.supports} support votes · {stats.approved} approved</p>
                    </div>
                    {stats.leading > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Leading {stats.leading} project{stats.leading > 1 ? 's' : ''}</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => setFilterCategory('all')} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterCategory === 'all' ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>All</button>
          {Object.entries(categoryColors).map(([cat, color]) => (
            <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterCategory === cat ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>
              <span style={{ color }} className="mr-1">●</span>{cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => setFilterStatus('all')} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterStatus === 'all' ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>Any Status</button>
          {statusFlow.map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${filterStatus === s ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>{s}</button>
          ))}
        </div>
        <div className="ml-auto flex gap-1.5">
          <button onClick={() => setSortBy('supports')} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${sortBy === 'supports' ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>Top</button>
          <button onClick={() => setSortBy('recent')} className={`px-3 py-1.5 rounded-lg text-[11px] border transition-all ${sortBy === 'recent' ? 'bg-white/[0.1] text-white border-white/[0.1]' : 'bg-white/[0.02] text-white/30 border-white/[0.04]'}`}>Recent</button>
        </div>
      </div>

      {/* Ideas */}
      <div className="space-y-3">
        {filtered.map((idea, i) => {
          const isExpanded = expandedId === idea.id
          const creator = getUserById(idea.creator)
          const catColor = categoryColors[idea.category]
          const statusIdx = statusFlow.indexOf(idea.status)

          return (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-white/[0.02] border rounded-xl overflow-hidden transition-all ${isExpanded ? 'border-white/[0.12]' : 'border-white/[0.06] hover:border-white/[0.1]'}`}
            >
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : idea.id)}>
                <div className="flex gap-4">
                  {/* Support button */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
                    <button className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-white/30 hover:text-white/60" onClick={(e) => e.stopPropagation()}>
                      ▲
                    </button>
                    <span className="text-sm font-bold text-white">{idea.supports}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{idea.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ color: catColor, borderColor: `${catColor}30`, background: `${catColor}10` }}>{idea.category}</span>
                          {idea.brand && <span className="text-[10px]" style={{ color: idea.brandColor }}>{idea.brand}</span>}
                          <span className="text-[10px] text-white/20">by {creator?.name} · {idea.date}</span>
                        </div>
                      </div>
                      <span className="text-xs text-white/15 flex-shrink-0">{isExpanded ? '▲' : '▼'}</span>
                    </div>

                    {/* Status progress */}
                    <div className="flex items-center gap-1 mt-3">
                      {statusFlow.map((s, si) => (
                        <div key={s} className="flex items-center gap-1 flex-1">
                          <div className={`h-1.5 flex-1 rounded-full ${si <= statusIdx ? 'opacity-100' : 'opacity-100'}`} style={{ background: si <= statusIdx ? catColor : 'rgba(255,255,255,0.04)' }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] text-white/15">Idea</span>
                      <span className="text-[9px] text-white/15">Launched</span>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-white/[0.04] pt-4 space-y-4 ml-14">
                      <p className="text-sm text-white/50 leading-relaxed">{idea.description}</p>

                      {/* Volunteers */}
                      {idea.volunteers.length > 0 && (
                        <div>
                          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Volunteers</p>
                          <div className="flex gap-2">
                            {idea.volunteers.map((v) => {
                              const vol = getUserById(v)
                              return (
                                <div key={v} className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                                  <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center"><span className="text-[8px] font-bold text-white/40">{vol?.avatar}</span></div>
                                  <span className="text-[11px] text-white/50">{vol?.name}</span>
                                </div>
                              )
                            })}
                            <button className="px-3 py-1.5 text-[11px] text-white/20 border border-dashed border-white/[0.06] rounded-lg hover:border-white/[0.1] hover:text-white/40 transition-all">+ Volunteer</button>
                          </div>
                        </div>
                      )}

                      {/* Comments */}
                      {idea.comments.length > 0 && (
                        <div>
                          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Discussion</p>
                          <div className="space-y-2">
                            {idea.comments.map((c, ci) => {
                              const commenter = getUserById(c.author)
                              return (
                                <div key={ci} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center"><span className="text-[7px] font-bold text-white/40">{commenter?.avatar}</span></div>
                                    <span className="text-[11px] font-medium text-white/50">{commenter?.name}</span>
                                    <span className="text-[10px] text-white/15">{c.time}</span>
                                  </div>
                                  <p className="text-xs text-white/40 mt-1.5 ml-7">{c.text}</p>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs text-white/30 bg-white/[0.03] border border-white/[0.06] rounded-lg hover:bg-white/[0.06] transition-all">Add Comment</button>
                        <button className="px-3 py-1.5 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all">Contribute</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
