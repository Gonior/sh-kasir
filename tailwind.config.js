/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      animation: {
				'spin-slow': 'spin 3s linear infinite'
			},
      transitionProperty: {
				height: 'height',
				width: 'width'
			}
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

