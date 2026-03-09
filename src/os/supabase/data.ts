import { supabase } from './client'
import type {
  OSUser,
  Brand,
  Project,
  Task,
  Campaign,
  Idea,
  Announcement,
  WikiArticle,
  Asset,
  Photoshoot,
  ModerationItem,
  AuditLog,
} from '../types'

// Map camelCase <-> snake_case for Supabase
const toDbUser = (u: OSUser) => ({ ...u, joined_date: u.joinedDate })
const fromDbUser = (r: Record<string, unknown>) => ({
  id: r.id,
  name: r.name,
  email: r.email,
  role: r.role,
  avatar: r.avatar,
  title: r.title,
  brands: (r.brands as string[]) || [],
  joinedDate: r.joined_date,
} as OSUser)

const toDbBrand = (b: Brand) => ({ ...b })
const fromDbBrand = (r: Record<string, unknown>) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  status: r.status,
  color: r.color,
  members: (r.members as string[]) || [],
  description: r.description,
} as Brand)

const toDbProject = (p: Project) => ({
  id: p.id,
  name: p.name,
  brand_id: p.brandId,
  description: p.description,
  status: p.status,
  deadline: p.deadline,
  members: p.members,
  progress: p.progress,
  tasks: p.tasks,
  completed_tasks: p.completedTasks,
})
const fromDbProject = (r: Record<string, unknown>) => ({
  id: r.id,
  name: r.name,
  brandId: r.brand_id,
  description: r.description,
  status: r.status,
  deadline: r.deadline,
  members: (r.members as string[]) || [],
  progress: (r.progress as number) ?? 0,
  tasks: (r.tasks as number) ?? 0,
  completedTasks: (r.completed_tasks as number) ?? 0,
} as Project)

const toDbTask = (t: Task) => ({
  id: t.id,
  title: t.title,
  description: t.description,
  project_id: t.projectId,
  assignee_id: t.assigneeId,
  priority: t.priority,
  status: t.status,
  due_date: t.dueDate,
  comments: t.comments,
  attachments: t.attachments,
})
const fromDbTask = (r: Record<string, unknown>) => ({
  id: r.id,
  title: r.title,
  description: r.description,
  projectId: r.project_id,
  assigneeId: r.assignee_id,
  priority: r.priority,
  status: r.status,
  dueDate: r.due_date,
  comments: (r.comments as number) ?? 0,
  attachments: (r.attachments as number) ?? 0,
} as Task)

const toDbCampaign = (c: Campaign) => ({
  id: c.id,
  name: c.name,
  brand_id: c.brandId,
  status: c.status,
  start_date: c.startDate,
  end_date: c.endDate,
  budget: c.budget,
  reach: c.reach,
  strategy: c.strategy,
})
const fromDbCampaign = (r: Record<string, unknown>) => ({
  id: r.id,
  name: r.name,
  brandId: r.brand_id,
  status: r.status,
  startDate: r.start_date,
  endDate: r.end_date,
  budget: r.budget,
  reach: r.reach,
  strategy: r.strategy,
} as Campaign)

const toDbIdea = (i: Idea) => ({
  id: i.id,
  title: i.title,
  description: i.description,
  category: i.category,
  author_id: i.authorId,
  votes: i.votes,
  comments: i.comments,
  status: i.status,
  created_at: i.createdAt,
})
const fromDbIdea = (r: Record<string, unknown>) => ({
  id: r.id,
  title: r.title,
  description: r.description,
  category: r.category,
  authorId: r.author_id,
  votes: (r.votes as number) ?? 0,
  comments: (r.comments as number) ?? 0,
  status: r.status,
  createdAt: r.created_at,
} as Idea)

const toDbAnnouncement = (a: Announcement) => ({
  id: a.id,
  title: a.title,
  content: a.content,
  author_id: a.authorId,
  date: a.date,
  priority: a.priority,
})
const fromDbAnnouncement = (r: Record<string, unknown>) => ({
  id: r.id,
  title: r.title,
  content: r.content,
  authorId: r.author_id,
  date: r.date,
  priority: r.priority,
} as Announcement)

const toDbWikiArticle = (w: WikiArticle) => ({
  id: w.id,
  title: w.title,
  category: w.category,
  content: w.content,
  last_updated: w.lastUpdated,
  author_id: w.authorId,
})
const fromDbWikiArticle = (r: Record<string, unknown>) => ({
  id: r.id,
  title: r.title,
  category: r.category,
  content: r.content,
  lastUpdated: r.last_updated,
  authorId: r.author_id,
} as WikiArticle)

