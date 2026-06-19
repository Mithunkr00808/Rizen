import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/steam': {
          target: 'http://api.steampowered.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/steam/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Securely inject the API key on the server side
              const key = env.STEAM_API_KEY;
              if (key) {
                const separator = proxyReq.path.includes('?') ? '&' : '?';
                proxyReq.path += `${separator}key=${key}`;
              }
            });
          }
        }
      }
    }
  }
})
