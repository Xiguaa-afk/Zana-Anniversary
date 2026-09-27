import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { ReactNode } from 'react'

export type EnvelopePhase = 'closed' | 'wiggle' | 'seal-break' | 'flap-open'

interface PileProps {
  variant: 'pile'
  label: string
  index: number
  rotate: number
  locked: boolean
  opened: boolean
  glow: boolean
  onClick: () => void
}

interface ModalProps {
  variant: 'modal'
  label: string
  toLine?: string
  fromLine?: string
  phase: EnvelopePhase
  sealTone?: 'romantic' | 'blood'
  children?: ReactNode
}

type Props = PileProps | ModalProps

// Faint fold-crease lines that make the flat shape read as an actual
// folded paper envelope (the classic diamond of side- and bottom-flaps).
function Creases({ tone = 'rgba(53,26,23,0.16)' }: { tone?: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 66"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1="0" y1="0" x2="50" y2="36" stroke={tone} strokeWidth="0.5" />
      <line x1="100" y1="0" x2="50" y2="36" stroke={tone} strokeWidth="0.5" />
      <line x1="0" y1="66" x2="50" y2="36" stroke={tone} strokeWidth="0.4" opacity="0.7" />
      <line x1="100" y1="66" x2="50" y2="36" stroke={tone} strokeWidth="0.4" opacity="0.7" />
    </svg>
  )
}

function WaxSeal({
  size,
  tone,
  rotate,
  glyph = '♡',
}: {
  size: number
  tone: 'romantic' | 'blood'
  rotate: number
  glyph?: string
}) {
  const base =
    tone === 'blood'
      ? 'radial-gradient(circle at 30% 26%, #d0e3f0 0%, #b7d7ea 42%, #a9c9db 92%)'
      : 'radial-gradient(circle at 32% 28%, #e2eff6 0%, #a9c9db 40%, #b7d7ea 78%, #a9c9db 100%)'
  return (
    <div className="relative" style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}>
      {/* small drip beneath the seal, for a hand-pressed feel */}
      <div
        className="wax-drip absolute left-1/2 -bottom-1.5 -translate-x-1/2"
        style={{
          width: size * 0.32,
          height: size * 0.22,
          background: tone === 'blood' ? '#a9c9db' : '#b7d7ea',
          opacity: 0.85,
        }}
      />
      <div
        className="wax-blob absolute inset-0 flex items-center justify-center"
        style={{
          background: base,
          boxShadow:
            'inset 0 2px 3px rgba(255,255,255,0.28), inset 0 -5px 7px rgba(0,0,0,0.4), 0 3px 6px rgba(0,0,0,0.45)',
        }}
      >
        <span
          className="text-cream font-hand leading-none"
          style={{ fontSize: size * 0.34, transform: `rotate(${-rotate}deg)`, opacity: 0.92 }}
        >
          {glyph}
        </span>
      </div>
    </div>
  )
}

