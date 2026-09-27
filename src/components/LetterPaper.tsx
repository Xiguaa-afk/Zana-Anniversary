import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LetterPaperProps {
  rotate?: number
  className?: string
  children: ReactNode
  dark?: boolean
  bgColor?: string
}

export default function LetterPaper({ rotate = -0.6, className = '', children, dark = false, bgColor }: LetterPaperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: rotate * 3 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`paper-edge grain relative mx-auto w-full px-6 py-8 sm:px-10 sm:py-12 shadow-paper ${className}`}
      style={{
        background: bgColor || (dark ? '#f3e4c8' : 'var(--paper)'),
        border: '1px solid var(--envelope-border)',
      }}
    >
      {/* little tape corner */}
      <div className="absolute -top-2 left-8 h-5 w-14 -rotate-6 bg-envelope-border/70 border border-white/40 shadow-sm" />
      {/* faint coffee ring */}
      <div className="pointer-events-none absolute bottom-6 right-8 w-16 h-16 rounded-full border-[3px] border-ink/[0.05]" />
      {children}
    </motion.div>
  )
}
