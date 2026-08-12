import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    // Split the vendor libraries out of the app bundle so a content edit in
    // resume.js doesn't invalidate React + MUI in every returning visitor's cache.
    rollupOptions: {
      output: {
        // Matched on resolved paths rather than bare package names, so the
        // sub-entries (react-dom/client, react/jsx-runtime) land in the right
        // chunk instead of being hoisted into whichever bundle imports them.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-icons')) return 'icons'
          if (id.includes('@mui/icons-material')) return 'icons'
          if (id.includes('@mui') || id.includes('@emotion')) return 'mui'
          if (id.includes('react-dom') || id.includes('scheduler')) return 'react'
          if (/node_modules[\\/]react[\\/]/.test(id)) return 'react'
        },
      },
    },
  },
})
