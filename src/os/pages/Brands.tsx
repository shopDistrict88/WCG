import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBrands } from '../context/BrandsContext'
import { useData } from '../store/DataContext'
import BrandCreateModal from '../components/BrandCreateModal'

const brandPerformance = [
  { id: 'divergent', name: 'Divergent Studios', revenue: 82400, metric: 'revenue', color: '#8b5cf6' },
  { id: 'district88', name: 'District88', revenue: 0, metric: 'users', value: '24,000', color: '#3b82f6' },
  { id: 'canjustalllove', name: 'Canjustalllove', revenue: 14200, metric: 'revenue', color: '#f59e0b' },
  { id: 'velvair', name: 'Velvair Studios', revenue: 0, metric: 'dev', value: 'In dev', color: '#ec4899' },
  { id: 'wcgdash', name: 'WCG Dashboard', revenue: 0, metric: 'dev', value: 'In dev', color: '#10b981' },
]

export default function Brands() {
  const { brands } = useBrands()
  const { projects, tasks, getUserById } = useData()
  const [showCreate, setShowCreate] = useState(false)
  const [cloneFromId, setCloneFromId] = useState<string | null>(null)

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Brand Management</h1>
          <p className="text-sm text-white/40 mt-1">Internal workspaces for every WCG brand.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setCloneFromId(null); setShowCreate(true) }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <span>+</span> Create New Brand
          </button>
          <Link to="/os/expansion" className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm rounded-xl hover:bg-white/[0.06] transition-colors">
            Expansion Roadmap
          </Link>
        </div>
      </div>

      {/* Performance Ranking */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Top Performing Brands</h2>
          <p className="text-[10px] text-white/25 mt-0.5">Revenue, traffic, growth</p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {brandPerformance.map((b, i) => {
            const brand = brands.find((x) => x.id === b.id)
            if (!brand) return null
            return (
              <div key={b.id} className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white/40" style={{ background: `${b.color}20` }}>
                    {i + 1}
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${b.color}15` }}>
                    <span className="text-sm font-bold" style={{ color: b.color }}>{b.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{b.name}</p>
                    <p className="text-[10px] text-white/30">
                      {b.metric === 'revenue' && b.revenue > 0 ? `Revenue: $${b.revenue.toLocaleString()}` : b.value || (b.metric === 'revenue' ? '—' : 'In development')}
                    </p>
                  </div>
                </div>
                <Link to={`/os/brands/${b.id}`} className="text-[10px] text-white/25 hover:text-white/50">View →</Link>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Brand Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand, i) => {
          const brandProjects = projects.filter((p) => p.brandId === brand.id)
          const brandTasks = tasks.filter((t) => brandProjects.some((p) => p.id === t.projectId))
          const completedTasks = brandTasks.filter((t) => t.status === 'Completed').length
          const progress = brandTasks.length > 0 ? Math.round((completedTasks / brandTasks.length) * 100) : 0

          return (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <Link
                to={`/os/brands/${brand.id}`}
                className="block bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${brand.color}15` }}>
                    <span className="text-lg font-bold" style={{ color: brand.color }}>{brand.name[0]}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full border ${
                    brand.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    brand.status === 'In Development' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    {brand.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-white/90">{brand.name}</h3>
                <p className="text-xs text-white/30 mt-0.5">{brand.category}</p>
                <p className="text-xs text-white/40 mt-2 leading-relaxed line-clamp-2">{brand.description}</p>

                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-white/30">{brandProjects.length} projects · {brandTasks.length} tasks</span>
                    <span className="text-[10px] text-white/40">{progress}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: brand.color }} />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    {brand.members.slice(0, 4).map((mid) => {
                      const member = getUserById(mid)
                      return (
                        <div key={mid} className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                          <span className="text-[8px] font-medium text-white/50">{member?.avatar}</span>
                        </div>
                      )
                    })}
                    {brand.members.length > 4 && (
                      <span className="text-[10px] text-white/25 ml-1">+{brand.members.length - 4}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCloneFromId(brand.id); setShowCreate(true) }}
                    className="text-[10px] text-white/25 hover:text-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Clone this brand"
                  >
                    Clone
                  </button>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <BrandCreateModal open={showCreate} onClose={() => { setShowCreate(false); setCloneFromId(null) }} cloneFromId={cloneFromId || undefined} />
    </div>
  )
}
