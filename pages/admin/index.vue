<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white fixed">
        <div class="p-6">
          <div class="flex items-center space-x-2 mb-8">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold">Admin Panel</span>
          </div>
          
          <nav class="space-y-2">
            <NuxtLink to="/admin" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition" :class="{ 'bg-gray-700': $route.path === '/admin' }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Dashboard</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/users" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition" :class="{ 'bg-gray-700': $route.path === '/admin/users' }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span>Foydalanuvchilar</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/orders" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition" :class="{ 'bg-gray-700': $route.path === '/admin/orders' }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              <span>Buyurtmalar</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/drivers" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition" :class="{ 'bg-gray-700': $route.path === '/admin/drivers' }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              <span>Haydovchilar</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/settings" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition" :class="{ 'bg-gray-700': $route.path === '/admin/settings' }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Sozlamalar</span>
            </NuxtLink>
          </nav>
        </div>
      </aside>
      
      <!-- Main Content -->
      <main class="ml-64 flex-1 p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p class="text-gray-500">Xush kelibsiz, {{ adminUser?.name }}</p>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-2xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Foydalanuvchilar</p>
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
                <p class="text-gray-500 text-sm">Haydovchilar</p>
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
                <p class="text-gray-500 text-sm">Buyurtmalar</p>
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
                <p class="text-gray-500 text-sm">Umumiy tushum</p>
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
            <h2 class="text-xl font-bold">So'nggi buyurtmalar</h2>
            <NuxtLink to="/admin/orders" class="text-blue-600 hover:text-blue-800 text-sm">
              Hammasini ko'rish →
            </NuxtLink>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Yo'nalish</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Yuk</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Narx</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Holat</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sana</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm">#{{ order.id }}</td>
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
const { getOrders, getUsers, getDrivers } = useApi()
const router = useRouter()

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
  } catch (error) {
    console.error('Error loading stats:', error)
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
  const texts = {
    pending: 'Kutilmoqda',
    negotiation: 'Muzokarada',
    accepted: 'Qabul qilingan',
    completed: 'Bajarilgan',
    cancelled: 'Bekor qilingan'
  }
  return texts[status] || status
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const formatDate = (date) => {
  if (!date) return 'Noma\'lum'
  return new Date(date).toLocaleDateString('uz-UZ')
}
</script>