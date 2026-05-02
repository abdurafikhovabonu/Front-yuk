<template>
  <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Yuk eloni #{{ load.id }}
            </span>
            <span class="text-xs text-gray-500">{{ formatDate(load.date) }}</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800">
            {{ load.from }} → {{ load.to }}
          </h3>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-blue-600">
            {{ formatPrice(load.price) }} so'm
          </p>
          <p class="text-sm text-gray-500">taklif qilingan narx</p>
        </div>
      </div>
      
      <div class="grid md:grid-cols-3 gap-4 mb-4">
        <div class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <span>{{ load.cargo }} ({{ load.weight }})</span>
        </div>
        <div class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Mijoz: {{ load.client?.name || 'Anonim' }}</span>
        </div>
        <div class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <span>{{ load.phone || 'Telefon mavjud emas' }}</span>
        </div>
      </div>
      
      <p v-if="load.description" class="text-gray-600 text-sm mb-4">
        {{ load.description }}
      </p>
      
      <div class="flex space-x-3">
        <button 
          @click="$emit('propose', load.id)"
          class="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105"
        >
          Taklif berish
        </button>
        <button 
          @click="$emit('view', load.id)"
          class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Batafsil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  load: {
    type: Object,
    required: true
  }
})

defineEmits(['propose', 'view'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}
</script>