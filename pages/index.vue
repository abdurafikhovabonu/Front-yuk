<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl overflow-hidden mb-16">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative z-10 p-12 md:p-16">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Yuklaringizni tez va xavfsiz tashish
          </h1>
          <p class="text-xl mb-6 text-blue-100">
            Yukchi.uz - O'zbekistonning ishonchli yuk tashish xizmati
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink 
              to="/create-order"
              class="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Elon berish
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
            <NuxtLink 
              to="/drivers"
              class="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Haydovchi topish
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute bottom-0 right-0 opacity-10">
        <svg class="w-64 h-64" fill="white" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    </section>

    <!-- Statistikalar -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      <div class="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
        <div class="text-3xl font-bold text-blue-600 mb-2">5000+</div>
        <div class="text-gray-600">Muvaffaqiyatli yuk</div>
      </div>
      <div class="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
        <div class="text-3xl font-bold text-blue-600 mb-2">1000+</div>
        <div class="text-gray-600">Ishonchli haydovchi</div>
      </div>
      <div class="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
        <div class="text-3xl font-bold text-blue-600 mb-2">50+</div>
        <div class="text-gray-600">Shaharlar</div>
      </div>
      <div class="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
        <div class="text-3xl font-bold text-blue-600 mb-2">98%</div>
        <div class="text-gray-600">Mijozlar rozi</div>
      </div>
    </section>

    <!-- Qidirish bo'limi -->
    <section class="mb-16">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold mb-6 text-center">Yuk tashishni qidiring</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="relative">
            <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <input 
              v-model="search.from" 
              type="text" 
              placeholder="Qayerdan" 
              class="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="relative">
            <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <input 
              v-model="search.to" 
              type="text" 
              placeholder="Qayerga" 
              class="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            @click="searchOrders"
            class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg py-3 hover:shadow-lg transition transform hover:scale-105"
          >
            Qidirish
          </button>
        </div>
      </div>
    </section>

    <!-- Xizmatlar bo'limi -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-12">Bizning xizmatlar</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center group">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Tez yuk tashish</h3>
          <p class="text-gray-600">Eng qisqa vaqt ichida yuklaringizni yetkazib beramiz</p>
        </div>
        
        <div class="text-center group">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Xavfsizlik kafolati</h3>
          <p class="text-gray-600">Yuklaringiz to'liq sug'urtalangan</p>
        </div>
        
        <div class="text-center group">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Qulay narxlar</h3>
          <p class="text-gray-600">Bo'sh yuk mashinalarini topib eng arzon narx</p>
        </div>
      </div>
    </section>

    <!-- Haydovchilar bo'limi -->
    <section class="mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold">Eng yaqin haydovchilar</h2>
        <NuxtLink to="/drivers" class="text-blue-600 hover:text-blue-800 font-semibold">
          Hammasini ko'rish →
        </NuxtLink>
      </div>
      
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
      
      <div v-else-if="drivers.length === 0" class="text-center py-12 bg-white rounded-xl shadow-md">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-gray-500">Hozircha haydovchilar mavjud emas</p>
      </div>
      
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DriverCard 
          v-for="driver in drivers.slice(0, 3)" 
          :key="driver.id" 
          :driver="driver"
        />
      </div>
    </section>

    <!-- Qanday ishlaydi? -->
    <section class="bg-white rounded-2xl shadow-xl p-8 mb-16">
      <h2 class="text-3xl font-bold text-center mb-8">Qanday ishlaydi?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">1</div>
          <h3 class="text-xl font-semibold mb-2">Buyurtma bering</h3>
          <p class="text-gray-600">Yukingiz haqida ma'lumot qoldiring</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">2</div>
          <h3 class="text-xl font-semibold mb-2">Haydovchi toping</h3>
          <p class="text-gray-600">Eng yaxshi taklifni tanlang</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">3</div>
          <h3 class="text-xl font-semibold mb-2">Yukingiz yetkazilsin</h3>
          <p class="text-gray-600">Yukingiz manzilga yetkaziladi</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
      <h2 class="text-3xl font-bold mb-4">Yuk tashishga tayyormisiz?</h2>
      <p class="text-xl mb-6">Hoziroq buyurtma bering va eng yaqin haydovchini toping</p>
      <NuxtLink 
        to="/create-order"
        class="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
      >
        Elon berish
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import DriverCard from '~/components/DriverCard.vue'

const { getDrivers } = useApi()

const drivers = ref([])
const loading = ref(true)
const search = ref({
  from: '',
  to: ''
})

onMounted(async () => {
  try {
    drivers.value = await getDrivers({ available: true })
  } catch (error) {
    console.error('Error loading drivers:', error)
  } finally {
    loading.value = false
  }
})

const searchOrders = () => {
  if (search.value.from && search.value.to) {
    navigateTo(`/drivers?from=${search.value.from}&to=${search.value.to}`)
  }
}
</script>