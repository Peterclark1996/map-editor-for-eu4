import { defineConfig } from 'vite'
import { join } from 'path'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron',
          },
        },
      },
      preload: {
        input: {
          index: join(__dirname, 'electron/preload.ts'),
        },
        vite: {
          build: {
            sourcemap: 'inline',
            outDir: 'dist/electron',
          }
        },
      },
      renderer: {},
    })
  ]
})