const toDbAsset = (a: Asset) => ({
  id: a.id,
  name: a.name,
  type: a.type,
  brand_id: a.brandId,
  project_id: a.projectId,
  url: a.url,
  uploaded_by: a.uploadedBy,
  uploaded_at: a.uploadedAt,
  size: a.size,
})
const fromDbAsset = (r: Record<string, unknown>) => ({
  id: r.id,
  name: r.name,
  type: r.type,
  brandId: r.brand_id,
  projectId: r.project_id,
  url: r.url,
  uploadedBy: r.uploaded_by,
  uploadedAt: r.uploaded_at,
  size: r.size,
} as Asset)

const toDbPhotoshoot = (p: Photoshoot) => ({
  id: p.id,
  concept: p.concept,
  location: p.location,
  date: p.date,
  brand_id: p.brandId,
  status: p.status,
  team_members: p.teamMembers,
  shot_count: p.shotCount,
})
const fromDbPhotoshoot = (r: Record<string, unknown>) => ({
  id: r.id,
  concept: r.concept,
  location: r.location,
  date: r.date,
  brandId: r.brand_id,
  status: r.status,
  teamMembers: (r.team_members as string[]) || [],
  shotCount: (r.shot_count as number) ?? 0,
} as Photoshoot)

const toDbModerationItem = (m: ModerationItem) => ({
  id: m.id,
  type: m.type,
  reason: m.reason,
  reported_by: m.reportedBy,
  status: m.status,
  date: m.date,
  content: m.content,
})
const fromDbModerationItem = (r: Record<string, unknown>) => ({
  id: r.id,
  type: r.type,
  reason: r.reason,
  reportedBy: r.reported_by,
  status: r.status,
  date: r.date,
  content: r.content,
} as ModerationItem)

const toDbAuditLog = (a: AuditLog) => ({
  id: a.id,
  user_id: a.userId,
  action: a.action,
  target: a.target,
  timestamp: a.timestamp,
})
const fromDbAuditLog = (r: Record<string, unknown>) => ({
  id: r.id,
  userId: r.user_id,
  action: r.action,
  target: r.target,
  timestamp: r.timestamp,
} as AuditLog)

export async function fetchAllFromSupabase(): Promise<{
  users: OSUser[]
  brands: Brand[]
  projects: Project[]
  tasks: Task[]
  campaigns: Campaign[]
  ideas: Idea[]
  announcements: Announcement[]
  wikiArticles: WikiArticle[]
  assets: Asset[]
  photoshoots: Photoshoot[]
  moderationItems: ModerationItem[]
  auditLogs: AuditLog[]
}> {
  if (!supabase) {
    return {
      users: [],
      brands: [],
      projects: [],
      tasks: [],
      campaigns: [],
      ideas: [],
      announcements: [],
      wikiArticles: [],
      assets: [],
      photoshoots: [],
      moderationItems: [],
      auditLogs: [],
    }
  }

  const [
    { data: usersData },
    { data: brandsData },
    { data: projectsData },
    { data: tasksData },
    { data: campaignsData },
    { data: ideasData },
    { data: announcementsData },
    { data: wikiData },
    { data: assetsData },
    { data: photoshootsData },
    { data: modData },
    { data: auditData },
  ] = await Promise.all([
    supabase.from('os_users').select('*'),
    supabase.from('brands').select('*'),
    supabase.from('projects').select('*'),
    supabase.from('tasks').select('*'),
    supabase.from('campaigns').select('*'),
    supabase.from('ideas').select('*'),
    supabase.from('announcements').select('*'),
    supabase.from('wiki_articles').select('*'),
    supabase.from('assets').select('*'),
    supabase.from('photoshoots').select('*'),
    supabase.from('moderation_items').select('*'),
    supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100),
  ])

  return {
    users: (usersData || []).map((r) => fromDbUser(r as Record<string, unknown>)),
    brands: (brandsData || []).map((r) => fromDbBrand(r as Record<string, unknown>)),
    projects: (projectsData || []).map((r) => fromDbProject(r as Record<string, unknown>)),
    tasks: (tasksData || []).map((r) => fromDbTask(r as Record<string, unknown>)),
    campaigns: (campaignsData || []).map((r) => fromDbCampaign(r as Record<string, unknown>)),
    ideas: (ideasData || []).map((r) => fromDbIdea(r as Record<string, unknown>)),
    announcements: (announcementsData || []).map((r) => fromDbAnnouncement(r as Record<string, unknown>)),
    wikiArticles: (wikiData || []).map((r) => fromDbWikiArticle(r as Record<string, unknown>)),
    assets: (assetsData || []).map((r) => fromDbAsset(r as Record<string, unknown>)),
    photoshoots: (photoshootsData || []).map((r) => fromDbPhotoshoot(r as Record<string, unknown>)),
    moderationItems: (modData || []).map((r) => fromDbModerationItem(r as Record<string, unknown>)),
    auditLogs: (auditData || []).map((r) => fromDbAuditLog(r as Record<string, unknown>)),
  }
}

