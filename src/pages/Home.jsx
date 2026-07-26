import React from 'react'
import { motion } from 'framer-motion'
import cottonCandyPhoto from '../assets/cotton-candy.png'

// ----- floating hearts / sparkles config -----
const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '✨']
const FLOATING_HEARTS = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
  left: Math.random() * 100,
  size: 14 + Math.random() * 20,
  duration: 8 + Math.random() * 10,
  delay: Math.random() * 10,
  drift: Math.random() * 80 - 40,
}))

const STARS = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 3,
}))

// ----- inline style objects -----
const styles = {
  section: {
    position: 'relative',
    minHeight: '100svh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '48px 6vw',
    boxSizing: 'border-box',
    background: 'linear-gradient(-45deg, #ffd9c2, #ff9fc7, #c9a7ff, #9b6bff)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 14s ease infinite',
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
  },
  content: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    maxWidth: '480px',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    color: '#ffffff',
    fontSize: 'clamp(2rem, 6vw, 3.75rem)',
    lineHeight: 1.15,
    marginBottom: '12px',
    textShadow: '0 4px 20px rgba(255,90,150,0.6)',
  },
  subtitle: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 'clamp(1rem, 2.6vw, 1.25rem)',
    maxWidth: '420px',
    marginBottom: 'clamp(24px, 4vw, 32px)',
    padding: '0 8px',
  },
  frame: {
    marginBottom: 'clamp(28px, 5vw, 40px)',
    width: 'clamp(180px, 55vw, 260px)',
    height: 'clamp(180px, 55vw, 260px)',
    padding: '10px',
    borderRadius: '22px',
    background: 'linear-gradient(145deg, #ffe9d6, #ffd0e6)',
    boxShadow: '0 20px 45px rgba(90,20,70,0.35), inset 0 0 0 2px rgba(255,255,255,0.6)',
  },
  frameImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    display: 'block',
  },
  button: {
    position: 'relative',
    isolation: 'isolate',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '999px',
    background: '#ffffff',
    color: '#b6357a',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: 'clamp(1rem, 2.4vw, 1.125rem)',
    padding: 'clamp(14px, 2.5vw, 16px) clamp(32px, 6vw, 40px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  },
  glow: {
    position: 'absolute',
    inset: '-3px',
    zIndex: -1,
    borderRadius: '999px',
    background: 'linear-gradient(135deg, #ff6fae, #9b6bff, #ffd166)',
    filter: 'blur(14px)',
  },
}

const Home = ({ onContinue }) => {
  return (
    <section style={styles.section}>
      {/* twinkling stars */}
      <div style={styles.overlay}>
        {STARS.map((s) => (
          <motion.span
            key={s.id}
            style={{
              position: 'absolute',
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: '#ffffff',
            }}
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.25, 0.7] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* floating hearts */}
      <div style={styles.overlay}>
        {FLOATING_HEARTS.map((h) => (
          <motion.span
            key={h.id}
            style={{
              position: 'absolute',
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

      {/* content */}
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      >
        <h1 style={styles.heading}>Please Be Mine❤️</h1>
         

        <p style={styles.subtitle}>
          Every click brings you closer to question that comes straight from my heart 💖
        </p>

        <div style={styles.frame}>
          <img src={cottonCandyPhoto} alt="Cotton Candy" style={styles.frameImg} />
        </div>

        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.button}
        >
          <motion.span
            aria-hidden
            style={styles.glow}
            animate={{ opacity: [0.55, 0.95, 0.55], filter: ['blur(12px)', 'blur(20px)', 'blur(12px)'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          Continue
        </motion.button>
      </motion.div>

      {/* keyframes + responsive tweaks that inline style objects can't express (media queries, animations) */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* small phones */
        @media (max-width: 380px) {
          section { padding: 32px 5vw !important; }
        }

        /* tablets */
        @media (min-width: 768px) and (max-width: 1024px) {
          section { padding: 56px 8vw !important; }
        }

        /* large desktop screens */
        @media (min-width: 1440px) {
          section { padding: 64px 10vw !important; }
        }

        /* landscape phones - shrink vertical spacing so content still fits */
        @media (max-height: 480px) and (orientation: landscape) {
          section { padding: 20px 6vw !important; }
        }

        /* respect reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }
        }
      `}</style>
    </section>
  )
}

export default Home
