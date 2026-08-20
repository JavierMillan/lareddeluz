import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Dominio propio (CNAME: lareddeluz.com) → base "/", sin sub-ruta.
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        despega: path.resolve(__dirname, "despega/index.html"),
        ejercicios: path.resolve(__dirname, "ejercicios/index.html"),
      },
    },
  },
});
