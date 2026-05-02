<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Mening buyurtmalarim</h1>
    
    <div v-if="loading" class="text-center py-12">
      Yuklanmoqda...
    </div>
    
    <div v-else-if="orders.length === 0" class="text-center py-12 bg-white rounded-lg shadow">
      <p class="text-gray-500 mb-4">Sizning buyurtmalaringiz yo'q</p>
      <NuxtLink to="/create-order" class="text-blue-600 hover:underline">
        Birinchi buyurtmani yaratish
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-4">
      <OrderCard 
        v-for="order in orders" 
        :key="order.id" 
        :order="order"
        @view="viewOrder"
      />
    </div>
  </div>
</template>

<script setup>
import OrderCard from '@/components/OrderCard.vue'
const { getOrders } = useApi()

const orders = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    orders.value = await getOrders()
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    loading.value = false
  }
})

const viewOrder = (id) => {
  navigateTo(`/orders/${id}`)
}
</script>