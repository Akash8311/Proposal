import React from 'react'
import { motion } from 'framer-motion'
import Sparkles from '../components/Sparkles'

// Replace these captions + /gallery/N.jpg files in /public/gallery with your real photos.
const PHOTOS = [
  { src: '/gallery/1.png', caption: 'The prettiest girl in my world', rotate: -6 },
  { src: '/gallery/2.png', caption: 'My fav person', rotate: 4 },
  { src: '/gallery/3.png', caption: 'The girl who stole my heart', rotate: -3 },
  { src: '/gallery/4.png', caption: 'cuttest girl', rotate: 7 },
  { src: '/gallery/5.png', caption: 'my fav view', rotate: -8 },
  { src: '/gallery/6.png', caption: 'the girl who stole my heart', rotate: 3 },
]

const PolaroidCard = ({ photo, index }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateX(${-py * 14}deg) rotateY(${px * 14}deg) scale(1.05)`
  }
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) rotate(${photo.rotate}deg) scale(1)`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
      className="w-full max-w-[240px] rounded-md bg-white p-3 pb-6 shadow-[0_18px_35px_rgba(60,20,50,0.35)]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-sm bg-gray-100">
        <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" />
      </div>
      <p className="mt-3 text-center font-display text-sm italic text-gray-700">{photo.caption}</p>
    </motion.div>
  )
}

const Gallery = ({ onContinue }) => {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-[linear-gradient(160deg,#ffe9d6,#ff9fc7_45%,#c9a7ff)] px-6 py-16 font-body">
      <Sparkles count={20} />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-3 text-center font-display text-[clamp(1.75rem,6vw,3rem)] font-semibold text-white"
        style={{ textShadow: '0 4px 20px rgba(255,90,150,0.5)' }}
      >
       I will see my moon
      </motion.h1>
      <p className="relative z-10 mb-12 text-center font-display italic text-white/85">
        A few pic of my moon
      </p>

      <div className="relative z-10 grid w-full max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 place-items-center">
        {PHOTOS.map((photo, i) => (
          <PolaroidCard key={photo.src} photo={photo} index={i} />
        ))}
      </div>

      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 mt-14 rounded-full bg-white px-10 py-4 text-lg font-semibold text-rose shadow-lg"
      >
        Continue
      </motion.button>
    </section>
  )
}

export default Gallery
