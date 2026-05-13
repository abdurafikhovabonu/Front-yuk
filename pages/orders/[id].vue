<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center mb-6">
      <NuxtLink to="/orders" class="text-blue-600 hover:text-blue-800 mr-4">
        ← Orqaga
      </NuxtLink>
      <h1 class="text-3xl font-bold">Buyurtma</h1>
    </div>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Ma'lumotlar yuklanmoqda...</p>
    </div>
    
    <div v-else-if="error" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      <p class="text-red-500">{{ error }}</p>
      <NuxtLink to="/orders" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Buyurtmalar sahifasiga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else-if="!order || !order._id" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <p class="text-gray-500">Buyurtma topilmadi</p>
      <NuxtLink to="/orders" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Buyurtmalar sahifasiga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-6">
      <!-- Debug panel -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p class="font-semibold text-yellow-800">🔍 Debug:</p>
        <p class="text-sm">Order ID: {{ order._id }}</p>
        <p class="text-sm">Status: {{ order.status }}</p>
        <p class="text-sm">Driver ID: {{ order.driverId }}</p>
      </div>
      
      <!-- Status card -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Buyurtma holati</h2>
          <span :class="statusClass" class="px-4 py-2 rounded-full text-sm font-semibold">
            {{ statusText }}
          </span>
        </div>
      </div>
      
      <!-- Order details -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Buyurtma ma'lumotlari</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm">📍 Qayerdan</p>
            <p class="font-semibold">{{ order.from || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm">📍 Qayerga</p>
            <p class="font-semibold">{{ order.to || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm">📦 Yuk turi</p>
            <p class="font-semibold">{{ order.cargo || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm">⚖️ Og'irligi</p>
            <p class="font-semibold">{{ order.weight || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm">💰 Narx</p>
            <p class="font-bold text-2xl text-blue-600">{{ formatPrice(order.price) }} so'm</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm">📅 Yaratilgan sana</p>
            <p class="font-semibold">{{ formatDate(order.createdAt) }}</p>
          </div>
        </div>
      </div>
      
      <!-- Driver info -->
      <div v-if="order.driverId" class="bg-green-50 rounded-2xl shadow-md p-6 border border-green-200">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">🚚 Haydovchi ma'lumotlari</h2>
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {{ order.driver?.name?.charAt(0) || 'H' }}
          </div>
          <div class="flex-1">
            <p class="font-semibold text-lg">{{ order.driver?.name || 'Haydovchi' }}</p>
            <p class="text-gray-500">{{ order.driver?.carType }} • {{ order.driver?.carNumber }}</p>
            <p class="text-gray-500 text-sm">Tel: {{ order.driver?.phone }}</p>
          </div>
          <button 
            @click="contactDriver"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Bog'lanish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { getOrder } = useApi()

const order = ref({})
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const orderId = route.params.id
  console.log('Order ID from route:', orderId)
  
  if (!orderId || orderId === 'undefined') {
    error.value = 'Buyurtma ID si topilmadi'
    loading.value = false
    return
  }
  
  await loadOrder(orderId)
})

const loadOrder = async (orderId) => {
  loading.value = true
  error.value = null
  try {
    console.log('Loading order with ID:', orderId)
    const orderData = await getOrder(orderId)
    console.log('Order data received:', orderData)
    
    if (!orderData || !orderData._id) {
      throw new Error('Buyurtma ma\'lumotlari topilmadi')
    }
    
    order.value = orderData
  } catch (err) {
    console.error('Error loading order:', err)
    error.value = err.message || 'Buyurtma ma\'lumotlarini yuklashda xatolik'
  } finally {
    loading.value = false
  }
}

const contactDriver = () => {
  if (order.value.driver?.phone) {
    alert(`📞 Haydovchi telefoni: ${order.value.driver.phone}`)
  } else {
    alert('Haydovchi telefon raqami mavjud emas')
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusText = computed(() => {
  const statuses = {
    pending: '⏳ Kutilmoqda',
    accepted: '✅ Qabul qilingan',
    completed: '🎉 Bajarilgan',
    cancelled: '❌ Bekor qilingan',
    negotiation: '💬 Muzokarada'
  }
  return statuses[order.value.status] || order.value.status
})

const statusClass = computed(() => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    negotiation: 'bg-purple-100 text-purple-800'
  }
  return classes[order.value.status] || 'bg-gray-100 text-gray-800'
})
</script>