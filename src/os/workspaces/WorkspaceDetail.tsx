import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { getWorkspaceById } from './data'
import ToolCard from './ToolCard'

export default function WorkspaceDetail() {
  const { workspaceId } = useParams()
  const workspace = getWorkspaceById(workspaceId || '')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white/40">Workspace not found</p>
      </div>
    )
  }

  const toolTypes = ['all', ...new Set(workspace.tools.map((t) => t.type))]

  const filtered = workspace.tools.filter((t) => {
    if (typeFilter !== 'all' && t.type !== typeFilter) return false
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    return true
  })

  const activeCount = workspace.tools.filter((t) => t.status === 'active').length
  const alertCount = workspace.tools.filter((t) => t.status === 'alert').length

  return (
    <div className="space-y-6 max-w-full">
      {/* Back + Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/os/workspaces" className="text-xs text-white/30 hover:text-white/50 transition-colors">
          ← All Workspaces
        </Link>
        <div className="flex items-center gap-4 mt-3">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0"
            style={{ background: `${workspace.color}15` }}
          >
            <span className="text-2xl" style={{ color: workspace.color }}>{workspace.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-sans">{workspace.title}</h1>
            <p className="text-sm text-white/40">{workspace.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <p className="text-xl font-bold text-white">{workspace.tools.length}</p>
          <p className="text-[10px] text-white/30 mt-1">Total Tools</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-emerald-400">{activeCount}</p>
          <p className="text-[10px] text-emerald-400/50 mt-1">Active</p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <p className="text-xl font-bold text-white/50">{workspace.tools.filter((t) => t.status === 'idle').length}</p>
          <p className="text-[10px] text-white/30 mt-1">Idle</p>
        </div>
        {alertCount > 0 ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-xl font-bold text-red-400">{alertCount}</p>
            <p className="text-[10px] text-red-400/50 mt-1">Alerts</p>
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xl font-bold text-emerald-400">0</p>
            <p className="text-[10px] text-white/30 mt-1">Alerts</p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {toolTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-all ${
                typeFilter === type
                  ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                  : 'bg-white/[0.02] text-white/35 border border-white/[0.04] hover:text-white/55'
              }`}
            >
              {type === 'all' ? 'All Tools' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {['all', 'active', 'idle', 'alert'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                  : 'bg-white/[0.02] text-white/35 border border-white/[0.04] hover:text-white/55'
              }`}
            >
              {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} color={workspace.color} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex items-center justify-center h-40 text-sm text-white/20">
          No tools match the current filters
        </div>
      )}
    </div>
  )
}
