import { motion } from 'framer-motion'
import type { Tool } from './data'

const typeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  tracker: 'Tracker',
  manager: 'Manager',
  monitor: 'Monitor',
  builder: 'Builder',
  calendar: 'Calendar',
  inbox: 'Inbox',
  library: 'Library',
  reports: 'Reports',
  system: 'System',
  editor: 'Editor',
  analytics: 'Analytics',
}

const statusIndicator: Record<string, string> = {
  active: 'bg-emerald-500',
  idle: 'bg-white/20',
  alert: 'bg-red-500 animate-pulse',
}

interface ToolCardProps {
  tool: Tool
  index: number
  color: string
}

export default function ToolCard({ tool, index, color }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.12] transition-all group"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusIndicator[tool.status]}`} />
          <h3 className="text-xs font-semibold text-white truncate">{tool.name}</h3>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/25 border border-white/[0.06] flex-shrink-0 ml-2">
          {typeLabels[tool.type]}
        </span>
      </div>

      {/* Metric */}
      {tool.metric && (
        <div className="px-4 pt-3 pb-1">
          <p className="text-2xl font-bold text-white" style={{ color }}>{tool.metric}</p>
          <p className="text-[10px] text-white/30 mt-0.5">{tool.metricLabel}</p>
        </div>
      )}

      {/* Items */}
      {tool.items && tool.items.length > 0 && (
        <div className="px-4 py-2 space-y-1.5">
          {tool.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                {item.status && (
                  <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                    item.status === 'good' ? 'bg-emerald-500' :
                    item.status === 'warn' ? 'bg-amber-500' :
                    'bg-red-500'
                  }`} />
                )}
                <span className="text-[11px] text-white/40 truncate">{item.label}</span>
              </div>
              <span className={`text-[11px] flex-shrink-0 ml-2 ${
                item.status === 'good' ? 'text-emerald-400/70' :
                item.status === 'warn' ? 'text-amber-400/70' :
                item.status === 'bad' ? 'text-red-400/70' :
                'text-white/30'
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2 border-t border-white/[0.03] mt-1">
        <p className="text-[10px] text-white/15 leading-relaxed truncate">{tool.description}</p>
      </div>
    </motion.div>
  )
}
