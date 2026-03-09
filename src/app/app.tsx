import { useState, useCallback } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { router } from './router'
import LandingPage from '../pages/LandingPage'

export default function App() {
  const isOSRoute = window.location.pathname.startsWith('/os')
  const [showLanding, setShowLanding] = useState(!isOSRoute)
  const [showMain, setShowMain] = useState(isOSRoute)

  const handleEnter = useCallback(() => {
    setShowMain(true)
    setTimeout(() => {
      setShowLanding(false)
    }, 200)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showMain && (
          <motion.div
            initial={isOSRoute ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={isOSRoute ? { duration: 0 } : { duration: 1.5, delay: 3, ease: 'easeOut' }}
            className="min-h-screen"
          >
            <RouterProvider router={router} />
          </motion.div>
        )}
      </AnimatePresence>

      {showLanding && <LandingPage onEnter={handleEnter} />}
    </>
  )
}
