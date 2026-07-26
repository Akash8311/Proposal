import React from 'react'
import { motion } from 'framer-motion'
import Sparkles from '../components/Sparkles'

// 👉 Edit / add / remove reasons freely.
const REASONS = [
  { emoji: '❤️', title: 'Your Smile', text: 'It makes even my worst days feel okay.' },
  { emoji: '👀', title: 'Your Eyes', text: 'I could get lost in them, and I often do.' },
  { emoji: '💖', title: 'Your Kind Heart', text: 'You care for everyone around you so gently.' },
  { emoji: '✨', title: 'Everything About You', text: "Honestly, I could fill a hundred more cards." },
]

const Reasons = ({ onContinue }) => {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-[linear-gradient(160deg,#ffd9c2,#ff9fc7_50%,#9b6bff)] px-6 py-16 font-body">
      <Sparkles count={20} />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-12 text-center font-display text-[clamp(1.75rem,6vw,3rem)] font-semibold text-white"
        style={{ textShadow: '0 4px 20px rgba(255,90,150,0.5)' }}
      >
        Reasons I Love You
      </motion.h1>

      <div className="relative z-10 flex w-full max-w-xl flex-col gap-5">
        {REASONS.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-4 rounded-2xl bg-white/20 p-5 backdrop-blur-md ring-1 ring-white/30 shadow-lg"
          >
            <span className="text-3xl">{r.emoji}</span>
            <div className="text-left">
              <h3 className="font-display text-lg font-semibold text-white">{r.title}</h3>
              <p className="text-sm text-white/85">{r.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 mt-14 rounded-full bg-white px-10 py-4 text-lg font-semibold text-rose shadow-lg"
      >
        Continue
      </motion.button>
    </section>
  )
}

export default Reasons
