/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      sm: "280px",
      md: "325px",
      mdd: "400px",
      lg: "1080px"
    },
    extend: {
      colors: {
        primary: "#1ED760",
        secondary: "#1D173A",
        dashboardblue: "#006AFF",
        dashboardlblue: "#99C3FF",
        grey: "#F2F2F2",
        text: "#1E1E1E",
        text2: "#666666",
        text3: "#999999",
        gold: "#E7D10C"
      },
      width: {
        "minus-24": "calc(100% - 24px)"
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        changa: ["Changa", "sans-serif"],
        "changa-one": ["Changa One", "sans-serif"]
      }
    }
  },
  plugins: []
};
