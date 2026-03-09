import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'

const typeIcons: Record<string, string> = {
  Logo: '◆',
  Font: 'Aa',
  Mockup: '◈',
  Photo: '◐',
  Video: '▶',
  Design: '✦',
  Document: '▤',
}

const typeColors: Record<string, string> = {
  Logo: 'text-blue-400',
  Font: 'text-purple-400',
  Mockup: 'text-amber-400',
  Photo: 'text-emerald-400',
  Video: 'text-red-400',
  Design: 'text-pink-400',
  Document: 'text-white/40',
}

export default function Vault() {
  const { assets, brands, getUserById } = useData()
  const [filter, setFilter] = useState<string>('all')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const types = ['all', 'Logo', 'Font', 'Mockup', 'Photo', 'Video', 'Design', 'Document']

  const filtered = assets.filter((a) => {
    if (filter !== 'all' && a.type !== filter) return false
    if (brandFilter !== 'all' && a.brandId !== brandFilter) return false
    return true
  })

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Asset Vault</h1>
          <p className="text-sm text-white/40 mt-1">Secure digital asset library for all brands.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
          + Upload Asset
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                filter === t
                  ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                  : 'bg-white/[0.02] text-white/40 border border-white/[0.04] hover:text-white/60'
              }`}
            >
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none"
        >
          <option value="all">All Brands</option>
          {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((asset, i) => {
          const brand = brands.find((b) => b.id === asset.brandId)
          const uploader = getUserById(asset.uploadedBy)
          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-all group cursor-pointer"
            >
              <div className="h-28 bg-gradient-to-br from-white/[0.01] to-white/[0.04] flex items-center justify-center">
                <span className={`text-3xl ${typeColors[asset.type]} opacity-30 group-hover:opacity-50 transition-opacity`}>
                  {typeIcons[asset.type]}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm text-white font-medium truncate">{asset.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-white/30">{asset.type}</span>
                  <span className="text-[10px] text-white/15">·</span>
                  <span className="text-[10px]" style={{ color: brand?.color }}>{brand?.name}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
                  <span className="text-[10px] text-white/20">{asset.size}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center">
                      <span className="text-[6px] text-white/40">{uploader?.avatar}</span>
                    </div>
                    <span className="text-[10px] text-white/20">{asset.uploadedAt}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex items-center justify-center h-48 text-sm text-white/20">No assets found</div>
      )}
    </div>
  )
}
