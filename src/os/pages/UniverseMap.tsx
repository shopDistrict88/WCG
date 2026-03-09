import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useData } from '../store/DataContext'

type NodeKind = 'hq' | 'brand' | 'project' | 'campaign' | 'creative' | 'team'

interface UniverseNode {
  id: string
  name: string
  kind: NodeKind
  color: string
  description?: string
  progress?: number
  status?: string
  link?: string
  connects: string[]
  members?: string[]
}

const NODE_COLORS: Record<NodeKind, string> = {
  hq: '#ffffff',
  brand: '#8b5cf6',
  campaign: '#3b82f6',
  project: '#10b981',
  creative: '#eab308',
  team: '#ec4899',
}

function buildUniverse(data: { brands: { id: string; name: string; color: string; description?: string; status?: string }[]; projects: { id: string; name: string; brandId: string; description?: string; progress?: number; status?: string; members?: string[] }[]; campaigns: { id: string; name: string; brandId: string; strategy?: string; status?: string }[]; photoshoots: { id: string; concept: string; brandId: string; location?: string; status?: string; teamMembers?: string[] }[]; assets: { id: string; name: string; brandId: string; type?: string }[]; users: { id: string; name: string; title?: string }[] }): { nodes: UniverseNode[]; positions: Record<string, { x: number; y: number }> } {
  const { brands, projects, campaigns, photoshoots, assets, users } = data
  const nodes: UniverseNode[] = []
  const positions: Record<string, { x: number; y: number }> = {}

  nodes.push({
    id: 'wcg',
    name: 'Wilson Collective',
    kind: 'hq',
    color: NODE_COLORS.hq,
    connects: brands.map((b: { id: string }) => b.id),
    description: 'Parent company and digital headquarters for all brands.',
  })
  positions.wcg = { x: 0, y: 0 }

  const brandPositions: Record<string, { x: number; y: number }> = {}
  brands.forEach((b, i) => {
    const bx = (i - (brands.length - 1) / 2) * 280
    brandPositions[b.id] = { x: bx, y: 140 }
    nodes.push({
      id: b.id,
      name: b.name,
      kind: 'brand',
      color: b.color,
      connects: [],
      description: b.description,
      status: b.status,
      link: `/os/brands/${b.id}`,
    })
    positions[b.id] = { x: bx, y: 140 }
  })

  projects.forEach((p, i) => {
    const brand = brands.find((b) => b.id === p.brandId)
    if (!brand) return
    const bi = brands.indexOf(brand)
    const px = (bi - (brands.length - 1) / 2) * 280 + ((i % 3) - 1) * 120
    const py = 280 + Math.floor(i / 3) * 90
    const pid = `proj-${p.id}`
    nodes.push({
      id: pid,
      name: p.name,
      kind: 'project',
      color: NODE_COLORS.project,
      connects: [p.brandId],
      description: p.description,
      progress: p.progress,
      status: p.status,
      members: p.members,
      link: '/os/projects',
    })
    positions[pid] = { x: px, y: py }
  })

  campaigns.forEach((c, i) => {
    const brand = brands.find((b) => b.id === c.brandId)
    if (!brand) return
    const bi = brands.indexOf(brand)
    const cx = (bi - (brands.length - 1) / 2) * 280 + 80
    const cy = 360 + i * 70
    const cid = `camp-${c.id}`
    nodes.push({
      id: cid,
      name: c.name,
      kind: 'campaign',
      color: NODE_COLORS.campaign,
      connects: [c.brandId],
      description: c.strategy,
      status: c.status,
      link: `/os/campaigns/${c.id}`,
    })
    positions[cid] = { x: cx, y: cy }
  })

  photoshoots.forEach((ps, i) => {
    const brand = brands.find((b) => b.id === ps.brandId)
    if (!brand) return
    const bi = brands.indexOf(brand)
    const sx = (bi - (brands.length - 1) / 2) * 280 - 100
    const sy = 360 + i * 70
    const sid = `shoot-${ps.id}`
    nodes.push({
      id: sid,
      name: ps.concept,
      kind: 'creative',
      color: NODE_COLORS.creative,
      connects: [ps.brandId],
      description: ps.location,
      status: ps.status,
      members: ps.teamMembers,
      link: '/os/photoshoots',
    })
    positions[sid] = { x: sx, y: sy }
  })

  assets.slice(0, 6).forEach((a, i) => {
    const brand = brands.find((b) => b.id === a.brandId)
    const bid = brand?.id || 'wcg'
    const ax = -400 + (i % 3) * 100
    const ay = 480 + Math.floor(i / 3) * 60
    const aid = `asset-${a.id}`
    nodes.push({
      id: aid,
      name: a.name,
      kind: 'creative',
      color: NODE_COLORS.creative,
      connects: [bid],
      description: a.type,
    })
    positions[aid] = { x: ax, y: ay }
  })

  users.slice(0, 4).forEach((u, i) => {
    const ux = 350 + (i % 2) * 100
    const uy = 200 + Math.floor(i / 2) * 80
    const uid = `team-${u.id}`
    nodes.push({
      id: uid,
      name: u.name,
      kind: 'team',
      color: NODE_COLORS.team,
      connects: ['wcg'],
      description: u.title,
    })
    positions[uid] = { x: ux, y: uy }
  })

  return { nodes, positions }
}

