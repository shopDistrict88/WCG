import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'

export default function Projects() {
  const { projects, tasks, getBrandById, getUserById } = useData()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const statuses = ['all', 'Planning', 'In Progress', 'Review', 'Completed']

  const filtered = statusFilter === 'all' ? projects : projects.filter((p) => p.status === statusFilter)

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Projects</h1>
          <p className="text-sm text-white/40 mt-1">Missions and initiatives across all brands.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
          + New Project
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
              statusFilter === s
                ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                : 'bg-white/[0.02] text-white/40 border border-white/[0.04] hover:text-white/60'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((project, i) => {
          const brand = getBrandById(project.brandId)
          const projectTasks = tasks.filter((t) => t.projectId === project.id)

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.03] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10" style={{ background: `${brand?.color}20` }}>
                      <span className="text-xs font-bold" style={{ color: brand?.color }}>{brand?.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{project.name}</h3>
                      <p className="text-[10px] text-white/30">{brand?.name}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 mt-2 ml-11">{project.description}</p>
                </div>

                <div className="flex items-center gap-4 ml-11 md:ml-0">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border whitespace-nowrap ${
                    project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    project.status === 'Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    {project.status}
                  </span>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-white/50">Due {project.deadline}</p>
                    <p className="text-[10px] text-white/25">{project.completedTasks}/{project.tasks} tasks</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 ml-11">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    {project.members.slice(0, 3).map((mid) => {
                      const m = getUserById(mid)
                      return (
                        <div key={mid} className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                          <span className="text-[7px] font-medium text-white/50">{m?.avatar}</span>
                        </div>
                      )
                    })}
                  </div>
                  <span className="text-xs text-white/40">{project.progress}%</span>
                </div>
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              {projectTasks.length > 0 && (
                <div className="mt-3 ml-11 flex gap-4 text-[10px] text-white/25">
                  <span>{projectTasks.filter((t) => t.status === 'To Do').length} to do</span>
                  <span>{projectTasks.filter((t) => t.status === 'In Progress').length} in progress</span>
                  <span>{projectTasks.filter((t) => t.status === 'Review').length} in review</span>
                  <span>{projectTasks.filter((t) => t.status === 'Completed').length} completed</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
