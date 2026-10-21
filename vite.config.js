import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/admin/", // <- ESTO SE PONE EN PRODUCCION
  // base: "/",
  plugins: [react()],
});
