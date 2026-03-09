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

const STORAGE_KEY = 'wcg_os_data'

export interface StoreState {
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
}

const emptyState: StoreState = {
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

function loadState(): StoreState {
  try {
    if (typeof window === 'undefined') return emptyState
    const s = localStorage.getItem(STORAGE_KEY)
    if (!s) return emptyState
    const parsed = JSON.parse(s)
    return { ...emptyState, ...parsed }
  } catch {
    return emptyState
  }
}

function saveState(state: StoreState) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function getStoredState(): StoreState {
  return loadState()
}

export function saveStoredState(state: StoreState) {
  saveState(state)
}

export function resetStore() {
  saveState(emptyState)
}
