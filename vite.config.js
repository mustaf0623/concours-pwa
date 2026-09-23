import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Base path pour GitHub Pages : nom du dépôt.
// Si le dépôt s'appelle autrement, changer REPO_NAME ci-dessous (ou VITE_BASE_PATH à la build).
const REPO_NAME = 'concours-pwa'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || `/${REPO_NAME}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Prépa Concours AgroTIC',
        short_name: 'PrépaConcours',
        description: "Environnement d'entraînement pour le concours voie Apprentissage — trajectoire AgroTIC / Bordeaux Sciences Agro",
        theme_color: '#1F4B3F',
        background_color: '#F3F5EF',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
})
