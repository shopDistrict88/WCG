import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../store/DataContext'

const roleColors: Record<string, string> = {
  Admin: 'bg-red-500/10 text-red-400 border-red-500/20',
  Manager: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Developer: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Designer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Moderator: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Contributor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
}

interface OpenPosition {
  id: string
  title: string
  department: string
  type: string
  status: 'Open' | 'Interviewing' | 'Filled'
  responsibilities: string[]
}

const openPositions: OpenPosition[] = [
  {
    id: 'pos1',
    title: 'Operations Manager',
    department: 'Operations',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Oversee daily business operations across all brands.',
      'Coordinate order fulfillment, shipping, and inventory management.',
      'Streamline workflows between production, packing, and shipping teams.',
      'Ensure deadlines are met and quality standards are maintained.',
    ],
  },
  {
    id: 'pos2',
    title: 'Marketing & Growth Manager',
    department: 'Marketing',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Plan and execute marketing campaigns for product launches and brand growth.',
      'Run paid ads, email campaigns, and promotions.',
      'Track analytics and adjust strategies to increase sales.',
      'Collaborate with content creators to maintain brand consistency.',
    ],
  },
  {
    id: 'pos3',
    title: 'Customer Experience / Support Lead',
    department: 'Customer Service',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Respond to customer inquiries via email, social media, and chat.',
      'Handle returns, exchanges, and complaints professionally.',
      'Collect customer feedback to improve products and services.',
      'Maintain a high level of customer satisfaction and loyalty.',
    ],
  },
  {
    id: 'pos4',
    title: 'Content Creator / Media Specialist',
    department: 'Creative',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Produce photography, video content, reels, and graphics for social media.',
      'Ensure visual content aligns with brand aesthetics.',
      'Assist in product photography and campaign media.',
      'Edit and optimize media for multiple platforms.',
    ],
  },
  {
    id: 'pos5',
    title: 'Sales & Outreach Coordinator',
    department: 'Sales',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Manage direct sales and wholesale partnerships.',
      'Build relationships with influencers, collaborators, and potential clients.',
      'Track leads and follow up on sales opportunities.',
      'Support marketing campaigns with promotional efforts.',
    ],
  },
  {
    id: 'pos6',
    title: 'Order Fulfillment / Warehouse Associate',
    department: 'Operations',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Pick, pack, and ship customer orders accurately and efficiently.',
      'Maintain organized inventory and storage systems.',
      'Track shipments and coordinate with shipping carriers.',
      'Assist Operations Manager in improving fulfillment processes.',
    ],
  },
  {
    id: 'pos7',
    title: 'E-commerce / Website Support Specialist',
    department: 'Technology',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Update products, pricing, and promotions on all online stores.',
      'Ensure checkout, payment systems, and website functionality run smoothly.',
      'Troubleshoot minor technical issues and report larger issues.',
      'Assist in improving site navigation and user experience.',
    ],
  },
  {
    id: 'pos8',
    title: 'Social Media Manager',
    department: 'Marketing',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Manage posting schedules and maintain brand voice across social platforms.',
      'Engage with followers and respond to comments/messages.',
      'Monitor trends and optimize content for audience growth.',
      'Work with Marketing & Content teams to maximize reach.',
    ],
  },
  {
    id: 'pos9',
    title: 'Packaging & Quality Control Specialist',
    department: 'Operations',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Inspect products for quality before shipment.',
      'Pack orders with attention to brand presentation and protection.',
      'Ensure correct items and quantities are sent to customers.',
      'Maintain organization in the packing and shipping area.',
    ],
  },
  {
    id: 'pos10',
    title: 'Finance & Admin Coordinator',
    department: 'Finance',
    type: 'Full-Time',
    status: 'Open',
    responsibilities: [
      'Track sales, expenses, and daily financial transactions.',
      'Assist with bookkeeping, payroll, and budget tracking.',
      'Prepare reports for management review.',
      'Support operational planning and administrative tasks.',
    ],
  },
]

