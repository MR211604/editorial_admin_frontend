import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/editorial_cpanel/", // <- ESTO SE PONE EN PRODUCCION
  // base: "/",
  plugins: [react()],
});
