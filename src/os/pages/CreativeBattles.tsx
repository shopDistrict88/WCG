import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../store/DataContext'

type BattleStatus = 'open' | 'voting' | 'completed'

interface Submission {
  id: string
  designerId: string
  name: string
  votes: number
  comments: { author: string; text: string }[]
  isChampion?: boolean
}

interface Battle {
  id: string
  title: string
  brief: string
  brand?: string
  brandColor?: string
  deadline: string
  status: BattleStatus
  submissions: Submission[]
  prize?: string
}

const battles: Battle[] = [
  {
    id: 'b1', title: 'NOVA Campaign Hero Visual', brief: 'Design the main hero image for the NOVA Collection marketing campaign. Must capture the space-inspired, futuristic aesthetic of Divergent Studios. Will be used across web, social, and email.', brand: 'Divergent Studios', brandColor: '#8b5cf6', deadline: 'Mar 20, 2026', status: 'voting', prize: 'Lead designer credit on campaign',
    submissions: [
      { id: 's1', designerId: 'u3', name: 'Cosmic Drift', votes: 7, comments: [{ author: 'u1', text: 'The gradient work is incredible.' }, { author: 'u5', text: 'This captures the vibe perfectly.' }] },
      { id: 's2', designerId: 'u7', name: 'Stellar Impact', votes: 5, comments: [{ author: 'u8', text: 'Strong composition. Love the typography.' }] },
      { id: 's3', designerId: 'u5', name: 'Nebula Core', votes: 4, comments: [{ author: 'u3', text: 'Bold choice. The color palette is fire.' }, { author: 'u1', text: 'Very unique approach.' }] },
    ],
  },
  {
    id: 'b2', title: 'PS2 Collection Logo Mark', brief: 'Create a logo mark for the PS2 streetwear collection by Velvair Studios. Should blend urban culture with artistic edge. Must work at small sizes and on dark/light backgrounds.', brand: 'Velvair Studios', brandColor: '#ec4899', deadline: 'Mar 25, 2026', status: 'open',
    submissions: [
      { id: 's4', designerId: 'u3', name: 'Edge Protocol', votes: 0, comments: [] },
      { id: 's5', designerId: 'u7', name: 'Street Canvas', votes: 0, comments: [] },
    ],
  },
  {
    id: 'b3', title: 'Spring Love Social Template Set', brief: 'Design a set of 5 social media post templates for the Canjustalllove Spring Love campaign. Pastel tones, inclusive imagery direction, and empowering typography.', brand: 'Canjustalllove', brandColor: '#f59e0b', deadline: 'Mar 10, 2026', status: 'completed', prize: 'Feature credit + bonus',
    submissions: [
      { id: 's6', designerId: 'u7', name: 'Bloom Series', votes: 9, isChampion: true, comments: [{ author: 'u1', text: 'Perfect for the brand. Champion.' }, { author: 'u5', text: 'Beautiful work. Using this.' }, { author: 'u8', text: 'Engagement will be through the roof.' }] },
      { id: 's7', designerId: 'u3', name: 'Radiance Pack', votes: 6, comments: [{ author: 'u5', text: 'Clean and on-brand. Very close second.' }] },
      { id: 's8', designerId: 'u5', name: 'Warmth Flow', votes: 3, comments: [{ author: 'u3', text: 'Great color direction.' }] },
    ],
  },
  {
    id: 'b4', title: 'District88 App Icon Redesign', brief: 'Redesign the District88 app icon. Must be recognizable at 64x64, work on both iOS and Android, and represent sneaker/streetwear marketplace culture.', brand: 'District88', brandColor: '#3b82f6', deadline: 'Apr 5, 2026', status: 'open',
    submissions: [],
  },
  {
    id: 'b5', title: 'WCG OS Loading Animation', brief: 'Create a 2-3 second loading animation for the Wilson Collective OS. Should feel futuristic and premium. Think startup-grade internal platform.', deadline: 'Apr 1, 2026', status: 'open',
    submissions: [],
  },
]

function getDesignerStats(getUserById: (id: string) => { name: string } | undefined) {
  const stats: Record<string, { name: string; wins: number; submissions: number; totalVotes: number }> = {}
  battles.forEach((b) => {
    b.submissions.forEach((s) => {
      const user = getUserById(s.designerId)
      if (!stats[s.designerId]) stats[s.designerId] = { name: user?.name || 'Unknown', wins: 0, submissions: 0, totalVotes: 0 }
      stats[s.designerId].submissions++
      stats[s.designerId].totalVotes += s.votes
      if (s.isChampion) stats[s.designerId].wins++
    })
  })
  return Object.entries(stats).sort((a, b) => b[1].wins - a[1].wins || b[1].totalVotes - a[1].totalVotes)
}

