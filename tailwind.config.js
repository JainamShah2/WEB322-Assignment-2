// tailwind.config.js - This file MUST be a .js file
/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: [
    // Include all paths that contain Tailwind classes
    './views/**/*.ejs',
    './public/**/*.ejs',
  ],
  theme: {
    extend: {},
  },
  // Ensure the plugins are correctly listed here
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}