import { useParams, Link } from 'react-router-dom'
import { useData } from '../store/DataContext'

interface Skill {
  id: string
  name: string
  category: 'creative' | 'technical' | 'business'
  parent?: string
  unlocked: boolean
  xpToUnlock: number
}

interface EmployeeProfile {
  id: string
  level: number
  xp: number
  xpToNext: number
  skills: Skill[]
  achievements: { id: string; name: string; date: string; icon: string }[]
  permissions: string[]
  projectsCompleted: number
}

const skillTrees: Record<string, EmployeeProfile> = {
  u1: {
    id: 'u1',
    level: 10,
    xp: 2450,
    xpToNext: 500,
    projectsCompleted: 24,
    skills: [
      { id: 's1', name: 'Leadership', category: 'business', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Strategy', category: 'business', parent: 's1', unlocked: true, xpToUnlock: 200 },
      { id: 's3', name: 'Brand Vision', category: 'business', parent: 's1', unlocked: true, xpToUnlock: 200 },
      { id: 's4', name: 'Operations', category: 'business', parent: 's2', unlocked: true, xpToUnlock: 400 },
      { id: 's5', name: 'Financial Planning', category: 'business', parent: 's2', unlocked: true, xpToUnlock: 400 },
    ],
    achievements: [
      { id: 'a1', name: 'Founded WCG', date: 'Jan 2024', icon: '★' },
      { id: 'a2', name: 'First 5 Brands Launched', date: 'Jul 2024', icon: '◆' },
      { id: 'a3', name: 'OS Architect', date: 'Feb 2026', icon: '⬡' },
    ],
    permissions: ['Full admin', 'All modules', 'CEO panel', 'User management'],
  },
  u2: {
    id: 'u2',
    level: 5,
    xp: 780,
    xpToNext: 220,
    projectsCompleted: 12,
    skills: [
      { id: 's1', name: 'Operations', category: 'business', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Inventory Management', category: 'business', parent: 's1', unlocked: true, xpToUnlock: 150 },
      { id: 's3', name: 'Workflow Design', category: 'business', parent: 's1', unlocked: true, xpToUnlock: 150 },
      { id: 's4', name: 'Supply Chain', category: 'business', parent: 's2', unlocked: false, xpToUnlock: 300 },
      { id: 's5', name: 'Team Coordination', category: 'business', parent: 's3', unlocked: true, xpToUnlock: 300 },
    ],
    achievements: [
      { id: 'a1', name: '100 Orders Fulfilled', date: 'Dec 2024', icon: '▣' },
      { id: 'a2', name: 'Workflow Architect', date: 'Jan 2026', icon: '✦' },
    ],
    permissions: ['Operations', 'Brands', 'Tasks', 'Workflows'],
  },
  u3: {
    id: 'u3',
    level: 6,
    xp: 920,
    xpToNext: 80,
    projectsCompleted: 18,
    skills: [
      { id: 's1', name: 'Graphic Design', category: 'creative', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Brand Identity', category: 'creative', parent: 's1', unlocked: true, xpToUnlock: 200 },
      { id: 's3', name: 'Campaign Graphics', category: 'creative', parent: 's1', unlocked: true, xpToUnlock: 200 },
      { id: 's4', name: 'Logo Design', category: 'creative', parent: 's2', unlocked: true, xpToUnlock: 350 },
      { id: 's5', name: 'UI Design', category: 'technical', parent: 's3', unlocked: true, xpToUnlock: 350 },
      { id: 's6', name: 'Design Mentorship', category: 'creative', parent: 's4', unlocked: false, xpToUnlock: 500 },
    ],
    achievements: [
      { id: 'a1', name: 'Creative Battle Champion', date: 'Mar 2026', icon: '⚔' },
      { id: 'a2', name: '10 Brand Assets Delivered', date: 'Feb 2026', icon: '✦' },
    ],
    permissions: ['Creative Studio', 'Design approval', 'Start battles', 'Asset Vault'],
  },
  u4: {
    id: 'u4',
    level: 7,
    xp: 1150,
    xpToNext: 150,
    projectsCompleted: 22,
    skills: [
      { id: 's1', name: 'Development', category: 'technical', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Website Editing', category: 'technical', parent: 's1', unlocked: true, xpToUnlock: 250 },
      { id: 's3', name: 'Automation', category: 'technical', parent: 's1', unlocked: true, xpToUnlock: 250 },
      { id: 's4', name: 'E-commerce Systems', category: 'technical', parent: 's2', unlocked: true, xpToUnlock: 400 },
      { id: 's5', name: 'API Integration', category: 'technical', parent: 's3', unlocked: false, xpToUnlock: 400 },
    ],
    achievements: [
      { id: 'a1', name: 'WCG Dashboard Built', date: 'Oct 2024', icon: '▣' },
      { id: 'a2', name: 'Auth System Shipped', date: 'Mar 2026', icon: '◆' },
    ],
    permissions: ['All tech modules', 'Site health', 'Bug reporting'],
  },
  u5: {
    id: 'u5',
    level: 5,
    xp: 650,
    xpToNext: 350,
    projectsCompleted: 14,
    skills: [
      { id: 's1', name: 'Content Creation', category: 'creative', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Photography', category: 'creative', parent: 's1', unlocked: true, xpToUnlock: 180 },
      { id: 's3', name: 'Video Editing', category: 'creative', parent: 's1', unlocked: true, xpToUnlock: 180 },
      { id: 's4', name: 'Creative Direction', category: 'creative', parent: 's2', unlocked: true, xpToUnlock: 320 },
      { id: 's5', name: 'Campaign Production', category: 'business', parent: 's4', unlocked: false, xpToUnlock: 320 },
    ],
    achievements: [
      { id: 'a1', name: 'Spring Love Campaign Lead', date: 'Mar 2026', icon: '◉' },
      { id: 'a2', name: '5 Photoshoots Completed', date: 'Feb 2026', icon: '◐' },
    ],
    permissions: ['Creative Studio', 'Photoshoots', 'Campaigns', 'Content approval'],
  },
  u6: {
    id: 'u6',
    level: 3,
    xp: 320,
    xpToNext: 180,
    projectsCompleted: 8,
    skills: [
      { id: 's1', name: 'Community Moderation', category: 'business', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Conflict Resolution', category: 'business', parent: 's1', unlocked: true, xpToUnlock: 150 },
      { id: 's3', name: 'Policy Writing', category: 'business', parent: 's1', unlocked: false, xpToUnlock: 150 },
    ],
    achievements: [
      { id: 'a1', name: '50 Moderation Actions', date: 'Feb 2026', icon: '◬' },
    ],
    permissions: ['Moderation', 'Messages', 'Community'],
  },
  u7: {
    id: 'u7',
    level: 4,
    xp: 480,
    xpToNext: 120,
    projectsCompleted: 11,
    skills: [
      { id: 's1', name: 'Content Creation', category: 'creative', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Social Media', category: 'creative', parent: 's1', unlocked: true, xpToUnlock: 120 },
      { id: 's3', name: 'Photography', category: 'creative', parent: 's1', unlocked: true, xpToUnlock: 120 },
      { id: 's4', name: 'Reels & Shorts', category: 'creative', parent: 's2', unlocked: false, xpToUnlock: 250 },
    ],
    achievements: [
      { id: 'a1', name: 'Battle Runner-Up', date: 'Mar 2026', icon: '⚔' },
    ],
    permissions: ['Creative Studio', 'Content upload', 'Photoshoots'],
  },
  u8: {
    id: 'u8',
    level: 5,
    xp: 710,
    xpToNext: 290,
    projectsCompleted: 9,
    skills: [
      { id: 's1', name: 'Marketing Strategy', category: 'business', unlocked: true, xpToUnlock: 0 },
      { id: 's2', name: 'Campaign Management', category: 'business', parent: 's1', unlocked: true, xpToUnlock: 200 },
      { id: 's3', name: 'Paid Ads', category: 'business', parent: 's1', unlocked: true, xpToUnlock: 200 },
      { id: 's4', name: 'Influencer Partnerships', category: 'business', parent: 's2', unlocked: false, xpToUnlock: 350 },
    ],
    achievements: [
      { id: 'a1', name: 'NOVA Campaign Launch', date: 'Mar 2026', icon: '◉' },
    ],
    permissions: ['Campaigns', 'Analytics', 'Marketing tools'],
  },
}

const categoryColors: Record<string, string> = {
  creative: '#8b5cf6',
  technical: '#10b981',
  business: '#3b82f6',
}

const XP_SOURCES = [
  { source: 'Task completed', xp: 25 },
  { source: 'Creative battle win', xp: 100 },
  { source: 'Campaign launched', xp: 150 },
  { source: 'Idea approved', xp: 50 },
  { source: 'Project completed', xp: 75 },
]

export default function EmployeeSkillTree() {
  const { projects, tasks, getUserById } = useData()
  const { userId } = useParams()
  const user = getUserById(userId || '')
  const profile = userId ? skillTrees[userId] : null

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white/40">Employee not found</p>
        <Link to="/os/team" className="ml-3 text-blue-400 hover:underline">← Back to Team</Link>
      </div>
    )
  }

  const xpProgress = (profile.xp / (profile.xp + profile.xpToNext)) * 100
  const myTasks = tasks.filter((t) => t.assigneeId === user.id)
  const myProjects = projects.filter((p) => p.members.includes(user.id))

  return (
    <div className="space-y-6 max-w-5xl">
      <Link to="/os/team" className="text-xs text-white/30 hover:text-white/50">← Team Directory</Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <span className="text-xl font-bold text-white/60">{user.avatar}</span>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-sm text-white/40">{user.title} · {user.role}</p>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-6 py-3 text-center">
          <p className="text-3xl font-bold text-white">Level {profile.level}</p>
          <p className="text-[10px] text-white/30 mt-0.5">{profile.xp} / {profile.xp + profile.xpToNext} XP</p>
          <div className="mt-1.5 h-1.5 bg-white/[0.06] rounded-full overflow-hidden w-24 mx-auto">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: `${xpProgress}%` }} />
          </div>
        </div>
      </div>

      {/* XP sources */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">How to Earn XP</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {XP_SOURCES.map((s) => (
            <div key={s.source} className="bg-white/[0.03] rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-emerald-400">+{s.xp}</p>
              <p className="text-[10px] text-white/30">{s.source}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Skill Tree */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">Skill Tree</h2>
            <p className="text-[10px] text-white/25 mt-0.5">Unlock skills by earning XP and completing projects</p>
          </div>
          <div className="p-5">
            <div className="space-y-6">
              {['creative', 'technical', 'business'].map((cat) => {
                const catSkills = profile.skills.filter((s) => s.category === cat)
                if (catSkills.length === 0) return null
                return (
                  <div key={cat}>
                    <h4 className="text-[10px] uppercase tracking-wider mb-3" style={{ color: categoryColors[cat] }}>{cat} skills</h4>
                    <div className="space-y-2">
                      {catSkills.map((skill) => {
                        const parent = skill.parent ? profile.skills.find((s) => s.id === skill.parent) : null
                        return (
                          <div key={skill.id} className="flex items-center gap-3">
                            {parent && <div className="w-4 h-0.5 rounded" style={{ background: `${categoryColors[cat]}30` }} />}
                            <div
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${skill.unlocked ? 'opacity-100' : 'opacity-40'}`}
                              style={{
                                background: skill.unlocked ? `${categoryColors[cat]}15` : 'transparent',
                                borderColor: skill.unlocked ? `${categoryColors[cat]}40` : 'rgba(255,255,255,0.06)',
                              }}
                            >
                              <span className="text-sm">{skill.unlocked ? '✓' : '○'}</span>
                              <span className={`text-sm ${skill.unlocked ? 'text-white' : 'text-white/40'}`}>{skill.name}</span>
                              {!skill.unlocked && <span className="text-[10px] text-white/20 ml-auto">{skill.xpToUnlock} XP to unlock</span>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Achievements</h3></div>
            <div className="p-5 space-y-2">
              {profile.achievements.map((a) => (
                <div key={a.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">{a.icon}</div>
                  <div><p className="text-xs text-white">{a.name}</p><p className="text-[10px] text-white/25">{a.date}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Unlocked Permissions</h3></div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                {profile.permissions.map((p) => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06]"><h3 className="text-sm font-semibold text-white">Current Work</h3></div>
            <div className="p-5 space-y-2">
              <p className="text-[10px] text-white/25">{myTasks.length} assigned tasks</p>
              <p className="text-[10px] text-white/25">{myProjects.length} active projects</p>
              <p className="text-xs text-white/50">{profile.projectsCompleted} total completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
