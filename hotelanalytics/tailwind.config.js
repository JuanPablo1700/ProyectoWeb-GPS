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
        '500':'400px',
        '740':'740px',
        '60':'60px',
        'creado':'1150px',
        'asosia-w':'1000px',
        'ficha-w':'422px',
        'nuehotel-w':'600px',
        '800':'1200px'
      },
      height:{
        '700':'500px',
        '480':'450px',
        '58':'58px',
        '800':'650px',
        'asosia-h':'530px',
        'ficha-h':'200px',
        'asociados':'700px'
      }
    },
  },
  plugins: [],
}

