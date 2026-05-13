<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center mb-6">
      <NuxtLink :to="backLink" class="text-blue-600 hover:text-blue-800 mr-4">
        ← Orqaga
      </NuxtLink>
      <h1 class="text-3xl font-bold">💬 Muzokaralar</h1>
    </div>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Xabarlar yuklanmoqda...</p>
    </div>
    
    <div v-else-if="error" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      <p class="text-red-500">{{ error }}</p>
      <NuxtLink :to="backLink" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Orqaga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else-if="!order || !order._id" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <p class="text-gray-500">Buyurtma ma'lumotlari topilmadi</p>
      <NuxtLink :to="backLink" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Orqaga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else class="bg-white rounded-2xl shadow-md overflow-hidden">
      <!-- Order info -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm opacity-90">Buyurtma #{{ order._id?.slice(-6) }}</p>
            <p class="font-semibold">{{ order.from }} → {{ order.to }}</p>
            <p class="text-sm opacity-90">{{ order.cargo }} ({{ order.weight }})</p>
          </div>
          <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
            {{ getStatusText(order.status) }}
          </span>
        </div>
      </div>
      
      <!-- Messages -->
      <div class="h-96 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
        <div v-if="messages.length === 0" class="text-center py-12 text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <p>Hozircha xabarlar yo'q</p>
          <p class="text-sm mt-1">Birinchi xabarni yozing</p>
        </div>
        
        <div 
          v-for="msg in messages" 
          :key="msg.id || msg._id"
          :class="sameUser(msg.userId, currentUserId) ? 'justify-end' : 'justify-start'"
          class="flex"
        >
          <div 
            :class="sameUser(msg.userId, currentUserId) 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-800'"
            class="max-w-[75%] rounded-2xl px-4 py-2 shadow-sm"
          >
            <p class="text-xs font-semibold mb-1">
              {{ msg.userName }}
              <span class="text-xs opacity-70 ml-1">({{ msg.userRole === 'driver' ? '🚚 Haydovchi' : '👤 Mijoz' }})</span>
            </p>
            <p class="text-sm">{{ msg.message }}</p>
            <p class="text-xs opacity-70 mt-1 text-right">{{ formatTime(msg.timestamp) }}</p>
          </div>
        </div>
      </div>
      
      <!-- Message input -->
      <div class="border-t p-4 bg-gray-50">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="Xabar yozing..." 
            required
            class="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            :disabled="sending"
            class="px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            Yuborish
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getOrder, sendMessage: sendMessageApi } = useApi()
const toast = useToast()

/** API dan kelgan userId (string yoki obyekt) bilan joriy foydalanuvchini solishtirish */
const normalizeUserId = (val) => {
  if (val == null || val === '') return ''
  if (typeof val === 'object' && val._id != null) return String(val._id)
  return String(val)
}

const sameUser = (a, b) => normalizeUserId(a) === normalizeUserId(b)

const order = ref(null)
const messages = ref([])
const newMessage = ref('')
const loading = ref(true)
const sending = ref(false)
const error = ref(null)
const currentUserId = ref(null)
const messagesContainer = ref(null)

// Orqaga qaytish linki
const backLink = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.role === 'driver' ? '/my-proposals' : '/incoming-proposals'
})

onMounted(async () => {
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    currentUserId.value = normalizeUserId(userData.id ?? userData._id)
  }
  
  const orderId = route.params.id

  if (!orderId || orderId === 'undefined') {
    error.value = 'Buyurtma ID si topilmadi'
    loading.value = false
    return
  }
  
  await loadChat(orderId)
})

const loadChat = async (orderId) => {
  loading.value = true
  error.value = null
  try {
    const orderData = await getOrder(orderId)

    if (!orderData || !orderData._id) {
      throw new Error('Buyurtma ma\'lumotlari topilmadi')
    }
    
    order.value = orderData
    messages.value = orderData.contract?.messages || []
    
    // Scroll to bottom
    setTimeout(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }, 100)
  } catch (err) {
    error.value = err.message || 'Xabarlarni yuklashda xatolik'
  } finally {
    loading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  if (!order.value || !order.value._id) {
    toast.error('Buyurtma ma\'lumotlari topilmadi')
    return
  }

  sending.value = true
  try {
    await sendMessageApi(String(order.value._id), newMessage.value)
    newMessage.value = ''
    await loadChat(String(order.value._id))
  } catch (err) {
    toast.error('Xabarni yuborishda xatolik: ' + (err.message || 'Noma\'lum xato'))
  } finally {
    sending.value = false
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

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>