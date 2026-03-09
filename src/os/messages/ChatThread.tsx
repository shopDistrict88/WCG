import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../store/DataContext'
import type { EnhancedMessage } from './messagesData'

interface ChatThreadProps {
  messages: EnhancedMessage[]
  getReplies: (parentId: string) => EnhancedMessage[]
  currentUserId?: string
  expandedThreads: Set<string>
  onToggleThread: (id: string) => void
  onConvertToTask: (msg: EnhancedMessage) => void
  onNavigateProject?: (projectId: string) => void
  showInput?: boolean
  inputValue: string
  onInputChange: (v: string) => void
  onSend: (parentId?: string) => void
}

export function ChatThread({
  messages,
  getReplies,
  currentUserId,
  expandedThreads,
  onToggleThread,
  onConvertToTask,
  onNavigateProject,
  showInput = true,
  inputValue,
  onInputChange,
  onSend,
}: ChatThreadProps) {
  const { getUserById } = useData()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const formatDate = (ts: string) =>
    new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' })

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => {
            const author = getUserById(msg.authorId)
            const isOwn = msg.authorId === currentUserId
            const replies = getReplies(msg.id)
            const expanded = expandedThreads.has(msg.id)

            return (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.2) }}
                className="group"
              >
                <div className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isOwn ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/[0.06] border border-white/10'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-white/60">{author?.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-medium ${isOwn ? 'text-blue-400' : 'text-white/70'}`}>
                        {author?.name}
                      </span>
                      <span className="text-[10px] text-white/20">
                        {formatTime(msg.timestamp)} · {formatDate(msg.timestamp)}
                      </span>
                      {msg.priority && msg.priority !== 'Normal' && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded ${
                            msg.priority === 'Urgent' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {msg.priority}
                        </span>
                      )}
                      {msg.kind && msg.kind !== 'general' && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">
                          {msg.kind.replace('_', ' ')}
                        </span>
                      )}
                      {msg.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded ${
                            msg.badge === 'creative-win' ? 'bg-amber-500/20 text-amber-400' :
                            msg.badge === 'task-done' ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-violet-500/20 text-violet-400'
                          }`}
                        >
                          {msg.badge.replace('-', ' ')}
                        </span>
                      )}
                      {msg.pinned && <span className="text-amber-400 text-[10px]" title="Pinned">📌</span>}
                    </div>
                    {msg.tags && msg.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {msg.tags.map((t) => (
                          <span key={`${t.type}-${t.id}`} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">
                            {t.type}: {t.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {msg.projectId && onNavigateProject && (
                      <button
                        onClick={() => onNavigateProject(msg.projectId!)}
                        className="text-[9px] text-violet-400/80 hover:text-violet-400 mt-0.5"
                      >
                        Open project →
                      </button>
                    )}
                    {msg.threadTags && msg.threadTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {msg.threadTags.map((tag) => (
                          <span key={tag} className="text-[9px] text-violet-400/80">#{tag}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-white/50 mt-0.5 leading-relaxed">{msg.content}</p>
                    {msg.media && msg.media.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.media.map((m) => (
                          <div
                            key={m.id}
                            className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/6 flex items-center gap-2 text-xs text-white/60"
                          >
                            <span className="text-white/40">
                              {m.type === 'image' ? '🖼' : m.type === 'video' ? '🎬' : '📎'}
                            </span>
                            <a href={m.url} className="hover:text-white/80 truncate max-w-[120px]">{m.name}</a>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      {replies.length > 0 && (
                        <button
                          onClick={() => onToggleThread(msg.id)}
                          className="text-[10px] text-white/40 hover:text-white/60 flex items-center gap-1"
                        >
                          {expanded ? '−' : '+'} {replies.length} reply{replies.length !== 1 ? 's' : ''}
                        </button>
                      )}
                      {!msg.taskId && (
                        <button
                          onClick={() => onConvertToTask(msg)}
                          className="text-[10px] text-white/40 hover:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Convert to task
                        </button>
                      )}
                      {msg.taskId && <span className="text-[10px] text-violet-400/80">Linked to task</span>}
                    </div>
                  </div>
                </div>

                {replies.length > 0 && expanded && (
                  <div className="ml-11 mt-2 pl-4 border-l-2 border-white/6 space-y-2">
                    {replies.map((reply) => {
                      const replyAuthor = getUserById(reply.authorId)
                      const replyOwn = reply.authorId === currentUserId
                      return (
                        <div key={reply.id} className="flex gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] ${replyOwn ? 'bg-blue-500/20' : 'bg-white/[0.06]'}`}>
                            {replyAuthor?.avatar}
                          </div>
                          <div>
                            <span className={`text-[10px] font-medium ${replyOwn ? 'text-blue-400' : 'text-white/60'}`}>
                              {replyAuthor?.name}
                            </span>
                            <span className="text-[10px] text-white/20 ml-1">{formatTime(reply.timestamp)}</span>
                            <p className="text-xs text-white/50 mt-0.5">{reply.content}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {showInput && (
        <div className="px-4 py-3 border-t border-white/6 shrink-0">
          <p className="text-[10px] text-white/30 mb-1">Drag & drop files · Convert messages to tasks</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && onSend()}
              placeholder="Type a message..."
              className="flex-1 bg-white/[0.03] border border-white/6 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/[0.12]"
            />
            <button
              onClick={() => onSend()}
              disabled={!inputValue.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
