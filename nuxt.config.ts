export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  modules: ['@nuxtjs/i18n'],
  
  i18n: {
    restructureDir: '.',
    locales: [
      { code: 'uz', language: 'uz-Latn-UZ', name: "O'zbekcha", file: 'uz.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' }
    ],
    defaultLocale: 'uz',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  },
  
  css: ['~/assets/css/tailwind.css'],  // ~/ assets ga ishora qiladi
  
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
  
  // Netlify uchun muhim sozlamalar
  nitro: {
    preset: 'netlify',  // netlify preset - muhim!
    output: {
      dir: 'dist',      // Netlify default publish papkasi
      serverDir: '.netlify/functions-internal'
    },
    compressPublicAssets: true,
    minify: true
  },
  
  app: {
    head: {
      title: 'Yukchi uz',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  
  // Netlify deploy tezligi uchun
  sourcemap: false,
  
  // Static generation (SEO uchun)
  ssr: true
})