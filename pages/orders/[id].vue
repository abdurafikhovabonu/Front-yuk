<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center mb-6">
      <NuxtLink to="/orders" class="text-blue-600 hover:text-blue-800 mr-4">
        ← Orqaga
      </NuxtLink>
      <h1 class="text-3xl font-bold">Buyurtma #{{ order.id }}</h1>
    </div>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="!order.id" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-gray-500">Buyurtma topilmadi</p>
      <NuxtLink to="/orders" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Buyurtmalar sahifasiga o'tish →
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-6">
      <!-- Status card -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Buyurtma holati</h2>
          <span :class="statusClass" class="px-4 py-2 rounded-full text-sm font-semibold">
            {{ statusText }}
          </span>
        </div>
        
        <div class="relative">
          <div class="flex justify-between">
            <div class="text-center">
              <div :class="step1Class" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p class="text-sm">Yaratilgan</p>
            </div>
            <div class="text-center">
              <div :class="step2Class" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
              <p class="text-sm">Haydovchi topildi</p>
            </div>
            <div class="text-center">
              <div :class="step3Class" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p class="text-sm">Yetkazilmoqda</p>
            </div>
            <div class="text-center">
              <div :class="step4Class" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p class="text-sm">Bajarilgan</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Order details -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Buyurtma ma'lumotlari</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <p class="text-gray-500 text-sm">Qayerdan</p>
            <p class="font-semibold text-lg">{{ order.from }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Qayerga</p>
            <p class="font-semibold text-lg">{{ order.to }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Yuk turi</p>
            <p class="font-semibold">{{ order.cargo }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Og'irligi</p>
            <p class="font-semibold">{{ order.weight }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Narx</p>
            <p class="font-bold text-2xl text-blue-600">{{ formatPrice(order.price) }} so'm</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Yaratilgan sana</p>
            <p class="font-semibold">{{ formatDate(order.createdAt) }}</p>
          </div>
        </div>
        
        <div v-if="order.description" class="mt-4 pt-4 border-t">
          <p class="text-gray-500 text-sm">Qo'shimcha ma'lumot</p>
          <p class="mt-1">{{ order.description }}</p>
        </div>
      </div>
      
      <!-- Driver info (if assigned) -->
      <div v-if="order.driverId" class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Haydovchi ma'lumotlari</h2>
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
      
      <!-- Actions -->
      <div class="flex space-x-3">
        <button 
          v-if="order.status === 'pending'"
          @click="cancelOrder"
          class="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
        >
          Buyurtmani bekor qilish
        </button>
        <button 
          v-if="order.status === 'accepted'"
          @click="completeOrder"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Yetkazib berildi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { getOrder, updateOrder } = useApi()

const order = ref({})
const loading = ref(true)
const currentUser = ref(null)

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    currentUser.value = JSON.parse(userData)
  }
  loadOrder()
})

const loadOrder = async () => {
  loading.value = true
  try {
    order.value = await getOrder(route.params.id)
  } catch (error) {
    console.error('Error loading order:', error)
    order.value = {}
  } finally {
    loading.value = false
  }
}

const cancelOrder = async () => {
  if (confirm('Buyurtmani bekor qilmoqchimisiz?')) {
    try {
      await updateOrder(route.params.id, { status: 'cancelled' })
      await loadOrder()
    } catch (error) {
      console.error('Error cancelling order:', error)
      alert('Xatolik yuz berdi')
    }
  }
}

const completeOrder = async () => {
  if (confirm('Yuk yetkazib berildimi?')) {
    try {
      await updateOrder(route.params.id, { status: 'completed' })
      await loadOrder()
    } catch (error) {
      console.error('Error completing order:', error)
      alert('Xatolik yuz berdi')
    }
  }
}

const contactDriver = () => {
  if (order.value.driver?.phone) {
    alert(`📞 Haydovchi telefoni: ${order.value.driver.phone}`)
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
    day: 'numeric'
  })
}

const statusText = computed(() => {
  const statuses = {
    pending: 'Kutilmoqda',
    accepted: 'Qabul qilingan',
    completed: 'Bajarilgan',
    cancelled: 'Bekor qilingan',
    negotiation: 'Muzokarada'
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

// Step classes for progress bar
const step1Class = computed(() => {
  return order.value.id ? 'bg-green-500 text-white' : 'bg-gray-200'
})

const step2Class = computed(() => {
  if (order.value.status === 'accepted' || order.value.status === 'completed') {
    return 'bg-green-500 text-white'
  }
  return 'bg-gray-200'
})

const step3Class = computed(() => {
  if (order.value.status === 'completed') {
    return 'bg-green-500 text-white'
  }
  return 'bg-gray-200'
})

const step4Class = computed(() => {
  if (order.value.status === 'completed') {
    return 'bg-green-500 text-white'
  }
  return 'bg-gray-200'
})
</script>