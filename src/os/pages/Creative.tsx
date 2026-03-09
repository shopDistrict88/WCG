import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'

const categories = ['All', 'Logos', 'Clothing Graphics', 'Website UI', 'Brand Identity', 'Marketing Visuals']

interface DesignFile {
  id: string
  name: string
  category: string
  brandId: string
  status: 'Draft' | 'In Review' | 'Approved' | 'Revision Needed'
  version: number
  createdBy: string
  lastModified: string
  comments: number
}

const designFiles: DesignFile[] = [
  { id: 'd1', name: 'NOVA Collection Key Visual', category: 'Clothing Graphics', brandId: 'divergent', status: 'In Review', version: 3, createdBy: 'u3', lastModified: '2026-03-05', comments: 4 },
  { id: 'd2', name: 'District88 App Icon Set', category: 'Logos', brandId: 'district88', status: 'Approved', version: 5, createdBy: 'u3', lastModified: '2026-03-01', comments: 8 },
  { id: 'd3', name: 'Canjustalllove Spring Banner', category: 'Marketing Visuals', brandId: 'canjustalllove', status: 'Draft', version: 1, createdBy: 'u5', lastModified: '2026-03-04', comments: 1 },
  { id: 'd4', name: 'Velvair PS2 Hoodie Mockup', category: 'Clothing Graphics', brandId: 'velvair', status: 'Approved', version: 2, createdBy: 'u3', lastModified: '2026-02-28', comments: 3 },
  { id: 'd5', name: 'WCG Dashboard Login Screen', category: 'Website UI', brandId: 'wcgdash', status: 'In Review', version: 4, createdBy: 'u4', lastModified: '2026-03-03', comments: 6 },
  { id: 'd6', name: 'Divergent Studios Brand Guide', category: 'Brand Identity', brandId: 'divergent', status: 'Approved', version: 2, createdBy: 'u5', lastModified: '2026-02-20', comments: 5 },
  { id: 'd7', name: 'District88 Homepage Hero', category: 'Website UI', brandId: 'district88', status: 'Draft', version: 1, createdBy: 'u4', lastModified: '2026-03-06', comments: 0 },
  { id: 'd8', name: 'WCG Master Brand Kit', category: 'Brand Identity', brandId: 'wcgdash', status: 'Approved', version: 7, createdBy: 'u3', lastModified: '2026-01-15', comments: 12 },
]

const statusColors: Record<string, string> = {
  Draft: 'bg-white/5 text-white/40 border-white/10',
  'In Review': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Revision Needed': 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function Creative() {
  const { brands, getUserById } = useData()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? designFiles : designFiles.filter((d) => d.category === activeCategory)

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Creative Studio</h1>
          <p className="text-sm text-white/40 mt-1">Design production hub for all creative work.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">
          + Upload Design
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
              activeCategory === c
                ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                : 'bg-white/[0.02] text-white/40 border border-white/[0.04] hover:text-white/60'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((file, i) => {
          const brand = brands.find((b) => b.id === file.brandId)
          const creator = getUserById(file.createdBy)
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-all group"
            >
              {/* Preview area */}
              <div className="h-40 bg-gradient-to-br from-white/[0.02] to-white/[0.04] flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-2xl text-white/10">
                    {file.category === 'Logos' ? '◆' : file.category === 'Clothing Graphics' ? '◈' : file.category === 'Website UI' ? '▣' : file.category === 'Brand Identity' ? '◎' : '✦'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border ${statusColors[file.status]}`}>
                    {file.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-white">{file.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]" style={{ color: brand?.color }}>
                    {brand?.name}
                  </span>
                  <span className="text-[10px] text-white/25">{file.category}</span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                      <span className="text-[7px] font-bold text-white/50">{creator?.avatar}</span>
                    </div>
                    <span className="text-[10px] text-white/30">{creator?.name?.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/25">
                    <span>v{file.version}</span>
                    <span>💬 {file.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
