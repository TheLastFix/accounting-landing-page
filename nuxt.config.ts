import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  statSync,
} from "node:fs";
import { join } from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  buildId: "landing-static",
  experimental: {
    appManifest: false,
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  app: {
    baseURL: "/",
    buildAssetsDir: "_nuxt",
    cdnURL: "/static/landing/",
    head: {
      title: "OneSnap",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/static/landing/favicon.svg",
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
  hooks: {
    "nitro:init"(nitro) {
      nitro.hooks.hook("prerender:done", () => {
        const publicDir = nitro.options.output.publicDir;

        // Clean JSON files with proper parsing
        const cleanJsonFiles = (dir: string) => {
          if (!existsSync(dir)) return;
          for (const file of readdirSync(dir)) {
            const fullPath = join(dir, file);
            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
              cleanJsonFiles(fullPath);
            } else if (file.endsWith(".json")) {
              try {
                const data = JSON.parse(readFileSync(fullPath, "utf-8"));
                if (
                  data &&
                  typeof data === "object" &&
                  "prerenderedAt" in data
                ) {
                  delete data.prerenderedAt;
                  writeFileSync(fullPath, JSON.stringify(data), "utf-8");
                }
              } catch {}
            }
          }
        };

        // Clean HTML files (timestamp in __NUXT_DATA__ script tag)
        const htmlFiles = ["index.html", "200.html", "404.html"];
        for (const file of htmlFiles) {
          const filePath = join(publicDir, file);
          if (!existsSync(filePath)) continue;
          let content = readFileSync(filePath, "utf-8");
          const cleaned = content.replace(/\},\d{13},false\]/g, "},false]");
          if (cleaned !== content) writeFileSync(filePath, cleaned);
        }

        cleanJsonFiles(publicDir);
      });
    },
  },
  tailwindcss: {
    configPath: "tailwind.config.ts",
  },
});
