/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        offblack: "#151515",
        white: "#ffffff",
        offwhite: "#f2f2f2",
        deepblue: "#25076B",
        closedark: "#0A0D14",
        grey: "#ECECEC",
        borderGrey: "#E2E4E9",
        errorRed: "#DF1C41",
        basicBlue: "#003366",
      },
      screens: {
        fd: [{ max: "320px" }],
        lsm: [{ max: "576px" }],
        lmd: [{ max: "768px" }],
        llg: [{ max: "992px" }],
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1440px",
      },
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Arimo: ["Arimo", "sans-serif"],
        Helvetica: ["'Helvetica Neue'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
