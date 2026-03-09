import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'

export default function Photoshoots() {
  const { photoshoots, brands, getUserById } = useData()
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Photoshoot Management</h1>
          <p className="text-sm text-white/40 mt-1">Plan and organize all creative productions.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
          + Schedule Shoot
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photoshoots.map((shoot, i) => {
          const brand = brands.find((b) => b.id === shoot.brandId)
          return (
            <motion.div
              key={shoot.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-all"
            >
              <div className="h-32 bg-gradient-to-br from-white/[0.02] to-white/[0.05] flex items-center justify-center relative">
                <span className="text-4xl text-white/5">◐</span>
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border ${
                    shoot.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    shoot.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {shoot.status}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">{shoot.concept}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]" style={{ color: brand?.color }}>
                      {brand?.name}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Location</p>
                    <p className="text-xs text-white/60 mt-0.5">{shoot.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Date</p>
                    <p className="text-xs text-white/60 mt-0.5">{shoot.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Shots</p>
                    <p className="text-xs text-white/60 mt-0.5">{shoot.shotCount > 0 ? shoot.shotCount : 'TBD'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Team</p>
                    <p className="text-xs text-white/60 mt-0.5">{shoot.teamMembers.length} members</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1">
                    {shoot.teamMembers.map((mid) => {
                      const m = getUserById(mid)
                      return (
                        <div key={mid} className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                          <span className="text-[8px] font-medium text-white/50">{m?.avatar}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {shoot.status !== 'Completed' && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] text-white/30 uppercase tracking-wider">Checklist</h4>
                    <div className="space-y-1.5">
                      {['Shot list', 'Outfits & props', 'Equipment', 'Location confirmed'].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-xs text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                          <input type="checkbox" className="rounded border-white/20 bg-white/[0.04]" />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
