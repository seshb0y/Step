import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5293', // адрес вашего API
        changeOrigin: true, // необходимо для корректного выполнения запросов
        secure: false, // если API использует HTTPS, установите `true`
        rewrite: (path) => path.replace(/^\/api/, '') // если нужно удалить /api из пути
      }
    }
  },
  plugins: [react()],
})
