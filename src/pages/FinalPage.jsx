import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Sparkles from '../components/Sparkles'

const LANTERN_COUNT = 8
const FIREFLY_COUNT = 20

const FinalPage = () => {
  const [heartsFilled, setHeartsFilled] = useState(false)

  const lanterns = useMemo(
    () =>
      Array.from({ length: LANTERN_COUNT }).map((_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
        size: 30 + Math.random() * 20,
      })),
    []
  )

  const fireflies = useMemo(
    () =>
      Array.from({ length: FIREFLY_COUNT }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    []
  )

  const fillHearts = () => {
    setHeartsFilled(true)
    const colors = ['#ff6fae', '#9b6bff', '#ffd166', '#ffffff']
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, colors })
    setTimeout(() => setHeartsFilled(false), 4500)
  }

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#241350_0%,#0a0620_55%,#040210_100%)] px-6 py-16 text-center font-body">
      <Sparkles count={80} />

      {/* moon */}
      <div
        className="pointer-events-none absolute right-[8%] top-[10%] h-24 w-24 rounded-full sm:h-32 sm:w-32"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #fff8dc, #ffe9b0 60%, #f4d98c)',
          boxShadow: '0 0 60px 15px rgba(255,238,190,0.4)',
        }}
      />

      {/* fireflies */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {fireflies.map((f) => (
          <motion.span
            key={f.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-yellow-200"
            style={{ top: `${f.top}%`, left: `${f.left}%`, boxShadow: '0 0 8px 2px rgba(255,244,150,0.8)' }}
            animate={{ opacity: [0.2, 1, 0.2], x: [0, 15, -10, 0], y: [0, -12, 8, 0] }}
            transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* floating lanterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {lanterns.map((l) => (
          <motion.div
            key={l.id}
            className="absolute rounded-md"
            style={{
              left: `${l.left}%`,
              bottom: '-15%',
              width: l.size,
              height: l.size * 1.3,
              background: 'linear-gradient(180deg, #ffd98a, #ff9f4a)',
              boxShadow: '0 0 25px 6px rgba(255,180,90,0.55)',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-125vh', opacity: [0, 1, 1, 0], x: [0, 20, -15, 0] }}
            transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* heart burst overlay when pressed */}
      {heartsFilled && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{ left: `${Math.random() * 100}%`, top: '110%' }}
              initial={{ opacity: 0 }}
              animate={{ y: '-130vh', opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 1.2, ease: 'linear' }}
            >
              ❤️
            </motion.span>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 flex max-w-lg flex-col items-center"
      >
        <h1
          className="mb-3 font-display text-[clamp(2rem,7vw,3.5rem)] font-semibold text-white"
          style={{ textShadow: '0 4px 24px rgba(255,150,200,0.5)' }}
        >
          I Love You Forever ❤️
        </h1>
        <p className="mb-12 font-display italic text-white/80">
          No matter where life takes us,
          <br />
          I'll always choose you.
        </p>

        <motion.button
          onClick={fillHearts}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
          className="relative text-6xl sm:text-7xl"
          aria-label="Fill the screen with hearts"
          style={{ filter: 'drop-shadow(0 0 25px rgba(255,110,170,0.8))' }}
        >
          ❤️
        </motion.button>
      </motion.div>
    </section>
  )
}

export default FinalPage
