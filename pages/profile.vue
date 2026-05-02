<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Mening profilim</h1>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Sidebar / Avatar section -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-2xl shadow-md p-6 text-center sticky top-24">
          <!-- Avatar -->
          <div class="relative inline-block">
            <div class="w-32 h-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-5xl font-bold">{{ userData.name?.charAt(0).toUpperCase() || 'U' }}</span>
            </div>
            <button 
              @click="changeAvatar"
              class="absolute bottom-2 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-lg"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
          </div>
          
          <h2 class="text-xl font-bold text-gray-800">{{ userData.name }}</h2>
          <p class="text-gray-500 text-sm mb-2">{{ userData.email }}</p>
          <span :class="userData.role === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'" 
                class="inline-block px-3 py-1 rounded-full text-xs font-semibold">
            {{ userData.role === 'client' ? 'Mijoz' : 'Haydovchi' }}
          </span>
          
          <div class="mt-6 pt-6 border-t">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-500">Telefon:</span>
              <span class="font-medium">{{ userData.phone || '+998 __ ___ __ __' }}</span>
            </div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-500">Ro'yxatdan o'tgan:</span>
              <span class="font-medium">{{ formatDate(userData.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="md:col-span-2">
        <!-- Tabs -->
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div class="flex border-b">
            <button 
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex-1 px-6 py-4 text-center font-medium transition"
              :class="activeTab === tab.id 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'"
            >
              <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="tab.id === 'info'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                <path v-if="tab.id === 'orders'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                <path v-if="tab.id === 'security'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              {{ tab.name }}
            </button>
          </div>
          
          <div class="p-6">
            <!-- Personal Info Tab -->
            <div v-if="activeTab === 'info'">
              <form @submit.prevent="updateProfile" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-gray-700 font-medium mb-2">To'liq ism</label>
                    <input 
                      v-model="profileForm.name" 
                      type="text" 
                      required
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-2">Email</label>
                    <input 
                      v-model="profileForm.email" 
                      type="email" 
                      required
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-2">Telefon raqam</label>
                    <input 
                      v-model="profileForm.phone" 
                      type="tel" 
                      placeholder="+998 90 123 45 67"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-2">Rol</label>
                    <select 
                      v-model="profileForm.role" 
                      disabled
                      class="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 cursor-not-allowed"
                    >
                      <option value="client">Mijoz</option>
                      <option value="driver">Haydovchi</option>
                    </select>
                  </div>
                </div>
                
                <!-- Driver specific fields -->
                <div v-if="userData.role === 'driver'" class="border-t pt-6">
                  <h3 class="text-lg font-semibold mb-4">Haydovchi ma'lumotlari</h3>
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-gray-700 font-medium mb-2">Mashina turi</label>
                      <select v-model="profileForm.carType" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Tanlang</option>
                        <option value="Gazel">Gazel</option>
                        <option value="Man">Man</option>
                        <option value="Kamaz">Kamaz</option>
                        <option value="Damas">Damas</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-gray-700 font-medium mb-2">Mashina raqami</label>
                      <input v-model="profileForm.carNumber" type="text" placeholder="01A777AA" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                      <label class="block text-gray-700 font-medium mb-2">1 km narxi (so'm)</label>
                      <input v-model="profileForm.pricePerKm" type="number" placeholder="5000" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-end">
                  <button 
                    type="submit" 
                    :disabled="updating"
                    class="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
                  >
                    {{ updating ? 'Saqlanmoqda...' : 'Saqlash' }}
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Orders Tab -->
            <div v-if="activeTab === 'orders'">
              <div v-if="loadingOrders" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <div v-else-if="userOrders.length === 0" class="text-center py-12">
                <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <p class="text-gray-500">Sizning buyurtmalaringiz yo'q</p>
                <NuxtLink to="/create-order" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
                  Birinchi buyurtmani yaratish →
                </NuxtLink>
              </div>
              <div v-else class="space-y-4">
                <OrderCard 
                  v-for="order in userOrders" 
                  :key="order.id" 
                  :order="order"
                  @view="viewOrder"
                />
              </div>
            </div>
            
            <!-- Security Tab -->
            <div v-if="activeTab === 'security'">
              <form @submit.prevent="changePassword" class="space-y-6">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Joriy parol</label>
                  <input 
                    v-model="passwordForm.currentPassword" 
                    type="password" 
                    required
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Yangi parol</label>
                  <input 
                    v-model="passwordForm.newPassword" 
                    type="password" 
                    required
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Yangi parolni takrorlang</label>
                  <input 
                    v-model="passwordForm.confirmPassword" 
                    type="password" 
                    required
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div class="flex justify-end">
                  <button 
                    type="submit" 
                    :disabled="changingPassword"
                    class="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
                  >
                    {{ changingPassword ? 'O\'zgartirilmoqda...' : 'Parolni o\'zgartirish' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import OrderCard from '~/components/OrderCard.vue'

const { getOrders, updateOrder } = useApi()
const router = useRouter()

// User data
const userData = ref({})
const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  role: 'client',
  carType: '',
  carNumber: '',
  pricePerKm: ''
})

// State
const activeTab = ref('info')
const updating = ref(false)
const loadingOrders = ref(false)
const changingPassword = ref(false)
const userOrders = ref([])

// Password form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Tabs
const tabs = [
  { id: 'info', name: 'Shaxsiy ma\'lumotlar' },
  { id: 'orders', name: 'Mening buyurtmalarim' },
  { id: 'security', name: 'Xavfsizlik' }
]

// Load user data
onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    userData.value = JSON.parse(user)
    profileForm.value = {
      name: userData.value.name || '',
      email: userData.value.email || '',
      phone: userData.value.phone || '',
      role: userData.value.role || 'client',
      carType: userData.value.carType || '',
      carNumber: userData.value.carNumber || '',
      pricePerKm: userData.value.pricePerKm || ''
    }
  } else {
    router.push('/login')
  }
})

// Load orders when tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'orders') {
    loadUserOrders()
  }
})

const loadUserOrders = async () => {
  loadingOrders.value = true
  try {
    const orders = await getOrders()
    userOrders.value = orders.filter(order => order.userId === userData.value.id)
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    loadingOrders.value = false
  }
}

const updateProfile = async () => {
  updating.value = true
  try {
    // Update local storage
    const updatedUser = { ...userData.value, ...profileForm.value }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    userData.value = updatedUser
    
    // Show success message
    alert('Ma\'lumotlar muvaffaqiyatli yangilandi!')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
  } finally {
    updating.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Yangi parollar mos kelmadi!')
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    alert('Parol kamida 6 belgidan iborat bo\'lishi kerak!')
    return
  }
  
  changingPassword.value = true
  try {
    // Here you would call API to change password
    // For now, just show success
    alert('Parol muvaffaqiyatli o\'zgartirildi!')
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    console.error('Error changing password:', error)
    alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
  } finally {
    changingPassword.value = false
  }
}

const changeAvatar = () => {
  alert('Rasm o\'zgartirish funksiyasi keyingi versiyada qo\'shiladi!')
}

const viewOrder = (id) => {
  router.push(`/orders/${id}`)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}
</script>