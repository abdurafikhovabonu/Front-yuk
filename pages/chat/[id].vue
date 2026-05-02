<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center mb-6">
      <NuxtLink to="/incoming-proposals" class="text-blue-600 hover:text-blue-800 mr-4">
        ← Orqaga
      </NuxtLink>
      <h1 class="text-3xl font-bold">Muzokaralar</h1>
    </div>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      <p class="text-gray-500">Xatolik yuz berdi</p>
      <NuxtLink to="/incoming-proposals" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Takliflarga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else class="bg-white rounded-2xl shadow-md overflow-hidden">
      <!-- Order info -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <p class="text-sm">Yuk: {{ order.from || 'Noma\'lum' }} → {{ order.to || 'Noma\'lum' }}</p>
        <p class="text-sm opacity-90">{{ order.cargo || 'Yuk' }} ({{ order.weight || '?' }})</p>
      </div>
      
      <!-- Messages -->
      <div class="h-96 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
        <div v-if="messages.length === 0" class="text-center py-12 text-gray-500">
          <p>Hozircha xabarlar yo'q</p>
          <p class="text-sm mt-2">Birinchi xabarni yozing</p>
        </div>
        
        <div 
          v-for="msg in messages" 
          :key="msg.id"
          :class="msg.userRole === currentUser?.role ? 'justify-end' : 'justify-start'"
          class="flex"
        >
          <div 
            :class="msg.userRole === currentUser?.role 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-800'"
            class="max-w-[70%] rounded-lg px-4 py-2"
          >
            <p class="text-xs font-semibold mb-1">{{ msg.userName || 'Foydalanuvchi' }}</p>
            <p class="text-sm">{{ msg.message }}</p>
            <p class="text-xs opacity-70 mt-1">{{ formatTime(msg.timestamp) }}</p>
          </div>
        </div>
      </div>
      
      <!-- Message input -->
      <div class="border-t p-4">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="Xabar yozing..." 
            required
            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            :disabled="sending"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {{ sending ? 'Yuborilmoqda...' : 'Yuborish' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getOrder, sendMessage: sendMessageApi } = useApi()

const order = ref({})
const messages = ref([])
const newMessage = ref('')
const loading = ref(true)
const sending = ref(false)
const error = ref(false)
const currentUser = ref(null)
const messagesContainer = ref(null)

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    currentUser.value = JSON.parse(user)
  }
  loadChat()
})

const loadChat = async () => {
  loading.value = true
  error.value = false
  try {
    const orderId = route.params.id
    console.log('Loading chat for order:', orderId)
    
    const orderData = await getOrder(orderId)
    console.log('Order data:', orderData)
    
    order.value = orderData
    messages.value = orderData.contract?.messages || []
    
    // Scroll to bottom after messages load
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  } catch (err) {
    console.error('Error loading chat:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  sending.value = true
  try {
    const orderId = route.params.id
    console.log('Sending message to order:', orderId)
    console.log('Message:', newMessage.value)
    
    await sendMessageApi(orderId, newMessage.value)
    newMessage.value = ''
    await loadChat()
  } catch (err) {
    console.error('Error sending message:', err)
    alert('Xabarni yuborishda xatolik: ' + (err.message || 'Noma\'lum xato'))
  } finally {
    sending.value = false
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
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