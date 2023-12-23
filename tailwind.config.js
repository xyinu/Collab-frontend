/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    }
  },
  plugins: [],
})