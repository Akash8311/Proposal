import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Sparkles from '../components/Sparkles'
import FloatingHearts from '../components/FloatingHearts'

// 👉 Change this to the actual date you fell for her.
const START_DATE = new Date('2023-01-01T00:00:00')

function getElapsed() {
  const now = new Date()
  const diffMs = Math.max(0, now - START_DATE)
  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center rounded-2xl bg-white/15 px-4 py-5 backdrop-blur-md ring-1 ring-white/25 min-w-[76px] sm:min-w-[96px]">
    <motion.span
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="font-display text-[clamp(1.75rem,6vw,2.75rem)] font-semibold text-white tabular-nums"
    >
      {String(value).padStart(2, '0')}
    </motion.span>
    <span className="mt-1 text-xs uppercase tracking-widest text-white/70">{label}</span>
  </div>
)

const LoveCounter = ({ onContinue }) => {
  const [elapsed, setElapsed] = useState(getElapsed())

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(-45deg,#9b6bff,#c9a7ff,#ff9fc7,#ffd9c2)] bg-[length:400%_400%] animate-gradientShift px-6 py-16 text-center font-body">
      <Sparkles count={30} />
      <FloatingHearts count={12} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="mb-2 font-display italic text-white/85">Since</p>
        <h1
          className="mb-10 font-display text-[clamp(1.75rem,6vw,3rem)] font-semibold text-white"
          style={{ textShadow: '0 4px 20px rgba(255,90,150,0.5)' }}
        >
          The Day I Fell For You ❤️
        </h1>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          <div><h2 style={{color:"white",fontSize:"5vh"}}>All time</h2></div>
        </div>

        <motion.button
          onClick={onContinue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="mt-14 rounded-full bg-white px-10 py-4 text-lg font-semibold text-rose shadow-lg"
        >
          Continue
        </motion.button>
      </motion.div>
    </section>
  )
}

export default LoveCounter
