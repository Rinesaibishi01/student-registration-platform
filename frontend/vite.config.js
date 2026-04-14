import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Shto këtë rresht

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Shto këtë këtu
  ],
})