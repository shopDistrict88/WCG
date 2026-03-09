import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Drop {
  id: string
  name: string
  brand: string
  brandColor: string
  releaseDate: string
  dropType: 'Limited' | 'Open' | 'Pre-order'
  status: 'Planning' | 'Production' | 'Ready' | 'Live' | 'Completed'
  description: string
  products: { name: string; sku: string; price: string; stock: number }[]
  production: { task: string; progress: number; status: string }[]
  marketing: { item: string; status: string }[]
  media: { name: string; type: string; status: string }[]
  checklist: { item: string; done: boolean }[]
  liveMetrics?: { sales: number; revenue: string; traffic: string; conversion: string; stockRemaining: number }
}

const drops: Drop[] = [
  {
    id: 'nova',
    name: 'NOVA Collection Drop',
    brand: 'Divergent Studios',
    brandColor: '#8b5cf6',
    releaseDate: '2026-04-15',
    dropType: 'Limited',
    status: 'Production',
    description: 'Limited edition space-themed capsule collection. 200 units per style. No restock.',
    products: [
      { name: 'NOVA Hoodie', sku: 'NOV-H-001', price: '$85', stock: 200 },
      { name: 'NOVA Tee', sku: 'NOV-T-001', price: '$45', stock: 300 },
      { name: 'NOVA Joggers', sku: 'NOV-J-001', price: '$65', stock: 150 },
      { name: 'NOVA Cap', sku: 'NOV-C-001', price: '$35', stock: 250 },
    ],
    production: [
      { task: 'Fabric sourcing', progress: 100, status: 'Complete' },
      { task: 'Sample approval', progress: 100, status: 'Complete' },
      { task: 'Manufacturing', progress: 75, status: 'In Progress' },
      { task: 'Quality inspection', progress: 20, status: 'Pending' },
      { task: 'Packaging prep', progress: 0, status: 'Not Started' },
    ],
    marketing: [
      { item: 'Teaser posts scheduled', status: 'Done' },
      { item: 'Influencer packages sent', status: 'Done' },
      { item: 'Email blast designed', status: 'In Progress' },
      { item: 'Launch day social content', status: 'In Progress' },
      { item: 'Paid ads creative', status: 'Draft' },
    ],
    media: [
      { name: 'NOVA Lookbook', type: 'Photo', status: 'Shooting Mar 25' },
      { name: 'Behind the Scenes', type: 'Video', status: 'Editing' },
      { name: 'Product Flat Lays', type: 'Photo', status: 'Done' },
      { name: 'Launch Promo Reel', type: 'Video', status: 'Concept' },
    ],
    checklist: [
      { item: 'Product pages created', done: false },
      { item: 'Pricing confirmed', done: true },
      { item: 'Inventory loaded to system', done: false },
      { item: 'Checkout flow tested', done: false },
      { item: 'Landing page live', done: false },
      { item: 'Email notifications set up', done: true },
      { item: 'Social posts scheduled', done: true },
      { item: 'Fulfillment team briefed', done: false },
    ],
  },
  {
    id: 'ps2',
    name: 'PS2 Streetwear Drop',
    brand: 'Velvair Studios',
    brandColor: '#ec4899',
    releaseDate: '2026-04-30',
    dropType: 'Limited',
    status: 'Planning',
    description: 'Bold, urban-inspired collection blending street culture with artistic expression.',
    products: [
      { name: 'PS2 Hoodie', sku: 'PS2-H-001', price: '$80', stock: 150 },
      { name: 'PS2 Cargo Pants', sku: 'PS2-P-001', price: '$75', stock: 100 },
      { name: 'PS2 Graphic Tee', sku: 'PS2-T-001', price: '$42', stock: 200 },
    ],
    production: [
      { task: 'Design finalization', progress: 90, status: 'Almost Done' },
      { task: 'Fabric sourcing', progress: 60, status: 'In Progress' },
      { task: 'Manufacturing', progress: 0, status: 'Not Started' },
    ],
    marketing: [
      { item: 'Campaign concept approved', status: 'Done' },
      { item: 'Teaser content planned', status: 'In Progress' },
      { item: 'Influencer outreach', status: 'Not Started' },
    ],
    media: [
      { name: 'Street Culture Video', type: 'Video', status: 'Location Scouting' },
      { name: 'Product Photography', type: 'Photo', status: 'Not Started' },
    ],
    checklist: [
      { item: 'Product pages created', done: false },
      { item: 'Pricing confirmed', done: true },
      { item: 'Design files finalized', done: false },
      { item: 'Checkout flow tested', done: false },
    ],
  },
  {
    id: 'spring-love',
    name: 'Spring Love Collection',
    brand: 'Canjustalllove',
    brandColor: '#f59e0b',
    releaseDate: '2026-03-25',
    dropType: 'Open',
    status: 'Ready',
    description: 'Lifestyle collection celebrating self-expression, inclusivity, and positivity.',
    products: [
      { name: 'Love Crewneck', sku: 'SL-C-001', price: '$55', stock: 300 },
      { name: 'Expression Tee', sku: 'SL-T-001', price: '$38', stock: 400 },
      { name: 'Unity Shorts', sku: 'SL-S-001', price: '$45', stock: 250 },
    ],
    production: [
      { task: 'Manufacturing', progress: 100, status: 'Complete' },
      { task: 'Quality inspection', progress: 100, status: 'Complete' },
      { task: 'Packaging prep', progress: 100, status: 'Complete' },
    ],
    marketing: [
      { item: 'Spring Love campaign active', status: 'Done' },
      { item: 'Influencer content posted', status: 'Done' },
      { item: 'Email campaign sent', status: 'Done' },
      { item: 'Launch day blast ready', status: 'Done' },
    ],
    media: [
      { name: 'Lifestyle Shoot', type: 'Photo', status: 'Complete' },
      { name: 'Love Stories Reel', type: 'Video', status: 'Published' },
    ],
    checklist: [
      { item: 'Product pages created', done: true },
      { item: 'Pricing confirmed', done: true },
      { item: 'Inventory loaded', done: true },
      { item: 'Checkout flow tested', done: true },
      { item: 'Landing page live', done: true },
      { item: 'Fulfillment team briefed', done: true },
    ],
    liveMetrics: { sales: 142, revenue: '$6,840', traffic: '4,200', conversion: '3.4%', stockRemaining: 808 },
  },
]

