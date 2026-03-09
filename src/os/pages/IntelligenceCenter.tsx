import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useData } from '../store/DataContext'

type TabId = 'overview' | 'traffic' | 'products' | 'campaigns' | 'social' | 'customers' | 'community' | 'live' | 'forecast' | 'executive'

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '▥' },
  { id: 'traffic', label: 'Traffic', icon: '◈' },
  { id: 'products', label: 'Products', icon: '◆' },
  { id: 'campaigns', label: 'Campaigns', icon: '◉' },
  { id: 'social', label: 'Social', icon: '◎' },
  { id: 'customers', label: 'Customers', icon: '◇' },
  { id: 'community', label: 'Community', icon: '◫' },
  { id: 'live', label: 'Live', icon: '●' },
  { id: 'forecast', label: 'Forecast', icon: '▤' },
  { id: 'executive', label: 'Executive', icon: '⬡' },
]

// Mock data for all sections
const siteTraffic = [
  { id: 'district88', name: 'District88', color: '#3b82f6', visitors: 9420, pageViews: 28400, bounce: 32, session: '4:20' },
  { id: 'divergent', name: 'Divergent Studios', color: '#8b5cf6', visitors: 6210, pageViews: 18200, bounce: 28, session: '5:10' },
  { id: 'wcg', name: 'Wilson Collective', color: '#10b981', visitors: 2790, pageViews: 8900, bounce: 35, session: '3:45' },
  { id: 'velvair', name: 'Velvair Studios', color: '#ec4899', visitors: 1840, pageViews: 5200, bounce: 38, session: '3:20' },
  { id: 'canjustalllove', name: 'Canjustalllove', color: '#f59e0b', visitors: 2160, pageViews: 6400, bounce: 30, session: '4:00' },
]

const dropPerformance = [
  { name: 'NOVA Drop', brand: 'Divergent', brandColor: '#8b5cf6', sold: 420, revenue: 32500, sellOutMin: 47, conversion: 4.8 },
  { name: 'Spring Love', brand: 'Canjustalllove', brandColor: '#f59e0b', sold: 142, revenue: 6840, sellOutMin: 0, conversion: 3.4 },
  { name: 'PS2 Drop', brand: 'Velvair', brandColor: '#ec4899', sold: 0, revenue: 0, sellOutMin: 0, conversion: 0 },
]

const topProducts = [
  { name: 'NOVA Hoodie', brand: 'Divergent', sold: 186, revenue: 15810 },
  { name: 'NOVA Tee', brand: 'Divergent', sold: 124, revenue: 5580 },
  { name: 'Love Crewneck', brand: 'Canjustalllove', sold: 89, revenue: 4895 },
  { name: 'Expression Tee', brand: 'Canjustalllove', sold: 72, revenue: 2736 },
]

const campaignMetrics = [
  { id: 'c1', name: 'NOVA Campaign', brand: 'Divergent', brandColor: '#8b5cf6', traffic: 12000, orders: 310, conversion: 2.6, revenue: 19800 },
  { id: 'c2', name: 'Spring Love', brand: 'Canjustalllove', brandColor: '#f59e0b', traffic: 32000, orders: 142, conversion: 0.44, revenue: 6840 },
  { id: 'c3', name: 'PS2 Teaser', brand: 'Velvair', brandColor: '#ec4899', traffic: 4200, orders: 0, conversion: 0, revenue: 0 },
]

const socialGrowth = [
  { platform: 'Instagram', followers: 28400, gained: 1240, engagement: 4.8, color: '#E4405F' },
  { platform: 'TikTok', followers: 18600, gained: 3920, engagement: 6.2, color: '#000000' },
  { platform: 'Twitter', followers: 4200, gained: 380, engagement: 2.1, color: '#1DA1F2' },
  { platform: 'YouTube', followers: 3200, gained: 210, engagement: 3.4, color: '#FF0000' },
]

const liveActivity = [
  { time: '2 min ago', type: 'order', text: 'Order placed: Divergent Studios NOVA Hoodie', brand: 'divergent' },
  { time: '4 min ago', type: 'user', text: 'New user joined District88', brand: 'district88' },
  { time: '12 min ago', type: 'campaign', text: 'Campaign launched: Summer Drop teaser', brand: 'divergent' },
  { time: '18 min ago', type: 'alert', text: 'Product low stock alert: NOVA Hoodie M (3 left)', brand: 'divergent' },
  { time: '25 min ago', type: 'order', text: 'Order placed: Canjustalllove Expression Tee', brand: 'canjustalllove' },
  { time: '32 min ago', type: 'user', text: 'New user joined District88', brand: 'district88' },
  { time: '45 min ago', type: 'social', text: 'NOVA teaser reel hit 50K views', brand: 'divergent' },
  { time: '1 hour ago', type: 'order', text: 'Order placed: Velvair PS2 pre-order', brand: 'velvair' },
]

