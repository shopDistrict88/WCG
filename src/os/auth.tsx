import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { OSUser, AuditLog } from './types'
import { ROLE_PERMISSIONS } from './types'
import { useData } from './store/DataContext'
import { validateLogin } from './FirstRunSetup'

interface AuthContextType {
  user: OSUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (module: string) => boolean
  isAdmin: () => boolean
  auditLogs: AuditLog[]
  addAuditLog: (action: string, target: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { users, auditLogs, addAuditLog: addLog } = useData()
  const [user, setUser] = useState<OSUser | null>(() => {
    const saved = sessionStorage.getItem('wcg_os_user')
    if (saved) {
      try {
        const u = JSON.parse(saved)
        const exists = users.find((x) => x.id === u.id)
        return exists ? u : null
      } catch {
        return null
      }
    }
    return null
  })

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!validateLogin(email, password)) return false
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!foundUser) return false

    setUser(foundUser)
    sessionStorage.setItem('wcg_os_user', JSON.stringify(foundUser))
    addLog({
      userId: foundUser.id,
      action: 'Logged in',
      target: 'WCG OS',
      timestamp: new Date().toISOString(),
    })
    return true
  }, [users, addLog])

  const logout = useCallback(() => {
    if (user) {
      addLog({
        userId: user.id,
        action: 'Logged out',
        target: 'WCG OS',
        timestamp: new Date().toISOString(),
      })
    }
    setUser(null)
    sessionStorage.removeItem('wcg_os_user')
  }, [user, addLog])

  const hasPermission = useCallback((module: string) => {
    if (!user) return false
    const perms = ROLE_PERMISSIONS[user.role]
    return perms.includes('*') || perms.includes(module)
  }, [user])

  const isAdmin = useCallback(() => user?.role === 'Admin', [user])

  const addAuditLog = useCallback((action: string, target: string) => {
    if (!user) return
    addLog({ userId: user.id, action, target, timestamp: new Date().toISOString() })
  }, [user, addLog])

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, isAdmin, auditLogs, addAuditLog }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
