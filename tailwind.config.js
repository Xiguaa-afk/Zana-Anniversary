/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blood: '#650814',
        burgundy: '#3D050C',
        romantic: '#A91527',
        cream: '#F8EBD8',
        paper: '#FFF7EA',
        ink: '#351A17',
        blush: '#D98B91',
        gold: '#D6A84F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        hand: ['"Caveat"', 'cursive'],
        hand2: ['"Patrick Hand"', 'cursive'],
        body: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        paper: '0 2px 6px rgba(53, 26, 23, 0.18), 0 10px 24px rgba(53, 26, 23, 0.14)',
        envelope: '0 8px 20px rgba(61, 5, 12, 0.45), 0 2px 6px rgba(61, 5, 12, 0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-3deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(214,168,79,0.0)' },
          '50%': { boxShadow: '0 0 22px rgba(214,168,79,0.55)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1, transform: 'scaleY(1)' },
          '45%': { opacity: 0.7, transform: 'scaleY(0.92)' },
          '55%': { opacity: 0.9, transform: 'scaleY(1.05)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        glowPulse: 'glowPulse 2.4s ease-in-out infinite',
        flicker: 'flicker 0.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
