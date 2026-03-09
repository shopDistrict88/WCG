import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../store/DataContext'

const categoryIcons: Record<string, string> = {
  Onboarding: '▣',
  'Brand Guidelines': '◆',
  Workflows: '◈',
  Tutorials: '▤',
}

export default function Wiki() {
  const { wikiArticles, getUserById } = useData()
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [...new Set(wikiArticles.map((a) => a.category))]
  const filtered = searchTerm
    ? wikiArticles.filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.content.toLowerCase().includes(searchTerm.toLowerCase()))
    : wikiArticles

  const activeArticle = wikiArticles.find((a) => a.id === selectedArticle)

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Knowledge Base</h1>
          <p className="text-sm text-white/40 mt-1">Internal company wiki and documentation.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
          + New Article
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search knowledge base..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/[0.12] transition-colors"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {categories.map((cat) => {
            const catArticles = filtered.filter((a) => a.category === cat)
            if (catArticles.length === 0) return null
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-white/30">{categoryIcons[cat] || '◇'}</span>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{cat}</p>
                </div>
                <div className="space-y-1">
                  {catArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedArticle === article.id
                          ? 'bg-white/[0.08] text-white'
                          : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03]'
                      }`}
                    >
                      {article.title}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeArticle ? (
              <motion.div
                key={activeArticle.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 lg:p-8"
              >
                <div className="mb-6">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 uppercase tracking-wider">
                    {activeArticle.category}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-3 font-sans">{activeArticle.title}</h2>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-white/25">
                    <span>Last updated: {activeArticle.lastUpdated}</span>
                    <span>·</span>
                    <span>By {getUserById(activeArticle.authorId)?.name}</span>
                  </div>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{activeArticle.content}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-12 flex flex-col items-center justify-center text-center"
              >
                <span className="text-4xl text-white/5 mb-4">▤</span>
                <p className="text-sm text-white/30">Select an article to read</p>
                <p className="text-xs text-white/15 mt-1">{wikiArticles.length} articles available</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
