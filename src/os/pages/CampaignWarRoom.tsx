import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../store/DataContext'

interface WarRoomData {
  campaignId: string
  goal: string
  phases: { name: string; dates: string; status: 'completed' | 'active' | 'upcoming' }[]
  assets: { name: string; type: string; status: string }[]
  team: { id: string; role: string }[]
  metrics: { label: string; value: string; change: string; up: boolean }[]
  discussion: { author: string; text: string; time: string }[]
}

const warRoomData: Record<string, WarRoomData> = {
  c1: {
    campaignId: 'c1',
    goal: 'Drive 500+ sales during NOVA limited drop with 120K+ reach through social media blitz and influencer partnerships.',
    phases: [
      { name: 'Teaser Phase', dates: 'Mar 1-10', status: 'completed' },
      { name: 'Announcement', dates: 'Mar 11-20', status: 'active' },
      { name: 'Pre-orders', dates: 'Mar 21-Apr 5', status: 'upcoming' },
      { name: 'Launch Day', dates: 'Apr 15', status: 'upcoming' },
      { name: 'Post-Launch', dates: 'Apr 16-30', status: 'upcoming' },
    ],
    assets: [
      { name: 'NOVA Key Visual', type: 'Graphic', status: 'Approved' },
      { name: 'Teaser Reel #1', type: 'Video', status: 'Published' },
      { name: 'Lookbook Layout', type: 'Design', status: 'In Review' },
      { name: 'Ad Creative Set', type: 'Graphic', status: 'In Progress' },
      { name: 'Behind-the-Scenes Video', type: 'Video', status: 'Filming' },
      { name: 'Email Templates', type: 'Design', status: 'Approved' },
    ],
    team: [
      { id: 'u1', role: 'Campaign Lead' },
      { id: 'u3', role: 'Lead Designer' },
      { id: 'u5', role: 'Content Director' },
      { id: 'u8', role: 'Marketing Manager' },
    ],
    metrics: [
      { label: 'Reach', value: '48,200', change: '+12%', up: true },
      { label: 'Engagement', value: '4.8%', change: '+0.6%', up: true },
      { label: 'Link Clicks', value: '2,340', change: '+18%', up: true },
      { label: 'Email Signups', value: '186', change: '+24%', up: true },
    ],
    discussion: [
      { author: 'u8', text: 'Teaser reel hit 12K views in 2 hours. Great momentum.', time: '2 hours ago' },
      { author: 'u3', text: 'Lookbook is ready for final review. Sending over now.', time: '4 hours ago' },
      { author: 'u1', text: 'Let\'s push up the announcement date by 2 days. Ride the wave.', time: '6 hours ago' },
      { author: 'u5', text: 'Behind-the-scenes footage is incredible. Editing tonight.', time: '8 hours ago' },
    ],
  },
  c2: {
    campaignId: 'c2',
    goal: 'Launch District88 platform to public with multi-phase rollout: teaser, beta access, then full public launch.',
    phases: [
      { name: 'Strategy & Planning', dates: 'Mar 15-Apr 15', status: 'active' },
      { name: 'Beta Teaser', dates: 'Apr 16-30', status: 'upcoming' },
      { name: 'Creator Beta', dates: 'May 1-15', status: 'upcoming' },
      { name: 'Public Launch', dates: 'May 16-Jun 1', status: 'upcoming' },
      { name: 'Post-Launch Growth', dates: 'Jun 1-15', status: 'upcoming' },
    ],
    assets: [
      { name: 'Platform Preview Video', type: 'Video', status: 'Script Stage' },
      { name: 'Beta Access Landing Page', type: 'Web', status: 'In Development' },
      { name: 'Press Kit', type: 'Document', status: 'Draft' },
    ],
    team: [
      { id: 'u1', role: 'Campaign Lead' },
      { id: 'u2', role: 'Operations' },
      { id: 'u4', role: 'Developer' },
      { id: 'u8', role: 'Marketing' },
      { id: 'u6', role: 'Community' },
    ],
    metrics: [
      { label: 'Beta Waitlist', value: '342', change: '+8/day', up: true },
      { label: 'Social Mentions', value: '86', change: '+14%', up: true },
      { label: 'Partner Interest', value: '12', change: '+3', up: true },
      { label: 'Dev Progress', value: '65%', change: '+5%', up: true },
    ],
    discussion: [
      { author: 'u4', text: 'Core features are 65% done. On track for beta.', time: '1 day ago' },
      { author: 'u8', text: 'Waitlist growing steadily. Should we add a referral bonus?', time: '2 days ago' },
    ],
  },
  c3: {
    campaignId: 'c3',
    goal: 'Build brand awareness for Canjustalllove Spring line through emotional storytelling centered on self-love.',
    phases: [
      { name: 'Content Creation', dates: 'Feb 14-28', status: 'completed' },
      { name: 'Soft Launch', dates: 'Mar 1-10', status: 'completed' },
      { name: 'Full Campaign', dates: 'Mar 11-25', status: 'active' },
      { name: 'Final Push', dates: 'Mar 26-Apr 1', status: 'upcoming' },
    ],
    assets: [
      { name: 'Spring Love Shoot Gallery', type: 'Photo', status: 'Published' },
      { name: 'Love Stories Reel', type: 'Video', status: 'Published' },
      { name: 'Community Quotes Graphics', type: 'Graphic', status: 'Active' },
    ],
    team: [
      { id: 'u5', role: 'Creative Lead' },
      { id: 'u7', role: 'Content Creator' },
      { id: 'u8', role: 'Marketing Manager' },
    ],
    metrics: [
      { label: 'Reach', value: '32,400', change: '+22%', up: true },
      { label: 'Engagement', value: '6.2%', change: '+1.4%', up: true },
      { label: 'Sales', value: '$4,200', change: '+34%', up: true },
      { label: 'New Followers', value: '+420', change: '+18%', up: true },
    ],
    discussion: [
      { author: 'u7', text: 'Community response has been amazing. Getting UGC submissions daily.', time: '3 hours ago' },
      { author: 'u5', text: 'We should extend the campaign — it\'s performing way above target.', time: '5 hours ago' },
    ],
  },
  c4: {
    campaignId: 'c4',
    goal: 'Generate buzz for Velvair PS2 collection through street culture content and limited pre-orders.',
    phases: [
      { name: 'Concept Development', dates: 'Mar 15-31', status: 'active' },
      { name: 'Content Production', dates: 'Apr 1-10', status: 'upcoming' },
      { name: 'Teaser Release', dates: 'Apr 11-20', status: 'upcoming' },
      { name: 'Pre-order Launch', dates: 'Apr 21-30', status: 'upcoming' },
    ],
    assets: [
      { name: 'PS2 Moodboard', type: 'Design', status: 'Approved' },
      { name: 'Promo Video Concept', type: 'Document', status: 'Draft' },
    ],
    team: [
      { id: 'u3', role: 'Designer' },
      { id: 'u7', role: 'Content Creator' },
    ],
    metrics: [
      { label: 'Concept Score', value: '9.2/10', change: 'Team rated', up: true },
      { label: 'Budget Allocated', value: '$4,000', change: '100%', up: true },
      { label: 'Timeline', value: 'On Track', change: '—', up: true },
      { label: 'Interest', value: '86', change: 'pre-signups', up: true },
    ],
    discussion: [
      { author: 'u3', text: 'Moodboard is locked in. Starting on graphic treatments.', time: '1 day ago' },
    ],
  },
}

