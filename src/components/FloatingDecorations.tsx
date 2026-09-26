import { Heart, Star, Cake, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

interface Deco {
  icon: 'heart' | 'star' | 'cake' | 'gift'
  top: string
  left: string
  size: number
  delay: number
  duration: number
  opacity: number
  color: string
  drift: 'float' | 'floatSlow' | 'twinkle'
}

const ICONS = { heart: Heart, star: Star, cake: Cake, gift: Gift }

// Scattered around the edges only, so the center stays clear for content.
const decorations: Deco[] = [
  { icon: 'heart', top: '6%', left: '4%', size: 22, delay: 0, duration: 7, opacity: 0.55, color: '#D98B91', drift: 'float' },
  { icon: 'star', top: '14%', left: '88%', size: 16, delay: 0.6, duration: 4, opacity: 0.6, color: '#D6A84F', drift: 'twinkle' },
  { icon: 'cake', top: '80%', left: '8%', size: 26, delay: 1.1, duration: 8, opacity: 0.45, color: '#F8EBD8', drift: 'floatSlow' },
  { icon: 'heart', top: '88%', left: '82%', size: 18, delay: 0.3, duration: 6.5, opacity: 0.5, color: '#D6A84F', drift: 'float' },
  { icon: 'star', top: '4%', left: '48%', size: 14, delay: 1.4, duration: 3.6, opacity: 0.55, color: '#F8EBD8', drift: 'twinkle' },
  { icon: 'gift', top: '46%', left: '3%', size: 20, delay: 0.8, duration: 7.5, opacity: 0.4, color: '#D98B91', drift: 'floatSlow' },
  { icon: 'heart', top: '30%', left: '93%', size: 15, delay: 0.2, duration: 5.5, opacity: 0.5, color: '#D98B91', drift: 'float' },
  { icon: 'star', top: '62%', left: '92%', size: 18, delay: 1.6, duration: 4.2, opacity: 0.5, color: '#D6A84F', drift: 'twinkle' },
  { icon: 'cake', top: '68%', left: '50%', size: 20, delay: 2, duration: 8.5, opacity: 0.3, color: '#F8EBD8', drift: 'floatSlow' },
  { icon: 'heart', top: '10%', left: '20%', size: 12, delay: 0.9, duration: 5, opacity: 0.45, color: '#D6A84F', drift: 'float' },
]

export default function FloatingDecorations({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {decorations.map((d, i) => {
        const Icon = ICONS[d.icon]
        return (
          <motion.div
            key={i}
            className={`absolute animate-${d.drift}`}
            style={{
              top: d.top,
              left: d.left,
              opacity: d.opacity,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: d.opacity }}
            transition={{ duration: 1.2, delay: d.delay }}
          >
            <Icon size={d.size} color={d.color} strokeWidth={1.4} fill={d.icon === 'heart' ? d.color : 'none'} />
          </motion.div>
        )
      })}
    </div>
  )
}
