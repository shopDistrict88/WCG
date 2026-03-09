export type MessagePriority = 'Normal' | 'High' | 'Urgent'
export type ThreadTag = 'Photoshoot' | 'Drop' | 'Marketing' | 'Design' | 'Development' | 'Operations' | 'Campaign'
export type MessageKind = 'update' | 'approval_request' | 'question' | 'media' | 'general'

export interface MessageTag {
  type: 'brand' | 'campaign' | 'project'
  id: string
  name: string
  color?: string
}

export interface MessageMedia {
  id: string
  type: 'image' | 'video' | 'file'
  name: string
  url: string
  thumbUrl?: string
}

export interface MessageReaction {
  emoji: string
  userIds: string[]
}

export interface EnhancedMessage {
  id: string
  channel: string
  authorId: string
  content: string
  timestamp: string
  priority?: MessagePriority
  kind?: MessageKind
  tags?: MessageTag[]
  threadTags?: ThreadTag[]
  parentId?: string
  taskId?: string
  projectId?: string
  media?: MessageMedia[]
  pinned?: boolean
  badge?: 'creative-win' | 'task-done' | 'approval' | 'fast-responder' | 'creative-contributor'
  crossBrand?: boolean
  reactions?: MessageReaction[]
}

export type ChannelType = 'project' | 'team' | 'group' | 'brand' | 'cross-brand' | 'general'

export interface ChannelInfo {
  id: string
  name: string
  type: ChannelType
  brandId?: string
  projectId?: string
  teamRole?: string
  pinned?: boolean
  crossBrand?: boolean
}

export interface DirectConversation {
  id: string
  participants: string[]
  lastMessageAt: string
}

export interface NotificationItem {
  id: string
  type: 'approval' | 'media_review' | 'creative_battle' | 'drop_alert' | 'mention' | 'task'
  title: string
  messageId?: string
  channel?: string
  projectId?: string
  taskId?: string
  priority: MessagePriority
  read: boolean
  timestamp: string
  fromUserId?: string
}

export interface PinnedItem {
  id: string
  type: 'channel' | 'dm' | 'thread'
  targetId: string
  label: string
  channel?: string
  messageId?: string
  projectId?: string
}

// --- Project channels are built dynamically from OS projects in Messages.tsx

// --- Team/Role channels
export const teamChannels: ChannelInfo[] = [
  { id: 'ops', name: 'Ops', type: 'team', teamRole: 'Ops', pinned: true },
  { id: 'ops-fulfillment', name: '  ↳ Fulfillment & Shipping', type: 'team', teamRole: 'Ops' },
  { id: 'marketing', name: 'Marketing', type: 'team', teamRole: 'Marketing', pinned: true },
  { id: 'marketing-divergent', name: '  ↳ Divergent Campaigns', type: 'team', teamRole: 'Marketing' },
  { id: 'creative', name: 'Creative', type: 'team', teamRole: 'Creative' },
  { id: 'design', name: 'Design', type: 'team', teamRole: 'Design' },
  { id: 'development', name: 'Development', type: 'team', teamRole: 'Development' },
]

// --- Group channels (brand-wide, cross-brand)
export const groupChannels: ChannelInfo[] = [
  { id: 'gc-district88', name: 'All District88', type: 'group', brandId: 'district88' },
  { id: 'gc-divergent', name: 'All Divergent Studios', type: 'group', brandId: 'divergent' },
  { id: 'gc-designers', name: 'Designers Club', type: 'group', crossBrand: true },
  { id: 'gc-photography', name: 'Photography Team', type: 'group', crossBrand: true },
  { id: 'gc-announcements', name: 'Company Announcements', type: 'group', pinned: true },
]

// Legacy channel IDs mapped to new structure
export const channelIdMap: Record<string, string> = {
  '#announcements': 'gc-announcements',
  '#design': 'design',
  '#development': 'development',
  '#marketing': 'marketing',
  '#district88': 'gc-district88',
  '#divergent': 'gc-divergent',
  '#nova-drop': 'p1',
  '#cross-brand': 'gc-designers',
}

export function buildProjectChannels(projects: { id: string; name: string; brandId: string }[]): ChannelInfo[] {
  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    type: 'project' as const,
    projectId: p.id,
    brandId: p.brandId,
  }))
}

export const enhancedMessages: EnhancedMessage[] = []
export const directConversations: DirectConversation[] = []
export const dmMessages: EnhancedMessage[] = []
export const notificationItems: NotificationItem[] = []
export const pinnedItems: PinnedItem[] = []

const BASE_ROLE_CHANNELS: Record<string, string[]> = {
  Admin: ['ops', 'marketing', 'creative', 'design', 'development', 'gc-district88', 'gc-divergent', 'gc-designers', 'gc-photography', 'gc-announcements'],
  Manager: ['ops', 'marketing', 'gc-district88', 'gc-divergent', 'gc-announcements'],
  Developer: ['development', 'gc-district88', 'gc-announcements'],
  Designer: ['design', 'creative', 'gc-divergent', 'gc-designers', 'gc-announcements'],
  Moderator: ['ops', 'ops-fulfillment', 'gc-district88', 'gc-announcements'],
  Contributor: ['design', 'marketing', 'gc-divergent', 'gc-announcements'],
}

export function getRoleChannels(role: string, projectIds: string[]): string[] {
  const base = BASE_ROLE_CHANNELS[role] ?? BASE_ROLE_CHANNELS.Admin
  if (role === 'Admin') return [...projectIds, ...base]
  if (role === 'Manager') return [...projectIds.slice(0, 4), ...base]
  if (role === 'Developer' || role === 'Designer' || role === 'Contributor') return [...projectIds.slice(0, 2), ...base]
  return base
}
