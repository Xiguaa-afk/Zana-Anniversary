# Special Delivery ♡ — a birthday mailbox website

A little handmade-feeling website: a mailbox of five envelopes and love
letters, built with React + Vite + TypeScript + Tailwind + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

To build a shareable static version:

```bash
npm run build
npm run preview
```

## Personalize everything in one file

Open **`src/data/birthday.ts`**. Every piece of text on the site — his name,
your name, all five letters, the "things I love about you" list, memory
captions, and the final message — lives in that one file. You don't need to
touch any component code.

## Add your own photos

Drop images into `public/images/` named:

```
memory-1.jpg
memory-2.jpg
memory-3.jpg
memory-4.jpg
```

(You can add a 5th by adding another entry to `memories` in
`src/data/birthday.ts` pointing at `/images/memory-5.jpg`.) If a file is
missing, a pretty "Our memory ♡" placeholder frame shows instead — nothing
breaks.

## Add background music

Drop an mp3 at `public/music/birthday-song.mp3`. A small "♫" button appears
in the top-right corner that starts/stops it (autoplay is intentionally
disabled since browsers block it anyway). If the file isn't there, the button
simply doesn't render — the rest of the site works normally.

## How the experience flows

1. **Landing** — a big envelope with a wax seal. Clicking "Open your mail"
   plays the open animation and reveals the mailbox.
2. **Mailbox** — five envelopes styled like mail on a desk. Each one unlocks
   (and gently glows) only after the previous one has been opened.
3. **Letters 1–4** — each has its own opening animation and its own kind of
   content: a welcome note, a handwritten list, a set of memory polaroids,
   and a more intimate letter with a heart wax seal.
4. **Letter 5** — tapping the envelope first shows an illustrated cake; tap
   it to blow out the candles, then the final envelope opens with the
   biggest letter.
5. Once all five are read, a small "P.S." appears with a button that
   triggers a full-screen confetti-and-hearts celebration.

## Project structure

```
src/
  data/birthday.ts        ← all your customizable text/content
  components/
    Envelope.tsx           ← the envelope (both the small mailbox card and the big animated opening version)
    LetterPaper.tsx         ← reusable "real stationery" paper card
    LetterModal.tsx          ← runs the open animation, then reveals a letter
    LetterContents.tsx        ← the 5 letters' actual content
    MailPile.tsx               ← the "mail on a desk" navigation + progress mark
    MemoryPolaroid.tsx          ← photo card for Letter 3
    BirthdayCake.tsx              ← animated cake for Letter 5
    FloatingDecorations.tsx       ← the floating hearts/stars in the background
    MusicButton.tsx                ← optional background music toggle
    FinalCelebration.tsx            ← the full-screen ending celebration
  App.tsx                  ← wires the whole flow together
```

Have a great birthday surprise. ♡
# Birthday-Mailbox
