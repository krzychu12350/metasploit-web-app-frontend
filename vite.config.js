import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /*
    VitePWA({
      devOptions: {
        enabled: true
    
      },
      includeAssets: ['logo.svg', 'metasploit-logo.png'],
      manifest: {
        name: 'Metasploit GUI',
        short_name: 'Metasploit GUI',
        description: 'Metasploit GUI Frontend',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
    */
  ]
})
