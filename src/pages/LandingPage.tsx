import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LandingPageProps {
  onEnter: () => void
}

function FloatingOrb({ delay, size, x, y, duration }: { delay: number; size: number; x: string; y: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, rgba(184, 151, 126, 0.08) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-stone-400"
          style={{ top: `${(i + 1) * 5}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-stone-400"
          style={{ left: `${(i + 1) * 5}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: i * 0.1 + 0.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] z-10"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(184, 151, 126, 0.15) 50%, transparent 100%)',
      }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [exiting, setExiting] = useState(false)

  const handleEnter = useCallback(() => {
    if (exiting) return
    setExiting(true)
    setTimeout(() => {
      onEnter()
    }, 4800)
  }, [exiting, onEnter])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="landing"
          className="fixed inset-0 z-[100] bg-stone-950 flex items-center justify-center overflow-hidden cursor-default select-none"
          exit={{
            scale: 8,
            opacity: 0,
            filter: 'blur(20px)',
          }}
          transition={{
            duration: 4.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(ellipse at 30% 40%, rgba(184, 151, 126, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(120, 113, 108, 0.04) 0%, transparent 50%)',
                  'radial-gradient(ellipse at 60% 30%, rgba(184, 151, 126, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(120, 113, 108, 0.05) 0%, transparent 50%)',
                  'radial-gradient(ellipse at 40% 60%, rgba(184, 151, 126, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(120, 113, 108, 0.04) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Grid lines */}
          <GridLines />

          {/* Scan line effect */}
          <ScanLine />

          {/* Floating orbs */}
          <FloatingOrb delay={0} size={300} x="10%" y="20%" duration={12} />
          <FloatingOrb delay={2} size={200} x="70%" y="10%" duration={10} />
          <FloatingOrb delay={1} size={250} x="50%" y="60%" duration={14} />
          <FloatingOrb delay={3} size={180} x="20%" y="70%" duration={11} />
          <FloatingOrb delay={1.5} size={220} x="80%" y="50%" duration={13} />

          {/* Particle dots */}
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={`p-${i}`}
              className="absolute w-[2px] h-[2px] rounded-full bg-stone-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Center content */}
          <div className="relative z-20 text-center">
            {/* Top line accent */}
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-transparent via-accent/40 to-transparent mx-auto mb-10"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />

            {/* Company label */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-[10px] uppercase text-stone-500 font-sans font-medium mb-6 tracking-[0.35em]"
            >
              Wilson Collective Group LLC
            </motion.p>

            {/* Main title */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-stone-100 tracking-tight"
              >
                Wilson
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-stone-400 tracking-tight"
              >
                Collective
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-8 text-sm md:text-base text-stone-600 font-sans tracking-wide"
            >
              Exploring Possibilities &middot; Building What Matters
            </motion.p>

            {/* Divider */}
            <motion.div
              className="w-12 h-px bg-stone-700 mx-auto mt-10 mb-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 2 }}
            />

            {/* Enter button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.3 }}
            >
              <motion.button
                onClick={handleEnter}
                className="group relative px-12 py-4 border border-stone-700 text-stone-400 text-sm uppercase tracking-[0.25em] font-sans font-medium overflow-hidden transition-colors duration-500 hover:text-stone-100 hover:border-stone-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button hover fill */}
                <motion.div
                  className="absolute inset-0 bg-accent/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">Enter</span>
              </motion.button>
            </motion.div>

            {/* Bottom accent */}
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-transparent via-stone-700/30 to-transparent mx-auto mt-10"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 2.5 }}
            />
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-8 border-l border-t border-stone-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-8 h-8 border-r border-t border-stone-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-stone-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-stone-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          />

        </motion.div>
      ) : (
        /* Creative montage transition */
        <motion.div
          key="exit"
          className="fixed inset-0 z-[100] bg-stone-950 overflow-hidden"
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{ duration: 4.8, times: [0, 0.7, 0.85, 1] }}
        >
          {/* Subtle radial background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse at 50% 50%, rgba(184, 151, 126, 0.04) 0%, transparent 60%)',
                'radial-gradient(ellipse at 50% 50%, rgba(184, 151, 126, 0.12) 0%, transparent 70%)',
              ],
            }}
            transition={{ duration: 3, ease: 'easeOut' }}
          />

          {/* Phase 1: Title shrinks and rises */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              animate={{
                scale: [1, 0.6, 0.3],
                y: [0, -60, -200],
                opacity: [1, 0.6, 0],
              }}
              transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-stone-100 tracking-tight">
                Wilson
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-stone-400 tracking-tight">
                Collective
              </h1>
            </motion.div>
          </div>

          {/* Phase 2: Flying keywords — creative business words streak across */}
          {[
            { word: 'CREATE', x: -20, y: 25, delay: 0.3, size: 'text-6xl md:text-8xl' },
            { word: 'BUILD', x: 60, y: 45, delay: 0.6, size: 'text-5xl md:text-7xl' },
            { word: 'DESIGN', x: 10, y: 65, delay: 0.9, size: 'text-4xl md:text-6xl' },
            { word: 'INNOVATE', x: 40, y: 15, delay: 1.2, size: 'text-5xl md:text-7xl' },
            { word: 'DREAM', x: 70, y: 75, delay: 1.5, size: 'text-6xl md:text-8xl' },
            { word: 'LAUNCH', x: -10, y: 50, delay: 1.8, size: 'text-4xl md:text-6xl' },
            { word: 'CULTURE', x: 50, y: 35, delay: 2.1, size: 'text-5xl md:text-7xl' },
            { word: 'HUSTLE', x: 25, y: 80, delay: 2.4, size: 'text-4xl md:text-5xl' },
          ].map((item) => (
            <motion.div
              key={item.word}
              className="absolute pointer-events-none"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              initial={{ opacity: 0, scale: 0.3, z: -500 }}
              animate={{
                opacity: [0, 0.12, 0.06, 0],
                scale: [0.3, 1.2, 2.5],
                x: [0, 0, 0],
              }}
              transition={{
                duration: 2.2,
                delay: item.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className={`${item.size} font-serif font-bold text-stone-400 whitespace-nowrap select-none`}
                style={{ WebkitTextStroke: '1px rgba(168, 162, 158, 0.15)', color: 'transparent' }}
              >
                {item.word}
              </span>
            </motion.div>
          ))}

          {/* Phase 2b: Geometric shapes flying through */}
          {[
            { shape: 'circle', x: 15, y: 30, delay: 0.4, s: 80 },
            { shape: 'square', x: 75, y: 20, delay: 0.8, s: 60 },
            { shape: 'circle', x: 45, y: 70, delay: 1.1, s: 100 },
            { shape: 'diamond', x: 85, y: 55, delay: 1.5, s: 50 },
            { shape: 'circle', x: 30, y: 85, delay: 1.9, s: 70 },
            { shape: 'square', x: 60, y: 10, delay: 2.3, s: 90 },
          ].map((item, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.s,
                height: item.s,
                border: '1px solid rgba(184, 151, 126, 0.12)',
                borderRadius: item.shape === 'circle' ? '50%' : item.shape === 'diamond' ? '0' : '4px',
                transform: item.shape === 'diamond' ? 'rotate(45deg)' : undefined,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.3, 0.15, 0],
                scale: [0, 1, 2.5],
                rotate: item.shape === 'diamond' ? [45, 45, 135] : [0, 0, 90],
              }}
              transition={{
                duration: 2,
                delay: item.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          ))}

          {/* Phase 2c: Horizontal speed lines */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px pointer-events-none"
              style={{
                top: `${8 + i * 5.5}%`,
                left: 0,
                right: 0,
                background: `linear-gradient(90deg, transparent 0%, rgba(184, 151, 126, ${0.06 + Math.random() * 0.08}) 50%, transparent 100%)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1.2, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.2,
                delay: 1.5 + i * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}

          {/* Phase 3: Center convergence — everything pulls to center */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 4.8, times: [0, 0.55, 0.65, 0.8, 0.95] }}
          >
            {/* Converging rings */}
            {[200, 300, 400, 500].map((size, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full border border-accent/10"
                style={{ width: size, height: size }}
                initial={{ scale: 3, opacity: 0 }}
                animate={{
                  scale: [3, 1, 0],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 2.6 + i * 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            ))}

            {/* Final "WCG" flash */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0, 1, 1, 0],
                scale: [0.5, 0.5, 1, 1.1, 3],
              }}
              transition={{
                duration: 4.8,
                times: [0, 0.6, 0.7, 0.82, 0.95],
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className="text-4xl md:text-6xl font-serif text-stone-200 tracking-[0.3em]">
                WCG
              </span>
            </motion.div>
          </motion.div>

          {/* Final white flash */}
          <motion.div
            className="absolute inset-0 bg-stone-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.2, 0] }}
            transition={{ duration: 4.8, times: [0, 0.82, 0.88, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
