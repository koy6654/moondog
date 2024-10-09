/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'staking-texture': "url('./Assets/Images/Background.png')",
      },
      fontFamily: {
        'concert-one': ['"Concert One"', 'cursive', 'sans-serif'],
        'comic-sans-ms': ['"Comic Sans MS"', 'Arial', 'sans-serif'],
      },
    },
    colors: {
      'white-gray': '#FFFFFF99',
      'light-tan': '#E9CBA4',
    },
  },
  plugins: [],
};
