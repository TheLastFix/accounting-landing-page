export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  app: {
    baseURL: "/",
    buildAssetsDir: "_nuxt",
    cdnURL: process.env.LANDING_CDN_URL || undefined,
    head: {
      title: "OneSnap",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: process.env.LANDING_CDN_URL
            ? `${process.env.LANDING_CDN_URL}/favicon.svg`
            : "/favicon.svg",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bree+Serif&family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },
  nitro: {
    preset: "static",
    static: true,
  },
  tailwindcss: {
    configPath: "tailwind.config.ts",
  },
});
