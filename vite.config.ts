import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'icon.svg',
          'tears-channel-icon.svg',
          'tears-channel-512x512.png',
          'screenshots/pwa-wide-workbook.png',
          'screenshots/pwa-wide-ecosystem.png',
          'screenshots/pwa-narrow-mobile.png',
        ],
        manifest: {
          id: '/',
          name: 'S.T.E.A.Reality: The Jeanell Land Odyssey (stearealitythejeanelllandodyssey.com)',
          short_name: 'STEAR Safe',
          description:
            'Official PWA for stearealitythejeanelllandodyssey.com — S.T.E.A.R.S. SAFE, T.E.A.R.S. CHANNEL, ABC Financial Literacy Workbook, 7-Day Mission History, & All Your Needs Reality LLC.',
          theme_color: '#020617',
          background_color: '#020617',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          categories: ['education', 'finance', 'business', 'productivity'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/tears-channel-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
          screenshots: [
            {
              src: '/screenshots/pwa-wide-workbook.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              label: "The ABC's of Financial Literacy Workbook — 6-Week Hybrid Training Guide",
            },
            {
              src: '/screenshots/pwa-wide-ecosystem.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              label: 'S.T.E.A.R.S. SAFE & T.E.A.R.S. CHANNEL Ecosystem on stearealitythejeanelllandodyssey.com',
            },
            {
              src: '/screenshots/pwa-narrow-mobile.png',
              sizes: '750x1334',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Mobile Standalone PWA — 7-Day Mission History & Financial Literacy Academy',
            },
          ],
          shortcuts: [
            {
              name: '7-Day Mission History',
              short_name: 'Missions',
              description: 'View your 7-day completed daily missions, streak multiplier, and past rewards',
              url: '/?modal=mission-history',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }],
            },
            {
              name: 'T.E.A.R.S. CHANNEL Media',
              short_name: 'TEARS TV',
              description: 'Open T.E.A.R.S. Channel Broadcast & Detroit News Lab',
              url: '/?tab=media',
              icons: [{ src: '/tears-channel-512x512.png', sizes: '512x512', type: 'image/png' }],
            },
            {
              name: 'All Your Needs Reality MLS',
              short_name: 'Realty MLS',
              description: 'Jeanell Land, Broker/Principal — Nationwide MLS & NACA Acquisition Portal',
              url: '/?tab=mls',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }],
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio preview iframe. Ignore WebSocket errors.
      hmr: false as const,
      ws: false as const,
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
