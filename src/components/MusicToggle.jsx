import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Soft floating mute/unmute button for background music.
 * Drop an mp3 at src/assets/background-music.mp3 (see README) — the player
 * simply won't play anything until that file exists, so the UI stays functional either way.
 */
const MusicToggle = ({ src }) => {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl text-white backdrop-blur-md shadow-lg ring-1 ring-white/40"
        aria-label={playing ? 'Mute music' : 'Play music'}
      >
        {playing ? '🔊' : '🔇'}
      </motion.button>
    </>
  )
}

export default MusicToggle
