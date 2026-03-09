import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'

const categoryColors: Record<string, string> = {
  Product: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Brand: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Marketing: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Website: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export default function Ideas() {
  const { ideas, setIdeas, getUserById } = useData()
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes')

  const sorted = [...ideas].sort((a, b) =>
    sortBy === 'votes' ? b.votes - a.votes : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const handleVote = (id: string) => {
    setIdeas((prev) => prev.map((idea) => idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea))
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Idea Lab</h1>
          <p className="text-sm text-white/40 mt-1">Internal innovation hub — submit and vote on ideas.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
          + Submit Idea
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSortBy('votes')}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy === 'votes' ? 'bg-white/[0.1] text-white border border-white/[0.1]' : 'bg-white/[0.02] text-white/40 border border-white/[0.04]'}`}
        >
          Top Voted
        </button>
        <button
          onClick={() => setSortBy('recent')}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy === 'recent' ? 'bg-white/[0.1] text-white border border-white/[0.1]' : 'bg-white/[0.02] text-white/40 border border-white/[0.04]'}`}
        >
          Most Recent
        </button>
      </div>

      <div className="space-y-3">
        {sorted.map((idea, i) => {
          const author = getUserById(idea.authorId)
          return (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-all"
            >
              <div className="flex gap-4">
                {/* Vote button */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleVote(idea.id)}
                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] flex items-center justify-center transition-all group"
                  >
                    <span className="text-xs text-white/30 group-hover:text-white/60">▲</span>
                  </button>
                  <span className="text-sm font-bold text-white">{idea.votes}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-white">{idea.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[idea.category] || 'bg-white/5 text-white/40 border-white/10'}`}>
                      {idea.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      idea.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      idea.status === 'Under Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      idea.status === 'Implemented' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {idea.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mt-2 leading-relaxed">{idea.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-[10px] text-white/25">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center">
                        <span className="text-[6px] text-white/40">{author?.avatar}</span>
                      </div>
                      <span>{author?.name}</span>
                    </div>
                    <span>·</span>
                    <span>{idea.createdAt}</span>
                    <span>·</span>
                    <span>💬 {idea.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