const statusConfig: Record<BattleStatus, { label: string; className: string }> = {
  open: { label: 'Accepting Submissions', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  voting: { label: 'Voting Phase', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  completed: { label: 'Champion Selected', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
}

export default function CreativeBattles() {
  const { getUserById } = useData()
  const [expandedId, setExpandedId] = useState<string | null>('b1')
  const [showScoreboard, setShowScoreboard] = useState(false)
  const scoreboard = getDesignerStats(getUserById)

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Creative Battle Mode</h1>
          <p className="text-sm text-white/40 mt-1">Designers compete on ideas. The best concept wins.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowScoreboard(!showScoreboard)} className={`px-4 py-2 rounded-xl text-sm border transition-all ${showScoreboard ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-white/[0.04] text-white/50 border-white/[0.06] hover:bg-white/[0.08]'}`}>
            Scoreboard
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">+ New Challenge</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-blue-400">{battles.filter((b) => b.status === 'open').length}</p>
          <p className="text-[10px] text-blue-400/60 mt-0.5">Open Battles</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-amber-400">{battles.filter((b) => b.status === 'voting').length}</p>
          <p className="text-[10px] text-amber-400/60 mt-0.5">In Voting</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-emerald-400">{battles.reduce((a, b) => a + b.submissions.length, 0)}</p>
          <p className="text-[10px] text-emerald-400/60 mt-0.5">Total Submissions</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-purple-400">{battles.filter((b) => b.status === 'completed').length}</p>
          <p className="text-[10px] text-purple-400/60 mt-0.5">Champions Crowned</p>
        </div>
      </div>

      {/* Scoreboard */}
      <AnimatePresence>
        {showScoreboard && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/5 to-amber-600/5 border border-amber-500/20 rounded-xl">
              <div className="px-5 py-4 border-b border-amber-500/10"><h2 className="text-sm font-semibold text-amber-400">Designer Scoreboard</h2></div>
              <div className="divide-y divide-amber-500/10">
                {scoreboard.map(([id, stats], i) => (
                  <div key={id} className="px-5 py-3 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-white/[0.06] text-white/50' : 'bg-white/[0.03] text-white/25'}`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{stats.name}</p>
                      <p className="text-[10px] text-white/30">{stats.submissions} submissions · {stats.totalVotes} total votes</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {stats.wins > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {stats.wins} win{stats.wins > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Battles */}
      <div className="space-y-3">
        {battles.map((battle, bi) => {
          const isExpanded = expandedId === battle.id
          const sCfg = statusConfig[battle.status]
          const champion = battle.submissions.find((s) => s.isChampion)

          return (
            <motion.div
              key={battle.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: bi * 0.04 }}
              className={`bg-white/[0.02] border rounded-xl overflow-hidden transition-all ${isExpanded ? 'border-white/[0.12]' : 'border-white/[0.06] hover:border-white/[0.1]'}`}
            >
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : battle.id)}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">{battle.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${sCfg.className}`}>{sCfg.label}</span>
                      {champion && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Winner: {champion.name}</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-white/25">
                      {battle.brand && <span style={{ color: battle.brandColor }}>{battle.brand}</span>}
                      <span>Deadline: {battle.deadline}</span>
                      <span>{battle.submissions.length} submission{battle.submissions.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <span className="text-xs text-white/15">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-white/[0.04] pt-4 space-y-4">
                      {/* Brief */}
                      <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-4">
                        <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Creative Brief</p>
                        <p className="text-sm text-white/60 leading-relaxed">{battle.brief}</p>
                        {battle.prize && <p className="text-[10px] text-amber-400 mt-2">Prize: {battle.prize}</p>}
                      </div>

                      {/* Submissions gallery */}
                      {battle.submissions.length > 0 ? (
                        <div>
                          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-3">Submissions</p>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {battle.submissions
                              .sort((a, b) => b.votes - a.votes)
                              .map((sub) => {
                                const designer = getUserById(sub.designerId)
                                return (
                                  <div key={sub.id} className={`bg-white/[0.02] border rounded-xl overflow-hidden ${sub.isChampion ? 'border-amber-500/30 bg-amber-500/[0.03]' : 'border-white/[0.06]'}`}>
                                    {/* Visual placeholder */}
                                    <div className="h-32 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${battle.brandColor || '#666'}10, ${battle.brandColor || '#666'}05)` }}>
                                      <span className="text-3xl text-white/10">✦</span>
                                      {sub.isChampion && (
                                        <div className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Champion</div>
                                      )}
                                    </div>
                                    <div className="p-3">
                                      <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-white">{sub.name}</h4>
                                        <div className="flex items-center gap-1">
                                          <span className="text-[10px] text-white/30">▲</span>
                                          <span className="text-xs font-medium text-white/60">{sub.votes}</span>
                                        </div>
                                      </div>
                                      <p className="text-[10px] text-white/25 mt-0.5">by {designer?.name}</p>
                                      {sub.comments.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                          {sub.comments.slice(0, 2).map((c, ci) => {
                                            const commenter = getUserById(c.author)
                                            return (
                                              <p key={ci} className="text-[10px] text-white/20">
                                                <span className="text-white/35">{commenter?.name?.split(' ')[0]}</span>: {c.text}
                                              </p>
                                            )
                                          })}
                                          {sub.comments.length > 2 && <p className="text-[10px] text-white/15">+{sub.comments.length - 2} more</p>}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-white/[0.02] border border-dashed border-white/[0.06] rounded-xl">
                          <p className="text-white/20 text-sm">No submissions yet</p>
                          <p className="text-[10px] text-white/10 mt-1">Be the first to submit a concept</p>
                          <button className="mt-3 px-4 py-2 bg-blue-600/20 text-blue-400 text-xs rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-500/20">Submit Design</button>
                        </div>
                      )}
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
