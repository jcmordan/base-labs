import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./.test/setupTests.js",
    exclude: [
      "node_modules",
      "dist",
      "coverage",
      ".coverage",
      "**/components/ui/**",
    ],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules",
        "dist",
        "coverage",
        ".coverage",
        "**/components/ui/**",
        "**/*.spec.tsx",
        "**/*.{js,cjs}",
        "vite.config.ts",
      ],
    },
  },
});
