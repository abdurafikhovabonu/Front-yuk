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
        class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
              @click="openAcceptModal(proposal.id)"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105"
            >
              ✅ Taklifni qabul qilish
            </button>
            <button 
              @click="openRejectModal(proposal.id)"
              class="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              ❌ Rad etish
            </button>
            <button 
              @click="chatWithDriver(proposal.id)"
              class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              💬 Muzokara
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Accept Modal -->
    <Modal ref="acceptModal" @confirm="confirmAccept">
      <template #title>
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Taklifni qabul qilish
        </div>
      </template>
      <template #body>
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-800 mb-2">Taklifni qabul qilasizmi?</p>
          <p class="text-sm text-gray-500">Taklifni qabul qilganingizdan so'ng, haydovchi bilan shartnoma tuziladi va yuk yetkazib berish jarayoni boshlanadi.</p>
          <div class="mt-4 p-3 bg-green-50 rounded-lg">
            <p class="text-sm text-green-800">
              <span class="font-semibold">Eslatma:</span> Taklifni qabul qilganingizdan keyin bekor qilish imkoniyati cheklangan.
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="closeAcceptModal" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          Bekor qilish
        </button>
        <button @click="confirmAccept" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Qabul qilish
        </button>
      </template>
    </Modal>
    
    <!-- Reject Modal -->
    <Modal ref="rejectModal" @confirm="confirmReject">
      <template #title>
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Taklifni rad etish
        </div>
      </template>
      <template #body>
        <div class="text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-800 mb-2">Taklifni rad etasizmi?</p>
          <p class="text-sm text-gray-500">Bu amalni qaytarib bo'lmaydi. Taklif rad etilgandan so'ng, haydovchiga bildirishnoma yuboriladi va siz boshqa takliflarni ko'rib chiqishingiz mumkin.</p>
          <div class="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p class="text-sm text-yellow-800">
              <span class="font-semibold">Eslatma:</span> Rad etilgan taklifni qayta tiklash imkoniyati yo'q.
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="closeRejectModal" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          Bekor qilish
        </button>
        <button @click="confirmReject" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Rad etish
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
const { getOrders, acceptContract, updateOrder } = useApi()
const router = useRouter()

const proposals = ref([])
const loading = ref(true)
const selectedOrderId = ref(null)

// Modal refs
const acceptModal = ref(null)
const rejectModal = ref(null)

onMounted(() => {
  loadProposals()
})

const loadProposals = async () => {
  loading.value = true
  try {
    const allOrders = await getOrders()
    proposals.value = allOrders.filter(order => 
      order.status === 'negotiation' && order.contract
    )
    console.log('Proposals:', proposals.value)
  } catch (error) {
    console.error('Error loading proposals:', error)
    const toast = useToast()
    toast.error('Takliflarni yuklashda xatolik')
  } finally {
    loading.value = false
  }
}

// Accept proposal functions
const openAcceptModal = (orderId) => {
  selectedOrderId.value = orderId
  acceptModal.value?.open()
}

const closeAcceptModal = () => {
  acceptModal.value?.close()
  selectedOrderId.value = null
}

const confirmAccept = async () => {
  const toast = useToast()
  
  try {
    await acceptContract(selectedOrderId.value)
    toast.success('Taklif muvaffaqiyatli qabul qilindi!')
    closeAcceptModal()
    await loadProposals()
    router.push('/orders')
  } catch (error) {
    console.error('Error accepting proposal:', error)
    toast.error('Xatolik yuz berdi: ' + error.message)
  }
}

// Reject proposal functions
const openRejectModal = (orderId) => {
  selectedOrderId.value = orderId
  rejectModal.value?.open()
}

const closeRejectModal = () => {
  rejectModal.value?.close()
  selectedOrderId.value = null
}

const confirmReject = async () => {
  const toast = useToast()
  
  try {
    await updateOrder(selectedOrderId.value, { status: 'pending', contract: null })
    toast.success('Taklif rad etildi')
    closeRejectModal()
    await loadProposals()
  } catch (error) {
    console.error('Error rejecting proposal:', error)
    toast.error('Xatolik yuz berdi. Qaytadan urinib ko\'ring')
  }
}

const chatWithDriver = (orderId) => {
  if (!orderId) {
    console.error('Order ID is undefined')
    return
  }
  console.log('Chat with driver for order:', orderId)
  router.push(`/chat/${orderId}`)
}
const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}
</script>