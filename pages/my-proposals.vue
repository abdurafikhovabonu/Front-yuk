<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Mening takliflarim</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Takliflar yuklanmoqda...</p>
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
        :key="orderId(proposal)"
        class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
      >
        <div class="p-6">
          <!-- Header -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Taklif
                </span>
                <span class="text-xs text-gray-500">{{ formatRelativeTime(proposal.createdAt) }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800">
                {{ proposal.from }} → {{ proposal.to }}
              </h3>
            </div>
            <span :class="getStatusClass(proposal.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
              {{ getStatusText(proposal.status) }}
            </span>
          </div>
          
          <!-- Info Grid -->
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-gray-500 text-sm">👤 Mijoz</p>
              <p class="font-semibold">{{ proposal.client?.name || 'Mijoz' }}</p>
              <p class="text-sm text-gray-600">📞 Tel: {{ proposal.client?.phone || 'Noma\'lum' }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">💰 Sizning taklifingiz</p>
              <p class="font-bold text-2xl text-blue-600">{{ formatPrice(proposal.contract?.price || proposal.price) }} so'm</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">📅 Yetkazib berish muddati</p>
              <p class="font-semibold">{{ formatDate(proposal.contract?.deliveryDate) }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">📦 Yuk ma'lumotlari</p>
              <p class="text-sm">{{ proposal.cargo }} ({{ proposal.weight }})</p>
            </div>
          </div>
          
          <!-- Terms -->
          <div v-if="proposal.contract?.terms" class="bg-gray-50 rounded-lg p-3 mb-4">
            <p class="text-gray-500 text-sm mb-1">📝 Shartnoma shartlari:</p>
            <p class="text-sm">{{ proposal.contract.terms }}</p>
          </div>
          
          <!-- Chat Section -->
          <div class="border-t pt-4 mt-4">
            <div class="flex justify-between items-center mb-3">
              <h4 class="font-semibold text-gray-800">💬 Muzokaralar</h4>
              <span class="text-xs text-gray-500">{{ getMessages(proposal).length }} ta xabar</span>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
              <div v-if="getMessages(proposal).length === 0" class="text-center py-8 text-gray-500 text-sm">
                Hozircha xabarlar yo'q
              </div>
              <div 
                v-for="(msg, idx) in getMessages(proposal)" 
                :key="messageKey(msg, idx)"
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
            
            <form @submit.prevent="sendMessage(orderId(proposal))" class="mt-3 flex space-x-2">
              <input 
                v-model="newMessages[orderId(proposal)]" 
                type="text" 
                placeholder="Xabar yozing..."
                class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                :disabled="sending[orderId(proposal)]"
                class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Yuborish
              </button>
            </form>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-3 mt-4 pt-4 border-t">
            <button 
              v-if="proposal.status === 'accepted'"
              @click="viewOrder(orderId(proposal))"
              class="flex-1 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
            >
              📦 Buyurtmani ko'rish
            </button>
            <button 
              v-if="proposal.status === 'pending' || proposal.status === 'negotiation'"
              @click="cancelProposal(orderId(proposal))"
              class="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
            >
              ❌ Taklifni bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getMyProposals, sendMessage: sendMessageApi, updateOrder } = useApi()
const router = useRouter()
const toast = useToast()

const orderId = (order) => {
  if (!order) return ''
  const raw = order._id ?? order.id
  return raw != null ? String(raw) : ''
}

const messageKey = (msg, idx) => {
  if (msg._id) return String(msg._id)
  if (msg.id) return String(msg.id)
  return `m-${idx}-${msg.timestamp || ''}`
}

const proposals = ref([])
const loading = ref(true)
const newMessages = ref({})
const sending = ref({})

onMounted(() => {
  loadMyProposals()
})

const loadMyProposals = async () => {
  loading.value = true
  try {
    proposals.value = await getMyProposals()
  } catch {
    toast.error('Takliflarni yuklashda xatolik')
  } finally {
    loading.value = false
  }
}

const getMessages = (proposal) => {
  return proposal.contract?.messages || []
}

const sendMessage = async (orderId) => {
  const message = newMessages.value[orderId]
  if (!message?.trim()) return
  
  sending.value[orderId] = true
  try {
    await sendMessageApi(orderId, message)
    newMessages.value[orderId] = ''
    await loadMyProposals()
  } catch {
    toast.error('Xabarni yuborishda xatolik')
  } finally {
    sending.value[orderId] = false
  }
}

const cancelProposal = async (orderId) => {
  if (confirm('Taklifni bekor qilmoqchimisiz?')) {
    try {
      await updateOrder(orderId, { status: 'pending', contract: null, driverId: null })
      await loadMyProposals()
      toast.success('Taklif bekor qilindi')
    } catch {
      toast.error('Xatolik yuz berdi')
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

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}

const formatRelativeTime = (date) => {
  if (!date) return 'Noma\'lum'
  const now = new Date()
  const created = new Date(date)
  const diffMs = now - created
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Hozirgina'
  if (diffMins < 60) return `${diffMins} daqiqa oldin`
  if (diffHours < 24) return `${diffHours} soat oldin`
  if (diffDays === 1) return 'Kecha'
  return `${diffDays} kun oldin`
}

const formatTime = (time) => {
  if (!time) return ''
  return new Date(time).toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>