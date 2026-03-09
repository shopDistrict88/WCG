import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
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
import {
  getStoredState,
  saveStoredState,
  type StoreState,
} from './store'
import {
  supabase,
} from '../supabase/client'
import {
  fetchAllFromSupabase,
  persistUser,
  persistBrand,
  persistProject,
  persistTask,
  persistCampaign,
  persistIdea,
  persistAnnouncement,
  persistWikiArticle,
  persistAsset,
  persistPhotoshoot,
  persistModerationItem,
  persistAuditLog,
} from '../supabase/data'

interface DataContextValue extends StoreState {
  setUsers: (u: OSUser[] | ((prev: OSUser[]) => OSUser[])) => void
  setBrands: (b: Brand[] | ((prev: Brand[]) => Brand[])) => void
  setProjects: (p: Project[] | ((prev: Project[]) => Project[])) => void
  setTasks: (t: Task[] | ((prev: Task[]) => Task[])) => void
  setCampaigns: (c: Campaign[] | ((prev: Campaign[]) => Campaign[])) => void
  setIdeas: (i: Idea[] | ((prev: Idea[]) => Idea[])) => void
  setAnnouncements: (a: Announcement[] | ((prev: Announcement[]) => Announcement[])) => void
  setWikiArticles: (w: WikiArticle[] | ((prev: WikiArticle[]) => WikiArticle[])) => void
  setAssets: (a: Asset[] | ((prev: Asset[]) => Asset[])) => void
  setPhotoshoots: (p: Photoshoot[] | ((prev: Photoshoot[]) => Photoshoot[])) => void
  setModerationItems: (m: ModerationItem[] | ((prev: ModerationItem[]) => ModerationItem[])) => void
  setAuditLogs: (a: AuditLog[] | ((prev: AuditLog[]) => AuditLog[])) => void
  getUserById: (id: string) => OSUser | undefined
  getBrandById: (id: string) => Brand | undefined
  getProjectsByBrand: (brandId: string) => Project[]
  getTasksByProject: (projectId: string) => Task[]
  getTasksByUser: (userId: string) => Task[]
  addUser: (user: Omit<OSUser, 'id'>) => OSUser
  addBrand: (brand: Omit<Brand, 'id'>) => Brand
  addProject: (project: Omit<Project, 'id'>) => Project
  addTask: (task: Omit<Task, 'id'>) => Task
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Campaign
  addAuditLog: (log: Omit<AuditLog, 'id'>) => void
  isLoading: boolean
}

const DataContext = createContext<DataContextValue | null>(null)

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(getStoredState)
  const [isLoading, setIsLoading] = useState(true)

  // Load from Supabase on mount (or keep localStorage fallback)
  useEffect(() => {
    let mounted = true
    async function load() {
      if (supabase) {
        try {
          const data = await fetchAllFromSupabase()
          if (mounted) setState(data)
        } catch (err) {
          console.warn('Supabase fetch failed, using localStorage:', err)
        }
      }
      if (mounted) setIsLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  // Persist to localStorage (always, as fallback)
  useEffect(() => {
    if (!isLoading) saveStoredState(state)
  }, [state, isLoading])

  // Persist to Supabase on change (debounced)
  useEffect(() => {
    if (!supabase || isLoading) return
    const t = setTimeout(async () => {
      try {
        await persistAll(state)
      } catch (err) {
        console.warn('Supabase persist failed:', err)
      }
    }, 500)
    return () => clearTimeout(t)
  }, [state, isLoading])

  const persistAll = useCallback(async (s: StoreState) => {
    for (const u of s.users) await persistUser(u)
    for (const b of s.brands) await persistBrand(b)
    for (const p of s.projects) await persistProject(p)
    for (const t of s.tasks) await persistTask(t)
    for (const c of s.campaigns) await persistCampaign(c)
    for (const i of s.ideas) await persistIdea(i)
    for (const a of s.announcements) await persistAnnouncement(a)
    for (const w of s.wikiArticles) await persistWikiArticle(w)
    for (const a of s.assets) await persistAsset(a)
    for (const p of s.photoshoots) await persistPhotoshoot(p)
    for (const m of s.moderationItems) await persistModerationItem(m)
    for (const a of s.auditLogs.slice(0, 100)) await persistAuditLog(a)
  }, [])

  const update = useCallback(<K extends keyof StoreState>(
    key: K,
    updater: StoreState[K] | ((prev: StoreState[K]) => StoreState[K])
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: typeof updater === 'function' ? (updater as (p: StoreState[K]) => StoreState[K])(prev[key]) : updater,
    }))
  }, [])

  const getUserById = useCallback((id: string) => state.users.find((u) => u.id === id), [state.users])
  const getBrandById = useCallback((id: string) => state.brands.find((b) => b.id === id), [state.brands])
  const getProjectsByBrand = useCallback((brandId: string) => state.projects.filter((p) => p.brandId === brandId), [state.projects])
  const getTasksByProject = useCallback((projectId: string) => state.tasks.filter((t) => t.projectId === projectId), [state.tasks])
  const getTasksByUser = useCallback((userId: string) => state.tasks.filter((t) => t.assigneeId === userId), [state.tasks])

  const addUser = useCallback((user: Omit<OSUser, 'id'>) => {
    const id = generateId('u')
    const full: OSUser = { ...user, id }
    update('users', (prev) => [...prev, full])
    return full
  }, [update])

  const addBrand = useCallback((brand: Omit<Brand, 'id'>) => {
    const id = brand.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || generateId('b')
    const full: Brand = { ...brand, id }
    update('brands', (prev) => [...prev, full])
    return full
  }, [update])

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const id = generateId('p')
    const full: Project = { ...project, id }
    update('projects', (prev) => [...prev, full])
    return full
  }, [update])

  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const id = generateId('t')
    const full: Task = { ...task, id }
    update('tasks', (prev) => [...prev, full])
    return full
  }, [update])

  const addCampaign = useCallback((campaign: Omit<Campaign, 'id'>) => {
    const id = generateId('c')
    const full: Campaign = { ...campaign, id }
    update('campaigns', (prev) => [...prev, full])
    return full
  }, [update])

  const addAuditLog = useCallback((log: Omit<AuditLog, 'id'>) => {
    const id = generateId('al')
    const full: AuditLog = { ...log, id }
    update('auditLogs', (prev) => [full, ...prev])
  }, [update])

  const value: DataContextValue = {
    ...state,
    setUsers: (u) => update('users', u),
    setBrands: (b) => update('brands', b),
    setProjects: (p) => update('projects', p),
    setTasks: (t) => update('tasks', t),
    setCampaigns: (c) => update('campaigns', c),
    setIdeas: (i) => update('ideas', i),
    setAnnouncements: (a) => update('announcements', a),
    setWikiArticles: (w) => update('wikiArticles', w),
    setAssets: (a) => update('assets', a),
    setPhotoshoots: (p) => update('photoshoots', p),
    setModerationItems: (m) => update('moderationItems', m),
    setAuditLogs: (a) => update('auditLogs', a),
    getUserById,
    getBrandById,
    getProjectsByBrand,
    getTasksByProject,
    getTasksByUser,
    addUser,
    addBrand,
    addProject,
    addTask,
    addCampaign,
    addAuditLog,
    isLoading,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
