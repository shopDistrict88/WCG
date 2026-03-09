import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NodeType = 'origin' | 'drop' | 'campaign' | 'collab' | 'creative' | 'milestone' | 'expansion'

interface EvolutionNode {
  id: string
  title: string
  date: string
  type: NodeType
  description: string
  impact?: string
}

interface BrandMap {
  id: string
  name: string
  color: string
  tagline: string
  founded: string
  nodes: EvolutionNode[]
}

const brandMaps: BrandMap[] = [
  {
    id: 'divergent', name: 'Divergent Studios', color: '#8b5cf6', tagline: 'Futuristic streetwear meets wearable art', founded: 'May 2024',
    nodes: [
      { id: 'div-n1', title: 'Brand Created', date: 'May 2024', type: 'origin', description: 'Divergent Studios was founded as a streetwear brand blending futuristic, space-inspired designs with wearable art.', impact: 'First WCG fashion brand' },
      { id: 'div-n2', title: 'First Design Concepts', date: 'Jun 2024', type: 'creative', description: 'Initial design language established — bold geometric shapes, space themes, dark premium colorways.' },
      { id: 'div-n3', title: 'Social Channels Launched', date: 'Jul 2024', type: 'milestone', description: 'Instagram, TikTok, and X accounts launched with brand identity assets and teaser content.' },
      { id: 'div-n4', title: 'First Product Mockups', date: 'Sep 2024', type: 'creative', description: 'First hoodie and tee mockups created. Design direction locked in for the inaugural collection.' },
      { id: 'div-n5', title: 'NOVA Collection Designed', date: 'Jan 2026', type: 'creative', description: 'The complete NOVA capsule collection was designed — hoodies, tees, joggers, caps — all with space-themed graphics.', impact: '4 products designed' },
      { id: 'div-n6', title: 'NOVA Teaser Campaign', date: 'Mar 2026', type: 'campaign', description: 'Social media blitz and influencer campaign launched to build hype for the NOVA drop.', impact: '48K reach, 4.8% engagement' },
      { id: 'div-n7', title: 'First Influencer Partnerships', date: 'Mar 2026', type: 'collab', description: 'Three influencer partnerships secured for NOVA campaign content creation and promotion.', impact: '3 partnerships signed' },
      { id: 'div-n8', title: 'NOVA Collection Drop', date: 'Apr 2026', type: 'drop', description: 'Limited edition NOVA capsule launched. 200 units per style. No restock. Biggest release in brand history.', impact: '900 units, 4 styles' },
      { id: 'div-n9', title: 'Future: International Expansion', date: 'Q3 2026', type: 'expansion', description: 'Planning phase for international shipping, localized marketing, and European pop-up presence.' },
    ],
  },
  {
    id: 'district88', name: 'District88', color: '#3b82f6', tagline: 'Sneaker & streetwear marketplace and community', founded: 'Mar 2024',
    nodes: [
      { id: 'd88-n1', title: 'Concept Developed', date: 'Mar 2024', type: 'origin', description: 'District88 was conceptualized as a sneaker and streetwear marketplace where people can buy, sell, and learn about culture.', impact: 'Core concept defined' },
      { id: 'd88-n2', title: 'Market Research Complete', date: 'Apr 2024', type: 'milestone', description: 'Competitive analysis, user research, and target audience profiling completed for the marketplace.' },
      { id: 'd88-n3', title: 'Brand Identity Finalized', date: 'Jun 2024', type: 'creative', description: 'Logo, color palette, typography, and brand voice established. Visual identity locked.' },
      { id: 'd88-n4', title: 'Platform Development Started', date: 'Aug 2024', type: 'milestone', description: 'Engineering team began building the marketplace platform — listings, payments, user profiles.', impact: 'Core features in development' },
      { id: 'd88-n5', title: 'Community Features Designed', date: 'Mar 2025', type: 'creative', description: 'Community hub features designed — forums, culture articles, seller spotlights, education resources.' },
      { id: 'd88-n6', title: 'Moderation System Built', date: 'Oct 2025', type: 'milestone', description: 'Content moderation, user reporting, and trust & safety systems implemented for the platform.' },
      { id: 'd88-n7', title: 'Launch Campaign Planning', date: 'Jan 2026', type: 'campaign', description: 'Multi-phase launch campaign planned — beta teaser, creator beta, public launch.', impact: '342 waitlist signups' },
      { id: 'd88-n8', title: 'Creator Beta Launch', date: 'Apr 2026', type: 'milestone', description: 'Invite-only beta opened to selected creators and early adopters.', impact: 'Beta testing phase' },
      { id: 'd88-n9', title: 'Public Launch', date: 'May 2026', type: 'drop', description: 'District88 marketplace opened to the public with full buying, selling, and community features.' },
      { id: 'd88-n10', title: 'Future: Mobile App', date: 'Q4 2026', type: 'expansion', description: 'Native iOS and Android app development planned for an enhanced mobile experience.' },
    ],
  },
  {
    id: 'velvair', name: 'Velvair Studios', color: '#ec4899', tagline: 'Bold, edgy fashion meets artistic expression', founded: 'Jul 2024',
    nodes: [
      { id: 'vel-n1', title: 'Brand Established', date: 'Jul 2024', type: 'origin', description: 'Velvair Studios joined WCG as a streetwear brand fusing bold, edgy fashion with artistic expression.' },
      { id: 'vel-n2', title: 'Design Direction Set', date: 'Sep 2024', type: 'creative', description: 'Brand aesthetic defined — raw urban textures, hand-drawn elements, premium streetwear quality.' },
      { id: 'vel-n3', title: 'Team Assembled', date: 'Nov 2024', type: 'milestone', description: 'Core creative and production team put in place for the first collection.', impact: '2 team members' },
      { id: 'vel-n4', title: 'PS2 Collection Concept', date: 'Jan 2026', type: 'creative', description: 'PS2 collection concept developed — bold, urban-inspired pieces blending street culture with art.', impact: 'Concept score: 9.2/10' },
      { id: 'vel-n5', title: 'PS2 Campaign Development', date: 'Mar 2026', type: 'campaign', description: 'Campaign development began with moodboard, video concepts, and influencer outreach planning.' },
      { id: 'vel-n6', title: 'PS2 Drop Launch', date: 'Apr 2026', type: 'drop', description: 'First official Velvair Studios product drop — PS2 Collection with hoodie, cargo pants, and graphic tee.', impact: '450 units, limited edition' },
      { id: 'vel-n7', title: 'Future: Artist Collaborations', date: 'Q3 2026', type: 'expansion', description: 'Plans for artist collaboration series, pairing visual artists with streetwear design.' },
    ],
  },
  {
    id: 'canjustalllove', name: 'Canjustalllove', color: '#f59e0b', tagline: 'Self-expression, inclusivity, and positivity', founded: 'Jun 2024',
    nodes: [
      { id: 'cjl-n1', title: 'Brand Created', date: 'Jun 2024', type: 'origin', description: 'Canjustalllove was born as a lifestyle and fashion brand centered on self-expression, inclusivity, and positivity.' },
      { id: 'cjl-n2', title: 'Brand Messaging Defined', date: 'Aug 2024', type: 'creative', description: 'Core messaging locked — "love in all forms." Visual identity built around warmth, openness, and community.' },
      { id: 'cjl-n3', title: 'Community Building Started', date: 'Oct 2024', type: 'milestone', description: 'Organic community growth began on social media through empowering content and storytelling.' },
      { id: 'cjl-n4', title: 'Spring Love Campaign Launch', date: 'Sep 2025', type: 'campaign', description: 'First major campaign launched, centered on emotional storytelling and self-love.', impact: '32K reach, 6.2% engagement, $4.2K sales' },
      { id: 'cjl-n5', title: 'Spring Love Collection Drop', date: 'Mar 2026', type: 'drop', description: 'Lifestyle collection celebrating self-expression launched — crewnecks, tees, shorts.', impact: '950 units, open release' },
      { id: 'cjl-n6', title: 'UGC Content Program', date: 'Mar 2026', type: 'collab', description: 'User-generated content program launched. Community members submit stories and content for brand channels.' },
      { id: 'cjl-n7', title: 'Future: Experience Events', date: 'Q4 2026', type: 'expansion', description: 'Planning for IRL community events and pop-up experiences.' },
    ],
  },
]

