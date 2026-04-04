import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
=======
>>>>>>> 6b4d593ccd3acc0be48432d04b1c70807c83be2b
});
