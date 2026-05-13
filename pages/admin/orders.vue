<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <AdminSidebar />
      
      <!-- Main Content -->
      <main class="ml-64 flex-1 p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Buyurtmalar</h1>
            <p class="text-gray-500 mt-1">Tizimdagi barcha buyurtmalarni boshqaring</p>
          </div>
          <button @click="openCreateModal" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
            + Yangi buyurtma
          </button>
        </div>
        
        <!-- Stats -->
        <div class="grid md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <p class="text-gray-500 text-sm">Jami buyurtmalar</p>
            <p class="text-2xl font-bold text-gray-800">{{ orders.length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <p class="text-gray-500 text-sm">Kutilmoqda</p>
            <p class="text-2xl font-bold text-yellow-600">{{ orders.filter(o => o.status === 'pending').length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <p class="text-gray-500 text-sm">Bajarilgan</p>
            <p class="text-2xl font-bold text-green-600">{{ orders.filter(o => o.status === 'completed').length }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
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
            <button @click="clearFilters" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition">
              Tozalash
            </button>
          </div>
        </div>
        
        <!-- Orders Table -->
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-gray-500">Buyurtmalar yuklanmoqda...</p>
          </div>
          
          <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <p class="text-gray-500">Buyurtmalar topilmadi</p>
            <button @click="clearFilters" class="mt-4 text-blue-600 hover:text-blue-800">
              Filtrlarni tozalash →
            </button>
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
                <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50 transition">
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
                      @change="openStatusModal(order.id, $event.target.value)"
                      :class="getStatusClass(order.status)"
                      class="px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer"
                    >
                      <option value="pending">Kutilmoqda</option>
                      <option value="negotiation">Muzokarada</option>
                      <option value="accepted">Qabul qilingan</option>
                      <option value="completed">Bajarilgan</option>
                      <option value="cancelled">Bekor qilingan</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(order.createdAt) }}</td>
                  <td class="px-6 py-4">
                    <div class="flex space-x-2">
                      <button @click="viewOrder(order)" class="text-blue-600 hover:text-blue-800 p-1 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button @click="openDeleteModal(order.id)" class="text-red-600 hover:text-red-800 p-1 transition">
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
    <Modal ref="createModal" title="Yangi buyurtma" @confirm="createOrder" :hideConfirmButton="true">
      <template #body>
        <form @submit.prevent="createOrder">
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-gray-700 text-sm mb-1">Qayerdan *</label>
              <input v-model="newOrder.from" type="text" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-gray-700 text-sm mb-1">Qayerga *</label>
              <input v-model="newOrder.to" type="text" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
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
            <button type="button" @click="closeCreateModal" class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
              Bekor qilish
            </button>
            <button type="submit" :disabled="creating" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {{ creating ? 'Yaratilmoqda...' : 'Buyurtma yaratish' }}
            </button>
          </div>
        </form>
      </template>
    </Modal>
    
    <!-- Status Change Modal -->
    <Modal ref="statusModal" title="Holatni o'zgartirish" @confirm="confirmStatusChange">
      <template #body>
        <div class="text-center">
          <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-800 mb-2">Buyurtma holatini o'zgartirmoqchimisiz?</p>
          <p class="text-sm text-gray-500">
            Holatni <span class="font-semibold text-blue-600">{{ getStatusText(oldStatus) }}</span> dan 
            <span class="font-semibold text-green-600">{{ getStatusText(newStatus) }}</span> ga o'zgartirmoqchisiz.
          </p>
          <div class="mt-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-800">
              <span class="font-semibold">Eslatma:</span> Holat o'zgarishi mijoz va haydovchiga bildiriladi.
            </p>
          </div>
        </div>
      </template>
    </Modal>
    
    <!-- Delete Modal -->
    <Modal ref="deleteModal" title="Buyurtmani o'chirish" @confirm="confirmDelete">
      <template #body>
        <div class="text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-800 mb-2">Buyurtmani o'chirmoqchimisiz?</p>
          <p class="text-sm text-gray-500">Bu amalni qaytarib bo'lmaydi. Buyurtma butunlay o'chirib tashlanadi.</p>
          <div class="mt-4 p-3 bg-red-50 rounded-lg">
            <p class="text-sm text-red-800">
              <span class="font-semibold">Ogohlantirish:</span> O'chirilgan buyurtmani qayta tiklash imkoniyati yo'q!
            </p>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const api = useApi()
const toast = useToast()

const orders = ref([])
const loading = ref(true)
const search = ref('')
const statusFilter = ref('')
const totalRevenue = ref(0)
const creating = ref(false)

// Modal refs
const createModal = ref(null)
const statusModal = ref(null)
const deleteModal = ref(null)

// Form data
const newOrder = ref({
  from: '',
  to: '',
  cargo: '',
  weight: '',
  price: '',
  description: '',
  userId: ''
})

// Status change data
const selectedOrderId = ref(null)
const oldStatus = ref('')
const newStatus = ref('')

// Delete data
const deleteOrderId = ref(null)

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
    toast.success(`${orders.value.length} ta buyurtma yuklandi`)
  } catch (error) {
    toast.error('Buyurtmalarni yuklashda xatolik')
  } finally {
    loading.value = false
  }
}

// Create order functions
const openCreateModal = () => {
  createModal.value?.open()
}

const closeCreateModal = () => {
  createModal.value?.close()
  newOrder.value = { from: '', to: '', cargo: '', weight: '', price: '', description: '', userId: '' }
}

const createOrder = async () => {
  if (!newOrder.value.from || !newOrder.value.to || !newOrder.value.cargo || !newOrder.value.weight || !newOrder.value.price) {
    toast.warning('Barcha majburiy maydonlarni to\'ldiring!')
    return
  }
  
  creating.value = true
  try {
    await api.createOrder(newOrder.value)
    closeCreateModal()
    await loadOrders()
    toast.success('Buyurtma muvaffaqiyatli yaratildi')
  } catch (error) {
    toast.error('Xatolik yuz berdi: ' + (error?.message || ''))
  } finally {
    creating.value = false
  }
}

// Status change functions
const openStatusModal = (id, newStat) => {
  const order = orders.value.find(o => o.id === id)
  if (order) {
    selectedOrderId.value = id
    oldStatus.value = order.status
    newStatus.value = newStat
    statusModal.value?.open()
  }
}

const confirmStatusChange = async () => {
  try {
    await api.updateOrder(selectedOrderId.value, { status: newStatus.value })
    await loadOrders()
    statusModal.value?.close()
    toast.success(`Buyurtma holati o'zgartirildi: ${getStatusText(newStatus.value)}`)
  } catch (error) {
    toast.error('Xatolik yuz berdi: ' + (error?.message || ''))
  }
}

// Delete functions
const openDeleteModal = (id) => {
  deleteOrderId.value = id
  deleteModal.value?.open()
}

const confirmDelete = async () => {
  try {
    await api.deleteOrder(deleteOrderId.value)
    await loadOrders()
    deleteModal.value?.close()
    toast.success('Buyurtma o\'chirildi')
  } catch (error) {
    toast.error('Xatolik yuz berdi: ' + (error?.message || ''))
  }
}

const viewOrder = (order) => {
  navigateTo(`/orders/${order.id}`)
}

const clearFilters = () => {
  search.value = ''
  statusFilter.value = ''
  toast.info('Filterlar tozalandi')
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

const getStatusText = (status) => {
  const texts = {
    pending: 'Kutilmoqda',
    negotiation: 'Muzokarada',
    accepted: 'Qabul qilingan',
    completed: 'Bajarilgan',
    cancelled: 'Bekor qilingan'
  }
  return texts[status] || status
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