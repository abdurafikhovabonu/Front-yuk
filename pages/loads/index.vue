<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Yuk elonlari</h1>
      <div class="text-sm text-gray-500">
        <span class="font-semibold">{{ totalLoads }}</span> ta yuk eloni topildi
      </div>
    </div>
    
    <!-- Filter Section -->
    <div class="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div class="grid md:grid-cols-4 gap-4">
        <input 
          v-model="filters.from" 
          type="text" 
          placeholder="Qayerdan" 
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          v-model="filters.to" 
          type="text" 
          placeholder="Qayerga" 
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select v-model="filters.cargo" class="border border-gray-300 rounded-lg px-4 py-2">
          <option value="">Barcha yuk turlari</option>
          <option value="Mebel">Mebel</option>
          <option value="Oziq-ovqat">Oziq-ovqat</option>
          <option value="Qurilish">Qurilish materiallari</option>
          <option value="Elektronika">Elektronika</option>
        </select>
        <button 
          @click="applyFilters"
          class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg py-2 hover:shadow-lg transition"
        >
          Qidirish
        </button>
      </div>
    </div>
    
    <!-- Loads List -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="loads.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-md">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
      </svg>
      <p class="text-gray-500">Hozircha yuk elonlari mavjud emas</p>
    </div>
    
    <div v-else class="space-y-4">
      <LoadCard 
        v-for="load in loads" 
        :key="load.id" 
        :load="load"
        @propose="makeProposal"
        @view="viewLoad"
      />
    </div>
  </div>
</template>

<script setup>
import LoadCard from '@/components/LoadCard.vue'

const { getOrders } = useApi()
const router = useRouter()

const loads = ref([])
const loading = ref(true)
const totalLoads = ref(0)
const filters = ref({
  from: '',
  to: '',
  cargo: ''
})

onMounted(() => {
  loadLoads()
})

const loadLoads = async () => {
  loading.value = true
  try {
    const allOrders = await getOrders()
    // Faqat pending statusdagi yuklarni ko'rsatish
    loads.value = allOrders.filter(order => order.status === 'pending')
    totalLoads.value = loads.value.length
  } catch (error) {
    console.error('Error loading loads:', error)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  loadLoads()
}

const makeProposal = (loadId) => {
  router.push(`/loads/${loadId}/propose`)
}

const viewLoad = (loadId) => {
  router.push(`/loads/${loadId}`)
}
</script>