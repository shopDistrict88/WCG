import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../store/DataContext'

interface MapNode {
  id: string
  name: string
  type: 'hq' | 'brand' | 'division' | 'future'
  color: string
  children: {
    id: string
    name: string
    type: 'project' | 'team' | 'campaign' | 'feature'
    status?: string
    link?: string
  }[]
}

const mapNodes: MapNode[] = [
  {
    id: 'district88', name: 'District88', type: 'brand', color: '#3b82f6',
    children: [
      { id: 'd88-1', name: 'Community Platform', type: 'feature', status: 'In Development' },
      { id: 'd88-2', name: 'Moderation Team', type: 'team', status: '2 members' },
      { id: 'd88-3', name: 'Feature Development', type: 'project', status: '2 active projects', link: '/os/brands/district88' },
      { id: 'd88-4', name: 'Launch Campaign', type: 'campaign', status: 'Draft', link: '/os/campaigns' },
    ],
  },
  {
    id: 'divergent', name: 'Divergent Studios', type: 'brand', color: '#8b5cf6',
    children: [
      { id: 'div-1', name: 'Clothing Drops', type: 'project', status: 'NOVA Drop — Apr 15', link: '/os/drops' },
      { id: 'div-2', name: 'Design Studio', type: 'team', status: '3 designers' },
      { id: 'div-3', name: 'Campaign Production', type: 'campaign', status: 'NOVA Campaign Active', link: '/os/campaigns' },
      { id: 'div-4', name: 'Brand Identity', type: 'feature', status: 'Established' },
    ],
  },
  {
    id: 'velvair', name: 'Velvair Studios', type: 'brand', color: '#ec4899',
    children: [
      { id: 'vel-1', name: 'PS2 Collection', type: 'project', status: 'In Production', link: '/os/brands/velvair' },
      { id: 'vel-2', name: 'Creative Direction', type: 'team', status: '2 members' },
      { id: 'vel-3', name: 'PS2 Drop Campaign', type: 'campaign', status: 'Draft', link: '/os/campaigns' },
    ],
  },
  {
    id: 'canjustalllove', name: 'Canjustalllove', type: 'brand', color: '#f59e0b',
    children: [
      { id: 'cjl-1', name: 'Spring Collection', type: 'project', status: 'Planning', link: '/os/brands/canjustalllove' },
      { id: 'cjl-2', name: 'Content Creation', type: 'team', status: '2 creators' },
      { id: 'cjl-3', name: 'Spring Love Campaign', type: 'campaign', status: 'Active', link: '/os/campaigns' },
    ],
  },
  {
    id: 'wcgdash', name: 'WCG Dashboard', type: 'brand', color: '#10b981',
    children: [
      { id: 'wcg-1', name: 'Platform Development', type: 'project', status: 'v2 in progress', link: '/os/brands/wcgdash' },
      { id: 'wcg-2', name: 'Engineering Team', type: 'team', status: '2 developers' },
    ],
  },
  {
    id: 'future', name: 'Future Ventures', type: 'future', color: '#6b7280',
    children: [
      { id: 'fut-1', name: 'New Brand Concepts', type: 'feature', status: '3 in Idea Lab' },
      { id: 'fut-2', name: 'Market Research', type: 'project', status: 'Ongoing' },
      { id: 'fut-3', name: 'Partnership Opportunities', type: 'feature', status: '5 leads' },
    ],
  },
]

const typeIcons: Record<string, string> = { project: '▣', team: '◎', campaign: '◉', feature: '◇' }

