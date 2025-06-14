import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const replPlugins =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? [require("@replit/vite-plugin-cartographer").cartographer()]
    : [];

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...replPlugins,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"), // Change here!
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    fs: {
      allow: [path.resolve(__dirname)],
    },
    hmr: {
      overlay: false,
    },
  },
  base: "/",
});