export default function IntelligenceCenter() {
  const { campaigns } = useData()
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">WCG Intelligence Center</h1>
        <p className="text-sm text-white/40 mt-1">Mission control for all data across Wilson Collective.</p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-white/[0.1] text-white border border-white/[0.12]' : 'bg-white/[0.02] text-white/40 border border-white/[0.04] hover:bg-white/[0.04]'}`}
          >
            <span className="text-white/30">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ─── OVERVIEW ───────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              {[
                { label: 'Total Visitors Today', value: '18,420', change: '+12%', up: true },
                { label: 'Total Orders', value: '324', change: '+8%', up: true },
                { label: 'Revenue', value: '$21,860', change: '+15%', up: true },
                { label: 'Conversion Rate', value: '2.9%', change: '+0.3%', up: true },
                { label: 'Top Brand', value: 'Divergent', sub: 'by revenue', up: true },
                { label: 'Active Campaigns', value: campaigns.filter((c) => c.status === 'Active').length, change: 'running', up: true },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">{s.label}</p>
                  <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                  {(s.change || s.sub) && <p className={`text-[10px] mt-1 ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change || s.sub}</p>}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Site Traffic Snapshot</h3>
                <div className="space-y-3">
                  {siteTraffic.slice(0, 3).map((s) => (
                    <div key={s.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                        <span className="text-sm text-white/70">{s.name}</span>
                      </div>
                      <span className="text-sm font-medium text-white">{s.visitors.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Top Products (7d)</h3>
                <div className="space-y-3">
                  {topProducts.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-white/70 truncate">{p.name}</span>
                      <span className="text-sm font-medium text-white">${p.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TRAFFIC ───────────────────────────────────────────────── */}
        {activeTab === 'traffic' && (
          <motion.div key="traffic" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Total Visitors', value: '18,420' },
                { label: 'Page Views', value: '67,100' },
                { label: 'Avg Bounce Rate', value: '32%' },
                { label: 'Avg Session', value: '4:12' },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[10px] text-white/30">{s.label}</p>
                  <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Website Traffic by Site</h3></div>
              <div className="divide-y divide-white/[0.04]">
                {siteTraffic.map((s) => (
                  <div key={s.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${s.color}15` }}>
                        <span className="text-sm font-bold" style={{ color: s.color }}>{s.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{s.name}</p>
                        <p className="text-[10px] text-white/25">{s.pageViews.toLocaleString()} page views · {s.bounce}% bounce · {s.session} avg session</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">{s.visitors.toLocaleString()}</p>
                      <p className="text-[10px] text-white/25">visitors</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PRODUCTS ───────────────────────────────────────────────── */}
        {activeTab === 'products' && (
          <motion.div key="products" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Drop Performance</h3></div>
              <div className="divide-y divide-white/[0.04]">
                {dropPerformance.map((d, i) => (
                  <div key={i} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-white">{d.name}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded border" style={{ color: d.brandColor, borderColor: `${d.brandColor}40`, background: `${d.brandColor}10` }}>{d.brand}</span>
                      </div>
                      {d.sellOutMin > 0 && <span className="text-[10px] text-amber-400">Sell out: {d.sellOutMin} min</span>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div><p className="text-white/40 text-[10px]">Units Sold</p><p className="text-white font-medium">{d.sold}</p></div>
                      <div><p className="text-white/40 text-[10px]">Revenue</p><p className="text-white font-medium">${d.revenue.toLocaleString()}</p></div>
                      <div><p className="text-white/40 text-[10px]">Conversion</p><p className="text-white font-medium">{d.conversion}%</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Top Performing Products</h3></div>
              <div className="divide-y divide-white/[0.04]">
                {topProducts.map((p, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between">
                    <span className="text-sm text-white/70">{p.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-white/40">{p.sold} sold</span>
                      <span className="text-sm font-medium text-white">${p.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── CAMPAIGNS ───────────────────────────────────────────────── */}
        {activeTab === 'campaigns' && (
          <motion.div key="campaigns" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Campaign Performance</h3>
                <Link to="/os/campaigns" className="text-[10px] text-white/30 hover:text-white/50">View War Rooms →</Link>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {campaignMetrics.map((c) => (
                  <div key={c.id} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-white">{c.name}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded border" style={{ color: c.brandColor, borderColor: `${c.brandColor}40`, background: `${c.brandColor}10` }}>{c.brand}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-400">${c.revenue.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div><p className="text-white/40 text-[10px]">Traffic</p><p className="text-white font-medium">{c.traffic.toLocaleString()}</p></div>
                      <div><p className="text-white/40 text-[10px]">Orders</p><p className="text-white font-medium">{c.orders}</p></div>
                      <div><p className="text-white/40 text-[10px]">Conversion</p><p className="text-white font-medium">{c.conversion}%</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── SOCIAL ───────────────────────────────────────────────── */}
        {activeTab === 'social' && (
          <motion.div key="social" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {socialGrowth.map((s) => (
                <div key={s.platform} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-[10px] text-white/30 uppercase">{s.platform}</span>
                  </div>
                  <p className="text-xl font-bold text-white">{s.followers.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">+{s.gained} (7d)</p>
                  <p className="text-[10px] text-white/25 mt-1">{s.engagement}% engagement</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── CUSTOMERS ───────────────────────────────────────────────── */}
        {activeTab === 'customers' && (
          <motion.div key="customers" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Repeat Customers', value: '28%' },
                { label: 'Avg Order Value', value: '$84' },
                { label: 'Customer LTV', value: '$312' },
                { label: 'Top Country', value: 'United States' },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[10px] text-white/30">{s.label}</p>
                  <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Most Purchased Items</h3>
              <div className="space-y-2">
                {['NOVA Hoodie', 'Expression Tee', 'Love Crewneck', 'NOVA Tee', 'Unity Shorts'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{item}</span>
                    <span className="text-white/40">{[186, 124, 89, 118, 72][i]} purchases</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── COMMUNITY (District88) ───────────────────────────────────────────────── */}
        {activeTab === 'community' && (
          <motion.div key="community" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { label: 'New Users Today', value: '310' },
                { label: 'Active Users', value: '4,200' },
                { label: 'Posts Created', value: '1,420' },
                { label: 'Engagement Rate', value: '12.4%' },
                { label: 'Trending Topics', value: '8' },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[10px] text-white/30">{s.label}</p>
                  <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">District88 Community Health</h3>
              <p className="text-xs text-white/40">Platform engagement and growth metrics for the marketplace and community hub.</p>
            </div>
          </motion.div>
        )}

        {/* ─── LIVE ACTIVITY ───────────────────────────────────────────────── */}
        {activeTab === 'live' && (
          <motion.div key="live" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-semibold text-white">Live Activity</h3>
                <span className="text-[10px] text-white/25">Real-time updates across the company</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {liveActivity.map((a, i) => (
                  <div key={i} className="px-5 py-3 flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${a.type === 'order' ? 'bg-emerald-500' : a.type === 'alert' ? 'bg-amber-500' : a.type === 'campaign' ? 'bg-blue-500' : 'bg-white/30'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/70">{a.text}</p>
                      <p className="text-[10px] text-white/20 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── FORECAST ───────────────────────────────────────────────── */}
        {activeTab === 'forecast' && (
          <motion.div key="forecast" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Projected Next Month</h3>
              <p className="text-xs text-white/40 mb-4">Based on current trends and campaign pipeline.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Visitors', value: '120K', change: '+18%' },
                  { label: 'Revenue', value: '$180K', change: '+22%' },
                  { label: 'Orders', value: '2,200', change: '+15%' },
                  { label: 'New Users', value: '1,400', change: '+12%' },
                ].map((f) => (
                  <div key={f.label} className="bg-black/20 rounded-xl p-4">
                    <p className="text-[10px] text-white/40">{f.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{f.value}</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">{f.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── EXECUTIVE ───────────────────────────────────────────────── */}
        {activeTab === 'executive' && (
          <motion.div key="executive" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Executive Command Dashboard</h2>
              <Link to="/os/admin" className="text-sm text-blue-400 hover:text-blue-300">Open CEO Panel →</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { label: 'Company Revenue (MTD)', value: '$148,200' },
                { label: 'Fastest Growing Brand', value: 'Divergent' },
                { label: 'Top Campaign', value: 'NOVA', revenue: '$19.8K' },
                { label: 'Drop Performance', value: 'NOVA', sold: '420 units' },
                { label: 'Team Productivity', value: '92%' },
              ].map((e) => (
                <div key={e.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[10px] text-white/30">{e.label}</p>
                  <p className="text-lg font-bold text-white mt-1">{e.value}</p>
                  {e.revenue && <p className="text-[10px] text-emerald-400">{e.revenue}</p>}
                  {e.sold && <p className="text-[10px] text-white/40">{e.sold}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
