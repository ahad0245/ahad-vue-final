import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // or '0.0.0.0' to listen on all addresses
    port: 5173 // optional: pick your port
  }
  // If your project files are in a 'src' directory, Vite handles this by default.
  // If you have specific path aliases you want to set up (like '@/' pointing to 'src'),
  // you can configure them here, though it's not strictly necessary for this error.
  // resolve: {
  //   alias: {
  //     '@': '/src', // Make sure this path is correct based on your project structure
  //   },
  // },
})
