<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-20">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center transform transition group-hover:scale-110 group-hover:rotate-12">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 18H4a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2M8 18a2 2 0 104 0M8 18h4M18 18a2 2 0 104 0m0 0h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2M8 10h4" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full px-1.5 py-0.5">
              uz
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Yukchi
            </span>
            <span class="text-xs text-gray-500 -mt-1">yuk tashish xizmati</span>
          </div>
        </NuxtLink>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink 
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition duration-300 group"
            :class="{ 'text-blue-600 font-semibold': $route.path === item.path }"
          >
            {{ item.name }}
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 transition-transform group-hover:scale-x-100" 
                  :class="{ 'scale-x-100': $route.path === item.path }"></span>
          </NuxtLink>
        </div>
        
        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- User Menu -->
          <div v-if="user" class="relative">
            <button 
              @click="toggleDropdown"
              class="flex items-center space-x-3 focus:outline-none group"
            >
              <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {{ user.name?.charAt(0).toUpperCase() || 'U' }}
                </div>
                <div class="hidden lg:block text-left">
                  <p class="text-sm font-semibold text-gray-800">{{ user.name }}</p>
                  <p class="text-xs text-gray-500">{{ user.role === 'client' ? 'Mijoz' : user.role === 'driver' ? 'Haydovchi' : 'Admin' }}</p>
                </div>
                <svg class="w-4 h-4 text-gray-600 transition-transform" :class="{ 'rotate-180': dropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </button>
            
            <!-- Dropdown Menu -->
            <transition name="fade">
              <div 
                v-if="dropdownOpen"
                class="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100"
              >
                <div class="px-4 py-3 border-b">
                  <p class="text-sm font-semibold text-gray-800">{{ user.name }}</p>
                  <p class="text-xs text-gray-500">{{ user.email }}</p>
                </div>
                
                <NuxtLink 
                  to="/profile" 
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  @click="dropdownOpen = false"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Mening profilim
                </NuxtLink>
                
                <NuxtLink 
                  v-if="user.role !== 'admin'"
                  :to="user.role === 'client' ? '/orders' : '/my-proposals'"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  @click="dropdownOpen = false"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                  </svg>
                  {{ user.role === 'client' ? 'Mening buyurtmalarim' : 'Mening takliflarim' }}
                </NuxtLink>
                
                <hr class="my-1">
                
                <button 
                  @click="handleLogout"
                  class="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Chiqish
                </button>
              </div>
            </transition>
          </div>
          
          <!-- Auth Buttons -->
          <div v-else class="flex items-center space-x-3">
            <NuxtLink 
              to="/login" 
              class="px-5 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-medium"
            >
              Kirish
            </NuxtLink>
            <NuxtLink 
              to="/register" 
              class="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 font-medium"
            >
              Ro'yxatdan o'tish
            </NuxtLink>
          </div>
          
          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-600 hover:text-blue-600 transition focus:outline-none"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <transition name="slide">
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
          <div class="flex flex-col space-y-2">
            <NuxtLink 
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
              @click="mobileMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
            
            <hr class="my-2">
            
            <NuxtLink 
              to="/profile" 
              class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
              @click="mobileMenuOpen = false"
            >
              Profil
            </NuxtLink>
            
            <button 
              @click="handleLogout"
              class="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition text-left"
            >
              Chiqish
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
const router = useRouter()
const user = ref(null)
const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)

const menuItems = computed(() => {
  const commonItems = [
    { name: 'Bosh sahifa', path: '/' }
  ]
  
  if (!user.value) {
    return commonItems
  }
  
  if (user.value.role === 'admin') {
    return [
      ...commonItems,
      { name: 'Admin Panel', path: '/admin' },
      { name: 'Foydalanuvchilar', path: '/admin/users' },
      { name: 'Buyurtmalar', path: '/admin/orders' },
      { name: 'Haydovchilar', path: '/admin/drivers' },
      
    ]
  }
  
  if (user.value.role === 'client') {
    return [
      ...commonItems,
      { name: 'Elon berish', path: '/create-order' },
      { name: 'Buyurtmalar', path: '/orders' },
      { name: 'Takliflar', path: '/incoming-proposals' },
      { name: 'Haydovchilar', path: '/drivers' },
      { name: 'Yangiliklar', path: '/news' }
    ]
  } else if (user.value.role === 'driver') {
    return [
      ...commonItems,
      { name: 'Yuk elonlari', path: '/loads' },
      { name: 'Mening takliflarim', path: '/my-proposals' },
      { name: 'Haydovchilar', path: '/drivers' },
      { name: 'Yangiliklar', path: '/news' }
    ]
  }
  
  return commonItems
})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      dropdownOpen.value = false
    }
  })
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  user.value = null
  dropdownOpen.value = false
  mobileMenuOpen.value = false
  router.push('/')
}

watch(() => router.currentRoute.value.path, () => {
  dropdownOpen.value = false
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>