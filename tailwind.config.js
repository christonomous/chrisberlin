/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#00ff9d",
          secondary: "#7c3aed",
          accent: "#ff006e",
          neutral: "#1f2937",
          "base-100": "#1a1b1e",
          "base-200": "#141517",
          "base-300": "#0c0c0d",
        },
      },
    ],
  },
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
};
