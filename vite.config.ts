import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// vite config for the train reservation app
export default defineConfig({
  base: '/Train-Reservation-System/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 5173,
    allowedHosts: true,
    watch: {
      ignored: ["**/node_modules/**", "**/.local/**", "**/.git/**"],
    },
  },
})
