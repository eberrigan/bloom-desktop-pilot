const colors = require('tailwindcss/colors');


module.exports = {
 content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
 darkMode: false,
 theme: {
   extend: {
     colors: {
       sky: colors.sky,
       cyan: colors.cyan,
     },
     animation: {
       'loading-bar': 'loading-bar 1.5s linear infinite',
     },
     keyframes: {
       'loading-bar': {
         '0%': { backgroundPosition: '200% 0' },
         '100%': { backgroundPosition: '-200% 0' },
       },
     },
   },
 },
 variants: {
   extend: {},
 },
 plugins: [],
};

