<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Yuk elonlari</h1>
    
    <!-- Filters -->
    <div class="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div class="grid md:grid-cols-4 gap-4">
        <input 
          v-model="filters.from" 
          type="text" 
          placeholder="Qayerdan" 
          class="border rounded-lg px-4 py-2"
        />
        <input 
          v-model="filters.to" 
          type="text" 
          placeholder="Qayerga" 
          class="border rounded-lg px-4 py-2"
        />
        <select v-model="filters.cargo" class="border rounded-lg px-4 py-2">
          <option value="">Barcha yuk turlari</option>
          <option value="Mebel">Mebel</option>
          <option value="Oziq-ovqat">Oziq-ovqat</option>
          <option value="Qurilish">Qurilish materiallari</option>
          <option value="Elektronika">Elektronika</option>
        </select>
        <button 
          @click="loadLoads"
          class="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
        >
          Qidirish
        </button>
      </div>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <!-- No data -->
    <div v-else-if="loads.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <p class="text-gray-500">Hozircha yuk elonlari mavjud emas</p>
      <NuxtLink to="/create-order" class="inline-block mt-4 text-blue-600">
        Birinchi yuk elonini yaratish →
      </NuxtLink>
    </div>
    
    <!-- Loads list -->
    <div v-else class="space-y-4">
      <div 
        v-for="load in loads" 
        :key="load._id"
        class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Yuk eloni #{{ load._id?.slice(-6) }}
                </span>
                <span class="text-xs text-gray-500">{{ formatRelativeTime(load.createdAt) }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800">
                {{ load.from }} → {{ load.to }}
              </h3>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-blue-600">
                {{ formatPrice(load.price) }} so'm
              </p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-3 gap-4 mb-4">
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <span>{{ load.cargo }} ({{ load.weight }})</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Mijoz: {{ load.client?.name || 'Mijoz' }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ formatDate(load.createdAt) }}</span>
            </div>
          </div>
          
          <p v-if="load.description" class="text-gray-600 text-sm mb-4">
            {{ load.description }}
          </p>
          
          <div class="flex space-x-3">
            <button 
              @click="goToProposal(load._id)"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Taklif berish
            </button>
            <button 
              @click="viewLoadDetails(load._id)"
              class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Batafsil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getOrders } = useApi()
const router = useRouter()

const loads = ref([])
const loading = ref(true)
const filters = ref({
  from: '',
  to: '',
  cargo: ''
})

onMounted(() => {
  loadLoads()
})

const loadLoads = async () => {
  loading.value = true
  try {
    const allOrders = await getOrders()
    // Faqat pending statusdagi yuklarni ko'rsatish
    loads.value = allOrders.filter(order => order.status === 'pending')
    // Eng oxirgi qo'shilgan birinchi bo'lishi uchun sort
    loads.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    console.log('Loads loaded:', loads.value)
  } catch (error) {
    console.error('Error loading loads:', error)
  } finally {
    loading.value = false
  }
}

const goToProposal = (orderId) => {
  if (!orderId) {
    console.error('Order ID is undefined')
    return
  }
  console.log('Going to proposal for order:', orderId)
  router.push(`/loads/${orderId}/propose`)
}

const viewLoadDetails = (orderId) => {
  if (!orderId) {
    console.error('Order ID is undefined')
    return
  }
  router.push(`/orders/${orderId}`)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}

const formatRelativeTime = (date) => {
  if (!date) return 'Noma\'lum'
  const now = new Date()
  const created = new Date(date)
  const diffMs = now - created
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Hozirgina'
  if (diffMins < 60) return `${diffMins} daqiqa oldin`
  if (diffHours < 24) return `${diffHours} soat oldin`
  if (diffDays === 1) return 'Kecha'
  return `${diffDays} kun oldin`
}
</script>