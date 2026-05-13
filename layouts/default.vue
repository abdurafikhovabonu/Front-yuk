<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    
    <Toast />
    
    <footer class="bg-white border-t mt-16">
      <div class="container mx-auto px-4 py-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p class="text-gray-600 text-sm mt-4">
              {{ t('footer.tagline') }}
            </p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 mb-4">{{ t('footer.quickLinks') }}</h3>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/" class="text-gray-600 hover:text-blue-600">{{ t('nav.home') }}</NuxtLink></li>
              <li><NuxtLink to="/create-order" class="text-gray-600 hover:text-blue-600">{{ t('nav.createLoad') }}</NuxtLink></li>
              <li><NuxtLink to="/drivers" class="text-gray-600 hover:text-blue-600">{{ t('nav.drivers') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 mb-4">{{ t('footer.useful') }}</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-600 hover:text-blue-600">{{ t('footer.help') }}</a></li>
              <li><a href="#" class="text-gray-600 hover:text-blue-600">{{ t('footer.faq') }}</a></li>
              <li><a href="#" class="text-gray-600 hover:text-blue-600">{{ t('footer.rules') }}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 mb-4">{{ t('footer.contact') }}</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>📞 +998 71 123 45 67</li>
              <li>✉️ info@yukchi.uz</li>
              <li>📍 Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>
        <div class="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {{ year }} Yukchi.uz. {{ t('footer.rights') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Toast from '~/components/Toast.vue'
import Logo from '~/components/Logo.vue'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>