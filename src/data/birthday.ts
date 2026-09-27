// ────────────────────────────────────────────────────────────────────────
// EDIT ME! Everything on this page is the content of the site.
// Change names, letter text, memory captions and image paths right here —
// you never need to touch the components to personalize the site.
// ────────────────────────────────────────────────────────────────────────

export interface Memory {
  image: string
  caption: string
}

export interface ThingILove {
  text: string
}

export interface BirthdayData {
  boyfriendName: string
  yourName: string

  landing: {
    heading: string
    subheading: string
    envelopeToLine: string
    envelopeFromLine: string
    buttonLabel: string
  }

  letter1: {
    label: string
    body: string[]
    signatureName: string
  }

  letter2: {
    title: string
    items: string[]
  }

  memories: Memory[]

  letter4: {
    label: string
    body: string[]
    closingLine: string
  }

  music: {
    src: string
  }
}

export const birthdayData: BirthdayData = {
  boyfriendName: 'CHEUMINH',
  yourName: 'ZANA',

  landing: {
    heading: 'HAPPY ANNIVERSARY, MY LOVE',
    subheading: 'You have some very important mail ♡',
    envelopeToLine: 'My Cheuminh ♡',
    envelopeFromLine: 'Your one and only baby',
    buttonLabel: 'Open your mail',
  },

  letter1: {
    label: 'Open me first ♡',
    body: [
      'Happy 1 year anniversary, my love 🤍 it’s been 12 months of growing together, learning each other’s hearts, and choosing each other through every up and down. you’ve been my light, my comfort, and my reason to smile even on the hardest days. every moment with you feels like home, safe, real, and full of love. thank you for being patient with me, for loving me even when i struggle to love myself. you’re not just someone i’m in love with, you’re the one i want to spend forever with. even on the hardest days of my life i would still want you to be my bf, i love you so much my minhminh',
    ],
    signatureName: 'Zana',
  },

  letter2: {
    title: '12 Things I Love About You',
    items: [
      'Your smile',
      'Your laugh',
      'Your eyes',
      'Your kisses',
      'Your efforts',
      'Your patience with me',
      'Your strength',
      'Your loyalty',
      'Your hugs',
      'The way you protect me',
      'The way you belive in me',
      'How loved you make me feel',
    ],
  },

  memories: [
    { image: '/images/p1.jpg', caption: 'Our 1st valentine' },
    { image: '/images/p2.jpg', caption: "The day you took me to a fancy place for dinner" },
    { image: '/images/p3.jpg', caption: 'Us at our favourite cafe' },
    { image: '/images/p4.jpg', caption: "Our love for photobooth" },
    { image: '/images/p5.jpg', caption: "You would always kiss my head for mirror pics" },
    { image: '/images/p6.jpg', caption: "Our daily emart visit" },
  ],

  letter4: {
    label: "Open me when you are sad ♡",
    body: [
      "sad again? what a baby 🥺 you do know i cant help but get mad at everything right? you know what’s funny, the only reason why i turned out like this was because of you. i keep loving you more and more everyday then i become sensitive so please understand and don’t be harsh on my little heart 😔 i hope you know that i love you more everyday and i miss you so so so so much and i cant wait for us to have a future together.",
      ],
    closingLine: "xoxo your only baby zana 💋",
  },


  music: {
    src: '/music/Daniel Caesar - Best Part (Audio) ft. H.E.R.mp3',
  },
}