function runSimulation(drop: Drop) {
  const websiteItems = drop.checklist.filter((c) => c.item.includes('product') || c.item.includes('checkout') || c.item.includes('Landing') || c.item.includes('pricing'))
  const websitePct = websiteItems.length ? Math.round((websiteItems.filter((c) => c.done).length / websiteItems.length) * 100) : 0
  const inventoryPct = Math.round(drop.production.reduce((a, p) => a + p.progress, 0) / drop.production.length)
  const marketingPct = drop.marketing.length ? Math.round((drop.marketing.filter((m) => m.status === 'Done').length / drop.marketing.length) * 100) : 0
  const logisticsPct = drop.checklist.filter((c) => c.item.includes('fulfillment') || c.item.includes('Fulfillment')).length ? (drop.checklist.find((c) => c.item.toLowerCase().includes('fulfillment'))?.done ? 100 : 0) : 85

  const issues: string[] = []
  if (!drop.checklist.find((c) => /product page/i.test(c.item))?.done) issues.push('Product pages not created')
  if (inventoryPct < 80) issues.push('Inventory too low for projected demand')
  if (!drop.checklist.find((c) => /email/i.test(c.item))?.done) issues.push('Email campaign not scheduled')
  if (!drop.checklist.find((c) => /checkout/i.test(c.item))?.done) issues.push('Checkout flow needs testing')
  if (!drop.checklist.find((c) => /landing/i.test(c.item))?.done) issues.push('Landing page not live')

  return {
    website: Math.min(95, websitePct + 10),
    inventory: inventoryPct,
    marketing: Math.min(90, marketingPct + 5),
    logistics: logisticsPct,
    overall: Math.round((websitePct + inventoryPct + marketingPct + logisticsPct) / 4),
    issues,
  }
}

