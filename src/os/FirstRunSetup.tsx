import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UserRole } from './types'

const AUTH_CREDENTIALS_KEY = 'wcg_auth_credentials'

function saveCredentials(email: string, password: string) {
  try {
    const existing = JSON.parse(localStorage.getItem(AUTH_CREDENTIALS_KEY) || '{}')
    existing[email.toLowerCase()] = password
    localStorage.setItem(AUTH_CREDENTIALS_KEY, JSON.stringify(existing))
  } catch {
    // ignore
  }
}

export function getStoredCredentials(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(AUTH_CREDENTIALS_KEY) || '{}')
  } catch {
    return {}
  }
}

export function validateLogin(email: string, password: string): boolean {
  const creds = getStoredCredentials()
  return creds[email.toLowerCase()] === password
}

interface FirstRunSetupProps {
  onCreateAdmin: (data: { name: string; email: string; password: string; role: UserRole }) => void
}

export default function FirstRunSetup({ onCreateAdmin }: FirstRunSetupProps) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) return
    if (password !== confirm) {
      alert('Passwords do not match')
      return
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    saveCredentials(email, password)
    onCreateAdmin({ name: name.trim(), email: email.trim().toLowerCase(), password, role: 'Admin' })
    navigate('/os/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] p-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0d0d14] p-8">
        <h1 className="text-xl font-semibold text-white mb-1">Wilson Collective OS</h1>
        <p className="text-sm text-white/50 mb-6">First-time setup — create your admin account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/60 mb-1">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/20"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/20"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/20"
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">Confirm password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/20"
              placeholder="Confirm password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Create admin account
          </button>
        </form>
      </div>
    </div>
  )
}
