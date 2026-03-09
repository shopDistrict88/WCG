import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../store/DataContext'
import { useAuth } from '../auth'
import {
  enhancedMessages as initialMessages,
  dmMessages as initialDmMessages,
  buildProjectChannels,
  teamChannels,
  groupChannels,
  directConversations,
  notificationItems as initialNotifications,
  pinnedItems as initialPinned,
  getRoleChannels,
  type EnhancedMessage,
  type MessagePriority,
  type NotificationItem,
  type PinnedItem,
} from '../messages/messagesData'
import { ChatThread } from '../messages/ChatThread'

type TabId = 'projects' | 'teams' | 'dms' | 'gcs' | 'notifications' | 'search' | 'favorites'

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'teams', label: 'Teams', icon: '👥' },
  { id: 'dms', label: 'DMs', icon: '💬' },
  { id: 'gcs', label: 'Group Channels', icon: '🔗' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'search', label: 'Search & Archives', icon: '🔍' },
  { id: 'favorites', label: 'Pinned', icon: '📌' },
]

export default function Messages() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { projects, getUserById } = useData()
  const [activeTab, setActiveTab] = useState<TabId>('projects')
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [messages, setMessages] = useState<EnhancedMessage[]>(initialMessages)
  const [dmMessages, setDmMessages] = useState<EnhancedMessage[]>(initialDmMessages)
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const [pinnedItems] = useState<PinnedItem[]>(initialPinned)
  const [input, setInput] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<MessagePriority | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilters, setSearchFilters] = useState({ brand: '', project: '', role: '' })
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set())

  const projectChannels = useMemo(() => buildProjectChannels(projects), [projects])
  const roleChannels = user ? getRoleChannels(user.role, projects.map((p) => p.id)) : []

  const allMessages = useMemo(() => [...messages, ...dmMessages], [messages, dmMessages])

  const getReplies = (parentId: string) =>
    allMessages
      .filter((m) => m.parentId === parentId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  const channelMessages = useMemo(() => {
    if (!activeChannel) return []
    let list = allMessages.filter((m) => m.channel === activeChannel && !m.parentId)
    if (priorityFilter !== 'all') list = list.filter((m) => m.priority === priorityFilter)
    if (searchQuery.trim() && activeTab === 'search') {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (m) =>
          m.content.toLowerCase().includes(q) ||
          m.tags?.some((t) => t.name.toLowerCase().includes(q)) ||
          m.threadTags?.some((t) => t.toLowerCase().includes(q))
      )
    }
    return list.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }, [allMessages, activeChannel, priorityFilter, searchQuery, activeTab])

  const filteredProjectChannels = useMemo(
    () => projectChannels.filter((ch) => roleChannels.includes(ch.id)),
    [roleChannels]
  )
  const filteredTeamChannels = useMemo(
    () => teamChannels.filter((ch) => roleChannels.includes(ch.id)),
    [roleChannels]
  )
  const filteredGroupChannels = useMemo(
    () => groupChannels.filter((ch) => roleChannels.includes(ch.id)),
    [roleChannels]
  )

  const sendMessage = (parentId?: string) => {
    if (!input.trim() || !user || !activeChannel) return
    const newMsg: EnhancedMessage = {
      id: `m_${Date.now()}`,
      channel: activeChannel,
      authorId: user.id,
      content: input.trim(),
      timestamp: new Date().toISOString(),
      parentId,
    }
    if (activeTab === 'dms') {
      setDmMessages((prev) => [...prev, newMsg])
    } else {
      setMessages((prev) => [...prev, newMsg])
    }
    setInput('')
  }

  const convertToTask = (msg: EnhancedMessage) => {
    if (msg.taskId) return
    const taskId = `t_${Date.now()}`
    const updater = (m: EnhancedMessage) => (m.id === msg.id ? { ...m, taskId } : m)
    if (dmMessages.some((m) => m.id === msg.id)) {
      setDmMessages((prev) => prev.map(updater))
    } else {
      setMessages((prev) => prev.map(updater))
    }
  }

  const toggleThread = (msgId: string) => {
    setExpandedThreads((prev) => {
      const next = new Set(prev)
      if (next.has(msgId)) next.delete(msgId)
      else next.add(msgId)
      return next
    })
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return allMessages.filter(
      (m) =>
        m.content.toLowerCase().includes(q) ||
        m.tags?.some((t) => t.name.toLowerCase().includes(q)) ||
        m.threadTags?.some((t) => t.toLowerCase().includes(q))
    )
  }, [searchQuery, allMessages])

  const unreadCount = notifications.filter((n) => !n.read).length
  const dropDeadline = '2026-04-15'
  const dropHoursLeft = Math.max(
    0,
    Math.floor((new Date(dropDeadline).getTime() - Date.now()) / (1000 * 60 * 60))
  )

  const getDmLabel = (dm: (typeof directConversations)[0]) => {
    const others = dm.participants.filter((id) => id !== user?.id)
    return others.map((id) => getUserById(id)?.name).join(', ') || 'Direct Message'
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex rounded-xl overflow-hidden border border-white/[0.06]">
      {/* Tab nav */}
      <div className="w-14 shrink-0 bg-[#0d0d14] border-r border-white/[0.06] flex flex-col py-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              if (tab.id === 'notifications' && initialNotifications[0]) {
                setActiveChannel(null)
              }
              if (tab.id === 'search') setActiveChannel(null)
              if (tab.id === 'favorites' && initialPinned[0]) {
                const first = initialPinned[0]
                setActiveChannel(first.channel ?? first.targetId)
              }
            }}
            className={`flex flex-col items-center gap-0.5 py-2 px-1 text-[10px] transition-all ${
              activeTab === tab.id ? 'text-white bg-white/[0.08]' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="leading-tight text-center">{tab.label}</span>
            {tab.id === 'notifications' && unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </button>
        ))}
      </div>

      {/* Secondary list (channels, DMs, etc.) */}
      <div className="w-52 shrink-0 bg-[#0d0d14] border-r border-white/[0.06] flex flex-col overflow-hidden hidden sm:flex">
        <div className="px-3 py-3 border-b border-white/[0.06]">
          <h2 className="text-xs font-semibold text-white">{TABS.find((t) => t.id === activeTab)?.label}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {activeTab === 'projects' &&
            filteredProjectChannels.map((ch) => {
              const proj = projects.find((p) => p.id === ch.projectId)
              const count = messages.filter((m) => m.channel === ch.id).length
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                    activeChannel === ch.id ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="truncate">{proj?.name ?? ch.name}</span>
                  <span className="text-[10px] text-white/20 shrink-0">{count}</span>
                </button>
              )
            })}
          {activeTab === 'teams' &&
            filteredTeamChannels.map((ch) => {
              const count = messages.filter((m) => m.channel === ch.id).length
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                    activeChannel === ch.id ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="truncate">{ch.name}</span>
                  <span className="text-[10px] text-white/20 shrink-0">{count}</span>
                </button>
              )
            })}
          {activeTab === 'dms' &&
            directConversations.map((dm) => {
              const count = dmMessages.filter((m) => m.channel === dm.id).length
              return (
                <button
                  key={dm.id}
                  onClick={() => setActiveChannel(dm.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                    activeChannel === dm.id ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="truncate">{getDmLabel(dm)}</span>
                  <span className="text-[10px] text-white/20 shrink-0">{count}</span>
                </button>
              )
            })}
          {activeTab === 'gcs' &&
            filteredGroupChannels.map((ch) => {
              const count = messages.filter((m) => m.channel === ch.id).length
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                    activeChannel === ch.id ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="truncate flex items-center gap-1">
                    {ch.crossBrand && <span className="text-violet-400 text-[10px]">↔</span>}
                    {ch.name}
                  </span>
                  <span className="text-[10px] text-white/20 shrink-0">{count}</span>
                </button>
              )
            })}
          {activeTab === 'notifications' &&
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  if (n.channel) setActiveChannel(n.channel)
                  if (n.messageId) setExpandedThreads((p) => new Set(p).add(n.messageId!.split('_')[0] === 'm' ? n.messageId!.replace('m', 'm') : ''))
                  markNotificationRead(n.id)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  !n.read ? 'bg-amber-500/10 border-l-2 border-amber-500/50' : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] ${
                    n.type === 'approval' ? 'text-violet-400' :
                    n.type === 'media_review' ? 'text-blue-400' :
                    n.type === 'drop_alert' ? 'text-red-400' : 'text-white/60'
                  }`}>
                    {n.type === 'approval' ? '✓' : n.type === 'media_review' ? '🖼' : n.type === 'drop_alert' ? '⚠' : '•'}
                  </span>
                  <span className="text-xs text-white/80 truncate">{n.title}</span>
                </div>
              </button>
            ))}

          {activeTab === 'favorites' &&
            pinnedItems.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActiveChannel(pin.channel ?? pin.targetId)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  activeChannel === (pin.channel ?? pin.targetId) ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:bg-white/[0.03]'
                }`}
              >
                <span>📌</span>
                <span className="truncate">{pin.label}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col bg-[#0a0a0f] min-w-0">
        {activeTab === 'search' ? (
          <>
            <div className="px-5 py-4 border-b border-white/[0.06] space-y-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages, brand, project, #tag..."
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/[0.12]"
              />
              <div className="flex gap-2 flex-wrap">
                <select
                  value={searchFilters.brand}
                  onChange={(e) => setSearchFilters((f) => ({ ...f, brand: e.target.value }))}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-white/60"
                >
                  <option value="">All brands</option>
                  <option value="district88">District88</option>
                  <option value="divergent">Divergent</option>
                </select>
                <select
                  value={searchFilters.project}
                  onChange={(e) => setSearchFilters((f) => ({ ...f, project: e.target.value }))}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-white/60"
                >
                  <option value="">All projects</option>
                  <option value="p1">NOVA Clothing Drop</option>
                  <option value="p2">District88 Mobile UI</option>
                </select>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {searchQuery.trim() ? (
                searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.slice(0, 30).map((m) => {
                      const author = getUserById(m.authorId)
                      return (
                        <div
                          key={m.id}
                          className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06]"
                          onClick={() => {
                            setActiveChannel(m.channel)
                            setActiveTab(m.channel.startsWith('dm') ? 'dms' : 'projects')
                          }}
                        >
                          <div className="flex items-center gap-2 text-[10px] text-white/40">
                            <span>{author?.name}</span>
                            <span>{m.channel}</span>
                            <span>{new Date(m.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-white/70 mt-1">{m.content}</p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-white/40">No results for &quot;{searchQuery}&quot;</p>
                )
              ) : (
                <p className="text-sm text-white/40">Search across all chats, projects, and campaigns.</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-sm font-medium text-white">
                  {activeTab === 'projects' && activeChannel
                    ? projects.find((p) => p.id === activeChannel)?.name ?? activeChannel
                    : activeTab === 'teams' && activeChannel
                    ? teamChannels.find((c) => c.id === activeChannel)?.name ?? activeChannel
                    : activeTab === 'dms' && activeChannel
                    ? getDmLabel(directConversations.find((d) => d.id === activeChannel)!)
                    : activeTab === 'gcs' && activeChannel
                    ? groupChannels.find((c) => c.id === activeChannel)?.name ?? activeChannel
                    : activeTab === 'favorites' && activeChannel
                    ? pinnedItems.find((p) => p.channel === activeChannel || p.targetId === activeChannel)?.label ?? activeChannel
                    : 'Select a channel'}
                </h3>
                {activeChannel && (
                  <>
                    <span className="text-[10px] text-white/20">{channelMessages.length} messages</span>
                    <div className="flex gap-1">
                      {(['all', 'Urgent', 'High', 'Normal'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPriorityFilter(p)}
                          className={`px-2 py-1 rounded text-[10px] ${priorityFilter === p ? 'bg-white/[0.1] text-white' : 'text-white/40 hover:text-white/60'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[10px] text-white/40 hover:text-violet-400">Summarize thread</button>
                <label className="flex items-center gap-1.5 text-[10px] text-white/40">
                  <input type="checkbox" className="rounded" /> Daily digest
                </label>
              </div>
            </div>

            {/* Countdown */}
            {activeChannel === 'p1' && dropHoursLeft > 0 && dropHoursLeft < 72 && (
              <div className="mx-5 mt-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-sm">
                <span className="text-amber-400">Drop goes live in {dropHoursLeft}h</span>
                <span className="text-[10px] text-amber-400/60">April 15, 2026</span>
              </div>
            )}

            {/* Chat or empty state */}
            {activeChannel ? (
              <ChatThread
                messages={channelMessages}
                getReplies={getReplies}
                currentUserId={user?.id}
                expandedThreads={expandedThreads}
                onToggleThread={toggleThread}
                onConvertToTask={convertToTask}
                onNavigateProject={(projectId) => navigate(`/os/projects?highlight=${projectId}`)}
                showInput={activeTab !== 'notifications'}
                inputValue={input}
                onInputChange={setInput}
                onSend={sendMessage}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
                {activeTab === 'notifications' ? 'Select a notification to view' : 'Select a channel to start'}
              </div>
            )}
          </>
        )}

        {/* Mobile channel selector */}
        {activeTab !== 'search' && (
          <select
            value={activeChannel ?? ''}
            onChange={(e) => setActiveChannel(e.target.value || null)}
            className="sm:hidden absolute bottom-20 right-4 bg-white/[0.1] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/80"
          >
            <option value="">Select channel</option>
            {activeTab === 'projects' && filteredProjectChannels.map((ch) => (
              <option key={ch.id} value={ch.id}>{projects.find((p) => p.id === ch.projectId)?.name ?? ch.name}</option>
            ))}
            {activeTab === 'teams' && filteredTeamChannels.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.name}</option>
            ))}
            {activeTab === 'dms' && directConversations.map((dm) => (
              <option key={dm.id} value={dm.id}>{getDmLabel(dm)}</option>
            ))}
            {activeTab === 'gcs' && filteredGroupChannels.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.name}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