export default function Envelope(props: Props) {
  if (props.variant === 'pile') {
    const { label, index, rotate, locked, opened, glow, onClick } = props
    return (
      <motion.button
        type="button"
        disabled={locked}
        onClick={onClick}
        initial={{ opacity: 0, y: 30, rotate }}
        animate={{ opacity: 1, y: 0, rotate }}
        transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
        whileHover={locked ? {} : { rotate: 0, y: -6, scale: 1.03 }}
        whileTap={locked ? {} : { scale: 0.97 }}
        className={`envelope-deckle relative w-full max-w-[220px] aspect-[3/2] select-none
          ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${glow ? 'animate-glowPulse' : ''}
        `}
        style={{
          background: opened
            ? 'linear-gradient(155deg, #eee0c5, #ddc99f)'
            : 'linear-gradient(155deg, #fdf6e6, #f2e0bd)',
          boxShadow: '0 10px 18px rgba(183,215,234,0.35), 0 2px 4px rgba(183,215,234,0.25)',
        }}
      >
        <div className="paper-fiber absolute inset-0 overflow-hidden" />
        <div className="grain absolute inset-0 overflow-hidden" />
        <Creases />

        {/* flap */}
        <div
          className="envelope-flap absolute inset-x-0 top-0 h-[52%]"
          style={{
            background: opened
              ? 'linear-gradient(160deg, #e7d5ae, #dbc292)'
              : 'linear-gradient(160deg, #f9ecd2, #ecd6a9)',
          }}
        />

        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
          <WaxSeal size={30} tone="romantic" rotate={index % 2 === 0 ? -6 : 5} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 px-3 text-center">
          <span className="font-hand text-ink text-base sm:text-lg leading-tight drop-shadow-sm">
            {label}
          </span>
        </div>

        {locked && (
          <div className="envelope-deckle absolute inset-0 bg-burgundy/55 backdrop-blur-[1px] flex items-center justify-center">
            <Lock size={22} className="text-cream/90" strokeWidth={1.6} />
          </div>
        )}

        {opened && !locked && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center text-burgundy text-xs font-bold shadow-md">
            ✓
          </div>
        )}
      </motion.button>
    )
  }

  // ---- modal / "opening" envelope ----
  const { label, toLine, fromLine, phase, sealTone = 'romantic', children } = props
  const wiggle =
    phase === 'wiggle'
      ? { rotate: [0, -2.2, 2.2, -1.6, 1.6, 0], transition: { duration: 0.7 } }
      : { rotate: 0 }

  const flapOpen = phase === 'flap-open'

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: 1200 }}>
      <motion.div
        animate={wiggle}
        className="envelope-deckle relative w-full aspect-[3/2]"
        style={{
          background: 'linear-gradient(155deg, #fdf6e6, #f0deb9)',
          boxShadow: '0 18px 34px rgba(183,215,234,0.5), 0 4px 10px rgba(183,215,234,0.35)',
        }}
      >
        <div className="paper-fiber absolute inset-0 overflow-hidden" />
        <div className="grain absolute inset-0 overflow-hidden" />
        <Creases />

        {/* stamp, with a perforated / torn edge like a real postage stamp */}
        <div
          className="stamp-notch absolute top-2 right-2 w-11 h-13 bg-cream flex items-center justify-center rotate-3 shadow-sm"
          style={{ border: '2px dashed rgba(101,8,20,0.35)', padding: '3px' }}
        >
          <span className="font-hand2 text-[9px] text-blood text-center leading-tight">SPECIAL<br />DELIVERY</span>
        </div>

        {/* address block, slightly uneven ink like real handwriting pressure */}
        <div className="absolute left-4 bottom-4 right-16 text-left">
          <p className="font-hand2 text-[10px] tracking-wide text-blood/70 uppercase mb-1">To</p>
          <p className="font-hand text-lg text-ink leading-tight" style={{ textShadow: '0 0.5px 0 rgba(53,26,23,0.15)' }}>
            {toLine}
          </p>
          <p className="font-hand2 text-[10px] tracking-wide text-blood/70 uppercase mt-2 mb-1">From</p>
          <p className="font-hand text-base text-ink/80 leading-tight">{fromLine}</p>
        </div>

        {/* paper sliding out from inside the envelope */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[86%]"
          style={{ bottom: '8%', zIndex: flapOpen ? 3 : 1 }}
          initial={{ y: 10, opacity: 0 }}
          animate={
            flapOpen
              ? { y: '-58%', opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 } }
              : { y: 10, opacity: 0 }
          }
        >
          {children}
        </motion.div>

        {/* flap on top, flips open backwards */}
        <motion.div
          className="envelope-flap absolute inset-x-0 top-0 h-[54%] origin-top"
          style={{
            background: 'linear-gradient(160deg, #f9ecd2, #e9d09f)',
            zIndex: 4,
            transformStyle: 'preserve-3d',
          }}
          animate={
            flapOpen
              ? { rotateX: -178, transition: { duration: 0.8, ease: 'easeInOut' } }
              : { rotateX: 0 }
          }
        >
          <div className="paper-fiber absolute inset-0" />
          <div className="grain absolute inset-0" />
        </motion.div>

        {/* wax seal, cracks and fades as the letter opens */}
        <motion.div
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 5 }}
          animate={
            phase === 'seal-break' || flapOpen
              ? { scale: [1, 1.12, 0], rotate: [0, -8, 14], opacity: [1, 1, 0], transition: { duration: 0.6 } }
              : { scale: 1, opacity: 1 }
          }
        >
          <WaxSeal size={54} tone={sealTone} rotate={-4} />
        </motion.div>

        <p className="absolute top-2 left-3 font-hand2 text-[9px] tracking-wide text-blood/60 uppercase" style={{ zIndex: 5 }}>
          {label}
        </p>
      </motion.div>
    </div>
  )
}
