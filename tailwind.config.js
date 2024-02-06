/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
import plugin from 'tailwindcss/plugin';
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    },
    extend:{
      colors: {
        ntured: '#d71440',
        ntublue: '#181C62'
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
        addBase({
            '.scrollbar': {
                overflowY: 'auto',
                scrollbarColor: `${theme('colors.ntublue')} ${theme('colors.blue.200')}`,
                scrollbarWidth: 'thin',
            },
            '.scrollbar::-webkit-scrollbar': {
                height: '2px',
                width: '4px',
            },
            '.scrollbar::-webkit-scrollbar-thumb': {
                backgroundColor: theme('colors.blue.600'),
            },
            '.scrollbar::-webkit-scrollbar-track-piece': {
                backgroundColor: theme('colors.blue.200'),
            },
        });
    }),
]
})