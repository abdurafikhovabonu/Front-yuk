export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['../assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
    vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server'
  },
  app: {
    head: {
      title: 'Yukchi uz',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})