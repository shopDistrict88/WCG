export type UserRole = 'Admin' | 'Manager' | 'Developer' | 'Designer' | 'Moderator' | 'Contributor'

export interface OSUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  title: string
  brands: string[]
  joinedDate: string
}

export interface Brand {
  id: string
  name: string
  category: string
  status: 'Active' | 'In Development' | 'Planning'
  color: string
  members: string[]
  description: string
}

export interface Project {
  id: string
  name: string
  brandId: string
  description: string
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed'
  deadline: string
  members: string[]
  progress: number
  tasks: number
  completedTasks: number
}

export interface Task {
  id: string
  title: string
  description: string
  projectId: string
  assigneeId: string
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed'
  dueDate: string
  comments: number
  attachments: number
}

export interface Campaign {
  id: string
  name: string
  brandId: string
  status: 'Draft' | 'Active' | 'Completed'
  startDate: string
  endDate: string
  budget: string
  reach: string
  strategy: string
}

export interface Idea {
  id: string
  title: string
  description: string
  category: string
  authorId: string
  votes: number
  comments: number
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Implemented'
  createdAt: string
}

export interface Message {
  id: string
  channel: string
  authorId: string
  content: string
  timestamp: string
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  target: string
  timestamp: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  authorId: string
  date: string
  priority: 'Normal' | 'Important' | 'Urgent'
}

export interface WikiArticle {
  id: string
  title: string
  category: string
  content: string
  lastUpdated: string
  authorId: string
}

export interface Asset {
  id: string
  name: string
  type: 'Logo' | 'Font' | 'Mockup' | 'Photo' | 'Video' | 'Design' | 'Document'
  brandId: string
  projectId?: string
  url: string
  uploadedBy: string
  uploadedAt: string
  size: string
}

export interface Photoshoot {
  id: string
  concept: string
  location: string
  date: string
  brandId: string
  status: 'Planning' | 'Scheduled' | 'Completed'
  teamMembers: string[]
  shotCount: number
}

export interface ModerationItem {
  id: string
  type: 'Post' | 'Comment' | 'User'
  reason: string
  reportedBy: string
  status: 'Pending' | 'Approved' | 'Removed' | 'Dismissed'
  date: string
  content: string
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  Admin: ['*'],
  Manager: ['dashboard', 'brands', 'projects', 'tasks', 'creative', 'campaigns', 'photoshoots', 'vault', 'team', 'ideas', 'wiki', 'messages', 'analytics'],
  Developer: ['dashboard', 'projects', 'tasks', 'creative', 'vault', 'ideas', 'wiki', 'messages'],
  Designer: ['dashboard', 'projects', 'tasks', 'creative', 'vault', 'ideas', 'wiki', 'messages', 'photoshoots'],
  Moderator: ['dashboard', 'tasks', 'moderation', 'messages', 'wiki'],
  Contributor: ['dashboard', 'tasks', 'ideas', 'messages', 'wiki'],
}
