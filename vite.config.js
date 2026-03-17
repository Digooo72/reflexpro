import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Ez mondja meg, hogy HTML-t tesztelünk
    setupFiles: './src/setupTests.js', // Ide tesszük a kiegészítő beállításokat
    globals: true // Hogy ne kelljen mindig importálni a test, expect szavakat
  }
})