const deptColors: Record<string, string> = {
  Operations: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Marketing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Customer Service': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Creative: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Sales: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Technology: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Finance: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export default function Team() {
  const { users, brands, tasks, projects } = useData()
  const [tab, setTab] = useState<'roster' | 'positions'>('roster')
  const [expandedPos, setExpandedPos] = useState<string | null>(null)

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Team Directory</h1>
          <p className="text-sm text-white/40 mt-1">Company roster, employee profiles, and open positions.</p>
        </div>
        <div className="flex bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <button onClick={() => setTab('roster')} className={`px-4 py-1.5 text-xs rounded-l-lg transition-all ${tab === 'roster' ? 'bg-white/[0.08] text-white' : 'text-white/40'}`}>Roster</button>
          <button onClick={() => setTab('positions')} className={`px-4 py-1.5 text-xs rounded-r-lg transition-all flex items-center gap-2 ${tab === 'positions' ? 'bg-white/[0.08] text-white' : 'text-white/40'}`}>
            Open Positions
            <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-full">{openPositions.filter((p) => p.status === 'Open').length}</span>
          </button>
        </div>
      </div>

      {tab === 'roster' ? (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {['Admin', 'Manager', 'Developer', 'Designer', 'Moderator', 'Contributor'].map((role) => (
              <div key={role} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-white">{users.filter((u) => u.role === role).length}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{role}s</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, i) => {
              const userTasks = tasks.filter((t) => t.assigneeId === user.id)
              const completedTasks = userTasks.filter((t) => t.status === 'Completed').length
              const userProjects = projects.filter((p) => p.members.includes(user.id))
              const userBrands = user.brands[0] === 'all' ? brands : brands.filter((b) => user.brands.includes(b.id))

              return (
                <Link key={user.id} to={`/os/team/${user.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white/60">{user.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white">{user.name}</h3>
                      <p className="text-xs text-white/40 mt-0.5">{user.title}</p>
                      <span className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full border ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.04] grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-sm font-bold text-white">{userProjects.length}</p>
                      <p className="text-[10px] text-white/30">Projects</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{userTasks.length}</p>
                      <p className="text-[10px] text-white/30">Tasks</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{completedTasks}</p>
                      <p className="text-[10px] text-white/30">Done</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[10px] text-white/25 mb-1.5">Brands</p>
                    <div className="flex flex-wrap gap-1">
                      {userBrands.map((b) => (
                        <span key={b.id} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]" style={{ color: b.color }}>
                          {b.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/[0.04]">
                    <p className="text-[10px] text-white/20 truncate">{user.email}</p>
                    <p className="text-[10px] text-white/15 mt-0.5">Joined {user.joinedDate}</p>
                  </div>
                  <p className="text-[10px] text-white/20 mt-2">View skill tree →</p>
                </motion.div>
                </Link>
              )
            })}
          </div>
        </>
      ) : (
        <>
          {/* Positions summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-xl font-bold text-blue-400">{openPositions.filter((p) => p.status === 'Open').length}</p>
              <p className="text-xs text-blue-400/60 mt-1">Open Positions</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-xl font-bold text-amber-400">{openPositions.filter((p) => p.status === 'Interviewing').length}</p>
              <p className="text-xs text-amber-400/60 mt-1">Interviewing</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-xl font-bold text-emerald-400">{openPositions.filter((p) => p.status === 'Filled').length}</p>
              <p className="text-xs text-emerald-400/60 mt-1">Filled</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <p className="text-xl font-bold text-white">{[...new Set(openPositions.map((p) => p.department))].length}</p>
              <p className="text-xs text-white/40 mt-1">Departments</p>
            </div>
          </div>

          {/* Department breakdown */}
          <div className="flex flex-wrap gap-2">
            {[...new Set(openPositions.map((p) => p.department))].map((dept) => {
              const count = openPositions.filter((p) => p.department === dept).length
              return (
                <span key={dept} className={`text-xs px-3 py-1.5 rounded-lg border ${deptColors[dept] || 'bg-white/5 text-white/40 border-white/10'}`}>
                  {dept} ({count})
                </span>
              )
            })}
          </div>

          {/* Position cards */}
          <div className="space-y-3">
            {openPositions.map((pos, i) => {
              const isExpanded = expandedPos === pos.id
              return (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-all"
                >
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedPos(isExpanded ? null : pos.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                          <span className="text-sm text-white/20 font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{pos.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${deptColors[pos.department] || 'bg-white/5 text-white/40 border-white/10'}`}>
                              {pos.department}
                            </span>
                            <span className="text-[10px] text-white/20">{pos.type}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-14 sm:ml-0">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full border ${
                          pos.status === 'Open' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          pos.status === 'Interviewing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {pos.status}
                        </span>
                        <span className="text-xs text-white/15">{isExpanded ? '▲' : '▼'}</span>
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
                        <div className="px-5 pb-5 border-t border-white/[0.04] pt-4">
                          <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">Key Responsibilities</h4>
                          <div className="space-y-2">
                            {pos.responsibilities.map((resp, ri) => (
                              <div key={ri} className="flex items-start gap-3">
                                <span className="w-5 h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-[9px] text-white/30">{ri + 1}</span>
                                </span>
                                <p className="text-sm text-white/50 leading-relaxed">{resp}</p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-5 pt-4 border-t border-white/[0.04] flex flex-wrap gap-2">
                            <span className="text-[10px] text-white/20">Cross-brand role — may support: </span>
                            {['District88', 'Divergent Studios', 'Velvair Studios', 'Canjustalllove'].map((brand) => (
                              <span key={brand} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/30">
                                {brand}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
