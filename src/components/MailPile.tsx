import Envelope from './Envelope'

interface MailPileProps {
  labels: string[]
  openedIds: number[]
  onOpen: (id: number) => void
}

const ROTATIONS = [-4, 2, -2, 3, -3]

export default function MailPile({ labels, openedIds, onOpen }: MailPileProps) {
  const opened = new Set(openedIds)

  return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 place-items-center">
        {labels.map((label, i) => {
          const id = i + 1
          const isOpened = opened.has(id)

          return (
            <Envelope
              key={id}
              variant="pile"
              label={label}
              index={i}
              rotate={ROTATIONS[i % ROTATIONS.length]}
              locked={false}
              opened={isOpened}
              glow={!isOpened}
              onClick={() => onOpen(id)}
            />
          )
        })}
      </div>
  )
}
