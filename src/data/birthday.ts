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

  letter5: {
    cakeHeading: string
    body: string[]
    signatureName: string
  }

  finalSurprise: {
    psLine: string
    buttonLabel: string
    subline: string
    closingLine: string
  }

  giftMessage?: string

  music: {
    src: string
  }
}

export const birthdayData: BirthdayData = {
  boyfriendName: 'Keanghong',
  yourName: 'Malina',

  landing: {
    heading: 'HAPPY BIRTHDAY, MY LOVE',
    subheading: 'You have some very important mail ♡',
    envelopeToLine: 'My Baby Hongiee ♡',
    envelopeFromLine: 'Someone who is very special to you',
    buttonLabel: 'Open your mail',
  },

  letter1: {
    label: 'Open me first ♡',
    body: [
      'Happy Birthday, baby. ♡',
      "I made this little place just for you because an ordinary birthday message didn't feel special enough.",
      'So... I have a few things I want to tell you.',
      'Take your time reading them, okay?',
    ],
    signatureName: 'Malina',
  },

  letter2: {
    title: 'Things I Love About You',
    items: [
      'Your stupid smile.',
      'The way you talk about school and studies.',
      'The little things you do without realizing.',
      'How innocent you are as person.',
      'How you somehow make ordinary days feel special.',
    ],
  },

  memories: [
    { image: '/images/p1.jpg', caption: 'We tried to look our best for each other' },
    { image: '/images/p2.jpg', caption: "You look so cute here" },
    { image: '/images/p3.jpg', caption: 'When we first started talking' },
    { image: '/images/p4.jpg', caption: "My first dump of u on insta" },
  ],

  letter4: {
    label: "Open when you're ready ♡",
    body: [
      "I don't know exactly when it happened.",
      'But somewhere along the way, you became my favorite person to talk to, my favorite person to annoy, my favorite person to miss...',
      'and my favorite person to love.',
      "I'm really, really lucky to have you.",
    ],
    closingLine: 'I love you. ♡',
  },

  letter5: {
    cakeHeading: 'HAPPY BIRTHDAY, MY LOVE',
    body: [
      'My birthday wish for you ♡',
      "I hope this year brings you everything you've been working toward.",
      'I hope you have more reasons to smile, more moments you\u2019re proud of, and more days where you feel loved.',
      'And selfishly...',
      'I hope I get to be beside you for as many of them as possible.',
      'Happy birthday, my love.',
      'Thank you for being you.',
      'I love you. ♡',
    ],
    signatureName: 'Linaaa',
  },

  finalSurprise: {
    psLine: "P.S. There's one more thing...",
    buttonLabel: 'One last surprise ♡',
    subline: 'I hope you liked your little mailbox.',
    closingLine: 'Your real life gift is coming soon😼',
  },

  giftMessage: 'I love you',

  music: {
    src: '/music/The 1975 - About You (Official).mp3',
  },
}
