// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    // Private keys that are only available server-side
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    TEXT_MODEL: process.env.TEXT_MODEL || 'gpt-4o',
    IMAGE_MODEL: process.env.IMAGE_MODEL || 'dall-e-3'
  },

  app: {
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
    }
  },

  css: [],

  typescript: {
    strict: true,
    typeCheck: false
  },

  compatibilityDate: '2026-02-09'
})