import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { X, Heart } from 'lucide-react'
import Envelope, { EnvelopePhase } from './Envelope'

interface LetterModalProps {
  label: string
  toLine?: string
  fromLine?: string
  sealTone?: 'romantic' | 'blood'
  onClose: () => void
  children: ReactNode
  preStep?: (onContinue: () => void) => ReactNode
}

const FLOAT_HEARTS = [
  { left: '20%', delay: 0 },
  { left: '45%', delay: 0.3 },
  { left: '68%', delay: 0.15 },
  { left: '80%', delay: 0.5 },
  { left: '32%', delay: 0.65 },
]

export default function LetterModal({ label, toLine, fromLine, sealTone, onClose, children, preStep }: LetterModalProps) {
  const [showPre, setShowPre] = useState(!!preStep)
  const [phase, setPhase] = useState<EnvelopePhase>('closed')
  const [showContent, setShowContent] = useState(false)

  const beginSequence = () => {
    setShowPre(false)
    setPhase('wiggle')
  }

  useEffect(() => {
    if (showPre) return
    if (phase === 'wiggle') {
      const t = setTimeout(() => setPhase('seal-break'), 750)
      return () => clearTimeout(t)
    }
    if (phase === 'seal-break') {
      const t = setTimeout(() => setPhase('flap-open'), 500)
      return () => clearTimeout(t)
    }
    if (phase === 'flap-open') {
      const t = setTimeout(() => setShowContent(true), 1700)
      return () => clearTimeout(t)
    }
  }, [phase, showPre])

  // kick things off automatically if there's no pre-step
  useEffect(() => {
    if (!preStep) {
      const t = setTimeout(() => setPhase('wiggle'), 250)
      return () => clearTimeout(t)
    }
  }, [preStep])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(42, 3, 8, 0.72)', backdropFilter: 'blur(6px)' }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close letter"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-cream/90 flex items-center justify-center shadow-paper z-10"
      >
        <X size={18} className="text-blood" />
      </button>

      <div className="relative w-full max-w-md sm:max-w-lg max-h-[88vh] overflow-y-auto py-4">
        <AnimatePresence mode="wait">
          {showPre && preStep ? (
            <motion.div key="pre" exit={{ opacity: 0, scale: 0.9 }} className="flex items-center justify-center py-10">
              {preStep(beginSequence)}
            </motion.div>
          ) : !showContent ? (
            <motion.div key="envelope" exit={{ opacity: 0 }} className="relative">
             <Envelope variant="modal" label={label} toLine={toLine} fromLine={fromLine} phase={phase} sealTone={sealTone} />

              {(phase === 'flap-open') && (
                <div className="pointer-events-none absolute inset-0">
                  {FLOAT_HEARTS.map((h, i) => (
                    <motion.span
                      key={i}
                      className="absolute bottom-8 text-blush text-xl"
                      style={{ left: h.left }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], y: -140 }}
                      transition={{ duration: 2.2, delay: h.delay, ease: 'easeOut' }}
                    >
                      <Heart size={18} fill="currentColor" />
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
