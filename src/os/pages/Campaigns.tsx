import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../store/DataContext'

export default function Campaigns() {
  const { campaigns, brands } = useData()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Campaign Command Center</h1>
          <p className="text-sm text-white/40 mt-1">Marketing war room for all brand campaigns.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
          + New Campaign
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-emerald-400">{campaigns.filter((c) => c.status === 'Active').length}</p>
          <p className="text-xs text-emerald-400/60 mt-1">Active Campaigns</p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <p className="text-xl font-bold text-white">{campaigns.filter((c) => c.status === 'Draft').length}</p>
          <p className="text-xs text-white/40 mt-1">Drafts</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-blue-400">{campaigns.filter((c) => c.status === 'Completed').length}</p>
          <p className="text-xs text-blue-400/60 mt-1">Completed</p>
        </div>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign, i) => {
          const brand = brands.find((b) => b.id === campaign.brandId)
          const isExpanded = expandedId === campaign.id

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-all"
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : campaign.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${brand?.color}15` }}>
                      <span className="text-sm font-bold" style={{ color: brand?.color }}>{brand?.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{campaign.name}</h3>
                      <p className="text-xs text-white/30">{brand?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border ${
                      campaign.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      campaign.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {campaign.status}
                    </span>
                    <span className="text-xs text-white/20">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/[0.04] pt-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Strategy</h4>
                        <p className="text-sm text-white/60 leading-relaxed">{campaign.strategy}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white/[0.03] rounded-xl p-3">
                          <p className="text-[10px] text-white/30 uppercase">Budget</p>
                          <p className="text-sm font-medium text-white mt-1">{campaign.budget}</p>
                        </div>
                        <div className="bg-white/[0.03] rounded-xl p-3">
                          <p className="text-[10px] text-white/30 uppercase">Reach</p>
                          <p className="text-sm font-medium text-white mt-1">{campaign.reach}</p>
                        </div>
                        <div className="bg-white/[0.03] rounded-xl p-3">
                          <p className="text-[10px] text-white/30 uppercase">Start</p>
                          <p className="text-sm font-medium text-white mt-1">{campaign.startDate}</p>
                        </div>
                        <div className="bg-white/[0.03] rounded-xl p-3">
                          <p className="text-[10px] text-white/30 uppercase">End</p>
                          <p className="text-sm font-medium text-white mt-1">{campaign.endDate}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                          <h4 className="text-xs font-medium text-white/50 mb-2">Teaser Content</h4>
                          <div className="space-y-1.5 text-xs text-white/40">
                            <p>• Social media teasers</p>
                            <p>• Email preview campaign</p>
                            <p>• Countdown graphics</p>
                          </div>
                        </div>
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                          <h4 className="text-xs font-medium text-white/50 mb-2">Influencer Collabs</h4>
                          <div className="space-y-1.5 text-xs text-white/40">
                            <p>• Outreach in progress</p>
                            <p>• 3 confirmed partners</p>
                            <p>• Content drops scheduled</p>
                          </div>
                        </div>
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                          <h4 className="text-xs font-medium text-white/50 mb-2">Launch Timeline</h4>
                          <div className="space-y-1.5 text-xs text-white/40">
                            <p>• Week 1: Teasers</p>
                            <p>• Week 2: Pre-orders</p>
                            <p>• Week 3: Full launch</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/os/campaigns/${campaign.id}`}
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl text-xs text-red-400 hover:from-red-500/20 hover:to-red-600/20 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Enter War Room
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
