import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy:{
      '/api' :{
          target: 'http://localhost:8000',
          changeOrigin:true
      }
    },
    host: "0.0.0.0", // Allows access from your local network (phone)
    port: 5173, // Default port for Vite, or change it if needed
  },
});
