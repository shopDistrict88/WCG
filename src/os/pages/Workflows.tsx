import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WorkflowStep {
  team: string
  action: string
  status: 'completed' | 'active' | 'pending'
  time?: string
}

interface Workflow {
  id: string
  name: string
  trigger: string
  triggerType: 'product' | 'campaign' | 'order' | 'inventory' | 'schedule'
  status: 'active' | 'completed' | 'draft'
  steps: WorkflowStep[]
  lastTriggered?: string
  timesRun: number
}

const workflows: Workflow[] = [
  {
    id: 'wf1',
    name: 'Product Drop Pipeline',
    trigger: 'New product added to catalog',
    triggerType: 'product',
    status: 'active',
    lastTriggered: '2 hours ago',
    timesRun: 8,
    steps: [
      { team: 'Design', action: 'Upload product graphics & mockups', status: 'completed', time: '2h ago' },
      { team: 'Marketing', action: 'Create campaign & content plan', status: 'completed', time: '1h ago' },
      { team: 'Operations', action: 'Confirm inventory & warehouse prep', status: 'active' },
      { team: 'E-commerce', action: 'Create product listing & pricing', status: 'pending' },
      { team: 'Social Media', action: 'Schedule teaser & launch posts', status: 'pending' },
      { team: 'Fulfillment', action: 'Prepare packing materials & labels', status: 'pending' },
    ],
  },
  {
    id: 'wf2',
    name: 'Campaign Launch Sequence',
    trigger: 'Campaign status changed to "Active"',
    triggerType: 'campaign',
    status: 'active',
    lastTriggered: '1 day ago',
    timesRun: 4,
    steps: [
      { team: 'Marketing', action: 'Finalize campaign strategy & budget', status: 'completed', time: '1d ago' },
      { team: 'Content', action: 'Produce campaign creative assets', status: 'completed', time: '20h ago' },
      { team: 'Social Media', action: 'Schedule social posts & stories', status: 'completed', time: '18h ago' },
      { team: 'E-commerce', action: 'Update landing pages & promo codes', status: 'active' },
      { team: 'Sales', action: 'Notify partners & affiliates', status: 'pending' },
      { team: 'Analytics', action: 'Set up tracking & dashboards', status: 'pending' },
    ],
  },
  {
    id: 'wf3',
    name: 'Photoshoot Production Flow',
    trigger: 'Photoshoot scheduled in system',
    triggerType: 'schedule',
    status: 'active',
    lastTriggered: '3 days ago',
    timesRun: 3,
    steps: [
      { team: 'Creative Director', action: 'Approve shoot concept & moodboard', status: 'completed', time: '3d ago' },
      { team: 'Design', action: 'Prepare outfits, props, & shot list', status: 'completed', time: '2d ago' },
      { team: 'Operations', action: 'Book location & coordinate logistics', status: 'completed', time: '2d ago' },
      { team: 'Content', action: 'Execute photoshoot & capture media', status: 'active' },
      { team: 'Content', action: 'Edit, retouch, & deliver final assets', status: 'pending' },
      { team: 'Marketing', action: 'Distribute to campaigns & social', status: 'pending' },
    ],
  },
  {
    id: 'wf4',
    name: 'Order Volume Surge Response',
    trigger: 'Order volume exceeds 50 in 1 hour',
    triggerType: 'order',
    status: 'draft',
    timesRun: 2,
    steps: [
      { team: 'System', action: 'Detect order surge & trigger alert', status: 'pending' },
      { team: 'Operations', action: 'Allocate additional packing staff', status: 'pending' },
      { team: 'Fulfillment', action: 'Switch to batch processing mode', status: 'pending' },
      { team: 'Customer Support', action: 'Prepare for increased inquiries', status: 'pending' },
      { team: 'E-commerce', action: 'Monitor site performance & load', status: 'pending' },
    ],
  },
  {
    id: 'wf5',
    name: 'Low Inventory Auto-Reorder',
    trigger: 'SKU stock drops below threshold',
    triggerType: 'inventory',
    status: 'active',
    lastTriggered: '5 hours ago',
    timesRun: 14,
    steps: [
      { team: 'System', action: 'Detect low stock & flag SKU', status: 'completed', time: '5h ago' },
      { team: 'Operations', action: 'Review reorder recommendation', status: 'completed', time: '4h ago' },
      { team: 'Finance', action: 'Approve purchase order', status: 'active' },
      { team: 'Operations', action: 'Send order to vendor', status: 'pending' },
      { team: 'Fulfillment', action: 'Update expected delivery in system', status: 'pending' },
    ],
  },
  {
    id: 'wf6',
    name: 'New Employee Onboarding',
    trigger: 'New team member added to system',
    triggerType: 'schedule',
    status: 'completed',
    lastTriggered: '1 week ago',
    timesRun: 3,
    steps: [
      { team: 'Admin', action: 'Create OS account & assign role', status: 'completed', time: '7d ago' },
      { team: 'System', action: 'Send welcome email & credentials', status: 'completed', time: '7d ago' },
      { team: 'Manager', action: 'Assign to brands & projects', status: 'completed', time: '6d ago' },
      { team: 'System', action: 'Add to relevant message channels', status: 'completed', time: '6d ago' },
      { team: 'HR', action: 'Schedule orientation & training', status: 'completed', time: '5d ago' },
    ],
  },
]

