/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
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
        footer: "rgba(var(--footer_bg))",
        third_bg: "rgba(var(--third_bg))"
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: []
};
