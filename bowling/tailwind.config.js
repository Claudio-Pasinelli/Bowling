/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      DMSans: ['DM Sans', 'sans-serif'],
    },
    fontSize: {
      h1: '4.5rem',
      h2: '3rem',
      h3: '2.5rem',
      h4: '2rem',
      h5: '1.5rem',
      h6: '1.125rem',
      xxl: '3.5rem',
      smm: '1.5rem',
      sm: '1.125rem',
      xl: '3rem',
      lg: '2.5rem',
      md: '2rem',
      s: '0.925rem',
      xs: '0.875rem',
      xxs: '0.675rem',
      '4xl': '2.441rem',
    },
    colors:{
      black: '#000000',
      white: '#ffffff',
      gray: {
        50: '#F8F8F8',
        100: '#F5F5F0',
        200: '#C1C1C1',
        300: '#8f8f8f',
      },
      red: {
        50: '#fca5a5',
        100: '#FF2323',
        200: '#D90000',
      },
      yellow: {
        50: '#FFE500',
        100:'#fde047',
        200: '#FFD700',
        300: '#BFAD00',
      },
      orange: {
        50:'#FFB800',
        100:'#DAAA00',
      },
      lightblue: {
        50:'#3ADBFF',
        100:'#24B8E6',
      },
      pink: {
        50:'#ffc6f4',
        100:'#e6a0d9',
      },
      amber: {
        50:'#ffc3a3',
        100:'#e69868',
      },
      indigo: {
        50:'#a5b4fc',
        100:'#8c9be8',
      },
      green: {
        50:'#86efac',
        100:'#6ac97a',
      },
    },
    extend: {},
  },
  plugins: [],
}