const triggerIcons: Record<string, string> = { product: '◆', campaign: '◉', order: '▣', inventory: '◧', schedule: '◇' }
const triggerColors: Record<string, string> = { product: '#8b5cf6', campaign: '#ec4899', order: '#3b82f6', inventory: '#f59e0b', schedule: '#10b981' }

export default function Workflows() {
  const [expandedId, setExpandedId] = useState<string | null>('wf1')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = filterStatus === 'all' ? workflows : workflows.filter((w) => w.status === filterStatus)

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Automated Workflows</h1>
          <p className="text-sm text-white/40 mt-1">Cross-department automation triggered by events.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors">+ New Workflow</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-emerald-400">{workflows.filter((w) => w.status === 'active').length}</p>
          <p className="text-xs text-emerald-400/60 mt-1">Active Workflows</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-blue-400">{workflows.reduce((a, w) => a + w.timesRun, 0)}</p>
          <p className="text-xs text-blue-400/60 mt-1">Total Runs</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <p className="text-xl font-bold text-purple-400">{workflows.reduce((a, w) => a + w.steps.length, 0)}</p>
          <p className="text-xs text-purple-400/60 mt-1">Automation Steps</p>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <p className="text-xl font-bold text-white">{[...new Set(workflows.flatMap((w) => w.steps.map((s) => s.team)))].length}</p>
          <p className="text-xs text-white/40 mt-1">Teams Connected</p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'active', 'completed', 'draft'].map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${filterStatus === s ? 'bg-white/[0.1] text-white border border-white/[0.1]' : 'bg-white/[0.02] text-white/40 border border-white/[0.04]'}`}>
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((wf, i) => {
          const isExpanded = expandedId === wf.id
          const completedSteps = wf.steps.filter((s) => s.status === 'completed').length
          const progress = Math.round((completedSteps / wf.steps.length) * 100)

          return (
            <motion.div
              key={wf.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-all"
            >
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : wf.id)}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${triggerColors[wf.triggerType]}15` }}>
                      <span style={{ color: triggerColors[wf.triggerType] }}>{triggerIcons[wf.triggerType]}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{wf.name}</h3>
                      <p className="text-[10px] text-white/30 mt-0.5">Trigger: {wf.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-14 sm:ml-0">
                    <span className="text-[10px] text-white/20">{wf.timesRun} runs</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${wf.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : wf.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}>{wf.status}</span>
                    <span className="text-xs text-white/15">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-3 ml-14">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-white/25">{completedSteps}/{wf.steps.length} steps</span>
                    <span className="text-[10px] text-white/30">{progress}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: triggerColors[wf.triggerType] }} />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/[0.04] pt-4">
                      {wf.lastTriggered && (
                        <p className="text-[10px] text-white/25 mb-4">Last triggered: {wf.lastTriggered}</p>
                      )}
                      {/* Timeline */}
                      <div className="space-y-0">
                        {wf.steps.map((step, si) => (
                          <div key={si} className="flex gap-4">
                            {/* Timeline line */}
                            <div className="flex flex-col items-center w-6 flex-shrink-0">
                              <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                                step.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                                step.status === 'active' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                                'bg-transparent border-white/20'
                              }`} />
                              {si < wf.steps.length - 1 && (
                                <div className={`w-0.5 flex-1 min-h-[32px] ${step.status === 'completed' ? 'bg-emerald-500/30' : 'bg-white/[0.06]'}`} />
                              )}
                            </div>
                            {/* Content */}
                            <div className="pb-4 flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
                                    step.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    step.status === 'active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    'bg-white/[0.03] text-white/30 border-white/[0.06]'
                                  }`}>
                                    {step.team}
                                  </span>
                                  <span className="text-[10px] text-white/15">→</span>
                                </div>
                                {step.time && <span className="text-[10px] text-white/15 flex-shrink-0">{step.time}</span>}
                              </div>
                              <p className={`text-sm mt-1 ${step.status === 'completed' ? 'text-white/40 line-through' : step.status === 'active' ? 'text-white/80' : 'text-white/30'}`}>
                                {step.action}
                              </p>
                            </div>
                          </div>
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
    </div>
  )
}
