/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Marca madre — ver brand-profile-lareddeluz.md */
        void: { DEFAULT: "#0d0b16", 2: "#161423" },
        gold: { DEFAULT: "#e4cd85", dark: "#c08a2d" },
        deep: "#163384",

        /* DESPEGA — ver brand-profile-despega.md */
        copper: {
          DEFAULT: "#d4823f",
          light: "#e6a668",
          dark: "#a35f26",
        },
      },
      fontFamily: {
        /* Display propia de DESPEGA. Nunca itálica en titulares. */
        display: ["Instrument Serif", "Georgia", "serif"],
        /* Display de la marca madre (index) */
        spectral: ["Spectral", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        /* La curva del sistema: entra rápido, asienta lento */
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
