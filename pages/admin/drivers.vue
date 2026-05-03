<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white fixed">
        <div class="p-6">
          <div class="flex items-center space-x-2 mb-8">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold">Admin Panel</span>
          </div>
          
          <nav class="space-y-2">
            <NuxtLink to="/admin" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Dashboard</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/users" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span>Foydalanuvchilar</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/orders" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              <span>Buyurtmalar</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/drivers" class="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              <span>Haydovchilar</span>
            </NuxtLink>
          </nav>
        </div>
      </aside>
      
      <!-- Main Content -->
      <main class="ml-64 flex-1 p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Haydovchilar</h1>
            <p class="text-gray-500 mt-1">Tizimdagi barcha haydovchilarni boshqaring</p>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="grid md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">Jami haydovchilar</p>
            <p class="text-2xl font-bold text-gray-800">{{ drivers.length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">Mavjud haydovchilar</p>
            <p class="text-2xl font-bold text-green-600">{{ drivers.filter(d => d.available).length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">Band haydovchilar</p>
            <p class="text-2xl font-bold text-red-600">{{ drivers.filter(d => !d.available).length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">O'rtacha reyting</p>
            <p class="text-2xl font-bold text-yellow-600">{{ avgRating }} ★</p>
          </div>
        </div>
        
        <!-- Filters -->
        <div class="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div class="flex flex-wrap gap-4">
            <input 
              v-model="search" 
              type="text" 
              placeholder="Ism yoki mashina raqami bo'yicha qidirish..." 
              class="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select v-model="carTypeFilter" class="border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Barcha mashina turlari</option>
              <option value="Gazel">Gazel</option>
              <option value="Man">Man</option>
              <option value="Kamaz">Kamaz</option>
              <option value="Damas">Damas</option>
            </select>
            <select v-model="availableFilter" class="border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Barcha holatlar</option>
              <option value="true">Mavjud</option>
              <option value="false">Band</option>
            </select>
            <button @click="clearFilters" class="px-4 py-2 text-gray-600 hover:text-gray-800">
              Tozalash
            </button>
          </div>
        </div>
        
        <!-- Drivers Table -->
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          
          <div v-else-if="filteredDrivers.length === 0" class="text-center py-12">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            <p class="text-gray-500">Haydovchilar topilmadi</p>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Haydovchi</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Telefon</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mashina</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">1 km narxi</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Reyting</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Holat</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Harakatlar</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="driver in filteredDrivers" :key="driver.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm text-gray-500">#{{ driver.id }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center text-white font-bold">
                        {{ driver.name?.charAt(0).toUpperCase() || 'D' }}
                      </div>
                      <div>
                        <p class="font-medium text-gray-800">{{ driver.name }}</p>
                        <p class="text-xs text-gray-500">{{ driver.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ driver.phone }}</td>
                  <td class="px-6 py-4">
                    <div class="text-sm">
                      <p class="font-medium">{{ driver.carType || '—' }}</p>
                      <p class="text-xs text-gray-500">{{ driver.carNumber || '—' }}</p>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm font-semibold text-blue-600">{{ formatPrice(driver.pricePerKm) }} so'm/km</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <span class="text-yellow-500 mr-1">★</span>
                      <span class="text-sm font-medium">{{ driver.rating || 0 }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <select 
                      :value="driver.available"
                      @change="changeStatus(driver.id, $event.target.value === 'true')"
                      :class="driver.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      class="px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer"
                    >
                      <option value="true" class="bg-green-100 text-green-800">Mavjud</option>
                      <option value="false" class="bg-red-100 text-red-800">Band</option>
                    </select>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex space-x-2">
                      <button @click="editDriver(driver)" class="text-blue-600 hover:text-blue-800 p-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button @click="deleteDriver(driver.id)" class="text-red-600 hover:text-red-800 p-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const api = useApi()

const drivers = ref([])
const loading = ref(true)
const search = ref('')
const carTypeFilter = ref('')
const availableFilter = ref('')

const avgRating = computed(() => {
  if (drivers.value.length === 0) return 0
  const sum = drivers.value.reduce((acc, d) => acc + (d.rating || 0), 0)
  return (sum / drivers.value.length).toFixed(1)
})

const filteredDrivers = computed(() => {
  let result = drivers.value
  
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(d => 
      d.name?.toLowerCase().includes(searchLower) ||
      d.carNumber?.toLowerCase().includes(searchLower)
    )
  }
  
  if (carTypeFilter.value) {
    result = result.filter(d => d.carType === carTypeFilter.value)
  }
  
  if (availableFilter.value !== '') {
    result = result.filter(d => d.available === (availableFilter.value === 'true'))
  }
  
  return result
})

onMounted(() => {
  loadDrivers()
})

const loadDrivers = async () => {
  loading.value = true
  try {
    drivers.value = await api.getDrivers()
  } catch (error) {
    console.error('Error loading drivers:', error)
  } finally {
    loading.value = false
  }
}

const changeStatus = async (id, available) => {
  try {
    await api.updateDriver(id, { available })
    await loadDrivers()
    alert('Haydovchi holati o\'zgartirildi')
  } catch (error) {
    console.error('Error changing status:', error)
    alert('Xatolik yuz berdi: ' + error.message)
  }
}

const editDriver = (driver) => {
  alert(`Tahrirlash funksiyasi tayyorlanmoqda: ${driver.name}`)
}

const deleteDriver = async (id) => {
  if (confirm('Haydovchini o\'chirmoqchimisiz?')) {
    try {
      await api.deleteDriver(id)
      await loadDrivers()
      alert('Haydovchi o\'chirildi')
    } catch (error) {
      console.error('Error deleting driver:', error)
      alert('Xatolik yuz berdi: ' + error.message)
    }
  }
}

const clearFilters = () => {
  search.value = ''
  carTypeFilter.value = ''
  availableFilter.value = ''
}

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
}
</script>