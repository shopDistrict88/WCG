import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import { useData } from '../store/DataContext'

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

function useRoleData() {
  const { user } = useAuth()
  const { projects, tasks, campaigns, brands, announcements, users, getTasksByUser, getUserById } = useData()
  const myTasks = user ? getTasksByUser(user.id) : []
  const activeTasks = myTasks.filter((t) => t.status !== 'Completed')
  const activeProjects = projects.filter((p) => p.status === 'In Progress')
  const activeCampaigns = campaigns.filter((c) => c.status === 'Active')
  return { user, myTasks, activeTasks, activeProjects, activeCampaigns, projects, tasks, campaigns, brands, announcements, getUserById, users }
}

function RoleGreeting({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div {...fadeUp} transition={{ delay: 0 }}>
      <h1 className="text-2xl font-bold text-white font-sans">{title}</h1>
      <p className="text-sm text-white/40 mt-1">{subtitle}</p>
    </motion.div>
  )
}

function StatCard({ label, value, color, delay }: { label: string; value: string | number; color: string; delay: number }) {
  return (
    <motion.div {...fadeUp} transition={{ delay }} className={`${color} rounded-xl p-4`}>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/50 mt-1">{label}</p>
    </motion.div>
  )
}

function TaskList({ taskItems, title }: { taskItems: { id: string; title: string; priority: string; status: string; dueDate: string }[]; title: string }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <span className="text-xs text-white/30">{taskItems.length}</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {taskItems.slice(0, 5).map((t) => (
          <div key={t.id} className="px-5 py-3">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${t.priority === 'Urgent' ? 'bg-red-500' : t.priority === 'High' ? 'bg-amber-500' : t.priority === 'Medium' ? 'bg-blue-500' : 'bg-white/20'}`} />
              <p className="text-sm text-white/80 truncate">{t.title}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 ml-3.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' : t.status === 'Review' ? 'bg-amber-500/10 text-amber-400' : 'text-white/30'}`}>{t.status}</span>
              <span className="text-[10px] text-white/20">·</span>
              <span className="text-[10px] text-white/30">Due {t.dueDate}</span>
            </div>
          </div>
        ))}
        {taskItems.length === 0 && <div className="px-5 py-8 text-center text-xs text-white/20">All clear</div>}
      </div>
    </div>
  )
}

