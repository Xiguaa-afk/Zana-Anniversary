import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Envelope, { EnvelopePhase } from './components/Envelope'
import FloatingDecorations from './components/FloatingDecorations'
import MailPile from './components/MailPile'
import LetterModal from './components/LetterModal'
import MusicButton from './components/MusicButton'
import BirthdayCake from './components/BirthdayCake'
import FinalCelebration from './components/FinalCelebration'
import { Letter1, Letter2, Letter3, Letter4,} from './components/LetterContents'
import { birthdayData } from './data/birthday'

const LETTER_LABELS = [
  birthdayData.letter1.label,
  'Things I Love About You ♡',
  'Our Memories ♡',
  birthdayData.letter4.label,
]

type Stage = 'landing' | 'mailroom'

export default function App() {
  const [stage, setStage] = useState<Stage>('landing')
  const [landingPhase, setLandingPhase] = useState<EnvelopePhase>('closed')
  const [openedLetters, setOpenedLetters] = useState<number[]>([])
  const [activeLetter, setActiveLetter] = useState<number | null>(null)
  const [showFinalCelebration, setShowFinalCelebration] = useState(false)

  useEffect(() => {
    if (landingPhase === 'closed') return
    if (landingPhase === 'wiggle') {
      const t = setTimeout(() => setLandingPhase('seal-break'), 750)
      return () => clearTimeout(t)
    }
    if (landingPhase === 'seal-break') {
      const t = setTimeout(() => setLandingPhase('flap-open'), 500)
      return () => clearTimeout(t)
    }
    if (landingPhase === 'flap-open') {
      const t = setTimeout(() => setStage('mailroom'), 1800)
      return () => clearTimeout(t)
    }
  }, [landingPhase])

  const openLetter = (id: number) => setActiveLetter(id)

  const closeLetter = () => {
    if (activeLetter && !openedLetters.includes(activeLetter)) {
      setOpenedLetters((prev) => [...prev, activeLetter])
    }
    setActiveLetter(null)
  }

  const allOpened = openedLetters.length === LETTER_LABELS.length

  return (
    <div className="min-h-screen w-full relative" style={{ background: 'linear-gradient(to bottom, var(--bg-top), var(--bg-bottom))' }}>
      <MusicButton src={birthdayData.music.src} />

      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.section
            key="landing"
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="grain relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
          >
            <FloatingDecorations />

            <motion.h1
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-headline text-3xl sm:text-5xl tracking-wide text-center mb-3 relative z-10"
              style={{ textShadow: '0 2px 12px rgba(91, 127, 181, 0.35)' }}
            >
              {birthdayData.landing.heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="font-hand text-accent-blue-soft text-xl sm:text-2xl text-center mb-10 relative z-10"
            >
              {birthdayData.landing.subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="relative z-10 w-full"
            >
              <Envelope
              variant="modal"
              label="Special delivery"
              toLine={birthdayData.landing.envelopeToLine}
              fromLine={birthdayData.landing.envelopeFromLine}
              phase={landingPhase}
            />
            </motion.div>

            {landingPhase === 'closed' && (
              <motion.button
                type="button"
                onClick={() => setLandingPhase('wiggle')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative z-10 mt-10 font-hand2 tracking-wide text-headline border border-accent-blue-soft rounded-full px-8 py-3 shadow-envelope animate-glowPulse hover:bg-accent-blue-soft hover:border-accent-blue transition-colors"
              >
                {birthdayData.landing.buttonLabel} ♡
              </motion.button>
            )}
          </motion.section>
        )}

        {stage === 'mailroom' && (
          <motion.section
            key="mailroom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grain relative min-h-screen px-4 py-14 sm:py-20 overflow-hidden"
          >
            <FloatingDecorations />

            <div className="relative z-10 text-center mb-10">
              <h2 className="font-display italic text-headline text-3xl sm:text-4xl mb-2" style={{ textShadow: '0 2px 12px rgba(91, 127, 181, 0.35)' }}>Your little mailbox</h2>
              <p className="font-hand text-accent-blue-soft text-lg sm:text-xl">Open them whenever you're ready, one at a time.</p>
            </div>

            <div className="relative z-10">
              <MailPile labels={LETTER_LABELS} openedIds={openedLetters} onOpen={openLetter} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeLetter && (
          <LetterModal
            key={activeLetter}
            label={LETTER_LABELS[activeLetter - 1]}
            toLine={birthdayData.landing.envelopeToLine}
            fromLine={birthdayData.landing.envelopeFromLine}
            sealTone={activeLetter === 4 ? 'blood' : 'romantic'}
            onClose={closeLetter}
          >
            {activeLetter === 1 && <Letter1 data={birthdayData} onClose={closeLetter} />}
            {activeLetter === 2 && <Letter2 data={birthdayData} onClose={closeLetter} />}
            {activeLetter === 3 && <Letter3 data={birthdayData} onClose={closeLetter} />}
            {activeLetter === 4 && <Letter4 data={birthdayData} onClose={closeLetter} />}

          </LetterModal>
        )}
      </AnimatePresence>
    </div>
  )
}
