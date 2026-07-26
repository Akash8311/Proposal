import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sparkles from '../components/Sparkles'
import FloatingHearts from '../components/FloatingHearts'
import moonPhoto from '../assets/moon-photo.png'

const MoonReveal = ({ onContinue }) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#1b1240_0%,#0a0620_60%,#050312_100%)] px-6 py-16 font-body text-center">
      <Sparkles count={70} />
      <FloatingHearts count={10} />

      {/* drifting clouds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-2xl"
            style={{
              top: `${15 + i * 22}%`,
              width: 260 + i * 60,
              height: 70 + i * 10,
            }}
            initial={{ x: '-30vw' }}
            animate={{ x: '130vw' }}
            transition={{ duration: 40 + i * 12, repeat: Infinity, ease: 'linear', delay: i * 6 }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex max-w-lg flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <h1 className="mb-2 font-display text-[clamp(1.75rem,6vw,3rem)] font-semibold text-white">
          Have You Seen The Moon?
        </h1>
        <p className="mb-10 font-display italic text-white/70">If not... look here...</p>

        {!revealed ? (
          <motion.button
            onClick={() => setRevealed(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/90 px-10 py-4 text-lg font-semibold text-indigo-900 shadow-lg"
          >
            Look Up ✨
          </motion.button>
        ) : (
          <>
            <motion.div
              className="relative mb-10 h-[clamp(200px,55vw,320px)] w-[clamp(200px,55vw,320px)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            >
              {/* glow halo */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,244,214,0.55), transparent 70%)' }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* rotating moon face with masked photo */}
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white/40"
                style={{ boxShadow: '0 0 60px 10px rgba(255,244,214,0.5)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <img src={moonPhoto} alt="Our moon" className="h-full w-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(circle at 35% 30%, transparent 40%, rgba(20,10,40,0.35) 100%)' }}
                />
              </motion.div>

              {/* small hearts orbiting the moon */}
              {['❤️', '💕', '✨'].map((e, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl"
                  style={{ top: '50%', left: '50%' }}
                  animate={{
                    x: [0, 90 * Math.cos((i * 2 * Math.PI) / 3), 0],
                    y: [0, 90 * Math.sin((i * 2 * Math.PI) / 3), 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-10 max-w-md font-display text-[clamp(1rem,2.6vw,1.3rem)] italic text-white/85"
            >
             People say the moon is the most batiful thing in the night sky....
             <br/>i smiled,bcz i had already met you
            </motion.p>

            <motion.button
              onClick={onContinue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-white px-10 py-4 text-lg font-semibold text-rose shadow-lg"
            >
              ok wait
            </motion.button>
          </>
        )}
      </motion.div>
    </section>
  )
}

export default MoonReveal
