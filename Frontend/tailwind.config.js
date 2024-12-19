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

