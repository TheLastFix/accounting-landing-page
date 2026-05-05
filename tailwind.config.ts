import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#4CFFC9",
        "accent-dark": "#2a9d6e",
        "accent-bg": "rgba(76, 255, 201, 0.15)",
        middle: "#5E8278",
        grey: "#626262",
        light: "#F7FFFD",
        dark: "#00281E",
        "border-subtle": "rgba(0, 0, 0, 0.05)",
        "border-light": "rgba(0, 0, 0, 0.1)",
        "white-60": "rgba(255, 255, 255, 0.6)",
      },
      fontFamily: {
        title: ["Bree Serif", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
