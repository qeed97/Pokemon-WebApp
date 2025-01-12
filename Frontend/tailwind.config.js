/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            "silkscreen": ['SilkScreen', 'sans-serif'],
        },
        imageRendering: {
            pixelated: 'pixelated',
        },
        keyframes: {
            slidefromleft: {
                from: {marginRight: '120%'},
                to: {marginRight: '0%'},
            },
            slidefromright: {
                from: {marginLeft: '120%'},
                to: {marginLeft: '0%'},
            },
            attack: {
                '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
                '30%': { transform: 'translate(20px, -20px) rotate(20deg)' },
                '60%': { transform: 'translate(40px, -40px) rotate(40deg)' },
                '100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
            },
            mirroredAttack: {
                '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
                '25%': { transform: 'translate(20px, -20px) rotate(20deg)' },
                '50%': { transform: 'translate(40px, -40px) rotate(40deg)' },
                '75%': { transform: 'translate(20px, -20px) rotate(20deg)' },
                '100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
            },
            defend: {
                '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
                '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
                '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
                '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
                '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
                '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
                '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
                '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
                '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
            },
        },
        animation: {
            'slide-in-left': 'slidefromleft 1s ease-out',
            'slide-in-right': 'slidefromright 1s ease-out',
            'attack': 'attack 0.25s ease-in-out',
            'mirroredAttack': 'mirroredAttack 0.25s ease-in-out',
            'defend': 'defend 0.5s ease-in-out',
        }
    },
  },
  plugins: [
      function ({addUtilities}) {
      addUtilities({
          '.image-pixelated': {
              'image-rendering': 'pixelated',
          },
      });
      },
  ],
}

