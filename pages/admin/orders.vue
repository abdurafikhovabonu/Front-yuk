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
            
            <NuxtLink to="/admin/orders" class="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              <span>Buyurtmalar</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/drivers" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
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
            <h1 class="text-3xl font-bold text-gray-800">Buyurtmalar</h1>
            <p class="text-gray-500 mt-1">Tizimdagi barcha buyurtmalarni boshqaring</p>
          </div>
          <button @click="showCreateModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Yangi buyurtma
          </button>
        </div>
        
        <!-- Stats -->
        <div class="grid md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">Jami buyurtmalar</p>
            <p class="text-2xl font-bold text-gray-800">{{ orders.length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">Kutilmoqda</p>
            <p class="text-2xl font-bold text-yellow-600">{{ orders.filter(o => o.status === 'pending').length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">Bajarilgan</p>
            <p class="text-2xl font-bold text-green-600">{{ orders.filter(o => o.status === 'completed').length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4">
            <p class="text-gray-500 text-sm">Umumiy tushum</p>
            <p class="text-2xl font-bold text-blue-600">{{ formatPrice(totalRevenue) }}</p>
          </div>
        </div>
        
        <!-- Filters -->
        <div class="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div class="flex flex-wrap gap-4">
            <input 
              v-model="search" 
              type="text" 
              placeholder="ID, yo'nalish yoki yuk bo'yicha qidirish..." 
              class="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select v-model="statusFilter" class="border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Barcha holatlar</option>
              <option value="pending">Kutilmoqda</option>
              <option value="negotiation">Muzokarada</option>
              <option value="accepted">Qabul qilingan</option>
              <option value="completed">Bajarilgan</option>
              <option value="cancelled">Bekor qilingan</option>
            </select>
            <button @click="clearFilters" class="px-4 py-2 text-gray-600 hover:text-gray-800">
              Tozalash
            </button>
          </div>
        </div>
        
        <!-- Orders Table -->
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          
          <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <p class="text-gray-500">Buyurtmalar topilmadi</p>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mijoz</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Yo'nalish</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Yuk</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Narx</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Haydovchi</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Holat</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Sana</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Harakatlar</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm text-gray-500">#{{ order.id }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {{ order.client?.name?.charAt(0) || '?' }}
                      </div>
                      <div>
                        <p class="text-sm font-medium">{{ order.client?.name || 'Noma\'lum' }}</p>
                        <p class="text-xs text-gray-500">{{ order.client?.phone || '' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    {{ order.from }} → {{ order.to }}
                  </td>
                  <td class="px-6 py-4 text-sm">{{ order.cargo }} ({{ order.weight }})</td>
                  <td class="px-6 py-4 text-sm font-semibold text-blue-600">{{ formatPrice(order.price) }}</td>
                  <td class="px-6 py-4">
                    <div v-if="order.driverId" class="flex items-center space-x-2">
                      <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">
                        {{ order.driver?.name?.charAt(0) || 'D' }}
                      </div>
                      <span class="text-sm">{{ order.driver?.name || 'Haydovchi' }}</span>
                    </div>
                    <span v-else class="text-sm text-gray-400">—</span>
                  </td>
                  <td class="px-6 py-4">
                    <select 
                      :value="order.status"
                      @change="changeStatus(order.id, $event.target.value)"
                      :class="getStatusClass(order.status)"
                      class="px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer"
                    >
                      <option value="pending" :class="getStatusClass('pending')">Kutilmoqda</option>
                      <option value="negotiation" :class="getStatusClass('negotiation')">Muzokarada</option>
                      <option value="accepted" :class="getStatusClass('accepted')">Qabul qilingan</option>
                      <option value="completed" :class="getStatusClass('completed')">Bajarilgan</option>
                      <option value="cancelled" :class="getStatusClass('cancelled')">Bekor qilingan</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(order.createdAt) }}</td>
                  <td class="px-6 py-4">
                    <div class="flex space-x-2">
                      <button @click="viewOrder(order)" class="text-blue-600 hover:text-blue-800 p-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button @click="deleteOrder(order.id)" class="text-red-600 hover:text-red-800 p-1">
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
    
    <!-- Create Order Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Yangi buyurtma</h2>
            <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="createOrder">
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-gray-700 text-sm mb-1">Qayerdan *</label>
                <input v-model="newOrder.from" type="text" required class="w-full border rounded-lg px-3 py-2">
              </div>
              <div>
                <label class="block text-gray-700 text-sm mb-1">Qayerga *</label>
                <input v-model="newOrder.to" type="text" required class="w-full border rounded-lg px-3 py-2">
              </div>
              <div>
                <label class="block text-gray-700 text-sm mb-1">Yuk turi *</label>
                <select v-model="newOrder.cargo" required class="w-full border rounded-lg px-3 py-2">
                  <option value="">Tanlang</option>
                  <option value="Mebel">Mebel</option>
                  <option value="Oziq-ovqat">Oziq-ovqat</option>
                  <option value="Qurilish">Qurilish materiallari</option>
                  <option value="Elektronika">Elektronika</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </div>
              <div>
                <label class="block text-gray-700 text-sm mb-1">Og'irligi *</label>
                <input v-model="newOrder.weight" type="text" placeholder="500 kg" required class="w-full border rounded-lg px-3 py-2">
              </div>
              <div>
                <label class="block text-gray-700 text-sm mb-1">Narxi (so'm) *</label>
                <input v-model="newOrder.price" type="number" required class="w-full border rounded-lg px-3 py-2">
              </div>
              <div>
                <label class="block text-gray-700 text-sm mb-1">Mijoz ID</label>
                <input v-model="newOrder.userId" type="number" placeholder="Mijozning ID si" class="w-full border rounded-lg px-3 py-2">
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm mb-1">Tavsif</label>
              <textarea v-model="newOrder.description" rows="3" class="w-full border rounded-lg px-3 py-2"></textarea>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button type="button" @click="showCreateModal = false" class="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Bekor qilish
              </button>
              <button type="submit" :disabled="creating" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {{ creating ? 'Yaratilmoqda...' : 'Buyurtma yaratish' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const api = useApi()

const orders = ref([])
const loading = ref(true)
const search = ref('')
const statusFilter = ref('')
const totalRevenue = ref(0)
const showCreateModal = ref(false)
const creating = ref(false)

const newOrder = ref({
  from: '',
  to: '',
  cargo: '',
  weight: '',
  price: '',
  description: '',
  userId: ''
})

const filteredOrders = computed(() => {
  let result = orders.value
  
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(o => 
      o.id.toString().includes(searchLower) ||
      o.from?.toLowerCase().includes(searchLower) ||
      o.to?.toLowerCase().includes(searchLower) ||
      o.cargo?.toLowerCase().includes(searchLower)
    )
  }
  
  if (statusFilter.value) {
    result = result.filter(o => o.status === statusFilter.value)
  }
  
  return result
})

onMounted(() => {
  loadOrders()
})

const loadOrders = async () => {
  loading.value = true
  try {
    orders.value = await api.getOrders()
    totalRevenue.value = orders.value.reduce((sum, o) => sum + (o.price || 0), 0)
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    loading.value = false
  }
}

const createOrder = async () => {
  if (!newOrder.value.from || !newOrder.value.to || !newOrder.value.cargo || !newOrder.value.weight || !newOrder.value.price) {
    alert('Barcha majburiy maydonlarni to\'ldiring!')
    return
  }
  
  creating.value = true
  try {
    await api.createOrder(newOrder.value)
    showCreateModal.value = false
    newOrder.value = { from: '', to: '', cargo: '', weight: '', price: '', description: '', userId: '' }
    await loadOrders()
    alert('Buyurtma muvaffaqiyatli yaratildi')
  } catch (error) {
    console.error('Error creating order:', error)
    alert('Xatolik yuz berdi: ' + error.message)
  } finally {
    creating.value = false
  }
}

const changeStatus = async (id, newStatus) => {
  try {
    await api.updateOrder(id, { status: newStatus })
    await loadOrders()
    alert('Buyurtma holati o\'zgartirildi')
  } catch (error) {
    console.error('Error changing status:', error)
    alert('Xatolik yuz berdi: ' + error.message)
  }
}

const deleteOrder = async (id) => {
  if (confirm('Buyurtmani o\'chirmoqchimisiz?')) {
    try {
      await api.deleteOrder(id)
      await loadOrders()
      alert('Buyurtma o\'chirildi')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Xatolik yuz berdi: ' + error.message)
    }
  }
}

const viewOrder = (order) => {
  navigateTo(`/orders/${order.id}`)
}

const clearFilters = () => {
  search.value = ''
  statusFilter.value = ''
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-purple-100 text-purple-800',
    accepted: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('uz-UZ')
}
</script>