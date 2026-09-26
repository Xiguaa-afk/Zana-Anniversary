import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart } from 'lucide-react'

interface MemoryPolaroidProps {
  image: string
  caption: string
  rotate: number
}

export default function MemoryPolaroid({ image, caption, rotate }: MemoryPolaroidProps) {
  const [enlarged, setEnlarged] = useState(false)
  const [broken, setBroken] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={() => setEnlarged((v) => !v)}
      initial={{ opacity: 0, y: 16, rotate: rotate * 2 }}
      animate={{
        opacity: 1,
        rotate: enlarged ? 0 : rotate,
        y: enlarged ? -6 : 0,
        scale: enlarged ? 1.08 : 1,
        zIndex: enlarged ? 20 : 1,
      }}
      whileHover={{ rotate: enlarged ? 0 : rotate * 0.3, y: -4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative bg-[#fffdf8] p-3 pb-8 shadow-paper w-40 sm:w-48 text-left cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-cream overflow-hidden flex items-center justify-center">
        {!broken ? (
          <img
            src={image}
            alt={caption}
            className="w-full h-full object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-blood/60">
            <Heart size={22} fill="currentColor" />
            <span className="font-hand2 text-[11px] tracking-wide uppercase">Our memory ♡</span>
          </div>
        )}
      </div>
      <p className="font-hand text-ink text-lg text-center mt-3 leading-snug">{caption}</p>
    </motion.button>
  )
}
