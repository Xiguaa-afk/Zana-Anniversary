import { motion } from 'framer-motion'
import LetterPaper from './LetterPaper'
import MemoryPolaroid from './MemoryPolaroid'
import { BirthdayData } from '../data/birthday'

function CloseButton({ onClose, label = 'Back to the mailbox' }: { onClose: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="mt-8 mx-auto block font-hand2 text-sm tracking-wide text-blood/80 border border-blood/30 rounded-full px-5 py-2 hover:bg-blood/5 transition-colors"
    >
      {label}
    </button>
  )
}

export function Letter1({ data, onClose }: { data: BirthdayData; onClose: () => void }) {
  return (
    <LetterPaper rotate={-1} bgColor="var(--envelope-cream)">
      <div className="text-center space-y-4">
        {data.letter1.body.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.35, duration: 0.5 }}
            className="font-hand text-2xl sm:text-3xl text-ink leading-snug"
          >
            {line}
          </motion.p>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + data.letter1.body.length * 0.35 + 0.3 }}
          className="font-hand text-xl text-blood pt-4"
        >
          Love,<br />{data.letter1.signatureName} ♡
        </motion.p>
      </div>
      <p className="text-center font-hand2 text-xs tracking-widest text-blood/60 uppercase mt-6">Next letter →</p>
      <CloseButton onClose={onClose} />
    </LetterPaper>
  )
}

export function Letter2({ data, onClose }: { data: BirthdayData; onClose: () => void }) {
  return (
    <LetterPaper rotate={0.8} bgColor="var(--envelope-cream)">
      <h3 className="text-center font-display italic text-3xl sm:text-4xl text-blood mb-6">
        {data.letter2.title}
      </h3>
      <ul className="space-y-4 max-w-xs mx-auto">
        {data.letter2.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.28, duration: 0.45 }}
            className="font-hand text-xl sm:text-2xl text-ink flex items-start gap-2"
          >
            <span className="text-blood mt-1">✦</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
      <div className="flex justify-center gap-3 mt-8 text-blush text-lg select-none" aria-hidden="true">
        <span>♡</span><span>❀</span><span>✦</span><span>❀</span><span>♡</span>
      </div>
      <CloseButton onClose={onClose} />
    </LetterPaper>
  )
}

export function Letter3({ data, onClose }: { data: BirthdayData; onClose: () => void }) {
  const rotations = [-3, 2, -2, 3, -1]
  return (
    <LetterPaper rotate={-0.4} className="max-w-2xl" bgColor="var(--bg-bottom)">
      <h3 className="text-center font-display italic text-3xl sm:text-4xl text-blood mb-8">Our Memories</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {data.memories.map((m, i) => (
          <MemoryPolaroid key={i} image={m.image} caption={m.caption} rotate={rotations[i % rotations.length]} />
        ))}
      </div>
      <CloseButton onClose={onClose} />
    </LetterPaper>
  )
}

export function Letter4({ data, onClose }: { data: BirthdayData; onClose: () => void }) {
  return (
    <LetterPaper rotate={0.3} bgColor="var(--envelope-cream)">
      <div className="text-center space-y-4">
        {data.letter4.body.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.4, duration: 0.5 }}
            className="font-hand text-2xl sm:text-3xl text-ink leading-snug"
          >
            {line}
          </motion.p>
        ))}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 + data.letter4.body.length * 0.4 + 0.3 }}
          className="font-hand text-3xl text-blood pt-4"
        >
          {data.letter4.closingLine}
        </motion.p>
      </div>
      <CloseButton onClose={onClose} />
    </LetterPaper>
  )
}

export function Letter5({ data, onClose }: { data: BirthdayData; onClose: () => void }) {
  return (
    <LetterPaper rotate={-0.5} className="max-w-xl">
      <div className="text-center space-y-4">
        {data.letter4.body.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.32, duration: 0.5 }}
            className="font-hand text-2xl sm:text-3xl text-ink leading-snug"
          >
            {line}
          </motion.p>
        ))}
      </div>
      <CloseButton onClose={onClose} label="Close" />
    </LetterPaper>
  )
}


