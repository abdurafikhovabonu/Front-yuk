<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Haydovchilar</h1>
    
    <!-- Filters -->
    <div class="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div class="grid md:grid-cols-4 gap-4">
        <input 
          v-model="filters.search" 
          type="text" 
          placeholder="Haydovchi nomi yoki mashina raqami..."
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select v-model="filters.carType" class="border border-gray-300 rounded-lg px-4 py-2">
          <option value="">Barcha mashina turlari</option>
          <option value="Gazel">Gazel</option>
          <option value="Man">Man</option>
          <option value="Kamaz">Kamaz</option>
          <option value="Damas">Damas</option>
          <option value="Cargo">Cargo</option>
        </select>
        <select v-model="filters.minRating" class="border border-gray-300 rounded-lg px-4 py-2">
          <option value="">Barcha reytinglar</option>
          <option value="4">4+ yulduz</option>
          <option value="4.5">4.5+ yulduz</option>
          <option value="5">5 yulduz</option>
        </select>
        <button 
          @click="applyFilters"
          class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg py-2 hover:shadow-lg transition"
        >
          Filtr
        </button>
      </div>
    </div>
    
    <!-- Drivers List -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Haydovchilar yuklanmoqda...</p>
    </div>
    
    <div v-else-if="filteredDrivers.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
      <p class="text-gray-500">Haydovchilar topilmadi</p>
      <button @click="clearFilters" class="mt-4 text-blue-600 hover:text-blue-800">
        Filtrlarni tozalash →
      </button>
    </div>
    
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="driver in filteredDrivers" 
        :key="driver.id" 
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        <!-- Car Image / Icon -->
        <div class="relative h-40 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
          <svg class="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
          <!-- Available Badge -->
          <div class="absolute top-4 right-4">
            <span :class="driver.available ? 'bg-green-500' : 'bg-red-500'" 
                  class="px-2 py-1 rounded-full text-xs font-semibold text-white">
              {{ driver.available ? 'Mavjud' : 'Band' }}
            </span>
          </div>
          <!-- Rating Badge -->
          <div class="absolute top-4 left-4 bg-yellow-400 rounded-full px-2 py-1 text-sm font-semibold">
            ★ {{ driver.rating || 4.5 }}
          </div>
        </div>
        
        <div class="p-6">
          <!-- Driver Info -->
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-xl font-bold text-gray-800">{{ driver.name }}</h3>
              <p class="text-gray-500 text-sm">{{ driver.phone }}</p>
            </div>
          </div>
          
          <!-- Car Info -->
          <div class="bg-gray-50 rounded-lg p-3 mb-4">
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span class="text-gray-500">Mashina:</span>
                <p class="font-semibold">{{ driver.carType || 'Aniqlanmagan' }}</p>
              </div>
              <div>
                <span class="text-gray-500">Raqam:</span>
                <p class="font-semibold">{{ driver.carNumber || 'Aniqlanmagan' }}</p>
              </div>
              <div>
                <span class="text-gray-500">1 km narxi:</span>
                <p class="font-semibold text-blue-600">{{ formatPrice(driver.pricePerKm) }} so'm</p>
              </div>
              <div>
                <span class="text-gray-500">Yuk tashigan:</span>
                <p class="font-semibold">{{ driver.totalTrips || 0 }} marta</p>
              </div>
            </div>
          </div>
          
          <!-- Stats -->
          <div class="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ driver.completionRate || 98 }}% bajarish
            </span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ driver.experience || 2 }} yil tajriba
            </span>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button 
              @click="openContactModal(driver)"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105"
            >
              📞 Bog'lanish
            </button>
            <button 
              v-if="userRole === 'client'"
              @click="openOrderModal(driver)"
              class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition transform hover:scale-105"
            >
              📦 Yuk topsh
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contact Modal -->
    <Modal ref="contactModal">
      <template #title>
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Haydovchi bilan bog'lanish
        </div>
      </template>
      <template #body>
        <div class="text-center">
          <div class="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-3xl font-bold">{{ selectedDriver?.name?.charAt(0) }}</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ selectedDriver?.name }}</h3>
          
          <div class="space-y-3 mt-6 text-left">
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div>
                <p class="text-xs text-gray-500">Telefon</p>
                <p class="font-semibold">{{ selectedDriver?.phone }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <p class="text-xs text-gray-500">Email</p>
                <p class="font-semibold">{{ selectedDriver?.email || 'mavjud emas' }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              <div>
                <p class="text-xs text-gray-500">Mashina</p>
                <p class="font-semibold">{{ selectedDriver?.carType }} ({{ selectedDriver?.carNumber }})</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6 p-3 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-800">
              <span class="font-semibold">💡 Eslatma:</span> Haydovchi bilan bog'lanib, yuk tashish haqida kelishib oling.
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="closeContactModal" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          Yopish
        </button>
        <button @click="callDriver" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          📞 Qo'ng'iroq qilish
        </button>
      </template>
    </Modal>
    
    <!-- Order Modal -->
    <Modal ref="orderModal" @confirm="confirmOrder">
      <template #title>
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          Yuk topshirish
        </div>
      </template>
      <template #body>
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-800 mb-2">{{ selectedDriver?.name }} ga yuk topshirmoqchimisiz?</p>
          <p class="text-sm text-gray-500">Bu haydovchi {{ selectedDriver?.carType }} mashinasida yuk tashish xizmatini ko'rsatadi.</p>
          
          <div class="mt-4 p-3 bg-gray-50 rounded-lg text-left">
            <div class="flex justify-between mb-2">
              <span class="text-gray-500">1 km narxi:</span>
              <span class="font-semibold text-blue-600">{{ formatPrice(selectedDriver?.pricePerKm) }} so'm</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Reyting:</span>
              <span class="font-semibold">★ {{ selectedDriver?.rating || 4.5 }}</span>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="closeOrderModal" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          Bekor qilish
        </button>
        <button @click="confirmOrder" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Yuk topshirish
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
const { getDrivers } = useApi()
const router = useRouter()

const drivers = ref([])
const loading = ref(true)
const userRole = ref(null)
const selectedDriver = ref(null)

// Modal refs
const contactModal = ref(null)
const orderModal = ref(null)

const filters = ref({
  search: '',
  carType: '',
  minRating: ''
})

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    userRole.value = JSON.parse(user).role
  }
  loadDrivers()
})

