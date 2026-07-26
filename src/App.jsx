import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Proposal from './pages/Proposal'
import MoonReveal from './pages/MoonReveal'
import Gallery from './pages/Gallery'
import LoveCounter from './pages/LoveCounter'
import Reasons from './pages/Reasons'
import FinalPage from './pages/FinalPage'
import MusicToggle from './components/MusicToggle'

const PAGES = [Home, Proposal, MoonReveal, Gallery, LoveCounter, Reasons, FinalPage]

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: 'easeInOut' },
}

function App() {
  const [pageIndex, setPageIndex] = useState(0)
  const CurrentPage = PAGES[pageIndex]
  const goNext = () => setPageIndex((i) => Math.min(i + 1, PAGES.length - 1))

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div key={pageIndex} {...pageTransition}>
          <CurrentPage onContinue={goNext} />
        </motion.div>
      </AnimatePresence>

      {/* Drop an mp3 at public/background-music.mp3 to enable this — see README */}
      <MusicToggle src="/background-music.mp3" />
    </div>
  )
}

export default App
