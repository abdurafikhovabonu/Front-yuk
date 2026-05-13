<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center mb-6">
      <NuxtLink to="/loads" class="text-blue-600 hover:text-blue-800 mr-4">
        ← Orqaga
      </NuxtLink>
      <h1 class="text-3xl font-bold">Taklif berish</h1>
    </div>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <p class="text-red-500">{{ error }}</p>
      <NuxtLink to="/loads" class="inline-block mt-4 text-blue-600">
        Yuk elonlariga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else-if="!loadData" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <p class="text-gray-500">Yuk ma'lumotlari topilmadi</p>
      <NuxtLink to="/loads" class="inline-block mt-4 text-blue-600">
        Yuk elonlariga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else>
      <!-- Yuk ma'lumotlari -->
      <div class="bg-blue-50 rounded-2xl p-6 mb-8">
        <h2 class="text-lg font-semibold mb-2">📦 Yuk ma'lumotlari</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-600">Yo'nalish:</p>
            <p class="font-semibold">{{ loadData.from }} → {{ loadData.to }}</p>
          </div>
          <div>
            <p class="text-gray-600">Yuk:</p>
            <p class="font-semibold">{{ loadData.cargo }} ({{ loadData.weight }})</p>
          </div>
          <div>
            <p class="text-gray-600">Mijoz taklifi:</p>
            <p class="font-semibold text-blue-600">{{ formatPrice(loadData.price) }} so'm</p>
          </div>
          <div>
            <p class="text-gray-600">Yaratilgan:</p>
            <p class="font-semibold">{{ formatRelativeTime(loadData.createdAt) }}</p>
          </div>
        </div>
      </div>
      
      <!-- Taklif formasi -->
      <div class="bg-white rounded-2xl shadow-md p-8">
        <h2 class="text-xl font-bold mb-6">💎 Sizning taklifingiz</h2>
        
        <form @submit.prevent="submitProposal" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Taklif narxi (so'm) *
            </label>
            <input 
              v-model="proposal.price" 
              type="number" 
              required
              :placeholder="`Mijoz taklifi: ${formatPrice(loadData.price)} so'm`"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Yetkazib berish muddati *
            </label>
            <input 
              v-model="proposal.deliveryDate" 
              type="date" 
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Shartnoma shartlari
            </label>
            <textarea 
              v-model="proposal.terms" 
              rows="4"
              placeholder="Qo'shimcha shartlar..."
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3">
            <NuxtLink to="/loads" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Bekor qilish
            </NuxtLink>
            <button 
              type="submit" 
              :disabled="submitting"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ submitting ? 'Yuborilmoqda...' : 'Taklif yuborish' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { getOrder, createContract } = useApi()
const toast = useToast()

const loadData = ref(null)
const loading = ref(true)
const error = ref(null)
const submitting = ref(false)
const proposal = ref({
  price: '',
  deliveryDate: '',
  terms: ''
})

onMounted(async () => {
  const orderId = route.params.id

  if (!orderId || orderId === 'undefined') {
    error.value = 'Yuk ID si topilmadi'
    loading.value = false
    return
  }
  
  await loadOrder(orderId)
})

const loadOrder = async (orderId) => {
  loading.value = true
  error.value = null
  try {
    const order = await getOrder(orderId)

    if (!order || !order._id) {
      throw new Error('Yuk ma\'lumotlari topilmadi')
    }
    
    loadData.value = order
    proposal.value.price = order.price || 0
  } catch (err) {
    error.value = err.message || 'Yuk ma\'lumotlarini yuklashda xatolik'
  } finally {
    loading.value = false
  }
}

const submitProposal = async () => {
  if (!proposal.value.price || !proposal.value.deliveryDate) {
    toast.warning('Iltimos, barcha majburiy maydonlarni to\'ldiring!')
    return
  }
  
  submitting.value = true
  try {
    const orderId = route.params.id

    await createContract(orderId, {
      price: parseInt(proposal.value.price),
      deliveryDate: proposal.value.deliveryDate,
      terms: proposal.value.terms || ''
    })
    
    toast.success('Taklif muvaffaqiyatli yuborildi!')
    router.push('/my-proposals')
  } catch (err) {
    toast.error('Xatolik yuz berdi: ' + (err.message || 'Noma\'lum xato'))
  } finally {
    submitting.value = false
  }
}

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('uz-UZ').format(price)
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
</script>