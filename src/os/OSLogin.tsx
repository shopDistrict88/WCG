import { useState, type FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from './auth'

export default function OSLogin() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/os" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const success = await login(email, password)
    if (success) {
      navigate('/os')
    } else {
      setError('Invalid credentials. Check your email and password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-6"
          >
            <span className="text-xl font-bold text-white tracking-wider">W</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-sans">WCG OS</h1>
          <p className="text-sm text-white/40 mt-2">Wilson Collective Group — Internal Operating System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-xl">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  placeholder="you@wilsoncollectivegroup.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400/80 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-3 rounded-xl transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button type="button" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              Forgot password?
            </button>
          </div>
        </form>

        <div className="mt-8 bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
          <p className="text-xs text-white/30 mb-3 text-center">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: 'Admin', email: 'devin@wilsoncollectivegroup.com', pw: 'admin123' },
              { label: 'Manager', email: 'jordan@wcg.com', pw: 'manager123' },
              { label: 'Designer', email: 'aaliyah@wcg.com', pw: 'designer123' },
              { label: 'Developer', email: 'marcus@wcg.com', pw: 'dev123' },
            ].map((acc) => (
              <button
                key={acc.label}
                type="button"
                onClick={() => { setEmail(acc.email); setPassword(acc.pw) }}
                className="text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-lg px-3 py-2 transition-colors"
              >
                <span className="text-white/60 font-medium">{acc.label}</span>
                <span className="block text-white/25 text-[10px] mt-0.5 truncate">{acc.email}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
