import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  base: "/schoolapp/",
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: false },
      includeAssets: ["placeholder.svg"],
      manifest: {
        name: "AppName - School Management",
        short_name: "AppName",
        description: "School Management System",
        theme_color: "#6366f1",
        background_color: "#f8f9fb",
        display: "standalone",
        start_url: "./",
        scope: "./",
        icons: [
          { src: "placeholder.svg", sizes: "192x192", type: "image/svg+xml" },
          { src: "placeholder.svg", sizes: "512x512", type: "image/svg+xml" },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
