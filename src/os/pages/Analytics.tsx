import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'

const trafficData = [
  { label: 'Mon', value: 1240 },
  { label: 'Tue', value: 1890 },
  { label: 'Wed', value: 2340 },
  { label: 'Thu', value: 1980 },
  { label: 'Fri', value: 2760 },
  { label: 'Sat', value: 3200 },
  { label: 'Sun', value: 2450 },
]

const maxTraffic = Math.max(...trafficData.map((d) => d.value))

const communityGrowth = [
  { month: 'Oct', members: 450 },
  { month: 'Nov', members: 620 },
  { month: 'Dec', members: 890 },
  { month: 'Jan', members: 1200 },
  { month: 'Feb', members: 1680 },
  { month: 'Mar', members: 2100 },
]

const maxMembers = Math.max(...communityGrowth.map((d) => d.members))

export default function Analytics() {
  const { projects, tasks, campaigns, brands } = useData()
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length
  const activeCampaigns = campaigns.filter((c) => c.status === 'Active').length

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">Analytics Center</h1>
        <p className="text-sm text-white/40 mt-1">Company-wide performance overview.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'Weekly Traffic', value: '14,860', change: '+12%', up: true },
          { label: 'Active Campaigns', value: activeCampaigns, change: `${campaigns.length} total`, up: true },
          { label: 'Task Completion', value: `${Math.round((completedTasks / totalTasks) * 100)}%`, change: `${completedTasks}/${totalTasks}`, up: true },
          { label: 'Community Members', value: '2,100', change: '+25%', up: true },
          { label: 'Revenue (MTD)', value: '$8,420', change: '+18%', up: true },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
          >
            <p className="text-[10px] text-white/30 uppercase tracking-wider">{s.label}</p>
            <p className="text-xl font-bold text-white mt-1">{s.value}</p>
            <p className={`text-[10px] mt-1 ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Website Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Website Traffic (Weekly)</h3>
          <div className="flex items-end gap-2 h-40">
            {trafficData.map((d, i) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxTraffic) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-blue-500/40 to-blue-400/20 rounded-t-lg relative group"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/0 group-hover:text-white/60 transition-colors whitespace-nowrap">
                    {d.value.toLocaleString()}
                  </span>
                </motion.div>
                <span className="text-[10px] text-white/25">{d.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Community Growth */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Community Growth</h3>
          <div className="flex items-end gap-3 h-40">
            {communityGrowth.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.members / maxMembers) * 100}%` }}
                  transition={{ delay: 0.35 + i * 0.05, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-emerald-500/40 to-emerald-400/20 rounded-t-lg relative group"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/0 group-hover:text-white/60 transition-colors whitespace-nowrap">
                    {d.members.toLocaleString()}
                  </span>
                </motion.div>
                <span className="text-[10px] text-white/25">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Campaign Performance */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl"
      >
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white">Campaign Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Campaign</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Brand</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Status</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Budget</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Reach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {campaigns.map((c) => {
                const brand = brands.find((b) => b.id === c.brandId)
                return (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 text-sm text-white">{c.name}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: brand?.color }}>{brand?.name}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        c.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-white/5 text-white/40 border-white/10'
                      }`}>{c.status}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-white/50">{c.budget}</td>
                    <td className="px-5 py-3 text-xs text-white/50">{c.reach}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Project Progress */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl"
      >
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white">Project Progress</h3>
        </div>
        <div className="p-5 space-y-4">
          {projects.map((p) => {
            const brand = brands.find((b) => b.id === p.brandId)
            return (
              <div key={p.id} className="flex items-center gap-4">
                <div className="w-36 flex-shrink-0">
                  <p className="text-sm text-white truncate">{p.name}</p>
                  <p className="text-[10px] text-white/25">{brand?.name}</p>
                </div>
                <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.progress}%` }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ background: brand?.color }}
                  />
                </div>
                <span className="text-xs text-white/40 w-10 text-right">{p.progress}%</span>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
