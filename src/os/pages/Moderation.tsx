import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'
import { useAuth } from '../auth'

export default function Moderation() {
  const { addAuditLog } = useAuth()
  const { moderationItems, setModerationItems } = useData()
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = filterStatus === 'all' ? moderationItems : moderationItems.filter((i) => i.status === filterStatus)
  const pending = moderationItems.filter((i) => i.status === 'Pending').length

  const handleAction = (id: string, action: 'Approved' | 'Removed' | 'Dismissed') => {
    setModerationItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: action } : i)))
    addAuditLog(`Moderation: ${action} content`, id)
  }

  const typeIcons: Record<string, string> = { Post: '▤', Comment: '◫', User: '◎' }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Moderation Center</h1>
          <p className="text-sm text-white/40 mt-1">Community content review and moderation tools.</p>
        </div>
        {pending > 0 && (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {pending} pending review{pending !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Pending', value: moderationItems.filter((i) => i.status === 'Pending').length, color: 'text-amber-400' },
          { label: 'Approved', value: moderationItems.filter((i) => i.status === 'Approved').length, color: 'text-emerald-400' },
          { label: 'Removed', value: moderationItems.filter((i) => i.status === 'Removed').length, color: 'text-red-400' },
          { label: 'Dismissed', value: moderationItems.filter((i) => i.status === 'Dismissed').length, color: 'text-white/40' },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-white/30 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {['all', 'Pending', 'Approved', 'Removed', 'Dismissed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              filterStatus === s ? 'bg-white/[0.1] text-white border border-white/[0.1]' : 'bg-white/[0.02] text-white/40 border border-white/[0.04]'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <span className="text-xs text-white/30">{typeIcons[item.type]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{item.type} Report</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        item.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        item.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status === 'Removed' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-white/5 text-white/40 border-white/10'
                      }`}>{item.status}</span>
                    </div>
                    <p className="text-[10px] text-white/25 mt-0.5">Reported by {item.reportedBy} · {item.date}</p>
                  </div>
                </div>

                <div className="ml-11">
                  <p className="text-xs text-white/40 mb-1"><span className="text-white/25">Reason:</span> {item.reason}</p>
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg px-4 py-3 mt-2">
                    <p className="text-xs text-white/50 italic">"{item.content}"</p>
                  </div>
                </div>
              </div>

              {item.status === 'Pending' && (
                <div className="flex gap-2 ml-11 sm:ml-0">
                  <button
                    onClick={() => handleAction(item.id, 'Approved')}
                    className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg hover:bg-emerald-500/20 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'Removed')}
                    className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'Dismissed')}
                    className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] text-white/40 text-xs rounded-lg hover:bg-white/[0.06] transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