const loadDrivers = async () => {
  loading.value = true
  try {
    drivers.value = await getDrivers()
    console.log('Drivers loaded:', drivers.value)
  } catch (error) {
    console.error('Error loading drivers:', error)
    const toast = useToast()
    toast.error('Haydovchilarni yuklashda xatolik')
  } finally {
    loading.value = false
  }
}

const filteredDrivers = computed(() => {
  let result = drivers.value
  
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    result = result.filter(driver => 
      driver.name?.toLowerCase().includes(searchLower) ||
      driver.carNumber?.toLowerCase().includes(searchLower)
    )
  }
  
  if (filters.value.carType) {
    result = result.filter(driver => driver.carType === filters.value.carType)
  }
  
  if (filters.value.minRating) {
    result = result.filter(driver => (driver.rating || 0) >= parseFloat(filters.value.minRating))
  }
  
  return result
})

const applyFilters = () => {
  // Filter is reactive, no need to do anything
  const toast = useToast()
  toast.info(`🔍 ${filteredDrivers.value.length} ta haydovchi topildi`)
}

const clearFilters = () => {
  filters.value = {
    search: '',
    carType: '',
    minRating: ''
  }
}

// Contact modal functions
const openContactModal = (driver) => {
  selectedDriver.value = driver
  contactModal.value?.open()
}

const closeContactModal = () => {
  contactModal.value?.close()
  selectedDriver.value = null
}

const callDriver = () => {
  if (selectedDriver.value?.phone) {
    window.location.href = `tel:${selectedDriver.value.phone}`
  }
  closeContactModal()
}

// Order modal functions
const openOrderModal = (driver) => {
  selectedDriver.value = driver
  orderModal.value?.open()
}

const closeOrderModal = () => {
  orderModal.value?.close()
  selectedDriver.value = null
}

const confirmOrder = () => {
  const toast = useToast()
  toast.success(`Yuk topshirish formasi ochilmoqda...`)
  closeOrderModal()
  router.push(`/create-order?driverId=${selectedDriver.value?.id}`)
}

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
}
</script>