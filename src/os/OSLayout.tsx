import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './auth'

const navSections = [
  {
    label: 'CORE',
    items: [
      { to: '/os', icon: '◆', label: 'Mission Control', module: 'dashboard', end: true },
      { to: '/os/brands', icon: '◈', label: 'Brands', module: 'brands' },
      { to: '/os/expansion', icon: '◇', label: 'Expansion', module: 'brands' },
      { to: '/os/projects', icon: '▣', label: 'Projects', module: 'projects' },
      { to: '/os/tasks', icon: '☐', label: 'Tasks', module: 'tasks' },
    ],
  },
  {
    label: 'CREATIVE',
    items: [
      { to: '/os/creative', icon: '✦', label: 'Creative Studio', module: 'creative' },
      { to: '/os/battles', icon: '⚔', label: 'Battle Mode', module: 'creative' },
      { to: '/os/campaigns', icon: '◉', label: 'Campaigns', module: 'campaigns' },
      { to: '/os/drops', icon: '◈', label: 'Product Drops', module: 'campaigns' },
      { to: '/os/photoshoots', icon: '◐', label: 'Photoshoots', module: 'photoshoots' },
      { to: '/os/vault', icon: '◧', label: 'Asset Vault', module: 'vault' },
    ],
  },
  {
    label: 'PEOPLE',
    items: [
      { to: '/os/team', icon: '◎', label: 'Team Directory', module: 'team' },
      { to: '/os/moderation', icon: '◬', label: 'Moderation', module: 'moderation' },
      { to: '/os/messages', icon: '◫', label: 'Messages', module: 'messages' },
    ],
  },
  {
    label: 'KNOWLEDGE',
    items: [
      { to: '/os/ideas', icon: '◇', label: 'Idea Lab', module: 'ideas' },
      { to: '/os/market', icon: '◈', label: 'Idea Market', module: 'ideas' },
      { to: '/os/wiki', icon: '▤', label: 'Knowledge Base', module: 'wiki' },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { to: '/os/workflows', icon: '✦', label: 'Workflows', module: 'dashboard' },
      { to: '/os/map', icon: '◈', label: 'Company Map', module: 'dashboard' },
      { to: '/os/universe', icon: '◉', label: 'Universe Map', module: 'dashboard' },
      { to: '/os/evolution', icon: '◉', label: 'Brand Evolution', module: 'brands' },
      { to: '/os/timeline', icon: '▥', label: 'Company Timeline', module: 'dashboard' },
      { to: '/os/workspaces', icon: '⊞', label: 'Role Workspaces', module: 'dashboard' },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { to: '/os/intelligence', icon: '▥', label: 'Intelligence Center', module: 'analytics' },
      { to: '/os/analytics', icon: '◇', label: 'Analytics', module: 'analytics' },
      { to: '/os/admin', icon: '⬡', label: 'CEO Panel', module: 'admin' },
    ],
  },
]

export default function OSLayout() {
  const { user, logout, hasPermission, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/os/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0d0d14] border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center">
              <span className="text-sm font-bold tracking-wider">W</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight font-sans">WCG OS</h2>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Internal System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navSections.map((section) => {
            const visibleItems = section.items.filter((item) =>
              isAdmin() || hasPermission(item.module)
            )
            if (visibleItems.length === 0) return null

            return (
              <div key={section.label}>
                <p className="text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] px-3 mb-2">{section.label}</p>
                <div className="space-y-0.5">
                  {visibleItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                          isActive
                            ? 'bg-white/[0.08] text-white'
                            : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                        }`
                      }
                    >
                      <span className="text-xs w-5 text-center opacity-60">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-white/25 hover:text-white/50 transition-colors rounded-lg hover:bg-white/[0.03]"
          >
            ← Back to Website
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 border-b border-white/[0.06] bg-[#0d0d14]/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.06] text-white/50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>

          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-72 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/[0.12] transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.06] text-white/40 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold">{user?.avatar}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-medium text-white/80">{user?.name}</p>
                  <p className="text-[10px] text-white/30">{user?.role}</p>
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-[#14141f] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-white/40">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">{user?.role}</span>
                    </div>
                    <div className="p-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors">
                        Profile Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