export default function UniverseMap() {
  const { brands, projects, campaigns, users, assets, photoshoots } = useData()
  const { nodes: universeNodes, positions: basePositions } = buildUniverse({ brands, projects, campaigns, photoshoots, assets, users })
  const [scale, setScale] = useState(0.7)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>(basePositions)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale((s) => Math.max(0.3, Math.min(1.2, s - e.deltaY * 0.002)))
  }, [])

  const handlePan = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setPan((p) => ({ x: p.x + info.delta.x, y: p.y + info.delta.y }))
  }, [])

  const selected = selectedId ? universeNodes.find((n) => n.id === selectedId) : null

  const getEdges = () => {
    const edges: { from: { x: number; y: number }; to: { x: number; y: number }; color: string }[] = []
    universeNodes.forEach((node) => {
      node.connects.forEach((targetId) => {
        const fromPos = nodePositions[node.id]
        const toPos = nodePositions[targetId]
        if (fromPos && toPos) {
          edges.push({
            from: fromPos,
            to: toPos,
            color: node.color === NODE_COLORS.hq ? 'rgba(255,255,255,0.2)' : `${node.color}50`,
          })
        }
      })
    })
    return edges
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col rounded-xl overflow-hidden bg-black/20 border border-white/[0.06]">
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Creative Universe Map</h1>
          <p className="text-[10px] text-white/30">Every project, brand, campaign, and asset connected</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setScale((s) => Math.min(1.2, s + 0.1))} className="w-8 h-8 rounded-lg bg-white/[0.06] text-white/50 hover:bg-white/[0.1] text-sm">+</button>
          <button onClick={() => setScale((s) => Math.max(0.3, s - 0.1))} className="w-8 h-8 rounded-lg bg-white/[0.06] text-white/50 hover:bg-white/[0.1] text-sm">−</button>
          <button onClick={() => { setScale(0.7); setPan({ x: 0, y: 0 }) }} className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-white/40 text-xs hover:bg-white/[0.1]">Reset</button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-hidden relative" onWheel={handleWheel}>
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          onDrag={handlePan}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '50% 50%',
          }}
        >
          <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            {/* SVG edges */}
            <svg width={1200} height={700} className="absolute pointer-events-none" style={{ left: -600, top: -350 }}>
              {getEdges().map((e, i) => (
                <line
                  key={i}
                  x1={e.from.x + 600}
                  y1={e.from.y + 350}
                  x2={e.to.x + 600}
                  y2={e.to.y + 350}
                  stroke={e.color}
                  strokeWidth={1}
                  strokeDasharray={e.color.includes('hq') ? '4 4' : '0'}
                />
              ))}
            </svg>

            {/* Nodes */}
            {universeNodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 0, y: 0 }
              const isSelected = selectedId === node.id
              return (
                <motion.div
                  key={node.id}
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    setNodePositions((prev) => ({
                      ...prev,
                      [node.id]: {
                        x: (prev[node.id]?.x || pos.x) + info.offset.x,
                        y: (prev[node.id]?.y || pos.y) + info.offset.y,
                      },
                    }))
                  }}
                  onClick={() => setSelectedId(isSelected ? null : node.id)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute cursor-pointer select-none"
                  style={{ left: 600 + pos.x, top: 350 + pos.y, transform: 'translate(-50%, -50%)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`rounded-xl border-2 px-3 py-2 min-w-[100px] text-center transition-all ${
                      isSelected ? 'ring-2 ring-white/30' : ''
                    }`}
                    style={{
                      background: `${node.color}15`,
                      borderColor: isSelected ? node.color : `${node.color}40`,
                    }}
                  >
                    <span className="text-[10px] block mb-0.5" style={{ color: node.color }}>
                      {node.kind.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-white truncate block max-w-[120px]">{node.name}</span>
                    {node.progress !== undefined && (
                      <div className="mt-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${node.progress}%`, background: node.color }} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Detail panel */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-black/80 border border-white/[0.08] rounded-xl p-4 shadow-xl"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] px-1.5 py-0.5 rounded border" style={{ color: selected.color, borderColor: `${selected.color}40`, background: `${selected.color}10` }}>
                {selected.kind}
              </span>
              <h3 className="text-sm font-semibold text-white mt-1">{selected.name}</h3>
              {selected.description && <p className="text-xs text-white/40 mt-1">{selected.description}</p>}
            </div>
            <button onClick={() => setSelectedId(null)} className="text-white/30 hover:text-white/60 text-sm">×</button>
          </div>
          {selected.status && (
            <p className="text-[10px] text-white/25 mt-2">Status: {selected.status}</p>
          )}
          {selected.progress !== undefined && (
            <p className="text-[10px] text-white/25 mt-0.5">Progress: {selected.progress}%</p>
          )}
          {selected.members && selected.members.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Team</p>
              <div className="flex flex-wrap gap-1">
                {selected.members.map((mid) => {
                  const m = users.find((u) => u.id === mid)
                  return <span key={mid} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/50">{m?.name}</span>
                })}
              </div>
            </div>
          )}
          {selected.link && (
            <Link to={selected.link} className="mt-3 inline-block text-[10px] text-white/40 hover:text-white/70 border-b border-white/20">
              Open in OS →
            </Link>
          )}
        </motion.div>
      )}
    </div>
  )
}
