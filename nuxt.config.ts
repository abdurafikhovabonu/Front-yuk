export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/i18n'],
  i18n: {
    /** Til fayllari `frontend/locales/` da (default `i18n/locales` emas) */
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