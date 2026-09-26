import { motion } from 'framer-motion'
import { useState } from 'react'

interface BirthdayCakeProps {
  onBlown: () => void
}

const CANDLE_X = [78, 100, 122, 144]

export default function BirthdayCake({ onBlown }: BirthdayCakeProps) {
  const [blown, setBlown] = useState(false)

  const handleClick = () => {
    if (blown) return
    setBlown(true)
    window.setTimeout(onBlown, 1400)
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      animate={blown ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto block"
      aria-label="Blow out the candles"
    >
      <svg width="220" height="200" viewBox="0 0 220 200" className="drop-shadow-[0_14px_18px_rgba(61,5,12,0.45)]">
        {/* plate */}
        <ellipse cx="110" cy="176" rx="86" ry="12" fill="#3D050C" opacity="0.35" />
        {/* bottom tier */}
        <rect x="40" y="120" width="140" height="48" rx="8" fill="#A91527" />
        <rect x="40" y="120" width="140" height="10" rx="4" fill="#D98B91" opacity="0.6" />
        {/* top tier */}
        <rect x="62" y="86" width="96" height="42" rx="8" fill="#650814" />
        <rect x="62" y="86" width="96" height="9" rx="4" fill="#D98B91" opacity="0.55" />
        {/* icing drips */}
        <path d="M62 128 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 6 0"
          fill="#F8EBD8" opacity="0.9" />
        {/* little hearts on cake */}
        <text x="86" y="112" fontSize="12" fill="#F8EBD8">♡</text>
        <text x="118" y="150" fontSize="12" fill="#F8EBD8">♡</text>
        <text x="140" y="112" fontSize="10" fill="#D6A84F">✦</text>

        {/* candles */}
        {CANDLE_X.map((x, i) => (
          <g key={i}>
            <rect x={x} y={58} width="6" height="30" rx="2" fill="#F8EBD8" stroke="#A91527" strokeWidth="1" />
            {!blown && (
              <motion.ellipse
                cx={x + 3}
                cy={52}
                rx="4.5"
                ry="8"
                fill="#D6A84F"
                className="animate-flicker"
                style={{ transformOrigin: `${x + 3}px 58px`, animationDelay: `${i * 0.15}s` }}
              />
            )}
            {blown && (
              <motion.path
                d={`M${x + 3} 52 q 4 -6 0 -12`}
                stroke="#cfcfcf"
                strokeWidth="2"
                fill="none"
                initial={{ opacity: 0.9, y: 0 }}
                animate={{ opacity: 0, y: -18 }}
                transition={{ duration: 1.1 }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* tiny floating hearts around cake, always present */}
      <span className="absolute -top-3 -left-3 text-blush animate-float text-lg select-none">♡</span>
      <span className="absolute -top-1 -right-4 text-gold animate-twinkle text-sm select-none">✦</span>
      <span className="absolute bottom-4 -right-6 text-blush animate-floatSlow text-base select-none">♡</span>
    </motion.button>
  )
}
