/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/**/*.{html,ts}",

  ],
  theme: {
    extend: {
      colors:{
        'verde':'#00C087',
        'titulo':'#AC4A00',
        'fondo':'#F0F3F8'
      },
      width:{
        '500':'400px'
      },
      height:{
        '700':'500px'
      }
    },
  },
  plugins: [],
}

