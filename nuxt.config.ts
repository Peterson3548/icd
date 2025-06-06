// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN,
    HFToken: process.env.HF_TOKEN
  },

  modules: ['@nuxt/eslint'],
})