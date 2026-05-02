<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Mening takliflarim</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
                  Taklif #{{ proposal.contract?.id }}
                </span>
                <span class="text-xs text-gray-500">{{ formatDate(proposal.contract?.createdAt) }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800">
                {{ proposal.from }} → {{ proposal.to }}
              </h3>
            </div>
            <span :class="getStatusClass(proposal.contract?.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
              {{ getStatusText(proposal.contract?.status) }}
            </span>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-gray-500 text-sm">Mijoz</p>
              <p class="font-semibold">{{ proposal.client?.name || 'Mijoz' }}</p>
              <p class="text-sm text-gray-600">Tel: {{ proposal.client?.phone || 'Noma\'lum' }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Taklif narxi</p>
              <p class="font-bold text-2xl text-blue-600">{{ formatPrice(proposal.contract?.price) }} so'm</p>
              <p class="text-sm text-gray-500">Mijoz taklifi: {{ formatPrice(proposal.price) }} so'm</p>
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
          
          <div v-if="proposal.contract?.terms" class="bg-gray-50 rounded-lg p-3 mb-4">
            <p class="text-gray-500 text-sm mb-1">Sizning shartlaringiz:</p>
            <p class="text-sm">{{ proposal.contract.terms }}</p>
          </div>
          
          <!-- Last message preview -->
          <div v-if="lastMessage(proposal)" class="bg-blue-50 rounded-lg p-3 mb-4">
            <p class="text-gray-500 text-sm mb-1">Oxirgi xabar:</p>
            <p class="text-sm">{{ lastMessage(proposal).userName }}: {{ lastMessage(proposal).message }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ formatTime(lastMessage(proposal).timestamp) }}</p>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="goToChat(proposal.id)"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Muzokara
            </button>
            <button 
              v-if="proposal.contract?.status === 'accepted'"
              @click="viewOrder(proposal.id)"
              class="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              Buyurtmani ko'rish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getOrders } = useApi()
const router = useRouter()

const proposals = ref([])
const loading = ref(true)
const currentUser = ref(null)

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    currentUser.value = JSON.parse(user)
  }
  loadMyProposals()
})

const loadMyProposals = async () => {
  loading.value = true
  try {
    const allOrders = await getOrders()
    // Haydovchining o'z takliflari
    proposals.value = allOrders.filter(order => 
      order.contract && order.contract.driverId === currentUser.value?.id
    )
    console.log('My proposals:', proposals.value)
  } catch (error) {
    console.error('Error loading proposals:', error)
  } finally {
    loading.value = false
  }
}

const lastMessage = (proposal) => {
  const messages = proposal.contract?.messages || []
  return messages[messages.length - 1]
}

const goToChat = (orderId) => {
  router.push(`/chat/${orderId}`)
}

const viewOrder = (orderId) => {
  router.push(`/orders/${orderId}`)
}

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

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}

const formatTime = (time) => {
  if (!time) return ''
  return new Date(time).toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>