export default function DropCenter() {
  const [selectedDrop, setSelectedDrop] = useState<string>('nova')
  const [showSimulation, setShowSimulation] = useState(false)
  const [stressTestRunning, setStressTestRunning] = useState(false)
  const drop = drops.find((d) => d.id === selectedDrop)

  if (!drop) return null

  const daysUntil = Math.max(0, Math.ceil((new Date(drop.releaseDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
  const checklistDone = drop.checklist.filter((c) => c.done).length
  const productionProgress = Math.round(drop.production.reduce((a, p) => a + p.progress, 0) / drop.production.length)
  const sim = runSimulation(drop)

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">Product Drop Command Centers</h1>
        <p className="text-sm text-white/40 mt-1">Live command centers for every product release.</p>
      </div>

      {/* Drop selector */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {drops.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDrop(d.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border whitespace-nowrap transition-all ${selectedDrop === d.id ? 'bg-white/[0.06] border-white/[0.12]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'}`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10" style={{ background: `${d.brandColor}15` }}>
              <span className="text-xs font-bold" style={{ color: d.brandColor }}>{d.brand[0]}</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-white">{d.name}</p>
              <p className="text-[10px] text-white/25">{d.brand}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Drop header */}
      <motion.div key={drop.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white">{drop.name}</h2>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${drop.status === 'Live' ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' : drop.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : drop.status === 'Production' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}>{drop.status}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/30">{drop.dropType}</span>
            </div>
            <p className="text-xs text-white/40 mt-1">{drop.description}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowSimulation(true)}
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <span>▶</span> Run Launch Simulation
            </button>
            <div className="text-center bg-white/[0.04] border border-white/[0.06] rounded-xl px-6 py-3">
              <p className="text-2xl font-bold" style={{ color: drop.brandColor }}>{daysUntil}</p>
              <p className="text-[10px] text-white/30">days until drop</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Launch Simulation Modal */}
      <AnimatePresence>
        {showSimulation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => { setShowSimulation(false); setStressTestRunning(false) }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/[0.08] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Launch Simulation</h2>
                  <p className="text-xs text-white/40 mt-0.5">{drop.name}</p>
                </div>
                <button onClick={() => setShowSimulation(false)} className="text-white/40 hover:text-white/60 text-xl">×</button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Launch Readiness</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Website', value: sim.website, color: sim.website >= 80 ? '#10b981' : sim.website >= 50 ? '#eab308' : '#ef4444' },
                      { label: 'Inventory', value: sim.inventory, color: sim.inventory >= 80 ? '#10b981' : sim.inventory >= 50 ? '#eab308' : '#ef4444' },
                      { label: 'Marketing', value: sim.marketing, color: sim.marketing >= 80 ? '#10b981' : sim.marketing >= 50 ? '#eab308' : '#ef4444' },
                      { label: 'Logistics', value: sim.logistics, color: sim.logistics >= 80 ? '#10b981' : sim.logistics >= 50 ? '#eab308' : '#ef4444' },
                    ].map((r) => (
                      <div key={r.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">{r.label}</span>
                          <span style={{ color: r.color }}>{r.value}%</span>
                        </div>
                        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${r.value}%`, background: r.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <span className={`text-2xl font-bold ${sim.overall >= 80 ? 'text-emerald-400' : sim.overall >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                      {sim.overall}% Overall
                    </span>
                  </div>
                </div>

                {sim.issues.length > 0 && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Issues to Fix</h4>
                    <ul className="space-y-1">
                      {sim.issues.map((issue, i) => (
                        <li key={i} className="text-sm text-white/60 flex items-center gap-2">
                          <span className="text-red-400">!</span> {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-white mb-3">Drop Stress Test</h4>
                  <button
                    onClick={() => setStressTestRunning(true)}
                    disabled={stressTestRunning}
                    className="w-full px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-400 text-sm rounded-lg hover:bg-purple-600/30 disabled:opacity-50 transition-all"
                  >
                    {stressTestRunning ? 'Running...' : 'Simulate Traffic Spike'}
                  </button>
                  {stressTestRunning && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-white/40">Simulated Visitors</span><span className="text-white">25,000</span></div>
                      <div className="flex justify-between"><span className="text-white/40">Expected Orders</span><span className="text-white">2,000</span></div>
                      <div className="flex justify-between"><span className="text-white/40">Server Load</span><span className="text-emerald-400">Stable</span></div>
                      <div className="flex justify-between"><span className="text-white/40">Checkout Errors</span><span className="text-emerald-400">0</span></div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live metrics (if drop is ready or live) */}
      {drop.liveMetrics && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: 'Sales', value: drop.liveMetrics.sales, color: 'text-emerald-400' },
            { label: 'Revenue', value: drop.liveMetrics.revenue, color: 'text-emerald-400' },
            { label: 'Traffic', value: drop.liveMetrics.traffic, color: 'text-blue-400' },
            { label: 'Conversion', value: drop.liveMetrics.conversion, color: 'text-purple-400' },
            { label: 'Stock Left', value: drop.liveMetrics.stockRemaining, color: 'text-amber-400' },
          ].map((m) => (
            <div key={m.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-white/30 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Readiness + Production */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Production */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Production Tracker</h3>
            <span className="text-xs text-white/30">{productionProgress}% overall</span>
          </div>
          <div className="p-5 space-y-4">
            {drop.production.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/60">{p.task}</span>
                  <span className={`text-[10px] ${p.progress === 100 ? 'text-emerald-400' : p.progress > 0 ? 'text-blue-400' : 'text-white/25'}`}>{p.status}</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${p.progress}%`, background: p.progress === 100 ? '#10b981' : drop.brandColor }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Launch checklist */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Launch Checklist</h3>
            <span className="text-xs text-white/30">{checklistDone}/{drop.checklist.length}</span>
          </div>
          <div className="p-5 space-y-2">
            {drop.checklist.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${c.done ? 'bg-emerald-500/20 border-emerald-500/40' : 'border-white/[0.1]'}`}>
                  {c.done && <span className="text-[8px] text-emerald-400">✓</span>}
                </div>
                <span className={`text-sm ${c.done ? 'text-white/30 line-through' : 'text-white/60'}`}>{c.item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Products */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Products</h3></div>
          <div className="divide-y divide-white/[0.04]">
            {drop.products.map((p) => (
              <div key={p.sku} className="px-5 py-3 flex items-center justify-between">
                <div><p className="text-sm text-white">{p.name}</p><p className="text-[10px] text-white/25">{p.sku}</p></div>
                <div className="text-right"><p className="text-sm font-medium" style={{ color: drop.brandColor }}>{p.price}</p><p className="text-[10px] text-white/25">{p.stock} units</p></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Marketing + Media */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Marketing & Media</h3></div>
          <div className="divide-y divide-white/[0.04]">
            {drop.marketing.map((m, i) => (
              <div key={i} className="px-5 py-2.5 flex items-center justify-between">
                <span className="text-xs text-white/50">{m.item}</span>
                <span className={`text-[10px] ${m.status === 'Done' ? 'text-emerald-400' : m.status === 'In Progress' ? 'text-blue-400' : 'text-white/25'}`}>{m.status}</span>
              </div>
            ))}
            <div className="px-5 py-3"><p className="text-[10px] text-white/25 uppercase tracking-wider">Media Assets</p></div>
            {drop.media.map((m, i) => (
              <div key={i} className="px-5 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="text-[10px] text-white/20">{m.type === 'Video' ? '▶' : '◐'}</span><span className="text-xs text-white/50">{m.name}</span></div>
                <span className={`text-[10px] ${m.status === 'Complete' || m.status === 'Published' ? 'text-emerald-400' : m.status === 'Done' ? 'text-emerald-400' : 'text-white/30'}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
