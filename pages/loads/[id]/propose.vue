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
    
    <div v-else-if="!loadData" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <p class="text-gray-500">Yuk ma'lumotlari topilmadi</p>
      <NuxtLink to="/loads" class="inline-block mt-4 text-blue-600 hover:text-blue-800">
        Yuk elonlariga qaytish →
      </NuxtLink>
    </div>
    
    <div v-else>
      <!-- Yuk ma'lumotlari -->
      <div class="bg-blue-50 rounded-2xl p-6 mb-8">
        <h2 class="text-lg font-semibold mb-2">Yuk ma'lumotlari</h2>
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
        </div>
      </div>
      
      <!-- Taklif formasi -->
      <div class="bg-white rounded-2xl shadow-md p-8">
        <h2 class="text-xl font-bold mb-6">Sizning taklifingiz</h2>
        
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
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Shartnoma shartlari
            </label>
            <textarea 
              v-model="proposal.terms" 
              rows="4"
              placeholder="Qo'shimcha shartlar: yukni yuklash/tushirish vaqti, maxsus talablar va boshqalar..."
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-yellow-800">
                Taklifingiz mijozga yuboriladi. Mijoz taklifingizni qabul qilsa, siz bilan bog'lanadi va shartnoma tuziladi.
              </p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <NuxtLink to="/loads" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Bekor qilish
            </NuxtLink>
            <button 
              type="submit" 
              :disabled="submitting"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
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

const loadData = ref(null)
const loading = ref(true)
const submitting = ref(false)
const proposal = ref({
  price: '',
  deliveryDate: '',
  terms: ''
})

onMounted(async () => {
  await loadOrder()
})

const loadOrder = async () => {
  loading.value = true
  try {
    const orderId = route.params.id
    console.log('Loading order ID:', orderId)
    
    const order = await getOrder(orderId)
    console.log('Order data:', order)
    
    loadData.value = order
    proposal.value.price = order.price
  } catch (error) {
    console.error('Error loading order:', error)
    alert('Yuk ma\'lumotlarini yuklashda xatolik: ' + error.message)
  } finally {
    loading.value = false
  }
}

const submitProposal = async () => {
  if (!proposal.value.price || !proposal.value.deliveryDate) {
    alert('Iltimos, barcha majburiy maydonlarni to\'ldiring!')
    return
  }
  
  submitting.value = true
  try {
    const orderId = route.params.id
    console.log('Submitting proposal for order:', orderId)
    console.log('Proposal data:', proposal.value)
    
    // createContract API ni chaqiramiz
    await createContract(orderId, {
      price: parseInt(proposal.value.price),
      deliveryDate: proposal.value.deliveryDate,
      terms: proposal.value.terms
    })
    
    alert('Taklif muvaffaqiyatli yuborildi!')
    router.push('/loads')
  } catch (error) {
    console.error('Error submitting proposal:', error)
    alert('Xatolik yuz berdi: ' + error.message)
  } finally {
    submitting.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}
</script>