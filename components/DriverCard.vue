<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div class="relative h-48 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
      <svg class="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
      </svg>
      <div class="absolute top-4 right-4 bg-yellow-400 rounded-full px-2 py-1 text-sm font-semibold">
        ★ {{ driver.rating }}
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="text-xl font-bold text-gray-800">{{ driver.name }}</h3>
          <p class="text-gray-500 text-sm">{{ driver.carType }} • {{ driver.carNumber }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">1 km narxi</p>
          <p class="text-lg font-bold text-blue-600">{{ formatPrice(driver.pricePerKm) }} so'm</p>
        </div>
      </div>
      
      <div class="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          {{ driver.totalTrips }} ta yuk tashigan
        </span>
        <span :class="driver.available ? 'text-green-600' : 'text-red-600'" class="font-semibold">
          {{ driver.available ? '✅ Mavjud' : '❌ Band' }}
        </span>
      </div>
      
      <button 
        @click="contactDriver"
        class="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105"
      >
        Bog'lanish
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  driver: {
    type: Object,
    required: true
  }
})

const toast = useToast()

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const contactDriver = () => {
  const phone = props.driver.phone || '—'
  const email = props.driver.email || '—'
  toast.info(`📞 ${phone} · 📧 ${email}`)
}
</script>