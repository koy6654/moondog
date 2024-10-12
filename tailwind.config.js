/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'staking-texture': "url('./Assets/Images/Background_without_footer.png')",
      },
      fontFamily: {
        'concert-one': ['Concert One', 'cursive', 'sans-serif'],
        'comic-sans-ms': ['Comic Sans MS', 'Arial', 'sans-serif'],
        'comic-sans-ms-bold': ['ComicSansMSBold', 'Arial', 'sans-serif'],
      },
    },
    colors: {
      'white-gray': '#FFFFFF99',
      'light-tan': '#E9CBA4',
    },
  },
  plugins: [
    /**
     * @function
     * @description text-stroke-[n]px
     * - WebkitTextStrokeWidth 속성을 테일윈드에서 제어할 수 없어서 기능확장
     */
    function ({ addUtilities }) {
      addUtilities(
        {
          '.text-shadow-1px': {
            '-webkit-text-stroke-color': 'black',
            '-webkit-text-stroke-width': '1px',
            'text-shadow':
              'rgb(0, 0, 0) -1px -1px 0px, rgb(0, 0, 0) 1px -1px 0px, rgb(0, 0, 0) -1px 1px 0px, rgb(0, 0, 0) 1px 1px 0px',
          },
          '.text-shadow-2px': {
            '-webkit-text-stroke-color': 'black',
            '-webkit-text-stroke-width': '2px',
            'text-shadow':
              'rgb(0, 0, 0) -2px -2px 0px, rgb(0, 0, 0) 2px -2px 0px, rgb(0, 0, 0) -2px 2px 0px, rgb(0, 0, 0) 2px 2px 0px',
          },
          '.text-shadow-3px': {
            '-webkit-text-stroke-color': 'black',
            '-webkit-text-stroke-width': '3px',
            'text-shadow':
              'rgb(0, 0, 0) -2px -2px 0px, rgb(0, 0, 0) 2px -2px 0px, rgb(0, 0, 0) -2px 2px 0px, rgb(0, 0, 0) 2px 2px 0px',
          },
        },
        ['responsive']
      );
    },
  ],
};
