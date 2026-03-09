import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBrands } from '../context/BrandsContext'

const BRAND_TYPES = ['Streetwear', 'Platform', 'Creative Studio', 'Service']
const LAUNCH_STATUSES = ['Concept', 'Development', 'Live']
const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#6366f1']

interface Props {
  open: boolean
  onClose: () => void
  cloneFromId?: string
}

export default function BrandCreateModal({ open, onClose, cloneFromId }: Props) {
  const navigate = useNavigate()
  const { brands, createBrand, cloneBrand } = useBrands()
  const [form, setForm] = useState({
    name: '',
    brandType: 'Streetwear',
    launchStatus: 'Concept',
    color: '#8b5cf6',
    targetAudience: '',
    websiteDomain: '',
  })

  const sourceBrand = cloneFromId ? brands.find((b) => b.id === cloneFromId) : null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (cloneFromId && sourceBrand) {
      const cloned = cloneBrand(cloneFromId, form.name || `${sourceBrand.name} (Clone)`)
      if (cloned) {
        onClose()
        navigate(`/os/brands/${cloned.id}`)
      }
    } else {
      const brand = createBrand({
        ...form,
        launchStatus: form.launchStatus,
      })
      onClose()
      navigate(`/os/brands/${brand.id}`)
    }
  }

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {cloneFromId ? 'Clone Brand' : 'Create New Brand'}
              </h2>
              <button onClick={onClose} className="text-white/40 hover:text-white/60 text-xl">×</button>
            </div>
            <p className="text-xs text-white/40 mt-1">
              {cloneFromId
                ? `Cloning structure from ${sourceBrand?.name}. Enter new brand name.`
                : 'The OS will automatically generate dashboards, projects, campaigns, and team structure.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Brand Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Nova Streetwear"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-white/20 outline-none"
              />
            </div>

            {!cloneFromId && (
              <>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Brand Type</label>
                  <select
                    value={form.brandType}
                    onChange={(e) => setForm((f) => ({ ...f, brandType: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-white/20 outline-none"
                  >
                    {BRAND_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Launch Status</label>
                  <select
                    value={form.launchStatus}
                    onChange={(e) => setForm((f) => ({ ...f, launchStatus: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-white/20 outline-none"
                  >
                    {LAUNCH_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Primary Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, color: c }))}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${form.color === c ? 'border-white scale-110' : 'border-white/10 hover:border-white/20'}`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Target Audience</label>
                  <input
                    type="text"
                    value={form.targetAudience}
                    onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))}
                    placeholder="e.g. Gen Z streetwear enthusiasts"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-white/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Website Domain</label>
                  <input
                    type="text"
                    value={form.websiteDomain}
                    onChange={(e) => setForm((f) => ({ ...f, websiteDomain: e.target.value }))}
                    placeholder="e.g. novastreetwear.com"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:border-white/20 outline-none"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-white/10 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors">
                {cloneFromId ? 'Clone Brand' : 'Create Brand'}
              </button>
            </div>
          </form>

          {!cloneFromId && (
            <div className="px-6 pb-6">
              <p className="text-[10px] text-white/25">
                Auto-generated: Brand Dashboard · Project Hub · Campaign Center · Asset Vault · Team Structure · Launch Planner · Analytics
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
