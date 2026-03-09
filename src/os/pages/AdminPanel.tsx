import { motion } from 'framer-motion'
import { useAuth } from '../auth'
import { useData } from '../store/DataContext'

export default function AdminPanel() {
  const { isAdmin, auditLogs } = useAuth()
  const { users, brands, projects, tasks, campaigns, getUserById } = useData()

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="text-4xl text-white/5 block mb-4">⬡</span>
          <p className="text-sm text-white/40">Access Restricted</p>
          <p className="text-xs text-white/20 mt-1">This panel is available to Admins only.</p>
        </div>
      </div>
    )
  }

  const completedTasks = tasks.filter((t) => t.status === 'Completed').length
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length

  const employeeProductivity = users.map((u) => {
    const userTasks = tasks.filter((t) => t.assigneeId === u.id)
    const completed = userTasks.filter((t) => t.status === 'Completed').length
    return { ...u, totalTasks: userTasks.length, completedTasks: completed, rate: userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0 }
  }).sort((a, b) => b.rate - a.rate)

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">CEO Command Panel</h1>
        <p className="text-sm text-white/40 mt-1">Executive overview of the entire organization.</p>
      </div>

      {/* System alerts */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-sm text-blue-400">⬡</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">System Status: Operational</h3>
            <p className="text-xs text-white/40 mt-0.5">{brands.length} brands active · {projects.length} projects tracked · {users.length} team members</p>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Brands', value: brands.length, color: 'text-blue-400' },
          { label: 'Active Projects', value: projects.filter((p) => p.status === 'In Progress').length, color: 'text-purple-400' },
          { label: 'Total Tasks', value: tasks.length, color: 'text-white' },
          { label: 'Completed', value: completedTasks, color: 'text-emerald-400' },
          { label: 'In Progress', value: inProgressTasks, color: 'text-amber-400' },
          { label: 'Team Size', value: users.length, color: 'text-pink-400' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center"
          >
            <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[10px] text-white/30 mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Brand Activity Overview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl"
        >
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Brand Activity</h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {brands.map((brand) => {
              const brandProjects = projects.filter((p) => p.brandId === brand.id)
              const brandTasks = tasks.filter((t) => brandProjects.some((p) => p.id === t.projectId))
              const brandCampaigns = campaigns.filter((c) => c.brandId === brand.id)
              const progress = brandTasks.length > 0
                ? Math.round((brandTasks.filter((t) => t.status === 'Completed').length / brandTasks.length) * 100)
                : 0

              return (
                <div key={brand.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10" style={{ background: `${brand.color}20` }}>
                        <span className="text-xs font-bold" style={{ color: brand.color }}>{brand.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{brand.name}</p>
                        <p className="text-[10px] text-white/25">{brandProjects.length} projects · {brandCampaigns.length} campaigns</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium" style={{ color: brand.color }}>{progress}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${progress}%`, background: brand.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Employee Productivity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl"
        >
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Employee Productivity</h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {employeeProductivity.map((emp) => (
              <div key={emp.id} className="px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-white/60">{emp.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white truncate">{emp.name}</p>
                    <span className="text-xs text-white/40">{emp.completedTasks}/{emp.totalTasks}</span>
                  </div>
                  <div className="mt-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${emp.rate >= 70 ? 'bg-emerald-500' : emp.rate >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${emp.rate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Audit Log */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl"
      >
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white">Audit Log</h3>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {auditLogs.slice(0, 10).map((log) => {
            const logUser = getUserById(log.userId)
            return (
              <div key={log.id} className="px-5 py-3 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold text-white/50">{logUser?.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/60">
                    <span className="text-white/80 font-medium">{logUser?.name}</span>{' '}
                    {log.action}{' '}
                    <span className="text-white/50">{log.target}</span>
                  </p>
                </div>
                <span className="text-[10px] text-white/20 flex-shrink-0">
                  {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add New Brand', icon: '◈' },
            { label: 'Create Project', icon: '▣' },
            { label: 'Invite Team Member', icon: '◎' },
            { label: 'Launch Campaign', icon: '◉' },
          ].map((action) => (
            <button
              key={action.label}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group"
            >
              <span className="text-xl text-white/10 group-hover:text-white/20 transition-colors block mb-2">{action.icon}</span>
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
