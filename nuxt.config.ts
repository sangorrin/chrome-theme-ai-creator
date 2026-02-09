import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys that are only available server-side
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    TEXT_MODEL: process.env.TEXT_MODEL || 'gpt-4o',
    IMAGE_MODEL: process.env.IMAGE_MODEL || 'dall-e-3',

    // Public keys that are exposed to the client
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000',
      themeStorageUrl: process.env.NUXT_PUBLIC_THEME_STORAGE_URL || '',
    }
  },
  head: {
    title: 'Chrome Theme AI Creator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Create and customize Chrome themes using AI.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/styles/main.css'
  ],
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  axios: {
    baseURL: '/api'
  },
  pwa: {
    manifest: {
      name: 'Chrome Theme AI Creator',
      short_name: 'Theme AI',
      description: 'Generate and customize Chrome themes with AI assistance.',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    }
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server/api' }
  ]
})