async function upsertTable(
  table: string,
  row: Record<string, unknown>,
  idKey = 'id'
) {
  if (!supabase) return
  await supabase.from(table).upsert(row, { onConflict: idKey })
}

export async function persistUser(user: OSUser) {
  await upsertTable('os_users', toDbUser(user) as Record<string, unknown>)
}
export async function persistBrand(brand: Brand) {
  await upsertTable('brands', toDbBrand(brand) as Record<string, unknown>)
}
export async function persistProject(project: Project) {
  await upsertTable('projects', toDbProject(project) as Record<string, unknown>)
}
export async function persistTask(task: Task) {
  await upsertTable('tasks', toDbTask(task) as Record<string, unknown>)
}
export async function persistCampaign(campaign: Campaign) {
  await upsertTable('campaigns', toDbCampaign(campaign) as Record<string, unknown>)
}
export async function persistIdea(idea: Idea) {
  await upsertTable('ideas', toDbIdea(idea) as Record<string, unknown>)
}
export async function persistAnnouncement(a: Announcement) {
  await upsertTable('announcements', toDbAnnouncement(a) as Record<string, unknown>)
}
export async function persistWikiArticle(w: WikiArticle) {
  await upsertTable('wiki_articles', toDbWikiArticle(w) as Record<string, unknown>)
}
export async function persistAsset(a: Asset) {
  await upsertTable('assets', toDbAsset(a) as Record<string, unknown>)
}
export async function persistPhotoshoot(p: Photoshoot) {
  await upsertTable('photoshoots', toDbPhotoshoot(p) as Record<string, unknown>)
}
export async function persistModerationItem(m: ModerationItem) {
  await upsertTable('moderation_items', toDbModerationItem(m) as Record<string, unknown>)
}
export async function persistAuditLog(a: AuditLog) {
  await supabase?.from('audit_logs').insert(toDbAuditLog(a) as Record<string, unknown>)
}

// Batch persist for full state sync
export async function persistAll(state: {
  users: OSUser[]
  brands: Brand[]
  projects: Project[]
  tasks: Task[]
  campaigns: Campaign[]
  ideas: Idea[]
  announcements: Announcement[]
  wikiArticles: WikiArticle[]
  assets: Asset[]
  photoshoots: Photoshoot[]
  moderationItems: ModerationItem[]
  auditLogs: AuditLog[]
}) {
  if (!supabase) return
  const tables = [
    ['os_users', state.users.map(toDbUser)],
    ['brands', state.brands.map(toDbBrand)],
    ['projects', state.projects.map(toDbProject)],
    ['tasks', state.tasks.map(toDbTask)],
    ['campaigns', state.campaigns.map(toDbCampaign)],
    ['ideas', state.ideas.map(toDbIdea)],
    ['announcements', state.announcements.map(toDbAnnouncement)],
    ['wiki_articles', state.wikiArticles.map(toDbWikiArticle)],
    ['assets', state.assets.map(toDbAsset)],
    ['photoshoots', state.photoshoots.map(toDbPhotoshoot)],
    ['moderation_items', state.moderationItems.map(toDbModerationItem)],
  ] as const
  for (const [table, rows] of tables) {
    if (rows.length > 0) {
      await supabase.from(table).upsert(rows as Record<string, unknown>[], { onConflict: 'id' })
    }
  }
  for (const log of state.auditLogs.slice(0, 50)) {
    await supabase.from('audit_logs').insert(toDbAuditLog(log) as Record<string, unknown>)
  }
}
