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
        },
        animation: {
            'slide-in-left': 'slidefromleft 1s ease-out',
            'slide-in-right': 'slidefromright 1s ease-out',
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

