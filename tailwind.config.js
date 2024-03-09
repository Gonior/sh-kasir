/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
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
  plugins: [],
}

