import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../auth'
import { useData } from '../store/DataContext'

const statusColumns = ['To Do', 'In Progress', 'Review', 'Completed'] as const

const priorityColors: Record<string, string> = {
  Urgent: 'bg-red-500',
  High: 'bg-amber-500',
  Medium: 'bg-blue-500',
  Low: 'bg-white/20',
}

export default function Tasks() {
  const { user } = useAuth()
  const { tasks: allTasks, projects, getUserById } = useData()
  const [view, setView] = useState<'board' | 'list'>('board')
  const [filterMine, setFilterMine] = useState(false)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  const displayTasks = filterMine && user ? allTasks.filter((t) => t.assigneeId === user.id) : allTasks

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Task Engine</h1>
          <p className="text-sm text-white/40 mt-1">Manage and track all work across the company.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMine(!filterMine)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${filterMine ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/[0.03] text-white/40 border border-white/[0.06]'}`}
          >
            My Tasks
          </button>
          <div className="flex bg-white/[0.03] border border-white/[0.06] rounded-lg">
            <button onClick={() => setView('board')} className={`px-3 py-1.5 text-xs rounded-l-lg transition-all ${view === 'board' ? 'bg-white/[0.08] text-white' : 'text-white/40'}`}>Board</button>
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-xs rounded-r-lg transition-all ${view === 'list' ? 'bg-white/[0.08] text-white' : 'text-white/40'}`}>List</button>
          </div>
          <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors">+ Add Task</button>
        </div>
      </div>

      {view === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {statusColumns.map((status) => {
            const columnTasks = displayTasks.filter((t) => t.status === status)
            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between px-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      status === 'To Do' ? 'bg-white/30' : status === 'In Progress' ? 'bg-blue-500' : status === 'Review' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <span className="text-xs font-medium text-white/60">{status}</span>
                  </div>
                  <span className="text-[10px] text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full">{columnTasks.length}</span>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {columnTasks.map((task, i) => {
                    const project = projects.find((p) => p.id === task.projectId)
                    const assignee = getUserById(task.assigneeId)
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${priorityColors[task.priority]}`} />
                          <span className="text-[10px] text-white/30 uppercase">{task.priority}</span>
                        </div>
                        <h4 className="text-sm font-medium text-white leading-snug">{task.title}</h4>
                        <p className="text-[10px] text-white/30 mt-1">{project?.name}</p>

                        <AnimatePresence>
                          {expandedTask === task.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-white/40 mt-3 leading-relaxed">{task.description}</p>
                              <div className="flex items-center gap-3 mt-3 text-[10px] text-white/25">
                                <span>💬 {task.comments}</span>
                                <span>📎 {task.attachments}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                              <span className="text-[7px] font-bold text-white/50">{assignee?.avatar}</span>
                            </div>
                            <span className="text-[10px] text-white/30">{assignee?.name?.split(' ')[0]}</span>
                          </div>
                          <span className="text-[10px] text-white/20">{task.dueDate}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-white/[0.06] text-[10px] text-white/30 uppercase tracking-wider">
            <span className="col-span-4">Task</span>
            <span className="col-span-2">Project</span>
            <span className="col-span-1">Priority</span>
            <span className="col-span-2">Assignee</span>
            <span className="col-span-1">Status</span>
            <span className="col-span-2">Due</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {displayTasks.map((task) => {
              const project = projects.find((p) => p.id === task.projectId)
              const assignee = getUserById(task.assigneeId)
              return (
                <div key={task.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center hover:bg-white/[0.02] transition-colors">
                  <div className="col-span-4 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priorityColors[task.priority]}`} />
                    <span className="text-sm text-white truncate">{task.title}</span>
                  </div>
                  <span className="col-span-2 text-xs text-white/30 truncate">{project?.name}</span>
                  <span className="col-span-1 text-[10px] text-white/40">{task.priority}</span>
                  <div className="col-span-2 flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[7px] font-bold text-white/50">{assignee?.avatar}</span>
                    </div>
                    <span className="text-xs text-white/40 truncate">{assignee?.name?.split(' ')[0]}</span>
                  </div>
                  <span className={`col-span-1 text-[10px] px-2 py-0.5 rounded-full border w-fit ${
                    task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    task.status === 'Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-white/5 text-white/40 border-white/10'
                  }`}>{task.status}</span>
                  <span className="col-span-2 text-xs text-white/30">{task.dueDate}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
