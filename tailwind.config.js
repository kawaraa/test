/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { xs: "450px" },
      fontFamily: {
        arabic: ["Noto Kufi Arabic", "sans-serif"],
        monospace: "monospace",
      },
      colors: {
        t: "#334155",
        dt: "#d1d5db",
        pc: "#b26cfc", // Primary Color and could be the Actions background and Links text color #1677ff
        sc: "#9bface", // Secondary Color
        bg: "#fafafa",
        cbg: "#ffffff", // Card Background color
        dbg: "#000000",
        dcbg: "#262626", // Dark Card Background color
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
