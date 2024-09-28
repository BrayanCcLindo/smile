/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "rgba(var(--main))",
        alternative: "rgba(var(--alternative))",
        main_bg: "rgba(var(--main_bg))",
        content_text: "rgba(var(--content_text))",
        heading: "rgba(var(--heading))",
        card_border: "rgba(var(--border_gray))",
        second_bg: "rgba(var(--second_bg))",
        input_bg: "rgba(var(--input_bg))",
        entrepreneur: "rgba(var(--entrepreneur))",
        footer: "rgba(var(--footer_bg))"
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      }
    }
  },
  plugins: []
};
