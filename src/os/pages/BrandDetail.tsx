import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBrands } from '../context/BrandsContext'
import { useData } from '../store/DataContext'

const LAUNCH_PHASES = [
  { id: 'identity', name: 'Brand Identity Design', tasks: ['Logo design', 'Color palette', 'Typography', 'Brand voice'] },
  { id: 'website', name: 'Website Build', tasks: ['Domain setup', 'Site structure', 'Product pages', 'Checkout'] },
  { id: 'product', name: 'Product Development', tasks: ['Design concepts', 'Samples', 'Manufacturing', 'Quality check'] },
  { id: 'marketing', name: 'Marketing Strategy', tasks: ['Audience research', 'Channel planning', 'Content calendar', 'Budget allocation'] },
  { id: 'content', name: 'Content Production', tasks: ['Photography', 'Video', 'Social assets', 'Email templates'] },
  { id: 'launch', name: 'Launch Campaign', tasks: ['Teaser phase', 'Announcement', 'Launch day', 'Post-launch'] },
]

const BRAND_CONNECTIONS: Record<string, string[]> = {
  divergent: ['district88'],
  district88: ['divergent', 'velvair', 'canjustalllove'],
  velvair: ['district88'],
  canjustalllove: ['district88'],
  wcgdash: ['district88', 'divergent'],
}

const DEFAULT_ROLES = [
  { role: 'Brand Manager', desc: 'Oversees brand strategy and operations' },
  { role: 'Marketing Lead', desc: 'Campaigns, ads, and growth' },
  { role: 'Content Creator', desc: 'Photography, video, and social content' },
  { role: 'Operations Support', desc: 'Fulfillment and logistics' },
  { role: 'Design Team', desc: 'Graphics, packaging, and creative' },
]

export default function BrandDetail() {
  const { projects, tasks, campaigns, assets, getUserById } = useData()
  const { brandId } = useParams()
  const { getBrandById } = useBrands()
  const brand = getBrandById(brandId || '')

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white/40">Brand not found</p>
        <Link to="/os/brands" className="ml-3 text-blue-400 hover:underline">← Back to Brands</Link>
      </div>
    )
  }

  const brandProjects = projects.filter((p) => p.brandId === brand.id)
  const brandTasks = tasks.filter((t) => brandProjects.some((p) => p.id === t.projectId))
  const brandCampaigns = campaigns.filter((c) => c.brandId === brand.id)
  const brandAssets = assets.filter((a) => a.brandId === brand.id)
  const connections = BRAND_CONNECTIONS[brand.id] || []

  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/os/brands" className="text-xs text-white/30 hover:text-white/50 transition-colors">← All Brands</Link>
        <div className="flex items-center gap-4 mt-3">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${brand.color}15` }}>
            <span className="text-2xl font-bold" style={{ color: brand.color }}>{brand.name[0]}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-sans">{brand.name}</h1>
            <p className="text-sm text-white/40">{brand.category} · {brand.status}</p>
          </div>
        </div>
        <p className="text-sm text-white/50 mt-4 max-w-2xl leading-relaxed">{brand.description}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Projects', value: brandProjects.length },
          { label: 'Tasks', value: brandTasks.length },
          { label: 'Campaigns', value: brandCampaigns.length },
          { label: 'Assets', value: brandAssets.length },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Launch Planner */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Launch Planner</h2>
          <p className="text-[10px] text-white/25 mt-0.5">Phases and tasks for brand launch</p>
        </div>
        <div className="p-5">
          <div className="space-y-2">
            {LAUNCH_PHASES.map((phase, i) => (
              <div key={phase.id} className="flex gap-4">
                <div className="flex flex-col items-center w-6 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: brand.color, background: `${brand.color}20` }} />
                  {i < LAUNCH_PHASES.length - 1 && <div className="w-0.5 flex-1 min-h-[24px]" style={{ background: `${brand.color}20` }} />}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-white">{phase.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {phase.tasks.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-white/40">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Connections */}
      {connections.length > 0 && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">Cross-Brand Connections</h2>
            <p className="text-[10px] text-white/25 mt-0.5">Shared campaigns, projects, and assets</p>
          </div>
          <div className="p-5 flex flex-wrap gap-3">
            {connections.map((connId) => {
              const conn = getBrandById(connId)
              if (!conn) return null
              return (
                <Link key={connId} to={`/os/brands/${connId}`} className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${conn.color}20` }}>
                    <span className="text-xs font-bold" style={{ color: conn.color }}>{conn.name[0]}</span>
                  </div>
                  <span className="text-sm text-white/70">{conn.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Team Structure */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Team Structure</h2>
          <p className="text-[10px] text-white/25 mt-0.5">Auto-generated roles · Assign employees</p>
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-3">
          {DEFAULT_ROLES.map((r) => (
            <div key={r.role} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                <span className="text-[10px] text-white/30">◎</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white/70">{r.role}</p>
                <p className="text-[10px] text-white/25">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 pb-5">
          <p className="text-xs text-white/40 mb-3">Assigned Members</p>
          <div className="flex flex-wrap gap-3">
            {brand.members.map((mid) => {
              const member = getUserById(mid)
              if (!member) return null
              return (
                <div key={mid} className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white/50">{member.avatar}</span>
                  </div>
                  <span className="text-sm text-white/60">{member.name}</span>
                  <span className="text-[10px] text-white/25">— {member.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Projects</h2>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {brandProjects.map((p) => (
            <div key={p.id} className="px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{p.name}</h3>
                  <p className="text-xs text-white/30 mt-0.5">{p.description}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full border ${
                  p.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  p.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  'bg-white/5 text-white/40 border-white/10'
                }`}>
                  {p.status}
                </span>
              </div>
              <div className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${p.progress}%`, background: brand.color }} />
              </div>
              <p className="text-[10px] text-white/25 mt-1">Due {p.deadline} · {p.completedTasks}/{p.tasks} tasks</p>
            </div>
          ))}
          {brandProjects.length === 0 && <p className="px-5 py-8 text-center text-xs text-white/20">No projects yet. Create from Project Hub.</p>}
        </div>
      </div>

      {/* Campaigns */}
      {brandCampaigns.length > 0 && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">Campaigns</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 p-5">
            {brandCampaigns.map((c) => (
              <div key={c.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-white/20'}`} />
                  <span className="text-[10px] text-white/40 uppercase">{c.status}</span>
                </div>
                <h3 className="text-sm font-medium text-white">{c.name}</h3>
                <p className="text-xs text-white/30 mt-1 line-clamp-2">{c.strategy}</p>
                <div className="flex items-center gap-3 mt-3 text-[10px] text-white/25">
                  <span>{c.budget}</span>
                  <span>·</span>
                  <span>{c.startDate} → {c.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assets */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Asset Vault</h2>
          <p className="text-[10px] text-white/25 mt-0.5">Logos, graphics, fonts, campaign assets</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-5">
          {brandAssets.map((a) => (
            <div key={a.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
                <span className="text-xs text-white/30">{a.type === 'Logo' ? '◆' : a.type === 'Font' ? 'Aa' : a.type === 'Photo' ? '◐' : a.type === 'Video' ? '▶' : '◧'}</span>
              </div>
              <p className="text-sm text-white font-medium truncate">{a.name}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{a.type} · {a.size}</p>
            </div>
          ))}
          {brandAssets.length === 0 && <p className="col-span-full text-center text-xs text-white/20 py-4">No assets yet. Upload to Asset Vault.</p>}
        </div>
      </div>
    </div>
  )
}
