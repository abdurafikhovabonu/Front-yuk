<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Mening buyurtmalarim</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="orders.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
      </svg>
      <p class="text-gray-500">Sizning buyurtmalaringiz yo'q</p>
      <NuxtLink to="/create-order" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Birinchi buyurtmani yaratish →
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-4">
      <div 
        v-for="order in orders" 
        :key="order._id"
        class="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Buyurtma #{{ order._id?.slice(-6) }}
                </span>
                <span class="text-xs text-gray-500">{{ formatRelativeTime(order.createdAt) }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800">
                {{ order.from }} → {{ order.to }}
              </h3>
            </div>
            <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
              {{ getStatusText(order.status) }}
            </span>
          </div>
          
          <div class="grid md:grid-cols-3 gap-4 mb-4">
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <span>{{ order.cargo }} ({{ order.weight }})</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ formatPrice(order.price) }} so'm</span>
            </div>
            <div v-if="order.driverId" class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              <span>Haydovchi: {{ order.driver?.name || 'Tayinlanmoqda' }}</span>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="viewOrder(order._id)"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Batafsil ko'rish
            </button>
            <button 
              v-if="order.status === 'pending'"
              @click="cancelOrder(order._id)"
              class="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getOrders, updateOrder } = useApi()
const router = useRouter()
const toast = useToast()

const orders = ref([])
const loading = ref(true)

onMounted(() => {
  loadOrders()
})

const loadOrders = async () => {
  loading.value = true
  try {
    const allOrders = await getOrders()
    orders.value = allOrders
  } catch {
    toast.error('Buyurtmalarni yuklashda xatolik')
  } finally {
    loading.value = false
  }
}

const viewOrder = (orderId) => {
  if (!orderId) {
    toast.warning('Buyurtma topilmadi')
    return
  }
  router.push(`/orders/${orderId}`)
}

const cancelOrder = async (orderId) => {
  if (confirm('Buyurtmani bekor qilmoqchimisiz?')) {
    try {
      await updateOrder(orderId, { status: 'cancelled' })
      await loadOrders()
      toast.success('Buyurtma bekor qilindi')
    } catch {
      toast.error('Xatolik yuz berdi')
    }
  }
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-purple-100 text-purple-800',
    accepted: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    pending: '⏳ Kutilmoqda',
    negotiation: '💬 Muzokarada',
    accepted: '✅ Qabul qilingan',
    completed: '🎉 Bajarilgan',
    cancelled: '❌ Bekor qilingan'
  }
  return texts[status] || status
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
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