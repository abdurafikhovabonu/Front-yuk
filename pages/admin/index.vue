<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <AdminSidebar />

      <!-- Main Content -->
      <main class="ml-64 flex-1 p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">{{ t('admin.dashboard') }}</h1>
          <p class="text-gray-500">{{ t('admin.welcomeUser', { name: adminUser?.name || '—' }) }}</p>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-2xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">{{ t('admin.statsUsers') }}</p>
                <p class="text-3xl font-bold text-gray-800">{{ stats.users }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">{{ t('admin.statsDrivers') }}</p>
                <p class="text-3xl font-bold text-gray-800">{{ stats.drivers }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">{{ t('admin.statsOrders') }}</p>
                <p class="text-3xl font-bold text-gray-800">{{ stats.orders }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">{{ t('admin.statsRevenue') }}</p>
                <p class="text-3xl font-bold text-gray-800">{{ formatPrice(stats.totalRevenue) }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Recent Orders -->
        <div class="bg-white rounded-2xl shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">{{ t('admin.recentOrdersTitle') }}</h2>
            <NuxtLink to="/admin/orders" class="text-blue-600 hover:text-blue-800 text-sm">
              {{ t('admin.seeAll') }} →
            </NuxtLink>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">{{ t('admin.colId') }}</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">{{ t('admin.colRoute') }}</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">{{ t('admin.colCargo') }}</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">{{ t('admin.colPrice') }}</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">{{ t('admin.colStatus') }}</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">{{ t('admin.colDate') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="order in recentOrders" :key="order._id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm">#{{ order._id?.toString?.().slice(-6) }}</td>
                  <td class="px-4 py-3 text-sm">{{ order.from }} → {{ order.to }}</td>
                  <td class="px-4 py-3 text-sm">{{ order.cargo }}</td>
                  <td class="px-4 py-3 text-sm font-semibold">{{ formatPrice(order.price) }}</td>
                  <td class="px-4 py-3">
                    <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
                      {{ getStatusText(order.status) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">{{ formatDate(order.createdAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin' })

const { t, locale } = useI18n()
const { getOrders, getUsers, getDrivers } = useApi()
const router = useRouter()
const toast = useToast()

const adminUser = ref(null)
const stats = ref({
  users: 0,
  drivers: 0,
  orders: 0,
  totalRevenue: 0
})
const recentOrders = ref([])

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    adminUser.value = JSON.parse(user)
    if (adminUser.value.role !== 'admin') {
      router.push('/')
    }
  }
  loadStats()
})

const loadStats = async () => {
  try {
    const users = await getUsers()
    const drivers = await getDrivers()
    const orders = await getOrders()
    
    stats.value.users = users.length
    stats.value.drivers = drivers.length
    stats.value.orders = orders.length
    stats.value.totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0)
    
    recentOrders.value = orders.slice(0, 5)
  } catch {
    toast.error('Statistikani yuklashda xatolik')
  }
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-purple-100 text-purple-800',
    accepted: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const map = {
    pending: 'admin.orderStatusPending',
    negotiation: 'admin.orderStatusNegotiation',
    accepted: 'admin.orderStatusAccepted',
    completed: 'admin.orderStatusCompleted',
    cancelled: 'admin.orderStatusCancelled'
  }
  const key = map[status]
  return key ? t(key) : status
}

const formatPrice = (price) => {
  const loc = locale.value === 'uz' ? 'uz-UZ' : locale.value === 'ru' ? 'ru-RU' : 'en-US'
  return new Intl.NumberFormat(loc).format(price)
}

const formatDate = (date) => {
  if (!date) return '—'
  const loc = locale.value === 'uz' ? 'uz-UZ' : locale.value === 'ru' ? 'ru-RU' : 'en-US'
  return new Date(date).toLocaleDateString(loc)
}
</script>