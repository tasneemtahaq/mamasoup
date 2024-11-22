// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1a1a1a",      // Custom dark color
        light: "#f5f5f5",     // Custom light color
      },
    },
  },
  plugins: [],
};
