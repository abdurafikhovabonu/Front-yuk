<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Haydovchilar</h1>
    
    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="grid md:grid-cols-3 gap-4">
        <select v-model="filters.carType" class="border rounded-lg p-3">
          <option value="">Barcha mashina turlari</option>
          <option value="Gazel">Gazel</option>
          <option value="Man">Man</option>
          <option value="Kamaz">Kamaz</option>
        </select>
        
        <select v-model="filters.minRating" class="border rounded-lg p-3">
          <option value="">Barcha reytinglar</option>
          <option value="4">4+ yulduz</option>
          <option value="4.5">4.5+ yulduz</option>
          <option value="5">5 yulduz</option>
        </select>
        
        <button 
          @click="applyFilters"
          class="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
        >
          Filtr
        </button>
      </div>
    </div>
    
    <!-- Drivers List -->
    <div v-if="loading" class="text-center py-12">
      Yuklanmoqda...
    </div>
    
    <div v-else-if="drivers.length === 0" class="text-center py-12 text-gray-500">
      Haydovchilar topilmadi
    </div>
    
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DriverCard 
        v-for="driver in drivers" 
        :key="driver.id" 
        :driver="driver"
        :show-contact="true"
      />
    </div>
  </div>
</template>

<script setup>
import DriverCard from '@/components/DriverCard.vue'
const { getDrivers } = useApi()

const drivers = ref([])
const loading = ref(true)
const filters = ref({
  carType: '',
  minRating: ''
})

const loadDrivers = async () => {
  loading.value = true
  try {
    const params = {}
    if (filters.value.carType) params.carType = filters.value.carType
    if (filters.value.minRating) params.minRating = filters.value.minRating
    drivers.value = await getDrivers(params)
  } catch (error) {
    console.error('Error loading drivers:', error)
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  loadDrivers()
}

onMounted(() => {
  loadDrivers()
})
</script>