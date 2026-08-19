import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Dominio propio (CNAME: lareddeluz.com) → base "/", sin sub-ruta.
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