export default function CampaignWarRoom() {
  const { campaigns, brands, getUserById } = useData()
  const { campaignId } = useParams()
  const campaign = campaigns.find((c) => c.id === campaignId)
  const warRoom = warRoomData[campaignId || '']

  if (!campaign || !warRoom) {
    return <div className="flex items-center justify-center h-64"><p className="text-white/40">Campaign not found</p></div>
  }

  const brand = brands.find((b) => b.id === campaign.brandId)
  const completedPhases = warRoom.phases.filter((p) => p.status === 'completed').length
  const progress = Math.round((completedPhases / warRoom.phases.length) * 100)

  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/os/campaigns" className="text-xs text-white/30 hover:text-white/50 transition-colors">← All Campaigns</Link>
        <div className="flex items-center gap-4 mt-3">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `${brand?.color}15` }}>
            <span className="text-xl font-bold" style={{ color: brand?.color }}>{brand?.name[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white font-sans">{campaign.name}</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">War Room</span>
            </div>
            <p className="text-sm text-white/40">{brand?.name} · {campaign.budget} · {campaign.startDate} → {campaign.endDate}</p>
          </div>
        </div>
      </motion.div>

      {/* Goal */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Campaign Goal</h3>
        <p className="text-sm text-white/70 leading-relaxed">{warRoom.goal}</p>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {warRoom.metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.03 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xl font-bold text-white">{m.value}</p>
            <p className="text-[10px] text-white/30 mt-0.5">{m.label}</p>
            <p className={`text-[10px] mt-1 ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>{m.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Campaign Timeline</h2>
            <span className="text-xs text-white/30">{progress}% complete</span>
          </div>
          <div className="p-5">
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-6">
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: brand?.color }} />
            </div>
            <div className="space-y-0">
              {warRoom.phases.map((phase, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center w-6 flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${phase.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : phase.status === 'active' ? 'border-blue-500 animate-pulse' : 'border-white/20'}`} style={phase.status === 'active' ? { background: brand?.color, borderColor: brand?.color } : {}} />
                    {i < warRoom.phases.length - 1 && <div className={`w-0.5 flex-1 min-h-[24px] ${phase.status === 'completed' ? 'bg-emerald-500/30' : 'bg-white/[0.06]'}`} />}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm ${phase.status === 'active' ? 'text-white font-medium' : phase.status === 'completed' ? 'text-white/40' : 'text-white/25'}`}>{phase.name}</p>
                    <p className="text-[10px] text-white/20 mt-0.5">{phase.dates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">War Room Team</h2></div>
          <div className="p-5 space-y-3">
            {warRoom.team.map((tm) => {
              const member = getUserById(tm.id)
              return (
                <div key={tm.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center"><span className="text-[10px] font-bold text-white/60">{member?.avatar}</span></div>
                  <div><p className="text-sm text-white">{member?.name}</p><p className="text-[10px] text-white/30">{tm.role}</p></div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Assets */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">Creative Assets</h2></div>
          <div className="divide-y divide-white/[0.04]">
            {warRoom.assets.map((a, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/20">{a.type === 'Video' ? '▶' : a.type === 'Photo' ? '◐' : a.type === 'Graphic' ? '◆' : '▤'}</span>
                  <div><p className="text-sm text-white/70">{a.name}</p><p className="text-[10px] text-white/25">{a.type}</p></div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${a.status === 'Published' || a.status === 'Approved' || a.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : a.status === 'In Review' || a.status === 'In Progress' || a.status === 'Filming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Discussion */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]"><h2 className="text-sm font-semibold text-white">War Room Communication</h2></div>
          <div className="divide-y divide-white/[0.04]">
            {warRoom.discussion.map((msg, i) => {
              const author = getUserById(msg.author)
              return (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center"><span className="text-[7px] font-bold text-white/50">{author?.avatar}</span></div>
                    <span className="text-xs font-medium text-white/60">{author?.name}</span>
                    <span className="text-[10px] text-white/15">{msg.time}</span>
                  </div>
                  <p className="text-sm text-white/40 mt-1 ml-7">{msg.text}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
