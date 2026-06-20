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
        },
        '/api/riot-account': {
          target: 'https://asia.api.riotgames.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/riot-account/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq) => {
              const riotKey = env.RIOT_API_KEY;
              if (riotKey) {
                proxyReq.setHeader('X-Riot-Token', riotKey);
              }
            });
          }
        },
        '/api/riot-val': {
          target: 'https://ap.api.riotgames.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/riot-val/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq) => {
              const riotKey = env.RIOT_API_KEY;
              if (riotKey) {
                proxyReq.setHeader('X-Riot-Token', riotKey);
              }
            });
          }
        },
        '/api/henrik': {
          target: 'https://api.henrikdev.xyz',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/henrik/, '')
        },
        '/api/wikimedia': {
          target: 'https://upload.wikimedia.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/wikimedia/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
            });
          }
        }
      }
    }
  }
})
