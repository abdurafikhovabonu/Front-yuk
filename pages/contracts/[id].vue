<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center mb-6">
      <NuxtLink to="/my-proposals" class="text-blue-600 hover:text-blue-800 mr-4">
        ← Orqaga
      </NuxtLink>
      <h1 class="text-3xl font-bold">Shartnoma #{{ contract.id }}</h1>
    </div>
    
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Shartnoma ma'lumotlari -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-md p-6 sticky top-24">
          <h3 class="font-semibold text-lg mb-4">Shartnoma ma'lumotlari</h3>
          
          <div class="space-y-3 text-sm">
            <div>
              <span class="text-gray-500">Holati:</span>
              <span :class="getStatusClass(contract.status)" class="ml-2 px-2 py-1 rounded-full text-xs font-semibold">
                {{ getStatusText(contract.status) }}
              </span>
            </div>
            <div>
              <span class="text-gray-500">Yo'nalish:</span>
              <span class="ml-2 font-medium">{{ contract.from }} → {{ contract.to }}</span>
            </div>
            <div>
              <span class="text-gray-500">Narx:</span>
              <span class="ml-2 font-bold text-blue-600">{{ formatPrice(contract.price) }} so'm</span>
            </div>
            <div>
              <span class="text-gray-500">Yetkazib berish:</span>
              <span class="ml-2">{{ formatDate(contract.deliveryDate) }}</span>
            </div>
            <div>
              <span class="text-gray-500">Mijoz:</span>
              <span class="ml-2">{{ contract.clientName }}</span>
            </div>
            <div>
              <span class="text-gray-500">Telefon:</span>
              <span class="ml-2">{{ contract.clientPhone }}</span>
            </div>
          </div>
          
          <div v-if="contract.status === 'pending'" class="mt-6 space-y-3">
            <button 
              v-if="userRole === 'client'"
              @click="acceptContract"
              class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Taklifni qabul qilish
            </button>
            <button 
              @click="rejectContract"
              class="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Taklifni rad etish
            </button>
          </div>
        </div>
      </div>
      
      <!-- Chat qismi -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <h3 class="font-semibold">Muzokaralar</h3>
            <p class="text-sm text-blue-100">Shartnoma shartlarini muhokama qiling</p>
          </div>
          
          <!-- Messages -->
          <div class="h-96 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
            <div 
              v-for="msg in contract.messages" 
              :key="msg.id"
              :class="msg.userRole === userRole ? 'justify-end' : 'justify-start'"
              class="flex"
            >
              <div 
                :class="msg.userRole === userRole 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'"
                class="max-w-[70%] rounded-lg px-4 py-2"
              >
                <p class="text-sm font-semibold mb-1">{{ msg.userName }}</p>
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
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { getOrder, assignDriver } = useApi()
const toast = useToast()

const contract = ref({})
const newMessage = ref('')
const sending = ref(false)
const userRole = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  userRole.value = user.role
  loadContract()
})

const loadContract = async () => {
  try {
    const order = await getOrder(route.params.id)
    contract.value = order.contract || {}
    contract.value.from = order.from
    contract.value.to = order.to
    contract.value.price = order.price
  } catch {
    toast.error('Shartnomani yuklashda xatolik')
  }
}

const sendMessage = async () => {
  sending.value = true
  try {
    await assignDriver(route.params.id, { message: newMessage.value })
    newMessage.value = ''
    await loadContract()
    scrollToBottom()
  } catch {
    toast.error('Xabarni yuborishda xatolik')
  } finally {
    sending.value = false
  }
}

const acceptContract = async () => {
  if (confirm('Taklifni qabul qilasizmi?')) {
    try {
      await assignDriver(route.params.id, { accept: true })
      router.push('/orders')
    } catch {
      toast.error('Taklifni qabul qilishda xatolik')
    }
  }
}

const scrollToBottom = () => {
  // Scroll to bottom of messages
}

const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price)
const formatDate = (date) => new Date(date).toLocaleDateString('uz-UZ')
const formatTime = (time) => new Date(time).toLocaleTimeString('uz-UZ')

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    pending: 'Kutilmoqda',
    accepted: 'Qabul qilingan',
    rejected: 'Rad etilgan',
    completed: 'Bajarilgan'
  }
  return texts[status] || status
}
</script>