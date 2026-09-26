import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Heart, Star, Cake } from 'lucide-react'

interface FinalCelebrationProps {
  headline: string
  subline: string
  closingLine: string
}

const PARTICLE_ICONS = [Heart, Star, Cake]
const COLORS = ['#D6A84F', '#D98B91', '#F8EBD8', '#A91527']

function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 3.5 + Math.random() * 3,
        size: 10 + Math.random() * 16,
        icon: PARTICLE_ICONS[i % PARTICLE_ICONS.length],
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
      })),
    [count],
  )
}

export default function FinalCelebration({ headline, subline, closingLine }: FinalCelebrationProps) {
  const particles = useParticles(36)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      style={{ background: 'radial-gradient(circle at 50% 30%, #7a0f1e 0%, #3D050C 65%, #2a0308 100%)' }}
    >
      <div className="grain absolute inset-0" />

      {particles.map((p) => {
        const Icon = p.icon
        return (
          <motion.div
            key={p.id}
            className="absolute top-[-8%]"
            style={{ left: `${p.left}%` }}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{ y: '115vh', opacity: [0, 1, 1, 0], rotate: p.rotate }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          >
            <Icon size={p.size} color={p.color} fill={Math.random() > 0.5 ? p.color : 'none'} strokeWidth={1.4} />
          </motion.div>
        )
      })}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        <p className="font-display text-3xl sm:text-5xl text-cream leading-tight" style={{ textShadow: '0 4px 18px rgba(0,0,0,0.4)' }}>
          {headline}
        </p>
        <p className="font-hand text-2xl sm:text-3xl text-blush mt-6">{subline}</p>
        <p className="font-hand2 text-lg text-cream/80 mt-8">{closingLine}</p>
      </motion.div>
    </motion.div>
  )
}
