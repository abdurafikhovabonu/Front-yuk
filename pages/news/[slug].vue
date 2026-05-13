<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="!news" class="text-center py-12">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
      </svg>
      <p class="text-gray-500">Yangilik topilmadi</p>
      <NuxtLink to="/news" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        ← Yangiliklarga qaytish
      </NuxtLink>
    </div>
    
    <div v-else>
      <!-- Back button -->
      <NuxtLink to="/news" class="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6">
        ← Barcha yangiliklar
      </NuxtLink>
      
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span :class="getCategoryClass(news.category)" class="text-sm px-3 py-1 rounded-full">
            {{ getCategoryName(news.category) }}
          </span>
          <span class="text-sm text-gray-500">{{ formatDate(news.createdAt) }}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ news.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span>✍️ {{ news.author }}</span>
          <span>👁️ {{ news.views }} ta ko'rish</span>
        </div>
      </div>
      
      <!-- Featured Image -->
      <div class="rounded-2xl overflow-hidden mb-8 shadow-lg">
        <img :src="news.image" :alt="news.title" class="w-full h-auto">
      </div>
      
      <!-- Content -->
      <div class="prose prose-lg max-w-none mb-8" v-html="news.content"></div>
      
      <!-- Share Section -->
      <div class="border-t pt-8 mt-8">
        <p class="text-gray-600 mb-4">Ushbu maqolani ulashish:</p>
        <div class="flex gap-3">
          <button @click="shareTelegram" class="bg-[#0088cc] text-white px-4 py-2 rounded-lg hover:bg-[#0077b3] transition">
            📱 Telegram
          </button>
          <button @click="shareFacebook" class="bg-[#1877f2] text-white px-4 py-2 rounded-lg hover:bg-[#166fe5] transition">
            📘 Facebook
          </button>
          <button @click="shareWhatsApp" class="bg-[#25d366] text-white px-4 py-2 rounded-lg hover:bg-[#20bd5a] transition">
            💬 WhatsApp
          </button>
        </div>
      </div>
      
      <!-- Related News -->
      <div v-if="relatedNews.length > 0" class="border-t pt-8 mt-8">
        <h3 class="text-2xl font-bold mb-6">📚 O'xshash maqolalar</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="item in relatedNews" 
            :key="item.id"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
          >
            <NuxtLink :to="`/news/${item.slug}`" class="flex gap-4">
              <img :src="item.image" :alt="item.title" class="w-24 h-24 object-cover rounded-lg">
              <div>
                <h4 class="font-semibold text-gray-800 line-clamp-2">{{ item.title }}</h4>
                <p class="text-sm text-gray-500 mt-1">{{ formatDate(item.createdAt) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getNews } = useApi()

const news = ref(null)
const loading = ref(true)
const allNews = ref([])

const relatedNews = computed(() => {
  if (!news.value) return []
  return allNews.value.filter(n => 
    n.id !== news.value.id && n.category === news.value.category
  ).slice(0, 2)
})

onMounted(() => {
  loadNews()
})

const loadNews = async () => {
  loading.value = true
  try {
    allNews.value = await getNews()
    news.value = allNews.value.find(n => n.slug === route.params.slug)
  } catch (error) {
    console.error('Error loading news:', error)
  } finally {
    loading.value = false
  }
}

const shareTelegram = () => {
  window.open(`https://t.me/share/url?url=${window.location.href}&text=${news.value.title}`, '_blank')
}

const shareFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
}

const shareWhatsApp = () => {
  window.open(`https://wa.me/?text=${news.value.title} - ${window.location.href}`, '_blank')
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
  const names = {
    yangilik: '📰 Yangilik',
    maslahat: '💡 Maslahat',
    hamkorlik: '🤝 Hamkorlik',
    aksiya: '🎉 Aksiya'
  }
  return names[category] || category
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.prose {
  line-height: 1.75;
}
.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 1rem 0;
}
.prose li {
  margin: 0.5rem 0;
}
</style>