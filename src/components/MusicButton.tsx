import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Pause } from 'lucide-react'

interface MusicButtonProps {
  src: string
}

export default function MusicButton({ src }: MusicButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.55
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio
    return () => {
      audio.pause()
    }
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !available) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(
        () => setPlaying(true),
        () => setAvailable(false),
      )
    }
  }

  if (!available) return null

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed top-4 right-4 z-40 w-11 h-11 rounded-full bg-cream/90 shadow-envelope flex items-center justify-center border border-gold/40 backdrop-blur-sm"
    >
      {playing ? <Pause size={18} className="text-blood" /> : <Music size={18} className="text-blood" />}
    </motion.button>
  )
}