function NotificationFeed({ items }: { items: { text: string; time: string; type: 'info' | 'alert' | 'success' }[] }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-white">Notifications</h2>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {items.map((n, i) => (
          <div key={i} className="px-5 py-3 flex items-start gap-3">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${n.type === 'alert' ? 'bg-red-500' : n.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
            <div>
              <p className="text-xs text-white/60">{n.text}</p>
              <p className="text-[10px] text-white/20 mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickTools({ tools }: { tools: { label: string; icon: string; to: string }[] }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-white">Quick Access</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {tools.map((t) => (
          <Link key={t.label} to={t.to} className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg hover:bg-white/[0.05] hover:border-white/[0.1] transition-all text-xs text-white/50 hover:text-white/70">
            <span className="text-white/20">{t.icon}</span>
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── OPERATIONS MANAGER ──────────────────────────────────────────────
function OperationsDashboard() {
  const { user } = useRoleData()
  return (
    <div className="space-y-6 max-w-7xl">
      <RoleGreeting title="Operations Command" subtitle={`Welcome back, ${user?.name?.split(' ')[0]}. Here's your operational overview.`} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Orders In Progress" value={234} color="bg-blue-500/10 border border-blue-500/20" delay={0.03} />
        <StatCard label="Ready to Ship" value={43} color="bg-emerald-500/10 border border-emerald-500/20" delay={0.06} />
        <StatCard label="Inventory Alerts" value={4} color="bg-red-500/10 border border-red-500/20" delay={0.09} />
        <StatCard label="Active Workflows" value={8} color="bg-purple-500/10 border border-purple-500/20" delay={0.12} />
        <StatCard label="On-Time Rate" value="96%" color="bg-amber-500/10 border border-amber-500/20" delay={0.15} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Fulfillment Pipeline</h2></div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                {[{ label: 'Placed', value: 58, color: 'bg-white/10' }, { label: 'Processing', value: 43, color: 'bg-blue-500/30' }, { label: 'Packed', value: 38, color: 'bg-purple-500/30' }, { label: 'Shipped', value: 412, color: 'bg-emerald-500/30' }, { label: 'Delivered', value: 334, color: 'bg-emerald-500/50' }].map((s) => (
                  <div key={s.label} className="flex-1 text-center">
                    <div className={`h-16 ${s.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-sm font-bold text-white">{s.value}</span>
                    </div>
                    <p className="text-[10px] text-white/30 mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Production Deadlines</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {[{ name: 'NOVA Collection', brand: 'Divergent', date: 'Apr 15', progress: 65 }, { name: 'PS2 Collection', brand: 'Velvair', date: 'Apr 30', progress: 25 }, { name: 'Spring Line', brand: 'Canjustalllove', date: 'Mar 25', progress: 80 }].map((p) => (
                <div key={p.name} className="px-5 py-3">
                  <div className="flex items-center justify-between"><span className="text-sm text-white">{p.name}</span><span className="text-xs text-white/40">{p.date}</span></div>
                  <div className="flex items-center gap-2 mt-1"><span className="text-[10px] text-white/25">{p.brand}</span></div>
                  <div className="mt-2 h-1.5 bg-white/[0.06] rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${p.progress}%` }} /></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <NotificationFeed items={[
            { text: 'Inventory low: NOVA Hoodie — M (3 left)', time: '2 min ago', type: 'alert' },
            { text: 'Shipping batch #447 at risk of delay', time: '15 min ago', type: 'alert' },
            { text: 'PS2 fabric delivery arriving tomorrow', time: '1 hour ago', type: 'info' },
            { text: 'Spring Line packaging complete', time: '3 hours ago', type: 'success' },
          ]} />
          <QuickTools tools={[
            { label: 'Fulfillment Monitor', icon: '▣', to: '/os/workspaces/fulfillment' },
            { label: 'Inventory Panel', icon: '◧', to: '/os/workspaces/operations' },
            { label: 'Shipping Tracker', icon: '◈', to: '/os/workspaces/operations' },
            { label: 'Workflow Builder', icon: '✦', to: '/os/workspaces/operations' },
          ]} />
        </div>
      </div>
    </div>
  )
}

// ─── MARKETING MANAGER ──────────────────────────────────────────────
function MarketingDashboard() {
  const { user, activeCampaigns, campaigns, brands } = useRoleData()
  return (
    <div className="space-y-6 max-w-7xl">
      <RoleGreeting title="Marketing Command" subtitle={`Welcome back, ${user?.name?.split(' ')[0]}. Campaign performance at a glance.`} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Active Campaigns" value={activeCampaigns.length} color="bg-purple-500/10 border border-purple-500/20" delay={0.03} />
        <StatCard label="Ad Spend (MTD)" value="$8.4K" color="bg-blue-500/10 border border-blue-500/20" delay={0.06} />
        <StatCard label="Conversion Rate" value="3.8%" color="bg-emerald-500/10 border border-emerald-500/20" delay={0.09} />
        <StatCard label="New Followers (7d)" value="+840" color="bg-pink-500/10 border border-pink-500/20" delay={0.12} />
        <StatCard label="Email Open Rate" value="24.8%" color="bg-amber-500/10 border border-amber-500/20" delay={0.15} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Campaign Performance</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {campaigns.map((c) => {
                const brand = brands.find((b) => b.id === c.brandId)
                return (
                  <div key={c.id} className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-white">{c.name}</h3>
                        <p className="text-[10px] text-white/30 mt-0.5" style={{ color: brand?.color }}>{brand?.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/40">{c.budget}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}>{c.status}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/30 mt-2 line-clamp-1">{c.strategy}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Growth Metrics</h2></div>
            <div className="grid grid-cols-3 gap-4 p-5">
              {[{ label: 'Instagram', value: '+420', pct: '+3.1%' }, { label: 'TikTok', value: '+280', pct: '+3.4%' }, { label: 'Email List', value: '+124', pct: '+2.8%' }].map((m) => (
                <div key={m.label} className="bg-white/[0.03] rounded-xl p-4 text-center">
                  <p className="text-lg font-bold text-white">{m.value}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">{m.pct}</p>
                  <p className="text-[10px] text-white/30 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <NotificationFeed items={[
            { text: 'NOVA Teaser Reel hit 12K views in 2 hours', time: '30 min ago', type: 'success' },
            { text: 'Spring Love campaign ending in 3 days', time: '1 hour ago', type: 'info' },
            { text: 'New influencer application from @styleking', time: '2 hours ago', type: 'info' },
            { text: 'Facebook ad CPC above target ($2.90)', time: '3 hours ago', type: 'alert' },
          ]} />
          <QuickTools tools={[
            { label: 'Campaign Planner', icon: '◉', to: '/os/workspaces/marketing' },
            { label: 'Ad Performance', icon: '▥', to: '/os/workspaces/marketing' },
            { label: 'Content Calendar', icon: '◇', to: '/os/workspaces/marketing' },
            { label: 'Influencer Manager', icon: '◎', to: '/os/workspaces/marketing' },
          ]} />
        </div>
      </div>
    </div>
  )
}

// ─── DESIGNER / CREATIVE ──────────────────────────────────────────────
function DesignerDashboard() {
  const { user, activeTasks } = useRoleData()
  return (
    <div className="space-y-6 max-w-7xl">
      <RoleGreeting title="Creative Studio" subtitle={`Welcome back, ${user?.name?.split(' ')[0]}. Your creative projects at a glance.`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active Projects" value={4} color="bg-pink-500/10 border border-pink-500/20" delay={0.03} />
        <StatCard label="Pending Approvals" value={3} color="bg-amber-500/10 border border-amber-500/20" delay={0.06} />
        <StatCard label="Upcoming Shoots" value={2} color="bg-purple-500/10 border border-purple-500/20" delay={0.09} />
        <StatCard label="My Tasks" value={activeTasks.length} color="bg-blue-500/10 border border-blue-500/20" delay={0.12} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Content Requests</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {[
                { name: 'NOVA Lookbook Design', brand: 'Divergent', status: 'In Progress', priority: 'High' },
                { name: 'PS2 Promo Video Edit', brand: 'Velvair', status: 'Review', priority: 'High' },
                { name: 'Spring Social Assets', brand: 'Canjustalllove', status: 'To Do', priority: 'Medium' },
                { name: 'D88 App Icon Refresh', brand: 'District88', status: 'Completed', priority: 'Low' },
              ].map((r) => (
                <div key={r.name} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{r.name}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{r.brand}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${r.priority === 'High' ? 'bg-amber-500' : r.priority === 'Medium' ? 'bg-blue-500' : 'bg-white/20'}`} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${r.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : r.status === 'Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : r.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Upcoming Photoshoots</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {[{ concept: 'NOVA Collection Editorial', location: 'Downtown Raleigh', date: 'Mar 25', shots: 40 }, { concept: 'PS2 Street Culture Video', location: 'TBD — 3 locations', date: 'Apr 5', shots: 0 }].map((s) => (
                <div key={s.concept} className="px-5 py-3">
                  <p className="text-sm text-white">{s.concept}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-white/30">
                    <span>{s.location}</span><span>·</span><span>{s.date}</span><span>·</span><span>{s.shots > 0 ? `${s.shots} shots planned` : 'TBD'}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <NotificationFeed items={[
            { text: 'NOVA Hero Image awaiting approval', time: '1 hour ago', type: 'info' },
            { text: 'PS2 video cut feedback received', time: '2 hours ago', type: 'info' },
            { text: 'Spring banner approved by marketing', time: '4 hours ago', type: 'success' },
            { text: 'New brief: D88 Launch Graphics', time: '5 hours ago', type: 'info' },
          ]} />
          <QuickTools tools={[
            { label: 'Creative Studio', icon: '✦', to: '/os/creative' },
            { label: 'Asset Vault', icon: '◧', to: '/os/vault' },
            { label: 'Brand Guides', icon: '◆', to: '/os/workspaces/content' },
            { label: 'Upload Media', icon: '◐', to: '/os/workspaces/content' },
          ]} />
        </div>
      </div>
    </div>
  )
}

// ─── DEVELOPER ──────────────────────────────────────────────
function DeveloperDashboard() {
  const { user, activeTasks } = useRoleData()
  return (
    <div className="space-y-6 max-w-7xl">
      <RoleGreeting title="Developer Hub" subtitle={`Welcome back, ${user?.name?.split(' ')[0]}. Your development overview.`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active Tasks" value={activeTasks.length} color="bg-emerald-500/10 border border-emerald-500/20" delay={0.03} />
        <StatCard label="In Review" value={1} color="bg-amber-500/10 border border-amber-500/20" delay={0.06} />
        <StatCard label="Bugs Open" value={3} color="bg-red-500/10 border border-red-500/20" delay={0.09} />
        <StatCard label="Site Uptime" value="99.8%" color="bg-blue-500/10 border border-blue-500/20" delay={0.12} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TaskList taskItems={activeTasks} title="My Tasks" />
        </div>
        <div className="space-y-4">
          <NotificationFeed items={[
            { text: 'Product listing page pushed to staging', time: '30 min ago', type: 'success' },
            { text: 'Mobile menu bug reported', time: '2 hours ago', type: 'alert' },
            { text: 'Auth system test suite passed', time: '3 hours ago', type: 'success' },
            { text: 'New feature request: Live drop analytics', time: '5 hours ago', type: 'info' },
          ]} />
          <QuickTools tools={[
            { label: 'Site Health', icon: '◐', to: '/os/workspaces/ecommerce' },
            { label: 'Bug Reports', icon: '◬', to: '/os/workspaces/ecommerce' },
            { label: 'Projects', icon: '▣', to: '/os/projects' },
            { label: 'Knowledge Base', icon: '▤', to: '/os/wiki' },
          ]} />
        </div>
      </div>
    </div>
  )
}

// ─── MODERATOR ──────────────────────────────────────────────
function ModeratorDashboard() {
  const { user } = useRoleData()
  return (
    <div className="space-y-6 max-w-7xl">
      <RoleGreeting title="Moderation Center" subtitle={`Welcome back, ${user?.name?.split(' ')[0]}. Community status overview.`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Pending Reviews" value={3} color="bg-amber-500/10 border border-amber-500/20" delay={0.03} />
        <StatCard label="Resolved Today" value={12} color="bg-emerald-500/10 border border-emerald-500/20" delay={0.06} />
        <StatCard label="Flagged Users" value={1} color="bg-red-500/10 border border-red-500/20" delay={0.09} />
        <StatCard label="Community Health" value="94%" color="bg-blue-500/10 border border-blue-500/20" delay={0.12} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Review Queue</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {[
                { type: 'Post', reason: 'Spam / promotional content', user: 'user_4829', date: 'Today' },
                { type: 'Comment', reason: 'Harassment report', user: 'user_1204', date: 'Today' },
                { type: 'User', reason: 'Fake account / impersonation', user: 'user_8821', date: 'Yesterday' },
              ].map((item, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{item.type} — {item.reason}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">Reported by {item.user} · {item.date}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Pending</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <NotificationFeed items={[
            { text: 'New spam report on listing #4829', time: '10 min ago', type: 'alert' },
            { text: 'Harassment case resolved', time: '1 hour ago', type: 'success' },
            { text: 'Community guidelines updated', time: '4 hours ago', type: 'info' },
          ]} />
          <QuickTools tools={[
            { label: 'Moderation Center', icon: '◬', to: '/os/moderation' },
            { label: 'Messages', icon: '◫', to: '/os/messages' },
            { label: 'Knowledge Base', icon: '▤', to: '/os/wiki' },
            { label: 'Team', icon: '◎', to: '/os/team' },
          ]} />
        </div>
      </div>
    </div>
  )
}

// ─── DEFAULT / ADMIN ──────────────────────────────────────────────
function AdminDashboard() {
  const { user, activeTasks, activeProjects, activeCampaigns, brands, announcements, projects, tasks, users, getUserById } = useRoleData()
  const stats = [
    { label: 'Active Projects', value: activeProjects.length, color: 'bg-blue-500/10 border border-blue-500/20' },
    { label: 'My Tasks', value: activeTasks.length, color: 'bg-purple-500/10 border border-purple-500/20' },
    { label: 'Active Campaigns', value: activeCampaigns.length, color: 'bg-emerald-500/10 border border-emerald-500/20' },
    { label: 'Team Members', value: users.length, color: 'bg-amber-500/10 border border-amber-500/20' },
    { label: 'Brands', value: brands.length, color: 'bg-pink-500/10 border border-pink-500/20' },
  ]
  return (
    <div className="space-y-6 max-w-7xl">
      <RoleGreeting title="CEO Command Center" subtitle={`Welcome back, ${user?.name?.split(' ')[0]}. Full company overview.`} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.03} />)}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Announcements */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Announcements</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {announcements.length === 0 ? (
                <div className="px-5 py-8 text-center text-xs text-white/30">No announcements yet</div>
              ) : announcements.map((a) => {
                const author = getUserById(a.authorId)
                return (
                  <div key={a.id} className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {a.priority === 'Urgent' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                      {a.priority === 'Important' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                      <h3 className="text-sm font-medium text-white">{a.title}</h3>
                    </div>
                    <p className="text-xs text-white/40 mt-1">{a.content}</p>
                    <p className="text-[10px] text-white/25 mt-2">{author?.name} · {a.date}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Brand Status</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {brands.length === 0 ? (
                <div className="px-5 py-8 text-center text-xs text-white/30">No brands yet — create one from Brands</div>
              ) : brands.map((b) => {
                const bp = projects.filter((p) => p.brandId === b.id)
                const bt = tasks.filter((t) => bp.some((p) => p.id === t.projectId))
                const done = bt.filter((t) => t.status === 'Completed').length
                return (
                  <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10" style={{ background: `${b.color}20` }}><span className="text-xs font-bold" style={{ color: b.color }}>{b.name[0]}</span></div>
                      <div><p className="text-sm text-white">{b.name}</p><p className="text-[10px] text-white/25">{bp.length} projects · {done}/{bt.length} tasks</p></div>
                    </div>
                    <Link to={`/os/brands/${b.id}`} className="text-[10px] text-white/25 hover:text-white/50 transition-colors">View →</Link>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
        <div className="space-y-4">
          <TaskList taskItems={activeTasks} title="My Tasks" />
          <QuickTools tools={[
            { label: 'CEO Panel', icon: '⬡', to: '/os/admin' },
            { label: 'Company Map', icon: '◈', to: '/os/map' },
            { label: 'Workflows', icon: '✦', to: '/os/workflows' },
            { label: 'Analytics', icon: '▥', to: '/os/analytics' },
            { label: 'All Workspaces', icon: '⊞', to: '/os/workspaces' },
            { label: 'Drops', icon: '◉', to: '/os/drops' },
          ]} />
        </div>
      </div>
    </div>
  )
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth()
  const role = user?.role
  const title = user?.title?.toLowerCase() || ''

  if (title.includes('operations')) return <OperationsDashboard />
  if (title.includes('marketing') || role === 'Manager' && title.includes('marketing')) return <MarketingDashboard />
  if (role === 'Designer') return <DesignerDashboard />
  if (role === 'Developer') return <DeveloperDashboard />
  if (role === 'Moderator') return <ModeratorDashboard />
  return <AdminDashboard />
}
