import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '✨']

/**
 * Ambient floating hearts + sparkles background.
 * Pass `count` to control density and `burst` to trigger a denser rain effect.
 */
const FloatingHearts = ({ count = 16 }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        left: Math.random() * 100,
        size: 14 + Math.random() * 20,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 10,
        drift: Math.random() * 80 - 40,
      })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{
            bottom: '-10%',
            left: `${h.left}%`,
            fontSize: h.size,
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))',
          }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: '-115vh', x: h.drift, opacity: [0, 0.9, 0.9, 0], rotate: 360 }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  )
}

export default FloatingHearts
