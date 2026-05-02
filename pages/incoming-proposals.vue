<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Kiruvchi takliflar</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="proposals.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-500">Hozircha kiruvchi takliflar yo'q</p>
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
            <span class="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
              Kutilmoqda
            </span>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-gray-500 text-sm">Haydovchi</p>
              <p class="font-semibold">{{ proposal.contract?.driverName || 'Haydovchi' }}</p>
              <p class="text-sm text-gray-600">{{ proposal.contract?.carType }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Taklif narxi</p>
              <p class="font-bold text-2xl text-green-600">{{ formatPrice(proposal.contract?.price) }} so'm</p>
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
            <p class="text-gray-500 text-sm mb-1">Shartnoma shartlari:</p>
            <p class="text-sm">{{ proposal.contract.terms }}</p>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="acceptProposal(proposal.id)"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Taklifni qabul qilish
            </button>
            <button 
              @click="rejectProposal(proposal.id)"
              class="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Rad etish
            </button>
            <button 
              @click="chatWithDriver(proposal.id)"
              class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Muzokara
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getOrders, acceptContract, updateOrder } = useApi()
const router = useRouter()

const proposals = ref([])
const loading = ref(true)

onMounted(() => {
  loadProposals()
})

const loadProposals = async () => {
  loading.value = true
  try {
    const allOrders = await getOrders()
    // Mijozning negotiation statusdagi buyurtmalari
    proposals.value = allOrders.filter(order => 
      order.status === 'negotiation' && order.contract
    )
    console.log('Proposals:', proposals.value)
  } catch (error) {
    console.error('Error loading proposals:', error)
  } finally {
    loading.value = false
  }
}

const acceptProposal = async (orderId) => {
  if (confirm('Ushbu taklifni qabul qilasizmi?')) {
    try {
      await acceptContract(orderId)
      alert('Taklif muvaffaqiyatli qabul qilindi!')
      loadProposals()
      router.push('/orders')
    } catch (error) {
      console.error('Error accepting proposal:', error)
      alert('Xatolik yuz berdi: ' + error.message)
    }
  }
}

const rejectProposal = async (orderId) => {
  if (confirm('Taklifni rad etasizmi?')) {
    try {
      await updateOrder(orderId, { status: 'pending', contract: null })
      alert('Taklif rad etildi')
      loadProposals()
    } catch (error) {
      console.error('Error rejecting proposal:', error)
      alert('Xatolik yuz berdi')
    }
  }
}

const chatWithDriver = (orderId) => {
  router.push(`/chat/${orderId}`)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}
</script>