export default function CompanyMap() {
  const { brands, projects, campaigns, users, tasks } = useData()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const totalProjects = projects.length
  const totalTeam = users.length
  const totalCampaigns = campaigns.length

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">Company Ecosystem</h1>
        <p className="text-sm text-white/40 mt-1">Interactive map of the Wilson Collective Group organization.</p>
      </div>

      {/* HQ Node */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/[0.08] rounded-2xl p-6 text-center relative"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-3">
          <span className="text-xl font-bold text-white tracking-wider">W</span>
        </div>
        <h2 className="text-lg font-bold text-white font-sans">Wilson Collective Group LLC</h2>
        <p className="text-xs text-white/40 mt-1">Parent Company & Digital Headquarters</p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div><p className="text-lg font-bold text-white">{brands.length}</p><p className="text-[10px] text-white/30">Brands</p></div>
          <div className="w-px h-8 bg-white/[0.06]" />
          <div><p className="text-lg font-bold text-white">{totalProjects}</p><p className="text-[10px] text-white/30">Projects</p></div>
          <div className="w-px h-8 bg-white/[0.06]" />
          <div><p className="text-lg font-bold text-white">{totalTeam}</p><p className="text-[10px] text-white/30">Team</p></div>
          <div className="w-px h-8 bg-white/[0.06]" />
          <div><p className="text-lg font-bold text-white">{totalCampaigns}</p><p className="text-[10px] text-white/30">Campaigns</p></div>
        </div>
        {/* Connection line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0.5 h-8 bg-gradient-to-b from-white/[0.08] to-transparent" />
      </motion.div>

      {/* Connector bar */}
      <div className="flex items-center justify-center">
        <div className="h-0.5 flex-1 max-w-4xl bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Brand nodes grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mapNodes.map((node, i) => {
          const isSelected = selectedNode === node.id
          const brandData = brands.find((b) => b.id === node.id)
          const brandProjects = projects.filter((p) => p.brandId === node.id)
          const brandTasks = tasks.filter((t) => brandProjects.some((p) => p.id === t.projectId))

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-white/[0.02] border rounded-xl overflow-hidden cursor-pointer transition-all ${isSelected ? 'border-white/[0.15] bg-white/[0.04]' : 'border-white/[0.06] hover:border-white/[0.1]'}`}
              onClick={() => setSelectedNode(isSelected ? null : node.id)}
            >
              {/* Brand header */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0" style={{ background: `${node.color}15` }}>
                    <span className="text-sm font-bold" style={{ color: node.color }}>{node.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{node.name}</h3>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider">{node.type === 'future' ? 'Upcoming' : brandData?.category || 'Brand'}</p>
                  </div>
                </div>

                {brandData && (
                  <div className="flex items-center gap-4 mt-3 ml-[52px] text-[10px] text-white/25">
                    <span>{brandProjects.length} projects</span>
                    <span>{brandTasks.length} tasks</span>
                    <span>{brandData.members.length} members</span>
                  </div>
                )}
              </div>

              {/* Children nodes */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/[0.04] pt-3 space-y-2">
                      {node.children.map((child) => (
                        <div key={child.id} className="flex items-center gap-3">
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-0.5 h-4 rounded-full" style={{ background: `${node.color}40` }} />
                            <span className="text-xs text-white/20">{typeIcons[child.type]}</span>
                          </div>
                          <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                            {child.link ? (
                              <Link to={child.link} className="text-sm text-white/60 hover:text-white/90 transition-colors truncate" onClick={(e) => e.stopPropagation()}>
                                {child.name}
                              </Link>
                            ) : (
                              <span className="text-sm text-white/50 truncate">{child.name}</span>
                            )}
                            {child.status && (
                              <span className="text-[10px] text-white/25 flex-shrink-0">{child.status}</span>
                            )}
                          </div>
                        </div>
                      ))}

                      {brandData && (
                        <Link
                          to={`/os/brands/${node.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block mt-3 pt-3 border-t border-white/[0.04] text-[10px] text-center hover:text-white/60 transition-colors"
                          style={{ color: node.color }}
                        >
                          Open Brand Dashboard →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Connection legend */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex flex-wrap gap-4 justify-center">
        {[
          { icon: '▣', label: 'Project', color: 'text-blue-400' },
          { icon: '◎', label: 'Team', color: 'text-emerald-400' },
          { icon: '◉', label: 'Campaign', color: 'text-pink-400' },
          { icon: '◇', label: 'Feature', color: 'text-amber-400' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-white/30">
            <span className={l.color}>{l.icon}</span>
            {l.label}
          </div>
        ))}
      </div>
    </div>
  )
}
