<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center mb-6">
      <NuxtLink to="/orders" class="text-blue-600 hover:text-blue-800 mr-4 transition flex items-center">
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Orqaga
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-800">Buyurtma #{{ order.id }}</h1>
    </div>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Ma'lumotlar yuklanmoqda...</p>
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
      <!-- Status card with progress -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">📋 Buyurtma holati</h2>
          <span :class="statusClass" class="px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
            {{ statusText }}
          </span>
        </div>
        
        <!-- Progress Steps -->
        <div class="relative">
          <div class="flex justify-between">
            <div v-for="(step, index) in steps" :key="index" class="text-center flex-1">
              <div :class="getStepClass(index)" 
                   class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300">
                <svg v-if="getStepStatus(index)" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span v-else class="text-sm">{{ index + 1 }}</span>
              </div>
              <p class="text-xs md:text-sm font-medium" :class="getStepClass(index) === 'bg-green-500 text-white' ? 'text-green-600' : 'text-gray-500'">
                {{ step.name }}
              </p>
              <p class="text-xs text-gray-400 hidden md:block">{{ step.desc }}</p>
            </div>
          </div>
          <!-- Progress line -->
          <div class="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10">
            <div class="h-full bg-green-500 transition-all duration-500" :style="{ width: progressWidth }"></div>
          </div>
        </div>
      </div>
      
      <!-- Order details -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">📦 Buyurtma ma'lumotlari</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm mb-1">📍 Qayerdan</p>
            <p class="font-semibold text-lg">{{ order.from || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm mb-1">📍 Qayerga</p>
            <p class="font-semibold text-lg">{{ order.to || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm mb-1">📦 Yuk turi</p>
            <p class="font-semibold">{{ order.cargo || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm mb-1">⚖️ Og'irligi</p>
            <p class="font-semibold">{{ order.weight || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm mb-1">💰 Narx</p>
            <p class="font-bold text-2xl text-blue-600">{{ formatPrice(order.price) }} so'm</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-gray-500 text-sm mb-1">📅 Yaratilgan sana</p>
            <p class="font-semibold">{{ formatDate(order.createdAt) }}</p>
          </div>
        </div>
        
        <div v-if="order.description" class="mt-4 pt-4 border-t">
          <p class="text-gray-500 text-sm mb-1">📝 Qo'shimcha ma'lumot</p>
          <p class="mt-1 text-gray-700">{{ order.description }}</p>
        </div>
      </div>
      
      <!-- Driver info (if assigned) -->
      <div v-if="order.driverId || order.driver" class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-200">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">🚚 Haydovchi ma'lumotlari</h2>
        
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <!-- Driver Avatar -->
          <div class="w-24 h-24 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {{ getDriverInitial() }}
          </div>
          
          <!-- Driver Details -->
          <div class="flex-1 space-y-3">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-500 text-sm">👤 Ism</p>
                <p class="font-semibold text-lg">{{ getDriverName() }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">⭐ Reyting</p>
                <div class="flex items-center">
                  <span class="text-yellow-500 text-lg">★</span>
                  <span class="font-semibold ml-1">{{ getDriverRating() }}</span>
                  <span class="text-gray-400 text-sm ml-1">({{ getDriverTrips() }} ta yuk)</span>
                </div>
              </div>
              <div>
                <p class="text-gray-500 text-sm">🚗 Mashina</p>
                <p class="font-semibold">{{ getCarInfo() }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">📞 Telefon</p>
                <p class="font-semibold">{{ getDriverPhone() }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">💰 1 km narxi</p>
                <p class="font-semibold text-green-600">{{ formatPrice(getDriverPrice()) }} so'm</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">📧 Email</p>
                <p class="font-semibold">{{ getDriverEmail() }}</p>
              </div>
            </div>
          </div>
          
          <!-- Contact Button -->
          <button 
            @click="contactDriver"
            class="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            Bog'lanish
          </button>
        </div>
      </div>
      
      <!-- Fallback: Driver ID only -->
      <div v-else-if="order.driverId && !order.driver" class="bg-yellow-50 rounded-2xl shadow-md p-6 border border-yellow-200">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div>
            <p class="font-semibold">Haydovchi ID: {{ order.driverId }}</p>
            <p class="text-sm text-gray-500">Haydovchi ma'lumotlari yuklanmoqda. Qaytadan urinib ko'ring.</p>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex flex-wrap gap-3 pt-4">
        <button 
          v-if="order.status === 'pending'"
          @click="openCancelModal"
          class="px-6 py-2 border border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition"
        >
          ⛔ Buyurtmani bekor qilish
        </button>
        <button 
          v-if="order.status === 'accepted'"
          @click="openCompleteModal"
          class="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition transform hover:scale-105"
        >
          ✅ Yetkazib berildi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { getOrder, updateOrder } = useApi()
const toast = useToast()

const order = ref({})
const loading = ref(true)

const steps = [
  { name: 'Yaratilgan', desc: 'Buyurtma qabul qilindi' },
  { name: 'Haydovchi topildi', desc: 'Taklif qabul qilindi' },
  { name: 'Yetkazilmoqda', desc: 'Yo\'lda' },
  { name: 'Bajarilgan', desc: 'Manzilga yetkazildi' }
]

onMounted(() => {
  loadOrder()
})

const loadOrder = async () => {
  loading.value = true
  try {
    const orderData = await getOrder(route.params.id)
    console.log('Order loaded:', orderData)
    order.value = orderData
  } catch (error) {
    console.error('Error loading order:', error)
    toast.error('Buyurtma ma\'lumotlarini yuklashda xatolik')
    order.value = {}
  } finally {
    loading.value = false
  }
}

// Helper functions for driver info
const getDriverInitial = () => {
  if (order.value.driver?.name) {
    return order.value.driver.name.charAt(0).toUpperCase()
  }
  if (order.value.driverName) {
    return order.value.driverName.charAt(0).toUpperCase()
  }
  return 'H'
}

const getDriverName = () => {
  return order.value.driver?.name || order.value.driverName || 'Haydovchi'
}

const getDriverRating = () => {
  return order.value.driver?.rating || order.value.driverRating || '4.5'
}

const getDriverTrips = () => {
  return order.value.driver?.totalTrips || order.value.totalTrips || '0'
}

const getCarInfo = () => {
  const carType = order.value.driver?.carType || order.value.carType || '—'
  const carNumber = order.value.driver?.carNumber || order.value.carNumber || ''
  return carNumber ? `${carType} • ${carNumber}` : carType
}

const getDriverPhone = () => {
  return order.value.driver?.phone || order.value.driverPhone || '+998 __ ___ __ __'
}

const getDriverPrice = () => {
  return order.value.driver?.pricePerKm || order.value.pricePerKm || 0
}

const getDriverEmail = () => {
  return order.value.driver?.email || order.value.driverEmail || 'mavjud emas'
}

const getStepStatus = (index) => {
  const status = order.value.status
  if (index === 0) return true
  if (index === 1) return status === 'accepted' || status === 'completed'
  if (index === 2) return status === 'completed'
  if (index === 3) return status === 'completed'
  return false
}

const getStepClass = (index) => {
  if (getStepStatus(index)) {
    return 'bg-green-500 text-white'
  }
  return 'bg-gray-200 text-gray-500'
}

const progressWidth = computed(() => {
  const status = order.value.status
  if (status === 'pending') return '0%'
  if (status === 'negotiation') return '15%'
  if (status === 'accepted') return '50%'
  if (status === 'completed') return '100%'
  return '0%'
})

const cancelOrder = async () => {
  try {
    await updateOrder(route.params.id, { status: 'cancelled' })
    toast.success('Buyurtma bekor qilindi')
    await loadOrder()
  } catch (error) {
    console.error('Error cancelling order:', error)
    toast.error('Xatolik yuz berdi')
  }
}

const completeOrder = async () => {
  try {
    await updateOrder(route.params.id, { status: 'completed' })
    toast.success('Yuk yetkazib berildi! Rahmat!')
    await loadOrder()
  } catch (error) {
    console.error('Error completing order:', error)
    toast.error('Xatolik yuz berdi')
  }
}

const openCancelModal = () => {
  if (confirm('⚠️ Buyurtmani bekor qilmoqchimisiz?\n\nBu amalni qaytarib bo\'lmaydi!')) {
    cancelOrder()
  }
}

const openCompleteModal = () => {
  if (confirm('✅ Yuk yetkazib berildimi?\n\nTasdiqlasangiz, buyurtma yopiladi.')) {
    completeOrder()
  }
}

const contactDriver = () => {
  const phone = order.value.driver?.phone || order.value.driverPhone
  if (phone && phone !== '+998 __ ___ __ __') {
    if (confirm(`📞 Haydovchiga qo'ng'iroq qilmoqchimisiz?\n\nTelefon: ${phone}`)) {
      window.location.href = `tel:${phone}`
    }
  } else {
    toast.warning('Haydovchi telefon raqami mavjud emas')
  }
}

const formatPrice = (price) => {
  if (!price) return '0'
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