<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Mening takliflarim</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Yuklanmoqda...</p>
    </div>
    
    <div v-else-if="proposals.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-500">Siz hali hech qanday taklif yubormagansiz</p>
      <NuxtLink to="/loads" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Yuk elonlarini ko'rish →
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-6">
      <div 
        v-for="proposal in proposals" 
        :key="proposal.id" 
        class="bg-white rounded-2xl shadow-md overflow-hidden"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Taklif #{{ proposal.id }}
                </span>
                <span class="text-xs text-gray-500">{{ formatDate(proposal.createdAt) }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800">
                {{ proposal.from }} → {{ proposal.to }}
              </h3>
            </div>
            <span :class="getStatusClass(proposal.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
              {{ getStatusText(proposal.status) }}
            </span>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-gray-500 text-sm">Mijoz</p>
              <p class="font-semibold">{{ proposal.client?.name || 'Mijoz' }}</p>
              <p class="text-sm text-gray-600">Tel: {{ proposal.client?.phone || 'Noma\'lum' }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Sizning taklifingiz</p>
              <p class="font-bold text-2xl text-blue-600">{{ formatPrice(proposal.contract?.price || proposal.price) }} so'm</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Yetkazib berish muddati</p>
              <p class="font-semibold">{{ formatDate(proposal.contract?.deliveryDate) }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Yuk ma'lumotlari</p>
              <p class="text-sm">{{ proposal.cargo }} ({{ proposal.weight }})</p>
            </div>
          </div>
          
          <!-- Chat Section -->
          <div class="border-t pt-4 mt-4">
            <div class="flex justify-between items-center mb-3">
              <h4 class="font-semibold text-gray-800">Muzokaralar</h4>
              <span class="text-xs text-gray-500">{{ getMessageCount(proposal) }} ta xabar</span>
            </div>
            
            <!-- Messages -->
            <div class="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
              <div v-if="getMessages(proposal).length === 0" class="text-center py-8 text-gray-500 text-sm">
                <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Hozircha xabarlar yo'q
              </div>
              <div 
                v-for="msg in getMessages(proposal)" 
                :key="msg.id"
                :class="msg.userRole === 'driver' ? 'justify-end' : 'justify-start'"
                class="flex mb-3"
              >
                <div 
                  :class="msg.userRole === 'driver' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border text-gray-800'"
                  class="max-w-[80%] rounded-lg px-3 py-2 shadow-sm"
                >
                  <p class="text-xs font-semibold mb-1">{{ msg.userName }}</p>
                  <p class="text-sm">{{ msg.message }}</p>
                  <p class="text-xs opacity-70 mt-1">{{ formatTime(msg.timestamp) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Message Input -->
            <form @submit.prevent="sendMessage(proposal.id)" class="mt-3 flex space-x-2">
              <input 
                v-model="newMessages[proposal.id]" 
                type="text" 
                :placeholder="`${proposal.client?.name || 'Mijoz'} ga xabar yozing...`"
                class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                :disabled="sending[proposal.id]"
                class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </form>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-3 mt-4 pt-4 border-t">
            <button 
              v-if="proposal.status === 'accepted'"
              @click="viewOrder(proposal.id)"
              class="flex-1 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              Buyurtmani ko'rish
            </button>
            <button 
              v-if="proposal.status === 'pending' || proposal.status === 'negotiation'"
              @click="cancelProposal(proposal.id)"
              class="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Taklifni bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getOrders, sendMessage: sendMessageApi, updateOrder } = useApi()
const router = useRouter()

const proposals = ref([])
const loading = ref(true)
const currentUser = ref(null)
const newMessages = ref({})
const sending = ref({})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    currentUser.value = JSON.parse(userData)
  }
  loadMyProposals()
})

// Xabarlarni olish uchun yordamchi funksiyalar
const getMessages = (proposal) => {
  return proposal.contract?.messages || []
}

const getMessageCount = (proposal) => {
  return proposal.contract?.messages?.length || 0
}

const loadMyProposals = async () => {
  loading.value = true
  try {
    const allOrders = await getOrders()
    console.log('All orders:', allOrders)
    
    // Haydovchining o'z takliflari
    proposals.value = allOrders.filter(order => {
      // Agar contract mavjud va driverId mos kelsa
      if (order.contract && order.contract.driverId === currentUser.value?.id) {
        return true
      }
      // Yoki status negotiation va driverId mos kelsa
      if (order.status === 'negotiation' && order.driverId === currentUser.value?.id) {
        return true
      }
      return false
    })
    
    console.log('My proposals:', proposals.value)
  } catch (error) {
    console.error('Error loading proposals:', error)
    alert('Xatolik yuz berdi: ' + error.message)
  } finally {
    loading.value = false
  }
}

const sendMessage = async (orderId) => {
  const message = newMessages.value[orderId]
  if (!message || !message.trim()) return
  
  sending.value[orderId] = true
  
  try {
    console.log('Sending message to order:', orderId, message)
    await sendMessageApi(orderId, message)
    newMessages.value[orderId] = ''
    await loadMyProposals() // Yangilash
  } catch (error) {
    console.error('Error sending message:', error)
    alert('Xabarni yuborishda xatolik: ' + (error.message || 'Noma\'lum xato'))
  } finally {
    sending.value[orderId] = false
  }
}

const cancelProposal = async (orderId) => {
  if (confirm('Taklifni bekor qilmoqchimisiz?')) {
    try {
      await updateOrder(orderId, { 
        status: 'pending', 
        contract: null,
        driverId: null
      })
      await loadMyProposals()
      alert('Taklif bekor qilindi')
    } catch (error) {
      console.error('Error canceling proposal:', error)
      alert('Xatolik yuz berdi: ' + error.message)
    }
  }
}

const viewOrder = (orderId) => {
  router.push(`/orders/${orderId}`)
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-purple-100 text-purple-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    pending: 'Kutilmoqda',
    negotiation: 'Muzokarada',
    accepted: 'Qabul qilingan',
    rejected: 'Rad etilgan',
    completed: 'Bajarilgan'
  }
  return texts[status] || status
}

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  try {
    return new Date(date).toLocaleDateString('uz-UZ')
  } catch (e) {
    return 'Noma\'lum'
  }
}

const formatTime = (time) => {
  if (!time) return ''
  try {
    return new Date(time).toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return ''
  }
}
</script>