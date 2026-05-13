<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">📰 {{ t('newsPublic.pageTitle') }}</h1>
      <p class="text-gray-500 text-lg">{{ t('newsPublic.pageSubtitle') }}</p>
    </div>
    
    <!-- Categories -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      <button 
        v-for="cat in categories" 
        :key="cat.value"
        @click="selectedCategory = cat.value"
        :class="selectedCategory === cat.value 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        class="px-4 py-2 rounded-full transition"
      >
        {{ cat.name }}
      </button>
    </div>
    
    <!-- Featured News -->
    <div v-if="featuredNews" class="mb-12">
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-xl">
        <div class="grid md:grid-cols-2">
          <div class="p-8 text-white">
            <span class="text-sm bg-white/20 rounded-full px-3 py-1 inline-block mb-4">🏆 {{ t('newsPublic.featured') }}</span>
            <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ featuredNews.title }}</h2>
            <p class="text-blue-100 mb-4">{{ featuredNews.summary }}</p>
            <div class="flex items-center gap-4 text-sm text-blue-200 mb-6">
              <span>📅 {{ formatDate(featuredNews.createdAt) }}</span>
              <span>👁️ {{ featuredNews.views }} {{ t('newsPublic.views') }}</span>
            </div>
            <NuxtLink 
              :to="`/news/${featuredNews.slug}`" 
              class="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {{ t('newsPublic.readMore') }} →
            </NuxtLink>
          </div>
          <div class="h-64 md:h-auto">
            <img :src="featuredNews.image" :alt="featuredNews.title" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </div>
    
    <!-- News Grid -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">{{ t('newsPublic.loading') }}</p>
    </div>
    
    <div v-else-if="filteredNews.length === 0" class="text-center py-12">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
      </svg>
      <p class="text-gray-500">{{ t('newsPublic.noInCategory') }}</p>
    </div>
    
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="item in filteredNews.slice(0, 9)" 
        :key="item._id || item.slug"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        <div class="h-48 overflow-hidden">
          <img 
            :src="item.image" 
            :alt="item.title" 
            class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          >
        </div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span :class="getCategoryClass(item.category)" class="text-xs px-2 py-1 rounded-full">
              {{ getCategoryName(item.category) }}
            </span>
            <span class="text-xs text-gray-400">{{ formatDate(item.createdAt) }}</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{{ item.title }}</h3>
          <p class="text-gray-500 text-sm mb-4 line-clamp-3">{{ item.summary }}</p>
          <div class="flex justify-between items-center">
            <NuxtLink 
              :to="`/news/${item.slug}`" 
              class="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {{ t('newsPublic.read') }} →
            </NuxtLink>
            <span class="text-xs text-gray-400">👁️ {{ item.views }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'

const { t, locale } = useI18n()
const { getNews } = useApi()
const toast = useToast()

const news = ref([])
const loading = ref(true)
const selectedCategory = ref('')

const categories = computed(() => {
  void locale.value
  return [
    { name: t('newsPublic.all'), value: '' },
    { name: `📰 ${t('newsPublic.catYangilik')}`, value: 'yangilik' },
    { name: `💡 ${t('newsPublic.catMaslahat')}`, value: 'maslahat' },
    { name: `🤝 ${t('newsPublic.catHamkorlik')}`, value: 'hamkorlik' },
    { name: `🎉 ${t('newsPublic.catAksiya')}`, value: 'aksiya' }
  ]
})

const featuredNews = computed(() => {
  return news.value.find(n => n.category === 'yangilik')
})

const filteredNews = computed(() => {
  if (!selectedCategory.value) return news.value
  return news.value.filter(n => n.category === selectedCategory.value)
})

onMounted(() => {
  loadNews()
})

const loadNews = async () => {
  loading.value = true
  try {
    news.value = await getNews()
  } catch {
    toast.error('Yangiliklarni yuklashda xatolik')
  } finally {
    loading.value = false
  }
}

const getCategoryClass = (category) => {
  const classes = {
    yangilik: 'bg-blue-100 text-blue-800',
    maslahat: 'bg-green-100 text-green-800',
    hamkorlik: 'bg-purple-100 text-purple-800',
    aksiya: 'bg-red-100 text-red-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const getCategoryName = (category) => {
  const keys = {
    yangilik: 'newsPublic.catYangilik',
    maslahat: 'newsPublic.catMaslahat',
    hamkorlik: 'newsPublic.catHamkorlik',
    aksiya: 'newsPublic.catAksiya'
  }
  const k = keys[category]
  return k ? t(k) : category
}

const formatDate = (date) => {
  const loc = locale.value === 'uz' ? 'uz-UZ' : locale.value === 'ru' ? 'ru-RU' : 'en-US'
  return new Date(date).toLocaleDateString(loc, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>