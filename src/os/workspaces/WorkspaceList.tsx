import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { workspaces } from './data'

export default function WorkspaceList() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">Role Workspaces</h1>
        <p className="text-sm text-white/40 mt-1">Dedicated tool suites for every role in the organization.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{workspaces.length}</p>
          <p className="text-xs text-white/40 mt-1">Workspaces</p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{workspaces.reduce((a, w) => a + w.tools.length, 0)}</p>
          <p className="text-xs text-white/40 mt-1">Total Tools</p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-400">
            {workspaces.reduce((a, w) => a + w.tools.filter((t) => t.status === 'active').length, 0)}
          </p>
          <p className="text-xs text-white/40 mt-1">Active Tools</p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-red-400">
            {workspaces.reduce((a, w) => a + w.tools.filter((t) => t.status === 'alert').length, 0)}
          </p>
          <p className="text-xs text-white/40 mt-1">Alerts</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {workspaces.map((ws, i) => {
          const activeTools = ws.tools.filter((t) => t.status === 'active').length
          const alertTools = ws.tools.filter((t) => t.status === 'alert').length

          return (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/os/workspaces/${ws.id}`}
                className="block bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0"
                    style={{ background: `${ws.color}15` }}
                  >
                    <span className="text-lg" style={{ color: ws.color }}>{ws.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-white/90">{ws.title}</h3>
                    <p className="text-xs text-white/30 mt-0.5">{ws.description}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{ws.tools.length}</span>
                        <span className="text-[10px] text-white/25">tools</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-white/25">{activeTools} active</span>
                      </div>
                      {alertTools > 0 && (
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[10px] text-red-400/60">{alertTools} alert{alertTools > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>

                    {/* Tool type breakdown */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {[...new Set(ws.tools.map((t) => t.type))].slice(0, 6).map((type) => (
                        <span key={type} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-white/20">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
