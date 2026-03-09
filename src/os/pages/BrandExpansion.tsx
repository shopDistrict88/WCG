import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBrands } from '../context/BrandsContext'

const roadmap = {
  active: [
    { id: 'district88', name: 'District88', color: '#3b82f6', desc: 'Marketplace & community platform' },
    { id: 'divergent', name: 'Divergent Studios', color: '#8b5cf6', desc: 'Streetwear & clothing' },
    { id: 'velvair', name: 'Velvair Studios', color: '#ec4899', desc: 'Bold streetwear' },
    { id: 'canjustalllove', name: 'Canjustalllove', color: '#f59e0b', desc: 'Lifestyle & fashion' },
    { id: 'wcgdash', name: 'WCG Dashboard', color: '#10b981', desc: 'Creator platform' },
  ],
  inDevelopment: [
    { name: 'Creative Studio', desc: 'Design & production studio', color: '#8b5cf6' },
    { name: 'Footwear Brand', desc: 'Sneaker & footwear concept', color: '#6366f1' },
  ],
  future: [
    { name: 'Media Platform', desc: 'Content & media arm' },
    { name: 'Artist Collective', desc: 'Artist collaboration hub' },
  ],
}

export default function BrandExpansion() {
  const { brands } = useBrands()

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">Brand Expansion Roadmap</h1>
        <p className="text-sm text-white/40 mt-1">Visual roadmap of Wilson Collective brand ecosystem.</p>
      </div>

      {/* Active Brands */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Active Brands</h2>
          <p className="text-[10px] text-white/25 mt-0.5">Live and operating</p>
        </div>
        <div className="p-5 grid md:grid-cols-2 gap-3">
          {brands.map((b) => {
            const meta = roadmap.active.find((r) => r.id === b.id)
            return (
              <Link key={b.id} to={`/os/brands/${b.id}`} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${b.color}15` }}>
                  <span className="text-sm font-bold" style={{ color: b.color }}>{b.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{b.name}</p>
                  <p className="text-[10px] text-white/30">{meta?.desc || b.category}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* In Development */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Brands In Development</h2>
          <p className="text-[10px] text-white/25 mt-0.5">Concept and build phase</p>
        </div>
        <div className="p-5 grid md:grid-cols-2 gap-3">
          {roadmap.inDevelopment.map((b, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-dashed border-white/[0.08] rounded-xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${b.color}10` }}>
                <span className="text-sm text-white/30">◇</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white/60">{b.name}</p>
                <p className="text-[10px] text-white/25">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Future Concepts */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Future Concepts</h2>
          <p className="text-[10px] text-white/25 mt-0.5">Long-term vision</p>
        </div>
        <div className="p-5 grid md:grid-cols-2 gap-3">
          {roadmap.future.map((b, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.06]">
                <span className="text-xs text-white/20">○</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white/40">{b.name}</p>
                <p className="text-[10px] text-white/20">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
