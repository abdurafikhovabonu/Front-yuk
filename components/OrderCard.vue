<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">
          {{ order.from }} → {{ order.to }}
        </h3>
        <p class="text-sm text-gray-500 mt-1">
          Yuk: {{ order.cargo }} ({{ order.weight }})
        </p>
      </div>
      <span :class="statusClass" class="px-3 py-1 rounded-full text-sm font-medium">
        {{ statusText }}
      </span>
    </div>
    
    <div class="flex justify-between items-center mt-4">
      <div class="text-2xl font-bold text-blue-600">
        {{ formatPrice(order.price) }} so'm
      </div>
      
      <button 
        v-if="showActions" 
        @click="viewOrder"
        class="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
      >
        Ko'rish
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['view'])
const router = useRouter()
const toast = useToast()

const statusText = computed(() => {
  const statuses = {
    pending: 'Kutilmoqda',
    accepted: 'Qabul qilingan',
    completed: 'Bajarilgan',
    cancelled: 'Bekor qilingan',
    negotiation: 'Muzokarada'
  }
  return statuses[props.order.status] || props.order.status
})

const statusClass = computed(() => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    negotiation: 'bg-purple-100 text-purple-800'
  }
  return classes[props.order.status] || 'bg-gray-100 text-gray-800'
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const viewOrder = () => {
  const orderId = props.order._id || props.order.id
  if (!orderId) {
    toast.warning('Buyurtma topilmadi')
    return
  }
  router.push(`/orders/${orderId}`)
}
</script>