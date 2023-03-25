/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {},
    fontSize: {
      xs: ['0.75rem', '1.25rem'],
      sm: ['1rem', '1.5rem'],
      base: ['1.25rem', '1.75rem'],
      lg: ['1.5rem', '2rem'],
      xl: ['1.75rem', '2.25rem']
    }
  },
  plugins: []
}