const nodeConfig: Record<NodeType, { icon: string; label: string; glow: string }> = {
  origin: { icon: '★', label: 'Origin', glow: 'shadow-[0_0_16px_rgba(255,255,255,0.1)]' },
  drop: { icon: '◈', label: 'Product Drop', glow: 'shadow-[0_0_12px_rgba(236,72,153,0.15)]' },
  campaign: { icon: '◉', label: 'Campaign', glow: 'shadow-[0_0_12px_rgba(245,158,11,0.15)]' },
  collab: { icon: '◎', label: 'Collaboration', glow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]' },
  creative: { icon: '✦', label: 'Creative', glow: 'shadow-[0_0_12px_rgba(139,92,246,0.15)]' },
  milestone: { icon: '◆', label: 'Milestone', glow: 'shadow-[0_0_12px_rgba(59,130,246,0.15)]' },
  expansion: { icon: '◇', label: 'Future', glow: 'shadow-[0_0_12px_rgba(100,100,100,0.1)]' },
}

export default function BrandEvolution() {
  const [selectedBrand, setSelectedBrand] = useState('divergent')
  const [expandedNode, setExpandedNode] = useState<string | null>(null)

  const brand = brandMaps.find((b) => b.id === selectedBrand)!
  const totalNodes = brand.nodes.length
  const drops = brand.nodes.filter((n) => n.type === 'drop').length
  const campaignNodes = brand.nodes.filter((n) => n.type === 'campaign').length

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-sans">Brand Evolution Maps</h1>
        <p className="text-sm text-white/40 mt-1">Visual history of how each brand grows and evolves.</p>
      </div>

      {/* Brand selector */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {brandMaps.map((b) => (
          <button
            key={b.id}
            onClick={() => { setSelectedBrand(b.id); setExpandedNode(null) }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border whitespace-nowrap transition-all flex-shrink-0 ${selectedBrand === b.id ? 'bg-white/[0.06] border-white/[0.12]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'}`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10" style={{ background: `${b.color}15` }}>
              <span className="text-xs font-bold" style={{ color: b.color }}>{b.name[0]}</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-white">{b.name}</p>
              <p className="text-[10px] text-white/20">Est. {b.founded}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Brand header */}
      <motion.div key={brand.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10" style={{ background: `${brand.color}15` }}>
            <span className="text-2xl font-bold" style={{ color: brand.color }}>{brand.name[0]}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{brand.name}</h2>
            <p className="text-xs text-white/40">{brand.tagline}</p>
          </div>
        </div>
        <div className="flex gap-6 mt-4 ml-[74px]">
          <div><p className="text-sm font-bold text-white">{totalNodes}</p><p className="text-[10px] text-white/25">Milestones</p></div>
          <div><p className="text-sm font-bold text-white">{drops}</p><p className="text-[10px] text-white/25">Drops</p></div>
          <div><p className="text-sm font-bold text-white">{campaignNodes}</p><p className="text-[10px] text-white/25">Campaigns</p></div>
          <div><p className="text-sm font-bold text-white">{brand.founded}</p><p className="text-[10px] text-white/25">Founded</p></div>
        </div>
      </motion.div>

      {/* Evolution map */}
      <div className="space-y-0 ml-2">
        {brand.nodes.map((node, i) => {
          const cfg = nodeConfig[node.type]
          const isExpanded = expandedNode === node.id
          const isFuture = node.type === 'expansion'

          return (
            <div key={node.id} className="flex gap-4">
              {/* Spine */}
              <div className="flex flex-col items-center w-10 flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${cfg.glow} ${isFuture ? 'border-dashed' : ''}`}
                  style={{ borderColor: isFuture ? `${brand.color}40` : brand.color, background: isFuture ? 'transparent' : `${brand.color}15` }}
                >
                  <span className="text-xs" style={{ color: isFuture ? `${brand.color}60` : brand.color }}>{cfg.icon}</span>
                </motion.div>
                {i < brand.nodes.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[12px] ${isFuture ? 'border-l border-dashed border-white/[0.06]' : ''}`} style={isFuture ? {} : { background: `${brand.color}20` }} />
                )}
              </div>

              {/* Node card */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex-1 mb-3 border rounded-xl overflow-hidden cursor-pointer transition-all ${isFuture ? 'bg-white/[0.01] border-dashed border-white/[0.04]' : isExpanded ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'}`}
                onClick={() => setExpandedNode(isExpanded ? null : node.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-sm font-semibold ${isFuture ? 'text-white/30' : 'text-white'}`}>{node.title}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full border" style={{ color: `${brand.color}${isFuture ? '60' : ''}`, borderColor: `${brand.color}30`, background: `${brand.color}08` }}>{cfg.label}</span>
                      </div>
                      <p className="text-[10px] text-white/25 mt-0.5">{node.date}</p>
                    </div>
                    {node.impact && <span className="text-[10px] text-white/20 flex-shrink-0 whitespace-nowrap">{node.impact}</span>}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="px-4 pb-4 border-t border-white/[0.04] pt-3">
                        <p className="text-sm text-white/50 leading-relaxed">{node.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex flex-wrap gap-4 justify-center">
        {Object.entries(nodeConfig).map(([, cfg]) => (
          <div key={cfg.label} className="flex items-center gap-1.5 text-[10px] text-white/30">
            <span className="text-white/50">{cfg.icon}</span>{cfg.label}
          </div>
        ))}
      </div>
    </div>
  )
}
