module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        cat:"url('../public/cat1.jpg')",
      } 
    },
  },
  plugins: [],
}
